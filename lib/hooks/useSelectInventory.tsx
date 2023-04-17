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
  } = useProductsContext();

  const router = useRouter();
  const intl = useIntl();

  const [loaded, setLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProductInventory | undefined>(undefined);

  const handleSelectChange = useCallback((event: SelectChangeEvent) => {
    const itemName = event.target.value as string;
    const inventory = product.inventories?.find(item => item.name.current === itemName);
    setSelectedItem(inventory);
  }, [product.inventories]);

  const getItemText = useCallback((item: ProductInventory, index: number) => {
    if (isBagsProduct(product)) {
      return intl.formatMessage({ id: `forms.selectInventory.bags.${index + 1}` });
    }
    return intl.formatMessage({ id: 'forms.selectInventory.content' }, { name: item.name.current });
  }, [intl, isBagsProduct, product]);

  useEffect(() => {
    if (!loaded) {
      if (!product.inventories || product.inventories.length <= 0) {
        return;
      }
      if (!initItem) {
        setSelectedItem(product.inventories[0]);
      } else if (initItem.productId != product.id) {
        return;
      } else {
        console.log(product.inventories)
        setSelectedItem(initItem);
      }
      setLoaded(true);
    }
  }, [initItem, loaded, product.id, product.inventories, router.asPath]);

  const Select = (props: { label?: boolean }) => {
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
          { product.inventories?.map((item, index) => (
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
  };

  return {
    Select,
    selectedInventory: selectedItem,
  };
};

export default useSelectInventory;
