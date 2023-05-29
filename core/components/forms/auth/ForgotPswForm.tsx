import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { FormFieldTypes } from '@core/constants/forms';

import { pages } from '@lib/config/navigation.config';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useForms from '@lib/hooks/useForms';
import useAuth from '@lib/hooks/useAuth';
import BaseForm from '@core/components/forms/BaseForm';

const ForgotPswForm = () => {
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
          avatarIcon: <LockOutlinedIcon />,
          titleTxt: {
            id: 'forms.forgotPassword.title',
          },
          descriptionTxt: {
            id: 'forms.forgotPassword.description',
          },
          formFields: [
            {
              name: 'email',
              type: FormFieldTypes.text,
              required: true,
              autoFocus: true,
            }
          ],
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'forms.forgotPassword.successBtn',
          },
          onSubmit: handleSubmit,
        },
      }}
      successMsg={successMsg}
      errorMsg={errorMsg}
      linksItems={[
        {
          text: {
            id: 'forms.forgotPassword.loginLink',
          },
          path: pages.login.path,
        }
      ]}
    />
  );
};

export default ForgotPswForm;
