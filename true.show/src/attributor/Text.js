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

		// 这里主要是收集所有的属性值，到时候一块儿塞进styles属性中
		return {
			'groupId' : groupId,
			'content' : $('#ta').val(),
			'styles' : {
				'color' : $('#color').val(),
				'text-align' : $('input[name="text-align"]:checked').val(),
				'font-weight' : $('input[name="font-weight"]:checked').val(),
				'font-size' : $('#font-size').val() + 'px',
				'font-family' : $('#select-font-family>option:selected').val()
			}
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