import { useState } from 'react';
import { useRouter } from 'next/router';

import type { AuthRegister, AuthLogin, User } from '@core/types/auth';
import { registerUser, loginUser } from '@core/utils/auth';
import { useAppContext } from '@lib/contexts/AppContext';

const useAuth = () => {
  const { token, user, setLoading, setToken, setUser } = useAppContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const isLogged = () => {
    if (!token || !user) {
      router.push('/login');
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
    loginUser(authLogin, token).then((response: {token: string, user: User}) => {
      setToken(response.token);
      setUser(response.user);
      router.push('/');
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
      loginUser(authLogin, token).then((response: {token: string, user: User}) => {
        setToken(response.token);
        setUser(response.user);
        router.push('/');
      }).catch((error) => {
        setErrorMsg(error.message);
        router.push('/login');
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

  return {
    errorMsg,
    isLogged,
    login,
    register
  }
};

export default useAuth;
