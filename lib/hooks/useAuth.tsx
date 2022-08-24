import { useState } from 'react';
import { useRouter } from 'next/router';

import { RouterPaths } from '@core/constants/navigation';
import type { AuthRegister, AuthLogin, User } from '@core/types/auth';
import type { Cart } from '@core/types/cart';
import { registerUser, loginUser, logoutUser } from '@core/utils/auth';
import { useAppContext } from '@lib/contexts/AppContext';

const useAuth = () => {
  const { 
    token, 
    user, 
    setLoading, 
    setToken, 
    setUser, 
    initCart,
    removeCart,
    previousPath, 
  } = useAppContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const isLogged = () => {
    if (!token || !user) {
      return false;
    }
    return true;
  };

  const isProtectedPath = (path: string) => {
    if (path != RouterPaths.cart &&
        path != RouterPaths.orders &&
        path != RouterPaths.profile) {
      return false;
    }
    return true;
  };

  const login = async (values: {email: string, password: string}) => {
    setLoading(true);
    const authLogin: AuthLogin = {
      email: values.email,
      password: values.password
    };
    loginUser(authLogin, token).then((response: {token: string, user: User, cart: Cart}) => {
      onLoginSuccess(response.token, response.user, response.cart);
    }).catch((error: Error) => {
      let errorMsg = error.message
      if (errorMsg.includes('email')) {
        errorMsg = 'Email not found'
      } else if (errorMsg.includes('password')) {
        errorMsg = 'Password not found'
      } else if (errorMsg.includes('locked out')) {
        errorMsg = 'You are locked out'
      } else {
        errorMsg = 'Something went wrong, try again'
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  const register = async (values: {firstName: string, lastName: string, email: string, password: string, age: number}) => {
    setLoading(true);
    const authRegister: AuthRegister = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      age: values.age,
    };
    registerUser(authRegister).then(() => {
      const authLogin: AuthLogin = {
        email: authRegister.email,
        password: authRegister.password
      }; 
      loginUser(authLogin, token).then((response: {token: string, user: User, cart: Cart}) => {
        onLoginSuccess(response.token, response.user, response.cart);
      }).catch((error) => {
        setErrorMsg(error.message);
        router.push(RouterPaths.login);
      });
    }).catch((error: Error) => {
      let errorMsg = error.message
      if (errorMsg.includes('Unique validation failure with the email')) {
        errorMsg = 'Introduced email already exists'
      } else {
        errorMsg = 'Something went wrong, try again'
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    })
  };

  const onLoginSuccess = (token: string, user: User, cart: Cart) => {
    setToken(token);
    setUser(user);
    initCart(cart);
    if (previousPath && 
        previousPath != RouterPaths.register && 
        previousPath != RouterPaths.login){
      router.back();
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

  return {
    errorMsg,
    isLogged,
    isProtectedPath,
    login,
    register,
    logout,
  };
};

export default useAuth;
