import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type ContextType = {
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  initialized: boolean,
  setInitialized: Dispatch<SetStateAction<boolean>>,
};

export const AppContext = createContext<ContextType>({
  loading: false,
  setLoading: () => {},
  initialized: false,
  setInitialized: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('Error while reading AppContext');
  }

  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  return (
    <AppContext.Provider
      value={{ 
        loading, 
        setLoading, 
        initialized,
        setInitialized,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
