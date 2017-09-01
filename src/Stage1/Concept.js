import React,{Component} from 'react'
import {Icon, Input, Button} from 'antd'
import Duration from './Duration'

export default class Concept extends Component{
	constructor(props){
		super(props);
		this.onChangeConcept = this.onChangeConcept.bind(this);
		this.startEditConcept = this.startEditConcept.bind(this);
		this.finishEditConcept = this.finishEditConcept.bind(this);
		this.setConceptToCurrentTime = this.setConceptToCurrentTime.bind(this);
	}
	state={
		concept: this.props.concept,
		time:this.props.time,
		mode: 'view',
	}
	componentWillReceiveProps(nextProps){
		if(nextProps!=this.props)this.setState({concept: nextProps.concept, time:nextProps.time})
	}
	onChangeConcept(e){
		this.setState({ concept: e.target.value });
	}
	startEditConcept(){
		this.props.pause();
		this.setState({mode: 'edit'})
	}
	finishEditConcept(){
		this.setState({mode: 'view'})
		this.props.editConcept(this.props.id, this.state.concept, this.state.time)
	}
	setConceptToCurrentTime(){
		var time = this.props.getCurrentTime();
		this.props.editConcept(this.props.id, this.state.concept, time)
		this.setState({mode: 'view', time:time})
	}
	render(){
		return (
			<div>
				<div style={{display:'flex', width:'100%'}}>
					<p style={{margin:'0px 10px',cursor: 'pointer', flex:'1 1 90%', display:(this.state.mode==='view')?'flex':'none'}}
						onClick={()=>this.props.jumpToTime(this.state.time)}>
						{this.state.concept}
						<Duration seconds={this.state.time} style={{margin:'0px 10px'}}/>
					</p>
					
					<Input 
						style={{margin:'0px 10px', flex:'1 1 70%', display:(this.state.mode==='edit')?'flex':'none'}}
						value={this.state.concept}
						onChange={(e)=>this.onChangeConcept(e)}	
						onPressEnter={()=>this.finishEditConcept()}/>
					{(this.state.mode==='view')
						?<p style={{cursor: 'pointer', margin:'0 10', flex:'0 0 5%'}}
						onClick={()=>this.startEditConcept()}>
						<Icon type="edit" style={{fontSize:'18px'}} /></p>
						:<p style={{cursor: 'pointer', margin:'0 10', flex:'0 0 5%'}}
						onClick={()=>this.finishEditConcept()}>
						<Icon type="check" style={{fontSize:'18px'}} /></p>
					}
					<p style={{cursor: 'pointer', margin:'0px 10px', flex:'0 0 5%'}}
						onClick={()=>this.props.deleteConcept(this.props.id)}>
						<Icon type="delete" style={{fontSize:'18px'}}/></p>
					
				</div>
				<div style={{margin:'5px, 10px',width:'70%',display:(this.state.mode==='edit')?'flex':'none'}}>
					<Duration seconds={this.state.time} style={{margin:'0px 10px',flex:'1 1 50%'}}/>
					<Button type="primary" icon="clock-circle-o" style={{margin:'0px 10px',flex:'0 0 40%'}} onClick={()=>this.setConceptToCurrentTime()}>Set to current time</Button>
				</div>
			</div>
			)
	}
}