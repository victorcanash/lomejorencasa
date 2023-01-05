import { useState } from 'react';
import { useRouter } from 'next/router'

import { Formik, Form } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';

import { AddressTypes } from '@core/constants/addresses';
import { Order, OrderFailedCreate, OrderProductFailedCreate } from '@core/types/orders';
import useOrders from '@lib/hooks/useOrders';
import useForms from '@lib/hooks/useForms';
import UAddressForm from '@components/forms/user/UAddressForm';
import CreateFailedOrderProductForm from '@components/forms/orders/CreateFailedOrderProductForm';

type CreateFailedOrderFormProps = {
  onSubmitSuccess?: (order?: Order) => void,
  onCancel?: () => void,
};

const CreateFailedOrderForm = (props: CreateFailedOrderFormProps) => {
  const { onSubmitSuccess, onCancel } = props;

  const router = useRouter();
  const intl = useIntl();

  const { createFailedOrder, errorMsg, successMsg } = useOrders();
  const { createFailedOrderFormValidation, orderFieldsInitValues, addressFieldsInitValues } = useForms();

  const [orderProducts, setOrderProducts] = useState<OrderProductFailedCreate[]>([]);

  const onSuccessCreateOrderProduct = (orderProduct: OrderProductFailedCreate) => {
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
    <Container maxWidth="xs">

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Typography component="h1" variant="h1" mb={3}>
          <FormattedMessage 
            id="forms.createFailedOrder.title" 
          />
        </Typography>

        {/* Order Products */}
        <CreateFailedOrderProductForm
          onSubmitSuccess={onSuccessCreateOrderProduct}
        />
        { orderProducts && orderProducts.length > 0 &&
          <>
            <Typography component="h3" variant="body1" mt={3}>
              {`${intl.formatMessage({ id: "orderDetail.products" })}:`}
            </Typography>
            <Grid container spacing={1} pt={2} pb={5}>
              { orderProducts.map((product, productIndex) => (
                <Grid item xs={6} key={productIndex}>
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
          </>
        }

        <Formik
          initialValues={{
            locale: orderFieldsInitValues.locale,
            userId: orderFieldsInitValues.userId,
            braintreeTransactionId: orderFieldsInitValues.braintreeTransactionId,
            shipping: {
              id: -1,
              userId: -1,
              type: AddressTypes.SHIPPING,
              ...addressFieldsInitValues,
            }, 
            products: [],
          } as OrderFailedCreate}
          validationSchema={createFailedOrderFormValidation}
          onSubmit={handleSubmit}
        >
          {props => (
            <Form>

              {/* Locale Field */}
              <InputLabel id="locale-label">
                <FormattedMessage 
                  id="forms.locale" 
                />
              </InputLabel>
              <Select
                margin="dense"
                required
                fullWidth
                id="locale"
                name="locale"
                autoComplete="locale"
                labelId="locale-label"
                label={intl.formatMessage({ id: "forms.locale" })}
                autoFocus
                value={orderFieldsInitValues.locale}
                onChange={props.handleChange}
                error={props.touched.locale && Boolean(props.errors.locale)}
              >
                { router.locales?.map((locale) => (
                  <MenuItem key={locale} value={locale}>
                    {locale}
                  </MenuItem>
                ))}
              </Select>

              {/* UserID Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="userId"
                name="userId"
                autoComplete="userId"
                label={intl.formatMessage({ id: "forms.userId" })}
                type="numeric"  
                inputProps={{
                  min: 0,
                  inputMode: 'numeric',
                }} 
                value={props.values.userId}
                onChange={props.handleChange}
                error={props.touched.userId && Boolean(props.errors.userId)}
                helperText={props.touched.userId && props.errors.userId} 
              />

              {/* BraintreeTransactionID Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="braintreeTransactionId"
                name="braintreeTransactionId"
                autoComplete="braintreeTransactionId"        
                label={intl.formatMessage({ id: "forms.braintreeTransactionId" })}
                value={props.values.braintreeTransactionId}
                onChange={props.handleChange}
                error={props.touched.braintreeTransactionId && Boolean(props.errors.braintreeTransactionId)}
                helperText={props.touched.braintreeTransactionId && props.errors.braintreeTransactionId}
              />
              
              {/* Shipping Address */}
              <Typography component="h3" variant="subtitle1" mt={3}>
                <FormattedMessage 
                  id="forms.shipping" 
                />
              </Typography>
              <UAddressForm
                values={props.values.shipping}
                errors={props.errors.shipping}
                touched={props.touched.shipping}
                handleChange={props.handleChange}
                autoFocus={false}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!orderProducts || orderProducts.length <= 0}
              >
                <FormattedMessage 
                  id="forms.createFailedOrder.successBtn" 
                />
              </Button>

              {
                onCancel &&
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    onClick={handleCancelBtn}
                  >
                    <FormattedMessage 
                      id="app.cancelBtn" 
                    />
                  </Button>
              }

              {
                errorMsg && errorMsg !== '' &&
                  <Alert severity="error">{ errorMsg }</Alert>
              }  
              {
                successMsg && successMsg !== '' &&
                  <Alert>{ successMsg }</Alert>
              }  

            </Form>
          )}
        </Formik>
      
      </Box>

    </Container>
  );
};

export default CreateFailedOrderForm;
