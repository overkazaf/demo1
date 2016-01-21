;define(function (require) {
	'use strict';
	var $=require('jquery');
	var logs=require('./loger');
	var tools = require('./tools');


		require('jqUI');

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
			// $(document).on('mousedown', this.rotCls, function (event) {
			// 	event.preventDefault();
			// 	if (!$(this).data('draggable')) {
			// 		$(this).draggable({
			// 			drag: function(event, ui){
			// 				var $parent = $(this).parent();
			// 			   	var position = $parent.position();
			// 			   	var offset = $parent.offset();
			// 			   	var W = $parent.outerWidth();
			// 			   	var H = $parent.outerHeight();
			// 			   	var x = position.left;
			// 			   	var y = position.top;
			// 			   	var w = W/2;
			// 			   	var h = H/2;
			// 			   	var cx = x + w;
			// 			   	var cy = y + h;
			// 			   	var mouseX = event.pageX - offset.left;
			// 			   	var mouseY = event.pageY - offset.top;
			// 			   	console.log('mouseX', mouseX);
			// 			   	console.log('mouseY', mouseY);


			// 			  }
			// 		});

			// 		$(this).data('drabbalge', true);
			// 	}
			// });

			$(document).on('mousedown', this.cls, function(event) {

				event.preventDefault();
				that.dragger=$(this).closest('plugin-warp');
				if(that.dragger.hasClass('state-disable')==true) return;
				that.draggable=true;
				/* Act on the event */
				var offset=that.dragger.position();
				var mouseX=event.pageX,mouseY=event.pageY;

				var degree = tools.getRotationDegrees(that.dragger);
				var alpha = degree * Math.PI / 180;
				var W = that.dragger.outerWidth();
				var H = that.dragger.outerHeight();
				var dx = H * Math.sin(alpha) - W/2;
				var dy = H * Math.cos(alpha) - H/2;

				that.ox = offset.left;
				that.oy = offset.top;
				that.px=mouseX-offset.left;
				that.py=mouseY-offset.top;
			});
			$(document).on('mouseup',function(){
				if(that.dragger!=null){
					if(typeof that.callback=='function') that.callback.call(that,that.dragger)
				}
				that.draggable=false;
				that.dragger=null;
			});

			var timeout;
			$(document).on('mousemove', function(event){
				if(that.draggable==true) {
					that.move(event);
				}
			});
		},
		move:function(event){
			var that=this;
			var mouseX=event.pageX,mouseY=event.pageY;
			var left = mouseX - this.px;
			var top = mouseY - this.py;

			that.dragger.css({
				left:left,
				top:top
			});
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