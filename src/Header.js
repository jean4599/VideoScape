import React, {Component} from 'react'
import {AppBar, FlatButton, IconMenu, MenuItem, IconButton} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import firebase from 'firebase';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

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
			case "1":
				firebase.auth().signOut();
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
			    iconElementRight={
			    	<div>
						{this.props.email? <FlatButton labelStyle={{textTransform:'none'}} label={this.props.email} 
							onTouchTap={this.onTouchTap}/> :null}
						<IconMenu
				          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
				          onItemTouchTap={this.onItemTouch}
				          open={this.state.openMenu}
				          onRequestChange={this.handleOnRequestChange}
				        >
				          <MenuItem value="1" primaryText="Sign out" />
				        </IconMenu>
					</div>
			    }/>
			)
	}
}