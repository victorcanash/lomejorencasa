import { useEffect, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Transition from '@core/components/animations/Transition';
import Button from '@core/components/inputs/Button';

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
        >
          <FormattedMessage id="dialogs.confirm.cancelBtn" />
        </Button>
        <Button 
          onClick={handleClickConfirmBtn}
          disabled={confirmFieldError}
        >
          <FormattedMessage id="dialogs.confirm.confirmBtn" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
