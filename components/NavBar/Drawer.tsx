import { Fragment } from 'react';

import { useIntl } from 'react-intl';

import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import type { DrawerItems } from '@core/types/navigation';
import { convertElementToSx } from '@core/utils/themes';
import Link from '@core/components/Link';

import { themeCustomElements } from '@lib/constants/themes/elements';
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
          intl.formatMessage({ id: `header.drawerItems.${item.text.id}`, defaultMessage: item.text.id }, item.text.values)
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
      <Toolbar 
        variant="dense" 
        disableGutters 
        sx={{ minHeight: '114px' }} 
      />
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
                      <Fragment key={subitem.text.id}>
                        { listItemBtn(subitem as DrawerItems) }
                      </Fragment>
                    ))}
                  </List>
                </Collapse>
              }
              <Divider sx={convertElementToSx(themeCustomElements.header.drawer.divider)} />
            </Fragment>
          ))}
        </List>
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
