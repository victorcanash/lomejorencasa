/*import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';*/
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { FormFieldTypes } from '@core/constants/forms';
import type { AuthLogin } from '@core/types/auth';

import { pages } from '@lib/config/navigation.config';
// import { useAppContext } from '@lib/contexts/AppContext';
import useForms from '@lib/hooks/useForms';
import useAuth from '@lib/hooks/useAuth';
import BaseForm from '@core/components/forms/BaseForm';
// import GoogleLogin from '@components/google/GoogleLogin';

const LoginForm = () => {
  // const { initialized } = useAppContext();

  const { loginFormValidation, userFieldsInitValues } = useForms();
  const { login, /*loginGoogle, */errorMsg } = useAuth();

  const handleSubmit = async (values: AuthLogin) => {
    login(values);
  };

  const maxWidth = '500px';

  return (
    <>
      <BaseForm
        maxWidth={maxWidth}
        initialValues={{
          email: userFieldsInitValues.email,
          password: userFieldsInitValues.password,
          remember: userFieldsInitValues.remember,
        } as AuthLogin}
        validationSchema={loginFormValidation}
        formFieldGroups={[
          {
            avatarIcon: <LockOutlinedIcon />,
            titleTxt: {
              id: 'forms.login.title',
            },
            formFields: [
              {
                name: 'email',
                type: FormFieldTypes.text,
                required: true,
              },
              {
                name: 'password',
                type: FormFieldTypes.password,
                required: true,
              },
              {
                name: 'remember',
                type: FormFieldTypes.checkbox,
              }
            ],
          }
        ]}
        formButtons={{
          submit: {
            text: {
              id: 'forms.login.successBtn',
            },
            onSubmit: handleSubmit,
          },
        }}
        errorMsg={errorMsg}
        linksItems={[
          {
            text: {
              id: 'forms.login.forgotLink',
            },
            path: pages.forgot.path,
          },
          {
            text: {
              id: 'forms.login.registerLink',
            },
            path: pages.register.path,
          }
        ]}
      />

      {/* initialized &&
        <Box maxWidth={maxWidth}>
          <Divider
            sx={{
              my: 2,
              border: 'none',
            }}
          >
            <Typography variant="body2" textAlign="center">
              <FormattedMessage id="checkout.paymentMethod.or" />
            </Typography>
          </Divider>
          <GoogleLogin
            login={loginGoogle}
          />
        </Box>
      */}
    </>
  );
};

export default LoginForm;
