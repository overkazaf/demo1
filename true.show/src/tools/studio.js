;define(function (require) {
	var $ = require('jquery');

	var __defaults = {
		id : '#animationControl'
	};

	var FSM = {
		on : {
			buttonPressed : function () {
				$(this.dom).attr('data-tips', '播放').find('i').removeClass().addClass('fa fa-play-circle');
				this.currentStatus = FSM.off;

				if (this.options.onStop) {
					this.options.onStop.call(this);
				}
			}
		},
		off : {
			buttonPressed : function () {
				$(this.dom).attr('data-tips', '暂停').find('i').removeClass().addClass('fa fa-pause-circle');
				this.currentStatus = FSM.on;

				if (this.options.onPlay) {
					this.options.onPlay.call(this);
				}
			}
		}
	};

	var Studio = function (options) {
		this.options = $.extend({}, __defaults, options || {});
		this.currentStatus = FSM.off;
		this.init();
	};



	Studio.prototype = {
		constructor : Studio,
		init : function () {
			var dom = $(this.options.id);
			this.dom = dom;
			this.currentStatus = FSM.off;
			this.bindEvent();
		},
		bindEvent : function () {
			var that = this;
			this.dom.on('click', function () {
				that.currentStatus.buttonPressed.call(that);
			});
		}
	};



	return Studio;
});