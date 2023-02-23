import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Title from '@components/ui/Title';

const HomeWhatIsVacuumPacked = () => {

  return (
    <Container>
      <Box
        sx={{
          maxWidth: '600px',
          m: 'auto',
        }}
      >
        <Title
          type="h2"
          texts={{
            title: {
              id: 'home.whatIsVacuumPacked.title',
            },
          }}
          divider={true}
        />
        <Typography component="div" variant="body1">
          <FormattedMessage id="home.whatIsVacuumPacked.description" />
        </Typography>
      </Box>
    </Container>
  );
};

export default HomeWhatIsVacuumPacked;
