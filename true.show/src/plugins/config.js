;
define(function(require) {
    var config = {};



    config.charts = {};

    var d_2 = {
        name: "一般公共预算收入",
        area: "全市及县市区",
        suffix: "亿元",
        data: [{
            area: "全市",
            total: 189.0,
            totalrank: 0,
            growth: 15.7,
            growthrank: 0
        }, {
            area: "崇川区",
            total: 25.4,
            totalrank: 1,
            growth: 21.6,
            growthrank: 3
        }, {
            area: "港闸区",
            total: 12.5,
            totalrank: 9,
            growth: 30.5,
            growthrank: 1
        }, {
            area: "开发区",
            total: 13.4,
            totalrank: 8,
            growth: 11.3,
            growthrank: 9
        }, {
            area: "通州区",
            total: 24.1,
            totalrank: 2,
            growth: 13.7,
            growthrank: 6
        }, {
            area: "海安县",
            total: 20.7,
            totalrank: 6,
            growth: 15.2,
            growthrank: 4
        }, {
            area: "如东县",
            total: 17.7,
            totalrank: 7,
            growth: 21.9,
            growthrank: 2
        }, {
            area: "启东市",
            total: 22.9,
            totalrank: 5,
            growth: 13.7,
            growthrank: 6
        }, {
            area: "如皋市",
            total: 23.6,
            totalrank: 3,
            growth: 13.2,
            growthrank: 8
        }, {
            area: "海门市",
            total: 23.6,
            totalrank: 3,
            growth: 15.1,
            growthrank: 5
        }]
    };

    var d_1 = {
        name: "规模以上工业增加值",
        area: "全市及县市区",
        suffix: "亿元",
        data: [{
            area: "全市",
            total: 858.2,
            totalrank: 0,
            growth: 10.7,
            growthrank: 0
        }, {
            area: "崇川区",
            total: 23.2,
            totalrank: 9,
            growth: 2.9,
            growthrank: 9
        }, {
            area: "港闸区",
            total: 32.3,
            totalrank: 8,
            growth: 9.9,
            growthrank: 8
        }, {
            area: "开发区",
            total: 117.6,
            totalrank: 3,
            growth: 10.4,
            growthrank: 7
        }, {
            area: "通州区",
            total: 132.8,
            totalrank: 1,
            growth: 11.2,
            growthrank: 2
        }, {
            area: "海安县",
            total: 126.1,
            totalrank: 2,
            growth: 11.1,
            growthrank: 3
        }, {
            area: "如东县",
            total: 116.3,
            totalrank: 4,
            growth: 11.4,
            growthrank: 1
        }, {
            area: "启东市",
            total: 109.4,
            totalrank: 6,
            growth: 10.9,
            growthrank: 5
        }, {
            area: "如皋市",
            total: 95.7,
            totalrank: 7,
            growth: 11.0,
            growthrank: 4
        }, {
            area: "海门市",
            total: 116.2,
            totalrank: 5,
            growth: 10.9,
            growthrank: 5
        }]
    };

    var d_3 = {
        name: "工业应税销售收入",
        area: "全市及县市区",
        suffix: "亿元",
        data: [{
            area: "全市",
            total: 1948.0,
            totalrank: 0,
            growth: 2.4,
            growthrank: 0
        }, {
            area: "崇川区",
            total: 129.7,
            totalrank: 9,
            growth: -12.0,
            growthrank: 9
        }, {
            area: "港闸区",
            total: 150.0,
            totalrank: 8,
            growth: 5.5,
            growthrank: 3
        }, {
            area: "开发区",
            total: 239.0,
            totalrank: 3,
            growth: 2.9,
            growthrank: 4
        }, {
            area: "通州区",
            total: 254.9,
            totalrank: 2,
            growth: 1.5,
            growthrank: 5
        }, {
            area: "海安县",
            total: 286.0,
            totalrank: 1,
            growth: 6.3,
            growthrank: 2
        }, {
            area: "如东县",
            total: 238.0,
            totalrank: 4,
            growth: 14.0,
            growthrank: 1
        }, {
            area: "启东市",
            total: 182.9,
            totalrank: 7,
            growth: 1.1,
            growthrank: 6
        }, {
            area: "如皋市",
            total: 211.6,
            totalrank: 5,
            growth: -0.8,
            growthrank: 8
        }, {
            area: "海门市",
            total: 191.8,
            totalrank: 6,
            growth: -0.5,
            growthrank: 7
        }]
    };

    var d_4 = {
        name: "工业用电量",
        area: "全市及县市区",
        suffix: "亿千瓦时",
        data: [{
            area: "全市",
            total: 76.8,
            totalrank: 0,
            growth: 5.3,
            growthrank: 0
        }, {
            area: "崇川区",
            total: 4.2,
            totalrank: 8,
            growth: -1.5,
            growthrank: 7
        }, {
            area: "港闸区",
            total: 3.4,
            totalrank: 9,
            growth: -4.2,
            growthrank: 9
        }, {
            area: "开发区",
            total: 11.7,
            totalrank: 1,
            growth: 6.3,
            growthrank: 3
        }, {
            area: "通州区",
            total: 11.7,
            totalrank: 1,
            growth: 11.3,
            growthrank: 1
        }, {
            area: "海安县",
            total: 10.3,
            totalrank: 3,
            growth: -2.6,
            growthrank: 8
        }, {
            area: "如东县",
            total: 10.2,
            totalrank: 4,
            growth: 10.5,
            growthrank: 2
        }, {
            area: "启东市",
            total: 5.3,
            totalrank: 7,
            growth: 5.1,
            growthrank: 4
        }, {
            area: "如皋市",
            total: 9.9,
            totalrank: 5,
            growth: 1.5,
            growthrank: 6
        }, {
            area: "海门市",
            total: 7.6,
            totalrank: 6,
            growth: 2.7,
            growthrank: 5
        }]
    };

    var d_5 = {
        name: "固定资产投资    ",
        area: "全市及县市区",
        suffix: "亿元",
        data: [{
            area: "全市",
            total: 1431.0,
            totalrank: 0,
            growth: 14.3,
            growthrank: 0
        }, {
            area: "崇川区",
            total: 96.4,
            totalrank: 8,
            growth: -22.8,
            growthrank: 9
        }, {
            area: "港闸区",
            total: 86.4,
            totalrank: 9,
            growth: 34.6,
            growthrank: 1
        }, {
            area: "开发区",
            total: 149.6,
            totalrank: 7,
            growth: 15.4,
            growthrank: 6
        }, {
            area: "通州区",
            total: 209.8,
            totalrank: 1,
            growth: 14.1,
            growthrank: 7
        }, {
            area: "海安县",
            total: 177.3,
            totalrank: 3,
            growth: 20.0,
            growthrank: 2
        }, {
            area: "如东县",
            total: 173.1,
            totalrank: 5,
            growth: 11.8,
            growthrank: 8
        }, {
            area: "启东市",
            total: 176.4,
            totalrank: 4,
            growth: 19.6,
            growthrank: 3
        }, {
            area: "如皋市",
            total: 172.2,
            totalrank: 6,
            growth: 18.6,
            growthrank: 5
        }, {
            area: "海门市",
            total: 180.7,
            totalrank: 2,
            growth: 19.6,
            growthrank: 3
        }]
    };

    var d_6 = {
        name: "社会消费品零售总额",
        area: "全市及县市区",
        suffix: "亿元",
        data: [{
            area: "全市",
            total: 769.8,
            totalrank: 0,
            growth: 9.5,
            growthrank: 0
        }, {
            area: "崇川区",
            total: 117.5,
            totalrank: 1,
            growth: 8.1,
            growthrank: 8
        }, {
            area: "港闸区",
            total: 39.9,
            totalrank: 9,
            growth: 10.0,
            growthrank: 4
        }, {
            area: "开发区",
            total: 45.6,
            totalrank: 8,
            growth: 7.9,
            growthrank: 9
        }, {
            area: "通州区",
            total: 98.3,
            totalrank: 4,
            growth: 8.2,
            growthrank: 7
        }, {
            area: "海安县",
            total: 80.5,
            totalrank: 7,
            growth: 11.8,
            growthrank: 1
        }, {
            area: "如东县",
            total: 93.4,
            totalrank: 6,
            growth: 11.6,
            growthrank: 2
        }, {
            area: "启东市",
            total: 94.3,
            totalrank: 5,
            growth: 9.1,
            growthrank: 5
        }, {
            area: "如皋市",
            total: 100.4,
            totalrank: 2,
            growth: 10.2,
            growthrank: 3
        }, {
            area: "海门市",
            total: 100.0,
            totalrank: 3,
            growth: 9.1,
            growthrank: 5
        }]
    };

    var d_7 = {
        name: "进出口总额",
        area: "全市及县市区",
        suffix: "亿美元",
        data: [{
            area: "全市",
            total: 104.2,
            totalrank: 0,
            growth: 4.2,
            growthrank: 0
        }, {
            area: "崇川区",
            total: 23.8,
            totalrank: 1,
            growth: 14.1,
            growthrank: 6
        }, {
            area: "港闸区",
            total: 9.8,
            totalrank: 6,
            growth: 28.9,
            growthrank: 2
        }, {
            area: "开发区",
            total: 15.7,
            totalrank: 2,
            growth: -1.6,
            growthrank: 7
        }, {
            area: "通州区",
            total: 10.9,
            totalrank: 3,
            growth: 16.6,
            growthrank: 4
        }, {
            area: "海安县",
            total: 5.1,
            totalrank: 9,
            growth: -31.3,
            growthrank: 8
        }, {
            area: "如东县",
            total: 9.2,
            totalrank: 7,
            growth: -37.6,
            growthrank: 9
        }, {
            area: "启东市",
            total: 10.7,
            totalrank: 5,
            growth: 18.8,
            growthrank: 3
        }, {
            area: "如皋市",
            total: 10.9,
            totalrank: 3,
            growth: 15.8,
            growthrank: 5
        }, {
            area: "海门市",
            total: 8.0,
            totalrank: 8,
            growth: 44.3,
            growthrank: 1
        }]
    };

    var d_8 = {
        name: "出口总额",
        area: "全市及县市区",
        suffix: "亿美元",
        data: [{
            area: "全市",
            total: 74.1,
            totalrank: 0,
            growth: 11.7,
            growthrank: 0
        }, {
            area: "崇川区",
            total: 17.2,
            totalrank: 1,
            growth: 20.8,
            growthrank: 3
        }, {
            area: "港闸区",
            total: 7.9,
            totalrank: 6,
            growth: 34.8,
            growthrank: 1
        }, {
            area: "开发区",
            total: 9.3,
            totalrank: 3,
            growth: -0.7,
            growthrank: 8
        }, {
            area: "通州区",
            total: 9.6,
            totalrank: 2,
            growth: 15.8,
            growthrank: 5
        }, {
            area: "海安县",
            total: 4.3,
            totalrank: 8,
            growth: -33.6,
            growthrank: 9
        }, {
            area: "如东县",
            total: 4.0,
            totalrank: 9,
            growth: 2.2,
            growthrank: 7
        }, {
            area: "启东市",
            total: 8.0,
            totalrank: 5,
            growth: 16.3,
            growthrank: 4
        }, {
            area: "如皋市",
            total: 9.3,
            totalrank: 3,
            growth: 34.0,
            growthrank: 2
        }, {
            area: "海门市",
            total: 4.5,
            totalrank: 7,
            growth: 2.8,
            growthrank: 6
        }]
    };

    var keymap = {
        "南通市": 0,
        "崇川区": 1,
        "港闸区": 2,
        "开发区": 3,
        "通州区": 4,
        "海安县": 5,
        "如东县": 6,
        "启东市": 7,
        "如皋市": 8,
        "海门市": 9
    };

    var datajson = [];
    datajson.push(d_1);
    datajson.push(d_2);
    datajson.push(d_3);
    datajson.push(d_4);
    datajson.push(d_5);
    datajson.push(d_6);
    datajson.push(d_7);
    datajson.push(d_8);

    var series = datajson;
    // function (ec) {
    var seriesItem =  series[0];

    var echartGrowthLegend = ['增幅', '增幅排名'];
    var echartTotalLegend = [];
    var echartTitle = seriesItem.name;
    var echartXaxis = [];
    var echartTotalData = [];
    var echartGrowthData = [];
    var echartGrowthRankData = [];

    var seriesDataItem = seriesItem.data;
    for(var i = 1; i < seriesDataItem.length; i++){
        echartXaxis.push(seriesDataItem[i].area);
        echartTotalLegend.push(seriesDataItem[i].area);
        echartTotalData.push({
            value: seriesDataItem[i].total, 
            name: seriesDataItem[i].area
        })
        echartGrowthData.push(seriesDataItem[i].growth);
        echartGrowthRankData.push(seriesDataItem[i].growthrank);
    }

    /* demo数据结束 */ 

    var optionTotal
    optionTotal = {
        title: {
            text: echartTitle + '总量',
            x: 'center',
            y: '80'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            x: 'left',
            data: echartTotalLegend
        },
        toolbox: {
            show: false
        },
        calculable: true,
        series: [{
            name: '总量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '70%'],
            data: echartTotalData
        }]
    };

    var optionGrowth
    optionGrowth = {
        title: {
            text: echartTitle + '增幅',
            x: 'center',
            y: '30'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                return params[0].name + '<br/>' + params[0].seriesName + ' : ' + params[0].value + ' (%)<br/>' + params[1].seriesName + ' : ' + -params[1].value;
            }
        },
        grid: {
             top : '100',
             left: '3%',
             right: '4%',
             bottom: '0%',
             containLabel: true
         },
        toolbox: {
            show: false
        },
        calculable: false,
        legend: {
            data: echartGrowthLegend
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                show: false
            },
            data: echartTotalLegend
        }],
        yAxis: [{
            type: 'value',
            name: '增幅',
            axisLabel: {
                formatter: '{value} %'
            }
        }, {
            type: 'value',
            name: '增幅排名',
            axisLabel: {
                formatter: function(v) {
                    return -v;
                }
            }
        }],
        series: [{
            name: '增幅',
            type: 'bar',
            barWidth: 20,
            data: echartGrowthData
        }, {
            name: '增幅排名',
            yAxisIndex: 1,
            type: 'line',
            data: (function() {
                var len = echartGrowthRankData.length;
                while (len--) {
                    echartGrowthRankData[len] *= -1;
                }
                return echartGrowthRankData;
            })()
        }]
    };


    config.charts.options = {
        pie : [optionTotal],
        bar : [optionGrowth]
    };

    // config.charts.options = {
    //     pie: [{
    //         tooltip: {
    //             trigger: 'item',
    //             formatter: "{a} <br/>{b}: {c} ({d}%)"
    //         },
    //         legend: {
    //             orient: 'horizontal',
    //             x: 'left',
    //             data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
    //         },
    //         series: [{
    //             name: '访问来源',
    //             type: 'pie',
    //             selectedMode: 'single',
    //             radius: [0, '35%'],
    //             center: ['45%', '65%'],
    //             label: {
    //                 normal: {
    //                     position: 'inner'
    //                 }
    //             },
    //             labelLine: {
    //                 normal: {
    //                     show: false
    //                 }
    //             },
    //             data: [{
    //                 value: 335,
    //                 name: '直达',
    //                 selected: true
    //             }, {
    //                 value: 679,
    //                 name: '营销广告'
    //             }, {
    //                 value: 1548,
    //                 name: '搜索引擎'
    //             }]
    //         }, {
    //             name: '访问来源',
    //             type: 'pie',
    //             radius: ['45%', '60%'],
    //             center: ['45%', '65%'],
    //             data: [{
    //                 value: 335,
    //                 name: '直达'
    //             }, {
    //                 value: 310,
    //                 name: '邮件营销'
    //             }, {
    //                 value: 234,
    //                 name: '联盟广告'
    //             }, {
    //                 value: 135,
    //                 name: '视频广告'
    //             }, {
    //                 value: 1048,
    //                 name: '百度'
    //             }, {
    //                 value: 251,
    //                 name: '谷歌'
    //             }, {
    //                 value: 147,
    //                 name: '必应'
    //             }, {
    //                 value: 102,
    //                 name: '其他'
    //             }]
    //         }]
    //     }, {
    //         title: {
    //             text: '某站点用户访问来源',
    //             subtext: '纯属虚构',
    //             x: 'center'
    //         },
    //         tooltip: {
    //             trigger: 'item',
    //             formatter: "{a} <br/>{b} : {c} ({d}%)"
    //         },
    //         legend: {
    //             orient: 'vertical',
    //             left: 'left',
    //             top: '40',
    //             data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    //         },
    //         series: [{
    //             name: '访问来源',
    //             type: 'pie',
    //             radius: '45%',
    //             center: ['50%', '70%'],
    //             data: [{
    //                 value: 335,
    //                 name: '直接访问'
    //             }, {
    //                 value: 310,
    //                 name: '邮件营销'
    //             }, {
    //                 value: 234,
    //                 name: '联盟广告'
    //             }, {
    //                 value: 135,
    //                 name: '视频广告'
    //             }, {
    //                 value: 1548,
    //                 name: '搜索引擎'
    //             }],
    //             itemStyle: {
    //                 emphasis: {
    //                     shadowBlur: 10,
    //                     shadowOffsetX: 0,
    //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
    //                 }
    //             }
    //         }]
    //     }],
    //     bar: [{
    //         tooltip: {
    //             trigger: 'axis',
    //             axisPointer: { // 坐标轴指示器，坐标轴触发有效
    //                 type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    //             }
    //         },
    //         legend: {
    //             data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
    //         },
    //         grid: {
    //             top : '100',
    //             left: '3%',
    //             right: '4%',
    //             bottom: '0%',
    //             containLabel: true
    //         },
    //         xAxis: [{
    //             type: 'category',
    //             data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    //         }],
    //         yAxis: [{
    //             type: 'value'
    //         }],
    //         series: [{
    //             name: '直接访问',
    //             type: 'bar',
    //             data: [320, 332, 301, 334, 390, 330, 320]
    //         }, {
    //             name: '邮件营销',
    //             type: 'bar',
    //             stack: '广告',
    //             data: [120, 132, 101, 134, 90, 230, 210]
    //         }, {
    //             name: '联盟广告',
    //             type: 'bar',
    //             stack: '广告',
    //             data: [220, 182, 191, 234, 290, 330, 310]
    //         }, {
    //             name: '视频广告',
    //             type: 'bar',
    //             stack: '广告',
    //             data: [150, 232, 201, 154, 190, 330, 410]
    //         }, {
    //             name: '搜索引擎',
    //             type: 'bar',
    //             data: [862, 1018, 964, 1026, 1679, 1600, 1570],
    //             markLine: {
    //                 itemStyle: {
    //                     normal: {
    //                         lineStyle: {
    //                             type: 'dashed'
    //                         }
    //                     }
    //                 },
    //                 data: [
    //                     [{
    //                         type: 'min'
    //                     }, {
    //                         type: 'max'
    //                     }]
    //                 ]
    //             }
    //         }, {
    //             name: '百度',
    //             type: 'bar',
    //             barWidth: 5,
    //             stack: '搜索引擎',
    //             data: [620, 732, 701, 734, 1090, 1130, 1120]
    //         }, {
    //             name: '谷歌',
    //             type: 'bar',
    //             stack: '搜索引擎',
    //             data: [120, 132, 101, 134, 290, 230, 220]
    //         }, {
    //             name: '必应',
    //             type: 'bar',
    //             stack: '搜索引擎',
    //             data: [60, 72, 71, 74, 190, 130, 110]
    //         }, {
    //             name: '其他',
    //             type: 'bar',
    //             stack: '搜索引擎',
    //             data: [62, 82, 91, 84, 109, 110, 120]
    //         }]
    //     }]
    // }




    return config;
});
