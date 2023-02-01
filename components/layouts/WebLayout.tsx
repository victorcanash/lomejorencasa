import Box from '@mui/material/Box';

import useCookies from '@lib/hooks/useCookies';
import Header from '@components/NavBar';
import Footer from '@components/Footer';

const WebLayout = ({ children }: { children: React.ReactNode }) => {
  const { CookiesBannerComponent } = useCookies();

  return (
    <>
      <Header />
      <Box 
        component="main"
        sx={{
          mt: '74px',
          mb: '48px',
          minHeight: '50vh',
        }}
      >
        {children}
      </Box>
      <Footer />
      <CookiesBannerComponent />
    </>
  )
}

export default WebLayout;
