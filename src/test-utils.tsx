// see https://testing-library.com/docs/react-testing-library/setup#custom-render
import React from 'react';
import { MemoryRouter as Router } from "react-router-dom";
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { Queries } from "@testing-library/dom";

const wrapper: React.FC = ({ children }) => {
    return (
        <Router>
            {children}
        </Router>
    )
};

function customRender(ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult;
function customRender<Q extends Queries>(ui: React.ReactElement, options: RenderOptions<Q>): RenderResult<Q>;
function customRender<Q extends Queries>(ui: React.ReactElement, options?: RenderOptions<Q> | Omit<RenderOptions, 'queries'>): RenderResult<Q> | RenderResult {
    return render<Q>(ui, { wrapper: options?.wrapper ?? wrapper, ...options })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }