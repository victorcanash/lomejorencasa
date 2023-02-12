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
import OrderList from '@components/orders/OrderList';
import GetOrderForm from '@components/forms/orders/GetOrderForm';
import OrderDetail from '@components/orders/OrderDetail';

const Orders: NextPage = () => {
  const router = useRouter();

  const { setLoading } = useAppContext();
  const { isLogged } = useAuthContext();

  const page = usePage(false);
  const { getOrders } = useOrders();

  const [loadedOrders, setLoadedOrders] = useState(false);
  const [loggedOrders, setLoggedOrders] = useState<Order[]>([]);
  const [unloggedOrder, setUnloggedOrder] = useState<Order | undefined>(undefined);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const onChangePage = (page: number) => {
    getOrders(page, onSuccessGetOrders, onErrorGetOrders);
  };

  const onSuccessGetOrders = useCallback((orders: Order[], totalPages: number, currentPage: number) => {
    setLoggedOrders(orders);
    setTotalPages(totalPages);
    setCurrentPage(currentPage);
  }, []);

  const onErrorGetOrders = useCallback((_errorMsg: string) => {
    router.push(pages.home.path);
  }, [router]);

  const showOrder = (order: Order) => {
    router.push(`${pages.orderDetail.path}/${order.id}`);
  };

  const onSuccessGetOrder = (order: Order) => {
    setUnloggedOrder(order);
  };

  const onClickBack = () => {
    setUnloggedOrder(undefined);
  }

  useEffect(() => {
    if (page.checked && !loadedOrders) {
      setLoadedOrders(true);
      if (isLogged()) {
        getOrders(0, onSuccessGetOrders, onErrorGetOrders);
      } else {
        setLoading(false);
      }
    }
  }, [getOrders, isLogged, loadedOrders, onErrorGetOrders, onSuccessGetOrders, page.checked, setLoading]);

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'orderList.metas.title',
          descriptionId: 'orderList.metas.description',
        }}
        marginTop={true}
        texts={{
          titleId: 'orderList.h1',
        }}
      />

      <Container>
        { isLogged() &&
            <OrderList 
              orders={loggedOrders} 
              totalPages={totalPages}
              currentPage={currentPage}
              onChangePage={onChangePage}
              onClickShowOrder={showOrder}
            />
        }
        { !isLogged() &&
          <>
            { !unloggedOrder ?
              <GetOrderForm 
                onSuccess={onSuccessGetOrder}
              />
              :
              <OrderDetail 
                order={unloggedOrder} 
                backBtn={true}
                onClickBack={onClickBack}
              />
            }
          </>
        }
      </Container>
    </>
  );
};

export default Orders;
