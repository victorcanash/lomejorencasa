import { useState, useEffect, useCallback } from 'react';

import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { rangeChangeItemQuantity } from '@core/constants/cart';
import type { ProductInventory } from '@core/types/products';
import type { CartItem } from '@core/types/cart';

const useSelectInventoryQuantity = (
  item: ProductInventory | CartItem | undefined, 
  onChange?: (quantity: number) => void,
) => {
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [menuItems, setMenuItems] = useState<JSX.Element[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [prevItem, setPrevItem] = useState<ProductInventory | undefined>(undefined);

  const currentInventory = useCallback(() => {
    if ((item as ProductInventory)?.sku) {
      return item as ProductInventory;
    } else if ((item as CartItem)?.inventory) {
      return (item as CartItem).inventory;
    }
    return undefined;
  }, [item]);

  const checkMenuItems = useCallback((newQuantity: number) => {
    const newMenuItems = [] as JSX.Element[];
    const menuItemsValues = [] as number[];
    const inventoryQuantity = currentInventory()?.quantity || 0;
    let maxBigbuyQuantity = newQuantity + rangeChangeItemQuantity;
    if (maxBigbuyQuantity > inventoryQuantity) {
      maxBigbuyQuantity = inventoryQuantity;
    }
    let minBigbuyQuantity = newQuantity - rangeChangeItemQuantity;
    if (minBigbuyQuantity < 0) {
      minBigbuyQuantity = 0;
    }

    if (newQuantity == 0) {
      menuItemsValues.push(0);
    }
    if (inventoryQuantity > 0) {
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
  }, [currentInventory]);

  const disabled = () => {
    const inventory = currentInventory();
    if (!inventory || inventory.quantity <= 0) {
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
      if ((item as ProductInventory)?.sku) {
        if (item?.quantity && item.quantity > 0) {
          quantity = 1;
        } else {
          quantity = 0;
        }
      }
      setSelectedQuantity(quantity);
      setMenuItems(checkMenuItems(quantity));
      setLoaded(true);
    } else if ((item as ProductInventory)?.sku) {
      if ((item as ProductInventory).sku !== prevItem?.sku){
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
