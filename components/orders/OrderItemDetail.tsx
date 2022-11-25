import Image from 'next/image';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { ProductInventory } from '@core/types/products';
import { pages } from '@core/config/navigation.config';
import { getProductImgUrl } from '@core/utils/products';
import Link from '@core/components/Link';

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

  return (
    <Grid container spacing={2}>

      { orderItem.inventory ?
        <Grid item>
          <Link href={`${pages.orderDetail.path}/${orderItem.inventory.product.name}?id=${orderItem.inventory.product.id}`} noLinkStyle>
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
          </Link>
        </Grid>
        :
        <Typography variant="subtitle1" component="div">
          The product reference no longer exists
        </Typography>
      }

      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs style={orderItem.quantity <= 0 ? {color: 'grey'} : undefined}>
            <Typography gutterBottom variant="subtitle1" component="div">
              {orderItem.inventory?.product.name || orderItem.name}
            </Typography>
            <Typography variant="body2">
              {orderItem.inventory?.name || undefined}
            </Typography>
            <Typography variant="body2">
              Quantity: {orderItem.quantity.toString()}
            </Typography>
            <Typography variant="body2">
              SKU: {orderItem.reference}
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <Typography variant="subtitle1" component="div" style={orderItem.quantity <= 0 ? {color: 'grey'} : undefined}>
            {orderItem.inventory ? ((orderItem.inventory?.realPrice * orderItem.quantity).toFixed(2)) : undefined} €
          </Typography>
        </Grid>
      </Grid>

    </Grid>
  );
};

export default OrderItemDetail;