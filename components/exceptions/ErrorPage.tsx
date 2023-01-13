import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { pages } from '@core/config/navigation.config';
import LinkButton from '@core/components/LinkButton';
import ProTip from '@components/ui/ProTip';
import Copyright from '@components/ui/Copyright';

type ErrorPageProps = {
  title: string,
};

const ErrorPage = (props: ErrorPageProps) => {
  const { title } = props;

  return (
    <Container 
      maxWidth={false}
      className="centeredPage"
      sx={{
        top: '0px',
        left: '0px',
        zIndex: 10000,
      }}
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
      <ProTip />
      <Copyright />
    </Container>
  );
};

export default ErrorPage;
