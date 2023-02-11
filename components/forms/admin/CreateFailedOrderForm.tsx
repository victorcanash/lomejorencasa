import { useState } from 'react';
// import { useRouter } from 'next/router'

import { useIntl, FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { FormFieldTypes } from '@core/constants/forms';
import { AddressTypes } from '@core/constants/addresses';
import type { Order, OrderFailedCreate } from '@core/types/orders';
import type { GuestCartItem } from '@core/types/cart';

import type { FormButtonsNormal } from '@lib/types/forms';
import useForms from '@lib/hooks/useForms';
import useOrders from '@lib/hooks/useOrders';
import BaseForm from '@components/forms/BaseForm';
import CreateFailedOrderProductForm from '@components/forms/admin/CreateFailedOrderProductForm';

type CreateFailedOrderFormProps = {
  onSubmitSuccess?: (order?: Order) => void,
  onCancel?: () => void,
};

const CreateFailedOrderForm = (props: CreateFailedOrderFormProps) => {
  const { onSubmitSuccess, onCancel } = props;

  // const router = useRouter();
  const intl = useIntl();

  const { 
    createFailedOrderFormValidation, 
    orderFieldsInitValues, 
    addressFieldsInitValues,
    addressFormFields,
  } = useForms();
  const { createFailedOrder, errorMsg, successMsg } = useOrders();

  const [orderProducts, setOrderProducts] = useState<GuestCartItem[]>([]);

  const onSuccessCreateOrderProduct = (orderProduct: GuestCartItem) => {
    setOrderProducts(current => [...current, orderProduct]);
  };

  const onClickDeleteOrderProductBtn = (deleteIndex: number) => {
    setOrderProducts(
      orderProducts.filter((_item, index) => index !== deleteIndex)
    );
  };

  const handleSubmit = async (values: OrderFailedCreate) => {
    if (orderProducts && orderProducts.length > 0) {
      createFailedOrder({
        ...values,
        products: orderProducts,
      }, onSubmitSuccess);
    }
  };

  const handleCancelBtn = () => {
    if (onCancel) {
      onCancel();
    };
  };

  return (
    <>
      <BaseForm 
        initialValues={{
          locale: orderFieldsInitValues.locale,
          userId: orderFieldsInitValues.userId,
          guestUserEmail: orderFieldsInitValues.guestUserEmail,
          braintreeTransactionId: orderFieldsInitValues.braintreeTransactionId,
          shipping: {
            id: -1,
            userId: -1,
            type: AddressTypes.shipping,
            ...addressFieldsInitValues,
          }, 
          products: [],
        } as OrderFailedCreate}
        validationSchema={createFailedOrderFormValidation}
        formFieldGroups={[
          {
            titleTxt: {
              id: 'forms.createFailedOrder.title',
            },
            formFields: [
              {
                name: 'locale',
                type: FormFieldTypes.select,
                required: true,
                /*menuItems: router.locales?.map((locale) => {
                  return {
                    text: {
                      id: locale,
                    },
                    value: locale,
                  };
                }) | undefined,*/ 
                menuItems: [
                  {
                    text: {
                      id: 'es',
                    },
                    value: 'es',
                  }
                ],       
              },
              {
                name: 'userId',
                type: FormFieldTypes.numeric,
              },
              {
                name: 'guestUserEmail',
                type: FormFieldTypes.text,
              },
              {
                name: 'braintreeTransactionId',
                type: FormFieldTypes.text,
                required: true,
              },
              ...addressFormFields(AddressTypes.shipping)
            ],
          }
        ]}
        formButtons={{
          submit: {
            text: {
              id: 'forms.createFailedOrder.successBtn',
            },
            onSubmit: handleSubmit,
          },
          cancel: {
            text: {
              id: 'app.cancelBtn',
            },
            onClick: handleCancelBtn,
          },
        } as FormButtonsNormal}
        successMsg={successMsg}
        errorMsg={errorMsg}
      />

      <Box mt={3} />

      {/* Order Products */}
      <CreateFailedOrderProductForm
        onSubmitSuccess={onSuccessCreateOrderProduct}
      />
      { orderProducts && orderProducts.length > 0 &&
        <Box className="centered-container-img">
          <Typography component="h3" variant="body1" mt={3}>
            {`${intl.formatMessage({ id: "orderDetail.products" })}:`}
          </Typography>
          <Grid container spacing={1} pt={2} pb={5}>
            { orderProducts.map((product, productIndex) => (
              <Grid item xs={6} sm={4} key={productIndex}>
                <Typography component="div" variant="body1">
                  {`${intl.formatMessage({ id: "forms.quantity" })}: ${product.quantity}`}
                </Typography>
                <Typography component="div" variant="body1">
                  {`${intl.formatMessage({ id: "forms.inventoryId" })}: ${product.inventoryId}`}
                </Typography>
                <Button 
                  variant="contained"                    
                  onClick={() => onClickDeleteOrderProductBtn(productIndex)}
                >
                  <FormattedMessage 
                    id="app.deleteBtn" 
                  />
                </Button> 
              </Grid>
            ))}
          </Grid>
        </Box>
      }
    </>
  );
};

export default CreateFailedOrderForm;
