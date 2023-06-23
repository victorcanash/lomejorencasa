import { Dispatch, SetStateAction, useEffect, useCallback } from 'react';

import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import type { FormatText } from '@core/types/texts';
import type { Landing, ProductInventory, ProductPack } from '@core/types/products';
import { convertElementToSx } from '@core/utils/themes';

import { themeCustomElements } from '@lib/config/theme/elements';

type SelectItemProps = {
  landing: Landing,
  items: (ProductInventory | ProductPack)[],
  selectInputLabel?: FormatText,
  initItem?: ProductInventory | ProductPack,
  selectedItem: ProductInventory | ProductPack | undefined,
  setSelectedItem: Dispatch<SetStateAction<ProductInventory | ProductPack | undefined>>
};

const SelectItem = (props: SelectItemProps) => {
  const {
    landing,
    items,
    selectInputLabel,
    initItem,
    selectedItem,
    setSelectedItem,
  } = props;

  const handleSelectChange = useCallback((event: SelectChangeEvent) => {
    const itemName = event.target.value as string;
    const item = items.find(item => item.name.current === itemName);
    setSelectedItem(item);
  }, [items, setSelectedItem]);

  const enabled = useCallback((itemCheck: ProductInventory | ProductPack) => {
    if ((itemCheck as ProductInventory)?.product?.landingId === landing.id) {
      return true;
    } else if ((itemCheck as ProductPack)?.landingId === landing.id) {
      return true;
    }
    return false;
  }, [landing]);

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
                ...themeCustomElements.landingDetail?.selectLabel ? convertElementToSx(themeCustomElements.landingDetail.selectLabel) : undefined,
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
                { item.description.current }
              </MenuItem>
            ))}
          </Select>
        </Box>
      }
    </>
  );
};

export default SelectItem;
