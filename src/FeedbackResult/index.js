import React, {Component} from 'react';
import firebase from 'firebase';
import {Modal} from 'antd';
import {toArray} from '../utils';
import {REF} from '../Firebase';
import {withRouter} from "react-router-dom";
import {Card, Slider, Button} from 'antd';

const styles={
	card:{
		display:'flex', margin:'auto'
	},
	cardGrid:{
		flex:1, padding:'30px',textAlign: 'center', width:'50%', height:'100%'
	},
	title:{
		fontSize:'1.2em', padding:'10px'
	}
}
class FeedbackResult extends Component {
	state={
		aggregateResult:null,
		userResult:null,
		inputValue:1,
	}
	componentDidMount(){
		const{
			course,
			stage,
			uid
		}=this.props
		
		switch(stage){
			case 1:
				firebase.database().ref(REF(course,uid).STAGE1.SERVER_PROCESSED_DATA).on('value',(snapshot)=>{
					if(snapshot.val()){
						console.log('aggregate result are:')
						var aggregateResult = toArray(snapshot.val())
						console.log(aggregateResult)
						firebase.database().ref(REF(course,uid).STAGE1.USER_SAVED_DATA).on('value',(user_snapshot)=>{
							var userResult = toArray(user_snapshot.val())
							this.setState({
								aggregateResult:aggregateResult,
								userResult:userResult
							})
							console.log(aggregateResult)
						})
					}else{
						this.props.history.push('/');
					}
				})
				break;
			case 2: 
				this.props.history.push('/'); break
			case 3:
				this.props.history.push('/'); break
			default:
				this.props.history.push('/'); break
		}
	}
	onChange = (value) => {
		this.setState({
		  inputValue: value,
		});
	}
	handleClick = (e) => {
		firebase.database().ref(REF(this.props.course,this.props.uid).STAGE1.USER_RATED_RESULT).set({
			data: this.state.aggregateResult,
			rate: this.state.inputValue,
		})
		this.props.history.push('/');
	}
	render(){
		var component=null;
		switch(this.props.stage){
			case 1:
				component=(this.state.aggregateResult!=null)
					?<Card style={styles.card}>
					<Card.Grid style={styles.cardGrid}>
						<div style={styles.title}>Aggregated result of concepts contributed by all learners: (#=number of learners who list out that concept)</div><br/>
						
						{
							this.state.aggregateResult.map((c,index)=>{
								return (
									<p key={index}>{c.label} (#={c.timestamp.length})</p>
									)
							})
						}<br/><br/>
						<h4>In what degree do you think the aggregated concept list can cover the main idea in this lecture?</h4>
						<Slider defaultValue={0} onChange={this.onChange} value={this.state.inputValue}/>
						<Button type="primary" onClick={this.handleClick}>Ok</Button>
					</Card.Grid>
					<Card.Grid style={styles.cardGrid}>
						<div style={styles.title}>Your concept list:</div><br/>
						{
							this.state.userResult.map((c,index)=>{
								return (
										<p key={index}>{c.word}</p>
									)
							})
						}
					</Card.Grid></Card>
					:<div>Redirect to index page</div>
				break;
			case 2:break;
			case 3:break;
			default: break;
		}
		return component;
	}
}
export default withRouter(FeedbackResult);