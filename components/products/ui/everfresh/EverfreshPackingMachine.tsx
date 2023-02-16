import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const EverfreshPackingMachine = () => {

  return (
    <Box
      sx={{
        maxWidth: '600px',
        m: 'auto',
      }}
    >
      <Typography component="h2" variant="h1" align="center" mb={3}>
        <FormattedMessage id="home.packingMachine.title" />
      </Typography>
      <Typography component="div" variant="body1">
        <FormattedMessage id="home.packingMachine.description" />
      </Typography>
    </Box>
  );
};

export default EverfreshPackingMachine;
