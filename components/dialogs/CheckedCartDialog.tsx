import { useEffect, useState, forwardRef } from 'react';

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
  changedItems: CartItem[],
  deletedItems: CartItem[],
};

const CheckedCartDialog = (props: CheckedCartDialogProps) => {
  const { 
    open,
    handleDialog,
    changedItems,
    deletedItems,
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
        <DialogContentText 
          id="checked-cart-dialog"
        >
          {'The quantity of some products in your cart has been updated due to insufficient inventory:'}
        </DialogContentText>
        { changedItems.map((item) => (
          <DialogContentText key={item.id}>
            {`-Quantity of ${item.product.name}: ${item.quantity}`}
          </DialogContentText>
        ))}
        { deletedItems.map((item) => (
          <DialogContentText key={item.id}>
            {`-Quantity of ${item.product.name}: 0`}
          </DialogContentText>
        ))}
        <DialogContentText>
          {'Check your order and click the confirm button again.'}
        </DialogContentText>
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
