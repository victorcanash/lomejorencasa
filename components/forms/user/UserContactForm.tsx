import { useState } from 'react';

import { FormFieldTypes } from '@core/constants/forms';
import { ContactTypes, maxContactFiles } from '@core/constants/contact';
import type { User, UserContact } from '@core/types/user';
import type { FormField } from '@core/types/forms';
import { getContactTypeName } from '@core/utils/contact';

import type { FormButtonsNormal } from '@lib/types/forms';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useForms from '@lib/hooks/useForms';
import useUser from '@lib/hooks/useUser';
import useMultimedia from '@lib/hooks/useMultimedia';
import BaseForm from '@components/forms/BaseForm';
import UploadInput from '@components/multimedia/UploadInput';

const UserContactForm = () => {
  const { user, isLogged } = useAuthContext();

  const { 
    contactUserFormValidation, 
    contactOrderUserFormValidation, 
    userFieldsInitValues, 
    orderFieldsInitValues,
    contactFieldsInitValues,
  } = useForms();
  const { sendUserContactEmail, errorMsg, successMsg } = useUser();
  const { 
    uploadInputRef,
    uploadImgs,
    handleChangeUploadInput,
    handleClickDeleteUploadBtn,
   } = useMultimedia();

  const [contactType, setContactType] = useState(contactFieldsInitValues.type);

  const maxWidth = '500px';

  const handleSubmit = async (values: UserContact) => {
    sendUserContactEmail(values, uploadImgs);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    if (event.target.name === 'type') {
      setContactType(event.target.value as ContactTypes);
    }
  };

  const getDescriptionTxtId = () => {
    if (contactType === ContactTypes.refundOrder) {
      return 'contact.refundOrder.description';
    } else if (contactType === ContactTypes.modifyOrder) {
      return 'contact.modifyOrder.description';
    } else if (contactType === ContactTypes.cancelOrder) {
      return 'contact.cancelOrder.description';
    }
    return 'contact.normal.description';
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
        disabled: isLogged(),
      },
      {
        name: 'firstName',
        type: FormFieldTypes.text,
        required: true,
        disabled: isLogged(),
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
        type: FormFieldTypes.text,
        required: true,
      });
    }
    return formFields;
  };

  return (
    <BaseForm
      maxWidth={maxWidth}
      initialValues={{
        type: contactFieldsInitValues.type,
        email: user.email || userFieldsInitValues.email,
        firstName: (user as User)?.firstName || userFieldsInitValues.firstName,
        orderId: orderFieldsInitValues.bigbuyId,
        comments: userFieldsInitValues.comments,
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
          extraElements: contactType === ContactTypes.refundOrder ?
            <UploadInput
              uploadInputRef={uploadInputRef}
              uploadImgs={uploadImgs}
              handleChangeUploadInput={handleChangeUploadInput}
              handleClickDeleteUploadBtn={handleClickDeleteUploadBtn}
              maxFiles={maxContactFiles}
              maxWidth={maxWidth}
              descriptionText={{
                id: 'contact.refundOrder.upload.description',
              }}
            /> : undefined,
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

export default UserContactForm;
