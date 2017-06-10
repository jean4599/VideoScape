import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import UploadIcon from 'material-ui/svg-icons/action/info-outline';
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
    stepIndex: 1,
  };
  onMouseOver(n){
    alert(n)
  }
  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div className={this.props.className}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Find key concepts in the video</StepLabel>
          </Step>
          <Step>
            <StepLabel>Link the concepts</StepLabel>
          </Step>
          <Step>
            <StepLabel>Add link phrase to the links</StepLabel>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default HorizontalLinearStepper;