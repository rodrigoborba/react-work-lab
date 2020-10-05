import * as React from "react";
import { SyntheticEvent } from 'react';
import {Container, Page, ButtonGroup, Buttons, Snack} from 'bnb-ui/dist';
import { Stepper, Step, StepLabel, StepContent, Typography } from '@material-ui/core';

export interface PropsSteppers {
  history: any;
}

export interface StateSteppers {
  activeStep: number;
  open: boolean;
}

function getSteps() {
  return ['Primeiro Passo', 'Segundo Passo', 'último Passo'];
}

function getStepContent(step: any) {
  switch (step) {
      case 0:
      return  'Evento 1'
      case 1:
      return 'Evento 2';
      case 2:
      return `Evento 3`;
      default:
      return 'Página não encontrada';
    }
  }

export class Steppers extends React.Component<PropsSteppers, StateSteppers>{

  constructor(props: PropsSteppers) {
    super(props);
    this.state = {
      activeStep: 0,
      open: true,
    };
  }

  handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return this.setState({ open: false });
    }
    this.setState({ open: false });
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  render() {
    const steps = getSteps();
    const { activeStep} = this.state;

    return (
      <Container>
        <Page pagetitle="Steppers" history={this.props.history}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div>
                    <ButtonGroup>
                      <Buttons
                        disabled={activeStep === 0}
                        onClick={this.handleBack}>
                        Voltar
                                </Buttons>
                      <Buttons
                        variant="contained"
                        color="secondary"
                        onClick={this.handleNext}>
                        {activeStep === steps.length - 1 ? 'Fim' : 'Próximo'}
                      </Buttons>
                    </ButtonGroup>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Snack variant="info" message="Fim dos Steppers." open={this.state.open} onClose={this.handleClose}></Snack>
          )}
        </Page>
      </Container >
    )
  }

}
export default (Steppers);
