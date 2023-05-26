import { FormattedMessage } from 'react-intl';

import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import type { NavDrawerItem } from '@core/types/navigation';

type NavDrawerBtnContentProps = {
  item: NavDrawerItem,
};

const NavDrawerBtnContent = (props: NavDrawerBtnContentProps) => {
  const {
    item,
  } = props;

  return (
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
      { item.items && item.items?.length > 0 &&
        <>
          { item.open ? <ExpandLess /> : <ExpandMore /> }
        </>
      }
    </>
  );
};

export default NavDrawerBtnContent;
