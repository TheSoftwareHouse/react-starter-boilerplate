// tools/figma/builder-generator.ts
import "dotenv/config";
import { Command } from "commander";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { exportFrameJson, listFrames, getNodesMeta } from "./figmaClient";
import { convertToReactComponent } from "./advanced-mapper";
import { generateReactComponent } from "./code-generator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .option("--url <figmaUrl>", "Full Figma URL (will extract fileKey and node-id)")
  .option("--file <fileKey>", "Figma file key")
  .option("--page <page>", "Figma page (CANVAS) name")
  .option("--section <section>", "Frame/component name to export")
  .option("--sectionId <sectionId>", "Frame ID to export (bypasses name matching)")
  .option("--query <query>", "Loose search pattern for frame name (supports 'a|b|c')")
  .requiredOption("--feature <featureName>", "Feature folder, e.g. 'dashboard'")
  .requiredOption("--name <componentName>", "Component name, e.g. 'StatsGrid'")
  .option("--outDir <outDir>", "Output base dir", "src/features")
  .parse(process.argv);

const opts = program.opts<{
  url?: string;
  file?: string;
  page?: string;
  section?: string;
  sectionId?: string;
  query?: string;
  outDir: string;
  feature: string;
  name: string;
}>();

function parseFigmaUrl(u: string): { fileKey?: string; nodeId?: string } {
  try {
    const url = new URL(u);
    const segs = url.pathname.split("/").filter(Boolean);
    const idx = segs.findIndex(s => s === "file" || s === "design");
    const fileKey = idx >= 0 ? segs[idx + 1] : undefined;

    const raw = url.searchParams.get("node-id") || undefined;
    const nodeId = raw?.replace(/-/g, ":") || undefined;
    return { fileKey, nodeId };
  } catch {
    return {};
  }
}

async function ensureDir(dirPath: string) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

type FrameItem = { id: string; name: string; width?: number; height?: number; page?: string };

async function findBestFrameId(
  fileKey: string, 
  page?: string, 
  section?: string, 
  query?: string
): Promise<{ id: string; pickedName: string; pickedPage?: string }> {
  const frames = await listFrames(fileKey, page);
  if (frames.length === 0) throw new Error(`No frames found in file ${fileKey}`);

  // 1) Exact sectionId match bypasses everything
  // (handled in main function)

  // 2) Exact section name match
  if (section) {
    const exact = frames.find(f => f.name === section);
    if (exact) return { id: exact.id, pickedName: exact.name, pickedPage: (exact as any).page };
  }

  // 3) Query/loose match
  if (query || section) {
    const pattern = query || section!;
    const terms = pattern.split('|').map(t => t.trim().toLowerCase());
    
    const scored = frames.map(f => {
      const name = f.name.toLowerCase();
      let score = 0;
      for (const term of terms) {
        if (name === term) score += 100;
        else if (name.includes(term)) score += 50;
        else if (name.split(/\s+/).some(word => word.includes(term))) score += 25;
      }
      return { ...f, score };
    }).filter(f => f.score > 0);

    if (scored.length === 0) {
      throw new Error(`No frames match pattern "${pattern}". Available: ${frames.map(f => f.name).join(', ')}`);
    }

    scored.sort((a, b) => b.score - a.score);
    let best = scored[0];

    if (best.score === 0) {
      throw new Error(`No frames match query/section "${pattern}"`);
    }

    // Resolve ties by area
    const topScore = best.score;
    const top = scored.filter(s => s.score === topScore);
    if (top.length > 1) {
      const meta = await getNodesMeta(fileKey, top.map(t => t.id));
      top.sort((a, b) => {
        const am = meta[a.id]; const bm = meta[b.id];
        const aa = (am?.width ?? 0) * (am?.height ?? 0);
        const bb = (bm?.width ?? 0) * (bm?.height ?? 0);
        return bb - aa;
      });
      best = top[0];
    }
    return { id: best.id, pickedName: best.name, pickedPage: (best as any).page };
  }

  // 4) No section or query – take biggest frame
  const meta = await getNodesMeta(fileKey, frames.map(f => f.id));
  const withArea = frames.map(f => {
    const m = meta[f.id];
    const area = (m?.width ?? 0) * (m?.height ?? 0);
    return { ...f, area };
  });
  const biggest = withArea.sort((a, b) => b.area - a.area)[0];
  return { id: biggest.id, pickedName: biggest.name, pickedPage: (biggest as any).page };
}

async function generateWithBuilderIO() {
  // 1) Parse input
  let fileKey = opts.file;
  let sectionId = opts.sectionId;
  
  if (opts.url) {
    const p = parseFigmaUrl(opts.url);
    if (p.fileKey && !fileKey) fileKey = p.fileKey;
    if (p.nodeId && !sectionId) sectionId = p.nodeId;
  }
  
  if (!fileKey) throw new Error("Missing --file or --url with fileKey.");

  // 2) Find frameId
  let frameId: string;
  let pickedName = opts.section ?? "";
  if (sectionId) {
    frameId = sectionId;
  } else {
    const pick = await findBestFrameId(fileKey, opts.page, opts.section, opts.query);
    frameId = pick.id;
    pickedName = pick.pickedName;
    console.log(`[figma:builder] Picked frame: ${pickedName} (id=${frameId})`);
  }

  // Normalize for Figma REST: URL node-id uses "-", API expects ":"
  frameId = frameId.replace(/-/g, ":");
  console.log(`[figma] Generating from fileKey=${fileKey}, frameId=${frameId}`);

  try {
    console.log("🔄 Converting Figma to React component...");
    
    // Fetch Figma data directly using our existing client
    const figmaData = await exportFrameJson(fileKey, frameId);
    console.log("📥 Fetched Figma data successfully");

    // Convert using advanced mapper
    if (!figmaData.root) {
      throw new Error("No root node found in Figma data");
    }
    
    const convertResult = convertToReactComponent(figmaData.root);
    const componentMapping = convertResult.tree;

    console.log("🔄 Converting to high-fidelity React component...");

    // Generate code using advanced generator
    const generatedCode = generateReactComponent(componentMapping, opts.name, {
      typescript: true,
      cssModules: false,
    });
    
    // Save generated files
    const baseDir = path.join(opts.outDir, opts.feature, "components", opts.name);
    await ensureDir(baseDir);

    await fs.writeFile(
      path.join(baseDir, `${opts.name}.tsx`),
      generatedCode.component,
      "utf8"
    );

    await fs.writeFile(
      path.join(baseDir, `${opts.name}.css`),
      convertResult.cssText,
      "utf8"
    );

    // Generate story
    const storyContent = `
import type { Meta, StoryObj } from '@storybook/react';
import { ${opts.name} } from './${opts.name}';

const meta: Meta<typeof ${opts.name}> = {
  title: 'Features/${opts.feature}/${opts.name}',
  component: ${opts.name},
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
`;

    await fs.writeFile(
      path.join(baseDir, `${opts.name}.stories.tsx`),
      storyContent,
      "utf8"
    );

    // Generate test
    const testContent = `
import { render, screen } from '@testing-library/react';
import { ${opts.name} } from './${opts.name}';

describe('${opts.name}', () => {
  it('renders without crashing', () => {
    render(<${opts.name} />);
    expect(screen.getByTestId('${opts.name.toLowerCase()}')).toBeInTheDocument();
  });
});
`;

    await fs.writeFile(
      path.join(baseDir, `${opts.name}.test.tsx`),
      testContent,
      "utf8"
    );

    // Update barrel export
    const barrelPath = path.join(opts.outDir, opts.feature, "components", "index.ts");
    let barrel = "";
    try { 
      barrel = await fs.readFile(barrelPath, "utf8"); 
    } catch {}
    
    const exportLine = `export { ${opts.name} } from "./${opts.name}/${opts.name}";\n`;
    if (!barrel.includes(exportLine)) {
      await fs.appendFile(barrelPath, exportLine, "utf8");
    }

    // Create route
    const routeDir = path.join("src", "routes", `${opts.feature}-${opts.name}`);
    await ensureDir(routeDir);
    const routePath = path.join(routeDir, "index.tsx");
    const routeUrl = `/${opts.feature}-${opts.name}`;
    
    try { 
      await fs.access(routePath); 
    } catch {
      await fs.writeFile(routePath,
`import { createFileRoute } from '@tanstack/react-router';
import { ${opts.name} } from '@/features/${opts.feature}/components/${opts.name}/${opts.name}';

export const Route = createFileRoute('${routeUrl}')({
  component: () => <${opts.name} />,
});
`, "utf8");
    }

    console.log(`✅ Generated ${opts.name} component successfully`);
    console.log(`📁 Output: ${baseDir}`);
    console.log(`🌐 Route: ${routeUrl}`);
    
  } catch (error) {
    console.error("❌ Generation failed:", error);
    throw error;
  }
}

generateWithBuilderIO().catch((e) => {
  console.error(e);
  process.exit(1);
});
