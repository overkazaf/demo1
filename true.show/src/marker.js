;
define(function(require) {
    'use strict';
    require('./tools/tips');

    var $ = require('jquery');

    var config = require('./config');
    var logs = require('./tools/loger');
    var taber = require('./tools/tab');
    var confPanel = require('./tools/confpanel');

    var sounder = require('./tools/sounder');
    //sounder.setSound('http://localhost/webppt/player/demo/asset/sound/sound.mp3');
    //sounder.play();
    var Pages = require('./tools/pages');
    var Layer = require('./tools/layer');
    var Tpler = require('./tools/tpler');
    var Viewer = require('./tools/viewer');
    var tools = require('./tools/tools');
    var tpler = require('./tools/tpler');

    // 存储模块
    var Storage = require('./tools/Storage');

    var AttributeManager = require('AttributeManager');
    var Player = require('Player');
    var Group = require('Group');
    // var Text = require('./attributor/Text');


    // 用于容器中dom查询的上下文
    var appContext = $(document).find('app-page')[0];
    var pageContext = document.getElementById('pagesBox');

    var paperTpl = {
        id: tools.uuid(),
        name: '',
        layout: 'liner',
        sound: '',
        pages: []
    };

    function newPage(id) {
        return {
            id: id || tools.uuid(),
            name: '空白页面',
            transform: null,
            styles: {},
            elements: [],
            events: []
        }
    }

    function newLayer(id, type) {
        return {
            id: id || tools.uuid(),
            name: '空白图层',
            value: '',
            type: type || 'text',
            animates: [],
            styles: {},
            events: [],
            states: {
                'visible': true,
                'lock': false
            }
        }
    }


    function Marker(data) {
        var that = this;
        this.idx = 0;
        this.data = $.extend(true, paperTpl, data);

        this.taber = null;
        this.cper = null;
        this.pages = null;
        this.viewer = null;

        this.copyer = {
            pager: null,
            bger: null,
            layer: null
        };
        // $(document).on('dblclick', function(event) {
        //  //event.preventDefault();
        //  // var x=event.pageX,y=event.pageY;
        //   Act on the event 
        //  // var r=that.ruler.getNearest({left:x,top:y,width:50,height:50});
        //  // logs.log('getNearest',r);
        // });

        this.AM = null; // 负责特性配置的管理模块

        this.init();
    }
    Marker.prototype = {
        init: function() {
            var that = this;
            //tab选项卡
            this.taber = new taber();
            //配置模板
            this.cper = new confPanel('#confpanel', '.sub-nav-item', function(t) {
                that.taber.showTab(t);
            });
            //主操作视图
            this.viewer = new Viewer({
                delLayerCallback: function(id) {
                    console.log('delCallBack', id);
                    that.delLayer(id);
                },
                changeLayerCallback: function(id, css, styles) {
                    // console.log('changeCallBack', id, ' >> ', css, ' >> ', styles);
                    // that.updateAttrModel({
                    //     id: id,
                    //     css: css,
                    //     styles: styles
                    // });
                    // console.log('getting layer',that.getLayer(id));
                    // that.getLayer(id).value = css.content;        
                    that.changeStyles(id, css, styles);
                },
                changeStatesCallback: function(id, type) {
                    that.changeStates(id, type);
                },
                copyLayerCallback: function(id) {
                    console.log('copyLayerCallback', id);
                    that.copyLayer(id);
                }, //拷贝图层
                pasteLayerCallback: function(id, after) {
                    console.log('pasteLayerCallback', id + ' >> ' + after);
                    that.pasteLayer(id, after);
                }, //粘贴图层
            });
            this.viewer.init(this.data.pages[this.idx]);
            //页面管理
            this.pages = new Pages({
                changePageCallback: function(page) {
                    console.log('changePageCallback', page);
                    that.changePage(page - 1);
                },
                newPageCallback: function(id) {
                    console.log('newPageCallback', id);
                    that.newPage(id);
                },
                delPageCallback: function(page) {
                    console.log('delPageCallback', page);
                    that.delPage(page - 1);
                },
                copyPageCallback: function(page) {
                    console.log('copyPageCallback', page);
                    that.copyPage(page - 1);
                },
                pastePageCallback: function(page, after) {
                    console.log('pastePageCallback', page + ' >> ' + after);
                    that.pastePage(page - 1, after);
                },
                copyBgCallback: function(page) {
                    console.log('copyBgCallback', page);
                },
                pasteBgCallback: function(page) {
                    console.log('pasteBgCallback', page);
                },
                pasteLayerCallback: function(page) {
                    console.log('pasteLayerCallback', page);
                },
                sortIndexCallback: function(sortids) {
                    console.log('sortIndexCallback', sortids);
                    that.sortPages(sortids);
                },
                saveTemplateCallback: function(page) {
                    console.log('saveTemplateCallback', page);
                }
            });
            this.pages.init(this.data.pages, this.idx);

            this.layer = new Layer({
                changeLayerCallback: function(id) {
                    console.log('changeLayerCallback', id);
                    that.viewer.setActiveElement(id);
                }, //切换图层
                changeStatesCallback: function(id, type) {
                    that.changeStates(id, type);
                },
                delLayerCallback: function(id) {
                    console.log('delLayerCallback', id);
                    that.delLayer(id);
                }, //删除图层
                copyLayerCallback: function(id) {
                    console.log('copyLayerCallback', id);
                    that.copyLayer(id);
                }, //拷贝图层
                pasteLayerCallback: function(id, after) {
                    console.log('pasteLayerCallback', id + ' >> ' + after);
                    that.pasteLayer(id, after);
                }, //粘贴图层
                sortIndexCallback: function(sortids) {
                        console.log('sortIndexCallback', sortids);
                        that.sortLayers(sortids);
                    } //排序
            });
            this.layer.init(this.data.pages[this.idx].elements);

            this.initAttributeManager();

            this.initPlayer();
        },
        initAttributeManager: function() {
            // 1. 初始化构建属性管理对象
            var AM = new AttributeManager({
                id: tools.uuid()
            });

            // 2. 把管理对象缓存起来
            Storage.set('__AM__', AM);

            // 3. 两个调度对象的指针设定
            // FIXME: 现在对象的指向的关系有点乱，后边要改成交给一个中介者全局调度
            this.setAM(AM);
            AM.setMarker(this);
        },
        initPlayer: function() {
            var player = new Player({
                dom: document.getElementById('pptbox'),
                previewFunction: function() {
                    // 把数据结构取到并传给player实例去播放
                    var sample = [{
                        id:'page1',
                        name:'页面1',
                        transform: '',
                        styles: '',
                        elements: [{
                            id: 'p1e1',
                            name: 'p1e1',
                            href: '',
                            value: 'True.Show',
                            type: 'text',
                            x: '53px',
                            y: '47px',
                            width: '214px',
                            height: '50px',
                            styles: 'left:53px;top:47px;width:214px;height:50px;text-align:center;content:True.Show;color:#f70;font-size:41px;font-family:Heiti;font-weight:bold;font-style:;text-decoration:;line-height:1;text-shadow:2.0000px 0.0000px 4px #5e5e5e;background-color:transparent;border-style:none;border-width:0px;border-color:#000000;border-radius:0px;opacity:1;transform:rotate(0deg);box-shadow:0.0000px 0.0000px 0px #ffffff;',
                            animates: [{
                                repeat: 1,
                                class: 'flip',
                                delay: 1
                            }],
                            auto: true
                        },
                        {
                            id: 'p1e2',
                            name: 'p1e2',
                            href: '',
                            value: './asset/demo/cube.png',
                            type: 'img',
                            x: '37px',
                            y: '130px',
                            width: '246px',
                            height: '254px',
                            styles: 'left:37px;top:130px;width:246px;height:254px;text-align:center;crop:on;background-color:#ffffff;border-style:none;border-width:0px;border-color:#000000;border-radius:0px;opacity:1;transform:rotate(0deg);box-shadow:0.0000px 0.0000px 0px #ffffff;',
                            animates: [{
                                repeat: 30,
                                class: 'pulse',
                                delay: 2.5
                            }],
                            auto: true
                        },
                        {
                            id: 'p1e3',
                            name: 'p1e3',
                            href: '',
                            value: '秀出你的数据',
                            type: 'text',
                            x: '63px',
                            y: '410px',
                            width: '194px',
                            height: '50px',
                            styles: 'left:63px;top:410px;width:194px;height:50px;text-align:center;content:秀出你的数据;color:#000000;font-size:18px;font-family:Book Antiqua;font-weight:bold;font-style:;text-decoration:;line-height:1;text-shadow:1px 1px 4px #ccc;background-color:transparent;border-style:none;border-width:0px;border-color:#000000;border-radius:0px;opacity:1;transform:rotate(0deg);box-shadow:0.0000px 0.0000px 0px #ffffff;',
                            animates: [{
                                repeat: 1,
                                class: 'rubberBand',
                                delay: 4.2
                            },{
                                repeat: 30,
                                class: 'bounce',
                                delay: 1.5
                            }],
                            auto: true
                        }]
                    },{
                        id:'page2',
                        name:'页面2',
                        styles: 'background:url(./asset/demo/background.jpg) no-repeat 0 0;',
                        elements: [{
                            id: 'p2e1',
                            name: 'p2e1',
                            href: '',
                            value: '文本组件',
                            type: 'text',
                            x: '25px',
                            y: '65px',
                            width: '130px',
                            height: '130px',
                            styles: 'left:25px;top:65px;width:130px;height:130px;text-align:center;content:编辑内容;color:#000000;font-size:20px;font-family:Heiti;font-weight:bold;font-style:;text-decoration:;line-height:135px;text-shadow:0.0000px 0.0000px 0px #000000;background-color:#fff;opacity:0.8;border-style:solid;border-width:4px;border-color:#f40;border-radius:50%;box-shadow:0.0000px 0.0000px 0px #ffffff;',
                            animates: [{
                                repeat: 0,
                                class: 'bounceInLeft',
                                delay: 1.1
                            }],
                            auto: true
                        },
                        {
                            id: 'p2e2',
                            name: 'p2e2',
                            href: '',
                            value: '图片组件',
                            type: 'text',
                            x: '145px',
                            y: '55px',
                            width: '155px',
                            height: '155px',
                            styles: 'left:145px;top:55px;width:155px;height:155px;text-align:center;content:编辑内容;color:#ff0;font-size:26px;font-family:Heiti;font-weight:bold;font-style:;text-decoration:;line-height:155px;text-shadow:0.0000px 0.0000px 0px #000000;background-color:#666;opacity:0.7;border-style:solid;border-width:4px;border-color:#0f0;border-radius:50%;box-shadow:0.0000px 0.0000px 0px #ffffff;',
                            animates: [{
                                repeat: 0,
                                class: 'bounceInRight',
                                delay: 1.3
                            }],
                            auto: true
                        },
                        {
                            id: 'p2e3',
                            name: 'p2e3',
                            href: '',
                            value: '图表组件',
                            type: 'text',
                            x: '70px',
                            y: '155px',
                            width: '155px',
                            height: '155px',
                            styles: 'left:70px;top:155px;width:155px;height:155px;text-align:center;content:编辑内容;color:#fff;font-size:32px;font-family:Heiti;font-weight:bold;font-style:;text-decoration:;line-height:145px;text-shadow:0.0000px 0.0000px 0px #000000;background-color:#09e;opacity:0.7;border-style:solid;border-width:4px;border-color:#222;border-radius:50%;box-shadow:0.0000px 0.0000px 0px #ffffff;',
                            animates: [{
                                repeat: 0,
                                class: 'bounceInUp',
                                delay: 1.5
                            }],
                            auto: true
                        },
                        {
                            id: 'p2e4',
                            name: 'p2e4',
                            href: '',
                            value: '表单',
                            type: 'text',
                            x: '12px',
                            y: '375px',
                            width: '65px',
                            height: '20px',
                            styles: 'left:12px;top:375px;width:65px;height:20px;text-align:center;content:编辑内容;color:#000;font-size:16px;font-family:Heiti;font-weight:bold;font-style:;text-decoration:;line-height:20px;text-shadow:0.0000px 0.0000px 0px #000000;background-color:transparent;border-style:solid;border-width:0;border-color:#fff;border-radius:0;box-shadow:0.0000px 0.0000px 0px #ffffff;',
                            animates: [{
                                repeat: 0,
                                class: 'bounceInRight',
                                delay: 1.8
                            },{
                                repeat: 20,
                                class: 'tada',
                                delay: 1.4
                            }],
                            auto: true
                        },{
                            id: 'p2e5',
                            name: 'p2e5',
                            href: '',
                            value: '地图',
                            type: 'text',
                            x: '65px',
                            y: '375px',
                            width: '65px',
                            height: '20px',
                            styles: 'left:65px;top:375px;width:65px;height:20px;text-align:center;content:编辑内容;color:#000;font-size:16px;font-family:Heiti;font-weight:bold;font-style:;text-decoration:;line-height:20px;text-shadow:0.0000px 0.0000px 0px #000000;background-color:transparent;border-style:solid;border-width:0;border-color:#fff;border-radius:0;box-shadow:0.0000px 0.0000px 0px #ffffff;',
                            animates: [{
                                repeat: 0,
                                class: 'bounceInRight',
                                delay: 2.2
                            },{
                                repeat: 20,
                                class: 'tada',
                                delay: 1.6
                            }],
                            auto: true
                        },{
                            id: 'p2e6',
                            name: 'p2e6',
                            href: '',
                            value: '视频',
                            type: 'text',
                            x: '120px',
                            y: '375px',
                            width: '65px',
                            height: '20px',
                            styles: 'left:120px;top:375px;width:65px;height:20px;text-align:center;content:编辑内容;color:#000;font-size:16px;font-family:Heiti;font-weight:bold;font-style:;text-decoration:;line-height:20px;text-shadow:0.0000px 0.0000px 0px #000000;background-color:transparent;border-style:solid;border-width:0;border-color:#fff;border-radius:0;box-shadow:0.0000px 0.0000px 0px #ffffff;',
                            animates: [{
                                repeat: 0,
                                class: 'bounceInRight',
                                delay: 2.4
                            },{
                                repeat: 20,
                                class: 'tada',
                                delay: 1.8
                            }],
                            auto: true
                        },{
                            id: 'p2e7',
                            name: 'p2e7',
                            href: '',
                            value: '音频',
                            type: 'text',
                            x: '170px',
                            y: '375px',
                            width: '65px',
                            height: '20px',
                            styles: 'left:170px;top:375px;width:65px;height:20px;text-align:center;content:编辑内容;color:#000;font-size:16px;font-family:Heiti;font-weight:bold;font-style:;text-decoration:;line-height:20px;text-shadow:0.0000px 0.0000px 0px #000000;background-color:transparent;border-style:solid;border-width:0;border-color:#fff;border-radius:0;box-shadow:0.0000px 0.0000px 0px #ffffff;',
                            animates: [{
                                repeat: 0,
                                class: 'bounceInRight',
                                delay: 2.6
                            },{
                                repeat: 20,
                                class: 'tada',
                                delay: 2.0
                            }],
                            auto: true
                        },{
                            id: 'p2e8',
                            name: 'p2e8',
                            href: '',
                            value: '背景音乐',
                            type: 'text',
                            x: '240px',
                            y: '375px',
                            width: '65px',
                            height: '20px',
                            styles: 'left:240px;top:375px;width:65px;height:20px;text-align:center;content:编辑内容;color:#000;font-size:16px;font-family:Heiti;font-weight:bold;font-style:;text-decoration:;line-height:20px;text-shadow:0.0000px 0.0000px 0px #000000;background-color:transparent;border-style:solid;border-width:0;border-color:#fff;border-radius:0;box-shadow:0.0000px 0.0000px 0px #ffffff;',
                            animates: [{
                                repeat: 0,
                                class: 'bounceInRight',
                                delay: 2.8
                            },{
                                repeat: 20,
                                class: 'tada',
                                delay: 2.2
                            }],
                            auto: true
                        }]
                    },{
                        id:'page3',
                        name:'页面3',
                        styles: 'background:url(./asset/demo/background.jpg) no-repeat 0 0;',
                        elements: [{
                            id: 'p3e1',
                            name: 'p3e1',
                            href: '',
                            value: '操作便捷易上手',
                            type: 'text',
                            x: '15px',
                            y: '70px',
                            width: '280px',
                            height: '80px',
                            styles: 'left:15px;top:70px;width:280px;height:80px;font-size:24px;line-height:80px;color:#09e;text-align:center;crop:on;background-color:#fff;border-style:dotted;border-width:2px;border-color:#222;border-radius:10px;opacity:1;transform:rotate(0deg);box-shadow: 1px 1px 5px #222;',
                            animates: [{
                                repeat: 1,
                                class: 'flipInX',
                                delay: 1
                            },{
                                repeat: 0,
                                class: 'bounceOut',
                                delay: 5
                            },{
                                repeat: 0,
                                class: 'fadeOut',
                                delay: 0
                            }],
                            auto: true
                        },
                        {
                            id: 'p3e2',
                            name: 'p3e2',
                            href: '',
                            value: '多种动画效果',
                            type: 'text',
                            x: '15px',
                            y: '175px',
                            width: '280px',
                            height: '80px',
                            styles: 'left:15px;top:175px;width:280px;height:80px;font-size:24px;line-height:80px;color:#f70;text-align:center;crop:on;background-color:#fff;border-style:dotted;border-width:2px;border-color:#222;border-radius:10px;opacity:1;transform:rotate(0deg);box-shadow: 1px 1px 5px #222;',
                            animates: [{
                                repeat: 0,
                                class: 'flipInX',
                                delay: 2
                            },{
                                repeat: 0,
                                class: 'bounceOut',
                                delay: 4.0
                            },{
                                repeat: 0,
                                class: 'fadeOut',
                                delay: 0
                            }],
                            auto: true
                        },
                        {
                            id: 'p3e3',
                            name: 'p3e3',
                            href: '',
                            value: '丰富属性设置',
                            type: 'text',
                            x: '15px',
                            y: '280px',
                            width: '280px',
                            height: '80px',
                            styles: 'left:15px;top:280px;width:280px;height:80px;font-size:24px;line-height:80px;color:#0f0;text-align:center;crop:on;background-color:#fff;border-style:dotted;border-width:2px;border-color:#222;border-radius:10px;opacity:1;transform:rotate(0deg);box-shadow: 1px 1px 5px #222;',
                            animates: [{
                                repeat: 0,
                                class: 'flipInX',
                                delay: 3
                            },{
                                repeat: 0,
                                class: 'bounceOut',
                                delay: 3.0
                            },{
                                repeat: 0,
                                class: 'fadeOut',
                                delay: 0
                            }],
                            auto: true
                        },{
                            id: 'p3e4',
                            name: 'p3e4',
                            href: '',
                            value: '开启你的旅程',
                            type: 'text',
                            x: '10px',
                            y: '40px',
                            width: '290px',
                            height: '340px',
                            styles: 'left:15px;top:40px;width:290px;height:340px;font-size:40px;line-height:340px;color:#fff;text-shadow:0 0 5px #fff;text-align:center;crop:on;background-color:#09e;border-style:solid;border-width:4px;border-color:#222;border-radius:40px;opacity:1;transform:rotate(0deg);',
                            animates: [{
                                repeat: 0,
                                class: 'rotateIn',
                                delay: 7
                            }],
                            auto: true
                        }]
                    },{
                        id:'page4',
                        name:'页面4',
                        styles: 'background:url(./asset/demo/background.jpg) no-repeat 0 0;',
                        elements: [{
                            id: 'p4e1',
                            name: 'p4e1',
                            href: '',
                            value: 'CONTACT US',
                            type: 'text',
                            x: '30px',
                            y: '50px',
                            width: '260px',
                            height: '50px',
                            styles: 'left:30px;top:50px;width:260px;height:50px;font-size:32px;color:#222;text-align:center;crop:on;line-height:50px;background-color:transparent;border-style:none;border-width:0px;border-color:#000000;border-radius:0px;opacity:1;transform:rotate(0deg);box-shadow:0.0000px 0.0000px 0px #ffffff;',
                            animates: [{
                                repeat: 0,
                                class: 'bounceInDown',
                                delay: 1
                            }],
                            auto: true
                        },{
                            id: 'p4e2',
                            name: 'p4e2',
                            href: '',
                            value: '联系我们',
                            type: 'text',
                            x: '30px',
                            y: '90px',
                            width: '260px',
                            height: '50px',
                            styles: 'left:30px;top:90px;width:260px;height:50px;font-size:28px;color:#222;text-align:center;crop:on;line-height:50px;background-color:transparent;border-style:none;border-width:0px;border-color:#000000;border-radius:0px;opacity:1;transform:rotate(0deg);box-shadow:0.0000px 0.0000px 0px #ffffff;',
                            animates: [{
                                repeat: 0,
                                class: 'bounceInDown',
                                delay: 1.5
                            }],
                            auto: true
                        },{
                            id: 'p4e3',
                            name: 'p4e3',
                            href: '',
                            value: './asset/demo/home.png',
                            type: 'img',
                            x: '32px',
                            y: '220px',
                            width: '40px',
                            height: '40px',
                            styles: 'left:32px;top:220px;font-size:14px;width:40px;line-height:40px;text-align:center;font-weight:bold;background: #222;opacity:0.8;color:#fff;',
                            animates: [{
                                repeat: 1,
                                class: 'bounceInLeft',
                                delay: 2
                            }],
                            auto: true
                        },
                        {
                            id: 'p4e4',
                            name: 'p4e4',
                            href: '',
                            value: '江苏中威科技软件系统有限公司',
                            type: 'text',
                            x: '75px',
                            y: '220px',
                            width: '220px',
                            height: '40px',
                            styles: 'left:75px;top:220px;font-size:14px;width:220px;line-height:40px;text-align:center;font-weight:bold;background: #222;opacity:0.8;color:#fff;',
                            animates: [{
                                repeat: 1,
                                class: 'bounceInRight',
                                delay: 2.2
                            }],
                            auto: true
                        },{
                            id: 'p4e5',
                            name: 'p4e5',
                            href: '',
                            value: './asset/demo/phone.png',
                            type: 'img',
                            x: '32px',
                            y: '265px',
                            width: '40px',
                            height: '40px',
                            styles: 'left:32px;top:265px;font-size:14px;width:40px;line-height:40px;text-align:center;font-weight:bold;background: #222;opacity:0.8;color:#fff;',
                            animates: [{
                                repeat: 1,
                                class: 'bounceInLeft',
                                delay: 2.5
                            }],
                            auto: true
                        },
                        {
                            id: 'p4e6',
                            name: 'p4e6',
                            href: '',
                            value: '0513-xxxxxxx',
                            type: 'text',
                            x: '75px',
                            y: '265px',
                            width: '220px',
                            height: '40px',
                            styles: 'left:75px;top:265px;font-size:14px;width:220px;line-height:40px;text-align:center;font-weight:bold;background: #222;opacity:0.8;color:#fff;',
                            animates: [{
                                repeat: 1,
                                class: 'bounceInRight',
                                delay: 2.7
                            }],
                            auto: true
                        },{
                            id: 'p4e7',
                            name: 'p4e7',
                            href: '',
                            value: './asset/demo/mail.png',
                            type: 'img',
                            x: '32px',
                            y: '310px',
                            width: '40px',
                            height: '40px',
                            styles: 'left:32px;top:310px;font-size:14px;width:40px;line-height:40px;text-align:center;font-weight:bold;background: #222;opacity:0.8;color:#fff;',
                            animates: [{
                                repeat: 1,
                                class: 'bounceInLeft',
                                delay: 2.9
                            }],
                            auto: true
                        },
                        {
                            id: 'p4e8',
                            name: 'p4e8',
                            href: '',
                            value: 'mail@trueway.com.cn',
                            type: 'text',
                            x: '75px',
                            y: '310px',
                            width: '220px',
                            height: '40px',
                            styles: 'left:75px;top:310px;font-size:14px;width:220px;line-height:40px;text-align:center;font-weight:bold;background: #222;opacity:0.8;color:#fff;',
                            animates: [{
                                repeat: 1,
                                class: 'bounceInRight',
                                delay: 3.1
                            }],
                            auto: true
                        },{
                            id: 'p4e9',
                            name: 'p4e9',
                            href: '',
                            value: './asset/demo/pos.png',
                            type: 'img',
                            x: '32px',
                            y: '355px',
                            width: '40px',
                            height: '40px',
                            styles: 'left:32px;top:355px;font-size:14px;width:40px;line-height:40px;text-align:center;font-weight:bold;background: #222;opacity:0.8;color:#fff;',
                            animates: [{
                                repeat: 1,
                                class: 'bounceInLeft',
                                delay: 3.1
                            }],
                            auto: true
                        },
                        {
                            id: 'p4e10',
                            name: 'p4e10',
                            href: '',
                            value: '工农路5号亚大厦北楼3楼',
                            type: 'text',
                            x: '75px',
                            y: '355px',
                            width: '220px',
                            height: '40px',
                            styles: 'left:75px;top:355px;font-size:14px;width:220px;line-height:40px;text-align:center;font-weight:bold;background: #222;opacity:0.8;color:#fff;',
                            animates: [{
                                repeat: 1,
                                class: 'bounceInRight',
                                delay: 3.3
                            }],
                            auto: true
                        }
                        ]
                    }];
                    player.playPPT(sample);
                }
            });
            player.init();

            Storage.set('__PLAYER__', player);
        },
        changePage: function(page) {
            // FIXME : 这里有bug， 切换页面时候的初始化工作
            this.idx = page;

            var pageData = this.data.pages[this.idx];
            var elements = pageData.elements;
            this.viewer.init(pageData);
            // 初始化， 并把页面的第一个层元素激活为焦点元素
            this.layer.init(elements, 0);
            $('#' + this.getActiveElementId(), appContext).trigger('click');
        },
        changeAnimates: function(id, animates) {
            var el = this.getElement(id);
            if (el != null) {
                el.animates = animates;
            }
            this.pages.setAnimates(id, JSON.stringify(animates));
            this.layer.setActiveElement(id);
        },
        changeStyles: function(id, css, styles) {
            var el = this.getElement(id);
            if (el != null) {
                el.styles = styles;
            }
            this.pages.setCSS(id, css, JSON.stringify(styles));
            this.layer.setActiveElement(id);
        },
        changeStates: function(id, type) {
            var obj = this.getElement(id),
                states = obj.states;
            obj.states[type] = !obj.states[type];
            var statesStr = JSON.stringify(obj.states);
            this.layer.changeStatesFunc(id, type, statesStr, obj.states[type]);
            this.viewer.changeStatesFunc(id, type, statesStr, obj.states[type]);
        },
        sortPages: function(ids) {
            var newPages = [],
                i = 0,
                l = ids.length;
            for (; i < l; i++) {
                var p = this.getPage(ids[i]);
                if (p != null) {
                    newPages.push(p);
                }
            }
            this.data.pages = newPages;
            this.idx = this.pages.getActivePage() - 1;
        },
        sortLayers: function(ids) {
            var newLayers = [],
                l = ids.length,
                i = l - 1;
            for (; i >= 0; i--) {
                var p = this.getLayer(ids[i]);
                if (p != null) {
                    newLayers.push(p);
                }
            }
            this.data.pages[this.idx].elements = newLayers;
            var id = this.layer.getActiveId();
            this.viewer.init(this.data.pages[this.idx]);
            this.viewer.setActiveElement(id);
        },
        newPage: function(id) {
            var pageData = newPage(id);
            this.data.pages.push(pageData);
        },
        delPage: function(page) {
            // 1. 删除页面要先删除缓存的配置项数据结构和页面内的元素
            var that = this;
            var pageData = this.data.pages[page];
            var elements = pageData.elements;
            tools.each(elements, function(el) {
                Storage.remove(el.id);
                that.viewer.removeElement(el.id);
            });

            // 2. 用力删除数据结构和页面dom
            this.data.pages.splice(page, 1);
            this.pages.remove(page);
        },
        copyPage: function(page) {
            this.copyer.pager = $.extend(true, {}, this.data.pages[page]);
            this.pages.setCopyer('pager', true);
        },
        pastePage: function(page, after) {
            var copypage = newPage();
            $.extend(true, copypage, this.copyer.pager);
            copypage.id = tools.uuid();

            // 粘贴页面时要把元素id更新，同时把配置项复制一份
            var elements = copypage.elements;
            tools.each(elements, function(el) {
                var newid = tools.uuid();
                var group = Storage.get(el.id);
                var newGroup = Group.prototype.cloneGroup(group, newid);
                Storage.set(newid, newGroup);
                el.id = newid;
            });

            if (after == true) page = page + 1;
            if (page >= this.data.pages.length) {
                this.data.pages.push(copypage);
            } else {
                this.data.pages.splice(page, 0, copypage);
            }
            this.pages.pastePage(page, after, copypage);
        },
        getElement: function(id) {
            var els = this.data.pages[this.idx].elements,
                i = 0,
                l = els.length;
            for (; i < l; i++) {
                if (els[i].id === id) {
                    return els[i];
                }
            }
            return null;
        },
        getActiveElementId: function() {
            // 全局获取焦点元素ID的方法
            return this.layer.getActiveId();
        },
        getLastElementId: function() {
            // 全局获取焦点元素ID的方法
            return this.layer.getLastElementId();
        },
        getPage: function(id) {
            var ps = this.data.pages,
                i = 0,
                l = ps.length;
            for (; i < l; i++) {
                if (ps[i].id === id) {
                    return ps.splice(i, 1)[0];
                }
            }
            return null;
        },
        getLayer: function(id) {
            var ls = this.data.pages[this.idx].elements,
                i = 0,
                l = ls.length;
            for (; i < l; i++) {
                if (ls[i].id === id) {
                    return ls.splice(i, 1)[0];
                }
            }
            return null;
        },
        copyLayer: function(id) {
            var obj = $.extend(true, newLayer(), this.getElement(id));
            this.viewer.setCopyer('layer', true);
            this.layer.setCopyer('layer', true);
            this.copyer.layer = obj;
        },
        pasteLayer: function(id, after) {
            var copylayer = newLayer();
            $.extend(true, copylayer, this.copyer.layer);
            var newid = tools.uuid();
            copylayer.id = newid;

            // 拷贝新的配置项
            var group = Storage.get(id);
            var newGroup = Group.prototype.cloneGroup(group, newid);
            Storage.set(newid, newGroup);


            var els = this.data.pages[this.idx].elements,
                i = 0,
                l = els.length;
            var idx = 0;
            for (; i < l; i++) {
                if (els[i].id == id) {
                    if (after == true) {
                        idx = i;
                    } else {
                        idx = i + 1;
                    }
                    break;
                }
            }
            if (idx >= l) {
                els.push(copylayer);
            } else {
                els.splice(idx, 0, copylayer);
            }
            var id = '#' + id;
            this.viewer.addElement(copylayer, id, after);
            this.layer.addElement(copylayer, id, after);
            this.pages.addElement(copylayer, id, after);
        },
        addNewElement: function(data) {
            if (typeof this.data.pages == 'undefined' || this.data.pages.length == 0) {
                alert('请先添加页面！');
                return;
            }

            var clonedLayer = newLayer();
            $.extend(true, clonedLayer, data);

            this.data.pages[this.idx].elements.push(clonedLayer);

            var id = this.getLastElementId();
            id = !!id ? '#' + id : undefined;

            this.viewer.addElement(clonedLayer, id, true);
            this.layer.addElement(clonedLayer, id, true);
            this.pages.addElement(clonedLayer, id, true);

            // this.data.pages[this.pages.getActivePage()-1].elements.push(copylayer);
        },
        delLayer: function(id) {
            this.getLayer(id);
            this.viewer.removeElement(id);
            this.layer.removeElement(id);
            this.pages.removeElement(id);

            // 把配置信息从缓存对象中移除掉
            Storage.remove(id);
        },
        /**
         *  直接通信的AM模块实例的setter和getter方法
         */
        setAM: function(AM) {
            this.AM = AM;
        },
        getAM: function() {
            return this.AM;
        },

        /**
         * [updateView 通过AM模块传递过来的JSON更新视图]
         * @return {[type]} [description]
         */
        updateView: function(json) {
            console.log('updateView >>>>>>', json);
            // 1. 判断当前焦点元素是为空存在或为锁定状态， 否则不更新视图           
            var activeEl = $('#' + json['styles'].groupId, appContext);
            var currentType = activeEl.attr('type');
            if (!currentType) return;

            // 2. 合并属性
            $.extend(true, json[currentType].styles || (json[currentType].styles = {}), json['styles'].styles);
            $.extend(true, json[currentType].animates || (json[currentType].animates = []), json['animate'].animates);
            //$.extend(true, json[currentType].events || (json[currentType].events = {}), json['event'].events);

            var json = json[currentType];

            // 3. 在不同的容器内更新元素，后边拆分开来
            var viewEl = $('#' + json.groupId, appContext);
            var pageEl = $('#' + json.groupId, pageContext);
            pageEl.find('.cont-inner').text(json.content);
            viewEl.find('.cont-inner').text(json.content);

            if (viewEl.length && pageEl.length) {
                this.viewer.updateElement(viewEl, json.styles);
                this.changeStyles(json.groupId, json.styles, json.styles);

                this.changeAnimates(json.groupId, json.animates);
                // 找el， 更新结构
                var elements = this.data.pages[this.idx].elements;
                elements.forEach(function(el, index) {
                    if (el.id == json.groupId) {
                        var clonedEl = tools.clone(el);
                        clonedEl.value = json.content;
                        elements.splice(index, 1, clonedEl);
                    }

                });
            }

        },
        updateAttrModel: function(json) {
            return this.getAM().updateAttrModel(json);
        }
    };
    return Marker;
});
