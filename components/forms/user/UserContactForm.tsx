import { ReactNode, useState } from 'react';

import envConfig from '@core/config/env.config';
import { FormFieldTypes } from '@core/constants/forms';
import { ContactTypes } from '@core/constants/contact';
import type { User, UserContact } from '@core/types/user';
import Link from '@core/components/Link';

import { pages } from '@lib/config/navigation.config';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useForms from '@lib/hooks/useForms';
import useUser from '@lib/hooks/useUser';
import BaseForm from '@components/forms/BaseForm';

const UserContactForm = () => {
  const { user, isLogged } = useAuthContext();

  const {
    userContactFormValidation,
    userFieldsInitValues,
    orderFieldsInitValues,
  } = useForms();
  const { sendUserContactEmail, errorMsg, successMsg } = useUser();

  const [acceptPolicy, setAcceptPolicy] = useState(isLogged() ? true : false);

  const maxWidth = '500px';

  const handleSubmit = async (values: UserContact) => {
    sendUserContactEmail(values);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    if (event.target.name === 'acceptPolicy') {
      setAcceptPolicy(event.target.checked);
    }
  };

  return (
    <BaseForm
      onChange={handleChange}
      maxWidth={maxWidth}
      initialValues={{
        type: ContactTypes.normal,
        email: user.email || userFieldsInitValues.email,
        firstName: (user as User)?.firstName || userFieldsInitValues.firstName,
        orderId: orderFieldsInitValues.bigbuyId,
        comments: userFieldsInitValues.comments,
        acceptPolicy: isLogged() ? true : false,
      } as UserContact}
      validationSchema={userContactFormValidation}
      enableReinitialize={true}
      formFieldGroups={[
        {
          descriptionTxt: {
            id: 'contact.description',
            values: {
              email: envConfig.EMAIL,
              'linkEmail': (...chunks: ReactNode[]) => (
                <Link href={`mailto:${envConfig.EMAIL}`} target="_blank">
                  {chunks}
                </Link>
              ),
            },
          },
          formFields: [
            {
              name: 'firstName',
              type: FormFieldTypes.text,
              required: true,
              disabled: isLogged(),
            },
            {
              name: 'email',
              type: FormFieldTypes.text,
              required: true,
              disabled: isLogged(),
            },
            {
              name: 'comments',
              type: FormFieldTypes.multiline,
              required: true,
            },
            {
              name: 'acceptPolicy',
              type: FormFieldTypes.checkbox,
              disabled: isLogged(),
            },
          ],
        }
      ]}
      formButtons={{
        submit: {
          text: { 
            id: 'app.sendBtn',
          },
          onSubmit: handleSubmit,
          disabled: !acceptPolicy,
        },
      }}
      linksItems={[
        {
          text: {
            id: 'contact.resolutionsLink',
          },
          path: pages.resolutions.path,
        }
      ]}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  );
};

export default UserContactForm;
