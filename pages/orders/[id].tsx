import { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';

import { pages } from '@core/config/navigation.config';
import { Order } from '@core/types/orders';
import usePage from '@lib/hooks/usePage';
import useOrders from '@lib/hooks/useOrders';
import OrderDetail from '@components/orders/OrderDetail';

const Order: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();

  const page = usePage();
  const { getOrder } = useOrders();

  const title = intl.formatMessage({ id: 'orderDetail.metas.title' });
  const description = intl.formatMessage({ id: 'orderDetail.metas.description' });

  const [loadedOrder, setLoadedOrder] = useState(false);
  const [order, setOrder] = useState<Order | undefined>(undefined);

  const onSuccessGetOrder = useCallback((order: Order) => {
    setOrder(order);
  }, []);

  const onErrorGetOrder = useCallback((_errorMsg: string) => {
    router.push(pages.orderList.path);
  }, [router]);

  useEffect(() => {
    if (page.checked && !loadedOrder) {
      setLoadedOrder(true);
      const { id } = router.query;
      const idSearch = typeof id == 'string' && parseInt(id) >= 0 ? parseInt(id) : -1;
      getOrder(idSearch, onSuccessGetOrder, onErrorGetOrder);
    }
  }, [getOrder, loadedOrder, onErrorGetOrder, onSuccessGetOrder, page.checked, router.query]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
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
