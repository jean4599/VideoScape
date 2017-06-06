import React, {Component} from 'react'
//var __html = require('./Help.html');

export default class Help extends Component{
	render() {
	    return (
	        <div style={{padding:'10px'}}>
	        	<p>我們想設計一個以概念圖為核心的線上學習互動模式

				您可以邊看教學影片邊建立概念圖來整理影片的內容，而您的概念圖將會與其他學生的概念圖整合。

				我們的系統會不斷的透過學生的概念圖學習，最後形成一個完整的概念圖，讓所有的學生都可以利用他輔助學習。

				現在我們的系統有了一組由10個學生的概念圖整合產生的概念，

				請您將這些概念連接起來，組成您的概念圖:)
	    		最後別忘了儲存喔！
	    		</p>

	        	<h3 id="what-can-i-do-">What can I do?</h3>
				<h4 id="improve-the-concept-map-by-">Generate a concept map by...</h4>
				
				<p><strong>Add concept / Edit concept:</strong> Click on <em>any white space</em> and type the concept in the input area (on the bottom). When you add concept, the concept will store the video time automatically when it is added to the concept map. You can further use that timestamp to navigate the video.</p>
				<p><strong>Add link:</strong> Click on the &#39;Add link&#39; button and then drag-and-drop from the starting concept to the target concept. You can also press ctrl-shift (mac users: cmd-shift) to enable adding link.</p>
				<p><strong>Add link phrase / Edit link phrase:</strong> Click on the link and type the link phrase in the input area (on the bottom).</p>
				<p><strong>Delete concept / link:</strong> Click on the deleted target and click the delete button.</p>
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