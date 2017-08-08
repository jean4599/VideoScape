import React, {Component} from 'react'
import {AppBar, IconMenu, MenuItem, IconButton} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import firebase from 'firebase';

const styles = {
  title: {
    cursor: 'pointer',
  },
  text:{
  	lineHeight: 'inherit',
  	fontSize:'1.5em',
  	color:'white',
  	marginRight:'20px'
  }
};
function handleTitleClick(){
	window.location='/'
}
export default class Header extends Component{
	constructor(props){
		super(props);
		this.onTouchTap = this.onTouchTap.bind(this);
		this.onItemTouch = this.onItemTouch.bind(this);
	}
	state={
		openMenu:false,
	}
	onTouchTap(){
		this.setState({openMenu:!this.state.openMenu})
		console.log(this.state)
	}
	onItemTouch(event, child){
	    switch(child.props.value){
			case "signOut":
				firebase.auth().signOut();
				break;
			case "signIn":
				window.location='login';
				break;
			default:
				break;
			}
	}
	handleOnRequestChange = (value) => {
	    this.setState({
	      openMenu: value,
	    });
	}
	render(){
		return(
			<AppBar
			    title={<span style={styles.title}>VideoScape</span>}
			    onTitleTouchTap={handleTitleClick}
			    showMenuIconButton={false}
			    titleStyle={{cursor:'pointer'}}
			    iconElementRight={
			    	<div>
						{this.props.email?<span><span style={styles.text}>UID: {this.props.uid}</span> <span style={styles.text}>Email: {this.props.email}</span></span> :null}
						<IconMenu
				          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
				          onItemTouchTap={this.onItemTouch}
				          open={this.state.openMenu}
				          onRequestChange={this.handleOnRequestChange}
				        >
				        {this.props.email
				        	?<MenuItem value="signOut" primaryText="Sign out" />
				        	:<MenuItem value="signIn" primaryText="Sign in"/>}
				          
				        </IconMenu>
					</div>
			    }/>
			)
	}
}