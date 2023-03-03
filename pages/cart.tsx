import { useEffect, useState, useCallback } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { FormattedMessage, useIntl } from 'react-intl';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
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
import GoBackBtn from '@components/ui/GoBackBtn';

const Cart: NextPage = () => {
  const { setLoading } = useAppContext();
  const { cart, totalPrice, totalQuantity } = useCartContext();

  const page = usePage();
  const router = useRouter();
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
      checkCart(onSuccessCheckCart);
    }
  }, [initCart, checkCart, onSuccessCheckCart, page.checked, router.asPath]);

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
          titleAdd: ` (${totalQuantity})`,
        }}
      />

      { checkedCart &&
        <Container>

          { cart && !emptyCart() ?
            <CartDetail
              items={cart.items}
              totalPrice={totalPrice}
              updateQuantity={updateCartItemQuantity}
              showEmptyItems={true}
            />
            :
            <Typography component='div' variant='body1' sx={{ my: 5, textAlign: 'center' }}>
              <FormattedMessage id="cart.noItems" />
            </Typography>
          }

          <Grid
            container
            sx={{
              flexWrap: 'nowrap',
              justifyContent: 'space-between',
            }}
            mt={ !emptyCart() ? 3 : undefined }
          >
            <Grid item>
              <GoBackBtn />
            </Grid>
            { !emptyCart() &&
              <Grid item>
                <LinkButton
                  href={pages.checkout.path}
                  startIcon={<PointOfSaleIcon />}
                  disabled={/*totalPrice <= 0*/true}
                >
                  <FormattedMessage id="cart.checkoutBtn" />
                </LinkButton>
              </Grid>
            }
          </Grid>

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
