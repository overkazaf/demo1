/**
 * [Adaptor] 特性适配器， 用于直接将元素的属性match到配置项中
 * @param  {[type]} require) {}          [description]
 * @return {[type]}          [description]
 */
;define(function (require) {
	var $ = require('jquery');

	var Adaptor = function (options) {
		this.options = options;
		this.init();
	};


	Adaptor.prototype.constructor = Adaptor;

	Adaptor.prototype.init = function () {
		this.dom = $('#' + this.options.elementId, this.options.context);
		this.type = this.dom.attr('type');
	};


	Adaptor.prototype.getStyleJson = function () {
		var dom = this.dom;
	};
	Adaptor.prototype.getAnimateJson = function () {};
	Adaptor.prototype.getEventJson = function () {};
	Adaptor.prototype.getStateJson = function () {};




	return Adaptor;
});