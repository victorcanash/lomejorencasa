import { useState, useMemo } from 'react';

import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { rangeChangeItemQuantity } from '@core/constants/cart';
import type { ProductInventory } from '@core/types/products';
import type { CartItem } from '@core/types/cart';

const useSelectInventoryQuantity = (
  item: ProductInventory | CartItem | undefined, 
  onChange?: (quantity: number) => void,
) => {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const currentInventory = useMemo(() => {
    if ((item as CartItem)?.inventory) {
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
    if (!item) {
      return [];
    }
    const menuItems = [] as JSX.Element[];
    const menuItemsValues = [] as number[];
    const currentQuantity = currentInventory.quantity;
    let maxBigbuyQuantity = currentQuantity + rangeChangeItemQuantity;
    if (maxBigbuyQuantity > currentQuantity) {
      maxBigbuyQuantity = currentQuantity;
    }
    let minBigbuyQuantity = currentQuantity - rangeChangeItemQuantity;
    if (minBigbuyQuantity < 0) {
      minBigbuyQuantity = 0;
    }

    if (currentQuantity == 0) {
      menuItemsValues.push(0);
    }
    if (currentQuantity > 0) {
      if (minBigbuyQuantity > 2) {
        menuItemsValues.push(1);
        menuItemsValues.push(2);
      }
      for (let i = minBigbuyQuantity; i < maxBigbuyQuantity; i++) {
        menuItemsValues.push(i + 1);
      }
    } else if (currentQuantity != 0){
      menuItemsValues.push(currentQuantity);
    }

    for (let i = 0; i < menuItemsValues.length; i++) {
      menuItems.push(
        <MenuItem key={menuItemsValues[i]} value={menuItemsValues[i]}>
          {menuItemsValues[i]}
        </MenuItem>
      );
    }
    return menuItems;
  }, [currentInventory.quantity, item]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const quantity = parseInt(event.target.value);
    setSelectedQuantity(quantity);
    if (onChange) {
      onChange(quantity);
    }
  };

  const Select = () => {
    return (
      <>
        { item &&
          <MuiSelect
            id="inventory-quantity-select"
            value={currentQuantity.toString()}
            onChange={handleSelectChange}
            disabled={currentInventory.quantity <= 0}
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
