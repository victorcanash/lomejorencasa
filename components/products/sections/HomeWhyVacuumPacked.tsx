import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Title from '@components/ui/Title';

const HomeWhyVacuumPacked = () => {

  return (
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
            id: 'home.whyVacuumPacked.title',
          },
        }}
        divider={true}
      />
      <Typography component="div" variant="body1">
        <FormattedMessage id="home.whyVacuumPacked.description.1" />
      </Typography>
      <Typography component="div" variant="body1">
        <FormattedMessage id="home.whyVacuumPacked.description.2" />
      </Typography>
      <Typography component="div" variant="body1">
        <FormattedMessage id="home.whyVacuumPacked.description.3" />
      </Typography>
    </Box>
  );
};

export default HomeWhyVacuumPacked;
