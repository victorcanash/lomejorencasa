import { useEffect, useState, useCallback } from 'react';
import type { NextPage } from 'next';

import { FormattedMessage, useIntl } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

import { PageTypes } from '@core/constants/navigation';
import type { CartItem } from '@core/types/cart';
import LinkButton from '@core/components/LinkButton';

import { pages } from '@lib/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
import { useCartContext } from '@lib/contexts/CartContext';
import usePage from '@lib/hooks/usePage';
import useCart from '@lib/hooks/useCart';
import PageHeader from '@components/ui/PageHeader';
import CartDetail from '@components/cart/CartDetail';
import CheckedCartDialog from '@components/dialogs/CheckedCartDialog';

const Cart: NextPage = () => {
  const { setLoading } = useAppContext();
  const { cart, totalPrice, disabledCheckoutPage } = useCartContext();

  const page = usePage();
  const intl = useIntl();

  const { checkCart, updateCartItemQuantity } = useCart();

  const [openDialog, setOpenDialog] = useState(false);
  const [initCart, setInitCart] = useState(true);
  const [checkedCart, setCheckedCart] = useState(false);
  const [changedItemsByInventory, setChangedItemsByInventory] = useState<CartItem[]>([]);

  const handleDialog = useCallback(() => {
    setOpenDialog(!openDialog);
  }, [openDialog]);

  const onSuccessCheckCart = useCallback((_changedCart: boolean, changedItemsByInventory: CartItem[]) => {
    setCheckedCart(true);
    setLoading(false);
    setChangedItemsByInventory(changedItemsByInventory);
    if (changedItemsByInventory.length > 0) {
      handleDialog();
    }
  }, [handleDialog, setLoading]);

  const emptyCart = () => {
    if (cart && cart.items && cart.items.length > 0) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (page.checked && initCart) {
      setInitCart(false);
      if (totalPrice <= 0) {
        onSuccessCheckCart(false, []);
      } else {
        checkCart(onSuccessCheckCart);
      }
    }
  }, [checkCart, initCart, onSuccessCheckCart, page.checked, totalPrice]);

  const maxWidth = '500px';

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'cart.metas.title',
          descriptionId: 'cart.metas.description',
        }}
        marginTop={true}
        texts={{
          title: {
            id: 'cart.h1',
          },
        }}
      />

      { checkedCart &&
        <Container sx={{ maxWidth: maxWidth }}>
          { cart && !emptyCart() ?
            <>
              <CartDetail
                updateQuantity={updateCartItemQuantity}
                showEmptyItems={true}
              />
              <Box mt={3}>
                <LinkButton
                  href={pages.checkout.path}
                  startIcon={<PointOfSaleIcon />}
                  disabled={disabledCheckoutPage()}
                  fullWidth
                >
                  <FormattedMessage id="cart.checkoutBtn" />
                </LinkButton>
              </Box>
            </>
            :
            <Typography component='div' variant='body1' sx={{ my: 5, textAlign: 'center' }}>
              <FormattedMessage id="cart.noItems" />
            </Typography>
          }

          <CheckedCartDialog
            open={openDialog}
            handleDialog={handleDialog}
            changedCart={false}
            changedItemsByInventory={changedItemsByInventory}
            message={intl.formatMessage({ id: 'dialogs.checkedCart.content.cartPage' })}
          />
        </Container>
      }
    </>
  );
};

export default Cart;
