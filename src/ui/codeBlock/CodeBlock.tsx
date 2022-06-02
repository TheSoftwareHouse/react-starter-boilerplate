import classNames from 'clsx';

import { CodeBlockProps } from './CodeBlock.types';

import './CodeBlock.css';

export const CodeBlock = ({ className, children }: CodeBlockProps) => (
  <p className={classNames('code-block', className)}>
    <code>{children}</code>
  </p>
);
