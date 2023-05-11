import { FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { firstBuyDiscountPercent } from '@core/constants/payments';
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
        top: '50%',
        transform: 'translateY(-50%)',
        width: '100%',
        height: 'min-content',
        px: 1,
        py: 2,
        backgroundColor: 'rgb(0 0 0 / 90%)',
        boxShadow: 3,
      }}
      open={open}
    >
      <Box>
        <Box>
          <Typography
            component='div'
            variant='h3'
            textAlign="center"
            sx={{ mb: 3 }}
          >
            <FormattedMessage id="banners.register.title" />
          </Typography>
          <Grid
            container
            justifyContent="center"
          >
            <Grid item>
              <Typography
                component='div'
                variant='h3'
                textAlign="center"
                sx={{ textTransform: 'uppercase', mb: 2 }}
              >
                <FormattedMessage
                  id="banners.register.content.register"
                />
              </Typography>
              <Typography
                component='div'
                variant='h3'
                textAlign="center"
                sx={{
                  textTransform: 'uppercase',
                  color: colors.text.action,
                  fontWeight: 700,
                  fontSize: '60px',
                  mb: 2,
                }}
              >
                {`-${firstBuyDiscountPercent}%`}
              </Typography>
              <Typography
                component='div'
                variant='h3'
                textAlign="center"
                sx={{ textTransform: 'uppercase', mb: 3 }}
              >
                <FormattedMessage
                  id="banners.register.content.order"
                />
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          direction="column"
          flexWrap="nowrap"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Button 
              onClick={handleClickRegisterBtn}
              variant="contained"
              sx={convertElementToSx(themeCustomElements.button.action.primary)}
            >
              <FormattedMessage id="banners.register.registerBtn" />
            </Button>
          </Grid>
          <Grid item xs={12}>
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