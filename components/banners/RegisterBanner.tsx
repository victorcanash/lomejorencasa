import { ReactNode } from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { convertElementToSx } from '@core/utils/themes';

import colors from '@lib/constants/themes/colors';
import { themeCustomElements } from '@lib/constants/themes/elements';

type RegisterBannerProps = {
  open: boolean,
  handleBanner: () => void,
  onClickRegister: () => void,
};

const RegisterBanner = (props: RegisterBannerProps) => {
  const { 
    open,
    handleBanner,
    onClickRegister,
  } = props;

  const handleClickLaterBtn = () => {
    handleBanner();
  };

  const handleClickRegisterBtn = () => {
    handleBanner();
    onClickRegister();
  };

  return (
    <Backdrop
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: 'fixed',
        top: '35%',
        width: '100%',
        height: 'min-content',
        padding: '20px 8px 25px 8px',
      }}
      open={open}
    >
      <Box>
        <Box>
          <Typography component='div' variant='h3' textAlign="center" sx={{ mb: 2 }}>
            <FormattedMessage id="banners.register.title" />
          </Typography>
          <Typography component='div' variant='body1' textAlign="center" sx={{ mb: 2 }}>
            <FormattedMessage
              id="banners.register.content"
              values={{
                'activeTxt': (...chunks: ReactNode[]) => (
                  <span style={{ color: colors.text.action, fontWeight: 700 }}>
                    {chunks}
                  </span>
                ),
              }}
            />
          </Typography>
        </Box>
        <Grid
          container
          sx={{
            gap: '15px',
            justifyContent: 'space-around',
          }}
        >
          <Grid item>
            <Button 
              onClick={handleClickRegisterBtn}
              variant="contained"
              sx={{ ...convertElementToSx(themeCustomElements.button.action.primary), }}
            >
              <FormattedMessage id="banners.register.registerBtn" />
            </Button>
          </Grid>
          <Grid item>
            <Button 
              onClick={handleClickLaterBtn}
              variant="contained"
            >
              <FormattedMessage id="banners.register.laterBtn" />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Backdrop>
  );
};

export default RegisterBanner;
