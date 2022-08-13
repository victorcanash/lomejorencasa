import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppContext } from '@lib/contexts/AppContext';

const Loading = () => {
  const { loading } = useAppContext();

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress
        size='60px' 
        sx={{
          color: 'primary.main'
        }}
      />
    </Backdrop>
  );
};

export default Loading;
