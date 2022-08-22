import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import Copyright from '@components/ui/Copyright';

const Footer = () => {
  return (
    <>
    <Divider />
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          My sticky footer can be found here.
        </Typography>
        <Copyright />
      </Container>
    </Box>
    </>
  );
}

export default Footer;
