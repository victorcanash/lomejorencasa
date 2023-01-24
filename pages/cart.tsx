import { useEffect, useState, useCallback } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { FormattedMessage, useIntl } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

import { PageTypes } from '@core/constants/navigation';
import { pages } from '@lib/constants/navigation';
import { CartItem } from '@core/types/cart';
import LinkButton from '@core/components/LinkButton';
import { useAppContext } from '@lib/contexts/AppContext';
import { useCartContext } from '@lib/contexts/CartContext';
import usePage from '@lib/hooks/usePage';
import useCart from '@lib/hooks/useCart';
import PageHeader from '@components/ui/PageHeader';
import CartDetail from '@components/cart/CartDetail';
import CheckedCartDialog from '@components/dialogs/CheckedCartDialog';
import GoBackBtn from '@components/ui/GoBackBtn';

const Cart: NextPage = () => {
  const { setLoading } = useAppContext();
  const { cart, totalPrice, totalQuantity } = useCartContext();

  const page = usePage();
  const router = useRouter();
  const intl = useIntl();

  const { checkCart, updateCartItemQuantity } = useCart();

  const [openDialog, setOpenDialog] = useState(false);
  const [checkedCart, setCheckedCart] = useState(false);
  const [changedItemsByInventory, setChangedItemsByInventory] = useState<CartItem[]>([]);

  const handleDialog = useCallback(() => {
    setOpenDialog(!openDialog);
  }, [openDialog]);

  const onSuccessCheckCart = useCallback((_changedCart: boolean, changedItemsByInventory: CartItem[]) => {
    setLoading(false);
    setChangedItemsByInventory(changedItemsByInventory);
    if (changedItemsByInventory.length > 0) {
      handleDialog();
    }
  }, [handleDialog, setLoading]);

  useEffect(() => {
    if (page.checked && !checkedCart) {
      setCheckedCart(true);
      checkCart(onSuccessCheckCart);
    }
  }, [checkCart, checkedCart, onSuccessCheckCart, page.checked, router.asPath]);

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'cart.metas.title',
          descriptionId: 'cart.metas.description',
        }}
        texts={{
          titleId: 'cart.h1',
          titleAdd: ` (${totalQuantity})`,
        }}
      />

      { cart && cart.items && cart.items.length > 0 ?
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
              <FormattedMessage id="cart.checkoutBtn" />
            </LinkButton>
          </Box>

        </>
      :
        <>
          <Typography component='div' variant='body1' align='center' sx={{ my: 5 }}>
            <FormattedMessage id="cart.noItems" />
          </Typography>
        </>
      }
      <GoBackBtn />

      <CheckedCartDialog
        open={openDialog}
        handleDialog={handleDialog}
        changedCart={false}
        changedItemsByInventory={changedItemsByInventory}
        message={intl.formatMessage({ id: 'dialogs.checkedCart.content.cartPage' })}
      />
    </>
  );
};

export default Cart;
