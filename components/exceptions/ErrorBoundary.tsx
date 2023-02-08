import { Component } from 'react';

import { injectIntl, IntlShape } from 'react-intl';

import { PageTypes } from '@core/constants/navigation';

import PageHeader from '@components/ui/PageHeader';
import ErrorPage from '@components/exceptions/ErrorPage';

type ErrorBoundaryProps = {
  children: React.ReactNode,
  intl: IntlShape,
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
        <>
          <PageHeader
            pageType={PageTypes.error}
            metas={{
              titleId: 'error.metas.title',
              descriptionId: 'error.metas.description',
            }}
            marginTop={true}
          />

          <ErrorPage title={this.props.intl.formatMessage({ id: 'error.h1' })}/>
        </>
      );
    }

    return this.props.children;
  };
};

export default injectIntl(ErrorBoundary);
