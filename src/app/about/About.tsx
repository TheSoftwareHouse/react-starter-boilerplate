import React from 'react';

import LocationInfo from "components/locationInfo/LocationInfo";

const About: React.FC = () => {
    return (
        <>
            <h2>About</h2>
            <p>This project includes and demonstrates usage of recommended packages and tools:</p>
            <ul>
                <li><a href="https://www.typescriptlang.org/">TypeScript</a> - Typed superset of JavaScript that compiles to plain JavaScript</li>
                <li><a href="https://jestjs.io/">Jest</a> - Delightful JavaScript Testing Framework with a focus on simplicity</li>
                <li><a href="https://github.com/testing-library/react-testing-library">React Testing Library</a> - Simple and complete React DOM testing utilities that encourage good testing practices</li>
                <li><a href="https://github.com/ReactTraining/react-router">React Router</a> - Declarative routing for React</li>
            </ul>
            <hr />
            <LocationInfo />
        </>
    );
};

export default About;