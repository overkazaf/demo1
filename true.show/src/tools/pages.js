;define(function (require) {
	'use strict';
	var $=require('jquery');
	var tools=require('./tools');
	var tpler=require('./tpler');
	var tpl='<li id="{{id}}" class="page-item {{active}}">\
						<div class="page-cont">\
							<div class="page-thumb">{{conts}}</div>\
						</div>\
						<div class="page-title-warp clearfix">\
							<div class="page-title">第<b class="page-num">{{page}}</b>页</div>\
							<div class="page-menu">\
							</div>\
						</div>\
					</li>';
	var ctmtpl='<div class="contextmenu page-contextmenu">\
								<div type="del-page" class="ctm-item page-ctm">删除页面</div>\
								<div class="ctm-split-line"></div>\
								<div type="copy-bg" class="ctm-item page-ctm">复制背景</div>\
								<div type="paste-bg" class="ctm-item page-ctm state-disable">粘贴背景</div>\
								<div class="ctm-split-line"></div>\
								<div type="copy-page" class="ctm-item page-ctm">复制页面</div>\
								<div type="paste-page-defore" class="ctm-item page-ctm state-disable">粘贴页面（之前）</div>\
								<div type="paste-page-after" class="ctm-item page-ctm state-disable">粘贴页面（之后）</div>\
								<div class="ctm-split-line"></div>\
								<div type="paste-layer" class="ctm-item page-ctm state-disable">粘贴图层</div>\
								<div type="save-template" class="ctm-item page-ctm">保存为模板</div>\
							</div>';

	var sorttpl='<li class="page-sort"></li>';
	var disable='state-disable',
			visible='state-visible';

	var defopts={
		id:'#pagesBox',
		addbtn:'#newPageBtn',
		item:'.page-item',
		thumb:'.page-thumb',
		activeCls:'page-active',
		pagenum:'.page-num',
		draggerCls:'page-dragger',
		ctmcls:'.page-ctm',
		changePageCallback:null,	//切换页面
		newPageCallback:null,			//创建新页面
		delPageCallback:null,			//删除页面
		copyPageCallback:null,		//拷贝页面
		pastePageCallback:null,		//粘贴页面
		copyBgCallback:null,			//拷贝背景
		pasteBgCallback:null,			//粘贴背景
		pasteLayerCallback:null,	//粘贴图层
		saveTemplateCallback:null,//保存为模板
		sortIndexCallback:null		//排序
	};
	function Pages(opts){
		this.opts=$.extend(defopts, opts);
		this._temp=null;
		this.draggable=false;
		this.dragger=null;
		this.bx=0;
		this.by=0;
		this.px=0;
		this.py=0;
		this.sy=0;
		this.timer=null;
		this.currpager=null;
		this.ctmpage=null;
		this.copyer={
			pager:false,	//拷贝页面
			layer:false,	//拷贝图层
			bger:false		//拷贝背景
		}
		this.ctm=null;
		this.bindEvent();
	}
	Pages.prototype={
		init:function(data,idx){
			var data=data||[];
			var idx=idx==undefined?0:idx;
			var i=0,l=data.length;
			var tpls='';
			for(;i<l;i++){
				tpls+=tpl.replace('{{id}}',data[i].id)
									.replace('{{name}}',data[i].name)
									.replace('{{page}}',i+1)
									.replace('{{conts}}',tpler.generatePage(data[i],true))
									.replace('{{active}}',idx==i?this.opts.activeCls:'');
			}
			$(this.opts.id).html(tpls);
			this.currpager=$(this.opts.id).find(this.opts.item).eq(idx);
		},
		addNewPage:function(){
			var id=tools.uuid();
			var domstr=tpl.replace('{{page}}',$(this.opts.id).find(this.opts.item).size()+1)
										.replace('{{id}}',id)
										.replace('{{name}}','')
										.replace('{{conts}}','')
										.replace('{{active}}','');
			$(domstr).appendTo($(this.opts.id));
			if(typeof this.opts.newPageCallback=='function'){
				this.opts.newPageCallback(id);
			}
		},
		addElement:function(data,target,after){
			var el=tpler.generatePlugin(data,true);
			if(target!=undefined){
				if(after==true){
					$(el).insertAfter(this.getTarget(target));
				}else{
					$(el).insertBefore(this.getTarget(target));
				}
			}else{
				$(el).appendTo(this.currpager.find(this.opts.thumb));
			}
		},
		getTarget:function(id){
			return $(this.opts.id).find(id);
		},
		refresh:function(data){
			var tpl=tpler.generatePage(data,true);
			this.currpager.html(tpl);
		},
		setCSS:function(id,css,styles){
			var obj=this.currpager.find('#'+id);
			obj.attr({
				styles: styles
			}).css(css);
		},
		remove:function(page){
			var that=this;
			var newActivePage=-1;
			var rmdom=$(this.opts.id).find(this.opts.item).eq(page);
			var isActive=rmdom.hasClass(this.opts.activeCls);
			rmdom.remove();
			that.resetPageNum();
			if(isActive){
				if(page<=$(this.opts.id).find(this.opts.item).size()-1){
					newActivePage=page;
				}else if(page>0){
					newActivePage=page-1;
				}
				if(newActivePage>-1){
					this.currpager=$(this.opts.id).find(this.opts.item).eq(newActivePage);
					this.currpager.addClass(this.opts.activeCls);
					this.changePage();
				}
			}
		},
		removeAll:function(){
			var that=this;
			$(this.opts.id).find(this.opts.item).each(function(i){
				if(i==0){
					$(this).html('');
					that.currpager=$(this);
					that.currpager.addClass(that.opts.activeCls);
					that.changePage();
				}else{
					$(this).remove();
				}
			});
		},
		removeElement:function(id){
			$(this.opts.id).find('#'+id).remove();
		},
		bindEvent:function(){
			var that=this;
			that.resetOffset();
			$(this.opts.id).on('click',that.opts.item,function(event){
				event.preventDefault();
				if(that.currpager.attr('id')==$(this).attr('id')) return;
				that.currpager.removeClass(that.opts.activeCls);
				$(this).addClass(that.opts.activeCls);
				that.currpager=$(this);
				console.log('current', that.currpager.index());
				that.changePage(that.currpager.index());
			});
			$(document).on('click',that.opts.addbtn,function(event){
				event.preventDefault();
				that.addNewPage();
			});
			//拖拽
			$(this.opts.id).on('mousedown', this.opts.item, function(event) {
				event.preventDefault();
				var self=this;
				/* Act on the event */
				that.timer=setTimeout(function(){
					that.draggable=true;
					that.dragger=$(self);
					that._temp=$(sorttpl).insertAfter(that.dragger);
					var offset=that.dragger.offset();
					var mouseX=event.pageX,mouseY=event.pageY;
					that.px=mouseX-offset.left;
					that.py=mouseY-offset.top;
					that.sy=$(that.opts.id).parent().scrollTop();

					that.dragger.removeClass(that.opts.item.substr(1)).addClass(that.opts.draggerCls);
					clearTimeout(that.timer);
					that.timer=null;
				},50);
			});
			$(document).on('mouseup',function(event){
				that.reset();
				var t=event.target;
				var cls=$(t).attr('class');
				if(that.ctm!=null&&cls){
					if(cls.indexOf('ctm-item')==-1
							&&cls.indexOf('contextmenu')==-1
							&&cls.indexOf('ctm-split-line')==-1){
						that.ctm.remove();
					}
				}
			});
			$(document).on('mousemove', function(event){
				if(that.draggable==true&&that.dragger!=null) that.move(event);
			});
			//右击事件
			$(this.opts.id).on('contextmenu',this.opts.item, function(event) {
				event.preventDefault();
				that.ctmpage=$(this).find(that.opts.pagenum).text();
				$('.contextmenu').remove();
				var ctm=$(ctmtpl).appendTo('body');
				if(that.copyer.pager==true){
					ctm.find('[type="paste-page-defore"]').removeClass(disable);
					ctm.find('[type="paste-page-after"]').removeClass(disable);
				}
				if(that.copyer.layer==true)
					ctm.find('[type="paste-layer"]').removeClass(disable);
				if(that.copyer.bger==true)
					ctm.find('[type="paste-bg"]').removeClass(disable);

				var mouseX=event.pageX,mouseY=event.pageY;
				if(mouseY+$(ctm).height()>$(window).height()){
					mouseY=$(window).height()-$(ctm).height()-20;
				}
				ctm.css({
					left:mouseX+'px',
					top:mouseY+'px'
				});
				that.ctm=ctm;
			});
			$(document).on('click',this.opts.ctmcls,function(event){
				event.preventDefault();

				if($(this).hasClass('disable')){
					that.ctm.remove();
					return;
				};
				var cmd=$(this).attr('type');
				switch(cmd){
					case 'del-page':
						if(typeof that.opts.delPageCallback=='function')
							that.opts.delPageCallback(that.ctmpage);
					break;
					case 'copy-bg':
						if(typeof that.opts.copyBgCallback=='function')
							that.opts.copyBgCallback(that.ctmpage);
					break;
					case 'paste-bg':
						if(typeof that.opts.pasteBgCallback=='function')
							that.opts.pasteBgCallback(that.ctmpage);
					break;
					case 'copy-page':
						if(typeof that.opts.copyPageCallback=='function')
							that.opts.copyPageCallback(that.ctmpage);
					break;
					case 'paste-page-defore':
						if(typeof that.opts.pastePageCallback=='function')
							that.opts.pastePageCallback(that.ctmpage,false);
					break;
					case 'paste-page-after':
						if(typeof that.opts.pastePageCallback=='function')
							that.opts.pastePageCallback(that.ctmpage,true);
					break;
					case 'paste-layer':
						if(typeof that.opts.pasteLayerCallback=='function')
							that.opts.pasteLayerCallback(that.ctmpage);
					break;
					case 'save-template':
						if(typeof that.opts.saveTemplateCallback=='function')
							that.opts.saveTemplateCallback(that.ctmpage);
					break;
				}
				that.ctm.remove();
				that.ctmpage=null;
			})
		},
		move:function(event){
			var that=this;
			var mouseX=event.pageX,mouseY=event.pageY;
			var //left=mouseX-this.px-this.bx,
					top=mouseY-this.py-this.by;
			that.dragger.css({
				top:top+this.sy
			});
			this.movedom(mouseY);
		},
		movedom:function(y){
			var that=this;
			$(this.opts.id).find(this.opts.item).each(function(i){
				var offset=$(this).offset();
				if(y>=offset.top&&y<=offset.top+$(this).height()){
					if(y>=offset.top+$(this).height()/2){
						//before
						that._temp.insertAfter($(this));
					}else{
						//after
						that._temp.insertBefore($(this));
					}
				}
			});
		},
		reset:function(){
			var that=this;
			if(this.draggable==true&&this.dragger!=null&&this._temp!=null){
				this.dragger.removeAttr('style')
										.removeClass(this.opts.draggerCls)
										.addClass(this.opts.item.substr(1))
										.insertAfter(this._temp);
				this._temp.remove();
				var newSort=[];
				$(this.opts.id).find(this.opts.item).each(function(i){
					$(this).find(that.opts.pagenum).html(i+1);
					newSort.push(this.id);
				});
				if(typeof that.opts.sortIndexCallback=='function')
					that.opts.sortIndexCallback(newSort);
			}
			this.draggable=false;
			this.dragger=null;
			this._temp=null;
			this.px=0;
			this.py=0;
			if(this.timer!=null){
				clearTimeout(this.timer);
				this.timer=null;
			}
		},
		resetOffset:function(){
			var offset=$(this.opts.id).offset();
			this.bx=offset.left;
			this.by=offset.top;
		},
		changePage:function(){
			if(typeof this.opts.changePageCallback=='function'){
				var idx=this.currpager.find(this.opts.pagenum).text();
				this.opts.changePageCallback(idx);
			}
		},
		getActivePage:function(){
			this.currpager=$(this.opts.id).find('.'+this.opts.activeCls);
			var idx=this.currpager.find(this.opts.pagenum).text();
			return idx;
		},
		setCopyer:function(key,data){
			this.copyer[key]=data;
		},
		getCopyer:function(key){
			return this.copyer[key];
		},
		pastePage:function(page,after,data){
			var tplstr=tpl.replace('{{id}}',data.id)
									.replace('{{name}}',data.name)
									.replace('{{page}}','')
									.replace('{{conts}}',tpler.generatePage(data,true))
									.replace('{{active}}','');
			if(page>=$(this.opts.id).find(this.opts.item).size()){
				$(this.opts.id).append(tplstr);
			}else{
				$(tplstr).insertBefore($(this.opts.id).find(this.opts.item).eq(page));
			}
			this.resetPageNum();
		},
		resetPageNum:function(){
			var that=this;
			$(this.opts.id).find(this.opts.item).each(function(i){
				$(this).find(that.opts.pagenum).html(i+1);
			});
		},
		showElement:function(id,bool){
			if(bool==false){
				$(this.opts.id).find('#'+id).show();
			}else{
				$(this.opts.id).find('#'+id).hide();
			}
		}
	};

	return Pages;
});