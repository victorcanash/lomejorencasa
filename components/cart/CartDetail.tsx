import { Fragment, useState, useEffect } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import type { Page } from '@core/types/navigation';
import type { CartItem } from '@core/types/cart';
import { 
  applyFirstBuyDiscount, 
  getRealTotalPriceString, 
  getRealTotalVatString, 
  getTotalPriceString 
} from '@core/utils/cart';

import { pages } from '@lib/constants/navigation';
import colors from '@lib/constants/themes/colors';
import { useCartContext } from '@lib/contexts/CartContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import CartItemDetail from '@components/cart/CartItemDetail';

type CartDetailProps = {
  page: Page,
  updateQuantity?: (cartItem: CartItem, quantity: number, forceUpdate?: boolean) => void,
  showEmptyItems: boolean,
};

const CartDetail = (props: CartDetailProps) => {
  const { 
    page,
    updateQuantity, 
    showEmptyItems
  } = props;

  const { cart, totalPrice: cartTotalPrice } = useCartContext();
  const { user } = useAuthContext();

  const intl = useIntl();

  const [firstBuyDiscount, setFirstBuyDiscount] = useState(false);
  const [totalPrice, setTotalPrice] = useState('')
  const [realTotalPrice, setRealTotalPrice] = useState('');
  const [realTotalVat, setRealTotalVat] = useState('');

  const Subdivider = (props: { mt?: number, mb?: number }) => (
    <Divider 
      sx={{ 
        border: `1px solid ${colors.border.divider}4f`, 
        mt: props.mt || 1,  
        mb: props.mb || 1,
      }} 
    />
  );

  useEffect(() => {
    setFirstBuyDiscount(applyFirstBuyDiscount(user));
    setTotalPrice(getTotalPriceString(cartTotalPrice));
    setRealTotalPrice(getRealTotalPriceString(user, cartTotalPrice));
    setRealTotalVat(getRealTotalVatString(user, cartTotalPrice));
  }, [cartTotalPrice, user]);

  return (
    <>
      {/* Cart Items Detail */}
      <Box>
        { cart.items.map((item, index) => (
          <Fragment key={index}>
            { ((!showEmptyItems && item.quantity > 0) || (showEmptyItems)) &&
              <>
                <CartItemDetail 
                  item={item}
                  Subdivider={Subdivider}
                  page={page}
                  updateQuantity={updateQuantity}
                  priorityImg={index <= 4 ? true : false}
                />
                <Divider 
                  sx={{
                    mt: 3,
                    mb: page == pages.cart ? 2 : 3,
                  }} 
                />
              </>
            }
          </Fragment>
        ))}
      </Box>
      {/* Cart All Detail */}
      <Box>
        <Typography component="h2" variant="h3" textAlign="center">
          <FormattedMessage id="cart.totalTitle" />
        </Typography>
        <Subdivider mt={2} />
        <Box>
          {/* Cart Subtotal */}
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
                {totalPrice}
              </Typography>
            </Grid>
          </Grid>
          <Subdivider />
          {/* Cart First Buy Discount */}
          { firstBuyDiscount &&
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
                    {`-${firstBuyDiscount}%`}
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
          {/* Cart Total with VAT */}
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography component="div" variant="body1" sx={{ fontWeight: 700 }}>
                <FormattedMessage
                  id="cart.total"
                />
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="span" variant="body1">
                {realTotalPrice}
              </Typography>
              <Typography component="span" variant="body2">
                {` (${intl.formatMessage({ id: 'cart.vat' }, { value: realTotalVat })})`}
              </Typography>
            </Grid>
          </Grid>
          <Subdivider />
        </Box>
      </Box>
    </>
  );
};

export default CartDetail;
