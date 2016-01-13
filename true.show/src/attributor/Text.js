/**
 * Text 一个特性配置容器类，处理文本属性的相关配置
 * @author John Nong(https://www.github.com/overkazaf)
 * @module attributor/Text
 * @example
 *     var Text = require('attributor/Text');
 *     var AM = require('manager/AttributeManager');
 *     var Group = require('manager/Group');
 *     var group = new Group({
 *     		id : elementId,
 *     });
 *     var am = new AM();
 *     
 *     var t = new Text(config.Attributor.TEXT);
 *     
 *     group.add(t);
 *     
 *     am.getInstance().add(group);
 */
;define(function (require){

	var $ = require('jquery');
	var Base = require('./Base');
	var tools = require('../tools/tools');
	var config = require('../config');
	var Storage = require('../tools/Storage');

	var Text = function (options) {
		Base.call(this, options);
	};

	/**
	 * [init description]
	 * @param  {[type]} context [Text实例从属的容器]
	 * @return {[type]}         [description]
	 */
	Text.prototype.init = function (callback) {
		Base.prototype.init.call(this);
		callback && callback.call(this);
		return this;
	};


	Text.prototype.resetPluginList = function () {
		var list = this.pluginList;
		var that = this;
		tools.each(list, function (plugin) {
			// 这里要重置一下formid， 因为重新render时form被强行写后再次生成了
			plugin.options.formid = that.formid;
			// plugin.options.sliders = 
			plugin.init();
		});
	};

	Text.prototype.clone = function () {
		return $.extend(true, new Text(this.options), this);
	};

	Text.prototype.getForm = function () {
		/**
		 * [groupId 获取从属的配置组id， 这个id其实和元素id是一致的]
		 * @type {[type]}
		 */
		var groupId = this.groupId;
		var $tab = $('#' + this.options.tabId);
        var $tabContainer = $tab.closest('.tab-box').find('.tab-item');
		this.formid = this.formid || $tabContainer.find('.form-control').attr('id');
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
					if (!!dom.value) {
						var value = dom.value + unit;
						// if (evalExp) {
						// 	value = eval('(' + evalExp + ')');
						// 	alert(value);
						// 	value += 'px';
						// }
						if (typeof ret[css] === 'undefined') {
							ret[css] = value;
						} else {
							ret[css] += ' ' + value;
						}
					} else {
						var value = '0px';
						if (typeof ret[css] === 'undefined') {
							ret[css] = value;
						} else {
							ret[css] += ' ' + value;
						}
					}
			}
		});
		

		

		/* 修正角度 */
		ret['text-shadow'] = (function (arr){
			var ret = [arr[1] + 'px', arr[0]];
			var vector = tools.polar2Axes(parseInt(arr[2]), parseInt(arr[3]), 4);

			ret.unshift(vector.y + 'px');
			ret.unshift(vector.x + 'px');
			return ret.join(' ');
		})(ret['text-shadow'].split(' '));

		ret['font-size'] = ret['font-size'] + 'px';

		var el = $('#' + groupId, $('app-page')[0]);
		
		// 下边这些属性要在当前Group的Styles实例中进行合并
		ret['left'] = el.css('left');
		ret['top'] = el.css('top');
		//ret['width'] = el.css('width');
		//ret['height'] = el.css('height');

		console.log('groupID', groupId, '>>', 'content', content);
		var content = ret.content;
		var resultObj = {
			'groupId' : groupId,
			'content' : content,
			'styles' : ret
		};

		// 这里主要是收集所有的属性值，到时候一块儿塞进styles属性中
		return resultObj;
	};

	/**
	 * [form2Data 表单数据->配置对象数据结构，见config.Attributor.Text]
	 * @return {[type]} [description]
	 */
	Text.prototype.form2Data = function () {
		/**
		 * [groupId 获取从属的配置组id， 这个id其实和元素id是一致的]
		 * @type {[type]}
		 */
		var groupId = this.groupId;
		var group = Storage.get(groupId);
		var newConfig = tools.clone(group.get(this.id).options);
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
					if (!!dom.value) {
						var value = dom.value + unit;
						
						if (typeof ret[css] === 'undefined') {
							ret[css] = value;
						} else {
							ret[css] += ' ' + value;
						}
					}
			}
		});
		
		var attributes = newConfig.attributes;

		tools.each(attributes, function (attrGroup, i){
			tools.each(attrGroup, function (attr, j) {
				var sp = attr['css'].split(';');
				if (attr['css'] in ret || sp[0] in ret || sp[1] in ret || sp[2] in ret) {
					var plugin = attr['plugin'] || attr['values']['plugin'];

					switch (plugin) {
						case 'btngroup':
							// 根据ret里的值更新values里的值
							// FIXME:太矬了， 这个版本开发完成重写一份
							var vs = attr['values'];
							for (var x in vs) {
								var item = vs[x];
								if (item.type == 'radio') {
									if (item.value == ret[sp[0]]) {
										item.status = 'checked';
									} else {
										item.status = '';
									}
								} else {
									if (item.value == ret[sp[0]] || item.value == ret[sp[1]] || item.value == ret[sp[2]]) {
										item.status = 'checked';
									} else {
										item.status = '';
									}
								}
							}
							break;
						case 'select':
							var val = ret[attr['css']];
							var vs = attr['values'];
							for (var opt in vs) {
								if (vs[opt].value == val) {
									vs[opt].status = 'selected';
								} else {
									vs[opt].status = '';
								}
							}
							break;
						default : 
							if (attr['css'] == 'text-shadow') {
								var v = ret[attr['css']];
								var k = attr['name'];
								var vs = v.split(' ');
								var c = '';

								switch (k) {
									case 'text-shadow-color': 
										c = vs[0];
										break;
									case 'text-shadow-blur': 
										c = vs[1];
										break;
									case 'text-shadow-distance': 
										c = vs[2]
										break;
									case 'text-shadow-angle': 
										c = vs[3];
										break;
								};

								attr['value'] = c;
							} else {
								attr['value'] = ret[attr['css']];
							}
					}
				}
			});
		});

		return newConfig;
	};

	/**
	 * [setupPluginList 初始化插件列表]
	 * @return {[type]} [description]
	 */
	// Text.prototype.setupPluginList = function () {
	// 	console.log('setup in text obj');
	// };

	/**
	 * [destory 销毁Text实例的方法]
	 * @return {[type]}         [description]
	 */
	Text.prototype.destory = function () {
		Base.destory.call(this);
	};

	tools.inherits(Text, Base);
	return Text;
});