import { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Container from '@mui/material/Container';

import { PageTypes } from '@core/constants/navigation';
import type { Order } from '@core/types/orders';

import { pages } from '@lib/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import usePage from '@lib/hooks/usePage';
import useOrders from '@lib/hooks/useOrders';
import PageHeader from '@components/ui/PageHeader';
import OrderDetail from '@components/orders/OrderDetail';
import OrderList from '@components/orders/OrderList';
import GetOrderForm from '@components/forms/orders/GetOrderForm';

const Orders: NextPage = () => {
  const router = useRouter();

  const { initialized, setLoading } = useAppContext();
  const { isLogged } = useAuthContext();

  const page = usePage(false);
  const {
    getOrders,
    getOrderByBigbuyId,
    getOrderById,
    successMsg,
    errorMsg,
    setSuccessMsg,
    setErrorMsg,
  } = useOrders();

  const [loadedOrders, setLoadedOrders] = useState(false);
  const [loadingOrderQueries, setLoadingOrderQueries] = useState(true);
  const [loggedOrders, setLoggedOrders] = useState<Order[] | undefined>(undefined);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(undefined);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const onSuccessGetOrders = useCallback((orders: Order[], totalPages: number, currentPage: number) => {
    setLoggedOrders(orders);
    setTotalPages(totalPages);
    setCurrentPage(currentPage);
    setLoading(false);
  }, [setLoading]);

  const onErrorGetOrders = useCallback((_errorMsg: string) => {
    router.push(pages.home.path);
  }, [router]);

  const onChangePage = useCallback((page: number) => {
    getOrders(page, onSuccessGetOrders, onErrorGetOrders);
  }, [getOrders, onErrorGetOrders, onSuccessGetOrders]);

  const onSuccessGetOrder = useCallback((order: Order) => {
    setSelectedOrder(order);
    setLoadingOrderQueries(false);
  }, []);

  const showOrder = useCallback((order: Order) => {
    getOrderById(order.id, onSuccessGetOrder);
  }, [getOrderById, onSuccessGetOrder]);

  const onErrorGetOrderByQueries = useCallback((_errorMsg: string) => {
    setLoadingOrderQueries(false);
  }, []);

  const getOrderByQueries = useCallback((queries: { id: string, email: string }) => {
    getOrderByBigbuyId({ orderId: queries.id, guestUserEmail: queries.email }, onSuccessGetOrder, onErrorGetOrderByQueries);
  }, [getOrderByBigbuyId, onErrorGetOrderByQueries, onSuccessGetOrder]);

  const getOrderQueries = useCallback(() => {
    const { id, email } = router.query;
    if (
        (id && typeof id === 'string') &&
        (email && typeof email === 'string')
      ) {
      return { id, email };
    }
    return undefined;
  }, [router.query]);

  const onClickBack = useCallback(() => {
    router.replace(pages.orders.path, undefined, { shallow: true })
    setSelectedOrder(undefined);
    window.scrollTo(0, 0);
    if (isLogged() && !loggedOrders) {
      getOrders(0, onSuccessGetOrders, onErrorGetOrders);
    }
  }, [getOrders, isLogged, loggedOrders, onErrorGetOrders, onSuccessGetOrders, router]);

  const ActiveComponent = useCallback(() => {
    if (
        (initialized && page.checked) &&
        ((!selectedOrder && !loadingOrderQueries) || selectedOrder)
      ) {
      if (selectedOrder) {
        return (  
          <OrderDetail 
            order={selectedOrder} 
            backBtn={true}
            onClickBack={onClickBack}
          />
        );
      } else if (isLogged()) {
          return(
            <OrderList 
              orders={loggedOrders || []} 
              totalPages={totalPages}
              currentPage={currentPage}
              onChangePage={onChangePage}
              onClickShowOrder={showOrder}
            />
          );
      } else {
        return (
          <GetOrderForm
            getOrder={getOrderByBigbuyId}
            onSuccess={onSuccessGetOrder}
            successMsg={successMsg}
            errorMsg={errorMsg}
          />
        );
      }
    }
    return (
      <></>
    );
  }, [currentPage, errorMsg, getOrderByBigbuyId, initialized, isLogged, loadingOrderQueries, loggedOrders, onChangePage, onClickBack, onSuccessGetOrder, page.checked, selectedOrder, showOrder, successMsg, totalPages]);

  useEffect(() => {
    if (!page.checked) {
      setLoading(true);
    } else if (page.checked && !loadedOrders) {
      setLoadedOrders(true);
      const queries = getOrderQueries();
      if (queries) {
        getOrderByQueries(queries);
      } else {
        setLoadingOrderQueries(false);
        if (isLogged()) {
          getOrders(0, onSuccessGetOrders, onErrorGetOrders);
        } else {
          setLoading(false);
        }
      }
    } else if (loadedOrders) {
      if (!isLogged() && loggedOrders) {
        setLoggedOrders(undefined);
        setSelectedOrder(undefined);
      }
    }
  }, [getOrderByQueries, getOrderQueries, getOrders, isLogged, loadedOrders, loggedOrders, onErrorGetOrders, onSuccessGetOrders, page.checked, setLoading]);

  useEffect(() => {
    setSuccessMsg('');
    setErrorMsg('');
  }, [isLogged, selectedOrder, setErrorMsg, setSuccessMsg]);

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'orders.metas.title',
          descriptionId: 'orders.metas.description',
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
        texts={{
          title: {
            id: 'orders.h1',
          },
        }}
      />

      <Container>
        <ActiveComponent />
      </Container>
    </>
  );
};

export default Orders;
