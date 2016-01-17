;
define(function(require) {
    'use strict';
    var $ = require('jquery');
    var logger = require('./loger');
    var config = require('../config');
    var tools = require('./tools');
    var Storage = require('./Storage');

    var Group = require('Group');
    var Base = require('../attributor/Base');
    var Canvas = require('../attributor/Canvas');
    var Text = require('../attributor/Text');
    var Photo = require('../attributor/Photo');

    var Styles = require('../attributor/Styles');
    var Position = require('../attributor/Position');
    var Animation = require('../attributor/Animation');

    var Modal = require('../plugins/Modal');

    var constTypes = [
        '#panel-style',
        '#panel-position',
        '#panel-animate',
        '#panel-function'
    ];
    var types = {
        canvas: ['#panel-canvas', '#panel-function'],
        text: ['#panel-text'].concat(constTypes),
        photo: ['#panel-photo'].concat(constTypes),
        button: ['#panel-button'].concat(constTypes),
        map: ['#panel-map', '#panel-position', '#panel-animate'],
        chart: ['#panel-chart', '#panel-style', '#panel-position', '#panel-animate'],
        audio: ['#panel-audio'].concat(constTypes),
        video: ['#panel-video', '#panel-style', '#panel-position', '#panel-animate'],
        effects: ['#panel-effects'],
        form: ['#panel-form', '#panel-formconfig'].concat(constTypes)
    }

    var composeGroup = {
        'canvas' : function (elementId) {
            var group = new Group({
                id: elementId
            });

            var CanvasPropParam = {
                id: tools.uuid(),
                groupId: elementId
            };

            $.extend(true, CanvasPropParam, config.Attributor.CANVAS);

            var CanvasPropEl = new Canvas(CanvasPropParam).init();


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

            var TextPropEl = new Text(TextPropParam).init();
            var StylesPropEl = new Styles(StylesPropParam).init();
            var PositionPropEl = new Position(PositionPropParam).init();
            var AnimationPropEl = new Animation(AnimationPropParam).init();


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

            var PhotoPropEl = new Photo(PhotoPropParam).init();
            var StylesPropEl = new Styles(StylesPropParam).init();
            var PositionPropEl = new Position(PositionPropParam).init();
            var AnimationPropEl = new Animation(AnimationPropParam).init();


            group.add(PhotoPropEl);
            group.add(StylesPropEl);
            group.add(PositionPropEl);
            group.add(AnimationPropEl);
            return group;
        }
    };

    function confPanel(id, cls, callback, opts) {
        this.id = id;
        this.cls = cls;
        this.types = opts || types;
        this.callback = callback;
        this.cachetype = 'canvas';
        this.init();
    }
    confPanel.prototype = {
        init: function() {
            //绑定仅作测试使用，发布后不直接绑定事件。
            this.bindEvent();
        },
        bindEvent: function() {
            var that = this;
            $(document).on('click', '[plugin-type]', function(event) {
                event.preventDefault();
                /* Act on the event */
                var t = $(this).attr('plugin-type');
                that.swaptab(t);
                
                switch (t) {
                    case 'canvas':
                        // var AM = Storage.get('__AM__');
                        // var elementId;
                        // var templateJson = tools.clone(config.ComponentTemplate[t]);
                        // templateJson.id = elementId = tools.uuid();
                        // templateJson.type = 'canvas';

                        // console.log('templateJson', templateJson);

                        // var group = composeGroup[t](elementId);
                        // Storage.set(group.id, group);
                        // AM.getInstance().addGroup(group);

                        break;
                    case 'photo':
                        if (!Storage.get('__Modal__')) {
                            // 测试图片
                            var picTpl = [];

                            + function() {
                                var basePath = 'asset/img/piclib/'
                                picTpl.push('<ul class="clearfix pic-ul" style="width:100%;">');
                                for (var i = 0; i < 11; i++) {
                                    picTpl.push('<li><img width="90%" height="130" src="' + basePath + (i) + '.jpg"></li>');
                                }
                                picTpl.push('</ul>');
                            }();



                            var modal = new Modal({
                                title: '素材选择',
                                template: picTpl.join(''),
                                onInit: function(md) {
                                    var $ul = md.dom.find('.pic-ul');
                                    $ul.on('click', 'li', function() {
                                        $(this).toggleClass('active').siblings().removeClass('active');
                                    });
                                },
                                onDragging: function(md) {
                                    //console.log(md);
                                },
                                onConfirm: function(md) {
                                    var dom = md.dom;
                                    if (!dom.find('li.active').length) {
                                        alert('请选择一张素材图片');
                                        return false;
                                    }
                                    var picUrl = dom.find('li.active').find('img').attr('src');
                                    
                                    var AM = Storage.get('__AM__');
                                    var elementId;
                                    // Step A. 新增component
                                    // A1. new一个粗来，首先要克隆配置项
                                    var templateJson = tools.clone(config.ComponentTemplate[t]);
                                    // A2. 重新生成一个随机id
                                    templateJson.id = elementId = tools.uuid();
                                    templateJson.src = picUrl;
                                    templateJson.type = 'photo';
                                    Storage.set('__currentImage__', picUrl);

                                    // A3. 分别加入到pages、layer和view中
                                    //    这个由marker具体负责操作，数据结构给过去就好了
                                    AM.getMarker().addNewElement(templateJson);


                                    // Step B. 激活焦点元素
                                    AM.getMarker().viewer.setActiveElement(elementId);

                                    // Step C. 渲染配置面板
                                    // C1. 生成新的配置组
                                    var group = composeGroup[t](elementId);

                                    // C2. 把当前配置项写入缓存
                                    Storage.set(group.id, group);

                                    // C3. 尝试在AM实例中增加该组
                                    AM.getInstance().addGroup(group);

                                    return true;
                                }
                            });

                            Storage.set('__Modal__', modal);
                        }

                        var modal = Storage.get('__Modal__');
                        modal.modal('show');

                        break;
                    default:
                        var AM = Storage.get('__AM__');
                        var elementId;
                        
                        // Step A. 新增component
                        // A1. new一个粗来，首先要克隆配置项
                        var templateJson = tools.clone(config.ComponentTemplate[t]);
                        // A2. 重新生成一个随机id
                        templateJson.id = elementId = tools.uuid();

                        // A3. 分别加入到pages、layer和view中
                        //    这个由marker具体负责操作，数据结构给过去就好了
                        AM.getMarker().addNewElement(templateJson);


                        // Step B. 激活焦点元素
                        AM.getMarker().viewer.setActiveElement(elementId);

                        // Step C. 渲染配置面板
                        // C1. 生成新的配置组
                        var group = composeGroup[t](elementId);

                        // C2. 把当前配置项写入缓存
                        Storage.set(group.id, group);

                        // C3. 尝试在AM实例中增加该组
                        AM.getInstance().addGroup(group);
                }
            });

            var timeout;
            $(document).on('keyup', 'input[name="result"]', function(event) {
                event.preventDefault();
                event.stopPropagation();

                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    var val = $(event.target).val();
                    var $prev = $(event.target).prev('input');
                    if (val != '' || !isNaN(val)) {
                        $prev.val(val);
                        $prev.trigger('change');
                    }
                }, 100);
            });
        },
        swaptab: function(key) {
            if (this.types[key] == undefined) return;
            this.cachetype = key;
            $(this.id).find(this.cls).removeClass('visible');
            var i = 0,
                l = this.types[key].length;
            for (; i < l; i++) {
                var t = $(this.id).find(this.types[key][i]);
                t.addClass('visible')
                if (i == 0 && typeof this.callback == 'function') {
                    this.callback(t);
                }
            }
        }
    };

    return confPanel;
});
