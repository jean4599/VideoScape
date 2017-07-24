import React, {Component} from 'react';
import MyApp from './App';
import Header from './Header'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './Login'
import Signup from './Signup'
import firebase from 'firebase';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import './index.css';

export default class App extends Component{
	state={
		authed:false,
		email:'',
	}
	componentDidMount(){
		firebase.auth().onAuthStateChanged((user)=>{
		  if (user) {
		    // User is signed in.
		    console.log(user)
		    this.setState({
		    	authed:true,
		    	email: user.email,
		    	uid: user.uid,
		    })
		  }else{
		  	this.setState({
		  		authed:false,
		    	email: '',
		    	uid: '',
		  	})
		  }
		});
	}
	render(){
		return(
			<div id='root'>
				<Header email={this.state.email}/>
				{this.state.authed
						?<Switch>
							<Redirect from="/login" to="/course/virtualreality" />
							<Redirect from="/signup" to="/course/virtualreality"/>
							<Route path="/course/:course" render={(props) => <MyApp uid={this.state.uid} {...props}/>} />
					    	<Redirect from="/" to="/login" />
				    	</Switch>
						:<Switch>
							<Route exact path="/login" component={Login} />
							<Route exact path="/signup" component={Signup} />
							<Redirect from="/course/:course" to="/login" />
					    	<Redirect from="/" to="/login" />
				    	</Switch>
					}
				
		    </div>	
		)
	}
}

ReactDOM.render(
  <BrowserRouter>
 	<MuiThemeProvider>
    	<App/>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
