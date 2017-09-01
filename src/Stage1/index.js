import React, {Component} from 'react'
import * as firebase from 'firebase'
import {DATAREF} from '../Firebase'
import { Input, Timeline, Col, Row, Button } from 'antd'
import {toArray} from '../utils'
import Concept from './Concept'

export default class ConceptExtraction extends Component{
	constructor(props){
		super(props);
		this.updateConcepts = this.updateConcepts.bind(this);
		this.addConcept = this.addConcept.bind(this);
		this.deleteConcept = this.deleteConcept.bind(this);
		this.editConcept = this.editConcept.bind(this);
		this.handleConceptInputVlueChange = this.handleConceptInputVlueChange.bind(this);
		this.getCurrentTime = this.getCurrentTime.bind(this);
	}
	state={
			concepts:[],
			courseId: this.props.courseId,
			conceptInputValue:'',
			getTimeStamp: this.props.getTimeStamp,
			uid: this.props.uid,
	}
	componentDidMount(){
		this.fire = firebase.database().ref(DATAREF(this.state.courseId, this.state.uid, this.props.stage).REAL_TIME_DATA)
		this.fire.orderByChild("time").on('value',(snapshot)=>{  
            var array=[]
          	snapshot.forEach(function(childSnapshot){
            	array.push(childSnapshot.val())
            })
            this.setState({concepts: array})
        })
	}
	componentDidUpdate(){
		//this.container.scrollTop = this.container.scrollHeight;
	}
	updateConcepts(snapshot){
		var conceptsArray = toArray(snapshot.val());
		this.setState({
			concepts: conceptsArray
		})
	}
	addConcept(){
		const minus_time = 3;
		var time = this.getCurrentTime();
		if(time>minus_time){
			time -= minus_time;
		}
		var key = this.fire.push({
			label: this.state.conceptInputValue,
			time: time
		}).key;
		firebase.database().ref(DATAREF(this.state.courseId, this.state.uid, this.props.stage).REAL_TIME_DATA + '/'+key).update({id: key})
		this.setState({conceptInputValue:''})
		this.container.scrollTop = this.container.scrollHeight;
	}
	deleteConcept(id){
		firebase.database().ref(DATAREF(this.state.courseId, this.state.uid, this.props.stage).REAL_TIME_DATA+'/'+id).remove();
	}
	editConcept(id, label, time){
		firebase.database().ref(DATAREF(this.state.courseId, this.state.uid, this.props.stage).REAL_TIME_DATA+'/'+id).update({label:label, time:time});
	}
	handleConceptInputVlueChange(e){
		this.setState({
			conceptInputValue: e.target.value
		})
	}
	getCurrentTime(){
		const time = this.state.getTimeStamp();
		// var played = time.played;
		var duration = time.duration;
		return duration
	}
	getResult(){
		return this.state.concepts;
	}
	render(){
		var list = this.state.concepts.map((concept,index)=>{
					return  <Timeline.Item key={index}>
								<Concept 
									id={concept.id}
									concept={concept.label}
									time={concept.time}
									played={concept.played}
									pause={this.props.pause}
									jumpToTime={this.props.jumpToVideoTime}
									deleteConcept={this.deleteConcept}
									editConcept={this.editConcept}
									getCurrentTime={this.getCurrentTime}/>
							</Timeline.Item>
					})
		return (
			<div ref={t=>{this.container = t}} style={{padding:'10px 30px', height:'inherit', display:'flex', flexDirection:'column', overflowY: 'scroll'}}>
				<div>
					{list}
				</div>
				<Row>
					<Col span={20}><Input placeholder="New concept: label or phrases, ex: water, learning science" onPressEnter={()=>this.addConcept()} value={this.state.conceptInputValue} onChange={this.handleConceptInputVlueChange}/></Col>
					<Col span={4}><Button type="primary" onClick={()=>this.addConcept()}>Add</Button></Col>
				</Row>
				<p> 
					A better concept for concept map should be <b>sort</b> and <b>condensed</b>.
						Instead of writing a concept like: human-computer interaction is  intersection of computer science, behavioral sciences, design, media studies
						, seperate them into 5 concepts: human-computer interaction / behavioral science / ...</p>
			</div>
			)
	}
}
