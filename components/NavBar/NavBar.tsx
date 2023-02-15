import { useRouter } from 'next/router';
import Image from 'next/image';

import { FormattedMessage } from 'react-intl';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import colors from '@lib/constants/themes/colors';
import { useCartContext } from '@lib/contexts/CartContext';
import useDrawer from '@lib/hooks/useDrawer';
import Drawer from '@components/NavBar/Drawer';
import logo from 'public/images/navbar-logo.png';

const NavBar = () => {
  const { totalQuantity } = useCartContext();

  const router = useRouter();

  const appDrawer = useDrawer();

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }} 
        onClick={appDrawer.close}
      >
        <Toolbar 
          variant="dense" 
          disableGutters
        >

          <IconButton
            size="large"
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
              component={Link}
              href={pages.home.path}
              sx={{ borderRadius: '10px' }}
            >
              { pages.home.filepath === router.pathname &&
                <Typography component="h1" variant="h1" sx={{ display: 'none' }}>
                  <FormattedMessage id="home.h1" />
                </Typography>
              }
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
            component={Link}
            href={pages.cart.path}
            sx={{ ml: 1 }}
          >
            <Badge badgeContent={totalQuantity > 9 ? '+9' : totalQuantity}>
              <ShoppingCartIcon sx={{ fontSize: 30 }} />
            </Badge>
          </IconButton>

        </Toolbar>
      </AppBar>

      <Drawer
        key="app-drawer"
        anchor="left"
        open={appDrawer.open}
        items={appDrawer.items}
        handleOpen={appDrawer.handleOpen}
        handleCollapse={appDrawer.handleCollapse}
      />
    </>
  );
};

export default NavBar;
