//requestAnimFrame
window.requestAnimFrame = (function(callback){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};
})();


/**
 * @Class Drawing 
 */
var Drawing = window.Drawing || {}; 

Drawing.utils = {};
Drawing.utils.captureMouse = function (element) { 
	var mouse = {x: 0, y: 0}; 

	element.addEventListener('mousemove', function (event) { 
		var x, y; 
		if (event.pageX || event.pageY) { 
			x = event.pageX; 
			y = event.pageY; 
		} else { 
			x = event.clientX + document.body.scrollLeft + 
			document.documentElement.scrollLeft; 
			y = event.clientY + document.body.scrollTop + 
			document.documentElement.scrollTop; 
		} 
		x -= element.offsetLeft; 
		y -= element.offsetTop; 

		mouse.x = x; 
		mouse.y = y; 
	}, false); 

	return mouse; 
};
Drawing.utils.captureTouch = function (element) { 
	var touch = {x: null, y: null, isPressed: false}; 

	element.addEventListener('touchstart', function (event) { 
		touch.isPressed = true; 
	}, false); 

	element.addEventListener('touchend', function (event) { 
		touch.isPressed = false; 
		touch.x = null; 
		touch.y = null; 
	}, false); 

	element.addEventListener('touchmove', function (event) { 
		var x, y, 
		touch_event = event.touches[0]; //first touch 

		if (touch_event.pageX || touch_event.pageY) { 
			x = touch_event.pageX; 
			y = touch_event.pageY; 
		} else { 
			x = touch_event.clientX + document.body.scrollLeft + 
			document.documentElement.scrollLeft; 
			y = touch_event.clientY + document.body.scrollTop + 
			document.documentElement.scrollTop; 
		} 
		x -= element.offsetLeft; 
		y -= element.offsetTop; 

		touch.x = x; 
		touch.y = y; 
	}, false); 

	return touch; 
}; 













