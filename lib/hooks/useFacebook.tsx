import { useCallback, useMemo } from 'react';

import type { FacebookEvent } from '@core/types/facebook';
import type { ProductInventory, ProductPack } from '@core/types/products';
import { sendFBEvent } from '@core/utils/facebook';

import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';

const useFacebook = () => {
  const { user, currency } = useAuthContext();
  const { cart, totalPrice } = useCartContext();

  const cartProducts = useMemo(() => {
    const products: { sku: string, quantity: number }[] = [];
    cart.items.forEach(item => {
      if (item.inventory) {
        products.push({
          sku: item.inventory.sku,
          quantity: item.quantity,
        });
      } else if (item.pack) {
        item.pack.inventories.forEach(inventory => {
          products.push({
            sku: inventory.sku,
            quantity: item.quantity,
          });
        })
      };
    });
    return products;
  }, [cart.items]);

  const sendViewContentEvent = useCallback(() => {
    const fbEvent = {
      eventName: 'ViewContent',
      eventId: undefined,
      emails: user.email ? [user.email] : undefined,
      phones: undefined,
      products: cartProducts,
      value: totalPrice,
      currency: currency,
    } as FacebookEvent;

    sendFBEvent(fbEvent);
  }, [cartProducts, currency, totalPrice, user.email]);

  const sendAddToCartEvent = (productItem: ProductInventory | ProductPack, quantity: number) => {
    const fbEvent = {
      eventName: 'AddToCart',
      eventId: undefined,
      emails: user.email ? [user.email] : undefined,
      phones: undefined,
      products: [],
      value: undefined,
      currency: currency,
    } as FacebookEvent;

    if ((productItem as ProductInventory)?.sku) {
      fbEvent.products.push({
        sku: (productItem as ProductInventory).sku,
        quantity: quantity,
      });
      fbEvent.value = (productItem as ProductInventory).realPrice;
    } else if ((productItem as ProductPack)?.inventories) {
      (productItem as ProductPack).inventories.forEach(inventory => {
        fbEvent.products.push({
          sku: inventory.sku,
          quantity: quantity,
        });
      });
      fbEvent.value = (productItem as ProductPack).price;
    };
  
    sendFBEvent(fbEvent);
  };

  const sendAddPaymentInfoEvent = (email: string) => {
    const fbEvent = {
      eventName: 'AddPaymentInfo',
      eventId: undefined,
      emails: [email],
      phones: undefined,
      products: cartProducts,
      value: totalPrice,
      currency: currency,
    } as FacebookEvent;

    sendFBEvent(fbEvent);
  };

  const sendInitiateCheckoutEvent = (email: string) => {
    const fbEvent = {
      eventName: 'InitiateCheckout',
      eventId: undefined,
      emails: [email],
      phones: undefined,
      products: cartProducts,
      value: totalPrice,
      currency: currency,
    } as FacebookEvent;

    sendFBEvent(fbEvent);
  };

  const sendPurchaseEvent = (email: string) => {
    const fbEvent = {
      eventName: 'Purchase',
      eventId: undefined,
      emails: [email],
      phones: undefined,
      products: cartProducts,
      value: totalPrice,
      currency: currency,
    } as FacebookEvent;

    sendFBEvent(fbEvent);
  };
  
  const sendCompleteRegistrationEvent = (email: string) => {
    const fbEvent = {
      eventName: 'CompleteRegistration',
      eventId: undefined,
      emails: [email],
      phones: undefined,
      products: cartProducts,
      value: totalPrice,
      currency: currency,
    } as FacebookEvent;

    sendFBEvent(fbEvent);
  };

  const sendContactEvent = (email: string) => {
    const fbEvent = {
      eventName: 'Contact',
      eventId: undefined,
      emails: [email],
      phones: undefined,
      products: cartProducts,
      value: totalPrice,
      currency: currency,
    } as FacebookEvent;

    sendFBEvent(fbEvent);
  };

  return {
    sendViewContentEvent,
    sendAddToCartEvent,
    sendAddPaymentInfoEvent,
    sendInitiateCheckoutEvent,
    sendPurchaseEvent,
    sendCompleteRegistrationEvent,
    sendContactEvent,
  };
};

export default useFacebook;
