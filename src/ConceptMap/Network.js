import React, { Component } from 'react';
import vis from 'vis';
import PropTypes from 'prop-types';
import {arraysEqual} from '../utils';
import './style.css'
import {propTypes, defaultProps} from './parameters';

const mergeData = (prev, next) => {
  next.forEach((node) => {
    const prevNode = prev.find(prevNodesEl => prevNodesEl.id === node.id);
    if (prevNode) {
      node.x = prevNode.x; // eslint-disable-line
      node.y = prevNode.y; // eslint-disable-line
      node.px = prevNode.px; // eslint-disable-line
      node.py = prevNode.py; // eslint-disable-line
      node.fixed = prevNode.fixed; // eslint-disable-line
    }
  });
  return next;
};

export default class Network extends Component {
	constructor(props) {
	    super(props);
	    this.addEdge = this.addEdge.bind(this);
	    this.deleteEdge = this.deleteEdge.bind(this);
	    this.deleteNode = this.deleteNode.bind(this);
	    this.addNode = this.addNode.bind(this);
	    this.editNode = this.editNode.bind(this);
	    this.editEdge = this.editEdge.bind(this);
	    this.addEdgeMode = this.addEdgeMode.bind(this);
	    this.getNetworkData = this.getNetworkData.bind(this);
	    this.createNodePosition = this.createNodePosition.bind(this);
	    this.x = 10;
	    this.y = 10;
  	}
	static propTypes = propTypes;
	static defaultProps = defaultProps;

	state={
	  	myEdge:[],
	  	myNode:[],
	  	showInputBox:'none',
	  	clicks:0,
	  }
 	addEdge(edgeData, callback){
 		let edges = this.state.edges;
		if (edgeData.from !== edgeData.to) {
	        edges.add(edgeData);
	       	this.setState({
	       		edges:edges,
	       	})
	    }
      	this.props.endEditEdgeMode();
	}
	addNode(node){
		let nodes = this.state.nodes;
		let time = this.props.getTimeStamp(); //add timestamp of the current video play time
		node.time = time.duration;
		console.log(time)
        nodes.add(node);
        
       	this.setState({
       		nodes:nodes,
       	})
       	console.log('Finish add node')
	}
	editNode(node){
		let nodes = this.state.nodes;
		nodes.update(node);
       	this.setState({
       		nodes:nodes,
       	})
       	this.props.prepareAddNode();
       	console.log('Finish edit node')
	}
	editEdge(edge){
		let edges = this.state.edges;
		edges.update(edge);
		this.setState({
			edges:edges,
		})
		this.props.prepareAddNode();
		console.log(edge)
		console.log('Finish edit edge')
	}
	deleteEdge(edge){
		let edges = this.state.edges;
		edges.remove(edge.id);
		this.setState({
			edges:edges,
		})
		this.props.prepareAddNode();
		console.log(edge)
		console.log('Finish delete edge')
	}
	deleteNode(node){
		let nodes = this.state.nodes;
		nodes.remove(node.id);
       	this.setState({
       		nodes:nodes,
       	})
       	this.props.prepareAddNode();
       	console.log('Finish edit node')
	}
	addEdgeMode(){
		this.network.addEdgeMode();
	}
	getNetworkData(){
		return {
			nodes: this.state.nodes.get(),
			edges: this.state.edges.get()
		}
	}
  	componentDidMount() {
	   const {
	      data: {
	        nodes,
	        edges,
	      },
	      options,
	    } = this.props;
	    console.log(options)
	    this.nodes = this.preprocessNode(nodes)
	    this.nodes = new vis.DataSet(nodes);
	    this.edges = new vis.DataSet(edges);

	    this.setState({
	    	nodes:this.nodes,
	    	edges:this.edges,
	    })

	   	this.data={
				nodes: this.nodes,
				edges: this.edges
			}
	    this.network = new vis.Network(this.container, this.data, options);
	    this.network.enableEditMode();
	    this.network.moveTo({position:{x:120, y:120}})

	    //Handle interaction
	    this.network.on("doubleClick", (params)=>{
	    	console.log('doubleClick')
	    	var nodeId = params['nodes'][0];
	    	const node = this.nodes.get(nodeId)

			if(node.time){				
				this.props.jumpToVideoTime(node.time)
			}
	    })
	    this.network.on("dragEnd", (params)=>{
	    	this.network.storePositions();
	    	this.setState({
	    		dragging:false,
	    		nodes :this.nodes,
	    	})
	    });
	    this.network.on("dragStart",(params)=>{
	    	this.setState({dragging:true})
	    	this.network.setOptions({physics:false})
	    })
	    
	    this.network.on("click", (params)=>{
	    	console.log('click')
	    	var clicks = 0;
	    	var timeout;
	    	clicks++;
			if (clicks === 1) {
		      timeout = setTimeout(()=> {
		        if(params['nodes'].length > 0){ // If click the node, then edit mode
		        	const nodeId = params['nodes'][0];
		        	const node = this.nodes.get(nodeId)
			    	if(node){
			    		this.props.prepareEditNode(node);
			    	}
		        }
		        else if(params['edges'].length > 0){
		        	const edgeId = params['edges'][0];
		        	console.log(edgeId)
		        	const edge = this.edges.get(edgeId)
		        	if(edge){
		        		this.props.prepareEditEdge(edge);
		        	}
		        }
		        else{ //If click edge or canvas
		        	this.props.prepareAddNode();
		        }
		    	
		        clicks = 0;
		      }, 250);
		    } else { // is double click
		      clearTimeout(timeout);
		      this.setState({mode:'add-node'})		      
		      clicks = 0;
		    }
	    });
	}
	shouldComponentUpdate(nextProps, nextState){
		if ((nextState.dragging) || (nextProps.editingEdge && this.props.editingEdge)) return false;
		else return true;
	}
	componentWillReceiveProps(nextProps){
		const {
	      data: {
	        edges,
	        nodes,
	      },
	      videoTime,
	    } = nextProps;

	    if(!arraysEqual(nodes,this.props.data.nodes)){
	    	console.log('new props nodes')
	    	this.x = -this.network.getViewPosition().x + 50
	    	this.y = -this.network.getViewPosition().y + 10
	    	let p_nodes = nodes.map((n,i)=>{
	    		if(!n.x){
	    			var p = this.createNodePosition();
					n.x = p.x;
					n.y = p.y;
					return n
	    		}
	    		return n
	    	})
	    	this.nodes.update(p_nodes.concat(this.state.nodes.get()));
	    	//check and set Position
	    	this.setState({
	    		nodes: this.nodes,
	    	})
	    }
	    if(!arraysEqual(edges,this.props.data.edges)){
	    	console.log('new props edges')
	    	this.edges.update(edges.concat(this.edges.get()));
	    	this.setState({
		    	edges: this.edges,
		    })
	    }
	}
	componentWillUpdate(nextProps, nextState) {
		const{
			videoTime,
			options,
	    } = nextProps;
	    
	    this.nodes = this.preprocessNode(nextState.nodes.get(), videoTime);
	    this.nodes = new vis.DataSet(this.nodes)

	   	this.edges = nextState.edges;
	    //this.edges = new vis.DataSet(this.edges);

		this.data={
				nodes: this.nodes,
				edges: this.edges
			}
    	const focus = this.network.getViewPosition();
    	const scale = this.network.getScale();

	    this.network.setData(this.data)
	    
	    if(nextProps.editingEdge){
	    	//console.log('open manipulation')
	    	this.network.setOptions({
	    		manipulation:{
	    			enabled: true,
	    			addEdge: this.addEdge,
	    			addNode: false,
	    		}
	    	})	
	    	this.network.addEdgeMode();
	    }else{
	    	//console.log('close manipulation')
	    	this.network.setOptions({
	    		manipulation:{
	    			enabled: false,
	    		}
	    	})	  
	    }
	    
	    this.network.moveTo({position:focus, scale: scale, animation: false})

	}
	createNodePosition(){
		var p = {x: this.x, y:this.y}
		if(this.y<300){
			this.y += 30;
		}else{
			this.x += 100;
			this.y = -this.network.getViewPosition().y + 10;
		}
		return p
	}
	preprocessNode(nodes, videoTime){
		let result = nodes.map((node, index)=>{
			//check the node time
			if(node.time === '?' || node.time === null){
				node.color = '#99ccff'
			}
			else if(node.time <= videoTime){
				node.color = '#FF7E45';

			}else node.color = '#939393';
			return node;
		})

		if(result) return result
		else return [];
	}
	render(){
		return (
				<div style={this.props.style} id='network' ref={container=>{this.container = container}} />
			)
	}
}