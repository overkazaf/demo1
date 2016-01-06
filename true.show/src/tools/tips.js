;define(function (require) {
	'use strict';
	var $=require('jquery');
	var logs=require('./loger');

	function tipser(attr){
		this.attr=attr||'[data-tips]';
		this.init();
	}
	tipser.prototype={
		init:function(){
			// logs.log('tips: ','success.');
			this.tipser=this.generateTipsWarp();
			this.bindEvent();
		},
		generateTipsWarp:function(){
			var tips=$('<div id="tips" style="left:-1000px;"></div>');
			tips.appendTo('body');
			return tips;
		},
		bindEvent:function(){
			var that=this;
			$(document).on('mouseover',this.attr,function(event){
				event.preventDefault();
				var offset=$(this).offset();
				var w=$(this).outerWidth(),
						h=$(this).outerHeight(),
						x=offset.left,
						y=offset.top,
						s=$(this).attr('data-tips'),
						p=$(this).attr('tips-position');
				var cls='',acls='',left=0,top=0;
				if(p=='left'){
					cls='tips-right';
					top=y+(h-that.tipser.outerHeight())/2;
					left=x-that.tipser.outerWidth()
					acls='fadeInLeft';
				}else if(p=='right'){
					cls='tips-left';
					top=y+(h-that.tipser.outerHeight())/2;
					left=x+w+5;
					acls='fadeInRight';
				}else if(p=='top'){
					cls='tips-top';
					left=x+(w-that.tipser.outerWidth())/2;
					top=y-that.tipser.outerHeight();
					acls='fadeInDown';
				}else{
					left=x+(w-that.tipser.outerWidth())/2;
					top=y+h+5;
					acls='fadeInUp';
				}
				that.showTips({left:left,top:top,s:s,cls:cls,acls:acls});
			});
			$(document).on('mouseout',this.attr,function(event){
				event.preventDefault();
				that.hideTips();
			});
		},
		showTips:function(opts){
			this.tipser.addClass(opts.cls).html(opts.s).css({
				top: opts.top+'px',
				left: opts.left+'px'
			}).addClass('animated visbile '+opts.acls).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	      $(this).removeClass(opts.acls);
    	});
		},
		hideTips:function(){
			this.tipser.removeClass();
		}
	};
	return new tipser();
});