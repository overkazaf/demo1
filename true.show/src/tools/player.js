/**
 * Player 幻灯播放类
 * 		用于播放幻灯，基于slip, jQuery 和 animate.css
 * 		代码修改自https://github.com/chenjw1985/ppt
 * 		
 * @author John Nong(https://www.github.com/overkazaf)
 * @module tools/player
 */
;
define(function(require) {
    var $ = require('jquery');
    var _slip = require('slip');
    var Chart = require('Chart');

    var appContext = $('app-page')[0];
    var _elStyleTpl = 'position: absolute;top:{{top}};left:{{left}};z-index:{{z-index}};width:{{width}};height:{{height}};';
    var __defaults = {
        context : '#pptbox',
        pages: [],
        mask : document.getElementById('ppt-mask'),
        dom: document.body,
        previewButton: '.system-btns-warp>.fa-eye',
        previewFunction: function() {
            console.log('Implement this preview function');
        }
    };

    var Player = function(options) {
        this.options = $.extend({}, __defaults, options || {});
        this.dom = this.options.dom;
        this.data = {};
        this.charts = {
            el : {},
            size : 0
        };
        this.idx = 0;
        this.stop = false;
    };

    Player.prototype.playPPT = function(pages) {
        
        this.stop = false;

        this.data.pages = pages;

        this.drawPage(pages);

        this.displayStudio();

        this.animating(0);

        this.initPlayer();

        this._buildChart();
    };

    Player.prototype.displayStudio = function () {
        var $mask = $('#ppt-mask');
        var $container = $('#pptcontainer');

        $mask.show();

        $container.css({
            'position': 'absolute',
            'left' : '50%',
            'top' : 0,
            'margin-left' : -$container.outerWidth()/2
        }).show();

        $('#pptbox').fadeIn();

        $('#ppt-mask').find('.btn-close').on('click', function (){
            $container.hide();
            $mask.hide();    
        });
    };


    /* helper functions */
    function camel2HB (str) {
        return str.replace(/([A-Z])/g, "-$1").toLowerCase();
    };

    function j2sFN (raw) {
        var json = raw;
        var result = '';
        for (var key in json) {
            var val = json[key];
            result += key + ':' + val + ';';
        }
        result = result.replace(/([A-Z])/g, "-$1").toLowerCase();
        return result;
    };
    /* helper functions end */

    Player.prototype.drawPage = function(pages) {
        var i = 0,
            l = pages.length;
        var html = [];
        for (; i < l; i++) {
            var page = pages[i],
                m = 0,
                n = page.elements.length;
            html.push('<section class="page" style="' + page.styles + '" id="' + page.id + '" name="' + page.name + '">');
            for (; m < n; m++) {
                var el = page.elements[m],
                    h = '',
                    css = el.styles;

                var elStyle = _elStyleTpl
                    .replace('{{left}}', css.left)
                    .replace('{{top}}', css.top)
                    .replace('{{z-index}}', m)
                    .replace('{{width}}', css.width)
                    .replace('{{height}}', css.height);

                elStyle = !el.styles ? elStyle : elStyle + j2sFN(css);
                switch (el.type) {
                    case "photo":
                    case "img":
                        h = '<img class="element invisibility" style="' + elStyle + '" id="' + el.id + '" name="' + el.name + '" href="' + el.href + '" src="' + el.value + '" />';
                        break;
                    case "object":

                        break;
                    case "chart":
                        h = '<div class="element invisibility" id="' + el.id + '" style="' + elStyle + '"></div>';
                        //延后处理
                        this.charts.el[el.id] = {
                            id : el.id,
                            modelType : el.modelType,
                            pi: i,
                            ei: m,
                            models: el.value
                        };
                        this.charts.size += 1;
                        break;
                    default:
                        h = '<span class="element invisibility" style="' + elStyle + '" id="' + el.id + '" name="' + el.name + '" href="' + el.href + '">' + el.value + '</span>';
                        break;
                }
                html.push(h);
            }
            html.push('</section>');
        }
        this.dom.innerHTML = html.join('');
    };

    Player.prototype.initPlayer = function () {
        var that = this;
        this.pages= this.dom.querySelectorAll('.page');
        // this.Slip = _slip(this.dom, 'y').webapp(this.pages).end(function() {
        //     if (that.idx == this.page) return;
        //     that.resetPage(that.idx);
        //     that.idx = this.page;
        //     that.animating(that.idx);
        // });
    


        // 先绑定在click事件上做测试
        var idx = 0;
        var $sections = $('.page');
        $('#iSlider-arrow').on('click', function() {
            if (that.idx == that.options.data.length) {idx = -1;}
            that.resetPage(that.idx);
            that.idx = ++idx;
            $sections.hide().eq(idx).show();
            that.animating(that.idx);
        });
        that.resetPage(0);
    };

    Player.prototype.init = function() {
        this.bindEvent();
    };
    Player.prototype.animating = function(idx) {
        //这里需要深拷贝对象数组
        var elements = this.data.pages[idx].elements.slice(0);
        this.playAnimation(elements, this.options.context);
    };


    Player.prototype.resetPage = function(idx) {
        var els = this.data.pages[idx].elements;
        for (var i in els) {
            $('#' + els[i].id, this.options.context || appContext).removeClass().addClass('invisibility');
        }
    };

    Player.prototype.resetElements = function (elements, context) {
        this.stop = true;
        for (var i = 0, ele; ele = elements[i++];) {
            $('#' + ele.id, context).removeClass().addClass('invisibility');
        }
        this.stop = false;
    };

    Player.prototype.showElements = function (elements, context) {
        for (var i = 0, ele; ele = elements[i++];) {
            $('#' + ele.id, context).removeClass('invisibility');
        }
    }

    Player.prototype.stopAnimation = function (elements, context) {
        this.resetElements(elements, context);
        this.showElements(elements, context);
    };

    Player.prototype.bindEvent = function() {
        var that = this;
        // 暂时绑定在预览按钮上
        this.options.context = '#pptbox';
        $(document).on('click', this.options.previewButton, that.options.previewFunction);
    };

    Player.prototype.playSpriteLine = function(elements, context) {
        if (this.stop == true) return;
        this.resetElements(elements, $('app-page')[0]);
        var self = this,
            els, animates;
        while (elements.length > 0) {
            //取出第一个
            els = elements.shift();
            animates = els.animates.slice(0);
            //检测下一个
            if (elements.length > 0 && elements[0].auto > 0) {
                //同步执行
                this.animateLine(0, els.id, context, animates);
            } else {
                //异步执行,执行callback解决js（伪）死循环执行问题
                this.animateLine(0, els.id, context, animates, function() {
                    self.playSpriteLine(elements, context);
                });
                break;
            }
        }
    }

    /**
     * [playAnimation 新的动画播放方法，直接为元素添加和删除动画类即可]
     * @return {[type]} [description]
     */
    Player.prototype.playAnimation = function (elements, context) {
        this.resetElements(elements, context);
        var that = this,
            els,
            animates;
        while (elements.length > 0) {
            els = elements.shift();
            animates = els.animates.slice(0);
            
            if (elements.length > 0 && elements[0].auto > 0) {
                //同步执行
                this.callAnimationLine(els.id, context, animates);
            } else {
                //异步执行,执行callback解决js（伪）死循环执行问题
                this.callAnimationLine(els.id, context, animates, function() {
                    that.playAnimation(elements, context);
                });
                break;
            }
        }
    }


    Player.prototype.callAnimationLine = function (id, context, animates, callback) {
        if (this.stop == true) return;
        if (animates.length <= 0) {
            !!callback && callback();
            return;
        }

        var self = this;
        var animate = animates.shift();
        var cls = animate.class,
            duration = animate.duration,
            delay = animate.delay,
            repeat = animate.repeat;

        //检测下一个动画,1同步执行
        this.callAnimation({
            id : id,
            context, context,
            'class' : cls,
            duration : duration,
            delay : delay,
            repeat : repeat
        }, function() {
            self.callAnimationLine(id, context, animates, callback);
        });
    };


    function buildAnimationClassName (json) {
        var arr = [];
        for (var k in json) {
            if (k != 'id' && k != 'context' && k != 'class') {
                arr.push(k);
                arr.push(json[k]);
            }
        }
        arr.unshift(json['class']);

        return arr.join('-');
    }

    Player.prototype.callAnimation = function (param, callback) {
        var self = this;
        if (this.stop == true) return;

        var $dom = $('#' + param.id, param.context || self.options.context);
        var effectClazz = buildAnimationClassName(param);
        var targetClazz = param.class + ' ' + effectClazz;

        console.log('targetClazz', targetClazz);

        $dom.removeClass(targetClazz + ' animated invisibility');
        $dom.addClass(targetClazz + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $dom.removeClass(targetClazz + ' animated');

            if (callback) {
                callback();
            }
        });

    }

    Player.prototype.animateLine = function(start, id, context, animates, callback) {
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
        this.runAnim(id, context, cls, delay, repeat, function() {
            self.animateLine(start + 1, id, context, animates, callback);
        });
    };

    Player.prototype.runAnim = function(id, context, cls, delay, repeat, callback) {
        var self = this;
        if (this.stop == true) return;
        var r = 0;
        var Anim = function() {
            if (self.stop == true) return;
            var $dom = $('#' + id, context || self.options.context);
            $dom.removeClass(cls + ' animated invisibility');
            $dom.addClass(cls + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                r++;
                $(this).removeClass(cls + ' animated');
                // 这里要setTimeout，否则会被冲掉
                setTimeout(function() {
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

     Player.prototype._buildChart = function () {
        if(this.charts.size==0) return;
        var _chart=new Chart(this.charts.el);
    }

    return Player;
});
