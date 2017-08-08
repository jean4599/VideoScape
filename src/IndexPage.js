import React,{Component} from 'react';
import './IndexPage.css';

export default class IndexPage extends Component{
	render(){
		return (
				<div style={{height:'100%',top:'64px',position:'absolute'}}>
					<div className='section white'>
						<h1 className='title'>
							Large Scale Collaborative Video Learning Powered By 
							Learners-Generated Concept Map
						</h1>
						<div className='subtitle'>
							Learners who watch the same video will contribute to different part of the concept map.
							VideoScape will aggregate all the results and delievered learners a concept map
							that shows a common understanding on the content.
						</div>
						{this.props.children[0]}
					</div>
					<div className='section gray'>
						<div className='subtitle'>
							As you watch video, you will receive one of three concept mapping practices.
							We believe it will help you organize your knowledge better.
						</div>
					</div>
					<div className='section white'>
						<div className='row'>
							<div className='img-container'>
								<img src='./image/workflow-stage1.png' alt='Stage 1'/>
							</div>
							<div className='text'>
								<b>Practice 1: Extract concepts</b><br/>
								As you watch video, list out key concepts.<br/>
								Adjust the time mark of each concept to indicate the right time that it appear in the video.<br/>
							</div>
						</div>
						<div className='row'>
							<div className='img-container'>
								<img src='./image/workflow-stage2.png' alt='Stage 2'/>
							</div>
							<div className='text'>
								<b>Practice 2: Link concepts</b><br/>
								You will see a list of concepts which is aggregated from the concepts learners made in Practice 1.
								As you watch the video, find out the relation between each conepts and link them.
								The expected result of this practice is a connected concept map that can represent the structure of the course.
							</div>
						</div>
						<div className='row'>
							<div className='img-container'>
								<img src='./image/workflow-stage3.png' alt='Stage 3'/>
							</div>
							<div className='text'>
								<b>Practice 3: Label link phrases on the links</b><br/>
								You will see a connected concept map which is aggregated from the results of Practice 2.
								As you watch the video, check the concept map and verbalize the relation between concepts by labeling on the links.
							</div>
						</div>
					</div>
					{this.props.children[1]}
				</div>
			)
	}
}