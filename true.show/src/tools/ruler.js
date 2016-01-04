;define(function (require) {
	'use strict';
	var $=require('jquery');
	var logs=require('./loger');
	var Ruler=function(bid,rid){
		this.visible=false;
		this.ruler=$(rid);
		this.bid=bid;
		this.bar='.ruler-bar';
		this.barSize=10;
		this.line='.ruler-line';
		this.info='.ruler-info'

		this.offset=null;
		this.state=null;
		this.curelem=null;
		this.ori=null;

		this.vlines=[];
		this.hlines=[];
		this.ids=0;
		this.nearest=3;

		this.init();
	};
	Ruler.prototype={
		init:function(){
			this.offset=this.ruler.offset();
			this.bindEvent();
		},
		bindEvent:function(){
			var that=this;
			$(document).on('click', this.bid, function(event) {
				event.preventDefault();
				/* Act on the event */
				var state=$(this).data('state');
				if(state=='on'){
					that.visible=false;
					that.ruler.hide();
					$(this).data('state','off');
				}else{
					that.visible=true;
					that.ruler.show();
					$(this).data('state','on');
				}
			});
			$(document).on('mousedown',this.bar,function(event){
				that.resetOffset();
				event.preventDefault();
				that.state='bar';
				that.curelem=$(this);
				that.ori=that.getOrientation(that.curelem);
			});
			$(document).on('mousedown',this.line,function(event){
				that.resetOffset();
				event.preventDefault();
				that.state='line';
				that.curelem=$(this);
				that.ori=that.getOrientation(that.curelem);
			});
			$(document).on('mouseup',function(event){
				event.preventDefault();
				if(that.state=='line'&&that.curelem!=null){
					if(that.curelem.data('px')<0){
						that.removeLine();
					}else{
						that.curelem.find(that.info).css('display','none');
					}
				}
				that.state=null;
				that.curelem=null;
				that.ori=null;
			});
			$(document).on('mousemove', function(event) {
				event.preventDefault();
				/* Act on the event */
				if(that.curelem!=null&&that.state!=null){
					that.moveAction(event);
				}
			});
		},
		moveAction:function(event){
			var that=this;
			if(that.state=='bar'){
				that.generateLine(event);
			}else if(that.state=='line'){
				that.moveLine(event);
			}
		},
		generateLine:function(event){
			var linetpl='<span class="ruler-line {{ori}}"><span class="ruler-info"></span></span>';
			var mouseX=event.pageX-this.offset.left,
					mouseY=event.pageY-this.offset.top;
			var line=null;
			if(this.ori=='h'){
				if(mouseY>this.barSize){
					line=$(linetpl.replace('{{ori}}','h')).appendTo(this.ruler);
				}
			}else if(this.ori=='v'){
				if(mouseX>this.barSize){
					line=$(linetpl.replace('{{ori}}','v')).appendTo(this.ruler);
				}
			}
			if(line!=null){
				line.attr('id','ruler-line-'+this.ids++);
				this.state='line';
				this.curelem=line;
				if(this.ori=='h'){
					this.hlines.push(line);
				}else if(this.ori=='v'){
					this.vlines.push(line);
				}
			}
		},
		moveLine:function(event){
			logs.log('moveLine');
			var mouseX=event.pageX-this.offset.left,
					mouseY=event.pageY-this.offset.top;
			var px=-100;
			if(this.ori=='h'){
				px=mouseY+'px';
				this.curelem.css('top',px);
				this.curelem.find(this.info).css({'display':'block','left':mouseX+'px'}).text(px);
				this.curelem.data('px',mouseY);
			}else if(this.ori=='v'){
				px=mouseX+'px';
				this.curelem.css('left',px);
				this.curelem.find(this.info).css({'display':'block','top':mouseY+'px'}).text(px);
				this.curelem.data('px',mouseX);
			}
		},
		getOrientation:function(elem){
			var ori=null;
			if(elem.hasClass('v')){
				ori='v';
			}else if(elem.hasClass('h')){
				ori='h';
			}
			return ori;
		},
		getNearest:function(offset){
			var x=offset.left,
					y=offset.top,
					w=offset.width,
					h=offset.height;
			var left=-1,top=-1;

			var i=0,l=this.vlines.length;
			var px=10000000,diff=0;
			var nearest=this.nearest;
			//x
			for(;i<l;i++){
				px=this.vlines[i].data('px');
				diff=Math.abs(px-x-w);
				if(diff<=nearest){
					nearest=diff;
					left=px;
				}
				diff=Math.abs(px-x);
				if(Math.abs(px-x)<=nearest){
					nearest=diff;
					left=px;
				}
			}
			//y
			i=0,l=this.hlines.length;
			nearest=this.nearest;
			for(;i<l;i++){
				px=this.hlines[i].data('px');
				diff=Math.abs(px-y-h);
				if(diff<=nearest){
					nearest=diff;
					top=px;
				}
				diff=Math.abs(px-y);
				if(Math.abs(px-y)<=nearest){
					nearest=diff;
					top=px;
				}
			}
			return {left:left,top:top}
		},
		removeLine:function(){
			var id=this.curelem.attr('id');
			var lines;
			if(this.ori=='h'){
				lines=this.hlines;
			}else if(this.ori=='v'){
				lines=this.vlines;
			}
			if(lines!=null){
				var i=0,l=lines.length;
				for(;i<l;i++){
					if(id==lines[i].attr('id')){
						lines.splice(i, 1);
						// break;
					}
				}
			}
			this.curelem.remove();
		},
		resetOffset:function(){
			this.offset=this.ruler.offset();
		}
	}

	return Ruler;
});