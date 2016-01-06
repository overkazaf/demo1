;define(function (require) {
	'use strict';
	var $=require('jquery');
	var logs=require('./loger');
	function resizer(boxid,cls,callback){
		this.boxid=boxid||'app-page';
		this.cls=cls||'.ui-resizable-handle';
		this.minpix=20;
		this.bx=0;
		this.by=0;
		this.px=0;
		this.py=0;
		this.offset=null;
		this.draggable=false;
		this.dragger=null;
		this.ori=null;
		this.callback=callback;
		this.init();
	}
	resizer.prototype={
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			var that=this;
			$(document).on('mousedown', this.cls, function(event) {
				event.preventDefault();
				event.stopPropagation();
				that.dragger=$(this).parent();
				if(that.dragger.hasClass('state-disable')==true) return;
				that.resetOffset();
				that.draggable=true;
				that.ori=that.getOrientation($(this));
				/* Act on the event */
				var offset=that.dragger.offset(),
						position=that.dragger.position();
				that.offset={
					top:offset.top,
					left:offset.left,
					width:that.dragger.width(),
					height:that.dragger.height(),
					x:position.left,
					y:position.top
				}
			});
			$(document).on('mouseup', function(){
				that.clear();
			});
			$(document).on('mousemove', function(event){
				if(that.draggable==true) that.move(event);
			});
		},
		move:function(event){
			var that=this;
			var mouseX=event.pageX,mouseY=event.pageY;
			var px=mouseX-that.offset.left;
			var py=mouseY-that.offset.top;
			var left,top,width,height;
			switch(that.ori){
				case 't':
					height=that.offset.height+(that.offset.top-mouseY);
					top=this.offset.y-(that.offset.top-mouseY);
					if(height<=that.minpix){
						top=null;
						height=null;
					}
				break;
				case 'r':
					width=mouseX-that.offset.left;
					if(width<=that.minpix){
						width=null;
					}
				break;
				case 'b':
					height=mouseY-that.offset.top;
					if(height<=that.minpix){
						height=null;
					}
				break;
				case 'l':
					width=that.offset.width+(that.offset.left-mouseX);
					left=this.offset.x-(that.offset.left-mouseX);
					if(width<=that.minpix){
						left=null;
						width=null;
					}
				break;
				case 'rt':
					height=that.offset.height+(that.offset.top-mouseY);
					top=this.offset.y-(that.offset.top-mouseY);
					if(height<=that.minpix){
						top=null;
						height=null;
					}
					width=mouseX-that.offset.left;
					if(width<=that.minpix){
						width=null;
					}
				break;
				case 'rb':
					height=mouseY-that.offset.top;
					if(height<=that.minpix){
						height=null;
					}
					width=mouseX-that.offset.left;
					if(width<=that.minpix){
						width=null;
					}
				break;
				case 'lt':
					width=that.offset.width+(that.offset.left-mouseX);
					left=this.offset.x-(that.offset.left-mouseX);
					if(width<=that.minpix){
						left=null;
						width=null;
					}
					height=that.offset.height+(that.offset.top-mouseY);
					top=this.offset.y-(that.offset.top-mouseY);
					if(height<=that.minpix){
						top=null;
						height=null;
					}
				break;
				case 'lb':
					width=that.offset.width+(that.offset.left-mouseX);
					left=this.offset.x-(that.offset.left-mouseX);
					if(width<=that.minpix){
						left=null;
						width=null;
					}
					height=mouseY-that.offset.top;
					if(height<=that.minpix){
						height=null;
					}
				break;
			}
			this.setOffset(that.dragger,left,top,width,height);
		},
		setOffset:function(t,left,top,width,height){
			var opt={};
			if(left!=null&&left!=undefined) opt.left=left;
			if(top!=null&&top!=undefined) opt.top=top;
			if(width!=null&&width!=undefined) opt.width=width;
			if(height!=null&&height!=undefined) opt.height=height;
			t.css(opt);
		},
		resetOffset:function(){
			var offset=$(this.boxid).offset();
			this.bx=offset.left;
			this.by=offset.top;
		},
		getOrientation:function(elem){
			var ori=null;
			if(elem.hasClass('top')){
				ori='t';
			}else if(elem.hasClass('right')){
				ori='r';
			}else if(elem.hasClass('bottom')){
				ori='b';
			}else if(elem.hasClass('left')){
				ori='l';
			}else if(elem.hasClass('right-top')){
				ori='rt';
			}else if(elem.hasClass('right-bottom')){
				ori='rb';
			}else if(elem.hasClass('left-top')){
				ori='lt';
			}else if(elem.hasClass('left-bottom')){
				ori='lb';
			}
			return ori;
		},
		clear:function(){
			var that=this;
			if(that.dragger!=null){
				if(typeof that.callback=='function') that.callback.call(this,that.dragger);
			}
			that.px=0;
			that.py=0;
			that.ori=null;
			that.draggable=false;
			that.dragger=null;
		}
	};

	return resizer;
});