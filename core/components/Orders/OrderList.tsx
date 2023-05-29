import { useCallback, Fragment } from 'react';
import { useRouter } from 'next/router';

import { useIntl, FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import type { Order } from '@core/types/orders';
import { convertToDate } from '@core/utils/dates';
import Divider from '@core/components/ui/Divider';

import Pagination from '@core/components/ui/Pagination';

type OrderListProps = {
  orders: Order[],
  totalPages: number,
  currentPage: number,
  onChangePage: (page: number) => void,
  onClickShowOrder: (order: Order) => void,
};

const OrderList = (props: OrderListProps) => {
  const {
    orders,
    totalPages,
    currentPage,
    onChangePage,
    onClickShowOrder,
  } = props;

  const router = useRouter();
  const intl = useIntl();

  const handleChangePage = useCallback((_event: React.ChangeEvent<unknown>, page: number) => {
    onChangePage(page);
  }, [onChangePage]);

  const handleClickShowBtn = useCallback((order: Order) => {
    onClickShowOrder(order);
  }, [onClickShowOrder]);

  return (
    <>
      { orders.length > 0 ?
        <Grid container>
          {orders?.map((order) => (
            <Fragment key={order.id}>   
              <Grid item xs={12}>
                <Typography variant="h3">
                  {`${intl.formatMessage({ id: "orders.detail.number" })}: ${order.bigbuyId}`}
                </Typography>
                <Grid container spacing={1} py={3}>
                  <Grid item xs={6}>
                    <Typography component="div" variant="body1">
                      {`${intl.formatMessage({ id: "orders.detail.date" })}: ${convertToDate(order.createdAt, router.locale)}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      onClick={() => handleClickShowBtn(order)}
                    >
                      <FormattedMessage id="orders.detail.showBtn" />
                    </Button>
                  </Grid>
                </Grid>
                <Divider mb={3} />
              </Grid>
            </Fragment>
          ))}
        </Grid>
        :
        <Typography component="div" variant="body1" align="center" sx={{ my: 5 }}>
          <FormattedMessage id="orders.list.noItems" />
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
