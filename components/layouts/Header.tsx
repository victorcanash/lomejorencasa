import React, { useState } from 'react';

import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
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

import { Search } from '@components/layouts/Search';
import { Drawer } from '@components/layouts/Drawer';


interface Props {
  children: React.ReactElement;
}

const HideOnScroll = (props: Props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


export const userDrawerId = 'user-drawer';
export const categoriesDrawerId = 'categories-drawer';


export const Header = () => {
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);
  const [categoriesDrawerOpen, setCategoriesDrawerOpen] = useState(false);

  const handleUserDrawer = () => {
    setUserDrawerOpen(!userDrawerOpen);
  };

  const handleCategoriesDrawer = () => {
    setCategoriesDrawerOpen(!categoriesDrawerOpen);
  };

  const onClickAppBar = () => {
    if (userDrawerOpen) {
      setUserDrawerOpen(false);
    }
    if (categoriesDrawerOpen) {
      setCategoriesDrawerOpen(false);
    }
  }

  return (
    <Box sx={{ flexGrow: 1, display:'flex' }}>

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

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              VICTOR'S SHOP
            </Typography>

            <Search />

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
      />
      <Drawer
        key={categoriesDrawerId}
        id={categoriesDrawerId}
        anchor={'left'}
        open={categoriesDrawerOpen}
        handleDrawer={handleCategoriesDrawer}
      />

    </Box>
  );
}
