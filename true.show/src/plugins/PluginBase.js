/**
 * PluginBase 插件配置类，主要用于管理插件
 * @author John Nong(https://www.github.com/overkazaf)
 * @module plugins/PluginBase
 */
;define(function (require) {
	var pluginDict = {
		'colorpicker' : './plugins/ColorPicker',
		'dropdown' : './plugins/Dropdown'
	};

	/**
	 * [PluginBase description]
	 * @param {[type]} pluginName [description]
	 * @param {[type]} options    [description]
	 */
	var PluginBase = function (pluginName, options) {
		if (!pluginName in pluginDict) {
			throw new Error('Check your plugin name first!');
		} 

		var Plugin = require(pluginDict[pluginName]);

		this.instance = new Plugin(options);
		return this.instance;
	};


	PluginBase.prototype.init = function () {
		if(!this.instance.init) {
			throw new Error('Plugin instance must implement the init method');
		}
		this.instance.init();
	};

	PluginBase.prototype.destroy = function () {
		if(!this.instance.destory) {
			throw new Error('Plugin instance must implement the destory method');
		}
		this.instance.destroy();
	};

	PluginBase.prototype.bindEvent = function () {
		this.instance.bindEvent();
	};

	return PluginBase;
});