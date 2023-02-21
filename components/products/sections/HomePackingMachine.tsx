import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Title from '@components/ui/Title';

const HomePackingMachine = () => {

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
            id: 'home.packingMachine.title',
          },
        }}
        divider={true}
      />
      <Typography component="div" variant="body1">
        <FormattedMessage id="home.packingMachine.description" />
      </Typography>
    </Box>
  );
};

export default HomePackingMachine;
