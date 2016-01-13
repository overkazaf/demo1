;define(function (require) {
	'use strict';
	var $=require('jquery');
	var logs=require('./loger');
	function dragger(boxid,cls,callback){
		this.boxid=boxid||'app-page';
		this.cls=cls||'.ui-draggable-handle';
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
			$(document).on('mousedown', this.cls, function(event) {
				event.preventDefault();
				that.dragger=$(this).parent();
				if(that.dragger.hasClass('state-disable')==true) return;
				that.resetOffset();
				that.draggable=true;
				/* Act on the event */
				var offset=that.dragger.offset();
				var mouseX=event.pageX,mouseY=event.pageY;
				that.px=mouseX-offset.left;
				that.py=mouseY-offset.top;
			});
			$(document).on('mouseup',function(){
				if(that.dragger!=null){
					if(typeof that.callback=='function') that.callback.call(that,that.dragger)
				}
				that.px=0;
				that.py=0;
				that.draggable=false;
				that.dragger=null;
			});

			
			$(document).on('mousemove', function(event){
				if(that.draggable==true) that.move(event);
			});
		},
		move:function(event){
			var that=this;
			var mouseX=event.pageX,mouseY=event.pageY;
			var left=mouseX-this.px-this.bx,
					top=mouseY-this.py-this.by;
			this.setOffset(that.dragger,left,top);
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