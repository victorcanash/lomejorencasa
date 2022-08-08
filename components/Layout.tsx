import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { useAppContext } from '@lib/contexts/AppContext';
import Loading from '@components/Loading';
import Header from '@components/Header';
import Footer from '@components/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
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
                  mt: '50px',
                  mb: '50px',
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

export default Layout;
