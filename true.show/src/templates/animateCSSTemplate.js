/**
 * 
 * 生成动画模板的编译模块
 * @author John Nong(https://www.github.com/overkazaf)
 * @module templates/animateCSSTemplate
 * 
 */
;define(function (require) {
	var tpl = '<style data-desc="anim-config-style" id="{{STYLEID}}" type="text/css">{{ROOT}} .{{CLASSNAME}}-{{DESC}} {\
			{{VENDOR1}}animation-duration: {{DURATION}}s;\
			{{VENDOR1}}animation-delay: {{DELAY}}s;\
			{{VENDOR1}}animation-iteration-count: {{REPEAT}};\
			{{VENDOR2}}animation-duration: {{DURATION}}s;\
			{{VENDOR2}}animation-delay: {{DELAY}}s;\
			{{VENDOR2}}animation-iteration-count: {{REPEAT}};\
			{{VENDOR3}}animation-duration: {{DURATION}}s;\
			{{VENDOR3}}animation-delay: {{DELAY}}s;\
			{{VENDOR3}}animation-iteration-count: {{REPEAT}};\
			{{VENDOR4}}animation-duration: {{DURATION}}s;\
			{{VENDOR4}}animation-delay: {{DELAY}}s;\
			{{VENDOR4}}animation-iteration-count: {{REPEAT}};\
			{{VENDOR5}}animation-duration: {{DURATION}}s;\
			{{VENDOR5}}animation-delay: {{DELAY}}s;\
			{{VENDOR5}}animation-iteration-count: {{REPEAT}};\
		}</style>';

	function getAnimationDescription (param) {
		var arr = [];
		for (var k in param) {
			if (k !='class') {
				arr.push(k);
				arr.push(param[k]);
			}
		}
		return arr.join('-');
	}

	var template = {
		compile : function (elementId, param, prefix) {
			var DESC = getAnimationDescription(param);
			var style = 
						tpl
						.replace(/{{ROOT}}/g, prefix || '.device-view')
						.replace(/{{STYLEID}}/g, elementId + '-' + param['class'] + '-' + DESC)
						.replace(/{{CLASSNAME}}/g, param['class'])
						.replace(/{{DESC}}/g, DESC)
						.replace(/{{VENDOR1}}/g, "-webkit-")
						.replace(/{{VENDOR2}}/g, "-moz-")
						.replace(/{{VENDOR3}}/g, "-ms-")
						.replace(/{{VENDOR4}}/g, "-o-")
						.replace(/{{VENDOR5}}/g, "")
						.replace(/{{DURATION}}/g, param['duration'])
						.replace(/{{DELAY}}/g, param['delay'])
						.replace(/{{REPEAT}}/g, (parseInt(param['repeat']) <= 0 ? 'infinite' : param['repeat']));

			return style;
		},
		getAnimateClassNameByParam : function (param) {
			var arr = [];
			var DESC = getAnimationDescription(param);

			arr.push(param['class']);
			arr.push(DESC);

			return arr.join('-');
		}
	};


	return template;
});