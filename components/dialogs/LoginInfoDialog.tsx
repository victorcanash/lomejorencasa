import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { pages } from '@lib/constants/navigation';
import Transition from '@components/animations/Transition';

type LoginInfoDialogProps = {
  open: boolean,
  handleDialog: () => void,
};

const LoginInfoDialog = (props: LoginInfoDialogProps) => {
  const { 
    open,
    handleDialog,
  } = props;

  const router = useRouter();

  const handleClickContinueBtn = () => {
    handleDialog();
  };

  const handleClickLoginBtn = () => {
    handleDialog();
    router.push(pages.login.path);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDialog}
      aria-describedby="login-info-dialog"
    >
      <DialogTitle>
        <FormattedMessage id="dialogs.loginInfo.title" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id="dialogs.loginInfo.content" />
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button 
          onClick={handleClickContinueBtn}
          variant="contained"
        >
          <FormattedMessage id="dialogs.loginInfo.continueBtn" />
        </Button>
        <Button 
          onClick={handleClickLoginBtn}
          variant="contained"
        >
          <FormattedMessage id="dialogs.loginInfo.loginBtn" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginInfoDialog;
