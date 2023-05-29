import { pages } from '@lib/config/navigation.config';
import { everfreshVideoIds } from '@lib/constants/multimedia';
import LandingTutorial from '@core/components/LandingDetail/LandingTutorial';

const BagsDetail = () => {

  return (
    <>
      <LandingTutorial
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

      <LandingTutorial
        title={{
          id: 'everfresh.videoComment.2.title',
        }}
        content={{
          id: 'everfresh.videoComment.2.content',
        }}
        button={{
          text: {
            id: 'everfresh.videoComment.2.everfreshButton',
          },
          path: pages.everfresh.path,
        }}
        source={{ 
          type: 'video',
          src: everfreshVideoIds[1],
          alt: "Packing machine tutorial 2",
        }} 
      />

      <LandingTutorial
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

export default BagsDetail;