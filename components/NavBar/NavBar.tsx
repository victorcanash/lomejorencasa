import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { convertElementToSx } from '@core/utils/themes';
import Link from '@core/components/Link';
import CustomImage from '@core/components/CustomImage';
// import HideOnScroll from '@core/components/HideOnScroll';

import { pages } from '@lib/constants/navigation';
import { navbarLogoId } from '@lib/constants/multimedia';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { useCartContext } from '@lib/contexts/CartContext';
import useNavDrawer from '@lib/hooks/useNavDrawer';
import NavDrawer from '@components/NavBar/NavDrawer';
import CartDrawer from '@components/NavBar/CartDrawer';

const NavBar = () => {
  const { totalQuantity, handleDrawerOpen: handleCartDrawerOpen } = useCartContext();

  const router = useRouter();

  const navDrawer = useNavDrawer();

  const handleAppBarOnClick = () => {
    navDrawer.close();
  };

  const handleNavBarBtnOnClick = () => {
    navDrawer.handleOpen();
  };

  const handleCartBtnOnClick = () => {
    handleCartDrawerOpen();
  };

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
          {/* Shipping Banner */}
          <Grid
            container
            wrap="nowrap"
            alignItems="center"
            justifyContent="center"
            py="0px"
            px="12px"
            sx={convertElementToSx(themeCustomElements.header.banners.shipping.content)}
          >
            <Grid item mr={1}>
              <LocalShippingIcon
                sx={{
                  ...themeCustomElements.header.banners.shipping.icon,
                  fontSize: 30, 
                  mt: '5px',
                }} 
              />
            </Grid>
            <Grid item>
              <Typography
                component="div"
                sx={convertElementToSx(themeCustomElements.header.banners.shipping.content)}
              >
                <FormattedMessage id="header.banners.shipping" />
              </Typography>
            </Grid>
          </Grid> 
          {/* NavBar */}
          <Toolbar 
            variant="dense" 
            disableGutters
          >
            {/* NavDrawer Button */}
            <IconButton
              size="large"
              onClick={handleNavBarBtnOnClick}
              sx={{ mr: 1 }}
            >
              <MenuIcon sx={{ fontSize: 30 }} />
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
                size="small"
                component={Link}
                href={pages.home.path}
                sx={{
                  p: 0,
                  pt: 1,
                  borderRadius: '10px',
                }}
              >
                { pages.home.filepath === router.pathname &&
                  <Typography component="h1" variant="h1" sx={{ display: 'none' }}>
                    <FormattedMessage id="home.h1" />
                  </Typography>
                }
                <CustomImage
                  src={navbarLogoId}
                  alt="Logo"
                  height="70px"
                  width="156px"
                  layout="fixed"
                  objectFit="cover"
                  priority
                />
              </IconButton>
            </Container>
            <Box sx={{ flexGrow: 1 }} />
            {/* Cart Button */}
            { router.pathname === pages.cart.path || router.pathname === pages.checkout.path ?
              <IconButton
                size='large'
                component={Link}
                href={pages.cart.path}
                sx={{ ml: 1 }}
              >
                <Badge badgeContent={totalQuantity > 9 ? '+9' : totalQuantity}>
                  <ShoppingCartIcon sx={{ fontSize: 30 }} />
                </Badge>
              </IconButton>
              :
              <IconButton
                size='large'
                onClick={handleCartBtnOnClick}
                sx={{ ml: 1 }}
              >
                <Badge badgeContent={totalQuantity > 9 ? '+9' : totalQuantity}>
                  <ShoppingCartIcon sx={{ fontSize: 30 }} />
                </Badge>
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
      />

      <CartDrawer
        anchor="right"
      />
    </>
  );
};

export default NavBar;
