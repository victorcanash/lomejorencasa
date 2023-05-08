import { useState } from 'react';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';

import type { 
  AuthRegister, 
  AuthLogin, 
  AuthUpdateEmail, 
  AuthResetPsw 
} from '@core/types/auth';
import type { User } from '@core/types/user';
import type { Cart } from '@core/types/cart';
import { 
  registerUser, 
  loginUser,
  loginUserGoogle,
  logoutUser, 
  updateUserEmail,
  resetUserPsw,
  sendUserActivationEmail,
  sendUserUpdateEmail,
  sendUserResetPswEmail,
} from '@core/utils/auth';

import { pages } from '@lib/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';
import useFacebook from '@lib/hooks/useFacebook';

const useAuth = () => {
  const { setLoading } = useAppContext();
  const { 
    token, 
    setToken,
    user, 
    setUser,
    removeUser,
    prevLoginPath, 
    isProtectedPath, 
    isLogged,
    getRedirectLogoutPath, 
  } = useAuthContext();
  const { cart, initCart, removeCart } = useCartContext();

  const router = useRouter();
  const intl = useIntl();

  const { sendCompleteRegistrationEvent } = useFacebook();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const register = async (authRegister: AuthRegister, onSuccess?: (email: string) => void) => {
    setErrorMsg('');
    setLoading(true);
    registerUser(intl.locale, authRegister).then(() => {
      onRegisterSuccess(authRegister, onSuccess);
    }).catch((error: Error) => {
      sendCompleteRegistrationEvent(false);
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

  const onRegisterSuccess = async (authRegister: AuthRegister, onSuccess?: (email: string) => void) => {
    /*await sendUserActivationEmail(intl.locale, email, pages.activation);
    if (onSuccess) {
      onSuccess(email);
    }
    setLoading(false);*/
    sendCompleteRegistrationEvent(true);
    await login({ email: authRegister.email, password: authRegister.password, remember: true})
  };

  const login = async (authLogin: AuthLogin, redirectUrl = true/*onFailByActivation: (email: string) => void*/) => {
    setLoading(true);
    loginUser(authLogin, isLogged() ? undefined : cart)
      .then((response: {token: string, user: User, cart: Cart}) => {
        onLoginSuccess(response.token, response.user, response.cart, redirectUrl);
      }).catch((error: Error) => {
        onLoginError(error, /*onFailByActivation, authLogin.email*/);
      });
  };

  const loginGoogle = async (accessToken: string, redirectUrl = true) => {
    setLoading(true);
    loginUserGoogle(accessToken, isLogged() ? undefined : cart)
      .then((response: {token: string, user: User, cart: Cart}) => {
        onLoginSuccess(response.token, response.user, response.cart, redirectUrl);
      }).catch((error: Error) => {
        onLoginError(error);
      });
  };

  const onLoginSuccess = (token: string, user: User, cart: Cart, redirectUrl = true) => {
    setToken(token);
    setUser(user);
    initCart(cart);
    if (redirectUrl) {
      if (prevLoginPath){
        router.push(prevLoginPath);
      } else {
        router.push(pages.home.path);
      }
    } else {
      setLoading(false);
    }
  };

  const onLoginError = (error: Error/*, onFailByActivation?: (email: string) => void, authEmail?: string*/) => {
    let errorMsg = error.message;
    if (errorMsg.includes('activate')) {
      errorMsg = intl.formatMessage({ id: 'login.errors.activation' });
      /*if (onFailByActivation) {
        onFailByActivation(authEmail || '');
      }*/
    } else if (errorMsg.includes('email')) {
      errorMsg = intl.formatMessage({ id: 'login.errors.email' });
    } else if (errorMsg.includes('password')) {
      errorMsg = intl.formatMessage({ id: 'login.errors.password' });
    } else if (errorMsg.includes('locked out')) {
      errorMsg = intl.formatMessage({ id: 'login.errors.lockedOut' });
    } /*else if (errorMsg.includes('provider')) {
      if (onFailByActivation) {
        errorMsg = intl.formatMessage({ id: 'login.errors.provider.google' });
      } else {
        errorMsg = intl.formatMessage({ id: 'login.errors.provider.manual' });
      }
    }*/ else {
      errorMsg = intl.formatMessage({ id: 'app.errors.default' });
    }
    setErrorMsg(errorMsg);
    setLoading(false);
  };

  const logout = async () => {
    if (!isLogged()) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setToken('');
    removeUser();
    removeCart();
    await logoutUser(token)
      .then(async () => {
        const path = getRedirectLogoutPath();
        if (path) {
          router.push(path);
        } else if (!isProtectedPath()) {
          setLoading(false);
        }
      }).catch(async (error: Error) => {
        setLoading(false);
        throw error;
      });
  };

  const updateEmail = async (updateToken: string) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    updateUserEmail(updateToken).then((response: {token: string, user: User}) => {
      setToken(response.token);
      setUser(response.user);
      setLoading(false);
      setSuccessMsg(intl.formatMessage({ id: 'newemail.successes.default' }));
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

  const resetPsw = async (updateToken: string, authResetPassword: AuthResetPsw) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    resetUserPsw(updateToken, authResetPassword).then((response: {token: string, user: User}) => {
      setToken(response.token);
      setUser(response.user);
      setLoading(false);
      setSuccessMsg(intl.formatMessage({ id: 'reset.successes.default' }));
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

  const sendActivationEmail = (email: string, onSuccess?: () => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    sendUserActivationEmail(intl.locale, email, pages.activation).then(() => {
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
    sendUserResetPswEmail(intl.locale, email, pages.reset).then(() => {
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
    sendUserUpdateEmail(token, intl.locale, authUpdateEmail, pages.newemail).then(() => {
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

  const applyCoupon = () => {
    setErrorMsg('Cupón inválido, prueba con otro');
    setSuccessMsg('');
  };

  return {
    register,
    login,
    loginGoogle,
    logout,
    updateEmail,
    resetPsw,
    sendActivationEmail,
    sendResetPswEmail,
    sendUpdateEmail,
    applyCoupon,
    errorMsg,
    successMsg,
  };
};

export default useAuth;
