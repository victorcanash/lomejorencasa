import { useState } from 'react';

import { Formik, Form } from 'formik';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { orderFailedCreateValidation, initOrderFailedCreateValues } from '@core/constants/forms/orders';
import { Order, OrderFailedCreate, OrderProductFailedCreate } from '@core/types/orders';
import useOrders from '@lib/hooks/useOrders';
import UAddressForm from '@components/forms/user/UAddressForm';
import CreateFailedOrderProductForm from '@components/forms/orders/CreateFailedOrderProductForm';

type CreateFailedOrderFormProps = {
  onSubmitSuccess?: (order?: Order) => void,
  onCancel?: () => void,
};

const CreateFailedOrderForm = (props: CreateFailedOrderFormProps) => {
  const { onSubmitSuccess, onCancel } = props;

  const { createFailedOrder, errorMsg, successMsg } = useOrders();

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

        <Typography component="h1" variant="h5" mb={3}>
          Create failed order
        </Typography>

        {/* Order Products */}
        <CreateFailedOrderProductForm
          onSubmitSuccess={onSuccessCreateOrderProduct}
        />
        { orderProducts && orderProducts.length > 0 &&
          <>
            <Typography component="h3" variant="subtitle1" mt={3}>
              Order products:
            </Typography>
            <Grid container spacing={1} pt={2} pb={5}>
              { orderProducts.map((product, productIndex) => (
                <Grid item xs={6} key={productIndex}>
                  <Typography component="div" variant="subtitle1">
                    {`Quantity: ${product.quantity}`}
                  </Typography>
                  <Typography component="div" variant="subtitle1">
                    {`Inventory ID: ${product.inventoryId}`}
                  </Typography>
                  <Button 
                    variant="contained"                    
                    onClick={() => onClickDeleteOrderProductBtn(productIndex)}
                  >
                    Delete
                  </Button> 
                </Grid>
              ))}
            </Grid>
          </>
        }

        <Formik
          initialValues={initOrderFailedCreateValues}
          validationSchema={orderFailedCreateValidation}
          onSubmit={handleSubmit}
        >
          {props => (
            <Form>

              {/* UserID Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="userId"
                name="userId"
                autoComplete="userId"
                label="User ID"
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
                label="BraintreeTransaction ID"
                value={props.values.braintreeTransactionId}
                onChange={props.handleChange}
                error={props.touched.braintreeTransactionId && Boolean(props.errors.braintreeTransactionId)}
                helperText={props.touched.braintreeTransactionId && props.errors.braintreeTransactionId}
              />
              
              {/* Shipping Address */}
              <Typography component="h3" variant="subtitle1" mt={3}>
                Shipping address:
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
                Create
              </Button>

              {
                onCancel &&
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    onClick={handleCancelBtn}
                  >
                    Cancel
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