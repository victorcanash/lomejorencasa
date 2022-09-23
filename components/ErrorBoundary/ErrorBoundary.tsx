import { Component } from 'react';

import ErrorPage from '@components/ui/ErrorPage';

type ErrorBoundaryProps = {
  children: React.ReactNode,
};

type ErrorBoundaryState = {
  hasError: boolean,
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage title='An error has ocurred' />
      );
    }

    return this.props.children;
  };
};

export default ErrorBoundary;
