import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Drawers } from '@core/constants/header';
import HideOnScroll from '@core/components/HideOnScroll';
import Link from '@core/components/Link';
import useDrawer from '@lib/hooks/useDrawer';
import Search from '@components/Header/Search';
import Drawer from '@components/Header/Drawer';

const Header = () => {
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
        <AppBar color="primary" position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} onClick={closeDrawers}>
          <Toolbar variant="dense">

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open categories drawer"
              aria-controls={Drawers.categoriesDrawer}
              aria-haspopup="true"
              onClick={handleCategoriesDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <Link href="/" color="inherit" underline="none">
                VICTOR&apos;S SHOP
              </Link>
            </Typography>

            <Search />

            <Box sx={{ flexGrow: 1 }} />

            <IconButton
              size="large"
              aria-label="show 17 items from cart"
              color="inherit"
            >
              <Badge badgeContent={17} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="open user drawer"
              aria-controls={Drawers.userDrawer}
              aria-haspopup="true"
              onClick={handleUserDrawer}
              color="inherit"
            >
              <AccountCircle />
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

export default Header;
