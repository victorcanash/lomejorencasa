import { pages } from '@lib/constants/navigation';
import { everfreshProductId } from '@lib/constants/products';
import ProductCharacteristics from '@components/products/sections/ProductCharacteristics';
import ProductTutorial from '@components/products/sections/ProductTutorial';
import ProductReviews from '@components/products/sections/ProductReviews';

const EverfreshDetail = () => {

  return (
    <>
      <ProductCharacteristics
        productId={everfreshProductId}
      />

      <ProductTutorial
        title={{
          id: 'everfresh.videoComment.1.title',
        }}
        content={{
          id: 'everfresh.videoComment.1.content',
        }}
        button={{
          text: {
            id: 'everfresh.videoComment.1.button',
          },
          path: pages.home.path,
        }}
        source={{ 
          type: 'video',
          src: require('../../../public/videos/everfresh/everfresh1.mp4'),
        }} 
      />

      <ProductTutorial
        title={{
          id: 'everfresh.videoComment.2.title',
        }}
        content={{
          id: 'everfresh.videoComment.2.content',
        }}
        source={{ 
          type: 'video',
          src: require('../../../public/videos/everfresh/everfresh2.mp4'),
        }} 
      />

      <ProductTutorial
        title={{
          id: 'everfresh.videoComment.3.title',
        }}
        content={{
          id: 'everfresh.videoComment.3.content',
        }}
        source={{ 
          type: 'video',
          src: require('../../../public/videos/everfresh/everfresh3.mp4'),
        }} 
      />
      
      <ProductReviews />
    </>
  );
};

export default EverfreshDetail;
