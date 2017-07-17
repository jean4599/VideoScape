import React, {Component} from 'react'
import * as firebase from 'firebase'
import { Input, Timeline, Col, Row, Button } from 'antd'
import {getGradColor, toArray, getCookie} from '../utils'
import Duration from './Duration'
import Concept from './Concept'

export default class ConceptExtraction extends Component{
	constructor(props){
		super(props);
		this.updateConcepts = this.updateConcepts.bind(this);
		this.addConcept = this.addConcept.bind(this);
		this.deleteConcept = this.deleteConcept.bind(this);
		this.editConcept = this.editConcept.bind(this);
		this.handleConceptAggreagate = this.handleConceptAggreagate.bind(this);
		this.handleConceptInputVlueChange = this.handleConceptInputVlueChange.bind(this);
	}
	state={
			concepts:[],
			courseId: this.props.courseId,
			conceptInputValue:'',
			getTimeStamp: this.props.getTimeStamp,
			user: getCookie('uid')
	}
	componentDidMount(){
		this.fire = firebase.database().ref(this.state.courseId+"/_concepts/"+this.state.user);
		this.fire.on('value', this.updateConcepts);
	}
	componentDidUpdate(){
		this.conceptsContainer.scrollTop = this.conceptsContainer.scrollHeight;
	}
	updateConcepts(snapshot){
		var conceptsArray = toArray(snapshot.val());
		this.setState({
			concepts: conceptsArray
		})
	}
	addConcept(){
		const time = this.state.getTimeStamp();
		const minus_time = 3;
		var played = time.played;
		var duration = time.duration;
		if(time.duration>minus_time){
			played = time.played/time.duration * (time.duration-minus_time);
			duration = time.duration-minus_time;
		}
		var key = this.fire.push({
			word: this.state.conceptInputValue,
			played: played,
			time: duration
		}).key;
		firebase.database().ref(this.state.courseId+"/_concepts/"+this.state.user+'/'+key).update({id: key})
		this.setState({conceptInputValue:''})
	}
	deleteConcept(id){
		firebase.database().ref(this.state.courseId+"/_concepts/"+this.state.user+'/'+id).remove();
	}
	editConcept(id, content){
		firebase.database().ref(this.state.courseId+"/_concepts/"+this.state.user+'/'+id).update({word:content});
	}
	handleConceptAggreagate(){
		var me = this.state.user;
		this.state.concepts.map((concept,index)=>{
			var randomx = Math.floor(Math.random() * 501) - 250;
			var randomy = Math.floor(Math.random() * 501) - 250;
			this.props.addConceptToNetwork(concept['word'], randomx, randomy)
		})
	}
	handleConceptInputVlueChange(e){
		this.setState({
			conceptInputValue: e.target.value
		})
	}
	render(){
		return (
			<div style={this.props.style}>
				<div ref={t=>{this.conceptsContainer = t}} 
					style={{padding:'10px', maxHeight: '80%', overflowY: 'scroll'}}>
					{this.state.concepts.map((concept,index)=>{
					return  <Timeline.Item key={index}>
								<Concept 
									id={concept.id}
									concept={concept.word}
									time={concept.time}
									played={concept.played}
									jumpToTime={this.props.jumpToVideoTime}
									deleteConcept={this.deleteConcept}
									editConcept={this.editConcept}/>
							</Timeline.Item>
					})}
				</div>
				<Row>
					<Col span={20}><Input placeholder="New concept" onPressEnter={()=>this.addConcept()} value={this.state.conceptInputValue} onChange={this.handleConceptInputVlueChange}/></Col>
					<Col span={4}><Button type="primary" onClick={()=>this.addConcept()}>Add</Button></Col>
				</Row>
			</div>
			)
	}
}
