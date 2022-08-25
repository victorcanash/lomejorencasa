import Image from 'next/image';

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

import { RouterPaths } from '@core/constants/navigation';
import { Drawers } from '@core/constants/header';
import HideOnScroll from '@core/components/HideOnScroll';
import Link from '@core/components/Link';
import { useSearchContext } from '@lib/contexts/SearchContext';
import { useCartContext } from '@lib/contexts/CartContext';
import useDrawer from '@lib/hooks/useDrawer';
import SearchBar from '@components/NavBar/SearchBar';
import Drawer from '@components/NavBar/Drawer';
import logo from 'public/images/lanus-logo.svg';

const NavBar = () => {
  const { totalQuantity } = useCartContext();

  const { getHref } = useSearchContext();
  const userDrawer = useDrawer(Drawers.userDrawer);
  const categoriesDrawer = useDrawer(Drawers.categoriesDrawer);

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
  }

  return (
    <Box component="header">

      <HideOnScroll direction="down">
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'primary.main' }} onClick={closeDrawers}>
          <Toolbar variant="dense">

          <IconButton
            sx={{ p: 0 }}
            aria-label='cart'
            size='large'
            color='inherit'
            component={Link}
            href={RouterPaths.home}
          >
            <Image
              src={logo}
              alt="Logo"
              width="64"
              height="64"
              layout="fixed"
              objectFit="cover"
            />
          </IconButton>

            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <IconButton
                size="large"
                color="inherit"
                aria-label="categories menu"
                aria-controls={Drawers.categoriesDrawer}
                aria-haspopup="true"
                sx={{ mx: 1 }}
                onClick={handleCategoriesDrawer}
              >
                <MenuIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {categoriesDrawer.items.map((category) => (
                <Button
                  key={category.text}
                  component={Link}
                  href={getHref(category.text)}
                  sx={{
                    color: 'text.disabled',
                    '&.active': { color: 'text.primary' },
                    '&:hover': { color: 'text.primary' },
                  }}
                >
                  {category.text}
                </Button>
              ))}
            </Box>

            <Container maxWidth='xs' disableGutters>
              <SearchBar />
            </Container>

            <Box sx={{ flexGrow: 1 }} />

            <Tooltip title='Show cart'>
              <IconButton
                sx={{ mx: 1 }}
                aria-label='cart'
                size='large'
                color='inherit'
                component={Link}
                href={RouterPaths.cart}
              >
                <Badge badgeContent={totalQuantity} color='error'>
                  <ShoppingCartIcon sx={{ fontSize: 30 }} />
                </Badge>
              </IconButton>
            </Tooltip>

            <IconButton
              size="large"
              aria-label="open user drawer"
              aria-controls={Drawers.userDrawer}
              aria-haspopup="true"
              onClick={handleUserDrawer}
              color="inherit"
            >
              <AccountCircle sx={{ fontSize: 30 }} />
            </IconButton>

          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Drawer
        key={Drawers.userDrawer}
        id={Drawers.userDrawer}
        anchor={'right'}
        open={userDrawer.open}
        handleDrawer={handleUserDrawer}
      />
      <Drawer
        key={Drawers.categoriesDrawer}
        id={Drawers.categoriesDrawer}
        anchor={'left'}
        open={categoriesDrawer.open}
        handleDrawer={handleCategoriesDrawer}
      />

    </Box>
  );
};

export default NavBar;
