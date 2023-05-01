import { Fragment, useCallback, useMemo } from 'react';

import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import type { NavDrawerItems } from '@core/types/navigation';
import { convertElementToSx } from '@core/utils/themes';
import Link from '@core/components/Link';

import { themeCustomElements } from '@lib/constants/themes/elements';
import useAuth from '@lib/hooks/useAuth';

type NavDrawerProps = {
  anchor: 'top' | 'left' | 'bottom' | 'right',
  open: boolean,
  items: NavDrawerItems[],
  handleOpen: () => void,
  handleCollapse: (item: NavDrawerItems) => void,
  minHeight: string,
};

const NavDrawer = (props: NavDrawerProps) => {
  const { 
    anchor, 
    open, 
    items, 
    handleOpen,
    handleCollapse,
    minHeight,
   } = props;

  const { logout } = useAuth(); 

  const handleItemBtn = useCallback((item: NavDrawerItems) => {
    if (item.items?.length > 0) {
      handleCollapse(item);
    } else {
      handleOpen();
      if (!item.path) {
        logout();
      }
    }
  }, [handleCollapse, handleOpen, logout]);

  const listItemBtnSx = useCallback((item: NavDrawerItems) => {
    if (!item.items) {
      return { 
        pl: 4 
      };
    }
    return undefined;
  }, []);

  const listItemBtnContent = useCallback((item: NavDrawerItems) => (
    <>
      <ListItemText
        primary={
          <Typography variant="body1Head">
            <FormattedMessage
              id={`header.drawerItems.${item.text.id}`}
              defaultMessage={item.text.id}
              values={item.text.values}
            />
          </Typography>
        }
      />
      { item.items?.length > 0 &&
        <>
          { item.open ? <ExpandLess /> : <ExpandMore /> }
        </>
      }
    </>
  ), []);

  const listItemBtn = useCallback((item: NavDrawerItems) => (
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
  ), [handleItemBtn, listItemBtnContent, listItemBtnSx]);

  const listItems = useMemo(() => (
    <>
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
                    { listItemBtn(subitem as NavDrawerItems) }
                  </Fragment>
                ))}
              </List>
            </Collapse>
          }
          <Divider sx={convertElementToSx(themeCustomElements.header.drawer.divider)} />
        </Fragment>
      ))}
    </>
  ), [items, listItemBtn]);

  return (
    <Drawer
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
        sx={{
          minHeight: minHeight,
        }}
      />
      <Box
        sx={{
          overflow: 'auto',
          width: '250px',
        }}
      >
        <List component="div">
          { listItems }
        </List>
      </Box>
    </Drawer>
  );
};

export default NavDrawer;
