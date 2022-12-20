import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { pages } from '@core/config/navigation.config';
import LinkButton from '@core/components/LinkButton';
import useAuth from '@lib/hooks/useAuth';
import useCountdown from '@lib/hooks/useCountdown';

type ResendActivationFormProps = {
  email: string,
  onClickProceedBtn?: () => void,
};

const ResendActivationForm = (props: ResendActivationFormProps) => {
  const { email, onClickProceedBtn } = props;

  const { sendActivationEmail, errorMsg, successMsg } = useAuth();
  const { trigger, timeLeft, active } = useCountdown();

  const onSendActivationEmailSuccess = () => {
    trigger();
  }

  const onClickResend = () => {
    sendActivationEmail(email, onSendActivationEmailSuccess);
  }

  return (
    <Container maxWidth="xs">

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Typography component="h1" variant="h5">
          <FormattedMessage 
            id="forms.resendActivation.title" 
          />
        </Typography>

        <Typography component="h2" variant="subtitle1" my={2}>
          <FormattedMessage 
            id="forms.resendActivation.description" 
            values={{ email }}
          />
        </Typography>

        <LinkButton href={pages.login.path} fullWidth onClick={onClickProceedBtn}>
          <FormattedMessage 
            id="forms.resendActivation.loginLink" 
          />
        </LinkButton>

        <Typography component="h3" variant="subtitle2" sx={{ mt: 4, mb: 2}}>
          <FormattedMessage 
            id="forms.resendActivation.received" 
          />
          {" "}
          { timeLeft ?
            <FormattedMessage 
              id="forms.resendActivation.resendTime"
              values={{ timeLeft }}
            />
            :
            <FormattedMessage 
              id="forms.resendActivation.resendNow"
            />
          }
        </Typography>

        <Button
          fullWidth
          variant="contained"
          onClick={onClickResend}
          sx={{ mb: 2 }}
          disabled={active}
        >
          <FormattedMessage 
            id="forms.resendActivation.successBtn" 
          />
        </Button>

        {
          errorMsg && errorMsg !== '' &&
            <Alert severity="error">{ errorMsg }</Alert>
        }  
        {
          successMsg && successMsg !== '' &&
            <Alert>{ successMsg }</Alert>
        }

      </Box>

    </Container>
  );
};

export default ResendActivationForm;
