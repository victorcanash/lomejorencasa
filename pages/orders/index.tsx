import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { Order } from '@core/types/orders';
import usePage from '@lib/hooks/usePage';
import useOrders from '@lib/hooks/useOrders';
import OrderList from '@components/orders/OrderList';

const Orders: NextPage = () => {
  const page = usePage();
  const { getOrders } = useOrders();

  const [loadedOrders, setLoadedOrders] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const onChangePage = (page: number) => {
    getOrders(page, onSuccessGetOrders);
  };

  const onSuccessGetOrders = (orders: Order[], totalPages: number, currentPage: number) => {
    setOrders(orders);
    setTotalPages(totalPages);
    setCurrentPage(currentPage);
  }

  useEffect(() => {
    if (page.checked && !loadedOrders) {
      setLoadedOrders(true);
      getOrders(0, onSuccessGetOrders);
    }
  }, [getOrders, loadedOrders, page.checked]);

  return (
    <>
      <Head>
        <title>Orders</title>
        <meta name="description" content="Orders page" />
      </Head>

    { loadedOrders &&
      <OrderList 
        orders={orders} 
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    }
    </>
  );
};

export default Orders;
