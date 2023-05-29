import { Step, StepLabel, Stepper as MuiStepper } from '@mui/material';

type Stepper = {
  activeStep: number,
  steps: string[],
  mb?: number,
};

const Stepper = (props: Stepper) => {
  const { activeStep, steps, mb } = props;

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
  );
};

export default Stepper;
