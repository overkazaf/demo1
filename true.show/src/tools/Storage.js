/**
 * Storage  是一个存储相关的数据结构及相应操作
 * 		    从tools模块分离出来，主要是使这个模块的职责更清晰，同时方便扩展Storage模块的方法
 * @author John Nong(https://www.github.com/overkazaf)
 * @module tools/Storage
 */
;define(function (require) {

	if(!window.__cache__){
		// 开辟新的内存空间
		window.__cache__ = {};
	}

	var 
        Storage = {
        	get : function (key) {
        		return window.__cache__[key];
        	}, 
            getAM : function () {
                return window.__cache__['__AM__'];
            },
        	set : function (key, obj) {
        		if (!window.__cache__[key]) {
        			window.__cache__[key] = {};
        		}
        		window.__cache__[key] = obj;
        	},
        	hasKey : function (key) {
        		return !!Storage.get(key);
        	},
        	remove : function (key) {
        		delete window.__cache__[key];
        	},
        	reset : function () {
        		for (var key in window.__cache__) {
        			delete window.__cache__[key];
        		}
        	},
        	toLocalStorage : function () {
        		// 写入本地存储，持久化该模板的信息
        	},
        	fromLocalStorage : function () {
        		// 装载本地存储
        	}
        };


     return Storage;
});