;define(function (require) {
	'use strict';

	var config = require('config');
	var theme = require('theme');

	function chart(charts){
		//echarts提供的图表为扩展的标准前缀
		//扩展提供的预定义图形样例
		var _types={
			line:['折线图','堆积折线图','区域图','堆积区域图'],
			bar:['柱形图','堆积柱形图','条形图','堆积条形图'],
			pie:['饼图','圆环图','南丁格尔玫瑰图'],

			gauge:['仪表盘'],
			map:['地图'],

			scatter:['散点图','气泡图'],
			k:['K线图'],
			radar:['雷达图','填充雷达图'],
			chord:['和弦图'],
			force:['力导向布局图'],

			funnel:['漏斗图'],
			eventRiver:['事件河流图']
		};
		var _themes=[''];
		this.instances = [];
		this.instanceMap = {};

		this.init(charts);
	};

	chart.prototype = {
		init:function(charts){
			for(var i in charts){
				var chart = charts[i];
				var instance = echarts.init(document.getElementById(chart.id), 'macarons');
				this.instances.push(instance);
				this.instanceMap[chart.id] = instance;
				instance.setOption(config.charts.options[chart.modelType][0]);
			}


		},
		setOption:function(id,models){
			if (this.instances.length === 0) return;
			this.instanceMap[id].setOption(models); 
		}
	};

	return chart;
});