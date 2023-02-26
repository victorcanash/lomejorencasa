/* eslint-disable @typescript-eslint/no-var-requires */
import { Fragment } from 'react';
import Image, { StaticImageData } from 'next/image';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { convertElementToSx } from '@core/utils/themes';
import LinkButton from '@core/components/LinkButton';

import { pages } from '@lib/constants/navigation';
import { themeCustomElements } from '@lib/constants/themes/elements';
import Title from '@components/ui/Title';
import use_food_preparation_bg from 'public/images/home/use-food-preparation-bg.jpg';
import use_food_preparation_everfresh from 'public/images/home/use-food-preparation-everfresh.png';
import use_bag_selection from 'public/images/home/use-bag-selection.png';
import detail_bags3 from 'public/images/bags/bags3.jpg';
import use_packing_machine_step2 from 'public/images/home/use-packing-machine-step2.jpg';

const HomeUse = () => {
  const imgRadius = '17px';

  const getPackingMachineStep = (index: number, type: 'video' | 'image', src: StaticImageData | 'string') => {
    const texts = (
      <>
        <Title
          type="h4Home"
          texts={{
            title: {
              id: 'home.use.packingMachine.steps.title',
              values: {
                step: index + 1,
              },
            },
          }}
          divider={false}
        />
        <Typography component="div" variant="body1" mb={4}>
          <FormattedMessage id={`home.use.packingMachine.steps.${index + 1}`} />
        </Typography>
      </>
    );
    if (type == 'video') {
      return (
        <>
          { texts }
          <video 
            loop
            muted
            autoPlay
            playsInline
            style={{
              position: 'relative',
              width: '100%', 
              height: '100%',
              borderRadius: imgRadius,
            }}
          >
            <source 
              src={src as string} 
              type="video/mp4" 
            />
          </video>
        </>
      );
    }
    return (
      <>
        { texts }
        <Image 
          src={src} 
          alt="Tutorial" 
          quality="100"
          layout="responsive" 
          objectFit="cover"
          style={{ borderRadius: imgRadius }}
        />
      </>
    );
  };

  return (
    <>
      <Container>
        <Box
          maxWidth="sm"
          m="auto"
        >
          <Title
            type="h2"
            texts={{
              title: {
                id: 'home.use.title',
              },
            }}
            divider={true}
          />
        </Box>
      </Container>

      {/* Food Preparation Section */}
      <Container>
        <Box
          maxWidth="sm"
          m="auto"
        >
          <Title
            type="h3Home"
            texts={{
              title: {
                id: 'home.use.foodPreparation.title',
              },
            }}
            divider={false}
          />
          <Typography component="div" variant="body1">
            <FormattedMessage id="home.use.foodPreparation.description" />
          </Typography>
        </Box>
      </Container>
      <Box
        sx={{     
          position: 'absolute',
          width: '470px',
          left: '30px',
          zIndex: 1,
        }}
      >
        <Image
          src={use_food_preparation_everfresh} 
          alt="Use food preparation EverFresh" 
          layout="responsive" 
          objectFit="cover"
          quality="100"
        />
      </Box>
      <Box
        maxWidth="sm"
        m="auto"
        mt={4}
      >
        <Image
          src={use_food_preparation_bg} 
          alt="Use food preparation background" 
          layout="responsive" 
          objectFit="cover"
          quality="100"
          style={{ borderRadius: imgRadius }}
        />
      </Box>

      {/* Bag Selection Section */}
      <Container>
        <Box
          maxWidth="sm"
          m="auto"
        >
          <Title
            type="h3Home"
            texts={{
              title: {
                id: 'home.use.bagSelection.title',
              },
            }}
            divider={false}
          />
          <Typography component="div" variant="body1">
            <FormattedMessage id="home.use.bagSelection.description" />
          </Typography>
        </Box>
      </Container>
      <Box
        maxWidth="sm"
        m="auto"
        mt={4}
      >
        <Image
          src={use_bag_selection} 
          alt="Use bag selection image" 
          layout="responsive" 
          objectFit="cover"
          quality="100"
          style={{ borderRadius: imgRadius }}
        />
      </Box>
      <Container>
        <Box
          maxWidth="sm"
          m="auto"
        >
          <Title
            type="h4Home"
            texts={{
              title: {
                id: 'home.use.bagSelection.sizes.title',
              },
            }}
            divider={false}
          />
          <Box>
            <Image
              src={detail_bags3} 
              alt="Use bag selection sizes image" 
              layout="responsive" 
              objectFit="cover"
              quality="100"
              style={{ borderRadius: imgRadius }}
            />
          </Box>
          <LinkButton
            href={pages.bags.path}
            id="advantages"
            sx={{
              ...convertElementToSx(themeCustomElements.button.action),
              mt: 4,
            }}
          >
            <FormattedMessage id="home.use.bagSelection.buyBtn" />
          </LinkButton>
        </Box>
      </Container>
  
      {/* Packing Machine Section */}
      <Container>
        <Box
          maxWidth="sm"
          m="auto"
        >
          <Title
            type="h3Home"
            texts={{
              title: {
                id: 'home.use.packingMachine.title',
              },
            }}
            divider={false}
          />
          <Typography component="div" variant="body1">
            <FormattedMessage id="home.use.packingMachine.description" />
          </Typography>
          { 
            ([
              {
                type: 'video',
                src: require('../../../public/videos/home/use-packing-machine-step1.mp4'),
              },
              {
                type: 'image',
                src: use_packing_machine_step2,
              },
              {
                type: 'video',
                src: require('../../../public/videos/home/use-packing-machine-step3.mp4'),
              },
              {
                type: 'video',
                src: require('../../../public/videos/home/use-packing-machine-step4.mp4'),
              }
            ] as { 
              type: 'video' | 'image', 
              src: StaticImageData | 'string' 
            }[]).map((item, index) => (
              <Fragment key={index}>
                { getPackingMachineStep(index, item.type, item.src) }
              </Fragment>
            ))
          }
        </Box>
      </Container>
    </>
  );
};

export default HomeUse;
