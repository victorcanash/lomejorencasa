import type { NextPage } from 'next'

import Container from '@mui/material/Container'

import { PageTypes } from '@core/constants/navigation'

import usePage from '@core/hooks/usePage'
import PageHeader from '@core/components/pages/PageHeader'
import ConfirmNewEmailForm from '@core/components/forms/auth/ConfirmNewEmailForm'

const NewEmailPage: NextPage = () => {
  usePage()

  return (
    <>
      <PageHeader
        pageType={PageTypes.link}
        metas={{
          titleId: 'newemail.metas.title',
          descriptionId: 'newemail.metas.description',
          noindex: true,
          nofollow: true
        }}
      />

      <Container>
        <ConfirmNewEmailForm />
      </Container>
    </>
  )
}

export default NewEmailPage
