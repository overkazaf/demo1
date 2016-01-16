/**
 * Canvas 背景配置类
 * @author John Nong(https://www.github.com/overkazaf)
 * @module attributor/Canvas
 */

;define(function (require) {
	var $ = require('jquery');
	var Base = require('./Base');
	var tools = require('../tools/tools');
	var config = require('../config');
	var Storage = require('../tools/Storage');
	var Crop = require('../plugins/Crop');

	var Canvas = function (options) {
		Base.call(this, options);
		this.constructor = Canvas;
	};

	Canvas.prototype.init = function () {
		Base.prototype.init.call(this);
		return this;
	};

	Canvas.prototype.setupPluginList = function () {
		var list = this.pluginList;
		var formid = this.formid;
		var dl = $('#' + formid).find('dl');
		tools.each(dl, function (el){
			var dd = $(el).find('dd');
			var plug = dd.attr('data-plugin');
			if (plug == 'crop') {
				var crop = new Crop({
					type : 'canvas',
					dom : dd
				});
				list.push(crop);
			}
		});
	};

	Canvas.prototype.initPlugins = function () {
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


	tools.inherits(Canvas, Base);
	return Canvas;
});