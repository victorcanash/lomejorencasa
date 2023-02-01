import envConfig from '@core/config/env.config';
import { FormFieldTypes } from '@core/constants/forms';
import type { UserContact } from '@core/types/user';

import type { FormButtonsNormal } from '@lib/types/forms';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useForms from '@lib/hooks/useForms';
import useUser from '@lib/hooks/useUser';
import BaseForm from '@components/forms/BaseForm';

const UContactForm = () => {
  const { user } = useAuthContext();

  const { contactUserFormValidation, userFieldsInitValues } = useForms();
  const { sendUserContactEmail, errorMsg, successMsg } = useUser();

  const handleSubmit = async (values: UserContact) => {
    sendUserContactEmail(values);
  };

  return (
    <BaseForm
      initialValues={{
        email: user?.email || userFieldsInitValues.email,
        firstName: user?.firstName || userFieldsInitValues.firstName,
        tlf: userFieldsInitValues.tlf,
        comments: userFieldsInitValues.comments,
      } as UserContact}
      validationSchema={contactUserFormValidation}
      enableReinitialize={true}
      formFieldGroups={[
        {
          descriptionTxt: {
            id: 'forms.contact.description',
            values: {
              email: envConfig.NEXT_PUBLIC_EMAIL,
            },
          },
          formFields: [
            {
              name: 'email',
              type: FormFieldTypes.text,
              required: true,
              autoFocus: true,
            },
            {
              name: 'firstName',
              type: FormFieldTypes.text,
              required: true,
            },
            {
              name: 'tlf',
              type: FormFieldTypes.text,
            },
            {
              name: 'comments',
              type: FormFieldTypes.multiline,
              required: true,
            }
          ],
        }
      ]}
      formButtons={{
        submit: {
          text: { 
            id: 'app.sendBtn',
          },
          onSubmit: handleSubmit,
        },
      } as FormButtonsNormal}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  );
};

export default UContactForm;
