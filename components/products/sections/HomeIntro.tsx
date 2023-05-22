import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const HomeIntro = () => {

  return (
    <Container id="intro">
      <Box
        maxWidth="sm"
        m="auto"
      >
        <Typography component="div" variant="body1">
          <FormattedMessage id="home.intro.description" />
        </Typography>
      </Box>
    </Container>
  );
};

export default HomeIntro;
