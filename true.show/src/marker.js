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
    var Studio = require('./tools/studio');
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

    var ChartConfig = require('ChartConfig');

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
        //  event.preventDefault();
        //  var x=event.pageX,y=event.pageY;
        //  var offset = $('app-page').offset();
        //  x -= offset.left;
        //  y -= offset.top;

        //   //Act on the event 
        //  var r=that.viewer.ruler.getNearest({left:x,top:y,width:50,height:50});
        //  logs.log('getNearest',r);
        // });

        this.AM = null; // 负责特性配置的管理模块

        this.charts = {
            el: {},
            size: 0
        };

        this.chartInstancesArray = [];
        this.chartInstancesMap = {};

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

            // 防止结构不全的导入数据
            if (!!this.data.pages[this.idx] && this.data.pages[this.idx].elements) {
                this.layer.init(this.data.pages[this.idx].elements);
            }

            this.initAttributeManager();

            this.initPlayer();

            this.initStudio();

            this._buildChart();


            this.loadAnimateCSS();

            this.test();
        },
        loadAnimateCSS : function () {
            // 这里要将marker初始化的动画参数类加入view中

        },
        test : function () {
            var animTpl = require('animTpl');
            var style = animTpl.compile('XXXYYY', {
                class : 'bounceIn',
                duration : 2,
                delay : 2,
                repeat : 4
            });

            var $style = $(style);

        },
        _buildChart: function() {
            var that = this;
            var pages = this.data.pages;
            tools.each(pages, function(page) {
                that.renderChart(page, pageContext);
            });
        },
        renderChart: function(page, context) {
            var that = this;
            var elements = page.elements;
            tools.each(elements, function(el) {
                // pageContext
                if (el.type == 'chart') {
                    var instance = echarts.init($('#' + el.id, context)[0]);
                    if (!(el.id in that.chartInstancesMap)) {
                        that.chartInstancesArray.push(instance);
                        that.chartInstancesMap[el.id] = instance;
                    }
                    instance.setOption(ChartConfig.charts.options[el.modelType][0]);
                }
            });
        },
        initAttributeManager: function() {
            // 1. 初始化构建属性管理对象
            var AM = new AttributeManager({
                id: tools.uuid()
            });

            // 2. 缓存配置组管理对象
            Storage.set('__AM__', AM);

            // 3. 两个调度对象的指针设定
            // FIXME: 现在对象的指向的关系有点乱，后边要改成交给一个中介者全局调度
            this.setAM(AM);
            AM.setMarker(this);
        },
        initPlayer: function() {
            var sample = require('PreviewSample');
            var player = new Player({
                dom: document.getElementById('pptbox'),
                data: sample,
                previewFunction: function() {
                    // 把数据结构取到并传给player实例去播放
                    //var sampleData = Storage.getAM().getMarker().data.pages.slice(0);
                    player.playPPT(sample);
                }
            });
            player.init();

            Storage.set('__PLAYER__', player);
        },

        initStudio: function() {
            var studio = new Studio({
                onPlay: function() {
                    var player = Storage.get('__PLAYER__');
                    var AM = Storage.getAM();
                    var mk = AM.getMarker();
                    var elements = mk.data.pages[mk.idx].elements;
                    if (elements.length) {
                        player.stop = false;
                        player.playAnimation(elements.slice(0), appContext);
                    }
                },
                onStop: function() {
                    var player = Storage.get('__PLAYER__');
                    var AM = Storage.getAM();
                    var mk = AM.getMarker();
                    var elements = mk.data.pages[mk.idx].elements;
                    player.stopAnimation(elements.slice(0), appContext);
                }
            });
        },
        changePage: function(page) {
            // FIXME : 这里有bug， 切换页面时候的初始化工作
            this.idx = page;
            var pageData = this.data.pages[this.idx];
            var elements = pageData.elements;
            this.viewer.init(pageData);
            // 初始化， 并把页面的第一个层元素激活为焦点元素
            this.layer.init(this.data.pages[page].elements, 0);

            this.renderChart(this.data.pages[page], appContext);
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
            $('.page-item', pageContext).addClass('active').siblings().removeClass('active');
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
            var elements = copypage.elements.slice(0);
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
            // 全局获取最后一个元素ID的方法
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
            console.log('copylayer', copylayer);
            // 拷贝新的配置项
            var group = Storage.get(id);
            var newGroup = Group.prototype.cloneGroup(group, newid);

            console.log('newGroup', newGroup);
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
            console.log('addNewElement', data);
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

            console.log(json[currentType].styles);
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
