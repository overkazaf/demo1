/**
 *	Crop  裁剪插件，用于修剪图片组件，基于jQuery和jCrop
 *	@author John Nong(https://www.github.com/overkazaf)
 *  @module plugins/Crop
 * 
 */
;define(function (require) {
	var $ = require('jquery');
	require('Jcrop');
	var tools = require('../tools/tools');
	var Storage = require('../tools/Storage');

	var Crop = function (options) {
		this.options = options || {};
		this.api = null;
	};


	Crop.prototype.init = function () {
		var that = this;
		var options = this.options;
		var dom = options.dom;
		this.container = $('<div class="cropper">').attr({
			id : tools.uuid()
		}).css({
			width:220,
			height:220
		});

		this.cropEl = $('<img>').attr({
			id : tools.uuid(),
			src : Storage.get('__currentImage__') || 'asset/img/piclib/7.jpg'
		}).css({
			width:220,
			height:220
		}).appendTo(this.container);
		$(dom).prepend(this.container);

		var cropApi;
		$(this.cropEl).Jcrop({
			bgColor:     'black',
            bgOpacity:   .3,
			boxWidth: 220,
			boxHeight: 220,
			onSelect: recordCoords,
            onChange: recordCoords
		}, function () {
			cropApi = this;
			that.api = cropApi;
		});

		function recordCoords (c) {
			Storage.set('__selectedCoords__', c);
		}

		Storage.set('__cropEl__', this.cropEl);
		return this;
	};


	Crop.prototype.destroy = function () {
		this.cropEl.destory();
		this.container.remove();
	};

	//tools.inherits(Crop, PluginBase);
	
	return Crop;
});