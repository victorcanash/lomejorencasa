import { Fragment, useState, useEffect, useCallback } from 'react';

import { useIntl } from 'react-intl';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { firstBuyDiscount } from '@core/constants/payments';
import type { CartItem, GuestCartCheckItem } from '@core/types/cart';
import type { User } from '@core/types/user';
import { convertElementToSx } from '@core/utils/themes';
import { roundTwoDecimals } from '@core/utils/numbers';

import { themeCustomElements } from '@lib/constants/themes/elements';
import { useAuthContext } from '@lib/contexts/AuthContext';
import CartItemDetail from '@components/cart/CartItemDetail';

type CartDetailProps = {
  items: CartItem[] | GuestCartCheckItem[],
  totalPrice: number,
  updateQuantity?: (cartItem: CartItem, quantity: number, forceUpdate?: boolean) => void,
  showEmptyItems: boolean,
};

const CartDetail = (props: CartDetailProps) => {
  const { 
    items,
    totalPrice,
    updateQuantity, 
    showEmptyItems
  } = props;

  const { user } = useAuthContext();

  const intl = useIntl();

  const [realTotalPrice, setRealTotalPrice] = useState<number | undefined>(undefined)

  const applyFirstBuyDiscount = useCallback(() => {
    if ((user as User)?.firstName && !(user as User).orderExists) {
      return true;
    }
    return false;
  }, [user]);

  const getRealTotalPrice = useCallback(() => {
    let realPrice = totalPrice;
    if (applyFirstBuyDiscount()) {
      const discount = parseFloat(((firstBuyDiscount / 100) * realPrice).toFixed(2))
      realPrice = roundTwoDecimals(realPrice - discount);
    }
    return realPrice;
  }, [applyFirstBuyDiscount, totalPrice]);

  useEffect(() => {
    setRealTotalPrice(getRealTotalPrice())
  }, [getRealTotalPrice]);

  return (
    <>
      <Box>
        { items.map((item, index) => (
            <Fragment key={index}>
              { ((!showEmptyItems && item.quantity > 0) || (showEmptyItems)) &&
                <>
                  <CartItemDetail 
                    item={item} 
                    updateQuantity={updateQuantity}
                    priorityImg={index <= 4 ? true : false}
                  />
                  <Divider sx={{ my: 3 }} />
                </>
              }
            </Fragment>
        ))}
      </Box>

      <Box width="max-content">
        { realTotalPrice &&
          <>
            { applyFirstBuyDiscount() &&
              <>
                <Typography component="div" variant="h3">
                  {`${intl.formatMessage({ id: 'cart.subtotal' })}: ${totalPrice.toFixed(2)} €`}
                </Typography>
                <Typography component="div" variant="h3" sx={convertElementToSx(themeCustomElements.landing.priceContent.discountText)}> 
                  {` -${firstBuyDiscount}%`}
                </Typography>
                <Divider
                  sx={{
                    my: 1,            
                  }}
                />
              </>
            }
            <Typography component="div" variant="h2">
              {`${intl.formatMessage({ id: 'cart.total' })}: ${realTotalPrice.toFixed(2)} €`}
            </Typography>
          </>
        }
      </Box>
    </>
  );
};

export default CartDetail;
