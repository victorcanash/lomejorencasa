import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import { FormattedMessage, useIntl } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import type { Product, ProductInventory } from '@core/types/products';
import { convertElementToSx } from '@core/utils/themes';

import { themeCustomElements } from '@lib/constants/themes/elements';
import { useProductsContext } from '@lib/contexts/ProductsContext';

const useSelectInventory = (product: Product, initItem?: ProductInventory) => {
  const {
    isBagsProduct,
    getProductInventories,
  } = useProductsContext();

  const router = useRouter();
  const intl = useIntl();

  const [loaded, setLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProductInventory | undefined>(undefined);

  const handleSelectChange = useCallback((event: SelectChangeEvent) => {
    const itemName = event.target.value as string;
    const inventory = getProductInventories(product)?.find(item => item.name.current === itemName);
    setSelectedItem(inventory);
  }, [getProductInventories, product]);

  const getItemText = useCallback((item: ProductInventory, index: number) => {
    if (isBagsProduct(product)) {
      return intl.formatMessage({ id: `forms.selectInventory.bags.${index + 1}` });
    }
    return intl.formatMessage({ id: 'forms.selectInventory.content' }, { name: item.name.current });
  }, [intl, isBagsProduct, product]);

  useEffect(() => {
    if (!loaded) {
      if (getProductInventories(product).length <= 0) {
        return;
      }
      if (!initItem) {
        setSelectedItem(getProductInventories(product)[0]);
      } else if (initItem.productId != product.id) {
        return;
      } else {
        setSelectedItem(initItem);
      }
      setLoaded(true);
    }
  }, [getProductInventories, initItem, loaded, product, product.id, router.asPath]);

  const Select = useCallback((props: { label?: boolean }) => {
    const { label } = props;

    return(
      <Box>
        { label && 
          <Typography
            component="div"
            variant="h3"
            sx={convertElementToSx(themeCustomElements.landing.quantityLabel)}
            mb={1}
          >
            <FormattedMessage id="forms.size" />
          </Typography>
        }
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
          { getProductInventories(product).map((item, index) => (
            <MenuItem
              key={index}
              value={item.name.current}
            >
              { getItemText(item, index) }
            </MenuItem>
          ))}
        </MuiSelect>
      </Box>
    );
  }, [getItemText, getProductInventories, handleSelectChange, product, selectedItem?.name]);

  return {
    Select,
    selectedInventory: selectedItem,
  };
};

export default useSelectInventory;
