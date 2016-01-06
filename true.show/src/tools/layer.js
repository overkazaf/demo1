;define(function (require) {
	'use strict';
	var $=require('jquery');
	var tools=require('./tools');
	var tpler=require('./tpler');
	var tpl='<li id="{{id}}" class="page-item {{active}}">\
						<div class="layer-cont clearfix">\
						<span data-tips="{{eye-tips}}" tips-position="right" class="layer-visible layer-item-cmd"><i class="fa {{eye-icon}} fa-lg"></i></span>\
						<span class="layer-type"><i class="fa {{type-icon}}"></i></span>\
						<span class="layer-name">{{name}}</span>\
						<span data-tips="{{lock-tips}}" class="layer-lock layer-item-cmd"><i class="fa {{lock-icon}} fa-lg"></i></span>\
						</div>\
					</li>';
	var ctmtpl='<div class="contextmenu layer-contextmenu">\
								<div type="del-layer" class="ctm-item layer-ctm">删除图层</div>\
								<div class="ctm-split-line"></div>\
								<div type="copy-layer" class="ctm-item layer-ctm">复制图层</div>\
								<div type="paste-layer-defore" class="ctm-item state-disable layer-ctm">粘贴图层（之前）</div>\
								<div type="paste-layer-after" class="ctm-item state-disable layer-ctm">粘贴图层（之后）</div>\
								<div class="ctm-split-line"></div>\
								<div type="lock-layer" class="ctm-item layer-ctm">加锁图层</div>\
								<div type="visible-layer" class="ctm-item layer-ctm">隐藏图层</div>\
								<div class="ctm-split-line"></div>\
								<div type="top-layer" class="ctm-item layer-ctm">置为顶层</div>\
								<div type="up-layer" class="ctm-item layer-ctm">上移一层</div>\
								<div type="down-layer" class="ctm-item layer-ctm">下移一层</div>\
								<div type="bottom-layer" class="ctm-item layer-ctm">置为底层</div>\
							</div>';

	var sorttpl='<li class="layer-sort"></li>';
	var disable='state-disable',
			visible='state-visible';
	var ctmopts={
		'lock':{
			'true':{
				icon:'fa-lock',
				text:'解锁图层'
			},
			'false':{
				icon:'fa-unlock',
				text:'锁定图层'
			}
		},
		'visible':{
			'true':{
				icon:'fa-eye',
				text:'隐藏图层'
			},
			'false':{
				icon:'fa-eye-slash',
				text:'显示图层'
			}
		}
	};
	var pluginTypes={
		text:{
			text:'文本',
			icon:'fa-font'
		},
		photo:{
			text:'图片',
			icon:'fa-photo'
		},
		chart:{
			text:'图表',
			icon:'fa-area-chart'
		},
		form:{
			text:'表单',
			icon:'fa-file-text'
		},
		button:{
			text:'按钮',
			icon:'fa-square'
		},
		map:{
			text:'地图',
			icon:'fa-map'
		},
		audio:{
			text:'音频',
			icon:'fa-music'
		},
		audio:{
			text:'视频',
			icon:'fa-video-camera'
		}
	}
	function getState(bool,key,item){
		if(bool==false){
			return ctmopts[key]['false'][item];
		}else{
			return ctmopts[key]['true'][item];
		}
	}
	var defopts={
		id:'#layersBox',
		item:'.page-item',
		thumb:'.page-thumb',
		activeCls:'page-active',
		draggerCls:'page-dragger',
		lockbtn:'.layer-lock',
		visiblebtn:'.layer-visible',
		toolsbar:'.layer-tools',
		ctmcls:'.layer-ctm',
		changeLayerCallback:null,	//切换图层
		delLayerCallback:null,			//删除图层
		copyLayerCallback:null,		//拷贝图层
		pasteLayerCallback:null,	//粘贴图层
		sortIndexCallback:null		//排序
	};
	function Layer(opts){
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
		this.ctmtid=null;
		this.copyer={
			layer:false,
			lock:false,
			visible:true
		}
		this.ctm=null;
		this.bindEvent();
	}
	Layer.prototype={
		init:function(data,idx){
			var data=data||[];
			var idx=idx==undefined?0:idx;
			var i=0,l=data.length;
			var tpls='';
			for(;i<l;i++){
				tpls+=this.generateItem(data[i]);
			}
			$(this.opts.id).html(tpls);
			if(data.length>0){
				this.currpager=$(this.opts.id).find(this.opts.item).eq(idx);
				this.currpager.addClass(this.opts.activeCls);
				this.changeLayer(this.currpager.attr('id'));
			}
		},
		generateItem:function(data){
			var tplstr=tpl.replace('{{id}}',data.id)
								.replace('{{name}}',data.name!=''?data.name:pluginTypes[data.type].text)
								.replace('{{type-icon}}',pluginTypes[data.type].icon)
								.replace('{{eye-tips}}',getState(data.states['visible'],'visible','text'))
								.replace('{{eye-icon}}',getState(data.states['visible'],'visible','icon'))
								.replace('{{lock-tips}}',getState(data.states['lock'],'lock','text'))
								.replace('{{lock-icon}}',getState(data.states['lock'],'lock','icon'))
								.replace('{{active}}','')

			var dom=$(tplstr).attr({
				states:JSON.stringify(data.states)
			});
			return dom[0].outerHTML;
		},
		addElement:function(data,target,after){
			var el=this.generateItem(data);
			if(target!=undefined){
				if(after==true){
					$(el).insertAfter(this.getTarget(target));
				}else{
					$(el).insertBefore(this.getTarget(target));
				}
			}else{

				$(el).appendTo(this.opts.id);
			}
		},
		getTarget:function(id){
			return $(this.opts.id).find(id);
		},
		removeElement:function(id){
			var that=this,activeId='';
			var rmdom=$(this.opts.id).find('#'+id);
			if(this.currpager.attr('id')==id){
				if(rmdom.next(this.opts.item).size()>=1){
					activeId=rmdom.next(this.opts.item).eq(0).attr('id');
				}else if(rmdom.prev(this.opts.item).size()>=1){
					activeId=rmdom.prev(this.opts.item).eq(0).attr('id');
				}
			}
			rmdom.remove();
			if(activeId!=''){
				this.changeLayer(activeId);
			}
		},
		changeLayer:function(id){
			this.setActiveElement(id);
			if(typeof this.opts.changeLayerCallback=='function'){
				this.opts.changeLayerCallback(id);
			}
		},
		changeStatesFunc:function(id,type,states,bool){
			var dom=$(this.opts.id).find('#'+id)
			var btncls='';
			switch(type){
				case 'lock':
					btncls=this.opts.lockbtn;
				break;
				case 'visible':
					btncls=this.opts.visiblebtn;
				break;
			}
			var oldcls=getState(!bool,type,'icon');
			var newcls=getState(bool,type,'icon'),
					tips=getState(bool,type,'text');
			dom.attr({
				states:states
			}).find(btncls).attr({
						'data-tips': tips
					}).find('i').removeClass(oldcls).addClass(newcls);

			if(this.currpager.attr('id')==id&&type=='lock'){
				this.changeToolsbarState(bool,tips,newcls);
			}
		},
		changeToolsbarState:function(bool,tips,cls){
			this.setCopyer('lock',bool);
			var toolbar=$(this.opts.toolsbar);
			if(bool==true){
				toolbar.find('[type="del"]').addClass(disable);
			}else{
				toolbar.find('[type="del"]').removeClass(disable);
			}
			toolbar.find('[type="lock"]').attr({
					'data-tips': tips
				}).find('i').removeClass().addClass('fa fa-lg '+cls);
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
				that.changeLayer(this.id);
			});
			//工具条
			$(this.opts.toolsbar).on('click','.layer-tools-btn',function(event){
				event.preventDefault();
				var id=that.currpager.attr('id'),
						type=$(this).attr('type');
				if(type=='visible'){
					that.changeStatesEvent(id,'visible');
				}else if(type=='del'){
					if($(this).hasClass(disable)==false){
						that.delLayer(id);
					};
				}else if(type=='copy'){
					that.copyLayer(id);
				}else if(type=='lock'){
					that.changeStatesEvent(id,'lock');
				}
			});
			//列表
			$(this.opts.id).on('click','.layer-item-cmd',function(event){
				event.preventDefault();
				var id=$(this).parent().parent(that.opts.item).attr('id'),
						cls=$(this).attr('class');
				if(cls.indexOf('layer-visible')>-1){
					that.changeStatesEvent(id,'visible');
				}else{
					that.changeStatesEvent(id,'lock');
				}
			});
			//拖拽
			$(this.opts.id).on('mousedown', this.opts.item, function(event) {
				event.preventDefault();
				var self=this;
				/* Act on the event */
				that.timer=setTimeout(function(){
					that.resetOffset();
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
				that.ctmtid=this.id;
				$('.contextmenu').remove();
				var ctm=$(ctmtpl).appendTo('body');
				if(that.copyer.layer==true){
					ctm.find('[type="paste-layer-defore"]').removeClass(disable);
					ctm.find('[type="paste-layer-after"]').removeClass(disable);
				}
				if(that.copyer.lock==true){
					ctm.find('[type="del-layer"]').addClass(disable);
					ctm.find('[type="top-layer"]').addClass(disable);
					ctm.find('[type="up-layer"]').addClass(disable);
					ctm.find('[type="down-layer"]').addClass(disable);
					ctm.find('[type="bottom-layer"]').addClass(disable);
					ctm.find('[type="lock-layer"]').text('解锁图层');
				}
				if(that.copyer.visible==false){
					ctm.find('[type="visible-layer"]').text('显示图层');
				}
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
				if($(this).hasClass('state-disable')){
					that.ctm.remove();
					return;
				};
				var cmd=$(this).attr('type');
				switch(cmd){
					case 'del-layer':
						that.delLayer(that.ctmtid);
					break;
					case 'copy-layer':
						if(typeof that.opts.copyLayerCallback=='function')
							that.opts.copyLayerCallback(that.ctmtid);
					break;
					case 'paste-layer-defore':
						if(typeof that.opts.pasteLayerCallback=='function')
							that.opts.pasteLayerCallback(that.ctmtid,false);
					break;
					case 'paste-layer-after':
						if(typeof that.opts.pasteLayerCallback=='function')
							that.opts.pasteLayerCallback(that.ctmtid,true);
					break;
					case 'lock-layer':
						that.changeStatesEvent(that.ctmtid,'lock');
					break;
					case 'visible-layer':
						that.changeStatesEvent(that.ctmtid,'visible');
					break;
					case 'top-layer':
						if(typeof that.opts.sortLayerCallback=='function')
							that.opts.sortLayerCallback(that.ctmtid,'top');
					break;
					case 'up-layer':
						if(typeof that.opts.sortLayerCallback=='function')
							that.opts.sortLayerCallback(that.ctmtid,'up');
					break;
					case 'down-layer':
						if(typeof that.opts.sortLayerCallback=='function')
							that.opts.sortLayerCallback(that.ctmtid,'down');
					break;
					case 'bottom-layer':
						if(typeof that.opts.sortLayerCallback=='function')
							that.opts.sortLayerCallback(that.ctmtid,'bottom');
					break;
				}
				that.ctm.remove();
				that.ctmtid=null;
			});
		},
		resetOffset:function(){
			var offset=$(this.opts.id).offset();
			this.bx=offset.left;
			this.by=offset.top;
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
				$(this.opts.id).find(this.opts.item).each(function(){
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
		setCopyer:function(key,data){
			this.copyer[key]=data;
		},
		getCopyer:function(key){
			return this.copyer[key];
		},
		setActiveElement:function(id){
			if(this.currpager!=null) this.currpager.removeClass(this.opts.activeCls);
			var dom=$(this.opts.id).find('#'+id),
					states=dom.attr('states');
			dom.addClass(this.opts.activeCls);
			states=JSON.parse(states);
			var cls=getState(states['lock'],'lock','icon'),
					tips=getState(states['lock'],'lock','text');
			this.changeToolsbarState(states.lock,tips,cls);
			this.currpager=dom;
		},
		getActiveId:function(){
			return $(this.opts.id).find('.'+this.opts.activeCls).attr('id');
		},
		getLastElementId:function(){
			return $(this.opts.id).find(this.opts.item).last().attr('id');
		},
		sortLayer:function(id,type){
			if(id=='') return;
			var target;
			switch(type){
				case 'top':

				break;
				case 'up':

				break;
				case 'down':

				break;
				case 'bottom':

				break;
			}
		},
		delLayer:function(id){
			if(typeof this.opts.delLayerCallback=='function'){
				this.opts.delLayerCallback(id);
			}
		},
		copyLayer:function(id){
			if(typeof this.opts.copyLayerCallback=='function'){
				this.opts.copyLayerCallback(id);
			}
		},
		pasteLayer:function(data,id,after){
			this.addElement(data,id,after);
		},
		changeStatesEvent:function(id,type){
			if(typeof this.opts.changeStatesCallback=='function'){
				this.opts.changeStatesCallback(id,type);
			}
		}
	};

	return Layer;
});