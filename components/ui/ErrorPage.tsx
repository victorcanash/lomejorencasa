import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { RouterPaths } from '@core/constants/navigation';
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
        backgroundColor: 'background.default',
        top: '0px',
        left: '0px',
        zIndex: 10000,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      <Box maxWidth="sm">
        <LinkButton href={RouterPaths.home}>
          Go to the home page
        </LinkButton>
      </Box>
      <ProTip />
      <Copyright />
    </Container>
  );
};

export default ErrorPage;