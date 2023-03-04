import { ReactNode } from 'react';

import Box from '@mui/material/Box';

import useCookies from '@lib/hooks/useCookies';
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import MaintenanceBanner from '@components/banners/MaintenanceBanner';

const WebLayout = ({ children }: { children: ReactNode }) => {
  const { CookiesBanner } = useCookies();

  return (
    <>
      <NavBar />
      <Box component="main">
        {children}
      </Box>
      <Footer />
      <CookiesBanner />
      <MaintenanceBanner />
    </>
  );
};

export default WebLayout;
