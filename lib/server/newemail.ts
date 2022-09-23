import type { GetServerSideProps } from 'next';

import { updateUserEmail } from '@core/utils/auth';

export type NewEmailProps = {
  successMsg: string,
  errorMsg: string,
};

export const getNewEmailProps: GetServerSideProps = async (context) => {
  const { token } = context.query;
  const tokenSearch = typeof token == 'string' ? token : '';

  let result: { props: NewEmailProps } | { notFound: boolean } = { props: {} as NewEmailProps };

  await updateUserEmail(tokenSearch).then(() => {
    result = {
      props: {
        successMsg: 'Your email is updated now. You can close this window.',
        errorMsg: '',
      }
    };
  }).catch((error: Error) => {
    let errorMsg = error.message;
    if (errorMsg.includes('Token is missing or has expirated')) {
      errorMsg = 'This link is not valid or has expirated';
    } else {
      errorMsg = 'Something went wrong, try again or resend another email';
    }
    result = {
      props: {
        successMsg: '',
        errorMsg: errorMsg,
      }
    };
  })

  return result;
};
