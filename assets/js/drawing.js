var Drawing = window.Drawing || {}; 

/**
 * @Class Drawing
 */
Drawing = function(){
	var self = this,
		date = new Date(),
		time = date.getTime();
		
	this.canvas = document.getElementById('mainCanvas');
	this.bufferCanvas = document.getElementById('bufferCanvas');
	this.canvasW = this.canvas.width;
	this.canvasH = this.canvas.height;
	this.penSize = 15;
	this.penHardness = 0.5;//really just opacity for now
	
	this.underImg = new Image();
	this.overImg = new Image();
	this.underImg.src = document.getElementById('underImg').value;
	this.overImg.src = document.getElementById('overImg').value;
	
	this.mousedown = false;
	
	if(this.canvas.getContext){
		
		this.c = this.canvas.getContext('2d');
		this.b  = this.bufferCanvas.getContext('2d');

		//clear canvases
		this.c.clearRect( 0, 0, this.canvasW, this.canvasH );
		this.b.clearRect( 0, 0, this.canvasW, this.canvasH );
 
		//stamp draw on buffer (source-over)
		this.b.drawImage(this.canvas, 0, 0)

		//stamp the background on the temp (!! source-atop mode !!)
		this.b.globalCompositeOperation = 'source-atop';
		this.b.drawImage(this.underImg, 0, 0);
		
		//stamp the foreground on the display canvas (source-over)
		this.c.drawImage(this.overImg, 0, 0);
		
		//stamp the temp on the display canvas (source-over)
		this.c.drawImage(this.bufferCanvas, 0, 0);
		
		
		//mouse events
		this.mouse = Drawing.utils.captureMouse( this.canvas );
		this.canvas.addEventListener('mousedown', function(){
			console.log('x : '+ self.mouse.x +' y: '+self.mouse.y)
			self.mousedown = true;
		}, false);
		this.canvas.addEventListener('mousemove', function(){
			if(self.mousedown){
				self.draw();
			}
		}, false);
		this.canvas.addEventListener('mouseup', function(){
			self.mousedown = false;
		}, false);
		
		
	}
	
	
};




Drawing.prototype.draw = function(){
	//this.c.fillStyle = "rgba(200,0,0,0.2)";
	this.c.fillStyle = 'rgba(255,0,0,'+this.penHardness+')';  
	this.c.fillRect (this.mouse.x, this.mouse.y, this.penSize , this.penSize );
	
	var data = this.c.getImageData(0,0, this.canvasW, this.canvasH );
	for (var x = 0; x < data.width; x++) {
		for (var y = 0; y < data.height; y++) {
			
			if (this.c.isPointInPath(x,y)) {
				
				var n = x + (data.width * y);
				var index = n*4; 
				var r = data.data[index];
				var g = data.data[index+1];
				var b = data.data[index+2];
				var v = r*0.21+g*0.71+b*0.07; // weighted average
				data.data[index]   = v;
				data.data[index+1] = v;
				data.data[index+2] = v;
				
			}
		}
	}
	this.c.putImageData(data,0,0);
	
	var coordinate = {
		x : this.mouse.x,
		y : this.mouse.y
	}
	
	
	//this.drawData.push( coordinate );
	
	console.log( data )
};



//https://developer.mozilla.org/samples/canvas-tutorial/6_1_canvas_composite.html
//https://github.com/benbarnett/Canvas-Mask/blob/master/js/canvasMask.js
//http://www.html5canvastutorials.com/advanced/html5-canvas-get-image-data-tutorial/
//http://www.briffett.net/1169/web-development/html5-canvas-image-editor/
		//set composite property
		//this.c.globalCompositeOperation = 'copy';
		
		//draw white
		//this.c.fillStyle = "rgba(200,0,0,0.6)";  
		//this.c.fillRect (0, 0, 15, 15);
/*		
Drawing.prototype.init = function(){
	var self = this,
		
	if(this.canvas.getContext){  
		this.c = this.canvas.getContext('2d');
		//this.c.webkitImageSmoothingEnabled = true;
		// drawing code here

		this.underImg = new Image();
		this.overImg = new Image();
		this.underImg.onload = function() {
			self.imageDraw(this);
		};
		this.overImg.onload = function() {
			self.imageDraw(this);
		};
		this.underImg.src = document.getElementById('underImg').value;
		this.overImg.src = document.getElementById('overImg').value;
		
		
		//this.c.drawImage( this.underImg, 0, 0, this.canvasW, this.canvasH );
		//this.c.drawImage( this.overImg, 0, 0, this.canvasW, this.canvasH );
		
		//var imgData = this.c.getImageData(0, 0, this.canvasW, this.canvasH );
		//var data = imgContents.data;
		
		//alphaData = this.c.getImageData(0, this.canvasH, this.canvasW, this.canvasH).data;
		//console.log(data)
		
		//modify image data
		
		//draw result back
		//this.c.putImageData(imageData, 0, 0);
		
		
		
		var mouse = Drawing.utils.captureMouse( this.canvas );
		this.canvas.addEventListener('mousedown', function(){
			console.log('x : '+ mouse.x +' y: '+mouse.y)
			self.mousedown = true;
		}, false);
		this.canvas.addEventListener('mousemove', function(){
			//console.log('x : '+ mouse.x +' y: '+mouse.y)
			
			if(self.mousedown){
				self.c.fillStyle = "rgba(200,0,0,0.2)";
				//self.c.fillStyle = "rgba(255,0,0,0)";  
				self.c.fillRect (mouse.x, mouse.y, 15, 15);
			}
			
		}, false);
		this.canvas.addEventListener('mouseup', function(){
			self.mousedown = false;
		}, false);

		//animate
		//this.interval = 0;
		
		//this.animate(time);
	}
};


Drawing.prototype.setImage = function(imageObj) {
	this.c.drawImage(imageObj, 0, 0, this.canvasW, this.canvasH );

	var imgData = this.c.getImageData(0, 0, this.canvasW, this.canvasH );
	var data = imgData.data;
	
       // quickly iterate over all pixels
	for(var i = 0, n = data.length; i < n; i += 4) {
		var red = data[i];
		var green = data[i + 1];
		var blue = data[i + 2];
		var alpha = data[i + 3];
	}
	
	// or iterate over all pixels based on x and y coordinates.
	// loop through each row

	for(var y = 0; y < this.canvasH; y++) {
		// loop through each column
		for(var x = 0; x < this.canvasW; x++) {
			var red = data[((this.canvasW * y) + x) * 4];
			var green = data[((this.canvasW * y) + x) * 4 + 1];
			var blue = data[((this.canvasW * y) + x) * 4 + 2];
			var alpha = data[((this.canvasW * y) + x) * 4 + 3];
		}
	}

	// draw the new image with the modified image data
	//this.c.putImageData(imgData, this.canvasW, this.canvasH);
};



//http://www.html5canvastutorials.com/labs/html5-canvas-interactive-ball-physics/
Drawing.prototype.animate = function(lastTime){
	var self = this,
		date = new Date(),
		time = date.getTime(),
		timeDiff = time - lastTime;
	this.interval++; 
	//console.log(this.interval);

	//update
	//this.ship.update( timeDiff );
	
	//clear
	this.c.clearRect( 0, 0, this.canvasW, this.canvasH );
	
	//draw
	//this.ship.draw();
	
	// request new frame
	requestAnimFrame(function(){
		if(self.playing){
			self.animate(time);
		}else{
			console.log('stopped')
		}
	});
};
*/