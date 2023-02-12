import { useRouter } from 'next/router';

import type { FormButtonsNormal } from '@lib/types/forms';
import useAuth from '@lib/hooks/useAuth';
import BaseForm from '@components/forms/BaseForm';

const ConfirmNewEmailForm = () => {
  const router = useRouter();
  const { updateEmail, errorMsg, successMsg } = useAuth();

  const handleSubmit = async () => {
    const updateToken = typeof router.query.token == 'string' ? router.query.token : '';
    updateEmail(updateToken);
  };

  return (
    <BaseForm
      initialValues={{}}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'forms.confirmNewEmail.title',
            textAlign: 'center',
          },
          descriptionTxt: {
            id: 'forms.confirmNewEmail.description',
            textAlign: 'center',
          },
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'forms.confirmNewEmail.successBtn',
          },
          onSubmit: handleSubmit,
        },
      } as FormButtonsNormal}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  );
};

export default ConfirmNewEmailForm;
