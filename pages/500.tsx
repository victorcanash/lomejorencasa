import type { NextPage } from 'next'

import { useIntl } from 'react-intl'

import { PageTypes } from '@core/constants/navigation'

import usePage from '@core/hooks/usePage'
import PageHeader from '@core/components/pages/PageHeader'
import ErrorView from '@core/components/exceptions/ErrorView'

const ErrorPage: NextPage = () => {
  const intl = useIntl()

  usePage()

  return (
    <>
      <PageHeader
        pageType={PageTypes.error}
        metas={{
          titleId: 'error.metas.title',
          descriptionId: 'error.metas.description',
          noindex: true,
          nofollow: true
        }}
        marginTop={true}
      />

      <ErrorView title={intl.formatMessage({ id: 'error.h1' })} />
    </>
  )
}

export default ErrorPage
