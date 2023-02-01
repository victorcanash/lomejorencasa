import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { FormFieldTypes } from '@core/constants/forms';
import type { AuthLogin } from '@core/types/auth';

import { pages } from '@lib/constants/navigation';
import type { FormButtonsNormal } from '@lib/types/forms';
import useForms from '@lib/hooks/useForms';
import useAuth from '@lib/hooks/useAuth';
import BaseForm from '@components/forms/BaseForm';

type LoginFormProps = {
  onFailByActivation: (email: string) => void,
}

const LoginForm = (props: LoginFormProps) => {
  const { onFailByActivation } = props;

  const { loginFormValidation, userFieldsInitValues } = useForms();
  const { login, errorMsg } = useAuth();

  const handleSubmit = async (values: AuthLogin) => {
    login(values, onFailByActivation);
  };

  return (
    <BaseForm 
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
              autoFocus: true,
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
      } as FormButtonsNormal}
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
  );
};

export default LoginForm;
