import { Step, StepLabel, Stepper as MuiStepper } from '@mui/material';

type Stepper = {
  activeStep: number,
  steps: string[]
};

const Stepper = (props: Stepper) => {
  const { activeStep, steps } = props;

  return (
    <MuiStepper alternativeLabel activeStep={activeStep}>
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
