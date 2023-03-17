import { FormattedMessage } from 'react-intl';
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';

import Button from '@mui/material/Button';

import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

type GoogleLoginProps = {
  onSuccessAuth: (code: string) => void,
};

const GoogleLogin = (props: GoogleLoginProps) => {
  const { onSuccessAuth } = props;

  const onSuccessGoogleLogin = (codeResponse: Omit<CodeResponse, "error" | "error_description" | "error_uri">) => {
    onSuccessAuth(codeResponse.code)
  };

  const onErrorGoogleLogin = (errorResponse: Pick<CodeResponse, "error" | "error_description" | "error_uri">) => {
    const errorMsg = getBackendErrorMsg('SDK Google OAuth2 ERROR', errorResponse);
    logBackendError(errorMsg);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: onSuccessGoogleLogin,
    onError: onErrorGoogleLogin,
    flow: 'auth-code',
    ux_mode: 'popup',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  });

  return (
    <Button onClick={handleGoogleLogin}>
      <FormattedMessage id="forms.login.googleBtn" />
    </Button>
  );
};

export default GoogleLogin;
