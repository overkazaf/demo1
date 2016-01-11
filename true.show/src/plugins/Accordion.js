/**
 * Accordion 折叠类
 * @author John Nong(https://www.github.com/overkazaf)
 * @module plugins/Accordion
 */
;
define(function(require) {
    var tools = require('../tools/tools');
    var Base = require('../attributor/Base');


    var accordTpl = [
        '<div class="ui-accordion" id="{{ID}}">',
        '<div class="accordion-header">',
        '<span class="accordion-caret fa fa-lg fa-caret-right"></span>',
        '<b class="accordion-title">动画<span class="accordion-seq">{{SEQ}}</span>(<span class="accordion-subtitle">无动画</span>)</b>',
        '<span class="accordion-trash fa fa-lg fa-trash"></span>',
        '</div>',
        '<div class="accordion-content">',
        '{{TEMPLATE}}',
        '</div>',
        '</div>'
    ].join('');

    var tabTpl = [
        '<div id="{{ID}}" class="ui-tab">',
        '<ul class="ui-tablist clearfix">',
        '<li class="ui-tablist-item"><button class="btn btn-default">出现动画</button></li>',
        '<li class="ui-tablist-item"><button class="btn btn-default">消失动画</button></li>',
        '<li class="ui-tablist-item"><button class="btn btn-default">特效动画</button></li>',
        '</ul>',
        '<div class="ui-tab-content animate-appear">{{APPEAR}}</div>',
        '<div class="ui-tab-content animate-disapear">{{DISAPPEAR}}</div>',
        '<div class="ui-tab-content animate-special">{{SPECIAL}}</div>',
        '</div>'
    ].join('');

    var Accordion = function(options) {
        this.id = tools.uuid();
        this.options = options || {};
    };

    Accordion.prototype.init = function() {
        this.dom = this.buildPlugin();
        this.bindEvent();
    };

    Accordion.prototype.bindEvent = function() {
        var $content = this.dom.find('.accordion-content');
        var that = this;
        this.dom.on('click', '.accordion-header', function(e) {
            if ($(e.target).hasClass('fa-trash')) {
                if (confirm('确认要删除这个动画效果？')) {
                    $(that.dom).closest('.ui-accordion').remove();
                    that.supervisor.confirmDelete(that.id);
                }
            } else {
                var $caret = $(this).find('.accordion-caret');
                $caret.toggleClass('fa-caret-down');
                $caret.toggleClass('fa-caret-right');

                $content.toggle('fast');
            }
        });
    };

    Accordion.prototype.buildPlugin = function() {
    	var uuid = tools.uuid();
        var tpl = accordTpl
            .replace('{{ID}}', uuid)
            .replace('{{SEQ}}', this.options.seq)
            .replace('{{TEMPLATE}}', this.getTemplate());

        this.domUUID = uuid;
        this.dom = $(tpl);
        this.dom.insertBefore($('#' + this.options.formid));
        this.bindTemplateEvent();

        return this.dom;
    };


    Accordion.prototype.bindTemplateEvent = function() {
        var subTabId = this.subTabId;
        var $form = $('#' + this.formid);
        var $tab = $('#' + subTabId, $form[0]);
        var $activeEl = $('#' + this.options.activeId, $('app-page')[0]);
        $tab.on('click', '.ui-tablist-item', function(ev) {
            $(this).addClass('active').siblings().removeClass('active');
            var index = $(this).index();
            $tab.find('.ui-tab-content').hide().eq(index).show();
        });

        $('.ui-tablist-item:first', $('#'+this.domUUID)[0]).trigger('click');
        this.accordion('collapse');

        var timeout;
        $('.effect-list-item').on('mouseover', function(ev) {
            var $target = $(this).find('.anim-item');
            if ($target.attr('data-class')) {
            	clearTimeout(timeout);
                timeout = setTimeout(function () {
                	var clazz = $target.attr('data-class');
               	    $target.addClass('animated').addClass(clazz);
                }, 0);
                
            }
        });

       
        $('.effect-list-item').on('mouseout', function(ev) {
            var $target = $(this).find('.anim-item');
            if ($target.attr('data-class')) {
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                	var clazz = $target.attr('data-class');
                	$target.removeClass('animated').removeClass(clazz);
                }, 0);
            }
        });

        $('.effect-list-item').on('click', function (){
        	$('.anim-item').each(function (){
        		$(this).removeClass('animated').removeClass($(this).attr('data-class'));
        	})
        	$(this).toggleClass('active').closest('li').siblings().find('.anim-item').removeClass('active');
        	var $subtitle = $(this).closest('.ui-accordion').find('.accordion-subtitle');
        	
        	$activeEl[0].className = 'active';
        	var $animItem = $(this).find('.anim-item');
        	if ($(this).hasClass('active')) {
        		$subtitle.html($animItem.attr('data-name'))
        		$activeEl.addClass($animItem.attr('data-class')).addClass('animated');
        	} else {
        		$subtitle.html('无动画');
        		$activeEl.removeClass($animItem.attr('data-class')).removeClass('animated');
        	}
        });
    };

    Accordion.prototype.accordion = function (cmd) {
    	switch (cmd) {
    		case 'collapse':
			this.dom.find('.accordion-content').toggle('fast')
    		break;		
    	}
    }
    Accordion.prototype.getTemplate = function() {
        var html = [];
        html.push(this.getSliders());
        html.push('<hr class="editor-panel-text">');
        html.push(this.getAminationTabs());
        return html.join('');
    }

    var sliders = [{
        label: '持续时间',
        value: 1,
        css: 'during',
        name: 'anim-during',
        plugin: 'slider-during',
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
    }, ];
    Accordion.prototype.getSliders = function() {
        var html = [];
        for (var i = 0, l = sliders.length; i < l; i++) {
            html.push(Base.prototype.buildFormLine(sliders[i]));
        }
        return html.join('');
    };


    var animateDict = {
        'appear': [{
            "clazz": "zoomIn",
            "label": "放大进入"
        }, {
            "clazz": "swashIn",
            "label": "放大震入"
        }, {
            "clazz": "vanishIn",
            "label": "模糊进入"
        }, {
            "clazz": "swap",
            "label": "由远及近"
        }, {
            "clazz": "zoomInUp",
            "label": "从下放大"
        }, {
            "clazz": "bounceIn",
            "label": "弹入"
        }, {
            "clazz": "bounceInUp",
            "label": "从下弹入"
        }, {
            "clazz": "bounceInDown",
            "label": "从上弹入"
        }, {
            "clazz": "bounceInRight",
            "label": "从右弹入"
        }, {
            "clazz": "bounceInLeft",
            "label": "从左弹入"
        }, {
            "clazz": "fadeIn",
            "label": "淡入"
        }, {
            "clazz": "fadeInUp",
            "label": "从下淡入"
        }, {
            "clazz": "fadeInDown",
            "label": "从上淡入"
        }, {
            "clazz": "fadeInLeft",
            "label": "从左淡入"
        }, {
            "clazz": "fadeInRight",
            "label": "从右淡入"
        }, {
            "clazz": "fadeInUpBig",
            "label": "从下进入"
        }, {
            "clazz": "fadeInDownBig",
            "label": "从上进入"
        }, {
            "clazz": "fadeInLeftBig",
            "label": "从左进入"
        }, {
            "clazz": "fadeInRightBig",
            "label": "从右进入"
        }, {
            "clazz": "flipInY",
            "label": "Y轴转入"
        }, {
            "clazz": "flipInX",
            "label": "X轴转入"
        }, {
            "clazz": "lightSpeedIn",
            "label": "光速进入"
        }, {
            "clazz": "rotateIn",
            "label": "旋转进入"
        }, {
            "clazz": "rotateInDownLeft",
            "label": "左向下转"
        }, {
            "clazz": "rotateInDownRight",
            "label": "右向下转"
        }, {
            "clazz": "rotateInUpLeft",
            "label": "左向上转"
        }, {
            "clazz": "rotateInUpRight",
            "label": "右向上转"
        }, {
            "clazz": "rollIn",
            "label": "滚入"
        }, {
            "clazz": "slideInUp",
            "label": "从下滑入"
        }, {
            "clazz": "slideInDown",
            "label": "从上滑入"
        }, {
            "clazz": "slideInLeft",
            "label": "从左滑入"
        }, {
            "clazz": "slideInRight",
            "label": "从右滑入"
        }, {
            "clazz": "spaceInRight",
            "label": "空间右入"
        }, {
            "clazz": "spaceInLeft",
            "label": "空间左入"
        }, {
            "clazz": "spaceInDown",
            "label": "空间上入"
        }, {
            "clazz": "spaceInUp",
            "label": "空间下入"
        }, {
            "clazz": "boomIn",
            "label": "爆炸效果"
        }, {
            "clazz": "tinUpIn",
            "label": "铃声上入"
        }, {
            "clazz": "tinDownIn",
            "label": "铃声下入"
        }, {
            "clazz": "foolishIn",
            "label": "乱入"
        }, {
            "clazz": "puffIn",
            "label": "闪入"
        }, {
            "clazz": "slideRight",
            "label": "右移动"
        }, {
            "clazz": "twisterInUp",
            "label": "上旋转入"
        }],
        'disappear': [{
            "clazz": "zoomOut",
            "label": "缩小退出"
        }, {
            "clazz": "bounceOut",
            "label": "弹出"
        }, {
            "clazz": "bounceOutUp",
            "label": "向上弹出"
        }, {
            "clazz": "bounceOutDown",
            "label": "向下弹出"
        }, {
            "clazz": "bounceOutRight",
            "label": "从右弹出"
        }, {
            "clazz": "bounceOutLeft",
            "label": "从左弹出"
        }, {
            "clazz": "fadeOut",
            "label": "淡出"
        }, {
            "clazz": "fadeOutUp",
            "label": "向上淡出"
        }, {
            "clazz": "fadeOutDown",
            "label": "向下淡出"
        }, {
            "clazz": "fadeOutLeft",
            "label": "从左淡出"
        }, {
            "clazz": "fadeOutRight",
            "label": "从右淡出"
        }, {
            "clazz": "flipOutY",
            "label": "Y轴转出"
        }, {
            "clazz": "flipOutX",
            "label": "X轴转出"
        }, {
            "clazz": "lightSpeedOut",
            "label": "光速进出"
        }, {
            "clazz": "rollOut",
            "label": "滚出"
        }, {
            "clazz": "slideOutUp",
            "label": "从上滑出"
        }, {
            "clazz": "slideOutDown",
            "label": "从下滑出"
        }, {
            "clazz": "slideOutLeft",
            "label": "从左滑出"
        }, {
            "clazz": "slideOutRight",
            "label": "从右滑出"
        }],
        'special': [{
            "clazz": "circleRotate",
            "label": "转圈"
        }, {
            "clazz": "bounce",
            "label": "弹跳"
        }, {
            "clazz": "flash",
            "label": "闪烁"
        }, {
            "clazz": "pulse",
            "label": "心跳"
        }, {
            "clazz": "shake",
            "label": "震动"
        }, {
            "clazz": "swing",
            "label": "摇摆"
        }, {
            "clazz": "rubberBand",
            "label": "橡皮筋"
        }, {
            "clazz": "flip",
            "label": "翻转"
        }, {
            "clazz": "wobble",
            "label": "摇晃"
        }, {
            "clazz": "hinge",
            "label": "摇摇欲坠"
        }, {
            "clazz": "moveAround",
            "label": "左右移动"
        }, {
            "clazz": "tada",
            "label": "左右抖动"
        }, {
            "clazz": "boingInUp",
            "label": "吹风效果"
        }]
    };
    var animateListFn = function(type) {
        var html = [];
        html.push('<ul class="effect-list clearfix">');
        for (var i = 0, item; item = animateDict[type][i++];) {
            html.push('<li class="effect-list-item">');
            html.push('<div data-class="' + item['clazz'] + '" data-name="'+ item['label'] +'" class="anim-item"></div>');
            html.push('<h4>' + item['label'] + '</h4>');
            html.push('</li>');
        }
        html.push('</ul>');
        return html.join('');
    };

    Accordion.prototype.getAminationTabs = function() {
        this.subTabId = tools.uuid();
        return tabTpl
            .replace('{{ID}}', this.subTabId)
            .replace('{{APPEAR}}', animateListFn('appear'))
            .replace('{{DISAPPEAR}}', animateListFn('disappear'))
            .replace('{{SPECIAL}}', animateListFn('special'));

    };

    Accordion.prototype.destory = function() {};


    tools.inherits(Accordion, Base);
    return Accordion;
});
