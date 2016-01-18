;define(function (require) {
	var $ = require('jquery');
	var Player = require('Player');
	var config = require('config');

	var APP = function () {};

	APP.prototype.init = function () {
		this.player = null;
	};


	// Player的默认参数
	var __defaults = {
		context : '#container'
	};

	APP.prototype.initPlayer = function (options) {
		var options = $.extend({}, __defaults, options);

		this.options = options;
		this.player = new Player(options);
	}

	APP.prototype.play = function () {
		this.player.playPPT(this.options.data.pages)
	}

	return APP;
});