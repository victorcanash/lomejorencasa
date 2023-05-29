import { useRouter } from 'next/router';

import { FormFieldTypes } from '@core/constants/forms';
import type { AuthResetPsw } from '@core/types/auth';

import useForms from '@lib/hooks/useForms';
import useAuth from '@lib/hooks/useAuth';
import BaseForm from '@core/components/forms/BaseForm';

const ResetPswForm = () => {
  const router = useRouter();

  const { resetPasswordFormValidation, userFieldsInitValues } = useForms();
  const { resetPsw: resetPassword, errorMsg, successMsg } = useAuth();

  const handleSubmit = async (values: AuthResetPsw) => {
    const updateToken = typeof router.query.token == 'string' ? router.query.token : '';
    resetPassword(updateToken, values);
  };

  return (
    <BaseForm 
      initialValues={{
        newPassword: userFieldsInitValues.password,
        newConfirm: userFieldsInitValues.confirm,
      } as AuthResetPsw}
      validationSchema={resetPasswordFormValidation}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'forms.resetPassword.title',
            textAlign: 'center',
          },
          descriptionTxt: {
            id: 'forms.resetPassword.description',
            textAlign: 'center',
          },
          formFields: [
            {
              name: 'newPassword',
              type: FormFieldTypes.password,
              required: true,
              autoFocus: true,
            },
            {
              name: 'newConfirm',
              type: FormFieldTypes.password,
              required: true,
            }
          ],
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'forms.resetPassword.successBtn',
          },
          onSubmit: handleSubmit,
        },
      }}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  );
};

export default ResetPswForm;
