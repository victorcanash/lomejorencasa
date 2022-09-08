import type { NextPage } from 'next';
import Head from "next/head";

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import usePage from '@lib/hooks/usePage';
import UpdateUserDataForm from '@components/forms/UpdateUserDataForm';

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
      
      <UpdateUserDataForm />
    </>
  )
};

export default MyAccount;
