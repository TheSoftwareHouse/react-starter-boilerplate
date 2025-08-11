# Figma to React Generator

Custom system for generating high-quality React components from Figma designs.

## Installation

The system is already configured in the project. No external dependencies needed - it uses our custom built tools:
- `tools/figma/advanced-mapper.ts` - Figma to React conversion
- `tools/figma/code-generator.ts` - TypeScript/JSX code generation
- `tools/figma/figmaClient.ts` - Figma API client

## Usage

### Basic Command

```bash
pnpm figma:builder --url "FIGMA_URL" --feature FEATURE_NAME --name COMPONENT_NAME
```

### Examples

```bash
# With Figma URL
pnpm figma:builder \
  --url "https://www.figma.com/design/GhUCE2ZLNtDvUSVOa4w0Xg/FoodBlog--Admin-dashboard?node-id=83-50804" \
  --feature dashboard \
  --name HeaderComponent

# With fileKey and query
pnpm figma:builder \
  --file GhUCE2ZLNtDvUSVOa4w0Xg \
  --query "thumbnail|preview" \
  --feature ui \
  --name PreviewCard

# With specific sectionId
pnpm figma:builder \
  --file GhUCE2ZLNtDvUSVOa4w0Xg \
  --sectionId "1:2" \
  --feature components \
  --name ThumbnailCard

# With page and section
pnpm figma:builder \
  --file GhUCE2ZLNtDvUSVOa4w0Xg \
  --page "GOB-98 / Admin's dashboard" \
  --section "stats" \
  --feature dashboard \
  --name StatsWidget
```

## Options

| Option | Description | Example |
|-------|------|----------|
| `--url` | Full Figma URL (extracts fileKey and node-id) | `--url "https://figma.com/design/abc123?node-id=1-2"` |
| `--file` | File key from Figma | `--file GhUCE2ZLNtDvUSVOa4w0Xg` |
| `--page` | Page name (CANVAS) in Figma | `--page "Dashboard"` |
| `--section` | Frame/component name to export | `--section "Header"` |
| `--sectionId` | Frame ID (skips name search) | `--sectionId "1:2"` |
| `--query` | Search pattern (supports 'a\|b\|c') | `--query "card\|widget"` |
| `--feature` | **Required** - feature folder | `--feature dashboard` |
| `--name` | **Required** - component name | `--name HeaderComponent` |
| `--outDir` | Output directory | `--outDir src/features` (default) |

## What It Generates

The system generates a complete component structure:

```
src/features/{feature}/components/{ComponentName}/
├── ComponentName.tsx        # React component with TypeScript
├── ComponentName.css        # CSS styles with exact values from Figma
├── ComponentName.stories.tsx # Storybook story
└── ComponentName.test.tsx   # Unit test
```

### Additional Files

- **Route**: `src/routes/{feature}-{ComponentName}/index.tsx` - automatic routing
- **Export**: updates `src/features/{feature}/components/index.ts`

## Features

### 🎨 Precise Style Conversion
- Precise dimensions from Figma (px, rem)
- RGB/RGBA colours with opacity
- Linear gradients
- Shadows (box-shadow)
- Border radius
- Typography (font-size, weight, line-height)

### 🧩 Intelligent Components
- Automatic component type detection (Button, Input, Card, etc.)
- Semantic JSX elements
- Tailwind classes for layout
- Custom CSS classes for detailed styles

### 📱 Responsiveness
- Flex layouts from Figma
- Gap, padding, margin
- Alignment (justify-content, align-items)
- Breakpoints (can be extended)

### ♿ Accessibility
- Semantic HTML
- Alt texts for images
- ARIA attributes (in development)
- Focus management (in development)

## Frame Search Strategy

The system automatically finds the best frame for conversion:

1. **Exact sectionId** - if `--sectionId` is provided, uses it directly
2. **Exact section name** - exact name matching
3. **Query/loose match** - fuzzy search with scoring:
   - Exact match: 100 points
   - Contains term: 50 points  
   - Word contains term: 25 points
4. **Biggest frame** - if nothing matches, takes the largest

## Configuration

### Environment Variables

```env
FIGMA_API_TOKEN=your_figma_token_here
```

### Configuration

The generator is fully configured via CLI parameters - no config files needed:

- `--url`: Full Figma URL (extracts fileKey and node-id automatically)
- `--feature`: Target feature folder (e.g., 'dashboard')  
- `--name`: Component name (e.g., 'StatsGrid')

The generator automatically uses:
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with generated CSS files
- **Output**: Barrel exports, Storybook stories, and tests
```

## Examples of Generated Components

### Simple Component

```tsx
import React from 'react';
import './HeaderComponent.css';

interface HeaderComponentProps {
  className?: string;
  children?: React.ReactNode;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ className = "", ...props }) => {
  return (
    <div className="flex flex-row justify-between items-center figma-abc123">
      <h1 className="text-2xl font-bold figma-def456">Dashboard</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded figma-ghi789">
        Settings
      </button>
    </div>
  );
};

export default HeaderComponent;
export { HeaderComponent };
```

### CSS with Precise Styles

```css
.figma-abc123 {
  width: 1200px;
  height: 80px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px 24px;
}

.figma-def456 {
  font-size: 28px;
  font-weight: 700;
  line-height: 34px;
  color: rgb(31, 41, 55);
}
```

## Troubleshooting

### Incorrect Styles
- Check if the frame has all necessary properties in Figma
- Ensure the design doesn't use library components (e.g., Safari toolbar)

### Missing Frames
- Check available pages: the system will display a list if none found
- Use `--query` with alternatives: `--query "card|widget|component"`

### API Errors
- Check if `FIGMA_API_TOKEN` is correct
- Ensure you have access to the Figma file

## Comparison with Other Tools

| Feature | Our Generator | Builder.io Visual Copilot | Figma Dev Mode |
|---------|---------------|---------------------------|----------------|
| Style Accuracy | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Automation | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Customisation | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| TypeScript | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Tailwind Integration | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Free Usage | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| CLI Automation | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐ |

## Development

The system can be extended with:
- More CSS frameworks (styled-components, emotion)
- Advanced component detection patterns
- Image optimization and conversion
- Animation and interaction conversion
- Design tokens extraction and generation
- Better responsive breakpoint handling
