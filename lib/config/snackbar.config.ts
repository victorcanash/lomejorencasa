import { type SnackbarConfig } from '@core/types/snackbar'

const snackbarConfig: SnackbarConfig = {
  maxSnack: 3,
  durations: {
    default: 5000,
    long: 10000
  }
}

export default snackbarConfig
