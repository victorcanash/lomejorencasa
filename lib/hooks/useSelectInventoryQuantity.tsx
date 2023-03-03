import { useState, useEffect, useCallback } from 'react';

import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { rangeChangeItemQuantity } from '@core/constants/cart';
import type { ProductInventory, ProductPack } from '@core/types/products';
import type { CartItem } from '@core/types/cart';

const useSelectInventoryQuantity = (
  item: ProductInventory | ProductPack | CartItem | undefined, 
  onChange?: (quantity: number) => void,
) => {
  const [selectedQuantity, setSelectedQuantity] = useState(0);
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
    const itemQuantity = currentItem()?.quantity || 0;
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

    for (let i = 0; i < menuItemsValues.length; i++) {
      newMenuItems.push(
        <MenuItem key={menuItemsValues[i]} value={menuItemsValues[i]}>
          {menuItemsValues[i]}
        </MenuItem>
      );
    }
    return newMenuItems;
  }, [currentItem]);

  const disabled = () => {
    const cItem = currentItem();
    if (!cItem || cItem.quantity <= 0) {
      return true;
    }
    return false;
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const quantity = parseInt(event.target.value);
    setSelectedQuantity(quantity);
    setMenuItems(checkMenuItems(quantity));
    if (onChange) {
      onChange(quantity);
    }
  };

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
  }, [checkMenuItems, item, item?.quantity, loaded, prevItem]);

  const Select = () => {
    return (
      <>
        { loaded && item &&
          <MuiSelect
            id="inventory-quantity-select"
            value={selectedQuantity.toString()}
            onChange={handleSelectChange}
            disabled={disabled()}
          >
            { menuItems }
          </MuiSelect>
        }
      </>
    );
  };

  return {
    Select,
    selectedQuantity,
    loaded,
  };
};

export default useSelectInventoryQuantity;
