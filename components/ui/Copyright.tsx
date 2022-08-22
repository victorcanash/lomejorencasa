import Typography from '@mui/material/Typography';

import Link from '@core/components/Link';

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.primary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
