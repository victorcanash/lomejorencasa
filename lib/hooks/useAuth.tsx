import { useState } from 'react';
import { useRouter } from 'next/router';

import { RouterPaths } from '@core/constants/navigation';
import type { User } from '@core/types/user';
import type { FormRegister, FormLogin } from '@core/types/forms';
import type { Cart } from '@core/types/cart';
import { registerUser, loginUser, logoutUser, updateUser } from '@core/utils/auth';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';

const useAuth = () => {
  const { setLoading } = useAppContext();
  const { token, prevLoginPath, initAuth, removeAuth, isProtectedPath } = useAuthContext();
  const { initCart, removeCart } = useCartContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const login = async (formLogin: FormLogin) => {
    setLoading(true);
    loginUser(formLogin, token).then((response: {token: string, user: User, cart: Cart}) => {
      onLoginSuccess(response.token, response.user, response.cart);
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('email')) {
        errorMsg = 'Email not found';
      } else if (errorMsg.includes('password')) {
        errorMsg = 'Password not found';
      } else if (errorMsg.includes('locked out')) {
        errorMsg = 'You are locked out';
      } else {
        errorMsg = 'Something went wrong, try again';
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  const register = async (formRegister: FormRegister) => {
    setLoading(true);
    registerUser(formRegister).then(() => {
      const authLogin: FormLogin = {
        email: formRegister.email,
        password: formRegister.password
      }; 
      loginUser(authLogin, token).then((response: {token: string, user: User, cart: Cart}) => {
        onLoginSuccess(response.token, response.user, response.cart);
      }).catch((error) => {
        setErrorMsg(error.message);
        router.push(RouterPaths.login);
      });
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('Unique validation failure with the email')) {
        errorMsg = 'Introduced email already exists';
      } else {
        errorMsg = 'Something went wrong, try again';
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    })
  };

  const onLoginSuccess = (token: string, user: User, cart: Cart) => {
    initAuth(token, user);
    initCart(cart);
    if (prevLoginPath){
      router.back();
    } else {
      router.push(RouterPaths.home);
    }
  };

  const logout = async () => {
    setLoading(true);

    await logoutUser(token);
    removeAuth();
    removeCart();

    if (isProtectedPath(router.asPath)) {
      router.push(RouterPaths.home);
    } else {
      setLoading(false);
    }
  };

  const update = async (user: User) => {
    setLoading(true);
    updateUser(user, token).then((response: {user: User}) => {
      onUpdateSuccess(response.user);
    }).catch((error: Error) => {
      const errorMsg = error.message;
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  const onUpdateSuccess = (user: User) => {
    setLoading(false);
  }

  return {
    login,
    register,
    logout,
    update,
    errorMsg,
  };
};

export default useAuth;
