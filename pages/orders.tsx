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
import Loading from '@components/ui/Loading';
import OrderList from '@components/orders/OrderList';
import GetOrderForm from '@components/forms/orders/GetOrderForm';
import OrderDetail from '@components/orders/OrderDetail';

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
  }, []);

  const showOrder = useCallback((order: Order) => {
    getOrderById(order.id, onSuccessGetOrder)
  }, [getOrderById, onSuccessGetOrder]);

  const onClickBack = useCallback(() => {
    setSelectedOrder(undefined);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (page.checked && !loadedOrders) {
      setLoadedOrders(true);
      if (isLogged()) {
        getOrders(0, onSuccessGetOrders, onErrorGetOrders);
      } else {
        setLoading(false);
      }
    } else if (loadedOrders) {
      if (!isLogged() && loggedOrders) {
        setLoggedOrders(undefined);
        setSelectedOrder(undefined);
      }
    }
  }, [getOrders, isLogged, loadedOrders, loggedOrders, onErrorGetOrders, onSuccessGetOrders, page.checked, setLoading]);

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

      { initialized && page.checked && ((isLogged() && loggedOrders) || (!isLogged())) ?
        <Container>
          { isLogged() &&
            <>
              { !selectedOrder ?
                <OrderList 
                  orders={loggedOrders || []} 
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onChangePage={onChangePage}
                  onClickShowOrder={showOrder}
                />
                :
                <OrderDetail 
                  order={selectedOrder} 
                  backBtn={true}
                  onClickBack={onClickBack}
                />
              }
            </>
          }
          { !isLogged() &&
            <>
              { !selectedOrder ?
                <GetOrderForm
                  getOrder={getOrderByBigbuyId}
                  onSuccess={onSuccessGetOrder}
                  successMsg={successMsg}
                  errorMsg={errorMsg}
                />
                :
                <OrderDetail 
                  order={selectedOrder} 
                  backBtn={true}
                  onClickBack={onClickBack}
                />
              }
            </>
          }
        </Container>
        :
        <Loading open={true} />
      }
    </>
  );
};

export default Orders;
