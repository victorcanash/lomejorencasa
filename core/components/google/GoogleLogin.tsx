import { GoogleLogin as ApiGoogleLogin, type CredentialResponse } from '@react-oauth/google'

import { getBackendErrorMsg, logBackendError } from '@core/utils/errors'

interface GoogleLoginProps {
  login: (accessToken: string) => void
}

const GoogleLogin = (props: GoogleLoginProps) => {
  const { login } = props

  const onSuccessGoogleLogin = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential != null) {
      onSuccessAuth(credentialResponse.credential)
    } else {
      onErrorGoogleLogin(new Error('Empty credentials'))
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onErrorGoogleLogin = (error?: any) => {
    const errorMsg = getBackendErrorMsg('SDK Google OAuth2 ERROR', (Boolean(error)) || new Error())
    logBackendError(errorMsg)
  }

  const onSuccessAuth = (accessToken: string) => {
    login(accessToken)
  }

  return (
    <ApiGoogleLogin
      onSuccess={onSuccessGoogleLogin}
      onError={onErrorGoogleLogin}
      locale="es"
    />
  )
}

export default GoogleLogin
