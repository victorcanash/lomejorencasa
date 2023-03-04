import { ManageActions } from '@core/constants/app';
import { FormFieldTypes } from '@core/constants/forms';
import type { User } from '@core/types/user';

import type { FormButtonsNormal } from '@lib/types/forms';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useForms from '@lib/hooks/useForms';
import useUser from '@lib/hooks/useUser';
import BaseForm from '@components/forms/BaseForm';

const UpdateUserForm = () => {
  const { user } = useAuthContext();

  const { updateUserFormValidation, userFieldsInitValues } = useForms();
  const { manageUser, errorMsg, successMsg } = useUser();

  const handleSubmit = async (values: User) => {
    manageUser(ManageActions.update, values);
  };

  return (
    <BaseForm
      initialValues={{
        id: (user as User)?.id || -1,
        email: (user as User)?.email || userFieldsInitValues.email,
        firstName: (user as User)?.firstName || userFieldsInitValues.firstName,
        lastName: (user as User)?.lastName || userFieldsInitValues.lastName,
        birthday: (user as User)?.birthday || userFieldsInitValues.birthday,
        getEmails: (user as User)?.getEmails || userFieldsInitValues.getEmails,
      } as User}
      validationSchema={updateUserFormValidation}
      enableReinitialize={true}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'forms.updateUser.title',
          },
          formFields: [
            {
              name: 'firstName',
              type: FormFieldTypes.text,
              required: true,
              autoFocus: true,
            },
            {
              name: 'lastName',
              type: FormFieldTypes.text,
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
            }
          ],
        }
      ]}
      formButtons={{
        submit: {
          text: { 
            id: 'forms.updateUser.successBtn',
          },
          onSubmit: handleSubmit,
        },
      } as FormButtonsNormal}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  );
};

export default UpdateUserForm;
