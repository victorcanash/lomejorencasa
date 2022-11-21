import Image from 'next/image';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';

import { pages } from '@core/config/navigation.config';
import { CartItem } from '@core/types/cart';
import { getProductImgUrl } from '@core/utils/products';
import Link from '@core/components/Link';

type CartItemDetailProps = {
  item: CartItem,
  updateQuantity?: (cartItem: CartItem, quantity: number, forceUpdate?: boolean) => void,
};

const CartItemDetail = (props: CartItemDetailProps) => {
  const { item, updateQuantity } = props;

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

  const getMenuItems = () => {
    const menuItems = [];
    if (item.quantity == 0) {
      menuItems.push(
        <MenuItem key={0} value={0}>
          {0}
        </MenuItem>
      );
    }
    if (item.inventory.bigbuy.quantity > 0) {
      for (let i = 0; i < item.inventory.bigbuy.quantity; i++) {
        menuItems.push(
          <MenuItem key={i+1} value={i+1}>
            {i+1}
          </MenuItem>
        );
      }
    } else if (item.quantity != 0){
      menuItems.push(
        <MenuItem key={item.quantity} value={item.quantity}>
          {item.quantity}
        </MenuItem>
      );
    }
    return menuItems;
  }

  return (
    <>
      <Grid container spacing={2}>

        <Grid
          item
        >
          <Link href={`${pages.productDetail.path}/${item.product.name}?id=${item.product.id}`} noLinkStyle>
            <div style={{ position: 'relative', minWidth: '100px' }}>
              <Image
                src={getProductImgUrl(item.product)}
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
              <Typography gutterBottom variant="subtitle1" component="div">
                {item.product.name}
              </Typography>
              <Typography variant="body2">
                {item.inventory.name || ''}
              </Typography>
              { !updateQuantity &&
                <Typography variant="body2">
                  Quantity: {item.quantity.toString()}
                </Typography>
              }
            </Grid>

            { updateQuantity &&
              <Grid item>
                <Select
                  labelId="quantity-select-label"
                  id="quantity-select"
                  value={item.quantity.toString()}
                  label="Quantity"
                  onChange={handleSelectQuantity}
                  disabled={item.inventory.bigbuy.quantity <= 0}
                >
                  {getMenuItems()}
                </Select>

                <Tooltip title='Delete' placement='top'>
                  <IconButton 
                    onClick={handleRemoveItem}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>

                { item.quantity <= 0 &&
                  <Typography variant="body2" style={item.inventory.bigbuy.quantity <= 0 ? {color: 'grey'} : undefined}>
                    { item.inventory.bigbuy.quantity <= 0 ? 'Inventory not available right now.' : 'Inventory available right now.' }
                  </Typography>
                }
              </Grid>
            }

          </Grid>

          <Grid item>
            <Typography variant="subtitle1" component="div" style={item.quantity <= 0 ? {color: 'grey'} : undefined}>
              {(item.inventory.realPrice * item.quantity).toFixed(2)} €
            </Typography>
          </Grid>

        </Grid>

      </Grid>
    </>
  );
};

export default CartItemDetail;
