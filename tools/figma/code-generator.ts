
// tools/figma/code-generator.ts
import type { ComponentMapping } from './advanced-mapper';

interface GeneratedCode {
  component: string;
  styles: string;
  types?: string;
}

/**
 * Generate React component code from a ComponentMapping tree.
 * This generator assumes styles have already been emitted by the advanced mapper
 * as CSS classes. We only reference the provided class names and import the CSS file.
 */
export function generateReactComponent(
  mapping: ComponentMapping,
  componentName: string,
  config: { typescript: boolean; cssModules: boolean } = { typescript: true, cssModules: false }
): GeneratedCode {
  const { typescript, cssModules } = config;

  const imports = generateImports(mapping, componentName, cssModules, typescript);
  const typesCode = typescript ? generateTypesCode(mapping, componentName) : '';
  const componentCode = generateComponentCode(mapping, componentName, typescript, cssModules);

  // Styles are produced by the advanced mapper (cssText). We return an empty string here.
  return {
    component: [imports, typesCode, componentCode].filter(Boolean).join('\n\n'),
    styles: ''
  };
}

function generateImports(
  mapping: ComponentMapping,
  componentName: string,
  cssModules: boolean,
  typescript: boolean
): string {
  const imports = [`import React from 'react';`];

  if (cssModules) {
    imports.push(`import styles from './${componentName}.module.css';`);
  } else {
    imports.push(`import './${componentName}.css';`);
  }

  return imports.join('\n');
}

function generateTypesCode(mapping: ComponentMapping, componentName: string): string {
  const props = extractAllProps(mapping);
  const propTypes = Object.entries(props)
    .filter(([key]) => !key.includes('-') && key !== 'data-figma-id' && key !== 'children')
    .map(([key, value]) => {
      const type = inferTypeFromValue(value);
      return `  ${key}?: ${type};`;
    })
    .join('\n');

  return `interface ${componentName}Props {
${propTypes}
  className?: string;
  children?: React.ReactNode;
}`;
}

function generateComponentCode(
  mapping: ComponentMapping,
  componentName: string,
  typescript: boolean,
  cssModules: boolean
): string {
  const propsType = typescript ? `: React.FC<${componentName}Props>` : '';
  const propsParam = typescript ? '{ className = "", ...props }' : 'props';
  const propsDestruct = typescript ? '' : 'const { className = "", ...restProps } = props;';

  const jsx = generateJSXElement(mapping, 0, cssModules, componentName.toLowerCase());

  return `const ${componentName}${propsType} = (${propsParam}) => {
  ${propsDestruct}
  return (
${jsx}
  );
};

export default ${componentName};
export { ${componentName} };`;
}

function generateJSXElement(mapping: ComponentMapping, depth: number, cssModules: boolean, rootTestId?: string): string {
  const indent = '  '.repeat(depth + 2);
  const { component, props, children, className } = mapping;

  const elementType = mapComponentToJSX(component);

  // Filter out data-figma-id from props and use it as comment
  const cleanProps = { ...props } as Record<string, unknown>;
  const figmaId = (cleanProps as any)['data-figma-id'];
  delete (cleanProps as any)['data-figma-id'];

  const propsString = generatePropsString(cleanProps, className, cssModules, depth === 0 ? rootTestId : undefined);

  const comment = figmaId ? `${indent}{/* figma-id: ${figmaId} */}\n` : '';

  if (!children || children.length === 0) {
    const text = typeof (cleanProps as any).children === 'string' ? (cleanProps as any).children as string : '';
    if (text) {
      return `${comment}${indent}<${elementType}${propsString}>${escapeJsx(text)}</${elementType}>`;
    }
    return `${comment}${indent}<${elementType}${propsString} />`;
  }

  const inner = children.map(child => generateJSXElement(child, depth + 1, cssModules)).join('\n');
  return `${comment}${indent}<${elementType}${propsString}>\n${inner}\n${indent}</${elementType}>`;
}

function mapComponentToJSX(componentType: string): string {
  if (componentType === 'Button') return 'button';
  if (componentType === 'Input') return 'input';
  if (componentType === 'Text') return 'p';
  if (componentType === 'Heading') return 'h2';
  if (componentType === 'Image') return 'img';
  if (componentType === 'Navigation') return 'nav';
  if (componentType === 'Card') return 'div';
  if (componentType === 'Container') return 'div';
  return 'div';
}

function generatePropsString(props: Record<string, unknown>, cls: string | undefined, cssModules: boolean, testId?: string): string {
  const entries: string[] = [];

  if (testId) { entries.push(`data-testid="${testId}"`); }

  // className first
  if (cls) {
    entries.push(cssModules ? `className={styles['${cls}']}` : `className="${cls}"`);
  }

  for (const [key, value] of Object.entries(props)) {
    if (key === 'children') continue;

    if (typeof value === 'string') {
      entries.push(`${key}="${escapeHtmlAttr(value)}"`);
      continue;
    }
    if (typeof value === 'boolean') {
      if (value) entries.push(key);
      continue;
    }
    entries.push(`${key}={${JSON.stringify(value)}}`);
  }

  return entries.length ? ' ' + entries.join(' ') : '';
}

function escapeHtmlAttr(value: string): string {
  return value.replace(/"/g, '&quot;');
}

function escapeJsx(value: string): string {
  return value
    .replace(/\{/g, '{'{'}')
    .replace(/\}/g, '{'}'}');
}

function extractAllProps(mapping: ComponentMapping): Record<string, unknown> {
  const all = { ...mapping.props };
  if (!mapping.children?.length) return all;
  for (const child of mapping.children) {
    Object.assign(all, extractAllProps(child));
  }
  return all;
}

function inferTypeFromValue(value: unknown): string {
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  if (Array.isArray(value)) return 'unknown[]';
  if (value && typeof value === 'object') return 'Record<string, unknown>';
  return 'unknown';
}
