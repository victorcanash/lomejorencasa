import { ManageActions } from '@core/constants/app';
import { FormFieldTypes } from '@core/constants/forms';
import type { User } from '@core/types/user';

import { useAuthContext } from '@core/contexts/AuthContext';
import useForms from '@core/hooks/useForms';
import useUser from '@core/hooks/useUser';
import BaseForm from '@core/components/forms/BaseForm';

const UserUpdateForm = () => {
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
            textAlign: 'center',
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
      }}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  );
};

export default UserUpdateForm;
