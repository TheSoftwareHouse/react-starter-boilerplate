import React, { Component, ErrorInfo } from 'react';
import * as Sentry from '@sentry/browser';

import { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.REACT_APP_SENTRY_DSN) {
      Sentry.withScope((scope) => {
        scope.setExtras({ errorInfo });
        Sentry.captureException(error);
      });
    }
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <div>Something went wrong. Implement pretty error page here.</div>;
    }

    return children;
  }
}
