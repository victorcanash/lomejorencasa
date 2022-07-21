import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';

import type { User } from 'core/types'

export const MainContext = createContext<ContextType>({
  loading: true,
  setLoading: () => {},
  token: '',
  setToken: () => {},
  user: undefined,
  setUser: () => {},
});

type ContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('Error while reading main context');
  }

  return context;
};
