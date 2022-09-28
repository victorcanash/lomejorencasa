import { capitalizeFirstLetter } from '@core/utils/strings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getBackendErrorMsg = (title: string, error: any) => {
  let errorMsg = error.message;
  if (error.response?.data?.message) {
    errorMsg = error.response.data.message;
  } else {
    const errorValFields = error.response?.data?.fields;
    if (errorValFields?.length > 0 && 
      errorValFields[0]?.error &&
      errorValFields[0]?.name) {
      errorMsg = `${capitalizeFirstLetter(errorValFields[0].error)} with the ${errorValFields[0].name} field`;
    }
  }
  return `[${title}]: ${errorMsg as string}`;
};

export const logBackendError = ( errorMsg: string) => {
  console.error(`${errorMsg}`);
};
