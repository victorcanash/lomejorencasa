import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const EverfreshIntro = () => {

  return (
    <Box
      sx={{
        maxWidth: '600px',
        m: 'auto',
      }}
    >
      <Typography component={"h2"} variant={"h1"} sx={{ mb: 3, textAlign: 'center' }}>
        <FormattedMessage id="home.intro.title" />
      </Typography>
      <Typography component="div" variant="body1">
        <FormattedMessage id="home.intro.description" />
      </Typography>
    </Box>
  );
};

export default EverfreshIntro;
