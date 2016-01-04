;define(function (require) {
	'use strict';
	var $=require('jquery');
	var logs=require('./loger');

	function Sounder(id,src,loop){
		this.id=id||'#musicControl';
		this.src=src||'';
		this.dom=null;
		this.state=this.src==""?0:1;
		this.sounder=null;
		this.loop=loop==null||loop==undefined?true:loop;
		this.init();
	}
	Sounder.prototype={
		init:function(){
			this.dom=$(this.id);
			if(this.dom.size()<=0){
				this.dom=$('<div id="musicControl" class="sounder-control-warper" data-tips="'+(this.state==0?'播放':'暂停')+'"><i class="fa fa-pause-circle'+(this.state==0?'':' fa-play-circle')+'"></i>音乐</div>').appendTo('body');
			}
			var audio=$('audio');
			if(audio.size()<=0){
				audio=$('<audio src="'+this.src+'" autoplay="autoplay" loop="loop"></audio>').appendTo('body');
			}
			this.sounder=audio[0];
			this.bindEvent();
		},
		bindEvent:function(){
			var that=this;
			$(document).on('click','#musicControl',function(event){
				event.preventDefault();
				if(that.state==1){
					that.pause();
				}else{
					that.play();
				}
			});
		},
		play:function(){
			this.swapState(1);
		},
		pause:function(){
			this.swapState(0);
		},
		setSound:function(src){
			this.pause();
			this.sounder.src=src;
			this.play();
		},
		swapState:function(state){
			if(state==1){
				$(this.id).attr('data-tips', '暂停')
									.find('i').removeClass().addClass('fa fa-pause-circle');
				this.state=1;
				this.sounder.play();
			}else{
				$(this.id).attr('data-tips', '播放')
									.find('i').removeClass().addClass('fa fa-play-circle');
				this.state=0;
				this.sounder.pause();
			}
		}
	};

	return new Sounder();
});