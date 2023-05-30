import { Dispatch, SetStateAction, useEffect, useCallback } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import type { FormatText } from '@core/types/texts';
import type { ProductInventory, ProductPack } from '@core/types/products';
import { convertElementToSx } from '@core/utils/themes';

import { themeCustomElements } from '@lib/constants/themes/elements';

type SelectItemProps = {
  landingId: number,
  items: (ProductInventory | ProductPack)[],
  selectInputLabel?: FormatText,
  selectInputContent?: FormatText,
  initItem?: ProductInventory | ProductPack,
  selectedItem: ProductInventory | ProductPack | undefined,
  setSelectedItem: Dispatch<SetStateAction<ProductInventory | ProductPack | undefined>>
};

const SelectItem = (props: SelectItemProps) => {
  const {
    landingId,
    items,
    selectInputLabel,
    selectInputContent,
    initItem,
    selectedItem,
    setSelectedItem,
  } = props;

  const intl = useIntl();

  const handleSelectChange = useCallback((event: SelectChangeEvent) => {
    const itemName = event.target.value as string;
    const item = items.find(item => item.name.current === itemName);
    setSelectedItem(item);
  }, [items, setSelectedItem]);

  const getItemText = useCallback((item: ProductInventory | ProductPack, index: number) => {
    if (selectInputContent?.id) {
      return intl.formatMessage({ id: `${selectInputContent.id}.${index + 1}` }, selectInputContent.values);
    }
    return item.name.current;
  }, [intl, selectInputContent?.id, selectInputContent?.values]);

  const enabled = useCallback((itemCheck: ProductInventory | ProductPack) => {
    if ((itemCheck as ProductInventory)?.product?.landingId === landingId) {
      return true;
    } else if ((itemCheck as ProductPack)?.landingId === landingId) {
      return true;
    }
    return false;
  }, [landingId]);

  useEffect(() => {
    if (items.length <= 0) {
      return;
    }
    if (!initItem) {
      setSelectedItem(items[0]);
    } else if (!enabled(initItem)) {
      return;
    } else {
      setSelectedItem(initItem);
    }
  }, [enabled, initItem, items, setSelectedItem]);

  return (
    <>
      { (items.length > 1 && selectedItem && enabled(selectedItem)) &&
        <Box>
          { selectInputLabel?.id &&
            <Typography
              component="div"
              variant="h3"
              sx={{
                ...themeCustomElements.landing?.selectLabel ? convertElementToSx(themeCustomElements.landing.selectLabel) : undefined,
              }}
              mb={1}
            >
              <FormattedMessage id={selectInputLabel.id} values={selectInputLabel.values} />
            </Typography>
          }
          <Select
            id="select-item"
            value={selectedItem?.name.current || ''}
            onChange={handleSelectChange}
            sx={{
              width: '180px',
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

export default SelectItem;
