import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { FormattedMessage, useIntl } from 'react-intl';

import InputLabel from '@mui/material/InputLabel';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { Product, ProductInventory } from "@core/types/products";

const useSelectInventory = (product: Product) => {
  const router = useRouter();
  const intl = useIntl();

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
    setSelectedInventory(product.inventories.find(item => item.name.current === name));
  };

  const Select = () => {
    if (loaded) {
      return(
        <>
          <InputLabel id="inventory-select-label">
            <FormattedMessage id="forms.selectInventory.label" />
          </InputLabel>
          <MuiSelect
            labelId="inventory-select-label"
            id="inventory-select"
            value={selectedInventory?.name.current || ''}
            label={intl.formatMessage({ id: 'forms.selectInventory.label' })}
            onChange={handleChange}
          >
            { product.inventories.map((item) => (
              <MenuItem key={item.id} value={item.name.current}>
                <FormattedMessage
                  id="forms.selectInventory.content"
                  values={{
                    name: item.name.current,
                    quantity: item.bigbuy.quantity,
                  }}
                />
              </MenuItem>
            ))}
          </MuiSelect>
        </>
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
