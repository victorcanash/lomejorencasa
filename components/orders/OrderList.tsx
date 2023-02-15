import { Fragment } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import type { Order } from '@core/types/orders';

import Pagination from '@components/ui/Pagination';

type OrderListProps = {
  orders: Order[],
  totalPages: number,
  currentPage: number,
  onChangePage: (page: number) => void,
  onClickShowOrder: (order: Order) => void,
};

const OrderList = (props: OrderListProps) => {
  const { orders, totalPages, currentPage, onChangePage, onClickShowOrder } = props;

  const intl = useIntl();

  const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    onChangePage(page);
  };

  const handleClickShowBtn = (order: Order) => {
    onClickShowOrder(order);
  };

  return (
    <>
      { orders.length > 0 ?
        <Grid container>
          {orders?.map((order) => (
            <Fragment key={order.id}>   
              <Grid item xs={12}>
                <Typography component="h3" variant="h1">
                  {`${intl.formatMessage({ id: "orderDetail.number" })}: ${order.bigbuyId}`}
                </Typography>
                <Grid container spacing={1} py={3}>
                  <Grid item xs={6}>
                    <Typography component="div" variant="body1">
                      {`${intl.formatMessage({ id: "orderDetail.date" })}: ${new Date(order.createdAt).toLocaleDateString()}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      onClick={() => handleClickShowBtn(order)}
                    >
                      <FormattedMessage id="orderDetail.showBtn" />
                    </Button>
                  </Grid>
                </Grid>
                <Divider sx={{ mb: 3 }} />
              </Grid>
            </Fragment>
          ))}
        </Grid>
        :
        <Typography component="div" variant="body1" align="center" sx={{ my: 5 }}>
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
