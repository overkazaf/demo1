;
define(function(require) {
    var sample = [{
        id: 'page1',
        name: '页面1',
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
            styles: {
                left: '53px',
                top: '47px',
                width: '214px',
                height: '50px',
                textAlign: 'center',
                content: 'True.Show',
                color: '#f70',
                fontSize: '41px',
                fontFamily: 'Heiti',
                fontWeight: 'bold',
                fontStyle: '',
                textDecoration: '',
                lineHeight: '1',
                textShadow: '2.0000px 0.0000px 4px #5e5e5e',
                backgroundColor: 'transparent',
                borderStyle: 'none',
                borderWidth: '0px',
                borderColor: '#000000',
                borderRadius: '0px',
                opacity: '1',
                transform: 'rotate(0deg)',
                boxShadow: '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 1,
                class: 'flip',
                delay: 1
            }],
            auto: true
        }, {
            id: 'p1e2',
            name: 'p1e2',
            href: '',
            value: './asset/demo/cube.png',
            type: 'img',
            x: '37px',
            y: '130px',
            width: '246px',
            height: '254px',
            styles: {
                left: '37px',
                top: '130px',
                width: '246px',
                height: '254px',
                textAlign: 'center',
                crop: 'on',
                backgroundColor: '#ffffff',
                borderStyle: 'none',
                borderWidth: '0px',
                borderColor: '#000000',
                borderRadius: '0px',
                opacity: '1',
                transform: 'rotate(0deg)',
                boxShadow: '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 30,
                class: 'pulse',
                delay: 2.5
            }],
            auto: true
        }, {
            id: 'p1e3',
            name: 'p1e3',
            href: '',
            value: '秀出你的数据',
            type: 'text',
            x: '63px',
            y: '410px',
            width: '194px',
            height: '50px',
            styles: {
                left: '63px',
                top: '410px',
                width: '194px',
                height: '50px',
                textAlign: 'center',
                content: '秀出你的数据',
                color: '#000000',
                fontSize: '18px',
                fontFamily: 'Book Antiqua',
                fontWeight: 'bold',
                fontStyle: '',
                textDecoration: '',
                lineHeight: '1',
                textShadow: '1px 1px 4px #ccc',
                backgroundColor: 'transparent',
                borderStyle: 'none',
                borderWidth: '0px',
                borderColor: '#000000',
                borderRadius: '0px',
                opacity: '1',
                transform: 'rotate(0deg)',
                boxShadow: '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 1,
                class: 'rubberBand',
                delay: 4.2
            }, {
                repeat: 30,
                class: 'bounce',
                delay: 1.5
            }],
            auto: true
        }]
    }, {
        id: 'page2',
        name: '页面2',
        styles: '',
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
            styles: {
                left: '25px',
                top: '65px',
                width: '130px',
                height: '130px',
                textAlign: 'center',
                color: '#000000',
                fontSize: '20px',
                fontFamily: 'Heiti',
                fontWeight: 'bold',
                fontStyle: '',
                textDecoration: '',
                lineHeight: '135px',
                textShadow: '0.0000px 0.0000px 0px #000000',
                backgroundColor: '#fff',
                opacity: '0.8',
                borderStyle: 'solid',
                borderWidth: '4px',
                borderColor: '#f40',
                borderRadius: '50%',
                boxShadow: '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 0,
                class: 'bounceInLeft',
                delay: 1.1
            }],
            auto: true
        }, {
            id: 'p2e2',
            name: 'p2e2',
            href: '',
            value: '图片组件',
            type: 'text',
            x: '145px',
            y: '55px',
            width: '155px',
            height: '155px',
            styles: {
                left: '145px',
                top: '55px',
                width: '155px',
                height: '155px',
                textAlign: 'center',
                color: '#ff0',
                fontSize: '26px',
                fontFamily: 'Heiti',
                fontWeight: 'bold',
                fontStyle: '',
                textDecoration: '',
                lineHeight: '155px',
                textShadow: '0.0000px 0.0000px 0px #000000',
                backgroundColor: '#666',
                opacity: '0.7',
                borderStyle: 'solid',
                borderWidth: '4px',
                borderColor: '#0f0',
                borderRadius: '50%',
                boxShadow: '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 0,
                class: 'bounceInRight',
                delay: 1.3
            }],
            auto: true
        }, {
            id: 'p2e3',
            name: 'p2e3',
            href: '',
            value: '图表组件',
            type: 'text',
            x: '70px',
            y: '155px',
            width: '155px',
            height: '155px',
            styles: {
                left: '70px',
                top: '155px',
                width: '155px',
                height: '155px',
                textAlign: 'center',
                color: '#fff',
                fontSize: '32px',
                fontFamily: 'Heiti',
                fontWeight: 'bold',
                fontStyle: '',
                textDecoration: '',
                lineHeight: '145px',
                textShadow: '0.0000px 0.0000px 0px #000000',
                backgroundColor: '#09e',
                opacity: '0.7',
                borderStyle: 'solid',
                borderWidth: '4px',
                borderColor: '#222',
                borderRadius: '50%',
                boxShadow: '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 0,
                class: 'bounceInUp',
                delay: 1.5
            }],
            auto: true
        }, {
            id: 'p2e4',
            name: 'p2e4',
            href: '',
            value: '表单',
            type: 'text',
            x: '12px',
            y: '375px',
            width: '65px',
            height: '20px',
            styles: {
                left: '12px',
                top: '375px',
                width: '65px',
                height: '20px',
                textAlign: 'center',
                color: '#000',
                fontSize: '16px',
                fontFamily: 'Heiti',
                fontWeight: 'bold',
                fontStyle: '',
                textDecoration: '',
                lineHeight: '20px',
                textShadow: '0.0000px 0.0000px 0px #000000',
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderWidth: '0',
                borderColor: '#fff',
                borderRadius: '0',
                boxShadow: '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 0,
                class: 'bounceInRight',
                delay: 1.8
            }, {
                repeat: 20,
                class: 'tada',
                delay: 1.4
            }],
            auto: true
        }, {
            id: 'p2e5',
            name: 'p2e5',
            href: '',
            value: '地图',
            type: 'text',
            x: '65px',
            y: '375px',
            width: '65px',
            height: '20px',
            styles: {
                left: '65px',
                top: '375px',
                width: '65px',
                height: '20px',
                textAlign: 'center',
                color: '#000',
                fontSize: '16px',
                fontFamily: 'Heiti',
                fontWeight: 'bold',
                fontStyle: '',
                textDecoration: '',
                lineHeight: '20px',
                textShadow: '0.0000px 0.0000px 0px #000000',
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderWidth: '0',
                borderColor: '#fff',
                borderRadius: '0',
                boxShadow: '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 0,
                class: 'bounceInRight',
                delay: 2.2
            }, {
                repeat: 20,
                class: 'tada',
                delay: 1.6
            }],
            auto: true
        }, {
            id: 'p2e6',
            name: 'p2e6',
            href: '',
            value: '视频',
            type: 'text',
            x: '120px',
            y: '375px',
            width: '65px',
            height: '20px',
            styles: {
                left: '120px',
                top: '375px',
                width: '65px',
                height: '20px',
                textAlign: 'center',
                color: '#000',
                fontSize: '16px',
                fontFamily: 'Heiti',
                fontWeight: 'bold',
                fontStyle: '',
                textDecoration: '',
                lineHeight: '20px',
                textShadow: '0.0000px 0.0000px 0px #000000',
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderWidth: '0',
                borderColor: '#fff',
                borderRadius: '0',
                boxShadow: '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 0,
                class: 'bounceInRight',
                delay: 2.4
            }, {
                repeat: 20,
                class: 'tada',
                delay: 1.8
            }],
            auto: true
        }, {
            id: 'p2e7',
            name: 'p2e7',
            href: '',
            value: '音频',
            type: 'text',
            x: '170px',
            y: '375px',
            width: '65px',
            height: '20px',
            styles: {
                left: '170px',
                top: '375px',
                width: '65px',
                height: '20px',
                textAlign: 'center',
                color: '#000',
                fontSize: '16px',
                fontFamily: 'Heiti',
                fontWeight: 'bold',
                fontStyle: '',
                textDecoration: '',
                lineHeight: '20px',
                textShadow: '0.0000px 0.0000px 0px #000000',
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderWidth: '0',
                borderColor: '#fff',
                borderRadius: '0',
                boxShadow: '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 0,
                class: 'bounceInRight',
                delay: 2.6
            }, {
                repeat: 20,
                class: 'tada',
                delay: 2.0
            }],
            auto: true
        }, {
            id: 'p2e8',
            name: 'p2e8',
            href: '',
            value: '背景音乐',
            type: 'text',
            x: '240px',
            y: '375px',
            width: '65px',
            height: '20px',
            styles: {
                left: '240px',
                top: '375px',
                width: '65px',
                height: '20px',
                textAlign: 'center',
                color: '#000',
                fontSize: '16px',
                fontFamily: 'Heiti',
                fontWeight: 'bold',
                fontStyle: '',
                textDecoration: '',
                lineHeight: '20px',
                textShadow: '0.0000px 0.0000px 0px #000000',
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderWidth: '0',
                borderColor: '#fff',
                borderRadius: '0',
                boxShadow: '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 0,
                class: 'bounceInRight',
                delay: 2.8
            }, {
                repeat: 20,
                class: 'tada',
                delay: 2.2
            }],
            auto: true
        }]
    }, {
        id: 'page11',
        name: '页面11',
        transform: '',
        styles: '',
        elements: [{
            id: 'p11e01',
            name: 'p11e01',
            href: '',
            value: '研发中心再获2个高新产品、6个软件产品',
            type: 'text',
            styles: {
                left: '20px',
                top: '30px',
                width: '20px',
                height: '154px',
                lineHeight: '24px',
                "text-align": 'center',
                color: '#f00',
                fontSize: '22px',
                fontWeight: 'bold'
            },
            animates: [{
                repeat: 1,
                class: 'lightSpeedIn',
                delay: .5
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }, {
            id: 'p11e02',
            name: 'p11e02',
            href: '',
            src: '../demo/asset/images/news/news2.jpg',
            value: '../demo/asset/images/news/news2.jpg',
            type: 'photo',
            styles: {
                left: '65px',
                top: '30px',
                width: '220px',
                height: '154px',
                "text-align": 'center',
                crop: 'on',
                "background-color": '#ffffff',
                "border-style": 'none',
                "border-width": '0px',
                "border-color": '#000000',
                "border-radius": '0px',
                opacity: '1',
                transform: 'rotate(0deg)',
                "box-shadow": '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 1,
                class: 'flipInY',
                delay: 1.5
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }, {
            id: 'p11e03',
            name: 'p11e03',
            href: '',
            src: '../demo/asset/images/news/news3.jpg',
            value: '../demo/asset/images/news/news3.jpg',
            type: 'photo',
            styles: {
                left: '55px',
                top: '190px',
                width: '210px',
                height: '124px',
                "text-align": 'center',
                crop: 'on',
                "background-color": '#ffffff',
                "border-style": 'none',
                "border-width": '0px',
                "border-color": '#000000',
                "border-radius": '0px',
                opacity: '1',
                transform: 'rotate(355deg)',
                "box-shadow": '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 1,
                class: 'fadeInRightBig',
                delay: 2.5
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }, {
            id: 'p11e04',
            name: 'p11e04',
            href: '',
            src: '../demo/asset/images/news/news4.jpg',
            value: '../demo/asset/images/news/news4.jpg',
            type: 'photo',
            styles: {
                left: '75px',
                top: '310px',
                width: '220px',
                height: '114px',
                "text-align": 'center',
                crop: 'on',
                "background-color": '#ffffff',
                "border-style": 'none',
                "border-width": '0px',
                "border-color": '#000000',
                "border-radius": '0px',
                opacity: '1',
                transform: 'rotate(15deg)',
                "box-shadow": '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 1,
                class: 'rollIn',
                delay: 3.5
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }]
    }, {
        id: 'page1',
        name: '页面1',
        transform: '',
        styles: '',
        elements: [{
            id: 'p1e01',
            name: 'p1e01',
            href: '',
            value: '热烈祝贺我司被授予“江苏省优秀软件企业”称号',
            type: 'text',
            styles: {
                left: '40px',
                top: '30px',
                width: '240px',
                height: '154px',
                lineHeight: '24px',
                "text-align": 'center',
                color: '#f00',
                fontSize: '20px',
                fontWeight: 'bold'
            },
            animates: [{
                repeat: 1,
                class: 'fadeInUp',
                delay: .5
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }, {
            id: 'p1ex',
            name: 'p1ex',
            href: '',
            src: '../demo/asset/images/news/news1.jpg',
            value: '../demo/asset/images/news/news1.jpg',
            type: 'photo',
            styles: {
                left: '25px',
                top: '130px',
                width: '260px',
                height: '154px',
                "text-align": 'center',
                crop: 'on',
                "background-color": '#ffffff',
                "border-style": 'none',
                "border-width": '0px',
                "border-color": '#000000',
                "border-radius": '0px',
                opacity: '1',
                transform: 'rotate(0deg)',
                "box-shadow": '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 2,
                class: 'flash',
                delay: 2.5
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }, {
            id: 'p1e02',
            name: 'p1e02',
            href: '',
            value: '&nbsp;&nbsp;&nbsp;&nbsp;热烈祝贺我司在2015年度举办的“江苏省优秀软件企业”评选中，从众多参选的省软件、物联网、云计算智能化等行业企业中脱颖而出，获此殊荣。',
            type: 'text',
            styles: {
                left: '30px',
                top: '330px',
                width: '250px',
                height: '154px',
                lineHeight: '18px',
                "text-align": 'left',
                fontSize: '14px',
                fontWeight: 'bold'
            },
            animates: [{
                repeat: 1,
                class: 'fadeIn',
                delay: 2.5
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }]
    }, {
        id: 'page12',
        name: '页面12',
        transform: '',
        styles: '',
        elements: [{
            id: 'p12e0',
            name: 'p12e0',
            href: '',
            type: 'text',
            value: '热烈祝贺我司获得信息系统安全专用产品销售许可证',
            styles: {
                left: '35px',
                top: '30px',
                width: '250px',
                height: '60px',
                "text-align": 'center',
                color: '#09e',
                "font-size": '24px',
                "font-family": 'Heiti',
                "font-weight": 'bold',
                "textShadow": '1px 1px 0px #000',
                opacity: '1'
            },
            animates: [{
                repeat: 1,
                class: 'rotateInDownLeft',
                delay: 1
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }, {
            id: 'p12e00',
            name: 'p12e00',
            href: '',
            type: 'text',
            value: '',
            styles: {
                left: '25px',
                top: '125px',
                width: '270px',
                "text-align": 'center',
                color: '#09e',
                "font-family": 'Heiti',
                "font-weight": 'bold',
                "background": '#222',
                "textShadow": '1px 1px 0px #000',
                "borderStyle": 'solid',
                "borderColor": '#222',
                "borderWidth": '1px',
                opacity: '1'
            },
            animates: [{
                repeat: 1,
                class: 'fadeInRight',
                delay: 2
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }, {
            id: 'p12e1',
            name: 'p12e1',
            href: '',
            type: 'photo',
            src: './asset/images/news/news6.jpg',
            value: './asset/images/news/news6.jpg',
            styles: {
                left: '5px',
                top: '150px',
                width: '150px',
                height: '210px',
                "text-align": 'center',
                color: '#f70',
                "font-size": '14px',
                "font-family": 'Heiti',
                "font-weight": 'bold',
                "text-decoration": '',
                "background-color": '#ccc',
                'box-shadow': '2px -4px 4px #222',
                opacity: '1'
            },
            animates: [{
                repeat: 1,
                class: 'rotateIn',
                delay: 3
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }, {
            id: 'p12e2',
            name: 'p12e2',
            href: '',
            type: 'photo',
            src: './asset/images/news/news7.png',
            value: './asset/images/news/news7.png',
            styles: {
                left: '165px',
                top: '150px',
                width: '150px',
                height: '210px',
                "text-align": 'center',
                color: '#f70',
                "font-size": '14px',
                "font-family": 'Heiti',
                "font-weight": 'bold',
                "text-decoration": '',
                "background-color": '#ccc',
                'box-shadow': '2px -4px 4px #222',
                opacity: '1'
            },
            animates: [{
                repeat: 1,
                class: 'flipInY',
                delay: 4
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }]
    }, {
        id: 'page13',
        name: '页面13',
        transform: '',
        styles: '',
        elements: [{
            id: 'p13e1',
            name: 'p13e1',
            href: '',
            type: 'photo',
            src: './asset/images/news/product-center.jpg',
            value: './asset/images/news/product-center.jpg',
            styles: {
                left: '0',
                top: '0',
                width: '320px',
                height: '130px',
                "text-align": 'center',
                color: '#f70',
                "font-size": '14px',
                "font-family": 'Heiti',
                "font-weight": 'bold',
                "text-decoration": '',
                "background-color": '#ccc',
                opacity: '1'
            },
            animates: [{
                repeat: 1,
                class: 'fadeInUp',
                delay: 1
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }, {
            id: 'p13e2',
            name: 'p13e2',
            href: '',
            type: 'text',
            value: '中威文稿',
            styles: {
                left: '76px',
                top: '146px',
                width: '150px',
                height: '80px',
                "text-align": 'center',
                color: '#09f',
                "font-size": '18px',
                "line-height": '80px',
                "font-family": 'Heiti',
                "font-weight": 'bold',
                "text-decoration": '',
                "borderStyle": 'solid',
                "borderColor": '#999',
                "borderWidth": '4px',
                "borderRadius": '6px',
                opacity: '1'
            },
            animates: [{
                repeat: 1,
                class: 'flipInY',
                delay: 2
            }, {
                repeat: 1,
                class: 'tada',
                delay: 6
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }, {
            id: 'p13e3',
            name: 'p13e3',
            href: '',
            type: 'photo',
            src: './asset/images/news/twpaper.jpg',
            value: './asset/images/news/twpaper.jpg',
            styles: {
                left: '80px',
                top: '150px',
                width: '150px',
                height: '80px',
                "text-align": 'center',
                color: '#f70',
                "font-size": '14px',
                "font-family": 'Heiti',
                "font-weight": 'bold',
                "text-decoration": '',
                "background-color": '#ccc',
                opacity: '1'
            },
            animates: [{
                repeat: 1,
                class: 'flipInY',
                delay: 3
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }, {
            id: 'p13e4',
            name: 'p13e4',
            href: '',
            type: 'text',
            value: '中威通讯',
            styles: {
                left: '76px',
                top: '246px',
                width: '150px',
                height: '80px',
                "text-align": 'center',
                color: '#f40',
                "font-size": '18px',
                "line-height": '80px',
                "font-family": 'Heiti',
                "font-weight": 'bold',
                "text-decoration": '',
                "borderStyle": 'solid',
                "borderColor": '#999',
                "borderWidth": '4px',
                "borderRadius": '6px',
                opacity: '1'
            },
            animates: [{
                repeat: 1,
                class: 'flipInX',
                delay: 4
            }, {
                repeat: 1,
                class: 'tada',
                delay: 5
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }, {
            id: 'p13e5',
            name: 'p13e5',
            href: '',
            type: 'photo',
            src: './asset/images/news/twchat.jpg',
            value: './asset/images/news/twchat.jpg',
            styles: {
                left: '80px',
                top: '250px',
                width: '150px',
                height: '80px',
                "text-align": 'center',
                color: '#f70',
                "font-size": '14px',
                "font-family": 'Heiti',
                "font-weight": 'bold',
                opacity: '1'
            },
            animates: [{
                repeat: 1,
                class: 'flipInX',
                delay: 5
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }, {
            id: 'p13e6',
            name: 'p13e6',
            href: '',
            type: 'text',
            value: '中威移动微网站',
            styles: {
                left: '76px',
                top: '346px',
                width: '150px',
                height: '80px',
                "text-align": 'center',
                color: '#6e0',
                "font-size": '18px',
                "line-height": '80px',
                "font-family": 'Heiti',
                "font-weight": 'bold',
                "text-decoration": '',
                "borderStyle": 'solid',
                "borderColor": '#999',
                "borderWidth": '4px',
                "borderRadius": '6px',
                opacity: '1'
            },
            animates: [{
                repeat: 1,
                class: 'slideInLeft',
                delay: 7
            }, {
                repeat: 1,
                class: 'tada',
                delay: 3
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }, {
            id: 'p13e7',
            name: 'p13e7',
            href: '',
            type: 'photo',
            src: './asset/images/news/cms.jpg',
            value: './asset/images/news/cms.jpg',
            styles: {
                left: '80px',
                top: '350px',
                width: '150px',
                height: '80px',
                "text-align": 'center',
                color: '#f70',
                "font-size": '14px',
                "font-family": 'Heiti',
                "font-weight": 'bold',
                opacity: '1'
            },
            animates: [{
                repeat: 1,
                class: 'fadeIn',
                delay: 8
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }]
    }, {
        id: 'page6',
        name: '页面6',
        transform: '',
        styles: '',
        elements: [{
            id: 'p6e1',
            name: 'p6e1',
            href: '',
            type: 'chart',
            modelType: 'pie',
            width: '310px',
            height: '310px',
            styles: {
                left: '5px',
                top: '50px',
                width: '310px',
                height: '310px',
                "text-align": 'center',
                color: '#f70',
                "font-size": '41px',
                "font-family": 'Heiti',
                "font-weight": 'bold',
                "text-decoration": '',
                "background-color": '#ccc',
                opacity: '1'
            },
            animates: [{
                repeat: 1,
                class: 'fadeInLeft',
                delay: 1
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }, {
            id: 'p6e2',
            name: 'p6e2',
            href: '',
            value: '饼图',
            type: 'text',
            styles: {
                left: '120px',
                top: '395px',
                width: '65px',
                height: '40px',
                "text-align": 'center',
                content: '编辑内容',
                color: '#000',
                "font-size": '24px',
                "font-family": 'Heiti',
                "font-weight": 'bold',
                "font-style": '',
                "text-decoration": '',
                "line-height": '1',
                "text-shadow": '0.0000px 0.0000px 0px #000000',
                "background-color": 'transparent',
                "border-style": 'solid',
                "border-width": '0',
                "border-color": '#fff',
                "border-radius": '0',
                "box-shadow": '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 0,
                class: 'bounceInRight',
                delay: 1.8
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }]
    }, {
        id: 'page5',
        name: '页面5',
        transform: '',
        styles: '',
        elements: [{
            id: 'p5e1',
            name: 'p5e1',
            href: '',
            type: 'chart',
            modelType: 'bar',
            width: '310px',
            height: '310px',
            styles: {
                left: '5px',
                top: '50px',
                width: '310px',
                height: '310px',
                "text-align": 'center',
                color: '#f70',
                "font-size": '41px',
                "font-family": 'Heiti',
                "font-weight": 'bold',
                "text-decoration": '',
                "background-color": '#ccc',
                opacity: '1'
            },
            animates: [{
                repeat: 1,
                class: 'fadeInUp',
                delay: 1
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }, {
            id: 'p5e2',
            name: 'p5e2',
            href: '',
            value: '柱状图',
            type: 'text',
            styles: {
                left: '120px',
                top: '395px',
                width: '120px',
                height: '40px',
                "text-align": 'center',
                content: '编辑内容',
                color: '#000',
                "font-size": '24px',
                "font-family": 'Heiti',
                "font-weight": 'bold',
                "font-style": '',
                "text-decoration": '',
                "line-height": '1',
                "text-shadow": '0.0000px 0.0000px 0px #000000',
                "background-color": 'transparent',
                "border-style": 'solid',
                "border-width": '0',
                "border-color": '#fff',
                "border-radius": '0',
                "box-shadow": '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 0,
                class: 'bounceInUp',
                delay: 1.8
            }],
            states: {
                lock: false,
                visible: true
            },
            auto: true
        }]
    }, {
        id: 'page3',
        name: '页面3',
        styles: '',
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
            styles: {
                left: '15px',
                top: '70px',
                width: '280px',
                height: '80px',
                fontSize: '24px',
                lineHeight: '80px',
                color: '#09e',
                textAlign: 'center',
                crop: 'on',
                backgroundColor: '#fff',
                borderStyle: 'solid',
                borderWidth: '2px',
                borderColor: '#222',
                borderRadius: '10px',
                opacity: '1',
                transform: 'rotate(0deg)',
                boxShadow: ' 1px 1px 5px #222'
            },
            animates: [{
                repeat: 1,
                class: 'flipInX',
                delay: 1
            }, {
                repeat: 0,
                class: 'bounceOut',
                delay: 6
            }],
            auto: true
        }, {
            id: 'p3e2',
            name: 'p3e2',
            href: '',
            value: '多种动画效果',
            type: 'text',
            x: '15px',
            y: '175px',
            width: '280px',
            height: '80px',
            styles: {
                left: '15px',
                top: '175px',
                width: '280px',
                height: '80px',
                fontSize: '24px',
                lineHeight: '80px',
                color: '#f70',
                textAlign: 'center',
                crop: 'on',
                backgroundColor: '#fff',
                borderStyle: 'solid',
                borderWidth: '2px',
                borderColor: '#222',
                borderRadius: '10px',
                opacity: '1',
                transform: 'rotate(0deg)',
                boxShadow: ' 1px 1px 5px #222'
            },
            animates: [{
                repeat: 0,
                class: 'flipInX',
                delay: 2
            }, {
                repeat: 0,
                class: 'bounceOut',
                delay: 5.0
            }],
            auto: true
        }, {
            id: 'p3e3',
            name: 'p3e3',
            href: '',
            value: '丰富属性设置',
            type: 'text',
            x: '15px',
            y: '280px',
            width: '280px',
            height: '80px',
            styles: {
                left: '15px',
                top: '280px',
                width: '280px',
                height: '80px',
                fontSize: '24px',
                lineHeight: '80px',
                color: '#0f0',
                textAlign: 'center',
                crop: 'on',
                backgroundColor: '#fff',
                borderStyle: 'solid',
                borderWidth: '2px',
                borderColor: '#222',
                borderRadius: '10px',
                opacity: '1',
                transform: 'rotate(0deg)',
                boxShadow: ' 1px 1px 5px #222'
            },
            animates: [{
                repeat: 0,
                class: 'flipInX',
                delay: 3
            }, {
                repeat: 0,
                class: 'bounceOut',
                delay: 4.0
            }],
            auto: true
        }, {
            id: 'p3e4',
            name: 'p3e4',
            href: '',
            value: '开启旅程',
            type: 'text',
            x: '13px',
            y: '40px',
            width: '280px',
            height: '340px',
            styles: {
                left: '13px',
                top: '40px',
                width: '280px',
                height: '340px',
                fontSize: '60px',
                lineHeight: '340px',
                color: '#fff',
                textShadow: '2px 2px 10px #222',
                textAlign: 'center',
                crop: 'on',
                backgroundColor: '#09e',
                borderStyle: 'solid',
                borderWidth: '6px',
                borderColor: '#999',
                borderRadius: '40px',
                opacity: '1',
                transform: 'rotate(0deg)',
                boxShadow: ' 1px 1px 20px #222'
            },
            animates: [{
                repeat: 0,
                class: 'rotateIn',
                delay: 7
            }],
            auto: true
        }]
    }, {
        id: 'page4',
        name: '页面4',
        styles: '',
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
            styles: {
                left: '30px',
                top: '50px',
                width: '260px',
                height: '50px',
                fontSize: '32px',
                color: '#222',
                textAlign: 'center',
                crop: 'on',
                lineHeight: '50px',
                backgroundColor: 'transparent',
                borderStyle: 'none',
                borderWidth: '0px',
                borderColor: '#000000',
                borderRadius: '0px',
                opacity: '1',
                transform: 'rotate(0deg)',
                boxShadow: '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 0,
                class: 'bounceInDown',
                delay: 1
            }],
            auto: true
        }, {
            id: 'p4e2',
            name: 'p4e2',
            href: '',
            value: '联系我们',
            type: 'text',
            x: '30px',
            y: '90px',
            width: '260px',
            height: '50px',
            styles: {
                left: '30px',
                top: '90px',
                width: '260px',
                height: '50px',
                fontSize: '28px',
                color: '#222',
                textAlign: 'center',
                crop: 'on',
                lineHeight: '50px',
                backgroundColor: 'transparent',
                borderStyle: 'none',
                borderWidth: '0px',
                borderColor: '#000000',
                borderRadius: '0px',
                opacity: '1',
                transform: 'rotate(0deg)',
                boxShadow: '0.0000px 0.0000px 0px #ffffff'
            },
            animates: [{
                repeat: 0,
                class: 'bounceInDown',
                delay: 1.5
            }],
            auto: true
        }, {
            id: 'p4e3',
            name: 'p4e3',
            href: '',
            value: './asset/demo/home.png',
            type: 'img',
            x: '32px',
            y: '220px',
            width: '40px',
            height: '40px',
            styles: {
                left: '32px',
                top: '220px',
                fontSize: '14px',
                width: '40px',
                lineHeight: '40px',
                textAlign: 'center',
                fontWeight: 'bold',
                background: ' #222',
                opacity: '0.8',
                color: '#fff'
            },
            animates: [{
                repeat: 1,
                class: 'bounceInLeft',
                delay: 2
            }],
            auto: true
        }, {
            id: 'p4e4',
            name: 'p4e4',
            href: '',
            value: '江苏中威科技软件系统有限公司',
            type: 'text',
            x: '75px',
            y: '220px',
            width: '220px',
            height: '40px',
            styles: {
                left: '75px',
                top: '220px',
                fontSize: '14px',
                width: '220px',
                lineHeight: '40px',
                textAlign: 'center',
                fontWeight: 'bold',
                background: ' #222',
                opacity: '0.8',
                color: '#fff'
            },
            animates: [{
                repeat: 1,
                class: 'bounceInRight',
                delay: 2.2
            }],
            auto: true
        }, {
            id: 'p4e5',
            name: 'p4e5',
            href: '',
            value: './asset/demo/phone.png',
            type: 'img',
            x: '32px',
            y: '265px',
            width: '40px',
            height: '40px',
            styles: {
                left: '32px',
                top: '265px',
                fontSize: '14px',
                width: '40px',
                lineHeight: '40px',
                textAlign: 'center',
                fontWeight: 'bold',
                background: ' #222',
                opacity: '0.8',
                color: '#fff'
            },
            animates: [{
                repeat: 1,
                class: 'bounceInLeft',
                delay: 2.5
            }],
            auto: true
        }, {
            id: 'p4e6',
            name: 'p4e6',
            href: '',
            value: '0513-81550880',
            type: 'text',
            x: '75px',
            y: '265px',
            width: '220px',
            height: '40px',
            styles: {
                left: '75px',
                top: '265px',
                fontSize: '14px',
                width: '220px',
                lineHeight: '40px',
                textAlign: 'center',
                fontWeight: 'bold',
                background: ' #222',
                opacity: '0.8',
                color: '#fff'
            },
            animates: [{
                repeat: 1,
                class: 'bounceInRight',
                delay: 2.7
            }],
            auto: true
        }, {
            id: 'p4e7',
            name: 'p4e7',
            href: '',
            value: './asset/demo/mail.png',
            type: 'img',
            x: '32px',
            y: '310px',
            width: '40px',
            height: '40px',
            styles: {
                left: '32px',
                top: '310px',
                fontSize: '14px',
                width: '40px',
                lineHeight: '40px',
                textAlign: 'center',
                fontWeight: 'bold',
                background: ' #222',
                opacity: '0.8',
                color: '#fff'
            },
            animates: [{
                repeat: 1,
                class: 'bounceInLeft',
                delay: 2.9
            }],
            auto: true
        }, {
            id: 'p4e8',
            name: 'p4e8',
            href: '',
            value: 'mail@trueway.com.cn',
            type: 'text',
            x: '75px',
            y: '310px',
            width: '220px',
            height: '40px',
            styles: {
                left: '75px',
                top: '310px',
                fontSize: '14px',
                width: '220px',
                lineHeight: '40px',
                textAlign: 'center',
                fontWeight: 'bold',
                background: ' #222',
                opacity: '0.8',
                color: '#fff'
            },
            animates: [{
                repeat: 1,
                class: 'bounceInRight',
                delay: 3.1
            }],
            auto: true
        }, {
            id: 'p4e9',
            name: 'p4e9',
            href: '',
            value: './asset/demo/pos.png',
            type: 'img',
            x: '32px',
            y: '355px',
            width: '40px',
            height: '40px',
            styles: {
                left: '32px',
                top: '355px',
                fontSize: '14px',
                width: '40px',
                lineHeight: '40px',
                textAlign: 'center',
                fontWeight: 'bold',
                background: ' #222',
                opacity: '0.8',
                color: '#fff'
            },
            animates: [{
                repeat: 1,
                class: 'bounceInLeft',
                delay: 3.1
            }],
            auto: true
        }, {
            id: 'p4e10',
            name: 'p4e10',
            href: '',
            value: '工农路5号亚大厦北楼3楼',
            type: 'text',
            x: '75px',
            y: '355px',
            width: '220px',
            height: '40px',
            styles: {
                left: '75px',
                top: '355px',
                fontSize: '14px',
                width: '220px',
                lineHeight: '40px',
                textAlign: 'center',
                fontWeight: 'bold',
                background: ' #222',
                opacity: '0.8',
                color: '#fff'
            },
            animates: [{
                repeat: 1,
                class: 'bounceInRight',
                delay: 3.3
            }],
            auto: true
        }]
    }];


    return sample;
});
