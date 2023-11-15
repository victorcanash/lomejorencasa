import { useCallback, Fragment } from 'react'

import { FormattedMessage } from 'react-intl'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import type { FormatText } from '@core/types/texts'
import type { Source } from '@core/types/multimedia'
import type { Landing } from '@core/types/products'
import { useProductsContext } from '@core/contexts/ProductsContext'
import LinkButton from '@core/components/inputs/LinkButton'
import CustomImage from '@core/components/multimedia/CustomImage'
import MultimediaContainer from '@core/components/multimedia/MultimediaContainer'
import Title from '@core/components/ui/Title'

import { keywords } from '@lib/config/next-seo.config'

interface UseProps {
  landingVacuumBags: Landing
}

const Use = (props: UseProps) => {
  const {
    landingVacuumBags
  } = props

  const { getItemPath } = useProductsContext()

  const Subtitle = useCallback((props: { type: 'h3' | 'h4', text: FormatText }) => {
    const { type, text } = props
    return (
      <Box
        sx={{
          width: 'fit-content',
          backgroundColor: type === 'h3' ? '#E9D9B1' : '#E5ECDC',
          borderRadius: '0px 15px 15px 0px',
          my: 4,
          ml: -3,
          p: 3
        }}
      >
        { (text.id != null) &&
          <Typography
            component={type}
            variant={type}
            align={text.textAlign}
          >
            <FormattedMessage id={text.id} values={text.values} />
          </Typography>
        }
      </Box>
    )
  }, [])

  const GetPackingMachineStep = useCallback((props: { index: number, source: Source }) => {
    const { index, source } = props
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
                  step: index + 1
                }
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
    )
  }, [Subtitle])

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
                id: 'home.use.title'
              }
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
              id: 'home.use.foodPreparation.title'
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
            xl: '40%'
          },
          zIndex: 1,
          mt: -3
        }}
      >
        <CustomImage
          src="v1681039776/laenvasadora/HOME%20PAGE/PNG%20IMPLEMENTATION/ENVASADORA_DETALLE_RECORTADA_PNG_akl9k9.png"
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
          src: 'v1680692841/laenvasadora/HOME%20PAGE/IMAGENES/food-2203697_1920_wmfmge.jpg'
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
              id: 'home.use.bagSelection.title'
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
          src: 'v1680692912/laenvasadora/HOME%20PAGE/PNG%20IMPLEMENTATION/bolsas_recortada_png_oojva7.png',
          alt: keywords.vacuumBags.others[0],
          width: '8001',
          height: '2800'
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
              id: 'home.use.bagSelection.sizes.title'
            }}
          />
          <MultimediaContainer
            mt={-4}
            type="default"
            source={{
              src: 'laenvasadora/LANDING%20PAGE/Grafico-bolsas-letras-grandes_d8pl7r.jpg',
              alt: keywords.vacuumBags.others[0],
              width: '1080',
              height: '1080'
            }}
            borderRadius="0px"
            maxWidth="xs_sm"
          />
          <LinkButton
            href={getItemPath(landingVacuumBags)}
            id="advantages"
            customtype="actionPrimary"
            sx={{
              mt: 4
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
              id: 'home.use.packingMachine.title'
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
            src: 'v1680692801/laenvasadora/HOME%20PAGE/VIDEOS/GIF_FINAL_HOME_PAGE_rkoiwb.mp4',
            alt: keywords.vacuumMachine.others[1]
          },
          {
            type: 'image',
            src: 'v1680692930/laenvasadora/HOME%20PAGE/IMAGENES/Foto_valvula_m%C3%A1s_resultona_kzvwfm.jpg',
            alt: keywords.vacuumBags.main
          },
          {
            type: 'video',
            src: 'v1680692799/laenvasadora/HOME%20PAGE/VIDEOS/PASO_3_GUIA_DE_USO_utlcnx.mp4',
            alt: keywords.vacuumMachine.others[0]
          },
          {
            type: 'video',
            src: 'v1680692696/laenvasadora/LANDING%20PAGE/VIDEO_SUCCION_RESUBIDO_shudab.mp4',
            alt: keywords.vacuumMachine.others[0]
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
  )
}

export default Use
