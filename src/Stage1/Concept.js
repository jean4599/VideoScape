import React,{Component} from 'react'
import {Icon, Input} from 'antd'
import Duration from './Duration'

export default class Concept extends Component{
	constructor(props){
		super(props);
		this.onChangeConcept = this.onChangeConcept.bind(this);
		this.startEditConcept = this.startEditConcept.bind(this);
		this.finishEditConcept = this.finishEditConcept.bind(this);
	}
	state={
		concept: this.props.concept,
		mode: 'view',
	}
	onChangeConcept(e){
		this.setState({ concept: e.target.value });
	}
	startEditConcept(){
		this.setState({mode: 'edit'})
	}
	finishEditConcept(){
		this.setState({mode: 'view'})
		this.props.editConcept(this.props.id, this.state.concept)
	}
	render(){
		return (
				<div >
					<p style={{margin:'0px 10px', float:'left',cursor: 'pointer', display:(this.state.mode==='view')?'inline':'none'}}
						onClick={()=>this.props.jumpToTime(this.props.time)}>
						{this.props.concept}
					</p>
					<Duration seconds={this.props.time}/>
					<Input 
						style={{display:(this.state.mode==='edit')?'inline':'none'}}
						value={this.state.concept}
						onChange={(e)=>this.onChangeConcept(e)}	
						onPressEnter={()=>this.finishEditConcept()}/>
					<p style={{cursor: 'pointer', margin:'0px 10px', float:'right'}}
						onClick={()=>this.props.deleteConcept(this.props.id)}>
						<Icon type="delete" style={{fontSize:'18px'}}/></p>
					<p style={{cursor: 'pointer', margin:'0 10', float:'right'}}
						onClick={()=>this.startEditConcept()}>
						<Icon type="edit" style={{fontSize:'18px'}} /></p>
				</div>
			)
	}
}