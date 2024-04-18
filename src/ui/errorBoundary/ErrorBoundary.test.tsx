import { render, screen } from '@testing-library/react';

import { logger } from 'integrations/logger';

import { ErrorBoundary } from './ErrorBoundary';

const logErrorSpy = vitest.spyOn(logger, 'error');

const ErrorComponent = ({ shouldError = true }: { shouldError?: boolean }) => {
  if (shouldError) {
    throw new Error('error');
  }
  return <div>no error</div>;
};

describe('ErrorBoundary', () => {
  it('should show fallback component and log error via logger', () => {
    render(
      <ErrorBoundary fallback={<div>error</div>}>
        <ErrorComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('error')).toBeInTheDocument();
    expect(logErrorSpy).toHaveBeenCalledTimes(1);
  });

  it('should not log error when shouldLog = false', () => {
    render(
      <ErrorBoundary shouldLog={false} fallback={<div>error</div>}>
        <ErrorComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('error')).toBeInTheDocument();
    expect(logErrorSpy).not.toBeCalled();
  });

  it('should show children content when there is no error', () => {
    render(
      <ErrorBoundary fallback={<div>error</div>}>
        <ErrorComponent shouldError={false} />
      </ErrorBoundary>,
    );

    expect(screen.getByText('no error')).toBeInTheDocument();
    expect(logErrorSpy).not.toBeCalled();
  });
});
