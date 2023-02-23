import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Title from '@components/ui/Title';

const HomeIntro = () => {

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
              id: 'home.intro.title',
            },
          }}
          divider={true}
        />
        <Typography component="div" variant="body1">
          <FormattedMessage id="home.intro.description" />
        </Typography>
      </Box>
    </Container>
  );
};

export default HomeIntro;
