import { Fragment } from 'react';

import { useIntl } from 'react-intl';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { CartItem } from '@core/types/cart';
import { useCartContext } from '@lib/contexts/CartContext';
import CartItemDetail from '@components/cart/CartItemDetail';

type CartDetailProps = {
  updateQuantity?: (cartItem: CartItem, quantity: number, forceUpdate?: boolean) => void,
  showEmptyItems: boolean,
};

const CartDetail = (props: CartDetailProps) => {
  const { updateQuantity, showEmptyItems } = props;

  const { cart, totalPrice } = useCartContext();

  const intl = useIntl();

  return (
    <>
      { cart && cart.items && cart.items.length > 0 &&
        <>
          <Box mt={1} className='animate__animated animate__fadeIn'>
            {cart.items.map((item) => (
                <Fragment key={item.id}>
                  { ((!showEmptyItems && item.quantity > 0) || (showEmptyItems)) &&
                    <>
                      <CartItemDetail 
                        item={item} 
                        updateQuantity={updateQuantity}
                      />
                      <Divider variant='fullWidth' sx={{ my: 3 }} />
                    </>
                  }
                </Fragment>
            ))}
          </Box>

          <Typography
            component="div"
            variant='h6'
            align='right'
            className='animate__animated animate__fadeInUp'
          >
            {`${intl.formatMessage({ id: "cart.total" })}: ${totalPrice.toFixed(2)} €`}
          </Typography>
        </>
      }
    </>
  );
};

export default CartDetail;
