;
define(function(require) {
    'use strict';
    var $ = require('jquery');
    var Storage = require('./Storage');
    var nativeForEach = Array.prototype.forEach;
    var tools = {
        uuid: function(len, radix) {    
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');    
            var uuid = [],
                i;    
            radix = radix || chars.length;    
            if (len) {       
                // Compact form      
                for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];    
            } else {       // rfc4122, version 4 form
                      
                var r;       // rfc4122 requires these characters
                      
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';      
                uuid[14] = '4';       // Fill in random data.  At i==19 set the high bits of clock sequence as
                       // per rfc4122, sec. 4.1.5
                      
                for (i = 0; i < 36; i++) {        
                    if (!uuid[i]) {          
                        r = 0 | Math.random() * 16;          
                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];        
                    }      
                }    
            }    
            return uuid.join('');
        },
        inherits: function(clazz, baseClazz) {
            var clazzPrototype = clazz.prototype;

            function F() {}
            F.prototype = baseClazz.prototype;
            clazz.prototype = new F();

            for (var prop in clazzPrototype) {
                clazz.prototype[prop] = clazzPrototype[prop];
            }
            clazz.constructor = clazz;
        },
        clone: function(obj) {
            if (typeof(obj) != 'object' || obj == null || obj == undefined) return obj;

            var result = obj.constructor == Array ? [] : {};
            for (var i in obj) {
                result[i] = tools.clone(obj[i]);
            }
            return result;
        },
        each: function(obj, cb, context) {
            if (!(obj && cb)) {
                return;
            }
            if (obj.forEach && obj.forEach === nativeForEach) {
                obj.forEach(cb, context);
            } else if (obj.length === +obj.length) {
                for (var i = 0, len = obj.length; i < len; i++) {
                    cb.call(context, obj[i], i, obj);
                }
            } else {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        cb.call(context, obj[key], key, obj);
                    }
                }
            }
        },
        indexOf: function(el, arr, condition, value) {
            var i;
            for (i = 0, l = arr.length; i < l; i++) {
                if (!!condition) {
                    if (value == arr[i][condition]) {
                        return i;
                    }
                } else {
                    if (el === arr[i]) {
                        return i;
                    }
                }
            }

            return -1;
        },
        // 极坐标系转直角坐标系
        polar2Axes : function (distance, alpha, fixed) {
            var ret = {
                x : distance * Math.cos(alpha * (2 * Math.PI / 360)),
                y : distance * Math.sin(alpha * (2 * Math.PI / 360))
            };
            if(!!fixed) {
                ret.x = new Number(ret.x).toFixed(fixed);
                ret.y = new Number(ret.y).toFixed(fixed);
            }
            return ret;
        },
        // 直角坐标系转极坐标系
        axes2Polar : function (x, y, fixed) {
            var ret = {
                dis : Math.sqrt(x*x + y*y),
                angle : y == 0 ? 0 : Math.atan(x/y) * 360/(2 * Math.PI)
            };
            if(!!fixed) {
                ret.dis = new Number(ret.dis).toFixed(fixed);
            }
            return ret;
        }
    };

    var timeout;
    window.callFN = function(fnName, groupId) {
        var strategy = {
            'noticeUpdate' : function (groupId) {
                if(timeout)clearTimeout(timeout);
                timeout = null;
                timeout = setTimeout(function (){
                    var group = Storage.get(groupId);
                    var list = group.getAll();

                    group.noticeUpdate();

                    group.iterList(function(item, index) {
                        // 重置配置项的数据结构
                        var data = item.form2Data();
                        // 覆盖后强行塞入
                        var target = item.options;
                        $.extend(true, target, data);

                        list.splice(index, 1, item);
                    });

                    Storage.set(groupId, group);
                }, 50)
            },
            'angle2pixel' : function (groupId) {
                // angle2pixel
                // 这一函数是将角度值转换成一个坐标矩阵
                var val = document.getElementById(groupId).value;
                // 现在先返回假装计算一下的值
                return +val * 1.2;
            },
            'showModal' : function (groupId) {
                var modal = Storage.get('__Modal__');
                // 这里用AOP去注入事件，并在onHide的时候还原， 重用一个Modal实例
                var __old_onConfirm = modal.options.onConfirm;
                var __old_onHide = modal.options.onHide;

                modal.options.onConfirm = null;
                modal.options.onHide = null;

                modal.options.onConfirm = function (modal) {
                    var dom = modal.dom;
                    if (!dom.find('li.active').length) {
                        alert('请选择一张素材图片');
                        return false;
                    }

                    var picUrl = dom.find('li.active>img').attr('src');
                    var cropEl = Storage.get('__cropEl__');

                    // 更新dom
                    $('#' + groupId, $('pagesBox')[0]).find('.cont-inner>img').attr('src', picUrl);
                    $('#' + groupId, $('app-page')[0]).find('.cont-inner>img').attr('src', picUrl);

                    // 重新刷新Crop域
                    Storage.set('__currentImage__', picUrl);

                    // 更新marker里的缓存数据结构
                    var marker = Storage.get('__AM__').getMarker();
                    var elements = marker.data.pages[marker.idx].elements;
                    elements.forEach(function (item, index){
                        if(item.id == groupId){
                            var modEl = tools.clone(item);
                            modEl.src = picUrl;
                            elements.splice(index, 1, modEl);
                        }
                    });

                    var group = Storage.get(groupId);
                    // group.destory();
                    group.init();
                    return true;
                }


                modal.options.onHide = function (modal) {
                    modal.options.onConfirm = __old_onConfirm;
                    modal.options.onHide = __old_onHide;
                };
                modal.modal('show');

                return false;
            },
            'cropImage' : function (groupId) {
                var coords = Storage.get('__selectedCoords__');
                var cropEl = Storage.get('__cropEl__');
                var modal = Storage.get('__Modal__');
                var img = cropEl[0];
                

                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');

                var rW = 220 / img.width;
                var rH = 220 / img.height;
                canvas.width = coords.w/rW;
                canvas.height = coords.h/rH;      

                context.drawImage(
                    img, 
                    coords.x/rW, 
                    coords.y/rH, 
                    coords.w/rW, 
                    coords.h/rH, 
                    0, 
                    0, 
                    coords.w/rW, 
                    coords.h/rH
                );


                // 这里要启动一下服务器, 不然会被坑爹的crossOrigin害惨了
                var picUrl = canvas.toDataURL("image/png");

                // 更新dom
                $('#' + groupId, $('pagesBox')[0]).find('.cont-inner>img').attr('src', picUrl);
                $('#' + groupId, $('app-page')[0]).find('.cont-inner>img').attr('src', picUrl);


                // 更新marker里的缓存数据结构
                var marker = Storage.get('__AM__').getMarker();
                var elements = marker.data.pages[marker.idx].elements;
                elements.forEach(function (item, index){
                    if(item.id == groupId){
                        var modEl = tools.clone(item);
                        modEl.src = picUrl;
                        elements.splice(index, 1, modEl);
                    }
                });
                return false;
            }
        };
        if (!!fnName) {
            if (fnName in strategy) {
                strategy[fnName](groupId);
            }
        }

    };
    return tools;
});
