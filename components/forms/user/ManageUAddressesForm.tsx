import { Formik, Form, FormikHelpers } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { AddressTypes } from '@core/constants/addresses';
import { CheckoutAddresses } from '@core/types/checkout';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useUser from '@lib/hooks/useUser';
import useForms from '@lib/hooks/useForms';
import UAddressForm from '@components/forms/user/UAddressForm';

type ManageUAddressesFormProps = {
  onSubmitSuccess?: () => void,
};

const ManageUAddressesForm = (props: ManageUAddressesFormProps) => {
  const { onSubmitSuccess } = props;

  const { user } = useAuthContext();

  const intl = useIntl();

  const { updateUserAddresses: updateAddresses, errorMsg, successMsg } = useUser();
  const { checkoutAddressesFormValidation, addressFieldsInitValues } = useForms();

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
            id: user?.shipping?.id || -1,
            userId: user?.shipping?.userId || user?.id || -1,
            type: user?.shipping?.type || AddressTypes.SHIPPING,
            firstName: user?.shipping?.firstName || user?.firstName || addressFieldsInitValues.firstName,
            lastName: user?.shipping?.lastName || user?.lastName || addressFieldsInitValues.lastName,
            addressLine1: user?.shipping?.addressLine1 || addressFieldsInitValues.addressLine1,
            addressLine2: user?.shipping?.addressLine2 || addressFieldsInitValues.addressLine2,
            postalCode: user?.shipping?.postalCode || addressFieldsInitValues.postalCode,
            locality: user?.shipping?.locality || addressFieldsInitValues.locality,
            country: user?.shipping?.country || addressFieldsInitValues.country,
          },
          billing: {
            id: user?.billing?.id || -1,
            userId: user?.billing?.userId || user?.id || -1,
            type: user?.billing?.type || AddressTypes.BILLING,
            firstName: user?.billing?.firstName || user?.firstName || addressFieldsInitValues.firstName,
            lastName: user?.billing?.lastName || user?.lastName || addressFieldsInitValues.lastName,
            addressLine1: user?.billing?.addressLine1 || addressFieldsInitValues.addressLine1,
            addressLine2: user?.billing?.addressLine2 || addressFieldsInitValues.addressLine2,
            postalCode: user?.billing?.postalCode || addressFieldsInitValues.postalCode,
            locality: user?.billing?.locality || addressFieldsInitValues.locality,
            country: user?.billing?.country || addressFieldsInitValues.country,
          },
          sameAsShipping: false,
        } as CheckoutAddresses}
        validationSchema={checkoutAddressesFormValidation}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {props => (
          <Form>
            <Grid container spacing={5} mt={1}>
              <Grid item xs={12} sm={6}>
                <Typography component="h3" variant="h6">
                  <FormattedMessage 
                    id="forms.shipping" 
                  />
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
                  <FormattedMessage 
                    id="forms.billing" 
                  />
                </Typography>
                <FormControlLabel 
                  control={
                    <Checkbox 
                      id="sameAsShipping"
                      name="sameAsShipping"
                      onChange={props.handleChange} 
                    />
                  } 
                  label={intl.formatMessage({ id: "forms.sameAsShipping" })}
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
                  <FormattedMessage 
                    id="app.backBtn" 
                  />
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
                      <FormattedMessage 
                        id="app.continueBtn" 
                      />
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
                      <FormattedMessage 
                        id="app.continueBtn" 
                      />
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
