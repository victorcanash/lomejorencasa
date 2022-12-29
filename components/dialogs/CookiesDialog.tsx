import { forwardRef } from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
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

type CookiesDialogProps = {
  open: boolean,
  handleDialog: () => void,
  onRefuse: () => void,
  onAccept: () => void,
};

const CookiesDialog = (props: CookiesDialogProps) => {
  const { 
    open,
    handleDialog,
    onRefuse,
    onAccept,
  } = props;

  const handleClickRefuseBtn = () => {
    handleDialog();
    onRefuse();
  }

  const handleClickAcceptBtn = () => {
    handleDialog();
    onAccept();
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDialog}
      aria-describedby="cookies-dialog"
    >
      <DialogTitle>
        <FormattedMessage id="dialogs.cookies.title" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText 
          id="cookies-dialog"
        >
          <FormattedMessage 
            id="dialogs.cookies.content"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleClickRefuseBtn}
          variant="contained"
        >
          <FormattedMessage id="dialogs.cookies.refuseBtn" />
        </Button>
        <Button 
          onClick={handleClickAcceptBtn}
          variant="contained"
        >
          <FormattedMessage id="dialogs.cookies.acceptBtn" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CookiesDialog;
