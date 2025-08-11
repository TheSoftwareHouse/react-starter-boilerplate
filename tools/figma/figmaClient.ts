// tools/figma/figmaClient.ts
import type { FigmaFrameExport } from "./types";

/* British English comments:
 * Two modes:
 * 1) Direct Figma REST (when FIGMA_API_TOKEN is set)
 * 2) MCP proxy server (fallback when no FIGMA_API_TOKEN)
 */

const rawToken = process.env.FIGMA_API_TOKEN?.trim() ?? "";
const FIGMA_TOKEN = rawToken.length > 0 ? rawToken : undefined;
const MCP_BASE = process.env.MCP_FIGMA_BASE_URL || "http://localhost:8787";
const USE_REST = Boolean(FIGMA_TOKEN);

const FIGMA_API = "https://api.figma.com/v1";
const DEFAULT_TIMEOUT_MS = 20_000;

/** Add a timeout to fetch to avoid hanging requests. */
async function withTimeout<T>(input: RequestInfo | URL, init?: RequestInit, ms = DEFAULT_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(`Timeout after ${ms} ms`), ms);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(t);
  }
}

/** MCP HTTP wrapper */
async function httpMcp<T>(path: string, init?: RequestInit): Promise<T> {
  if (!MCP_BASE) {
    throw new Error("No MCP_FIGMA_BASE_URL configured and no FIGMA_API_TOKEN provided. Set FIGMA_API_TOKEN to use Figma REST directly, or set MCP_FIGMA_BASE_URL to a running proxy.");
  }
  try {
    const res = await withTimeout(`${MCP_BASE}${path}`, {
      ...init,
      headers: { "content-type": "application/json", ...(init?.headers || {}) }
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Figma MCP HTTP ${res.status}: ${txt}`);
    }
    return res.json() as Promise<T>;
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED' || error.cause?.code === 'ECONNREFUSED') {
      throw new Error(
        `Cannot connect to MCP server at ${MCP_BASE}. ` +
        `Please either:\n` +
        `1. Set FIGMA_API_TOKEN in your .env file to use Figma REST API directly\n` +
        `2. Start the MCP server at ${MCP_BASE}\n` +
        `3. Set MCP_FIGMA_BASE_URL to a different MCP server URL`
      );
    }
    throw error;
  }
}

/** REST HTTP wrapper (uses X-Figma-Token) */
async function httpRest<T>(path: string): Promise<T> {
  if (!FIGMA_TOKEN) throw new Error("FIGMA_API_TOKEN is not set.");
  const res = await withTimeout(`${FIGMA_API}${path}`, {
    headers: {
      // Figma REST prefers this header for PAT
      "X-Figma-Token": FIGMA_TOKEN
    }
  });
  if (!res.ok) {
    const txt = await res.text();
    // Provide friendlier hints for common cases
    if (res.status === 403) {
      throw new Error(
        `Figma REST HTTP 403 (Invalid token or no access). ` +
        `Check FIGMA_API_TOKEN and file sharing. Response: ${txt}`
      );
    }
    throw new Error(`Figma REST HTTP ${res.status}: ${txt}`);
  }
  return res.json() as Promise<T>;
}

/* -------------------------
 * Public API (shared shape)
 * ------------------------- */

export async function listFrames(
  fileKey: string,
  page?: string
): Promise<Array<{ id: string; name: string }>> {
  if (!USE_REST) {
    const q = page ? `?page=${encodeURIComponent(page)}` : "";
    return httpMcp(`/figma/${encodeURIComponent(fileKey)}/frames${q}`);
  }
  // REST mode
  type FigmaNode = {
    id: string;
    name: string;
    type: string;
    children?: FigmaNode[];
  };
  type FileResp = { document: FigmaNode };

  const data = await httpRest<FileResp>(`/files/${encodeURIComponent(fileKey)}`);
  const root = data.document;

  const pageNode = findPage(root, page);

  const acc: Array<{ id: string; name: string }> = [];
  for (const child of pageNode.children || []) flattenFrames(child, acc);
  return acc;

  function findPage(node: FigmaNode, pageName?: string): FigmaNode {
  const canvases = (node.children || []).filter(c => c.type === "CANVAS");
  if (!pageName) {
    if (canvases.length) return canvases[0];
    throw new Error("No CANVAS found in the Figma file.");
  }

  // Exact match first
  const exact = canvases.find(c => c.name === pageName);
  if (exact) return exact;

  // Case-insensitive
  const ci = canvases.find(c => c.name.toLowerCase() === pageName.toLowerCase());
  if (ci) return ci;

  // Loose match: normalise spaces/dashes and check includes
  const norm = (s: string) => s.toLowerCase().replace(/[–—-]/g, "-").replace(/\s+/g, " ").trim();
  const wanted = norm(pageName);
  const loose = canvases.find(c => norm(c.name).includes(wanted));
  if (loose) return loose;

  const available = canvases.map(c => `• ${c.name}`).join("\n");
  throw new Error(
    `Page '${pageName}' not found.\nAvailable pages:\n${available}`
  );
}


  function flattenFrames(node: FigmaNode, out: Array<{ id: string; name: string }>) {
    if (node.type === "FRAME" || node.type === "COMPONENT" || node.type === "INSTANCE") {
      out.push({ id: node.id, name: node.name });
    }
    for (const ch of node.children || []) flattenFrames(ch, out);
  }
}

export async function exportFrameJson(fileKey: string, frameId: string): Promise<FigmaFrameExport> {
  if (!USE_REST) {
    return httpMcp(`/figma/${encodeURIComponent(fileKey)}/frames/${encodeURIComponent(frameId)}`);
  }
  // Normalise for REST: URL node-id may use "-" but API requires ":"
  const normalised = frameId.replace(/-/g, ":");
  type NodesResp = { nodes: Record<string, { document?: unknown }> };
  const data = await httpRest<NodesResp>(
    `/files/${encodeURIComponent(fileKey)}/nodes?ids=${encodeURIComponent(normalised)}`
  );
  const node = data.nodes?.[normalised]?.document;
  if (!node) throw new Error(`Frame '${normalised}' not found in file '${fileKey}'.`);
  return { root: node as any };
}

export async function getDesignTokens(_fileKey: string): Promise<Record<string, string | number>> {
  if (!USE_REST) {
    return httpMcp(`/figma/${encodeURIComponent(_fileKey)}/tokens`);
  }
  // Extend later with /variables or /styles if needed.
  return {};
}

// tools/figma/figmaClient.ts — DODAJ NA KOŃCU PLIKU
export async function getNodesMeta(
  fileKey: string,
  ids: string[]
): Promise<Record<string, { width?: number; height?: number }>> {
  // Figma pozwala na batche: /nodes?ids=a,b,c
  const unique = Array.from(new Set(ids));
  // Dzielenie na paczki po ~40, żeby nie przesadzić z URL-em
  const chunk = <T,>(arr: T[], size: number) => arr.reduce<T[][]>((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);
  const batches = chunk(unique, 40);

  const out: Record<string, { width?: number; height?: number }> = {};
  for (const batch of batches) {
    const q = encodeURIComponent(batch.join(","));
    const resp = await httpRest<{ nodes: Record<string, { document?: any }> }>(`/files/${encodeURIComponent(fileKey)}/nodes?ids=${q}`);
    for (const id of batch) {
      const doc = resp.nodes?.[id]?.document;
      const bb = doc?.absoluteBoundingBox;
      out[id] = { width: bb?.width, height: bb?.height };
    }
  }
  return out;
}

