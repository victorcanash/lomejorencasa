import { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
// import { useRouter } from 'next/router';

import { PageTypes } from '@core/constants/navigation';
// import { isAdminUser } from '@core/utils/auth';

// import { pages } from '@lib/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
// import { useCartContext } from '@lib/contexts/CartContext';
// import { useAuthContext } from '@lib/contexts/AuthContext';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import CheckoutProfessional from '@components/Checkout/CheckoutProfessional';

const Checkout: NextPage = () => {
  const page = usePage(false);

  const { setLoading } = useAppContext();
  // const { disabledCheckoutPage } = useCartContext();
  // const { token } = useAuthContext();

  // const router = useRouter();

  const [loadedCheckout, setLoadedCheckout] = useState(false);

  const init = useCallback(async () => {
    /*if (disabledCheckoutPage()) {
      let isAdmin = false;
      await isAdminUser(token).then((response: boolean) => {
        isAdmin = response;
      }).catch((_error) => {})
      if (!isAdmin) {
        router.push(pages.home.path);
        return;
      }
    }*/
    setLoadedCheckout(true);
    setLoading(false);
  }, [/*disabledCheckoutPage, router, token*/ setLoading]);

  useEffect(() => {
    if (page.checked) {
      init();
    }
  }, [init, page.checked]);

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'checkout.metas.title',
          descriptionId: 'checkout.metas.description',
        }}
        marginTop={true}
      />

      { loadedCheckout &&
        <CheckoutProfessional />
      }
    </>
  );
};

export default Checkout;
