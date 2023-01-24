import { Fragment } from 'react';

import { useIntl } from 'react-intl';

import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Toolbar from '@mui/material/Toolbar';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import type { DrawerItems } from '@core/types/header';
import Link from '@core/components/Link';
import useAuth from '@lib/hooks/useAuth';

type DrawerProps = {
  anchor: 'top' | 'left' | 'bottom' | 'right',
  open: boolean,
  items: DrawerItems[],
  handleOpen: () => void,
  handleCollapse: (item: DrawerItems) => void,
};

const Drawer = (props: DrawerProps) => {
  const { 
    anchor, 
    open, 
    items, 
    handleOpen,
    handleCollapse,
   } = props;

  const intl = useIntl();

  const { logout } = useAuth(); 

  const handleItemBtn = (item: DrawerItems) => {
    if (item.items?.length > 0) {
      handleCollapse(item);
    } else {
      handleOpen();
      if (!item.path) {
        logout();
      }
    }
  };

  const listItemBtnSx = (item: DrawerItems) => {
    if (!item.items) {
      return { 
        pl: 4 
      };
    }
    return undefined;
  };

  const listItemBtnContent = (item: DrawerItems) => (
    <>
      <ListItemText 
        primary={
          intl.formatMessage({ id: `header.drawerItems.${item.textId}`, defaultMessage: item.textId })
        }
      />
      { item.items?.length > 0 &&
        <>
          { item.open ? <ExpandLess /> : <ExpandMore /> }
        </>
      }
    </>
  );

  const listItemBtn = (item: DrawerItems) => (
    <>
      { item.path ?
        <ListItemButton 
          sx={ listItemBtnSx(item) }
          onClick={() => handleItemBtn(item)}
          component={Link} 
          noLinkStyle 
          href={item.path}
        >
          { listItemBtnContent(item) }
        </ListItemButton>
        :
        <ListItemButton 
          sx={ !item.items ? { pl: 4 } : undefined }
          onClick={() => handleItemBtn(item)}
        >
          { listItemBtnContent(item) }
        </ListItemButton>
      }
    </>
  );

  return (
    <MuiDrawer
      anchor={anchor}
      open={open}
      onClose={handleOpen}
      sx={{
        flexShrink: 0,
      }}
    >
      <Toolbar variant="dense" disableGutters sx={{ minHeight: '75px' }} />
      <Box
        sx={{ 
          overflow: 'auto',
          width: '200px',
        }}
      >
        <List component="div">
          { items.map((item, index) => (
            <Fragment key={index}>
              { listItemBtn(item) }
              { item.items.length > 0  &&
                <Collapse
                  in={item.open} 
                  timeout="auto" 
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    { item.items.map((subitem) => (
                      <Fragment key={subitem.textId}>
                        { listItemBtn(subitem as DrawerItems) }
                      </Fragment>
                    ))}
                  </List>
                </Collapse>
              }
            </Fragment>
          ))}
        </List>
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
