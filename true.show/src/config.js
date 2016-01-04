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

	// 默认配置项对象的配置
	config.Attributor = {};

	// 文本
	config.Attributor.TEXT = {
		id : tools.uuid(),
  		tabId : 'panel-text',
  		type : 'text',
  		attributes : [
  			[
  				{label:"", name:"ta", css:'ta', value: "编辑内容", values:null, plugin:'textarea', unit:null}
  		 	],
  		 	[
  				{label:"文本颜色", css:"color", name:"color", value: "", values: null, plugin:'colorpicker', unit:null},
  				{label:"字号", css:"font-size", name:"font-size", value: "", values: null, plugin:'slider', unit:'px'},
  				{label:"字体", css:"font-family", name:"font-family", value: null, values: [
  					{label:'默认字体', name:"font-family", value:'宋体', clazz:'icon-font', status:'selected'},
  					{label:'黑体', name:"font-family",value:'黑体', clazz:'icon-font', status:''},
  					{label:'微软雅黑', name:"font-family",value:'Microsoft Yahei', clazz:'icon-font', status:''},
  					{label:'仿宋', name:"font-family",value:'仿宋', clazz:'icon-font', status:''}
  				], plugin:'select', unit:'px'}
  		 	],
  		 	[
  				{label:"格式", name:"font-weight", css:'font-weight', value: null, values: [
  					{label:'粗体', name:"font-bold", type:"checkbox", value:'bold', clazz:'icon-bold', status:''},
  					{label:'斜体', name:"font-italic",type:"checkbox",value:'italic', clazz:'icon-italic', status:''},
  					{label:'下划线', name:"font-underline",type:"checkbox",value:'underline', clazz:'icon-underline', status:''},
  				], plugin:'btngroup', unit:null},
				{label:"对齐方式", name:"text-align", css:'text-align', value: null, values: [
  					{label:'粗体', name:"text-left", type:"radio", value:'left', clazz:'l icon-text-left', status:''},
  					{label:'斜体', name:"text-center", type:"radio",value:'center', clazz:'c icon-text-center', status:'checked'},
  					{label:'下划线', name:"text-right", type:"radio",value:'right', clazz:'r icon-text-right', status:''},
  				], plugin:'btngroup', unit:null},
  				{label:"行距", css:"line-height", name:"line-height", value: "", values: null, plugin:'slider', unit:'px'}
  		 	],
  		 	[
  				{label:"阴影颜色", css:"", name:"text-shadow-color", value: "", values: null, plugin:'colorpicker', unit:null},
  				{label:"阴影距离", css:"", name:"text-shadow-distance", value: "", values: null, plugin:'slider', unit:'px'},
  				{label:"模糊", css:"", name:"text-shadow-blur", value: "", values: null, plugin:'slider', unit:'px'},
  				{label:"阴影角度", css:"", name:"text-shadow-angle", value: "", values: null, plugin:'knob', unit:'度'},
  		 	]
  		]
    };
	return config;
});