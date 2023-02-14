import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

import { useIntl, FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

import type { CartItem } from '@core/types/cart';
import type { OrderItem } from '@core/types/orders';
import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import { everfreshProductId, bagsProductId } from '@lib/constants/products';
import { getProductImgUrl } from '@lib/utils/products';
import useSelectInventoryQuantity from '@lib/hooks/useSelectInventoryQuantity';
import placeholder from 'public/images/placeholder.jpeg';

type CartItemDetailProps = {
  item: CartItem | OrderItem,
  updateQuantity?: (cartItem: CartItem, quantity: number, forceUpdate?: boolean) => void,
  priorityImg?: boolean,
};

const CartItemDetail = (props: CartItemDetailProps) => {
  const { item, updateQuantity, priorityImg } = props;

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

  const [availableItemQuantity, setAvailableItemQuantity] = useState(true);

  const handleRemoveItem = () => {
    if (updateQuantity) {
      updateQuantity(item as CartItem, 0, true);
    }
  };

  const itemHref = () => {
    let href = `${pages.productDetail.path}/${item.inventory?.product.name.current}?id=${item.inventory?.product.id}`;
    if (item.inventory?.product.id === everfreshProductId) {
      href = `${pages.everfresh.path}`;
    } else if (item.inventory?.product.id === bagsProductId) {
      href = `${pages.bags.path}`;
    }
    return href;
  };

  const checkAvailableItemQuantity = useCallback(() => {
    if ((item as CartItem)?.cartId) {
      if (item.inventory && item.inventory.quantity <= 0) {
        setAvailableItemQuantity(false);
        return;
      }
    } else if ((item as OrderItem)?.name) {
      if (item.quantity <= 0) {
        setAvailableItemQuantity(false);
        return;
      }
    }
    setAvailableItemQuantity(true);
  }, [item])

  useEffect(() => {
    checkAvailableItemQuantity();
  }, [checkAvailableItemQuantity]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={3} md={2}>
          { item.inventory ?
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
            :
            <>
              <div>
                <Image
                  src={placeholder}
                  alt="Product image"
                  layout="responsive"
                  objectFit="cover"
                  style={{ borderRadius: '10px' }}
                  priority={priorityImg}
                />
              </div>
              <Typography component="div" variant="body1">
                <FormattedMessage 
                  id="orderDetail.noProductReference" 
                />
              </Typography>
            </>
          }
        </Grid>

        <Grid item xs={8} sm={9} md={10} container>

          <Grid item xs container direction="column" spacing={2}>

            <Grid item xs sx={item.quantity <= 0 ? { color: 'grey' } : undefined}>
              <Typography gutterBottom component="div" variant="body1">
                {item.inventory?.product.name.current || (item as OrderItem)?.name}
              </Typography>
              <Typography component="div" variant="body2">
                {item.inventory?.name.current || ''}
              </Typography>
              { !updateQuantity &&
                <Typography component="div" variant="body2">
                  {`${intl.formatMessage({ id: 'forms.quantity' })}: ${item.quantity.toString()}`}
                </Typography>
              }
              { (item as OrderItem)?.reference &&
                <Typography component="div" variant="body2">
                  {`${intl.formatMessage({ id: "forms.sku" })}: ${(item as OrderItem).reference}`}
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
                    mt="5px"
                    color={!availableItemQuantity ? { color: 'grey' } : undefined}
                  >
                    { !availableItemQuantity ? 
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
              color={!availableItemQuantity ? { color: 'grey' } : undefined}
              fontWeight={500}
            >
              { item.inventory ? `${(item.inventory?.realPrice * item.quantity).toFixed(2)} €` : undefined }
            </Typography>
          </Grid>

        </Grid>

      </Grid>
    </>
  );
};

export default CartItemDetail;
