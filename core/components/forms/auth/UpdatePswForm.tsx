import { FormFieldTypes } from '@core/constants/forms';

import { useAuthContext } from '@core/contexts/AuthContext';
import useForms from '@core/hooks/useForms';
import useAuth from '@core/hooks/useAuth';
import BaseForm from '@core/components/forms/BaseForm';

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
      }}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  );
};

export default UpdatePswForm;
