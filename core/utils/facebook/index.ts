import type { FacebookEvent } from '@core/types/facebook';

export const sendPageViewFBEvent = () => {
  window.fbq('track', 'PageView')
};

export const sendFBEvent = (name: string, data?: FacebookEvent, id?: string) => {
  window.fbq('track', name, data);
};
