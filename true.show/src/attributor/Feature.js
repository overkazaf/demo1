/**
 * Feature 功能配置类, 主要每个元素最多可以绑定的事件类型有点击， 长按和动画结束的操作
 * @author John Nong(https://www.github.com/overkazaf)
 * @module attributor/Feature
 */
;define(function (require) {
	// 数据结构定义
	var events = [{
		name : 'click',  // longTap, animationEnd
		actions :  [{
			type : 'hide', // show, toggle, href, paging, tel, animate, trigger
			value : {
				elems : ['elementId1', 'elementId2'],
				delay : 1
			}
		},{
			type : 'show', // show, toggle, href, paging, tel, animate, trigger
			value : {
				elems : ['elementId1', 'elementId2'],
				delay : 1
			}
		}]
	}];


	var Feature = function () {

	};


	

	return Feature;
});