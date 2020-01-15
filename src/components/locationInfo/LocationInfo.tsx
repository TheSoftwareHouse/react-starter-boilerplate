import React from "react";
import { useLocation } from "react-router-dom";

import CodeBlock from "components/codeBlock/CodeBlock";

const LocationInfo: React.FC = () => {
    const location = useLocation();

    return (
        <div>
            <p>Current location (provided by <a href="https://reacttraining.com/react-router/web/api/Hooks/uselocation"><code>useLocation</code></a> hook):</p>
            <CodeBlock>{JSON.stringify(location)}</CodeBlock>
        </div>
    );
};

export default LocationInfo;