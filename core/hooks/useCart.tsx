import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useIntl } from 'react-intl'
import { useSnackbar } from 'notistack'

import { ManageActions } from '@core/constants/app'
import { maxQuantity } from '@core/config/cart.config'
import type { Cart, CartItem, TotalAmount } from '@core/types/cart'
import type { ProductInventory, ProductPack } from '@core/types/products'
import {
  manageCartItem,
  checkCart as checkCartMW,
  getItemAmount,
  getTotalAmount
} from '@core/utils/cart'
import { instanceOfProductInventory, instanceOfProductPack } from '@core/utils/products'

import { pages } from '@lib/config/navigation.config'
import { useAppContext } from '@core/contexts/AppContext'
import { useAuthContext } from '@core/contexts/AuthContext'
import { useCartContext } from '@core/contexts/CartContext'
import useFacebook from '@core/hooks/useFacebook'

const useCart = (checkTotalAmount = true) => {
  const { setLoading } = useAppContext()
  const { user, token, isLogged } = useAuthContext()
  const {
    cart,
    initCart,
    totalQuantity,
    setTotalQuantity,
    totalPrice,
    setTotalPrice,
    openDrawer
  } = useCartContext()

  const router = useRouter()
  const intl = useIntl()
  const { enqueueSnackbar } = useSnackbar()

  const { sendAddToCartEvent } = useFacebook()

  const [totalAmount, setTotalAmount] = useState<TotalAmount>({
    itemsAmount: [],
    subtotal: 0,
    totalVat: 0,
    totalDiscount: 0,
    total: 0,
    totalQuantity: 0
  })

  const addCartItem = (productItem: ProductInventory | ProductPack, quantity: number, goToCheckout?: boolean) => {
    if (totalQuantity + quantity > maxQuantity) {
      onMaxCartQuantityError()
      return
    }
    setLoading(true)

    sendAddToCartEvent(productItem, quantity)

    const cartItem: CartItem = {
      id: 0,
      cartId: cart.id,
      inventoryId: instanceOfProductInventory(productItem) ? productItem.id : undefined,
      packId: instanceOfProductInventory(productItem) ? undefined : productItem.id,
      inventory: instanceOfProductInventory(productItem) ? productItem : undefined,
      pack: instanceOfProductInventory(productItem) ? undefined : productItem,
      quantity
    }

    let cartItemIndex = -1
    cart.items.forEach((item, index) => {
      if ((instanceOfProductInventory(productItem) && item.inventoryId === productItem.id) ||
          ((instanceOfProductPack(productItem) && item.packId === productItem.id))) {
        cartItemIndex = index
        cartItem.id = item.id
        cartItem.quantity += item.quantity
      }
    })

    const itemAmount = getItemAmount(cartItem, quantity)
    // Update cart item
    if (cartItemIndex > -1) {
      manageCartItem(ManageActions.update, token, cart, cartItem)
        .then((response: { cartItem: CartItem }) => {
          cart.items[cartItemIndex] = response.cartItem
          onAddCartItemSuccess(quantity, itemAmount.itemTotalWithQuantity, goToCheckout)
        }).catch((_error: Error) => {
          onAddCartItemError()
        })

    // Create cart item
    } else {
      manageCartItem(ManageActions.create, token, cart, cartItem)
        .then((response: { cartItem: CartItem }) => {
          cart.items.push(response.cartItem)
          onAddCartItemSuccess(quantity, itemAmount.itemTotalWithQuantity, goToCheckout)
        }).catch((_error: Error) => {
          onAddCartItemError()
        })
    };
  }

  const onAddCartItemSuccess = (quantity: number, itemPrice: number, goToCheckout?: boolean) => {
    setTotalQuantity(totalQuantity + quantity)
    setTotalPrice(totalPrice + itemPrice)
    if (!(goToCheckout ?? false)) {
      setLoading(false)
      openDrawer()
    } else {
      void router.push(pages.checkout.path)
    }
  }

  const onAddCartItemError = () => {
    setLoading(false)
    enqueueSnackbar(
      intl.formatMessage({ id: 'cart.errors.add' }),
      { variant: 'error' }
    )
  }

  const updateCartItemQuantity = async (cartItem: CartItem, quantity: number, forceUpdate = false) => {
    if (cartItem.quantity === quantity && !forceUpdate) {
      return
    };
    if (((totalQuantity - cartItem.quantity) + quantity > maxQuantity) &&
        (cartItem.quantity < quantity)) {
      onMaxCartQuantityError()
      return
    }
    setLoading(true)

    const cartItemIndex = cart.items.indexOf(cartItem)

    // Update cart item
    if (quantity > 0) {
      const addedQuantity = quantity - cartItem.quantity
      const itemAmount = getItemAmount(cartItem, addedQuantity)
      cartItem.quantity = quantity
      manageCartItem(ManageActions.update, token, cart, cartItem)
        .then((_response: { cartItem: CartItem }) => {
          cart.items[cartItemIndex] = cartItem
          onUpdateCartItemSuccess(addedQuantity, itemAmount.itemTotalWithQuantity)
        }).catch((_error: Error) => {
          onUpdateCartItemError()
        })

    // Delete cart item
    } else {
      const addedQuantity = -cartItem.quantity
      const itemAmount = getItemAmount(cartItem, addedQuantity)
      manageCartItem(ManageActions.delete, token, cart, cartItem)
        .then((_response: { cartItem: CartItem }) => {
          cart.items.splice(cartItemIndex, 1)
          onUpdateCartItemSuccess(addedQuantity, itemAmount.itemTotalWithQuantity)
        }).catch((_error: Error) => {
          onUpdateCartItemError()
        })
    };
  }

  const onUpdateCartItemSuccess = (addedQuantity: number, addedPrice: number) => {
    setTotalPrice(totalPrice + addedPrice)
    setTotalQuantity(totalQuantity + addedQuantity)
    setLoading(false)
  }

  const onUpdateCartItemError = () => {
    setLoading(false)
    enqueueSnackbar(
      intl.formatMessage({ id: 'cart.errors.update' }),
      { variant: 'error' }
    )
  }

  const checkCart = async (onSuccess?: (changedCart: boolean, changedItemsByInventory: CartItem[]) => void) => {
    setLoading(true)
    checkCartMW(isLogged() ? token : undefined, cart)
      .then((response: { cart: Cart, changedItemsByInventory: CartItem[] }) => {
        onCheckCartSuccess(response.cart, response.changedItemsByInventory, onSuccess)
      }).catch((_error: Error) => {
        onCheckCartError()
      })
  }

  const onCheckCartSuccess = (newCart: Cart, changedItemsByInventory: CartItem[], onSuccess?: (changedCart: boolean, changedItemsByInventory: CartItem[]) => void) => {
    const diffCarts = cart.items.filter(item => {
      return !newCart.items.some(newItem => {
        return (
          newItem.id === item.id &&
          newItem.quantity === item.quantity
        )
      })
    })
    let changedCart = false
    if ((diffCarts.length > 0) ||
        (cart.items.length !== newCart.items.length)) {
      changedCart = true
    }

    initCart(newCart)
    onSuccess?.(changedCart, changedItemsByInventory)
  }

  const onCheckCartError = () => {
    setLoading(false)
    enqueueSnackbar(
      intl.formatMessage({ id: 'cart.errors.check' }),
      { variant: 'error' }
    )
  }

  const onMaxCartQuantityError = () => {
    enqueueSnackbar(
      intl.formatMessage({ id: 'cart.errors.maxQuantity' }),
      { variant: 'error' }
    )
  }

  useEffect(() => {
    if (checkTotalAmount) {
      setTotalAmount(getTotalAmount(cart, user))
    }
  }, [cart, cart.items, cart.items.length, checkTotalAmount, totalPrice, user])

  return {
    totalAmount,
    addCartItem,
    updateCartItemQuantity,
    checkCart
  }
}

export default useCart
