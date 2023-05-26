import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';

import Link from '@core/components/Link';
import CustomImage from '@core/components/CustomImage';
// import HideOnScroll from '@core/components/animations/HideOnScroll';
import ShippingBar from '@core/components/NavBar/ShippingBar';

import seoConfig from '@lib/config/next-seo.config';
import { pages } from '@lib/constants/navigation';
import { navbarLogoId } from '@lib/constants/multimedia';
import { useCartContext } from '@lib/contexts/CartContext';
import useNavDrawer from '@lib/hooks/useNavDrawer';
import CartIcon from '@core/components/NavBar/CartIcon';
import NavDrawer from '@core/components/NavBar/NavDrawer';
import CartDrawer from '@core/components/NavBar/CartDrawer';
import { themeCustomElements } from '@lib/constants/themes/elements';

const NavBar = () => {
  const { handleDrawerOpen: handleCartDrawerOpen } = useCartContext();

  const router = useRouter();
  const xsBreakpoint = useMediaQuery('(max-width:318px)');
  const superSmallBreakpoint = useMediaQuery('(max-width:328px)')
  const smallBreakpoint = useMediaQuery('(max-width:450px)');

  const navDrawer = useNavDrawer();

  const handleAppBarOnClick = useCallback(() => {
    navDrawer.close();
  }, [navDrawer]);

  const handleNavBarBtnOnClick = useCallback(() => {
    navDrawer.handleOpen();
  }, [navDrawer]);

  const handleCartBtnOnClick = useCallback(() => {
    handleCartDrawerOpen();
  }, [handleCartDrawerOpen]);

  const minDrawerHeight = useMemo(() => {
    if (xsBreakpoint) {
      return '87px';
    } else if (smallBreakpoint) {
      return '69px';
    }
    return '80px';
  }, [smallBreakpoint, xsBreakpoint]);

  return (
    <>
      {/*<HideOnScroll direction="down">*/}
        <AppBar 
          position="fixed" 
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }} 
          onClick={handleAppBarOnClick}
        >
          {/* ShippingBar */}
          <ShippingBar
            superSmallBreakpoint={superSmallBreakpoint}
            smallBreakpoint={smallBreakpoint}
          />
          {/* NavBar */}
          <Toolbar
            variant="dense"
            disableGutters
          >
            {/* NavDrawer Button */}
            <IconButton
              size="large"
              onClick={handleNavBarBtnOnClick}
            >
              <MenuIcon sx={{ fontSize: smallBreakpoint ? 25: 30 }} />
            </IconButton>
            {/* Logo */}
            <Container
              maxWidth={false}
              disableGutters
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <IconButton
                size="large"
                component={Link}
                href={pages.home.path}
                sx={{
                  p: 0,
                  borderRadius: '10px',
                }}
              >
                { pages.home.path === router.pathname &&
                  <Typography component="h1" variant="h1" sx={{ display: 'none' }}>
                    { seoConfig.home.h1 }
                  </Typography>
                }
                <CustomImage
                  src={navbarLogoId}
                  alt={seoConfig.home.h1}
                  height={smallBreakpoint ? '49px' :'60px'}
                  width={
                    smallBreakpoint ?
                      themeCustomElements.navBar.logo.width.small : themeCustomElements.navBar.logo.width.default
                  }
                  layout="fixed" 
                  objectFit="contain"
                  priority
                />
              </IconButton>
            </Container>
            <Box sx={{ flexGrow: 1 }} />
            {/* Cart Button */}
            { (router.pathname === pages.cart.path || router.pathname === pages.checkout.path) ?
              <IconButton
                size="large"
                component={Link}
                href={pages.cart.path}
              >
                <CartIcon
                  smallBreakpoint={smallBreakpoint}
                />
              </IconButton>
              :
              <IconButton
                size="large"
                onClick={handleCartBtnOnClick}
              >
                <CartIcon
                  smallBreakpoint={smallBreakpoint}
                />
              </IconButton>
            }
          </Toolbar>
        </AppBar>
      {/*</HideOnScroll>*/}

      <NavDrawer
        open={navDrawer.open}
        items={navDrawer.items}
        handleOpen={navDrawer.handleOpen}
        handleCollapse={navDrawer.handleCollapse}
        minHeight={minDrawerHeight}
      />

      <CartDrawer
        minHeight={minDrawerHeight}
      />
    </>
  );
};

export default NavBar;
