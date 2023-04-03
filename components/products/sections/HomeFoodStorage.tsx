import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Title from '@components/ui/Title';
import MultimediaContainer from '@components/multimedia/MultimediaContainer';
import food_storage from 'public/images/home/food-storage.png';

const HomeFoodStorage = () => {

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
            src: food_storage,
            alt: 'Food storage',
          }}
          mt={0}
          borderRadius="0px"
        />
      </Box>
    </Container>
  );
};

export default HomeFoodStorage;
