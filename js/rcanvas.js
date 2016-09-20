(function(window, $) {
	
	var canvas = function(options) {
		this.STATIC = $.extend({}, canvas.STATIC, options);
		this.init();
	};

	canvas.STATIC = {
		id: '',
		width: 500,
		height: 500,
		scale:1,
		imageSrc: ''
	};

	canvas.prototype.init = function() {

		this.mycv = $(this.STATIC.id)[0];
		this.mycv.myctx = this.mycv.getContext("2d");
		
		this.mycv.width = this.STATIC.width * this.STATIC.scale;
		this.mycv.height = this.STATIC.height * this.STATIC.scale;
		
		this.mycv.myctx.scale(this.STATIC.scale,this.STATIC.scale);

		var img = new Image(); 
		img.src = this.STATIC.imageSrc;
		
		var self = this;
		
		img.onload = function() {
			self.mycv.myctx.drawImage(img, 0, 0);
		}
		
		this.mycv.addEventListener('touchstart', touchLister, false);
		this.mycv.addEventListener('touchend', touchLister, false);
		this.mycv.addEventListener('touchmove',touchLister, false)
	}
	
	function touchLister(event) {
		
		var event = event || window.event;
		
		switch(event.type) {
			case "touchstart":
				var touchEvent = event.changedTouches[0];
				var offsetLeft = event.target.offsetLeft;
				var offsetTop  = event.target.offsetTop;
				
				this.myctx.startX  = touchEvent.pageX - offsetLeft;
				this.myctx.startY  = touchEvent.pageY - offsetTop;
				
				var x  = parseInt(touchEvent.pageX - offsetLeft),
					y  = parseInt(touchEvent.pageY - offsetTop);
					
				var imgData = this.myctx.getImageData(x,y, 1, 1);
				var alpha = imgData.data[3];
				
				this.myctx.needMove = alpha > 0;
				break;
				
			case "touchmove":
				if (this.myctx.needMove){
					this.style.left = (event.changedTouches[0].pageX - this.myctx.startX) + 'px';
					this.style.top = (event.changedTouches[0].pageY - this.myctx.startY) + 'px';
				}
				
				event.preventDefault();
				break;
				
			case "touchend":
				
				break;
		}
	}

	window.Rcanvas = canvas;

})(window, jQuery);