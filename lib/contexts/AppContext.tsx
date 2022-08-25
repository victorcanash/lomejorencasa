import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type ContextType = {
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
};

export const AppContext = createContext<ContextType>({
  loading: true,
  setLoading: () => {},
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

  return (
    <AppContext.Provider
      value={{ 
        loading, 
        setLoading, 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
