import { Component } from 'react';

import ErrorUI from '@components/ui/Error';

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
        <ErrorUI title='An error has ocurred' />
      );
    }

    return this.props.children;
  };
};

export default ErrorBoundary;
