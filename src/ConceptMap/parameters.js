import PropTypes from 'prop-types';
export const propTypes = {
	    data: PropTypes.shape({
	      nodes: PropTypes.array,
	      edges: PropTypes.array,
	    }),
	    options: PropTypes.object,
	    colors: PropTypes.arrayOf(PropTypes.string),
	    jumpToVideoTime: PropTypes.func,
	    getTimeStamp: PropTypes.func,
	    className: PropTypes.string,
	    videoTime: PropTypes.number,
  	}
export const defaultProps = {
		data:{
			nodes:[],
			edges:[]
		},
	    options: {
	    	layout:{
	    		hierarchical:{
	      			enabled:false,
	      			direction: 'UD',
	      			levelSeparation: 50,
	      			sortMethod:'directed',
	      			treeSpacing:100,
	      			parentCentralization: false,
	      		},
	    	},
	    	physics: {
			    forceAtlas2Based: {
			      gravitationalConstant: -28,
			      springLength: 100,
			      springConstant: 0.56,
			      avoidOverlap: 0.5,
			      "damping": 1,
			    },
			    maxVelocity: 50,
			    minVelocity: 0.75,
			    stabilization:false,
			    solver: 'forceAtlas2Based',
			    "timestep": 0.5,
				stabilization: {
			      enabled: true,
			      iterations: 1000,
			      updateInterval: 50,
			      onlyDynamicEdges: false,
			      fit: false
			    },
			},
	    	edges:{
	    		color:'#333333',
	    		chosen: false,
	    		arrows:{
	    			to: {enabled: true, scaleFactor:0.3, type:'arrow'},
	    		}
	    	},
	    	nodes:{
	    		shape:'box',
	    		size:50,
	    		chosen: false,
	    		widthConstraint: 50,
	    	},
	    	locale: 'en',
		    locales:{
			  en: {
			    edit: 'Edit',
			    del: 'Delete selected',
			    addEdge: 'Add Link (shoutcut: "Shift")',
			    editEdge: 'Edit Link',
			    addNode: 'Add Concept',
			    addDescription: 'Click in an empty space to place a new concept.',
			    edgeDescription: 'Click on a node and drag the edge to another node to connect them.',
			    editEdgeDescription: 'Click on the control points and drag them to a node to connect to it.',
			    createEdgeError: 'Cannot link edges to a cluster.',
			    deleteClusterError: 'Clusters cannot be deleted.',
			    editClusterError: 'Clusters cannot be edited.'
			  }
			},
			manipulation:false,
			interaction:{
				selectConnectedEdges:false,
				keyboard:{
					enabled: false,
				}
			},
	    },
	    linkphraseNodeOptions:{
	    	borderWidth:0,
	    	color: {
	    		background:'#ffffff'
	    	},
	    },
	    colors: ['#FFF282', '#7DB9D1', '#77FFA9', '#FF9393', '#FF9554'],
	    videoTime: 0,
	  }
