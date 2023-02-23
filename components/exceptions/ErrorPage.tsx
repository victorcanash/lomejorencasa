import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import LinkButton from '@core/components/LinkButton';
import { pages } from '@lib/constants/navigation';

type ErrorPageProps = {
  title: string,
};

const ErrorPage = (props: ErrorPageProps) => {
  const { title } = props;

  return (
    <Box
      sx={{
        height: '330px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1" component="h1" mb={2}>
        {title}
      </Typography>
      <Box maxWidth="sm">
        <LinkButton href={pages.home.path}>
          <FormattedMessage 
            id="app.exploreBtn" 
          />
        </LinkButton>
      </Box>
    </Box>
  );
};

export default ErrorPage;
