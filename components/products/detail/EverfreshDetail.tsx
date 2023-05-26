import { pages } from '@lib/config/navigation.config';
import { everfreshVideoIds } from '@lib/constants/multimedia';
import ProductTutorial from '@components/products/detail/ProductTutorial';

const EverfreshDetail = () => {

  return (
    <>
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
          path: `${pages.home.path}#usePackingMachine`,
        }}
        source={{ 
          type: 'video',
          src: everfreshVideoIds[0],
          alt: "Packing machine tutorial 1",
        }} 
      />

      <ProductTutorial
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

      <ProductTutorial
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
    </>
  );
};

export default EverfreshDetail;
