import Image from 'next/image';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { pages } from '@lib/constants/navigation';
import Link from '@core/components/Link';
import { useCartContext } from '@lib/contexts/CartContext';
import useDrawer from '@lib/hooks/useDrawer';
import Drawer from '@components/NavBar/Drawer';
import logo from 'public/images/navbar-logo.png';

const NavBar = () => {
  const { totalQuantity } = useCartContext();

  const appDrawer = useDrawer();

  return (
    <>

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'secondary.main' }} onClick={appDrawer.close}>
        <Toolbar variant="dense" disableGutters>

          <IconButton
            size="large"
            color="inherit"
            aria-controls="app-drawer"
            aria-haspopup="true"
            onClick={appDrawer.handleOpen}
            sx={{ mr: 1 }}
          >
            <MenuIcon sx={{ fontSize: 30 }} />
          </IconButton>

          <Container 
            maxWidth={false} 
            disableGutters
            sx={{ 
              display: 'flex',
              justifyContent: 'center', 
            }}
          > 
            <IconButton
              size='large'
              color='inherit'
              component={Link}
              href={pages.home.path}
              sx={{ borderRadius: '10px' }}
            >
              <Image
                src={logo}
                alt="Logo"
                height="50px"
                width="156px"
                layout="fixed"
                objectFit="cover"
                priority
              />
            </IconButton>
          </Container>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            size='large'
            color='inherit'
            component={Link}
            href={pages.cart.path}
            sx={{ ml: 1 }}
          >
            <Badge badgeContent={totalQuantity > 9 ? '+9' : totalQuantity} color='error'>
              <ShoppingCartIcon sx={{ fontSize: 30 }} />
            </Badge>
          </IconButton>

        </Toolbar>
      </AppBar>

      <Drawer
        key="app-drawer"
        anchor={'left'}
        open={appDrawer.open}
        items={appDrawer.items}
        handleOpen={appDrawer.handleOpen}
        handleCollapse={appDrawer.handleCollapse}
      />

    </>
  );
};

export default NavBar;
