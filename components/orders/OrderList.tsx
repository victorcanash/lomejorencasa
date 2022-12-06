import { Fragment } from 'react';

import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { Order } from '@core/types/orders';
import OrderItem from '@components/orders/OrderItem';
import Pagination from '@components/ui/Pagination';

type OrderListProps = {
  orders: Order[],
  totalPages: number,
  currentPage: number,
  onChangePage: (page: number) => void,
};

const OrderList = (props: OrderListProps) => {
  const { orders, totalPages, currentPage, onChangePage } = props;

  const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    onChangePage(page);
  };

  return (
    <>
      <Typography variant="h5" component="h1" className='animate__animated animate__fadeInLeft'>
        <FormattedMessage id="orderList.h1" />
      </Typography>

      {
        orders.length > 0 ?
          <Grid container py={3}>
            {orders?.map((item) => (
              <Fragment key={item.id}>   
                <Grid item xs={12}>
                  <OrderItem order={item} />
                </Grid>
              </Fragment>
            ))}
          </Grid>
          :
          <Typography component="h3" variant="subtitle1" sx={{ textAlign: "center" }}>
            <FormattedMessage id="orderList.noItems" />
          </Typography>
      }

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={handleChangePage}
      />
    </>
  );
};

export default OrderList;
