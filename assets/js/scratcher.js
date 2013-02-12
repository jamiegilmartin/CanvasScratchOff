var Scratcher = window.Scratcher || {};

/**
 * @Class Scratcher
 * @see http://beej.us/blog/data/html5-canvas-globalcompositeoperation/
 */
Scratcher = function( backImg, coverImg, mainCanvas ){
	this.mainCanvas = mainCanvas;
	this.scratchSize = 25;
	this.lineCapProp = 'round'; //'butt','round','square'

	
	this.image = {
		'back': { 'url': backImg, 'img':null },
		'front':{ 'url': coverImg, 'img':null }
	};
	
	this.canvas = {'temp': null, 'draw':null}; // temp and draw canvases

	//check if iOS
	this.isiOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );

	//set event types
	this.downEvent = this.isiOS ? 'touchstart' : 'mousedown';
	this.moveEvent  = this.isiOS ? 'touchmove' : 'mousemove';
	this.endEvent  = this.isiOS ? 'touchend' : 'mouseup';
	this.clickEvent = this.isiOS ? 'touchend' : 'click';
	
	
	this.mousedown = false;
	
	this.loadImages();
};

Scratcher.prototype.loadImages = function(){
	var self = this,
		loadCount = 0,
		objSize = 0,
		key;
		
	function imagesLoaded(){
		loadCount++;
		if(loadCount >= 2){
			self.setCanvases();
			
		}
	}
		
	for(key in this.image) if(this.image.hasOwnProperty(key)) {
		objSize++;
		//image[key].img = new Image();
		this.image[key].img = document.createElement('img'); // image is global
		this.image[key].img.onLoad = imagesLoaded();
		this.image[key].img.src = this.image[key].url;

	}
};
Scratcher.prototype.setCanvases = function(){
	var self = this;
	
	this.mainCanvas.width = this.image.back.img.width;
	this.mainCanvas.height = this.image.back.img.height;

	// create the temp and draw canvases, and set their dimensions
	// to the same as the main canvas:
	this.canvas.temp = document.createElement('canvas');
	this.canvas.draw = document.createElement('canvas');
	this.canvas.temp.width = this.canvas.draw.width = this.mainCanvas.width;
	this.canvas.temp.height = this.canvas.draw.height = this.mainCanvas.height;
	
	
	//events
	this.mouse = this.isiOS ? Drawing.utils.captureTouch( this.mainCanvas ) : Drawing.utils.captureMouse( this.mainCanvas );

	this.mainCanvas.addEventListener(this.downEvent, function(e){

		e.preventDefault();
	
		self.mousedown = true;
		
		self.draw( self.canvas.draw, self.mouse.x, self.mouse.y, true );
		self.recompositeCanvases();
		
		return false;
		
	}, false);
	this.mainCanvas.addEventListener(this.moveEvent, function(e){
	
		if(self.mousedown){
			self.draw( self.canvas.draw, self.mouse.x, self.mouse.y, false );
			self.recompositeCanvases();
			
			return false;
		}else{
			return true;
		}
		
	}, false);
	this.mainCanvas.addEventListener(this.endEvent, function(){
		if(self.mousedown){
			self.mousedown = false;
			return false;
		}
		
		return true;
		
	}, false);
	

	
	function recomposite(){
		self.recompositeCanvases();
	}
	setTimeout(recomposite, 100);//TODO fix 
		
};

Scratcher.prototype.recompositeCanvases = function(){
	var tempctx = this.canvas.temp.getContext('2d');
	var mainctx = this.mainCanvas.getContext('2d');

	// Step 1: clear the temp
	this.canvas.temp.width = this.canvas.temp.width; // resizing clears

	// Step 2: stamp the draw on the temp (source-over)
	tempctx.drawImage(this.canvas.draw, 0, 0);

	// Step 3: stamp the background on the temp (!! source-atop mode !!)
	tempctx.globalCompositeOperation = 'source-atop';
	tempctx.drawImage(this.image.back.img, 0, 0);

	// Step 4: stamp the foreground on the display canvas (source-over)
	mainctx.drawImage(this.image.front.img, 0, 0);

	// Step 5: stamp the temp on the display canvas (source-over)
	mainctx.drawImage(this.canvas.temp, 0, 0);

};

Scratcher.prototype.draw = function( can, x, y, fresh ){
	var ctx = can.getContext('2d');
	ctx.lineWidth = this.scratchSize;
	ctx.lineCap = ctx.lineJoin = this.lineCapProp;
	ctx.strokeStyle = '#f00'; // can be any opaque color
	if (fresh) {
		ctx.beginPath();
		// this +0.01 hackishly causes Linux Chrome to draw a
		// "zero"-length line (a single point), otherwise it doesn't
		// draw when the mouse is clicked but not moved:
		ctx.moveTo(x+0.01, y);
	}
	ctx.lineTo(x, y);
	ctx.stroke();
};

Scratcher.prototype.changeScratcher = function( brushSize, capShape ){
	this.scratchSize = brushSize;
	this.lineCapProp = capShape; //'butt','round','square'
	this.recompositeCanvases();
};






