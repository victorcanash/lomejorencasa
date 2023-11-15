import type { GetServerSideProps } from 'next'

import { activateUser } from '@core/utils/auth'

export interface ActivationProps {
  successMsg: string
  errorMsg: string
}

export const getActivationProps: GetServerSideProps = async (context) => {
  const { token } = context.query
  const tokenSearch = typeof token === 'string' ? token : ''

  let result: { props: ActivationProps } | { notFound: boolean } = { props: { successMsg: '', errorMsg: '' } }

  await activateUser(tokenSearch).then(() => {
    result = {
      props: {
        successMsg: 'Succeeded',
        errorMsg: ''
      }
    }
  }).catch((error: Error) => {
    const errorMsg = error.message
    result = {
      props: {
        successMsg: '',
        errorMsg
      }
    }
  })

  return result
}
