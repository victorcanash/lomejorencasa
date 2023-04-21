import { useState, useCallback, useEffect } from 'react';

import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

import type { Order, OrderContact, OrderFailedCreate, OrderFailedSendEmail } from '@core/types/orders';
import type { User } from '@core/types/user';
import { 
  getOrders as getOrdersMW, 
  getOrderByBigbuyId as getOrderByBigbuyIdMW,
  getOrderById as getOrderByIdMW,
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
    setSuccessMsg(intl.formatMessage({ id: 'orders.list.successes.default' }));
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
          intl.formatMessage({ id: 'orders.list.errors.default' }),
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
    setSuccessMsg(intl.formatMessage({ id: 'orders.detail.successes.default' }));
  }, [intl, setLoading]);

  const getOrderById = useCallback(async (
    id: number,
    onSuccess?: (order: Order) => void,
    onError?: (errorMsg: string) => void
  ) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await getOrderByIdMW(token, id)
      .then((response: { order: Order }) => {
        onGetOrderSuccess(response.order, onSuccess);
      }).catch((error) => {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        setLoading(false);
        enqueueSnackbar(
          intl.formatMessage({ id: 'orders.detail.errors.default' }), 
          { variant: 'error' }
        );
        if (onError) {
          onError(errorMsg);
        }
      });
  }, [enqueueSnackbar, intl, onGetOrderSuccess, setLoading, token]);

  const getOrderByBigbuyId = useCallback(async (
    orderContact: OrderContact,
    onSuccess?: (order: Order) => void,
    onError?: (errorMsg: string) => void
  ) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await getOrderByBigbuyIdMW(orderContact)
      .then((response: { order: Order }) => {
        onGetOrderSuccess(response.order, onSuccess);
      }).catch((error) => {
        let errorMsg = error.message; 
        if (errorMsg.includes('bigbuyId')) {
          errorMsg = intl.formatMessage({ id: 'orders.detail.errors.bigbuyId' });
        } else if (errorMsg.includes('email')) {
          errorMsg = intl.formatMessage({ id: 'orders.detail.errors.guestUserEmail' });
        } else if (errorMsg.includes('be logged')) {
          errorMsg = intl.formatMessage({ id: 'orders.detail.errors.loggedOrder' });
        } else {
          errorMsg = intl.formatMessage({ id: 'orders.detail.errors.default' });
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

  useEffect(() => {
    setSuccessMsg('');
    setErrorMsg('');
  }, [isLogged, token]);

  return {
    errorMsg,
    successMsg,
    getOrders,
    getOrderByBigbuyId,
    getOrderById,
    createFailedOrder,
    sendFailedOrderEmail,
  };
};

export default useOrders;
