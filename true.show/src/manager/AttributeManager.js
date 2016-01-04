/**
 * AttributeManager 代理类
 * 		用于代理viewer/layer/pages实例的请求(这些请求最终都会由marker代理发送)
 * 		AM将焦点对象的历史配置数据结构转交给配置类的组(Group)处理
 * 		Group会针对改变的类型，把改变分发到自己管理的特性配置类实例中，由配置类实例完成设置参数的更新
 * 		Group处理完成后，该AttributeManager的回调中会将配置类上的变化转交给marker实例更新视图
 * @author John Nong(https://www.github.com/overkazaf)
 * @module manager/AttributeManager
 */
;define(function (require) {
	var AttributeManager = function (options) {
		this.id = options.id;
		this.marker = null;
		this.instance = new AMScheduler(options);
		this.instance.supervisor = this;
	};

	/**
	 * [AMScheduler AM的实例类，用于负责具体的 view 与data model交互]
	 * @param {[type]} options [description]
	 */
	function AMScheduler (options) {
		this.options = options || {};
		this.groupList = [];
		this.groupMap = {};
		this.supervisor = null;

		return this;
	}

	/**
	 * [addGroup 新增一组配置项]
	 * @param {[Group]} group [见模块manager/Group]
	 */
	AMScheduler.prototype.addGroup = function (group) {
		this.groupList.push(group);
		this.groupMap[group.id] = group;
		group.supervisor = this;
	}

	/**
	 * [delGroup 删除配置项组]
	 * @param  {[type]} groupId [description]
	 * @return {[type]}         [description]
	 */
	AMScheduler.prototype.delGroup = function (groupId) {
		var i,
			list = this.groupList,
			l = list.length;
		for (i = 0; i < l; i++) {
			if (list[i].id == groupId) {
				list[i].supervisor = null;
				this.groupList.splice(i,1);
				delete this.groupMap[groupId];
				return true;
			}
		}
		return false;
	}

	/**
	 * [getGroup 获取配置项组]
	 * @param  {[type]} groupId [description]
	 * @return {[type]}         [description]
	 */
	AMScheduler.prototype.getGroup = function (groupId) {
		return this.groupMap[groupId];
	}

	/**
	 * [modGroup 修改配置项组]
	 * @param  {[type]} groupId [description]
	 * @param  {[type]} newGroup [description]
	 * @return {[type]}         [description]
	 */
	AMScheduler.prototype.modGroup = function (groupId, newGroup) {
		var b = this.contains(groupId);
		if (b) {
			var index = this.getGroupIndex(groupId);
			this.groupList.splice(index, 1, group);
			this.groupMap[groupId] = newGroup;

			return true;
		}

		return false;
	}

	/**
	 * [contains 检查Group是否存在AM实例的groupList中]
	 * @param  {[String]} groupId [给定的配置项组id]
	 * @return {[Boolean]}         [description]
	 */
	AMScheduler.prototype.contains = function (groupId) {
		return this.getGroupIndex(groupId) === -1;
	}

	/**
	 * [updateAttrModel 更新数据模型]
	 * @param  {[Object]} json [数据模型]
	 * @return {[Boolean]}      [description]
	 */
	AMScheduler.prototype.updateAttrModel = function (json) {
		// 直接通知配置项组更新数据模型
		var group = this.getGroup(json.id);
		return group && group.update(json);
	};




	/**
	 * [iterGroups 遍历特性配置模块的方法]
	 * @param  {[type]} func    [回调]
	 * @param  {[type]} options [回调的参数]
	 * @return {[type]}         [description]
	 */
	AMScheduler.prototype.iterGroups = function (func, options) {
		var list = this.groupList;
		list.forEach(function (group, index) {
			func.call(group, options || {});
		});
	};


	AMScheduler.prototype.noticeUpdate = function (forms) {
		this.supervisor.updateView(forms);
	};

	/**
	 * [getInstance 获取AM的实例对象]
	 * @return {[Object]} [Object]
	 */
	AttributeManager.prototype.getInstance = function () {
		return this.instance;
	};

	/**
	 * [setMarker 设置AM直接交互的Marker对象，这里保证了不是ie暂时不用担心循环引用内存被干爆]
	 * @param {[type]} marker [description]
	 */
	AttributeManager.prototype.setMarker = function (marker) {
		this.marker = marker;
	};

	/**
	 * [getMarker 获取AM直接交互的Marker对象]
	 * @param {[type]} marker [description]
	 */
	AttributeManager.prototype.getMarker = function () {
		return this.marker;
	};

	/**
	 * [updateView 更新视图,直接把json传给Marker实例， 由Marker进行更新，Marker实例要实现updateView方法]
	 * @param  {[String]} json   [数据模型]
	 * @return {[type]}      [description]
	 */
	AttributeManager.prototype.updateView = function (json) {
		this.getMarker().updateView(json['text']);
	};

	/**
	 * [updateAttrModel 更新配置模型,直接把json传给AMScheduler实例， 由AMScheduler进行更新]
	 * @param  {[String]} json   [数据模型]
	 * @return {[type]}      [description]
	 */
	AttributeManager.prototype.updateAttrModel = function (json) {
		return this.getInstance().updateAttrModel(json);
	};

	return AttributeManager;
});