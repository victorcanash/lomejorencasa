import { useEffect, useState, useCallback } from 'react';

import { useIntl } from 'react-intl';

import Container from '@mui/material/Container';

import type { CartItem } from '@core/types/cart';

import { pages } from '@lib/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
import { useCartContext } from '@lib/contexts/CartContext';
import useCart from '@lib/hooks/useCart';
import CartDetail from '@components/cart/CartDetail';
import CheckedCartDialog from '@components/dialogs/CheckedCartDialog';

type CartProps = {
  pageChecked: boolean,
};

const Cart = (props: CartProps) => {
  const {
    pageChecked,
  } = props;

  const { setLoading } = useAppContext();
  const { totalPrice } = useCartContext();

  const intl = useIntl();

  const { checkCart } = useCart(false);

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

  useEffect(() => {
    if (pageChecked && initCart) {
      setInitCart(false);
      if (totalPrice <= 0) {
        onSuccessCheckCart(false, []);
      } else {
        checkCart(onSuccessCheckCart);
      }
    }
  }, [checkCart, initCart, onSuccessCheckCart, pageChecked, totalPrice]);

  return (
    <>
      { checkedCart &&
        <Container maxWidth="md">
          <CartDetail
            page={pages.cart}
          />
   
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
