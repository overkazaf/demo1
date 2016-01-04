/**
 * Dropdown 下拉插件类
 * @author John Nong(https://www.github.com/overkazaf)
 * @module plugins/Dropdown
 */
;define(function () {
	var tools = require('../tools/tools');
	var Base = require('./PluginBase');

	var Dropdown = function (options) {
		this.id = tools.uuid();
		this.options = options || {};
	};

	Dropdown.prototype.init = function () {};
	Dropdown.prototype.bindEvent = function () {};
	Dropdown.prototype.destory = function () {};


	tools.inherits(Dropdown, Base);
	return Dropdown;
});