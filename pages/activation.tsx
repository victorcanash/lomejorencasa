import type { NextPage } from 'next';

import { FormattedMessage, useIntl } from 'react-intl';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

import { PageTypes } from '@core/constants/navigation';
import { ActivationProps, getActivationProps } from '@lib/server/activation';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';

const Activation: NextPage<ActivationProps> = (props) => {
  const { successMsg, errorMsg } = props;

  const intl = useIntl();

  const page = usePage();

  const getSuccessTxt = () => {
    return intl.formatMessage({ id: 'activation.successes.default' });
  }
  const getErrorTxt = () => {
    if (errorMsg.includes('was already activated')) {
      return intl.formatMessage({ id: 'activation.errors.alreadyActivated' });
    } else if (errorMsg.includes('locked out')) {
      return intl.formatMessage({ id: 'activation.errors.lockedOut' });
    } else if (errorMsg.includes('Token is missing or has expirated')){
      return intl.formatMessage({ id: 'activation.errors.invalidToken' });
    } 
    return intl.formatMessage({ id: 'activation.errors.default' });
  }

  return (
    <>
      <PageHeader
        pageType={PageTypes.link}
        metas={{
          titleId: 'activation.metas.title',
          descriptionId: 'activation.metas.description',
        }}
      />

      <Avatar 
        sx={{ 
          mb: 1, 
          backgroundColor: 'transparent',
        }}
      >
        {
          successMsg ?
            <CheckCircleIcon fontSize="large" />
            :
            <ErrorIcon fontSize="large" />
        }
      </Avatar>

      <Typography component="h1" variant="h1">
        <FormattedMessage id="activation.h1" />
      </Typography>

      <Typography component="h2" variant="body1" mt={4}>
        { successMsg &&
          getSuccessTxt()
        }
        { errorMsg &&
          getErrorTxt()
        }
      </Typography>
    </>
  );
};

export default Activation;

export const getServerSideProps = getActivationProps;
