import { FormFieldTypes } from '@core/constants/forms';
import type { AuthUpdateEmail } from '@core/types/auth';

import useForms from '@core/hooks/useForms';
import useAuth from '@core/hooks/useAuth';
import BaseForm from '@core/components/forms/BaseForm';

const UpdateEmailForm = () => {
  const { updateEmailFormValidation, userFieldsInitValues } = useForms();
  const { sendUpdateEmail, errorMsg, successMsg } = useAuth();

  const handleSubmit = async (values: AuthUpdateEmail) => {
    sendUpdateEmail(values);
  };

  return (
    <BaseForm
      initialValues={{
        password: userFieldsInitValues.password,
        newEmail: userFieldsInitValues.email,
      } as AuthUpdateEmail}
      validationSchema={updateEmailFormValidation}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'forms.updateEmail.title',
            textAlign: 'center',
          },
          descriptionTxt: {
            id: 'forms.updateEmail.description',
          },
          formFields: [
            {
              name: 'password',
              type: FormFieldTypes.password,
              required: true,
            },
            {
              name: 'newEmail',
              type: FormFieldTypes.text,
              required: true,
            }
          ],
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'forms.updateEmail.successBtn',
          },
          onSubmit: handleSubmit,
        },
      }}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  );
};

export default UpdateEmailForm;
