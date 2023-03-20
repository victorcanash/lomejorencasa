import { FormattedMessage } from 'react-intl';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';

import Button from '@mui/material/Button';

import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

type GoogleLoginProps = {
  login: (accessToken: string) => void,
};

const GoogleLogin = (props: GoogleLoginProps) => {
  const { login } = props;

  const onSuccessGoogleLogin = (tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
    onSuccessAuth(tokenResponse.access_token);
  };

  const onErrorGoogleLogin = (errorResponse: Pick<TokenResponse, "error" | "error_description" | "error_uri">) => {
    const errorMsg = getBackendErrorMsg('SDK Google OAuth2 ERROR', errorResponse);
    logBackendError(errorMsg);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: onSuccessGoogleLogin,
    onError: onErrorGoogleLogin,
    flow: 'implicit',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  });

  const onSuccessAuth = (accessToken: string) => {
    login(accessToken);
  };

  return (
    <Button onClick={() => handleGoogleLogin()}>
      <FormattedMessage id="forms.login.googleBtn" />
    </Button>
  );
};

export default GoogleLogin;
