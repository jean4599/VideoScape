import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getCookie} from './utils'
import {AppBar, FlatButton} from 'material-ui';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

export default class Header extends Component{
	constructor(props){
		super(props);
		this.userEmail = getCookie('email')
	}
	render(){
		return(
			<AppBar
			    title={<span style={styles.title}>VideoScape</span>}
			    iconElementRight={<FlatButton labelStyle={{textTransform:'none'}} label={this.userEmail} />}
			  />
			)
	}
}