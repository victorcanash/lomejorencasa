import { useState } from 'react';

import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

import type { Order, OrderContact, OrderFailedCreate, OrderFailedSendEmail } from '@core/types/orders';
import type { User } from '@core/types/user';
import { 
  getOrders as getOrdersMW, 
  getLoggedOrder as getLoggedOrderMW,
  getUnloggedOrder as getUnloggedOrderMW,
  createFailedOrder as createFailedOrderMW,
  sendFailedOrderEmail as sendFailedOrderEmailMW,
} from '@core/utils/orders';

import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';

const useOrders = () => {
  const { setLoading } = useAppContext();
  const { token, user, isLogged } = useAuthContext();

  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const getOrders = async (page: number, onSuccess?: (orders: Order[], totalPages: number, currentPage: number) => void, onError?: (errorMsg: string) => void) => {
    if (!isLogged()) {
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await getOrdersMW(token, page, 'id', 'desc', (user as User)?.id || -1)
      .then((response: { orders: Order[], totalPages: number, currentPage: number }) => {
        onGetOrdersSuccess(response.orders, response.totalPages, response.currentPage, onSuccess);
      }).catch((error) => {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        setLoading(false);
        enqueueSnackbar(
          intl.formatMessage({ id: 'orderList.errors.default' }),
          { variant: 'error' }
        );
        if (onError) {
          onError(errorMsg);
        }
      });
  };

  const onGetOrdersSuccess = (orders: Order[], totalPages: number, currentPage: number, onSuccess?: (orders: Order[], totalPages: number, currentPage: number) => void) => {
    if (onSuccess) {
      onSuccess(orders, totalPages, currentPage);
    }
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'orderList.successes.default' }));
  }

  const getLoggedOrder = async (id: number, onSuccess?: (order: Order) => void, onError?: (errorMsg: string) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await getLoggedOrderMW(token, id)
      .then((response: { order: Order }) => {
        onGetOrderSuccess(response.order, onSuccess);
      }).catch((error) => {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        setLoading(false);
        enqueueSnackbar(
          intl.formatMessage({ id: 'orderDetail.errors.default' }), 
          { variant: 'error' }
        );
        if (onError) {
          onError(errorMsg);
        }
      });
  };

  const getUnloggedOrder = async (orderContact: OrderContact, onSuccess?: (order: Order) => void, onError?: (errorMsg: string) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await getUnloggedOrderMW(orderContact)
      .then((response: { order: Order }) => {
        onGetOrderSuccess(response.order, onSuccess);
      }).catch((error) => {
        let errorMsg = error.message; 
        if (errorMsg.includes('bigbuyId')) {
          errorMsg = intl.formatMessage({ id: 'orderDetail.errors.bigbuyId' });
        } else if (errorMsg.includes('email')) {
          errorMsg = intl.formatMessage({ id: 'orderDetail.errors.guestUserEmail' });
        } else if (errorMsg.includes('be logged')) {
          errorMsg = intl.formatMessage({ id: 'orderDetail.errors.loggedOrder' });
        } else {
          errorMsg = intl.formatMessage({ id: 'orderDetail.errors.default' });
        }
        setErrorMsg(errorMsg);
        setLoading(false);
        if (onError) {
          onError(errorMsg);
        }
      });
  };

  const onGetOrderSuccess = (order: Order, onSuccess?: (order: Order) => void) => {
    if (onSuccess) {
      onSuccess(order);
    }
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'orderDetail.successes.default' }));
  }

  const createFailedOrder = async (order: OrderFailedCreate, onSuccess?: (order?: Order) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await createFailedOrderMW(token, order)
      .then((response: { order?: Order }) => {
        onCreateFailedOrderSuccess(response.order, onSuccess);
      }).catch((error) => {
        let errorMsg = error.message;
        if (errorMsg.includes('payment data error')) {
          errorMsg = intl.formatMessage({ id: 'admin.errors.invalidOrderTransactionId' });
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
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.createOrder' }));
  };

  const sendFailedOrderEmail = async (order: OrderFailedSendEmail, onSuccess?: (order: Order) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await sendFailedOrderEmailMW(token, order)
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
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.sendOrderEmail' }));
  };

  return {
    errorMsg,
    successMsg,
    getOrders,
    getLoggedOrder,
    getUnloggedOrder,
    createFailedOrder,
    sendFailedOrderEmail,
  };
};

export default useOrders;
