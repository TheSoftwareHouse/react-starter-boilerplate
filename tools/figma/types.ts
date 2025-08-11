/* British English comments: strict typings for Figma JSON, DSL and templates. */

export type FigmaNodeType =
  | "DOCUMENT"
  | "PAGE"
  | "FRAME"
  | "GROUP"
  | "RECTANGLE"
  | "TEXT"
  | "COMPONENT"
  | "INSTANCE"
  | "ELLIPSE"
  | "VECTOR"
  | "LINE";

export interface FigmaRGB {
  r: number; g: number; b: number; a?: number;
}

export type FigmaPaint =
  | {
      type: "SOLID";
      color: FigmaRGB;
      visible?: boolean;
      opacity?: number;
    }
  | {
      type: "GRADIENT_LINEAR";
      gradientStops: Array<{ color: FigmaRGB; position: number }>;
      gradientTransform?: [[number, number, number], [number, number, number]];
      visible?: boolean;
      opacity?: number;
    }
  | {
      type: "IMAGE";
      scaleMode?: "FILL" | "FIT" | "TILE" | "STRETCH";
      imageHash?: string;
      visible?: boolean;
      opacity?: number;
    }
  | {
      // Other paint types can be added as needed
      type: string;
      visible?: boolean;
      opacity?: number;
    };

export interface FigmaEffect {
  type: "DROP_SHADOW" | "INNER_SHADOW" | "LAYER_BLUR" | "BACKGROUND_BLUR";
  radius?: number;
  spread?: number;
  offset?: { x: number; y: number };
  color: FigmaRGB;
  visible?: boolean;
}

export interface FigmaTextStyle {
  fontFamily?: string;
  fontPostScriptName?: string;
  fontWeight?: number;
  fontSize?: number;
  letterSpacing?: number;
  lineHeightPx?: number;
  textAlignHorizontal?: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
  textDecoration?: "NONE" | "UNDERLINE" | "STRIKETHROUGH";
  textCase?: "ORIGINAL" | "UPPER" | "LOWER" | "TITLE";
}

export interface FigmaNode {
  id: string;
  name: string;
  type: FigmaNodeType;
  children?: FigmaNode[];
  // Geometry
  absoluteBoundingBox?: { width: number; height: number; x?: number; y?: number };
  rotation?: number;
  opacity?: number;

  // Fills / strokes / effects
  fills?: FigmaPaint[];
  strokes?: FigmaPaint[];
  strokeWeight?: number;
  strokeAlign?: "INSIDE" | "CENTER" | "OUTSIDE";
  effects?: FigmaEffect[];

  // Corners
  cornerRadius?: number;
  rectangleCornerRadii?: [number, number, number, number];
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomRightRadius?: number;
  bottomLeftRadius?: number;

  // Auto layout
  layoutMode?: "HORIZONTAL" | "VERTICAL" | "NONE";
  itemSpacing?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  primaryAxisAlignItems?: "MIN" | "MAX" | "CENTER" | "SPACE_BETWEEN" | "SPACE_AROUND" | "SPACE_EVENLY";
  counterAxisAlignItems?: "MIN" | "MAX" | "CENTER" | "SPACE_BETWEEN" | "SPACE_AROUND" | "SPACE_EVENLY";

  // Text
  style?: FigmaTextStyle;
  characters?: string;

  // Constraints (optional)
  constraints?: {
    horizontal: "LEFT" | "RIGHT" | "CENTER" | "LEFT_RIGHT" | "SCALE";
    vertical: "TOP" | "BOTTOM" | "CENTER" | "TOP_BOTTOM" | "SCALE";
  };

  // Hints for mapper
  parentLayoutMode?: "HORIZONTAL" | "VERTICAL" | "NONE";
}

export interface FigmaFrameExport {
  name?: string;
  root?: FigmaNode;      // unified field we derive for convenience
  document?: FigmaNode;  // raw Figma 'document' root (if used)
  variables?: Record<string, string | number>;
}
