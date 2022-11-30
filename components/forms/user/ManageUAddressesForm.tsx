import { Formik, Form, FormikHelpers } from 'formik';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { checkoutAddressesValidation, initCheckoutAddressesValues } from '@core/constants/forms/checkout';
import { CheckoutAddresses } from '@core/types/checkout';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useUser from '@lib/hooks/useUser';
import UAddressForm from '@components/forms/user/UAddressForm';

type ManageUAddressesFormProps = {
  onSubmitSuccess?: () => void,
};

const ManageUAddressesForm = (props: ManageUAddressesFormProps) => {
  const { onSubmitSuccess } = props;

  const { user } = useAuthContext();

  const { updateUserAddresses: updateAddresses, errorMsg, successMsg } = useUser();

  const handleSubmit = async (values: CheckoutAddresses, formikHelpers: FormikHelpers<CheckoutAddresses>) => {
    if (!user) {
      return;
    }
    const checkoutAddresses = {...values};
    if (values.sameAsShipping) {
      checkoutAddresses.billing = {...values.shipping};
      formikHelpers.setFieldValue('billing.firstName', values.shipping.firstName);
      formikHelpers.setFieldValue('billing.lastName', values.shipping.lastName);
      formikHelpers.setFieldValue('billing.addressLine1', values.shipping.addressLine1);
      formikHelpers.setFieldValue('billing.addressLine2', values.shipping.addressLine2);
      formikHelpers.setFieldValue('billing.postalCode', values.shipping.postalCode);
      formikHelpers.setFieldValue('billing.locality', values.shipping.locality);
      formikHelpers.setFieldValue('billing.country', values.shipping.country);
    }
    updateAddresses(user, checkoutAddresses, onSubmitSuccess);
  };

  const handleSubmitWithoutSave = () => {
    if (onSubmitSuccess) {
      onSubmitSuccess();
    };
  };

  return (
    <Container maxWidth="md">

      <Formik
        initialValues={{
          shipping: {
            id: user?.shipping?.id || initCheckoutAddressesValues.shipping.id,
            userId: user?.shipping?.userId || user?.id || initCheckoutAddressesValues.shipping.userId,
            type: user?.shipping?.type || initCheckoutAddressesValues.shipping.type,
            firstName: user?.shipping?.firstName || user?.firstName || initCheckoutAddressesValues.shipping.firstName,
            lastName: user?.shipping?.lastName || user?.lastName || initCheckoutAddressesValues.shipping.lastName,
            addressLine1: user?.shipping?.addressLine1 || initCheckoutAddressesValues.shipping.addressLine1,
            addressLine2: user?.shipping?.addressLine2 || initCheckoutAddressesValues.shipping.addressLine2,
            postalCode: user?.shipping?.postalCode || initCheckoutAddressesValues.shipping.postalCode,
            locality: user?.shipping?.locality || initCheckoutAddressesValues.shipping.locality,
            country: user?.shipping?.country || initCheckoutAddressesValues.shipping.country,
          },
          billing: {
            id: user?.billing?.id || initCheckoutAddressesValues.billing.id,
            userId: user?.billing?.userId || user?.id || initCheckoutAddressesValues.billing.userId,
            type: user?.billing?.type || initCheckoutAddressesValues.billing.type,
            firstName: user?.billing?.firstName || user?.firstName || initCheckoutAddressesValues.billing.firstName,
            lastName: user?.billing?.lastName || user?.lastName || initCheckoutAddressesValues.billing.lastName,
            addressLine1: user?.billing?.addressLine1 || initCheckoutAddressesValues.billing.addressLine1,
            addressLine2: user?.billing?.addressLine2 || initCheckoutAddressesValues.billing.addressLine2,
            postalCode: user?.billing?.postalCode || initCheckoutAddressesValues.billing.postalCode,
            locality: user?.billing?.locality || initCheckoutAddressesValues.billing.locality,
            country: user?.billing?.country || initCheckoutAddressesValues.billing.country,
          },
          sameAsShipping: initCheckoutAddressesValues.sameAsShipping,
        } as CheckoutAddresses}
        validationSchema={checkoutAddressesValidation}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {props => (
          <Form>
            <Grid container spacing={5} mt={1}>
              <Grid item xs={12} sm={6}>
                <Typography component="h3" variant="h6">
                  Shipping address
                </Typography>
                <UAddressForm
                  values={props.values.shipping}
                  errors={props.errors.shipping}
                  touched={props.touched.shipping}
                  handleChange={props.handleChange}
                  autoFocus={true}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography component="h3" variant="h6">
                  Billing address
                </Typography>
                {/* Same as Shipping Field */}
                <FormControlLabel 
                  control={
                    <Checkbox 
                      id="sameAsShipping"
                      name="sameAsShipping"
                      //checked={props.values.sameAsShipping}
                      onChange={props.handleChange} 
                    />
                  } 
                  label="Same as shipping address" 
                />
                { !props.values.sameAsShipping &&
                  <UAddressForm
                    values={props.values.billing}
                    errors={props.errors.billing}
                    touched={props.touched.billing}
                    handleChange={props.handleChange}
                    autoFocus={false}
                  />
                }
              </Grid>
            </Grid>

            <Grid container spacing={5} mt={1}>
              <Grid item xs={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled
                >
                  Back
                </Button> 
              </Grid> 

              <Grid item xs={6}>
                {
                  (props.dirty || !user?.shipping || !user?.billing) &&
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                      Continue
                    </Button> 
                }  
                {
                  (!props.dirty && user?.shipping && user?.billing) &&
                    <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmitWithoutSave}
                    >
                      Continue
                    </Button> 
                } 
              </Grid>  
            </Grid>

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

    </Container>
  );
};

export default ManageUAddressesForm;
