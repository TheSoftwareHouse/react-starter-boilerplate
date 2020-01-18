import React from 'react';
import classNames from 'clsx';

import './CodeBlock.css';
import { CodeBlockPropsType } from './CodeBlock.types';

export const CodeBlock: React.FC<CodeBlockPropsType> = ({ className, children, ...rest }) => (
  <p className={classNames('code-block', className)} {...rest}>
    <code>{children}</code>
  </p>
);
