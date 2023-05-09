import { ReactNode } from 'react';

import Box from '@mui/material/Box';

import { useAppContext } from '@lib/contexts/AppContext';
import useApp from '@lib/hooks/useApp';
import useLayout from '@lib/hooks/useLayout';
import Loading from '@components/ui/Loading';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { loading } = useAppContext();

  const { layout, pageType } = useLayout(children);
  const app = useApp(pageType);

  return (
    <Box sx={{ whiteSpace: 'pre-line' }}>
      <Loading open={loading} />
      { layout }
    </Box>
  );
};

export default MainLayout;
