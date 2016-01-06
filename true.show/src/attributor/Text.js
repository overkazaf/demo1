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
	var AM = require('AttributeManager');
	var AG = require('Group');
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
	Text.prototype.init = function (context) {
		Base.prototype.init.call(this, context);
		return this;
	};


	Text.prototype.getForm = function () {
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
	 * [form2Data 表单数据->配置对象数据结构，见config.Attributor.Text]
	 * 
	 * 
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
				if (attr['css'] in ret) {
					var plugin = attr['plugin'];
					switch (plugin) {
						case 'btngroup':

							break;
						default : 
							attr['value'] = ret[attr['css']];
					}
				}
			});
		});

		return newConfig;
	};

	/**
	 * [setupPluginList 初始化配置项的插件列表]
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