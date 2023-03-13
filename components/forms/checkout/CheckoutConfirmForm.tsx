import { Dispatch, SetStateAction, useState } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';
import { cardPaymentMethodPayload } from 'braintree-web-drop-in';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import envConfig from '@core/config/env.config';
import type { CartItem } from '@core/types/cart';

import type { FormButtonsCheckout } from '@lib/types/forms';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';
import usePayments from '@lib/hooks/usePayments';
import useCart from '@lib/hooks/useCart';
import BaseForm from '@components/forms/BaseForm';
import AddressDetail from '@components/addresses/AddressDetail';
import CartDetail from '@components/cart/CartDetail';
import CheckoutEmailDialog from '@components/dialogs/CheckoutEmailDialog';

type CheckoutConfirmFormProps = {
  back: () => void,
  setTransactionError: Dispatch<SetStateAction<string>>,
  confirmToken: string,
  handleCartDialog: () => void,
  setChangedCartDialog: Dispatch<SetStateAction<boolean>>,
  setChangedItemsByInventoryDialog: Dispatch<SetStateAction<CartItem[]>>,
};

const CheckoutConfirmForm = (props: CheckoutConfirmFormProps) => {
  const { 
    back, 
    setTransactionError, 
    confirmToken,
    handleCartDialog,
    setChangedCartDialog,
    setChangedItemsByInventoryDialog,
  } = props;

  const { setLoading } = useAppContext();
  const { 
    user, 
    paypalClientId, 
    paypalMerchantId,
    paypalToken,
    checkoutPayment, 
    isLogged 
  } = useAuthContext();
  const { cart, totalPrice } = useCartContext();

  const intl = useIntl();

  const { createBraintreeTransaction, capturePaypalTransaction, errorMsg, successMsg } = usePayments();
  const { checkCart } = useCart();

  const [openEmailDialog, setOpenEmailDialog] = useState(false);

  const handleEmailDialog = () => {
    setOpenEmailDialog(!openEmailDialog);
  };

  const handleBack = () => {
    setTransactionError('');
    back();
  };

  const handleSubmit = async () => {
    setTransactionError('');
    checkCart(onSuccessCheckCart);
  };

  const onSuccessCheckCart = (changedCart: boolean, changedItemsByInventory: CartItem[]) => {
    setChangedCartDialog(changedCart);
    setChangedItemsByInventoryDialog(changedItemsByInventory);
    if (changedItemsByInventory.length < 1 && !changedCart) {
      if (confirmToken !== '' || isLogged()) {
        if (!paypalMerchantId || !paypalClientId || !paypalToken) {
          createBraintreeTransaction(isLogged() ? undefined : confirmToken, onErrorTransaction);
        } else {
          capturePaypalTransaction(isLogged() ? undefined: confirmToken, onErrorTransaction);
        }
      } else {
        setLoading(false);
        handleEmailDialog();
      }
    } else {
      setLoading(false);
      handleCartDialog();
    }
  };

  const onErrorTransaction = (message: string) => {
    if (message == intl.formatMessage({ id: 'checkout.errors.sendConfirmTransactionEmail.registered' })) {
      return;
    }
    if (openEmailDialog) {
      handleEmailDialog();
    }
    setTransactionError(message);
    back();
  };

  const emptyCart = () => {
    if (cart.items.length > 0) {
      return false;
    }
    return true;
  };

  const getCardType = () => {
    return checkoutPayment.braintreePayload ? 
      (checkoutPayment.braintreePayload as cardPaymentMethodPayload)?.details.cardType : checkoutPayment.paypalPayload?.card?.type; 
  }

  const getCardLastFour = () => {
    return checkoutPayment.braintreePayload ? 
      (checkoutPayment.braintreePayload as cardPaymentMethodPayload)?.details.lastFour : checkoutPayment.paypalPayload?.card?.lastFour; 
  }

  return (
    <>
      { user.billing && user.shipping &&
        <>
          <BaseForm
            maxWidth="800px"
            initialValues={{}}
            formFieldGroups={[
              {
                extraElements:
                  <>
                    <Grid container columnSpacing={5} rowSpacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography component="h3" variant="h1">
                          <FormattedMessage 
                            id="forms.shipping" 
                          />
                        </Typography>
                        <Box mt={1}>
                          <AddressDetail 
                            address={user.shipping}
                            variant="body1"
                          />
                        </Box>
                        { envConfig.NEXT_PUBLIC_PAYPAL_ADVANCED_CARDS === 'enabled' &&
                          <>
                            <Typography component="h3" variant="h1" mt={3}>
                              <FormattedMessage 
                                id="forms.billing" 
                              />
                            </Typography>
                            <Box mt={1}>
                              <AddressDetail 
                                address={user.billing}
                                variant="body1"
                              />
                            </Box>
                          </>
                        }
                        <Typography component="h3" variant="h1" mt={3}>
                          <FormattedMessage 
                            id="checkout.sections.payment" 
                          />
                        </Typography>
                        <Box mt={1}>
                          { getCardType() && getCardLastFour() ?
                            <Typography component="div" variant="body1">
                              <FormattedMessage 
                                id="orderDetail.paidCard" 
                                values={{
                                  cardType: getCardType(),
                                  last4: getCardLastFour(),
                                }}
                              />
                            </Typography>
                            :
                            <Typography component="div" variant="body1">
                              <FormattedMessage 
                                id="orderDetail.paidPaypal" 
                                values={{
                                  payerEmail: '',
                                }}
                              />
                            </Typography>
                          }
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography component="h3" variant="h1" mb={!emptyCart() ? 2 : 1}>
                          <FormattedMessage 
                            id="checkout.order" 
                          />
                        </Typography>
                        { !emptyCart() ?
                          <>
                            <CartDetail
                              items={cart.items}
                              totalPrice={totalPrice}
                              showEmptyItems={false}
                            />  
                          </>
                          :
                          <>
                            <Typography component='div' variant='body1'>
                              <FormattedMessage 
                                id="cart.noItems" 
                              />
                            </Typography>
                          </>
                        }
                      </Grid>
                    </Grid>
                    <Box sx={{ height: '5px' }}/>
                  </>,
              }
            ]}
            formButtons={{
              submit: {
                text: { 
                  id: 'checkout.confirmBtn',
                },
                onSubmit: handleSubmit,
                disabled: totalPrice <= 0,
              },
              back: {
                text: { 
                  id: 'app.backBtn',
                },
                onClick: handleBack,
              },
            } as FormButtonsCheckout}
            successMsg={successMsg}
            errorMsg={errorMsg}
          />

          { !isLogged() && confirmToken === '' &&
            <CheckoutEmailDialog
              open={openEmailDialog}
              handleDialog={handleEmailDialog}
              onErrorSend={onErrorTransaction}
            />
          }
        </>
      }
    </>
  );
};

export default CheckoutConfirmForm;
