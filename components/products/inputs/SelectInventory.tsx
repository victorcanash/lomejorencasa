import { Dispatch, SetStateAction, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';

import { FormattedMessage, useIntl } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import type { Product, ProductInventory } from '@core/types/products';
import { convertElementToSx } from '@core/utils/themes';

import { themeCustomElements } from '@lib/constants/themes/elements';
import { useProductsContext } from '@lib/contexts/ProductsContext';

type SelectInventoryProps = {
  product: Product,
  initItem?: ProductInventory,
  selectedInventory: ProductInventory | undefined,
  setSelectedInventory: Dispatch<SetStateAction<ProductInventory | undefined>>
};

const SelectInventory = (props: SelectInventoryProps) => {
  const {
    product,
    initItem,
    selectedInventory,
    setSelectedInventory,
  } = props;

  const {
    isBagsProduct,
    getProductInventories,
  } = useProductsContext();

  const router = useRouter();
  const intl = useIntl();

  const items = useMemo(() => {
    return getProductInventories(product);
  }, [getProductInventories, product]);

  const handleSelectChange = useCallback((event: SelectChangeEvent) => {
    const itemName = event.target.value as string;
    const inventory = items.find(item => item.name.current === itemName);
    setSelectedInventory(inventory);
  }, [items, setSelectedInventory]);

  const getItemText = useCallback((item: ProductInventory, index: number) => {
    if (isBagsProduct(product)) {
      return intl.formatMessage({ id: `forms.selectInventory.bags.${index + 1}` });
    }
    return intl.formatMessage({ id: 'forms.selectInventory.content' }, { name: item.name.current });
  }, [intl, isBagsProduct, product]);

  useEffect(() => {
    if (items.length <= 0) {
      return;
    }
    if (!initItem) {
      setSelectedInventory(items[0]);
    } else if (initItem.productId != product.id) {
      return;
    } else {
      setSelectedInventory(initItem);
    }
  }, [items, initItem, product, product.id, router.asPath, setSelectedInventory]);

  return (
    <>
      { (items.length > 1 && selectedInventory?.productId === product.id) &&
        <Box>
          <Typography
            component="div"
            variant="h3"
            sx={convertElementToSx(themeCustomElements.landing.quantityLabel)}
            mb={1}
          >
            <FormattedMessage id="forms.size" />
          </Typography>
          <Select
            id="select-inventory"
            value={selectedInventory?.name.current || ''}
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
            { items.map((item, index) => (
              <MenuItem
                key={index}
                value={item.name.current}
              >
                { getItemText(item, index) }
              </MenuItem>
            ))}
          </Select>
        </Box>
      }
    </>
  );
};

export default SelectInventory;
