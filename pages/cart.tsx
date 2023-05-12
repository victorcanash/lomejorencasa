import type { NextPage } from 'next';

import Container from '@mui/material/Container';

import { PageTypes } from '@core/constants/navigation';

import { pages } from '@lib/constants/navigation';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import CartDetail from '@components/cart/CartDetail';

const Cart: NextPage = () => {
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

      <Container maxWidth="md">
        <CartDetail
          page={pages.cart}
        />
      </Container>
    </>
  );
};

export default Cart;
