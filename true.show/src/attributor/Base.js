/**
 * Base 特性配置类的基类，主要提供一些模板方法让子类重载或调用
 * @author John Nong(https://www.github.com/overkazaf)
 * @module attributor/Base
 */
;
define(function(require) {

    var tools = require('../tools/tools');
    var logger = require('../tools/loger');

    var Base = function(options) {
        this.options = options;
        this.groupId = options.groupId;
        this.id = options.id;
        this.formid = '';
        this.pluginList = [];
        return this;
    };

    Base.prototype.init = function() {
    	/**
    	 * 
    	 * 这里是初始化单个配置面板的逻辑，
    	 * 如果想处理多个， 在Group模块里调用iterList方法进行遍历调用
    	 * 
    	 */
        this.buildPanel();

        this.setupPluginList();

        this.initPlugins();
    };

    Base.prototype.buildPanel = function() {
        var opt = this.options;
        var tabId = opt.tabId;
        var attrs = opt.attributes;
        var formHtml = this.buildForm(attrs);

        var $tab = $('#' + tabId);
        var $tabContainer = $tab.closest('.tab-box').find('.tab-item');
        var index = $tab.index();

        $tabContainer.eq(index).html(formHtml);
        $('#' + this.formid).on('submit', function (event) {
        	event.preventDefault();
        	return false;
        });
        $tabContainer.eq(index).find('select').each(function () {
        	$(this).find('option:selected').val();
        })

    };

    Base.prototype.buildForm = function(attrs) {
        var formId = 'form_' + tools.uuid();

        this.formid = formId;
        var html = ['<form id="' + formId + '" class="form-control">'];
        for (var i = 0, l = attrs.length; i < l; i++) {
            var group = attrs[i];
            if (i > 0) html.push('<hr class="editor-panel-text">');
            for (var j = 0, gl = group.length; j < gl; j++) {
                var line = this.buildFormLine(group[j]);
                html.push(line);
            }
        }
        html.push('</form>');
        return html.join('');
    }

    Base.prototype.buildFormLine = function(line) {

        var html = [],
            box = '',
            excepts = {
            	'textarea' : 1,
            	'modal' : 1,
            	'crop' : 1,
            };

        html.push('<dl id="' + line['name'] + '-box" data-css="' + line['css'] + '" data-unit="' + '" data-eval="'+ (!!line['eval']?line['eval']:'') +'">');

        if (! (line['plugin'] in excepts)) {
            box += '<dt>' + line['label'] + '</dt>';
        }

        box += '<dd data-plugin="' + line['plugin'] + '">' + this.buildPanelPlugin(line, this.groupId) +'</dd>';


        html.push(box);
        html.push('</dl>');

        return html.join('');
    }


    Base.prototype.getForm = function() {

        return {};
    };

    Base.prototype.form2Data = function() {

        return {};
    };

    Base.prototype.buildPanelPlugin = function(json) {
        var
            id = json.name,
            name = json.name,
            value = json.value,
            values = json.values,
            plugin = json.plugin,
            unit = json.unit,
            unit = !!unit ? unit : "",
            html,
            eventString = this.getEventString(json.plugin, this.groupId);

        switch (plugin) {
        	case 'modal':
        	case 'crop':
        		html = '<button ' + eventString +' id="'+ id +'" class="btn btn-default">'+ value +'</button>';
        		break;
            case 'textarea':
                html = '<textarea ' + eventString + ' row="12" col="30" class="textarea-box" id="' + id + '">' + (!!value ? value : "") + '</textarea>';
                break;
            case 'btngroup':
                html = this.panelPluginStrategies['btngroup'](name, value, values, eventString);
                break;
            case 'select':
                html = this.panelPluginStrategies['select'](name, value, values, eventString);
                break;
            case 'colorpicker':
                html = '<input type="color" ' + eventString + ' id="' + id + '" name="' + name + '" value="' + (!!value ? value : "#000000") + '" />'
                break;
            case 'slider-fontsize':
            	html = '<input type="range" data-unit="'+ unit +'" min="12" max="80" step="1" defaultValue="12" ' + eventString + ' id="' + id + '" name="' + name + '" value="'+ (!!value?parseInt(value):12) +'" /><output name="result">'+(!!value?parseInt(value):12) + unit +'</output>'
                break;
            case 'slider-lineheight':
            	html = '<input type="range" data-unit="'+ unit +'" min=".1" max="5" step=".1" defaultValue=".1" ' + eventString + ' id="' + id + '" name="' + name + '" value="'+ (!!value?parseInt(value):1) +'" /><output name="result">'+(!!value?parseInt(value):1) + unit +'</output>'
                break;
            case 'slider':
                html = '<input type="range" data-unit="'+ unit +'" min="0" max="40" step="1" defaultValue="0" ' + eventString + ' id="' + id + '" name="' + name + '" value="'+ (!!value?parseInt(value):0) +'" /><output name="result">'+(!!value?parseInt(value):0) + unit +'</output>'
                break;
            case 'slider-angle':
                html = '<input type="range" data-unit="'+ unit +'" min="0" max="360" step="1" defaultValue="0" ' + eventString + ' id="' + id + '" name="' + name + '" value="'+ (!!value?parseInt(value):0) +'" /><output name="result">'+(!!value?parseInt(value):0) + unit +'</output>'
                break;
            default:
                html = '<input ' + eventString + ' type="number" id="' + id + '" name="' + name + '" value="' + (!!value ? value : "") + '" />'
        }
        return html;
    };

    Base.prototype.getEventString = function(plugin, groupId) {
        var html = '';
        switch (plugin) {
        	case 'modal':
                html = 'onclick="callFN(\'showModal\', \'' + groupId + '\');"';
                break;
            case 'crop':
                html = 'onclick="callFN(\'cropImage\', \'' + groupId + '\');"';
                break;
            case 'textarea':
                html = 'onkeyup="callFN(\'noticeUpdate\',\'' + groupId + '\');"';
                break;
            case 'select':
                html = 'onchange="callFN(\'noticeUpdate\',\'' + groupId + '\');"';
                break;
            case 'btngroup':
                html = 'onclick="callFN(\'noticeUpdate\',\'' + groupId + '\');"';
                break;
            case 'colorpicker':
            	// html = 'onblur="callFN(\'noticeUpdate\',\'' + groupId + '\');"';
            	// break;
           	case 'slider-lineheight':
           	case 'slider-fontsize':
           	case 'slider':
           	case 'slider-angle':
                html = 'onchange="callFN(\'noticeUpdate\', \'' + groupId + '\');"';
                break;
            default:
                html = 'onblur="callFN(\'noticeUpdate\',\'' + groupId + '\');"';
        };

        return html;
    };

    Base.prototype.panelPluginStrategies = {
        'btngroup': function(name, value, values, evtString) {
            var html = '';
            for (var i = 0, l = values.length; i < l; i++) {
                var val = values[i];
                html += '<input ' + evtString + ' name="' + name + '" type="' + val['type'] + '" id="btngroup-' + val['name'] + '" value="' + val['value'] + '" ' + val['status'] + ' />';
                html += '<label for="btngroup-' + val['name'] + '" class="' + val['clazz'] + '"></label>';
            }
            return html;
        },
        'select': function(name, value, values, evtString) {

            var html = [];
            html.push('<select ' + evtString + ' id="select-' + name + '">');
            for (var i = 0, l = values.length; i < l; i++) {
                var val = values[i];
                html.push('<option value="' + val['value'] + '" ' + (!!val['status']?'selected="selected"':'') + '">' + val['label'] + '</option>');
            }
            html.push('</select>');
            return html.join('');
        }
    };

    /**
     * [setupPluginList 初始化插件列表，将插件实例用力塞进列表list中]
     * @return {[type]} [description]
     */
    Base.prototype.setupPluginList = function() {
        var that = this;
        var list = this.pluginList;
        var domArray = this.getPluginDomArray();

        tools.each(domArray, function(dom) {
            var options = that.getPlugOptions(dom);
            var plugin = new PluginBase(options.pluginName, options)
            list.push(plugin);
        });
    };

    Base.prototype.getPluginDomArray = function() {
        return [];
    };

    Base.prototype.getPlugOptions = function(dom) {

        return {
            id: tools.uuid(),
            pluginName: 'pluginName', // text, photo, button
        }
    }

    Base.prototype.initPlugins = function() {
        var list = this.pluginList;

        tools.each(list, function(plugin) {
            // 这里会隐藏原表单的input，用plugin的view的替换， 
            // 当plugin的值改变时trigger原表单的事件，通知上一层管理器更新view
            plugin.init();
        });
    };

    Base.prototype.destroy = function() {
        var list = this.pluginList;

        tools.each(list, function(plugin) {
            plugin.destroy();
        });
    };



    /**
     * [update 配置项实例的数据更新]
     * @param  {[Object]} json [description]
     * @return {[type]}      [description]
     */
    Base.prototype.update = function(json) {
        // 更新数据模型
        this.updateModel(json);
        // 更新配置视图
        this.renderView(json);
    };


    // 渲染相关
    Base.prototype.renderView = function(json) {};

    Base.prototype.updateModel = function(json) {};


    return Base;
});
