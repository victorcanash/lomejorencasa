import { Dispatch, SetStateAction, useState } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { FormFieldTypes } from '@core/constants/forms';
import type { CartItem } from '@core/types/cart';

import type { FormButtonsCheckout } from '@lib/types/forms';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';
import useForms from '@lib/hooks/useForms';
import usePayments from '@lib/hooks/usePayments';
import useCart from '@lib/hooks/useCart';
import BaseForm from '@components/forms/BaseForm';
import AddressDetail from '@components/checkout/details/AddressDetail';
import CartDetail from '@components/cart/CartDetail';
import CheckedCartDialog from '@components/dialogs/CheckedCartDialog';

type CheckoutConfirmFormProps = {
  back?: () => void,
  setTransactionError?: Dispatch<SetStateAction<string>>,
};

const CheckoutConfirmForm = (props: CheckoutConfirmFormProps) => {
  const { back, setTransactionError } = props;

  const { setLoading } = useAppContext();
  const { user, setUser, checkoutPayment, getCardPayload, getPaypalPayload, isLogged } = useAuthContext();
  const { cart, totalPrice } = useCartContext();

  const intl = useIntl();

  const { checkoutConfirmFormValidation, userFieldsInitValues } = useForms();
  const { sendConfirmTransactionEmail, createTransaction, errorMsg, successMsg } = usePayments();
  const { checkCart } = useCart();

  const [openDialog, setOpenDialog] = useState(false);
  const [changedCart, setChangedCart] = useState(false);
  const [changedItemsByInventory, setChangedItemsByInventory] = useState<CartItem[]>([]);

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleBack = () => {
    if (setTransactionError) {
      setTransactionError('');
    }
    if (back) {
      back();
    }
  };

  const handleSubmit = async (values: { email: string } | undefined) => {
    if (setTransactionError) {
      setTransactionError('');
    }
    if (!isLogged() && values?.email) {
      setUser({
        ...user,
        email: values.email,
      });
    }
    checkCart(onSuccessCheckCart);
  };

  const onSuccessCheckCart = (changedCart: boolean, changedItemsByInventory: CartItem[]) => {
    setChangedCart(changedCart);
    setChangedItemsByInventory(changedItemsByInventory);
    if (changedItemsByInventory.length < 1 && !changedCart) {
      if (!isLogged()) {
        sendConfirmTransactionEmail(onErrorTransaction);
      } else {
        createTransaction(onErrorTransaction);
      }
    } else {
      setLoading(false);
      handleDialog();
    }
  };

  const onErrorTransaction = (message: string) => {
    if (setTransactionError) {
      setTransactionError(message);
    }
    if (back) {
      back();
    }
  };

  const emptyCart = () => {
    if (cart.items.length > 0) {
      return false;
    }
    return true;
  };

  return (
    <>
      { user.billing && user.shipping &&
        <>
          <BaseForm
            maxWidth="800px"
            initialValues={ !isLogged() ? {
              email: user?.email || userFieldsInitValues.email,
            } : {}}
            validationSchema={!isLogged() ? checkoutConfirmFormValidation : undefined}
            enableReinitialize={!isLogged() ? true : undefined}
            formFieldGroups={[
              {
                descriptionTxt: !isLogged() ? {
                  id: 'checkout.confirmEmail',
                } : undefined,
                formFields: !isLogged() ? [
                  {
                    name: 'email',
                    type: FormFieldTypes.text,
                    required: true,
                  }
                ] : undefined,
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
                        <Typography component="h3" variant="h1" mt={3}>
                          <FormattedMessage 
                            id="checkout.sections.payment" 
                          />
                        </Typography>
                        <Box mt={1}>
                          { getCardPayload()?.details.lastFour &&
                            <Typography component="div" variant="body1">
                              <FormattedMessage 
                                id="orderDetail.paidCard" 
                                values={{
                                  cardType: checkoutPayment?.methodPayload.type,
                                  last4: getCardPayload()?.details.lastFour,
                                }}
                              />
                            </Typography>
                          }
                          { getPaypalPayload()?.details.email &&
                            <Typography component="div" variant="body1">
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

          <CheckedCartDialog
            open={openDialog}
            handleDialog={handleDialog}
            changedCart={changedCart}
            changedItemsByInventory={changedItemsByInventory}
            message={intl.formatMessage({ id: 'dialogs.checkedCart.content.checkoutPage' })}
          />
        </>
      }
    </>
  );
};

export default CheckoutConfirmForm;
