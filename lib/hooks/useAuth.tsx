import { useState } from 'react';
import { useRouter } from 'next/router';

import { RouterPaths } from '@core/constants/navigation';
import type { User } from '@core/types/user';
import type { FormRegister, FormLogin, FormUpdateAuth } from '@core/types/forms/auth';
import type { Cart } from '@core/types/cart';
import { registerUser, loginUser, logoutUser, updateAuth, isAdminUser } from '@core/utils/auth';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';

const useAuth = () => {
  const { setLoading } = useAppContext();
  const { token, setToken, user, setUser, prevLoginPath, isProtectedPath } = useAuthContext();
  const { initCart, removeCart } = useCartContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

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
    setToken(token);
    setUser(user);
    initCart(cart);
    if (prevLoginPath){
      router.push(prevLoginPath);
    } else {
      router.push(RouterPaths.home);
    }
  };

  const logout = async () => {
    setLoading(true);

    await logoutUser(token);
    setToken('');
    setUser(undefined);
    removeCart();

    if (isProtectedPath(router.asPath)) {
      router.push(RouterPaths.home);
    } else {
      setLoading(false);
    }
  };

  const update = async (formUpdateAuth: FormUpdateAuth) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    updateAuth(formUpdateAuth, user?.id || -1, token).then((response: {token: string, user: User}) => {
      onUpdateSuccess(response.token, response.user);
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('password')) {
        errorMsg = 'Password not found';
      } else {
        errorMsg = 'Something went wrong, try again';
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  const onUpdateSuccess = (token: string, user: User) => {
    setToken(token);
    setUser(user);
    setLoading(false);
    setSuccessMsg('Updated data');
  }

  return {
    register,
    login, 
    logout,
    update,
    errorMsg,
    successMsg,
  };
};

export default useAuth;
