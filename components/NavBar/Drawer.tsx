import { useIntl } from 'react-intl';

import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

import Link from '@core/components/Link';
import useDrawer from '@lib/hooks/useDrawer';
import useAuth from '@lib/hooks/useAuth';

type DrawerProps = {
  anchor: 'top' | 'left' | 'bottom' | 'right';
  open: boolean;
  handleDrawer: () => void;
};

const Drawer = (props: DrawerProps) => {
  const { anchor, open, handleDrawer } = props;

  const intl = useIntl();

  const { items } = useDrawer();
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
        <Toolbar variant="dense" disableGutters sx={{ minHeight: '75px' }} />
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
                      primary={
                        !!intl.messages[`header.drawerItems.${item.textId}`] ?
                          intl.formatMessage({ id: `header.drawerItems.${item.textId}`, defaultMessage: item.textId }) :
                          item.textId
                      } 
                    />
                  </ListItemButton>
                  :
                  <ListItemButton onClick={handleClickLogout}>
                    <ListItemText 
                      primary={
                        !!intl.messages[`header.drawerItems.${item.textId}`] ?
                          intl.formatMessage({ id: `header.drawerItems.${item.textId}`, defaultMessage: item.textId }) :
                          item.textId
                      }  
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
