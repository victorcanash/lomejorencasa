import { Dispatch, useRef, useState, useMemo, SetStateAction } from 'react';

import { FormattedMessage } from 'react-intl';
import { FormikProps } from 'formik';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import { FormFieldTypes } from '@core/constants/forms';
import type { UploadFile } from '@core/types/multimedia';
import type { User } from '@core/types/user';
import type { ProductReview, Landing  } from '@core/types/products';
import { getUserFullName } from '@core/utils/user';
import { convertElementToSx } from '@core/utils/themes';
import { useAuthContext } from '@core/contexts/AuthContext';
import useForms from '@core/hooks/useForms';
import useMultimedia from '@core/hooks/useMultimedia';
import BaseForm from '@core/components/forms/BaseForm';
import UploadInput from '@core/components/inputs/UploadInput';

import { themeCustomElements } from '@lib/config/theme/elements';

type ProductReviewFormProps = {
  landing: Landing,
  errorMsg: string,
  successMsg: string,
  createProductReview: (productReview: ProductReview, uploadImgs: UploadFile[], onSuccess?: (() => void) | undefined) => Promise<void>,
  setExpanded: Dispatch<SetStateAction<boolean>>,
  expanded: boolean,
  emailQuery?: string,
};

const ProductReviewForm = (props: ProductReviewFormProps) => {
  const {
    landing,
    errorMsg,
    successMsg,
    createProductReview,
    setExpanded,
    expanded,
    emailQuery,
  } = props;

  const { user, isLogged } = useAuthContext();

  const { 
    productReviewFormValidation,
    userFieldsInitValues,
    reviewFieldsInitValues,
  } = useForms();
  const { 
    uploadInputRef,
    uploadImgs,
    handleChangeUploadInput,
    handleClickDeleteUploadBtn,
  } = useMultimedia();

  const formRef = useRef<FormikProps<ProductReview> | null>(null);

  const [maxWidth, _setMaxWidth] = useState('500px');

  const handleSubmit = async (values: ProductReview) => {
    createProductReview(values, uploadImgs, onCreateProductReviewSuccess);
  };

  const onCreateProductReviewSuccess = () => {
    setExpanded(false);
    formRef.current?.resetForm();
  };

  const handleChange = (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion
      defaultExpanded={false}
      expanded={expanded}
      onChange={handleChange}
      sx={{
        ...themeCustomElements.forms?.accordion?.default ?
          convertElementToSx(themeCustomElements.forms.accordion.default) : undefined,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          ...themeCustomElements.forms?.accordion?.summary ?
            convertElementToSx(themeCustomElements.forms.accordion.summary) : undefined,
        }}
      >
        <Typography component="div" variant="body1Head">
          <FormattedMessage id="forms.productReview.title" />
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          ...themeCustomElements.forms?.accordion?.details ?
            convertElementToSx(themeCustomElements.forms.accordion.details) : undefined,
        }}
      >
        <BaseForm
          formikRef={formRef}
          maxWidth={maxWidth}
          initialValues={{
            landingId: landing.id,
            rating: reviewFieldsInitValues.rating,
            title: reviewFieldsInitValues.title,
            description: reviewFieldsInitValues.description,
            email: user.email || emailQuery || userFieldsInitValues.email,
            publicName: (user as User)?.firstName ? getUserFullName(user as User) : reviewFieldsInitValues.publicName,
          } as ProductReview}
          validationSchema={productReviewFormValidation}
          enableReinitialize={true}
          formFieldGroups={[
            {
              descriptionTxt: {
                id: 'forms.productReview.description',
              },
              formFields: [
                {
                  name: 'landingId',
                  type: FormFieldTypes.select,
                  required: true,
                  menuItems: [landing].map((item) => {
                    return {
                      text: {
                        id: 'forms.selectProduct.content',
                        values: {
                          name: item.description.current,
                        },
                      },
                      value: item.id,
                    };
                  }),
                },
                {
                  name: 'rating',
                  type: FormFieldTypes.rating,
                },
                {
                  name: 'title',
                  type: FormFieldTypes.text,
                },
                {
                  name: 'description',
                  type: FormFieldTypes.multiline,
                  required: true,
                },
                {
                  name: 'email',
                  type: FormFieldTypes.text,
                  required: true,
                  disabled: isLogged(),
                },
                {
                  name: 'publicName',
                  type: FormFieldTypes.text,
                  required: true,
                  disabled: isLogged(),
                },
              ],
              extraElements:
                <UploadInput
                  uploadInputRef={uploadInputRef}
                  uploadImgs={uploadImgs}
                  handleChangeUploadInput={handleChangeUploadInput}
                  handleClickDeleteUploadBtn={handleClickDeleteUploadBtn}
                  maxFiles={1}
                  maxWidth={maxWidth}
                />,
            }
          ]}
          formButtons={{
            submit: {
              text: { 
                id: 'forms.productReview.successBtn',
              },
              onSubmit: handleSubmit,
            },
          }}
          successMsg={successMsg}
          errorMsg={errorMsg}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default ProductReviewForm;
