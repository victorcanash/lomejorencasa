import type { GetServerSideProps } from 'next';

import { activateUser } from '@core/utils/auth';

export type ActivationProps = {
  successMsg: string,
  errorMsg: string,
};

export const getActivationProps: GetServerSideProps = async (context) => {
  const { token } = context.query;
  const tokenSearch = typeof token == 'string' ? token : '';

  let result: { props: ActivationProps } | { notFound: boolean } = { props: {} as ActivationProps };

  await activateUser(tokenSearch).then(() => {
    result = {
      props: {
        successMsg: 'Your account is activated and you can login now. You can close this window.',
        errorMsg: '',
      }
    };
  }).catch((error: Error) => {
    let errorMsg = error.message;
    if (errorMsg.includes('was already activated')) {
      errorMsg = 'Your account was already activated';
    } else if (errorMsg.includes('locked out')) {
      errorMsg = 'You are locked out';
    } else {
      errorMsg = 'Something went wrong, try again';
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
