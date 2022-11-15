import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Typography from '@mui/material/Typography';

import usePage from '@lib/hooks/usePage';
import useOrders from '@lib/hooks/useOrders';

const Orders: NextPage = () => {
  const page = usePage();

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
