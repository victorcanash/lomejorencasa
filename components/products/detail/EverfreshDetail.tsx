import { pages } from '@lib/constants/navigation';
import { everfreshVideoIds } from '@lib/constants/multimedia';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import DetailCharacteristics from '@components/products/sections/DetailCharacteristics';
import DetailTutorial from '@components/products/sections/DetailTutorial';
import DetailReviews from '@components/products/sections/DetailReviews';

const EverfreshDetail = () => {
  const { everfreshProduct } = useProductsContext();

  return (
    <>
      { everfreshProduct &&
        <>
          <DetailCharacteristics
            product={everfreshProduct}
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
              path: `${pages.home.path}#usePackingMachine`,
            }}
            source={{ 
              type: 'video',
              src: everfreshVideoIds[0],
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
            button={{
              text: {
                id: 'everfresh.videoComment.2.bagsButton',
              },
              path: pages.bags.path,
            }}
            source={{ 
              type: 'video',
              src: everfreshVideoIds[1],
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
            button={{
              text: {
                id: 'everfresh.videoComment.3.button',
              },
              path: pages.faq.path,
            }}
            source={{ 
              type: 'video',
              src: everfreshVideoIds[2],
              alt: "Packing machine tutorial 3",
            }} 
          />
          
          <DetailReviews />
        </>
      }
    </>
  );
};

export default EverfreshDetail;
