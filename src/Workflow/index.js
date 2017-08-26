import React, {Component} from 'react'

export default class Workflow extends Component{
	render(){
		return(
			<div style={this.props.style}>
				{this.props.children[parseInt(this.props.stage)-1]}
			</div>
			)
	}
}