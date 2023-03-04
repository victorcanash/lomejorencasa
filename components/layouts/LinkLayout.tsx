import { ReactNode } from 'react';

import Box from '@mui/material/Box';

const LinkLayout = ({ children }: { children: ReactNode }) => {

  return (
    <>
      <Box component="main">
        {children}
      </Box>
    </>
  );
};

export default LinkLayout;
