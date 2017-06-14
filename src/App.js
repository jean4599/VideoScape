import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import Drawer from 'material-ui/Drawer';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import './SplitPanel.css';
import ConceptMap from './ConceptMap';
import Help from './Help'
import ColorCode from './ColorCode';
import ProgressStepper from './ProgressStepper.js'
import VideoPlayer from './Video/VideoPlayer'
import {REF} from './Firebase';
import firebase from 'firebase'  
import {toArray} from './utils'
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.getTimeStamp = this.getTimeStamp.bind(this);
    this.updateVideoTime = this.updateVideoTime.bind(this);
    this.getVideo = this.getVideo.bind(this);

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.jumpToVideoTime = this.jumpToVideoTime.bind(this);

    this.saveConceptMap = this.saveConceptMap.bind(this);

    this.getVideo();
  }
  state = {
    tree: {
      nodes: [],
      edges: [],
    },
    colors: ['#FF7637', '#FFAC87', '#FFD3C0', '#FFECE4', '#FFFAF8'],
    error: false,
    timeQueue:[],
    size: undefined,
    dragging: false,
    snakbarOpen:false,
    helpOpen:true,
  }
  componentDidMount() {
    //get initial nodes and links from firebase
    
    firebase.database().ref(REF.Node).orderByChild("time").once('value').then((snapshot)=>{
      var nodes = []
      snapshot.forEach(function(childSnapshot){
        //console.log(childSnapshot.val())
        //var result = childSnapshot.val()
        nodes.push(childSnapshot.val())
      })
      firebase.database().ref(REF.Link).once('value').then((snapshot)=>{
        const edges = toArray(snapshot.val());
        this.setState({
          tree: {
            nodes: nodes,
            edges: edges
          }
        })
      })
      
    })

  //   //save the concept map before closeing the window
  //   window.addEventListener("beforeunload", (ev) => 
  //   {  
  //       const conceptMapData = this.conceptmap.getNetworkData();
  //       firebase.database().ref().push(conceptMapData)
  //   });
  }
  saveConceptMap(){
    if(this.name.value==='')alert('We need your name to save the data')
    const conceptMapData = this.conceptmap.getNetworkData();
    firebase.database().ref('result/'+this.name.value).set(conceptMapData, (error)=>{
      if(error){
      //do something if save failed
      }else{
        this.setState({snakbarOpen:true})
      }
    })
  }
  //get the video URL from firebase
  getVideo(){
    firebase.database().ref(REF.Video).once('value').then((snapshot)=>{
      console.log('video: ',snapshot.val())
      this.setState({videoURL: snapshot.val()})
    })
  }
  getTimeStamp(){
    return this.refs.player.getPlayedTime();
  }
  updateVideoTime(time){
    this.setState({videoTime: time})
  }
  jumpToVideoTime(time){
    this.refs.player.jumpToTime(time);
  }
  handleDragStart() {
      this.setState({
          dragging: true,
      });
  }

  handleDragEnd() {
      this.setState({
          dragging: false,
      });
      setTimeout(() => {
          this.setState({ size: undefined });
      }, 0);
  }

  handleDrag(width) {
      if (width >= 300 && width <= 400) {
          this.setState({ size: 300 });
      } else if (width > 400 && width <= 500) {
          this.setState({ size: 500 });
      } else {
          this.setState({ size: undefined });
      }
  }
  handleToggle = () => this.setState({helpOpen: !this.state.helpOpen});

  handleSnackbarClose = () => this.setState({snakbarOpen: false});

  render() {
    return (
      <div className='container'>
        <div className='top'>
          <div className='save-map'>
            <input placeholder='Your Name' ref={n=>{this.name = n}}></input>
            <RaisedButton label="Save my concept map" onClick={()=>this.saveConceptMap()}/>
            <Snackbar
              open={this.state.snakbarOpen}
              message="Your concept map is saved! Good job :)"
              autoHideDuration={4000}
              onRequestClose={this.handleSnackbarClose}
            />
          </div>
          <ProgressStepper className='progressStepper'/>
          <div className='map-info'>
            <FlatButton
                  icon={<HelpIcon />}
                  label='Help'
                  style={{float:'right', minWidth:'36px', display:'inline'}}
                  onTouchTap={this.handleToggle}/>
            <ColorCode style={{float:'right', zIndex: 2, padding:'10px'}}/>
          </div>
        </div>

        <div className='bottom'>
          <SplitPane split="vertical" minSize='30%' maxSize='70%' defaultSize='53%'>
           
            <div className='container'>
              <VideoPlayer className='video' courseURL={this.state.videoURL}  width={'100%'} height={'100%'} controls={true} ref='player'
              updateVideoTime={this.updateVideoTime}/>
            </div>

            <div className='container'>

              <ConceptMap className="output" graphData={this.state.tree} colors={this.state.colors}
              jumpToVideoTime={this.jumpToVideoTime}
              getTimeStamp={this.getTimeStamp}
              videoTime={this.state.videoTime}
              ref={o=>{this.conceptmap = o}}/>
            </div>
       
          </SplitPane>
        </div>

        <Drawer
                docked={false}
                width={500}
                open={this.state.helpOpen}
                openSecondary={true}
                onRequestChange={(helpOpen) => this.setState({helpOpen})}
              >
              <Help />
          </Drawer>
      </div>
    );
  }
}
export default App;

