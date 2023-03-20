import { GoogleLogin as ApiGoogleLogin, CredentialResponse } from '@react-oauth/google';

import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

type GoogleLoginProps = {
  login: (accessToken: string) => void,
};

const GoogleLogin = (props: GoogleLoginProps) => {
  const { login } = props;

  const onSuccessGoogleLogin = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      onSuccessAuth(credentialResponse.credential);
    } else {
      onErrorGoogleLogin(new Error('Empty credentials'));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onErrorGoogleLogin = (error?: any) => {
    const errorMsg = getBackendErrorMsg('SDK Google OAuth2 ERROR', error || new Error());
    logBackendError(errorMsg);
  };

  const onSuccessAuth = (accessToken: string) => {
    login(accessToken);
  };

  return (
    <ApiGoogleLogin
      onSuccess={onSuccessGoogleLogin}
      onError={onErrorGoogleLogin}
      locale="es"
    />
  );
};

export default GoogleLogin;
