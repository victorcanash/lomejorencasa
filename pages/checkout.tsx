import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import Checkout from '@components/checkout';

const CheckoutPage: NextPage = () => {
  const page = usePage(false);

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'checkout.metas.title',
          descriptionId: 'checkout.metas.description',
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
      />

      <Checkout
        pageChecked={page.checked}
      />
    </>
  );
};

export default CheckoutPage;
