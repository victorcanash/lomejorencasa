import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import { useCartContext } from '@lib/contexts/CartContext';
import CartDetail from '@components/cart/CartDetail';

type CartDrawerProps = {
  anchor: 'top' | 'left' | 'bottom' | 'right',
};

const CartDrawer = (props: CartDrawerProps) => {
  const { 
    anchor,
   } = props;

  const {
    drawerOpen,
    handleDrawerOpen,
  } = useCartContext();

  return (
    <Drawer
      anchor={anchor}
      open={drawerOpen}
      onClose={handleDrawerOpen}
      sx={{
        flexShrink: 0,
      }}
    >
      <Toolbar
        className="drawerToolbar"
        variant="dense"
        disableGutters
      />
      <Box
        sx={{
          overflow: 'auto',
          width: {
            xs: '100vw',
            sm: '600px',
          },
          p: '16px',
        }}
      >
        <CartDetail />
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
