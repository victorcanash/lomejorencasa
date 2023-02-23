import Box from '@mui/material/Box';

import Header from '@components/NavBar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <Header />
      <Box 
        component="main"
        sx={{
          mt: '74px',
          mb: '48px',
          minHeight: '51vh',
        }}
      >
        {children}
      </Box>
    </>
  )
}

export default AdminLayout;
