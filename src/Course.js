import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import Drawer from 'material-ui/Drawer';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import RaisedButton from 'material-ui/RaisedButton'
import './SplitPanel.css';
import Workflow from './Workflow'
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage3 from './Stage3';
import ConceptMap from './ConceptMap';
import Help from './Help'
import ProgressStepper from './ProgressStepper.js'
import VideoPlayer from './Video/VideoPlayer'
import {REF} from './Firebase';
import firebase from 'firebase'  
import injectTapEventPlugin from 'react-tap-event-plugin';
import './Course.css';
import {httpGet} from './utils';
import {Spin} from 'antd';
import FeedbackResult from './FeedbackResult'

injectTapEventPlugin();

class Course extends Component {
  constructor(props) {
    super(props);
    this.getTimeStamp = this.getTimeStamp.bind(this);
    this.updateVideoTime = this.updateVideoTime.bind(this);

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.jumpToVideoTime = this.jumpToVideoTime.bind(this);

    this.saveResult = this.saveResult.bind(this);
    this.onSubmitProgress = this.onSubmitProgress.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
  }
  state = {
    graphData: {
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
    submitting:false,
    showResult:false,
  }
  componentWillMount() {
    //Step1: get course ID
    var courseId = this.props.match.params.course;
    var stage;
    this.setState({courseId: courseId})
    console.log('courseId: ', courseId);
    console.log('uid: ', this.props.uid)
    
    //Step2: get workflow stage
    firebase.database().ref(REF(courseId, this.props.uid).STAGE).once('value').then((snapshot)=>{
        console.log('stage: '+snapshot.val())
        stage = snapshot.val()
        this.setState({stage: stage})

        //Step4: get initial data from firebase
        console.log(typeof(stage))
        switch (stage){
          case 1:
            break;
          case 2:
            console.log('in stage 2')
            var nodes = []
            firebase.database().ref(REF(courseId, this.props.uid).STAGE1.SERVER_PROCESSED_DATA).orderByChild("time").once('value').then((snapshot)=>{  
              snapshot.forEach(function(childSnapshot){
                nodes.push(childSnapshot.val())
              })
              console.log(nodes)
              this.setState({graphData: {nodes:nodes, edges: []}})
            })
            break;
          case 3:
            console.log('in stage 3')
            firebase.database().ref(REF(courseId, this.props.uid).STAGE2.SERVER_PROCESSED_DATA).once('value').then((snapshot)=>{
              console.log(snapshot.val())
              this.setState({graphData: snapshot.val()})
              
            })
            break;

          default:
            break;
        }
    })
    //Step3: get video url
    firebase.database().ref(REF(courseId, this.props.uid).VIDEO).once('value').then((snapshot)=>{
      console.log('video: ',snapshot.val())
      this.setState({videoURL: snapshot.val()})
    })

  //   //save the concept map before closeing the window
  //   window.addEventListener("beforeunload", (ev) => 
  //   {  
  //       const conceptMapData = this.conceptmap.getNetworkData();
  //       firebase.database().ref().push(conceptMapData)
  //   });
  }
  saveResult(){
    var data;
    if(this.state.stage===1){ //Stage 1
      data = this.conceptExtraction.getResult();
      console.log(data)
      if(data.length>4){
        firebase.database().ref(REF(this.state.courseId,this.props.uid).STAGE1.USER_SAVED_DATA).set(data,(error)=>{
          if(error){

          }else{
            this.onSubmitProgress()
            httpGet('http://140.114.79.99:5000/videoscape/api/'+this.state.courseId+'/process/stage1',this.onSubmitSuccess)
          }
        })
      }else{
        alert('at least 5 concepts are needed');
      }
    }
    else if(this.state.stage===2){ //Stage 2
      data = this.conceptmap1.getNetworkData();
      if(data.edges.length<data.nodes.length/2){
        alert('Every concept should has at least one link conneted to other concepts');
      }
      else if(data.nodes.length<5){
        alert('At least 5 concepts are required')
      }
      else{
        firebase.database().ref(REF(this.state.courseId,this.props.uid).STAGE2.USER_SAVED_DATA).set(data, (error)=>{
          if(error){

          }else{
            this.onSubmitProgress()
            httpGet('http://140.114.79.99:5000/videoscape/api/'+this.state.courseId+'/process/stage2',this.onSubmitSuccess)
          }
        })
      }
    }
    else if(this.state.stage===3){ //Stage 3
      data = this.conceptmap2.getNetworkData();
        //check all the labels
      var links = data.edges;
      var flag = false;
      for (var link in links){
        if(!('label' in links[link])){
          flag = true;
          break;
        }
      }
      if(flag)alert('Each link should has a link phrase');
      else{
         firebase.database().ref(REF(this.state.courseId,this.props.uid).STAGE3.USER_SAVED_DATA).set(data, (error)=>{
          if(error){
          //do something if save failed
          }else{
            this.props.handleStageFinish(this.state.courseId);
            this.setState({snakbarOpen:true})
          }
        })
      }
    }
  }
  onSubmitProgress(){
    console.log('submit progress')
    this.setState({submitting:true})
  }
  onSubmitSuccess(){
    console.log('submit success')
    this.props.handleStageFinish(this.state.courseId);
    this.setState({
          submitting:false,
          snakbarOpen:true,
        })
    // var serverData;
    // if(stage===1){
    //   firebase.database().ref(REF(this.state.courseId,this.props.uid).STAGE1.SERVER_PROCESSED_DATA).once('value').then((snapshot)=>{
    //     this.setState({
    //       submitting:false,
    //       snakbarOpen:true,
    //       showResult:true,
    //       userData:userData,
    //       serverData:snapshot.val(),
    //     })
    //   })
    // }
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
      <div className='flex-column' style={{height:'100%', padding:'20px'}}>
        <div className='flex' style={{flexBasis:'100px'}}>
          <div className='save-map'>
            <Spin spinning={this.state.submitting} delay={500} >
              <RaisedButton label="Submit my result" onClick={()=>this.saveResult()}/>
            </Spin>
            
            <Snackbar
              open={this.state.snakbarOpen}
              message="Your result is saved! Good job :)"
              autoHideDuration={4000}
              onRequestClose={this.handleSnackbarClose}
            />
          </div>
          <ProgressStepper className='progressStepper' stage={this.state.stage}/>
          <div className='map-info'>
            <FlatButton
                  icon={<HelpIcon />}
                  label='Help'
                  style={{float:'right', minWidth:'36px', display:'inline'}}
                  onTouchTap={this.handleToggle}/>
          </div>
        </div>

        <div className='flex' style={{flex:'1 1 100%'}}>
          <SplitPane split="vertical" minSize='30%' maxSize='70%' defaultSize='53%'>
           
            <VideoPlayer className='video' courseURL={this.state.videoURL}  width={'100%'} height={'100%'} controls={true} ref='player'
            updateVideoTime={this.updateVideoTime}/>

            <Workflow courseId={this.state.courseId} stage={this.state.stage} style={{width:'100%', height:'100%'}}>
                <Stage1
                  courseId={this.state.courseId}
                  uid={this.props.uid}
                  getTimeStamp={this.getTimeStamp}
                  jumpToVideoTime={this.jumpToVideoTime}
                  ref={o=>{this.conceptExtraction = o}}/>
                <Stage2 style={{width:'100%', height:'100%'}}>
                  <ConceptMap 
                    courseId={this.state.courseId}
                    uid={this.props.uid}
                    className='flex' 
                    graphData={this.state.graphData} 
                    colors={this.state.colors}
                    jumpToVideoTime={this.jumpToVideoTime}
                    getTimeStamp={this.getTimeStamp}
                    videoTime={this.state.videoTime}
                    stage={this.state.stage}
                    mode={{addNode:'add-node', editNode:'edit-node', editEdge:'edit-edge'}}
                    ref={o=>{this.conceptmap1 = o}}/>
                </Stage2>
                <Stage3 style={{width:'100%', height:'100%'}}>
                  <ConceptMap 
                    courseId={this.state.courseId}
                    uid={this.props.uid}
                    className='flex' 
                    graphData={this.state.graphData} 
                    colors={this.state.colors}
                    jumpToVideoTime={this.jumpToVideoTime}
                    getTimeStamp={this.getTimeStamp}
                    videoTime={this.state.videoTime}
                    stage={this.state.stage}
                    mode={{addNode:'none', editNode:'none', editEdge:'edit-edge'}}
                    ref={o=>{this.conceptmap2 = o}}/>
                </Stage3>
            </Workflow>
       
          </SplitPane>
        </div>

        <Drawer
                docked={false}
                width={500}
                open={this.state.helpOpen}
                openSecondary={true}
                onRequestChange={(helpOpen) => this.setState({helpOpen})}
              >
              <Help stage={this.state.stage} />
          </Drawer>
      </div>
    );
  }
}
export default Course;

