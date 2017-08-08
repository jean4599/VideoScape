import React,{Component} from 'react';
import './IndexPage.css';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

export default class CourseList extends Component{
	state={
			data:[],
		}
	componentWillMount(){
		firebase.database().ref('/_courses/').once('value', (snapshot)=>{
			var data=[];
			snapshot.forEach((childsnap)=>{
				data.push({
					key: childsnap.key,
					course: childsnap.val()['_course'],
					description: childsnap.val()['_description'],
					pretest: childsnap.val()['_pre-test'],
					posttest:childsnap.val()['_post-test']
				})
			})
			this.setState({
				data:data
			})
		})
	}
	render(){
		return (
				<div className={this.props.className} ref={e=>this.courses = e} id={this.props.id}>
					<div className='subtitle'>Courses</div>
					{
						this.state.data.map((row, index)=>{
							return(
								<div className='row' key={index}>
									<div className='course-title'> {row.course+' : '+row.description} </div>
									<a href={row.pretest} target='_blank' className='course-link'>Pre-test</a>
									{(row.key in this.props.userState && this.props.userState[row.key]['pre-test'])
										?<Link to={'/course/'+row.key} className='course-link'>Course</Link>
										:<span className='deactive course-link'> Course </span>
									}
									{(row.key in this.props.userState && this.props.userState[row.key]['course'])
										?<a href={row.posttest} target='_blank' className='course-link'>Post-test</a>
										:<span className='deactive course-link'> Post-test </span>
									}
									{(row.key in this.props.userState && this.props.userState[row.key]['post-test'])
										?<p className='course-link'> Finished! </p>
										:null
									}
								</div>
								)
						})
					}
				</div>
			)
	}
}