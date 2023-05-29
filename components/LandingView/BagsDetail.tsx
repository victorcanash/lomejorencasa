import { pages } from '@lib/config/navigation.config';
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
          src: 'v1680692696/laenvasadora/LANDING%20PAGE/VIDEO_SUCCION_RESUBIDO_shudab.mp4',
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
          src: 'v1680692687/laenvasadora/LANDING%20PAGE/Video_cajon_landing_con_mas_luz_g2tu5o.mp4',
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
          src: 'v1680692634/laenvasadora/LANDING%20PAGE/Maleta_landing_con_mas_luz_bosliw.mp4',
          alt: "Packing machine tutorial 3",
        }} 
      />
    </>
  );
};

export default BagsDetail;
