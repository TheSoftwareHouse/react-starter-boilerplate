import React from 'react';
import classNames from 'clsx';

import { CodeBlockProps } from './CodeBlock.types';

import './CodeBlock.css';

export const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => (
  <p className={classNames('code-block', className)}>
    <code>{children}</code>
  </p>
);
