/**
 * Position 一个特性配置容器类，处理位置属性的相关配置
 * @author John Nong(https://www.github.com/overkazaf)
 * @module attributor/Position
 * @example
 *     var Position = require('attributor/Position');
 *     var AM = require('manager/AttributeManager');
 *     var Group = require('manager/Group');
 *     var group = new Group({
 *     		id : elementId,
 *     });
 *     var am = new AM();
 *     
 *     var p = new Position(config.Attributor.Position);
 *     
 *     group.add(p);
 *     
 *     am.getInstance().add(group);
 */
;
define(function(require) {

    var $ = require('jquery');
    var Base = require('./Base');
    var tools = require('../tools/tools');
    var Storage = require('../tools/Storage');


    var Position = function(options) {
        Base.call(this, options);
        this.constructor = Position;
    };

    /**
     * [init description]
     * @return {[type]}         [description]
     */
    Position.prototype.init = function(callback) {
        Base.prototype.init.call(this);
        callback && callback.call(this);
        return this;
    };

    Position.prototype.getForm = function() {
        /**
         * [groupId 获取从属的配置组id， 这个id其实和元素id是一致的]
         * @type {[type]}
         */
        var groupId = this.groupId;

        var $tab = $('#' + this.options.tabId);
        var $contents = $('#confpanel').find('.tab-item').eq($tab.index());
        var aDl = $contents.find('dl');
        var ret = {};
        tools.each(aDl, function(dl) {
            var css = dl.getAttribute('data-css');
            var unit = dl.getAttribute('data-unit');
            var evalExp = dl.getAttribute('data-eval');
            var dd = dl.getElementsByTagName('dd')[0];
            var plugin = dd.getAttribute('data-plugin');
            var dom;

            unit = !!unit ? unit : '';
            switch (plugin) {
                case 'textarea':
                    dom = dd.getElementsByTagName(plugin)[0];
                    ret[css] = dom.value;
                    break;
                case 'select':
                    dom = dd.getElementsByTagName(plugin)[0];
                    ret[css] = dom.value;
                    break;
                case 'btngroup':
                    var cssArr = css.split(';');
                    dom = dd.getElementsByTagName('input');
                    tools.each(cssArr, function(prop, index) {
                        if (dom[index].type === 'checkbox') {
                            ret[prop] = dom[index].checked ? dom[index].value : '';
                        } else if (dom[index].type === 'radio') {
                            if (dom[index].checked) {
                                ret[prop] = dom[index].value;
                            }
                        }

                    });
                    break;
                default:
                    dom = dd.getElementsByTagName('input')[0];
                    if (!dom) return;
                    if (!!dom.value) {
                        var value = dom.value + unit;
                        if (evalExp) {
                            value = eval('(' + evalExp + ')')
                            value += 'px';
                        }
                        if (typeof ret[css] === 'undefined') {
                            ret[css] = value;
                        } else {
                            ret[css] += ' ' + value;
                        }
                    } else {
                        if (typeof ret[css] === 'undefined') {
                            ret[css] = value + unit;
                        } else {
                            ret[css] += ' ' + value + unit;
                        }
                    }
            }
        });

        var content = ret.content;
        // 这里主要是收集所有的属性值，到时候一块儿塞进styles属性中
        return {
            'groupId': groupId,
            'content': content,
            'styles': ret
        };
    };

    /**
     * [setupPluginList description]
     * @return {[type]} [description]
     */
    Position.prototype.setupPluginList = function() {
        var list = this.pluginList;
        var formid = this.formid;
        var dl = $('#' + formid).find('dl');
        tools.each(dl, function(el) {
            var dd = $(el).find('dd');
            var pluginName = dd.attr('data-plugin');
            if (pluginName == 'crop') {
                var crop = new Crop({
                    dom: dd
                });
                list.push(crop);
            }
        });
    };

    /**
     * [initPlugins description]
     * @return {[type]} [description]
     */
    Position.prototype.initPlugins = function() {
        var list = this.pluginList;
        tools.each(list, function(plugin, index) {
            if (plugin.init) {
                try {
                    plugin.init();
                } catch (ex) {
                    console && console.error && console.error(ex);
                }
            }
        });
    };

    /**
     * [buildPanel 按需要重载基类的BuildPanel方法]
     * @return {[type]} [description]
     */
    Position.prototype.buildPanel = function() {
        Base.prototype.buildPanel.call(this);

        // 可以绑定层级的移动事件
        var that = this;
        var $form = $('#' + this.formid);
        var appContext = $('.device-view')[0];
        var groupId = this.options.groupId;
        var $el = $('#' + groupId, appContext);
        var appWidth = $(appContext).width();
        var appHeight = $(appContext).height();
        var layerRet;

        $form.on('submit', function(ev) {
            ev.preventDefault();
            return false;
        });

        $form.on('click', 'input', function() {
            var cmd = this.value;
            if (this.name != 'level') {
            	// 处理对齐命令
                var posX = {};
                var posY = {};
                var position = {};

                // 水平对齐
                $form.find('input[name="pos-align"]:checked').each(function() {
                    var command = this.value;
                    switch (command) {
                        case 'left':
                            posX = {
                                left: 0
                            };
                            break;
                        case 'center':
                            posX = {
                                left: (appWidth - $el.outerWidth()) / 2
                            };
                            break;
                        case 'right':
                            posX = {
                                left: appWidth - $el.outerWidth()
                            };
                            break;
                    }
                });

                // 垂直对齐
				$form.find('input[name="pos-valign"]:checked').each(function() {
                    var command = this.value;
                    switch (command) {
                        case 'top':
                            posY = {
                                top: 0
                            };
                            break;
                        case 'middle':
                            posY = {
                                top: (appHeight - $el.outerHeight()) / 2
                            };
                            break;
                        case 'bottom':
                            posY = {
                                top: appHeight - $el.outerHeight()
                            };
                            break;
                    }
                });

                $.extend(true, position, posX);
                $.extend(true, position, posY);

                // 这里要重新抓取dom元素，因为$el在改变层的时候被更新了， $el将拿不到元素
                $('#' + groupId, appContext).css(position);
            } else {
            	// 处理层级修改命令
                var AM = Storage.get('__AM__');
                layerRet = AM.getMarker().layer.changeLevel(groupId, cmd);
                that.updateButtonGroup(groupId, cmd);
            }
        });

        // 初始化位置状态， 该居中的自己选中
        this.updateButtonGroup(null, null);
    };

    Position.prototype.updateButtonGroup = function(groupId, cmd) {
        // 1. 更新按钮的状态
        var ret = this.updateCommandButtonState(cmd);

        // 2. 合并数据结构，写入缓存
        if (!!ret) {
            this.updateButtonOptions(groupId, ret);
        }
    };

    /**
     * [getButtonGroup 获取按钮组的jQuery对象]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    Position.prototype.getButtonGroup = function(type) {
        var $form = $('#' + this.formid);
        var radioBtnGroup = {
            'left': $form.find('#btngroup-pos-align-left'),
            'center': $form.find('#btngroup-pos-align-center'),
            'right': $form.find('#btngroup-pos-align-right'),
            'top': $form.find('#btngroup-pos-valign-top'),
            'middle': $form.find('#btngroup-pos-valign-middle'),
            'bottom': $form.find('#btngroup-pos-valign-bottom')
        };

        var btnGroup = {
            'uppp': $form.find('#btngroup-lv-uppp'),
            'downnn': $form.find('#btngroup-lv-downnn'),
            'up': $form.find('#btngroup-lv-up'),
            'down': $form.find('#btngroup-lv-down'),
        };

        var buttonGroup = {
            'radioBtnGroup': radioBtnGroup,
            'btnGroup': btnGroup
        };

        return buttonGroup[type];
    };

    /**
     * [updateButtonOptions 更新按钮的数据结构]
     * @param  {[type]} groupId [description]
     * @param  {[type]} ret     [description]
     * @return {[type]}         [description]
     */
    Position.prototype.updateButtonOptions = function(groupId, ret) {
        var group = Storage.get(groupId);
        if (group) {
            var pos = group['attrList'][2];
            var attr = pos['options'].attributes;
            var array = attr[0];
            for (var i = 0, l = array.length; i < l; i++) {
                var item = array[i];
                var values = item['values'];
                for (var j = 0, ml = values.length; j < ml; j++) {
                    values[j].status = ret[values[j].value];
                }
            }
        }
    }

    /**
     * [updateCommandButtonState 根据给定的命令操作更新按钮状态]
     * @param  {[type]} cmd [命令名称]
     * @return {[type]}     [description]
     */
    Position.prototype.updateCommandButtonState = function(cmd) {
        var 
        	elementId = this.groupId,
        	$form = $('#' + this.formid),
        	appContext = $('.device-view')[0],
        	groupId = this.options.groupId,
        	$el = $('#' + groupId, appContext),
        	appWidth = $(appContext).width(),
        	appHeight = $(appContext).height(),
        	elWidth = $el.outerWidth(),
        	elHeight = $el.outerHeight(),
        	layerObj = Storage.get('__AM__').getMarker().layer,
        	btnGroup = this.getButtonGroup('btnGroup'),
        	changeAligment = {
	            'left': 1,
	            'center': 1,
	            'right': 1,
	            'top': 1,
	            'middle': 1,
	            'bottom': 1
	        },
	        result = {
	        	'left' : '',
	        	'center' : '',
	        	'right' : '',
	        	'top' : '',
	        	'middle' : '',
	        	'bottom' : ''
	        };


        // 重置层级操作的按钮状态
        for (var btnName in btnGroup) {
            btnGroup[btnName].prop('disabled', false);
        }

        if (layerObj.getIndex(elementId) == 0) {
        	// 第一层的元素不能上移
            btnGroup['uppp'].prop('disabled', true);
            btnGroup['up'].prop('disabled', true);
        }

        if (layerObj.getCounts() == layerObj.getIndex(elementId) + 1) {
        	// 最后一层的元素不能下移
            btnGroup['downnn'].prop('disabled', true);
            btnGroup['down'].prop('disabled', true);
        }

        if (cmd in changeAligment) {
        	// 处理对齐命令执行后的数据结构更新
        	var radioBtnGroup = this.getButtonGroup('radioBtnGroup');
	        for (var radioName in radioBtnGroup) {
	        	radioBtnGroup[radioName].prop('checked', false);
	        }

	        // 元素范围
        	var range = {
        		x : parseInt($el.css('left')),
        		y : parseInt($el.css('top')),
        		w : elWidth,
        		h : elHeight
        	};
        	var DEVIATION = 0.01;

        	if (Math.abs(range.x) < DEVIATION) {
        		radioBtnGroup['left'].prop('checked', true);
        		result['left'] = 'checked';
        	}

        	if (Math.abs(range.x + range.w - appWidth) < DEVIATION) {
        		radioBtnGroup['right'].prop('checked', true);
        		result['right'] = 'checked';
        	}

        	if (Math.abs(range.x - (appWidth - range.w)/2) < DEVIATION) {
        		radioBtnGroup['center'].prop('checked', true);
        		result['center'] = 'checked';
        	}

        	if (Math.abs(range.y) < DEVIATION) {
        		radioBtnGroup['top'].prop('checked', true);
        		result['top'] = 'checked';
        	}

        	if (Math.abs(range.y + range.h - appHeight) < DEVIATION) {
        		radioBtnGroup['bottom'].prop('checked', true);
        		result['bottom'] = 'checked';
        	}

        	if (Math.abs(range.y - (appHeight - range.h)/2) < DEVIATION) {
        		radioBtnGroup['middle'].prop('checked', true);
        		result['middle'] = 'checked';
        	}
        }

        return result;
    };


    /**
     * [destory 销毁Position实例的方法]
     * @return {[type]}         [description]
     */
    Position.prototype.destory = function() {
        var list = this.pluginList;
        tools.each(list, function(plugin, index) {
            if (plugin.api && plugin.api.destory) {
                try {
                    plugin.api.destroy();
                } catch (ex) {
                    console && console.error && console.error(ex);
                }
            }
        });
    };

    tools.inherits(Position, Base);
    return Position;
});
