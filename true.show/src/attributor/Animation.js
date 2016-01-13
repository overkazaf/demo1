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
;
define(function(require) {
    var $ = require('jquery');
    var Base = require('./Base');
    var tools = require('../tools/tools');
    var Storage = require('../tools/Storage');
    var Accordion = require('../plugins/Accordion');


    var appContext = $('app-page')[0];
    var pageContext = $('#pagesBox')[0];

    var Animation = function(options) {
        Base.call(this, options);
    };

    /**
     * [init description]
     * @param  {[type]} context [Animation]
     * @return {[type]}         [description]
     */
    Animation.prototype.init = function(callback) {
        Base.prototype.init.call(this);
        callback && callback.call(this);
        return this;
    };

    Animation.prototype.clone = function () {
		return new Animation(this.options);
	};

    /**
     * [setupPluginList 设置插件列表]
     * @return {[type]} [description]
     */
    Animation.prototype.setupPluginList = function() {

        var that = this;
        var $form = $('#' + this.formid);
        var $el = $('#' + this.groupId, appContext);
        var formid = this.formid;

        $form.on('submit', function(ev) {
            ev.preventDefault();
        });

        $form.on('click', 'button', function(ev) {
            switch (ev.target.id) {
                case 'add-animation':
                    that.addPlugin(formid);
                    break;
                case 'play-animation':
                    that.playAnimation();
                    break;
            }
        });
        return this;
    };

     Animation.prototype.initPlugins = function() {
     	var $form = $('#' + this.formid);
        var list = this.pluginList;
        var that = this;
        tools.each(list, function(plugin) {
            // 这里会隐藏原表单的input，用plugin的view的替换， 
            // 当plugin的值改变时trigger原表单的事件，通知上一层管理器更新view
            if (!!plugin && !!plugin.options) {
            	plugin.options.formid = that.formid;
            	plugin.init && plugin.init();
            }
        });

        if (list.length == 0) {
        	$form.find('#play-animation').addClass('btn-disabled');
        } else {
        	$form.find('#play-animation').removeClass('btn-disabled');
        }
    };

    Animation.prototype.playAnimation = function() {
        var list = this.pluginList;
        var $el = $('#' + this.groupId, appContext);
        var animList = [];
        tools.each(list, function(plugin) {
            var sliders = plugin.options.sliders;
            var clazz = plugin.dom.find('.anim-item').filter('.active').attr('data-class');
            var anim = {
                'class': clazz,
                'duration': sliders[0]['value'],
                'delay': sliders[1]['value'],
                'repeat': sliders[2]['value'],
                'auto' : 0
            };
            animList.push(anim);
        });

        var element = {
            id: this.groupId,
            animates: animList
        };

        var elements = [];
        elements.push(element);
        this.playSpriteLine(elements);
    }

    Animation.prototype.playSpriteLine = function(elements) {
        if (this.stop == true) return;
        var self = this,
            els, animates;
        while (elements.length > 0) {
            //取出第一个
            els = elements.shift();
            animates = els.animates.slice(0);
            //检测下一个
            if (elements.length > 0 && elements[0].startAnimates.auto > 0) {
                //同步执行
                this.animateLine(0, els.id, animates);
            } else {
                //异步执行,执行callback解决js（伪）死循环执行问题
                this.animateLine(0, els.id, animates, function() {
                    self.playSpriteLine(elements);
                });
                break;
            }
        }
    }

    Animation.prototype.animateLine = function(start, id, animates, callback) {
        if (this.stop == true) return;
        if (animates.length <= 0) {
            if (callback) callback();
            return;
        }
        var self = this;
        var animate = animates.shift();
        var cls = animate.class,
            delay = animate.delay,
            repeat = animate.repeat;
        //检测下一个动画,1同步执行
        this.runAnim(id, cls, delay, repeat, function() {
            self.animateLine(start + 1, id, animates, callback);
        });
    };

    Animation.prototype.runAnim = function(id, cls, delay, repeat, callback) {
        var self = this;
        if (this.stop == true) return;
        var r = 0;
        var Anim = function() {
            if (self.stop == true) return;
            var $dom = $('#' + id, appContext);
            $dom.removeClass(cls + ' animated visbile');
            $dom.addClass(cls + ' animated visbile').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                r++;
                $(this).removeClass(cls + ' animated visbile');
                // 这里要setTimeout，否则会被冲掉
                setTimeout(function(){
                	if (r >= repeat) {
	                    if (callback) callback();
	                } else {
	                    //重复执行
	                    setTimeout(Anim, +delay * 1000);
	                }
                }, 0);
            });
        }
        if (delay > 0) {
            setTimeout(Anim, +delay * 1000);
        } else {
            Anim();
        }
    }

    /**
     * [addPlugin 添加插件]
     * @param {[type]} formid [description]
     */
    Animation.prototype.addPlugin = function(formid) {
        var $form = $('#' + formid);
        var that = this;
        var accordion = new Accordion({
            id: tools.uuid(),
            seq: this.pluginList.length + 1,
            formid: formid,
            activeId: this.options.groupId,
            sliders: [{
                label: '持续时间',
                value: 1,
                css: 'duration',
                name: 'anim-duration',
                plugin: 'slider-duration',
                unit: 's'
            }, {
                label: '延迟时间',
                value: 0,
                css: 'delay',
                name: 'anim-delay',
                plugin: 'slider-delay',
                unit: 's'
            }, {
                label: '重复次数',
                value: 1,
                css: 'repeat',
                name: 'anim-repeat',
                plugin: 'slider-repeat',
                unit: '次'
            }],
            animClazz: ''
        });
        accordion.supervisor = this;
        accordion.init();
        
        $('#play-animation').removeClass('btn-disabled');
        this.pluginList.push(accordion);

    }

    Animation.prototype.getForm = function() {
        var groupId = this.groupId;

        var form = document.getElementById(this.formid);
        var ret = [];
        var list = this.pluginList;
        tools.each(list, function(plugin) {
            if (!!plugin) {
            	var dl = plugin.dom.find('dl');
	            var animObj = {};
	            tools.each(dl, function(line) {
	                var val = $(line).find('input').val();
	                animObj[$(line).attr('data-css')] = val;
	            });

	            plugin.options['animClazz'] = animObj['class'] = plugin.dom.find('.anim-item').filter('.active').attr('data-class');
	            plugin.options['tabIndex'] = plugin.dom.find('.ui-tablist-item.active').index();
	            console.log('options', plugin.options);
	            ret.push(animObj);
            }
        });

        return {
            'groupId': groupId,
            'content': '',
            'animates': ret
        };
    };

    Animation.prototype.form2Data = function() {
        var groupId = this.groupId;

        var form = document.getElementById(this.formid);
        var ret = [];
        var list = this.pluginList;
        tools.each(list, function(plugin) {
            if (!!plugin) {
            	var dl = plugin.dom.find('dl');
	            var sliders = plugin.options.sliders;
	            var animObj = {};
	            tools.each(dl, function(line, index) {
	                var val = $(line).find('input').val();
	                var css = $(line).attr('data-css');
	                sliders[index][css] = sliders[index]['value'] = val;
	                animObj[css] = val;
	            });

	            plugin.options['animClazz'] = animObj['class'] = plugin.dom.find('.anim-item').filter('.active').attr('data-class');
	            plugin.options['tabIndex'] = plugin.dom.find('.ui-tablist-item.active').index();
	            ret.push(animObj);
            }
        });

        return {
            'groupId': groupId,
            'content': '',
            'animates': ret
        };
    };

    Animation.prototype.confirmDelete = function(id) {
        var list = this.pluginList;
        var $form = $('#' + this.formid);
        tools.each(list, function(plugin, index) {
            if (plugin.id == id) {
                list.splice(index, 1);
            }
        });
        tools.each(this.pluginList, function(plugin, index) {
            plugin.dom.find('.accordion-seq').html(index + 1);
        });

        if (list.length === 0) {
        	$form.find('#play-animation').addClass('btn-disabled');
        }
    };

    tools.inherits(Animation, Base)
    return Animation;
});
