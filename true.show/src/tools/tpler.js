;define(function (require) {
	'use strict';
	var tpl='<plugin-warp>\
							<div class="ui-draggable-handle cont-warp">\
								<div class="cont-inner" contentEditable="true">{{cont}}</div>\
							</div>\
							{{resizeable}}\
						</plugin-warp>';
	var resizeableTpl='<span class="ui-rotate-handle">\
								<span class="ui-rotate-bar-radius"></span>\
								<span class="ui-rotate-bar-line"></span>\
								</span>\
								<span class="ui-resizable-handle top">\
								<span class="ui-resizable-line"></span>\
								<span class="ui-resizable-circle"></span>\
								</span>\
								<span class="ui-resizable-handle right">\
									<span class="ui-resizable-line"></span>\
									<span class="ui-resizable-circle"></span>\
								</span>\
								<span class="ui-resizable-handle bottom">\
									<span class="ui-resizable-line"></span>\
									<span class="ui-resizable-circle"></span>\
								</span>\
								<span class="ui-resizable-handle left">\
									<span class="ui-resizable-line"></span>\
									<span class="ui-resizable-circle"></span>\
								</span>\
								<span class="ui-resizable-handle right-top">\
									<span class="ui-resizable-circle"></span>\
								</span>\
								<span class="ui-resizable-handle right-bottom">\
									<span class="ui-resizable-circle"></span>\
								</span>\
								<span class="ui-resizable-handle left-bottom">\
									<span class="ui-resizable-circle"></span>\
								</span>\
								<span class="ui-resizable-handle left-top">\
									<span class="ui-resizable-circle"></span>\
								</span>';

	/* helper functions */
    function camel2HB (str) {
        return str.replace(/([A-Z])/g, "-$1").toLowerCase();
    };

    function j2sFN (raw) {
        var json = raw;
        var result = '';
        for (var key in json) {
            var val = json[key];
            result += key + ':' + val + ';';
        }
        result = result.replace(/([A-Z])/g, "-$1").toLowerCase();
        return result;
    };
    /* helper functions end */

	function tpler(){}
	tpler.prototype={
		generateEl:function(obj){
			var html='';
			switch(obj.type){
				case 'text':
					html=obj.value;
				break;
				case 'photo':
					html='<img alt="'+obj.name+'" src="'+obj.src+'" style="width:'+obj.styles.width+';height:'+obj.styles.height+';border:0;" />';
				break;
			}
			return html;
		},
		generateStyles:function(styles){
			var style=[];
			for(var i in styles){
				style.push(i+':'+styles[i]+';');
			}
			return style.join('');
		},
		generatePlugin:function(obj,type){
			var cont=this.generateEl(obj),
					style=this.generateStyles(obj.styles),
					resizeable=type==true?'':resizeableTpl;
			var tplstr=tpl.replace('{{cont}}',cont)
										.replace('{{resizeable}}',resizeable);
			var dom=$(tplstr).attr({
				id:obj.id,
				name:obj.name,
				type:obj.type,
				style:style,
				styles:JSON.stringify(obj.styles),
				animates:JSON.stringify(obj.animates),
				events:JSON.stringify(obj.events),
				states:JSON.stringify(obj.states),
			});
			return dom[0].outerHTML;
		},
		generatePage:function(page,type){
			var i=0,l=page.elements?page.elements.length:0;
			var pagedom=[];
			var els = page.elements;
			for(;i<l;i++){
				pagedom.push(this.generatePlugin(els[i],type));
			}
			return pagedom.join('');
		}
	};
	return new tpler();
});