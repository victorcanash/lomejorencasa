import { useMemo } from 'react';

import { getLandingConfigByPath } from '@core/utils/products';
import { landingConfigs } from '@lib/config/inventory.config';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import useFacebook from '@lib/hooks/useFacebook';

const useLandingPage = (path: string) => {
  const { getLandingByPath } = useProductsContext();

  const { sendViewContentEvent } = useFacebook();

  const data = useMemo(() => {
    const landingModel = getLandingByPath(path);
    const landingConfig = getLandingConfigByPath(path, landingConfigs);
    if (landingModel?.name) {
      sendViewContentEvent(landingModel);
    }
    return {
      landingModel,
      landingConfig,
    };
  }, [getLandingByPath, path, sendViewContentEvent]);

  return {
    landingModel: data.landingModel,
    landingConfig: data.landingConfig,
  };
};

export default useLandingPage;
