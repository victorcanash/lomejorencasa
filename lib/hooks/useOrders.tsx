import { useSnackbar } from 'notistack';

import { createTransaction } from '@core/utils/payment';
import { useAuthContext } from '@lib/contexts/AuthContext';

const useOrders = () => {
  const { token } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const startTransaction = async (paymentMethodNonce: string) => {
    let transaction: any = undefined;
    await createTransaction(token, paymentMethodNonce)
      .then((response: { transaction: any }) => {
        transaction = response.transaction;
      }).catch(() => {
        errorSnackbar();
      });
    return transaction;
  };

  const errorSnackbar = () => {
    enqueueSnackbar('Failed proceeding to payment, try it again', { variant: 'error' });
  };

  return {
    startTransaction,
  };
};

export default useOrders;
