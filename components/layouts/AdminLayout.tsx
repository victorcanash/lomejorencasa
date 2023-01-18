import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Header from '@components/NavBar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

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
    </>
  )
}

export default AdminLayout;
