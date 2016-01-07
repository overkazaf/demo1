/**
 * Group 是一个特性组合的管理器，负责针对不同的设计元素类型组合不同的特性配置对象
 * 		 一个group里可以add多个特性实例
 * @author John Nong(https://www.github.com/overkazaf)
 * @module manager/GroupManager
 */
;define(function (require) {
	var Group = function (options) {
		// Group实例中的id应该与存在的元素id一一对应
		this.options = options;
		this.id = this.options.id;
		this.attrList = [];
		this.attrMap = {};
	};


	// 对象方法
	Group.prototype.add = function (attributor) {
		this.attrList.push(attributor);
		this.attrMap[attributor.id] = attributor;
	};

	Group.prototype.remove = function (attributorId) {
		var index = this.find(attributorId);
		if (index !== -1) {
			this.attrList.splice(index, 1);
			delete this.attrMap[attributorId]
			return true;
		}
		return false;
	};

	Group.prototype.init = function () {
		this.iterList(function (el, index, list) {
			el.init();
		});
	};

	Group.prototype.destory = function () {
		this.iterList(function (el, index, list) {
			el.destory();
		});
	};

	/**
	 * [update 更新配置项指定]
	 * @param  {[type]} json [description]
	 * @return {[type]}      [description]
	 */
	Group.prototype.update = function (json) {
		var el = this.get(json.id);
		if (el) {
			return el.update(json);
		}
		return el === null;
	};


	/**
	 * [updateAll 更新全部配置项]
	 * @param  {[Array]} jsonArray [description]
	 * @return {[type]}      	  [description]
	 */
	Group.prototype.updateAll = function (jsonArray) {
		var list = this.attrList;
		list.forEach(function (el, index) {
			el.update(jsonArray[index]);
		});
	};

	/**
	 * [getAll 获取组内的所有配置项实例]
	 * @param  {[void]}
	 * @return {[Array]}    [配置项实例]
	 */
	Group.prototype.getAll = function () {
		return this.attrList;
	};
	/**
	 * [find 根据id在配置组内查找特性配置项的位置]
	 * @param  {[String]} id [配置项id]
	 * @return {[Object]}    [配置项实例]
	 */
	Group.prototype.get = function (id) {
		var i,
			el = null,
			list = this.attrList;

			for (i = 0; el = list[i++];) {
				if (el.id === id) {
					return el;
				}
			}
			return el;
	};

	Group.prototype.iterList = function (func, options) {
		var list = this.getAll();
		list.forEach(function (item, index, list){
			func.call(item, item, index, list);
		});
	};

	/**
	 * [find 根据id在配置组内查找特性配置项的位置]
	 * @param  {[String]} id [配置项id]
	 * @return {[Number]}    [配置项在group中的下标]
	 */
	Group.prototype.find = function (id) {
		var 
			i,
			el = null,
			list = this.attrList,
			l = list.length;

			for (i = 0; i < l; i++) {
				if (el.id === id) {
					return i;
				}
			}
			return -1;
	};

	/**
	 * [contains 查看group中是否存在一个配置项]
	 * @param  {[String]} id [配置项id]
	 * @return {[Boolean]}    [description]
	 */
	Group.prototype.contains = function (id) {
		return !!this.attrMap[id];
	};


	/**
	 * 通知更新，由AM实例统一进行，分层级传递组装后的参数
	 */
	Group.prototype.noticeUpdate = function () {
		var forms = this.collectForms();
		this.supervisor.noticeUpdate(forms);
	};

	/**
	 *  获取所有的配置项表单， 实际上只要获取当前的配置项就可以了，局部更新
	 *  所以在marker的更新逻辑处最好要使用一个策略
	 */

	Group.prototype.collectForms = function () {
		var forms = {};
		this.iterList(function (a, index, list){
			forms[a.options.type] = a.getForm();
		});
		return forms;
	};


	return Group;
});