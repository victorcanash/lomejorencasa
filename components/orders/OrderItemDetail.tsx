import Image from 'next/image';

import { useIntl, FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import type { ProductInventory } from '@core/types/products';
import { getProductImgUrl } from '@core/utils/products';

type OrderItemDetailProps = {
  orderItem: {
    id: string;
    reference: string;
    quantity: number;
    name: string;
    inventory: ProductInventory | null;
  }
}

const OrderItemDetail = (props: OrderItemDetailProps) => {
  const { orderItem } = props;

  const intl = useIntl();

  return (
    <Grid container spacing={2}>

      { orderItem.inventory ?
        <Grid item>
          <div style={{ position: 'relative', minWidth: '100px' }}>
            <Image
              src={getProductImgUrl(orderItem.inventory.product)}
              alt="Product image"
              width="500"
              height="500"
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </Grid>
        :
        <Typography component="div" variant="body1">
          <FormattedMessage 
            id="orderDetail.noProductReference" 
          />
        </Typography>
      }

      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs style={orderItem.quantity <= 0 ? {color: 'grey'} : undefined}>
            <Typography gutterBottom component="div" variant="body1">
              {orderItem.inventory?.product.name.current || orderItem.name}
            </Typography>
            <Typography component="div" variant="body2">
              {orderItem.inventory?.name.current || undefined}
            </Typography>
            <Typography component="div" variant="body2">
              {`${intl.formatMessage({ id: "forms.quantity" })}: ${orderItem.quantity.toString()}`}
            </Typography>
            <Typography component="div" variant="body2">
              {`${intl.formatMessage({ id: "forms.sku" })}: ${orderItem.reference}`}
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <Typography variant="body1" component="div" style={orderItem.quantity <= 0 ? {color: 'grey'} : undefined}>
            {`${orderItem.inventory ? ((orderItem.inventory?.realPrice * orderItem.quantity).toFixed(2)) : undefined} €`}
          </Typography>
        </Grid>
      </Grid>

    </Grid>
  );
};

export default OrderItemDetail;
