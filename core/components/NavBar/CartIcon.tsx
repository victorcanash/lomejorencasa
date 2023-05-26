import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useCartContext } from '@lib/contexts/CartContext';

type CartIconProps = {
  smallBreakpoint: boolean,
};

const CartIcon = (props: CartIconProps) => {
  const {
    smallBreakpoint,
  } = props;

  const { totalQuantity } = useCartContext();

  return (
    <Badge
      badgeContent={
        <Typography component="div" variant="body2Head">
          {totalQuantity > 9 ? '+9' : totalQuantity}
        </Typography>
      }
      invisible={totalQuantity < 1}
    >
      <ShoppingCartIcon sx={{ fontSize: smallBreakpoint ? 25: 30 }} />
    </Badge>
  );
};

export default CartIcon;
