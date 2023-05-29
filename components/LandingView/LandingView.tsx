import type { Landing, LandingConfig } from '@core/types/products';
import LandingDetail from '@core/components/LandingDetail';

import LandingEverfresh from '@components/LandingView/LandingEverfresh';
import LandingBags from '@components/LandingView/LandingBags';

type LandingViewProps = {
  landingModel: Landing,
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
          <LandingEverfresh />
        }
        { (landingConfig.id === 2 || landingConfig.id === 4) &&
          <LandingBags />
        }
      </>
    </LandingDetail>
  );
};

export default LandingView;
