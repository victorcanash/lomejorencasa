import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';

import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import type { Product, ProductInventory, ProductPack } from '@core/types/products';

import { useProductsContext } from '@lib/contexts/ProductsContext';

const useSelectInventory = (product: Product, initItem?: ProductInventory | ProductPack) => {
  const { getProductPacks } = useProductsContext();
  
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProductInventory | ProductPack | undefined>(undefined);
  const [packs, _setPacks] = useState<ProductPack[]>(getProductPacks(product))

  const handleSelectChange = useCallback((event: SelectChangeEvent) => {
    const itemName = event.target.value as string;
    const inventory = product.inventories?.find(item => item.name.current === itemName);
    let pack: ProductPack | undefined;
    if (!inventory) {
      pack = packs.find(item => item.name.current === itemName);
    }
    if (inventory || pack) {
      setSelectedItem(inventory ? inventory : pack);
    }
  }, [packs, product.inventories]);

  useEffect(() => {
    if (!loaded) {
      if (!product.inventories || product.inventories.length <= 0) {
        return;
      }
      if (!initItem) {
        setSelectedItem(product.inventories[0]);
      } else {
        if ((initItem as ProductInventory)?.sku && 
            (initItem as ProductInventory).productId != product.id) {
          return;
        }
        setSelectedItem(initItem);
      }
      setLoaded(true);
    }
  }, [initItem, loaded, product.id, product.inventories, router.asPath]);

  const Select = () => {
    return(
      <>
        <MuiSelect
          id="inventory-select"
          value={selectedItem?.name.current || ''}
          onChange={handleSelectChange}
          sx={{
            position: 'relative',
            width: {
              xs: '80vw',
              xs_sm: '300px',
            },
            maxWidth: {
              xs: '230px',
              xs_sm: '300px',
            },
          }}
        >
          { product.inventories?.map((item) => (
            <MenuItem key={item.id} value={item.name.current}>
              <FormattedMessage
                id="forms.selectInventory.content"
                values={{
                  name: item.name.current,
                }}
              />
            </MenuItem>
          ))}
          { packs.map((item) => (
            <MenuItem key={item.id} value={item.name.current}>
              <FormattedMessage
                id="forms.selectInventory.content"
                values={{
                  name: item.name.current,
                }}
              />
            </MenuItem>
          ))}
        </MuiSelect>
      </>
    );
  };

  return {
    Select,
    selectedInventory: selectedItem,
  };
};

export default useSelectInventory;
