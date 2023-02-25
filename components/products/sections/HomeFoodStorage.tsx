import Image from 'next/image';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Title from '@components/ui/Title';
import food_storage from 'public/images/home/food-storage.png';

const HomeFoodStorage = () => {

  return (
    <Container>
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
        <Box>
          <Image
            src={food_storage} 
            alt="Food storage" 
            layout="responsive" 
            objectFit="cover"
            quality="100"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HomeFoodStorage;
