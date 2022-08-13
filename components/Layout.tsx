import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Loading from '@components/Loading';
import Header from '@components/Header';
import Footer from '@components/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <Loading />

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
  )
}

export default Layout;
