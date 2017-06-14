import React, {Component} from 'react'
//var __html = require('./Help.html');

export default class Help extends Component{
	render() {
	    return (
	        <div style={{padding:'10px'}}>
	        	<h3>What is concept map?</h3>
	        	<img src={'./image/demo3.png'} />

	        	<h3 id="what-can-i-do-">What can I do?</h3>
				<h4 id="improve-the-concept-map-by-">Improve a concept map by...</h4>
				
				<p><strong>Add link:</strong> Click on the &#39;Add link&#39; button (shortcut: ctrl-shit / mac user: cmd-shift) and then drag-and-drop from the starting concept to the target concept.</p>
				<p><strong>Add link phrase / Edit link phrase:</strong> Click on the link and type the link phrase in the input area (on the bottom).</p>
				<p><strong>Move concept(s): </strong>You can drag on concept to move it or drag the canvas (any white space) to move the whole concept map.</p>
				<p><strong>Zoom in/out concept map </strong>You can <em>scroll</em> on the concept map to zoom in and out the view.</p>
	
				<h4 id="use-the-concept-map-to-">Use the concept map to...</h4>
				<p><strong>Check current lecture progress:</strong> We highlight the concepts that are covered by the video with orange colors.</p>
				<p><strong>Navigate video:</strong> You can <em>double click</em> one concept to jump to according video time.</p>
				<p><strong>Review the lecture:</strong> You can review the concept map even after listing the lecture.</p>
	        </div>
	    );
	}
}