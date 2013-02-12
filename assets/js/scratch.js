var Scratch = window.Scratch || {}; 

/**
 * @author jamiegilmartin@gmail.com
 * @description Scratch object
 * @see http://beej.us/blog/data/html5-canvas-globalcompositeoperation/
 */
Scratch = {
	init : function(){
		
		//check if iOS
		this.isiOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );
		
		
		/* prevent scroll
		document.addEventListener('touchmove', function(e) {
			e.preventDefault();
		}, false );
		*/
		
		//set event types
		var clickEvent = this.isiOS ? 'touchend' : 'click';
		
	
		var scratcher,
			backImg = 'assets/images/cover.jpg',
			coverImg = 'assets/images/paint.jpg',
			scratchWrap = document.getElementById('scratchWrap'),
			mainCanvas = document.getElementById('scratchCanvas'),
			coinScratcher  = document.getElementById('coinScratcher'),
			fingerScratcher = document.getElementById('fingerScratcher'),
			shellScratcher = document.getElementById('shellScratcher'),
			pickScratcher = document.getElementById('pickScratcher');
			
		if( mainCanvas.getContext ){
			scratcher = new Scratcher( backImg, coverImg, mainCanvas );
			
			//change scratch type
			coinScratcher.addEventListener( clickEvent, function(){
				scratchWrap.className = 'coinScratcher';
				scratcher.changeScratcher( 45, 'square');
			}, false);
			
			fingerScratcher.addEventListener( clickEvent, function(){
				scratchWrap.className = 'fingerScratcher';
				scratcher.changeScratcher( 20, 'round');
			}, false);
			
			shellScratcher.addEventListener( clickEvent, function(){
				scratchWrap.className = 'shellScratcher';
				scratcher.changeScratcher( 40, 'butt');
			}, false);
			
			pickScratcher.addEventListener( clickEvent, function(){
				scratchWrap.className = 'pickScratcher';
				scratcher.changeScratcher( 10, 'round');
			}, false);
			
		}else{
			alert('your browser does not support canvas')
		}
		
		/*
		//events
		var mouse = this.isiOS ? Drawing.utils.captureTouch(document) : Drawing.utils.captureMouse(document);
			document.addEventListener('touchstart', function(e){
			e.preventDefault();
				console.log(mouse.x, mouse.y );
		}, false);*/
		
		
	}
};


//onload
window.onload = function(){
	Scratch.init();
};