import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Copyright from '@core/components/Copyright';

const Footer = () => {
  return (
    <Box
      component="footer"
      color="primary"
      sx={{
        py: 3,
        px: 2,
        backgroundColor: 'primary.main'
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          My sticky footer can be found here.
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footer;