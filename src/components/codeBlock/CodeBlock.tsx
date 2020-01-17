import React from 'react';

import { joinClassNames } from 'helpers/joinClassNames/joinClassNames';

import './CodeBlock.css';
import { CodeBlockPropsType } from './CodeBlock.types';

export const CodeBlock: React.FC<CodeBlockPropsType> = ({ className, children, ...rest }) => (
  <p className={joinClassNames('code-block', className)} {...rest}>
    <code>{children}</code>
  </p>
);
