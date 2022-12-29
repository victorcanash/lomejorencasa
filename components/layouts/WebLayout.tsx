import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import useCookies from '@lib/hooks/useCookies';
import Header from '@components/NavBar';
import Footer from '@components/Footer';

const WebLayout = ({ children }: { children: React.ReactNode }) => {
  const { CookiesConsent } = useCookies();

  return (
    <>
      <Header />
      <Container 
        component="main"
      >
        <Box
          sx={{
            mt: 10,
            mb: 4,
          }}
        >
          {children}
        </Box>
      </Container>
      <Footer />
      <CookiesConsent />
    </>
  )
}

export default WebLayout;
