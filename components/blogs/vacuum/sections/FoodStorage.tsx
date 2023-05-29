import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Title from '@core/components/ui/Title';
import MultimediaContainer from '@core/components/multimedia/MultimediaContainer';

const FoodStorage = () => {

  return (
    <Container id="foodStorage">
      <Box
        maxWidth="sm"
        m="auto"
      >
        <Title
          type="h2"
          texts={{
            title: {
              id: 'home.foodStorage.title',
            },
          }}
          divider={true}
        />
        <Typography component="div" variant="body1">
          <FormattedMessage id="home.foodStorage.description" />
        </Typography>
        <MultimediaContainer
          type="default"
          source={{ 
            src: 'v1680692948/laenvasadora/HOME%20PAGE/ILUSTRACIONES/cooking-ingredients-32089_hc3pld.png',
            width: '1920',
            height: '960',
          }}
          mt={0}
          borderRadius="0px"
        />
      </Box>
    </Container>
  );
};

export default FoodStorage;
