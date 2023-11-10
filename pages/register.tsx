import type { NextPage } from 'next'

import Container from '@mui/material/Container'

import { PageTypes } from '@core/constants/navigation'

import usePage from '@core/hooks/usePage'
import PageHeader from '@core/components/pages/PageHeader'
import RegisterForm from '@core/components/forms/auth/RegisterForm'

const RegisterPage: NextPage = () => {
  usePage()

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'register.metas.title',
          descriptionId: 'register.metas.description',
          noindex: true,
          nofollow: true
        }}
        marginTop={true}
      />

      <Container>
        <RegisterForm />
      </Container>
    </>
  )
}

export default RegisterPage
