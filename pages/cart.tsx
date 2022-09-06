import { Fragment } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useCartContext } from '@lib/contexts/CartContext';
import usePage from '@lib/hooks/usePage';
import useCart from '@lib/hooks/useCart';
import CartItem from '@components/cart/CartItem';
import GoBackBtn from '@components/ui/GoBackBtn';
import CheckoutBtn from '@components/checkout/CheckoutBtn';
import envConfig from '@core/config/env.config';

const Cart: NextPage = () => {
  const { cart, totalPrice, totalQuantity } = useCartContext();

  const page = usePage();
  const { updateCartItemQuantity } = useCart();

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Cart page" />
      </Head>

      <Typography component='h1' variant='h4'>
        {`My cart (${totalQuantity})`}
      </Typography>
      <Divider sx={{ my: 3 }} />

      {cart && cart.items.length > 0 ? (
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
            <CheckoutBtn />
          </Box>

          <GoBackBtn />
        </>
      ) : (
        <>
          <Typography variant='h5' align='center' sx={{ my: 5 }}>
            There are no products added
          </Typography>
          <GoBackBtn />
        </>
      )}
    </>
  );
};

export default Cart;
