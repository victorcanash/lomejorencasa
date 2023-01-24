import { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { PageTypes } from '@core/constants/navigation';
import type { Order } from '@core/types/orders';
import { pages } from '@lib/constants/navigation';
import usePage from '@lib/hooks/usePage';
import useOrders from '@lib/hooks/useOrders';
import PageHeader from '@components/ui/PageHeader';
import OrderDetail from '@components/orders/OrderDetail';

const Order: NextPage = () => {
  const router = useRouter();

  const page = usePage();
  const { getOrder } = useOrders();

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
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'orderDetail.metas.title',
          descriptionId: 'orderDetail.metas.description',
        }}
      />

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
