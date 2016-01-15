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
        this.idx = 0;
        this.stop = false;
    };

    Player.prototype.playPPT = function(pages) {
        this.data.pages = pages;

        this.drawPage(pages);

        this.displayStudio();

        this.animating(0);

        this.initPlayer();
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
                    h = '';
                var elStyle = _elStyleTpl
                    .replace('{{left}}', el.x)
                    .replace('{{top}}', el.y)
                    .replace('{{z-index}}', m)
                    .replace('{{width}}', el.width)
                    .replace('{{height}}', el.height);
                elStyle = !el.styles ? elStyle : elStyle + el.styles;
                switch (el.type) {
                    case "img":
                        h = '<img class="element invisibility" style="' + elStyle + '" id="' + el.id + '" name="' + el.name + '" href="' + el.href + '" src="' + el.value + '" />';
                        break;
                    case "object":

                        break;
                    case "echarts":
                        h = '<div id="' + el.id + '" style="' + elStyle + '"></div>';
                        //延后处理
                        this.chart.el[el.id] = {
                            pi: i,
                            ei: m,
                            models: el.value
                        };
                        this.chart.size += 1;
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
            // if (that.idx == this.page) return;
            if (that.idx == 3) {idx = -1;}
            that.resetPage(that.idx);
            that.idx = ++idx;
            $sections.hide().eq(idx).show();
            that.animating(that.idx);
        });
        that.resetPage(that.idx);
    };

    Player.prototype.init = function() {
        this.bindEvent();
    };
    Player.prototype.animating = function(idx) {
        //这里需要深拷贝对象数组
        var elements = this.data.pages[idx].elements.slice(0);
        this.playSpriteLine(elements);
    };


    Player.prototype.resetPage = function(idx) {
        this.stop = true;
        var els = this.data.pages[idx].elements;
        for (var i in els) {
            $('#' + els[i].id, this.options.context || appContext).removeClass().addClass('invisibility');
        }
        this.stop = false;
    };

    Player.prototype.bindEvent = function() {
        var that = this;
        // 暂时绑定在预览按钮上
        $(document).on('click', this.options.previewButton, that.options.previewFunction);
    };

    Player.prototype.playSpriteLine = function(elements) {
        if (this.stop == true) return;
        var self = this,
            els, animates;
        while (elements.length > 0) {
            //取出第一个
            els = elements.shift();
            animates = els.animates.slice(0);
            //检测下一个
            if (elements.length > 0 && elements[0].auto > 0) {
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

    Player.prototype.animateLine = function(start, id, animates, callback) {
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

    Player.prototype.runAnim = function(id, cls, delay, repeat, callback) {
        var self = this;
        var context = this.options.context;
        if (this.stop == true) return;
        var r = 0;
        var Anim = function() {
            if (self.stop == true) return;
            var $dom = $('#' + id, context || appContext);
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

    return Player;
});
