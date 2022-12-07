import { Dispatch, SetStateAction, useState } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import { CartItem } from '@core/types/cart';
import { useAppContext } from '@lib/contexts/AppContext';
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

  const { setLoading } = useAppContext();
  const { user, paymentPayload, getCardPayload, getPaypalPayload } = useAuthContext();
  const { cart, totalPrice } = useCartContext();

  const intl = useIntl();

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
      createTransaction(paymentPayload?.nonce || '', onErrorCreateTransaction);
    } else {
      setLoading(false);
      handleDialog();
    }
  };

  const onErrorCreateTransaction = (message: string) => {
    setTransactionError(message);
    back();
  };

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
                <FormattedMessage 
                  id="forms.shipping" 
                />
              </Typography>
              <Box mt={1}>
                <AddressDetail 
                  address={user.shipping}
                  variant="subtitle1"
                />
              </Box>
              <Typography component="h3" variant="h6" mt={3}>
                <FormattedMessage 
                  id="forms.billing" 
                />
              </Typography>
              <Box mt={1}>
                <AddressDetail 
                  address={user.billing}
                  variant="subtitle1"
                />
              </Box>
              <Typography component="h3" variant="h6" mt={3}>
                <FormattedMessage 
                  id="checkout.sections.payment" 
                />
              </Typography>
              <Box mt={1}>
                { getCardPayload()?.details.lastFour &&
                  <Typography component="div" variant="subtitle1">
                    <FormattedMessage 
                      id="orderDetail.paidCard" 
                      values={{
                        cardType: paymentPayload?.type,
                        last4: getCardPayload()?.details.lastFour,
                      }}
                    />
                  </Typography>
                }
                { getPaypalPayload()?.details.email &&
                  <Typography component="div" variant="subtitle1">
                    <FormattedMessage 
                      id="orderDetail.paidPaypal" 
                      values={{
                        payerEmail: getPaypalPayload()?.details.email
                      }}
                    />
                  </Typography>
                }
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography component="h3" variant="h6">
                <FormattedMessage 
                  id="checkout.order" 
                />
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
                    <FormattedMessage 
                      id="cart.noItems" 
                    />
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
                <FormattedMessage 
                  id="app.backBtn" 
                />
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
                <FormattedMessage 
                  id="checkout.confirmBtn" 
                />
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
            message={intl.formatMessage({ id: 'dialogs.checkedCart.content.checkoutPage' })}
          />

        </Container>
      }
    </>
  );
};

export default CheckoutConfirmationSection;