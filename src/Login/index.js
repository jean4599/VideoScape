import React, {Component} from 'react'
import {TextField, Card, CardText, CardTitle, RaisedButton, FlatButton} from 'material-ui'
import {Link} from 'react-router-dom'
import './style.css'
import firebase from 'firebase';
import {setCookie} from '../utils'

export default class Login extends Component{
	constructor(){
		super();
		this.login = this.login.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.handleEmailChange = this.handleEmailChange.bind(this)
	}
	componentDidMount(){
		var that = this;
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User is signed in.
		    console.log(user)
		    setCookie('uid',user.uid, 7)
		    setCookie('email', user.email, 7)
		    window.location.href='/course/virtualreality'
		  }
		});
	}
	state={
		email:'',
		password:'',
		email_error:'',
		password_error:'',
	}
	login(){
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  if (errorCode === 'auth/wrong-password') {
		    alert('Wrong password.');
		  } else {
		    alert(errorMessage);
		  }
		  console.log(error);
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
	render(){
		return (
			<div id='container'>
				<Card>
					<CardTitle title="Login"/>
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
					    <RaisedButton label="Login" fullWidth={true} primary={true} onTouchTap={this.login}/>
					    <center> or </center>
					    <Link to={'/Signup'}><FlatButton label="Sign up" fullWidth={true}/></Link>
				    </CardText>
			    </Card>
		    </div>
		)
	}
}