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

        html.push('<dl id="' + line['name'] + '-box" data-css="' + line['css'] + '" data-unit="' + (!!line['unit'] ? line['unit'] : '') + '" data-eval="'+ (!!line['eval']?line['eval']:'') +'">');

        if (! (line['plugin'] in excepts)) {
            box += '<dt>' + line['label'] + '</dt>';
        }

        box += '<dd data-plugin="' + line['plugin'] + '">' + this.buildPanelPlugin(line, this.groupId) + (!!line['unit'] ? '&nbsp;&nbsp;'+line['unit'] : '') +'</dd>'


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
            default:
                html = '<input ' + eventString + ' type="' + plugin + '" id="' + id + '" name="' + name + '" value="' + (!!value ? value : "") + '" />'
        }
        return html;
    };

    Base.prototype.getEventString = function(plugin, groupId) {
        var html = '';
        switch (plugin) {
        	case 'modal':
                html = 'onclick="callFN(\'showModal\', event, \'' + groupId + '\');return false;"';
                break;
            case 'crop':
                html = 'onclick="callFN(\'cropImage\', event, \'' + groupId + '\');return false;"';
                break;
            case 'textarea':
                html = 'onkeyup="callFN(\'noticeUpdate\', event,\'' + groupId + '\');"';
                break;
            case 'select':
                html = 'onchange="callFN(\'noticeUpdate\', event,\'' + groupId + '\');"';
                break;
            case 'btngroup':
                html = 'onclick="callFN(\'noticeUpdate\', event,\'' + groupId + '\');"';
                break;
            default:
                html = 'onblur="callFN(\'noticeUpdate\', event,\'' + groupId + '\');"';
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
                html.push('<option value="' + val['value'] + '" ' + val['status'] + '">' + val['label'] + '</option>');
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
