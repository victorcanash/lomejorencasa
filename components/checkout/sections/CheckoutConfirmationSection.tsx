import { Fragment, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';

import { pages } from '@core/config/navigation.config';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';
import usePayments from '@lib/hooks/usePayments';
import CartItem from '@components/cart/CartItem';
import AddressDetail from '@components/checkout/details/AddressDetail';

type CheckoutConfirmationSectionProps = {
  back: () => void,
  setTransactionError: Dispatch<SetStateAction<string>>,
};

const CheckoutConfirmationSection = (props: CheckoutConfirmationSectionProps) => {
  const { back, setTransactionError } = props;

  const { user, paymentPayload, getCardPayload, getPaypalPayload } = useAuthContext();

  const { cart, totalPrice } = useCartContext();

  const router = useRouter();

  const { createTransaction, errorMsg, successMsg } = usePayments();

  const handleSubmit = () => {
    setTransactionError('');
    createTransaction(paymentPayload?.nonce || '', onSuccessSubmit, onErrorSubmit);
  };

  const onSuccessSubmit = () => {
    router.push(pages.orders.path);
  };

  const onErrorSubmit = (message: string) => {
    setTransactionError(message);
    back();
  }

  const handleBack = () => {
    setTransactionError('');
    back();
  };

  return (
    <>
      { user && cart && user.billing && user.shipping &&
        <Container maxWidth="md">

          <Grid container spacing={5} mt={1}>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" variant="h6">
                Shipping address
              </Typography>
              <Box mt={1}>
                <AddressDetail 
                  address={user.shipping}
                />
              </Box>
              <Typography component="h3" variant="h6" mt={3}>
                Billing address
              </Typography>
              <Box mt={1}>
                <AddressDetail 
                  address={user.billing}
                />
              </Box>
              <Typography component="h3" variant="h6" mt={3}>
                Payment
              </Typography>
              <Box mt={1}>
                <Typography component="div" variant="subtitle1" >
                  {paymentPayload?.type}
                </Typography>
                <Typography component="div" variant="subtitle1">
                  {`Finishes in ${getCardPayload()?.details.lastFour}`}
                </Typography>
                <Typography component="div" variant="subtitle1">
                  {getPaypalPayload()?.details.email}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography component="h3" variant="h6">
                Order
              </Typography>
              <Box mt={1}>
                {cart?.items.map((item) => (
                  <Fragment key={item.id}>
                    <CartItem 
                      item={item}
                    />
                    <Divider variant='fullWidth' sx={{ my: 3 }} />
                  </Fragment>
                ))}
              </Box>
              <Typography
                component="div"
                variant='h6'
                align='right'
                className='animate__animated animate__fadeInUp'
              >
                Total: {totalPrice.toFixed(2)} €
              </Typography>   
            </Grid>
          </Grid>

          <Grid container spacing={5} mt={1}>
            <Grid item xs={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleBack}
              >
                Back
              </Button> 
            </Grid> 

            <Grid item xs={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Confirm
              </Button> 
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

        </Container>
      }
    </>
  );
};

export default CheckoutConfirmationSection;