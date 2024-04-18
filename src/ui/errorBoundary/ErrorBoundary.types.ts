import {
  ErrorBoundaryProps as ReactErrorBoundaryProps,
  FallbackProps as ErrorBoundaryFallbackProps,
} from 'react-error-boundary';

export type ErrorBoundaryProps = ReactErrorBoundaryProps & {
  shouldLog?: boolean;
};

export type FallbackProps = ErrorBoundaryFallbackProps;
