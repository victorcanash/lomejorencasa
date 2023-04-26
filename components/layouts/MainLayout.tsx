import { ReactNode } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import Box from '@mui/material/Box';

import { PageTypes } from '@core/constants/navigation';

import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useApp from '@lib/hooks/useApp';
import useLayout from '@lib/hooks/useLayout';
import Loading from '@components/ui/Loading';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { loading } = useAppContext();
  const { google, paypal, currency } = useAuthContext();

  const { layout, pageType } = useLayout(children);
  const app = useApp(pageType);

  const content = (
    <Box>
      <Loading open={loading} />
      { layout }
    </Box>
  );

  return (
    <>
      { (pageType !== PageTypes.link) ?
        <GoogleOAuthProvider 
          clientId={google.oauthId}
        >
          { paypal ?
            <PayPalScriptProvider
              options={{
                'locale': 'es_ES',
                'merchant-id': paypal.merchantId,
                'client-id': paypal.clientId,
                'data-client-token': paypal.token,
                'currency': currency,
                'intent': 'capture',
                'components':
                  paypal.advancedCards ? 'buttons,hosted-fields' : 'buttons',
                //'vault': true,
              }}
            >
              { content }
            </PayPalScriptProvider>
            :
            <>
              { content }
            </>
          }
        </GoogleOAuthProvider>
        :
        <>
          { content }
        </>
      }
    </>
  );
};

export default MainLayout;
