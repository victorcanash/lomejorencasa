import { FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type CookiesBannerProps = {
  open: boolean,
  handleBanner: () => void,
  onRefuse: () => void,
  onAccept: () => void,
};

const CookiesBanner = (props: CookiesBannerProps) => {
  const { 
    open,
    handleBanner,
    onRefuse,
    onAccept,
  } = props;

  const handleClickRefuseBtn = () => {
    handleBanner();
    onRefuse();
  };

  const handleClickAcceptBtn = () => {
    handleBanner();
    onAccept();
  };

  return (
    <Backdrop
      sx={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        color: '#FFFFFF',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        height: '30px',
        position: 'fixed',
        top: 'auto',
        bottom: '0px',
        width: '100%',
        display: 'inline-table',
        padding: '8px 15px 8px 15px',
      }}
      open={open}
    >
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '15px',
        }}
      >
        <Box sx={{ maxWidth: '500px' }}>
          <Typography component='div' variant='h1' sx={{ mb: 1 }}>
            <FormattedMessage id="dialogs.cookies.title" />
          </Typography>
          <Typography component='div' variant='body1'>
            <FormattedMessage id="dialogs.cookies.content"/>
          </Typography>
        </Box>
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            minWidth: '200px',
            gap: '15px',
          }}
        >
          <Button 
            onClick={handleClickAcceptBtn}
            variant="contained"
            sx={{ fontSize: '12px' }}
          >
            <FormattedMessage id="dialogs.cookies.acceptBtn" />
          </Button>
          <Button 
            onClick={handleClickRefuseBtn}
            variant="contained"
            sx={{ fontSize: '12px' }}
          >
            <FormattedMessage id="dialogs.cookies.refuseBtn" />
          </Button>
        </Box>
      </Box>
    </Backdrop>
  );
};

export default CookiesBanner;
