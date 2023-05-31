import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import LinkButton from '@core/components/inputs/LinkButton';

import { pages } from '@lib/config/navigation.config';
import Title from '@core/components/ui/Title';

const WhatIsVacuumPacked = () => {

  return (
    <Container id="whatIsVacuumPacked">
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

        <Typography variant="body1" sx={{ mb: 4 }}>
          <FormattedMessage id="home.whatIsVacuumPacked.description" />
        </Typography>

        <LinkButton
          href={pages.faq.path}
          customtype="actionPrimary"
        >
          <FormattedMessage
            id="home.whatIsVacuumPacked.faqBtn"
          />
        </LinkButton>
      </Box>
    </Container>
  );
};

export default WhatIsVacuumPacked;
