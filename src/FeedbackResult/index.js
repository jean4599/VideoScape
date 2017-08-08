import React, {Component} from 'react';
import {Modal} from 'antd';
import {toArray} from '../utils'

export default class FeedbackResult extends Component {
  state = { visible: this.props.visible }
  static defaultProps={
  	serverData :[],
  	userData:[]
  }
  showModal = () => {
    this.setState({
      visible: false,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }	
	render(){
		console.log('feedback result: ')
		console.log(this.state.visible)
		var serverData = this.props.serverData;
		var userData = this.props.userData;
		switch(this.props.stage){
			case 1:
				return(
					<Modal
			          title="See others' result"
			          visible={this.props.visible}
			          onOk={this.handleOk}
			          onCancel={this.handleCancel}
			        >
						<div className='row'>
							<div>
								{
									toArray(serverData).map((c,index)=>{
										return (
											<p key={index}>{c.label}</p>
											)
									})
								}
							</div>
							<div>
								{
									userData.map((c,index)=>{
										return (
												<p key={index}>{c.label}</p>
											)
									})
								}
							</div>
						</div>
					</Modal>
					)
			case 2:
			case 3:
			default: return null; break;
		}
	}
}