import { Step, StepLabel, Stepper as MuiStepper } from '@mui/material'

interface StepperProps {
  activeStep: number
  steps: string[]
  mb?: number
}

const Stepper = (props: StepperProps) => {
  const { activeStep, steps, mb } = props

  return (
    <MuiStepper alternativeLabel activeStep={activeStep} sx={{ mb }}>
      { steps.map((value) => {
        return (
          <Step key={value}>
            <StepLabel>{value}</StepLabel>
          </Step>
        )
      })}
    </MuiStepper>
  )
}

export default Stepper
