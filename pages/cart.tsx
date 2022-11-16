import { useEffect, useState, useCallback } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

import { pages } from '@core/config/navigation.config';
import { CartItem } from '@core/types/cart';
import LinkButton from '@core/components/LinkButton';
import { useCartContext } from '@lib/contexts/CartContext';
import usePage from '@lib/hooks/usePage';
import useCart from '@lib/hooks/useCart';
import CartDetail from '@components/cart/CartDetail';
import CheckedCartDialog from '@components/dialogs/CheckedCartDialog';
import GoBackBtn from '@components/ui/GoBackBtn';

const Cart: NextPage = () => {
  const { cart, totalPrice, totalQuantity } = useCartContext();

  const router = useRouter();

  const page = usePage();
  const { checkCart, updateCartItemQuantity } = useCart();

  const [openDialog, setOpenDialog] = useState(false);
  const [checkedCart, setCheckedCart] = useState(false);
  const [changedCartItems, setChangedCartItems] = useState<CartItem[]>([]);

  const handleDialog = useCallback(() => {
    setOpenDialog(!openDialog);
  }, [openDialog]);

  const onSuccessCheckCart = useCallback((changedItems: CartItem[]) => {
    setChangedCartItems(changedItems);
    if (changedItems.length > 0) {
      handleDialog();
    }
    setCheckedCart(true);
  }, [handleDialog]);

  const onErrorCheckCart = useCallback(() => {
    setCheckedCart(true);
  }, []);

  useEffect(() => {
    if (page.checked && !checkedCart) {
      checkCart(onSuccessCheckCart, onErrorCheckCart);
    }
  }, [checkCart, checkedCart, onErrorCheckCart, onSuccessCheckCart, page.checked, router.asPath]);

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Cart page" />
      </Head>

      <Typography component='h1' variant='h5' className='animate__animated animate__fadeInLeft'>
        {`My cart (${totalQuantity})`}
      </Typography>
      <Divider sx={{ my: 3 }} />

      {cart && cart.items && cart.items.length > 0 ?
        <>
          <CartDetail
            updateQuantity={updateCartItemQuantity}
            showEmptyItems={true}
          />

          <Box display='flex' justifyContent={'center'} my={1}>
            <LinkButton
              href={pages.checkout.path}
              startIcon={<PointOfSaleIcon />}
              disabled={totalPrice <= 0}
            >
              Proceed to payment
            </LinkButton>
          </Box>

        </>
      :
        <>
          <Typography component='div' variant='h5' align='center' sx={{ my: 5 }}>
            There are no products added
          </Typography>
        </>
      }
      <GoBackBtn />

      <CheckedCartDialog
        open={openDialog}
        handleDialog={handleDialog}
        changedItems={changedCartItems}
        message='Check your cart.'
      />
    </>
  );
};

export default Cart;
