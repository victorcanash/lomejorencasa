import { ReactNode, useCallback } from 'react';

import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

const MainComponent = ({ children }: { children: ReactNode }) => {
  const xsBreakpoint = useMediaQuery('(max-width:328px)');
  const smallBreakpoint = useMediaQuery('(max-width:450px)');

  const getMarginTop = useCallback(() => {
    if (xsBreakpoint) {
      return '91px';
    } else if (smallBreakpoint) {
      return '75px';
    }
    return '103px';
  }, [smallBreakpoint, xsBreakpoint]);

  return (
    <Box
      component="main"
      sx={{
        marginTop: getMarginTop(),
        marginBottom: '48px',
        minHeight: '51vh',
      }}
    >
      {children}
    </Box>
  );
};

export default MainComponent;
