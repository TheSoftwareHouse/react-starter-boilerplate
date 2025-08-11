// tools/figma/advanced-mapper.ts
/* British English comments only */

import type { FigmaNode, FigmaPaint, FigmaEffect, FigmaTextStyle } from './types';

export interface ComponentMapping {
  component: string;
  props: Record<string, unknown>;
  className: string;
  children?: ComponentMapping[];
}

type CssDecls = Record<string, string>;
type CssBucket = Map<string, CssDecls>; // className -> CSS declarations

// ---------- Utilities (pure) ----------

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

const round = (v: number, p: number = 2): number => {
  const m = 10 ** p;
  return Math.round(v * m) / m;
};

const toPx = (v: number): string => `${round(v, 2)}px`;

const toRem = (v: number): string => `${round(v / 16, 3)}rem`;

const rgb255 = (c: { r: number; g: number; b: number; a?: number }): string => {
  const r = Math.round(clamp01(c.r) * 255);
  const g = Math.round(clamp01(c.g) * 255);
  const b = Math.round(clamp01(c.b) * 255);
  const a = c.a === undefined ? 1 : clamp01(c.a);
  return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
};

const figmaLetterSpacingToCSS = (v: number | undefined): string | undefined => {
  if (v === undefined) return undefined;
  return `${round(v, 2)}px`; // Figma provides px for letterSpacing in many exports
};

const mapAlign = (a?: 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN' | 'SPACE_AROUND' | 'SPACE_EVENLY'):
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | undefined => {
  if (!a) return undefined;
  if (a === 'MIN') return 'flex-start';
  if (a === 'MAX') return 'flex-end';
  if (a === 'CENTER') return 'center';
  if (a === 'SPACE_BETWEEN') return 'space-between';
  if (a === 'SPACE_AROUND') return 'space-around';
  if (a === 'SPACE_EVENLY') return 'space-evenly';
  return undefined;
};

const figmaLinearGradient = (paint: Extract<FigmaPaint, { type: 'GRADIENT_LINEAR' }>): string | undefined => {
  const stops = paint.gradientStops?.map(s => `${rgb255(s.color)} ${Math.round(clamp01(s.position) * 100)}%`);
  if (!stops?.length) return undefined;

  // Angle approx from transform (fallback 0deg)
  const t = paint.gradientTransform;
  const angle = t?.[1]?.[0] !== undefined && t?.[0]?.[0] !== undefined
    ? Math.atan2(t[1][0], t[0][0]) * (180 / Math.PI)
    : 0;

  return `linear-gradient(${Math.round(angle)}deg, ${stops.join(', ')})`;
};

const effectToShadow = (e: FigmaEffect): string | undefined => {
  if (e.type !== 'DROP_SHADOW' && e.type !== 'INNER_SHADOW') return undefined;
  if (e.visible === false) return undefined;

  const x = toPx(e.offset?.x ?? 0);
  const y = toPx(e.offset?.y ?? 0);
  const blur = toPx(e.radius ?? 0);
  const spread = e.spread ? toPx(e.spread) : toPx(0);
  const col = rgb255(e.color);
  const inset = e.type === 'INNER_SHADOW' ? ' inset' : '';
  return `${x} ${y} ${blur} ${spread} ${col}${inset}`;
};

// Generate deterministic, readable class names
const toClassName = (node: FigmaNode, suffix?: string): string => {
  const base = node.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'node';
  const shortId = node.id.replace(/[^a-z0-9]/gi, '').slice(-6).toLowerCase();
  return suffix ? `${base}-${suffix}-${shortId}` : `${base}-${shortId}`;
};

// ---------- Style extraction (no inline usage later) ----------

const extractBackground = (fills?: FigmaPaint[]): CssDecls => {
  if (!fills?.length) return {};
  // First visible paint wins for now
  const p = fills.find(f => (f.visible ?? true) === true);
  if (!p) return {};

  if (p.type === 'SOLID') return { 'background-color': rgb255(p.color) };
  if (p.type === 'GRADIENT_LINEAR') {
    const g = figmaLinearGradient(p);
    return g ? { background: g } : {};
  }
  // TODO: support RADIAL, ANGULAR, DIAMOND
  return {};
};

const extractStroke = (node: FigmaNode): CssDecls => {
  const strokes = node.strokes?.filter(s => (s.visible ?? true) === true) ?? [];
  if (!strokes.length) return {};
  const s = strokes[0];
  const width = node.strokeWeight ?? 1;
  const color = s.type === 'SOLID' ? rgb255(s.color) : undefined;
  if (!color) return {};
  const align = node.strokeAlign ?? 'INSIDE';
  // CSS has only centre/inside via outline tricks; we approximate:
  return align === 'OUTSIDE'
    ? { 'outline': `${toPx(width)} solid ${color}` }
    : { 'border': `${toPx(width)} solid ${color}` }; // INSIDE/CENTER approximated
};

const extractRadii = (node: FigmaNode): CssDecls => {
  // Prefer per-corner radii
  const tl = node.rectangleCornerRadii?.[0] ?? node.topLeftRadius ?? node.cornerRadius;
  const tr = node.rectangleCornerRadii?.[1] ?? node.topRightRadius ?? node.cornerRadius;
  const br = node.rectangleCornerRadii?.[2] ?? node.bottomRightRadius ?? node.cornerRadius;
  const bl = node.rectangleCornerRadii?.[3] ?? node.bottomLeftRadius ?? node.cornerRadius;
  if ([tl, tr, br, bl].every(v => v === undefined)) return {};
  const toVal = (v?: number): string => toPx(v ?? 0);
  return { 'border-radius': `${toVal(tl)} ${toVal(tr)} ${toVal(br)} ${toVal(bl)}` };
};

const extractShadows = (effects?: FigmaEffect[]): CssDecls => {
  if (!effects?.length) return {};
  const shadows = effects
    .map(effectToShadow)
    .filter((s): s is string => Boolean(s))
    .join(', ');
  return shadows ? { 'box-shadow': shadows } : {};
};

const extractOpacityBlend = (node: FigmaNode): CssDecls => {
  const out: CssDecls = {};
  if (node.opacity !== undefined && node.opacity < 1) out.opacity = `${round(node.opacity, 3)}`;
  // Optional: mix-blend-mode mapping from node.blendMode if provided
  return out;
};

const extractTypography = (node: FigmaNode): CssDecls => {
  if (node.type !== 'TEXT' || !node.style) return {};
  const s = node.style as FigmaTextStyle;
  const out: CssDecls = {};
  if (s.fontFamily) out['font-family'] = `'${s.fontFamily}', system-ui, sans-serif`;
  if (s.fontSize) out['font-size'] = toRem(s.fontSize); // rems for scalability
  if (s.fontWeight) out['font-weight'] = String(s.fontWeight);
  if (s.letterSpacing !== undefined) {
    const ls = figmaLetterSpacingToCSS(s.letterSpacing);
    if (ls) out['letter-spacing'] = ls;
  }
  if (s.lineHeightPx) out['line-height'] = toPx(s.lineHeightPx);
  if (s.textAlignHorizontal) out['text-align'] = s.textAlignHorizontal.toLowerCase();
  if (s.textDecoration === 'UNDERLINE') out['text-decoration'] = 'underline';
  if (s.textDecoration === 'STRIKETHROUGH') out['text-decoration'] = 'line-through';
  if (s.textCase === 'UPPER') out['text-transform'] = 'uppercase';
  if (s.textCase === 'LOWER') out['text-transform'] = 'lowercase';
  if (s.textCase === 'TITLE') out['text-transform'] = 'capitalize';
  return out;
};

const extractLayout = (node: FigmaNode): CssDecls => {
  // Auto Layout
  if (node.layoutMode === 'HORIZONTAL' || node.layoutMode === 'VERTICAL') {
    const out: CssDecls = { display: 'flex', 'flex-direction': node.layoutMode === 'HORIZONTAL' ? 'row' : 'column' };
    if (node.itemSpacing) out.gap = toPx(node.itemSpacing);
    const j = mapAlign((node as any).primaryAxisAlignItems);
    const a = mapAlign((node as any).counterAxisAlignItems);
    if (j) out['justify-content'] = j;
    if (a) out['align-items'] = a;
    // Padding
    const pt = node.paddingTop ?? 0;
    const pr = node.paddingRight ?? 0;
    const pb = node.paddingBottom ?? 0;
    const pl = node.paddingLeft ?? 0;
    if (pt || pr || pb || pl) out.padding = `${toPx(pt)} ${toPx(pr)} ${toPx(pb)} ${toPx(pl)}`;
    return out;
  }

  // Absolute positioned frames/groups
  if (node.children?.length) return { position: 'relative' };

  return {};
};

const extractSizeAndPosition = (node: FigmaNode): CssDecls => {
  const out: CssDecls = {};
  const bb = node.absoluteBoundingBox;
  if (bb?.width) out.width = toPx(bb.width);
  if (bb?.height) out.height = toPx(bb.height);

  // Constraints (absolute children)
  if (node.constraints && node.parentLayoutMode === 'NONE') {
    // Optional: implement left/top/right/bottom from relative transform if needed
  }
  return out;
};

// Merge CSS dicts (later values override earlier)
const mergeCss = (...arr: CssDecls[]): CssDecls =>
  arr.reduce((acc, obj) => {
    Object.keys(obj).forEach(k => (acc[k] = obj[k]));
    return acc;
  }, {} as CssDecls);

// ---------- Component detection ----------

const detectComponentType = (node: FigmaNode): string => {
  const name = node.name.toLowerCase();

  if (name.includes('button') || name.includes('btn')) return 'Button';
  if (name.includes('input') || name.includes('textfield') || name.includes('field')) return 'Input';
  if (name.includes('card') || node.effects?.some(e => e.type === 'DROP_SHADOW')) return 'Card';
  if (name.includes('nav') || name.includes('menu') || name.includes('header')) return 'Navigation';
  if (node.type === 'TEXT') {
    if (name.includes('heading') || name.includes('title') || name.includes('h1') || name.includes('h2')) return 'Heading';
    return 'Text';
  }
  if (node.type === 'RECTANGLE' && node.fills?.some(f => f.type === 'IMAGE')) return 'Image';
  if (node.children?.length) return 'Container';
  return 'Div';
};

// ---------- Public API ----------

export interface ConvertResult {
  tree: ComponentMapping;
  cssText: string; // CSS to persist (e.g. .module.css or global)
}

/**
 * Convert a Figma node to a React component tree and emitted CSS classes.
 * No inline styles are produced; everything goes into generated classes.
 */
export function convertToReactComponent(node: FigmaNode): ConvertResult {
  const css = new CssBucket();
  const tree = toComponent(node, css);
  const cssText = serialiseCss(css);
  return { tree, cssText };
}

// ---------- Internal traversal ----------

const toComponent = (node: FigmaNode, css: CssBucket): ComponentMapping => {
  const componentType = detectComponentType(node);
  const className = toClassName(node);

  // Collect CSS for this node
  const style = mergeCss(
    extractSizeAndPosition(node),
    extractBackground(node.fills),
    extractStroke(node),
    extractRadii(node),
    extractShadows(node.effects),
    extractOpacityBlend(node),
    extractTypography(node),
    extractLayout(node)
  );

  if (Object.keys(style).length) css.set(`.${className}`, style);

  const children = node.children?.map(child => toComponent(child, css));

  const props = buildProps(node, componentType);

  return { component: componentType, props, className, children };
};

const buildProps = (node: FigmaNode, componentType: string): Record<string, unknown> => {
  // Early return per type; no else chains
  if (componentType === 'Text' || componentType === 'Heading') {
    const p: Record<string, unknown> = { id: node.id, 'data-figma-id': node.id };
    if (node.characters) p.children = node.characters;
    return p;
  }

  if (componentType === 'Button') {
    const p: Record<string, unknown> = { id: node.id, 'data-figma-id': node.id, type: 'button' };
    if (node.characters) p.children = node.characters;
    return p;
  }

  if (componentType === 'Input') {
    return { id: node.id, 'data-figma-id': node.id, type: 'text', placeholder: node.name };
  }

  if (componentType === 'Image') {
    return { id: node.id, 'data-figma-id': node.id, alt: node.name, src: '/placeholder-image.jpg' };
  }

  return { id: node.id, 'data-figma-id': node.id };
};

const serialiseCss = (bucket: CssBucket): string => {
  // Branchless-ish build
  const parts: string[] = [];
  bucket.forEach((decls, selector) => {
    const lines = Object.entries(decls).map(([k, v]) => `  ${k}: ${v};`);
    parts.push(`${selector} {\n${lines.join('\n')}\n}`);
  });
  return parts.join('\n\n');
};

export type { CssDecls };
