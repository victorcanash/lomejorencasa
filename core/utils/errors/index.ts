/* eslint-disable @typescript-eslint/no-explicit-any */
import { capitalizeFirstLetter } from '@core/utils/strings'

export const getBackendErrorMsg = (title: string, error: unknown) => {
  let errorMsg = ''
  if (error instanceof Error) {
    errorMsg = error.message
  } else if ((error as any).response?.data?.message != null) {
    errorMsg = (error as any).response.data.message
  } else {
    const errorValFields = (error as any).response?.data?.fields
    if (errorValFields?.length > 0 &&
      errorValFields[0]?.error != null &&
      errorValFields[0]?.name != null) {
      errorMsg = `${capitalizeFirstLetter(errorValFields[0].error)} with the ${errorValFields[0].name} field`
    }
  }
  return `[${title}]: ${errorMsg}`
}

export const logBackendError = (errorMsg: string) => {
  console.error(`${errorMsg}`)
}
