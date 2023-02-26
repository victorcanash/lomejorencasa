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
          src: require('../../../public/videos/home/use-packing-machine-step4.mp4'),
          alt: "Packing machine tutorial 1",
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
          src: require('../../../public/videos/everfresh/everfresh-tutorial1.mp4'),
          alt: "Packing machine tutorial 2",
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
          src: require('../../../public/videos/everfresh/everfresh-tutorial2.mp4'),
          alt: "Packing machine tutorial 3",
        }} 
      />
      
      <DetailReviews />
    </>
  );
};

export default EverfreshDetail;
