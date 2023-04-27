import { fbEvent } from '@rivercode/facebook-conversion-api-nextjs';

import type { FacebookEvent } from '@core/types/facebook';

export const sendFBEvent = (event: FacebookEvent) => {
  fbEvent({
    ...event,
    enableStandardPixel: true, // default false (Require Facebook Pixel to be loaded, see step 2)
    testEventCode: undefined,
  });
};
