import type { NextPage } from 'next';
import Head from 'next/head';

import usePage from '@lib/hooks/usePage';
import CartDetail from '@components/cart/CartDetail';

const Cart: NextPage = () => {
  const page = usePage();

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Cart page" />
      </Head>

      <CartDetail />
    </>
  );
};

export default Cart;
