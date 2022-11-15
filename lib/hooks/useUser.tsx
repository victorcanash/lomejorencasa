import { useState } from 'react';

import { ManageActions } from '@core/constants/auth';
import type { User, UserAddress } from '@core/types/user';
import { CheckoutAddresses } from '@core/types/checkout';
import type { Cart, CartItem } from '@core/types/cart';
import { 
  manageUser as manageUserMW, 
  updateUserAddresses as updateUserAddressesMW,
  checkUserCart as checkUserCartMW,
} from '@core/utils/user';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';
import useAuth from '@lib/hooks/useAuth';

const useUser = () => {
  const { setLoading } = useAppContext();
  const { token, setUser } = useAuthContext();
  const { initCart } = useCartContext();

  const { logout } = useAuth();

  const [errorMsg, setErrorMsg] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  const manageUser = async (action: ManageActions.update | ManageActions.delete, user: User) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageUserMW(action, token, user)
      .then((response: {user: User}) => {
        onManageUserSuccess(action, response.user);
      }).catch((error: Error) => {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  const onManageUserSuccess = (action: ManageActions.update | ManageActions.delete, user: User) => {
    if (action == ManageActions.update) {
      setUser(user);
      setLoading(false);
      setSuccessMsg('Updated data');
    } else if (action == ManageActions.delete) {
      logout();
      setSuccessMsg('Deleted user');
    }
  };

  const updateUserAddresses = async (user: User, checkoutAddresses: CheckoutAddresses, onSuccess?: () => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    updateUserAddressesMW(token, user, checkoutAddresses)
      .then((response: {shipping: UserAddress, billing: UserAddress}) => {
        onUpdateUserAddressesSuccess(user, response.shipping, response.billing, onSuccess);
      }).catch((error: Error) => {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  const onUpdateUserAddressesSuccess = (user: User, shipping: UserAddress, billing: UserAddress, onSuccess?: () => void) => {
    setUser({
      ...user,
      shipping: shipping,
      billing: billing,
    });
    if (onSuccess) {
      onSuccess();
    }
    setLoading(false);
    setSuccessMsg('Updated data');
  };

  const checkUserCart = async (user: User, onSuccess?: (changedItems: CartItem[], deletedItems: CartItem[]) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    checkUserCartMW(token, user)
      .then((response: {cart: Cart, changedItems: CartItem[], deletedItems: CartItem[]}) => {
        onCheckUserCartSuccess(response.cart, response.changedItems, response.deletedItems, onSuccess);
      }).catch((error: Error) => {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  const onCheckUserCartSuccess = (cart: Cart, changedItems: CartItem[], deletedItems: CartItem[], onSuccess?: (changedItems: CartItem[], deletedItems: CartItem[]) => void) => {
    initCart(cart);
    if (onSuccess) {
      onSuccess(changedItems, deletedItems);
    }
    setLoading(false);
    setSuccessMsg('Updated data');
  };

  return {
    manageUser,
    updateUserAddresses,
    checkUserCart,
    errorMsg,
    successMsg,
  };
};

export default useUser;
