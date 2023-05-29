import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@core/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import CartView from '@components/CartView';

const CartPage: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'cart.metas.title',
          descriptionId: 'cart.metas.description',
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
        texts={{
          title: {
            id: 'cart.h1',
          },
        }}
      />

      <CartView />
    </>
  );
};

export default CartPage;
