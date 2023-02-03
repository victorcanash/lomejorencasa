import { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Container from '@mui/material/Container';

import { PageTypes } from '@core/constants/navigation';
import type { Order } from '@core/types/orders';

import { pages } from '@lib/constants/navigation';
import usePage from '@lib/hooks/usePage';
import useOrders from '@lib/hooks/useOrders';
import PageHeader from '@components/ui/PageHeader';
import OrderList from '@components/orders/OrderList';

const Orders: NextPage = () => {
  const router = useRouter();

  const page = usePage();
  const { getOrders } = useOrders();

  const [loadedOrders, setLoadedOrders] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const onChangePage = (page: number) => {
    getOrders(page, onSuccessGetOrders);
  };

  const onSuccessGetOrders = useCallback((orders: Order[], totalPages: number, currentPage: number) => {
    setOrders(orders);
    setTotalPages(totalPages);
    setCurrentPage(currentPage);
  }, []);

  const onErrorGetOrders = useCallback((_errorMsg: string) => {
    router.push(pages.home.path);
  }, [router]);

  useEffect(() => {
    if (page.checked && !loadedOrders) {
      setLoadedOrders(true);
      getOrders(0, onSuccessGetOrders, onErrorGetOrders);
    }
  }, [getOrders, loadedOrders, onErrorGetOrders, onSuccessGetOrders, page.checked]);

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

      { loadedOrders &&
        <Container>
          <OrderList 
            orders={orders} 
            totalPages={totalPages}
            currentPage={currentPage}
            onChangePage={onChangePage}
          />
        </Container>
      }
    </>
  );
};

export default Orders;
