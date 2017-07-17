import React from 'react';
import MyApp from './App';
import Header from './Header'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './Login'
import Signup from './Signup'
import {Link, Route, BrowserRouter, Redirect, Switch} from 'react-router-dom'
import './index.css';

const App = () => (
	<div id='root'>
		<Header />
		<Switch>
			<Route exact path="/login" component={Login} />
			<Route exact path="/signup" component={Signup} />    
	    	<Route path="/course/:course" component={MyApp}/>
	    	<Redirect from="/" to="/login" />
    	</Switch>
    </div>
);

ReactDOM.render(
  <BrowserRouter>
 	<MuiThemeProvider>
    	<App/>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
