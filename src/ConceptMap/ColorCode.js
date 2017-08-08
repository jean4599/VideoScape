import React, {Component} from 'react';

export default class ColorCode extends Component{
	render(){
		return(
			<div style={this.props.style}>
				<div className='color-code'>
					<p style={{backgroundColor: '#99ccff', width:'10px', height:'10px'}}></p>
					<p>no time information</p>
				</div>
				<div className='color-code'>
					<p style={{backgroundColor: '#FF7E45', width:'10px', height:'10px'}}></p>
					<p>covered before current video time</p>
				</div>
				<div className='color-code'>
					<p style={{backgroundColor: '#939393', width:'10px', height:'10px'}}></p>
					<p>uncovered yet</p>
				</div>
			</div>
			)
	}
}