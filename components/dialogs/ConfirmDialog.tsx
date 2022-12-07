import { useEffect, useState, forwardRef } from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ConfirmDialogProps = {
  open: boolean,
  handleDialog: () => void,
  onConfirm: () => void,
};

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { 
    open,
    handleDialog,
    onConfirm, 
  } = props;

  const [confirmValue, setConfirmValue] = useState('');

  const confirmTxt = 'confirm';

  const confirmFieldError = confirmValue != confirmTxt;

  const handleChangeConfirmField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmValue(event.target.value);
  };

  const handleClickCancelBtn = () => {
    handleDialog();
  }

  const handleClickConfirmBtn = () => {
    handleDialog();
    onConfirm();
  }

  useEffect(() => {
    setConfirmValue('');
  }, [open]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDialog}
      aria-describedby="confirm-dialog"
    >
      <DialogTitle>
        <FormattedMessage id="dialogs.confirm.title" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText 
          id="confirm-dialog"
        >
          <FormattedMessage 
            id="dialogs.confirm.content"
            values={{ confirmTxt }} 
          />
        </DialogContentText>
        <TextField
          autoFocus
          margin="normal"
          fullWidth
          value={confirmValue}
          onChange={handleChangeConfirmField}
        />
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleClickCancelBtn}
          variant="contained"
        >
          <FormattedMessage id="dialogs.confirm.cancelBtn" />
        </Button>
        <Button 
          onClick={handleClickConfirmBtn}
          variant="contained"
          disabled={confirmFieldError}
        >
          <FormattedMessage id="dialogs.confirm.confirmBtn" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
