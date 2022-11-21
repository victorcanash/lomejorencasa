import { forwardRef } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import { CartItem } from '@core/types/cart';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type CheckedCartDialogProps = {
  open: boolean,
  handleDialog: () => void,
  changedCart: boolean,
  changedItemsByInventory: CartItem[],
  message?: string,
};

const CheckedCartDialog = (props: CheckedCartDialogProps) => {
  const { 
    open,
    handleDialog,
    changedCart,
    changedItemsByInventory,
    message,
  } = props;

  const handleClickAcceptBtn = () => {
    handleDialog();
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDialog}
      aria-describedby="checked-cart-dialog"
    >
      <DialogTitle>
        {'Cart updated'}
      </DialogTitle>
      <DialogContent>
        { changedItemsByInventory.length > 0 &&
          <>
            <DialogContentText 
              id="checked-cart-dialog"
            >
              {'The quantity of some products in your cart has been updated due to insufficient inventory:'}
            </DialogContentText>
            { changedItemsByInventory.map((item) => (
              <DialogContentText key={item.id}>
                {`-Quantity of ${item.inventory.product.name} ${item.inventory.name}: ${item.quantity}`}
              </DialogContentText>
            ))}
          </>
        }
        { changedItemsByInventory.length <= 0 && changedCart &&
          <DialogContentText>
            {'Your cart has been updated.'}
          </DialogContentText>
        }
        { message &&
          <DialogContentText>
            {message}
          </DialogContentText>
        }
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleClickAcceptBtn}
          variant="contained"
        >
          {'Accept'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckedCartDialog;
