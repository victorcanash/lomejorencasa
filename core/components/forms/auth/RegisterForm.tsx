import { useState } from 'react';

/*import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';*/
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { FormFieldTypes } from '@core/constants/forms';
import type { AuthRegister } from '@core/types/auth';

import { pages } from '@lib/config/navigation.config';
// import { useAppContext } from '@lib/contexts/AppContext';
import useForms from '@lib/hooks/useForms';
import useAuth from '@lib/hooks/useAuth';
import BaseForm from '@core/components/forms/BaseForm';
// import GoogleLogin from '@components/google/GoogleLogin';

const RegisterForm = () => {
  // const { initialized } = useAppContext();

  const { registerFormValidation, userFieldsInitValues } = useForms();
  const { register, /*loginGoogle, */errorMsg } = useAuth();

  const [acceptPolicy, setAcceptPolicy] = useState(false);

  const handleSubmit = async (values: AuthRegister) => {
    register(values);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    if (event.target.name === 'acceptPolicy') {
      setAcceptPolicy(event.target.checked);
    }
  };

  const maxWidth = '500px';

  return (
    <>
      <BaseForm
        onChange={handleChange}
        maxWidth={maxWidth}
        initialValues={{
          email: userFieldsInitValues.email,
          password: userFieldsInitValues.password,
          confirm: userFieldsInitValues.confirm,
          firstName: userFieldsInitValues.firstName,
          lastName: userFieldsInitValues.lastName,
          birthday: userFieldsInitValues.birthday,
          getEmails: userFieldsInitValues.getEmails,
          acceptPolicy: userFieldsInitValues.acceptPolicy,
        } as AuthRegister}
        validationSchema={registerFormValidation}
        formFieldGroups={[
          {
            avatarIcon: <LockOutlinedIcon />,
            titleTxt: {
              id: 'forms.register.title',
            },
            formFields: [
              {
                name: 'firstName',
                type: FormFieldTypes.text,
                required: true,
              },
              {
                name: 'lastName',
                type: FormFieldTypes.text,
                required: true,
              },
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
                name: 'confirm',
                type: FormFieldTypes.password,
                required: true,
              },
              {
                name: 'birthday',
                type: FormFieldTypes.datePicker,
                required: true,
              },
              {
                name: 'getEmails',
                type: FormFieldTypes.checkbox,
              },
              {
                name: 'acceptPolicy',
                type: FormFieldTypes.checkbox,
              },
            ],
          }
        ]}
        formButtons={{
          submit: {
            text: {
              id: 'forms.register.successBtn',
            },
            onSubmit: handleSubmit,
            disabled: !acceptPolicy,
          },
        }}
        errorMsg={errorMsg}
        linksItems={[
          {
            text: {
              id: 'forms.register.loginLink',
            },
            path: pages.login.path,
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

export default RegisterForm;
