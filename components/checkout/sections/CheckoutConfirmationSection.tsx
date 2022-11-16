import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import { pages } from '@core/config/navigation.config';
import { CartItem } from '@core/types/cart';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';
import useCart from '@lib/hooks/useCart';
import usePayments from '@lib/hooks/usePayments';
import CartDetail from '@components/cart/CartDetail';
import AddressDetail from '@components/checkout/details/AddressDetail';
import CheckedCartDialog from '@components/dialogs/CheckedCartDialog';

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
  const { checkCart } = useCart();

  const [openDialog, setOpenDialog] = useState(false);
  const [changedCart, setChangedCart] = useState(false);
  const [changedItemsByInventory, setChangedItemsByInventory] = useState<CartItem[]>([]);

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleConfirm = () => {
    setTransactionError('');
    checkCart(onSuccessCheckCart);
  };

  const onSuccessCheckCart = (changedCart: boolean, changedItemsByInventory: CartItem[]) => {
    setChangedCart(changedCart);
    setChangedItemsByInventory(changedItemsByInventory);
    if (changedItemsByInventory.length < 1 && !changedCart) {
      createTransaction(paymentPayload?.nonce || '', onSuccessCreateTransaction, onErrorCreateTransaction);
    } else {
      handleDialog();
    }
  };

  const onSuccessCreateTransaction = () => {
    router.push(pages.orders.path);
  };

  const onErrorCreateTransaction = (message: string) => {
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
              { cart && cart.items && cart.items.length > 0 && totalPrice > 0 ?
                <>
                  <CartDetail
                    showEmptyItems={false}
                  />  
                </>
              :
                <>
                  <Typography component='div' variant='subtitle1' mt={1}>
                    There are no products added
                  </Typography>
                </>
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
                onClick={handleConfirm}
                disabled={totalPrice <= 0}
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

          <CheckedCartDialog
            open={openDialog}
            handleDialog={handleDialog}
            changedCart={changedCart}
            changedItemsByInventory={changedItemsByInventory}
            message='Check your order and click the confirm button again.'
          />

        </Container>
      }
    </>
  );
};

export default CheckoutConfirmationSection;