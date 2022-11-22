import { useState } from 'react';
import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';

import { pages } from '@core/config/navigation.config';
import { Order } from '@core/types/orders';
import { 
  getOrders as getOrdersMW, 
  getOrder as getOrderMW, 
  createOrder as createOrderMW, 
} from '@core/utils/orders';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';

const useOrders = () => {
  const { setLoading } = useAppContext();
  const { token } = useAuthContext();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const getOrders = async (page: number, onSuccess?: (orders: Order[], totalPages: number, currentPage: number) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await getOrdersMW(token, page, 'id', 'desc')
      .then((response: { orders: Order[], totalPages: number, currentPage: number }) => {
        onGetOrdersSuccess(response.orders, response.totalPages, response.currentPage, onSuccess);
      }).catch((error) => {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  const onGetOrdersSuccess = (orders: Order[], totalPages: number, currentPage: number, onSuccess?: (orders: Order[], totalPages: number, currentPage: number) => void) => {
    if (onSuccess) {
      onSuccess(orders, totalPages, currentPage);
    }
    setLoading(false);
    setSuccessMsg('Got orders');
  }

  const getOrder = async (id: number, onSuccess?: (order: Order) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await getOrderMW(token, id)
      .then((response: { order: Order }) => {
        onGetOrderSuccess(response.order, onSuccess);
      }).catch((error) => {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  const onGetOrderSuccess = (order: Order, onSuccess?: (order: Order) => void) => {
    if (onSuccess) {
      onSuccess(order);
    }
    setLoading(false);
    setSuccessMsg('Got order');
  }

  const createOrder = async (braintreeTransactionId: string, onSuccess?: (order: Order) => void, onError?: (message: string) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await createOrderMW(token, braintreeTransactionId)
      .then((response: { order: Order }) => {
        if (onSuccess) {
          onSuccess(response.order);
        }
        setSuccessMsg('Created order');
      }).catch((error) => {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        if (onError) {
          onError(errorMsg);
        }
      });
    setLoading(false);
    enqueueSnackbar('Order completed, you will receive an email with all details', { variant: 'success' });
    router.push(pages.home.path);
  };

  return {
    errorMsg,
    successMsg,
    getOrders,
    getOrder,
    createOrder,
  };
};

export default useOrders;
