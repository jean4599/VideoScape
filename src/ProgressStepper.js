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
    const {finished} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={this.props.style}>
        <Stepper activeStep={parseInt(this.props.stage)-1}>
          <Step>
            <StepLabel onMouseOver={()=>this.onMouseOver(1)}>List out key concepts in the video</StepLabel>
          </Step>
          <Step>
            <StepLabel onMouseOver={()=>this.onMouseOver(2)}>Concepts linking</StepLabel>
          </Step>
          <Step>
            <StepLabel onMouseOver={()=>this.onMouseOver(3)}>Add link phrases</StepLabel>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default HorizontalLinearStepper;