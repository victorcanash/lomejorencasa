import { FormattedMessage, useIntl } from 'react-intl';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { pages } from '@core/config/navigation.config';
import { Drawers } from '@lib/constants/header';
import Link from '@core/components/Link';
import { useCartContext } from '@lib/contexts/CartContext';
import useDrawer from '@lib/hooks/useDrawer';
import Drawer from '@components/NavBar/Drawer';

const NavBar = () => {
  const { totalQuantity } = useCartContext();

  const intl = useIntl();

  const appDrawer = useDrawer(Drawers.appDrawer);
  const userDrawer = useDrawer(Drawers.userDrawer);

  const handleAppDrawer = () => {
    appDrawer.setOpen(!appDrawer.open);
  };
  const handleUserDrawer = () => {
    userDrawer.setOpen(!userDrawer.open);
  };
  const closeDrawers = () => {
    if (appDrawer.open) {
      appDrawer.setOpen(false);
    } else if (userDrawer.open) {
      userDrawer.setOpen(false);
    }
  }

  return (
    <Box component="header">

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'secondary.main' }} onClick={closeDrawers}>
        <Toolbar variant="dense" disableGutters>

          <IconButton
            size="large"
            color="inherit"
            aria-controls={Drawers.appDrawer}
            aria-haspopup="true"
            sx={{ mr: 1 }}
            onClick={handleAppDrawer}
          >
            <MenuIcon sx={{ fontSize: 30 }} />
          </IconButton>

          <Container 
            maxWidth={false} 
            disableGutters
          >        
            <Typography component="div" variant="subtitle1" sx={{ textAlign: 'center' }}>
              <Link 
                href={pages.home.path} 
                sx={{ textDecoration: 'none' }}>
                <FormattedMessage
                  id="header.title"
                />
              </Link>
            </Typography>          
          </Container>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            sx={{ ml: 1 }}
            size='large'
            color='inherit'
            component={Link}
            href={pages.cart.path}
          >
            <Badge badgeContent={totalQuantity > 9 ? '+9' : totalQuantity} color='error'>
              <ShoppingCartIcon sx={{ fontSize: 30 }} />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            aria-controls={Drawers.userDrawer}
            aria-haspopup="true"
            onClick={handleUserDrawer}
            color="inherit"
          >
            <AccountCircle sx={{ fontSize: 30 }} />
          </IconButton>

        </Toolbar>
      </AppBar>

      <Drawer
        key={Drawers.appDrawer}
        id={Drawers.appDrawer}
        anchor={'left'}
        open={appDrawer.open}
        handleDrawer={handleAppDrawer}
      />
      <Drawer
        key={Drawers.userDrawer}
        id={Drawers.userDrawer}
        anchor={'right'}
        open={userDrawer.open}
        handleDrawer={handleUserDrawer}
      />

    </Box>
  );
};

export default NavBar;
