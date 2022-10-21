import { Fragment } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

import { useCartContext } from '@lib/contexts/CartContext';
import useCart from '@lib/hooks/useCart';
import useOrders from '@lib/hooks/useOrders';
import CartItem from '@components/cart/CartItem';
import GoBackBtn from '@components/ui/GoBackBtn';

const CartDetail = () => {
  const { cart, totalPrice, totalQuantity } = useCartContext();

  const { updateCartItemQuantity } = useCart();
  const { checkoutPaypalOrder } = useOrders();

  const onClickProceedBtn = () => {
    checkoutPaypalOrder();
  };

  return (
    <>
      <Typography component='h1' variant='h5' className='animate__animated animate__fadeInLeft'>
        {`My cart (${totalQuantity})`}
      </Typography>
      <Divider sx={{ my: 3 }} />

      {cart && cart.items.length > 0 ?
        <>
          <Container className='animate__animated animate__fadeIn'>
            {cart.items.map((item) => (
              <Fragment key={item.id}>
                <CartItem 
                  item={item} 
                  updateQuantity={updateCartItemQuantity}
                />
                <Divider variant='fullWidth' sx={{ my: 3 }} />
              </Fragment>
            ))}
          </Container>

          <Typography
            variant='h6'
            align='right'
            className='animate__animated animate__fadeInUp'
          >
            Total: {totalPrice.toFixed(2)} €
          </Typography>

          <Box display='flex' justifyContent={'center'} my={1}>
            <Button
              variant="contained"
              startIcon={<PointOfSaleIcon />}
              onClick={onClickProceedBtn}
            >
              Proceed to payment
            </Button>
          </Box>

        </>
      :
        <>
          <Typography variant='h5' align='center' sx={{ my: 5 }}>
            There are no products added
          </Typography>
        </>
      }
      <GoBackBtn />
    </>
  );
};

export default CartDetail;
