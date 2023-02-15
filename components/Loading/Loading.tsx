import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppContext } from '@lib/contexts/AppContext';

const Loading = () => {
  const { loading } = useAppContext();

  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.modal + 5 }}
      open={loading}
    >
      <CircularProgress
        size='60px' 
        sx={{
          color: 'secondary.main'
        }}
      />
    </Backdrop>
  );
};

export default Loading;
