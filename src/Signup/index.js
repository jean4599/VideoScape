import React, {Component} from 'react'
import {TextField, Card, CardText, CardTitle, RaisedButton, FlatButton} from 'material-ui'
import {Link} from 'react-router-dom'
import './style.css'
import firebase from 'firebase';
import {setCookie} from '../utils'

export default class SignUp extends Component{
	constructor(){
		super();
		this.signUp = this.signUp.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.handleEmailChange = this.handleEmailChange.bind(this)
	}
	state={
		email:'',
		password:'',
		email_error:'',
		password_error:'',
	}
	componentDidMount(){
		var that = this;
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User is signed in.
		    console.log(user)
		    setCookie('uid',user.uid,7)
		    setCookie('email', user.email, 7)
		    window.location.href='/course/virtualreality'
		  }
		});
	}
	handleEmailChange(event){
		this.setState({
			email: event.target.value
		})
	}
	handlePasswordChange(event){
		this.setState({
			password: event.target.value
		})
	}
	signUp(){
		var that = this;
		that.setState({password_error:''})
		that.setState({email_error:''})
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
		    .catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  if(errorCode == 'auth/email-already-in-use'){
		    that.setState({email_error:'Email has already been registered'})
		  } else if(errorCode == 'auth/invalid-email'){
		  	that.setState({email_error:'Email format is wrong'})
		  } else if (errorCode == 'auth/weak-password') {
		    that.setState({password_error:'Password length should longer than 6 characters/numbers'})
		  } 
		  console.log(error);
		});
	}
	render(){
		return (
			<div id='container'>
				<Card>
					<CardTitle title="Sign up"/>
					<CardText>
						<TextField
					      id="email"
					      errorText={this.state.email_error}
					      hintText="Email"
					      ref='email'
					      value={this.state.email}
					      onChange={this.handleEmailChange}/><br />
					    <TextField
					      id="password"
					      hintText="Password"
					      errorText={this.state.password_error}
					      type='password'
					      ref='password'
					      value={this.state.password}
					      onChange={this.handlePasswordChange}/><br /><br />
					    <RaisedButton label="Sign up" fullWidth={true} primary={true} onTouchTap={this.signUp}/>
					    <center> or </center>
					    <Link to={'/Login'}><FlatButton label="Login" fullWidth={true}/></Link>
				    </CardText>
			    </Card>
		    </div>
		)
	}
}