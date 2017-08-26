import React, {Component} from 'react';
import firebase from 'firebase';
import Network from './Network';
import InputBox from './InputBox';
import RaisedButton from 'material-ui/RaisedButton';
import ColorCode from './ColorCode';

var buttonLabel={}
if(navigator.appVersion.indexOf("Win")!==-1){buttonLabel['add-edge']='Add link (ctrl+shif)'}
else if(navigator.appVersion.indexOf("Mac")!==-1){buttonLabel['add-edge']='Add link (cmd+shif)'}
buttonLabel['delete-edge']='Delete link';
buttonLabel['delete-node']='Delete concept';
buttonLabel['add-node']='Add concept'

export default class ConceptMap extends Component {
	constructor(props) {
	    super(props);
		this.addNode = this.addNode.bind(this);
		this.editNode = this.editNode.bind(this);
		this.editEdge = this.editEdge.bind(this);
		this.prepareAddNode = this.prepareAddNode.bind(this);
		this.prepareEditNode = this.prepareEditNode.bind(this);
		this.prepareEditEdge = this.prepareEditEdge.bind(this);
		this.startEditEdgeMode = this.startEditEdgeMode.bind(this);
		this.endEditEdgeMode = this.endEditEdgeMode.bind(this);
		this.deleteNode = this.deleteNode.bind(this);
		this.deleteEdge = this.deleteEdge.bind(this);
		this.getNetworkData = this.getNetworkData.bind(this);
		this.updateLinkPhrase = this.updateLinkPhrase.bind(this);
		this.clickChip = this.clickChip.bind(this);
	}
	state={
		mode: this.props.mode.addNode,
		showInputBox:'none',
		linkphrase:{}
	}
	static defaltProps={
		data:{
			nodes:[],
			edges:[],
		}
	}
	componentDidMount(){
		//shortcut 
		document.addEventListener('keydown', (e)=>{
	        if((navigator.appVersion.indexOf("Win")!==-1 && e.shiftKey && e.ctrlKey) ||
	        	(navigator.appVersion.indexOf("Mac")!==-1 && e.shiftKey && e.metaKey)){
	        	console.log('shift press')
	          	this.startEditEdgeMode();
	        }        
		})
		document.addEventListener('keyup', (e)=>{
			if((navigator.appVersion.indexOf("Win")!==-1 && (e.shiftKey || e.ctrlKey)) ||
	        	(navigator.appVersion.indexOf("Mac")!==-1 && (e.shiftKey || e.metaKey))) {
		        	console.log('shift press')
		          	this.endEditEdgeMode();
		        }
		})
		firebase.database().ref('Phrases').on('value', this.updateLinkPhrase)
	}
	prepareAddNode(){
		this.setState({showInputBox:'block', mode:this.props.mode.addNode,editingEdge:false})
	}
	prepareEditNode(nodeData){
		if(nodeData){
			this.setState({showInputBox:'block',mode:this.props.mode.editNode, nodeData:nodeData})
		}
	}
	prepareEditEdge(edgeData){
		if(edgeData){
			this.setState({showInputBox:'block',mode:this.props.mode.editEdge, edgeData:edgeData})
		}
	}
	addNode(node){
		this.network.addNode(node)
	}
	editNode(node){
		this.network.editNode(node)
	}
	editEdge(edge){
		this.network.editEdge(edge)
	}
	startEditEdgeMode(){
		this.setState({editingEdge:true})
	}
	endEditEdgeMode(){
		this.setState({editingEdge:false})
	}
	deleteNode(){
		this.network.deleteNode(this.state.nodeData)
	}
	deleteEdge(){
		this.network.deleteEdge(this.state.edgeData)
	}
	getNetworkData(){
		return this.network.getNetworkData();
	}
	updateLinkPhrase(snapshot){
		if(snapshot.val()){
			var linkphrase = snapshot.val();
			this.setState({linkphrase})
		}
		// console.log(this.state.linkphrase)
	}
	clickChip(e){
		console.log(e)
		var edge = this.state.edgeData;
		edge.label = e.label;
		this.editEdge(edge);
	}
	render(){
		console.log(this.props.graphParameter)
		return (
			<div style={{display:'flex', flexDirection:'column', height:'100%', width:'100%'}}>
				<ColorCode />
				<div style={{display:'flex', flex:'1 1 94%'}}>
			        <Network style={{display:'flex', height:'100%', width:'100%'}}
						ref={network=>{this.network = network}}
						data={this.props.data} colors={this.props.color} 
						prepareAddNode={this.prepareAddNode} 
						prepareEditNode={this.prepareEditNode}
						prepareEditEdge={this.prepareEditEdge}
						jumpToVideoTime={this.props.jumpToVideoTime}
	            		getTimeStamp={this.props.getTimeStamp}
	            		videoTime={this.props.videoTime}
	            		editingEdge={this.state.editingEdge}
	            		options={this.props.graphParameter}
	            		endEditEdgeMode={this.endEditEdgeMode}/>
	            	<div className='prompt' style={{display:(this.state.editingEdge===true)?'block':'none'}}>
						Click on the starting concept and drag the edge to connect to another concept
					</div>
	            </div>
	            
            	<div style={{display:'flex', flex:'1 0 40px'}}>
					<InputBox
						className='inputbox'
						mode={this.state.mode}
						nodeData={this.state.nodeData}
						edgeData={this.state.edgeData}
						handleNewNode={this.addNode}
						handleEditNode={this.editNode}
						handleEditEdge={this.editEdge}
						deleteEdge={this.deleteEdge}
						deleteNode={this.deleteNode}
						disabled={this.state.editingEdge}
						ref={input=>{this.inputBox = input}}/>
					<RaisedButton style={{
									width:'30%',
									display: 'block',
									}}
						labelStyle={{textTransform:'none'}}
				      label={buttonLabel['add-edge']}
				      labelPosition="after"
				      primary={true}
				      disabled={this.state.editingEdge}
				      onClick={this.startEditEdgeMode}/>
			      </div>
		    </div>
			)
	}
}
					