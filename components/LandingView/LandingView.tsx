import type { Landing as LandingView, LandingConfig } from '@core/types/products';
import LandingDetail from '@core/components/LandingDetail';

import EverfreshDetail from '@components/LandingView/EverfreshDetail';
import BagsDetail from '@components/LandingView/BagsDetail';

type LandingViewProps = {
  landingModel: LandingView,
  landingConfig: LandingConfig,
};

const LandingView = (props: LandingViewProps) => {
  const { landingModel, landingConfig } = props;

  return (
    <LandingDetail 
      landingModel={landingModel}
      landingConfig={landingConfig}
    >
      <>
        { (landingConfig.id === 1 || landingConfig.id === 3) &&
          <EverfreshDetail />
        }
        { (landingConfig.id === 2 || landingConfig.id === 4) &&
          <BagsDetail />
        }
      </>
    </LandingDetail>
  );
};

export default LandingView;
