import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import useMediaQuery from '@mui/material/useMediaQuery';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { convertElementToSx } from '@core/utils/themes';
import Link from '@core/components/Link';
import CustomImage from '@core/components/CustomImage';
// import HideOnScroll from '@core/components/HideOnScroll';

import typographies from '@lib/constants/themes/typographies';
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
  const smallBreakpoint = useMediaQuery('(max-width:450px)');

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

  const CartIcon = () => (
    <Badge
      badgeContent={
        <Box
          sx={{
            ...typographies.secondContentHead,
          }}
        >
          {totalQuantity > 9 ? '+9' : totalQuantity}
        </Box>
      }
    >
      <ShoppingCartIcon sx={{ fontSize: smallBreakpoint ? 25: 30 }} />
    </Badge>
  );

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
          <Box
            sx={{
              ...convertElementToSx(themeCustomElements.header.banners.shipping.content),
              px: '5px',
            }}
          >
            <Typography
              variant={smallBreakpoint ? 'body2Head': 'body1Head'}
              textAlign="center"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              lineHeight="18px"
            >
              <LocalShippingIcon
                sx={{
                  ...themeCustomElements.header.banners.shipping.icon,
                  fontSize: smallBreakpoint ? 20 : 25,
                  mr: smallBreakpoint ? '1px' : '5px',
                }} 
              />
              <FormattedMessage id="header.banners.shipping" />
            </Typography>
          </Box> 
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
                size="small"
                component={Link}
                href={pages.home.path}
                sx={{
                  p: 0,
                  pt: smallBreakpoint ? '5px' : '8px',
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
                  height={smallBreakpoint ? '50px' :'70px'}
                  width={smallBreakpoint ? '136px' : '156px'}
                  layout="fixed"
                  objectFit="contain"
                  priority
                />
              </IconButton>
            </Container>
            <Box sx={{ flexGrow: 1 }} />
            {/* Cart Button */}
            { router.pathname === pages.cart.path || router.pathname === pages.checkout.path ?
              <IconButton
                size="large"
                component={Link}
                href={pages.cart.path}
              >
                <CartIcon />
              </IconButton>
              :
              <IconButton
                size="large"
                onClick={handleCartBtnOnClick}
              >
                <CartIcon />
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
        smallBreakpoint={smallBreakpoint}
      />

      <CartDrawer
        anchor="right"
        smallBreakpoint={smallBreakpoint}
      />
    </>
  );
};

export default NavBar;
