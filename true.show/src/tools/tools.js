;
define(function(require) {
    'use strict';


    var nativeForEach = Array.prototype.forEach;
    var tools = {
        uuid: function(len, radix) {    
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');    
            var uuid = [],
                i;    
            radix = radix || chars.length;    
            if (len) {       // Compact form
                      
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
        each: function (obj, cb, context) {
            if (!(obj && cb)) {
                return;
            }
            if (obj.forEach && obj.forEach === nativeForEach) {
                obj.forEach(cb, context);
            }
            else if (obj.length === +obj.length) {
                for (var i = 0, len = obj.length; i < len; i++) {
                    cb.call(context, obj[i], i, obj);
                }
            }
            else {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        cb.call(context, obj[key], key, obj);
                    }
                }
            }
        },
        indexOf : function (el, arr, condition, value) {
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
        Storage : {
        	get : function (key) {
        		return window.__cache__[key];
        	}, 
        	set : function (key, obj) {
        		if (!window.__cache__[key]) {
        			window.__cache__[key] = {};
        		}
        		window.__cache__[key] = obj;
        	},
        	remove : function (key) {
        		delete window.__cache__[key];
        	}
        }
    };

    window.__cache__ = {};
    window.callFN = function (name, id) {
        if (!!name) {
            if (name.indexOf('noticeUpdate') >= 0) {
                var group = tools.Storage.get(id);
                group.noticeUpdate();
            } else if (name.indexOf('angle2pixel') >= 0) {
                // angle2pixel
                var val = document.getElementById(id).value;
                
                return val*2;
            }
        }

    };
    return tools;
});
