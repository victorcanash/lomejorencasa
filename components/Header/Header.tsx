import React, { useState } from 'react';
import { useRouter } from 'next/router';

import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';

import Search from '@components/Header/Search';
import Drawer from '@components/Header/Drawer';

interface Props {
  children: React.ReactElement;
};

const HideOnScroll = (props: Props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export const userDrawerId = 'user-drawer';
export const categoriesDrawerId = 'categories-drawer';

const Header = () => {
  const router = useRouter();

  const goToPage = (to: string) => {
    router.push(to);
  };

  const onClickAppBar = () => {
    closeDrawers();
  }

  const onClickLogoBtn = () => {
    goToPage('/');
  }

  const [userDrawerOpen, setUserDrawerOpen] = useState(false);
  const [categoriesDrawerOpen, setCategoriesDrawerOpen] = useState(false);

  const handleUserDrawer = () => {
    setUserDrawerOpen(!userDrawerOpen);
  };

  const handleCategoriesDrawer = () => {
    setCategoriesDrawerOpen(!categoriesDrawerOpen);
  };

  const closeDrawers = () => {
    if (userDrawerOpen) {
      setUserDrawerOpen(false);
    }
    else if (categoriesDrawerOpen) {
      setCategoriesDrawerOpen(false);
    }
  }

  return (
    <Box component="header" sx={{ flexGrow: 1, display:'flex' }}>

      <HideOnScroll>
        <MuiAppBar color="primary" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} onClick={onClickAppBar}>
          <Toolbar>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open categories drawer"
              aria-controls={categoriesDrawerId}
              aria-haspopup="true"
              onClick={handleCategoriesDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Button
              variant="text"
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' }, color: 'white' }}
              onClick={onClickLogoBtn}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
              >
                VICTOR&apos;S SHOP
              </Typography>
            </Button>

            <Search 
            />

            <Box sx={{ flexGrow: 1 }} />

            {/*<Box sx={{ display: { xs: 'none', md: 'flex' } }}>*/}
              {/*
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              */}
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
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
                aria-controls={userDrawerId}
                aria-haspopup="true"
                onClick={handleUserDrawer}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            {/*</Box>*/}

          </Toolbar>
        </MuiAppBar>
      </HideOnScroll>

      <Drawer
        key={userDrawerId}
        id={userDrawerId}
        anchor={'right'}
        open={userDrawerOpen}
        handleDrawer={handleUserDrawer}
        goToPage={goToPage}
      />
      <Drawer
        key={categoriesDrawerId}
        id={categoriesDrawerId}
        anchor={'left'}
        open={categoriesDrawerOpen}
        handleDrawer={handleCategoriesDrawer}
        goToPage={goToPage}
      />

    </Box>
  );
};

export default Header;
