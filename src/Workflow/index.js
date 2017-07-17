import React, {Component} from 'react'
import firebase from 'firebase'

export default class Workflow extends Component{
	render(){
		return(
			<div style={this.props.style}>
				{this.props.children[this.props.stage-1]}
			</div>
			)
	}
}