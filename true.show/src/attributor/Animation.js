/**
 * Animation 一个特性配置容器类，处理动画属性的相关配置
 * @author John Nong(https://www.github.com/overkazaf)
 * @module attributor/Animation
 * @example
 *     var Animation = require('attributor/Animation');
 *     var AM = require('manager/AttributeManager');
 *     var Group = require('manager/Group');
 *     var group = new Group({
 *          id : elementId,
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
        this.constructor = Animation;
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

        $form.on('keyup', 'input[name="result"]', function(ev) {
            var target = ev.target;
            var val = $(target).val();
            if (val != '' && !isNaN(val)) {
                $(target).prev('input[type="range"]').val(val);
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
                'auto': 1
            };
            animList.push(anim);
        });

        var element = {
            id: this.groupId,
            animates: animList
        };

        var elements = [];
        elements.push(element);

        // 这里可以借用player类的playSpriteLine方法
        var player = Storage.get('__PLAYER__');
        var context = $('app-page')[0];
        player.playSpriteLine(elements, context);
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
                status: 'disabled',
                unit: 's'
            }, {
                label: '延迟时间',
                value: 0,
                css: 'delay',
                name: 'anim-delay',
                plugin: 'slider-delay',
                status: '',
                unit: 's'
            }, {
                label: '重复次数',
                value: 1,
                css: 'repeat',
                name: 'anim-repeat',
                plugin: 'slider-repeat',
                status: '',
                unit: '次'
            }],
            animClazz: '',
            onReady : function () {
                var $outputs = $('input[name="result"]', this.dom);
                var $ranges = $('input[type="range"]', this.dom);
                $outputs.each(function(index, item) {
                    if ($(item).prev('input[type="range"]').prop('disabled')) {
                        $(item).prop('disabled', true);
                    }
                });

                $ranges.on('mouseup', function (event) {
                    var target = event.target;
                    if ($(target).next('input[name="result"]').length) {
                        var val = $(target).val();
                        $(target).next('input[name="result"]').val(val);
                    }
                });
            }
        });
        accordion.supervisor = this;
        accordion.init();

        $('#play-animation').removeClass('btn-disabled');
        this.pluginList.push(accordion);

    }

    Animation.prototype.getForm = function() {
        var groupId = this.groupId;
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
