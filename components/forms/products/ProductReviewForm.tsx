import { useState, useRef } from 'react';
import Image from 'next/image';

import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { FormFieldTypes } from '@core/constants/forms';
import { ContactTypes, maxContactFiles } from '@core/constants/contact';
import type { User, UserContact } from '@core/types/user';
import type { FormField } from '@core/types/forms';
import type { UploadFile } from '@core/types/multimedia';
import { getContactTypeName } from '@core/utils/contact';

import type { FormButtonsNormal } from '@lib/types/forms';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useForms from '@lib/hooks/useForms';
import useUser from '@lib/hooks/useUser';
import BaseForm from '@components/forms/BaseForm';

const ProductReviewForm = () => {
  const { user } = useAuthContext();

  const { 
    contactUserFormValidation, 
    contactOrderUserFormValidation, 
    userFieldsInitValues, 
    orderFieldsInitValues,
    contactFieldsInitValues,
  } = useForms();
  const { sendUserContactEmail, errorMsg, successMsg } = useUser();

  const uploadImgsInputRef = useRef<HTMLInputElement | null>(null);

  const [contactType, setContactType] = useState(contactFieldsInitValues.type);
  const [uploadImgs, setUploadImgs] = useState<UploadFile[]>([]);

  const maxWidth = '500px';

  // on set files to the upload input we add it in uploadFiles
  const handleChangeUploadImgsInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file, index) => {
        if (index < maxContactFiles) {
          setUploadImgs(current => [...current, { 
            url: URL.createObjectURL(file),
            file: file,
          }]);
        }
      })
    }
    if (uploadImgsInputRef.current) {
      uploadImgsInputRef.current.value = '';
    }
  };

  // on click the delete button from a uploaded img we remove it from uploadImgs
  const handleClickDeleteUploadImgBtn = (uploadImgIndex: number) => {
    setUploadImgs(
      uploadImgs.filter((_item, index) => index !== uploadImgIndex)
    );
  };

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
        email: (user as User)?.email || userFieldsInitValues.email,
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
          <>
            { uploadImgs && uploadImgs.length > 0 &&
              <Box
                sx={{
                  maxWidth: maxWidth, 
                  margin: 'auto',
                }}              
              >
                <Grid container spacing={1} py={3}>
                  { uploadImgs.map((item, index) => (
                    <Grid item xs={6} key={index}>
                      <Image
                        src={item.url}
                        alt="Image"
                        width="500"
                        height="500"
                        layout="responsive"
                        objectFit="cover"
                      />
                      <Button variant="contained" onClick={()=>handleClickDeleteUploadImgBtn(index)}>
                        <FormattedMessage 
                          id="app.removeBtn" 
                        />
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            }
            <Box
              sx={{
                maxWidth: maxWidth,
                margin: 'auto',
              }}
            >
              <Button 
                variant="contained" 
                fullWidth
                component="label" 
                disabled={uploadImgs.length >= maxContactFiles}
              >
                <FormattedMessage 
                  id="forms.manageProductImgs.upload" 
                />
                <input 
                  ref={uploadImgsInputRef} 
                  hidden
                  accept=".png, .jpg, .jpeg"
                  multiple 
                  type="file" 
                  onChange={handleChangeUploadImgsInput} 
                />
              </Button>
            </Box>
          </> : undefined,
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

export default ProductReviewForm;
