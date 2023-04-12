import { FormFieldTypes } from '@core/constants/forms';

import type { FormButtonsNormal } from '@lib/types/forms';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useForms from '@lib/hooks/useForms';
import useAuth from '@lib/hooks/useAuth';
import BaseForm from '@components/forms/BaseForm';

const UpdatePswForm = () => {
  const { user } = useAuthContext();

  const { sendEmailFormValidation, userFieldsInitValues } = useForms();
  const { sendResetPswEmail, errorMsg, successMsg } = useAuth();

  const handleSubmit = async (values: {email: string}) => {
    sendResetPswEmail(values.email);
  };

  return (
    <BaseForm 
      initialValues={{
        email: user?.email || userFieldsInitValues.email,
      }}
      validationSchema={sendEmailFormValidation}
      enableReinitialize={true}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'forms.updatePassword.title',
            textAlign: 'center',
          },
          descriptionTxt: {
            id: 'forms.updatePassword.description',
          },
          formFields: [
            {
              name: 'email',
              type: FormFieldTypes.text,
              required: true,
            }
          ],
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'forms.updatePassword.successBtn',
          },
          onSubmit: handleSubmit,
        },
      } as FormButtonsNormal}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  );
};

export default UpdatePswForm;
