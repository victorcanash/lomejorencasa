import Image from 'next/image';

import { useIntl } from 'react-intl';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

import type { CartItem } from '@core/types/cart';
import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import { everfreshProductId, bagProductId } from '@lib/constants/products';
import { getProductImgUrl } from '@lib/utils/products';
import useSelectInventoryQuantity from '@lib/hooks/useSelectInventoryQuantity';

type CartItemDetailProps = {
  item: CartItem,
  updateQuantity?: (cartItem: CartItem, quantity: number, forceUpdate?: boolean) => void,
  priorityImg?: boolean,
};

const CartItemDetail = (props: CartItemDetailProps) => {
  const { item, updateQuantity, priorityImg } = props;

  const intl = useIntl();

  const { Select: SelectQuantity } = useSelectInventoryQuantity(
    item,
    // On change
    (quantity: number) => {
      if (updateQuantity) {
        updateQuantity(item, quantity);
      }
    }
  );

  const handleRemoveItem = () => {
    if (updateQuantity) {
      updateQuantity(item, 0, true);
    }
  };

  const itemHref = () => {
    let href = `${pages.productDetail.path}/${item.inventory.product.name.current}?id=${item.inventory.product.id}`;
    if (item.inventory.product.id === everfreshProductId) {
      href = `${pages.everfresh.path}`;
    } else if (item.inventory.product.id === bagProductId) {
      href = `${pages.bags.path}`;
    }
    return href;
  };

  return (
    <>
      <Grid container spacing={2}>

        <Grid item xs={4} sm={3} md={2}>
          <Link href={itemHref()} noLinkStyle>
            <div>
              <Image
                src={getProductImgUrl(item.inventory.product)}
                alt="Product image"
                layout="responsive"
                objectFit="cover"
                style={{ borderRadius: '10px' }}
                priority={priorityImg}
              />
            </div>
          </Link>
        </Grid>

        <Grid item xs={8} sm={9} md={10} container>

          <Grid item xs container direction="column" spacing={2}>

            <Grid item xs sx={item.quantity <= 0 ? { color: 'grey' } : undefined}>
              <Typography gutterBottom component="div" variant="body1">
                {item.inventory.product.name.current}
              </Typography>
              <Typography component="div" variant="body2">
                {item.inventory.name.current || ''}
              </Typography>
              { !updateQuantity &&
                <Typography component="div" variant="body2">
                  {`${intl.formatMessage({ id: 'forms.quantity' })}: ${item.quantity.toString()}`}
                </Typography>
              }
            </Grid>

            { updateQuantity &&
              <Grid item>
                <SelectQuantity />

                <Tooltip 
                  title={intl.formatMessage({ id: 'app.deleteBtn' })} 
                  placement='top'
                >
                  <IconButton 
                    onClick={handleRemoveItem}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>

                { item.quantity <= 0 &&
                  <Typography 
                    variant="body2" 
                    sx={
                      item.inventory.bigbuy.quantity <= 0 ? 
                        { color: 'grey' } : 
                        undefined
                    }
                  >
                    { item.inventory.bigbuy.quantity <= 0 ? 
                      intl.formatMessage({ id: 'cart.inventoryUnavailable' }) : 
                      intl.formatMessage({ id: 'cart.inventoryAvailable' })
                    }
                  </Typography>
                }
              </Grid>
            }

          </Grid>

          <Grid item>
            <Typography 
              component="div" 
              variant="body1" 
              sx={
                item.inventory.bigbuy.quantity <= 0 ? 
                  { color: 'grey', fontWeight: 500 } : 
                  { fontWeight: 500 }
              }
            >
              {`${(item.inventory.realPrice * item.quantity).toFixed(2)} €`}
            </Typography>
          </Grid>

        </Grid>

      </Grid>
    </>
  );
};

export default CartItemDetail;
