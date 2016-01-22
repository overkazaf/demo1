;
define(function(require) {
    'use strict';
    var Resizer = require('./resizer');
    var Dragger = require('./dragger');
    var ruler = require('./ruler');
    var tpler = require('./tpler');
    var Storage = require('./Storage');
    var Adaptor = require('../adaptor/Adaptor');
    var Group = require('Group');
    var GroupFactory = require('../manager/GroupFactory');

    var tools = require('./tools');
    var ctmtpl = '<div class="contextmenu viewer-contextmenu">\
								<div type="del-layer" class="ctm-item plugin-ctm">删除图层</div>\
								<div class="ctm-split-line"></div>\
								<div type="copy-layer" class="ctm-item plugin-ctm">复制图层</div>\
								<div type="paste-layer-defore" class="ctm-item state-disable plugin-ctm">粘贴图层（之前）</div>\
								<div type="paste-layer-after" class="ctm-item state-disable plugin-ctm">粘贴图层（之后）</div>\
								<div class="ctm-split-line"></div>\
								<div type="lock-layer" class="ctm-item plugin-ctm">加锁图层</div>\
								<div type="visible-layer" class="ctm-item plugin-ctm">隐藏图层</div>\
								<div class="ctm-split-line"></div>\
								<div type="top-layer" class="ctm-item plugin-ctm">置为顶层</div>\
								<div type="up-layer" class="ctm-item plugin-ctm">上移一层</div>\
								<div type="down-layer" class="ctm-item plugin-ctm">下移一层</div>\
								<div type="bottom-layer" class="ctm-item plugin-ctm">置为底层</div>\
							</div>';
    var disable = 'state-disable',
        visible = 'state-visible';

    var defopts = {
        id: 'app-page',
        cls: 'plugin-warp',
        innerCls: '.cont-inner',
        ctmcls: '.plugin-ctm',
        sortLayerCallback: null,
        changeLayerCallback: null, //切换图层
        delLayerCallback: null, //删除图层
        copyLayerCallback: null, //拷贝图层
        pasteLayerCallback: null, //粘贴图层
    };

    function viewer(opts) {
        this.opts = $.extend(defopts, opts);
        this.resizer = null;
        this.dragger = null;
        this.ruler = null;
        this.ctmtid = null;
        this.copyer = {
            layer: false,
            lock: false,
            visible: true
        }
        this.ctm = null;
        this.bindEvent();
    }
    viewer.prototype = {
        init: function(data) {
            var that = this;
            var cont = '';
            if (data != undefined) {
                cont = tpler.generatePage(data);
            }
            $(this.opts.id).html(cont);
        },
        bindEvent: function() {
            var that = this;

            $(document).on('click', this.opts.id, function() {
                $(that.opts.id).find(that.opts.cls).removeClass('active');
            });

            // $(document).on('dblclick', this.opts.innerCls, function(event) {
            //     $(event.target).focus();
            // });


            // $(document).on('keyup', this.opts.innerCls, function(event) {
            // 	var parent = $(event.target).closest(that.opts.cls);
            //     var pid = parent.attr('id');
            //     var index = $('#panel-text').index();
            //     $('#confpanel').find('.tab-item').eq(index).find('textarea').val($(event.target).text());
            //     $('#' + pid, $('#pagesBox')[0]).find('.cont-inner').html($(event.target).text());
            // });


            // var timeout;
            // $(document).on('blur', this.opts.innerCls, function (event){
            // 	var parent = $(event.target).closest(that.opts.cls);
            //     var pid = parent.attr('id');
            // 	clearTimeout(timeout);
            //     timeout = setTimeout(function() {
            //         window.callFN('noticeUpdate', pid);
            //     }, 50);
            // })

            $('.main-view', document).on('click', this.opts.cls, function(event) {
                event.preventDefault();
                event.stopImmediatePropagation();

                if ($(this).hasClass('active')) {
                    return;
                }
                $(that.opts.id).find(that.opts.cls).removeClass('active');
                $(this).addClass('active');
                that.updateElement($(this), {});
                var AM = Storage.get('__AM__');
                var elementId = $(this).attr('id');

                // 获取配置面板
                var type = $(this).attr('type') || $(this).attr('plugin-type');

                // 在切换参数配置之前修正缓存参数
                switch (type) {
                    case 'photo':
                        var picUrl = $(this).find('img').attr('src');
                        Storage.set('__currentImage__', picUrl);
                        break;
                    case 'canvas':
                        var picUrl = $(this).css('backgroundImage');
                        Storage.set('__currentCanvas__', picUrl);
                        break;
                }
                // swap tab
                AM.getMarker().cper.swaptab(type);

                if (!!AM) {
                    var group = Storage.get(elementId);
                    // 这里加一个适配器层， 用于直接fetch元素的属性
                    if (!!group) {
                        group.init();
                    } else {
                        if (!Storage.get('__GroupFactory__')) {
                            Storage.set('__GroupFactory__', new GroupFactory({}));
                        }

                        var groupFactory = Storage.get('__GroupFactory__');
                        var newGroup = groupFactory.createGroup(type, elementId, true);
                        newGroup.init();
                        AM.getInstance().addGroup(newGroup);
                        Storage.set(elementId, newGroup);
                    }
                }
                return false;
            });

            this.resizer = new Resizer(null, null, {
                onResize: function(resizer) {
                    var dom = resizer.dragger;
                    that.updateElement(dom, {
                        'width': dom.width() + 'px',
                        'height': dom.height() + 'px'
                    });

                    var id = dom.attr('id');
                    var opt = {
                        width: dom.width() + 'px',
                        height: dom.height() + 'px'
                    };
                    dom.find('.cont-inner>img').css(opt);
                    $('#' + id, $('#pagesBox')).find('.cont-inner>img').css(opt);
                },
                callback: function(t) {
                    var id = t.attr('id');
                    // 重新initgroup
                    var group = Storage.get(id);
                    if (group) {
                        group.init();
                    }

                }
            });
            this.dragger = new Dragger(null, null, function(t) {
                var o = $(t).position();
                //tools.rotateEl(t[0], 0);
                that.updateElement(t, {
                    width: t.width() + 'px',
                    height: t.height() + 'px',
                    left: o.left + 'px',
                    top: o.top + 'px'
                });

                //tools.rotateEl(t[0], that.dragger.rotateDegree);

                // 更新视图
                var id = t.attr('id');
                var group = Storage.get(id);
                if (!!group) {
                    var pos = group.attrList[2];
                    !!pos && pos.updateButtonGroup(id, 'left');
                }
            });
            this.ruler = new ruler('#rulerbtn', '.ruler');

            $('.main-view', document).on('mouseup', function(event) {
                event.preventDefault();

                var t = event.target;
                var cls = $(t).attr('class');
                if (that.ctm != null && cls) {
                    if (cls.indexOf('ctm-item') == -1 && cls.indexOf('contextmenu') == -1 && cls.indexOf('ctm-split-line') == -1) {
                        that.ctm.remove();
                    }
                }

            });
            //右击事件
            $(this.opts.id).on('contextmenu', this.opts.cls, function(event) {
                event.preventDefault();
                that.ctmtid = this.id;
                $('.contextmenu').remove();
                var ctm = $(ctmtpl).appendTo('body');
                if (that.copyer.layer == true) {
                    ctm.find('[type="paste-layer-defore"]').removeClass(disable);
                    ctm.find('[type="paste-layer-after"]').removeClass(disable);
                }
                if (that.copyer.lock == true) {
                    ctm.find('[type="del-layer"]').addClass(disable);
                    ctm.find('[type="top-layer"]').addClass(disable);
                    ctm.find('[type="up-layer"]').addClass(disable);
                    ctm.find('[type="down-layer"]').addClass(disable);
                    ctm.find('[type="bottom-layer"]').addClass(disable);
                    ctm.find('[type="lock-layer"]').text('解锁图层');
                }
                if (that.copyer.visible == false) {
                    ctm.find('[type="visible-layer"]').text('显示图层');
                }
                var mouseX = event.pageX,
                    mouseY = event.pageY;
                if (mouseY + $(ctm).height() > $(window).height()) {
                    mouseY = $(window).height() - $(ctm).height() - 20;
                }
                ctm.css({
                    left: mouseX + 'px',
                    top: mouseY + 'px'
                });
                that.ctm = ctm;
            });

            $(document).on('click', this.opts.ctmcls, function(event) {
                event.preventDefault();
                if ($(this).hasClass('state-disable')) {
                    that.ctm.remove();
                    return;
                };
                var cmd = $(this).attr('type');
                switch (cmd) {
                    case 'del-layer':
                        that.delElement(that.ctmtid);
                        break;
                    case 'copy-layer':
                        if (typeof that.opts.copyLayerCallback == 'function')
                            that.opts.copyLayerCallback(that.ctmtid);
                        break;
                    case 'paste-layer-defore':
                        if (typeof that.opts.pasteLayerCallback == 'function')
                            that.opts.pasteLayerCallback(that.ctmtid, false);
                        break;
                    case 'paste-layer-after':
                        if (typeof that.opts.pasteLayerCallback == 'function')
                            that.opts.pasteLayerCallback(that.ctmtid, true);
                        break;
                    case 'lock-layer':
                        that.changeStatesEvent(that.ctmtid, 'lock');
                        break;
                    case 'visible-layer':
                        that.changeStatesEvent(that.ctmtid, 'visible');
                        break;
                    case 'top-layer':
                        if (typeof that.opts.sortLayerCallback == 'function')
                            that.opts.sortLayerCallback(that.ctmtid, 'top');
                        break;
                    case 'up-layer':
                        if (typeof that.opts.sortLayerCallback == 'function')
                            that.opts.sortLayerCallback(that.ctmtid, 'up');
                        break;
                    case 'down-layer':
                        if (typeof that.opts.sortLayerCallback == 'function')
                            that.opts.sortLayerCallback(that.ctmtid, 'down');
                        break;
                    case 'bottom-layer':
                        if (typeof that.opts.sortLayerCallback == 'function')
                            that.opts.sortLayerCallback(that.ctmtid, 'bottom');
                        break;
                }
                that.ctm.remove();
                that.ctmtid = null;
            });
        },
        addElement: function(data, target, after) {
            var el = tpler.generatePlugin(data);
            if (target != undefined) {
                if (after == true) {
                    $(el).insertAfter(this.getTarget(target));
                } else {
                    $(el).insertBefore(this.getTarget(target));
                }
            } else {
                $(el).appendTo(this.opts.id);
            }
            // console.log('viewer-addel',el);
        },
        getTarget: function(id) {
            return $(this.opts.id).find(id);
        },
        removeElement: function(id) {
            var rmdom = $(this.opts.id).find('#' + id);
            rmdom.remove();
        },
        removeAll: function(page) {
            $(this.id).html('');
        },
        updateElement: function(t, data) {
            var styles = $(t).attr('styles');
            styles = $.extend(true, JSON.parse(styles), data);

            $(t).attr({
                styles: JSON.stringify(styles)
            }).css(data);

            if (typeof this.opts.changeLayerCallback == 'function') {
                this.opts.changeLayerCallback($(t).attr('id'), data, styles);
            }
        },
        setActiveElement: function(id) {
            $(this.opts.id).find(this.opts.cls).each(function() {
                if (id == this.id) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });
        },
        delElement: function(id) {
            if (typeof this.opts.delLayerCallback == 'function') {
                this.opts.delLayerCallback(id);
            }
        },
        showElement: function(id, bool) {
            if (bool == false) {
                $(this.opts.id).find('#' + id).show();
            } else {
                $(this.opts.id).find('#' + id).hide();
            }
        },
        changeStatesEvent: function(id, type) {
            if (typeof this.opts.changeStatesCallback == 'function') {
                this.opts.changeStatesCallback(id, type);
            }
        },
        changeStatesFunc: function(id, type, states, bool) {
            var dom = $(this.opts.id).find('#' + id);
            var cls = type == 'lock' ? 'state-disable' : 'state-visible';
            if (type == 'lock') {
                bool = !bool;
            }
            if (bool == false) {
                dom.attr({
                    states: states
                }).addClass(cls);
            } else {
                dom.attr({
                    states: states
                }).removeClass(cls);
            }
        },
        setCopyer: function(key, data) {
            this.copyer[key] = data;
        },
        getCopyer: function(key) {
            return this.copyer[key];
        }
    };


    
    return viewer;
});
