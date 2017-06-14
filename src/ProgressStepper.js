import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

class HorizontalLinearStepper extends React.Component {

  constructor(props){
    super(props)
    this.onMouseOver = this.onMouseOver.bind(this)
  }
  state = {
    finished: false,
    stepIndex: 2,
  };
  onMouseOver(n){
    switch (n){
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }
  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div className={this.props.className}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel onMouseOver={()=>this.onMouseOver(1)}>Find key concepts in the video</StepLabel>
          </Step>
          <Step>
            <StepLabel onMouseOver={()=>this.onMouseOver(2)}>Link the concepts</StepLabel>
          </Step>
          <Step>
            <StepLabel onMouseOver={()=>this.onMouseOver(3)}>Revise links & Add link phrases</StepLabel>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default HorizontalLinearStepper;