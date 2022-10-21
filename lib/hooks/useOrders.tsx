import { useSnackbar } from 'notistack';

import { checkoutOrder, captureOrder } from '@core/utils/paypal';
import { useAuthContext } from '@lib/contexts/AuthContext';

const useOrders = () => {
  const { token } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const checkoutPaypalOrder = () => {
    checkoutOrder(token)
      .then((response: { checkoutUrl: string }) => {
        window.location.href = response.checkoutUrl;
      }).catch(() => {
        errorSnackbar();
      });
  };

  const capturePaypalOrder = (orderToken: string) => {
    captureOrder(token, orderToken)
      .then((response: { data: any }) => {
        console.log('CAPTURE DATA: ', response.data);
      }).catch(() => {
        errorSnackbar();
      })
  }

  const errorSnackbar = () => {
    enqueueSnackbar('Failed proceeding to payment, try it again', { variant: 'error' });
  }

  return {
    checkoutPaypalOrder,
    capturePaypalOrder,
  };
};

export default useOrders;
