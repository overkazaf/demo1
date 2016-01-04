;define(function (require) {
	'use strict';
	var $=require('jquery');
	var logs=require('./loger');
	var constTypes=[
				'#panel-style',
				'#panel-position',
				'#panel-animate',
				'#panel-function'
			];
	var types={
		canvas:['#panel-canvas','#panel-function'],
		text:['#panel-text'].concat(constTypes),
		photo:['#panel-photo'].concat(constTypes),
		button:['#panel-button'].concat(constTypes),
		map:['#panel-map','#panel-position','#panel-animate'],
		chart:['#panel-chart','#panel-style','#panel-position','#panel-animate'],
		audio:['#panel-audio'].concat(constTypes),
		video:['#panel-video','#panel-style','#panel-position','#panel-animate'],
		effects:['#panel-effects'],
		form:['#panel-form','#panel-formconfig'].concat(constTypes)
	}
	function confPanel(id,cls,callback,opts){
		this.id=id;
		this.cls=cls;
		this.types=opts||types;
		this.callback=callback;
		this.cachetype='canvas';
		this.init();
	}
	confPanel.prototype={
		init:function(){
			//绑定仅作测试使用，发布后不直接绑定事件。
			this.bindEvent();
		},
		bindEvent:function(){
			var that=this;
			$(document).on('click','[plugin-type]',function(event){
				event.preventDefault();

				/* Act on the event */
				var t=$(this).attr('plugin-type');
				if (t != 'canvas') {
					that.swaptab(t);
				}
			});
		},
		swaptab:function(key){
			if(this.types[key]==undefined) return;
			this.cachetype=key;
			$(this.id).find(this.cls).removeClass('visible');
			var i=0,l=this.types[key].length;
			for(;i<l;i++){
				var t=$(this.id).find(this.types[key][i]);
				t.addClass('visible')
				if(i==0&&typeof this.callback=='function'){
					this.callback(t);
				}
			}
		}
	};

	return confPanel;
});