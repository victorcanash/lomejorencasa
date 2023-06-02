import ListItemButton from '@mui/material/ListItemButton';

import type { NavDrawerItem } from '@core/types/navigation';
import Link from '@core/components/navigation/Link';

import NavDrawerBtnContent from '@core/components/NavBar/NavDrawer/NavDrawerBtnContent';

type NavDrawerBtnProps = {
  item: NavDrawerItem,
  handleOpen: () => void,
  handleCollapse: (item: NavDrawerItem) => void,
  logout: () => Promise<void>,
};

const NavDrawerBtn = (props: NavDrawerBtnProps) => {
  const {
    item,
    handleOpen,
    handleCollapse,
    logout,
  } = props;

  const handleItemBtn = (item: NavDrawerItem) => {
    if (item.items && item.items.length > 0) {
      handleCollapse(item);
    } else {
      handleOpen();
      if (!item.path) {
        logout();
      }
    }
  };

  return (
    <>
      { item.path ?
        <ListItemButton 
          sx={{ pl: !item.items ? 4 : undefined }}
          onClick={() => handleItemBtn(item)}
          component={Link}
          href={item.path}
        >
          <NavDrawerBtnContent
            item={item}
          />
        </ListItemButton>
        :
        <ListItemButton 
          sx={ !item.items ? { pl: 4 } : undefined }
          onClick={() => handleItemBtn(item)}
        >
          <NavDrawerBtnContent
            item={item}
          />
        </ListItemButton>
      }
    </>
  );
};

export default NavDrawerBtn;
