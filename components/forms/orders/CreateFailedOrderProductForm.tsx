import { Formik, Form } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { OrderProductFailedCreate } from '@core/types/orders';
import useForms from '@lib/hooks/useForms';

type CreateFailedOrderProductFormProps = {
  onSubmitSuccess: (orderProduct: OrderProductFailedCreate) => void,
};

const CreateFailedOrderProductForm = (props: CreateFailedOrderProductFormProps) => {
  const { onSubmitSuccess } = props;

  const intl = useIntl();

  const { createFailedOrderProductFormValidation, orderProductFieldsInitValues } = useForms();

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

        <Typography component="h3" variant="body1">
          <FormattedMessage 
            id="forms.createFailedOrderProduct.title" 
          />
        </Typography>

        <Formik
          initialValues={orderProductFieldsInitValues as OrderProductFailedCreate}
          validationSchema={createFailedOrderProductFormValidation}
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
                label={intl.formatMessage({ id: "forms.quantity" })}
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
                label={intl.formatMessage({ id: "forms.inventoryId" })}
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
                <FormattedMessage 
                  id="forms.createFailedOrderProduct.successBtn" 
                />
              </Button> 

            </Form>
          )}
        </Formik>
      
      </Box>

    </Container>
  );
};

export default CreateFailedOrderProductForm;
