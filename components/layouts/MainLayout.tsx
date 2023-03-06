import { ReactNode } from 'react';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import Box from '@mui/material/Box';

import { PageTypes } from '@core/constants/navigation';

import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useApp from '@lib/hooks/useApp';
import useLayout from '@lib/hooks/useLayout';
import Loading from '@components/ui/Loading';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { initialized } = useAppContext();
  const { paypalClientId, paypalClientToken, currency } = useAuthContext();

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
      { (pageType !== PageTypes.link && paypalClientId && paypalClientToken) ?
        <PayPalScriptProvider
          options={{
            'client-id': paypalClientId,
            'data-client-token': paypalClientToken,
            'components': 'buttons',
            'currency': currency,
            'intent': "capture",
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
