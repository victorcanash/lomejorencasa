import { useRouter } from 'next/router';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { pages } from '@core/config/navigation.config';
import { Order } from '@core/types/orders';

type OrderItemProps = {
  order: Order,
};

const OrderItem = (props: OrderItemProps) => {
  const { order } = props;

  const router = useRouter();

  const onClickShowOrder = () => {
    router.push(`${pages.orderDetail.path}/${order.id}`);
  };

  return (
    <>
      <Divider sx={{ mb: 3 }} />
      <Typography component="h3" variant="h6">
        {`Order number: ${order.id}`}
      </Typography>
      <Grid container spacing={1} py={3}>
        <Grid item xs={6}>
          <Typography component="div" variant="subtitle1">
            {`Order date: ${new Date(order.createdAt).toLocaleDateString()}`}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            onClick={onClickShowOrder}
          >
            Show order
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderItem;
