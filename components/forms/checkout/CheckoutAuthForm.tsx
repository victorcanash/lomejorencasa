import type { NextPage } from 'next';

import { FormFieldTypes } from '@core/constants/forms';
import type { AuthLogin } from '@core/types/auth';

import { pages } from '@lib/constants/navigation';
import type { FormButtonsNormal } from '@lib/types/forms';
import useForms from '@lib/hooks/useForms';
import useAuth from '@lib/hooks/useAuth';
import BaseForm from '@components/forms/BaseForm';

const CheckoutAuthForm: NextPage = () => {
  const { loginFormValidation, userFieldsInitValues } = useForms();
  const { login, errorMsg } = useAuth();

  const handleLoginSubmit = async (values: AuthLogin) => {
    login(values, false);
  };

  const maxWidth = '600px';

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
            descriptionTxt: {
              id: 'checkout.auth.description',
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
            onSubmit: handleLoginSubmit,
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
    </>
  );
};

export default CheckoutAuthForm;