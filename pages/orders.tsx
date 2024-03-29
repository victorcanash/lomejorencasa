import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@core/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import Orders from '@core/components/Orders';

const OrdersPage: NextPage = () => {
  const page = usePage(false);

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

      <Orders
        pageChecked={page.checked}
      />
    </>
  );
};

export default OrdersPage;
