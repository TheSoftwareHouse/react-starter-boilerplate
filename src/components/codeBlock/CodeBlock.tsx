import React from "react";

import joinClassNames from "helpers/joinClassNames/joinClassNames";

import "./CodeBlock.css";
import { PropsType } from "./CodeBlock.types";

const CodeBlock: React.FC<PropsType> = ({ className, children, ...rest }) => (
    <p className={joinClassNames('CodeBlock', className)} {...rest}>
        <code>{children}</code>
    </p>
);

export default CodeBlock;