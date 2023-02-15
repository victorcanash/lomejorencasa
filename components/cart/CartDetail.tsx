import { Fragment } from 'react';

import { useIntl } from 'react-intl';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import type { CartItem } from '@core/types/cart';
import type { OrderItem } from '@core/types/orders';

import CartItemDetail from '@components/cart/CartItemDetail';

type CartDetailProps = {
  items: CartItem[] | OrderItem[],
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

  const intl = useIntl();

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
                  <Divider variant='fullWidth' sx={{ my: 3 }} />
                </>
              }
            </Fragment>
        ))}
      </Box>

      <Typography
        component="div"
        variant='h1'
        align='right'
      >
        {`${intl.formatMessage({ id: "cart.total" })}: ${totalPrice.toFixed(2)} €`}
      </Typography>
    </>
  );
};

export default CartDetail;
