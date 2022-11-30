import { Formik, Form } from 'formik';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { orderProductFailedCreateValidation, initOrderProductFailedCreateValues } from '@core/constants/forms/orders';
import { OrderProductFailedCreate } from '@core/types/orders';

type CreateFailedOrderProductFormProps = {
  onSubmitSuccess: (orderProduct: OrderProductFailedCreate) => void,
};

const CreateFailedOrderProductForm = (props: CreateFailedOrderProductFormProps) => {
  const { onSubmitSuccess } = props;

  const handleSubmit = async (values: OrderProductFailedCreate) => {
    onSubmitSuccess(values)
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

        <Typography component="h3" variant="subtitle1">
          Add order product
        </Typography>

        <Formik
          initialValues={initOrderProductFailedCreateValues}
          validationSchema={orderProductFailedCreateValidation}
          onSubmit={handleSubmit}
        >
          {props => (
            <Form>

              {/* Quantity Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="quantity"
                name="quantity"
                autoComplete="quantity"
                label="Quantity"
                type="numeric"  
                inputProps={{
                  min: 0,
                  inputMode: 'numeric',
                }} 
                value={props.values.quantity}
                onChange={props.handleChange}
                error={props.touched.quantity && Boolean(props.errors.quantity)}
                helperText={props.touched.quantity && props.errors.quantity} 
              />

              {/* InventoryID Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="inventoryId"
                name="inventoryId"
                autoComplete="inventoryId"
                label="Inventory ID"
                type="numeric"  
                inputProps={{
                  min: 0,
                  inputMode: 'numeric',
                }} 
                value={props.values.inventoryId}
                onChange={props.handleChange}
                error={props.touched.inventoryId && Boolean(props.errors.inventoryId)}
                helperText={props.touched.inventoryId && props.errors.inventoryId} 
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add order product
              </Button> 

            </Form>
          )}
        </Formik>
      
      </Box>

    </Container>
  );
};

export default CreateFailedOrderProductForm;
