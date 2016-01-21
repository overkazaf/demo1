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
	var Storage = require('../tools/Storage');

	var __defaults = {
		type : 'text'
	};

	var appContext = $('app-page')[0];

	var GroupFactory = function (options) {
		this.options = $.extend({}, __defaults, options || {});
	};

	var strategies = {
        'chart' : function (elementId) {
        	var group = new Group({
        		id : elementId
        	});


        	return group;
        },
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
        'text': function(elementId, jsonArray) {
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

            $.extend(true, TextPropParam, !!jsonArray? jsonArray[0] : config.Attributor.TEXT);
            $.extend(true, StylesPropParam, !!jsonArray? jsonArray[1] : config.Attributor.STYLES);
            $.extend(true, PositionPropParam, !!jsonArray? jsonArray[2] : config.Attributor.POSITION);
            $.extend(true, AnimationPropParam, !!jsonArray? jsonArray[3] : config.Attributor.ANIMATION);

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

    GroupFactory.prototype.mergeAttributes = function (json, attributes) {
    	var newAttr = [];


    	return newAttr;
    };


    var _mergeJSONStrategies = {
    	'text' : {
    		'text' : function ($el, json) {
    			var source = config.Attributor.TEXT;
    			var srcAttributesArray = source.attributes;
    			var ret = tools.clone(source);
    			var retAttributes = [];

    			$.each(srcAttributesArray, function (indexX, array){
    				var newArray = [];
    				$.each(array, function (indexY, item) {
    					var newCSSProp = tools.clone(item);
    					var css = item.css;
    					var name = item.name;
    					var plugin = item.plugin;
    					var unit = item.unit;

							// 有单位的要区分插件类型，及属性类型
						switch (plugin) {
							case 'textarea':
								newCSSProp['value'] = json[css];
								break;
    						case 'btngroup':
    							if (name == 'font-format') {
    								// check box
    								var vals = newCSSProp.values;
    								
    								$.each(vals, function (indexZ, val) {
    									if (val["name"] in json && json[val["name"]] != '') {
    										val.status = 'checked';
    									} else {
    										val.status = '';
    									}
    								});
    								
    							} else if (name == 'text-align') {
    								// radio
    								var vals = newCSSProp.values;
    								$.each(vals, function (indexZ, val) {
    									if (val.value == json['text-align']) {
    										val.status = 'checked';
    									} else {
    										val.status = '';
    									}
    								});
    							}
    							break;
    						case 'select':
    							if (name == 'font-family') {
    								var vals = newCSSProp.values;
    								$.each(vals, function (indexZ, val) {
    									console.log('val', val);
    									if (val.value == json['font-family']) {
    										val.status = 'selected';
    									} else {
    										val.status = '';
    									}
    								});
    							}
    							break;
    						case 'colorpicker':
    						case 'slider-angle':
    						case 'slider-fontsize':
    						case 'slider-lineheight':
    						case 'slider':

    							if (name.indexOf('text-shadow') >= 0) {
    								var textShadow = json['text-shadow'] && json['text-shadow'].split(' ');
    								if (!textShadow) break;
    								if (name == 'text-shadow-color') {
    									newCSSProp['value'] = textShadow[3];
    								} else if (name == 'text-shadow-blur') {
    									newCSSProp['value'] = textShadow[2];
    								} else if (name == 'text-shadow-angle') {
    									var polar = tools.axes2Polar(parseInt(textShadow[0]), parseInt(textShadow[1]), 2);
    									newCSSProp['value'] = Math.floor(polar.angle);
    								} else if (name == 'text-shadow-distance') {
    									var polar = tools.axes2Polar(parseInt(textShadow[0]), parseInt(textShadow[1]), 2);
    									newCSSProp['value'] = Math.floor(polar.dis);
    								}
    							} else if (name == 'font-size') {
    								newCSSProp['value'] = parseInt(json["font-size"]);
    							} else {
    								newCSSProp['value'] = json[css];
    							}
    							break;
    						default:
    					}

    					newArray.push(newCSSProp);
    				})

    				retAttributes.push(newArray);
    			});

    			ret.attributes = retAttributes;
    			return ret;
    		},
    		'styles' : function ($el, json) {
    			var source = config.Attributor.STYLES;
    			var srcAttributesArray = source.attributes;
    			var ret = tools.clone(source);
    			var retAttributes = [];

    			$.each(srcAttributesArray, function (indexX, array){
    				var newArray = [];
    				$.each(array, function (indexY, item) {
    					var newCSSProp = tools.clone(item);
    					var css = item.css;
    					var name = item.name;
    					var plugin = item.plugin;
    					var unit = item.unit;

							// 有单位的要区分插件类型，及属性类型
						switch (plugin) {
							case 'text':
								if (name == 'width' || name == 'height') {
									newCSSProp['value'] = parseInt(json[name]);
								}
								break;

    						case 'select':
    							if (name == 'border-style') {
    								var vals = newCSSProp.values;
    								$.each(vals, function (indexZ, val) {
    									if (val.value == json['border-style']) {
    										val.status = 'selected';
    									} else {
    										val.status = '';
    									}
    								});
    							}
    							break;
    						case 'colorpicker':
    						case 'slider-angle':
    						case 'slider-fontsize':
    						case 'slider-lineheight':
    						case 'slider-radius':
    						case 'slider-opacity':
    						case 'slider':

    							if (name.indexOf('box-shadow') >= 0) {
    								var textShadow = json['box-shadow'] && json['box-shadow'].split(' ');
    								if (!textShadow) break;
    								if (name == 'box-shadow-color') {
    									newCSSProp['value'] = textShadow[3];
    								} else if (name == 'box-shadow-blur') {
    									newCSSProp['value'] = textShadow[2];
    								} else if (name == 'box-shadow-angle') {
    									var polar = tools.axes2Polar(parseInt(textShadow[0]), parseInt(textShadow[1]), 2);
    									newCSSProp['value'] = Math.floor(polar.angle);
    								} else if (name == 'box-shadow-distance') {
    									var polar = tools.axes2Polar(parseInt(textShadow[0]), parseInt(textShadow[1]), 2);
    									newCSSProp['value'] = Math.floor(polar.dis);
    								}
    							} else if (name == 'opacity') {
    								newCSSProp['value'] = parseInt(parseFloat(json[css]) * 100);
    							} else if (name == 'transform') {
    							    // 旋转角度
    								newCSSProp['value'] = parseInt(json[css]);
    							} else {
    								newCSSProp['value'] = json[css];
    							}
    							break;
    						default:
    							newCSSProp['value'] = json[css];
    					}

    					newArray.push(newCSSProp);
    				})

    				retAttributes.push(newArray);
    			});

    			ret.attributes = retAttributes;
    			return ret;
    		},
    		'position' : function ($el, json) {
    			var source = config.Attributor.POSITION;
    			var srcAttributesArray = source.attributes;
    			var ret = tools.clone(source);
    			var retAttributes = [];

    			$.each(srcAttributesArray, function (indexX, array){
    				var newArray = [];
    				$.each(array, function (indexY, item) {
    					var newCSSProp = tools.clone(item);
    					var css = item.css;
    					var name = item.name;
    					var plugin = item.plugin;
    					var unit = item.unit;

    					switch (plugin) {
    						case 'btngroup':
    							var range = {
    								x : $el.position().left,
    								y : $el.position().top,
    								w : $el.outerWidth(),
    								h : $el.outerHeight(),
    							};
    							var appRange = {
    								W : $(appContext).width(),
    								H : $(appContext).height()
    							};

    							var rangeStatus = _getRangeStatus(range, appRange);


    							if (name == 'pos-align') {
    								var vals = newCSSProp.values;
    								$.each(vals, function (indexZ, val) {
    									if (val.value == rangeStatus['align']) {
    										val.status = 'checked';
    									} else {
    										val.status = '';
    									}
    								});
    							} else if (name == 'pos-valign') {
    								var vals = newCSSProp.values;
    								$.each(vals, function (indexZ, val) {
    									if (val.value == rangeStatus['valign']) {
    										val.status = 'checked';
    									} else {
    										val.status = '';
    									}
    								});
    							} else if (name == 'level') {
    								var layerObj = Storage.getAM().getMarker().layer;
    								var elementId = $el.attr('id');
    								var vals = newCSSProp.values;

    								if (layerObj.getIndex(elementId) == 0) {
    									$.each(vals, function (indexZ, val) {
    										if (val.value == 'up' || val.value == 'uppp') {
	    										val.status = 'disabled';
	    									} else {
	    										val.status = '';
	    									}
	    								});
    								}

    								if (layerObj.getCounts() == layerObj.getIndex(elementId) + 1) {
    									$.each(vals, function (indexZ, val) {
	    									if (val.value == 'down' || val.value == 'downnn') {
	    										val.status = 'disabled';
	    									} else {
	    										val.status = '';
	    									}
	    								});
    								}
    							}
    							break;
    						default:

    					}
    				});
    			});

    			return ret;
    		},
    		'animations' : function ($el, jsonArray) {
    			var source = config.Attributor.ANIMATION;
    			var srcAttributesArray = source.attributes;
    			var ret = tools.clone(source);
    			var retAttributes = [];

    			$.each(srcAttributesArray, function (indexX, array){
    				var newArray = [];
    				$.each(array, function (indexY, item) {
    					var newCSSProp = tools.clone(item);
    					if (newCSSProp['name'] == 'animations') {
    						newCSSProp.values = [];
    						$.each(jsonArray, function (indexZ, animJson){
    							newCSSProp.values.push(animJson);
    						});
    					}
    					newArray.push(newCSSProp);
    				});
    				retAttributes.push(newArray);
    			});
    			ret.attributes = retAttributes;
    			return ret;
    		}
    	},
    	'photo' : {
    		'styles' : function ($el, json) {
    			// 借用已经有的函数啦
    			return _mergeJSONStrategies['text']['styles'].call($el, json);
    		}
    	}
    };


    /**
     * [_getRangeStatus 获取当前元素的位置范围状态]
     * @param  {[type]} elRange  [元素位置信息]
     * @param  {[type]} appRange [画布位置信息]
     * @return {[type]}          [description]
     */
    function _getRangeStatus (elRange, appRange) {
    	var align = '',
    		valign = '',
    		DEVIATION = 0.01;

    		if (elRange.x == 0) {
    			align = 'left';
    		} 

    		if (elRange.y == 0) {
    			valign = 'top';
    		}

    		if (elRange.x + elRange.w == appRange.W) {
    			align = 'right'
    		}

    		if (elRange.y + elRange.h == appRange.H) {
    			valign = 'bottom'
    		}

    		if (Math.abs(elRange.x - (appRange.W - elRange.w)/2) < DEVIATION) {
    			align = 'center';
    		}

    		if (Math.abs(elRange.y - (appRange.H - elRange.h)/2) < DEVIATION) {
    			valign = 'middle';
    		}



    	return {
    		align :  align,// 'left', 'center', 'right'
    		valign :  valign// 'top', 'middle', 'bottom'
    	}
    }

    /**
     * [_mergeJSON 合并元素的属性配置项]
     * @param  {[type]} $el    [jQuery元素]
     * @param  {[type]} elType    [元素类型]
     * @param  {[type]} mergeType [需要合并的类型]
     * @param  {[type]} json      [给定的json结构]
     * @return {[type]}           [description]
     */
    function _mergeJSON ($el, elType, mergeType, json) {

    	return _mergeJSONStrategies[elType][mergeType]($el, json);
    }



    GroupFactory.prototype.forceCreateGroup = function (groupType, elementId) {
    	var element = $('#' + elementId, appContext);

    	var elementType = element.attr('type');
    	var styles = element.attr('styles');
    	var animates = element.attr('animates');
    	var events = element.attr('events');

    	var styleJson = JSON.parse(styles);
    	var animateJsonArray = JSON.parse(animates);
    	var textJson = _mergeJSON(element, elementType, 'text', styleJson);
    	var stylesJson = _mergeJSON(element, elementType, 'styles', styleJson);
    	var positionJson = _mergeJSON(element, elementType, 'position', styleJson);
    	var animateJson = _mergeJSON(element, elementType, 'animations', animateJsonArray);

    	console.log('animateJsonArray', animateJson);
    	// console.log('animates', animates);

    	return strategies[groupType || this.options.type](elementId, [textJson, stylesJson, positionJson, animateJson]);
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