import { useState, useEffect, useCallback, Fragment } from 'react';
import Image from 'next/image';

import { useIntl, FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

import type { CartItem, GuestCartCheckItem } from '@core/types/cart';
import { itemTotalPriceString, availableItemQuantity } from '@core/utils/cart';
import Link from '@core/components/Link';

import { useProductsContext } from '@lib/contexts/ProductsContext';
import useSelectInventoryQuantity from '@lib/hooks/useSelectInventoryQuantity';

type CartItemDetailProps = {
  item: CartItem | GuestCartCheckItem,
  updateQuantity?: (cartItem: CartItem, quantity: number, forceUpdate?: boolean) => void,
  priorityImg?: boolean,
};

const CartItemDetail = (props: CartItemDetailProps) => {
  const { item, updateQuantity, priorityImg } = props;

  const { getProductPageUrl, getProductImgUrl } = useProductsContext();

  const intl = useIntl();
  const { Select: SelectQuantity } = useSelectInventoryQuantity(
    item as CartItem,
    // On change
    (quantity: number) => {
      if (updateQuantity) {
        updateQuantity(item as CartItem, quantity);
      }
    }
  );

  const [availableQuantity, setAvailableQuantity] = useState(true);

  const handleRemoveItem = () => {
    if (updateQuantity) {
      updateQuantity(item as CartItem, 0, true);
    }
  };

  const checkAvailableQuantity = useCallback(() => {
    if ((item as CartItem)?.cartId) {
      setAvailableQuantity(availableItemQuantity(item));
      return;
    } else if ((item as GuestCartCheckItem)?.quantity) {
      if (item.quantity <= 0) {
        setAvailableQuantity(false);
        return;
      }
      setAvailableQuantity(true);
    }
  }, [item])

  useEffect(() => {
    checkAvailableQuantity();
  }, [checkAvailableQuantity]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={3} md={2}>
            <Link href={getProductPageUrl(item)} noLinkStyle>
              <div>
                <Image
                  src={getProductImgUrl(item)}
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
            <Grid item xs sx={item.quantity <= 0 || (!item.inventory && !item.pack) ? { color: 'text.disabled' } : undefined}>
              { (item.inventory || item.pack) ?
                <>
                  <Typography gutterBottom component="div" variant="body1">
                    {item.inventory?.product.name.current || item.pack?.name.current}
                  </Typography>
                  { item.inventory ?
                    <Box>
                      <Typography component="div" variant="body2">
                        {item.inventory.name.current}
                      </Typography>
                      <Typography component="div" variant="body2">
                      {`${intl.formatMessage({ id: 'forms.sku' })}: ${item.inventory.sku}`}
                      </Typography>
                    </Box>
                    :
                    <Box>
                      { item.pack?.inventories.map((item, index) => (
                        <Fragment key={index}>
                          <Typography component="div" variant="body2">
                            {item.product.name.current}
                          </Typography>
                          <Box ml={1}>
                            <Typography component="div" variant="body2">
                              {item.name.current}
                            </Typography>
                            <Typography component="div" variant="body2">
                            {`${intl.formatMessage({ id: 'forms.sku' })}: ${item.sku}`}
                            </Typography>
                          </Box>
                        </Fragment>
                      ))}
                    </Box>
                  }
                </>
                :
                <Typography component="div" variant="body1">
                  <FormattedMessage 
                    id="orderDetail.noProductReference" 
                  />
                </Typography>
              }
              { !updateQuantity &&
                <Box>
                  <Typography component="div" variant="body2">
                    {`${intl.formatMessage({ id: 'forms.quantity' })}: ${item.quantity.toString()}`}
                  </Typography>
                </Box>
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
                { ((item.inventory || item.pack) && item.quantity <= 0) &&
                  <Typography 
                    variant="body2"
                    mt="5px"
                    color={!availableQuantity ? { color: 'text.disabled' } : undefined}
                  >
                    { !availableQuantity ? 
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
              color={!availableQuantity ? { color: 'text.disabled' } : undefined}
              fontWeight={500}
            >
              { itemTotalPriceString(item) }
            </Typography>
          </Grid>
        </Grid> 
      </Grid>
    </>
  );
};

export default CartItemDetail;
