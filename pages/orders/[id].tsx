import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Order } from '@core/types/orders';
import usePage from '@lib/hooks/usePage';
import useOrders from '@lib/hooks/useOrders';
import OrderDetail from '@components/orders/OrderDetail';

const Order: NextPage = () => {
  const router = useRouter();

  const page = usePage();
  const { getOrder } = useOrders();

  const [loadedOrder, setLoadedOrder] = useState(false);
  const [order, setOrder] = useState<Order | undefined>(undefined);

  const onSuccessGetOrder = (order: Order) => {
    setOrder(order);
  }

  useEffect(() => {
    if (page.checked && !loadedOrder) {
      setLoadedOrder(true);
      const { id } = router.query;
      const idSearch = typeof id == 'string' && parseInt(id) >= 0 ? parseInt(id) : -1;
      getOrder(idSearch, onSuccessGetOrder);
    }
  }, [getOrder, loadedOrder, page.checked, router.query]);

  return (
    <>
      <Head>
        <title>Order</title>
        <meta name="description" content="Order page" />
      </Head>

      { loadedOrder && order &&
        <OrderDetail 
          order={order} 
          backBtn={true}
        />
      }
    </>
  );
}

export default Order;
