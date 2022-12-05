import { Formik, Form } from 'formik';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { Order } from '@core/types/orders';
import useOrders from '@lib/hooks/useOrders';
import useForms from '@lib/hooks/useForms';

type SendFailedOrderEmailFormProps = {
  onSubmitSuccess?: (order: Order) => void,
  onCancel?: () => void,
};

const SendFailedOrderEmailForm = (props: SendFailedOrderEmailFormProps) => {
  const { onSubmitSuccess, onCancel } = props;

  const { sendFailedOrderEmail, errorMsg, successMsg } = useOrders();
  const { sendFailedOrderEmailFormValidation, orderFieldsInitValues } = useForms();

  const handleSubmit = async (values: { orderId: number }) => {
    sendFailedOrderEmail(values.orderId, onSubmitSuccess);
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
          Send failed order email
        </Typography>

        <Formik
          initialValues={{
            orderId: orderFieldsInitValues.id,
          }}
          validationSchema={sendFailedOrderEmailFormValidation}
          onSubmit={handleSubmit}
        >
          {props => (
            <Form>

              {/* OrderID Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="orderId"
                name="orderId"
                autoComplete="orderId"
                label="Order ID"
                type="numeric"  
                inputProps={{
                  min: 0,
                  inputMode: 'numeric',
                }} 
                value={props.values.orderId}
                onChange={props.handleChange}
                error={props.touched.orderId && Boolean(props.errors.orderId)}
                helperText={props.touched.orderId && props.errors.orderId} 
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send
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

export default SendFailedOrderEmailForm;
