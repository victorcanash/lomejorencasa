import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { FormFieldTypes } from '@core/constants/forms';
import type { AuthRegister } from '@core/types/auth';

import { pages } from '@lib/constants/navigation';
import type { FormButtonsNormal } from '@lib/types/forms';
import useForms from '@lib/hooks/useForms';
import useAuth from '@lib/hooks/useAuth';
import BaseForm from '@components/forms/BaseForm';

type RegisterFormProps = {
  onSuccess: (email: string) => void,
}

const RegisterForm = (props: RegisterFormProps) => {
  const { onSuccess } = props;

  const { registerFormValidation, userFieldsInitValues } = useForms();
  const { register, errorMsg } = useAuth();

  const handleSubmit = async (values: AuthRegister) => {
    register(values, onSuccess);
  };

  return (
    <BaseForm 
      initialValues={{
        email: userFieldsInitValues.email,
        password: userFieldsInitValues.password,
        confirm: userFieldsInitValues.confirm,
        firstName: userFieldsInitValues.firstName,
        lastName: userFieldsInitValues.lastName,
        birthday: userFieldsInitValues.birthday,
        getEmails: userFieldsInitValues.getEmails,
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
              autoFocus: true,
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
          ],
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'forms.register.successBtn',
          },
          onSubmit: handleSubmit,
        },
      } as FormButtonsNormal}
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
  );
};

export default RegisterForm;
