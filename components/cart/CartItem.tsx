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

type CartItemProps = {
  item: CartItem,
  updateQuantity: (cartItem: CartItem, quantity: number) => void,
};

const CartItem = (props: CartItemProps) => {
  const { item, updateQuantity } = props;

  const handleRemoveItem = () => {
    updateQuantity(item, 0);
  };

  const handleSelectQuantity = (event: SelectChangeEvent) => {
    const quantity = parseInt(event.target.value);
    updateQuantity(item, quantity);
  };

  const getMenuItems = () => {
    const menuItems = [];
    for (let i = 0; i < item.inventory.quantity; i++) {
      menuItems.push(
        <MenuItem key={i+1} value={i+1}>
          {i+1}
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

            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {item.product.name}
              </Typography>
              <Typography variant="body2">
                Size: {item.inventory.size || 'Unique'}
              </Typography>
            </Grid>

            <Grid item>
              <Select
                labelId="quantity-select-label"
                id="quantity-select"
                value={item.quantity.toString()}
                label="Quantity"
                onChange={handleSelectQuantity}
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
            </Grid>

          </Grid>

          <Grid item>
            <Typography variant="subtitle1" component="div">
              {(item.product.realPrice * item.quantity).toFixed(2)} €
            </Typography>
          </Grid>

        </Grid>

      </Grid>
    </>
  );
};

export default CartItem;
