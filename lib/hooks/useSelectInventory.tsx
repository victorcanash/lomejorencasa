import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { FormattedMessage, useIntl } from 'react-intl';

import InputLabel from '@mui/material/InputLabel';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import type { Product, ProductInventory } from '@core/types/products';

const useSelectInventory = (product: Product, initInventory?: ProductInventory) => {
  const router = useRouter();
  const intl = useIntl();

  const [selectedInventory, setSelectedInventory] = useState<ProductInventory | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      if (product.inventories.length <= 0) {
        return;
      }
      if (!initInventory) {
        setSelectedInventory(product.inventories[0]);
      } else {
        if (initInventory.productId != product.id) {
          return;
        }
        setSelectedInventory(initInventory);
      }
      setLoaded(true);
    }
  }, [initInventory, loaded, product.id, product.inventories, router.asPath]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedInventory(product.inventories.find(item => item.name.current === event.target.value as string));
  };

  const Select = () => {
    return(
      <>
        { loaded &&
          <>
            <InputLabel id="inventory-select-label">
              <FormattedMessage id="forms.selectInventory.label" />
            </InputLabel>
            <MuiSelect
              id="inventory-select"
              labelId="inventory-select-label"
              label={intl.formatMessage({ id: 'forms.selectInventory.label' })}
              value={selectedInventory?.name.current || ''}
              onChange={handleSelectChange}
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
        }
      </>
    );
  };

  return {
    Select,
    selectedInventory,
    loaded,
  };
};

export default useSelectInventory;
