import { useCallback, useMemo } from 'react';

import type { FacebookEvent, FacebookEventContent } from '@core/types/facebook';
import type { Landing, ProductInventory, ProductPack } from '@core/types/products';
import { sendFBEvent } from '@core/utils/facebook';
import { getProductPriceData } from '@core/utils/products';

import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';

const contentCategory = 'Camping Cookware';
const contentType = 'product';

const useFacebook = () => {
  const { acceptedCookies } = useAppContext();
  const { currency } = useAuthContext();
  const { cart, totalPrice, totalQuantity } = useCartContext();

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

  const sendViewContentEvent = useCallback((_landing: Landing | undefined, selectedItem: ProductInventory | ProductPack) => {
    if (!acceptedCookies) {
      return;
    }

    const data = {
      content_category: contentCategory,
      content_type: contentType,
      content_ids: [
        selectedItem.metaId || '',
      ],
      content_name: selectedItem.name.current,
      value: getProductPriceData(selectedItem).price,
      currency: currency,
    } as FacebookEvent;

    sendFBEvent('ViewContent', data);
  }, [acceptedCookies, currency]);

  const sendAddToCartEvent = useCallback((item: ProductInventory | ProductPack, quantity: number) => {
    if (!acceptedCookies) {
      return;
    }

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
  }, [acceptedCookies, currency]);

  const sendInitiateCheckoutEvent = useCallback(() => {
    if (!acceptedCookies) {
      return;
    }

    const data = {
      content_category: contentCategory,
      content_type: contentType,
      contents: cartContents,
      num_items: totalQuantity,
      value: totalPrice,
      currency: currency,
    } as FacebookEvent;

    sendFBEvent('InitiateCheckout', data);
  }, [acceptedCookies, cartContents, currency, totalPrice, totalQuantity]);

  const sendAddPaymentInfoEvent = useCallback(() => {
    if (!acceptedCookies) {
      return;
    }

    const data = {
      content_category: contentCategory,
      content_type: contentType,
      contents: cartContents,
      value: totalPrice,
      currency: currency,
    } as FacebookEvent;

    sendFBEvent('AddPaymentInfo', data);
  }, [acceptedCookies, cartContents, currency, totalPrice]);

  const sendPurchaseEvent = useCallback(() => {
    if (!acceptedCookies) {
      return;
    }

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
  }, [acceptedCookies, cart.items, cartContents, currency, totalPrice, totalQuantity]);
  
  const sendCompleteRegistrationEvent = useCallback((success: boolean) => {
    if (!acceptedCookies) {
      return;
    }

    const data = {
      currency: currency,
      status: success,
    } as FacebookEvent;

    sendFBEvent('CompleteRegistration', data);
  }, [acceptedCookies, currency]);

  const sendContactEvent = useCallback(() => {
    if (!acceptedCookies) {
      return;
    }

    sendFBEvent('Contact');
  }, [acceptedCookies]);

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
