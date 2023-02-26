/* eslint-disable @typescript-eslint/no-var-requires */
import { Fragment } from 'react';
import Image from 'next/image';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { Source } from '@core/types/multimedia';
import { convertElementToSx } from '@core/utils/themes';
import LinkButton from '@core/components/LinkButton';

import { pages } from '@lib/constants/navigation';
import { themeCustomElements } from '@lib/constants/themes/elements';
import Title from '@components/ui/Title';
import use_food_preparation_bg from 'public/images/home/use-food-preparation-bg.jpg';
import use_food_preparation_everfresh from 'public/images/home/use-food-preparation-everfresh.png';
import use_bag_selection from 'public/images/home/use-bag-selection.png';
import use_bag_selection_sizes from 'public/images/home/use-bag-selection-sizes.png';
import use_packing_machine_step2 from 'public/images/home/use-packing-machine-step2.jpg';
import MultimediaContainer from '@components/ui/MultimediaContainer';

const HomeUse = () => {
  const getPackingMachineStep = (index: number, source: Source) => {
    return (
      <>
        <Container>
          <Box
            maxWidth="sm"
            m="auto"
          >
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
            <Typography component="div" variant="body1">
              <FormattedMessage id={`home.use.packingMachine.steps.${index + 1}`} />
            </Typography>
          </Box>
        </Container>
        <MultimediaContainer
          type="default"
          source={source}
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
          width: '200px',
          left: {
            xs: '5%',
            sm: '12%',
            sm_md: '20%',
            md: '25%',
            md_lg: '30%',
            lg: '35%',
            xl: '40%',
          },
          pt: 2,
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
      <MultimediaContainer
        type="default"
        source={{ 
          src: use_food_preparation_bg,
          alt: 'Use food preparation image',
        }}
        mt={10}
      />

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
      <MultimediaContainer
        type="default"
        source={{ 
          src: use_bag_selection,
          alt: 'Use bag selection image',
        }}
      />
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
          <MultimediaContainer
            type="default"
            source={{ 
              src: use_bag_selection_sizes,
              alt: 'Use bag selection sizes image',
            }}
            borderRadius="0px"
            maxWidth="xs_sm"
          />
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
        </Box>
      </Container>
      { 
        ([
          {
            type: 'video',
            src: require('../../../public/videos/home/use-packing-machine-step1.mp4'),
            alt: 'Use packing machine step 1',
          },
          {
            type: 'image',
            src: use_packing_machine_step2,
            alt: 'Use packing machine step 2',
          },
          {
            type: 'video',
            src: require('../../../public/videos/home/use-packing-machine-step3.mp4'),
            alt: 'Use packing machine step 3',
          },
          {
            type: 'video',
            src: require('../../../public/videos/home/use-packing-machine-step4.mp4'),
            alt: 'Use packing machine step 4',
          }
        ] as Source[]).map((item, index) => (
          <Fragment key={index}>
            { getPackingMachineStep(index, item) }
          </Fragment>
        ))
      }
    </>
  );
};

export default HomeUse;
