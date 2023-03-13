import { ReactNode } from 'react';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import Box from '@mui/material/Box';

import envConfig from '@core/config/env.config';
import { PageTypes } from '@core/constants/navigation';

import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useApp from '@lib/hooks/useApp';
import useLayout from '@lib/hooks/useLayout';
import Loading from '@components/ui/Loading';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { initialized } = useAppContext();
  const { paypalMerchantId, paypalClientId, paypalToken, currency } = useAuthContext();

  const { layout, pageType } = useLayout(children);
  const app = useApp(pageType);

  const content = (
    <Box style={{ pointerEvents: initialized ? 'auto' : 'none' }}>
      <Loading />
      { layout }
    </Box>
  );

  return (
    <>
      { (pageType !== PageTypes.link && paypalMerchantId && paypalClientId && paypalToken) ?
        <PayPalScriptProvider
          options={{
            'merchant-id': paypalMerchantId,
            'client-id': paypalClientId,
            'data-client-token': paypalToken,
            'currency': currency,
            'intent': 'capture',
            'components':
              envConfig.NEXT_PUBLIC_PAYPAL_ADVANCED_CARDS === 'enabled' ? 'buttons,hosted-fields' : 'buttons',
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
    </>
  );
};

export default MainLayout;
