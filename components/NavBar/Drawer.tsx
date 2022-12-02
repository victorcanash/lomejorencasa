import { useIntl } from 'react-intl';

import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

import { Drawers } from '@lib/constants/header';
import Link from '@core/components/Link';
import useDrawer from '@lib/hooks/useDrawer';
import useAuth from '@lib/hooks/useAuth';

type DrawerProps = {
  id: Drawers;
  anchor: 'top' | 'left' | 'bottom' | 'right';
  open: boolean;
  handleDrawer: () => void;
};

const Drawer = (props: DrawerProps) => {
  const { id, anchor, open, handleDrawer } = props;

  const intl = useIntl();

  const { items } = useDrawer(id);
  const { logout } = useAuth();

  const handleClickLogout = () => {
    handleDrawer();
    logout();
  };

  return (
      <MuiDrawer
        anchor={anchor}
        open={open}
        onClose={handleDrawer}
        sx={{
          flexShrink: 0,
        }}
      >
        <Toolbar />
        <Box
          sx={{ 
            overflow: 'auto',
          }}
          onClick={handleDrawer}
        >
          <List>
            {items.map((item) => (
              <ListItem key={item.textId} disablePadding>
                { item.path ?
                  <ListItemButton onClick={handleDrawer} component={Link} noLinkStyle href={item.path}>
                    <ListItemText 
                      primary={intl.formatMessage({ id: `header.drawerItems.${item.textId}`, defaultMessage: item.textId })} 
                    />
                  </ListItemButton>
                  :
                  <ListItemButton onClick={handleClickLogout}>
                    <ListItemText 
                      primary={intl.formatMessage({ id: `header.drawerItems.${item.textId}`, defaultMessage: item.textId })} 
                    />
                  </ListItemButton>
                }
              </ListItem>
            ))}
          </List>
        </Box>
      </MuiDrawer>
  );
};

export default Drawer;
