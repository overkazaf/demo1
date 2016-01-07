/**
 * Photo 一个特性配置容器类，处理文本属性的相关配置
 * @author John Nong(https://www.github.com/overkazaf)
 * @module attributor/Photo
 * @example
 *     var Photo = require('attributor/Photo');
 *     var AM = require('manager/AttributeManager');
 *     var Group = require('manager/Group');
 *     var group = new Group({
 *     		id : elementId,
 *     });
 *     var am = new AM();
 *     
 *     var t = new Photo(config.Attributor.TEXT);
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

	var Crop = require('../plugins/Crop');

	var Photo = function (options) {
		Base.call(this, options);
	};

	/**
	 * [init description]
	 * @param  {[type]} context [Photo实例从属的容器]
	 * @return {[type]}         [description]
	 */
	Photo.prototype.init = function (context) {
		Base.prototype.init.call(this, context);
		return this;
	};

	/**
	 * [render description]
	 * @param  {[Object]} data [当前焦点对象的数据结构]
	 * @return {[type]}         [description]
	 */
	Photo.prototype.render = function (data) {


		return this;
	};

	/**
	 * [updateElement 更新元素的操作，传递给AM模块统一分配]
	 * @param  {[type]} t    [description]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	Photo.prototype.updateElement = function (t, data) {

		return this;
	};

	Photo.prototype.getForm = function () {
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
	 * [setupPluginList description]
	 * @return {[type]} [description]
	 */
	Photo.prototype.setupPluginList = function () {
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
	Photo.prototype.initPlugins = function () {
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
	 * [destory 销毁Photo实例的方法]
	 * @return {[type]}         [description]
	 */
	Photo.prototype.destory = function () {
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

	tools.inherits(Photo, Base);
	return Photo;
});