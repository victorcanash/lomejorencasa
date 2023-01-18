import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import useCookies from '@lib/hooks/useCookies';
import Header from '@components/NavBar';
import Footer from '@components/Footer';

const WebLayout = ({ children }: { children: React.ReactNode }) => {
  const { CookiesBannerComponent } = useCookies();

  return (
    <>
      <Header />
      <Container 
        component="main"
        sx={{
          mt: 12,
          mb: 6,
          minHeight: '50vh',
        }}
      >
        {children}
      </Container>
      <Footer />
      <CookiesBannerComponent />
    </>
  )
}

export default WebLayout;
