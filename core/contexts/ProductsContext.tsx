import {
  createContext,
  useContext,
  useCallback
} from 'react'

import type {
  Landing,
  ProductPack,
  ProductInventory,
  ProductCategory,
  ProductCategoryGroup,
  Product
} from '@core/types/products'
import type { CartItem, GuestCartCheckItem } from '@core/types/cart'
import { instanceOfLanding, instanceOfProduct, instanceOfProductInventory } from '@core/utils/products'
import { instanceOfCartItem, instanceOfGuestCartCheckItem } from '@core/utils/cart'

import { pages } from '@lib/config/navigation.config'
import { placeholderSrc } from '@lib/config/multimedia.config'

interface ContextType {
  getItemPath: (item: ProductCategory | ProductCategoryGroup | Landing | CartItem | GuestCartCheckItem) => string
  getItemImgUrl: (item: ProductCategory | Landing | CartItem | GuestCartCheckItem) => string
  getLandingImgsUrl: (landing: Landing, selectedItem: ProductPack | ProductInventory | undefined) => string[]
  getLandingItems: (landing: Landing) => Array<ProductPack | ProductInventory>
  getFirstLandingItem: (landing: Landing) => ProductPack | ProductInventory | undefined
  getProductPriceData: (product: Product | ProductInventory | ProductPack) => { price: number, originPrice: number }
}

const ProductsContext = createContext<ContextType>({
  getItemPath: () => '',
  getItemImgUrl: () => '',
  getLandingImgsUrl: () => [],
  getLandingItems: () => [],
  getFirstLandingItem: () => undefined,
  getProductPriceData: () => ({ price: 0, originPrice: 0 })
})

export const useProductsContext = () => {
  return useContext(ProductsContext)
}

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const getItemPath = useCallback((item: ProductCategory | ProductCategoryGroup | Landing | CartItem | GuestCartCheckItem) => {
    if (instanceOfLanding(item)) {
      return `/productos/${item.slug}`
    } else if (instanceOfCartItem(item) || instanceOfGuestCartCheckItem(item)) {
      if (item.inventory?.product?.landing != null) {
        return `/productos/${item.inventory.product.landing.slug}`
      } else if (item.pack?.landing != null) {
        return `/productos/${item.pack.landing.slug}`
      }
    } else {
      return `/colecciones/${item.slug}`
    }
    return pages.home.path
  }, [])

  const getItemImgUrl = useCallback((item: ProductCategory | Landing | CartItem | GuestCartCheckItem) => {
    let imgUrl = placeholderSrc
    if (instanceOfLanding(item)) {
      imgUrl = item.images[0]
    } else if (instanceOfCartItem(item) || instanceOfGuestCartCheckItem(item)) {
      if (item.inventory?.image != null) {
        imgUrl = item.inventory.image
      } else if (item.pack?.image != null) {
        imgUrl = item.pack.image
      }
    } else if (item.image != null) {
      imgUrl = item.image
    }
    return imgUrl
  }, [])

  const getLandingImgsUrl = useCallback((landing: Landing, selectedItem: ProductPack | ProductInventory | undefined) => {
    const images: string[] = []
    if (landing.images.length > 0) {
      landing.images.forEach((image, index) => {
        if (index === 0 && ((selectedItem?.image) != null)) {
          images.push(selectedItem.image)
        } else {
          images.push(image)
        }
      })
    } else if ((selectedItem?.image) != null) {
      images.push(selectedItem.image)
    } else {
      images.push(placeholderSrc)
    }
    return images
  }, [])

  const getLandingItems = useCallback((landing: Landing) => {
    let landingItems: Array<ProductInventory | ProductPack> = []
    if (landing.products.length > 0) {
      const landingInventories = landing.products[0].inventories
      if ((landingInventories != null) && landingInventories.length > 0) {
        landingItems = landingInventories
      }
    } else if (landing.packs.length > 0) {
      landingItems = landing.packs
    }
    return landingItems
  }, [])

  const getFirstLandingItem = useCallback((landing: Landing) => {
    const landingItems = getLandingItems(landing)
    if (landingItems.length > 0) {
      return landingItems[0]
    }
    return undefined
  }, [getLandingItems])

  const getProductPriceData = (product: Product | ProductInventory | ProductPack) => {
    let price = 0
    let originPrice = 0
    if (instanceOfProduct(product)) {
      price = product.lowestRealPrice
      originPrice = product.lowestPrice
    } else if (instanceOfProductInventory(product)) {
      price = product.realPrice
      originPrice = product.price
    } else {
      price = product.price
      originPrice = product.originalPrice
    }
    return {
      price,
      originPrice
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        getItemPath,
        getItemImgUrl,
        getLandingImgsUrl,
        getLandingItems,
        getFirstLandingItem,
        getProductPriceData
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
