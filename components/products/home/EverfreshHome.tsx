import Container from '@mui/material/Container';

import ProductBanner from '@components/products/ui/ProductBanner';
import ProductTutorial from '@components/products/ui/ProductTutorial';
import EverfreshAdvantages from '@components/products/ui/everfresh/EverfreshAdvantages';
import EverfreshCharacteristics from '@components/products/ui/everfresh/EverfreshCharacteristics';
import EverfreshConservation from '@components/products/ui/everfresh/EverfreshConservation';

const EverfreshHome = () => {

  return (
    <>
      <ProductBanner />

      <Container>

        <EverfreshAdvantages />

        <ProductTutorial
          titleId="home.use.title"
          textId="home.use.1" 
          source={{ 
            type: 'video',
            src: require('../../../public/videos/home/everfresh1.mp4'),
          }} 
        />
        <ProductTutorial 
          textId="home.use.2" 
          source={{ 
            type: 'video',
            src: require('../../../public/videos/home/everfresh1.mp4'),
          }} 
        />
        <ProductTutorial 
          textId="home.use.3" 
          source={{ 
            type: 'video',
            src: require('../../../public/videos/home/everfresh1.mp4'),
          }} 
        />

        <EverfreshCharacteristics />

        <EverfreshConservation />

      </Container>
    </>
  );
};

export default EverfreshHome;
