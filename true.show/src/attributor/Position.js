/**
 * Position 一个特性配置容器类，处理位置属性的相关配置
 * @author John Nong(https://www.github.com/overkazaf)
 * @module attributor/Position
 * @example
 *     var Position = require('attributor/Position');
 *     var AM = require('manager/AttributeManager');
 *     var Group = require('manager/Group');
 *     var group = new Group({
 *     		id : elementId,
 *     });
 *     var am = new AM();
 *     
 *     var p = new Position(config.Attributor.Position);
 *     
 *     group.add(p);
 *     
 *     am.getInstance().add(group);
 */
;define(function (require){

	var $ = require('jquery');
	var Base = require('./Base');
	var tools = require('../tools/tools');
	var Storage = require('../tools/Storage');


	var Position = function (options) {
		Base.call(this, options);
	};

	/**
	 * [init description]
	 * @param  {[type]} context [Position实例从属的容器]
	 * @return {[type]}         [description]
	 */
	Position.prototype.init = function (context) {
		Base.prototype.init.call(this, context);
		return this;
	};

	/**
	 * [render description]
	 * @param  {[Object]} data [当前焦点对象的数据结构]
	 * @return {[type]}         [description]
	 */
	Position.prototype.render = function (data) {


		return this;
	};

	/**
	 * [updateElement 更新元素的操作，传递给AM模块统一分配]
	 * @param  {[type]} t    [description]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	Position.prototype.updateElement = function (t, data) {

		return this;
	};

	Position.prototype.getForm = function () {
		/**
		 * [groupId 获取从属的配置组id， 这个id其实和元素id是一致的]
		 * @type {[type]}
		 */
		var groupId = this.groupId;

		var form = document.getElementById(this.formid);
		var aDl = form.getElementsByTagName('dl');
		var ret = {};
		tools.each(aDl, function (dl) {
			var css = dl.getAttribute('data-css');
			var unit = dl.getAttribute('data-unit');
			var evalExp = dl.getAttribute('data-eval');
			var dd = dl.getElementsByTagName('dd')[0];
			var plugin = dd.getAttribute('data-plugin');
			var dom;

			unit = !!unit ? unit : '';
			switch (plugin) {
				case 'textarea':
					dom = dd.getElementsByTagName(plugin)[0];
					ret[css] = dom.value;
					break;
				case 'select':
					dom = dd.getElementsByTagName(plugin)[0];
					ret[css] = dom.value;
					break;
				case 'btngroup':
					var cssArr = css.split(';');
					dom = dd.getElementsByTagName('input');
					tools.each(cssArr, function (prop, index){
						if (dom[index].type === 'checkbox') {
							ret[prop] = dom[index].checked ? dom[index].value : '';
						} else if (dom[index].type === 'radio') {
							if (dom[index].checked) {
								ret[prop] = dom[index].value;
							}
						}
						
					});
					break;
				default:
					dom = dd.getElementsByTagName('input')[0];
					if (!dom) return;
					if (!!dom.value) {
						var value = dom.value + unit;
						if (evalExp) {
							value = eval('(' + evalExp + ')')
							value += 'px';
						}
						if (typeof ret[css] === 'undefined') {
							ret[css] = value;
						} else {
							ret[css] += ' ' + value;
						}
					} else {
						if (typeof ret[css] === 'undefined') {
							ret[css] = value + unit;
						} else {
							ret[css] += ' ' + value + unit;
						}
					}
			}
		});

		var content = ret.content;
		// 这里主要是收集所有的属性值，到时候一块儿塞进styles属性中
		return {
			'groupId' : groupId,
			'content' : content,
			'styles' : ret
		};
	};

	/**
	 * [setupPluginList description]
	 * @return {[type]} [description]
	 */
	Position.prototype.setupPluginList = function () {
		var list = this.pluginList;
		var formid = this.formid;
		var dl = $('#' + formid).find('dl');
		tools.each(dl, function (el){
			var dd = $(el).find('dd');
			var plug = dd.attr('data-plugin');
			if (plug == 'crop') {
				var crop = new Crop({
					dom : dd
				});
				list.push(crop);
			}
		});
	};

	/**
	 * [initPlugins description]
	 * @return {[type]} [description]
	 */
	Position.prototype.initPlugins = function () {
		var list = this.pluginList;
		tools.each(list, function (plugin, index){
			if (plugin.init) {
				try {
					plugin.init();
				} catch(ex) {
					console && console.error && console.error(ex);
				}
			}
		});
	};

	/**
	 * [buildPanel 按需要重载基类的BuildPanel方法]
	 * @return {[type]} [description]
	 */
	Position.prototype.buildPanel = function () {
		Base.prototype.buildPanel.call(this);

		// 可以绑定层级的移动事件
		var $form = $('#' + this.formid);
		var appContext = $('.device-view')[0];
		var groupId = this.options.groupId;
		var $el = $('#' + groupId, appContext);
		var appWidth = $(appContext).width();
		var appHeight = $(appContext).height();
		var elWidth = $el.outerWidth();
		var elHeight = $el.outerHeight();
		var changePosition = {'left':1,'center':1,'right':1,'top':1,'middle':1,'bottom':1};
		var layerRet;

		$form.on('click', 'input', function () {
			// 1. 移动dom
			var cmd = this.value;
			if (cmd in changePosition) {
				var posX = {};
				var posY = {};
				var position = {};

				$form.find('input:checked').each(function (){
					var command = this.value;
						switch (command) {
							case 'left':
								posX = {left:0};
								break;
							case 'center':
								posX = {left:(appWidth-elWidth)/2};
								break;
							case 'right':
								posX = {left:appWidth-elWidth};
								break;
							case 'top':
								posY = {top:0};
								break;
							case 'middle':
								posY = {top:(appHeight-elHeight)/2};
								break;
							case 'bottom':
								posY = {top:appHeight-elHeight};
								break;
							default:
								// do nothing
						}
				});

				$.extend(true, position, posX);
				$.extend(true, position, posY);

				$el.css(position);
			} else {
				var AM = Storage.get('__AM__');
				layerRet = AM.getMarker().layer.changeLevel(groupId, cmd);
			}

			// 2. 更新按钮的状态
			// if (layerRet) {
			// 	if (layerRet['cmd'] == 'uppp' || layerRet['cmd'] == 'downnn') {
			// 		$form.find('#btngroup-lv-' + layerRet['cmd']).attr('disabled', 'disabled');
			// 	} else {
			// 		$form.find('#btngroup-lv-' + layerRet['cmd']).removeAttr('disabled');
					
			// 		if (layerRet['target'] == 0) {
			// 			$form.find('#btngroup-lv-up').attr('disabled', 'disabled');
			// 			$form.find('#btngroup-lv-uppp').attr('disabled', 'disabled');
			// 		}

			// 		if (layerRet['target'] == layerRet['idGroup'].length-1) {
			// 			$form.find('#btngroup-lv-down').attr('disabled', 'disabled');
			// 			$form.find('#btngroup-lv-downnn').attr('disabled', 'disabled');
			// 		}
			// 	}
			// }
			// 3. 合并数据结构，写入缓存
		});
	};

	/**
	 * [destory 销毁Position实例的方法]
	 * @return {[type]}         [description]
	 */
	Position.prototype.destory = function () {
		var list = this.pluginList;
		tools.each(list, function (plugin, index){
			if (plugin.api && plugin.api.destory) {
				try {
					plugin.api.destroy();
				} catch(ex) {
					console && console.error && console.error(ex);
				}
			}
		});
	};

	tools.inherits(Position, Base);
	return Position;
});