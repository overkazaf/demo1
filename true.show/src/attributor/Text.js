/**
 * Text 一个特性配置容器类
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

	/**
	 * [render description]
	 * @param  {[Object]} data [当前焦点对象的数据结构]
	 * @return {[type]}         [description]
	 */
	Text.prototype.render = function (data) {


		return this;
	};

	/**
	 * [updateElement 更新元素的操作，传递给AM模块统一分配]
	 * @param  {[type]} t    [description]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	Text.prototype.updateElement = function (t, data) {

		return this;
	};

	Text.prototype.getForm = function () {
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
						var value = dom.value;
						if (evalExp) {
							value = eval('(' + evalExp + ')')
						}
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
	 * [destory 销毁Text实例的方法]
	 * @return {[type]}         [description]
	 */
	Text.prototype.destory = function () {
		Base.destory.call(this);
	};

	tools.inherits(Text, Base);
	return Text;
});