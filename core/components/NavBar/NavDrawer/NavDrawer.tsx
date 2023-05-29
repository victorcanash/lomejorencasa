import { Fragment } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import Toolbar from '@mui/material/Toolbar';

import type { NavDrawerItem } from '@core/types/navigation';
import Divider from '@core/components/ui/Divider';

import useAuth from '@core/hooks/useAuth';
import { themeCustomElements } from '@lib/constants/themes/elements';
import NavDrawerBtn from '@core/components/NavBar/NavDrawer/NavDrawerBtn';

type NavDrawerProps = {
  open: boolean,
  items: NavDrawerItem[],
  handleOpen: () => void,
  handleCollapse: (item: NavDrawerItem) => void,
  minHeight: string,
};

const NavDrawer = (props: NavDrawerProps) => {
  const { 
    open, 
    items, 
    handleOpen,
    handleCollapse,
    minHeight,
   } = props;

  const { logout } = useAuth();

  return (
    <Drawer
      anchor="left"
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
          { items.map((item, index) => (
            <Fragment key={index}>
              <NavDrawerBtn
                item={item}
                handleOpen={handleOpen}
                handleCollapse={handleCollapse}
                logout={logout}
              />
              { item.items && item.items.length > 0  &&
                <Collapse
                  in={item.open} 
                  timeout="auto" 
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    { item.items.map((subitem) => (
                      <Fragment key={subitem.text.id}>
                        <NavDrawerBtn
                          item={subitem as NavDrawerItem}
                          handleOpen={handleOpen}
                          handleCollapse={handleCollapse}
                          logout={logout}
                        />
                        { subitem.divider &&
                          <Divider
                            themeElement={themeCustomElements.dividers?.headerDrawer?.highlight}
                          />
                        }
                      </Fragment>
                    ))}
                  </List>
                </Collapse>
              }
              <Divider
                themeElement={themeCustomElements.dividers?.headerDrawer?.default}
              />
            </Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default NavDrawer;
