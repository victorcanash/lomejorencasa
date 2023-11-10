import type { NextPage } from 'next'

import Container from '@mui/material/Container'

import { PageTypes } from '@core/constants/navigation'

import { type ActivationProps, getActivationProps } from '@core/serverPages/activation'
import usePage from '@core/hooks/usePage'
import PageHeader from '@core/components/pages/PageHeader'
import ActivationForm from '@core/components/forms/auth/ActivationForm'

const ActivationPage: NextPage<ActivationProps> = (props) => {
  const { successMsg, errorMsg } = props

  usePage()

  return (
    <>
      <PageHeader
        pageType={PageTypes.link}
        metas={{
          titleId: 'activation.metas.title',
          descriptionId: 'activation.metas.description',
          noindex: true,
          nofollow: true
        }}
      />

      <Container>
        <ActivationForm
          successMsg={successMsg}
          errorMsg={errorMsg}
        />
      </Container>
    </>
  )
}

export default ActivationPage

export const getServerSideProps = getActivationProps
