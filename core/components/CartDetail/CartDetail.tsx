import { Fragment, useCallback, useMemo } from 'react';

import NP from 'number-precision'
import { useIntl, FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { firstBuyDiscountPercent } from '@core/constants/payments';
import type { Page } from '@core/types/navigation';
import type { Order } from '@core/types/orders';
import type { CartItem, GuestCartCheckItem } from '@core/types/cart';
import { convertElementToSx } from '@core/utils/themes';
import LinkButton from '@core/components/navigation/LinkButton';
import Divider from '@core/components/ui/Divider';

import { themeCustomElements } from '@lib/constants/themes/elements';
import { pages } from '@lib/config/navigation.config';
import { useCartContext } from '@core/contexts/CartContext';
import { useAuthContext } from '@core/contexts/AuthContext';
import useCart from '@core/hooks/useCart';
import CartItemDetail from '@core/components/CartDetail/CartItemDetail';

type CartDetailProps = {
  page?: Page,
  order?: Order,
};

const CartDetail = (props: CartDetailProps) => {
  const { 
    page,
    order,
  } = props;

  const { cart, totalPrice, disabledCheckoutPage, closeDrawer } = useCartContext();
  const { convertPriceToString } = useAuthContext();

  const intl = useIntl();

  const { totalAmount, updateCartItemQuantity } = useCart();

  const Subdivider = useCallback((props: { mt?: number, mb?: number }) => (
    <Divider
      themeElement={themeCustomElements.dividers?.subdivider}
      mt={props.mt || 1}
      mb={props.mb || 1}
    />
  ), []);

  const items = useMemo(() => {
    let listItems: (CartItem | GuestCartCheckItem)[] = [];
    if (page === pages.orders) {
      listItems = order?.items || [];
    } else {
      listItems = cart.items;
    }
    return listItems;
  }, [cart.items, order?.items, page]);

  const breakdown = useMemo(() => {
    return {
      subtotal: page !== pages.orders ?
        totalPrice : NP.plus(
          parseFloat(order?.transaction.amount.breakdown.itemTotal.value || '0'),
          parseFloat(order?.transaction.amount.breakdown.taxTotal.value || '0')
        ),
      discount: page !== pages.orders ?
        totalAmount.totalDiscount : parseFloat(order?.transaction.amount.breakdown.discount.value || '0'),
      shipping: page !== pages.orders ?
        0 : parseFloat(order?.transaction.amount.breakdown.shipping.value || '0'),
      total: page !== pages.orders ?
        totalAmount.total : parseFloat(order?.transaction.amount.value || '0'),
    }
  }, [order?.transaction.amount.breakdown.discount.value, order?.transaction.amount.breakdown.itemTotal.value, order?.transaction.amount.breakdown.shipping.value, order?.transaction.amount.breakdown.taxTotal.value, order?.transaction.amount.value, page, totalAmount.total, totalAmount.totalDiscount, totalPrice]);

  return (
    <>
      { items.length > 0 ?
        <>
          {/* Cart Items Detail */}
          <Box>
            { items.map((item, index) => (
              <Fragment key={index}>
                { ((page === pages.checkout && item.quantity > 0) || (page !== pages.checkout)) &&
                  <>
                    <CartItemDetail 
                      item={item}
                      Subdivider={Subdivider}
                      page={page}
                      updateQuantity={(page !== pages.checkout && page !== pages.orders)
                        ? updateCartItemQuantity : undefined
                      }
                      priorityImg={index <= 4 ? true : false}
                    />
                    <Divider
                      mt={3}
                      mb={3}
                    />
                  </>
                }
              </Fragment>
            ))}
          </Box>
          {/* Cart All Detail */}
          <Box>
            { page !== pages.orders ?
              <Typography variant="h3" textAlign="center" mt={-1}>
                <FormattedMessage id="cart.totalTitle" />
              </Typography>
              :
              <Typography variant="h3" textAlign="center" mt={-1}>
                <FormattedMessage id="orders.detail.breakdown" />
              </Typography>
            }
            <Subdivider mt={2} />
            <Box>
              {/* Cart Amount */}
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography component="div" variant="body1Head">
                    <FormattedMessage
                      id="cart.subtotal"
                    />
                  </Typography>
                </Grid>
                <Grid item>  
                  <Typography component="div" variant="body1">
                    {convertPriceToString(breakdown.subtotal)}
                  </Typography>
                </Grid>
              </Grid>
              <Subdivider />
              {/* First Buy Discount */}
              { breakdown.discount > 0 &&
                <>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography component="div" variant="body1Head">
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
                  <Typography component="div" variant="body1Head">
                    <FormattedMessage
                      id="cart.shipping"
                    />
                  </Typography>
                </Grid>
                <Grid item>
                  { breakdown.shipping <= 0 ?
                    <Typography component="div" variant="body1">
                      <FormattedMessage
                        id="cart.freeShipping"
                      />
                    </Typography>
                    :
                    <Typography component="div" variant="body1">
                      { convertPriceToString(breakdown.shipping) }
                    </Typography>
                  }
                </Grid>
              </Grid>
              <Subdivider />
              {/* Cart Total */}
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography component="div" variant="body1Head">
                    <FormattedMessage
                      id="cart.total"
                    />
                    &nbsp;
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="span" variant="body1">
                    {`${convertPriceToString(breakdown.total)}`}
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
          { (page !== pages.checkout && page !== pages.orders) &&
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
