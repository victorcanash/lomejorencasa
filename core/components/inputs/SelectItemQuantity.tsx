import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';

import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { rangeChangeItemQuantity } from '@core/config/cart.config';
import type { ProductInventory, ProductPack } from '@core/types/products';
import type { CartItem } from '@core/types/cart';
import { convertElementToSx } from '@core/utils/themes';

import { themeCustomElements } from '@lib/config/theme/elements';

type SelectItemQuantityProps = {
  item: ProductInventory | ProductPack | CartItem | undefined,
  selectedQuantity: number,
  setSelectedQuantity: Dispatch<SetStateAction<number>>,
  label?: boolean,
  onChange?: (quantity: number) => void,
};

const SelectItemQuantity = (props: SelectItemQuantityProps) => {
  const {
    item,
    selectedQuantity,
    setSelectedQuantity,
    label,
    onChange,
  } = props;

  const [menuItems, setMenuItems] = useState<JSX.Element[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [prevItem, setPrevItem] = useState<ProductInventory | ProductPack | undefined>(undefined);
  
  const currentItem = useCallback(() => {
    if ((item as ProductInventory)?.sku) {
      return item as ProductInventory;
    } else if ((item as ProductPack)?.inventories) {
      return item as ProductPack;
    } else if ((item as CartItem)?.inventory) {
      return (item as CartItem).inventory;
    } else if ((item as CartItem)?.pack) {
      return (item as CartItem).pack;
    }
    return undefined;
  }, [item]);

  const checkMenuItems = useCallback((newQuantity: number) => {
    const newMenuItems = [] as JSX.Element[];
    const menuItemsValues = [] as number[];
    const cItem = currentItem();
    
    if (!cItem) {
      menuItemsValues.push(newQuantity);
    } else {
      const itemQuantity = cItem.quantity;
      let maxBigbuyQuantity = newQuantity + rangeChangeItemQuantity;
      if (maxBigbuyQuantity > itemQuantity) {
        maxBigbuyQuantity = itemQuantity;
      }
      let minBigbuyQuantity = newQuantity - rangeChangeItemQuantity;
      if (minBigbuyQuantity < 0) {
        minBigbuyQuantity = 0;
      }

      if (newQuantity == 0) {
        menuItemsValues.push(0);
      }
      if (itemQuantity > 0) {
        if (minBigbuyQuantity > 2) {
          menuItemsValues.push(1, 2);
        }
        for (let i = minBigbuyQuantity; i < maxBigbuyQuantity; i++) {
          menuItemsValues.push(i + 1);
        }
      }
    }

    for (let i = 0; i < menuItemsValues.length; i++) {
      newMenuItems.push(
        <MenuItem key={menuItemsValues[i]} value={menuItemsValues[i]}>
          {menuItemsValues[i]}
        </MenuItem>
      );
    }
    return newMenuItems;
  }, [currentItem]);

  const disabled = useCallback(() => {
    const cItem = currentItem();
    if (!cItem || cItem.quantity <= 0) {
      return true;
    }
    return false;
  }, [currentItem]);

  const handleSelectChange = useCallback((event: SelectChangeEvent) => {
    const quantity = parseInt(event.target.value);
    setSelectedQuantity(quantity);
    setMenuItems(checkMenuItems(quantity));
    if (onChange) {
      onChange(quantity);
    }
  }, [checkMenuItems, onChange, setSelectedQuantity]);

  useEffect(() => {
    if (!loaded) {
      let quantity = item?.quantity || 0;
      if ((item as ProductInventory)?.sku || (item as ProductPack)?.inventories) {
        if (item?.quantity && item.quantity > 0) {
          quantity = 1;
        } else {
          quantity = 0;
        }
      }
      setSelectedQuantity(quantity);
      setMenuItems(checkMenuItems(quantity));
      setLoaded(true);
    } else if ((item as ProductInventory)?.sku || (item as ProductPack)?.inventories) {
      if (((item as ProductInventory)?.sku !== (prevItem as ProductInventory)?.sku) ||
          ((item as ProductPack)?.inventories !== (prevItem as ProductPack)?.inventories)){
        let quantity = 0;
        if (item?.quantity && item.quantity > 0) {
          quantity = 1;
        }
        setSelectedQuantity(quantity);
        setMenuItems(checkMenuItems(quantity));
      }
    }
    if ((item as ProductInventory)?.sku) {
      setPrevItem(item as ProductInventory);
    } else if ((item as ProductPack)?.inventories) {
      setPrevItem(item as ProductPack);
    }
  }, [checkMenuItems, item, item?.quantity, loaded, prevItem, setSelectedQuantity]);

  return (
    <Box>
      { label &&
        <Typography
          component="div"
          variant="h3"
          sx={{
            ...themeCustomElements.landing?.selectLabel ? convertElementToSx(themeCustomElements.landing.selectLabel) : undefined,
          }}
          mb={1}
        >
          <FormattedMessage id="forms.quantity" />
        </Typography>
      }
      { loaded && item ?
        <MuiSelect
        id="select-inventory-quantity"
          value={selectedQuantity.toString()}
          onChange={handleSelectChange}
          disabled={disabled()}
          fullWidth
        >
          { menuItems }
        </MuiSelect>
        :
        <MuiSelect
          id="select-inventory-quantity"
          value="0"
          disabled={true}
          fullWidth
        >
          <MenuItem value="0">
            { 0 }
          </MenuItem>
        </MuiSelect>
      }
    </Box>
  );
};

export default SelectItemQuantity;
