import { useState } from 'react';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';

import { pages } from '@core/config/navigation.config';
import type { User } from '@core/types/user';
import type { 
  AuthRegister, 
  AuthLogin, 
  AuthUpdateEmail, 
  AuthResetPsw 
} from '@core/types/auth';
import type { Cart } from '@core/types/cart';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  getLoggedUser,
  updateUserEmail,
  resetUserPsw,
  sendUserActivationEmail,
  sendUserUpdateEmail,
  sendUserResetPswEmail,
} from '@core/utils/auth';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';

const useAuth = () => {
  const { setLoading } = useAppContext();
  const { 
    token, 
    setToken, 
    setBraintreeToken, 
    user, 
    setUser, 
    prevLoginPath, 
    isProtectedPath, 
    isLogged 
  } = useAuthContext();
  const { initCart, removeCart } = useCartContext();

  const router = useRouter();
  const intl = useIntl();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const register = async (authRegister: AuthRegister, onSuccess?: (email: string) => void) => {
    setErrorMsg('');
    setLoading(true);
    registerUser(authRegister).then(() => {
      onRegisterSuccess(authRegister.email, onSuccess);
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('Unique validation failure with the email')) {
        errorMsg = intl.formatMessage({ id: 'register.errors.email' });
      } else {
        errorMsg = intl.formatMessage({ id: 'app.errors.default' });
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    })
  };

  const onRegisterSuccess = async (email: string, onSuccess?: (email: string) => void) => {
    await sendUserActivationEmail(intl.locale, email);
    if (onSuccess) {
      onSuccess(email);
    }
    setLoading(false);
  };

  const login = async (authLogin: AuthLogin, onFailByActivation?: (email: string) => void) => {
    setLoading(true);
    loginUser(authLogin).then((response: {token: string, user: User, braintreeToken: string, cart: Cart}) => {
      onLoginSuccess(response.token, response.user, response.braintreeToken, response.cart);
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('email')) {
        errorMsg = intl.formatMessage({ id: 'login.errors.email' });
      } else if (errorMsg.includes('password')) {
        errorMsg = intl.formatMessage({ id: 'login.errors.password' });
      } else if (errorMsg.includes('activate')) {
        errorMsg = intl.formatMessage({ id: 'login.errors.activation' });
        if (onFailByActivation) {
          onFailByActivation(authLogin.email);
        }
      } else if (errorMsg.includes('locked out')) {
        errorMsg = intl.formatMessage({ id: 'login.errors.lockedOut' });
      } else {
        errorMsg = intl.formatMessage({ id: 'app.errors.default' });
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  const onLoginSuccess = (token: string, user: User, braintreeToken: string, cart: Cart) => {
    setToken(token);
    setUser(user);
    setBraintreeToken(braintreeToken);
    initCart(cart);
    if (prevLoginPath){
      router.push(prevLoginPath);
    } else {
      router.push(pages.home.path);
    }
  };

  const logout = async () => {
    setLoading(true);

    await logoutUser(token);
    setToken('');
    setBraintreeToken(undefined);
    setUser(undefined);
    removeCart();

    if (!isProtectedPath()) {
      setLoading(false);
    }
  };

  const getLogged = async (onSuccess?: () => void, onError?: (message: string) => void) => {
    await getLoggedUser().then(async (response: {token: string, user: User, braintreeToken: string, cart: Cart}) => {
      setToken(response.token);
      setUser(response.user);
      setBraintreeToken(response.braintreeToken);
      initCart(response.cart);
      if (onSuccess) {
        onSuccess();
      }
    }).catch((error: Error) => {
      if (onError) {
        onError(error.message);
      }
    });
  }

  const updateEmail = async (updateToken: string) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    updateUserEmail(updateToken).then((response: {token: string, user: User}) => {
      onUpdateEmailSuccess(response.token, response.user);
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('Token is missing or has expirated')) {
        errorMsg = intl.formatMessage({ id: 'newemail.errors.invalidToken' });
      } else if (errorMsg.includes('Unique validation failure with the newEmail')) {
        errorMsg = intl.formatMessage({ id: 'newemail.errors.email' });
      } else {
        errorMsg = intl.formatMessage({ id: 'newemail.errors.default' });
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  const onUpdateEmailSuccess = (token: string, user: User) => {
    setToken(token);
    setUser(user);
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'newemail.successes.default' }));
  };

  const resetPsw = async (updateToken: string, authResetPassword: AuthResetPsw) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    resetUserPsw(updateToken, authResetPassword).then((response: {token: string, user: User}) => {
      onResetPasswordSuccess(response.token, response.user);
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('Token is missing or has expirated')) {
        errorMsg = intl.formatMessage({ id: 'reset.errors.invalidToken' });
      } else {
        errorMsg = intl.formatMessage({ id: 'reset.errors.default' });
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  const onResetPasswordSuccess = (token: string, user: User) => {
    setToken(token);
    setUser(user);
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'reset.successes.default' }));
  };

  const sendActivationEmail = (email: string, onSuccess?: () => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    sendUserActivationEmail(intl.locale, email).then(() => {
      setLoading(false);
      setSuccessMsg(intl.formatMessage({ id: 'activation.successes.email' }));
      if (onSuccess) {
        onSuccess();
      }
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('Invalid email')) {
        errorMsg = intl.formatMessage({ id: 'activation.errors.email' });
      } else {
        errorMsg = intl.formatMessage({ id: 'app.errors.default' });
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  const sendResetPswEmail = (email: string) => {
    if (isLogged() && email != user?.email) {
      setErrorMsg(intl.formatMessage({ id: 'reset.errors.credentials' }));
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    sendUserResetPswEmail(intl.locale, email).then(() => {
      setLoading(false);
      setSuccessMsg(intl.formatMessage({ id: 'reset.successes.email' }));
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('Invalid email')) {
        errorMsg = intl.formatMessage({ id: 'reset.errors.email' });
      } else {
        errorMsg = intl.formatMessage({ id: 'app.errors.default' });
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  const sendUpdateEmail = (authUpdateEmail: AuthUpdateEmail) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    sendUserUpdateEmail(token, intl.locale, authUpdateEmail).then(() => {
      setLoading(false);
      setSuccessMsg(intl.formatMessage({ id: 'newemail.successes.email' }));
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('Invalid password')) {
        errorMsg = intl.formatMessage({ id: 'newemail.errors.password' });
      } else if (errorMsg.includes('Unique validation failure with the newEmail')) {
        errorMsg = intl.formatMessage({ id: 'newemail.errors.email' });
      } else {
        errorMsg = intl.formatMessage({ id: 'app.errors.default' });
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  return {
    register,
    login, 
    logout,
    getLogged,
    updateEmail,
    resetPsw,
    sendActivationEmail,
    sendResetPswEmail,
    sendUpdateEmail,
    errorMsg,
    successMsg,
  };
};

export default useAuth;
