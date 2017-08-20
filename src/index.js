import React, {Component} from 'react';
import Course from './Course';
import Header from './Header'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './Login'
import Signup from './Signup'
import IndexPage from './IndexPage';
import CourseList from './CourseList';
import firebase from 'firebase';
import {Icon} from 'antd';
import FeedbackResult from './FeedbackResult'
import ScrollableAnchor from 'react-scrollable-anchor';
import {Route, BrowserRouter, Redirect, Switch, Link} from 'react-router-dom';
import './index.css';

export default class App extends Component{
	constructor(props){
		super(props);
		this.handleStageFinish = this.handleStageFinish.bind(this)
	}
	state={
		authed:false,
		email:'',
		userState:{},
	}
	componentWillMount(){
		firebase.auth().onAuthStateChanged((user)=>{
		  if (user) {
		    // User is signed in.
		    this.setState({
		    	authed:true,
		    	email: user.email,
		    	uid: user.uid,
		    })
		    firebase.database().ref('/_user/'+user.uid).on('value',(snapshot)=>{
		    	var data = snapshot.val();
				
				if(data!==null){
					this.setState({
						userState: data
					})
				}
			})
		  }else{
		  	this.setState({
		  		authed:false,
		    	email: '',
		    	uid: '',
		    	userState:{},
		  	})
		  }
		});
	}
	handleStageFinish(courseId, stage){
		firebase.database().ref('/_user/'+this.state.uid+'/'+courseId+'/course').set('true')
		this.setState({course: courseId, stage: stage})
	}
	render(){
		return(
			<div id='root'>
				<Header email={this.state.email} uid={this.state.uid}/>
				{this.state.authed
						?<Switch>
							<Redirect from="/login" to="/" />
							<Redirect from="/signup" to="/"/>
							<Route path="/checkResult" render={(props)=><FeedbackResult course={this.state.course} stage={this.state.stage} uid={this.state.uid}/>} />
							<Route path="/course/:course" render={(props) => <Course handleStageFinish={this.handleStageFinish} uid={this.state.uid} {...props}/>} />
					    	<Route path="/" render={(props)=>
					    		<IndexPage {...props}>
					    			<a href="#courses" id='nav-link'> <p><Icon type="double-right" /> Available courses</p> </a>
					    			<ScrollableAnchor id={'courses'}>
					    				<CourseList userState={this.state.userState} id='courses' className='section'/>
					    			</ScrollableAnchor>
					    		</IndexPage>
					    	} />
				    	</Switch>
						:<Switch>
							<Route exact path="/login" component={Login} />
							<Route exact path="/signup" component={Signup} />
							<Redirect from="/course/:course" to="/login" />
					    	<Route path="/" render={(props)=>
					    		<IndexPage {...props}>
					    			<div id='nav-link'><Link to='/login'> <p><Icon type="double-right" /> Available courses</p> </Link></div>
					    			<div className='section'><div className='subtitle'>Login to see courses</div></div>
					    		</IndexPage>
					    	} />
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
