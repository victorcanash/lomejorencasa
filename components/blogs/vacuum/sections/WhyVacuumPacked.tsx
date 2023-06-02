import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CustomImage from '@core/components/multimedia/CustomImage';
import colors from '@lib/config/theme/colors';
import Title from '@core/components/ui/Title';

const WhyVacuumPacked = () => {

  return (
    <>
      <Container id="whyVacuumPacked">
        <Box
          maxWidth="sm"
          m="auto"
        >
          <Title
            type="h2"
            texts={{
              title: {
                id: 'home.whyVacuumPacked.title',
              },
            }}
            divider={true}
          />

          <Typography component="div" variant="body1">
            <FormattedMessage id="home.whyVacuumPacked.description.1" />
          </Typography>
        </Box>
      </Container>

      <Grid 
        container
        maxWidth="sm"
        m="auto"
        mt={1} 
        rowSpacing={3}
        wrap="wrap"
        justifyContent="space-between"
      >

        <Grid item xs={7} xs_sm={7}>
          <Box 
            sx={{
              backgroundColor: colors.background.secondary,
              borderRadius: '0px 45px 45px 0px',
              width: '268px',
              mr: 'auto',
              py: 3,
              pr: 3,
              pl: 4,
            }}
          >
            <Typography component="div" variant="body1">
              <FormattedMessage id="home.whyVacuumPacked.description.2" />
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={5} xs_sm={5}>
          <Box
            sx={{
              width: '100%',
              maxWidth: '250px',
              mr: 'auto',
            }}
          >
            <CustomImage
              src="v1680692951/laenvasadora/HOME%20PAGE/ILUSTRACIONES/microscope-2223268_cg117w.png"
              width="5000"
              height="5000"
              layout="responsive"
              objectFit="cover"
            />
          </Box>
        </Grid>
        <Grid item xs={4} xs_sm={4}>
          <Box
            sx={{
              width: '100%',
              maxWidth: '200px',
              ml: 2,
            }}
          >
            <CustomImage
              src="v1680692948/laenvasadora/HOME%20PAGE/ILUSTRACIONES/cabbage-37897_w951pv.png"
              width="1920"
              height="1771"
              layout="responsive"
              objectFit="cover"
            />
          </Box>
        </Grid>
        <Grid item xs={8} xs_sm={8}>
          <Box 
            sx={{
              backgroundColor: colors.background.third,
              borderRadius: '45px 0px 0px 45px',
              width: '268px',
              ml: 'auto',
              py: 3,
              pr: 4,
              pl: 3,
            }}
          >
            <Typography component="div" variant="body1">
              <FormattedMessage id="home.whyVacuumPacked.description.3" />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default WhyVacuumPacked;
