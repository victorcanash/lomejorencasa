import { pages } from '@lib/constants/navigation';
import { everfreshProductId } from '@lib/constants/products';
import DetailCharacteristics from '@components/products/sections/DetailCharacteristics';
import DetailTutorial from '@components/products/sections/DetailTutorial';
import DetailReviews from '@components/products/sections/DetailReviews';

const EverfreshDetail = () => {

  return (
    <>
      <DetailCharacteristics
        productId={everfreshProductId}
      />

      <DetailTutorial
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

      <DetailTutorial
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

      <DetailTutorial
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
      
      <DetailReviews />
    </>
  );
};

export default EverfreshDetail;
