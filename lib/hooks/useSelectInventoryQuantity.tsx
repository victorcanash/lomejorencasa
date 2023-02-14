import { useState, useMemo, useEffect } from 'react';

import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { rangeChangeItemQuantity } from '@core/constants/cart';
import type { ProductInventory } from '@core/types/products';
import type { CartItem } from '@core/types/cart';

const useSelectInventoryQuantity = (
  item: ProductInventory | CartItem | undefined, 
  onChange?: (quantity: number) => void,
) => {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(item?.quantity && item.quantity > 0 ? 1 : 0);

  const currentInventory = useMemo(() => {
    if (!item) {
      return item
    } else if ((item as CartItem)?.inventory) {
      return (item as CartItem).inventory;
    }
    return item as ProductInventory;
  }, [item]);

  const currentQuantity = useMemo(() => {
    if ((item as CartItem)?.inventory) {
      return (item as CartItem).quantity;
    }
    return selectedQuantity;
  }, [item, selectedQuantity]);

  const menuItems = useMemo(() => {
    const menuItems = [] as JSX.Element[];
    const menuItemsValues = [] as number[];
    const quantity = currentQuantity;
    const inventoryQuantity = currentInventory?.quantity || 0;
    let maxBigbuyQuantity = quantity + rangeChangeItemQuantity;
    if (maxBigbuyQuantity > inventoryQuantity) {
      maxBigbuyQuantity = inventoryQuantity;
    }
    let minBigbuyQuantity = quantity - rangeChangeItemQuantity;
    if (minBigbuyQuantity < 0) {
      minBigbuyQuantity = 0;
    }

    if (quantity == 0) {
      menuItemsValues.push(0);
    }
    if (inventoryQuantity > 0) {
      if (minBigbuyQuantity > 2) {
        menuItemsValues.push(1);
        menuItemsValues.push(2);
      }
      for (let i = minBigbuyQuantity; i < maxBigbuyQuantity; i++) {
        menuItemsValues.push(i + 1);
      }
    }

    for (let i = 0; i < menuItemsValues.length; i++) {
      menuItems.push(
        <MenuItem key={menuItemsValues[i]} value={menuItemsValues[i]}>
          {menuItemsValues[i]}
        </MenuItem>
      );
    }
    return menuItems;
  }, [currentInventory?.quantity, currentQuantity]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const quantity = parseInt(event.target.value);
    setSelectedQuantity(quantity);
    if (onChange) {
      onChange(quantity);
    }
  };

  useEffect(() => {
    if (item?.quantity && item.quantity > 0) {
      setSelectedQuantity(1);
    } else {
      setSelectedQuantity(0);
    }
  }, [item?.quantity]);

  const Select = () => {
    return (
      <>
        { item &&
          <MuiSelect
            id="inventory-quantity-select"
            value={currentQuantity.toString()}
            onChange={handleSelectChange}
            disabled={!currentInventory || currentInventory.quantity <= 0}
          >
            { menuItems }
          </MuiSelect>
        }
      </>
    );
  };

  return {
    Select,
    selectedQuantity: currentQuantity,
  };
};

export default useSelectInventoryQuantity;
