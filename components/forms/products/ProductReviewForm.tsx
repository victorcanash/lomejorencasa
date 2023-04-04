import { FormattedMessage } from 'react-intl';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import { FormFieldTypes } from '@core/constants/forms';
import type { User } from '@core/types/user';
import type { CreateProductReview } from '@core/types/products';

import colors from '@lib/constants/themes/colors';
import type { FormButtonsNormal } from '@lib/types/forms';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useForms from '@lib/hooks/useForms';
import useProducts from '@lib/hooks/useProducts';
import useMultimedia from '@lib/hooks/useMultimedia';
import BaseForm from '@components/forms/BaseForm';
import UploadInput from '@components/multimedia/UploadInput';

const ProductReviewForm = () => {
  const { productVariants } = useProductsContext();
  const { user, isLogged } = useAuthContext();

  const { 
    productReviewFormValidation,
    userFieldsInitValues,
    reviewFieldsInitValues,
  } = useForms();
  const { createProductReview, errorMsg, successMsg } = useProducts();
  const { 
    uploadInputRef,
    uploadImgs,
    handleChangeUploadInput,
    handleClickDeleteUploadBtn,
  } = useMultimedia();

  const maxWidth = '500px';

  const handleSubmit = async (values: CreateProductReview) => {
    createProductReview(values, uploadImgs);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography component="div" variant="body1">
          <FormattedMessage id="forms.productReview.title" />
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: colors.background.primary }}>
        { productVariants.length > 0 &&
          <BaseForm
            maxWidth={maxWidth}
            initialValues={{
              relatedProduct: '0',
              rating: reviewFieldsInitValues.rating,
              title: reviewFieldsInitValues.title,
              description: reviewFieldsInitValues.description,
              email: user.email || userFieldsInitValues.email,
              firstName: (user as User)?.firstName || userFieldsInitValues.firstName,
            } as CreateProductReview}
            validationSchema={productReviewFormValidation}
            enableReinitialize={true}
            formFieldGroups={[
              {
                descriptionTxt: {
                  id: 'forms.productReview.description',
                },
                formFields: [
                  {
                    name: 'relatedProduct',
                    type: FormFieldTypes.select,
                    required: true,
                    menuItems: productVariants.map((item, index) => {
                      return {
                        text: {
                          id: 'forms.selectInventory.content',
                          values: {
                            name: item.name.current,
                          },
                        },
                        value: index.toString(),
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
                    required: true,
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
                    name: 'firstName',
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
            } as FormButtonsNormal}
            successMsg={successMsg}
            errorMsg={errorMsg}
          />
        }
      </AccordionDetails>
    </Accordion>
  );
};

export default ProductReviewForm;
