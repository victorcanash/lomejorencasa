import type { NextPage } from 'next'

import { PageTypes } from '@core/constants/navigation'

import usePage from '@core/hooks/usePage'
import PageHeader from '@core/components/pages/PageHeader'
import ResendActivation from '@core/components/auth/ResendActivation'

const ResendActivationPage: NextPage = () => {
  usePage()

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'login.metas.title',
          descriptionId: 'login.metas.description',
          noindex: true,
          nofollow: true
        }}
        marginTop={true}
      />

      <ResendActivation />
    </>
  )
}

export default ResendActivationPage
