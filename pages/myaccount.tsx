import type { NextPage } from 'next';
import Head from 'next/head';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import usePage from '@lib/hooks/usePage';
import UpdateUserForm from '@components/forms/user/UpdateUserForm';
import UpdateEmailForm from '@components/forms/auth/UpdateEmailForm';
import ForgotForm from '@components/forms/auth/ForgotForm';

const MyAccount: NextPage = () => { 
  const page = usePage();

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Profile page" />
      </Head>

      <Typography component="h1" variant="h5" className='animate__animated animate__fadeInLeft'>
        Your profile
      </Typography>
      <Divider sx={{ my: 3 }} />
      
      <UpdateUserForm />

      <UpdateEmailForm />

      <ForgotForm forgotPage={false} />
    </>
  )
};

export default MyAccount;
