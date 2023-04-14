import { ReactNode } from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';

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
          <Typography component='div' variant='h3' sx={{ mb: 1 }}>
            <FormattedMessage id="banners.cookies.title" />
          </Typography>
          <Typography component='div' variant='body1'>
            <FormattedMessage
              id="banners.cookies.content"
              values={{
                'link': (...chunks: ReactNode[]) => (
                  <Link href={pages.cookies.path} color="inherit">
                    {chunks}
                  </Link>
                ),
              }}
            />
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
          >
            <FormattedMessage id="banners.cookies.acceptBtn" />
          </Button>
          <Button 
            onClick={handleClickRefuseBtn}
            variant="contained"
          >
            <FormattedMessage id="banners.cookies.refuseBtn" />
          </Button>
        </Box>
      </Box>
    </Backdrop>
  );
};

export default CookiesBanner;
