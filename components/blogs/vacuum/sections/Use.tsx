import { useCallback, Fragment } from 'react';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { FormatText } from '@core/types/texts';
import type { Source } from '@core/types/multimedia';
import { convertElementToSx } from '@core/utils/themes';
import LinkButton from '@core/components/LinkButton';
import CustomImage from '@core/components/multimedia/CustomImage';
import Title from '@core/components/ui/Title';

import { keywords } from '@lib/config/next-seo.config';
import { pages } from '@lib/config/navigation.config';
import colors from '@lib/constants/themes/colors';
import { homeUseImgIds, homeVideoIds } from '@lib/constants/multimedia';
import { themeCustomElements } from '@lib/constants/themes/elements';
import MultimediaContainer from '@core/components/multimedia/MultimediaContainer';

const Use = () => {
  const Subtitle = useCallback((props: { type: 'h3' | 'h4', text: FormatText }) => {
    const { type, text } = props;
    return (
      <Box
        sx={{
          width: 'fit-content',
          backgroundColor: type === 'h3' ? colors.background.third : colors.background.secondary,
          borderRadius: '0px 15px 15px 0px',
          my: 4,
          ml: -3,
          p: 3,
        }}
      >
        { text.id &&
          <Typography 
            component={type} 
            variant={type} 
            align={text.textAlign}
          >
            <FormattedMessage id={text.id} values={text.values} />
          </Typography>
        }
      </Box>
    );
  }, []);

  const GetPackingMachineStep = useCallback((props: { index: number, source: Source }) => {
    const { index, source } = props;
    return (
      <>
        <Container>
          <Box
            maxWidth="sm"
            m="auto"
          >
            <Subtitle
              type="h4"
              text={{
                id: 'home.use.packingMachine.steps.title',
                values: {
                  step: index + 1,
                },
              }}
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
  }, [Subtitle]);

  return (
    <>
      <Container id="use">
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
      <Container id="useFoodPreparation">
        <Box
          maxWidth="sm"
          m="auto"
          mb={1}
        >
          <Subtitle
            type="h3"
            text={{
              id: 'home.use.foodPreparation.title',
            }}
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
          zIndex: 1,
          mt: -3,
        }}
      >
        <CustomImage
          src={homeUseImgIds[0]}
          alt={keywords.vacuumMachine.others[0]}
          width="628"
          height="628"
          layout="responsive" 
          objectFit="cover"
        />
      </Box>
      <MultimediaContainer
        type="default"
        source={{
          src: homeUseImgIds[1],
        }}
        mt={10}
      />

      {/* Bag Selection Section */}
      <Container id="useBagSelection">
        <Box
          maxWidth="sm"
          m="auto"
        >
          <Subtitle
            type="h3"
            text={{
              id: 'home.use.bagSelection.title',
            }}
          />
          <Typography component="div" variant="body1">
            <FormattedMessage id="home.use.bagSelection.description" />
          </Typography>
        </Box>
      </Container>
      <MultimediaContainer
        type="default"
        source={{ 
          src: homeUseImgIds[2],
          alt: keywords.vacuumBags.others[0],
          width: '8001',
          height: '2800',
        }}
      />
      <Container>
        <Box
          maxWidth="sm"
          m="auto"
        >
          <Subtitle
            type="h4"
            text={{
              id: 'home.use.bagSelection.sizes.title',
            }}
          />
          <MultimediaContainer
            mt={-4}
            type="default"
            source={{ 
              src: homeUseImgIds[3],
              alt: keywords.vacuumBags.others[0],
              width: '1080',
              height: '1080',
            }}
            borderRadius="0px"
            maxWidth="xs_sm"
          />
          <LinkButton
            href={pages.bags.path}
            id="advantages"
            sx={{
              ...convertElementToSx(themeCustomElements.button.action.primary),
              mt: 4,
            }}
          >
            <FormattedMessage id="home.use.bagSelection.buyBtn" />
          </LinkButton>
        </Box>
      </Container>
  
      {/* Packing Machine Section */}
      <Container id="usePackingMachine">
        <Box
          maxWidth="sm"
          m="auto"
        >
          <Subtitle
            type="h3"
            text={{
              id: 'home.use.packingMachine.title',
            }}
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
            src: homeVideoIds[0],
            alt: keywords.vacuumMachine.others[1],
          },
          {
            type: 'image',
            src: homeUseImgIds[4],
            alt: keywords.vacuumBags.main,
          },
          {
            type: 'video',
            src: homeVideoIds[1],
            alt: keywords.vacuumMachine.others[0],
          },
          {
            type: 'video',
            src: homeVideoIds[2],
            alt: keywords.vacuumMachine.others[0],
          }
        ] as Source[]).map((source, index) => (
          <Fragment key={index}>
            <GetPackingMachineStep
              index={index}
              source={source}
            />
          </Fragment>
        ))
      }
    </>
  );
};

export default Use;
