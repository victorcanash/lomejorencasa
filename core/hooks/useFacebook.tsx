import { useCallback, useMemo } from 'react';

import type { FacebookEvent, FacebookEventContent } from '@core/types/facebook';
import type { Landing, ProductInventory, ProductPack } from '@core/types/products';
import { sendFBEvent } from '@core/utils/facebook';

import { useAuthContext } from '@core/contexts/AuthContext';
import { useCartContext } from '@core/contexts/CartContext';
import { useProductsContext } from '@core/contexts/ProductsContext';

const contentCategory = 'Camping Cookware';
const contentType = 'product';

const useFacebook = () => {
  const { currency } = useAuthContext();
  const { cart, totalPrice, totalQuantity } = useCartContext();
  const { getFirstLandingItem, getProductPriceData } = useProductsContext();

  const cartContents = useMemo(() => {
    const contents: FacebookEventContent[] = [];
    cart.items.forEach(item => {
      if (item.inventory) {
        contents.push({
          id: item.inventory.metaId || '',
          quantity: item.quantity,
        });
      } else if (item.pack) {
        contents.push({
          id: item.pack.metaId || '',
          quantity: item.quantity,
        });
      };
    });
    return contents;
  }, [cart.items]);

  /*const landingContentIds = useCallback((landing: Landing) => {
    const contentIds: string[] = [];
    landing.products.forEach(product => {
      product.inventories?.forEach((inventory) => {
        contentIds.push(inventory.metaId || '');
      })
    });
    landing.packs.forEach(pack => {
      contentIds.push(pack.metaId || '');
    });
    return contentIds;
  }, []);*/

  const sendViewContentEvent = useCallback((landing: Landing) => {
    const firstLandingItem = getFirstLandingItem(landing);
    const data = {
      content_category: contentCategory,
      content_type: contentType,
      content_ids: [
        firstLandingItem?.metaId || '',
      ],
      content_name: firstLandingItem?.name.current || '',
      value: firstLandingItem ? getProductPriceData(firstLandingItem).price : undefined,
      currency: currency,
    } as FacebookEvent;

    sendFBEvent('ViewContent', data);
  }, [currency, getFirstLandingItem, getProductPriceData]);

  const sendAddToCartEvent = useCallback((item: ProductInventory | ProductPack, quantity: number) => {
    const data = {
      content_category: contentCategory,
      content_type: contentType,
      contents: [{
        id: item.metaId || '',
        quantity: quantity,
      }],
      content_name: item.name.current,
      value: getProductPriceData(item).price,
      currency: currency,
    } as FacebookEvent;
  
    sendFBEvent('AddToCart', data);
  }, [currency, getProductPriceData]);

  const sendInitiateCheckoutEvent = useCallback(() => {
    const data = {
      content_category: contentCategory,
      content_type: contentType,
      contents: cartContents,
      num_items: totalQuantity,
      value: totalPrice,
      currency: currency,
    } as FacebookEvent;

    sendFBEvent('InitiateCheckout', data);
  }, [cartContents, currency, totalPrice, totalQuantity]);

  const sendAddPaymentInfoEvent = useCallback(() => {
    const data = {
      content_category: contentCategory,
      content_type: contentType,
      contents: cartContents,
      value: totalPrice,
      currency: currency,
    } as FacebookEvent;

    sendFBEvent('AddPaymentInfo', data);
  }, [cartContents, currency, totalPrice]);

  const sendPurchaseEvent = useCallback(() => {
    let contentName: string | undefined;
    if (cart.items.length > 0) {
      contentName = cart.items[0].inventory ?
        cart.items[0].inventory.name.current : cart.items[0].pack?.name.current;
    }
    const data = {
      content_category: contentCategory,
      content_type: contentType,
      contents: cartContents,
      content_name: contentName,
      num_items: totalQuantity,
      value: totalPrice,
      currency: currency,
    } as FacebookEvent;

    sendFBEvent('Purchase', data);
  }, [cart.items, cartContents, currency, totalPrice, totalQuantity]);
  
  const sendCompleteRegistrationEvent = useCallback((success: boolean) => {
    const data = {
      currency: currency,
      status: success,
    } as FacebookEvent;

    sendFBEvent('CompleteRegistration', data);
  }, [currency]);

  const sendContactEvent = useCallback(() => {
    sendFBEvent('Contact');
  }, []);

  return {
    sendViewContentEvent,
    sendAddToCartEvent,
    sendInitiateCheckoutEvent,
    sendAddPaymentInfoEvent,
    sendPurchaseEvent,
    sendCompleteRegistrationEvent,
    sendContactEvent,
  };
};

export default useFacebook;
