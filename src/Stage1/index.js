import React, {Component} from 'react'
import * as firebase from 'firebase'
import {REF} from '../Firebase'
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
	}
	state={
			concepts:[],
			courseId: this.props.courseId,
			conceptInputValue:'',
			getTimeStamp: this.props.getTimeStamp,
			uid: this.props.uid,
	}
	componentDidMount(){
		this.fire = firebase.database().ref(REF(this.state.courseId, this.state.uid).STAGE1.REAL_TIME_DATA);
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
		firebase.database().ref(REF(this.state.courseId, this.state.uid).STAGE1.REAL_TIME_DATA + '/'+key).update({id: key})
		this.setState({conceptInputValue:''})
		this.conceptsContainer.scrollTop = this.conceptsContainer.scrollHeight;
	}
	deleteConcept(id){
		firebase.database().ref(REF(this.state.courseId, this.state.uid).STAGE1.REAL_TIME_DATA+'/'+id).remove();
	}
	editConcept(id, content){
		firebase.database().ref(REF(this.state.courseId, this.state.uid).STAGE1.REAL_TIME_DATA+'/'+id).update({word:content});
	}
	handleConceptInputVlueChange(e){
		this.setState({
			conceptInputValue: e.target.value
		})
	}
	getResult(){
		return this.state.concepts;
	}
	render(){
		return (
			<div style={{padding:'10px 30px', height:'inherit', display:'flex', flexDirection:'column', overflowY: 'scroll'}}>
				<div ref={t=>{this.conceptsContainer = t}}>
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
