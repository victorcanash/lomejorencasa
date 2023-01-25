import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import LinkButton from '@core/components/LinkButton';
import { pages } from '@lib/constants/navigation';

type ErrorPageProps = {
  title: string,
};

const ErrorPage = (props: ErrorPageProps) => {
  const { title } = props;

  return (
    <Container 
      maxWidth={false}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        {title}
      </Typography>
      <Box maxWidth="sm">
        <LinkButton href={pages.home.path}>
          <FormattedMessage 
            id="app.exploreBtn" 
          />
        </LinkButton>
      </Box>
    </Container>
  );
};

export default ErrorPage;
