import type { NextPage } from 'next';
import Head from 'next/head';

import { FormattedMessage, useIntl } from 'react-intl';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import usePage from '@lib/hooks/usePage';
import UpdateUserForm from '@components/forms/user/UpdateUserForm';
import UpdateEmailForm from '@components/forms/auth/UpdateEmailForm';
import ForgotPswForm from '@components/forms/auth/ForgotPswForm';

const MyAccount: NextPage = () => { 
  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'myaccount.metas.title' });
  const description = intl.formatMessage({ id: 'myaccount.metas.description' });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Typography component="h1" variant="h1" className='animate__animated animate__fadeInLeft'>
        <FormattedMessage id="myaccount.h1" />
      </Typography>
      <Divider sx={{ my: 3 }} />
      
      <UpdateUserForm />

      <UpdateEmailForm />

      <ForgotPswForm />
    </>
  )
};

export default MyAccount;
