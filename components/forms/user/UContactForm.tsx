import { useState } from 'react';

import { FormFieldTypes } from '@core/constants/forms';
import { ContactTypes } from '@core/constants/contact';
import type { User, UserContact } from '@core/types/user';
import type { FormField } from '@core/types/forms';
import { getContactTypeName } from '@core/utils/contact';

import type { FormButtonsNormal } from '@lib/types/forms';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useForms from '@lib/hooks/useForms';
import useUser from '@lib/hooks/useUser';
import BaseForm from '@components/forms/BaseForm';

const UContactForm = () => {
  const { user } = useAuthContext();

  const { 
    contactUserFormValidation, 
    contactOrderUserFormValidation, 
    userFieldsInitValues, 
    orderFieldsInitValues,
    contactFieldsInitValues,
  } = useForms();
  const { sendUserContactEmail, errorMsg, successMsg } = useUser();

  const [contactType, setContactType] = useState(contactFieldsInitValues.type);

  const handleSubmit = async (values: UserContact) => {
    sendUserContactEmail(values);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    if (event.target.name === 'type') {
      setContactType(event.target.value as ContactTypes);
      
    }
  };

  const getDescriptionTxtId = () => {
    if (contactType === ContactTypes.refundOrder) {
      return 'forms.contact.refundOrder.description';
    } else if (contactType === ContactTypes.modifyOrder) {
      return 'forms.contact.modifyOrder.description';
    } else if (contactType === ContactTypes.cancelOrder) {
      return 'forms.contact.cancelOrder.description';
    }
    return 'forms.contact.normal.description';
  };

  const getFormFields = () => {
    const formFields = [
      {
        name: 'type',
        type: FormFieldTypes.select,
        required: true,
        menuItems: Object.keys(ContactTypes).map((typeKey) => {
          return {
            text: {
              id: `forms.selectContactType.${typeKey}`,
            },
            value: getContactTypeName(typeKey),
          };
        }), 
      },
      {
        name: 'email',
        type: FormFieldTypes.text,
        required: true,
      },
      {
        name: 'firstName',
        type: FormFieldTypes.text,
        required: true,
      },
      {
        name: 'comments',
        type: FormFieldTypes.multiline,
        required: true,
      }
    ] as FormField[];
    if (contactType !== ContactTypes.normal) {
      formFields.splice(3, 0, {
        name: 'orderId',
        type: FormFieldTypes.numeric,
        required: true,
      });
    }
    return formFields;
  };

  return (
    <BaseForm
      initialValues={{
        type: contactFieldsInitValues.type,
        email: (user as User)?.email || userFieldsInitValues.email,
        firstName: (user as User)?.firstName || userFieldsInitValues.firstName,
        orderId: orderFieldsInitValues.id,
        comments: userFieldsInitValues.comments,
        // imgs
      } as UserContact}
      validationSchema={contactType === ContactTypes.normal ? contactUserFormValidation : contactOrderUserFormValidation}
      enableReinitialize={true}
      onChange={handleChange}
      formFieldGroups={[
        {
          descriptionTxt: {
            id: getDescriptionTxtId(),
          },
          formFields: getFormFields(),
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
