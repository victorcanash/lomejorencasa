import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Header from '@components/NavBar';
import Footer from '@components/Footer';

const WebLayout = ({ children }: { children: React.ReactNode }) => {

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
    </>
  )
}

export default WebLayout;
