import { type ReactNode } from 'react'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import Box from '@mui/material/Box'

import envConfig from '@core/config/env.config'
import { PageTypes } from '@core/constants/navigation'

import { useAppContext } from '@core/contexts/AppContext'
import { useAuthContext } from '@core/contexts/AuthContext'
import useApp from '@core/hooks/useApp'
import useLayout from '@core/hooks/useLayout'
import Loading from '@core/components/ui/Loading'

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { loading } = useAppContext()
  const { paypal, currency } = useAuthContext()

  useApp()
  const { layout, pageType } = useLayout(children)

  const content = (
    <Box sx={{ whiteSpace: 'pre-line' }}>
      <Loading open={loading} />
      { layout }
    </Box>
  )

  return (
    <>
      { (pageType !== PageTypes.link)
        ? <GoogleOAuthProvider
          clientId={envConfig.GOOGLE_OAUTH_CLIENT_ID}
        >
          { (paypal != null)
            ? <PayPalScriptProvider
              options={{
                locale: 'es_ES',
                'merchant-id': envConfig.PAYPAL_MERCHANT_ID,
                'client-id': envConfig.PAYPAL_CLIENT_ID,
                'data-client-token': paypal.token,
                currency,
                intent: 'capture',
                components:
                  (paypal.advancedCards === true) ? 'buttons,hosted-fields' : 'buttons'
                // 'vault': true,
              }}
            >
              { content }
            </PayPalScriptProvider>
            : <>
              { content }
            </>
          }
        </GoogleOAuthProvider>
        : <>
          { content }
        </>
      }
    </>
  )
}

export default MainLayout
