import { type ChangeEvent } from 'react'

import { useIntl, FormattedMessage } from 'react-intl'
import {
  type CreateOrderData,
  type CreateOrderActions,
  type OnApproveData,
  type OnApproveActions,
  type HostedFieldsHandler
} from '@paypal/paypal-js'
import { PayPalButtons } from '@paypal/react-paypal-js'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'

import type { FormatText } from '@core/types/texts'
import Divider from '@core/components/ui/Divider'

import { paypalHostedFieldsSx, themeCustomElements } from '@lib/config/theme/elements'
import { useAuthContext } from '@core/contexts/AuthContext'
import BaseForm from '@core/components/forms/BaseForm'

interface CheckoutPaymentFormProps {
  paypalButtonsDependencies: unknown[]
  onPaypalButtonsSubmit: (_data: CreateOrderData, _actions: CreateOrderActions) => Promise<string>
  onPaypalButtonsApprove: (data: OnApproveData, _actions: OnApproveActions) => Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPaypalButtonsError: (error: any) => void
  onAdvancedCardsSubmit: () => Promise<void>
  advancedCardsInstance: HostedFieldsHandler | undefined
  cardHolderNameFieldValue: string
  handleCardHolderNameField: (event: ChangeEvent<HTMLInputElement>) => void
  rememberFieldValue: boolean
  handleRememberField: (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => void
  errorMsg: string
  successMsg: string
}

const CheckoutPaymentForm = (props: CheckoutPaymentFormProps) => {
  const {
    paypalButtonsDependencies,
    onPaypalButtonsSubmit,
    onPaypalButtonsApprove,
    onPaypalButtonsError,
    onAdvancedCardsSubmit,
    advancedCardsInstance,
    cardHolderNameFieldValue,
    handleCardHolderNameField,
    rememberFieldValue,
    handleRememberField,
    errorMsg,
    successMsg
  } = props

  const { paypal, isLogged } = useAuthContext()

  const intl = useIntl()

  const handlePaypalButtonsSubmit = async (data: CreateOrderData, actions: CreateOrderActions) => {
    return await onPaypalButtonsSubmit(data, actions)
  }

  const handleAdvancedCardsSubmit = async () => {
    await onAdvancedCardsSubmit()
  }

  const hostedFieldLabel = (formatText: FormatText) => {
    return (
      <Typography variant="body1">
        <FormattedMessage id={`forms.${formatText.id}`} values={formatText.values} />
      </Typography>
    )
  }

  const hostedField = (formatText: FormatText) => {
    return (
      <>
        { hostedFieldLabel(formatText) }
        <Box id={formatText.id} sx={paypalHostedFieldsSx} />
      </>
    )
  }

  return (
    <BaseForm
      maxWidth="800px"
      initialValues={{}}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'checkout.paymentMethod',
            textAlign: 'center'
          },
          extraElements:
            <>
              <Box
                textAlign="center"
                mt={2}
              >
                <PayPalButtons
                  forceReRender={paypalButtonsDependencies}
                  fundingSource={undefined}
                  createOrder={handlePaypalButtonsSubmit}
                  onApprove={onPaypalButtonsApprove}
                  onError={onPaypalButtonsError}
                  style={{ shape: 'pill' }}
                />
              </Box>
              { ((paypal?.advancedCards) ?? false) &&
                <>
                  <Divider
                    themeElement={themeCustomElements.dividers?.payment}
                    mb={2}
                  >
                    <Typography variant="body2" textAlign="center">
                      <FormattedMessage id="checkout.paymentMethod.or" />
                    </Typography>
                  </Divider>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      { hostedFieldLabel({ id: 'cardHolderName' }) }
                      <Box id ="cardHolderName">
                        <TextField
                          fullWidth
                          type="text"
                          id="cardHolderName"
                          name="cardHolderName"
                          autoComplete="off"
                          placeholder=""
                          value={cardHolderNameFieldValue}
                          onChange={handleCardHolderNameField}
                          disabled={!((paypal?.advancedCards) ?? false)}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      { hostedField({ id: 'cardNumber' }) }
                    </Grid>
                    <Grid item xs={6}>
                      { hostedField({ id: 'cardExpiry' }) }
                    </Grid>
                    <Grid item xs={6}>
                      { hostedField({ id: 'cvv' }) }
                    </Grid>
                    { isLogged() &&
                      <Grid item xs={12}>
                        <FormControlLabel
                          label={intl.formatMessage({ id: 'forms.rememberPayment' })}
                          control={
                            <Checkbox
                              id="remember"
                              name="remember"
                              checked={rememberFieldValue}
                              onChange={handleRememberField}
                            />
                          }
                        />
                      </Grid>
                    }
                  </Grid>
                </>
              }
            </>

        }
      ]}
      formButtons={((paypal?.advancedCards) ?? false)
        ? {
            submit: {
              text: {
                id: 'checkout.successBtn'
              },
              onSubmit: handleAdvancedCardsSubmit,
              disabled: advancedCardsInstance == null
            }
          }
        : undefined}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  )
}

export default CheckoutPaymentForm
