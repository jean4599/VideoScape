import React,{Component} from 'react';
import ConceptMap from '../ConceptMap';
export default class LinkPhrase extends Component{
	render(){
		return(
			<div style={this.props.style}>
				{this.props.children}
			</div>
			)
	}
}