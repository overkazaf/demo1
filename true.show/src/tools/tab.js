;define(function (require) {
	'use strict';
	var $=require('jquery');
	var logs=require('./loger');

	function taber(attr,evt,act){
		this.tab=attr||'.tab-box';
		this.nav='.tab-nav';
		this.cont='.tab-item';
		this.evt=evt||'click';
		this.act=act||'active';

		this.tabs={};//{id,idx[,navs,conts]}
		this.count=0;
		this.init();
	}
	taber.prototype={
		init:function(){
			var that=this;
			$(this.tab).each(function(ti){
				var idx=$(this).data('nidx');
				that.tabs[ti]={id:ti,idx:idx||0,elem:$(this)};

				$(this).data('tid',ti).find(that.nav).each(function(ni){
					$(this).data('tid',ti).data('nidx', ni);
				});
			});
			this.bindEvent();
		},
		bindEvent:function(){
			var that=this;
			$(document).on(this.evt, this.nav, function(event){
				event.preventDefault();
				that.showTab($(this));
			});
		},
		getTab:function(tid){
			return this.tabs[tid];
		},
		showTab:function(t){
			var that=this;
			/* Act on the event */
			var tid=t.data('tid'),
					idx=t.data('nidx');
			var tab=that.getTab(tid);
			if(tab==undefined||tab==null) return;
			var navs=tab.elem.find(that.nav);
			navs.eq(tab.idx).removeClass(that.act);
			navs.eq(idx).addClass(that.act);

			var conts=tab.elem.find(that.cont);
			conts.eq(tab.idx).removeClass(that.act);
			conts.eq(idx).addClass(that.act);

			tab.idx=idx;
		}
	};

	return taber;
});