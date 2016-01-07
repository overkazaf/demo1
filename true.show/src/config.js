;define(function (require) {
	'use strict';
	var tools = require('./tools/tools');
	var config={};
	//可选元素
	config.plugins=[
		{id:'',name:'页面背景'},
		{id:'',name:'文本'},
		{id:'',name:'图片'},
		{id:'',name:'按钮'},
		{id:'',name:'地图'},
		{id:'',name:'图表'},
		{id:'',name:'音频'},
		{id:'',name:'特效'},
		{id:'',name:'页面背景'},
		{id:'',name:'页面背景'},
		{id:'',name:'页面背景'},
		{id:'',name:'页面背景'}
	];
	//右击按钮
	config.rightMenus=[
		{id:'',name:'',call:''},
	];
	//配置面板
	config.panels=[
		{id:'bg',name:'页面背景'},
		{id:'text',name:'文本'},
		{id:'img',name:'图片'},
		{id:'btn',name:'按钮'},
		{id:'map',name:'地图'},
		{id:'chart',name:'图表'},
		{id:'audio',name:'音频'},
		{id:'video',name:'视频'},
		{id:'effects',name:'特效'},
		{id:'formitems',name:'表单'},
		{id:'form',name:'表单设置'},
		{id:'styles',name:'样式'},
		{id:'',name:'位置'}
	];
	//右击菜单
	config.contextmenu={
		page:{

		},
		layer:{

		}
	}

	// <li class="sub-nav-active"></li>
	// 				<li></li>
	// 				<li></li>
	// 				<li></li>
	// 				<li></li>
	// 				<li></li>
	// 				<li></li>
	// 				<li></li>
	// 				<li>表单</li>
	// 				<li>表单设置</li>
	// 				<li>样式</li>
	// 				<li>位置</li>
	// 				<li>动画</li>
	// 				<li>功能</li>


	/* ======================  组件相关  ==================== */
	// 定义新增组件的数据结构， 构造实例后要重写其id属性
	config.ComponentTemplate = {
		'text' : {
            id: null,
            name: '编辑内容',
            value: '编辑内容',
            type: 'text',
            styles: {
                left: '110px',
                top: '10px',
                width: '100px',
                height: '50px',
                'text-align': 'center'
            },
            animates: [{
                repeat: 0,
                duration: 0,
                class: 'flip',
                delay: 0
            }],
            events: [{
                "name": "click",
                "actions": [{
                    "type": "show",
                    "value": {
                        "elems": []
                    },
                    "delay": 0
                }]
            }],
            states: {
                lock: false,
                visible: true
            }
        },
        'photo' : {
            id: null,
            name: '图片',
            value: '图片',
            type: 'photo',
            styles: {
                left: '30px',
                top: '30px',
                width: '100px',
                height : '100px',
                'text-align': 'center'
            },
            animates: [{
                repeat: 0,
                duration: 0,
                class: 'flip',
                delay: 0
            }],
            events: [{
                "name": "click",
                "actions": [{
                    "type": "show",
                    "value": {
                        "elems": []
                    },
                    "delay": 0
                }]
            }],
            states: {
                lock: false,
                visible: true
            }
        }
	};


	// ============配置相关=============== //
	// 默认配置项对象的配置数据结构
	config.Attributor = {};

	/* 特有特性 */
	
	// 文本
	config.Attributor.TEXT = {
		id : tools.uuid(),
  		tabId : 'panel-text',
  		type : 'text',
  		attributes : [
  			[
  				{label:"", name:"ta", css:'content', value: "编辑内容", values:null, plugin:'textarea', unit:null}
  		 	],
  		 	[
  				{label:"文本颜色", css:"color", name:"color", value: "", values: null, plugin:'colorpicker', unit:null},
  				{label:"字号", css:"font-size", name:"font-size", value: "", values: null, plugin:'slider-fontsize', unit:'px'},
  				{label:"字体", css:"font-family", name:"font-family", value: null, values: [
  					{label:'黑体', name:"font-family", value:'黑体', clazz:'icon-font', status:'selected'},
  					{label:'宋体', name:"font-family",value:'宋体', clazz:'icon-font', status:''},
  					{label:'微软雅黑', name:"font-family",value:'Microsoft Yahei', clazz:'icon-font', status:''},
  					{label:'仿宋', name:"font-family",value:'仿宋', clazz:'icon-font', status:''}
  				], plugin:'select', unit:null}
  		 	],
  		 	[
  				{label:"格式", name:"font-format", css:'font-weight;font-style;text-decoration', value: null, values: [
  					{label:'粗体', name:"font-bold", type:"checkbox", value:'bold', clazz:'icon-bold', status:''},
  					{label:'斜体', name:"font-italic",type:"checkbox",value:'italic', clazz:'icon-italic', status:''},
  					{label:'下划线', name:"font-underline",type:"checkbox",value:'underline', clazz:'icon-underline', status:''},
  				], plugin:'btngroup', unit:null},
				{label:"对齐方式", name:"text-align", css:'text-align;text-align;text-align', value: null, values: [
  					{label:'左对齐', name:"text-left", type:"radio", value:'left', clazz:'l icon-text-left', status:''},
  					{label:'居中', name:"text-center", type:"radio",value:'center', clazz:'c icon-text-center', status:'checked'},
  					{label:'右对齐', name:"text-right", type:"radio",value:'right', clazz:'r icon-text-right', status:''},
  				], plugin:'btngroup', unit:null},
  				{label:"行距", css:"line-height", name:"line-height", value: "", values: null, plugin:'slider-lineheight', unit:''}
  		 	],
  		 	[
  				{label:"阴影颜色", css:"text-shadow", name:"text-shadow-color", value: "", values: null, plugin:'colorpicker', unit:null},
  				{label:"模糊", css:"text-shadow", name:"text-shadow-blur", value: "", values: null, plugin:'slider', unit:'px'},
  				{label:"阴影距离", css:"text-shadow", name:"text-shadow-distance", value: "", values: null, plugin:'slider', unit:'px'},
  				{label:"阴影角度", css:"text-shadow", name:"text-shadow-angle", value: "", values: null, plugin:'slider-angle', unit:'度'},
  		 	]
  		]
    };
    
    // 图像
    config.Attributor.PHOTO = {
    	id : tools.uuid(),
  		tabId : 'panel-photo',
  		type : 'photo',
  		attributes : [
  			[
  				{label:"", name:"select-photo", css:'btn', value: "选择图片", values:null, plugin:'modal', unit:null}
  		 	],
  		 	[
  		 		{label:"", name:"crop-photo", css:'crop', value: "裁剪图片", values:null, plugin:'crop', unit:null}
  		 	]
  		]
    };

    // 样式
	config.Attributor.STYLES = {
		id : tools.uuid(),
  		tabId : 'panel-style',
  		type : 'styles',
  		attributes : [
  			[
  				{label:"背景颜色", name:"bgc", css:'background-color', value: "transparent", values:null, plugin:'colorpicker', unit:null}
  		 	],
  		 	[
  				{label:"边框类型", css:"border-style", name:"border-style", value: null, values: [
  					{label:'无', name:"border-style-none", value:'none', clazz:'', status:'selected'},
  					{label:'实线', name:"border-style-solid",value:'solid', clazz:'', status:''},
  					{label:'虚线', name:"border-style-dashed",value:'dashed', clazz:'', status:''},
  					{label:'点线', name:"border-style-dotted",value:'dotted', clazz:'', status:''},
  					{label:'双线', name:"border-style-double",value:'double', clazz:'', status:''}
  				], plugin:'select', unit:null},
  				{label:"边框宽度", css:"border-width", name:"border-width", value: "1", values: null, plugin:'slider', unit:'px'},
  				{label:"边框颜色", name:"bdc", css:'border-color', value: "#000000", values:null, plugin:'colorpicker', unit:null}
  		 	],
  		 	[
  				{label:"圆角半径", name:"bdr", css:'border-radius', value: "0", values:null, plugin:'slider', unit:'px'}
  		 	],
  		 	[
  				{label:"透明度", name:"opacity", css:'opacity', value: "1", values:null, plugin:'slider', unit:'%'}
  		 	],
  		 	[
  				{label:"旋转角度", name:"transform", css:'transform', value: "1", values:null, plugin:'slider', unit:'度'}
  		 	],
  		 	[
  				{label:"阴影颜色", css:"box-shadow", name:"box-shadow-color", value: "", values: null, plugin:'colorpicker', unit:null},
  				{label:"模糊", css:"box-shadow", name:"box-shadow-blur", value: "", values: null, plugin:'slider', unit:'px'},
  				{label:"阴影距离", css:"box-shadow", name:"box-shadow-distance", value: "", values: null, plugin:'slider', unit:'px'},
  				{label:"阴影角度", css:"box-shadow", name:"box-shadow-angle", value: "", values: null, plugin:'slider-angle', unit:'度'},
  		 	],
  		 	[
  				{label:"宽度", name:"width", css:'width', value: "100", values:null, plugin:'text', unit:'px'},
  				{label:"高度", name:"height", css:'height', value: "50", values:null, plugin:'text', unit:'px'}
  		 	],
  		]
    };
    
    // 按钮
    config.Attributor.BUTTON = {};

    // 
    // 
    // 
    // 
    

    /* 公有特性 */

	return config;
});