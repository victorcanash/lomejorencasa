import { useMemo } from 'react';
import Image from 'next/image';

import { useIntl } from 'react-intl';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';

import { pages } from '@core/config/navigation.config';
import { rangeChangeItemQuantity } from '@core/constants/cart';
import type { CartItem } from '@core/types/cart';
import { getProductImgUrl } from '@core/utils/products';
import Link from '@core/components/Link';

type CartItemDetailProps = {
  item: CartItem,
  updateQuantity?: (cartItem: CartItem, quantity: number, forceUpdate?: boolean) => void,
};

const CartItemDetail = (props: CartItemDetailProps) => {
  const { item, updateQuantity } = props;

  const intl = useIntl();

  const handleRemoveItem = () => {
    if (updateQuantity) {
      updateQuantity(item, 0, true);
    }
  };

  const handleSelectQuantity = (event: SelectChangeEvent) => {
    if (updateQuantity) {
      const quantity = parseInt(event.target.value);
      updateQuantity(item, quantity);
    }
  };

  const menuItems = useMemo(() => {
    const menuItems = [] as JSX.Element[];
    const menuItemsValues = [] as number[];
    const bigbuyQuantity = item.inventory.bigbuy.quantity;
    let maxBigbuyQuantity = item.quantity + rangeChangeItemQuantity;
    if (maxBigbuyQuantity > bigbuyQuantity) {
      maxBigbuyQuantity = bigbuyQuantity;
    }
    let minBigbuyQuantity = item.quantity - rangeChangeItemQuantity;
    if (minBigbuyQuantity < 0) {
      minBigbuyQuantity = 0;
    }

    if (item.quantity == 0) {
      menuItemsValues.push(0);
    }
    if (bigbuyQuantity > 0) {
      if (minBigbuyQuantity > 2) {
        menuItemsValues.push(1);
        menuItemsValues.push(2);
      }
      for (let i = minBigbuyQuantity; i < maxBigbuyQuantity; i++) {
        menuItemsValues.push(i + 1);
      }
    } else if (item.quantity != 0){
      menuItemsValues.push(item.quantity);
    }

    for (let i = 0; i < menuItemsValues.length; i++) {
      menuItems.push(
        <MenuItem key={menuItemsValues[i]} value={menuItemsValues[i]}>
          {menuItemsValues[i]}
        </MenuItem>
      );
    }
    return menuItems;
  }, [item.inventory.bigbuy.quantity, item.quantity]);

  return (
    <>
      <Grid container spacing={2}>

        <Grid item>
          <Link href={`${pages.productDetail.path}/${item.inventory.product.name.current}?id=${item.inventory.product.id}`} noLinkStyle>
            <div style={{ position: 'relative', minWidth: '100px' }}>
              <Image
                src={getProductImgUrl(item.inventory.product)}
                alt="Product image"
                width="500"
                height="500"
                layout="responsive"
                objectFit="cover"
              />
            </div>
          </Link>
        </Grid>

        <Grid item xs={12} sm container>

          <Grid item xs container direction="column" spacing={2}>

            <Grid item xs style={item.quantity <= 0 ? {color: 'grey'} : undefined}>
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
                <Select
                  id="quantity-select"
                  value={item.quantity.toString()}
                  onChange={handleSelectQuantity}
                  disabled={item.inventory.bigbuy.quantity <= 0}
                >
                  {menuItems}
                </Select>

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
                  <Typography variant="body2" style={item.inventory.bigbuy.quantity <= 0 ? {color: 'grey'} : undefined}>
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
            <Typography component="div" variant="body1" style={item.quantity <= 0 ? {color: 'grey'} : undefined}>
              {(item.inventory.realPrice * item.quantity).toFixed(2)} €
            </Typography>
          </Grid>

        </Grid>

      </Grid>
    </>
  );
};

export default CartItemDetail;
