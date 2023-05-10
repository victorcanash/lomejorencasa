import { ChangeEvent, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';

import { convertElementToSx } from '@core/utils/themes';
import Link from '@core/components/Link';

import { themeCustomElements } from '@lib/constants/themes/elements';
import { pages } from '@lib/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';

const CookiesBanner = () => {
  const { openCookiesBanner, setConsentCookies } = useAppContext();

  const [customSection, setCustomSection] = useState(false);
  const [functionalSwitch, setFunctionalSwitch] = useState(true);
  const [analyticSwitch, setAnalyticSwitch] = useState(true);
  const [performanceSwitch, setPerformanceSwitch] = useState(true);
  const [adSwitch, setAdSwitch] = useState(true);
  const [withoutCategorySwitch, setWithoutCategorySwitch] = useState(true);

  const handleClickAcceptBtn = () => {
    setConsentCookies({
      functional: true,
      analytic: true,
      performance: true,
      ad: true,
      withoutCategory: true,
    });
  };

  const handleClickCustomBtn = () => {
    setCustomSection(true);
  };

  const handleClickBackBtn = () => {
    setCustomSection(false);
  };

  const handleClickSaveBtn = () => {
    setConsentCookies({
      functional: functionalSwitch,
      analytic: analyticSwitch,
      performance: performanceSwitch,
      ad: adSwitch,
      withoutCategory: withoutCategorySwitch,
    });
  };

  const handleFunctionalSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFunctionalSwitch(event.target.checked);
  };

  const handleAnalyticSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAnalyticSwitch(event.target.checked);
  };

  const handlePerformanceSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPerformanceSwitch(event.target.checked);
  };

  const handleAdSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAdSwitch(event.target.checked);
  };

  const handleWithoutCategorySwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWithoutCategorySwitch(event.target.checked);
  };

  const CookiesType = (props: {
    textId: string,
    disabled?: boolean,
    checked?: boolean,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  }) => (
    <>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} >
          <Typography component="div" variant="body1Head">
            <FormattedMessage id={`banners.cookies.custom.${props.textId}.title`} />
          </Typography>
        </Box>
        <Switch
          checked={!props.disabled ? props.checked : true}
          disabled={props.disabled}
          onChange={props.onChange}
        />
      </Stack>
      <Typography component='div' variant='body2'>
        <FormattedMessage id={`banners.cookies.custom.${props.textId}.content`} />
      </Typography>
    </>
  );

  return (
    <Backdrop
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: 'fixed',
        top: 'auto',
        bottom: '0px',
        width: '100%',
      }}
      open={openCookiesBanner}
    >
      { !customSection ?
        <Grid
          container
          flexWrap="wrap"
          justifyContent="space-around"
          spacing={1}
          p={2}
        >
          <Grid
            item
            xs={12}
            sm={6}
          >
            <Typography component='div' variant='body1Head' sx={{ mb: 1 }}>
              <FormattedMessage id="banners.cookies.title" />
            </Typography>
            <Typography component='div' variant='body2'>
              <FormattedMessage id="banners.cookies.content" />
            </Typography>
            <Link href={pages.cookies.path} variant="body2" color="inherit" target="_blank">
              <FormattedMessage id="footer.utility.cookies" />
            </Link>
          </Grid>
          <Grid 
            item
            xs={12}
            sm={6}
            md_lg={4}
            xl={3}
            container
            flexWrap="wrap"
            justifyContent="center"
            alignContent="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Button
                onClick={handleClickAcceptBtn}
                variant="contained"
                fullWidth
                sx={convertElementToSx(themeCustomElements.button.acceptCookies)}
              >
                <Typography component='div' variant='body1Head'>
                  <FormattedMessage id="banners.cookies.acceptBtn" />
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button 
                onClick={handleClickCustomBtn}
                variant="contained"
                fullWidth
              >
                <Typography component='div' variant='body1Head'>
                  <FormattedMessage id="banners.cookies.customBtn" />
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        :
        <Box
          sx={{
            maxHeight: !customSection ? 'auto' : '500px',
            overflowY: !customSection ? 'visible' : 'scroll',
            p: 2,
          }}
        >
          {/* Description */}
          <Button 
            onClick={handleClickBackBtn}
            variant="contained"
          >
            <Typography component='div' variant='body2Head'>
              <FormattedMessage id="banners.cookies.backBtn" />
            </Typography>
          </Button>
          <Typography component='div' variant='body1Head' sx={{ mt: 2, mb: 1 }}>
            <FormattedMessage id="banners.cookies.custom.title" />
          </Typography>
          <Typography component='div' variant='body2'>
            <FormattedMessage id="banners.cookies.custom.content" />
          </Typography>
          <Link href={pages.cookies.path} variant="body2" color="inherit" target="_blank">
            <FormattedMessage id="footer.utility.cookies" />
          </Link>
          <Box mt={1}/>
          {/* Cookies Types */}
          <CookiesType
            textId="essential"
            disabled={true}
          />
          <CookiesType
            textId="functional"
            checked={functionalSwitch}
            onChange={handleFunctionalSwitchChange}
          />
          <CookiesType
            textId="analytic"
            checked={analyticSwitch}
            onChange={handleAnalyticSwitchChange}
          />
          <CookiesType
            textId="performance"
            checked={performanceSwitch}
            onChange={handlePerformanceSwitchChange}
          />
          <CookiesType
            textId="ad"
            checked={adSwitch}
            onChange={handleAdSwitchChange}
          />
          <CookiesType
            textId="withoutCategory"
            checked={withoutCategorySwitch}
            onChange={handleWithoutCategorySwitchChange}
          />
          {/* Buttons */}
          <Grid 
            container
            direction="column"
            flexWrap="nowrap"
            justifyContent="center"
            alignContent="center"
            spacing={2}
            mt={0.5}
          >
            <Grid item xs={12}>
              <Button 
                onClick={handleClickAcceptBtn}
                variant="contained"
                fullWidth
                sx={convertElementToSx(themeCustomElements.button.acceptCookies)}
              >
                <Typography component='div' variant='body1Head'>
                  <FormattedMessage id="banners.cookies.acceptBtn" />
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button 
                onClick={handleClickSaveBtn}
                variant="contained"
                fullWidth
              >
                <Typography component='div' variant='body1Head'>
                  <FormattedMessage id="banners.cookies.custom.saveBtn" />
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      }
    </Backdrop>
  );
};

export default CookiesBanner;
