import { useState } from 'react';
import { useRouter } from 'next/router';

import { RouterPaths } from '@core/constants/navigation';
import type { User } from '@core/types/user';
import type { 
  FormRegister, 
  FormLogin, 
  FormUpdateEmail, 
  FormResetPassword 
} from '@core/types/forms/auth';
import type { Cart } from '@core/types/cart';
import { 
  registerUser, 
  activateUser, 
  loginUser, 
  logoutUser, 
  isAdminUser,
  updateUserEmail,
  resetUserPassword,
  sendUserActivationEmail,
  sendUserUpdateEmail,
  sendUserResetEmail,
} from '@core/utils/auth';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';

const useAuth = () => {
  const { setLoading } = useAppContext();
  const { token, setToken, setUser, prevLoginPath, isProtectedPath } = useAuthContext();
  const { initCart, removeCart } = useCartContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const register = async (formRegister: FormRegister, onSuccess?: (email: string) => void) => {
    setErrorMsg('');
    setLoading(true);
    registerUser(formRegister).then(() => {
      onRegisterSuccess(formRegister.email, onSuccess);
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

  const onRegisterSuccess = async (email: string, onSuccess?: (email: string) => void) => {
    await sendUserActivationEmail(email);
    if (onSuccess) {
      onSuccess(email);
    }
    setLoading(false);
  };

  const activate = async (token: string) => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);
    activateUser(token).then(() => {
      setSuccessMsg('Your account is activated and you can login now. You can close this window.')
      setLoading(false);
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('was already activated')) {
        errorMsg = 'Your account was already activated';
      } else if (errorMsg.includes('locked out')) {
        errorMsg = 'You are locked out';
      } else {
        errorMsg = 'Something went wrong, try again';
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    })
  };

  const login = async (formLogin: FormLogin, onFailByActivation?: (email: string) => void) => {
    setLoading(true);
    loginUser(formLogin).then((response: {token: string, user: User, cart: Cart}) => {
      onLoginSuccess(response.token, response.user, response.cart);
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('email')) {
        errorMsg = 'Email not found';
      } else if (errorMsg.includes('password')) {
        errorMsg = 'Password not found';
      } else if (errorMsg.includes('activate')) {
        errorMsg = 'You have to activate your account. We have sent you an email with a link to verify your account before you can login.'
        if (onFailByActivation) {
          onFailByActivation(formLogin.email);
        }
      } else if (errorMsg.includes('locked out')) {
        errorMsg = 'You are locked out';
      } else {
        errorMsg = 'Something went wrong, try again';
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
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

    if (!isProtectedPath(router.asPath)) {
      setLoading(false);
    }
  };

  const updateEmail = async (token: string, newEmail: string) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    updateUserEmail(token, newEmail).then((response: {token: string, user: User}) => {
      onUpdateSuccess(response.token, response.user);
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('Token is missing or has expirated')) {
        errorMsg = 'This link has expirated';
      } else if (errorMsg.includes('Email must be unique')) {
        errorMsg = 'Introduced email already exists';
      } else {
        errorMsg = 'Something went wrong, try again';
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  const resetPassword = async (token: string, formResetPassword: FormResetPassword) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    resetUserPassword(token, formResetPassword).then((response: {token: string, user: User}) => {
      onUpdateSuccess(response.token, response.user);
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('Token is missing or has expirated')) {
        errorMsg = 'This link has expirated';
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
  };

  const sendActivationEmail = (email: string, onSuccess?: () => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    sendUserActivationEmail(email).then(() => {
      setLoading(false);
      setSuccessMsg('Sent activation email');
      if (onSuccess) {
        onSuccess();
      }
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('Invalid email')) {
        errorMsg = 'Email not found';
      } else {
        errorMsg = 'Something went wrong, try again';
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  const sendResetEmail = (email: string) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    sendUserResetEmail(email).then(() => {
      setLoading(false);
      setSuccessMsg('Sent reset email');
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('Invalid email')) {
        errorMsg = 'Email not found';
      } else {
        errorMsg = 'Something went wrong, try again';
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  const sendUpdateEmail = (formUpdateEmail: FormUpdateEmail) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    sendUserUpdateEmail(token, formUpdateEmail).then(() => {
      setLoading(false);
      setSuccessMsg('Sent update email');
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('Invalid password')) {
        errorMsg = 'Password not found';
      } else if (errorMsg.includes('Email must be unique')) {
        errorMsg = 'Introduced email already exists';
      } else {
        errorMsg = 'Something went wrong, try again';
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  return {
    register,
    activate,
    login, 
    logout,
    updateEmail,
    resetPassword,
    sendActivationEmail,
    sendResetEmail,
    sendUpdateEmail,
    errorMsg,
    successMsg,
  };
};

export default useAuth;
