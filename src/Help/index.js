import React from 'react';
const styles={
	container:{
		padding:'0px 30px',
	}
}
const Stage1 = (
		<div style={styles.container}>
			<p className='text'> Add concepts </p>
			<p> A timestamp will be automatically attached to the concept when you add a concept.</p>
			<img src='/image/demo1-add.gif' alt='demo add concepts' />
			<p className='text'> Edit concepts and timestamp</p>
			<p> You can edit the concept and the timestamp. But while the video is playing the list will keep scrolling to the bottom, so pause the video as you edit.</p>
			<img src='/image/demo1-edit.gif' alt='demo edit concept'/>
			<p className='text'> Delete concepts </p>
			<img src='/image/demo1-delete.gif' alt='demo delete concept'/>
			<p className='text'> Navigate video with concept timestamp </p>
			<p> You can click on the concept and the video will jump to the certain time </p>
			<img src='/image/demo1-time.gif' alt='demo navigation'/>
			<p className='text'> Submit result </p>
			<p> Remember to submit your result! You will see a warning message if the number of concepts is under requirement, otherwise you will see a success message.
			And then you will get access to Post-test</p>
			<img src='/image/demo1-save.gif' alt='demo submit result'/>
		</div>
	)
const Stage2 = (
		<div style={styles.container}>
			<p className='text'> Practice 2: link concepts </p>
			<p> Beside the video, there is a canvas, where you can make a concept map to represent your understanding on the lecture. 
			A concept map is a graph consisted of nodes(concepts), links(relationship of concepts), and link phrases(label on the links).
			Previous learners have find out key concepts, which are presented on the canvas. 
			In this practice, you need to link those key concepts to show their relationship and structure. </p>
			
			<p className='text'> Link concepts and delete links</p>
			<p>You can drag to move the concepts. When you want to make a link, click on 'Add link' button and drag-and-drop from starting concept to end concept.
			If you want to delete links, click on the link and you will see a delete button.</p>
			<img src='/image/demo2-link.gif' alt='demo linking'/>
	        
	        <p className='text'> Add concepts & use concept to navigate the video </p>
	        <p> You can also create new concepts. Our system will automatically generate a video timestamp on that concept.
	        All concepts (except for blue color ones) have timestamps which allow you to jump to according video section by double clicking the concept.</p>
        	<img src='/image/demo2-add-navigate.gif' alt='demo add concept'/>

        	<p className='text'> Edit and delete concepts </p>
        	<p> Click on the concept, and you can change the wording or delete it</p>
        	<img src='/image/demo2-edit-delete.gif' alt='demo edit concept'/>

        	<p className='text'> Zoom and Move </p>
        	<p>Scroll on the canvas can zoom in/out the scene, and drag on white space can move the whole graph.</p>
        	<img src='/image/demo2-move.gif' alt='demo zoom and move'/>

        	<p className='text'> Submit your result! </p>
        	<p>Remember to submit your result! If you got a success message, you will get access to post-test :)</p>
			<img src='/image/demo2-save.gif' alt='demo submit result'/>
        </div>
)
const Stage3 = (
		<div style={{padding:'10px'}}>
	        <h3>What is concept map?</h3>

        	<h3 id="what-can-i-do-">What can I do?</h3>
			<h4 id="improve-the-concept-map-by-">Improve a concept map by...</h4>
			
			<p><strong>Add link:</strong> Click on the &#39;Add link&#39; button (shortcut: ctrl-shit / mac user: cmd-shift) and then drag-and-drop from the starting concept to the target concept.</p>
			<p style={{color:'red'}}><strong>Add link phrase / Edit link phrase:</strong> Click on the link and type the link phrase in the input area (on the bottom).</p>
			<p><strong>Move concept(s): </strong>You can drag on concept to move it or drag the canvas (any white space) to move the whole concept map.</p>
			<p><strong>Zoom in/out concept map </strong>You can <em>scroll</em> on the concept map to zoom in and out the view.</p>

			<h4 id="use-the-concept-map-to-">Use the concept map to...</h4>
			<p><strong>Check current lecture progress:</strong> We highlight the concepts that are covered by the video with orange colors.</p>
			<p><strong>Navigate video:</strong> You can <em>double click</em> one concept to jump to according video time.</p>
			<p><strong>Review the lecture:</strong> You can review the concept map even after listing the lecture.</p>
        </div>
)
const Help =({stage})=>{
	var target = null;
	console.log('Stage: '+stage)
    switch(stage){
    	case 1: target = Stage1; break;
		case 2: target =  Stage2; break;
		case 3: target =  Stage3; break;
		default: break;
    }
    return target
}
export default Help