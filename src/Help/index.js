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
			Previous learners have make contrubution to the concept map, their aggregation result is shown on the canvas </p>
			
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
		<div style={styles.container}>
			<p className='text'> Practice 3: Add link phrases </p>
			<p> Beside the video, there is a canvas, where you can make a concept map to represent your understanding on the lecture. 
			A concept map is a graph consisted of nodes(concepts), links(relationship of concepts), and link phrases(label on the links).
			Previous learners have make contrubution to the concept map, their aggregation result is shown on the canvas </p>
			
			<p className='text'> Add and edit link phrases </p>
        	<p> Click on the link, and you can edit the label</p>
        	<img src='/image/demo3-link-phrase.gif' alt='demo edit concept'/>

			<p className='text'> Link concepts and delete links</p>
			<p>You can drag to move the concepts. When you want to make a link, click on 'Add link' button and drag-and-drop from starting concept to end concept.
			If you want to delete links, click on the link and you will see a delete button.</p>
			<img src='/image/demo2-link.gif' alt='demo linking'/>
	        
	        <p className='text'> Add concepts & use concept to navigate the video </p>
	        <p> You can also create new concepts. Our system will automatically generate a video timestamp on that concept.
	        All concepts (except for blue color ones) have timestamps which allow you to jump to according video section by double clicking the concept.</p>
        	<img src='/image/demo2-add-navigate.gif' alt='demo add concept'/>

        	<p className='text'> Zoom and Move </p>
        	<p>Scroll on the canvas can zoom in/out the scene, and drag on white space can move the whole graph.</p>
        	<img src='/image/demo2-move.gif' alt='demo zoom and move'/>

        	<p className='text'> Submit your result! </p>
        	<p>Remember to submit your result! If you got a success message, you will get access to post-test :)</p>
			<img src='/image/demo2-save.gif' alt='demo submit result'/>
        </div>
)
const Help =({stage})=>{
	var target = null;
    switch(stage){
    	case '1_1':
    	case '1_2':
    	case '1_3': target = Stage1; break;
		case '2_1':
		case '2_2':
		case '2_3': target =  Stage2; break;
		case '3_1':
		case '3_2': target =  Stage3; break;
		default: break;
    }
    return target
}
export default Help