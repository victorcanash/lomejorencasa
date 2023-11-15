import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
  useEffect
} from 'react'

import NP from 'number-precision'

interface ContextType {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  initialized: boolean
  setInitialized: Dispatch<SetStateAction<boolean>>
}

export const AppContext = createContext<ContextType>({
  loading: false,
  setLoading: () => {},
  initialized: false,
  setInitialized: () => {}
})

export const useAppContext = () => {
  return useContext(AppContext)
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    NP.enableBoundaryChecking(false)
  }, [])

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        initialized,
        setInitialized
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
