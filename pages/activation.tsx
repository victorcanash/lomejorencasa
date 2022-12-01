import type { NextPage } from 'next';
import Head from 'next/head';

import { FormattedMessage, useIntl } from 'react-intl';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

import { ActivationProps, getActivationProps } from '@lib/server/activation';
import usePage from '@lib/hooks/usePage';

const Activation: NextPage<ActivationProps> = (props) => {
  const { successMsg, errorMsg } = props;

  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'activation.metas.title' });
  const description = intl.formatMessage({ id: 'activation.metas.description' });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Avatar 
        sx={{ 
          mb: 1, 
          bgcolor: 'secondary.main' 
        }}
      >
        {
          successMsg != '' ?
            <CheckCircleIcon />
            :
            <ErrorIcon />
        }
      </Avatar>

      <Typography component="h1" variant="h5">
        <FormattedMessage id="activation.h1" />
      </Typography>

      <Typography component="h2" variant="subtitle1" mt={4}>
        { successMsg || errorMsg }
      </Typography>
    </>
  );
};

export default Activation;

export const getServerSideProps = getActivationProps;
