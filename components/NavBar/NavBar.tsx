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

import { keywords } from '@lib/config/next-seo.config';
import { pages } from '@lib/constants/navigation';
import { navbarLogoId } from '@lib/constants/multimedia';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { useCartContext } from '@lib/contexts/CartContext';
import useNavDrawer from '@lib/hooks/useNavDrawer';
import CartIcon from '@components/NavBar/CartIcon';
import NavDrawer from '@components/NavBar/NavDrawer';
import CartDrawer from '@components/NavBar/CartDrawer';

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
            themeElementContent={themeCustomElements.navBar?.shippingBar?.content}
            themeElementIcon={themeCustomElements.navBar?.shippingBar?.icon}
            text={{ id: 'header.banners.shipping' }}
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
                { pages.home.filepath === router.pathname &&
                  <Typography component="h1" variant="h1" sx={{ display: 'none' }}>
                    { keywords.vacuumMachine.main }
                  </Typography>
                }
                <CustomImage
                  src={navbarLogoId}
                  alt={keywords.vacuumMachine.main}
                  height={smallBreakpoint ? '40px' :'60px'}
                  width={smallBreakpoint ? '126px' : '146px'}
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
        anchor="left"
        open={navDrawer.open}
        items={navDrawer.items}
        handleOpen={navDrawer.handleOpen}
        handleCollapse={navDrawer.handleCollapse}
        minHeight={minDrawerHeight}
      />

      <CartDrawer
        anchor="right"
        minHeight={minDrawerHeight}
      />
    </>
  );
};

export default NavBar;
