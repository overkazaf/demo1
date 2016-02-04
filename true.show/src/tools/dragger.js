;define(function (require) {
	'use strict';
	var $=require('jquery');
	var logs=require('./loger');
	var tools = require('./tools');

	function dragger(boxid,cls,callback){
		this.boxid=boxid||'app-page';
		this.cls=cls||'.ui-draggable-handle';
		this.rotCls='.ui-rotate-handle';
		this.bx=0;
		this.by=0;
		this.px=0;
		this.py=0;
		this.draggable=false;
		this.dragger=null;
		this.callback=callback;
		this.init();
	}
	dragger.prototype={
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			var that=this;
			$(document).on('mousedown', this.rotCls, function (event) {
				event.preventDefault();

				that.rotater = $(this).closest('plugin-warp');

		        var ox = parseFloat($(that.rotater).offset().left) + $(that.rotater).width() / 2;
		        var oy = parseFloat($(that.rotater).offset().top) + $(that.rotater).height() / 2;

		        that.rotater.ox = ox;
		        that.rotater.oy = oy;
		        that.rotatable = true;
			});

			$(document).on('mousedown', this.cls, function(event) {

				event.preventDefault();
				that.dragger=$(this).closest('plugin-warp');
				if(that.dragger.hasClass('state-disable')==true) return;
				that.draggable=true;
				/* Act on the event */
				var oDragger = that.dragger[0];
				var offsetX = oDragger.offsetLeft;
				var offsetY = oDragger.offsetTop;
				var mouseX=event.pageX,mouseY=event.pageY;
                
				that.px=mouseX-offsetX;
				that.py=mouseY-offsetY;
			});
			$(document).on('mouseup',function(){
				if(that.dragger!=null){
					if(typeof that.callback=='function') that.callback.call(that,that.dragger)
				}

				that.rotatable = false;
				that.rotater = null;

				that.draggable=false;
				that.dragger=null;
			});

			var timeout;
			$(document).on('mousemove', function(event){
				if(that.draggable==true) {
					that.move(event);
				}

				if (that.rotatable ==true) {
					that.rotate(event);
				}
			});
		},
		move:function(event){
			var that=this;
			var mouseX=event.pageX,mouseY=event.pageY;
			var left = mouseX - this.px;
			var top = mouseY - this.py;
			that.dragger.css({
				left : left,
				top : top
			});
		},

		rotate : function (event) {
			var that=this;	
			var cx = event.pageX - that.rotater.ox;
            var cy = event.pageY - that.rotater.oy;
            var to = Math.abs(cx / cy);
            var angle = Math.atan(to) / (2 * Math.PI) * 360;

            if (cx < 0 && cy < 0) {
                // 相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系 
                angle = -angle;
            } else if (cx < 0 && cy > 0) {
                // 左下角,3象限  
                angle = -(180 - angle);
            } else if (cx > 0 && cy < 0) {
                //右上角，1象限
                angle = angle;
            } else if (cx > 0 && cy > 0) {
                //右下角，2象限
                angle = 180 - angle;
            }

            if (angle < 0) angle += 360;
            that.rotater.attr('data-deg', parseInt(angle));
            tools.rotateEl(that.rotater[0], angle);
		},
		setOffset:function(t,left,top){
			t.css({
				left:left,
				top:top
			});
		},
		resetOffset:function(){
			var offset=$(this.boxid).offset();
			this.bx=offset.left;
			this.by=offset.top;
		}
	};

	return dragger;
});