import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import usePage from '@lib/hooks/usePage';
import useOrders from '@lib/hooks/useOrders';

const Orders: NextPage = () => {
  const router = useRouter();

  const page = usePage();
  const { capturePaypalOrder } = useOrders();

  useEffect(() => {
    if (page.checked) {
      const orderToken = typeof router.query.token == 'string' ? router.query.token : '';
      capturePaypalOrder(orderToken);
    }
  }, [capturePaypalOrder, page.checked, router.query.token]);

  return (
    <>
      <Head>
        <title>Orders</title>
        <meta name="description" content="Order page" />
      </Head>

      <Typography variant="h4" component="h1" gutterBottom>
        Orders
      </Typography>
    </>
  );
};

export default Orders;
