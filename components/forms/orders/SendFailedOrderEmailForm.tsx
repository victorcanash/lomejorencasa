import { useRouter } from 'next/router'

import { Formik, Form } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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

  const router = useRouter();
  const intl = useIntl();

  const { sendFailedOrderEmail, errorMsg, successMsg } = useOrders();
  const { sendFailedOrderEmailFormValidation, orderFieldsInitValues } = useForms();

  const handleSubmit = async (values: { locale: string, orderId: number }) => {
    sendFailedOrderEmail(values.orderId, values.locale, onSubmitSuccess);
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
            id="forms.sendFailedOrderEmail.title" 
          />
        </Typography>

        <Formik
          initialValues={{
            locale: orderFieldsInitValues.locale,
            orderId: orderFieldsInitValues.id,
          }}
          validationSchema={sendFailedOrderEmailFormValidation}
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
                {/* router.locales?.map((locale) => (
                  <MenuItem key={locale} value={locale}>
                    {locale}
                  </MenuItem>
                ))*/}
                <MenuItem key={'es'} value={'es'}>
                  es
                </MenuItem>
              </Select>

              {/* OrderID Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="orderId"
                name="orderId"
                autoComplete="orderId"
                label={intl.formatMessage({ id: "forms.orderId" })}
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
                <FormattedMessage 
                  id="forms.sendFailedOrderEmail.successBtn" 
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
                      id="forms.cancelBtn" 
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

export default SendFailedOrderEmailForm;
