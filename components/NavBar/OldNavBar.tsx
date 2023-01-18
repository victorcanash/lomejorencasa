import Image from 'next/image';

import { useIntl } from 'react-intl';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { pages } from '@core/config/navigation.config';
//import { Drawers } from '@lib/constants/header';
import HideOnScroll from '@core/components/HideOnScroll';
import Link from '@core/components/Link';
import { useSearchContext } from '@lib/contexts/SearchContext';
import { useCartContext } from '@lib/contexts/CartContext';
import useDrawer from '@lib/hooks/useDrawer';
import SearchBar from '@components/NavBar/SearchBar';
import Drawer from '@components/NavBar/Drawer';
import logo from 'public/images/lanus-logo.svg';

const OldNavBar = () => {
  const { getHref } = useSearchContext();
  const { totalQuantity } = useCartContext();

  const intl = useIntl();

  /*const userDrawer = useDrawer(Drawers.userDrawer);
  const categoriesDrawer = useDrawer(Drawers.appDrawer);

  const handleUserDrawer = () => {
    userDrawer.setOpen(!userDrawer.open);
  };
  const handleCategoriesDrawer = () => {
    categoriesDrawer.setOpen(!categoriesDrawer.open);
  };
  const closeDrawers = () => {
    if (userDrawer.open) {
      userDrawer.setOpen(false);
    }
    else if (categoriesDrawer.open) {
      categoriesDrawer.setOpen(false);
    }
  }*/

  return (
    <Box component="header">

      <HideOnScroll direction="down">
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'primary.main' }} /*onClick={closeDrawers}*/>
          <Toolbar variant="dense">

            <Tooltip title={intl.formatMessage({ id: 'header.tooltips.logo' })}>
              <IconButton
                sx={{ p: 0 }}
                size='large'
                color='inherit'
                component={Link}
                href={pages.home.path}
              >
                <Image
                  src={logo}
                  alt="Logo"
                  width="64"
                  height="64"
                  layout="fixed"
                  objectFit="cover"
                  priority
                />
              </IconButton>
            </Tooltip>

            {/*<Tooltip 
              title={
                categoriesDrawer.open ? 
                  intl.formatMessage({ id: 'header.tooltips.hideCategoriesMenu' }) :
                  intl.formatMessage({ id: 'header.tooltips.showCategoriesMenu' })
              }
            >
              <Box
                sx={{
                  display: { xs: 'flex', md: 'none' },
                }}
              >
                <IconButton
                  size="large"
                  color="inherit"
                  aria-controls={Drawers.appDrawer}
                  aria-haspopup="true"
                  sx={{ mx: 1 }}
                  onClick={handleCategoriesDrawer}
                >
                  <MenuIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </Box>
            </Tooltip>*/}
            {/*<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {categoriesDrawer.items.map((category) => (
                <Tooltip 
                  key={category.textId}
                  title={intl.formatMessage({ id: 'header.tooltips.category' }, { name: category.textId })}
                >
                  <Button
                    component={Link}
                    href={getHref(category.textId)}
                    sx={{
                      color: 'text.disabled',
                      '&.active': { color: 'text.primary' },
                      '&:hover': { color: 'text.primary' },
                    }}
                  >
                    {category.textId}
                  </Button>
                </Tooltip>
              ))}
            </Box>*/}

            <Container maxWidth='xs' disableGutters>
              <SearchBar />
            </Container>

            <Box sx={{ flexGrow: 1 }} />

            <Tooltip title={intl.formatMessage({ id: 'header.tooltips.cart' })}>
              <IconButton
                sx={{ mx: 1 }}
                size='large'
                color='inherit'
                component={Link}
                href={pages.cart.path}
              >
                <Badge badgeContent={totalQuantity > 9 ? '+9' : totalQuantity} color='error'>
                  <ShoppingCartIcon sx={{ fontSize: 30 }} />
                </Badge>
              </IconButton>
            </Tooltip>

            {/*<Tooltip 
              title={
                userDrawer.open ? 
                  intl.formatMessage({ id: 'header.tooltips.hideUserMenu' }) :
                  intl.formatMessage({ id: 'header.tooltips.showUserMenu' })
              }
            >
              <IconButton
                size="large"
                aria-controls={Drawers.userDrawer}
                aria-haspopup="true"
                onClick={handleUserDrawer}
                color="inherit"
              >
                <AccountCircle sx={{ fontSize: 30 }} />
              </IconButton>
            </Tooltip>*/}

          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/*<Drawer
        key={Drawers.userDrawer}
        id={Drawers.userDrawer}
        anchor={'right'}
        open={userDrawer.open}
        handleDrawer={handleUserDrawer}
      />
      <Drawer
        key={Drawers.appDrawer}
        id={Drawers.appDrawer}
        anchor={'left'}
        open={categoriesDrawer.open}
        handleDrawer={handleCategoriesDrawer}
      />*/}

    </Box>
  );
};

export default OldNavBar;
