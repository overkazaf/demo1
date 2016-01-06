/**
 *	Modal  模态窗口模块，用于装载图片
 *	@author John Nong(https://www.github.com/overkazaf)
 *  @module plugins/Modal
 * 
 */
;
define(function(require) {
    var $ = require('jquery');
    var tools = require('../tools/tools');

    var modalTpl = '<div id={{ID}}><div class="{{handler}}"><div class={{titleClazz}}>{{title}}</div><div class="{{close}}">&times;</div></div><div class="{{body}}">{{template}}</div><div class="{{footer}}"><div class="{{btnGroup}}"><button class="{{confirm}}">{{confirmText}}</button><button class="{{cancel}}">{{cancelText}}</button></div></div></div>';
    var defaults = {
        width: 800,
        height: 600,
        theme: 'blue', // see modal-theme.css
        draggable: true,
        context: document.body,
        dom: '.ui-modal',
        handler: '.ui-modal-handler',
        close: '.ui-modal-close',
        title: '测试模态窗口',
        titleClazz: '.ui-modal-title',
        body: '.ui-modal-body',
        footer: '.ui-modal-footer',
        btnGroup: '.ui-modal-btngroup',
        confirm: '.ui-modal-btn-confirm',
        confirmText: '确定',
        cancel: '.ui-modal-btn-cancel',
        cancelText: '取消',
        limitBounds: true,
        template: '<div><h2>testing template</h2></div>',
        opacity: .5,
        zIndex: 1004,
        onInit: function(modal) {},
        onConfirm: function(modal) {
            // 这个回调如果返回false的话，modal窗口不会消失
            return true;
        },
        onCancel: function(modal) {},
        onDragStart: function(modal) {},
        onDragging: function(modal) {},
        onDragOver: function(modal, target) {},
        onDrop: function(modal, target) {},
        onShow: function(modal) {},
        onHide: function(modal) {}
    };

    var Modal = function(options) {
        this.options = $.extend({}, defaults, options || {});
        this.mask = null;
        this.dom = null;
        this.handler = null;

        this.init();
    };

    Modal.prototype.init = function() {
        this.mask = buildMask(this.options);
        this.dom = buildDom(this.options);
        this.handler = $(this.options.handler, this.options.context);
        this.bindEvent(this.options);

        if ($.isFunction(this.options.onInit)) {
            this.options.onInit.call(this, this);
        }
    };


    Modal.prototype.bindEvent = function(options) {
        var that = this;

        this.bindButtonEvent(options);

        this.bindDragEvent(options);
    };

    Modal.prototype.bindDragEvent = function(options) {
        var that = this;
        $(document).on('mousedown', options.handler, function(event) {
            if (!options.draggable) return;

            var px = event.pageX,
                py = event.pageY,
                offset = that.dom.offset(),
                ol = offset.left,
                ot = offset.top;

            that.dom.data('xPos', px - ol);
            that.dom.data('yPos', py - ot);
            that.dom.data('dragFlag', true);

            if ($.isFunction(options.onDragStart)) {
                options.onDragStart(that, that);
            }

            event.preventDefault();
        });

        $(document).on('mouseup', function() {
            that.dom.removeData('xPos');
            that.dom.removeData('yPos');

            if ($.isFunction(options.onDragOver)) {
                options.onDragOver.call(that, that);
            }
        });

        $(document).on('mousemove', function(event) {
            if (!!that.dom.data('dragFlag')) {
                var x = event.pageX - that.dom.data('xPos') + options.width / 2;
                var y = event.pageY - that.dom.data('yPos') + options.height / 2;
                var oW = $(window).width();
                var oH = $(window).height();
                if (options.limitBounds) {
                    if (x < options.width / 2) {
                        x = options.width / 2;
                    }

                    if (x + options.width / 2 > oW) {
                    	x = oW - options.width/2;
                    } 

                    if (y < options.height / 2) {
                        y = options.height / 2;
                    }

                    if (y + options.height / 2 > oH) {
                    	y = oH - options.height/2;
                    } 
                }
                that.dom.css({
                    left: x,
                    top: y
                });

                if ($.isFunction(options.onDragging)) {
                    options.onDragging(that, that);
                }
            }
        });
    }

    Modal.prototype.bindButtonEvent = function(options) {
        var that = this;
        $(document).on('click', options.close, function() {
            that.modal('hide');
        });

        $(document).on('click', options.confirm, function() {
            var ret;
            if (options.onConfirm) {
                if ((ret = options.onConfirm.call(that, that))) that.modal('hide');
            } else {
                that.modal('hide');
            }

        });
        $(document).on('click', options.cancel, function() {
            options.onCancel && options.onCancel.call(that, that);
            that.modal('hide');
        });
    };

    function getClass(cls) {
        return cls.charAt(0) == '.' ? cls.substring(1) : cls;
    }

    function modalTplFactory(html, options) {
        return html
            .replace('{{ID}}', 'modal_' + tools.uuid())
            .replace('{{handler}}', getClass(options.handler))
            .replace('{{close}}', getClass(options.close))
            .replace('{{title}}', getClass(options.title))
            .replace('{{titleClazz}}', getClass(options.titleClazz))
            .replace('{{body}}', getClass(options.body))
            .replace('{{template}}', getClass(options.template))
            .replace('{{footer}}', getClass(options.footer))
            .replace('{{btnGroup}}', getClass(options.btnGroup))
            .replace('{{confirm}}', getClass(options.confirm))
            .replace('{{confirmText}}', getClass(options.confirmText))
            .replace('{{cancel}}', getClass(options.cancel))
            .replace('{{cancelText}}', getClass(options.cancelText));
    }

    function buildDom(options) {
        var template = modalTplFactory(modalTpl, options);
        var box = $(template).css({
            position: 'absolute',
            left: '50%',
            top: '50%',
            'margin-left': -options.width / 2,
            'margin-top': -options.height / 2,
            width: options.width,
            height: options.height,
            opacity: 1,
            'z-index': options.zIndex + 1,
            'background-color': '#fff'
        }).hide().addClass(getClass(options.dom));

        box.appendTo($(options.context));

        return box;
    }

    function buildMask(options) {
        var div = $('<div>').css({
            'z-index': options.zIndex,
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            'background-color': '#000',
            opacity: options.opacity
        }).hide();
        div.appendTo($(options.context));

        return div;
    }

    /**
     * [modal 参照Bootstrap Modal组件的实现]
     * @param  {[type]} cmd [description]
     * @return {[type]}     [description]
     */
    Modal.prototype.modal = function(cmd) {
        switch (cmd) {
            case 'show':
                this.mask.show();
                this.dom.show(200);
                if ($.isFunction(this.options.onShow)) {
                    this.options.onShow.call(this, this);
                }
                break;
            case 'hide':
                this.dom.hide(200);
                this.mask.hide();
                if ($.isFunction(this.options.onHide)) {
                    this.options.onHide.call(this, this);
                }
                break;
        }
    };

    Modal.prototype.on = function(fnName, fn) {
        $(this).on(fnName, fn);
    };

    Modal.prototype.off = function(fnName) {
        $(this).off(fnName);
    };

    Modal.prototype.trigger = function(fnName) {
        $(this).trigger(fnName);
    };



    Modal.prototype.destroy = function() {
        console.log('destorying modal');
    };

    return Modal;
});
