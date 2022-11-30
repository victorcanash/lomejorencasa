import { useState } from 'react';

import { Order, OrderFailedCreate } from '@core/types/orders';
import { 
  getOrders as getOrdersMW, 
  getOrder as getOrderMW,
  createFailedOrder as createFailedOrderMW,
  sendFailedOrderEmail as sendFailedOrderEmailMW,
} from '@core/utils/orders';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';

const useOrders = () => {
  const { setLoading } = useAppContext();
  const { token, user } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const getOrders = async (page: number, onSuccess?: (orders: Order[], totalPages: number, currentPage: number) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await getOrdersMW(token, page, 'id', 'desc', user?.id || -1)
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

  const createFailedOrder = async (order: OrderFailedCreate, onSuccess?: (order?: Order) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await createFailedOrderMW(token, order)
      .then((response: { order: Order }) => {
        onCreateFailedOrderSuccess(response.order, onSuccess);
      }).catch((error) => {
        let errorMsg = error.message;
        if (errorMsg.includes('Get order info error')) {
          onCreateFailedOrderSuccess(undefined, onSuccess);
          return;
        } else if (errorMsg.includes('Braintree error')) {
          errorMsg = 'Invalid BraintreeTransaction ID'; 
        }
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  const onCreateFailedOrderSuccess = (order: Order | undefined, onSuccess?: (order?: Order) => void) => {
    if (onSuccess) {
      onSuccess(order);
    }
    setLoading(false);
    setSuccessMsg('Created order');
  }

  const sendFailedOrderEmail = async (id: number, onSuccess?: (order: Order) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await sendFailedOrderEmailMW(token, id)
      .then((response: { order: Order }) => {
        onSendFailedOrderEmailSuccess(response.order, onSuccess);
      }).catch((error) => {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  const onSendFailedOrderEmailSuccess = (order: Order, onSuccess?: (order: Order) => void) => {
    if (onSuccess) {
      onSuccess(order);
    }
    setLoading(false);
    setSuccessMsg('Sent order check email');
  }

  return {
    errorMsg,
    successMsg,
    getOrders,
    getOrder,
    createFailedOrder,
    sendFailedOrderEmail,
  };
};

export default useOrders;
