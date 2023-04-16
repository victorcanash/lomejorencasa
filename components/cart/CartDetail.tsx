import { Fragment } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { firstBuyDiscountPercent } from '@core/constants/payments';
import type { Page } from '@core/types/navigation';
import { convertElementToSx } from '@core/utils/themes';
import LinkButton from '@core/components/LinkButton';

import colors from '@lib/constants/themes/colors';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { pages } from '@lib/constants/navigation';
import { useCartContext } from '@lib/contexts/CartContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useCart from '@lib/hooks/useCart';
import CartItemDetail from '@components/cart/CartItemDetail';

type CartDetailProps = {
  page?: Page,
};

const CartDetail = (props: CartDetailProps) => {
  const { 
    page,
  } = props;

  const { cart, totalPrice, isEmpty, disabledCheckoutPage, closeDrawer } = useCartContext();
  const { convertPriceToString } = useAuthContext();

  const intl = useIntl();

  const { totalAmount, updateCartItemQuantity } = useCart();

  const Subdivider = (props: { mt?: number, mb?: number }) => (
    <Divider 
      sx={{ 
        border: `1px solid ${colors.border.divider}4f`, 
        mt: props.mt || 1,  
        mb: props.mb || 1,
      }} 
    />
  );

  return (
    <>
      { !isEmpty ?
        <>
          {/* Cart Items Detail */}
          <Box>
            { cart.items.map((item, index) => (
              <Fragment key={index}>
                { ((page === pages.checkout && item.quantity > 0) || (page !== pages.checkout)) &&
                  <>
                    <CartItemDetail 
                      item={item}
                      Subdivider={Subdivider}
                      page={page}
                      updateQuantity={page !== pages.checkout ? updateCartItemQuantity : undefined}
                      priorityImg={index <= 4 ? true : false}
                    />
                    <Divider
                      sx={{
                        mt: 3,
                        mb: 3,
                      }} 
                    />
                  </>
                }
              </Fragment>
            ))}
          </Box>
          {/* Cart All Detail */}
          <Box>
            <Typography component="h2" variant="h3" textAlign="center" mt={-1}>
              <FormattedMessage id="cart.totalTitle" />
            </Typography>
            <Subdivider mt={2} />
            <Box>
              {/* Cart Amount */}
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography component="div" variant="body1" sx={{ fontWeight: 700 }}>
                    <FormattedMessage
                      id="cart.subtotal"
                    />
                  </Typography>
                </Grid>
                <Grid item>  
                  <Typography component="div" variant="body1">
                    {convertPriceToString(totalPrice)}
                  </Typography>
                </Grid>
              </Grid>
              <Subdivider />
              {/* First Buy Discount */}
              { totalAmount.totalDiscount > 0 &&
                <>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography component="div" variant="body1" sx={{ fontWeight: 700 }}>
                        <FormattedMessage
                          id="cart.firstBuyDiscount"
                        />
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography component="div" variant="body1">
                        {`-${firstBuyDiscountPercent}%`}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Subdivider />
                </>
              }
              {/* Cart Shipping */}
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography component="div" variant="body1" sx={{ fontWeight: 700 }}>
                    <FormattedMessage
                      id="cart.shipping"
                    />
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="div" variant="body1">
                    <FormattedMessage
                      id="cart.freeShipping"
                    />
                  </Typography>
                </Grid>
              </Grid>
              <Subdivider />
              {/* Cart Total */}
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography component="div" variant="body1" sx={{ fontWeight: 700 }}>
                    <FormattedMessage
                      id="cart.total"
                    />
                    &nbsp;
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="span" variant="body1">
                    {`${convertPriceToString(totalAmount.total)}`}
                  </Typography>
                  <Typography component="span" variant="body2">
                    {` (${intl.formatMessage({ id: 'productDetail.price.iva' })})`}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          { !page &&
            <Box mt={3}>
              {/* Cart Button */}
              <LinkButton
                onClick={closeDrawer}
                href={pages.cart.path}
                fullWidth
              >
                <FormattedMessage id="cart.cartBtn" />
              </LinkButton>
            </Box>
          }
          { page !== pages.checkout &&
            <Box>
              {/* Checkout Button */}
              <LinkButton
                onClick={closeDrawer}
                href={pages.checkout.path}
                disabled={disabledCheckoutPage()}
                fullWidth
                sx={{
                  ...convertElementToSx(themeCustomElements.button.action.primary),
                  mt: 3,
                }}
              >
                <FormattedMessage id="cart.checkoutBtn" />
              </LinkButton>
            </Box>
          }
        </>
        :
        <Typography component='div' variant='body1' sx={{ my: 5, textAlign: 'center' }}>
          <FormattedMessage id="cart.noItems" />
        </Typography>
      }
    </>
  );
};

export default CartDetail;
