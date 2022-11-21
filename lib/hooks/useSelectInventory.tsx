import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { Product, ProductInventory } from "@core/types/products";

const useSelectInventory = (product: Product) => {
  const router = useRouter();

  const [selectedInventory, setSelectedInventory] = useState<ProductInventory | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    handleSelectChange(event.target.value as string);
  };

  useEffect(() => {
    if (!loaded) {
      if (product.inventories.length > 0) {
        setSelectedInventory(product.inventories[0]);
      } 
      setLoaded(true);
    }
  }, [loaded, product.inventories, router.asPath]);

  const handleSelectChange = (name: string) => {
    setSelectedInventory(product.inventories.find(item => item.name === name));
  };

  const Select = () => {
    if (loaded) {
      return(
        <MuiSelect
          labelId="inventory-select-label"
          id="inventory-select"
          value={selectedInventory?.name || ''}
          label="Size"
          onChange={handleChange}
        >
          { product.inventories.map((item) => (
            <MenuItem key={item.id} value={item.name || ''}>
              {`${item.name || ''} (${item.bigbuy.quantity} left)`}
            </MenuItem>
          ))}
        </MuiSelect>
      );
    } else {
      return (<></>)
    }
  };

  return {
    Select,
    selectedInventory,
    loaded,
  };
};

export default useSelectInventory;
