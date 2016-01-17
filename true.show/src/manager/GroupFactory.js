/**
 * [一个组配置的工厂， 用于生成]
 * @param  {Object} require) {	var              factory [description]
 * @param  {Group}  'text':  function(elementId) {                                          var group [description]
 * @return {[type]}          [description]
 */
;define(function (require) {
	var $ = require('jquery');
	var config = require('../config');
	var Group = require('Group');
	var Base = require('../attributor/Base');
    var Canvas = require('../attributor/Canvas');
    var Text = require('../attributor/Text');
    var Photo = require('../attributor/Photo');

    var Styles = require('../attributor/Styles');
    var Position = require('../attributor/Position');
    var Animation = require('../attributor/Animation');

	var tools = require('../tools/tools');

	var __defaults = {
		type : 'text'
	};

	var appContext = $('app-page')[0];

	var GroupFactory = function (options) {
		this.options = $.extend({}, __defaults, options || {});
	};

	var strategies = {
        'canvas' : function (elementId) {
            var group = new Group({
                id: elementId
            });

            var CanvasPropParam = {
                id: tools.uuid(),
                groupId: elementId
            };

            $.extend(true, CanvasPropParam, config.Attributor.CANVAS);

            var CanvasPropEl = new Canvas(CanvasPropParam);


            group.add(CanvasPropEl);
            return group;
        },
        'text': function(elementId) {
            // 新增一个配置组
            var group = new Group({
                id: elementId
            });

            var TextPropParam = {
                id: tools.uuid(),
                groupId: elementId
            };

            var StylesPropParam = {
                id: tools.uuid(),
                groupId: elementId
            };

            var PositionPropParam = {
                id: tools.uuid(),
                groupId: elementId
            };

            var AnimationPropParam = {
                id: tools.uuid(),
                groupId: elementId
            };

            $.extend(true, TextPropParam, config.Attributor.TEXT);
            $.extend(true, StylesPropParam, config.Attributor.STYLES);
            $.extend(true, PositionPropParam, config.Attributor.POSITION);
            $.extend(true, AnimationPropParam, config.Attributor.ANIMATION);

            var TextPropEl = new Text(TextPropParam);
            var StylesPropEl = new Styles(StylesPropParam);
            var PositionPropEl = new Position(PositionPropParam);
            var AnimationPropEl = new Animation(AnimationPropParam);


            group.add(TextPropEl);
            group.add(StylesPropEl);
            group.add(PositionPropEl);
            group.add(AnimationPropEl);

            // or u can call group.init to batch initialize all the Attributor instances
            return group;
        },
        'photo': function(elementId) {
            // 新增一个配置组
            var group = new Group({
                id: elementId
            });
            var PhotoPropParam = {
                id: tools.uuid(),
                groupId: elementId
            };

            var StylesPropParam = {
                id: tools.uuid(),
                groupId: elementId
            };

            var PositionPropParam = {
                id: tools.uuid(),
                groupId: elementId
            };

            var AnimationPropParam = {
                id: tools.uuid(),
                groupId: elementId
            };

            $.extend(true, PhotoPropParam, config.Attributor.PHOTO);
            $.extend(true, StylesPropParam, config.Attributor.STYLES);
            $.extend(true, PositionPropParam, config.Attributor.POSITION);
            $.extend(true, AnimationPropParam, config.Attributor.ANIMATION);

            var PhotoPropEl = new Photo(PhotoPropParam);
            var StylesPropEl = new Styles(StylesPropParam);
            var PositionPropEl = new Position(PositionPropParam);
            var AnimationPropEl = new Animation(AnimationPropParam);


            group.add(PhotoPropEl);
            group.add(StylesPropEl);
            group.add(PositionPropEl);
            group.add(AnimationPropEl);
            return group;
        }
    };

    GroupFactory.prototype.forceCreateGroup = function (groupType, elementId) {
    	var element = $('#' + elementId, appContext);
    	var styles = element.attr('styles');
    	var animates = element.attr('animates');
    	var events = element.attr('events');

    	
    	// console.log('styles', styles);
    	// console.log('animates', animates);

    	return strategies[groupType || this.options.type](elementId);
    }

    /**
     * [createGroup 如果开启force标志位， 则强行从element处拿到属性并刷新]
     * @param  {[type]} groupType [description]
     * @param  {[type]} elementId [description]
     * @param  {[type]} force     [description]
     * @return {[type]}           [description]
     */
	GroupFactory.prototype.createGroup = function (groupType, elementId, force) {
		return strategies[groupType || this.options.type](elementId);
	};


    return GroupFactory;
});