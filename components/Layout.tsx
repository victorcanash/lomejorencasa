import React from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { useAppContext } from '@lib/contexts/AppContext';
import { Loading } from '@components/Loading';
import { Header } from '@components/navbar/Header';
import { Footer } from '@components/Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { initialized, loading } = useAppContext();
 
  return (
    <>
      {
        loading &&
          <Loading />
      }

      {
        initialized &&
          <>
            <Header />
            <Container component="main" maxWidth="lg">
              <Box
                sx={{
                  marginTop: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {children}
              </Box>
            </Container>
            <Footer />
          </>
      }
    </>
  )
}