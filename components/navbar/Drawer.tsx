import React, { useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';

import { logoutUser } from '@core/utils/auth';
import { useAppContext } from '@lib/contexts/AppContext';
import { userDrawerId, categoriesDrawerId } from '@components/navbar/Header';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface Props {
  id: string;
  anchor: Anchor;
  open: boolean;
  handleDrawer: () => void;
  goToPage: (to: string) => void;
};

export const Drawer = (props: Props) => {
  const { id, anchor, open, handleDrawer, goToPage } = props;

  const firstRenderRef = useRef(false);

  const { token, user, setLoading, setToken, setUser, categories } = useAppContext();

  interface ItemList { 
    text: string;
    onClick: ((_text: string) => void) | (() => Promise<void>);
  };

  const [itemsList, setItemsList] = useState<ItemList[]>([]);

  const onClickProfileBtn = (_text: string) => {
    handleDrawer();
    goToPage('/profile');
  };

  const onClickOrdersBtn = (_text: string) => {
    setLoading(true);
    handleDrawer();
    goToPage('/orders');
  };

  const onClickSignOutBtn = async (_text: string) => {
    setLoading(true);
    handleDrawer();
    await logoutUser(token);
    setToken('');
    setUser(undefined);
    goToPage('/');
  };

  const onClickSignInBtn = (_text: string) => {
    handleDrawer();
    goToPage('/login');
  };

  const onClickRegisterBtn = (_text: string) => {
    handleDrawer();
    goToPage('/register');
  };

  const onClickCategoryBtn = (_text: string) => {
    setLoading(true);
    handleDrawer();
    goToPage(`/search/${_text.toLowerCase()}`);
  };

  const loggedUserItemsList: ItemList[] =  [
    {
      text: 'Profile',
      onClick: onClickProfileBtn,
    },
    {
      text: 'Orders',
      onClick: onClickOrdersBtn,
    },
    {
      text: 'Sign out',
      onClick: onClickSignOutBtn,
    },
  ];

  const unloggedUserItemsList: ItemList[] =  [
    {
      text: 'Sign in',
      onClick: onClickSignInBtn,
    },
    {
      text: 'Register',
      onClick: onClickRegisterBtn,
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;
      let newItemsList = [] as ItemList[];
      if (id == userDrawerId) {
        newItemsList = user && token ? loggedUserItemsList : unloggedUserItemsList;
      } else if (id == categoriesDrawerId) {
        categories.forEach((category) => {
          newItemsList.push({
            text: category.name,
            onClick: onClickCategoryBtn
          });
        });
      }
      setItemsList(newItemsList);
    }    
  });

  const list = () => (
    <Box
    color="primary"
      sx={{ overflow: 'auto', backgroundColor: 'primary' }}
      onClick={handleDrawer}
    >
      <List>
        {itemsList.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => item.onClick(item.text)}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
      <MuiDrawer
        color="primary"
        anchor={anchor}
        open={open}
        onClose={handleDrawer}
        sx={{
          flexShrink: 0,
        }}
      >
        <Toolbar />
        {list()}
      </MuiDrawer>
  );
};
