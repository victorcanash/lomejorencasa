import { useState, useEffect, useCallback, type Dispatch, type SetStateAction } from 'react'

import { FormattedMessage } from 'react-intl'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MuiSelect, { type SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { rangeChangeItemQuantity } from '@core/config/cart.config'
import type { ProductInventory, ProductPack } from '@core/types/products'
import type { CartItem } from '@core/types/cart'
import { convertElementToSx } from '@core/utils/themes'
import { instanceOfProductInventory, instanceOfProductPack } from '@core/utils/products'
import { instanceOfCartItem } from '@core/utils/cart'

import { themeCustomElements } from '@lib/config/theme/elements'

interface SelectItemQuantityProps {
  item: ProductInventory | ProductPack | CartItem | undefined
  selectedQuantity: number
  setSelectedQuantity: Dispatch<SetStateAction<number>>
  label?: boolean
  onChange?: (quantity: number) => void
}

const SelectItemQuantity = (props: SelectItemQuantityProps) => {
  const {
    item,
    selectedQuantity,
    setSelectedQuantity,
    label,
    onChange
  } = props

  const [menuItems, setMenuItems] = useState<JSX.Element[]>([])
  const [loaded, setLoaded] = useState(false)
  const [prevItem, setPrevItem] = useState<ProductInventory | ProductPack | undefined>(undefined)

  const checkMenuItems = useCallback((newQuantity: number) => {
    const newMenuItems = [] as JSX.Element[]
    const menuItemsValues = [] as number[]

    if (item == null) {
      menuItemsValues.push(newQuantity)
    } else {
      const itemQuantity = item.quantity
      let maxBigbuyQuantity = newQuantity + rangeChangeItemQuantity
      if (maxBigbuyQuantity > itemQuantity) {
        maxBigbuyQuantity = itemQuantity
      }
      let minBigbuyQuantity = newQuantity - rangeChangeItemQuantity
      if (minBigbuyQuantity < 0) {
        minBigbuyQuantity = 0
      }

      if (newQuantity === 0) {
        menuItemsValues.push(0)
      }
      if (itemQuantity > 0) {
        if (minBigbuyQuantity > 2) {
          menuItemsValues.push(1, 2)
        }
        for (let i = minBigbuyQuantity; i < maxBigbuyQuantity; i++) {
          menuItemsValues.push(i + 1)
        }
      }
    }

    for (let i = 0; i < menuItemsValues.length; i++) {
      newMenuItems.push(
        <MenuItem key={menuItemsValues[i]} value={menuItemsValues[i]}>
          {menuItemsValues[i]}
        </MenuItem>
      )
    }
    return newMenuItems
  }, [item])

  const disabled = useCallback(() => {
    if (item == null || item.quantity <= 0) {
      return true
    }
    return false
  }, [item])

  const handleSelectChange = useCallback((event: SelectChangeEvent) => {
    const quantity = parseInt(event.target.value)
    setSelectedQuantity(quantity)
    setMenuItems(checkMenuItems(quantity))
    if (onChange != null) {
      onChange(quantity)
    }
  }, [checkMenuItems, onChange, setSelectedQuantity])

  useEffect(() => {
    if (!loaded) {
      let quantity = item?.quantity ?? 0
      if (item != null && !instanceOfCartItem(item)) {
        if (item.quantity > 0) {
          quantity = 1
        } else {
          quantity = 0
        }
      }
      setSelectedQuantity(quantity)
      setMenuItems(checkMenuItems(quantity))
      setLoaded(true)
    } else if (item != null && !instanceOfCartItem(item) && prevItem != null && !instanceOfCartItem(prevItem)) {
      if ((instanceOfProductInventory(item) && instanceOfProductInventory(prevItem) && item.sku !== prevItem.sku) ||
          (instanceOfProductPack(item) && instanceOfProductPack(prevItem) && item.inventories !== prevItem.inventories)) {
        let quantity = 0
        if (item.quantity > 0) {
          quantity = 1
        }
        setSelectedQuantity(quantity)
        setMenuItems(checkMenuItems(quantity))
      }
    }
    if (item != null && !instanceOfCartItem(item)) {
      setPrevItem(item)
    }
  }, [checkMenuItems, item, item?.quantity, loaded, prevItem, setSelectedQuantity])

  return (
    <Box>
      { (label === true) &&
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
          <FormattedMessage id="forms.quantity" />
        </Typography>
      }
      { loaded && (item != null)
        ? <MuiSelect
        id="select-inventory-quantity"
          value={selectedQuantity.toString()}
          onChange={handleSelectChange}
          disabled={disabled()}
          fullWidth
        >
          { menuItems }
        </MuiSelect>
        : <MuiSelect
          id="select-inventory-quantity"
          value="0"
          disabled={true}
          fullWidth
        >
          <MenuItem value="0">
            { 0 }
          </MenuItem>
        </MuiSelect>
      }
    </Box>
  )
}

export default SelectItemQuantity
