import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import { useCartContext } from '@core/contexts/CartContext';
import CartDetail from '@core/components/CartDetail';

type CartDrawerProps = {
  minHeight: string,
};

const CartDrawer = (props: CartDrawerProps) => {
  const {
    minHeight,
   } = props;

  const {
    drawerOpen,
    handleDrawerOpen,
  } = useCartContext();

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={handleDrawerOpen}
      sx={{
        flexShrink: 0,
      }}
      PaperProps={{
        sx: {
          backgroundColor: 'primary.main',
        },
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
