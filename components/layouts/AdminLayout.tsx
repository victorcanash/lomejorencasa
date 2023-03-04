import { ReactNode } from 'react';

import Box from '@mui/material/Box';

import NavBar from '@components/NavBar';

const AdminLayout = ({ children }: { children: ReactNode }) => {

  return (
    <>
      <NavBar />
      <Box component="main">
        {children}
      </Box>
    </>
  );
};

export default AdminLayout;
