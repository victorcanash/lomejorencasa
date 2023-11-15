import { type Dispatch, type SetStateAction, useEffect, useCallback } from 'react'

import { FormattedMessage } from 'react-intl'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import type { FormatText } from '@core/types/texts'
import type { Landing, ProductInventory, ProductPack } from '@core/types/products'
import { convertElementToSx } from '@core/utils/themes'
import { instanceOfProductInventory, instanceOfProductPack } from '@core/utils/products'

import { themeCustomElements } from '@lib/config/theme/elements'

interface SelectItemProps {
  landing: Landing
  items: Array<ProductInventory | ProductPack>
  selectInputLabel?: FormatText
  initItem?: ProductInventory | ProductPack
  selectedItem: ProductInventory | ProductPack | undefined
  setSelectedItem: Dispatch<SetStateAction<ProductInventory | ProductPack | undefined>>
}

const SelectItem = (props: SelectItemProps) => {
  const {
    landing,
    items,
    selectInputLabel,
    initItem,
    selectedItem,
    setSelectedItem
  } = props

  const handleSelectChange = useCallback((event: SelectChangeEvent) => {
    const itemName = event.target.value
    const item = items.find(item => item.name.current === itemName)
    setSelectedItem(item)
  }, [items, setSelectedItem])

  const enabled = useCallback((itemCheck: ProductInventory | ProductPack) => {
    if (instanceOfProductInventory(itemCheck) && itemCheck.product.landingId === landing.id) {
      return true
    } else if (instanceOfProductPack(itemCheck) && itemCheck.landingId === landing.id) {
      return true
    }
    return false
  }, [landing])

  useEffect(() => {
    if (items.length <= 0) {
      return
    }
    if (initItem == null) {
      setSelectedItem(items[0])
    } else if (!enabled(initItem)) { /* empty */ } else {
      setSelectedItem(initItem)
    }
  }, [enabled, initItem, items, setSelectedItem])

  return (
    <>
      { (items.length > 1 && (selectedItem != null) && enabled(selectedItem)) &&
        <Box>
          { ((selectInputLabel?.id) != null) &&
            <Typography
              component="div"
              variant="h3"
              sx={{
                ...((themeCustomElements.landingDetail?.selectLabel) != null)
                  ? convertElementToSx(themeCustomElements.landingDetail.selectLabel)
                  : undefined
              }}
              mb={1}
            >
              <FormattedMessage id={selectInputLabel.id} values={selectInputLabel.values} />
            </Typography>
          }
          <Select
            id="select-item"
            value={selectedItem?.name.current}
            onChange={handleSelectChange}
            sx={{
              width: '180px'
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
  )
}

export default SelectItem
