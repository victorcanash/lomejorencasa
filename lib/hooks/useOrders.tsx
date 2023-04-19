import { useState, useCallback } from 'react';

import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

import type { Order, OrderContact, OrderFailedCreate, OrderFailedSendEmail } from '@core/types/orders';
import type { User } from '@core/types/user';
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
  const { token, user, isLogged } = useAuthContext();

  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const onGetOrdersSuccess = useCallback((orders: Order[], totalPages: number, currentPage: number, onSuccess?: (orders: Order[], totalPages: number, currentPage: number) => void) => {
    if (onSuccess) {
      onSuccess(orders, totalPages, currentPage);
    }
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'orderList.successes.default' }));
  }, [intl, setLoading]);

  const getOrders = useCallback(async (
    page: number,
    onSuccess?: (orders: Order[], totalPages: number, currentPage: number) => void,
    onError?: (errorMsg: string) => void
  ) => {
    if (!isLogged()) {
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await getOrdersMW(token, page, 'id', 'desc', (user as User)?.id || -1)
      .then((response) => {
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
  }, [enqueueSnackbar, intl, isLogged, onGetOrdersSuccess, setLoading, token, user]);

  const onGetOrderSuccess = useCallback((order: Order, onSuccess?: (order: Order) => void) => {
    if (onSuccess) {
      onSuccess(order);
    }
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'orderDetail.successes.default' }));
  }, [intl, setLoading]);

  const getOrder = useCallback( async (
    orderContact: OrderContact,
    onSuccess?: (order: Order) => void,
    onError?: (errorMsg: string) => void
  ) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await getOrderMW(orderContact)
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
  }, [intl, onGetOrderSuccess, setLoading]);

  const onCreateFailedOrderSuccess = useCallback((
    order: Order | undefined,
    onSuccess?: (order?: Order) => void
  ) => {
    if (onSuccess) {
      onSuccess(order);
    }
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.createOrder' }));
  }, [intl, setLoading]);

  const createFailedOrder = useCallback(async (
    order: OrderFailedCreate,
    onSuccess?: (order?: Order) => void
  ) => {
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
  }, [intl, onCreateFailedOrderSuccess, setLoading, token]);

  const onSendFailedOrderEmailSuccess = useCallback((
    order: Order,
    onSuccess?: (order: Order) => void
  ) => {
    if (onSuccess) {
      onSuccess(order);
    }
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.sendOrderEmail' }));
  }, [intl, setLoading]);

  const sendFailedOrderEmail = useCallback(async (
    order: OrderFailedSendEmail,
    onSuccess?: (order: Order) => void
  ) => {
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
  }, [onSendFailedOrderEmailSuccess, setLoading, token]);

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
