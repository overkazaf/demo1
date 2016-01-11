/**
 * Animation 一个特性配置容器类，处理动画属性的相关配置
 * @author John Nong(https://www.github.com/overkazaf)
 * @module attributor/Animation
 * @example
 *     var Animation = require('attributor/Animation');
 *     var AM = require('manager/AttributeManager');
 *     var Group = require('manager/Group');
 *     var group = new Group({
 *     		id : elementId,
 *     });
 *     var am = new AM();
 *     
 *     var p = new Animation(config.Attributor.Animation);
 *     
 *     group.add(p);
 *     
 *     am.getInstance().add(group);
 */
;define(function(require) {
	var $ = require('jquery');
	var Base = require('./Base');
	var tools = require('../tools/tools');
	var Storage = require('../tools/Storage');
	var Accordion = require('../plugins/Accordion');

	var Animation = function (options) {
		Base.call(this, options);
	};

	/**
	 * [init description]
	 * @param  {[type]} context [Animation]
	 * @return {[type]}         [description]
	 */
	Animation.prototype.init = function (context) {
		Base.prototype.init.call(this, context);

		var that = this;
		var $form = $('#' + this.formid);
		var $el = $('#' + this.groupId, $('app-page')[0]);
		var formid = this.formid;
		$form.on('submit', function (ev) {
			ev.preventDefault();
		});

		$form.on('click', 'button', function (ev) {
			if (ev.target.id == 'add-animation') {
				that.addPlugin(formid);
			}
		});
		return this;
	};


	Animation.prototype.addPlugin = function(formid) {
		var $form = $('#' + formid);
		var that = this;
		var accordion = new Accordion({
			superviser : that,
			seq : this.pluginList.length+1,
			formid : formid,
			activeId : this.options.groupId
		});
		accordion.supervisor = this;
		accordion.init();
		this.pluginList.push(accordion);
	}

	Animation.prototype.confirmDelete = function (id) {
		var list = this.pluginList;
		tools.each(list, function (plugin, index) {
			if (plugin.id == id) {
				list.splice(index, 1);
			}
		});
		tools.each(this.pluginList, function (plugin, index) {
			plugin.dom.find('.accordion-seq').html(index+1);
		});
	};

	tools.inherits(Animation, Base)
	return Animation;
});