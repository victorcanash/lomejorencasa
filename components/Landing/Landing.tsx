import type { Landing, LandingConfig } from '@core/types/products';
import LandingDetail from '@core/components/LandingDetail';

import EverfreshDetail from '@components/Landing/EverfreshDetail';
import BagsDetail from '@components/Landing/BagsDetail';

type LandingDetailProps = {
  landingModel: Landing,
  landingConfig: LandingConfig,
};

const Landing = (props: LandingDetailProps) => {
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

export default Landing;
