"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.rtl = function()
{
};
Object.assign(Runtime.rtl.prototype,
{
	/**
	 * Debug
	 */
	trace: function()
	{
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.rtl)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Runtime.rtl,
{
	LOG_FATAL: 0,
	LOG_CRITICAL: 2,
	LOG_ERROR: 4,
	LOG_WARNING: 6,
	LOG_INFO: 8,
	LOG_DEBUG: 10,
	LOG_DEBUG2: 12,
	STATUS_PLAN: 0,
	STATUS_DONE: 1,
	STATUS_PROCESS: 100,
	STATUS_FAIL: -1,
	ERROR_NULL: 0,
	ERROR_OK: 1,
	ERROR_PROCCESS: 100,
	ERROR_FALSE: -100,
	ERROR_UNKNOWN: -1,
	ERROR_INDEX_OUT_OF_RANGE: -2,
	ERROR_KEY_NOT_FOUND: -3,
	ERROR_STOP_ITERATION: -4,
	ERROR_FILE_NOT_FOUND: -5,
	ERROR_ITEM_NOT_FOUND: -5,
	ERROR_OBJECT_DOES_NOT_EXISTS: -5,
	ERROR_OBJECT_ALLREADY_EXISTS: -6,
	ERROR_ASSERT: -7,
	ERROR_REQUEST: -8,
	ERROR_RESPONSE: -9,
	ERROR_CSRF_TOKEN: -10,
	ERROR_RUNTIME: -11,
	ERROR_VALIDATION: -12,
	ERROR_PARSE_SERIALIZATION_ERROR: -14,
	ERROR_ASSIGN_DATA_STRUCT_VALUE: -15,
	ERROR_AUTH: -16,
	ERROR_DUPLICATE: -17,
	ERROR_API_NOT_FOUND: -18,
	ERROR_API_WRONG_FORMAT: -19,
	ERROR_API_WRONG_APP_NAME: -20,
	ERROR_API_ERROR: -21,
	ERROR_FATAL: -99,
	ERROR_HTTP_CONTINUE: -100,
	ERROR_HTTP_SWITCH: -101,
	ERROR_HTTP_PROCESSING: -102,
	ERROR_HTTP_OK: -200,
	ERROR_HTTP_BAD_GATEWAY: -502,
	ERROR_USER: -10000,
	_memorize_cache: null,
	_memorize_not_found: null,
	_memorize_hkey: null,
	_global_context: null,
	JSON_PRETTY: 1,
	/**
	 * Define class
	 */
	defClass: function(obj)
	{
		if (Runtime.rtl._classes == undefined) Runtime.rtl._classes = {};
		Runtime.rtl._classes[obj.getClassName()] = obj;
	},
	/**
	 * Find class instance by name. If class does not exists return null.
	 * @return var - class instance
	 */
	find_class: function(class_name)
	{
		if (class_name instanceof Function)
			return class_name;
		
		if (window[class_name] != undefined)
			return window[class_name];
			
		return Runtime.rtl._classes[class_name];
		
		if (class_name instanceof Runtime.BaseObject) class_name = class_name.getClassName();
		else if (class_name instanceof Object) class_name = class_name.constructor.name;
		
		if (Runtime.rtl._classes==undefined) Runtime.rtl._classes = {};
		if (Runtime.rtl._classes[class_name]!=undefined) return Runtime.rtl._classes[class_name];
		
		var arr = class_name.split('.');
		var obj = window;
		
		for (var i=0; i<arr.length; i++){
			var key = arr[i];
			if (obj[key] == undefined)
				return null;
			obj = obj[key];
		}
		
		Runtime.rtl._classes[class_name] = obj;
		return obj;
	},
	/**
	 * Returns true if class instanceof class_name
	 * @return bool
	 */
	is_instanceof: function(obj, class_name)
	{
		var c = this.find_class(class_name);
		if (c == null) return false;
		return c.prototype.isPrototypeOf(obj);
	},
	/**
	 * Returns true if obj implements interface_name
	 * @return bool
	 */
	is_implements: function(obj, interface_name)
	{
		if (obj == undefined) return false;
		if (obj.constructor.__implements__ == undefined) return false;
		return obj.constructor.__implements__.indexOf(interface_name) != -1;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	class_exists: function(class_name)
	{
		var obj = this.find_class(class_name);
		if (!this.exists(obj)) return false;
		return true;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	class_implements: function(class_name, interface_name)
	{
		var obj = this.find_class(class_name);
		var obj2 = this.find_class(interface_name);
		
		while (obj != null){
			if (obj.__implements__){
				if (obj.__implements__.indexOf( obj2 ) > -1 ){
					return true;
				}
			}
			obj = obj.__proto__;
		}
		
		return false;
	},
	/**
	 * Returns interface of class
	 * @param string class_name
	 * @return Collection<string>
	 */
	getInterfaces: function(class_name)
	{
		return this.find_class(class_name).__implements__;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	method_exists: function(class_name, method_name)
	{
		if (typeof(class_name) == "object")
		{
			if (class_name[method_name] != undefined) return true;
			return false;
		}
		
		var obj = this.find_class(class_name);
		if (!this.exists(obj)) return false;
		if (this.exists(obj[method_name])) return true;
		return false;
	},
	/**
	 * Create object by class_name. If class name does not exists return null
	 * @return Object
	 */
	newInstance: function(class_name, args)
	{
		if (args == undefined) args = null;
		var obj = this.find_class(class_name);
		if (!this.exists(obj) || !(obj instanceof Function))
			throw new Runtime.Exceptions.FileNotFound(class_name, "class name");
		if (args == undefined || args == null){ args = []; } else { args = args.toArray(); }
		args = args.slice(); 
		if (typeof ctx != "undefined") args.unshift();
		args.unshift(null);
		var f = Function.prototype.bind.apply(obj, args);
		return new f;
	},
	/**
	 * Returns callback
	 * @return fn
	 */
	method: function(obj, method_name)
	{
		var save = obj;
		if (!(obj instanceof Object))
		{
			var find_obj = this.find_class(obj);
			if (find_obj == null)
			{
				throw new Error("Object " + obj + " not found");
			}
			obj = find_obj;
		}
		
		if (obj[method_name] == null || obj[method_name] == "undefined")
		{
			var class_name = "";
			if (obj.getClassName != undefined) class_name = obj.getClassName();
			else if (obj.getCurrentClassName != undefined) class_name = obj.getCurrentClassName();
			else class_name = save;
			throw new Error("Method " + method_name + " not found in " + class_name);
		}
		
		return obj[method_name].bind(obj);
		return function(obj, method_name){ return function () {
			return obj[method_name].apply(obj, arguments);
		}}(obj, method_name);
	},
	/**
	 * Returns callback
	 * @return fn
	 */
	apply: function(f, args)
	{
		var is_ctx = false;
		var res;
		if (args == null) args = [];
		else args = Array.prototype.slice.call(args);
		
		if (typeof ctx != "undefined") args.unshift();
		if (this.isString(f))
		{
			var a = f.split("::");
			var c = a[0]; var m = a[1];
			c = this.find_class(c);
			f = c[m];
			res = f.apply(c, args);
		}
		else
		{
			res = f.apply(null, args);
		}
		
		return res;
	},
	/**
	 * Call await method
	 * @return fn
	 */
	applyAsync: async function(f, args)
	{
		var res;
		if (args == null) args = [];
		else args = Array.prototype.slice.call(args);
		
		if (typeof ctx != "undefined") args.unshift();
		if (this.isString(f))
		{
			var a = f.split("::");
			var c = a[0]; var m = a[1];
			c = this.find_class(c);
			f = c[m];
			res = await f.apply(c, args);
		}
		else
		{
			res = await f.apply(null, args);
		}
		
		return res;
	},
	/**
	 * Apply method
	 * @return var
	 */
	methodApply: function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		var f = Runtime.rtl.method(class_name, method_name);
		return Runtime.rtl.apply(f, args);
	},
	applyMethod: function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		return this.methodApply(class_name, method_name, args);
	},
	callMethod: function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		return this.methodApply(class_name, method_name, args);
	},
	/**
	 * Apply method async
	 * @return var
	 */
	methodApplyAsync: async function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		var f = Runtime.rtl.method(class_name, method_name);
		return Promise.resolve(await Runtime.rtl.applyAsync(f, args));
	},
	applyMethodAsync: async function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		return await this.methodApplyAsync(class_name, method_name, args);
	},
	callMethodAsync: async function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		return await this.methodApplyAsync(class_name, method_name, args);
	},
	/**
	 * Returns value
	 */
	get: function(item, key, def_val)
	{
		if (def_val == undefined) def_val = null;
		return this.attr(item, key, def_val);
	},
	/**
	 * Returns callback
	 * @return var
	 */
	attr: function(item, path, def_val)
	{
		if (def_val == undefined) def_val = null;
		if (path === null)
		{
			return def_val;
		}
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var BaseStruct = use("Runtime.BaseStruct");
		var BaseObject = use("Runtime.BaseObject");
		
		if (def_val == undefined) def_val = null;
		if (item === null) return def_val;
		if (item === undefined) return def_val;
		if (Array.isArray(path) && path.count == undefined) path = Collection.from(path);
		if (this.isScalarValue(path)) path = Collection.from([path]);
		if (!(path instanceof Collection)) return def_val;
		if (path.count() == 0)
		{
			return item;
		}
		if (typeof item == "string") return item.charAt(path[0]);
		var key = path.first();
		var path = path.removeFirstIm();
		var val = def_val;
		if (item instanceof Dict || item instanceof Collection)
		{
			var new_item = item.get(key, def_val);
			val = this.attr(new_item, path, def_val);
			return val;
		}
		else if (item instanceof BaseStruct)
		{
			var new_item = item.get(key, def_val);
			val = this.attr(new_item, path, def_val);
			return val;
		}
		else if (item instanceof BaseObject)
		{
			var new_item = item.takeValue(key, def_val);
			val = this.attr(new_item, path, def_val);
			return val;
		}
		else
		{
			var new_item = item[key] || def_val;
			val = this.attr(new_item, path, def_val);
			return val;
		}
		return def_val;
	},
	/**
	 * Update current item
	 * @return var
	 */
	setAttr: function(item, attrs, new_value)
	{
		if (attrs == null)
		{
			return item;
		}
		var Collection = use("Runtime.Collection");
		if (typeof attrs == "string") attrs = Collection.from([attrs]);
		else if (Array.isArray(attrs) && attrs.count == undefined) attrs = Collection.from(attrs);
		var f = (attrs, data, new_value, f) => 
		{
			if (attrs.count() == 0)
			{
				return new_value;
			}
			if (data == null)
			{
				data = Runtime.Dict.from({});
			}
			var new_data = null;
			var attr_name = attrs.first();
			if (data instanceof Runtime.BaseStruct)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs.removeFirstIm(), attr_data, new_value, f);
				var d = (new Runtime.Map()).setValue(attr_name, res);
				new_data = data.copy(d);
			}
			else if (data instanceof Runtime.BaseObject)
			{
				var attr_data = data.takeValue(attr_name, null);
				var res = f(attrs.removeFirstIm(), attr_data, new_value, f);
				new_data = data;
				new_data.assignValue(attr_name, res);
			}
			else if (data instanceof Runtime.Dict)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs.removeFirstIm(), attr_data, new_value, f);
				new_data = data.setIm(attr_name, res);
			}
			else if (data instanceof Runtime.Collection)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs.removeFirstIm(), attr_data, new_value, f);
				new_data = data.setIm(attr_name, res);
			}
			return new_data;
		};
		var new_item = f(attrs, item, new_value, f);
		return new_item;
	},
	/**
	 * Returns value
	 * @param var value
	 * @param var def_val
	 * @param var obj
	 * @return var
	 */
	to: function(v, o)
	{
		var ctx = null;
		var e = "";
		if (e == "mixed" || e == "primitive" || e == "var" || e == "fn" || e == "callback")
		{
			return v;
		}
		if (e == "bool")
		{
			return this.toBool(v);
		}
		else if (e == "string")
		{
			return this.toString(v);
		}
		else if (e == "int")
		{
			return this.toInt(v);
		}
		else if (e == "float")
		{
			return this.toFloat(v);
		}
		else if (Runtime.rtl.is_instanceof(v, e))
		{
			return v;
		}
		return v;
	},
	/**
	 * Convert monad by type
	 */
	m_to: function(type_value, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (m) => 
		{
			return new Runtime.Monad((m.err == null) ? (this.convert(m.val, type_value, def_value)) : (def_value));
		};
	},
	/**
	 * Convert monad to default value
	 */
	m_def: function(def_value)
	{
		if (def_value == undefined) def_value = null;
		return (m) => 
		{
			return (m.err != null || m.val === null) ? (new Runtime.Monad(def_value)) : (m);
		};
	},
	/**
	 * Returns value if value instanceof type_value, else returns def_value
	 * @param var value
	 * @param string type_value
	 * @param var def_value
	 * @param var type_template
	 * @return var
	 */
	convert: function(v, t, d)
	{
		if (d == undefined) d = null;
		if (v === null)
		{
			return d;
		}
		if (t == "mixed" || t == "primitive" || t == "var" || t == "fn" || t == "callback")
		{
			return v;
		}
		if (t == "bool" || t == "boolean")
		{
			return this.toBool(v);
		}
		else if (t == "string")
		{
			return this.toString(v);
		}
		else if (t == "int")
		{
			return this.toInt(v);
		}
		else if (t == "float" || t == "double")
		{
			return this.toFloat(v);
		}
		else if (this.is_instanceof(v, t))
		{
			return v;
		}
		return this.toObject(v, t, d);
	},
	/**
	 * Returns true if value instanceof tp
	 * @param var value
	 * @param string tp
	 * @return bool
	 */
	checkValue: function(value, tp)
	{
		if (tp == "int")
		{
			return this.isInt(value);
		}
		if (tp == "float" || tp == "double")
		{
			return this.isDouble(value);
		}
		if (tp == "string")
		{
			return this.isString(value);
		}
		if (tp == "bool" || tp == "boolean")
		{
			return this.isBoolean(value);
		}
		if (Runtime.rtl.is_instanceof(value, tp))
		{
			return true;
		}
		return false;
	},
	/**
	 * Return true if value is empty
	 * @param var value
	 * @return bool
	 */
	isEmpty: function(value)
	{
		return !this.exists(value) || value === null || value === "" || value === false || value === 0;
	},
	/**
	 * Return true if value is exists
	 * @param var value
	 * @return bool
	 */
	exists: function(value)
	{
		return (value != null) && (value != undefined);
	},
	/**
	 * Returns true if value is scalar value
	 * @return bool 
	 */
	isScalarValue: function(value)
	{
		if (value == null)
		{
			return true;
		}
		if (Runtime.rtl.isString(value))
		{
			return true;
		}
		if (Runtime.rtl.isNumber(value))
		{
			return true;
		}
		if (Runtime.rtl.isBoolean(value))
		{
			return true;
		}
		return false;
	},
	/**
	 * Returns true if value is scalar array
	 * @return bool
	 */
	isArray: function(value)
	{
		if (value instanceof Runtime.Collection)
		{
			return true;
		}
		if (value instanceof Array) return true;
		return false;
	},
	/**
	 * Return true if value is boolean
	 * @param var value
	 * @return bool
	 */
	isBoolean: function(value)
	{
		if (value === false || value === true)
		{
			return true;
		}
		return false;
	},
	/**
	 * Return true if value is boolean
	 * @param var value
	 * @return bool
	 */
	isBool: function(value)
	{
		return this.isBoolean(value);
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isInt: function(value)
	{
		if (typeof value != "number") return false;
		if (value % 1 !== 0) return false;
		return true;
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isDouble: function(value)
	{
		if (typeof value == "number") return true;
		return false;
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isNumber: function(value)
	{
		if (typeof value == "number") return true;
		return false;
	},
	/**
	 * Return true if value is string
	 * @param var value
	 * @return bool
	 */
	isString: function(value)
	{
		if (typeof value == 'string') return true;
		else if (value instanceof String) return true;
		return false;
	},
	/**
	 * Return true if value is function
	 * @param var value
	 * @return bool
	 */
	isFn: function(value)
	{
		if (typeof(value) == 'function') return true;
		return false;
	},
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	toString: function(value)
	{
		var _StringInterface = use("Runtime.Interfaces.StringInterface");
		
		if (value === null) return "";
		if (typeof value == 'string') return value;
		if (value instanceof String) return "" + value;
		if (this.is_implements(null, value, _StringInterface)) return value.toString();
		return ""+value;
	},
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	toStr: function(value)
	{
		return this.toString(value);
	},
	/**
	 * Convert value to int
	 * @param var value
	 * @return int
	 */
	toInt: function(val)
	{
		var res = parseInt(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return 0;
	},
	/**
	 * Convert value to boolean
	 * @param var value
	 * @return bool
	 */
	toBool: function(val)
	{
		var res = false;
		if (val == false || val == 'false') return false;
		if (val == true || val == 'true') return true;
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return false;
	},
	/**
	 * Convert value to float
	 * @param var value
	 * @return float
	 */
	toFloat: function(val)
	{
		var res = parseFloat(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return 0;
	},
	/**
	 * Convert to object
	 */
	toObject: function(v, t, d)
	{
		if (d == undefined) d = null;
		if (this.is_instanceof(v, t))
		{
			return v;
		}
		if (t == "Runtime.Collection")
		{
			return Runtime.Collection.from(v);
		}
		if (t == "Runtime.Vector")
		{
			return Runtime.Vector.from(v);
		}
		if (t == "Runtime.Dict")
		{
			return Runtime.Dict.from(v);
		}
		if (t == "Runtime.Map")
		{
			return Runtime.Map.from(v);
		}
		try
		{
			var newInstance = this.method(t, "newInstance");
			return newInstance(v);
		}
		catch (_ex)
		{
			if (true)
			{
				var e = _ex;
			}
			else
			{
				throw _ex;
			}
		}
		return d;
	},
	/**
	 * Round up
	 * @param double value
	 * @return int
	 */
	ceil: function(value)
	{
		return Math.ceil(value);
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	floor: function(value)
	{
		return Math.floor(value);
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	round: function(value)
	{
		return Math.round(value);
	},
	_memorizeValidHKey: function(hkey, key)
	{
	},
	/**
	 * Clear memorize cache
	 */
	_memorizeClear: function()
	{
		this._memorize_cache = null;
	},
	/**
	 * Returns cached value
	 */
	_memorizeValue: function(name, args)
	{
		if (this._memorize_cache == null) return this._memorize_not_found;
		if (this._memorize_cache[name] == undefined) return this._memorize_not_found;
		var arr = this._memorize_cache[name];
		var sz = args.length;
		for (var i=0; i<sz; i++)
		{
			var key = args[i];
			var hkey = null;
			if (key != null && typeof key == 'object')
			{
				if (key.__uq__ != undefined) hkey = key.__uq__;
				else return this._memorize_not_found;
			}
			else if (typeof key == 'string') hkey = "__s_" + key;
			else hkey = key;
			if (i == sz - 1)
			{
				if (arr[hkey] == undefined) return this._memorize_not_found;
				return arr[hkey];
			}
			else
			{
				if (arr[hkey] == undefined) arr[hkey] = {};
				arr = arr[hkey];
			}
		}
		
		return this._memorize_not_found;
	},
	/**
	 * Returns cached value
	 */
	_memorizeSave: function(name, args, value)
	{
		if (this._memorize_cache == null) this._memorize_cache = {};
		if (this._memorize_cache[name] == undefined) this._memorize_cache[name] = {};
		var arr = this._memorize_cache[name];
		var sz = args.length;
		for (var i=0; i<sz; i++)
		{
			var key = args[i];
			var hkey = null;
			if (key != null && typeof key == 'object')
			{
				if (key.__uq__ != undefined) hkey = key.__uq__;
				else hkey = null;
			}
			else if (typeof key == 'string') hkey = "__s_" + key;
			else hkey = key;
			if (i == sz - 1)
			{
				arr[hkey] = value;
			}
			else
			{
				if (arr[hkey] == undefined) arr[hkey] = {};
				arr = arr[hkey];
			}
		}
	},
	/* ================ Dirty functions ================ */
	/**
	 * Sleep in ms
	 */
	sleep: async function(time)
	{
		await new Promise((f, e) => setTimeout(f, time));
	},
	/**
	 * Sleep in microseconds
	 */
	usleep: async function(time)
	{
		await new Promise((f, e) => setTimeout(f, Math.round(time / 1000)));
	},
	/**
	 * Returns unique value
	 * @param bool flag If true returns as text. Default true
	 * @return string
	 */
	unique: function(flag)
	{
		if (flag == undefined) flag = true;
		if (flag == undefined) flag = true;
		if (flag)
			return "" + (new Date).getTime() + Math.floor((Math.random() * 899999 + 100000));
		return Symbol();
	},
	/**
	 * Generate uuid
	 */
	uid: function()
	{
	},
	/**
	 * Generate timestamp based uuid
	 */
	time_uid: function()
	{
	},
	/**
	 * Returns random value x, where 0 <= x < 1
	 * @return double
	 */
	urandom: function()
	{
		if (
			window != undefined && window.crypto != undefined &&
			window.crypto.getRandomValues != undefined)
		{
			var s = new Uint32Array(1);
			window.crypto.getRandomValues(s);
			return s[0] / 4294967296;
		}
		
		return Math.random();
	},
	/**
	 * Returns random value x, where a <= x <= b
	 * @param int a
	 * @param int b
	 * @return int
	 */
	random: function(a, b)
	{
		if (
			window != undefined && window.crypto != undefined &&
			window.crypto.getRandomValues != undefined)
		{
			var s = new Uint32Array(1);
			window.crypto.getRandomValues(s);
			return Math.floor(s[0] / 4294967296 * (b - a + 1) + a);
		}
		
		return Math.floor(Math.random() * (b - a + 1) + a);
	},
	/**
	 * Generate random string
	 * @var len - string length
	 * @var spec
	 *   - a - alpha
	 *   - n - numberic
	 * @return string
	 */
	random_string: function(len, spec)
	{
		if (len == undefined) len = 8;
		if (spec == undefined) spec = "aun";
		var s = "";
		var res = "";
		var sz = Runtime.rs.strlen(spec);
		for (var i = 0;i < sz;i++)
		{
			var ch = Runtime.rtl.get(spec, i);
			if (ch == "a")
			{
				s += Runtime.rtl.toStr("qwertyuiopasdfghjklzxcvbnm");
			}
			if (ch == "u")
			{
				s += Runtime.rtl.toStr("QWERTYUIOPASDFGHJKLZXCVBNM");
			}
			else if (ch == "n")
			{
				s += Runtime.rtl.toStr("0123456789");
			}
			else if (ch == "s")
			{
				s += Runtime.rtl.toStr("!@#$%^&*()-_+='\":;'.,<>?/|~");
			}
		}
		var sz_s = Runtime.rs.strlen(s);
		for (var i = 0;i < len;i++)
		{
			var code = this.random(0, sz_s - 1);
			res += Runtime.rtl.toStr(Runtime.rtl.get(s, code));
		}
		return res;
	},
	/**
	 * Returns current unix time in seconds
	 * @return int
	 */
	time: function()
	{
		return Math.round((new Date()).getTime() / 1000);
	},
	/**
	 * Returns unix timestamp
	 */
	utime: function()
	{
		return (new Date()).getTime() * 1000;
	},
	/**
	 * Returns global context
	 * @return Context
	 */
	getContext: function()
	{
		if (!Runtime.rtl._global_context) return new Runtime.Context();
		return Runtime.rtl._global_context;
	},
	/**
	 * Set global context
	 * @param Context context
	 */
	setContext: function(context)
	{
		use("Runtime.rtl")._global_context = context;
		window['global_context'] = context;
		return context;
	},
	/**
	 * Run context
	 * @param Dict d
	 */
	createContext: async function(d)
	{
		var ctx = null;
		var context = Runtime.Context.create(d);
		/* Init context */
		context = await context.init();
		/* Setup global context */
		this.setContext(context);
		return Promise.resolve(context);
	},
	/**
	 * Run application
	 * @param Dict d
	 */
	runApp: async function(modules, class_name, d)
	{
		if (d == undefined) d = null;
		if (d == null)
		{
			d = Runtime.Dict.from({});
		}
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["entry_point"]), class_name);
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["modules"]), modules);
		try
		{
			let context = await Runtime.rtl.createContext(d);
			await context.start(context);
			await context.run(context);
		}
		catch (e)
		{
			console.log(e.stack);
		}
	},
	/* ============================= Runtime Utils Functions ============================= */
	/**
	 * Returns parents class names
	 * @return Vector<string>
	 */
	getParents: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = new Runtime.Vector();
		while (class_name != "")
		{
			res.pushValue(class_name);
			class_name = this.methodApply(class_name, "getParentClassName");
		}
		var __memorize_value = res.toCollection();
		Runtime.rtl._memorizeSave("Runtime.rtl.getParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns class annotations
	 */
	getClassAnnotations: function(class_name, res)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getClassAnnotations", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (res == undefined) res = null;
		if (res == null)
		{
			res = Runtime.Collection.from([]);
		}
		var info = this.methodApply(class_name, "getClassInfo");
		var __v0 = new Runtime.Monad(Runtime.rtl.get(info, "annotations"));
		__v0 = __v0.monad(Runtime.rtl.m_to("Runtime.Collection", Runtime.Collection.from([])));
		var arr = __v0.value();
		var __memorize_value = res.concat(arr);
		Runtime.rtl._memorizeSave("Runtime.rtl.getClassAnnotations", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns class annotations with parents
	 */
	getClassAnnotationsWithParents: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getClassAnnotationsWithParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = Runtime.Dict.from({});
		var parents = this.getParents(class_name);
		for (var i = 0;i < parents.count();i++)
		{
			var parent_class_name = Runtime.rtl.get(parents, i);
			res = this.getClassAnnotations(parent_class_name, res);
		}
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getClassAnnotationsWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns field info
	 */
	getFieldInfo: function(class_name, field_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getFieldInfo", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = this.methodApply(class_name, "getFieldInfoByName", Runtime.Collection.from([field_name]));
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getFieldInfo", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns field info
	 */
	getFieldInfoWithParents: function(class_name, field_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getFieldInfoWithParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var parents = this.getParents(class_name);
		for (var i = 0;i < parents.count();i++)
		{
			var parent_class_name = Runtime.rtl.get(parents, i);
			var res = this.methodApply(parent_class_name, "getFieldInfoByName", Runtime.Collection.from([field_name]));
			if (res != null)
			{
				var __memorize_value = res;
				Runtime.rtl._memorizeSave("Runtime.rtl.getFieldInfoWithParents", arguments, __memorize_value);
				return __memorize_value;
			}
		}
		var __memorize_value = null;
		Runtime.rtl._memorizeSave("Runtime.rtl.getFieldInfoWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns fields of class
	 */
	getFields: function(class_name, flag)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getFields", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (flag == undefined) flag = 255;
		var names = new Runtime.Vector();
		var parents = this.getParents(class_name);
		for (var i = 0;i < parents.count();i++)
		{
			var parent_class_name = Runtime.rtl.get(parents, i);
			var item_fields = this.methodApply(parent_class_name, "getFieldsList", Runtime.Collection.from([flag]));
			if (item_fields != null)
			{
				names.appendVector(item_fields);
			}
		}
		var __memorize_value = names.toCollection().removeDuplicatesIm();
		Runtime.rtl._memorizeSave("Runtime.rtl.getFields", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns fields annotations
	 */
	getFieldsAnnotations: function(class_name, res)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getFieldsAnnotations", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (res == undefined) res = null;
		if (res == null)
		{
			res = Runtime.Dict.from({});
		}
		var methods = this.methodApply(class_name, "getFieldsList", Runtime.Collection.from([255]));
		for (var i = 0;i < methods.count();i++)
		{
			var method_name = Runtime.rtl.get(methods, i);
			var info = this.methodApply(class_name, "getFieldInfoByName", Runtime.Collection.from([method_name]));
			var annotations = Runtime.rtl.get(info, "annotations");
			var __v0 = new Runtime.Monad(Runtime.rtl.get(res, method_name));
			__v0 = __v0.monad(Runtime.rtl.m_to("Runtime.Collection", Runtime.Collection.from([])));
			var arr = __v0.value();
			res = Runtime.rtl.setAttr(res, Runtime.Collection.from([method_name]), arr.concat(annotations));
		}
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getFieldsAnnotations", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns fields annotations with parents
	 */
	getFieldsAnnotationsWithParents: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getFieldsAnnotationsWithParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = Runtime.Dict.from({});
		var parents = this.getParents(class_name);
		for (var i = 0;i < parents.count();i++)
		{
			var parent_class_name = Runtime.rtl.get(parents, i);
			res = this.getFieldsAnnotations(parent_class_name, res);
		}
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getFieldsAnnotationsWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns methods annotations
	 */
	getMethodsAnnotations: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getMethodsAnnotations", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = Runtime.Dict.from({});
		var methods = this.methodApply(class_name, "getMethodsList", Runtime.Collection.from([255]));
		for (var i = 0;i < methods.count();i++)
		{
			var method_name = Runtime.rtl.get(methods, i);
			var info = this.methodApply(class_name, "getMethodInfoByName", Runtime.Collection.from([method_name]));
			var annotations = Runtime.rtl.get(info, "annotations");
			var __v0 = new Runtime.Monad(Runtime.rtl.get(res, method_name));
			__v0 = __v0.monad(Runtime.rtl.m_to("Runtime.Collection", Runtime.Collection.from([])));
			var arr = __v0.value();
			res = Runtime.rtl.setAttr(res, Runtime.Collection.from([method_name]), arr.concat(annotations));
		}
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getMethodsAnnotations", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns methods annotations with parents
	 */
	getMethodsAnnotationsWithParents: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getMethodsAnnotationsWithParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = Runtime.Dict.from({});
		var parents = this.getParents(class_name);
		for (var i = 0;i < parents.count();i++)
		{
			var parent_class_name = Runtime.rtl.get(parents, i);
			res = res.concatIm(this.getMethodsAnnotations(parent_class_name));
		}
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getMethodsAnnotationsWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/* ============================= Serialization Functions ============================= */
	ObjectToNative: function(value, force_class_name)
	{
		if (force_class_name == undefined) force_class_name = true;
		var value1 = this.ObjectToPrimitive(value, force_class_name);
		var value2 = this.PrimitiveToNative(value1);
		return value2;
	},
	NativeToObject: function(value, allow_class_name)
	{
		if (allow_class_name == undefined) allow_class_name = true;
		var value1 = this.NativeToPrimitive(value);
		var value2 = this.PrimitiveToObject(value1, allow_class_name);
		return value2;
	},
	/**
	 * Returns object to primitive value
	 * @param var obj
	 * @return var
	 */
	ObjectToPrimitive: function(obj, force_class_name)
	{
		if (force_class_name == undefined) force_class_name = true;
		if (obj === null)
		{
			return null;
		}
		if (Runtime.rtl.isScalarValue(obj))
		{
			return obj;
		}
		if (obj instanceof Runtime.Collection)
		{
			return obj.map((value) => 
			{
				return this.ObjectToPrimitive(value, force_class_name);
			});
		}
		if (obj instanceof Runtime.Dict)
		{
			obj = obj.map((value, key) => 
			{
				return this.ObjectToPrimitive(value, force_class_name);
			});
			return obj.toDict();
		}
		if (obj instanceof Runtime.Date)
		{
			return obj;
		}
		if (obj instanceof Runtime.DateTime)
		{
			return obj;
		}
		if (obj instanceof Runtime.BaseStruct)
		{
			var values = new Runtime.Map();
			var names = Runtime.rtl.getFields(obj.constructor.getClassName());
			for (var i = 0;i < names.count();i++)
			{
				var variable_name = names.item(i);
				var value = obj.get(variable_name, null);
				var value = this.ObjectToPrimitive(value, force_class_name);
				values.setValue(variable_name, value);
			}
			if (force_class_name)
			{
				values.setValue("__class_name__", obj.constructor.getClassName());
			}
			return values.toDict();
		}
		return null;
	},
	/**
	 * Returns object to primitive value
	 * @param SerializeContainer container
	 * @return var
	 */
	PrimitiveToObject: function(obj, allow_class_name)
	{
		if (allow_class_name == undefined) allow_class_name = true;
		if (obj === null)
		{
			return null;
		}
		if (Runtime.rtl.isScalarValue(obj))
		{
			return obj;
		}
		if (obj instanceof Runtime.Collection)
		{
			var res = new Runtime.Vector();
			for (var i = 0;i < obj.count();i++)
			{
				var value = obj.item(i);
				value = this.PrimitiveToObject(value, allow_class_name);
				res.pushValue(value);
			}
			return res.toCollection();
		}
		if (obj instanceof Runtime.Dict)
		{
			var res = new Runtime.Map();
			var keys = obj.keys();
			for (var i = 0;i < keys.count();i++)
			{
				var key = keys.item(i);
				var value = obj.item(key);
				value = this.PrimitiveToObject(value, allow_class_name);
				res.setValue(key, value);
			}
			if (!res.has("__class_name__"))
			{
				return res.toDict();
			}
			if (res.item("__class_name__") == "Runtime.Map" || res.item("__class_name__") == "Runtime.Dict")
			{
				res.remove("__class_name__");
				return res.toDict();
			}
			if (!allow_class_name)
			{
				return res.toDict();
			}
			var class_name = res.item("__class_name__");
			if (!Runtime.rtl.class_exists(class_name))
			{
				return null;
			}
			if (!Runtime.rtl.class_implements(class_name, "Runtime.SerializeInterface"))
			{
				return null;
			}
			/* Assign values */
			var obj = new Runtime.Map();
			var names = Runtime.rtl.getFields(class_name);
			for (var i = 0;i < names.count();i++)
			{
				var variable_name = names.item(i);
				if (variable_name != "__class_name__")
				{
					var value = res.get(variable_name, null);
					obj.setValue(variable_name, value);
				}
			}
			/* New instance */
			var instance = Runtime.rtl.newInstance(class_name, Runtime.Collection.from([obj]));
			return instance;
		}
		if (obj instanceof Runtime.Date)
		{
			return obj;
		}
		if (obj instanceof Runtime.DateTime)
		{
			return obj;
		}
		return null;
	},
	NativeToPrimitive: function(value)
	{
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Date = use("Runtime.Date");
		var _DateTime = use("Runtime.DateTime");
		var _Dict = use("Runtime.Dict");
		
		if (value === null)
			return null;
		
		if (Array.isArray(value))
		{
			var new_value = _Collection.from(value);
			new_value = new_value.map((val)=>{
				return Runtime.rtl.NativeToPrimitive(val);
			});
			return new_value;
		}
		if (typeof value == 'object')
		{
			if (value["__class_name__"] == "Runtime.Date")
			{
				var new_value = _Date.from(value);
				return new_value;
			}
			if (value["__class_name__"] == "Runtime.DateTime")
			{
				var new_value = _DateTime.from(value);
				return new_value;
			}
			var new_value = _Dict.from(value);
			new_value = new_value.map((val, key)=>{
				return Runtime.rtl.NativeToPrimitive(val);
			});
			return new_value;
		}
		
		return value;
	},
	PrimitiveToNative: function(value)
	{
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _DateTime = use("Runtime.DateTime");
		var _Date = use("Runtime.Date");
		var _Dict = use("Runtime.Dict");
		
		if (value === null)
			return null;
		
		if (value instanceof _Date)
		{
			value = value.toDict().setIm("__class_name__", "Runtime.Date");
		}
		else if (value instanceof _DateTime)
		{
			value = value.toDict().setIm("__class_name__", "Runtime.DateTime");
		}
		
		if (value instanceof _Collection)
		{
			var arr = [];
			value.each((v)=>{
				arr.push( Runtime.rtl.PrimitiveToNative(v) );
			});
			return arr;
		}
		if (value instanceof _Dict)
		{
			var obj = {};
			value.each((v, k)=>{
				obj[k] = Runtime.rtl.PrimitiveToNative(v);
			});
			return obj;
		}
		return value;
	},
	/**
	 * Json encode serializable values
	 * @param serializable value
	 * @param SerializeContainer container
	 * @return string 
	 */
	json_encode: function(value, flags, convert)
	{
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Dict = use("Runtime.Dict");
		var _Date = use("Runtime.Date");
		var _DateTime = use("Runtime.DateTime");
		
		if (convert) value = _rtl.ObjectToPrimitive(value);
		return JSON.stringify(value, (key, value) => {
			if (value instanceof _Date) value = value.toDict().setIm("__class_name__", "Runtime.Date");
			if (value instanceof _DateTime) value = value.toDict().setIm("__class_name__", "Runtime.DateTime");
			if (value instanceof _Collection) return value;
			if (value instanceof _Dict) return value.toObject();
			if (_rtl.isScalarValue(value)) return value;
			return null;
		});
	},
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return var 
	 */
	json_decode: function(obj, allow_class_name)
	{
		if (allow_class_name == undefined) allow_class_name = true;
		try{
			
			var _rtl = use("Runtime.rtl");
			var _Utils = use("Runtime.RuntimeUtils");
			var _Collection = use("Runtime.Collection");
			var _Dict = use("Runtime.Dict");
			var res = null;
			try
			{
				res = JSON.parse(obj, function (key, value){
					if (value == null) return value;
					if (Array.isArray(value)){
						return _Collection.from(value);
					}
					if (typeof value == 'object'){
						return _Dict.from(value);
					}
					return value;
				});
			}
			catch (e)
			{
				res = null;
			}
			return this.PrimitiveToObject(res, allow_class_name);
		}
		catch(e){
			throw e;
		}
		return null;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.rtl";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"defClass",
			"find_class",
			"is_instanceof",
			"is_implements",
			"class_exists",
			"class_implements",
			"getInterfaces",
			"method_exists",
			"newInstance",
			"method",
			"apply",
			"applyAsync",
			"methodApply",
			"applyMethod",
			"callMethod",
			"methodApplyAsync",
			"applyMethodAsync",
			"callMethodAsync",
			"get",
			"attr",
			"setAttr",
			"to",
			"m_to",
			"m_def",
			"convert",
			"checkValue",
			"isEmpty",
			"exists",
			"isScalarValue",
			"isArray",
			"isBoolean",
			"isBool",
			"isInt",
			"isDouble",
			"isNumber",
			"isString",
			"isFn",
			"toString",
			"toStr",
			"toInt",
			"toBool",
			"toFloat",
			"toObject",
			"ceil",
			"floor",
			"round",
			"_memorizeValidHKey",
			"_memorizeClear",
			"_memorizeValue",
			"_memorizeSave",
			"sleep",
			"usleep",
			"unique",
			"uid",
			"time_uid",
			"urandom",
			"random",
			"random_string",
			"time",
			"utime",
			"trace",
			"getContext",
			"setContext",
			"createContext",
			"runApp",
			"getParents",
			"getClassAnnotations",
			"getClassAnnotationsWithParents",
			"getFieldInfo",
			"getFieldInfoWithParents",
			"getFields",
			"getFieldsAnnotations",
			"getFieldsAnnotationsWithParents",
			"getMethodsAnnotations",
			"getMethodsAnnotationsWithParents",
			"ObjectToNative",
			"NativeToObject",
			"ObjectToPrimitive",
			"PrimitiveToObject",
			"NativeToPrimitive",
			"PrimitiveToNative",
			"json_encode",
			"json_decode",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.rtl);
window["Runtime.rtl"] = Runtime.rtl;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.rtl;
var use = function(s){return Runtime.rtl.find_class(s);}
if (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined')
	Runtime.rtl._memorize_not_found = {'s':'memorize_key_not_found','id':Symbol()};
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
/* Lambda Functions */
Runtime.lib = function()
{
};
Object.assign(Runtime.lib.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.lib)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Runtime.lib,
{
	/**
	 * Check object is istance
	 */
	isInstance: function(class_name)
	{
		return (item) => 
		{
			return Runtime.rtl.is_instanceof(item, class_name);
		};
	},
	/**
	 * Check object is implements interface
	 */
	isImplements: function(class_name)
	{
		return (item) => 
		{
			return Runtime.rtl.is_implements(item, class_name);
		};
	},
	/**
	 * Check class is implements interface
	 */
	classImplements: function(class_name)
	{
		return (item) => 
		{
			return Runtime.rtl.class_implements(item, class_name);
		};
	},
	/**
	 * Create struct
	 */
	createStruct: function(class_name)
	{
		return (data) => 
		{
			return Runtime.rtl.newInstance(class_name, Runtime.Collection.from([data]));
		};
	},
	/**
	 * Equal two struct by key
	 */
	equal: function(value)
	{
		return (item) => 
		{
			return item == value;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalNot: function(value)
	{
		return (item) => 
		{
			return item != value;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalAttr: function(key, value)
	{
		return (item1) => 
		{
			return (item1 != null) ? (Runtime.rtl.attr(item1, key) == value) : (false);
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalNotAttr: function(key, value)
	{
		return (item1) => 
		{
			return (item1 != null) ? (Runtime.rtl.attr(item1, key) != value) : (false);
		};
	},
	equalAttrNot: function(key, value)
	{
		return this.equalNotAttr(key, value);
	},
	/**
	 * Equal attrs
	 */
	equalAttrs: function(search)
	{
		return (item) => 
		{
			var fields = search.keys();
			for (var i = 0;i < fields.count();i++)
			{
				var field_name = Runtime.rtl.get(fields, i);
				if (Runtime.rtl.get(search, field_name) != Runtime.rtl.get(item, field_name))
				{
					return false;
				}
			}
			return true;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalMethod: function(method_name, value)
	{
		return (item1) => 
		{
			if (item1 == null)
			{
				return false;
			}
			var f = Runtime.rtl.method(item1, method_name);
			return f() == value;
		};
	},
	/**
	 * Returns key value of obj
	 */
	get: function(key, def_value)
	{
		return (obj) => 
		{
			return Runtime.rtl.attr(obj, Runtime.Collection.from([key]), def_value);
		};
	},
	/**
	 * Set value
	 */
	set: function(key, value)
	{
		return (obj) => 
		{
			return Runtime.rtl.setAttr(obj, Runtime.Collection.from([key]), value);
		};
	},
	/**
	 * Returns attr of item
	 */
	attr: function(path, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (obj) => 
		{
			return Runtime.rtl.attr(obj, path, def_value);
		};
	},
	/**
	 * Set dict attr
	 */
	setAttr: function(path, value)
	{
		return (obj) => 
		{
			return Runtime.rtl.setAttr(obj, path, value);
		};
	},
	/**
	 * Returns max id from items
	 */
	getMaxIdFromItems: function(items, start)
	{
		if (start == undefined) start = 0;
		return items.reduce((value, item) => 
		{
			return (item.id > value) ? (item.id) : (value);
		}, start);
	},
	/**
	 * Copy object
	 */
	copy: function(d)
	{
		return (item) => 
		{
			return item.copy(d);
		};
	},
	/**
	 * Take dict
	 */
	takeDict: function(fields)
	{
		return (item) => 
		{
			return item.takeDict(fields);
		};
	},
	/**
	 * Map
	 */
	map: function(f)
	{
		return (m) => 
		{
			return m.map(f);
		};
	},
	/**
	 * Filter
	 */
	filter: function(f)
	{
		return (m) => 
		{
			return m.filter(f);
		};
	},
	/**
	 * Intersect
	 */
	intersect: function(arr)
	{
		return (m) => 
		{
			return m.intersect(arr);
		};
	},
	/**
	 * Sort
	 */
	sort: function(f)
	{
		return (m) => 
		{
			return m.sortIm(f);
		};
	},
	/**
	 * Transition
	 */
	transition: function(f)
	{
		return (m) => 
		{
			return m.transition(f);
		};
	},
	/**
	 * Concat
	 */
	concat: function(arr)
	{
		return (m) => 
		{
			return m.concat(arr);
		};
	},
	/**
	 * Sort asc
	 */
	sortAsc: function(a, b)
	{
		return (a > b) ? (1) : ((a < b) ? (-1) : (0));
	},
	/**
	 * Sort desc
	 */
	sortDesc: function(a, b)
	{
		return (a > b) ? (-1) : ((a < b) ? (1) : (0));
	},
	/**
	 * Sort attr
	 */
	sortAttr: function(field_name, f)
	{
		return (a, b) => 
		{
			var a = Runtime.rtl.get(a, field_name);
			var b = Runtime.rtl.get(b, field_name);
			if (f == "asc")
			{
				return (a > b) ? (1) : ((a < b) ? (-1) : (0));
			}
			if (f == "desc")
			{
				return (a > b) ? (-1) : ((a < b) ? (1) : (0));
			}
			return f(a, b);
		};
	},
	/**
	 * Convert monad by type
	 */
	to: function(type_value, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (m) => 
		{
			return new Runtime.Monad((m.err == null) ? (Runtime.rtl.convert(m.value(), type_value, def_value)) : (def_value));
		};
	},
	/**
	 * Convert monad by type
	 */
	default: function(def_value)
	{
		if (def_value == undefined) def_value = null;
		return (m) => 
		{
			return (m.err != null || m.val === null) ? (new Runtime.Monad(def_value)) : (m);
		};
	},
	/**
	 * Set monad new value
	 */
	newValue: function(value, clear_error)
	{
		if (value == undefined) value = null;
		if (clear_error == undefined) clear_error = false;
		return (m) => 
		{
			return (clear_error == true) ? (new Runtime.Monad(value)) : ((m.err == null) ? (new Runtime.Monad(value)) : (m));
		};
	},
	/**
	 * Clear error
	 */
	clearError: function()
	{
		return (m) => 
		{
			return new Runtime.Monad(m.val);
		};
	},
	/**
	 * Returns monad
	 */
	monad: function(m)
	{
		return m;
	},
	/**
	 * Get method from class
	 * @return fn
	 */
	method: function(method_name)
	{
		return (class_name) => 
		{
			return Runtime.rtl.method(class_name, method_name);
		};
	},
	/**
	 * Apply function
	 * @return fn
	 */
	applyMethod: function(method_name, args)
	{
		if (args == undefined) args = null;
		return (class_name) => 
		{
			var f = Runtime.rtl.method(class_name, method_name);
			return Runtime.rtl.apply(f, args);
		};
	},
	/**
	 * Apply async function
	 * @return fn
	 */
	applyMethodAsync: function(method_name, args)
	{
		if (args == undefined) args = null;
		return async (class_name) => 
		{
			var f = Runtime.rtl.method(class_name, method_name);
			return Promise.resolve(await Runtime.rtl.applyAsync(f, args));
		};
	},
	/**
	 * Apply function
	 * @return fn
	 */
	apply: function(f)
	{
		return (value) => 
		{
			return f(value);
		};
	},
	/**
	 * Apply function
	 * @return fn
	 */
	applyAsync: function(f)
	{
		return async (value) => 
		{
			return await f(value);
		};
	},
	/**
	 * Log message
	 * @return fn
	 */
	log: function(message)
	{
		if (message == undefined) message = "";
		return (value) => 
		{
			if (message == "")
			{
				console.log(value);
			}
			else
			{
				console.log(message);
			}
			return value;
		};
	},
	/**
	 * Function or
	 */
	or: function(arr)
	{
		return (item) => 
		{
			for (var i = 0;i < arr.count();i++)
			{
				var f = Runtime.rtl.get(arr, i);
				var res = f(item);
				if (res)
				{
					return true;
				}
			}
			return false;
		};
	},
	/**
	 * Function and
	 */
	and: function(arr)
	{
		return (item) => 
		{
			for (var i = 0;i < arr.count();i++)
			{
				var f = Runtime.rtl.get(arr, i);
				var res = f(item);
				if (!res)
				{
					return false;
				}
			}
			return true;
		};
	},
	/**
	 * Join
	 */
	join: function(ch)
	{
		return (items) => 
		{
			return Runtime.rs.join(ch, items);
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.lib";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"isInstance",
			"isImplements",
			"classImplements",
			"createStruct",
			"equal",
			"equalNot",
			"equalAttr",
			"equalNotAttr",
			"equalAttrNot",
			"equalAttrs",
			"equalMethod",
			"get",
			"set",
			"attr",
			"setAttr",
			"getMaxIdFromItems",
			"copy",
			"takeDict",
			"map",
			"filter",
			"intersect",
			"sort",
			"transition",
			"concat",
			"sortAsc",
			"sortDesc",
			"sortAttr",
			"to",
			"default",
			"newValue",
			"clearError",
			"monad",
			"method",
			"applyMethod",
			"applyMethodAsync",
			"apply",
			"applyAsync",
			"log",
			"or",
			"and",
			"join",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.lib);
window["Runtime.lib"] = Runtime.lib;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.lib;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
/* Math Functions */
Runtime.math = function()
{
};
Object.assign(Runtime.math.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.math)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Runtime.math,
{
	/**
	 * Round double
	 */
	round: function(a)
	{
		return Math.round(a);
	},
	/**
	 * Floor double
	 */
	floor: function(a)
	{
		return Math.floor(a);
	},
	/**
	 * Floor ceil
	 */
	ceil: function(a)
	{
		return Math.ceil(a);
	},
	/**
	 * Returns max
	 */
	max: function(a, b)
	{
		if (a > b)
		{
			return a;
		}
		else
		{
			return b;
		}
	},
	/**
	 * Returns min
	 */
	min: function(a, b)
	{
		if (a < b)
		{
			return a;
		}
		else
		{
			return b;
		}
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.math";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"round",
			"floor",
			"ceil",
			"max",
			"min",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.math);
window["Runtime.math"] = Runtime.math;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.math;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.io = function()
{
};
Object.assign(Runtime.io.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.io)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Runtime.io,
{
	/**
	 * Print message to output
	 */
	print: function(message, new_line, type)
	{
		if (new_line == undefined) new_line = true;
		if (type == undefined) type = "";
		var output = Runtime.rtl.getContext().provider("output");
		output.print(message, new_line, type);
	},
	/**
	 * Print error message to output
	 */
	print_error: function(message)
	{
		var output = Runtime.rtl.getContext().provider("output");
		output.print_error(message);
	},
	/**
	 * Color message to output
	 */
	color: function(color, message)
	{
		var output = Runtime.rtl.getContext().provider("output");
		return output.color(color, message);
	},
	/**
	 * Log message
	 */
	log: function(type, message)
	{
		var p = Runtime.rtl.getContext().provider("log");
		p.log(type, message);
	},
	/**
	 * Read line from input
	 */
	input: function()
	{
		var input = Runtime.rtl.getContext().provider("input");
		return input.input();
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.io";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"print",
			"print_error",
			"color",
			"log",
			"input",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.io);
window["Runtime.io"] = Runtime.io;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.io;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.re = function()
{
};
Object.assign(Runtime.re.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.re)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Runtime.re,
{
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - regular expression
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение
	 * @return Collection<string>
	 */
	split: function(delimiter, s, limit)
	{
		if (limit == undefined) limit = -1;
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		var delimiter = new RegExp(delimiter, "g");
		if (!_rtl.exists(limit))
		{
			arr = s.split(delimiter);
		}
		else
		{
			arr = s.split(delimiter, limit);
		}
		return _Collection.from(arr);
	},
	/**
	 * Search regular expression
	 * @param string r regular expression
	 * @param string s string
	 * @return bool
	 */
	match: function(r, s, pattern)
	{
		if (pattern == undefined) pattern = "";
		pattern = "g" + pattern;
		return s.match( new RegExp(r, pattern) ) != null;
	},
	/**
	 * Search regular expression
	 * @param string r regular expression
	 * @param string s string
	 * @return Vector result
	 */
	matchAll: function(r, s, pattern)
	{
		if (pattern == undefined) pattern = "";
		pattern = "g" + pattern;
		
		var arr = [];
		var r = new RegExp(r, pattern);
		
		if (s.matchAll == undefined)
		{
			while ((m = r.exec(s)) !== null)
			{
				arr.push(m);
			}
		}
		else arr = [...s.matchAll(r)];
		
		if (arr.length == 0) return null;
		return Runtime.Collection.from( arr.map( (v) => Runtime.Collection.from(v) ) );
		return null;
	},
	/**
	 * Replace with regular expression
	 * @param string r - regular expression
	 * @param string replace - new value
	 * @param string s - replaceable string
	 * @return string
	 */
	replace: function(r, replace, s, pattern)
	{
		if (pattern == undefined) pattern = "";
		pattern = "g" + pattern;
		return s.replace(new RegExp(r, pattern), replace);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.re";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"split",
			"match",
			"matchAll",
			"replace",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.re);
window["Runtime.re"] = Runtime.re;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.re;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.rs = function()
{
};
Object.assign(Runtime.rs.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.rs)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Runtime.rs,
{
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	strlen: function(s)
	{
		return use("Runtime.rtl").toStr(s).length;
	},
	/**
	 * Returns substring
	 * @param string s The string
	 * @param int start
	 * @param int length
	 * @return string
	 */
	substr: function(s, start, length)
	{
		if (length == undefined) length = null;
		var _rtl = use("Runtime.rtl");
		var _rs = use("Runtime.rs");
		if (start < 0) start = s.length + start;
		if (length === null){
			return _rtl.toStr(s).substring(start);
		}
		var end = start + length;
		if (length < 0){
			var sz = _rs.strlen(s);
			end = sz + length;
		}
		return _rtl.toStr(s).substring(start, end);
	},
	/**
	 * Returns char from string at the position
	 * @param string s The string
	 * @param int pos The position
	 * @return string
	 */
	charAt: function(s, pos)
	{
		return this.substr(s, pos, 1);
	},
	/**
	 * Returns ASCII symbol by code
	 * @param int code
	 */
	chr: function(code)
	{
		return String.fromCharCode(code);
	},
	/**
	 * Returns ASCII symbol code
	 * @param char ch
	 */
	ord: function(ch)
	{
		return use("Runtime.rtl").toStr(ch).charCodeAt(0);
	},
	/**
	 * Convert string to lower case
	 * @param string s
	 * @return string
	 */
	strtolower: function(s)
	{
		return use("Runtime.rtl").toStr(s).toLowerCase();
	},
	/**
	 * Convert string to upper case
	 * @param string s
	 * @return string
	 */
	strtoupper: function(s)
	{
		return use("Runtime.rtl").toStr(s).toUpperCase();
	},
	/**
	 * Convert string to lower case
	 * @param string s
	 * @return string
	 */
	lower: function(s)
	{
		return use("Runtime.rtl").toStr(s).toLowerCase();
	},
	/**
	 * Convert string to upper case
	 * @param string s
	 * @return string
	 */
	upper: function(s)
	{
		return use("Runtime.rtl").toStr(s).toUpperCase();
	},
	/**
	 * Заменяет одну строку на другую
	 */
	replace: function(search, item, s)
	{
		return s.replace(new RegExp(search, "g"), item);
	},
	/**
	 * Возвращает повторяющуюся строку
	 * @param {string} s - повторяемая строка
	 * @param {integer} n - количество раз, которые нужно повторить строку s
	 * @return {string} строка
	 */
	str_repeat: function(s, n)
	{
		if (n <= 0) return "";
		var res = '';
		for (var i=0; i < n; i++){
			res += s;
		}
		return res;
	},
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - regular expression
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение
	 * @return Collection<string>
	 */
	split: function(delimiter, s, limit)
	{
		if (limit == undefined) limit = -1;
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		if (!_rtl.exists(limit))
			arr = s.split(delimiter);
		arr = s.split(delimiter, limit);
		return _Collection.from(arr);
	},
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Collection<string>
	 */
	splitArr: function(delimiters, s, limit)
	{
		if (limit == undefined) limit = -1;
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		var delimiter = new RegExp("[" + delimiters.join("") + "]", "g");
		if (!_rtl.exists(limit))
		{
			arr = s.split(delimiter);
		}
		else
		{
			arr = s.split(delimiter, limit);
		}
		return _Collection.from(arr);
	},
	/**
	 * Соединяет строки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	join: function(ch, arr)
	{
		if (arr == null) return "";
		return Array.prototype.join.call(arr, ch);
	},
	/**
	 * Join
	 */
	join_path: function(arr)
	{
		var path = this.join("/", arr);
		path = Runtime.re.replace("\\/+", "/", path);
		path = Runtime.re.replace("\\/\\.\\/", "/", path);
		path = Runtime.re.replace("\\/+$", "", path);
		return path;
	},
	/**
	 * Удаляет лишние символы слева и справа
	 * @param {string} s - входная строка
	 * @return {integer} новая строка
	 */
	trim: function(s, ch)
	{
		if (ch == undefined) ch = "";
		if (ch == undefined) ch = "";
		
		s = use("Runtime.rtl").toStr(s);
		
		if (ch == ""){
			return s.trim();
		}
		return s.replace(new RegExp("^[" + ch + "]+", "g"),"")
			.replace(new RegExp("[" + ch + "]+$", "g"),"")
		;
	},
	/**
	 * Escape HTML special chars
	 * @param string s
	 * @return string
	 */
	htmlEscape: function(s)
	{
		if (s instanceof Runtime.Collection) return s;
		var obj = {
			"<":"&lt;",
			">": "&gt;", 
			"&": "&amp;",
			'"': '&quot;',
			"'": '&#39;',
			'`': '&#x60;',
			'=': '&#x3D;'
		};
		return (new String(s)).replace(/[<>&"'`=]/g, function(v){ return obj[v]; });
	},
	escapeHtml: function(s)
	{
		return this.htmlEscape(s);
	},
	/**
	 * Разбивает путь файла на составляющие
	 * @param {string} filepath путь к файлу
	 * @return {json} Объект вида:
	 *         dirname    - папка, в которой находиться файл
	 *         basename   - полное имя файла
	 *         extension  - расширение файла
	 *         filename   - имя файла без расширения
	 */
	pathinfo: function(filepath)
	{
		var arr1 = this.explode(".", filepath).toVector();
		var arr2 = this.explode("/", filepath).toVector();
		var filepath = filepath;
		var extension = arr1.popValue();
		var basename = arr2.popValue();
		var dirname = this.join("/", arr2);
		var ext_length = this.strlen(extension);
		if (ext_length > 0)
		{
			ext_length++;
		}
		var filename = this.substr(basename, 0, -1 * ext_length);
		return Runtime.Dict.from({"filepath":filepath,"extension":extension,"basename":basename,"dirname":dirname,"filename":filename});
	},
	/**
	 * Возвращает имя файла без расширения
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	filename: function(filepath)
	{
		var ret = this.pathinfo(filepath);
		var res = Runtime.rtl.get(ret, "basename");
		var ext = Runtime.rtl.get(ret, "extension");
		if (ext != "")
		{
			var sz = 0 - Runtime.rs.strlen(ext) - 1;
			res = Runtime.rs.substr(res, 0, sz);
		}
		return res;
	},
	/**
	 * Возвращает полное имя файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	basename: function(filepath)
	{
		var ret = this.pathinfo(filepath);
		var res = Runtime.rtl.get(ret, "basename");
		return res;
	},
	/**
	 * Возвращает расширение файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} расширение файла
	 */
	extname: function(filepath)
	{
		var ret = this.pathinfo(filepath);
		var res = Runtime.rtl.get(ret, "extension");
		return res;
	},
	/**
	 * Возвращает путь к папке, содержащий файл
	 * @param {string} filepath - путь к файлу
	 * @return {string} путь к папке, содержащий файл
	 */
	dirname: function(filepath)
	{
		var ret = this.pathinfo(filepath);
		var res = Runtime.rtl.get(ret, "dirname");
		return res;
	},
	/**
	 * New line to br
	 */
	nl2br: function(s)
	{
		return this.replace("\n", "<br/>", s);
	},
	/**
	 * Remove spaces
	 */
	spaceless: function(s)
	{
		s = Runtime.re.replace(" +", " ", s);
		s = Runtime.re.replace("\t", "", s);
		s = Runtime.re.replace("\n", "", s);
		return s;
	},
	/**
	 * Ищет позицию первого вхождения подстроки search в строке s.
	 * @param {string} s - строка, в которой производится поиск 
	 * @param {string} search - строка, которую ищем 
	 * @param {string} offset - если этот параметр указан, 
	 *                 то поиск будет начат с указанного количества символов с начала строки.  
	 * @return {variable} Если строка найдена, то возвращает позицию вхождения, начиная с 0.
	 *                    Если строка не найдена, то вернет -1
	 */
	indexOf: function(s, search, offset)
	{
		if (offset == undefined) offset = 0;
		var _rtl = use("Runtime.rtl");
		
		if (!_rtl.exists(offset)) offset = 0;
		var res = _rtl.toStr(s).indexOf(search);
		return res;
	},
	strpos: function(s, search, offset)
	{
		if (offset == undefined) offset = 0;
		return this.indexOf(s, search, offset);
	},
	/**
	 * URL encode
	 * @param string s
	 * @return string
	 */
	url_encode: function(s)
	{
		return encodeURIComponent(s);
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string
	 */
	base64_encode: function(s)
	{
		return window.btoa(window.unescape(window.encodeURIComponent(s)));
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string
	 */
	base64_decode: function(s)
	{
		return window.decodeURIComponent(window.escape(window.atob(s)));
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string
	 */
	base64_encode_url: function(s)
	{
		s = this.base64_encode(s)
			.replace(new RegExp('\\+', 'g'), '-')
			.replace(new RegExp('\\/', 'g'), '_')
			.replace(new RegExp('=', 'g'), '')
		;
		return s;
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string
	 */
	base64_decode_url: function(s)
	{
		var c = 4 - s.length % 4;
		if (c < 4 && c > 0) s = s + '='.repeat(c);
		s = s.replace(new RegExp('-', 'g'), '+')
			.replace(new RegExp('_', 'g'), '/')
		;
		return this.base64_decode(s);
	},
	/**
	 * Parser url
	 * @param string s The string
	 * @return int
	 */
	parse_url: function(s)
	{
		var pos;
		var uri;
		var query;
		var hash;
		pos = this.strpos(s, "#");
		s = (pos >= 0) ? (this.substr(s, 0, pos)) : (s);
		hash = (pos >= 0) ? (this.substr(s, pos + 1)) : ("");
		pos = this.strpos(s, "?");
		uri = (pos >= 0) ? (this.substr(s, 0, pos)) : (s);
		query = (pos >= 0) ? (this.substr(s, pos + 1)) : ("");
		var arr = this.explode("&", query);
		var arr2 = arr.filter((s) => 
		{
			return s != "";
		}).transition((item) => 
		{
			var arr = this.explode("=", item);
			return Runtime.Collection.from([Runtime.rtl.get(arr, 1),Runtime.rtl.get(arr, 0)]);
		});
		return Runtime.Dict.from({"uri":uri,"query":query,"query_arr":arr2,"hash":hash});
	},
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	url_get_add: function(s, key, value)
	{
		var r = this.parse_url(s);
		var s1 = Runtime.rtl.get(r, "uri");
		var s2 = Runtime.rtl.get(r, "query");
		var find = false;
		var arr = this.explode("&", s2);
		arr = arr.map((s) => 
		{
			var arr = this.explode("=", s);
			if (Runtime.rtl.get(arr, 0) == key)
			{
				find = true;
				if (value != "")
				{
					return key + Runtime.rtl.toStr("=") + Runtime.rtl.toStr(this.htmlEscape(value));
				}
				return "";
			}
			return s;
		}).filter((s) => 
		{
			return s != "";
		});
		if (!find && value != "")
		{
			arr = arr.appendIm(key + Runtime.rtl.toStr("=") + Runtime.rtl.toStr(this.htmlEscape(value)));
		}
		s = s1;
		s2 = this.join("&", arr);
		if (s2 != "")
		{
			s = s + Runtime.rtl.toStr("?") + Runtime.rtl.toStr(s2);
		}
		return s;
	},
	/**
	 * Strip tags
	 */
	strip_tags: function(content, allowed_tags)
	{
		if (allowed_tags == undefined) allowed_tags = null;
		if (allowed_tags == null)
		{
			content = Runtime.re.replace("<[^>]+>", "", content);
			content = Runtime.rs.trim(Runtime.rs.spaceless(content));
			return content;
		}
		var matches = Runtime.re.matchAll("<[^>]+>", content, "i");
		if (matches)
		{
			for (var i = 0;i < matches.count();i++)
			{
				var match = Runtime.rtl.get(matches, i);
				var tag_str = Runtime.rtl.get(match, 0);
				var tag_match = Runtime.re.matchAll("<(\\/|)([a-zA-Z]+)(|[^>]*)>", tag_str, "i");
				if (tag_match)
				{
					var tag_name = this.strtolower(Runtime.rtl.get(Runtime.rtl.get(tag_match, 0), 2));
					if (allowed_tags.indexOf(tag_name) == -1)
					{
						content = this.replace(tag_str, "", content);
					}
				}
			}
		}
		content = Runtime.rs.trim(Runtime.rs.spaceless(content));
		return content;
	},
	/* =================== Deprecated =================== */
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	explode: function(delimiter, s, limit)
	{
		if (limit == undefined) limit = -1;
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		if (!_rtl.exists(limit))
			arr = s.split(delimiter);
		arr = s.split(delimiter, limit);
		return _Collection.from(arr);
	},
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	implode: function(ch, arr)
	{
		return arr.join(ch);
	},
	/**
	 * Returns relative path of the filepath
	 * @param string filepath
	 * @param string basepath
	 * @param string ch - Directory separator
	 * @return string relative path
	 */
	relativePath: function(filepath, basepath, ch)
	{
		if (ch == undefined) ch = "/";
		var source = Runtime.rs.explode(ch, filepath);
		var base = Runtime.rs.explode(ch, basepath);
		source = source.filter((s) => 
		{
			return s != "";
		});
		base = base.filter((s) => 
		{
			return s != "";
		});
		var i = 0;
		while (source.count() > 0 && base.count() > 0 && source.item(0) == base.item(0))
		{
			source.shift();
			base.shift();
		}
		base.each((s) => 
		{
			source.unshift("..");
		});
		return Runtime.rs.implode(ch, source);
	},
	/**
	 * Return normalize path
	 * @param string filepath - File path
	 * @return string
	 */
	normalize: function(filepath)
	{
		return filepath;
	},
	/**
	 * json encode scalar values
	 * @param {mixed} obj - объект
	 * @param {int} flags - Флаги
	 * @return {string} json строка
	 */
	json_encode_primitive: function(s, flags)
	{
		if (flags & 128 == 128) 
			return JSON.stringify(obj, null, 2);
		return JSON.stringify(obj);
	},
	/**
	 * Search 'search' in s.
	 */
	search: function(s, search, offset)
	{
		if (offset == undefined) offset = 0;
		var _rtl = use("Runtime.rtl");
		var res = _rtl.toStr(s).indexOf(search);
		return res;
	},
	/**
	 * Is start
	 */
	start: function(s, search)
	{
		return this.search(s, search) == 0;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.rs";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"strlen",
			"substr",
			"charAt",
			"chr",
			"ord",
			"strtolower",
			"strtoupper",
			"lower",
			"upper",
			"replace",
			"str_repeat",
			"split",
			"splitArr",
			"join",
			"join_path",
			"trim",
			"htmlEscape",
			"escapeHtml",
			"pathinfo",
			"filename",
			"basename",
			"extname",
			"dirname",
			"nl2br",
			"spaceless",
			"indexOf",
			"strpos",
			"url_encode",
			"base64_encode",
			"base64_decode",
			"base64_encode_url",
			"base64_decode_url",
			"parse_url",
			"url_get_add",
			"strip_tags",
			"explode",
			"implode",
			"relativePath",
			"normalize",
			"json_encode_primitive",
			"search",
			"start",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.rs);
window["Runtime.rs"] = Runtime.rs;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.rs;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime == 'undefined') Runtime = {};
Runtime._Collection = function()
{
	Array.call(this);
	for (var i=1; i<arguments.length; i++) Array.prototype.push.call(this, arguments[i]);
	this.__uq__ = Symbol();
}
Runtime._Collection.prototype = Object.create(Array.prototype);
Runtime._Collection.prototype.constructor = Runtime._Collection;
Object.assign(Runtime._Collection.prototype,
{
	toArray: function()
	{
		return Array.prototype.slice.call(this);
	},
	toStr: function(value)
	{
		return use("Runtime.rtl").toStr(value);
	}
});
Object.assign(Runtime._Collection,
{
	from: function(arr)
	{
		var res = this.Instance();
		if (arr == undefined && arr == null) return this.Instance();
		
		if (arr instanceof Array)
		{
			var new_arr = arr.slice();
			Object.setPrototypeOf(new_arr, this.prototype);
			return new_arr;
		}
		
		var res = this.Instance();
		if (
			arr instanceof Int8Array ||
			arr instanceof Uint8Array ||
			arr instanceof Int16Array ||
			arr instanceof Uint16Array ||
			arr instanceof Int32Array ||
			arr instanceof Uint32Array ||
			arr instanceof Float32Array ||
			arr instanceof Float64Array
		)
		{
			for (var i=0; i<arr.length; i++)
			{
				Array.prototype.push.call(res, arr[i]);
			}
		}
		
		return res;	
	},
	getNamespace: function(){ return "Runtime"; },
	getClassName: function(){ return "Runtime._Collection"; },
	getParentClassName: function(){ return ""; },
});
Runtime.Collection = function()
{
	Runtime._Collection.apply(this, arguments);
};
Runtime.Collection.prototype = Object.create(Runtime._Collection.prototype);
Runtime.Collection.prototype.constructor = Runtime.Collection;
Object.assign(Runtime.Collection.prototype,
{
	/**
	 * Returns copy of Collection
	 * @param int pos - position
	 */
	cp: function()
	{
		var arr = Array.prototype.slice.call(this);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	/**
	 * Convert to collection
	 */
	toCollection: function()
	{
		var obj = Array.prototype.slice.call(this);
		Object.setPrototypeOf(obj, Runtime.Collection.prototype);
		return obj;
	},
	/**
	 * Convert to vector
	 */
	toVector: function()
	{
		var obj = Array.prototype.slice.call(this);
		Object.setPrototypeOf(obj, use("Runtime.Vector").prototype);
		return obj;
	},
	/**
	 * Returns value from position
	 * @param int pos - position
	 */
	get: function(pos, default_value)
	{
		if (default_value == undefined) default_value = null;
		if (pos < 0 || pos >= this.length) return default_value;
		var val = this[pos];
		return val;
	},
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param int pos - position
	 */
	item: function(pos)
	{
		if (pos < 0 || pos >= this.length)
		{
			var _IndexOutOfRange = use("Runtime.Exceptions.IndexOutOfRange");
			throw new _IndexOutOfRange(pos);
		}
		return this[pos];
	},
	/**
	 * Returns count items in vector
	 */
	count: function()
	{
		return this.length;
	},
	/**
	 * Find value in array. Returns -1 if value not found.
	 * @param T value
	 * @return  int
	 */
	indexOf: function(value)
	{
		for (var i=0; i<this.count(); i++)
		{
			if (this[i] == value)
				return i;
		}
		return -1;
	},
	/**
	 * Find value in array, and returns position. Returns -1 if value not found.
	 * @param T value
	 * @param int pos_begin - begin position
	 * @param int pos_end - end position
	 * @return  int
	 */
	indexOfRange: function(value, pos_begin, pos_end)
	{
		var pos = Array.prototype.indexOf.call(this, value, pos_begin);
		if (pos == -1 || pos > pos_end)
			return -1;
		return pos;
	},
	/**
	 * Get first item
	 */
	first: function(default_value)
	{
		if (default_value == undefined) default_value = null;
		if (this.length == 0) return default_value;
		return this[0];
	},
	/**
	 * Get last item
	 */
	last: function(default_value, pos)
	{
		if (default_value == undefined) default_value = null;
		if (pos == undefined) pos = -1;
		if (pos == undefined) pos = -1;
		if (this.length == 0) return default_value;
		if (this.length + pos + 1 == 0) return default_value;
		return this[this.length + pos];
	},
	/**
	 * Get last item
	 */
	getLastItem: function(default_value, pos)
	{
		if (default_value == undefined) default_value = null;
		if (pos == undefined) pos = -1;
		return this.last(default_value, pos);
	},
	/**
	 * Append value to the end of the Collection and return new Collection
	 * @param T value
	 */
	pushIm: function(value)
	{
		var arr = this.cp();
		Array.prototype.push.call(arr, value);
		return arr;
	},
	push: function(value)
	{
		throw new Runtime.Exceptions.RuntimeException("Deprecated Collection push")
	},
	push1: function(value)
	{
		return this.pushIm(value);
	},
	append1: function(value)
	{
		return this.push(value);
	},
	appendIm: function(value)
	{
		return this.pushIm(value);
	},
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	unshiftIm: function(value)
	{
		var arr = this.cp();
		Array.prototype.unshift.call(arr, value);
		return arr;
	},
	unshift: function(value)
	{
		throw new Runtime.Exceptions.RuntimeException("Deprecated Collection unshift")
	},
	unshift1: function(value)
	{
		return this.unshiftIm(value);
	},
	prepend1: function(value)
	{
		return this.unshift(value);
	},
	prependIm: function(value)
	{
		return this.unshiftIm(value);
	},
	prepend: function(value)
	{
		return this.unshiftIm(value);
	},
	/**
	 * Extract last value from array
	 * @return T value
	 */
	removeLastIm: function()
	{
		var arr = Array.prototype.slice.call(this, 0, -1);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	removeLast: function(value)
	{
		return this.removeLastIm(value);
	},
	/**
	 * Extract first value from array
	 * @return T value
	 */
	removeFirstIm: function()
	{
		var arr = Array.prototype.slice.call(this, 1);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	removeFirst: function(value)
	{
		return this.removeFirstIm(value);
	},
	/**
	 * Insert value to position
	 * @param T value
	 * @param int pos - position
	 */
	insertIm: function(pos, value)
	{
		var arr = this.cp();
		arr.splice(pos, 0, value);
		return arr;
	},
	insert: function(value)
	{
		return this.insertIm(value);
	},
	/**
	 * Remove value from position
	 * @param int pos - position
	 * @param int count - count remove items
	 */
	removeIm: function(pos, count)
	{
		if (count == undefined) count = 1;
		if (count == undefined) count = 1;
		var arr = this.cp();
		arr.splice(pos, count);
		return arr;
	},
	remove1: function(value)
	{
		return this.removeIm(value);
	},
	/**
	 * Remove range
	 * @param int pos_begin - start position
	 * @param int pos_end - end position
	 */
	removeRangeIm: function(pos_begin, pos_end)
	{
		var arr = this.cp();
		arr.splice(pos_begin, pos_end - pos_begin + 1);
		return arr;
	},
	removeRange: function(value)
	{
		return this.removeRangeIm(value);
	},
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	setIm: function(pos, value)
	{
		if (pos < 0 || pos >= this.length)
		{
			var _IndexOutOfRange = use("Runtime.Exceptions.IndexOutOfRange");
			throw new _IndexOutOfRange(pos);
		}
		var arr = this.cp();
		arr[pos] = value;
		return arr;
	},
	set: function(value)
	{
		throw new Runtime.Exceptions.RuntimeException("Deprecated Collection set")
	},
	set1: function(value)
	{
		return this.setIm(value);
	},
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	concatIm: function(arr)
	{
		if (arr == null)
		{
			return this;
		}
		if (!Runtime.rtl.isArray(arr))
		{
			arr = Runtime.Collection.from([arr]);
		}
		if (arr.length == 0) return this;
		var res = this.cp();
		for (var i=0; i<arr.length; i++)
		{
			Array.prototype.push.call(res, arr[i]);
		}
		return res;
	},
	appendCollection1: function(arr)
	{
		return this.concatIm(arr);
	},
	concat: function(arr)
	{
		return this.concatIm(arr);
	},
	/**
	 * Prepend vector to the begin of the vector
	 * @param Collection<T> arr
	 */
	prependCollectionIm: function(arr)
	{
		if (arr == null) return this;
		if (arr.length == 0) return this;
		var res = this.cp();
		for (var i=arr.length-1; i>=0; i--)
		{
			Array.prototype.unshift.call(res, arr[i]);
		}
		return res;
	},
	prependCollection1: function(arr)
	{
		return this.prependCollectionIm(arr);
	},
	/**
	 * Remove value
	 */
	removeItemIm: function(value)
	{
		var index = this.indexOf(value);
		if (index != -1)
		{
			return this.remove(index);
		}
		return this;
	},
	removeItem: function(value)
	{
		return this.removeItemIm(value);
	},
	/**
	 * Remove value
	 */
	removeItemsIm: function(values)
	{
		var res = this;
		for (var i = 0;i < values.count();i++)
		{
			res = res.removeItem(values.item(i));
		}
		return res;
	},
	removeItems: function(values)
	{
		return this.removeItemsIm(values);
	},
	/**
	 * Map
	 * @param fn f
	 * @return Collection
	 */
	map: function(f)
	{
		var arr = this.cp();
		for (var i=0; i<arr.length; i++)
		{
			arr[i] = f(arr[i], i);
		}
		return arr;
	},
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	filter: function(f)
	{
		var res = this.constructor.Instance();
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			var flag = f(item, i);
			if (flag)
			{
				Array.prototype.push.call(res, item);
			}
		}
		return res;
	},
	/**
	 * Transition Collection to Dict
	 * @param fn f
	 * @return Dict
	 */
	transition: function(f)
	{
		var Dict = use("Runtime.Dict");
		var d = new Dict();
		for (var i=0; i<this.length; i++)
		{
			var value = this[i];
			var p = f(value, i);
			d[p[1]] = p[0];
		}
		return d;
	},
	/**
	 * Reduce
	 * @param fn f
	 * @param var init_value
	 * @return init_value
	 */
	reduce: function(f, init_value)
	{
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			init_value = f(init_value, item, i);
		}
		return init_value;
	},
	/**
	 * Call function for each item
	 * @param fn f
	 */
	each: function(f)
	{
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			f(item, i);
		}
	},
	/**
	 * flatten Collection
	 */
	flatten: function()
	{
		let res = [];
		
		for (var i=0; i<this.length; i++)
		{
			let item = this[i];
			if (item instanceof Runtime.Collection)
			{
				item = item.flatten();
				res = res.concat( item );
			}
			else
			{
				res.push(item);
			}
		}
		
		Object.setPrototypeOf(res, this.constructor.prototype);
		return res;
	},
	/**
	 * Returns Collection
	 * @param Collection<T> arr
	 * @return Collection<T>
	 */
	intersect: function(arr)
	{
		return this.filter((item) => 
		{
			return arr.indexOf(item) >= 0;
		});
	},
	/**
	 * Returns new Collection
	 * @param int offset
	 * @param int lenght
	 * @return Collection<T>
	 */
	slice: function(offset, length)
	{
		if (length == undefined) length = null;
		if (offset == undefined) offset = 0;
		if (length == undefined)
		{
			if (offset <= 0) return this;
			var arr = Array.prototype.slice.call(this, offset);
			Object.setPrototypeOf(arr, this.constructor.prototype);
			return arr;
		}
		if (offset <= 0 && length == this.length) return this;
		if (length >= 0)
		{
			length = offset + length;
		}
		var arr = Array.prototype.slice.call(this, offset, length);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	/**
	 * Reverse array
	 */
	reverseIm: function()
	{
		var arr = this.cp();
		Array.prototype.reverse.call(arr);
		return arr;
	},
	reverse: function()
	{
		return this.reverseIm();
	},
	/**
	 * Sort vector
	 * @param fn f - Sort user function
	 */
	sortIm: function(f)
	{
		if (f == undefined) f = null;
		var arr = this.cp();
		if (f == undefined) Array.prototype.sort.call(arr);
		else
		{
			var f1 = (a, b) => { return f(a, b); };
			Array.prototype.sort.call(arr, f1);
		}
		return arr;
	},
	sort: function(f)
	{
		if (f == undefined) f = null;
		return this.sortIm(f);
	},
	/**
	 * Remove dublicate values
	 */
	removeDuplicatesIm: function()
	{
		var res = this.constructor.Instance();
		for (var i=0; i<this.length; i++)
		{
			var p = res.indexOf(this[i]);
			if (p == -1)
			{
				Array.prototype.push.call(res, this[i]);
			}
		}
		return res;
	},
	removeDuplicates: function()
	{
		return this.removeDuplicatesIm();
	},
	/**
	 * Find item pos
	 * @param fn f - Find function
	 * @return int - position
	 */
	find: function(f)
	{
		for (var i=0; i<this.length; i++)
		{
			var flag = f(this[i]);
			if (flag) return i;
		}
		return -1;
	},
	/**
	 * Find item
	 * @param var item - Find function
	 * @param fn f - Find function
	 * @param T def_value - Find function
	 * @return item
	 */
	findItem: function(f, def_value)
	{
		if (def_value == undefined) def_value = null;
		var pos = this.find(f);
		return this.get(pos, def_value);
	},
	/**
	 * Join collection to string
	 */
	join: function(ch)
	{
		return Runtime.rs.join(ch, this);
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Collection)
		{
		}
		Runtime._Collection.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime._Collection.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime._Collection.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Collection, Runtime._Collection);
Object.assign(Runtime.Collection,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function()
	{
		return new Runtime.Collection();
	},
	/**
	 * Returns new Instance
	 * @return Object
	 */
	create: function(arr)
	{
		return this.from(arr);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Collection";
	},
	getParentClassName: function()
	{
		return "Runtime._Collection";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"Instance",
			"create",
			"cp",
			"toCollection",
			"toVector",
			"get",
			"item",
			"count",
			"indexOf",
			"indexOfRange",
			"first",
			"last",
			"getLastItem",
			"pushIm",
			"push",
			"push1",
			"append1",
			"appendIm",
			"unshiftIm",
			"unshift",
			"unshift1",
			"prepend1",
			"prependIm",
			"prepend",
			"removeLastIm",
			"removeLast",
			"removeFirstIm",
			"removeFirst",
			"insertIm",
			"insert",
			"removeIm",
			"remove1",
			"removeRangeIm",
			"removeRange",
			"setIm",
			"set",
			"set1",
			"concatIm",
			"appendCollection1",
			"concat",
			"prependCollectionIm",
			"prependCollection1",
			"removeItemIm",
			"removeItem",
			"removeItemsIm",
			"removeItems",
			"map",
			"filter",
			"transition",
			"reduce",
			"each",
			"flatten",
			"intersect",
			"slice",
			"reverseIm",
			"reverse",
			"sortIm",
			"sort",
			"removeDuplicatesIm",
			"removeDuplicates",
			"find",
			"findItem",
			"join",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Collection);
window["Runtime.Collection"] = Runtime.Collection;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Collection;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime == 'undefined') Runtime = {};

Runtime._Map = function(map)
{
	this._map = {};
	if (map != undefined && typeof map == 'object')
	{
		if (map instanceof Runtime.Dict)
		{
			for (var i in map._map)
			{
				this._map[i] = map._map[i];
			}
		}
		else if (typeof map == "object" && !(map instanceof Runtime._Collection))
		{
			for (var i in map)
			{
				this._map["|" + i] = map[i];
			}
		}
	}
	this.__uq__ = Symbol();
	return this;
}
/*Runtime._Map.prototype = Object.create(Map.prototype);
Runtime._Map.prototype.constructor = Runtime._Map;*/
Object.assign(Runtime._Map.prototype,
{
	toStr: function(value)
	{ 
		return use("Runtime.rtl").toStr(value);
	},
	toObject: function()
	{
		var obj = {};
		for (var key in this._map)
		{
			obj[key.substring(1)] = this._map[key];
		}
		return obj;
	},
});
Object.assign(Runtime._Map,
{
	from: function(map)
	{
		var ctx = null;
		var res = this.Instance(map);
		return res;
	},
	getNamespace: function(){ return "Runtime"; },
	getClassName: function(){ return "Runtime._Map"; },
	getParentClassName: function(){ return ""; },
});
Runtime.Dict = function()
{
	Runtime._Map.apply(this, arguments);
};
Runtime.Dict.prototype = Object.create(Runtime._Map.prototype);
Runtime.Dict.prototype.constructor = Runtime.Dict;
Object.assign(Runtime.Dict.prototype,
{
	/**
	 * Copy instance
	 */
	cp: function()
	{
		var new_obj = this.constructor.Instance();
		new_obj._map = Object.assign({}, this._map);
		return new_obj;
	},
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return Dict<T>
	 */
	clone: function(fields)
	{
		if (fields == undefined) fields = null;
		if (fields == null)
		{
			return this;
		}
		var new_obj = this.constructor.Instance();
		if (fields != null)
		{
			for (var key in fields)
			{
				if (typeof obj["|" + key] == undefined)
					new_obj._map["|" + key] = this._map["|" + key];
			}
		}
		return new_obj;
	},
	/**
	 * Returns copy of Dict
	 * @param int pos - position
	 */
	copy: function(obj)
	{
		if (obj == undefined) obj = null;
		if (obj == null)
		{
			return this;
		}
		var new_obj = this.constructor.Instance();
		new_obj._map = Object.assign({}, this._map);
		if (obj != null)
		{
			var _Dict = use("Runtime.Dict");
			if (obj instanceof _Dict) 
			{
				obj = obj._map;
				for (var key in obj)
				{
					new_obj._map[key] = obj[key];
				}
			}
			else
			{
				for (var key in obj)
				{
					new_obj._map["|" + key] = obj[key];
				}
			}
		}
		return new_obj;
	},
	/**
	 * Convert to dict
	 */
	toDict: function()
	{
		var Dict = use ("Runtime.Dict");
		return new Dict(this);
	},
	/**
	 * Convert to dict
	 */
	toMap: function()
	{
		var Map = use ("Runtime.Map");
		return new Map(this);
	},
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	contains: function(key)
	{
		key = this.toStr(key);
		return typeof this._map["|" + key] != "undefined";
	},
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	has: function(key)
	{
		return this.contains(key);
	},
	/**
	 * Returns value from position
	 * @param string key
	 * @param T default_value
	 * @return T
	 */
	get: function(key, default_value)
	{
		if (default_value == undefined) default_value = null;
		key = this.toStr(key);
		var val = this._map["|" + key];
		if (typeof val == "undefined") return default_value;
		return val;
	},
	/**
	 * Returns value from position
	 * @param string key
	 * @param T default_value
	 * @return T
	 */
	attr: function(items, default_value)
	{
		return Runtime.rtl.attr(this, items, default_value);
	},
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param string key - position
	 * @return T
	 */
	item: function(key)
	{
		key = this.toStr(key);
		if (typeof this._map["|" + key] == "undefined")
		{
			var _KeyNotFound = use("Runtime.Exceptions.KeyNotFound");
			throw new _KeyNotFound(key);
		}
		var val = this._map["|" + key];
		if (val === null || typeof val == "undefined") return null;
		return val;
	},
	/**
	 * Set value size_to position
	 * @param string key - position
	 * @param T value 
	 * @return self
	 */
	setIm: function(key, value)
	{
		var res = this.cp();
		key = this.toStr(key);
		res._map["|" + key] = value;
		return res;
	},
	set1: function(key, value)
	{
		return this.setIm(key, value);
	},
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	removeIm: function(key)
	{
		key = this.toStr(key);
		if (typeof this._map["|" + key] != "undefined")
		{
			var res = this.cp();
			delete res._map["|" + key];
			return res;
		}
		return this;
	},
	remove1: function(key)
	{
		return this.removeIm(key);
	},
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	removeKeys: function(keys)
	{
		return (keys != null) ? (keys.reduce((item, key) => 
		{
			return item.removeIm(key);
		}, this)) : (this);
	},
	/**
	 * Returns vector of the keys
	 * @return Collection<string>
	 */
	keys: function()
	{
		var res = new Runtime.Vector();
		for (var key in this._map) res.pushValue(key.substring(1));
		return res.toCollection();
	},
	/**
	 * Returns vector of the values
	 * @return Collection<T>
	 */
	values: function()
	{
		var res = new Runtime.Vector();
		for (var key in this._map) res.pushValue( this._map[key] );
		return res.toCollection();
	},
	/**
	 * Call function map
	 * @param fn f
	 * @return Dict
	 */
	map: function(f)
	{
		var obj = this.constructor.Instance();
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var new_val = f(this._map[key], new_key);
			obj._map[key] = new_val;
		}
		return obj;
	},
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	filter: function(f)
	{
		var obj = this.constructor.Instance();
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var value = this._map[key];
			var flag = f(value, new_key);
			if (flag) obj._map[key] = value;
		}
		return obj;
	},
	/**
	 * Call function for each item
	 * @param fn f
	 */
	each: function(f)
	{
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var value = this._map[key];
			f(value, new_key);
		}
	},
	/**
	 * Transition Dict to Collection
	 * @param fn f
	 * @return Collection
	 */
	transition: function(f)
	{
		var Collection = use("Runtime.Collection");
		var arr = new Collection();
		for (var key in this._map)
		{
			var new_value = f(this._map[key], key.substring(1));
			Array.prototype.push.call(arr, new_value);
		}
		return arr;
	},
	/**
	 * 	
	 * @param fn f
	 * @param var init_value
	 * @return init_value
	 */
	reduce: function(f, init_value)
	{
		for (var key in this._map)
		{
			init_value = f(init_value, this._map[key], key.substring(1));
		}
		return init_value;
	},
	/**
	 * Add values from other map
	 * @param Dict<T> map
	 * @return self
	 */
	concat: function(map)
	{
		if (map == undefined) map = null;
		if (map == null)
		{
			return this;
		}
		var _map = {};
		var f = false;
		var Dict = use("Runtime.Dict");
		if (map == null) return this;
		if (map instanceof Dict) _map = map._map;
		else if (typeof map == "object") { _map = map; f = true; }
		var res = this.cp();
		for (var key in _map)
		{
			res._map[(f ? "|" : "") + key] = _map[key];
		}
		return res;
	},
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return BaseStruct
	 */
	intersect: function(fields, skip_empty)
	{
		if (fields == undefined) fields = null;
		if (skip_empty == undefined) skip_empty = true;
		if (fields == null)
		{
			return Runtime.Dict.from({});
		}
		var obj = new Runtime.Map();
		fields.each((field_name) => 
		{
			if (skip_empty && !this.has(field_name))
			{
				return ;
			}
			obj.setValue(field_name, this.get(field_name, null));
		});
		return obj.toDict();
	},
	/**
	 * Check equal
	 */
	equal: function(item)
	{
		if (item == null)
		{
			return false;
		}
		var keys = (new Runtime.Collection()).concat(this.keys()).concat(item.keys()).removeDuplicatesIm();
		for (var i = 0;i < keys.count();i++)
		{
			var key = Runtime.rtl.get(keys, i);
			if (!this.has(key))
			{
				return false;
			}
			if (!item.has(key))
			{
				return false;
			}
			if (this.get(key) != item.get(key))
			{
				return false;
			}
		}
		return true;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Dict)
		{
		}
		Runtime._Map.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime._Map.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime._Map.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Dict, Runtime._Map);
Object.assign(Runtime.Dict,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function(val)
	{
		if (val == undefined) val = null;
		return new Runtime.Dict(val);
	},
	/**
	 * Returns new Instance
	 * @return Object
	 */
	create: function(obj)
	{
		return new (Function.prototype.bind.apply(this, [null, ctx, obj]));
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Dict";
	},
	getParentClassName: function()
	{
		return "Runtime._Map";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"Instance",
			"create",
			"clone",
			"copy",
			"toDict",
			"toMap",
			"contains",
			"has",
			"get",
			"attr",
			"item",
			"setIm",
			"set1",
			"removeIm",
			"remove1",
			"removeKeys",
			"keys",
			"values",
			"map",
			"filter",
			"each",
			"transition",
			"reduce",
			"concat",
			"intersect",
			"equal",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Dict);
window["Runtime.Dict"] = Runtime.Dict;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Dict;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Map = function()
{
	Runtime.Dict.apply(this, arguments);
};
Runtime.Map.prototype = Object.create(Runtime.Dict.prototype);
Runtime.Map.prototype.constructor = Runtime.Map;
Object.assign(Runtime.Map.prototype,
{
	/**
	 * Set value size_to position
	 * @param string key - position
	 * @param T value 
	 * @return self
	 */
	setValue: function(key, value)
	{
		key = this.toStr(key);
		this._map["|" + key] = value;
		return this;
	},
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	removeValue: function(key)
	{
		key = this.toStr(key);
		if (typeof this._map["|" + key] != "undefined")
		{
			delete this._map["|" + key];
		}
		return this;
	},
	/**
	 * Clear all values from vector
	 * @return self
	 */
	clear: function()
	{
		this._map = {};
		return this;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Map)
		{
		}
		Runtime.Dict.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Dict.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Dict.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Map, Runtime.Dict);
Object.assign(Runtime.Map,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function(val)
	{
		if (val == undefined) val = null;
		return new Runtime.Map(val);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Map";
	},
	getParentClassName: function()
	{
		return "Runtime.Dict";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"Instance",
			"setValue",
			"removeValue",
			"clear",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Map);
window["Runtime.Map"] = Runtime.Map;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Map;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Monad = function(value, err)
{
	if (err == undefined) err = null;
	this.val = value;
	this.err = err;
};
Object.assign(Runtime.Monad.prototype,
{
	/**
	 * Return attr of object
	 */
	attr: function(attr_name)
	{
		if (this.val === null || this.err != null)
		{
			return this;
		}
		return new Runtime.Monad(Runtime.rtl.attr(this.val, Runtime.Collection.from([attr_name]), null));
	},
	/**
	 * Call function on value
	 */
	call: function(f)
	{
		if (this.val === null || this.err != null)
		{
			return this;
		}
		var res = null;
		var err = null;
		try
		{
			res = f(this.val);
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.RuntimeException)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		return new Runtime.Monad(res, err);
	},
	/**
	 * Call async function on value
	 */
	callAsync: async function(f)
	{
		if (this.val === null || this.err != null)
		{
			return Promise.resolve(this);
		}
		var res = null;
		var err = null;
		try
		{
			res = await f(this.val);
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.RuntimeException)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		return Promise.resolve(new Runtime.Monad(res, err));
	},
	/**
	 * Call method on value
	 */
	callMethod: function(f, args)
	{
		if (args == undefined) args = null;
		if (this.val === null || this.err != null)
		{
			return this;
		}
		var res = null;
		var err = null;
		try
		{
			res = Runtime.rtl.apply(f, args);
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.RuntimeException)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		return new Runtime.Monad(res, err);
	},
	/**
	 * Call async method on value
	 */
	callMethodAsync: async function(f, args)
	{
		if (args == undefined) args = null;
		if (this.val === null || this.err != null)
		{
			return Promise.resolve(this);
		}
		var res = null;
		var err = null;
		try
		{
			res = await Runtime.rtl.applyAsync(f, args);
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.RuntimeException)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		return Promise.resolve(new Runtime.Monad(res, err));
	},
	/**
	 * Call function on monad
	 */
	monad: function(f)
	{
		return f(this);
	},
	/**
	 * Returns value
	 */
	value: function()
	{
		if (this.err != null)
		{
			throw this.err
		}
		if (this.val === null || this.err != null)
		{
			return null;
		}
		return this.val;
	},
	_init: function()
	{
		this.val = null;
		this.err = null;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Monad)
		{
			this.val = o.val;
			this.err = o.err;
		}
	},
	assignValue: function(k,v)
	{
		if (k == "val")this.val = v;
		else if (k == "err")this.err = v;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "val")return this.val;
		else if (k == "err")return this.err;
	},
});
Object.assign(Runtime.Monad,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Monad";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("val");
		a.push("err");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "val") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "err") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
			"attr",
			"call",
			"callAsync",
			"callMethod",
			"callMethodAsync",
			"monad",
			"value",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Monad);
window["Runtime.Monad"] = Runtime.Monad;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Monad;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Vector = function()
{
	Runtime.Collection.apply(this, arguments);
};
Runtime.Vector.prototype = Object.create(Runtime.Collection.prototype);
Runtime.Vector.prototype.constructor = Runtime.Vector;
Object.assign(Runtime.Vector.prototype,
{
	/**
	 * Returns new Vector
	 * @param int offset
	 * @param int lenght
	 * @return Collection<T>
	 */
	vectorSlice: function(offset, length)
	{
		if (length == undefined) length = null;
		if (offset == undefined) offset = 0;
		if (length == undefined)
		{
			var arr = Array.prototype.slice.call(this, offset);
			Object.setPrototypeOf(arr, this.constructor.prototype);
			return arr;
		}
		if (length >= 0)
		{
			length = offset + length;
		}
		var arr = Array.prototype.slice.call(this, offset, length);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	/**
	 * Append value to the end of array
	 * @param T value
	 */
	appendValue: function(value)
	{
		Array.prototype.push.call(this, value);
		return this;
	},
	pushValue: function(value)
	{
		return this.appendValue(value);
	},
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	prependValue: function(value)
	{
		Array.prototype.unshift.call(this, value);
		return this;
	},
	unshiftValue: function(value)
	{
		return this.prependValue(value);
	},
	/**
	 * Extract last value from array
	 * @return T value
	 */
	popValue: function()
	{
		return Array.prototype.pop.call(this);
	},
	/**
	 * Extract first value from array
	 * @return T value
	 */
	shiftValue: function()
	{
		return Array.prototype.shift.call(this);
	},
	/**
	 * Insert value to position
	 * @param T value
	 * @param int pos - position
	 */
	insertValue: function(pos, value)
	{
		Array.prototype.splice.call(this, pos, 0, value);
		return this;
	},
	/**
	 * Remove value from position
	 * @param int pos - position
	 * @param int count - count remove items
	 */
	removePosition: function(pos, count)
	{
		if (count == undefined) count = 1;
		Array.prototype.splice.call(this, pos, count);
		return this;
	},
	/**
	 * Remove value
	 */
	removeValue: function(value)
	{
		var index = this.indexOf(value);
		if (index != -1)
		{
			this.removePosition(index, 1);
		}
		return this;
	},
	/**
	 * Remove value
	 */
	removeValues: function(values)
	{
		for (var i = 0;i < values.count();i++)
		{
			this.removeValue(values.item(i));
		}
		return this;
	},
	/**
	 * Remove range
	 * @param int pos_begin - start position
	 * @param int pos_end - end position
	 */
	removeRangeValues: function(pos_begin, pos_end)
	{
		Array.prototype.splice.call(this, pos_begin, pos_end - pos_begin + 1);
		return this;
	},
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	setValue: function(pos, value)
	{
		if (pos < 0 || pos >= this.length)
		{
			var IndexOutOfRange = use ("Runtime.Exceptions.IndexOutOfRange");
			throw new IndexOutOfRange(pos);
		}
		this[pos] = value;
		return this;
	},
	/**
	 * Clear all values from vector
	 */
	clear: function()
	{
		Array.prototype.splice.call(this, 0, this.length);
		return this;
	},
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	appendVector: function(arr)
	{
		if (!arr) return this;
		for (var i=0; i<arr.length; i++) Array.prototype.push.call(this, arr[i]);
		return this;
	},
	/**
	 * Prepend vector to the begin of the vector
	 * @param Vector<T> arr
	 */
	prependVector: function(arr)
	{
		for (var i=0; i<arr.length; i++) Array.prototype.unshift.call(this, arr[i]);
		return this;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Vector)
		{
		}
		Runtime.Collection.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Collection.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Collection.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Vector, Runtime.Collection);
Object.assign(Runtime.Vector,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function()
	{
		return new Runtime.Vector();
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Vector";
	},
	getParentClassName: function()
	{
		return "Runtime.Collection";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"Instance",
			"vectorSlice",
			"appendValue",
			"pushValue",
			"prependValue",
			"unshiftValue",
			"popValue",
			"shiftValue",
			"insertValue",
			"removePosition",
			"removeValue",
			"removeValues",
			"removeRangeValues",
			"setValue",
			"clear",
			"appendVector",
			"prependVector",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Vector);
window["Runtime.Vector"] = Runtime.Vector;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Vector;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.ClassException = function(message, code, prev)
{
	Error.call(this);
	Error.captureStackTrace(this, this.constructor);
	this.message = message;
	this.code = code;
	this.prev = prev;
}
Runtime.Exceptions.ClassException.prototype = Object.create(Error.prototype);
Runtime.Exceptions.ClassException.prototype.constructor = Runtime.Exceptions.ClassException;
Object.assign(Runtime.Exceptions.ClassException.prototype,
{
	_init: function(){},
});
Object.assign(Runtime.Exceptions.ClassException,
{
	getNamespace: function(){ return "Runtime.Exceptions"; },
	getClassName: function(){ return "Runtime.Exceptions.ClassException"; },
	getParentClassName: function(){ return ""; },
});
Runtime.Exceptions.RuntimeException = function(message, code, prev)
{
	if (message == undefined) message = "";
	if (code == undefined) code = -1;
	if (prev == undefined) prev = null;
	Runtime.Exceptions.ClassException.call(this, message, code, prev);
	this._init();
	this.error_str = message;
	this.error_code = code;
	this.prev = prev;
	this.updateError();
};
Runtime.Exceptions.RuntimeException.prototype = Object.create(Runtime.Exceptions.ClassException.prototype);
Runtime.Exceptions.RuntimeException.prototype.constructor = Runtime.Exceptions.RuntimeException;
Object.assign(Runtime.Exceptions.RuntimeException.prototype,
{
	getPreviousException: function()
	{
		return this.prev;
	},
	getErrorMessage: function()
	{
		return this.error_str;
	},
	getErrorString: function()
	{
		return this.error_str;
	},
	getErrorCode: function()
	{
		return this.error_code;
	},
	getFileName: function()
	{
		return this.error_file;
	},
	getErrorLine: function()
	{
		return this.error_line;
	},
	getErrorPos: function()
	{
		return this.error_pos;
	},
	toString: function()
	{
		return this.buildMessage();
	},
	buildMessage: function()
	{
		return this.error_str;
	},
	updateError: function()
	{
		this.error_message = this.buildMessage();
		this.message = this.error_message;
	},
	/**
	 * Returns trace
	 */
	getTraceStr: function()
	{
	},
	_init: function()
	{
		Runtime.Exceptions.ClassException.prototype._init.call(this);
		this.prev = null;
		this.error_message = "";
		this.error_str = "";
		this.error_code = 0;
		this.error_file = "";
		this.error_line = "";
		this.error_pos = "";
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Exceptions.RuntimeException)
		{
			this.error_message = o.error_message;
			this.error_str = o.error_str;
			this.error_code = o.error_code;
			this.error_file = o.error_file;
			this.error_line = o.error_line;
			this.error_pos = o.error_pos;
		}
		Runtime.Exceptions.ClassException.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "error_message")this.error_message = v;
		else if (k == "error_str")this.error_str = v;
		else if (k == "error_code")this.error_code = v;
		else if (k == "error_file")this.error_file = v;
		else if (k == "error_line")this.error_line = v;
		else if (k == "error_pos")this.error_pos = v;
		else Runtime.Exceptions.ClassException.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "error_message")return this.error_message;
		else if (k == "error_str")return this.error_str;
		else if (k == "error_code")return this.error_code;
		else if (k == "error_file")return this.error_file;
		else if (k == "error_line")return this.error_line;
		else if (k == "error_pos")return this.error_pos;
		return Runtime.Exceptions.ClassException.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Exceptions.RuntimeException, Runtime.Exceptions.ClassException);
Object.assign(Runtime.Exceptions.RuntimeException,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.ClassException";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("error_message");
		a.push("error_str");
		a.push("error_code");
		a.push("error_file");
		a.push("error_line");
		a.push("error_pos");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "error_message") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_str") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_code") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_file") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_line") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_pos") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
			"getPreviousException",
			"getErrorMessage",
			"getErrorString",
			"getErrorCode",
			"getFileName",
			"getErrorLine",
			"getErrorPos",
			"toString",
			"buildMessage",
			"updateError",
			"getTraceStr",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Exceptions.RuntimeException);
window["Runtime.Exceptions.RuntimeException"] = Runtime.Exceptions.RuntimeException;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.RuntimeException;
"use strict;"
/*!
 *  Bayrell Runtime Library 
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.ApiException = function(message, code, response, prev)
{
	if (message == undefined) message = "";
	if (code == undefined) code = -1;
	if (response == undefined) response = null;
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, message, code, prev);
	this.response = response;
};
Runtime.Exceptions.ApiException.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.ApiException.prototype.constructor = Runtime.Exceptions.ApiException;
Object.assign(Runtime.Exceptions.ApiException.prototype,
{
	_init: function()
	{
		Runtime.Exceptions.RuntimeException.prototype._init.call(this);
		this.response = null;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Exceptions.ApiException)
		{
			this.response = o.response;
		}
		Runtime.Exceptions.RuntimeException.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "response")this.response = v;
		else Runtime.Exceptions.RuntimeException.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "response")return this.response;
		return Runtime.Exceptions.RuntimeException.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Exceptions.ApiException, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.ApiException,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.ApiException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("response");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "response") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Exceptions.ApiException);
window["Runtime.Exceptions.ApiException"] = Runtime.Exceptions.ApiException;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.ApiException;
"use strict;"
/*!
 *  Bayrell Runtime Library 
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.AssignStructValueError = function(name, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, Runtime.rtl.getContext().translate("Runtime", "Can not set key '" + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("' in immutable struct")), Runtime.rtl.ERROR_INDEX_OUT_OF_RANGE, prev);
};
Runtime.Exceptions.AssignStructValueError.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.AssignStructValueError.prototype.constructor = Runtime.Exceptions.AssignStructValueError;
Object.assign(Runtime.Exceptions.AssignStructValueError.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Exceptions.AssignStructValueError)
		{
		}
		Runtime.Exceptions.RuntimeException.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Exceptions.RuntimeException.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Exceptions.RuntimeException.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Exceptions.AssignStructValueError, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.AssignStructValueError,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.AssignStructValueError";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Exceptions.AssignStructValueError);
window["Runtime.Exceptions.AssignStructValueError"] = Runtime.Exceptions.AssignStructValueError;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.AssignStructValueError;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.FileNotFound = function(name, object, code, prev)
{
	if (object == undefined) object = "File";
	if (code == undefined) code = -5;
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, Runtime.rtl.getContext().translate("Runtime", "%object% '%name%' not found", Runtime.Dict.from({"name":name,"object":object})), code, prev);
};
Runtime.Exceptions.FileNotFound.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.FileNotFound.prototype.constructor = Runtime.Exceptions.FileNotFound;
Object.assign(Runtime.Exceptions.FileNotFound.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Exceptions.FileNotFound)
		{
		}
		Runtime.Exceptions.RuntimeException.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Exceptions.RuntimeException.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Exceptions.RuntimeException.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Exceptions.FileNotFound, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.FileNotFound,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.FileNotFound";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Exceptions.FileNotFound);
window["Runtime.Exceptions.FileNotFound"] = Runtime.Exceptions.FileNotFound;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.FileNotFound;
"use strict;"
/*!
 *  Bayrell Runtime Library 
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.IndexOutOfRange = function(pos, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, Runtime.rtl.getContext().translate("Runtime", "Index out of range. Pos: %pos%", Runtime.Dict.from({"pos":pos})), Runtime.rtl.ERROR_INDEX_OUT_OF_RANGE, prev);
};
Runtime.Exceptions.IndexOutOfRange.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.IndexOutOfRange.prototype.constructor = Runtime.Exceptions.IndexOutOfRange;
Object.assign(Runtime.Exceptions.IndexOutOfRange.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Exceptions.IndexOutOfRange)
		{
		}
		Runtime.Exceptions.RuntimeException.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Exceptions.RuntimeException.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Exceptions.RuntimeException.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Exceptions.IndexOutOfRange, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.IndexOutOfRange,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.IndexOutOfRange";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Exceptions.IndexOutOfRange);
window["Runtime.Exceptions.IndexOutOfRange"] = Runtime.Exceptions.IndexOutOfRange;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.IndexOutOfRange;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.KeyNotFound = function(key, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, Runtime.rtl.getContext().translate("Runtime", "Key '%key%' not found", Runtime.Dict.from({"key":key})), Runtime.rtl.ERROR_KEY_NOT_FOUND, prev);
};
Runtime.Exceptions.KeyNotFound.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.KeyNotFound.prototype.constructor = Runtime.Exceptions.KeyNotFound;
Object.assign(Runtime.Exceptions.KeyNotFound.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Exceptions.KeyNotFound)
		{
		}
		Runtime.Exceptions.RuntimeException.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Exceptions.RuntimeException.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Exceptions.RuntimeException.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Exceptions.KeyNotFound, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.KeyNotFound,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.KeyNotFound";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Exceptions.KeyNotFound);
window["Runtime.Exceptions.KeyNotFound"] = Runtime.Exceptions.KeyNotFound;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.KeyNotFound;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.UnknownError = function(prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, Runtime.rtl.getContext().translate("Runtime", "Unknown error"), Runtime.rtl.ERROR_UNKNOWN, prev);
};
Runtime.Exceptions.UnknownError.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.UnknownError.prototype.constructor = Runtime.Exceptions.UnknownError;
Object.assign(Runtime.Exceptions.UnknownError.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Exceptions.UnknownError)
		{
		}
		Runtime.Exceptions.RuntimeException.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Exceptions.RuntimeException.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Exceptions.RuntimeException.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Exceptions.UnknownError, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.UnknownError,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.UnknownError";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Exceptions.UnknownError);
window["Runtime.Exceptions.UnknownError"] = Runtime.Exceptions.UnknownError;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.UnknownError;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.SerializeInterface = function()
{
};
Object.assign(Runtime.SerializeInterface.prototype,
{
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @return var
	 */
	get: function(variable_name, default_value)
	{
		if (default_value == undefined) default_value = null;
	},
});
Object.assign(Runtime.SerializeInterface,
{
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.SerializeInterface";
	},
});
Runtime.rtl.defClass(Runtime.SerializeInterface);
window["Runtime.SerializeInterface"] = Runtime.SerializeInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.SerializeInterface;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.StringInterface = function()
{
};
Object.assign(Runtime.StringInterface.prototype,
{
	/**
	 * Returns string
	 */
	toString: function()
	{
	},
});
Object.assign(Runtime.StringInterface,
{
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.StringInterface";
	},
});
Runtime.rtl.defClass(Runtime.StringInterface);
window["Runtime.StringInterface"] = Runtime.StringInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.StringInterface;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.BaseObject = function()
{
	/* Init object */
	this._init();
};
Object.assign(Runtime.BaseObject.prototype,
{
	/**
	 * Init function
	 */
	_init: function()
	{
	},
	/**
	 * Init struct data
	 */
	_init_data: function(obj)
	{
		return obj;
	},
	/**
	 * Assign new values
	 */
	_assign_values: function(obj)
	{
		if (obj == undefined) obj = null;
		if (typeof obj == 'object' && !(obj instanceof Runtime.Dict))
		{
			obj = new Runtime.Dict(obj);
		}
		if (obj == null)
		{
			return ;
		}
		if (obj.keys().count() == 0)
		{
			return ;
		}
		var check_types = false;
		var class_name = this.constructor.getClassName();
		obj = this._init_data(obj);
		var _Dict = use("Runtime.Dict");
		var rtl = use("Runtime.rtl");
		if (obj instanceof _Dict)
		{
			for (var key in obj._map)
			{
				var real_key = key.substring(1);
				var value = obj._map[key];
				if (check_types)
				{
					info = rtl.getFieldInfoWithParents(class_name, real_key);
					if (info)
					{
						value = rtl.convert(value, info.get("t"), null);
					}
				}
				this[real_key] = value;
			}
		}
		else
		{
			for (var key in obj)
			{
				var value = obj[key];
				if (check_types)
				{
					info = rtl.getFieldInfoWithParents(class_name, key);
					if (info)
					{
						value = rtl.convert(value, info.get("t"), null);
					}
				}
				this[key] = value;
			}
		}
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.BaseObject)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Runtime.BaseObject,
{
	/**
	 * Returns new instance
	 */
	newInstance: function(items)
	{
		return null;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
			"newInstance",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.BaseObject);
window["Runtime.BaseObject"] = Runtime.BaseObject;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.BaseObject;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.BaseHook = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.BaseHook.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.BaseHook.prototype.constructor = Runtime.BaseHook;
Object.assign(Runtime.BaseHook.prototype,
{
	/**
	 * Returns method name by hook name
	 */
	getMethodName: function(hook_name)
	{
		return "";
	},
	/**
	 * Register hook
	 */
	register: function(hook_name, priority)
	{
		if (priority == undefined) priority = 100;
		var method_name = this.getMethodName(hook_name);
		if (method_name == "")
		{
			return ;
		}
		this.hook.register(hook_name, this, method_name, priority);
	},
	/**
	 * Register hook
	 */
	registerMethod: function(hook_name, method_name, priority)
	{
		if (priority == undefined) priority = 100;
		this.hook.register(hook_name, this, method_name, priority);
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.hook = null;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.BaseHook)
		{
			this.hook = o.hook;
		}
		Runtime.BaseObject.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "hook")this.hook = v;
		else Runtime.BaseObject.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "hook")return this.hook;
		return Runtime.BaseObject.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.BaseHook, Runtime.BaseObject);
Object.assign(Runtime.BaseHook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.BaseHook";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("hook");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "hook") return Dict.from({
			"t": "Runtime.Providers.HookProvider",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getMethodName",
			"register",
			"registerMethod",
			"register_hooks",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.BaseHook);
window["Runtime.BaseHook"] = Runtime.BaseHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.BaseHook;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.BaseProvider = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.BaseProvider.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.BaseProvider.prototype.constructor = Runtime.BaseProvider;
Object.assign(Runtime.BaseProvider.prototype,
{
	/**
	 * Init provider
	 */
	init: async function(c)
	{
		return Promise.resolve(c);
	},
	/**
	 * Start provider
	 */
	start: async function()
	{
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.started = false;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.BaseProvider)
		{
			this.started = o.started;
		}
		Runtime.BaseObject.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "started")this.started = v;
		else Runtime.BaseObject.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "started")return this.started;
		return Runtime.BaseObject.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.BaseProvider, Runtime.BaseObject);
Object.assign(Runtime.BaseProvider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.BaseProvider";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("started");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "started") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"init",
			"start",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.BaseProvider);
window["Runtime.BaseProvider"] = Runtime.BaseProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.BaseProvider;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.BaseStruct = function(obj)
{
	if (obj == undefined) obj = null;
	Runtime.BaseObject.call(this);
	this._assign_values(obj);
	if (this.__uq__ == undefined || this.__uq__ == null) this.__uq__ = Symbol();
		Object.freeze(this);
};
Runtime.BaseStruct.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.BaseStruct.prototype.constructor = Runtime.BaseStruct;
Object.assign(Runtime.BaseStruct.prototype,
{
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	copy: function(obj)
	{
		if (obj == undefined) obj = null;
		if (obj == null)
		{
			return this;
		}
		var proto = Object.getPrototypeOf(this);
		var item = Object.create(proto); /* item._init(); */
		item = Object.assign(item, this);
		
		item._assign_values(obj);
		
		Object.freeze(item);
		
		return item;
		return this;
	},
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	clone: function(obj)
	{
		if (obj == undefined) obj = null;
		return this.copy(obj);
	},
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return BaseStruct
	 */
	intersect: function(fields)
	{
		if (fields == undefined) fields = null;
		if (fields == null)
		{
			return Runtime.Dict.from({});
		}
		var obj = new Runtime.Map();
		for (var i = 0;i < fields.count();i++)
		{
			var field_name = Runtime.rtl.get(fields, i);
			obj.setValue(field_name, this.get(field_name));
		}
		/* Return object */
		var res = Runtime.rtl.newInstance(this.getClassName(), Runtime.Collection.from([obj.toDict()]));
		return res;
	},
	/**
	 * Returns struct as Dict
	 * @return Dict
	 */
	toDict: function()
	{
		var values = new Runtime.Map();
		var names = Runtime.rtl.getFields(this.constructor.getClassName());
		for (var i = 0;i < names.count();i++)
		{
			var variable_name = names.item(i);
			var value = this.get(variable_name, null);
			values.setValue(variable_name, value);
		}
		return values.toDict();
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.BaseStruct)
		{
		}
		Runtime.BaseObject.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.BaseObject.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseObject.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.BaseStruct, Runtime.BaseObject);
Object.assign(Runtime.BaseStruct,
{
	/**
	 * Returns new instance
	 */
	newInstance: function(items)
	{
		return new (
			Function.prototype.bind.apply(
				this,
				(typeof ctx != "undefined") ? [null, ctx, items] : [null, items]
			)
		);
	},
	/**
	 * Update struct
	 * @param Collection<string> path
	 * @param var value
	 * @return BaseStruct
	 */
	set: function(item, path, value)
	{
		return Runtime.rtl.setAttr(item, path, value);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
			"copy",
			"clone",
			"intersect",
			"newInstance",
			"set",
			"toDict",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
	__implements__:
	[
		Runtime.SerializeInterface,
	],
});
Runtime.rtl.defClass(Runtime.BaseStruct);
window["Runtime.BaseStruct"] = Runtime.BaseStruct;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.BaseStruct;
Runtime.BaseStruct.prototype.get = function(k, v)
{
	if (v == undefined) v = null;
	return this[k] != undefined ? this[k] : v;
};
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Date = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Date.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Date.prototype.constructor = Runtime.Date;
Object.assign(Runtime.Date.prototype,
{
	/**
	 * Return date
	 * @return string
	 */
	getDate: function()
	{
		return this.y + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(this.m) + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(this.d);
	},
	/**
	 * Normalize date time
	 */
	normalize: function()
	{
		return this;
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.y = 0;
		this.m = 0;
		this.d = 0;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "y")return this.y;
		else if (k == "m")return this.m;
		else if (k == "d")return this.d;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Date, Runtime.BaseStruct);
Object.assign(Runtime.Date,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Date";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("y");
		a.push("m");
		a.push("d");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "y") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "m") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "d") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getDate",
			"normalize",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Date);
window["Runtime.Date"] = Runtime.Date;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Date;
Runtime.Date.prototype.toObject = function()
{
	var dt = new Date(this.y, this.m - 1, this.d);
	return dt;
}
Runtime.Date.fromObject = function(dt)
{
	var Dict = use("Runtime.Dict");
	var y = Number(dt.getFullYear());
	var m = Number(dt.getMonth()) + 1;
	var d = Number(dt.getDate());
	var dt = new Runtime.Date( ctx, Dict.from({"y":y,"m":m,"d":d}) );
	return dt;
}
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.DateTime = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.DateTime.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.DateTime.prototype.constructor = Runtime.DateTime;
Object.assign(Runtime.DateTime.prototype,
{
	/**
	 * Shift time
	 */
	shiftTime: function(shift)
	{
		var timestamp = this.getTimestamp() + shift;
		var dt = this.constructor.create(timestamp, this.tz);
		return dt;
	},
	/**
	 * Shift tz
	 */
	shift: function(tz)
	{
		var timestamp = this.getTimestamp();
		var dt = this.constructor.create(timestamp, tz);
		return dt;
	},
	/**
	 * Set week number
	 */
	setWeekNumber: function(week)
	{
		var dt = new Date(this.y, 0, 1, 0, 0, 0);
		var year_begin = Math.round(dt.getTime() / 1000) - dt.getTimezoneOffset() * 60;
		var day_begin = dt.getDay();
		var shift = (day_begin - 1) * 86400;
		var week_begin = year_begin - shift;
		week_begin = week_begin + week * 604800 + dt.getTimezoneOffset() * 60;
		return this.constructor.fromObject(new Date(week_begin*1000), this.tz, false);
		return this;
	},
	/**
	 * Returns timestamp
	 * @return int
	 */
	getTimestamp: function()
	{
		var dt = this.toObject();
		return Math.round(dt.getTime() / 1000);
		return null;
	},
	timestamp: function()
	{
		return this.getTimestamp();
	},
	/**
	 * Returns day of week
	 * @return int
	 */
	getDayOfWeek: function()
	{
		var dt = this.toObject();
		return dt.getDay();
		return null;
	},
	/**
	 * Return db datetime
	 * @return string
	 */
	toString: function(tz)
	{
		if (tz == undefined) tz = "";
		if (tz == "")
		{
			tz = Runtime.rtl.getContext().tz;
		}
		var offset = 0;
		var dt = this.toObject();
		if (tz == "") tz = this.tz;
		
		offset = this.constructor.getTimezoneOffset(tz);
		offset = offset - dt.getTimezoneOffset();
		dt = this.constructor.shiftOffset(dt, -offset);
		
		var y = Number(dt.getFullYear());
		var m = Number(dt.getMonth()) + 1;
		var d = Number(dt.getDate());
		var h = Number(dt.getHours());
		var i = Number(dt.getMinutes());
		var s = Number(dt.getSeconds());
		
		var m = (m < 10) ? "0" + m : "" + m;
		var d = (d < 10) ? "0" + d : "" + d;
		var h = (h < 10) ? "0" + h : "" + h;
		var i = (i < 10) ? "0" + i : "" + i;
		var s = (s < 10) ? "0" + s : "" + s;
		return y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
		return "";
	},
	/**
	 * Returns database time by UTC
	 */
	getDatabaseTime: function()
	{
		return this.toString("UTC");
	},
	/**
	 * Return datetime in RFC822
	 * @return string
	 */
	getRFC822: function()
	{
		var y = this.y, m = this.m, d = this.d, h = this.h, i = this.i, s = this.s;
		var dt = new Date(y, m - 1, d, h, i, s);
		
		y = (y < 10) ? "0" + y : "" + y;
		m = (m < 10) ? "0" + m : "" + m;
		d = (d < 10) ? "0" + d : "" + d;
		h = (h < 10) ? "0" + h : "" + h;
		i = (i < 10) ? "0" + i : "" + i;
		s = (s < 10) ? "0" + s : "" + s;
		
		var dow = dt.getDay();
		var dow_s = "";
		if (dow == 0) dow_s = "Sun";
		if (dow == 1) dow_s = "Mon";
		if (dow == 2) dow_s = "Tue";
		if (dow == 3) dow_s = "Wed";
		if (dow == 4) dow_s = "Thu";
		if (dow == 5) dow_s = "Fri";
		if (dow == 6) dow_s = "Sat";
		
		var m_s = "";
		if (m == 1) m_s = "Jan";
		if (m == 2) m_s = "Feb";
		if (m == 3) m_s = "Mar";
		if (m == 4) m_s = "Apr";
		if (m == 5) m_s = "May";
		if (m == 6) m_s = "Jun";
		if (m == 7) m_s = "Jul";
		if (m == 8) m_s = "Aug";
		if (m == 9) m_s = "Sep";
		if (m == 10) m_s = "Oct";
		if (m == 11) m_s = "Nov";
		if (m == 12) m_s = "Dec";
		
		return dow_s + ", " + d + " " + m_s + " " + y + " " + h + ":" + i + ":" + s + " " + this.tz;
		return "";
	},
	/**
	 * Return datetime in ISO8601
	 * @return string
	 */
	getISO8601: function()
	{
		var y = this.y, m = this.m, d = this.d, h = this.h, i = this.i, s = this.s;
		m = (m < 10) ? "0" + m : "" + m;
		d = (d < 10) ? "0" + d : "" + d;
		h = (h < 10) ? "0" + h : "" + h;
		i = (i < 10) ? "0" + i : "" + i;
		s = (s < 10) ? "0" + s : "" + s;
		var tz = Math.ceil(-this.constructor.getTimezoneOffset(this.tz) / 60);
		if (tz < 10 && tz >= 0) tz = "0" + tz;
		if (tz >= 0) tz = "+" + tz;
		return this.y + "-" + m + "-" + d + "T" + h + ":" + i + ":" + s + tz + "00";
		return "";
	},
	/**
	 * Normalize date time
	 */
	normalize: function()
	{
		return this;
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.y = 1970;
		this.m = 1;
		this.d = 1;
		this.h = 0;
		this.i = 0;
		this.s = 0;
		this.ms = 0;
		this.tz = "UTC";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "y")return this.y;
		else if (k == "m")return this.m;
		else if (k == "d")return this.d;
		else if (k == "h")return this.h;
		else if (k == "i")return this.i;
		else if (k == "s")return this.s;
		else if (k == "ms")return this.ms;
		else if (k == "tz")return this.tz;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.DateTime, Runtime.BaseStruct);
Object.assign(Runtime.DateTime,
{
	/**
	 * Create date time from timestamp
	 */
	create: function(time, tz)
	{
		if (time == undefined) time = -1;
		if (tz == undefined) tz = "UTC";
		var dt = null;
		if (time == -1) dt = new Date();
		else dt = new Date(time*1000);
		return this.fromObject(dt, tz);
		return null;
	},
	/**
	 * Create date time from string
	 */
	from: function(s, tz)
	{
		if (tz == undefined) tz = "UTC";
		if (Runtime.rs.strlen(s) < 19)
		{
			return null;
		}
		if (Runtime.rs.strlen(s) > 19)
		{
			tz = Runtime.rs.substr(s, 19);
		}
		return new Runtime.DateTime(Runtime.Dict.from({"y":Runtime.rtl.to(Runtime.rs.substr(s, 0, 4), {"e":"int"}),"m":Runtime.rtl.to(Runtime.rs.substr(s, 5, 2), {"e":"int"}),"d":Runtime.rtl.to(Runtime.rs.substr(s, 8, 2), {"e":"int"}),"h":Runtime.rtl.to(Runtime.rs.substr(s, 11, 2), {"e":"int"}),"i":Runtime.rtl.to(Runtime.rs.substr(s, 14, 2), {"e":"int"}),"s":Runtime.rtl.to(Runtime.rs.substr(s, 17, 2), {"e":"int"}),"tz":tz}));
	},
	/**
	 * Returns datetime
	 * @param string tz
	 * @return DateTime
	 */
	now: function(tz)
	{
		if (tz == undefined) tz = "UTC";
		return this.create(-1, tz);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.DateTime";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("y");
		a.push("m");
		a.push("d");
		a.push("h");
		a.push("i");
		a.push("s");
		a.push("ms");
		a.push("tz");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "y") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "m") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "d") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "h") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "i") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "s") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ms") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "tz") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"create",
			"from",
			"now",
			"shiftTime",
			"shift",
			"setWeekNumber",
			"getTimestamp",
			"timestamp",
			"getDayOfWeek",
			"toString",
			"getDatabaseTime",
			"getRFC822",
			"getISO8601",
			"normalize",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.DateTime);
window["Runtime.DateTime"] = Runtime.DateTime;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.DateTime;
Runtime.DateTime.getTimezoneOffset = function(tz)
{
	if (tz == "UTC") return 0;
	if (tz == "GMT") return 0;
	if (tz == "GMT+1") return -60;
	if (tz == "GMT+2") return -120;
	if (tz == "GMT+3") return -180;
	if (tz == "GMT+4") return -240;
	if (tz == "GMT+5") return -300;
	if (tz == "GMT+6") return -360;
	if (tz == "GMT+7") return -420;
	if (tz == "GMT+8") return -480;
	if (tz == "GMT+9") return -540;
	if (tz == "GMT+10") return -600;
	if (tz == "GMT+11") return -660;
	if (tz == "GMT+13") return -780;
	if (tz == "GMT+14") return -840;
	if (tz == "GMT-1") return 60;
	if (tz == "GMT-2") return 120;
	if (tz == "GMT-3") return 180;
	if (tz == "GMT-4") return 240;
	if (tz == "GMT-5") return 300;
	if (tz == "GMT-6") return 360;
	if (tz == "GMT-7") return 420;
	if (tz == "GMT-8") return 480;
	if (tz == "GMT-9") return 540;
	if (tz == "GMT-10") return 600;
	if (tz == "GMT-11") return 660;
	if (tz == "GMT-12") return 720;
	return 0;
}

Runtime.DateTime.shiftOffset = function(dt, offset)
{
	var h = Math.floor(offset / 60);
	var m = offset % 60;
	dt.setMinutes(dt.getMinutes() + m);
	dt.setHours(dt.getHours() + h);
	return dt;
}

Runtime.DateTime.prototype.toObject = function()
{
	var dt = new Date(this.y, this.m - 1, this.d, this.h, this.i, this.s);
	var offset = this.constructor.getTimezoneOffset(this.tz);
	var offset = offset - dt.getTimezoneOffset();
	dt = this.constructor.shiftOffset(dt, offset);
	return dt;
}

Runtime.DateTime.fromObject = function(dt, tz, is_shift)
{
	if (is_shift == undefined) is_shift = true;
	var Dict = use("Runtime.Dict");
	if (is_shift)
	{
		var offset = this.getTimezoneOffset(tz);
		var offset = offset - dt.getTimezoneOffset();
		dt = this.shiftOffset(dt, -offset);
	}
	var y = Number(dt.getFullYear());
	var m = Number(dt.getMonth()) + 1;
	var d = Number(dt.getDate());
	var h = Number(dt.getHours());
	var i = Number(dt.getMinutes());
	var s = Number(dt.getSeconds());
	var dt = new Runtime.DateTime(Dict.from({"y":y,"m":m,"d":d,"h":h,"i":i,"s":s,"tz":tz}));
	return dt;
}
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.ModelProxy = function(container, path)
{
	if (path == undefined) path = null;
	Runtime.BaseObject.call(this);
	if (container instanceof Runtime.BaseStruct)
	{
		this.container = new Runtime.Reference(container);
		this.path = Runtime.Collection.from(["ref"]).concat(path);
	}
	else
	{
		this.container = container;
		this.path = path;
	}
};
Runtime.ModelProxy.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.ModelProxy.prototype.constructor = Runtime.ModelProxy;
Object.assign(Runtime.ModelProxy.prototype,
{
	/**
     * Returns path
     */
	getPath: function()
	{
		return (this.path) ? (this.path) : (Runtime.Collection.from([]));
	},
	/**
	 * Returns model data by path
	 */
	data: function()
	{
		return Runtime.rtl.attr(this.container, this.getPath());
	},
	attr: function(path)
	{
		if (path == undefined) path = null;
		return Runtime.rtl.attr(this.container, this.getPath().concat(path));
	},
	/**
	 * Set model attr
	 */
	setAttr: function(path, new_data)
	{
		if (Runtime.rtl.isString(path))
		{
			path = Runtime.Collection.from([path]);
		}
		var old_model = this.data();
		var new_model = Runtime.rtl.setAttr(old_model, path, new_data);
		this.setNewModel(new_model);
	},
	/**
	 * Set new model
	 */
	setNewModel: function(new_model)
	{
		var old_model = this.data();
		this.container = Runtime.rtl.setAttr(this.container, this.getPath(), new_model);
		if (Runtime.rtl.method_exists(this.container, "onUpdateModel"))
		{
			this.container.onUpdateModel(this.getPath(), old_model, new_model);
		}
	},
	/**
	 * Call method name
	 */
	call: function(method_name)
	{
		var args = null;
		var old_model = this.data();
		var value = null;
		args = Runtime.Collection.from( [ ...arguments ].slice(1) );
		if (old_model == null)
		{
			throw new Runtime.Exceptions.RuntimeException("model is null")
		}
		var class_name = old_model.constructor.getClassName();
		if (Runtime.rtl.method_exists(old_model, method_name))
		{
			var f = Runtime.rtl.method(old_model, method_name);
			value = Runtime.rtl.apply(f, args);
		}
		else if (Runtime.rtl.method_exists(class_name, method_name))
		{
			var f = Runtime.rtl.method(class_name, method_name);
			args = args.prependIm(old_model);
			value = Runtime.rtl.apply(f, args);
		}
		else
		{
			throw new Runtime.Exceptions.FileNotFound(class_name + Runtime.rtl.toStr("::") + Runtime.rtl.toStr(method_name), "Method")
		}
		return value;
	},
	/**
	 * Commit model
	 */
	commit: function(method_name)
	{
		var args = null;
		var old_model = this.data();
		var new_model = null;
		args = Runtime.Collection.from( [ ...arguments ].slice(1) );
		if (old_model == null)
		{
			throw new Runtime.Exceptions.RuntimeException("model is null")
		}
		var class_name = old_model.constructor.getClassName();
		if (Runtime.rtl.method_exists(old_model, method_name))
		{
			var f = Runtime.rtl.method(old_model, method_name);
			new_model = Runtime.rtl.apply(f, args);
		}
		else if (Runtime.rtl.method_exists(class_name, method_name))
		{
			var f = Runtime.rtl.method(class_name, method_name);
			args = args.prependIm(old_model);
			new_model = Runtime.rtl.apply(f, args);
		}
		else
		{
			throw new Runtime.Exceptions.FileNotFound(class_name + Runtime.rtl.toStr("::") + Runtime.rtl.toStr(method_name), "Method")
		}
		this.setNewModel(new_model);
	},
	/**
	 * Commit model
	 */
	commitAsync: async function(method_name)
	{
		var res = null;
		var args = null;
		var model = this.data();
		var class_name = model.constructor.getClassName();
		args = Runtime.Collection.from( [ ...arguments ].slice(1) );
		if (Runtime.rtl.method_exists(class_name, method_name))
		{
			var f = Runtime.rtl.method(class_name, method_name);
			args = args.prependIm(this);
			res = await Runtime.rtl.applyAsync(f, args);
		}
		else
		{
			throw new Runtime.Exceptions.FileNotFound(class_name + Runtime.rtl.toStr("::") + Runtime.rtl.toStr(method_name), "Method")
		}
		return Promise.resolve(res);
	},
	/**
	 * Commit model
	 */
	proxy: function(path)
	{
		if (Runtime.rtl.isString(path))
		{
			path = Runtime.Collection.from([path]);
		}
		return new Runtime.ModelProxy(this.container, this.getPath().concat(path));
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.container = null;
		this.path = null;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.ModelProxy)
		{
			this.container = o.container;
			this.path = o.path;
		}
		Runtime.BaseObject.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "container")this.container = v;
		else if (k == "path")this.path = v;
		else Runtime.BaseObject.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "container")return this.container;
		else if (k == "path")return this.path;
		return Runtime.BaseObject.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.ModelProxy, Runtime.BaseObject);
Object.assign(Runtime.ModelProxy,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.ModelProxy";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("container");
		a.push("path");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "container") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "path") return Dict.from({
			"t": "Runtime.Collection",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
			"getPath",
			"data",
			"attr",
			"setAttr",
			"setNewModel",
			"call",
			"commit",
			"commitAsync",
			"proxy",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.ModelProxy);
window["Runtime.ModelProxy"] = Runtime.ModelProxy;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ModelProxy;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Reference = function(ref)
{
	if (ref == undefined) ref = null;
	Runtime.BaseObject.call(this);
	this.ref = ref;
};
Runtime.Reference.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Reference.prototype.constructor = Runtime.Reference;
Object.assign(Runtime.Reference.prototype,
{
	/**
	 * Assign and clone data from other object
	 * @param BaseObject obj
	 */
	assignObject1: function(obj)
	{
		if (obj instanceof Runtime.Reference)
		{
			this.uq = obj.uq;
			this.ref = this.ref;
		}
		Runtime.BaseObject.prototype.assignObject1.call(this, obj);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.uq = Runtime.rtl.unique();
		this.ref = null;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Reference)
		{
			this.uq = o.uq;
			this.ref = o.ref;
		}
		Runtime.BaseObject.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "uq")this.uq = v;
		else if (k == "ref")this.ref = v;
		else Runtime.BaseObject.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "uq")return this.uq;
		else if (k == "ref")return this.ref;
		return Runtime.BaseObject.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Reference, Runtime.BaseObject);
Object.assign(Runtime.Reference,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Reference";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("uq");
		a.push("ref");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "uq") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ref") return Dict.from({
			"t": "T",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
			"assignObject1",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Reference);
window["Runtime.Reference"] = Runtime.Reference;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Reference;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Context = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Context.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Context.prototype.constructor = Runtime.Context;
Object.assign(Runtime.Context.prototype,
{
	/**
	 * Add provider
	 */
	addProvider: function(provider_name, provider)
	{
		var c = this;
		if (this.providers.has(provider_name))
		{
			throw new Runtime.Exceptions.RuntimeException("Provider + '" + provider_name + "' already registered")
		}
		if (!(provider instanceof Runtime.BaseProvider))
		{
			throw new Runtime.Exceptions.RuntimeException("Provider + '" + provider_name + "' must be intstanceof BaseProvider")
		}
		c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["providers"]), c.providers.setIm(provider_name, provider));
		return c;
	},
	/**
	 * Returns provider by name
	 */
	provider: function(provider_name)
	{
		if (!this.providers.has(provider_name))
		{
			throw new Runtime.Exceptions.RuntimeException("Provider '" + Runtime.rtl.toStr(provider_name) + Runtime.rtl.toStr("' not found"))
		}
		return this.providers.get(provider_name);
	},
	/**
	 * Return environment
	 */
	env: function(name)
	{
		var value = Runtime.rtl.get(this.environments, name);
		var hook_res = this.callHook(Runtime.Hooks.RuntimeHook.ENV, Runtime.Dict.from({"name":name,"value":value}));
		return Runtime.rtl.get(hook_res, "value");
	},
	/**
	 * Init
	 */
	init: async function()
	{
		var hook_res;
		var c = this;
		if (c.initialized)
		{
			return Promise.resolve(c);
		}
		/* Add start modules */
		c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["start_modules"]), c.modules);
		/* Get modules */
		var modules = c.modules;
		if (modules.indexOf("Runtime"))
		{
			modules = modules.prependIm("Runtime");
		}
		/* Extends modules */
		var modules = this.constructor.getRequiredModules(modules);
		c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["modules"]), modules);
		/* Get modules entities */
		var entities = this.constructor.getEntitiesFromModules(modules);
		c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["entities"]), entities);
		/* Create providers */
		var providers = c.entities.filter(Runtime.lib.isInstance("Runtime.Entity.Provider"));
		for (var i = 0;i < providers.count();i++)
		{
			var info = Runtime.rtl.get(providers, i);
			if (info.value)
			{
				var provider = null;
				if (info.value instanceof Runtime.BaseProvider)
				{
					provider = info.value;
				}
				else if (Runtime.rtl.isString(info.value))
				{
					provider = Runtime.rtl.newInstance(info.value);
				}
				if (provider)
				{
					c = c.addProvider(info.name, provider);
				}
				else if (info.value)
				{
					throw new Runtime.Exceptions.RuntimeException("Wrong declare provider '" + Runtime.rtl.toStr(info.name) + Runtime.rtl.toStr("'"))
				}
			}
		}
		/* Create app */
		if (c.entry_point != "")
		{
			c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["app"]), Runtime.rtl.newInstance(c.entry_point));
		}
		/* Init providers */
		var providers_names = c.providers.keys();
		for (var i = 0;i < providers_names.count();i++)
		{
			var provider_name = Runtime.rtl.get(providers_names, i);
			var provider = Runtime.rtl.get(c.providers, provider_name);
			c = await provider.init(c);
		}
		/* Hook init app */
		hook_res = await c.callAsyncHook(Runtime.Hooks.RuntimeHook.INIT, Runtime.Dict.from({"context":c}));
		c = Runtime.rtl.get(hook_res, "context");
		/* Init app */
		if (c.app != null && Runtime.rtl.method_exists(c.app, "init"))
		{
			c = await c.app.init(c);
		}
		/* Set initialized */
		c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["initialized"]), true);
		return Promise.resolve(c);
	},
	/**
	 * Start context
	 */
	start: async function()
	{
		/* Start providers */
		var providers_names = this.providers.keys();
		for (var i = 0;i < providers_names.count();i++)
		{
			var provider_name = Runtime.rtl.get(providers_names, i);
			var provider = Runtime.rtl.get(this.providers, provider_name);
			if (!provider.started)
			{
				await provider.start();
				provider.started = true;
			}
		}
		/* Hook start app */
		await this.callAsyncHook(Runtime.Hooks.RuntimeHook.START, Runtime.Dict.from({}));
		/* Start app */
		if (this.app && Runtime.rtl.method_exists(this.app, "start"))
		{
			await this.app.start();
		}
		/* Hook launched app */
		await this.callAsyncHook(Runtime.Hooks.RuntimeHook.LAUNCHED, Runtime.Dict.from({}));
	},
	/**
	 * Run context
	 */
	run: async function()
	{
		var code = 0;
		/* Run app */
		if (this.app == null)
		{
			return Promise.resolve();
		}
		/* Run entry_point */
		if (Runtime.rtl.method_exists(this.app, "main"))
		{
			/* Hook launched app */
			await this.callAsyncHook(Runtime.Hooks.RuntimeHook.RUN, Runtime.Dict.from({}));
			code = await this.app.main();
		}
		return Promise.resolve(code);
	},
	/**
	 * Call hook
	 */
	callHook: function(hook_name, d)
	{
		var hook = this.provider("hook");
		var methods_list = hook.getMethods(hook_name);
		for (var i = 0;i < methods_list.count();i++)
		{
			var info = Runtime.rtl.get(methods_list, i);
			var f = Runtime.rtl.method(Runtime.rtl.get(info, "obj"), Runtime.rtl.get(info, "method_name"));
			d = f(d);
		}
		return d;
	},
	/**
	 * Call async hook
	 */
	callAsyncHook: async function(hook_name, d)
	{
		var hook = this.provider("hook");
		var methods_list = hook.getMethods(hook_name);
		for (var i = 0;i < methods_list.count();i++)
		{
			var info = Runtime.rtl.get(methods_list, i);
			var f = Runtime.rtl.method(Runtime.rtl.get(info, "obj"), Runtime.rtl.get(info, "method_name"));
			d = await f(d);
		}
		return Promise.resolve(d);
	},
	/**
	 * Translate message
	 */
	translate: function(module, s, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			return s;
		}
		return this.format(s, params);
	},
	/**
	 * Format string
	 */
	format: function(s, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			return s;
		}
		params.each((value, key) => 
		{
			s = Runtime.rs.replace("%" + Runtime.rtl.toStr(key) + Runtime.rtl.toStr("%"), value, s);
		});
		return s;
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.app = null;
		this.base_path = "";
		this.entry_point = "";
		this.start_modules = Runtime.Collection.from([]);
		this.cli_args = Runtime.Collection.from([]);
		this.environments = Runtime.Dict.from({});
		this.modules = Runtime.Collection.from([]);
		this.providers = Runtime.Dict.from({});
		this.entities = Runtime.Collection.from([]);
		this.start_time = 0;
		this.tz = "UTC";
		this.initialized = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "app")return this.app;
		else if (k == "base_path")return this.base_path;
		else if (k == "entry_point")return this.entry_point;
		else if (k == "start_modules")return this.start_modules;
		else if (k == "cli_args")return this.cli_args;
		else if (k == "environments")return this.environments;
		else if (k == "modules")return this.modules;
		else if (k == "providers")return this.providers;
		else if (k == "entities")return this.entities;
		else if (k == "start_time")return this.start_time;
		else if (k == "tz")return this.tz;
		else if (k == "initialized")return this.initialized;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Context, Runtime.BaseStruct);
Object.assign(Runtime.Context,
{
	/**
	 * Returns modules entities
	 */
	getEntitiesFromModules: function(modules)
	{
		var entities = new Runtime.Vector();
		for (var i = 0;i < modules.count();i++)
		{
			var module_class_name = modules.item(i) + Runtime.rtl.toStr(".ModuleDescription");
			if (Runtime.rtl.method_exists(module_class_name, "entities"))
			{
				var f = Runtime.rtl.method(module_class_name, "entities");
				var arr = f();
				entities.appendVector(arr);
			}
		}
		return entities.removeDuplicates().toCollection();
	},
	/**
	 * Create context
	 */
	create: function(d)
	{
		if (!(d instanceof Runtime.Dict))
		{
			d = Runtime.Dict.from(d);
		}
		if (!d.has("start_time"))
		{
			d = d.setIm("start_time", Date.now());
		}
		if (d.has("modules"))
		{
			var modules = d.get("modules");
			if (!(modules instanceof Runtime.Collection))
			{
				d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["modules"]), Runtime.Collection.from(modules));
			}
		}
		/* Setup default environments */
		if (!d.has("environments"))
		{
			d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["environments"]), new Runtime.Dict());
		}
		var env = Runtime.rtl.get(d, "environments");
		if (!env.has("DEBUG"))
		{
			env = Runtime.rtl.setAttr(env, Runtime.Collection.from(["DEBUG"]), false);
		}
		if (!env.has("LOCALE"))
		{
			env = Runtime.rtl.setAttr(env, Runtime.Collection.from(["LOCALE"]), "en_US");
		}
		if (!env.has("LOCALE_CODE"))
		{
			env = Runtime.rtl.setAttr(env, Runtime.Collection.from(["LOCALE_CODE"]), "en");
		}
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["environments"]), env);
		var instance = Runtime.rtl.newInstance(this.getClassName(), Runtime.Collection.from([d]));
		return instance;
	},
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	_getRequiredModules: function(res, cache, modules, filter)
	{
		if (filter == undefined) filter = null;
		if (modules == null)
		{
			return ;
		}
		if (filter)
		{
			modules = modules.filter(filter);
		}
		for (var i = 0;i < modules.count();i++)
		{
			var module_name = modules.item(i);
			if (cache.get(module_name, false) == false)
			{
				cache.setValue(module_name, true);
				var f = Runtime.rtl.method(module_name + Runtime.rtl.toStr(".ModuleDescription"), "requiredModules");
				var sub_modules = f();
				if (sub_modules != null)
				{
					var sub_modules = sub_modules.keys();
					this._getRequiredModules(res, cache, sub_modules);
				}
				res.pushValue(module_name);
			}
		}
	},
	/**
	 * Returns all modules
	 * @param Collection<string> modules
	 * @return Collection<string>
	 */
	getRequiredModules: function(modules)
	{
		var res = new Runtime.Vector();
		var cache = new Runtime.Map();
		this._getRequiredModules(res, cache, modules);
		res = res.removeDuplicates();
		return res.toCollection();
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Context";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("app");
		a.push("base_path");
		a.push("entry_point");
		a.push("start_modules");
		a.push("cli_args");
		a.push("environments");
		a.push("modules");
		a.push("providers");
		a.push("entities");
		a.push("start_time");
		a.push("tz");
		a.push("initialized");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "app") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "base_path") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entry_point") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "start_modules") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "cli_args") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "environments") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "modules") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "providers") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["Runtime.BaseObject"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entities") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Runtime.BaseStruct"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "start_time") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "tz") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "initialized") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getEntitiesFromModules",
			"addProvider",
			"provider",
			"env",
			"create",
			"init",
			"start",
			"run",
			"callHook",
			"callAsyncHook",
			"_getRequiredModules",
			"getRequiredModules",
			"translate",
			"format",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Context);
window["Runtime.Context"] = Runtime.Context;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Context;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Entity = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Entity.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Entity.prototype.constructor = Runtime.Entity;
Object.assign(Runtime.Entity.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.name = "";
		this.params = Runtime.Dict.from({});
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "params")return this.params;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Entity, Runtime.BaseStruct);
Object.assign(Runtime.Entity,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Entity";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("name");
		a.push("params");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return Dict.from({
			"t": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Entity);
window["Runtime.Entity"] = Runtime.Entity;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Entity;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.ModuleDescription = function()
{
};
Object.assign(Runtime.ModuleDescription.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.ModuleDescription)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Runtime.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function()
	{
		return "Runtime";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function()
	{
		return "0.11.4";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function()
	{
		return null;
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return Runtime.Collection.from([new Runtime.Entity.Provider("input", null),new Runtime.Entity.Provider("output", "Runtime.Providers.OutputProvider"),new Runtime.Entity.Provider("log", null),new Runtime.Entity.Provider("hook", "Runtime.Providers.HookProvider")]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.ModuleDescription";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getModuleName",
			"getModuleVersion",
			"requiredModules",
			"entities",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.ModuleDescription);
window["Runtime.ModuleDescription"] = Runtime.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ModuleDescription;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Entity == 'undefined') Runtime.Entity = {};
Runtime.Entity.Hook = function(name)
{
	Runtime.Entity.call(this, Runtime.Dict.from({"name":name}));
};
Runtime.Entity.Hook.prototype = Object.create(Runtime.Entity.prototype);
Runtime.Entity.Hook.prototype.constructor = Runtime.Entity.Hook;
Object.assign(Runtime.Entity.Hook.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Entity.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Entity.Hook, Runtime.Entity);
Object.assign(Runtime.Entity.Hook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Entity";
	},
	getClassName: function()
	{
		return "Runtime.Entity.Hook";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Entity.Hook);
window["Runtime.Entity.Hook"] = Runtime.Entity.Hook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Entity.Hook;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Entity == 'undefined') Runtime.Entity = {};
Runtime.Entity.Provider = function(name, value)
{
	Runtime.Entity.call(this, Runtime.Dict.from({"name":name,"value":value}));
};
Runtime.Entity.Provider.prototype = Object.create(Runtime.Entity.prototype);
Runtime.Entity.Provider.prototype.constructor = Runtime.Entity.Provider;
Object.assign(Runtime.Entity.Provider.prototype,
{
	_init: function()
	{
		Runtime.Entity.prototype._init.call(this);
		this.value = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "value")return this.value;
		return Runtime.Entity.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Entity.Provider, Runtime.Entity);
Object.assign(Runtime.Entity.Provider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Entity";
	},
	getClassName: function()
	{
		return "Runtime.Entity.Provider";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("value");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "value") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Entity.Provider);
window["Runtime.Entity.Provider"] = Runtime.Entity.Provider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Entity.Provider;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Hooks == 'undefined') Runtime.Hooks = {};
Runtime.Hooks.RuntimeHook = function()
{
	Runtime.BaseHook.apply(this, arguments);
};
Runtime.Hooks.RuntimeHook.prototype = Object.create(Runtime.BaseHook.prototype);
Runtime.Hooks.RuntimeHook.prototype.constructor = Runtime.Hooks.RuntimeHook;
Object.assign(Runtime.Hooks.RuntimeHook.prototype,
{
	/**
	 * Returns method name by hook name
	 */
	getMethodName: function(hook_name)
	{
		if (hook_name == this.constructor.INIT)
		{
			return "init";
		}
		if (hook_name == this.constructor.START)
		{
			return "start";
		}
		if (hook_name == this.constructor.LAUNCHED)
		{
			return "launched";
		}
		if (hook_name == this.constructor.RUN)
		{
			return "run";
		}
		if (hook_name == this.constructor.ENV)
		{
			return "env";
		}
		return "";
	},
	/**
	 * Init context
	 */
	init: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Start context
	 */
	start: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Launched context
	 */
	launched: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Run entry point
	 */
	run: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Init context
	 */
	env: function(d)
	{
		return d;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Hooks.RuntimeHook)
		{
		}
		Runtime.BaseHook.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.BaseHook.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseHook.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Hooks.RuntimeHook, Runtime.BaseHook);
Object.assign(Runtime.Hooks.RuntimeHook,
{
	INIT: "runtime::init",
	START: "runtime::start",
	LAUNCHED: "runtime::launched",
	RUN: "runtime::run",
	ENV: "runtime::env",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Hooks.RuntimeHook";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseHook";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getMethodName",
			"init",
			"start",
			"launched",
			"run",
			"env",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Hooks.RuntimeHook);
window["Runtime.Hooks.RuntimeHook"] = Runtime.Hooks.RuntimeHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Hooks.RuntimeHook;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Providers == 'undefined') Runtime.Providers = {};
Runtime.Providers.HookProvider = function()
{
	Runtime.BaseProvider.apply(this, arguments);
};
Runtime.Providers.HookProvider.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.Providers.HookProvider.prototype.constructor = Runtime.Providers.HookProvider;
Object.assign(Runtime.Providers.HookProvider.prototype,
{
	/**
	 * Init provider
	 */
	init: async function(c)
	{
		var hooks = c.entities.filter(Runtime.lib.isInstance("Runtime.Entity.Hook"));
		var base_hooks = new Runtime.Vector();
		for (var i = 0;i < hooks.count();i++)
		{
			var hook = Runtime.rtl.get(hooks, i);
			var base_hook = Runtime.rtl.newInstance(hook.name);
			base_hooks.pushValue(base_hook);
			base_hook.hook = this;
			base_hook.register_hooks();
			base_hooks.pushValue(base_hook);
		}
		this.base_hooks = base_hooks.toCollection();
		return Promise.resolve(c);
	},
	/**
	 * Start provider
	 */
	start: async function()
	{
	},
	/**
	 * Register hook
	 */
	register: function(hook_name, obj, method_name, priority)
	{
		if (priority == undefined) priority = 0;
		if (!this.hooks.has(hook_name))
		{
			this.hooks.setValue(hook_name, new Runtime.Map());
		}
		var priorities = Runtime.rtl.get(this.hooks, hook_name);
		if (!priorities.has(priority))
		{
			priorities.setValue(priority, new Runtime.Vector());
		}
		var methods_list = priorities.get(priority);
		methods_list.pushValue(Runtime.Dict.from({"obj":obj,"method_name":method_name}));
	},
	/**
	 * Remove hook
	 */
	remove: function(hook_name, obj, method_name, priority)
	{
		if (priority == undefined) priority = 0;
		if (!this.hooks.has(hook_name))
		{
			this.hooks.setValue(hook_name, new Runtime.Map());
		}
		var priorities = Runtime.rtl.get(this.hooks, hook_name);
		if (!priorities.has(priority))
		{
			priorities.setValue(priority, new Runtime.Vector());
		}
		var methods_list = priorities.get(priority);
		var index = methods_list.find((info) => 
		{
			return Runtime.rtl.get(info, "obj") == obj && Runtime.rtl.get(info, "method_name") == method_name;
		});
		if (index > -1)
		{
			methods_list.removePosition(index);
		}
	},
	/**
	 * Returns method list
	 */
	getMethods: function(hook_name)
	{
		if (!this.hooks.has(hook_name))
		{
			return Runtime.Collection.from([]);
		}
		var res = new Runtime.Vector();
		var priorities = Runtime.rtl.get(this.hooks, hook_name);
		var priorities_keys = priorities.keys().sort();
		for (var i = 0;i < priorities_keys.count();i++)
		{
			var priority = Runtime.rtl.get(priorities_keys, i);
			var methods_list = priorities.get(priority);
			res.appendVector(methods_list);
		}
		return res.toCollection();
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.base_hooks = Runtime.Collection.from([]);
		this.hooks = new Runtime.Map();
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Providers.HookProvider)
		{
			this.base_hooks = o.base_hooks;
			this.hooks = o.hooks;
		}
		Runtime.BaseProvider.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "base_hooks")this.base_hooks = v;
		else if (k == "hooks")this.hooks = v;
		else Runtime.BaseProvider.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "base_hooks")return this.base_hooks;
		else if (k == "hooks")return this.hooks;
		return Runtime.BaseProvider.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Providers.HookProvider, Runtime.BaseProvider);
Object.assign(Runtime.Providers.HookProvider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Providers";
	},
	getClassName: function()
	{
		return "Runtime.Providers.HookProvider";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("base_hooks");
		a.push("hooks");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "base_hooks") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Runtime.BaseHook"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "hooks") return Dict.from({
			"t": "Runtime.Map",
			"s": ["Runtime.Map"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"init",
			"start",
			"register",
			"remove",
			"getMethods",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Providers.HookProvider);
window["Runtime.Providers.HookProvider"] = Runtime.Providers.HookProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Providers.HookProvider;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Providers == 'undefined') Runtime.Providers = {};
Runtime.Providers.OutputProvider = function()
{
	Runtime.BaseProvider.call(this);
	this.color_table = Runtime.Dict.from({"black":"0;30","dark_red":"0;31","green":"0;32","brown":"0;33","dark_blue":"0;34","dark_purple":"0;35","dark_cyan":"0;36","gray":"0;37","dark_gray":"0;90","red":"0;91","light_green":"0;92","yellow":"0;93","blue":"0;94","purple":"0;95","cyan":"0;96","white":"0;97","bold_black":"1;30","bold_dark_red":"1;31","bold_green":"1;32","bold_brown":"1;33","bold_dark_blue":"1;34","bold_dark_purple":"1;35","bold_dark_cyan":"1;36","bold_gray":"1;37","bold_dark_gray":"1;90","bold_red":"1;91","bold_light_green":"1;92","bold_yellow":"1;93","bold_blue":"1;94","bold_purple":"1;95","bold_cyan":"1;96","bold_white":"1;97","italic_black":"3;30","italic_dark_red":"3;31","italic_green":"3;32","italic_brown":"3;33","italic_dark_blue":"3;34","italic_dark_purple":"3;35","italic_dark_cyan":"3;36","italic_gray":"3;37","italic_dark_gray":"3;90","italic_red":"3;91","italic_light_green":"3;92","italic_yellow":"3;93","italic_blue":"3;94","italic_purple":"3;95","italic_cyan":"3;96","italic_white":"3;97","underline_black":"4;30","underline_dark_red":"4;31","underline_green":"4;32","underline_brown":"4;33","underline_dark_blue":"4;34","underline_dark_purple":"4;35","underline_dark_cyan":"4;36","underline_gray":"4;37","underline_dark_gray":"4;90","underline_red":"4;91","underline_light_green":"4;92","underline_yellow":"4;93","underline_blue":"4;94","underline_purple":"4;95","underline_cyan":"4;96","underline_white":"4;97","bg_black":"0;40","bg_dark_red":"0;41","bg_green":"0;42","bg_brown":"0;43","bg_dark_blue":"0;44","bg_dark_purple":"0;45","bg_dark_cyan":"0;46","bg_gray":"0;47","bg_dark_gray":"0;100","bg_red":"0;101","bg_light_green":"0;102","bg_yellow":"0;103","bg_blue":"0;104","bg_purple":"0;105","bg_cyan":"0;106","bg_white":"0;107","bg_italic_black":"3;40","bg_italic_dark_red":"3;41","bg_italic_green":"3;42","bg_italic_brown":"3;43","bg_italic_dark_blue":"3;44","bg_italic_dark_purple":"3;45","bg_italic_dark_cyan":"3;46","bg_italic_gray":"3;47","bg_italic_dark_gray":"3;100","bg_italic_red":"3;101","bg_italic_light_green":"3;102","bg_italic_yellow":"3;103","bg_italic_blue":"3;104","bg_italic_purple":"3;105","bg_italic_cyan":"3;106","bg_italic_white":"3;107","bg_underline_black":"4;40","bg_underline_dark_red":"4;41","bg_underline_green":"4;42","bg_underline_brown":"4;43","bg_underline_dark_blue":"4;44","bg_underline_dark_purple":"4;45","bg_underline_dark_cyan":"4;46","bg_underline_gray":"4;47","bg_underline_dark_gray":"4;100","bg_underline_red":"4;101","bg_underline_light_green":"4;102","bg_underline_yellow":"4;103","bg_underline_blue":"4;104","bg_underline_purple":"4;105","bg_underline_cyan":"4;106","bg_underline_white":"4;107"});
};
Runtime.Providers.OutputProvider.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.Providers.OutputProvider.prototype.constructor = Runtime.Providers.OutputProvider;
Object.assign(Runtime.Providers.OutputProvider.prototype,
{
	/**
	 * Print message to output
	 */
	print: function(message, new_line, type)
	{
		if (new_line == undefined) new_line = true;
		if (type == undefined) type = "";
		if (!Runtime.rtl.isString(message))
		{
			throw new Runtime.Exceptions.RuntimeException("print message must be string")
		}
		console.log(message);
	},
	/**
	 * Print error
	 */
	print_error: function(message)
	{
		let text_color = "dark_red";
		if (message instanceof Error)
		{
			let color = this.getColor(text_color);
			let char_27 = String.fromCharCode(27);
			
			this.print(char_27 + "[" + color + "m", false, "err");
			this.print(message.stack, false, "err");
			this.print(char_27 + "[0m", true, "err");
		}
		
		else
		{
			this.print(this.color(text_color, message), true, "err");
		}
	},
	/**
	 * Format text by color
	 */
	color: function(color, message)
	{
		color = this.getColor(color);
		message = Runtime.rs.chr(27) + Runtime.rtl.toStr("[") + Runtime.rtl.toStr(color) + Runtime.rtl.toStr("m") + Runtime.rtl.toStr(message);
		message = message + Runtime.rtl.toStr(Runtime.rs.chr(27)) + Runtime.rtl.toStr("[0m");
		return message;
	},
	/**
	 * Returns bash console code
	 */
	getColor: function(color)
	{
		var color = Runtime.rs.strtolower(color);
		if (this.color_table.has(color))
		{
			return Runtime.rtl.get(this.color_table, color);
		}
		if (Runtime.rs.strlen(color) > 5)
		{
			return "0";
		}
		return color;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Providers.OutputProvider)
		{
		}
		Runtime.BaseProvider.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.BaseProvider.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseProvider.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Providers.OutputProvider, Runtime.BaseProvider);
Object.assign(Runtime.Providers.OutputProvider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Providers";
	},
	getClassName: function()
	{
		return "Runtime.Providers.OutputProvider";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
			"print",
			"print_error",
			"color",
			"getColor",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Providers.OutputProvider);
window["Runtime.Providers.OutputProvider"] = Runtime.Providers.OutputProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Providers.OutputProvider;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.App = function()
{
	Runtime.BaseProvider.apply(this, arguments);
};
Runtime.Web.App.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.Web.App.prototype.constructor = Runtime.Web.App;
Object.assign(Runtime.Web.App.prototype,
{
	/**
	 * Init app
	 */
	init: async function(c)
	{
		return Promise.resolve(c);
	},
	/**
	 * Start app
	 */
	start: async function()
	{
	},
	/**
	 * Main entry point
	 */
	main: async function()
	{
		await Runtime.rtl.getContext().callAsyncHook(Runtime.Web.AppHook.MAIN, Runtime.Dict.from({}));
		this.renderFrontend();
	},
	/**
	 * Render backend
	 */
	renderBackend: async function()
	{
	},
	/**
	 * Render backend
	 */
	renderFrontend: async function()
	{
		let context = Runtime.rtl.getContext();
		let core_ui_root = document.getElementById("core_ui_root");
		/*let layout = Runtime.rs.base64_decode_url(window["data_core_ui_layout"]);*/
		/*layout = Runtime.rtl.json_decode(layout);*/
		let layout = window["data_core_ui_layout"];
		layout = Runtime.rtl.NativeToObject(layout);
		let layout_page_class_name = layout.getLayoutClassName();
		let provider = context.provider("Runtime.Web.RenderProvider");
		provider.renderRoot(core_ui_root, layout_page_class_name, layout);
	},
	/**
	 * Resolve container
	 */
	initContainer: async function(container)
	{
		var context = Runtime.rtl.getContext();
		context = Runtime.rtl.setAttr(context, Runtime.Collection.from(["environments", "render_container"]), container);
		Runtime.rtl.setContext(context);
		/* Init container */
		Runtime.rtl.getContext().callAsyncHook(Runtime.Web.AppHook.INIT_CONTAINER, Runtime.Dict.from({"container":container}));
	},
	/**
	 * Resolve container
	 */
	resolveContainer: async function(container, models)
	{
		if (models == undefined) models = null;
		/* Find route */
		await this.findRoute(container);
		/* Init layout */
		await this.initLayout(container, models);
		/* Call route */
		await this.callRoute(container);
		/* Call hook response */
		await Runtime.rtl.getContext().callAsyncHook(Runtime.Web.AppHook.RESPONSE, Runtime.Dict.from({"container":container}));
	},
	/**
	 * Init layout
	 */
	initLayout: async function(container, models)
	{
		if (models == undefined) models = null;
		/* Create layout */
		await Runtime.rtl.getContext().callAsyncHook(Runtime.Web.AppHook.CREATE_LAYOUT, Runtime.Dict.from({"container":container}));
		if (container.layout == null)
		{
			container = Runtime.rtl.setAttr(container, Runtime.Collection.from(["layout"]), new Runtime.Web.Layout());
		}
		/* Set models */
		if (models)
		{
			container = Runtime.rtl.setAttr(container, Runtime.Collection.from(["models"]), models);
		}
		/* Setup request params */
		container = Runtime.rtl.setAttr(container, Runtime.Collection.from(["layout", "route"]), container.route);
		container = Runtime.rtl.setAttr(container, Runtime.Collection.from(["layout", "request_host"]), container.request.host);
		container = Runtime.rtl.setAttr(container, Runtime.Collection.from(["layout", "request_uri"]), container.request.uri);
		container = Runtime.rtl.setAttr(container, Runtime.Collection.from(["layout", "request_full_uri"]), container.request.full_uri);
		container = Runtime.rtl.setAttr(container, Runtime.Collection.from(["layout", "request_query"]), container.request.query);
		await Runtime.rtl.getContext().callAsyncHook(Runtime.Web.AppHook.INIT_LAYOUT, Runtime.Dict.from({"container":container}));
		container = Runtime.rtl.setAttr(container, Runtime.Collection.from(["layout"]), await container.layout.init_layout());
	},
	/**
	 * Find route
	 */
	findRoute: async function(container)
	{
		/* Call hook find route */
		await Runtime.rtl.getContext().callAsyncHook(Runtime.Web.AppHook.FIND_ROUTE, Runtime.Dict.from({"container":container}));
		/* Find route */
		if (container.route == null)
		{
			var routes = Runtime.rtl.getContext().provider("Runtime.Web.RouteList");
			container.route = routes.findRoute(container);
		}
		/* Call hook found route */
		await Runtime.rtl.getContext().callAsyncHook(Runtime.Web.AppHook.FIND_ROUTE_AFTER, Runtime.Dict.from({"container":container}));
	},
	/**
	 * Call route
	 */
	callRoute: async function(container)
	{
		/* Call route before */
		await Runtime.rtl.getContext().callAsyncHook(Runtime.Web.AppHook.CALL_ROUTE_BEFORE, Runtime.Dict.from({"container":container}));
		/* Call middleware */
		if (container.route && container.route.middleware)
		{
			for (var i = 0;i < container.route.middleware.count();i++)
			{
				var class_name_middleware = Runtime.rtl.get(container.route.middleware, i);
				var middleware_method = Runtime.rtl.method(class_name_middleware, "actionMiddleware");
				await middleware_method(container);
			}
		}
		/* Call route before */
		await Runtime.rtl.getContext().callAsyncHook(Runtime.Web.AppHook.MIDDLEWARE, Runtime.Dict.from({"container":container}));
		/* Call route */
		if (container.route != null && container.response == null)
		{
			await container.callMethod(container.route.method);
		}
		/* Call route after */
		await Runtime.rtl.getContext().callAsyncHook(Runtime.Web.AppHook.CALL_ROUTE_AFTER, Runtime.Dict.from({"container":container}));
	},
	/**
	 * Render component
	 */
	render: function(class_name, model)
	{
		return "";
	},
	/**
	 * Returns url
	 */
	url: function(route_name, route_params)
	{
		if (route_params == undefined) route_params = null;
		var routes = Runtime.rtl.getContext().provider("Runtime.Web.RouteList");
		return routes.url(route_name, route_params);
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.App)
		{
		}
		Runtime.BaseProvider.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.BaseProvider.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseProvider.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.App, Runtime.BaseProvider);
Object.assign(Runtime.Web.App,
{
	/**
	 * Returns css
	 */
	getCss: function(class_names, css_vars)
	{
		if (css_vars == undefined) css_vars = null;
		if (css_vars == null)
		{
			css_vars = Runtime.rtl.getContext().callHook(Runtime.Web.AppHook.CSS_VARS, css_vars);
		}
		/* Get required components */
		var components = this.getRequiredComponents(class_names);
		components = components.filter(Runtime.lib.equalNot("")).removeDuplicatesIm();
		/* Get css */
		var css = components.map((component_name) => 
		{
			if (component_name == "")
			{
				return "";
			}
			if (!Runtime.rtl.method_exists(component_name, "css"))
			{
				return "";
			}
			var f = Runtime.rtl.method(component_name, "css");
			var css = f(css_vars);
			return css;
		});
		css = css.map((s) => 
		{
			return Runtime.rs.trim(s);
		}).filter((s) => 
		{
			return s != "";
		});
		return Runtime.rs.trim(Runtime.rs.join("\n", css));
	},
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	_getRequiredComponents: function(res, cache, components)
	{
		if (components == null)
		{
			return ;
		}
		for (var i = 0;i < components.count();i++)
		{
			var class_name = components.item(i);
			if (cache.get(class_name, false) == false)
			{
				cache.setValue(class_name, true);
				if (Runtime.rtl.method_exists(class_name, "components"))
				{
					var f = Runtime.rtl.method(class_name, "components");
					var sub_components = f();
					if (sub_components != null)
					{
						this._getRequiredComponents(res, cache, sub_components);
					}
				}
				res.pushValue(class_name);
			}
		}
	},
	/**
	 * Returns all components
	 * @param Collection<string> components
	 * @return Collection<string>
	 */
	getRequiredComponents: function(components)
	{
		components = components.filter(Runtime.lib.equalNot("")).removeDuplicatesIm();
		var res = new Runtime.Vector();
		var cache = new Runtime.Map();
		this._getRequiredComponents(res, cache, components);
		res = res.removeDuplicatesIm();
		return res.toCollection();
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.App";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"init",
			"start",
			"main",
			"renderBackend",
			"renderFrontend",
			"initContainer",
			"resolveContainer",
			"initLayout",
			"findRoute",
			"callRoute",
			"getCss",
			"_getRequiredComponents",
			"getRequiredComponents",
			"render",
			"url",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.App);
window["Runtime.Web.App"] = Runtime.Web.App;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.App;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.AppHook = function()
{
	Runtime.BaseHook.apply(this, arguments);
};
Runtime.Web.AppHook.prototype = Object.create(Runtime.BaseHook.prototype);
Runtime.Web.AppHook.prototype.constructor = Runtime.Web.AppHook;
Object.assign(Runtime.Web.AppHook.prototype,
{
	/**
	 * Returns method name by hook name
	 */
	getMethodName: function(hook_name)
	{
		if (hook_name == this.constructor.CALL_API_BEFORE)
		{
			return "call_api_before";
		}
		if (hook_name == this.constructor.CALL_ROUTE_AFTER)
		{
			return "call_route_after";
		}
		if (hook_name == this.constructor.CALL_ROUTE_BEFORE)
		{
			return "call_route_before";
		}
		if (hook_name == this.constructor.CLEAR_LAYOUT)
		{
			return "clear_layout";
		}
		if (hook_name == this.constructor.CORE_UI)
		{
			return "core_ui";
		}
		if (hook_name == this.constructor.CREATE_LAYOUT)
		{
			return "create_layout";
		}
		if (hook_name == this.constructor.CSS_CLASS_NAMES)
		{
			return "css_class_names";
		}
		if (hook_name == this.constructor.CSS_SAVE)
		{
			return "css_save";
		}
		if (hook_name == this.constructor.CSS_VARS)
		{
			return "css_vars";
		}
		if (hook_name == this.constructor.FIND_ROUTE)
		{
			return "find_route";
		}
		if (hook_name == this.constructor.FIND_ROUTE_AFTER)
		{
			return "find_route_after";
		}
		if (hook_name == this.constructor.INIT_CONTAINER)
		{
			return "init_container";
		}
		if (hook_name == this.constructor.INIT_LAYOUT)
		{
			return "init_layout";
		}
		if (hook_name == this.constructor.LAYOUT_PAGE_CLASS_NAME)
		{
			return "layout_page_class_name";
		}
		if (hook_name == this.constructor.MAIN)
		{
			return "main";
		}
		if (hook_name == this.constructor.MAKE_URL)
		{
			return "make_url";
		}
		if (hook_name == this.constructor.MAKE_URL_AFTER)
		{
			return "make_url_after";
		}
		if (hook_name == this.constructor.MATCH_ROUTE)
		{
			return "match_route";
		}
		if (hook_name == this.constructor.MIDDLEARE)
		{
			return "middleware";
		}
		if (hook_name == this.constructor.RENDER_FOOTER)
		{
			return "render_footer";
		}
		if (hook_name == this.constructor.RENDER_BODY)
		{
			return "render_body";
		}
		if (hook_name == this.constructor.RENDER_HEAD)
		{
			return "render_head";
		}
		if (hook_name == this.constructor.RESPONSE)
		{
			return "response";
		}
		if (hook_name == this.constructor.ROUTES_INIT)
		{
			return "routes_init";
		}
		return "";
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.CSS_CLASS_NAMES, 100);
	},
	/**
	 * Call api before
	 */
	call_api_before: function(d)
	{
		return d;
	},
	/**
	 * Call route before
	 */
	call_route_before: async function(d)
	{
		return d;
	},
	/**
	 * Call route after
	 */
	call_route_after: async function(d)
	{
		return d;
	},
	/**
	 * Returns layout class name
	 */
	layout_page_class_name: function(d)
	{
		return d;
	},
	/**
	 * Get css class names
	 */
	css_class_names: function(d)
	{
		var layout = Runtime.rtl.get(d, "layout");
		var css_class_names = Runtime.rtl.get(d, "css_class_names");
		/* Add page class name */
		if (layout.page_class_name != "" && css_class_names.indexOf(layout.page_class_name) == -1)
		{
			css_class_names.pushValue(layout.page_class_name);
		}
		/* Add layout name */
		var layout_class_name = layout.getLayoutClassName();
		if (layout_class_name != "" && css_class_names.indexOf(layout_class_name) == -1)
		{
			css_class_names.pushValue(layout_class_name);
		}
		return d;
	},
	/**
	 * Get css save
	 */
	css_save: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Get css vars
	 */
	css_vars: function(d)
	{
		return d;
	},
	/**
	 * Routes init
	 */
	routes_init: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Create layout
	 */
	create_layout: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Init layout
	 */
	init_layout: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Clear layout
	 */
	clear_layout: function(d)
	{
		return d;
	},
	/**
	 * Init container
	 */
	init_container: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Find route
	 */
	find_route: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Found route
	 */
	find_route_after: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Match route
	 */
	match_route: function(d)
	{
		return d;
	},
	/**
	 * Middleware
	 */
	middleware: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Response
	 */
	response: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Returns render head classes
	 */
	render_head: function(d)
	{
		return d;
	},
	/**
	 * Returns render body classes
	 */
	render_body: function(d)
	{
		return d;
	},
	/**
	 * Main function
	 */
	main: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Make url
	 */
	make_url: function(d)
	{
		return d;
	},
	/**
	 * Make url after
	 */
	make_url_after: function(d)
	{
		return d;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.AppHook)
		{
		}
		Runtime.BaseHook.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.BaseHook.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseHook.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.AppHook, Runtime.BaseHook);
Object.assign(Runtime.Web.AppHook,
{
	CALL_API_BEFORE: "runtime.web.app::call_api_before",
	CALL_ROUTE_AFTER: "runtime.web.app::call_route_after",
	CALL_ROUTE_BEFORE: "runtime.web.app::call_route_before",
	CLEAR_LAYOUT: "runtime.web.app::clear_layout",
	CORE_UI: "runtime.web.app::core_ui",
	CREATE_LAYOUT: "runtime.web.app::create_layout",
	CSS_CLASS_NAMES: "runtime.web.app::css_class_names",
	CSS_SAVE: "runtime.web.app::css_save",
	CSS_VARS: "runtime.web.app::css_vars",
	FIND_ROUTE: "runtime.web.app::find_route",
	FIND_ROUTE_AFTER: "runtime.web.app::find_route_after",
	INIT_CONTAINER: "runtime.web.app::init_container",
	INIT_LAYOUT: "runtime.web.app::init_layout",
	LAYOUT_PAGE_CLASS_NAME: "runtime.web.app::layout_page_class_name",
	MAIN: "runtime.web.app::main",
	MAKE_URL: "runtime.web.app::make_url",
	MAKE_URL_AFTER: "runtime.web.app::make_url_after",
	MATCH_ROUTE: "runtime.web.app::match_route",
	MIDDLEARE: "runtime.web.app::middleware",
	MIDDLEWARE: "runtime.web.app::middleware",
	RENDER_FOOTER: "runtime.web.app::render_footer",
	RENDER_BODY: "runtime.web.app::render_body",
	RENDER_HEAD: "runtime.web.app::render_head",
	RESPONSE: "runtime.web.app::response",
	ROUTES_INIT: "runtime.web.app::routes_init",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.AppHook";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseHook";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getMethodName",
			"register_hooks",
			"call_api_before",
			"call_route_before",
			"call_route_after",
			"layout_page_class_name",
			"css_class_names",
			"css_save",
			"css_vars",
			"routes_init",
			"create_layout",
			"init_layout",
			"clear_layout",
			"init_container",
			"find_route",
			"find_route_after",
			"match_route",
			"middleware",
			"response",
			"render_head",
			"render_body",
			"main",
			"make_url",
			"make_url_after",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.AppHook);
window["Runtime.Web.AppHook"] = Runtime.Web.AppHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.AppHook;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.BaseRoute = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Web.BaseRoute.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.BaseRoute.prototype.constructor = Runtime.Web.BaseRoute;
Object.assign(Runtime.Web.BaseRoute.prototype,
{
	/**
	 * Returns layout name
	 */
	getLayoutName: function()
	{
		return "default";
	},
	/**
	 * Returns page model
	 */
	getPageModelName: function()
	{
		return "";
	},
	/**
	 * Set page title
	 */
	setTitle: function(title)
	{
		this.container.setTitle(title);
	},
	/**
	 * Set page title
	 */
	setPageTitle: function(title)
	{
		this.container.setPageTitle(title);
	},
	/**
	 * Set page description
	 */
	setPageDescription: function(description)
	{
		var seo = this.layout_proxy.proxy(Runtime.Collection.from(["models","seo"]));
		seo.setAttr("description", description);
	},
	/**
	 * Set new page model
	 */
	setPageModel: function(page_model)
	{
		this.container.setPageModel(page_model);
		this.page_model_proxy = this.container.modelProxy();
	},
	/**
	 * Before route
	 */
	onActionBefore: async function()
	{
		/* Setup layout */
		var layout_name = this.getLayoutName();
		if (layout_name)
		{
			this.container.setLayoutName(layout_name);
		}
		/* Setup layout proxy */
		this.layout_proxy = this.container.layoutProxy();
		/* Setup page model */
		var model_name = this.getPageModelName();
		if (model_name)
		{
			this.container.setPageModel(Runtime.rtl.newInstance(model_name));
			this.page_model_proxy = this.container.modelProxy();
		}
	},
	/**
	 * After route
	 */
	onActionAfter: async function()
	{
	},
	/**
	 * Cancel route
	 */
	cancelRoute: function()
	{
		this.is_cancel_route = true;
	},
	/**
	 * Returns true if current route is canceled
	 */
	isCancelRoute: function()
	{
		return this.is_cancel_route;
	},
	/**
	 * Render page and setup response
	 */
	render: function(class_name)
	{
		if (class_name == undefined) class_name = "";
		this.container.render(class_name);
	},
	/**
	 * Redirect to url
	 */
	redirect: function(url, http_code)
	{
		if (http_code == undefined) http_code = 301;
		this.container.redirect(url, http_code);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.is_cancel_route = false;
		this.container = null;
		this.layout_proxy = null;
		this.page_model_proxy = null;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.BaseRoute)
		{
			this.is_cancel_route = o.is_cancel_route;
			this.container = o.container;
			this.layout_proxy = o.layout_proxy;
			this.page_model_proxy = o.page_model_proxy;
		}
		Runtime.BaseObject.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "is_cancel_route")this.is_cancel_route = v;
		else if (k == "container")this.container = v;
		else if (k == "layout_proxy")this.layout_proxy = v;
		else if (k == "page_model_proxy")this.page_model_proxy = v;
		else Runtime.BaseObject.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "is_cancel_route")return this.is_cancel_route;
		else if (k == "container")return this.container;
		else if (k == "layout_proxy")return this.layout_proxy;
		else if (k == "page_model_proxy")return this.page_model_proxy;
		return Runtime.BaseObject.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.BaseRoute, Runtime.BaseObject);
Object.assign(Runtime.Web.BaseRoute,
{
	/**
	 * Returns routes
	 */
	getRoutes: function()
	{
		return Runtime.Collection.from([]);
	},
	/**
	 * Returns url
	 */
	url: function(route_name, route_params)
	{
		if (route_params == undefined) route_params = null;
		var routes = Runtime.rtl.getContext().provider("Runtime.Web.RouteList");
		return routes.url(route_name, route_params);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.BaseRoute";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("is_cancel_route");
		a.push("container");
		a.push("layout_proxy");
		a.push("page_model_proxy");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "is_cancel_route") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "container") return Dict.from({
			"t": "Runtime.Web.RenderContainer",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "layout_proxy") return Dict.from({
			"t": "Runtime.ModelProxy",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "page_model_proxy") return Dict.from({
			"t": "Runtime.ModelProxy",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getLayoutName",
			"getPageModelName",
			"getRoutes",
			"setTitle",
			"setPageTitle",
			"setPageDescription",
			"setPageModel",
			"onActionBefore",
			"onActionAfter",
			"cancelRoute",
			"isCancelRoute",
			"url",
			"render",
			"redirect",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.BaseRoute);
window["Runtime.Web.BaseRoute"] = Runtime.Web.BaseRoute;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.BaseRoute;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.Breadcrumb = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Breadcrumb.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Breadcrumb.prototype.constructor = Runtime.Web.Breadcrumb;
Object.assign(Runtime.Web.Breadcrumb.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.url = "";
		this.title = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "url")return this.url;
		else if (k == "title")return this.title;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Breadcrumb, Runtime.BaseStruct);
Object.assign(Runtime.Web.Breadcrumb,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Breadcrumb";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("url");
		a.push("title");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "url") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "title") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Breadcrumb);
window["Runtime.Web.Breadcrumb"] = Runtime.Web.Breadcrumb;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Breadcrumb;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.BaseModel = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.BaseModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.BaseModel.prototype.constructor = Runtime.Web.BaseModel;
Object.assign(Runtime.Web.BaseModel.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.BaseModel, Runtime.BaseStruct);
Object.assign(Runtime.Web.BaseModel,
{
	/**
	 * Remote call
	 */
	remoteCall: async function(method_name, data)
	{
		return Promise.resolve(await Runtime.Web.Bus.callApi("runtime.web.remote_call", Runtime.Dict.from({"class_name":this.getClassName(),"method_name":method_name,"data":data})));
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.BaseModel";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"remoteCall",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.BaseModel);
window["Runtime.Web.BaseModel"] = Runtime.Web.BaseModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.BaseModel;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.Bus = function()
{
};
Object.assign(Runtime.Web.Bus.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Bus)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Runtime.Web.Bus,
{
	/**
	 * Remote call
	 */
	remoteCall: async function(class_name, method_name, data)
	{
		return Promise.resolve(await Runtime.Web.Bus.callApi("runtime.web.remote_call", Runtime.Dict.from({"class_name":class_name,"method_name":method_name,"data":data})));
	},
	/**
	 * Bus call
	 */
	call: function(url, data)
	{
		if (data == undefined) data = null;
		return null;
	},
	/**
	 * Call api
	 */
	callApi: async function(api_name, api_data)
	{
		if (api_data == undefined) api_data = null;
		var res = null;
		if (api_data == null)
		{
			api_data = Runtime.Dict.from({});
		}
		/* Build pos data */
		let post_data = Runtime.Dict.from({
			"api_name": api_name,
			"data": api_data ? api_data.toDict() : null,
		});
		
		/* Send post */
		let context = Runtime.rtl.getContext();
		let api_url = "/" + context.env("LOCALE_CODE") + "/api/" + api_name + "/";
		
		if (api_name == "runtime.web.remote_call")
		{
			let class_name = Runtime.rtl.attr(api_data, "class_name");
			let method_name = Runtime.rtl.attr(api_data, "method_name");
			if (class_name || method_name)
			{
				api_url += class_name + "::" + method_name + "/";
			}
		}
		
		let d = context.callHook(
			Runtime.Web.AppHook.CALL_API_BEFORE,
			Runtime.Dict.from({
				"api_url": api_url,
				"api_name": api_name,
				"post_data": post_data,
			})
		);
		
		api_url = d.get("api_url");
		post_data = d.get("post_data");
		post_data = post_data.setIm("data", Runtime.rtl.json_encode(post_data.get("data")));
		post_data = this.buildPostData(post_data);
		
		try
		{
			let xhr = await this.sendPost(api_url, post_data);
		
			res = Runtime.rtl.json_decode(xhr.responseText);
			res = new Runtime.Web.ApiResult(res);
		}
		catch (e)
		{
			if (e instanceof Runtime.Web.ApiResult)
			{
				res = e;
			}
			else if (e instanceof Runtime.Exceptions.RuntimeException)
			{
				res = (new Runtime.Web.ApiResult()).exception(e);
			}
			else
			{
				throw e;
			}
		}
		
		if (res != null && res instanceof Runtime.Web.ApiResult)
		{
			if (res.ob_content)
			{
				Runtime.io.print(res.ob_content);
			}
			if (res.error_name && res.error_file && res.error_line)
			{
				let err = "Fatal error " + res.error_name +
					" in " + res.error_file + ": " + res.error_line + "\n";
				if (res.error_trace) err += res.error_trace;
				if (err) Runtime.io.print_error(err);
			}
		}
		return Promise.resolve(res);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Bus";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"remoteCall",
			"call",
			"callApi",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Bus);
window["Runtime.Web.Bus"] = Runtime.Web.Bus;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Bus;
Object.assign(Runtime.Web.Bus,
{
	
	/**
	 * Send post. Returns json object or null if error
	 */
	post: async function(url, data, post_data)
	{
		/* Build pos data */
		post_data = this.buildPostData(data, post_data);
		
		/* Send post */
		var xhr = await this.sendPost(url, post_data);
		return xhr.responseText;
	},
	
	
	/**
	 * Returns FormData
	 * @params data - json object
	 * @return FormData
	 */
	buildPostData: function(data, post_data)
	{
		if (post_data == undefined)
		{
			post_data = new FormData();
		}
		let keys = data.keys();
		
		/* Add data to post data */
		for (let i=0; i<keys.length; i++)
		{
			let key = keys[i];
			let val = data.get(key);
			if (val instanceof FileList)
			{
				for (let j=0; i<val.length; j++)
				{
					post_data.append(key + "[]", val.item(j), val.item(j).name);
				}
			}
			else if (val instanceof File)
			{
				post_data.append(key, val, val.name);
			}
			else
			{
				post_data.append(key, val);
			}
		}
		
		return post_data;
	},
	
	
	/**
	 * Send api request
	 * @param string class_name
	 * @param string method_name
	 * @param Map<string, mixed> data
	 * @param callback f
	 */ 
	sendPost: async function(url, post_data)
	{
		return await new Promise((resolve, reject) =>{
			try
			{
				var xhr = new XMLHttpRequest();
				xhr.open('POST', url, true);
				xhr.send(post_data);
				xhr.onreadystatechange = (function(xhr, resolve, reject) {
					return function()
					{
						if (xhr.readyState != 4) return;
						if (xhr.status == 200)
						{
							resolve(xhr);
						}
						else
						{
							var res = Runtime.rtl.json_decode(xhr.responseText);
							res = res ? new Runtime.Web.ApiResult(res) : null;
							if (res)
							{
								reject(res);
							}
							else
							{
								reject
								(
									new Runtime.Exceptions.RuntimeException
									(xhr.status + " " + xhr.statusText)
								);
							}
						}
					}
				})(xhr, resolve, reject);
			}
			catch (e)
			{
				reject(e);
			}
		});
	},
	
});
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.Component = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Web.Component.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.Component.prototype.constructor = Runtime.Web.Component;
Object.assign(Runtime.Web.Component.prototype,
{
	/**
	 * Returns layout
	 */
	layout: function(model_path)
	{
		if (model_path == undefined) model_path = null;
		var provider = Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
		if (model_path == null)
		{
			return provider.layout;
		}
		return Runtime.rtl.attr(provider.layout, this.model_path.concat(model_path));
	},
	/**
	 * Returns model by model path
	 */
	model: function(model_path)
	{
		if (model_path == undefined) model_path = null;
		if (this.model_path == null)
		{
			return null;
		}
		if (model_path == null)
		{
			model_path = Runtime.Collection.from([]);
		}
		var layout = this.layout();
		return Runtime.rtl.attr(layout, this.model_path.concat(model_path));
	},
	/**
	 * Returns page model proxy
	 */
	modelProxy: function(path)
	{
		if (path == undefined) path = null;
		var provider = Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
		var model_path = Runtime.Collection.from(["layout"]);
		model_path = model_path.concat(this.model_path);
		model_path = model_path.concat(path);
		return new Runtime.ModelProxy(provider, model_path);
	},
	proxy: function(path)
	{
		if (path == undefined) path = null;
		return this.modelProxy(path);
	},
	/**
	 * Set reference
	 */
	setRef: function(ref_name, vdom)
	{
		this[ref_name] = vdom;
	},
	/**
	 * Returns true if component is changed and need to repaint
	 */
	isChanged: function(model, params, content)
	{
		if (this.old_model != model)
		{
			return true;
		}
		return Runtime.Web.VirtualDom.isChangedParams(this.params, params) || this.content != content;
	},
	/**
	 * If component needs render
	 */
	isRender: function()
	{
		return true;
	},
	/**
	 * Update params
	 */
	updateParams: function(model_path, params, content)
	{
		this.model_path = model_path;
		this.params = params;
		this.content = content;
		var provider = Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
		this.old_model = provider.model(model_path);
	},
	/**
	 * Create component
	 */
	onCreate: function()
	{
	},
	/**
	 * Update component
	 */
	onUpdate: function()
	{
	},
	/**
	 * Render component
	 */
	onRender: function()
	{
	},
	/**
	 * Update elem event
	 */
	onUpdateElem: function()
	{
	},
	/**
	 * Repaint component
	 */
	onRepaint: function()
	{
	},
	/**
	 * On commit model message
	 */
	onCommitModel: function(message)
	{
	},
	/**
	 * Commit
	 */
	commit: function(method_name)
	{
		var args = null;
		args = Runtime.Collection.from( [ ...arguments ].slice(1) );
		/* Commit model */
		args = args.prependIm(method_name);
		Runtime.rtl.applyMethod(this.modelProxy(), "commit", args);
	},
	/**
	 * Commit async
	 */
	commitAsync: async function(method_name)
	{
		var args = null;
		args = Runtime.Collection.from( [ ...arguments ].slice(1) );
		/* Commit model */
		args = args.prependIm(method_name);
		return Promise.resolve(await Runtime.rtl.methodApplyAsync(this.modelProxy(), "commitAsync", args));
	},
	/**
	 * Repaint Virtual Dom
	 */
	repaintRef: function(ref)
	{
		var provider = Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
		provider.repaintRef(ref);
	},
	/**
	 * Add function to next render before paint
	 */
	nextRenderBefore: function(f)
	{
		var provider = Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
		provider.nextRenderBefore(f);
	},
	/**
	 * Add function to next render after paint
	 */
	nextRenderAfter: function(f)
	{
		var provider = Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
		provider.nextRenderAfter(f);
	},
	/**
	 * Repaint component
	 */
	repaint: function()
	{
		var provider = Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
		provider.repaintRef(this.vdom);
	},
	/**
	 * Send event
	 */
	sendEvent: function(event)
	{
		var listener = Runtime.rtl.getContext().provider("Runtime.Web.Listener");
		var msg = new Runtime.Web.Message(event);
		msg.sender = this.vdom;
		listener.dispatch(msg);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.provider = null;
		this.model_path = Runtime.Collection.from([]);
		this.old_model = null;
		this.params = null;
		this.content = null;
		this.vdom = null;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Component)
		{
			this.provider = o.provider;
			this.model_path = o.model_path;
			this.old_model = o.old_model;
			this.params = o.params;
			this.content = o.content;
			this.vdom = o.vdom;
		}
		Runtime.BaseObject.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "provider")this.provider = v;
		else if (k == "model_path")this.model_path = v;
		else if (k == "old_model")this.old_model = v;
		else if (k == "params")this.params = v;
		else if (k == "content")this.content = v;
		else if (k == "vdom")this.vdom = v;
		else Runtime.BaseObject.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "provider")return this.provider;
		else if (k == "model_path")return this.model_path;
		else if (k == "old_model")return this.old_model;
		else if (k == "params")return this.params;
		else if (k == "content")return this.content;
		else if (k == "vdom")return this.vdom;
		return Runtime.BaseObject.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Component, Runtime.BaseObject);
Object.assign(Runtime.Web.Component,
{
	/**
	 * Returns url
	 */
	url: function(route_name, route_params)
	{
		if (route_params == undefined) route_params = null;
		var routes = Runtime.rtl.getContext().provider("Runtime.Web.RouteList");
		return routes.url(route_name, route_params);
	},
	/**
	 * Retuns css hash
	 * @param string component class name
	 * @return string hash
	 */
	hash: function(s)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.Web.Component.hash", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var r = "";
		var a = "1234567890abcdef";
		var sz = Runtime.rs.strlen(s);
		var h = 0;
		for (var i = 0;i < sz;i++)
		{
			var c = Runtime.rs.ord(Runtime.rs.substr(s, i, 1));
			h = (h << 2) + (h >> 14) + c & 65535;
		}
		var p = 0;
		while (h != 0 || p < 4)
		{
			var c = h & 15;
			h = h >> 4;
			r += Runtime.rtl.toStr(Runtime.rs.substr(a, c, 1));
			p = p + 1;
		}
		var __memorize_value = r;
		Runtime.rtl._memorizeSave("Runtime.Web.Component.hash", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns css hash
	 */
	getCssHash: function()
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.Web.Component.getCssHash", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __v0 = new Runtime.Monad(Runtime.rtl.getParents(this.getClassName()));
		try{ __v0=(__v0.val!=null && __v0.err==null) ? new Runtime.Monad(__v0.val.filter((class_name) => 
		{
			return class_name != "Runtime.BaseObject" && class_name != "Runtime.Web.Component";
		})) : __v0; } catch (err) { __v0=new Runtime.Monad(null, err); }
		try{ __v0=(__v0.val!=null && __v0.err==null) ? new Runtime.Monad(__v0.val.map((class_name) => 
		{
			return "h-" + Runtime.rtl.toStr(this.hash(class_name));
		})) : __v0; } catch (err) { __v0=new Runtime.Monad(null, err); }
		__v0 = __v0.call(Runtime.lib.join(" "));
		var __memorize_value = __v0.value();
		Runtime.rtl._memorizeSave("Runtime.Web.Component.getCssHash", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Escape html
	 */
	_escape_html: function(s)
	{
		if (Runtime.rtl.isString(s))
		{
			return Runtime.rs.escapeHtml(s);
		}
		if (s instanceof Runtime.Collection)
		{
			return Runtime.rs.join("", s);
		}
		return Runtime.rs.escapeHtml(Runtime.rtl.toString(s));
	},
	/**
	 * To html
	 */
	_to_html: function(s)
	{
		return s;
	},
	/**
	 * Concat attr
	 */
	_concat_attrs: function(arr1, arr2)
	{
		if (Runtime.rtl.isString(arr2))
		{
			arr2 = Runtime.Collection.from([arr2]);
		}
		return (arr1 != null) ? (arr1.concat(arr2)) : (arr2);
	},
	/**
	 * Merge attrs
	 */
	_merge_attrs: function(res, attr2)
	{
		if (!Runtime.rtl.exists(attr2))
		{
			return res;
		}
		return Object.assign(res, attr2.toObject());
		return res;
	},
	/**
	 * Join attrs to string
	 */
	_join_attrs: function(attrs)
	{
		return (Runtime.rtl.exists(attrs)) ? (Runtime.rs.join(" ", attrs.map((k, v) => 
		{
			return k + Runtime.rtl.toStr("= '") + Runtime.rtl.toStr(this._escape_attr(v)) + Runtime.rtl.toStr("'");
		}))) : ("");
	},
	/**
	 * Escape attr
	 */
	_escape_attr: function(s)
	{
		if (s instanceof Runtime.Dict)
		{
			s = s.reduce((s, val, key) => 
			{
				return s + Runtime.rtl.toStr(key) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(val) + Runtime.rtl.toStr(";");
			}, "");
		}
		return Runtime.rs.escapeHtml(s);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("provider");
		a.push("model_path");
		a.push("old_model");
		a.push("params");
		a.push("content");
		a.push("vdom");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "provider") return Dict.from({
			"t": "Runtime.Web.RenderProvider",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "model_path") return Dict.from({
			"t": "Runtime.Collection",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "old_model") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "vdom") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"layout",
			"model",
			"modelProxy",
			"proxy",
			"url",
			"setRef",
			"isChanged",
			"isRender",
			"updateParams",
			"onCreate",
			"onUpdate",
			"onRender",
			"onUpdateElem",
			"onRepaint",
			"onCommitModel",
			"commit",
			"commitAsync",
			"repaintRef",
			"nextRenderBefore",
			"nextRenderAfter",
			"repaint",
			"sendEvent",
			"hash",
			"getCssHash",
			"_escape_html",
			"_to_html",
			"_concat_attrs",
			"_merge_attrs",
			"_join_attrs",
			"_escape_attr",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Component);
window["Runtime.Web.Component"] = Runtime.Web.Component;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Component;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.Cookie = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Cookie.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Cookie.prototype.constructor = Runtime.Web.Cookie;
Object.assign(Runtime.Web.Cookie.prototype,
{
	getOptions: function()
	{
		var res = new Runtime.Map();
		if (this.expires)
		{
			res.setValue("expires", this.expires);
		}
		if (this.domain)
		{
			res.setValue("domain", this.domain);
		}
		if (this.path)
		{
			res.setValue("path", this.path);
		}
		if (this.secure)
		{
			res.setValue("secure", this.secure);
		}
		if (this.httponly)
		{
			res.setValue("httponly", this.httponly);
		}
		if (this.samesite)
		{
			res.setValue("samesite", this.samesite);
		}
		return res.toDict();
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.name = "";
		this.value = "";
		this.expires = null;
		this.domain = "";
		this.path = "/";
		this.samesite = "Lax";
		this.secure = false;
		this.httponly = false;
		this.changed = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "value")return this.value;
		else if (k == "expires")return this.expires;
		else if (k == "domain")return this.domain;
		else if (k == "path")return this.path;
		else if (k == "samesite")return this.samesite;
		else if (k == "secure")return this.secure;
		else if (k == "httponly")return this.httponly;
		else if (k == "changed")return this.changed;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Cookie, Runtime.BaseStruct);
Object.assign(Runtime.Web.Cookie,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Cookie";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("name");
		a.push("value");
		a.push("expires");
		a.push("domain");
		a.push("path");
		a.push("samesite");
		a.push("secure");
		a.push("httponly");
		a.push("changed");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expires") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "domain") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "path") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "samesite") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "secure") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "httponly") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "changed") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getOptions",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Cookie);
window["Runtime.Web.Cookie"] = Runtime.Web.Cookie;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Cookie;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.EmailModel = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.EmailModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.EmailModel.prototype.constructor = Runtime.Web.EmailModel;
Object.assign(Runtime.Web.EmailModel.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.title = "";
		this.dest = Runtime.Collection.from([]);
		this.delete_after = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "title")return this.title;
		else if (k == "dest")return this.dest;
		else if (k == "delete_after")return this.delete_after;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.EmailModel, Runtime.BaseStruct);
Object.assign(Runtime.Web.EmailModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.EmailModel";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("title");
		a.push("dest");
		a.push("delete_after");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "title") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "dest") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "delete_after") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.EmailModel);
window["Runtime.Web.EmailModel"] = Runtime.Web.EmailModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.EmailModel;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.Layout = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Layout.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Layout.prototype.constructor = Runtime.Web.Layout;
Object.assign(Runtime.Web.Layout.prototype,
{
	/**
	 * Returns page model
	 */
	getPageModel: function()
	{
		return (this.page_model_class_name) ? (Runtime.rtl.get(this.pages, this.page_model_class_name)) : (null);
	},
	/**
	 * Returns page model proxy
	 */
	modelProxy: function(path)
	{
		if (path == undefined) path = null;
		return new Runtime.ModelProxy(this, Runtime.Collection.from(["pages",this.page_model_class_name]).concat(path));
	},
	/**
	 * Set page model
	 */
	setPageModel: function(model)
	{
		var layout = this;
		if (model == null)
		{
			layout = Runtime.rtl.setAttr(layout, Runtime.Collection.from(["page_model_class_name"]), "");
			return layout;
		}
		var class_name = model.constructor.getClassName();
		layout = Runtime.rtl.setAttr(layout, Runtime.Collection.from(["page_model_class_name"]), class_name);
		layout = Runtime.rtl.setAttr(layout, Runtime.Collection.from(["pages", class_name]), model);
		return layout;
	},
	/**
	 * Returns layout class name
	 */
	getLayoutClassName: function()
	{
		var layout_name = this.layout_name;
		var d = Runtime.rtl.getContext().callHook(Runtime.Web.AppHook.LAYOUT_PAGE_CLASS_NAME, new Runtime.Map());
		var __v0 = new Runtime.Monad(Runtime.rtl.get(d, layout_name));
		__v0 = __v0.monad(Runtime.rtl.m_to("string", "Runtime.Web.LayoutPage"));
		var layout_page_class_name = __v0.value();
		return layout_page_class_name;
	},
	/**
	 * Init layout
	 */
	init_layout: async function()
	{
		return this;
	},
	/**
	 * Clear layout
	 */
	clear_layout: function()
	{
		return this;
	},
	/**
	 * Add breadcrumbs
	 */
	addBreadcrumb: function(d)
	{
		var layout = this;
		if (d instanceof Runtime.Dict)
		{
			d = new Runtime.Web.Breadcrumb(d);
		}
		if (d instanceof Runtime.Web.Breadcrumb)
		{
			layout = Runtime.rtl.setAttr(layout, Runtime.Collection.from(["breadcrumbs"]), layout.breadcrumbs.pushIm(d));
		}
		return layout;
	},
	/**
	 * Set new title
	 */
	setTitle: function(title)
	{
		return Runtime.rtl.setAttr(this, Runtime.Collection.from(["title"]), title);
	},
	setPageTitle: function(title)
	{
		return Runtime.rtl.setAttr(this, Runtime.Collection.from(["title"]), title);
	},
	/**
	 * Set layout name
	 */
	setLayoutName: function(layout_name)
	{
		return Runtime.rtl.setAttr(this, Runtime.Collection.from(["layout_name"]), layout_name);
	},
	/**
	 * Returns css class names
	 */
	getCssClasses: function()
	{
		var res = new Runtime.Vector();
		/* Extends css class names */
		var d = Runtime.rtl.getContext().callHook(Runtime.Web.AppHook.CSS_CLASS_NAMES, Runtime.Dict.from({"layout":this,"css_class_names":res}));
		return Runtime.rtl.get(d, "css_class_names").toCollection().removeDuplicatesIm();
	},
	/**
	 * Returns url
	 */
	url: function(route_name, route_params)
	{
		if (route_params == undefined) route_params = null;
		var routes = Runtime.rtl.getContext().provider("Runtime.Web.RouteList");
		return routes.url(route_name, route_params);
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.title = "";
		this.page_model_class_name = "";
		this.layout_name = "default";
		this.page_class_name = "";
		this.breadcrumbs = Runtime.Collection.from([]);
		this.pages = Runtime.Dict.from({});
		this.models = Runtime.Dict.from({"seo":new Runtime.Web.SeoModel(),"current_user":null});
		this.route = null;
		this.request_full_uri = "";
		this.request_host = "";
		this.request_uri = "";
		this.request_query = null;
		this.f_inc = "1";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "title")return this.title;
		else if (k == "page_model_class_name")return this.page_model_class_name;
		else if (k == "layout_name")return this.layout_name;
		else if (k == "page_class_name")return this.page_class_name;
		else if (k == "breadcrumbs")return this.breadcrumbs;
		else if (k == "pages")return this.pages;
		else if (k == "models")return this.models;
		else if (k == "route")return this.route;
		else if (k == "request_full_uri")return this.request_full_uri;
		else if (k == "request_host")return this.request_host;
		else if (k == "request_uri")return this.request_uri;
		else if (k == "request_query")return this.request_query;
		else if (k == "f_inc")return this.f_inc;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Layout, Runtime.BaseStruct);
Object.assign(Runtime.Web.Layout,
{
	/**
	 * Returns clear layout
	 **/
	getClearLayout: function(layout)
	{
		var d = Runtime.rtl.getContext().callHook(Runtime.Web.AppHook.CLEAR_LAYOUT, Runtime.Dict.from({"layout":layout}));
		layout = Runtime.rtl.get(d, "layout");
		return layout.clear_layout();
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Layout";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("title");
		a.push("page_model_class_name");
		a.push("layout_name");
		a.push("page_class_name");
		a.push("breadcrumbs");
		a.push("pages");
		a.push("models");
		a.push("route");
		a.push("request_full_uri");
		a.push("request_host");
		a.push("request_uri");
		a.push("request_query");
		a.push("f_inc");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "title") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "page_model_class_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "layout_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "page_class_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "breadcrumbs") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Runtime.Web.Breadcrumb"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pages") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["Runtime.BaseStruct"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "models") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["Runtime.BaseStruct"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "route") return Dict.from({
			"t": "Runtime.Web.RouteInfo",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "request_full_uri") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "request_host") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "request_uri") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "request_query") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "f_inc") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getPageModel",
			"modelProxy",
			"setPageModel",
			"getLayoutClassName",
			"init_layout",
			"clear_layout",
			"getClearLayout",
			"addBreadcrumb",
			"setTitle",
			"setPageTitle",
			"setLayoutName",
			"getCssClasses",
			"url",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Layout);
window["Runtime.Web.Layout"] = Runtime.Web.Layout;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Layout;
"use strict;"
/*
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
*/
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.LayoutPage = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.LayoutPage.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.LayoutPage.prototype.constructor = Runtime.Web.LayoutPage;
Object.assign(Runtime.Web.LayoutPage.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.LayoutPage)
		{
		}
		Runtime.Web.Component.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.Component.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Component.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.LayoutPage, Runtime.Web.Component);
Object.assign(Runtime.Web.LayoutPage,
{
	render: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let page_class_name = layout.page_class_name;
			
			let page_model_class_name = layout.page_model_class_name;
			
			/* Component '{page_class_name}' */
			let __v0 = __v.e("c", page_class_name, {"@model":[component,Runtime.Collection.from(["pages",page_model_class_name])]});
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.LayoutPage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"render",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.LayoutPage);
window["Runtime.Web.LayoutPage"] = Runtime.Web.LayoutPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.LayoutPage;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.Listener = function()
{
	Runtime.BaseProvider.apply(this, arguments);
};
Runtime.Web.Listener.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.Web.Listener.prototype.constructor = Runtime.Web.Listener;
Object.assign(Runtime.Web.Listener.prototype,
{
	/**
	 * Add event
	 */
	addCallback: function(sender_path_id, event_class_name, component, method_name)
	{
		var item = this.callbacks.findItem((item) => 
		{
			return Runtime.rtl.get(item, "sender_path_id") == sender_path_id && Runtime.rtl.get(item, "event_class_name") == event_class_name && Runtime.rtl.get(item, "component") == component && Runtime.rtl.get(item, "method_name") == method_name;
		});
		if (!item)
		{
			this.callbacks.pushValue(Runtime.Dict.from({"sender_path_id":sender_path_id,"event_class_name":event_class_name,"component":component,"method_name":method_name}));
		}
	},
	/**
	 * Remove component
	 */
	removeComponent: function(component)
	{
		for (var i = this.callbacks.count() - 1;i >= 0;i--)
		{
			var item = Runtime.rtl.get(this.callbacks, i);
			if (Runtime.rtl.get(item, "component") == component)
			{
				this.callbacks.removePosition(i);
			}
		}
	},
	/**
	 * Dispatch
	 */
	dispatch: function(message)
	{
		var event_class_name = (message.event != null) ? (message.event.constructor.getClassName()) : ("");
		var sender_path_id = message.sender.path_id.join(":");
		for (var i = 0;i < this.callbacks.count();i++)
		{
			var item = Runtime.rtl.get(this.callbacks, i);
			var is_match = this.constructor.match_path(Runtime.rtl.get(item, "sender_path_id"), sender_path_id) && event_class_name == Runtime.rtl.get(item, "event_class_name");
			if (is_match)
			{
				var component = Runtime.rtl.get(item, "component");
				var method_name = Runtime.rtl.get(item, "method_name");
				if (Runtime.rtl.isFn(method_name))
				{
					let f = method_name.bind(component);
					f(message);
				}
				else if (Runtime.rtl.isString(method_name))
				{
					var callback = Runtime.rtl.method(component, method_name);
					callback(message);
				}
			}
		}
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.callbacks = new Runtime.Vector();
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Listener)
		{
			this.callbacks = o.callbacks;
		}
		Runtime.BaseProvider.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "callbacks")this.callbacks = v;
		else Runtime.BaseProvider.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "callbacks")return this.callbacks;
		return Runtime.BaseProvider.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Listener, Runtime.BaseProvider);
Object.assign(Runtime.Web.Listener,
{
	/**
	 * Match
	 */
	match_path: function(match_path_id, sender_path_id)
	{
		if (match_path_id == sender_path_id)
		{
			return true;
		}
		return false;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Listener";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("callbacks");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "callbacks") return Dict.from({
			"t": "Runtime.Vector",
			"s": ["Runtime.Dict"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"addCallback",
			"removeComponent",
			"dispatch",
			"match_path",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Listener);
window["Runtime.Web.Listener"] = Runtime.Web.Listener;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Listener;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.LocaleModel = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.LocaleModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.LocaleModel.prototype.constructor = Runtime.Web.LocaleModel;
Object.assign(Runtime.Web.LocaleModel.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.name = "";
		this.locale = "";
		this.code = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "locale")return this.locale;
		else if (k == "code")return this.code;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.LocaleModel, Runtime.BaseStruct);
Object.assign(Runtime.Web.LocaleModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.LocaleModel";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("name");
		a.push("locale");
		a.push("code");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "locale") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "code") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.LocaleModel);
window["Runtime.Web.LocaleModel"] = Runtime.Web.LocaleModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.LocaleModel;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.Message = function(event)
{
	Runtime.BaseObject.call(this);
	this.event = event;
};
Runtime.Web.Message.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.Message.prototype.constructor = Runtime.Web.Message;
Object.assign(Runtime.Web.Message.prototype,
{
	/**
	 * Cancel Message
	 */
	cancel: function()
	{
		this.is_cancel = true;
		if (this.event instanceof Runtime.Web.Events.BaseEvent)
		{
			this.event = this.event.constructor.cancel(this.event);
		}
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.event = null;
		this.is_cancel = false;
		this.sender = null;
		this.dest = "";
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Message)
		{
			this.event = o.event;
			this.is_cancel = o.is_cancel;
			this.sender = o.sender;
			this.dest = o.dest;
		}
		Runtime.BaseObject.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "event")this.event = v;
		else if (k == "is_cancel")this.is_cancel = v;
		else if (k == "sender")this.sender = v;
		else if (k == "dest")this.dest = v;
		else Runtime.BaseObject.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "event")return this.event;
		else if (k == "is_cancel")return this.is_cancel;
		else if (k == "sender")return this.sender;
		else if (k == "dest")return this.dest;
		return Runtime.BaseObject.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Message, Runtime.BaseObject);
Object.assign(Runtime.Web.Message,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Message";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("event");
		a.push("is_cancel");
		a.push("sender");
		a.push("dest");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "event") return Dict.from({
			"t": "Runtime.Web.Events.BaseEvent",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_cancel") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "sender") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "dest") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"cancel",
			"constructor",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Message);
window["Runtime.Web.Message"] = Runtime.Web.Message;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Message;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.RenderContainer = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Web.RenderContainer.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.RenderContainer.prototype.constructor = Runtime.Web.RenderContainer;
Object.assign(Runtime.Web.RenderContainer.prototype,
{
	/**
	 * Set page title
	 */
	setTitle: function(title)
	{
		this.layout = Runtime.rtl.setAttr(this.layout, Runtime.Collection.from(["title"]), title);
	},
	/**
	 * Set page title
	 */
	setPageTitle: function(title)
	{
		this.layout = Runtime.rtl.setAttr(this.layout, Runtime.Collection.from(["title"]), title);
	},
	/**
	 * Set page model to layout
	 */
	setPageModel: function(model)
	{
		this.layout = this.layout.setPageModel(model);
	},
	/**
	 * Set layout name
	 */
	setLayoutName: function(layout_name)
	{
		this.layout = this.layout.setLayoutName(layout_name);
	},
	/**
	 * Returns proxy
	 */
	proxy: function(path)
	{
		if (path == undefined) path = null;
		return new Runtime.ModelProxy(this, path);
	},
	/**
	 * Returns page model proxy
	 */
	modelProxy: function(path)
	{
		if (path == undefined) path = null;
		return new Runtime.ModelProxy(this, Runtime.Collection.from(["layout","pages",this.layout.page_model_class_name]).concat(path));
	},
	/**
	 * Returns layout model proxy
	 */
	layoutProxy: function(path)
	{
		if (path == undefined) path = null;
		return new Runtime.ModelProxy(this, Runtime.Collection.from(["layout"]).concat(path));
	},
	/**
	 * Update model event
	 */
	onUpdateModel: function(path)
	{
	},
	/**
	 * Render page and setup response
	 */
	render: function(class_name)
	{
		if (class_name == undefined) class_name = "";
		if (class_name == "")
		{
			class_name = this.layout.page_class_name;
		}
		this.layout = Runtime.rtl.setAttr(this.layout, Runtime.Collection.from(["page_class_name"]), class_name);
		this.response = new Runtime.Web.RenderResponse(Runtime.Dict.from({"class_name":class_name}));
	},
	/**
	 * Set response
	 */
	setResponse: function(response)
	{
		this.response = response;
	},
	/**
	 * Setup redirect response
	 */
	redirect: function(url, http_code)
	{
		if (http_code == undefined) http_code = 301;
		var response = new Runtime.Web.RedirectResponse();
		response = Runtime.rtl.setAttr(response, Runtime.Collection.from(["redirect"]), url);
		response = Runtime.rtl.setAttr(response, Runtime.Collection.from(["http_code"]), http_code);
		/*response <= headers <= "Location" <= url;*/
		this.response = response;
	},
	/**
	 * Call method
	 */
	callMethod: async function(m)
	{
		if (this.base_route != null)
		{
			this.base_route.cancelRoute();
		}
		if (m instanceof Runtime.Collection)
		{
			var base_route_class_name = Runtime.rtl.get(m, 0);
			this.base_route = Runtime.rtl.newInstance(base_route_class_name);
			var method_name = Runtime.rtl.get(m, 1);
			var route_method = Runtime.rtl.method(this.base_route, method_name);
			this.base_route.container = this;
			await this.base_route.onActionBefore();
			if (this.response == null)
			{
				await route_method();
			}
			if (!this.base_route.isCancelRoute())
			{
				await this.base_route.onActionAfter();
			}
		}
		else if (Runtime.rtl.isFn(m))
		{
			await m(this);
		}
	},
	/**
	 * Returns url
	 */
	url: function(route_name, route_params)
	{
		if (route_params == undefined) route_params = null;
		var routes = Runtime.rtl.getContext().provider("Runtime.Web.RouteList");
		return routes.url(route_name, route_params);
	},
	/**
	 * Add cookie
	 */
	addCookie: function(cookie)
	{
		this.response = this.response.addCookie(cookie);
	},
	/**
	 * Set api data
	 */
	setApiData: function(data)
	{
		if (this.response instanceof Runtime.Web.ApiResult)
		{
			this.response = this.response.setData(data);
		}
	},
	/**
	 * Set success result
	 */
	success: function(data)
	{
		if (data == undefined) data = null;
		if (this.response instanceof Runtime.Web.ApiResult)
		{
			this.response = this.response.success(data);
		}
	},
	/**
	 * Set fail result
	 */
	fail: function(e, data)
	{
		if (data == undefined) data = null;
		if (this.response instanceof Runtime.Web.ApiResult)
		{
			this.response = this.response.fail(e, data);
		}
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.base_route = null;
		this.request = null;
		this.response = null;
		this.route = null;
		this.layout = null;
		this.frontend_env = new Runtime.Map();
		this.backend_storage = new Runtime.Map();
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.RenderContainer)
		{
			this.base_route = o.base_route;
			this.request = o.request;
			this.response = o.response;
			this.route = o.route;
			this.layout = o.layout;
			this.frontend_env = o.frontend_env;
			this.backend_storage = o.backend_storage;
		}
		Runtime.BaseObject.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "base_route")this.base_route = v;
		else if (k == "request")this.request = v;
		else if (k == "response")this.response = v;
		else if (k == "route")this.route = v;
		else if (k == "layout")this.layout = v;
		else if (k == "frontend_env")this.frontend_env = v;
		else if (k == "backend_storage")this.backend_storage = v;
		else Runtime.BaseObject.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "base_route")return this.base_route;
		else if (k == "request")return this.request;
		else if (k == "response")return this.response;
		else if (k == "route")return this.route;
		else if (k == "layout")return this.layout;
		else if (k == "frontend_env")return this.frontend_env;
		else if (k == "backend_storage")return this.backend_storage;
		return Runtime.BaseObject.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.RenderContainer, Runtime.BaseObject);
Object.assign(Runtime.Web.RenderContainer,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RenderContainer";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("base_route");
		a.push("request");
		a.push("response");
		a.push("route");
		a.push("layout");
		a.push("frontend_env");
		a.push("backend_storage");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "base_route") return Dict.from({
			"t": "Runtime.Web.BaseRoute",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "request") return Dict.from({
			"t": "Runtime.Web.Request",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "response") return Dict.from({
			"t": "Runtime.Web.Response",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "route") return Dict.from({
			"t": "Runtime.Web.RouteInfo",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "layout") return Dict.from({
			"t": "Runtime.Web.Layout",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "frontend_env") return Dict.from({
			"t": "Runtime.Map",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "backend_storage") return Dict.from({
			"t": "Runtime.Map",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"setTitle",
			"setPageTitle",
			"setPageModel",
			"setLayoutName",
			"proxy",
			"modelProxy",
			"layoutProxy",
			"onUpdateModel",
			"render",
			"setResponse",
			"redirect",
			"callMethod",
			"url",
			"addCookie",
			"setApiData",
			"success",
			"fail",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.RenderContainer);
window["Runtime.Web.RenderContainer"] = Runtime.Web.RenderContainer;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RenderContainer;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.RenderProvider = function()
{
	Runtime.BaseProvider.apply(this, arguments);
	if (window) window["render_provider"] = this;
	this.vdom = null;
	this.layout = null;
	this.render_vdom_list = [];
	this.render_elem_list = [];
	this.render_elem_obj = {};
	this.render_elem_childs_list = [];
	this.render_elem_childs_obj = {};
	this.is_first_render = false;
	this.animation_frame = null;
	this.constructor.is_debug = false;
	this.js_event_bind = this.js_event.bind(this);
	this.js_href_click_bind = this.js_href_click.bind(this);
	this.model_path = new Runtime.Collection();
	this.history = new Runtime.Vector();
	this.enable_lazy_load = false;
};
Runtime.Web.RenderProvider.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.Web.RenderProvider.prototype.constructor = Runtime.Web.RenderProvider;
Object.assign(Runtime.Web.RenderProvider.prototype,
{
	/**
	 * Start driver
	 */
	start: function()
	{
		/* window.requestAnimationFrame( this.animationFrame.bind(this) ); */
		
		/* Add history listener */
		if (this.enable_lazy_load)
		{
			window.onpopstate = this.js_onpopstate.bind(this);
		}
	},
	
	
	/**
	 * Returns model by model path
	 */
	model: function(model_path)
	{
		if (model_path == null) return null;
		return Runtime.rtl.attr(this.layout, model_path);
	},
	
	
	/**
	 * Commit layout
	 */
	commitComponent: function(component, new_model)
	{
		/* Get changes */
		let old_model = Runtime.rtl.attr(this.layout, component.model_path);
		
		/* Set new layout */
		this.layout = Runtime.rtl.setAttr(this.layout, component.model_path, new_model);
		
		/* On update model */
		this.onUpdateModel(component.model_path, old_model, new_model);
	},
	
	
	/**
	 * On update model
	 */
	onUpdateModel(model_path, old_model, new_model)
	{
		let changes = {};
		
		/* Send commit message */
		let msg = new Runtime.Web.Message();
		msg.event = new Runtime.Web.Events.CommitModelEvent({
			"model_path": model_path,
			"old_model": old_model,
			"new_model": new_model,
			"changes": changes,
		});
		
		let context = Runtime.rtl.getContext();
		let listener = context.provider("Runtime.Web.Listener");
		/* listener.dispatch(msg); */
		
		/* If not cancel repaint all */
		if (!msg.is_cancel)
		{
			this.repaintRef(this.vdom);
		}
	},
	
	
	/**
	 * Repaint virtual DOM reference
	 */
	repaintRef: function(vdom)
	{
		if (vdom == null) return;
		
		this.render_vdom_list.push(vdom);
		this.addChangedElem(vdom);
		this.requestAnimationFrame();
	},
	
	
	/**
	 * Add changed virtual dom
	 */
	addChangedElem: function(vdom)
	{
		if (vdom == null) return;
		
		let vdom_path_id = vdom.path_id.join(":");
		if (this.render_elem_obj[vdom_path_id] != undefined) return;
		
		this.render_elem_obj[vdom_path_id] = 1;
		this.render_elem_list.push(vdom);
	},
	
	
	/**
	 * Add changed childs virtual dom
	 */
	addChangedElemChilds: function(vdom)
	{
		if (vdom == null) return;
		
		let vdom_path_id = vdom.path_id.join(":");
		if (this.render_elem_childs_obj[vdom_path_id] != undefined) return;
		
		this.render_elem_childs_list.push(vdom);
		this.render_elem_childs_obj[vdom_path_id] = 1;
	},
	
	
	/**
	 * Call render
	 */
	render: function()
	{
		let render_vdom_list = this.render_vdom_list;
		
		/* Render virtual dom */
		for (let i=0; i<this.render_vdom_list.length; i++)
		{
			let vdom = render_vdom_list[i];
			if (vdom.render)
			{
				vdom.render(vdom);
				vdom.p();
			}
			else if (vdom.isComponent())
			{
				/* Get render function */
				let component = vdom.component;
				let params = component.params;
				let content = component.content;
				let render = Runtime.rtl.method(
					vdom.component.constructor.getClassName(),
					"render"
				);
				
				/* Render component */
				let f = render(component, params, content);
				f(vdom);
				vdom.p();
			}
		}
		
		this.render_vdom_list = [];
		
		/* Repaint */
		this.repaint();
	},
	
	
	/**
	 * Repaint
	 */
	repaint: function()
	{
		/* Render changed elements */
		let render_elem_list = this.render_elem_list;
		
		/* Create elements or update params */
		for (let i=0; i<this.render_elem_list.length; i++)
		{
			let vdom = render_elem_list[i];
			this.updateElem(vdom);
			
			let parent_vdom = vdom.getParentElement();
			this.addChangedElemChilds(parent_vdom);
		}
		
		/* Update elements childs */
		let render_elem_childs_list_sz = this.render_elem_childs_list.length;
		for (let i=render_elem_childs_list_sz-1; i>=0; i--)
		{
			let vdom = this.render_elem_childs_list[i];
			this.updateElemChilds(vdom);
		}
		
		/* Component repaint */
		for (let i=0; i<this.render_elem_list.length; i++)
		{
			let vdom = render_elem_list[i];
			if (vdom.kind == Runtime.Web.VirtualDom.KIND_COMPONENT)
			{
				vdom.component.onRepaint();
			}
		}
		
		this.render_elem_list = [];
		this.render_elem_obj = {};
		this.render_elem_childs_list = [];
		this.render_elem_childs_obj = {};
	},
	
	
	/**
	 * Animation frame
	 */
	animationFrame: function(time)
	{
		this.animation_frame = null;
		
		let render_vdom_list = this.render_vdom_list;
		if (render_vdom_list.length == 0) return;
		
		/* Render scene */
		this.render();
	},
	
	
	/**
	 * Request animation frame
	 */
	requestAnimationFrame: function()
	{
		if (this.animation_frame == null)
		{
			this.animation_frame = window.requestAnimationFrame( this.animationFrame.bind(this) );
		}
	},
	
	
	/**
	 * Render root
	 */
	renderRoot: function(elem_root, layout_class_name, layout)
	{
		/* Setup layout */
		this.layout = layout;
		
		/* Create virtual dom */
		this.vdom = new Runtime.Web.VirtualDom();
		this.vdom.kind = Runtime.Web.VirtualDom.KIND_ELEMENT;
		this.vdom.path_id = Runtime.Collection.from([]);
		this.vdom.params = Runtime.Dict();
		this.vdom.elem = elem_root;
		this.vdom.render = (vdom) => {
			vdom.e("c", layout_class_name, Runtime.Dict.from({
				"@model":[this, Runtime.Collection.from("")],
			}), null);
		};
		
		this.is_first_render = true;
		
		this.render_vdom_list.push(this.vdom);
		this.addChangedElem(this.vdom);
		this.render();
		
		this.is_first_render = false;
	},
	
	
	/**
	 * Update element childs
	 */
	updateElemChilds: function(vdom)
	{
		if (!vdom.is_change_childs) return;
		if (!vdom.isElement()) return;
		if (vdom.isText()) return;
		
		vdom.is_change_childs = false;
		
		/* Get vdom HTML childs */
		let new_childs = vdom.getChildElements();
		new_childs = new_childs
			.map( (item) => item.elem )
			.flatten()
			.filter( Runtime.lib.equalNot(null) )
		;
		
		/* Patch HTML element childs */
		this.constructor.patchElemChilds(vdom.elem, new_childs);
	},
	
	
	/**
	 * Update element in animation frame
	 */
	updateElem: function(vdom)
	{
		/* Setup exists childs for first init */
		if (this.is_first_render)
		{
			if (vdom.kind == Runtime.Web.VirtualDom.KIND_ELEMENT)
			{
				if (vdom.elem != null)
				{
					var findVirtualDomPos = function (nodes, vdom)
					{
						for (var i = 0; i < nodes.count(); i++)
						{
							let node = nodes[i];
							
							if (node instanceof HTMLElement &&
								vdom.kind == Runtime.Web.VirtualDom.KIND_ELEMENT)
							{
								if (node.tagName == vdom.name.toUpperCase())
								{
									return i;
								}
							}
							
							if (node instanceof Text &&
								vdom.kind == Runtime.Web.VirtualDom.KIND_TEXT)
							{
								if (node.textContent == vdom.content)
								{
									return i;
								}
							}
						}
						
						return -1;
					}
					
					let new_childs = vdom.getChildElements();
					let parent_elem = vdom.elem;
					let old_childs = Runtime.Vector.from([...parent_elem.childNodes]);
					
					old_childs = old_childs
						.map(
							(item) => {
								if (item.tagName == "TBODY")
								{
									return Runtime.Vector.from([...item.childNodes]);
								}
								return item;
							}
						)
						.flatten()
					;
					
					for (let i=0; i<new_childs.count(); i++)
					{
						let pos = findVirtualDomPos(old_childs, new_childs[i]);
						if (pos >= 0)
						{
							new_childs[i].elem = old_childs[pos];
							new_childs[i].elem._vdom = new_childs[i];
							old_childs.removePosition(pos);
						}
					}
					
				}
				else
				{
					//console.log("elem is null");
					//console.log(vdom);
				}
			}
		}
		
		if (vdom.kind == Runtime.Web.VirtualDom.KIND_ELEMENT)
		{
			if (vdom.elem == null)
			{
				vdom.elem = this.constructor.createElem(vdom.name, vdom.content);
				vdom.elem._vdom = vdom;
			}
		}
		
		else if (vdom.kind == Runtime.Web.VirtualDom.KIND_TEXT)
		{
			/* Create elem */
			if (vdom.elem == null)
			{
				vdom.elem = document.createTextNode(
					Runtime.rtl.exists(vdom.content) ? vdom.content : ""
				);
				vdom.elem._vdom = vdom;
			}
			else
			{
				/* Set new text */
				if (vdom.elem.nodeValue != vdom.content)
				{
					vdom.elem.nodeValue = vdom.content;
				}
			}
		}
		
		else if (vdom.kind == Runtime.Web.VirtualDom.KIND_RAW)
		{
			var findElementPos = function (nodes, find_e)
			{
				for (let i = 0; i < nodes.count(); i++)
				{
					let node = nodes[i];
					
					if (node._attached == true)
					{
						continue;
					}
					
					if (node instanceof HTMLElement &&
						find_e instanceof HTMLElement)
					{
						if (node.tagName != find_e.tagName)
						{
							continue;
						}
						if (node.outerHTML == find_e.outerHTML)
						{
							return i;
						}
					}
					
					if (node instanceof Text &&
						find_e instanceof Text)
					{
						if (node.textContent == find_e.textContent)
						{
							return i;
						}
					}
				}
				
				return -1;
			}
			
			let parent_elem = vdom.getParentElement().elem;
			let old_childs = Runtime.Vector.from([...parent_elem.childNodes]);
			let new_childs = this.constructor.rawHtml(vdom.content);
			
			if (this.is_first_render)
			{
				let res = [];
				
				for (let i=0; i<new_childs.count(); i++)
				{
					let pos = findElementPos(old_childs, new_childs[i]);
					if (pos >= 0)
					{
						res.push(old_childs[pos]);
						old_childs[pos]._attached = true;
					}
					else
					{
						res.push(new_childs[i]);
					}
				}
				
				vdom.elem = Runtime.Collection.from(res);
			}
			else
			{
				vdom.elem = new_childs;
			}
		}
		
		else if (vdom.kind == Runtime.Web.VirtualDom.KIND_COMPONENT)
		{
			vdom.component.onUpdateElem();
		}
		
		this.updateElemParams(vdom);
	},
	
	
	/**
	 * Update element params
	 */
	updateElemParams: function(vdom)
	{
		if (!vdom.params) return;
		
		let elem = vdom.elem;
		let keys = vdom.params.keys();
		for (let i=0; i<keys.count(); i++)
		{
			let key = keys[i];
			let value = vdom.params.get(key);
			
			/* Set reference */
			if (key == "@ref")
			{
				let component = value[0];
				let ref_name = value[1];
				component.setRef(ref_name, vdom);
				continue;
			}
			
			/* Set event */
			let is_event = false;
			let event_class_name = "";
			let es6_event_name = "";
			if (key.substr(0, 7) == "@event:")
			{
				is_event = true;
				event_class_name = key.substr(7);
				let getES6EventName = Runtime.rtl.method(event_class_name, "getES6EventName");
				es6_event_name = getES6EventName();
			}
			if (is_event)
			{
				let context = Runtime.rtl.getContext();
				let listener = context.provider("Runtime.Web.Listener");
				let component = value[0];
				let method_name = value[1];
				
				listener.addCallback(
					vdom.path_id.join(":"),
					event_class_name, 
					component,
					method_name,
				);
				
				if (vdom.is_new_element && es6_event_name != "" && vdom.isElement())
				{
					vdom.elem.addEventListener(es6_event_name, this.js_event_bind);
				}
				
				continue;
			}
			
			/* Set value */
			if (key == "value" && vdom.kind == Runtime.Web.VirtualDom.KIND_ELEMENT)
			{
				if (
					elem.tagName == "INPUT" ||
					elem.tagName == "SELECT" ||
					elem.tagName == "TEXTAREA" ||
					elem.tagName == "OPTION"
				)
				{
					if (value == null || value == "")
					{
						if (elem.value != "")
						{
							elem.value = "";
						}
					}
					else if (elem.value != value)
					{
						elem.value = value;
					}
					elem._old_value = value;
				}
				continue;
			}
			
			/* Element style */
			if (key == "style" && value instanceof Runtime.Dict)
			{
				value = value.transition(
					(v, k) => { return k + ": " + v; }
				);
				value = value.join(";");
			}
			
			/* Set attribute */
			if (key[0] != "@" && vdom.kind == Runtime.Web.VirtualDom.KIND_ELEMENT)
			{
				if (elem.getAttribute(key) != value)
				{
					elem.setAttribute(key, value);
				}
			}
		}
		
		/* Lazy load event */
		if (this.enable_lazy_load && vdom.is_new_element && elem != null)
		{
			if (elem.tagName == "A" && elem.classList.contains('lazy_load'))
			{
				elem.addEventListener("click", this.js_href_click_bind);
			}
		}
	},
	
	
	/**
	 * Open URL
	 */
	openUrl: async function(href, add_history)
	{
		if (add_history == undefined) add_history = true;
		
		var obj = { "href": href, };
		history.pushState(obj, "", href);
		
		this.history.pushValue(href);
		
		await this.renderPage(href);
	},
	
	
	/**
	 * Render page
	 */
	renderPage: async function(href)
	{
		let context = Runtime.rtl.getContext();
		let app = context.app;
		
		/* Save models */
		let models = this.layout.models;
		
		/* Create request */
		let obj = {
			"method": "GET",
			"protocol": document.location.protocol.slice(0,-1),
			"host": document.location.host,
		};
		let request = new Runtime.Web.Request(Runtime.Dict.from(obj));
		request = request.init(href);
		
		/* Create container */
		let container = new Runtime.Web.RenderContainer();
		container.request = request;
		
		/* Init container */
		await app.initContainer(container);
		
		/* Setup layout */
		container.layout = this.layout;
		
		/* Resolve container */
		await app.resolveContainer(container, models);
		
		/* Render */
		this.layout = container.layout;
		this.repaintRef(this.vdom);
	},
	
	
	/**
	 * JS event
	 */
	js_event: function(e)
	{
		let msg = null;
		let context = Runtime.rtl.getContext();
		let listener = context.provider("Runtime.Web.Listener");
		
		let vdom = e.currentTarget._vdom;
		
		msg = new Runtime.Web.Message( Runtime.Web.Events.WebEvent.fromEvent(e) );
		msg.dest = "";
		msg.sender = vdom;
		
		listener.dispatch(msg);
	},
	
	
	/**
	 * Lazy load
	 */
	js_href_click: function(e)
	{
		var elem = e.currentTarget;
		if (elem.tagName == "A" && elem.classList.contains('lazy_load'))
		{
			var target = elem.getAttribute("target");
			var href = elem.getAttribute("href");
			
			if (target == null)
			{
				e.preventDefault();
				
				(async () => {
					try { await this.openUrl(href); }
					catch (e) { console.log(e.stack); }
				})();
				
				return false;
			}
		}
	},
	
	
	/**
	 * Pos state event
	 */
	js_onpopstate: function(e)
	{
		if (this.history.count() == 0)
		{
			document.location = document.location;
		}
		else
		{
			let href = "/";
			if (e.state != null && typeof e.state.href == "string")
			{
				href = e.state.href;
			}
			
			this.history.pop();
			
			(async () => {
				try { await this.openUrl(href, false); }
				catch (e) { console.log(e.stack); }
			})();
		}
	},
	
	assignValue: function(k,v)
	{
		if (k == "layout")this.layout = v;
		else Runtime.BaseProvider.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "layout")return this.layout;
		return Runtime.BaseProvider.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.RenderProvider, Runtime.BaseProvider);
Object.assign(Runtime.Web.RenderProvider,
{
	
	/**
	 * Create element
	 */
	createElem(name, content)
	{
		if (name == "svg")
		{
			instance = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			
			/* Patch content */
			var e = document.createElement("div");
			e.innerHTML = "<svg>" + (content ? content : "") + "</svg>";
			var item = e.childNodes[0];
			while (item.childNodes.length > 0)
			{
				var e = item.childNodes[0];
				instance.appendChild(e);
			}
		}
		else
		{
			instance = document.createElement(name);
		}
		
		return instance;
	},
	
	
	/**
	 * Create raw html
	 */
	rawHtml(content)
	{
		var res = [];
		var e = document.createElement('div');
		e.innerHTML = Runtime.rs.trim(content)
		for (var i = 0; i < e.childNodes.length; i++) res.push( e.childNodes[i] );
		return Runtime.Collection.from(res);
	},
	
	
	/**
	 * Patch DOM with new childs
	 */
	patchElemChilds: function(parent_elem, new_childs)
	{
		if (new_childs == null) new_childs = [];
		
		var is_debug = false;
		is_debug = this.is_debug;
		
		var findElementPos = function (elem, e)
		{
			var childs = elem.childNodes;
			for (var i = 0; i < elem.childNodes.length; i++)
			{
				if (childs[i] == e)
				{
					return i;
				}
			}
			return -1;
		}
		
		var insertFirst = function (elem, e)
		{
			if (elem.childNodes.length == 0)
			{
				elem.appendChild(e);
			}
			else
			{
				elem.insertBefore(e, elem.firstChild);
			}
		}
		
		var insertAfter = function (elem, prev, e)
		{
			if (prev == null)
			{
				insertFirst(elem, e);
				return;
			}
			var next = prev.nextSibling;
			if (next == null)
			{
				elem.appendChild(e);
			}
			else
			{
				elem.insertBefore(e, next);
			}
		}
		
		/* Remove old elems if does not exists in new_childs */
		var i = parent_elem.childNodes.length - 1;
		while (i >= 0)
		{
			var e = parent_elem.childNodes[i];
			if (new_childs.indexOf(e) == -1)
			{
				parent_elem.removeChild(e);
				if (e._path_id != undefined)
				{
					this.remove_keys.pushValue(null, e._path_id);
				}
				if (is_debug) console.log('Remove child ', i, e);
			}
			i--;
		}
		
		var prevElem = null;
		for (var i=0; i<new_childs.length; i++)
		{
			var new_e = new_childs[i];
			if (typeof new_e == "string")
			{
				new_e = document.createTextNode(new_e);
			}
			
			var pos = findElementPos(parent_elem, new_e);
			var flag = false;
			
			/* If new element */
			if (pos == -1)
			{
				if (prevElem == null)
				{
					insertFirst(parent_elem, new_e);
					flag = true;
					if (is_debug) console.log('Insert first ', i, new_e);
				}
				else
				{
					insertAfter(parent_elem, prevElem, new_e);
					flag = true;
					if (is_debug) console.log('Insert after[1] ', i, new_e);
				}
			}
			
			/* If existing element */
			else
			{
				if (pos - 1 < 0)
				{
					if (i != 0)
					{
						insertAfter(parent_elem, prevElem, new_e);
						flag = true;
						if (is_debug) console.log('Insert after[2] ', i, new_e);
					}
				}
				else
				{
					var prevSibling = parent_elem.childNodes[pos - 1];
					if (prevElem != prevSibling)
					{
						insertAfter(parent_elem, prevElem, new_e);
						flag = true;
						if (is_debug) console.log('Insert after[3] ', i, new_e);
					}
				}
			}
			/*
			if (flag)
			{
				var index = this.remove_keys.indexOf(null, new_e._path_id);
				if (index != -1)
					this.remove_keys.remove(null, index, 1);
			}
			*/
			prevElem = new_e;
		}
	},
	
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RenderProvider";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function(f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.RenderProvider);
window["Runtime.Web.RenderProvider"] = Runtime.Web.RenderProvider;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.Response = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Response.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Response.prototype.constructor = Runtime.Web.Response;
Object.assign(Runtime.Web.Response.prototype,
{
	/**
	 * Returns content
	 */
	getContent: function()
	{
		return this.content;
	},
	/**
	 * Add cookie
	 */
	addCookie: function(cookie)
	{
		var res = this;
		res = Runtime.rtl.setAttr(res, Runtime.Collection.from(["cookies"]), res.cookies.setIm(cookie.name, cookie));
		return res;
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.http_code = 200;
		this.ob_content = "";
		this.content = "";
		this.cookies = Runtime.Dict.from({});
		this.headers = Runtime.Dict.from({});
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "http_code")return this.http_code;
		else if (k == "ob_content")return this.ob_content;
		else if (k == "content")return this.content;
		else if (k == "cookies")return this.cookies;
		else if (k == "headers")return this.headers;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Response, Runtime.BaseStruct);
Object.assign(Runtime.Web.Response,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Response";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("http_code");
		a.push("ob_content");
		a.push("content");
		a.push("cookies");
		a.push("headers");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "http_code") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ob_content") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "cookies") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["Runtime.Web.Cookie"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "headers") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getContent",
			"addCookie",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Response);
window["Runtime.Web.Response"] = Runtime.Web.Response;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Response;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.RedirectResponse = function()
{
	Runtime.Web.Response.apply(this, arguments);
};
Runtime.Web.RedirectResponse.prototype = Object.create(Runtime.Web.Response.prototype);
Runtime.Web.RedirectResponse.prototype.constructor = Runtime.Web.RedirectResponse;
Object.assign(Runtime.Web.RedirectResponse.prototype,
{
	_init: function()
	{
		Runtime.Web.Response.prototype._init.call(this);
		this.redirect = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "redirect")return this.redirect;
		return Runtime.Web.Response.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.RedirectResponse, Runtime.Web.Response);
Object.assign(Runtime.Web.RedirectResponse,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RedirectResponse";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Response";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("redirect");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "redirect") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.RedirectResponse);
window["Runtime.Web.RedirectResponse"] = Runtime.Web.RedirectResponse;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RedirectResponse;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.RenderResponse = function()
{
	Runtime.Web.Response.apply(this, arguments);
};
Runtime.Web.RenderResponse.prototype = Object.create(Runtime.Web.Response.prototype);
Runtime.Web.RenderResponse.prototype.constructor = Runtime.Web.RenderResponse;
Object.assign(Runtime.Web.RenderResponse.prototype,
{
	_init: function()
	{
		Runtime.Web.Response.prototype._init.call(this);
		this.class_name = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "class_name")return this.class_name;
		return Runtime.Web.Response.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.RenderResponse, Runtime.Web.Response);
Object.assign(Runtime.Web.RenderResponse,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RenderResponse";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Response";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("class_name");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "class_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.RenderResponse);
window["Runtime.Web.RenderResponse"] = Runtime.Web.RenderResponse;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RenderResponse;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.Request = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Request.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Request.prototype.constructor = Runtime.Web.Request;
Object.assign(Runtime.Web.Request.prototype,
{
	/**
	 * Returns client ip
	 */
	getClientIp: function()
	{
		return this.headers.get("REMOTE_ADDR");
	},
	/**
	 * Init request
	 */
	init: function(full_uri)
	{
		var res = Runtime.rs.parse_url(full_uri);
		var uri = Runtime.rtl.get(res, "uri");
		var query = Runtime.rtl.get(res, "query_arr");
		return this.clone(Runtime.Dict.from({"full_uri":full_uri,"uri":uri,"query":query}));
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.uri = "";
		this.full_uri = "";
		this.host = "";
		this.method = "GET";
		this.protocol = "";
		this.query = null;
		this.payload = null;
		this.cookies = null;
		this.headers = null;
		this.start_time = 0;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "uri")return this.uri;
		else if (k == "full_uri")return this.full_uri;
		else if (k == "host")return this.host;
		else if (k == "method")return this.method;
		else if (k == "protocol")return this.protocol;
		else if (k == "query")return this.query;
		else if (k == "payload")return this.payload;
		else if (k == "cookies")return this.cookies;
		else if (k == "headers")return this.headers;
		else if (k == "start_time")return this.start_time;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Request, Runtime.BaseStruct);
Object.assign(Runtime.Web.Request,
{
	METHOD_GET: "GET",
	METHOD_HEAD: "HEAD",
	METHOD_POST: "POST",
	METHOD_PUT: "PUT",
	METHOD_DELETE: "DELETE",
	METHOD_CONNECT: "CONNECT",
	METHOD_OPTIONS: "OPTIONS",
	METHOD_TRACE: "TRACE",
	METHOD_PATCH: "PATCH",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Request";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("uri");
		a.push("full_uri");
		a.push("host");
		a.push("method");
		a.push("protocol");
		a.push("query");
		a.push("payload");
		a.push("cookies");
		a.push("headers");
		a.push("start_time");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "uri") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "full_uri") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "host") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "method") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "protocol") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "query") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "payload") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["var"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "cookies") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["Runtime.Web.Cookie"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "headers") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "start_time") return Dict.from({
			"t": "float",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getClientIp",
			"init",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Request);
window["Runtime.Web.Request"] = Runtime.Web.Request;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Request;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.Response = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Response.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Response.prototype.constructor = Runtime.Web.Response;
Object.assign(Runtime.Web.Response.prototype,
{
	/**
	 * Returns content
	 */
	getContent: function()
	{
		return this.content;
	},
	/**
	 * Add cookie
	 */
	addCookie: function(cookie)
	{
		var res = this;
		res = Runtime.rtl.setAttr(res, Runtime.Collection.from(["cookies"]), res.cookies.setIm(cookie.name, cookie));
		return res;
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.http_code = 200;
		this.ob_content = "";
		this.content = "";
		this.cookies = Runtime.Dict.from({});
		this.headers = Runtime.Dict.from({});
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "http_code")return this.http_code;
		else if (k == "ob_content")return this.ob_content;
		else if (k == "content")return this.content;
		else if (k == "cookies")return this.cookies;
		else if (k == "headers")return this.headers;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Response, Runtime.BaseStruct);
Object.assign(Runtime.Web.Response,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Response";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("http_code");
		a.push("ob_content");
		a.push("content");
		a.push("cookies");
		a.push("headers");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "http_code") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ob_content") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "cookies") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["Runtime.Web.Cookie"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "headers") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getContent",
			"addCookie",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Response);
window["Runtime.Web.Response"] = Runtime.Web.Response;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Response;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.RouteInfo = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.RouteInfo.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.RouteInfo.prototype.constructor = Runtime.Web.RouteInfo;
Object.assign(Runtime.Web.RouteInfo.prototype,
{
	/**
	 * Init struct data
	 */
	_init_data: function(changed)
	{
		if (changed.has("uri") && !changed.has("uri_match"))
		{
			var uri = Runtime.rtl.get(changed, "uri");
			var uri_match = Runtime.rtl.get(changed, "uri_match");
			uri_match = Runtime.re.replace("\\/", "\\/", uri);
			var matches = Runtime.re.matchAll("{(.*?)}", uri);
			if (matches)
			{
				var params = new Runtime.Vector();
				for (var i = 0;i < matches.count();i++)
				{
					var arr = Runtime.rtl.get(matches, i);
					var name = Runtime.rtl.get(arr, 1);
					uri_match = Runtime.re.replace("{" + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("}"), "([^\\/]*?)", uri_match);
					params.pushValue(name);
				}
				changed = Runtime.rtl.setAttr(changed, Runtime.Collection.from(["params"]), params.toCollection());
			}
			else
			{
				changed = Runtime.rtl.setAttr(changed, Runtime.Collection.from(["params"]), Runtime.Collection.from([]));
			}
			changed = Runtime.rtl.setAttr(changed, Runtime.Collection.from(["uri_match"]), "^" + Runtime.rtl.toStr(uri_match) + Runtime.rtl.toStr("$"));
		}
		return changed;
	},
	/**
	 * Get params
	 * @return Map<string>
	 */
	addMatches: function(matches)
	{
		var info = this;
		if (info.params == null || matches == null)
		{
			return info;
		}
		var res = info.matches.toMap();
		for (var i = 0;i < info.params.count();i++)
		{
			var param_name = Runtime.rtl.get(info.params, i);
			var match_value = Runtime.rtl.get(matches, i);
			res.setValue(param_name, match_value);
		}
		info = Runtime.rtl.setAttr(info, Runtime.Collection.from(["matches"]), res.toDict());
		return info;
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.name = "";
		this.uri = "";
		this.uri_match = "";
		this.domain = "";
		this.method = null;
		this.middleware = Runtime.Collection.from([]);
		this.params = Runtime.Collection.from([]);
		this.matches = Runtime.Dict.from({});
		this.enable_locale = true;
		this.pos = 100;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "uri")return this.uri;
		else if (k == "uri_match")return this.uri_match;
		else if (k == "domain")return this.domain;
		else if (k == "method")return this.method;
		else if (k == "middleware")return this.middleware;
		else if (k == "params")return this.params;
		else if (k == "matches")return this.matches;
		else if (k == "enable_locale")return this.enable_locale;
		else if (k == "pos")return this.pos;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.RouteInfo, Runtime.BaseStruct);
Object.assign(Runtime.Web.RouteInfo,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RouteInfo";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("name");
		a.push("uri");
		a.push("uri_match");
		a.push("domain");
		a.push("method");
		a.push("middleware");
		a.push("params");
		a.push("matches");
		a.push("enable_locale");
		a.push("pos");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "uri") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "uri_match") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "domain") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "method") return Dict.from({
			"t": "fn",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "middleware") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "matches") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_locale") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pos") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"addMatches",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.RouteInfo);
window["Runtime.Web.RouteInfo"] = Runtime.Web.RouteInfo;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RouteInfo;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.RouteList = function()
{
	Runtime.BaseProvider.apply(this, arguments);
};
Runtime.Web.RouteList.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.Web.RouteList.prototype.constructor = Runtime.Web.RouteList;
Object.assign(Runtime.Web.RouteList.prototype,
{
	/**
	 * Start provider
	 */
	start: async function()
	{
		var routes_list = new Runtime.Map();
		var routes = Runtime.rtl.getContext().entities.filter(Runtime.lib.isInstance("Runtime.Web.Annotations.Route"));
		for (var i = 0;i < routes.count();i++)
		{
			var info = Runtime.rtl.get(routes, i);
			if (info.name)
			{
				/* Get method getRoutes */
				var getRoutes = Runtime.rtl.method(info.name, "getRoutes");
				/* Create routes */
				var routes_info = getRoutes();
				if (routes_info)
				{
					for (var j = 0;j < routes_info.count();j++)
					{
						var route = Runtime.rtl.get(routes_info, j);
						if (Runtime.rtl.isString(route.method))
						{
							route = Runtime.rtl.setAttr(route, Runtime.Collection.from(["method"]), Runtime.Collection.from([info.name,route.method]));
						}
						routes_list.setValue(route.name, route);
					}
				}
			}
		}
		await Runtime.rtl.getContext().callAsyncHook(Runtime.Web.AppHook.ROUTES_INIT, Runtime.Dict.from({"routes":this,"routes_list":routes_list}));
		this.routes_list = routes_list.toDict();
	},
	/**
	 * Find route
	 */
	findRoute: function(container)
	{
		var route = null;
		var request = container.request;
		var params = null;
		var request_uri = request.uri;
		/*
		string route_prefix = @.env("route_prefix");
		request_uri = static::splitRoutePrefix(request_uri, route_prefix);
		*/
		if (request_uri === null)
		{
			return null;
		}
		if (request_uri == "")
		{
			request_uri = "/";
		}
		/* Find route */
		var routes = this.routes_list.values();
		routes = routes.map((value, index) => 
		{
			return Runtime.Collection.from([value,index]);
		});
		routes = routes.sort((a, b) => 
		{
			var pos_a = Runtime.rtl.get(a, 0).pos;
			var pos_b = Runtime.rtl.get(b, 0).pos;
			if (pos_a == pos_b)
			{
				return Runtime.rtl.get(a, 1) - Runtime.rtl.get(b, 1);
			}
			return pos_a - pos_b;
		});
		for (var i = 0;i < routes.count();i++)
		{
			var route = Runtime.rtl.get(Runtime.rtl.get(routes, i), 0);
			if (route.domain == request.host || route.domain == "")
			{
				var matches = Runtime.re.matchAll(route.uri_match, request_uri);
				if (matches)
				{
					matches = matches.get(0, null).removeFirstIm();
				}
				var d = Runtime.rtl.getContext().callHook(Runtime.Web.AppHook.MATCH_ROUTE, Runtime.Dict.from({"route":route,"request_uri":request_uri,"container":container,"matches":matches}));
				route = Runtime.rtl.get(d, "route");
				matches = Runtime.rtl.get(d, "matches");
				if (matches != null)
				{
					route = route.addMatches(matches);
					return route;
				}
			}
		}
		return null;
	},
	/**
	 * Returns url
	 */
	url: function(route_name, route_params)
	{
		if (route_params == undefined) route_params = null;
		var url = "";
		var route = Runtime.rtl.get(this.routes_list, route_name);
		if (route)
		{
			url = route.uri;
		}
		if (route_params)
		{
			route_params.each((value, key) => 
			{
				var pos = Runtime.rs.indexOf(url, "{" + Runtime.rtl.toStr(key) + Runtime.rtl.toStr("}"));
				if (pos >= 0)
				{
					url = Runtime.rs.replace("{" + Runtime.rtl.toStr(key) + Runtime.rtl.toStr("}"), value, url);
				}
				else
				{
					url = Runtime.rs.url_get_add(url, key, value);
				}
			});
		}
		var d = Runtime.rtl.getContext().callHook(Runtime.Web.AppHook.MAKE_URL, Runtime.Dict.from({"route":route,"route_name":route_name,"route_params":route_params,"url":url}));
		url = Runtime.rtl.get(d, "url");
		if (route && route.domain)
		{
			if (Runtime.rtl.getContext().env("HTTP_PROTOCOL") == "https")
			{
				url = "https://" + Runtime.rtl.toStr(route.domain) + Runtime.rtl.toStr(url);
			}
			else
			{
				url = "http://" + Runtime.rtl.toStr(route.domain) + Runtime.rtl.toStr(url);
			}
		}
		var d = Runtime.rtl.getContext().callHook(Runtime.Web.AppHook.MAKE_URL_AFTER, Runtime.Dict.from({"route":route,"route_name":route_name,"route_params":route_params,"url":url}));
		url = Runtime.rtl.get(d, "url");
		return url;
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.routes_list = Runtime.Dict.from({});
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.RouteList)
		{
			this.routes_list = o.routes_list;
		}
		Runtime.BaseProvider.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "routes_list")this.routes_list = v;
		else Runtime.BaseProvider.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "routes_list")return this.routes_list;
		return Runtime.BaseProvider.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.RouteList, Runtime.BaseProvider);
Object.assign(Runtime.Web.RouteList,
{
	/**
	 * Split route prefix
	 */
	splitRoutePrefix: function(request_uri, route_prefix)
	{
		var prefix_len = Runtime.rs.strlen(route_prefix);
		if (prefix_len > 0)
		{
			var pos = Runtime.rs.search(request_uri, route_prefix);
			if (pos == -1)
			{
				return null;
			}
			request_uri = Runtime.rs.substr(request_uri, prefix_len);
		}
		if (request_uri == "")
		{
			request_uri = "/";
		}
		return request_uri;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RouteList";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("routes_list");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "routes_list") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["Runtime.Web.RouteInfo"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"start",
			"findRoute",
			"splitRoutePrefix",
			"url",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.RouteList);
window["Runtime.Web.RouteList"] = Runtime.Web.RouteList;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RouteList;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.SeoModel = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.SeoModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.SeoModel.prototype.constructor = Runtime.Web.SeoModel;
Object.assign(Runtime.Web.SeoModel.prototype,
{
	/**
     * Add tags
     */
	addTags: function(tags)
	{
		return (tags != null) ? (this.clone(Runtime.Dict.from({"tags":this.tags.concat(tags)}))) : (this);
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.title_ext = "";
		this.description = "";
		this.site_name = "";
		this.robots = Runtime.Collection.from(["follow","index"]);
		this.canonical_url = "";
		this.prev_url = "";
		this.next_url = "";
		this.locale = "";
		this.og_type = "";
		this.og_image = "";
		this.article_section = "";
		this.article_publisher = "";
		this.article_published_time = "";
		this.article_modified_time = "";
		this.tags = Runtime.Collection.from([]);
		this.params = Runtime.Collection.from([]);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "title_ext")return this.title_ext;
		else if (k == "description")return this.description;
		else if (k == "site_name")return this.site_name;
		else if (k == "robots")return this.robots;
		else if (k == "canonical_url")return this.canonical_url;
		else if (k == "prev_url")return this.prev_url;
		else if (k == "next_url")return this.next_url;
		else if (k == "locale")return this.locale;
		else if (k == "og_type")return this.og_type;
		else if (k == "og_image")return this.og_image;
		else if (k == "article_section")return this.article_section;
		else if (k == "article_publisher")return this.article_publisher;
		else if (k == "article_published_time")return this.article_published_time;
		else if (k == "article_modified_time")return this.article_modified_time;
		else if (k == "tags")return this.tags;
		else if (k == "params")return this.params;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.SeoModel, Runtime.BaseStruct);
Object.assign(Runtime.Web.SeoModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.SeoModel";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("title_ext");
		a.push("description");
		a.push("site_name");
		a.push("robots");
		a.push("canonical_url");
		a.push("prev_url");
		a.push("next_url");
		a.push("locale");
		a.push("og_type");
		a.push("og_image");
		a.push("article_section");
		a.push("article_publisher");
		a.push("article_published_time");
		a.push("article_modified_time");
		a.push("tags");
		a.push("params");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "title_ext") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "description") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "site_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "robots") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "canonical_url") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "prev_url") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "next_url") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "locale") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "og_type") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "og_image") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "article_section") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "article_publisher") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "article_published_time") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "article_modified_time") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "tags") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"addTags",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.SeoModel);
window["Runtime.Web.SeoModel"] = Runtime.Web.SeoModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.SeoModel;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.VirtualDom = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Web.VirtualDom.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.VirtualDom.prototype.constructor = Runtime.Web.VirtualDom;
Object.assign(Runtime.Web.VirtualDom.prototype,
{
	/**
	 * Returns path id
	 */
	getPathId: function()
	{
		return Runtime.rs.join(":", this.path_id);
	},
	/**
	 * Is element
	 */
	isElement: function()
	{
		return this.kind == this.constructor.KIND_ELEMENT || this.kind == this.constructor.KIND_TEXT || this.kind == this.constructor.KIND_RAW;
	},
	/**
	 * Is text
	 */
	isText: function()
	{
		return this.kind == this.constructor.KIND_TEXT || this.kind == this.constructor.KIND_RAW;
	},
	/**
	 * Is component
	 */
	isComponent: function()
	{
		return this.kind == this.constructor.KIND_COMPONENT;
	},
	/**
	 * Find element by key
	 */
	findChildElement: function(key)
	{
		for (var i = 0;i < this.childs.count();i++)
		{
			var item = Runtime.rtl.get(this.childs, i);
			if (item.key == key)
			{
				return item;
			}
		}
		return null;
	},
	/**
	 * Return true if vdom is changed
	 */
	isChanged: function(params, content)
	{
		if (this.kind == this.constructor.KIND_COMPONENT && this.component instanceof Runtime.Web.Component)
		{
			var provider = Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
			var model_path = this.findModelPath(params);
			var model = provider.model(model_path);
			return this.component.isChanged(model, params, content);
		}
		if (this.isElement())
		{
			return this.constructor.isChangedParams(this.params, params) || this.content != content;
		}
		return true;
	},
	/**
	 * Element
	 */
	e: function(kind, name, params, content, opts)
	{
		if (content == undefined) content = null;
		if (opts == undefined) opts = null;
		var vdom = null;
		params = Runtime.Dict.from(params);
		var pos = this.new_childs.count();
		/* Get key */
		var key = Runtime.rtl.to(params.get("@key", ""), {"e":"string"});
		if (key == "" && name == "")
		{
			key = pos;
		}
		else if (key == "")
		{
			key = name + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(pos);
		}
		/* Get kind */
		if (kind == "c")
		{
			kind = this.constructor.KIND_COMPONENT;
		}
		else if (kind == "f")
		{
			kind = this.constructor.KIND_FUNCTION;
		}
		else if (kind == "e")
		{
			kind = this.constructor.KIND_ELEMENT;
		}
		else if (kind == "t")
		{
			kind = this.constructor.KIND_TEXT;
		}
		else if (kind == "r")
		{
			kind = this.constructor.KIND_RAW;
		}
		else
		{
			return null;
		}
		/* Check if function */
		if (kind == this.constructor.KIND_TEXT && content != null && Runtime.rtl.isFn(content))
		{
			kind = this.constructor.KIND_FUNCTION;
		}
		else if (kind == this.constructor.KIND_TEXT && content != null && content instanceof Runtime.Collection)
		{
			kind = this.constructor.KIND_COLLECTION;
		}
		/* Find child element */
		vdom = this.findChildElement(key);
		/* Check vdom kind */
		if (vdom != null && (vdom.kind != kind || vdom.name != name))
		{
			vdom = null;
		}
		/* Create new element */
		if (vdom == null)
		{
			vdom = new Runtime.Web.VirtualDom();
			vdom.key = key;
			vdom.kind = kind;
			vdom.name = name;
			vdom.params = params;
			vdom.content = content;
			vdom.parent_vdom = this;
			vdom.path_id = this.path_id.pushIm(key);
			vdom.is_change_childs = false;
			vdom.is_changed_item = true;
			vdom.is_new_element = true;
		}
		else
		{
			vdom.is_new_element = false;
			vdom.is_change_childs = false;
			vdom.is_changed_item = vdom.isChanged(params, content);
			vdom.params = params;
			vdom.content = content;
		}
		/* Set component */
		if (vdom.isElement() || kind == this.constructor.KIND_FUNCTION)
		{
			vdom.component = this.component;
		}
		/* Clear vdom childs */
		vdom.new_childs = new Runtime.Vector();
		/* Push child */
		this.new_childs.pushValue(vdom);
		/* Get render provider */
		var provider = Runtime.rtl.get(window, "render_provider");
		/* Add to render_dom_list if vdom is changed */
		if (vdom.is_changed_item)
		{
			if (vdom.isElement())
			{
				provider.addChangedElem(vdom);
			}
			else if (kind == this.constructor.KIND_FUNCTION)
			{
				vdom.render = content;
				content(vdom);
				vdom.p();
			}
			else if (kind == this.constructor.KIND_COMPONENT)
			{
				var class_name = name;
				var model_path = this.findModelPath(params);
				vdom.is_new_element = false;
				if (vdom.component == null)
				{
					vdom.component = Runtime.rtl.newInstance(class_name);
					vdom.component.vdom = vdom;
					vdom.component.provider = provider;
					vdom.is_new_element = true;
				}
				var component = vdom.component;
				/* Setup params */
				component.updateParams(model_path, params, content);
				/* On create */
				if (vdom.is_new_element)
				{
					component.onCreate();
				}
				else
				{
					component.onUpdate();
				}
				/* Get render */
				var render = Runtime.rtl.method(class_name, "render");
				/* Render component */
				if (component.isRender())
				{
					var f = render(component, params, content);
					if (f)
					{
						f(vdom);
						vdom.p();
					}
					/* Render event */
					component.onRender();
					/* Change element */
					provider.addChangedElem(vdom);
				}
			}
		}
		return vdom;
	},
	/**
	 * Patch childs
	 */
	p: function()
	{
		var provider = Runtime.rtl.get(window, "render_provider");
		if (this.childs.count() != this.new_childs.count())
		{
			provider.addChangedElemChilds(this);
		}
		this.childs = this.new_childs.toCollection();
		this.new_childs = new Runtime.Vector();
		this.is_change_childs = true;
	},
	/**
	 * Update element
	 */
	updateElem: function()
	{
		var provider = Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
		provider.updateElem(this);
	},
	/**
	 * Update element params
	 */
	updateElemParams: function()
	{
		var provider = Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
		provider.updateElemParams(this);
	},
	/**
	 * Get parent component
	 */
	getParentComponentVirtualDom: function(class_name)
	{
		if (class_name == undefined) class_name = "";
		var vdom = this.parent_vdom;
		while (vdom != null && vdom.kind != this.constructor.KIND_COMPONENT && (class_name == "" || class_name != "" && vdom.name != class_name))
		{
			vdom = vdom.parent_vdom;
		}
		return vdom;
	},
	/**
	 * Get parent component
	 */
	getParentComponent: function(class_name)
	{
		if (class_name == undefined) class_name = "";
		var vdom = this.getParentComponentVirtualDom(class_name);
		return (vdom != null) ? (vdom.instance) : (null);
	},
	/**
	 * Get parent element
	 */
	getParentElement: function()
	{
		var parent_vdom = this.parent_vdom;
		while (parent_vdom != null && !parent_vdom.isElement())
		{
			parent_vdom = parent_vdom.parent_vdom;
		}
		return parent_vdom;
	},
	/**
	 * Returns model path
	 */
	findModelPath: function(params)
	{
		var attr = Runtime.rtl.get(params, "@model");
		if (!attr)
		{
			return null;
		}
		var component = Runtime.rtl.get(attr, 0);
		var model_path = Runtime.rtl.get(attr, 1);
		if (component.model_path == null)
		{
			return null;
		}
		return component.model_path.concat(model_path);
	},
	/**
	 * Returns childs elements
	 */
	getChildElements: function(new_childs)
	{
		if (new_childs == undefined) new_childs = false;
		var res = new Runtime.Vector();
		this.constructor._getChildElements(this, res, new_childs);
		return res.toCollection();
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.key = "";
		this.kind = "";
		this.name = "";
		this.content = "";
		this.params = null;
		this.childs = Runtime.Collection.from([]);
		this.new_childs = new Runtime.Vector();
		this.path_id = null;
		this.parent_vdom = null;
		this.component = null;
		this.is_new_element = false;
		this.is_changed_item = false;
		this.is_change_childs = false;
		this.render = null;
		this.elem = null;
		this.parent_elem = null;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.VirtualDom)
		{
			this.key = o.key;
			this.kind = o.kind;
			this.name = o.name;
			this.content = o.content;
			this.params = o.params;
			this.childs = o.childs;
			this.new_childs = o.new_childs;
			this.path_id = o.path_id;
			this.parent_vdom = o.parent_vdom;
			this.component = o.component;
			this.is_new_element = o.is_new_element;
			this.is_changed_item = o.is_changed_item;
			this.is_change_childs = o.is_change_childs;
			this.render = o.render;
			this.elem = o.elem;
			this.parent_elem = o.parent_elem;
		}
		Runtime.BaseObject.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "key")this.key = v;
		else if (k == "kind")this.kind = v;
		else if (k == "name")this.name = v;
		else if (k == "content")this.content = v;
		else if (k == "params")this.params = v;
		else if (k == "childs")this.childs = v;
		else if (k == "new_childs")this.new_childs = v;
		else if (k == "path_id")this.path_id = v;
		else if (k == "parent_vdom")this.parent_vdom = v;
		else if (k == "component")this.component = v;
		else if (k == "is_new_element")this.is_new_element = v;
		else if (k == "is_changed_item")this.is_changed_item = v;
		else if (k == "is_change_childs")this.is_change_childs = v;
		else if (k == "render")this.render = v;
		else if (k == "elem")this.elem = v;
		else if (k == "parent_elem")this.parent_elem = v;
		else Runtime.BaseObject.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "key")return this.key;
		else if (k == "kind")return this.kind;
		else if (k == "name")return this.name;
		else if (k == "content")return this.content;
		else if (k == "params")return this.params;
		else if (k == "childs")return this.childs;
		else if (k == "new_childs")return this.new_childs;
		else if (k == "path_id")return this.path_id;
		else if (k == "parent_vdom")return this.parent_vdom;
		else if (k == "component")return this.component;
		else if (k == "is_new_element")return this.is_new_element;
		else if (k == "is_changed_item")return this.is_changed_item;
		else if (k == "is_change_childs")return this.is_change_childs;
		else if (k == "render")return this.render;
		else if (k == "elem")return this.elem;
		else if (k == "parent_elem")return this.parent_elem;
		return Runtime.BaseObject.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.VirtualDom, Runtime.BaseObject);
Object.assign(Runtime.Web.VirtualDom,
{
	KIND_ROOT: "root",
	KIND_COLLECTION: "collection",
	KIND_COMPONENT: "component",
	KIND_FUNCTION: "function",
	KIND_ELEMENT: "element",
	KIND_TEXT: "text",
	KIND_RAW: "raw",
	/**
	 * Returns true if params is changed
	 */
	isChangedParams: function(old_params, new_params)
	{
		var f = (value, key) => 
		{
			if (Runtime.rs.indexOf(key, "@") == 0)
			{
				return false;
			}
			return true;
		};
		old_params = old_params.filter(f);
		new_params = new_params.filter(f);
		if (!old_params.equal(new_params))
		{
			return true;
		}
		return false;
	},
	/**
	 * Returns childs elements
	 */
	_getChildElements: function(vdom, res, new_childs)
	{
		if (new_childs == undefined) new_childs = false;
		var childs = null;
		if (new_childs)
		{
			childs = vdom.new_childs;
		}
		else
		{
			childs = vdom.childs;
		}
		if (childs == null)
		{
			return ;
		}
		/* Foreach childs */
		for (var i = 0;i < childs.count();i++)
		{
			var item = Runtime.rtl.get(childs, i);
			if (item.isElement())
			{
				res.pushValue(item);
			}
			else if (item.kind == this.KIND_COMPONENT || item.kind == this.KIND_FUNCTION || item.kind == this.KIND_COLLECTION)
			{
				this._getChildElements(item, res, new_childs);
			}
		}
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.VirtualDom";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("key");
		a.push("kind");
		a.push("name");
		a.push("content");
		a.push("params");
		a.push("childs");
		a.push("new_childs");
		a.push("path_id");
		a.push("parent_vdom");
		a.push("component");
		a.push("is_new_element");
		a.push("is_changed_item");
		a.push("is_change_childs");
		a.push("render");
		a.push("elem");
		a.push("parent_elem");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "key") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return Dict.from({
			"t": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "childs") return Dict.from({
			"t": "Runtime.Collection",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "new_childs") return Dict.from({
			"t": "Runtime.Vector",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "path_id") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parent_vdom") return Dict.from({
			"t": "Runtime.Web.VirtualDom",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "component") return Dict.from({
			"t": "Runtime.Web.Component",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_new_element") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_changed_item") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_change_childs") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "render") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "elem") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parent_elem") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getPathId",
			"isElement",
			"isText",
			"isComponent",
			"findChildElement",
			"isChangedParams",
			"isChanged",
			"e",
			"p",
			"updateElem",
			"updateElemParams",
			"getParentComponentVirtualDom",
			"getParentComponent",
			"getParentElement",
			"findModelPath",
			"_getChildElements",
			"getChildElements",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.VirtualDom);
window["Runtime.Web.VirtualDom"] = Runtime.Web.VirtualDom;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.VirtualDom;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Annotations == 'undefined') Runtime.Web.Annotations = {};
Runtime.Web.Annotations.Api = function(api_name)
{
	Runtime.Entity.call(this, Runtime.Dict.from({"name":api_name}));
};
Runtime.Web.Annotations.Api.prototype = Object.create(Runtime.Entity.prototype);
Runtime.Web.Annotations.Api.prototype.constructor = Runtime.Web.Annotations.Api;
Object.assign(Runtime.Web.Annotations.Api.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Annotations.Api)
		{
		}
		Runtime.Entity.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Entity.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Entity.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Annotations.Api, Runtime.Entity);
Object.assign(Runtime.Web.Annotations.Api,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Annotations";
	},
	getClassName: function()
	{
		return "Runtime.Web.Annotations.Api";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Annotations.Api);
window["Runtime.Web.Annotations.Api"] = Runtime.Web.Annotations.Api;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Annotations.Api;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Annotations == 'undefined') Runtime.Web.Annotations = {};
Runtime.Web.Annotations.Route = function(route_name)
{
	Runtime.Entity.call(this, Runtime.Dict.from({"name":route_name}));
};
Runtime.Web.Annotations.Route.prototype = Object.create(Runtime.Entity.prototype);
Runtime.Web.Annotations.Route.prototype.constructor = Runtime.Web.Annotations.Route;
Object.assign(Runtime.Web.Annotations.Route.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Annotations.Route)
		{
		}
		Runtime.Entity.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Entity.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Entity.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Annotations.Route, Runtime.Entity);
Object.assign(Runtime.Web.Annotations.Route,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Annotations";
	},
	getClassName: function()
	{
		return "Runtime.Web.Annotations.Route";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Annotations.Route);
window["Runtime.Web.Annotations.Route"] = Runtime.Web.Annotations.Route;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Annotations.Route;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.BaseEvent = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Events.BaseEvent.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Events.BaseEvent.prototype.constructor = Runtime.Web.Events.BaseEvent;
Object.assign(Runtime.Web.Events.BaseEvent.prototype,
{
	/**
	 * Check if event is cancel
	 */
	isCancel: function()
	{
		return false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.BaseEvent, Runtime.BaseStruct);
Object.assign(Runtime.Web.Events.BaseEvent,
{
	/**
	 * Cancel event
	 */
	cancel: function(event)
	{
		return event;
	},
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.BaseEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"isCancel",
			"cancel",
			"getES6EventName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.BaseEvent);
window["Runtime.Web.Events.BaseEvent"] = Runtime.Web.Events.BaseEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.BaseEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.WebEvent = function()
{
	Runtime.Web.Events.BaseEvent.apply(this, arguments);
};
Runtime.Web.Events.WebEvent.prototype = Object.create(Runtime.Web.Events.BaseEvent.prototype);
Runtime.Web.Events.WebEvent.prototype.constructor = Runtime.Web.Events.WebEvent;
Object.assign(Runtime.Web.Events.WebEvent.prototype,
{
	/**
	 * Check if event is cancel
	 */
	isCancel: function()
	{
		return this.cancel_bubble;
	},
	_init: function()
	{
		Runtime.Web.Events.BaseEvent.prototype._init.call(this);
		this.name = "";
		this.bubbles = false;
		this.cancel_bubble = false;
		this.cancelable = true;
		this.composed = true;
		this.default_prevented = false;
		this.event_phase = 0;
		this.is_trusted = true;
		this.es6_event = null;
		this.currentElement = null;
		this.target = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "bubbles")return this.bubbles;
		else if (k == "cancel_bubble")return this.cancel_bubble;
		else if (k == "cancelable")return this.cancelable;
		else if (k == "composed")return this.composed;
		else if (k == "default_prevented")return this.default_prevented;
		else if (k == "event_phase")return this.event_phase;
		else if (k == "is_trusted")return this.is_trusted;
		else if (k == "es6_event")return this.es6_event;
		else if (k == "currentElement")return this.currentElement;
		else if (k == "target")return this.target;
		return Runtime.Web.Events.BaseEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.WebEvent, Runtime.Web.Events.BaseEvent);
Object.assign(Runtime.Web.Events.WebEvent,
{
	assignEventObject: function(obj, e)
	{
		obj.setValue("name", e.type);
		obj.setValue("currentElement", e.target);
		obj.setValue("target", e.currentTarget);
		obj.setValue("bubbles", e.bubbles);
		obj.setValue("cancel_bubble", e.cancel_bubble);
		obj.setValue("cancelable", e.cancelable);
		obj.setValue("composed", e.composed);
		obj.setValue("default_prevented", e.default_prevented);
		obj.setValue("event_phase", e.event_phase);
		obj.setValue("is_trusted", e.isTrusted);
		obj.setValue("es6_event", e);
	},
	fromEvent: function(e)
	{
		var target = e.currentTarget || e.target;
		var doc = target.ownerDocument || target;
		var win = doc.defaultView;
		var event = null;
		var obj = new Runtime.Map();
		var class_name = "";
		
		if (e.type == "click") class_name = "Runtime.Web.Events.MouseClickEvent";
		else if (e.type == "dblclick") class_name = "Runtime.Web.Events.MouseDoubleClickEvent";
		else if (e.type == "contextmenu") class_name = "Runtime.Web.Events.MouseContextMenuEvent";
		else if (e.type == "mousedown") class_name = "Runtime.Web.Events.MouseDownEvent";
		else if (e.type == "mouseenter") class_name = "Runtime.Web.Events.MouseEnterEvent";
		else if (e.type == "mouseleave") class_name = "Runtime.Web.Events.MouseLeaveEvent";
		else if (e.type == "mousemove") class_name = "Runtime.Web.Events.MouseMoveEvent";
		else if (e.type == "mouseout") class_name = "Runtime.Web.Events.MouseOutEvent";
		else if (e.type == "mouseover") class_name = "Runtime.Web.Events.MouseOverEvent";
		else if (e.type == "mouseup") class_name = "Runtime.Web.Events.MouseUpEvent";
		else if (e.type == "wheel") class_name = "Runtime.Web.Events.MouseWheelEvent";
		else if (e.type == "change") class_name = "Runtime.Web.Events.ChangeEvent";
		else if (e.type == "focus") class_name = "Runtime.Web.Events.FocusEvent";
		else if (e.type == "blur") class_name = "Runtime.Web.Events.BlurEvent";
		else if (e.type == "keydown") class_name = "Runtime.Web.Events.KeyDownEvent";
		else if (e.type == "keypress") class_name = "Runtime.Web.Events.KeyUpEvent";
		else if (e.type == "keyup") class_name = "Runtime.Web.Events.KeyPressEvent";
		
		var class_obj = use(class_name);
		class_obj.assignEventObject(obj, e);
		event = new class_obj(obj);
		
		if (event == null)
			return null;
			
		return event;
	},
	/**
	 * Cancel event
	 */
	preventDefault: function(event)
	{
		event = event.copy(Runtime.Dict.from({"default_prevented":true}));
		event.es6_event.preventDefault();
		return event;
	},
	/**
	 * Cancel event
	 */
	cancel: function(event)
	{
		event = event.copy(Runtime.Dict.from({"cancel_bubble":true,"default_prevented":true}));
		event.es6_event.cancelBubble = true;
		event.es6_event.stopPropagation();
		event.es6_event.preventDefault();
		return event;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.WebEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.BaseEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("name");
		a.push("bubbles");
		a.push("cancel_bubble");
		a.push("cancelable");
		a.push("composed");
		a.push("default_prevented");
		a.push("event_phase");
		a.push("is_trusted");
		a.push("es6_event");
		a.push("currentElement");
		a.push("target");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "bubbles") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "cancel_bubble") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "cancelable") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "composed") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "default_prevented") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "event_phase") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_trusted") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "es6_event") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "currentElement") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "target") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"assignEventObject",
			"fromEvent",
			"isCancel",
			"preventDefault",
			"cancel",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.WebEvent);
window["Runtime.Web.Events.WebEvent"] = Runtime.Web.Events.WebEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.WebEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.BlurEvent = function()
{
	Runtime.Web.Events.WebEvent.apply(this, arguments);
};
Runtime.Web.Events.BlurEvent.prototype = Object.create(Runtime.Web.Events.WebEvent.prototype);
Runtime.Web.Events.BlurEvent.prototype.constructor = Runtime.Web.Events.BlurEvent;
Object.assign(Runtime.Web.Events.BlurEvent.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.WebEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.BlurEvent, Runtime.Web.Events.WebEvent);
Object.assign(Runtime.Web.Events.BlurEvent,
{
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "blur";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.BlurEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.WebEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getES6EventName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.BlurEvent);
window["Runtime.Web.Events.BlurEvent"] = Runtime.Web.Events.BlurEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.BlurEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.ChangeEvent = function()
{
	Runtime.Web.Events.WebEvent.apply(this, arguments);
};
Runtime.Web.Events.ChangeEvent.prototype = Object.create(Runtime.Web.Events.WebEvent.prototype);
Runtime.Web.Events.ChangeEvent.prototype.constructor = Runtime.Web.Events.ChangeEvent;
Object.assign(Runtime.Web.Events.ChangeEvent.prototype,
{
	_init: function()
	{
		Runtime.Web.Events.WebEvent.prototype._init.call(this);
		this.field_name = "";
		this.value = "";
		this.old_value = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "field_name")return this.field_name;
		else if (k == "value")return this.value;
		else if (k == "old_value")return this.old_value;
		return Runtime.Web.Events.WebEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.ChangeEvent, Runtime.Web.Events.WebEvent);
Object.assign(Runtime.Web.Events.ChangeEvent,
{
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "change";
	},
	assignEventObject: function(obj, e)
	{
		Runtime.Web.Events.WebEvent.assignEventObject.call(this, obj, e);
		obj.setValue("value", e.currentTarget.value);
		obj.setValue("old_value", e.currentTarget._old_value);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.ChangeEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.WebEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("field_name");
		a.push("value");
		a.push("old_value");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "field_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "old_value") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getES6EventName",
			"assignEventObject",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.ChangeEvent);
window["Runtime.Web.Events.ChangeEvent"] = Runtime.Web.Events.ChangeEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.ChangeEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.CommitModelEvent = function()
{
	Runtime.Web.Events.BaseEvent.apply(this, arguments);
};
Runtime.Web.Events.CommitModelEvent.prototype = Object.create(Runtime.Web.Events.BaseEvent.prototype);
Runtime.Web.Events.CommitModelEvent.prototype.constructor = Runtime.Web.Events.CommitModelEvent;
Object.assign(Runtime.Web.Events.CommitModelEvent.prototype,
{
	_init: function()
	{
		Runtime.Web.Events.BaseEvent.prototype._init.call(this);
		this.name = "";
		this.old_model = null;
		this.new_model = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "old_model")return this.old_model;
		else if (k == "new_model")return this.new_model;
		return Runtime.Web.Events.BaseEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.CommitModelEvent, Runtime.Web.Events.BaseEvent);
Object.assign(Runtime.Web.Events.CommitModelEvent,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.CommitModelEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.BaseEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("name");
		a.push("old_model");
		a.push("new_model");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "old_model") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "new_model") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.CommitModelEvent);
window["Runtime.Web.Events.CommitModelEvent"] = Runtime.Web.Events.CommitModelEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.CommitModelEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.FocusEvent = function()
{
	Runtime.Web.Events.WebEvent.apply(this, arguments);
};
Runtime.Web.Events.FocusEvent.prototype = Object.create(Runtime.Web.Events.WebEvent.prototype);
Runtime.Web.Events.FocusEvent.prototype.constructor = Runtime.Web.Events.FocusEvent;
Object.assign(Runtime.Web.Events.FocusEvent.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.WebEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.FocusEvent, Runtime.Web.Events.WebEvent);
Object.assign(Runtime.Web.Events.FocusEvent,
{
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "focus";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.FocusEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.WebEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getES6EventName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.FocusEvent);
window["Runtime.Web.Events.FocusEvent"] = Runtime.Web.Events.FocusEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.FocusEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.KeyboardEvent = function()
{
	Runtime.Web.Events.WebEvent.apply(this, arguments);
};
Runtime.Web.Events.KeyboardEvent.prototype = Object.create(Runtime.Web.Events.WebEvent.prototype);
Runtime.Web.Events.KeyboardEvent.prototype.constructor = Runtime.Web.Events.KeyboardEvent;
Object.assign(Runtime.Web.Events.KeyboardEvent.prototype,
{
	_init: function()
	{
		Runtime.Web.Events.WebEvent.prototype._init.call(this);
		this.altKey = false;
		this.charCode = 0;
		this.code = "";
		this.ctrlKey = false;
		this.key = false;
		this.keyCode = 0;
		this.locale = "";
		this.location = 0;
		this.repeat = false;
		this.shiftKey = false;
		this.which = 0;
		this.value = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "altKey")return this.altKey;
		else if (k == "charCode")return this.charCode;
		else if (k == "code")return this.code;
		else if (k == "ctrlKey")return this.ctrlKey;
		else if (k == "key")return this.key;
		else if (k == "keyCode")return this.keyCode;
		else if (k == "locale")return this.locale;
		else if (k == "location")return this.location;
		else if (k == "repeat")return this.repeat;
		else if (k == "shiftKey")return this.shiftKey;
		else if (k == "which")return this.which;
		else if (k == "value")return this.value;
		return Runtime.Web.Events.WebEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.KeyboardEvent, Runtime.Web.Events.WebEvent);
Object.assign(Runtime.Web.Events.KeyboardEvent,
{
	assignEventObject: function(obj, e)
	{
		Runtime.Web.Events.WebEvent.assignEventObject.call(this, obj, e);
		obj.setValue("altKey", e.altKey);
		obj.setValue("charCode", e.charCode);
		obj.setValue("code", e.code);
		obj.setValue("ctrlKey", e.ctrlKey);
		obj.setValue("key", e.key);
		obj.setValue("keyCode", e.keyCode);
		obj.setValue("locale", e.locale);
		obj.setValue("location", e.location);
		obj.setValue("repeat", e.repeat);
		obj.setValue("shiftKey", e.shiftKey);
		obj.setValue("which", e.which);
		obj.setValue("value", e.currentTarget.value);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.KeyboardEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.WebEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("altKey");
		a.push("charCode");
		a.push("code");
		a.push("ctrlKey");
		a.push("key");
		a.push("keyCode");
		a.push("locale");
		a.push("location");
		a.push("repeat");
		a.push("shiftKey");
		a.push("which");
		a.push("value");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "altKey") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "charCode") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "code") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ctrlKey") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "key") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "keyCode") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "locale") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "location") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "repeat") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "shiftKey") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "which") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"assignEventObject",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.KeyboardEvent);
window["Runtime.Web.Events.KeyboardEvent"] = Runtime.Web.Events.KeyboardEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.KeyboardEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.KeyDownEvent = function()
{
	Runtime.Web.Events.KeyboardEvent.apply(this, arguments);
};
Runtime.Web.Events.KeyDownEvent.prototype = Object.create(Runtime.Web.Events.KeyboardEvent.prototype);
Runtime.Web.Events.KeyDownEvent.prototype.constructor = Runtime.Web.Events.KeyDownEvent;
Object.assign(Runtime.Web.Events.KeyDownEvent.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.KeyboardEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.KeyDownEvent, Runtime.Web.Events.KeyboardEvent);
Object.assign(Runtime.Web.Events.KeyDownEvent,
{
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "keydown";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.KeyDownEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.KeyboardEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getES6EventName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.KeyDownEvent);
window["Runtime.Web.Events.KeyDownEvent"] = Runtime.Web.Events.KeyDownEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.KeyDownEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.KeyPressEvent = function()
{
	Runtime.Web.Events.KeyboardEvent.apply(this, arguments);
};
Runtime.Web.Events.KeyPressEvent.prototype = Object.create(Runtime.Web.Events.KeyboardEvent.prototype);
Runtime.Web.Events.KeyPressEvent.prototype.constructor = Runtime.Web.Events.KeyPressEvent;
Object.assign(Runtime.Web.Events.KeyPressEvent.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.KeyboardEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.KeyPressEvent, Runtime.Web.Events.KeyboardEvent);
Object.assign(Runtime.Web.Events.KeyPressEvent,
{
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "keypress";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.KeyPressEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.KeyboardEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getES6EventName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.KeyPressEvent);
window["Runtime.Web.Events.KeyPressEvent"] = Runtime.Web.Events.KeyPressEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.KeyPressEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.KeyUpEvent = function()
{
	Runtime.Web.Events.KeyboardEvent.apply(this, arguments);
};
Runtime.Web.Events.KeyUpEvent.prototype = Object.create(Runtime.Web.Events.KeyboardEvent.prototype);
Runtime.Web.Events.KeyUpEvent.prototype.constructor = Runtime.Web.Events.KeyUpEvent;
Object.assign(Runtime.Web.Events.KeyUpEvent.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.KeyboardEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.KeyUpEvent, Runtime.Web.Events.KeyboardEvent);
Object.assign(Runtime.Web.Events.KeyUpEvent,
{
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "keyup";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.KeyUpEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.KeyboardEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getES6EventName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.KeyUpEvent);
window["Runtime.Web.Events.KeyUpEvent"] = Runtime.Web.Events.KeyUpEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.KeyUpEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseEvent = function()
{
	Runtime.Web.Events.WebEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseEvent.prototype = Object.create(Runtime.Web.Events.WebEvent.prototype);
Runtime.Web.Events.MouseEvent.prototype.constructor = Runtime.Web.Events.MouseEvent;
Object.assign(Runtime.Web.Events.MouseEvent.prototype,
{
	_init: function()
	{
		Runtime.Web.Events.WebEvent.prototype._init.call(this);
		this.altKey = false;
		this.button = 0;
		this.buttons = 0;
		this.clientX = 0;
		this.clientY = 0;
		this.ctrlKey = false;
		this.detail = 0;
		this.layerX = 0;
		this.layerY = 0;
		this.metaKey = false;
		this.movementX = 0;
		this.movementY = 0;
		this.offsetX = 0;
		this.offsetY = 0;
		this.pageX = 0;
		this.pageY = 0;
		this.screenX = 0;
		this.screenY = 0;
		this.shiftKey = false;
		this.x = 0;
		this.y = 0;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "altKey")return this.altKey;
		else if (k == "button")return this.button;
		else if (k == "buttons")return this.buttons;
		else if (k == "clientX")return this.clientX;
		else if (k == "clientY")return this.clientY;
		else if (k == "ctrlKey")return this.ctrlKey;
		else if (k == "detail")return this.detail;
		else if (k == "layerX")return this.layerX;
		else if (k == "layerY")return this.layerY;
		else if (k == "metaKey")return this.metaKey;
		else if (k == "movementX")return this.movementX;
		else if (k == "movementY")return this.movementY;
		else if (k == "offsetX")return this.offsetX;
		else if (k == "offsetY")return this.offsetY;
		else if (k == "pageX")return this.pageX;
		else if (k == "pageY")return this.pageY;
		else if (k == "screenX")return this.screenX;
		else if (k == "screenY")return this.screenY;
		else if (k == "shiftKey")return this.shiftKey;
		else if (k == "x")return this.x;
		else if (k == "y")return this.y;
		return Runtime.Web.Events.WebEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.MouseEvent, Runtime.Web.Events.WebEvent);
Object.assign(Runtime.Web.Events.MouseEvent,
{
	assignEventObject: function(obj, e)
	{
		Runtime.Web.Events.WebEvent.assignEventObject.call(this, obj, e);
		obj.setValue("altKey", e.altKey);
		obj.setValue("button", e.button);
		obj.setValue("buttons", e.buttons);
		obj.setValue("clientX", e.clientX);
		obj.setValue("clientY", e.clientY);
		obj.setValue("ctrlKey", e.ctrlKey);
		obj.setValue("detail", e.detail);
		obj.setValue("layerX", e.layerX);
		obj.setValue("layerY", e.layerY);
		obj.setValue("metaKey", e.metaKey);
		obj.setValue("movementX", e.movementX);
		obj.setValue("movementY", e.movementY);
		obj.setValue("offsetX", e.offsetX);
		obj.setValue("offsetY", e.offsetY);
		obj.setValue("pageX", e.pageX);
		obj.setValue("pageY", e.pageY);
		obj.setValue("screenX", e.screenX);
		obj.setValue("screenY", e.screenY);
		obj.setValue("shiftKey", e.shiftKey);
		obj.setValue("x", e.x);
		obj.setValue("y", e.y);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.WebEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("altKey");
		a.push("button");
		a.push("buttons");
		a.push("clientX");
		a.push("clientY");
		a.push("ctrlKey");
		a.push("detail");
		a.push("layerX");
		a.push("layerY");
		a.push("metaKey");
		a.push("movementX");
		a.push("movementY");
		a.push("offsetX");
		a.push("offsetY");
		a.push("pageX");
		a.push("pageY");
		a.push("screenX");
		a.push("screenY");
		a.push("shiftKey");
		a.push("x");
		a.push("y");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "altKey") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "button") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "buttons") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "clientX") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "clientY") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ctrlKey") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "detail") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "layerX") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "layerY") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "metaKey") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "movementX") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "movementY") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "offsetX") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "offsetY") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pageX") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pageY") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "screenX") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "screenY") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "shiftKey") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "x") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "y") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"assignEventObject",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.MouseEvent);
window["Runtime.Web.Events.MouseEvent"] = Runtime.Web.Events.MouseEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.MouseEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseClickEvent = function()
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseClickEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseClickEvent.prototype.constructor = Runtime.Web.Events.MouseClickEvent;
Object.assign(Runtime.Web.Events.MouseClickEvent.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.MouseClickEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseClickEvent,
{
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "click";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.MouseClickEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getES6EventName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.MouseClickEvent);
window["Runtime.Web.Events.MouseClickEvent"] = Runtime.Web.Events.MouseClickEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.MouseClickEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseContextMenuEvent = function()
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseContextMenuEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseContextMenuEvent.prototype.constructor = Runtime.Web.Events.MouseContextMenuEvent;
Object.assign(Runtime.Web.Events.MouseContextMenuEvent.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.MouseContextMenuEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseContextMenuEvent,
{
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "contextmenu";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.MouseContextMenuEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getES6EventName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.MouseContextMenuEvent);
window["Runtime.Web.Events.MouseContextMenuEvent"] = Runtime.Web.Events.MouseContextMenuEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.MouseContextMenuEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseDoubleClickEvent = function()
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseDoubleClickEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseDoubleClickEvent.prototype.constructor = Runtime.Web.Events.MouseDoubleClickEvent;
Object.assign(Runtime.Web.Events.MouseDoubleClickEvent.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.MouseDoubleClickEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseDoubleClickEvent,
{
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "dblclick";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.MouseDoubleClickEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getES6EventName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.MouseDoubleClickEvent);
window["Runtime.Web.Events.MouseDoubleClickEvent"] = Runtime.Web.Events.MouseDoubleClickEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.MouseDoubleClickEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseDownEvent = function()
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseDownEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseDownEvent.prototype.constructor = Runtime.Web.Events.MouseDownEvent;
Object.assign(Runtime.Web.Events.MouseDownEvent.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.MouseDownEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseDownEvent,
{
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "mousedown";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.MouseDownEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getES6EventName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.MouseDownEvent);
window["Runtime.Web.Events.MouseDownEvent"] = Runtime.Web.Events.MouseDownEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.MouseDownEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseEnterEvent = function()
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseEnterEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseEnterEvent.prototype.constructor = Runtime.Web.Events.MouseEnterEvent;
Object.assign(Runtime.Web.Events.MouseEnterEvent.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.MouseEnterEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseEnterEvent,
{
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "mouseenter";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.MouseEnterEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getES6EventName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.MouseEnterEvent);
window["Runtime.Web.Events.MouseEnterEvent"] = Runtime.Web.Events.MouseEnterEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.MouseEnterEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseLeaveEvent = function()
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseLeaveEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseLeaveEvent.prototype.constructor = Runtime.Web.Events.MouseLeaveEvent;
Object.assign(Runtime.Web.Events.MouseLeaveEvent.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.MouseLeaveEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseLeaveEvent,
{
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "mouseleave";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.MouseLeaveEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getES6EventName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.MouseLeaveEvent);
window["Runtime.Web.Events.MouseLeaveEvent"] = Runtime.Web.Events.MouseLeaveEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.MouseLeaveEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseMoveEvent = function()
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseMoveEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseMoveEvent.prototype.constructor = Runtime.Web.Events.MouseMoveEvent;
Object.assign(Runtime.Web.Events.MouseMoveEvent.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.MouseMoveEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseMoveEvent,
{
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "mousemove";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.MouseMoveEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getES6EventName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.MouseMoveEvent);
window["Runtime.Web.Events.MouseMoveEvent"] = Runtime.Web.Events.MouseMoveEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.MouseMoveEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseOutEvent = function()
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseOutEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseOutEvent.prototype.constructor = Runtime.Web.Events.MouseOutEvent;
Object.assign(Runtime.Web.Events.MouseOutEvent.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.MouseOutEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseOutEvent,
{
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "mouseout";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.MouseOutEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getES6EventName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.MouseOutEvent);
window["Runtime.Web.Events.MouseOutEvent"] = Runtime.Web.Events.MouseOutEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.MouseOutEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseOverEvent = function()
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseOverEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseOverEvent.prototype.constructor = Runtime.Web.Events.MouseOverEvent;
Object.assign(Runtime.Web.Events.MouseOverEvent.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.MouseOverEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseOverEvent,
{
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "mouseover";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.MouseOverEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getES6EventName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.MouseOverEvent);
window["Runtime.Web.Events.MouseOverEvent"] = Runtime.Web.Events.MouseOverEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.MouseOverEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseUpEvent = function()
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseUpEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseUpEvent.prototype.constructor = Runtime.Web.Events.MouseUpEvent;
Object.assign(Runtime.Web.Events.MouseUpEvent.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.MouseUpEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseUpEvent,
{
	/**
	 * Returns es6 event name
	 */
	getES6EventName: function()
	{
		return "mouseup";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.MouseUpEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getES6EventName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.MouseUpEvent);
window["Runtime.Web.Events.MouseUpEvent"] = Runtime.Web.Events.MouseUpEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.MouseUpEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseWheelEvent = function()
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseWheelEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseWheelEvent.prototype.constructor = Runtime.Web.Events.MouseWheelEvent;
Object.assign(Runtime.Web.Events.MouseWheelEvent.prototype,
{
	_init: function()
	{
		Runtime.Web.Events.MouseEvent.prototype._init.call(this);
		this.wheelDelta = 0;
		this.wheelDeltaX = 0;
		this.wheelDeltaY = 0;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "wheelDelta")return this.wheelDelta;
		else if (k == "wheelDeltaX")return this.wheelDeltaX;
		else if (k == "wheelDeltaY")return this.wheelDeltaY;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.MouseWheelEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseWheelEvent,
{
	ES6_EVENT_NAME: "wheel",
	assignEventObject: function(obj, e)
	{
		Runtime.Web.Events.MouseEvent.assignEventObject.call(this, obj, e);
		obj.setValue("wheelDelta", e.wheelDelta);
		obj.setValue("wheelDeltaX", e.wheelDeltaX);
		obj.setValue("wheelDeltaY", e.wheelDeltaY);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.MouseWheelEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("wheelDelta");
		a.push("wheelDeltaX");
		a.push("wheelDeltaY");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "wheelDelta") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "wheelDeltaX") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "wheelDeltaY") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"assignEventObject",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.MouseWheelEvent);
window["Runtime.Web.Events.MouseWheelEvent"] = Runtime.Web.Events.MouseWheelEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.MouseWheelEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.SignalEvent = function()
{
	Runtime.Web.Events.BaseEvent.apply(this, arguments);
};
Runtime.Web.Events.SignalEvent.prototype = Object.create(Runtime.Web.Events.BaseEvent.prototype);
Runtime.Web.Events.SignalEvent.prototype.constructor = Runtime.Web.Events.SignalEvent;
Object.assign(Runtime.Web.Events.SignalEvent.prototype,
{
	_init: function()
	{
		Runtime.Web.Events.BaseEvent.prototype._init.call(this);
		this.command = "";
		this.method_name = "";
		this.event = null;
		this.args = null;
		this.params = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "command")return this.command;
		else if (k == "method_name")return this.method_name;
		else if (k == "event")return this.event;
		else if (k == "args")return this.args;
		else if (k == "params")return this.params;
		return Runtime.Web.Events.BaseEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Events.SignalEvent, Runtime.Web.Events.BaseEvent);
Object.assign(Runtime.Web.Events.SignalEvent,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getClassName: function()
	{
		return "Runtime.Web.Events.SignalEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.BaseEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("command");
		a.push("method_name");
		a.push("event");
		a.push("args");
		a.push("params");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "command") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "method_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "event") return Dict.from({
			"t": "Runtime.Web.Events.BaseEvent",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "args") return Dict.from({
			"t": "Runtime.Collection",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return Dict.from({
			"t": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.SignalEvent);
window["Runtime.Web.Events.SignalEvent"] = Runtime.Web.Events.SignalEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.SignalEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.ApiResult = function()
{
	Runtime.Web.Response.apply(this, arguments);
};
Runtime.Web.ApiResult.prototype = Object.create(Runtime.Web.Response.prototype);
Runtime.Web.ApiResult.prototype.constructor = Runtime.Web.ApiResult;
Object.assign(Runtime.Web.ApiResult.prototype,
{
	/**
	 * Init struct data
	 */
	_init_data: function(changed)
	{
		var headers = Runtime.rtl.get(changed, "headers");
		if (!this.headers.has("Content-Type"))
		{
			if (headers == null)
			{
				headers = Runtime.Dict.from({});
			}
		}
		if (headers != null && !headers.has("Content-Type"))
		{
			changed = Runtime.rtl.setAttr(changed, Runtime.Collection.from(["headers"]), headers.setIm("Content-Type", "application/json"));
		}
		return changed;
	},
	/**
	 * Returns true if error
	 */
	isError: function()
	{
		return this.code < 0;
	},
	/**
	 * Returns true if success
	 */
	isSuccess: function()
	{
		return this.code > 0;
	},
	/**
	 * Get error message
	 */
	getErrorMessage: function()
	{
		return this.message;
	},
	/**
	 * Get error code
	 */
	getErrorCode: function()
	{
		return this.code;
	},
	/**
	 * Debug message
	 */
	debug: function()
	{
		var res = new Runtime.Vector();
		if (this.code < 0)
		{
			var s = "";
			s += Runtime.rtl.toStr("[" + Runtime.rtl.toStr(this.code) + Runtime.rtl.toStr("] ") + Runtime.rtl.toStr(this.message));
			if (this.error_file && this.error_line)
			{
				s += Runtime.rtl.toStr(" in " + Runtime.rtl.toStr(this.error_file) + Runtime.rtl.toStr(": ") + Runtime.rtl.toStr(this.error_line));
			}
			res.pushValue("<b>Fatal error:</b>");
			res.pushValue(s);
			if (this.error_trace)
			{
				res.pushValue("<b>Trace:</b>");
				res.pushValue(this.error_trace);
			}
			var message = Runtime.rs.join("\n", res);
			Runtime.io.print_error(message);
		}
	},
	/**
	 * Returns content
	 */
	getContent: function()
	{
		return Runtime.rtl.json_encode(Runtime.Dict.from({"code":this.code,"message":this.message,"ob_content":this.ob_content,"error_name":this.error_name,"error_file":this.error_file,"error_line":this.error_line,"error_trace":this.error_trace,"data":this.data}));
	},
	/**
	 * Set data
	 */
	setData: function(data)
	{
		var res = this;
		if (data == null)
		{
			return res;
		}
		if (data instanceof Runtime.Dict)
		{
			var keys = data.keys();
			for (var i = 0;i < keys.count();i++)
			{
				var key = Runtime.rtl.get(keys, i);
				res = Runtime.rtl.setAttr(res, Runtime.Collection.from(["data", key]), Runtime.rtl.get(data, key));
			}
		}
		if (data instanceof Runtime.Collection)
		{
			res = Runtime.rtl.setAttr(res, Runtime.Collection.from(["data"]), data);
		}
		return res;
	},
	/**
	 * Setup success
	 */
	success: function(data)
	{
		var res = this;
		if (data.has("code"))
		{
			res = Runtime.rtl.setAttr(res, Runtime.Collection.from(["code"]), Runtime.rtl.get(data, "code"));
		}
		else
		{
			res = Runtime.rtl.setAttr(res, Runtime.Collection.from(["code"]), Runtime.rtl.ERROR_OK);
		}
		if (data.has("message"))
		{
			res = Runtime.rtl.setAttr(res, Runtime.Collection.from(["message"]), Runtime.rtl.get(data, "message"));
		}
		else
		{
			res = Runtime.rtl.setAttr(res, Runtime.Collection.from(["message"]), "Ok");
		}
		if (data.has("data"))
		{
			res = res.setData(Runtime.rtl.get(data, "data"));
		}
		res = res.clone(Runtime.Dict.from({"error_name":"","error_file":"","error_line":"","error_trace":""}));
		return res;
	},
	/**
	 * Setup fail
	 */
	fail: function(e, data)
	{
		if (data == undefined) data = null;
		var res = this;
		if (e instanceof Runtime.Exceptions.RuntimeException)
		{
			res = res.clone(Runtime.Dict.from({"code":e.getErrorCode(),"message":e.getErrorMessage(),"error_name":e.constructor.getClassName()}));
			res = res.setData(data);
		}
		else if (e instanceof Runtime.Dict)
		{
			res = res.clone(Runtime.Dict.from({"code":(e.has("code")) ? (Runtime.rtl.get(e, "code")) : (Runtime.rtl.ERROR_UNKNOWN),"message":(e.has("message")) ? (Runtime.rtl.get(e, "message")) : (this.message),"error_name":(e.has("error_name")) ? (Runtime.rtl.get(e, "error_name")) : (this.error_name)}));
			if (e.has("data"))
			{
				res = res.setData(Runtime.rtl.get(e, "data"));
			}
		}
		return res;
	},
	/**
	 * Setup exception
	 */
	exception: function(e, data)
	{
		if (data == undefined) data = null;
		var res = this;
		if (e instanceof Runtime.Exceptions.RuntimeException)
		{
			res = res.clone(Runtime.Dict.from({"code":e.getErrorCode(),"message":e.getErrorMessage(),"http_code":500,"error_name":e.constructor.getClassName(),"error_file":e.getFileName(),"error_line":e.getErrorLine(),"error_trace":e.getTraceStr(),"err":e}));
			res = res.setData(data);
			return res;
		}
		else
		{
			var message = "";
			return res.clone(Runtime.Dict.from({"code":Runtime.rtl.ERROR_UNKNOWN,"message":message,"error":null,"data":null}));
		}
		return res;
	},
	/**
	 * Throw if exception
	 */
	throwIfException: function()
	{
		if (this.error_name != "")
		{
			this.debug();
			var s = "[" + Runtime.rtl.toStr(this.code) + Runtime.rtl.toStr("] ") + Runtime.rtl.toStr(this.message);
			if (this.error_file && this.error_line)
			{
				s += Runtime.rtl.toStr(" in " + Runtime.rtl.toStr(this.error_file) + Runtime.rtl.toStr(": ") + Runtime.rtl.toStr(this.error_line));
			}
			throw new Runtime.Exceptions.ApiException("Api error: " + Runtime.rtl.toStr(s))
		}
	},
	_init: function()
	{
		Runtime.Web.Response.prototype._init.call(this);
		this.code = 0;
		this.message = "";
		this.data = null;
		this.ob_content = "";
		this.error_name = null;
		this.error_file = "";
		this.error_line = "";
		this.error_trace = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "code")return this.code;
		else if (k == "message")return this.message;
		else if (k == "data")return this.data;
		else if (k == "ob_content")return this.ob_content;
		else if (k == "error_name")return this.error_name;
		else if (k == "error_file")return this.error_file;
		else if (k == "error_line")return this.error_line;
		else if (k == "error_trace")return this.error_trace;
		return Runtime.Web.Response.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.ApiResult, Runtime.Web.Response);
Object.assign(Runtime.Web.ApiResult,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.ApiResult";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Response";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("code");
		a.push("message");
		a.push("data");
		a.push("ob_content");
		a.push("error_name");
		a.push("error_file");
		a.push("error_line");
		a.push("error_trace");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "code") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "message") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "data") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ob_content") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_file") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_line") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_trace") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"isError",
			"isSuccess",
			"getErrorMessage",
			"getErrorCode",
			"debug",
			"getContent",
			"setData",
			"success",
			"fail",
			"exception",
			"throwIfException",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.ApiResult);
window["Runtime.Web.ApiResult"] = Runtime.Web.ApiResult;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.ApiResult;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.ModuleDescription = function()
{
};
Object.assign(Runtime.Web.ModuleDescription.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.ModuleDescription)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Runtime.Web.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function()
	{
		return "Runtime.Web";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function()
	{
		return "0.11.0";
	},
	/**
	 * Returns required modules
	 * @return Dict<string>
	 */
	requiredModules: function()
	{
		return Runtime.Dict.from({"Runtime":">=0.11"});
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return Runtime.Collection.from([new Runtime.Entity.Hook("Runtime.Web.AppHook"),new Runtime.Entity.Provider("Runtime.Web.RenderProvider", new Runtime.Web.RenderProvider()),new Runtime.Entity.Provider("Runtime.Web.RouteList", new Runtime.Web.RouteList()),new Runtime.Entity.Provider("Runtime.Web.Listener", new Runtime.Web.Listener())]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.ModuleDescription";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getModuleName",
			"getModuleVersion",
			"requiredModules",
			"entities",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.ModuleDescription);
window["Runtime.Web.ModuleDescription"] = Runtime.Web.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.ModuleDescription;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
if (typeof Runtime.Web.Crud.Hooks == 'undefined') Runtime.Web.Crud.Hooks = {};
Runtime.Web.Crud.Hooks.AppHook = function()
{
	Runtime.Web.AppHook.apply(this, arguments);
};
Runtime.Web.Crud.Hooks.AppHook.prototype = Object.create(Runtime.Web.AppHook.prototype);
Runtime.Web.Crud.Hooks.AppHook.prototype.constructor = Runtime.Web.Crud.Hooks.AppHook;
Object.assign(Runtime.Web.Crud.Hooks.AppHook.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.CSS_CLASS_NAMES, -100);
		this.register(this.constructor.CSS_VARS, -100);
	},
	/**
	 * Get css class names
	 */
	css_class_names: function(d)
	{
		var css_class_names = Runtime.rtl.get(d, "css_class_names");
		css_class_names.pushValue("Runtime.Web.Crud.Button");
		css_class_names.pushValue("Runtime.Web.Crud.Form");
		css_class_names.pushValue("Runtime.Web.Crud.Input");
		css_class_names.pushValue("Runtime.Web.Crud.Select");
		css_class_names.pushValue("Runtime.Web.Crud.TextArea");
		return d;
	},
	/**
	 * Get css vars
	 */
	css_vars: function(d)
	{
		/* default */
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "default", "background"]), "white");
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "default", "text"]), "black");
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "default", "border"]), "#ccc");
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "default", "hover_bg"]), "white");
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "default", "hover_text"]), "black");
		/* primary */
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "primary", "background"]), "#2685b4");
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "primary", "text"]), "white");
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "primary", "border"]), "#ccc");
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "primary", "hover_bg"]), "#247eaa");
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "primary", "hover_text"]), "white");
		/* danger */
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "danger", "background"]), "#dc4c44");
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "danger", "text"]), "white");
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "danger", "border"]), "#dc4c44");
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "danger", "hover_bg"]), "#d14b42");
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "danger", "hover_text"]), "white");
		/* success */
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "success", "background"]), "green");
		/* error */
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["colors", "error", "background"]), "#dc4c44");
		return d;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.Hooks.AppHook)
		{
		}
		Runtime.Web.AppHook.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.AppHook.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.AppHook.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.Hooks.AppHook, Runtime.Web.AppHook);
Object.assign(Runtime.Web.Crud.Hooks.AppHook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Hooks.AppHook";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.AppHook";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"register_hooks",
			"css_class_names",
			"css_vars",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Hooks.AppHook);
window["Runtime.Web.Crud.Hooks.AppHook"] = Runtime.Web.Crud.Hooks.AppHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Hooks.AppHook;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
if (typeof Runtime.Web.Crud.Rules == 'undefined') Runtime.Web.Crud.Rules = {};
Runtime.Web.Crud.Rules.ValidationRule = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Crud.Rules.ValidationRule.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Crud.Rules.ValidationRule.prototype.constructor = Runtime.Web.Crud.Rules.ValidationRule;
Object.assign(Runtime.Web.Crud.Rules.ValidationRule.prototype,
{
	/**
	 * Validate field_name in item
	 */
	validate: function(item)
	{
		return true;
	},
	/**
	 * Returns error message
	 */
	getErrorMessage: function(item)
	{
		return Runtime.Collection.from([""]);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.Rules.ValidationRule, Runtime.BaseStruct);
Object.assign(Runtime.Web.Crud.Rules.ValidationRule,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud.Rules";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Rules.ValidationRule";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"validate",
			"getErrorMessage",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Rules.ValidationRule);
window["Runtime.Web.Crud.Rules.ValidationRule"] = Runtime.Web.Crud.Rules.ValidationRule;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Rules.ValidationRule;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
if (typeof Runtime.Web.Crud.Rules == 'undefined') Runtime.Web.Crud.Rules = {};
Runtime.Web.Crud.Rules.PurifyRule = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Crud.Rules.PurifyRule.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Crud.Rules.PurifyRule.prototype.constructor = Runtime.Web.Crud.Rules.PurifyRule;
Object.assign(Runtime.Web.Crud.Rules.PurifyRule.prototype,
{
	/**
	 * Purify item
	 */
	purify: function(item)
	{
		return item;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.Rules.PurifyRule, Runtime.BaseStruct);
Object.assign(Runtime.Web.Crud.Rules.PurifyRule,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud.Rules";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Rules.PurifyRule";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"purify",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Rules.PurifyRule);
window["Runtime.Web.Crud.Rules.PurifyRule"] = Runtime.Web.Crud.Rules.PurifyRule;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Rules.PurifyRule;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
if (typeof Runtime.Web.Crud.Rules == 'undefined') Runtime.Web.Crud.Rules = {};
Runtime.Web.Crud.Rules.EqualPasswords = function()
{
	Runtime.Web.Crud.Rules.ValidationRule.apply(this, arguments);
};
Runtime.Web.Crud.Rules.EqualPasswords.prototype = Object.create(Runtime.Web.Crud.Rules.ValidationRule.prototype);
Runtime.Web.Crud.Rules.EqualPasswords.prototype.constructor = Runtime.Web.Crud.Rules.EqualPasswords;
Object.assign(Runtime.Web.Crud.Rules.EqualPasswords.prototype,
{
	/**
	 * Validate field_name in item
	 */
	validate: function(item)
	{
		var password1 = Runtime.rtl.get(item, this.password1);
		var password2 = Runtime.rtl.get(item, this.password2);
		if (password1 != password2)
		{
			return false;
		}
		return true;
	},
	/**
	 * Returns error message
	 */
	getErrorMessage: function(item)
	{
		return Runtime.Collection.from([Runtime.rtl.getContext().format("%password1% and %password2% must be equal", Runtime.Dict.from({"password1":this.password1,"password2":this.password2})),this.password1,this.password2]);
	},
	_init: function()
	{
		Runtime.Web.Crud.Rules.ValidationRule.prototype._init.call(this);
		this.password1 = "";
		this.password2 = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "password1")return this.password1;
		else if (k == "password2")return this.password2;
		return Runtime.Web.Crud.Rules.ValidationRule.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.Rules.EqualPasswords, Runtime.Web.Crud.Rules.ValidationRule);
Object.assign(Runtime.Web.Crud.Rules.EqualPasswords,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud.Rules";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Rules.EqualPasswords";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Crud.Rules.ValidationRule";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("password1");
		a.push("password2");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "password1") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "password2") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"validate",
			"getErrorMessage",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Rules.EqualPasswords);
window["Runtime.Web.Crud.Rules.EqualPasswords"] = Runtime.Web.Crud.Rules.EqualPasswords;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Rules.EqualPasswords;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
if (typeof Runtime.Web.Crud.Rules == 'undefined') Runtime.Web.Crud.Rules = {};
Runtime.Web.Crud.Rules.LowerCase = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Crud.Rules.LowerCase.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Crud.Rules.LowerCase.prototype.constructor = Runtime.Web.Crud.Rules.LowerCase;
Object.assign(Runtime.Web.Crud.Rules.LowerCase.prototype,
{
	/**
	 * Purify item
	 */
	purify: function(item)
	{
		item = Runtime.rtl.setAttr(item, Runtime.Collection.from([this.field_name]), Runtime.rs.strtolower(Runtime.rtl.get(item, this.field_name)));
		return item;
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.field_name = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "field_name")return this.field_name;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.Rules.LowerCase, Runtime.BaseStruct);
Object.assign(Runtime.Web.Crud.Rules.LowerCase,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud.Rules";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Rules.LowerCase";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("field_name");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "field_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"purify",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Rules.LowerCase);
window["Runtime.Web.Crud.Rules.LowerCase"] = Runtime.Web.Crud.Rules.LowerCase;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Rules.LowerCase;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
if (typeof Runtime.Web.Crud.Rules == 'undefined') Runtime.Web.Crud.Rules = {};
Runtime.Web.Crud.Rules.Sanitize = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Crud.Rules.Sanitize.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Crud.Rules.Sanitize.prototype.constructor = Runtime.Web.Crud.Rules.Sanitize;
Object.assign(Runtime.Web.Crud.Rules.Sanitize.prototype,
{
	/**
	 * Purify item
	 */
	purify: function(item)
	{
		var value = Runtime.rtl.get(item, this.field_name);
		value = Runtime.re.replace("^[a-z0-9_\\-\\.\\@]$", "", value);
		item = Runtime.rtl.setAttr(item, Runtime.Collection.from([this.field_name]), value);
		return item;
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.field_name = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "field_name")return this.field_name;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.Rules.Sanitize, Runtime.BaseStruct);
Object.assign(Runtime.Web.Crud.Rules.Sanitize,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud.Rules";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Rules.Sanitize";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("field_name");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "field_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"purify",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Rules.Sanitize);
window["Runtime.Web.Crud.Rules.Sanitize"] = Runtime.Web.Crud.Rules.Sanitize;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Rules.Sanitize;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
if (typeof Runtime.Web.Crud.Rules == 'undefined') Runtime.Web.Crud.Rules = {};
Runtime.Web.Crud.Rules.ValidateEmail = function()
{
	Runtime.Web.Crud.Rules.ValidationRule.apply(this, arguments);
};
Runtime.Web.Crud.Rules.ValidateEmail.prototype = Object.create(Runtime.Web.Crud.Rules.ValidationRule.prototype);
Runtime.Web.Crud.Rules.ValidateEmail.prototype.constructor = Runtime.Web.Crud.Rules.ValidateEmail;
Object.assign(Runtime.Web.Crud.Rules.ValidateEmail.prototype,
{
	/**
	 * Validate field_name in item
	 */
	validate: function(item)
	{
		var email = Runtime.rtl.get(item, this.field_name);
		if (email == null)
		{
			return false;
		}
		if (!Runtime.rtl.isString(email))
		{
			return false;
		}
		var is_match = Runtime.re.match("^[\\w\\_\\-\\.]+@[\\w\\-\\.]+\\.[\\w]+$", email);
		if (!is_match)
		{
			return false;
		}
		is_match = Runtime.re.match("\\.[\\.]+", email);
		if (is_match)
		{
			return false;
		}
		return true;
	},
	/**
	 * Returns error message
	 */
	getErrorMessage: function(item)
	{
		return Runtime.Collection.from([Runtime.rtl.getContext().format("wrong email"),this.field_name]);
	},
	_init: function()
	{
		Runtime.Web.Crud.Rules.ValidationRule.prototype._init.call(this);
		this.field_name = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "field_name")return this.field_name;
		return Runtime.Web.Crud.Rules.ValidationRule.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.Rules.ValidateEmail, Runtime.Web.Crud.Rules.ValidationRule);
Object.assign(Runtime.Web.Crud.Rules.ValidateEmail,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud.Rules";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Rules.ValidateEmail";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Crud.Rules.ValidationRule";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("field_name");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "field_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"validate",
			"getErrorMessage",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Rules.ValidateEmail);
window["Runtime.Web.Crud.Rules.ValidateEmail"] = Runtime.Web.Crud.Rules.ValidateEmail;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Rules.ValidateEmail;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
if (typeof Runtime.Web.Crud.Rules == 'undefined') Runtime.Web.Crud.Rules = {};
Runtime.Web.Crud.Rules.ValidateRegEx = function()
{
	Runtime.Web.Crud.Rules.ValidationRule.apply(this, arguments);
};
Runtime.Web.Crud.Rules.ValidateRegEx.prototype = Object.create(Runtime.Web.Crud.Rules.ValidationRule.prototype);
Runtime.Web.Crud.Rules.ValidateRegEx.prototype.constructor = Runtime.Web.Crud.Rules.ValidateRegEx;
Object.assign(Runtime.Web.Crud.Rules.ValidateRegEx.prototype,
{
	/**
	 * Validate field_name in item
	 */
	validate: function(item)
	{
		var value = Runtime.rtl.get(item, this.field_name);
		var is_match = Runtime.re.match(this.match, value);
		if (!is_match)
		{
			return false;
		}
		return true;
	},
	/**
	 * Returns error message
	 */
	getErrorMessage: function(item)
	{
		return Runtime.Collection.from([this.message,this.field_name]);
	},
	_init: function()
	{
		Runtime.Web.Crud.Rules.ValidationRule.prototype._init.call(this);
		this.field_name = "";
		this.match = "";
		this.message = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "field_name")return this.field_name;
		else if (k == "match")return this.match;
		else if (k == "message")return this.message;
		return Runtime.Web.Crud.Rules.ValidationRule.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.Rules.ValidateRegEx, Runtime.Web.Crud.Rules.ValidationRule);
Object.assign(Runtime.Web.Crud.Rules.ValidateRegEx,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud.Rules";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Rules.ValidateRegEx";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Crud.Rules.ValidationRule";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("field_name");
		a.push("match");
		a.push("message");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "field_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "match") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "message") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"validate",
			"getErrorMessage",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Rules.ValidateRegEx);
window["Runtime.Web.Crud.Rules.ValidateRegEx"] = Runtime.Web.Crud.Rules.ValidateRegEx;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Rules.ValidateRegEx;
"use strict;"
/*
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2021 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
*/
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.Button = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Crud.Button.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Crud.Button.prototype.constructor = Runtime.Web.Crud.Button;
Object.assign(Runtime.Web.Crud.Button.prototype,
{
	/**
 * Mouse click event
 */
	onClick: async function(msg)
	{
		await this.sendEvent(msg.event);
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.Button)
		{
		}
		Runtime.Web.Component.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.Component.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Component.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.Button, Runtime.Web.Component);
Object.assign(Runtime.Web.Crud.Button,
{
	css: function(vars)
	{
		return ".web_button.h-9441{" + Runtime.rtl.toStr("padding: 10px 20px;cursor: pointer;background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "default", "background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "default", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "default", "text"])) + Runtime.rtl.toStr(";/*box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.25);*/outline: 0;font-size: 16px;line-height: normal;")) + Runtime.rtl.toStr("}.web_button.h-9441:hover{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "default", "hover_bg"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "default", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "default", "hover_text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.web_button.h-9441:active{") + Runtime.rtl.toStr("box-shadow: inset 0px 2px 5px 0px rgba(0,0,0,0.25);") + Runtime.rtl.toStr("}.web_button.h-9441.primary{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "primary", "background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "primary", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "primary", "text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.web_button.h-9441.primary:hover{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "primary", "hover_bg"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "primary", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "primary", "hover_text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.web_button.h-9441.danger{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "danger", "background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "danger", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "danger", "text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.web_button.h-9441.danger:hover{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "danger", "hover_bg"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "danger", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "danger", "hover_text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.web_button.h-9441.success{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "success", "background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "success", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "success", "text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.web_button.h-9441.success:hover{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "success", "hover_bg"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "success", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "success", "hover_text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.web_button.h-9441.small{") + Runtime.rtl.toStr("padding: 3px 10px;font-size: 14px;") + Runtime.rtl.toStr("}");
	},
	render: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let href = Runtime.rtl.get(render_params, "href");
			
			if (href == null)
			{
				var __v1 = new Runtime.Monad(Runtime.rtl.get(render_params, "type"));
				__v1 = __v1.monad(Runtime.rtl.m_to("string", "button"));
				/* Element 'button.web_button' */
				let __v0 = __v.e("e", "button", {"@tag":Runtime.rtl.get(render_params, "@tag"),"@event:Runtime.Web.Events.MouseClickEvent":[component,"onClick"],"class":["web_button", __v1.value(), this.getCssHash()].join(" "),"@elem_name":"web_button"});
				
				/* Text */
				let __v2 = __v0.e("t", "", null, render_content);
				__v0.p();
			}
			else
			{
				/* Element 'a.nolink.web_button__href' */
				let __v3 = __v.e("e", "a", {"href":href,"class":["nolink web_button__href", this.getCssHash()].join(" "),"@elem_name":"nolink"});
				
				var __v5 = new Runtime.Monad(Runtime.rtl.get(render_params, "type"));
				__v5 = __v5.monad(Runtime.rtl.m_to("string", "button"));
				/* Element 'button.web_button' */
				let __v4 = __v3.e("e", "button", {"@tag":Runtime.rtl.get(render_params, "@tag"),"@event:Runtime.Web.Events.MouseClickEvent":[component,"onClick"],"class":["web_button", __v5.value(), this.getCssHash()].join(" "),"@elem_name":"web_button"});
				
				/* Text */
				let __v6 = __v4.e("t", "", null, render_content);
				__v4.p();
				__v3.p();
			}
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Button";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"css",
			"render",
			"onClick",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Button);
window["Runtime.Web.Crud.Button"] = Runtime.Web.Crud.Button;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Button;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.CrudModel = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Crud.CrudModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Crud.CrudModel.prototype.constructor = Runtime.Web.Crud.CrudModel;
Object.assign(Runtime.Web.Crud.CrudModel.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.CrudModel, Runtime.BaseStruct);
Object.assign(Runtime.Web.Crud.CrudModel,
{
	/**
	 * Build struct
	 */
	buildStruct: function(builder)
	{
		return builder;
	},
	/**
     * Returns struct
     */
	getStruct: function(kind, build_fn)
	{
		if (kind == undefined) kind = "";
		if (build_fn == undefined) build_fn = null;
		return Runtime.Web.Crud.StructBuilder.build(this.getClassName(), kind, build_fn);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.CrudModel";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"buildStruct",
			"getStruct",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.CrudModel);
window["Runtime.Web.Crud.CrudModel"] = Runtime.Web.Crud.CrudModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.CrudModel;
"use strict;"
/*
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
*/
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.CrudPage = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Crud.CrudPage.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Crud.CrudPage.prototype.constructor = Runtime.Web.Crud.CrudPage;
Object.assign(Runtime.Web.Crud.CrudPage.prototype,
{
	/**
 * Submit
 */
	onFormEvent: async function(msg)
	{
		/* Register button click */
		if (msg.event.kind == Runtime.Web.Crud.FormEvent.BUTTON_CLICK && msg.event.button_name == "save")
		{
			var model = this.modelProxy();
			/* Set wait message */
			model.proxy("save_form").commit("setWaitMessage");
			/* Send save form */
			await model.commitAsync("callCrudSave");
		}
	},
	/**
 * Submit
 */
	onDeleteClick: async function(msg)
	{
		var model = this.modelProxy();
		/* Set wait message */
		model.proxy("delete_form").commit("setWaitMessage");
		/* Send delete form */
		await model.commitAsync("callCrudDelete");
	},
	_init: function()
	{
		Runtime.Web.Component.prototype._init.call(this);
		this.save_form = null;
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.CrudPage)
		{
			this.save_form = o.save_form;
		}
		Runtime.Web.Component.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "save_form")this.save_form = v;
		else Runtime.Web.Component.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "save_form")return this.save_form;
		return Runtime.Web.Component.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.CrudPage, Runtime.Web.Component);
Object.assign(Runtime.Web.Crud.CrudPage,
{
	renderPageTitle: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			/* Element 'h1' */
			let __v0 = __v.e("e", "h1", {});
			
			/* Text */
			let __v1 = __v0.e("t", "", null, model.getPageTitle(model.action));
			__v0.p();
		};
	},
	renderIndex: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let builder = this.getStruct();
			
			/* Text */
			let __v0 = __v.e("t", "", null, this.renderPageTitle(component, render_params, render_content));
			
			/* Component 'Table' */
			let __v1 = __v.e("c", "Runtime.Web.Crud.Table", {"builder":builder,"page":model.page,"pages":model.pages,"@model":[component,Runtime.Collection.from([])]});
		};
	},
	renderSaveForm: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let builder = this.getStruct();
			
			/* Component 'Form' */
			let __v0 = __v.e("c", "Runtime.Web.Crud.Form", {"@ref":[component,"save_form"],"@model":[component,Runtime.Collection.from(["save_form"])],"@event:Runtime.Web.Crud.FormEvent":[component,"onFormEvent"],"builder":builder,"buttons":this.getFormButtons(layout)});
		};
	},
	renderSave: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			/* Element 'div.button_top' */
			let __v0 = __v.e("e", "div", {"class":["button_top", this.getCssHash()].join(" "),"@elem_name":"button_top"});
			
			/* Component 'Button' */
			let __v1 = __v0.e("c","Runtime.Web.Crud.Button", {"type":"small","href":this.getBackHref(layout)}, (__v) =>
			{
				let layout = component.layout();
				let model_path = component.model_path;
				let model = component.model();
				
				/* Text */
				let __v2 = __v.e("t", "", null, "Back");
			});
			__v0.p();
			
			if (model.save_form.item)
			{
				/* Text */
				let __v3 = __v.e("t", "", null, this.renderPageTitle(component, render_params, render_content, model.getPageTitle("edit")));
				
				/* Text */
				let __v4 = __v.e("t", "", null, this.renderSaveForm(component, render_params, render_content));
			}
			else
			{
				/* Element 'p' */
				let __v5 = __v.e("e", "p", {});
				
				/* Text */
				let __v6 = __v5.e("t", "", null, "Item not found");
				__v5.p();
			}
		};
	},
	renderDelete: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			/* Element 'div.button_top' */
			let __v0 = __v.e("e", "div", {"class":["button_top", this.getCssHash()].join(" "),"@elem_name":"button_top"});
			
			/* Component 'Button' */
			let __v1 = __v0.e("c","Runtime.Web.Crud.Button", {"type":"small","href":this.getBackHref(layout)}, (__v) =>
			{
				let layout = component.layout();
				let model_path = component.model_path;
				let model = component.model();
				
				/* Text */
				let __v2 = __v.e("t", "", null, "Back");
			});
			__v0.p();
			
			if (model.delete_form.item)
			{
				/* Element 'center' */
				let __v3 = __v.e("e", "center", {});
				
				/* Text */
				let __v4 = __v3.e("t", "", null, this.renderPageTitle(component, render_params, render_content, model.getPageTitle("delete")));
				
				/* Element 'div.crud_page__delete_buttons' */
				let __v5 = __v3.e("e", "div", {"class":["crud_page__delete_buttons", this.getCssHash()].join(" "),"@elem_name":"crud_page__delete_buttons"});
				
				/* Component 'Button' */
				let __v6 = __v5.e("c","Runtime.Web.Crud.Button", {"type":"danger","@event:Runtime.Web.Events.MouseClickEvent":[component,"onDeleteClick"]}, (__v) =>
				{
					let layout = component.layout();
					let model_path = component.model_path;
					let model = component.model();
					
					/* Text */
					let __v7 = __v.e("t", "", null, "Delete");
				});
				__v5.p();
				
				/* Element 'div.web_form__result' */
				let __v8 = __v3.e("e", "div", {"class":["web_form__result", model.delete_form.getErrorClass(), this.getCssHash()].join(" "),"@elem_name":"web_form__result"});
				
				/* Text */
				let __v9 = __v8.e("t", "", null, model.delete_form.error_message);
				__v8.p();
				__v3.p();
			}
			else
			{
				/* Element 'p' */
				let __v10 = __v.e("e", "p", {});
				
				/* Text */
				let __v11 = __v10.e("t", "", null, "Item not found");
				__v10.p();
			}
		};
	},
	render: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			/* Element 'div.crud_page' */
			let __v0 = __v.e("e", "div", {"class":["crud_page", this.getCssHash()].join(" "),"@elem_name":"crud_page"});
			
			if (model.action == "index")
			{
				/* Text */
				let __v1 = __v0.e("t", "", null, this.renderIndex(component, render_params, render_content));
			}
			else if (model.action == "add" || model.action == "edit")
			{
				/* Text */
				let __v2 = __v0.e("t", "", null, this.renderSave(component, render_params, render_content));
			}
			else if (model.action == "delete")
			{
				/* Text */
				let __v3 = __v0.e("t", "", null, this.renderDelete(component, render_params, render_content));
			}
			__v0.p();
		};
	},
	/**
 * Returns back href
 */
	getBackHref: function(layout)
	{
		return "";
	},
	/**
 * Returns struct
 */
	getStruct: function()
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.Web.Crud.CrudPage.getStruct", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = null;
		Runtime.rtl._memorizeSave("Runtime.Web.Crud.CrudPage.getStruct", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
 * Returns struct
 */
	getFormButtons: function(layout)
	{
		return Runtime.Collection.from([Runtime.Dict.from({"name":"save","label":"Save","type":"primary"})]);
	},
	components: function()
	{
		return Runtime.Collection.from(["Runtime.Web.Crud.Form","Runtime.Web.Crud.RowButtons","Runtime.Web.Crud.RowNumber","Runtime.Web.Crud.Table"]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.CrudPage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("save_form");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "save_form") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"renderPageTitle",
			"renderIndex",
			"renderSaveForm",
			"renderSave",
			"renderDelete",
			"render",
			"getBackHref",
			"onFormEvent",
			"onDeleteClick",
			"getStruct",
			"getFormButtons",
			"components",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.CrudPage);
window["Runtime.Web.Crud.CrudPage"] = Runtime.Web.Crud.CrudPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.CrudPage;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.CrudPageModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Web.Crud.CrudPageModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Web.Crud.CrudPageModel.prototype.constructor = Runtime.Web.Crud.CrudPageModel;
Object.assign(Runtime.Web.Crud.CrudPageModel.prototype,
{
	/**
	 * Returns page title
	 */
	getPageTitle: function(action)
	{
		return "";
	},
	/**
	 * Returns form model
	 */
	getFormModelName: function()
	{
		if (this.action == this.constructor.ACTION_ADD)
		{
			return "save_form";
		}
		else if (this.action == this.constructor.ACTION_EDIT)
		{
			return "save_form";
		}
		else if (this.action == this.constructor.ACTION_DELETE)
		{
			return "delete_form";
		}
		else if (this.action == this.constructor.ACTION_ITEM)
		{
			return "item_form";
		}
		return null;
	},
	/**
	 * Returns form model
	 */
	getFormModel: function()
	{
		var model_name = this.getFormModelName();
		if (model_name)
		{
			return Runtime.rtl.get(this, model_name);
		}
		return null;
	},
	/**
	 * Set CRUD action
	 */
	setAction: function(action)
	{
		if (action == undefined) action = "";
		return this.clone(Runtime.Dict.from({"action":action}));
	},
	/**
	 * Set search data
	 */
	setSearchData: function(search_data)
	{
		return this.clone(Runtime.Dict.from({"search_data":search_data}));
	},
	/**
	 * Set item data
	 */
	setItemData: function(item_data)
	{
		return this.clone(Runtime.Dict.from({"item_data":item_data}));
	},
	/**
	 * Set page
	 */
	setPage: function(page)
	{
		if (page == undefined) page = 0;
		return this.clone(Runtime.Dict.from({"page":page}));
	},
	/**
	 * Set api result
	 */
	setApiResult: function(event, res)
	{
		if (res == null)
		{
			return this;
		}
		var model = this;
		var model_name = this.getFormModelName();
		var form_model = Runtime.rtl.get(this, model_name);
		if (res.isSuccess())
		{
			if (event == "crudSearch")
			{
				model = model.copy(Runtime.Dict.from({"items":Runtime.rtl.get(Runtime.rtl.get(res, "data"), "items"),"pages":Runtime.rtl.get(Runtime.rtl.get(res, "data"), "pages"),"page":Runtime.rtl.get(Runtime.rtl.get(res, "data"), "page")}));
			}
		}
		if (event == "crudSearchOne" || event == "crudItem")
		{
			model = Runtime.rtl.setAttr(model, Runtime.Collection.from([model_name]), form_model.setApiResult(event, res));
		}
		else if (event == "crudSave")
		{
			model = Runtime.rtl.setAttr(model, Runtime.Collection.from([model_name]), form_model.setApiResult(event, res));
		}
		else if (event == "crudDelete")
		{
			model = Runtime.rtl.setAttr(model, Runtime.Collection.from([model_name]), form_model.setApiResult(event, res));
		}
		model = Runtime.rtl.setAttr(model, Runtime.Collection.from(["error_message"]), res.getErrorMessage());
		model = Runtime.rtl.setAttr(model, Runtime.Collection.from(["error_code"]), res.getErrorCode());
		return model;
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.page = 0;
		this.pages = 0;
		this.items = null;
		this.dictionary = Runtime.Dict.from({});
		this.item_data = null;
		this.search_data = null;
		this.item_form = new Runtime.Web.Crud.FormModel();
		this.save_form = new Runtime.Web.Crud.FormModel();
		this.delete_form = new Runtime.Web.Crud.FormModel();
		this.error_code = 0;
		this.error_message = "";
		this.search = "";
		this.action = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "page")return this.page;
		else if (k == "pages")return this.pages;
		else if (k == "items")return this.items;
		else if (k == "dictionary")return this.dictionary;
		else if (k == "item_data")return this.item_data;
		else if (k == "search_data")return this.search_data;
		else if (k == "item_form")return this.item_form;
		else if (k == "save_form")return this.save_form;
		else if (k == "delete_form")return this.delete_form;
		else if (k == "error_code")return this.error_code;
		else if (k == "error_message")return this.error_message;
		else if (k == "search")return this.search;
		else if (k == "action")return this.action;
		return Runtime.Web.BaseModel.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.CrudPageModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Web.Crud.CrudPageModel,
{
	ACTION_INDEX: "index",
	ACTION_ITEM: "item",
	ACTION_ADD: "add",
	ACTION_EDIT: "edit",
	ACTION_DELETE: "delete",
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns page type
	 */
	getPageType: function()
	{
		return "";
	},
	/**
	 * Returns struct builder
	 */
	getStruct: function(build_fn)
	{
		if (build_fn == undefined) build_fn = null;
		var class_name = this.getModelName();
		var kind = this.getPageType();
		return Runtime.Web.Crud.StructBuilder.build(class_name, kind, build_fn);
	},
	/**
	 * Returns find form model
	 */
	getFormModelProxy: function(model)
	{
		var page_model = model.data();
		var model_name = page_model.getFormModelName();
		if (model_name)
		{
			return model.proxy(model_name);
		}
		return null;
	},
	/**
	 * Event
	 */
	event: async function(model, event, data)
	{
		return Promise.resolve(data);
	},
	/**
	 * Search items
	 */
	callCrudSearch: async function(model)
	{
		var model_data = model.data();
		var search_data = model_data.search_data;
		/* Extends search data */
		var post_data = Runtime.Dict.from({"page":model_data.page});
		if (search_data != null)
		{
			post_data = post_data.concat(search_data);
		}
		/* Process event */
		var d = await this.event(model, "crudSearchBefore", Runtime.Dict.from({"post_data":post_data,"search_data":search_data}));
		/* Send api */
		var res = await Runtime.Web.Bus.callApi(this.getApiName() + Runtime.rtl.toStr("::crud.search"), Runtime.rtl.get(d, "post_data"));
		/* Set api result */
		model.commit("setApiResult", "crudSearch", res);
		/* Process event */
		await this.event(model, "crudSearchAfter", Runtime.Dict.from({"post_data":post_data,"res":res}));
		return Promise.resolve(res);
	},
	/**
	 * Search items
	 */
	callCrudSearchOne: async function(model)
	{
		var model_data = model.data();
		var search_data = model_data.search_data;
		/* Extends search data */
		var post_data = Runtime.Dict.from({"page":model_data.page});
		if (search_data != null)
		{
			post_data = post_data.concat(search_data);
		}
		/* Process event */
		var d = await this.event(model, "crudSearchBefore", Runtime.Dict.from({"post_data":post_data}));
		/* Send api */
		var res = await Runtime.Web.Bus.callApi(this.getApiName() + Runtime.rtl.toStr("::crud.search_one"), Runtime.rtl.get(d, "post_data"));
		/* Set api result */
		model.commit("setApiResult", "crudSearchOne", res);
		/* Process event */
		await this.event(model, "crudSearchAfter", Runtime.Dict.from({"post_data":post_data,"res":res}));
		return Promise.resolve(res);
	},
	/**
	 * Find item
	 */
	callCrudItem: async function(model)
	{
		var model_data = model.data();
		var item_data = model_data.item_data;
		var model_item = this.getFormModelProxy(model);
		var model_item_data = model_item.data();
		var pk = model_item_data.getPrimaryKey();
		if (pk == null)
		{
			await this.event(model, "crudItemBefore", Runtime.Dict.from({"pk":null}));
			/* Set api result */
			var model_item = this.getFormModelProxy(model);
			if (model_item)
			{
				var class_name = this.getModelName();
				model_item.setAttr("item", Runtime.rtl.newInstance(class_name));
			}
			await this.event(model, "crudItemAfter", Runtime.Dict.from({"pk":null}));
			return Promise.resolve(null);
		}
		else
		{
			/* Get post data */
			var post_data = Runtime.Dict.from({"pk":pk});
			if (item_data != null)
			{
				post_data = post_data.concat(item_data);
			}
			/* Process event */
			var d = await this.event(model, "crudItemBefore", Runtime.Dict.from({"pk":pk,"post_data":post_data}));
			/* Send api */
			var res = await Runtime.Web.Bus.callApi(this.getApiName() + Runtime.rtl.toStr("::crud.item"), Runtime.rtl.get(d, "post_data"));
			/* Set api result */
			model.commit("setApiResult", "crudItem", res);
			/* Process after */
			await this.event(model, "crudItemAfter", Runtime.Dict.from({"pk":pk,"post_data":post_data,"res":res}));
			return Promise.resolve(res);
		}
	},
	/**
	 * Save form
	 */
	callCrudSave: async function(model)
	{
		var model_item = this.getFormModelProxy(model);
		var model_item_data = model_item.data();
		/* Get post data */
		var post_data = Runtime.Dict.from({"pk":model_item_data.getPrimaryKey(),"item":model_item_data.item.toDict()});
		/* Process before */
		var d = await this.event(model, "crudSaveBefore", Runtime.Dict.from({"post_data":post_data}));
		/* Send api */
		var res = await Runtime.Web.Bus.callApi(this.getApiName() + Runtime.rtl.toStr("::crud.save"), Runtime.rtl.get(d, "post_data"));
		/* Set api result */
		model.commit("setApiResult", "crudSave", res);
		/* Set pk */
		if (res.isSuccess())
		{
			if (model.data().save_form.item_pk != null)
			{
				model.setAttr("action", "edit");
			}
			else
			{
				model.setAttr("action", "add");
			}
		}
		/* Process after */
		await this.event(model, "crudSaveAfter", Runtime.Dict.from({"post_data":post_data,"res":res}));
		return Promise.resolve(res);
	},
	/**
	 * Delete
	 */
	callCrudDelete: async function(model)
	{
		var model_item = this.getFormModelProxy(model);
		var model_item_data = model_item.data();
		/* Get post data */
		var post_data = Runtime.Dict.from({"pk":model_item_data.getPrimaryKey()});
		/* Process before */
		var d = await this.event(model, "crudDeleteBefore", Runtime.Dict.from({"post_data":post_data}));
		/* Send api */
		var res = await Runtime.Web.Bus.callApi(this.getApiName() + Runtime.rtl.toStr("::crud.delete"), Runtime.rtl.get(d, "post_data"));
		/* Set api result */
		model.commit("setApiResult", "crudDelete", res);
		/* Process after */
		await this.event(model, "crudDeleteAfter", Runtime.Dict.from({"post_data":post_data,"res":res}));
		return Promise.resolve(res);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.CrudPageModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("page");
		a.push("pages");
		a.push("items");
		a.push("dictionary");
		a.push("item_data");
		a.push("search_data");
		a.push("item_form");
		a.push("save_form");
		a.push("delete_form");
		a.push("error_code");
		a.push("error_message");
		a.push("search");
		a.push("action");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "page") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pages") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "items") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["T"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "dictionary") return Dict.from({
			"t": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "item_data") return Dict.from({
			"t": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "search_data") return Dict.from({
			"t": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "item_form") return Dict.from({
			"t": "Runtime.Web.Crud.FormModel",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "save_form") return Dict.from({
			"t": "Runtime.Web.Crud.FormModel",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "delete_form") return Dict.from({
			"t": "Runtime.Web.Crud.FormModel",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_code") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_message") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "search") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "action") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getApiName",
			"getModelName",
			"getPageType",
			"getStruct",
			"getPageTitle",
			"getFormModelName",
			"getFormModelProxy",
			"getFormModel",
			"setAction",
			"setSearchData",
			"setItemData",
			"setPage",
			"event",
			"setApiResult",
			"callCrudSearch",
			"callCrudSearchOne",
			"callCrudItem",
			"callCrudSave",
			"callCrudDelete",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.CrudPageModel);
window["Runtime.Web.Crud.CrudPageModel"] = Runtime.Web.Crud.CrudPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.CrudPageModel;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.CrudRoute = function()
{
	Runtime.Web.BaseRoute.apply(this, arguments);
};
Runtime.Web.Crud.CrudRoute.prototype = Object.create(Runtime.Web.BaseRoute.prototype);
Runtime.Web.Crud.CrudRoute.prototype.constructor = Runtime.Web.Crud.CrudRoute;
Object.assign(Runtime.Web.Crud.CrudRoute.prototype,
{
	/**
	 * Returns layout name
	 */
	getLayoutName: function()
	{
		return "";
	},
	/**
	 * Returns page model name
	 */
	getPageModelName: function()
	{
		return "";
	},
	/**
	 * Returns page name
	 */
	getPageName: function()
	{
		return "";
	},
	/**
	 * Crud route before
	 */
	crudRouteBefore: async function()
	{
		var page_model_data = this.page_model_proxy.data();
		var action = page_model_data.action;
		/* Get form model */
		var model_item = Runtime.Web.Crud.CrudPageModel.getFormModelProxy(this.page_model_proxy);
		if (action == Runtime.Web.Crud.CrudPageModel.ACTION_ADD)
		{
			model_item.setAttr("item_pk", null);
		}
		else if (action == Runtime.Web.Crud.CrudPageModel.ACTION_EDIT || action == Runtime.Web.Crud.CrudPageModel.ACTION_DELETE || action == Runtime.Web.Crud.CrudPageModel.ACTION_ITEM)
		{
			var name_id = this.constructor.getNameId();
			var query_id = this.constructor.getQueryId();
			model_item.setAttr("item_pk", null);
			if (this.container.request.query.has(query_id))
			{
				var value_id = Runtime.rtl.to(this.container.request.query.get(query_id), {"e":"int"});
				var m = new Runtime.Map();
				m.setValue(name_id, value_id);
				model_item.commit("setPrimaryKey", m);
			}
		}
	},
	/**
	 * Crud route after
	 */
	crudRouteAfter: async function()
	{
	},
	/**
	 * Action index
	 */
	actionIndex: async function()
	{
		/* Setup action */
		this.page_model_proxy.commit("setAction", Runtime.Web.Crud.CrudPageModel.ACTION_INDEX);
		this.page_model_proxy.commit("setPage", this.container.request.query.get("p", 1));
		/* Search items */
		await this.crudRouteBefore();
		await this.page_model_proxy.commitAsync("callCrudSearch");
		await this.crudRouteAfter();
		/* Render page */
		this.container.render(this.getPageName());
	},
	/**
	 * Action add
	 */
	actionAdd: async function()
	{
		/* Setup action */
		this.page_model_proxy.commit("setAction", Runtime.Web.Crud.CrudPageModel.ACTION_ADD);
		/* Create save form */
		var save_form = Runtime.Web.Crud.CrudPageModel.getFormModelProxy(this.page_model_proxy);
		/* Call api */
		await this.crudRouteBefore();
		await this.page_model_proxy.commitAsync("callCrudItem");
		await this.crudRouteAfter();
		/* Render page */
		this.container.render(this.getPageName());
	},
	/**
	 * Action edit
	 */
	actionEdit: async function()
	{
		/* Setup action */
		this.page_model_proxy.commit("setAction", Runtime.Web.Crud.CrudPageModel.ACTION_EDIT);
		/* Create save form */
		var save_form = Runtime.Web.Crud.CrudPageModel.getFormModelProxy(this.page_model_proxy);
		/* Call api */
		await this.crudRouteBefore();
		await this.page_model_proxy.commitAsync("callCrudItem");
		save_form.commit("clearErrorMessage");
		await this.crudRouteAfter();
		/* Render page */
		this.container.render(this.getPageName());
	},
	/**
	 * Action delete
	 */
	actionDelete: async function()
	{
		/* Setup action */
		this.page_model_proxy.commit("setAction", Runtime.Web.Crud.CrudPageModel.ACTION_DELETE);
		/* Create delete form */
		var delete_form = Runtime.Web.Crud.CrudPageModel.getFormModelProxy(this.page_model_proxy);
		/* Call api */
		await this.crudRouteBefore();
		await this.page_model_proxy.commitAsync("callCrudItem");
		delete_form.commit("clearErrorMessage");
		await this.crudRouteAfter();
		/* Render page */
		this.container.render(this.getPageName());
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.CrudRoute)
		{
		}
		Runtime.Web.BaseRoute.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.BaseRoute.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.BaseRoute.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.CrudRoute, Runtime.Web.BaseRoute);
Object.assign(Runtime.Web.Crud.CrudRoute,
{
	/**
	 * Returns id name for query
	 */
	getQueryId: function()
	{
		return "id";
	},
	/**
	 * Returns id name
	 */
	getNameId: function()
	{
		return "id";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.CrudRoute";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseRoute";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getLayoutName",
			"getPageModelName",
			"getPageName",
			"getQueryId",
			"getNameId",
			"crudRouteBefore",
			"crudRouteAfter",
			"actionIndex",
			"actionAdd",
			"actionEdit",
			"actionDelete",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.CrudRoute);
window["Runtime.Web.Crud.CrudRoute"] = Runtime.Web.Crud.CrudRoute;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.CrudRoute;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.FieldInfo = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Crud.FieldInfo.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Crud.FieldInfo.prototype.constructor = Runtime.Web.Crud.FieldInfo;
Object.assign(Runtime.Web.Crud.FieldInfo.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.api_name = "";
		this.label = "";
		this.description = "";
		this.form_component_name = "";
		this.table_component_name = "";
		this.value_type = "string";
		this.do_trim = true;
		this.is_show = null;
		this.calculate = null;
		this.primary = false;
		this.required = true;
		this.readonly = false;
		this.virtual = false;
		this.nullable = false;
		this.can_create = true;
		this.can_update = true;
		this.group = "default";
		this.default_value = null;
		this.component_settings = Runtime.Dict.from({});
		this.options = Runtime.Collection.from([]);
		this.events = Runtime.Collection.from([]);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "api_name")return this.api_name;
		else if (k == "label")return this.label;
		else if (k == "description")return this.description;
		else if (k == "form_component_name")return this.form_component_name;
		else if (k == "table_component_name")return this.table_component_name;
		else if (k == "value_type")return this.value_type;
		else if (k == "do_trim")return this.do_trim;
		else if (k == "is_show")return this.is_show;
		else if (k == "calculate")return this.calculate;
		else if (k == "primary")return this.primary;
		else if (k == "required")return this.required;
		else if (k == "readonly")return this.readonly;
		else if (k == "virtual")return this.virtual;
		else if (k == "nullable")return this.nullable;
		else if (k == "can_create")return this.can_create;
		else if (k == "can_update")return this.can_update;
		else if (k == "group")return this.group;
		else if (k == "default_value")return this.default_value;
		else if (k == "component_settings")return this.component_settings;
		else if (k == "options")return this.options;
		else if (k == "events")return this.events;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.FieldInfo, Runtime.BaseStruct);
Object.assign(Runtime.Web.Crud.FieldInfo,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.FieldInfo";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("api_name");
		a.push("label");
		a.push("description");
		a.push("form_component_name");
		a.push("table_component_name");
		a.push("value_type");
		a.push("do_trim");
		a.push("is_show");
		a.push("calculate");
		a.push("primary");
		a.push("required");
		a.push("readonly");
		a.push("virtual");
		a.push("nullable");
		a.push("can_create");
		a.push("can_update");
		a.push("group");
		a.push("default_value");
		a.push("component_settings");
		a.push("options");
		a.push("events");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "api_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "label") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "description") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "form_component_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "table_component_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value_type") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "do_trim") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_show") return Dict.from({
			"t": "fn",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "calculate") return Dict.from({
			"t": "fn",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "primary") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "required") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "readonly") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "virtual") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "nullable") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "can_create") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "can_update") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "group") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "default_value") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "component_settings") return Dict.from({
			"t": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "options") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Runtime.Dict"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "events") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Runtime.Dict"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.FieldInfo);
window["Runtime.Web.Crud.FieldInfo"] = Runtime.Web.Crud.FieldInfo;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.FieldInfo;
"use strict;"
/*
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
*/
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.Form = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Crud.Form.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Crud.Form.prototype.constructor = Runtime.Web.Crud.Form;
Object.assign(Runtime.Web.Crud.Form.prototype,
{
	/**
 * On item change
 */
	onChange: function(msg)
	{
		this.sendEvent(msg.event);
	},
	/**
 * Button click
 */
	onButtonClick: function(msg)
	{
		var event = new Runtime.Web.Crud.FormEvent(Runtime.Dict.from({"kind":Runtime.Web.Crud.FormEvent.BUTTON_CLICK,"button_name":Runtime.rtl.get(msg.sender.params, "name")}));
		this.sendEvent(event);
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.Form)
		{
		}
		Runtime.Web.Component.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.Component.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Component.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.Form, Runtime.Web.Component);
Object.assign(Runtime.Web.Crud.Form,
{
	css: function(vars)
	{
		return ".web_form{" + Runtime.rtl.toStr("}.web_form__row{") + Runtime.rtl.toStr("margin-bottom: 5px;") + Runtime.rtl.toStr("}.web_form__field_result{") + Runtime.rtl.toStr("color: red;font-size: 12px;") + Runtime.rtl.toStr("}.web_form__row_label{") + Runtime.rtl.toStr("display: block;font-weight: bold;margin-bottom: 5px;") + Runtime.rtl.toStr("}.web_form__buttons{") + Runtime.rtl.toStr("text-align: center;") + Runtime.rtl.toStr("}.web_form__result{") + Runtime.rtl.toStr("text-align: center;margin-top: 10px;") + Runtime.rtl.toStr("}.web_form__result--hide{") + Runtime.rtl.toStr("display: none;") + Runtime.rtl.toStr("}.web_form__result--success{") + Runtime.rtl.toStr("color: " + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "success", "background"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.web_form__result--error{") + Runtime.rtl.toStr("color: " + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "error", "background"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}");
	},
	renderRow: function(component, render_params, render_content, field_name)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let builder = Runtime.rtl.get(render_params, "builder");
			
			let field_info = Runtime.rtl.get(builder.info, field_name);
			
			if (field_info)
			{
				let is_show = field_info.is_show;
				
				let component_settings = field_info.component_settings;
				
				let component_name = field_info.form_component_name;
				
				if (is_show == null || is_show(Runtime.rtl.get(model, "item")))
				{
					/* Element 'div.web_form__row' */
					let __v0 = __v.e("e", "div", {"class":["web_form__row", this.getCssHash()].join(" "),"@key":field_name,"@elem_name":"web_form__row"});
					
					/* Element 'label.web_form__row_label' */
					let __v1 = __v0.e("e", "label", {"class":["web_form__row_label", this.getCssHash()].join(" "),"@elem_name":"web_form__row_label"});
					
					/* Text */
					let __v2 = __v1.e("t", "", null, field_info.label);
					__v1.p();
					
					if (component_name)
					{
						/* Component '{component_name}' */
						let __v3 = __v0.e("c", component_name, this._merge_attrs({"name":field_name,"options":field_info.options,"default_value":field_info.default_value,"crud_action":"form","crud_field_info":field_info,"crud_model":model,"@ref":[component,"field_" + Runtime.rtl.toStr(field_name)],"@model":[component,Runtime.Collection.from(["item",field_name])],"@event:Runtime.Web.Events.ChangeEvent":[component,"onChange"]},component_settings));
					}
					
					let field_result = model.getFieldResult(field_name);
					
					if (field_result.count() == 0)
					{
						/* Element 'div.web_form__field_result' */
						let __v4 = __v0.e("e", "div", {"data-name":field_name,"class":["web_form__field_result", this.getCssHash()].join(" "),"@elem_name":"web_form__field_result"});
						
						/* Raw */
						let __v5 = __v4.e("r", "", null, "&nbsp;");
						__v4.p();
					}
					else
					{
						/* Element 'div.web_form__field_result' */
						let __v6 = __v0.e("e", "div", {"data-name":field_name,"class":["web_form__field_result", this.getCssHash()].join(" "),"@elem_name":"web_form__field_result"});
						
						for (let i = 0;i < field_result.count();i++)
						{
							/* Element 'div' */
							let __v7 = __v6.e("e", "div", {});
							
							/* Text */
							let __v8 = __v7.e("t", "", null, Runtime.rtl.get(field_result, i));
							__v7.p();
						}
						__v6.p();
					}
					__v0.p();
				}
			}
		};
	},
	renderButton: function(component, render_params, render_content, button)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			/* Component 'Button' */
			let __v0 = __v.e("c","Runtime.Web.Crud.Button", {"type":Runtime.rtl.get(button, "type"),"name":Runtime.rtl.get(button, "name"),"@event:Runtime.Web.Events.MouseClickEvent":[component,"onButtonClick"]}, (__v) =>
			{
				let layout = component.layout();
				let model_path = component.model_path;
				let model = component.model();
				
				/* Text */
				let __v1 = __v.e("t", "", null, Runtime.rtl.get(button, "label"));
			});
		};
	},
	renderButtons: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let buttons = Runtime.rtl.get(render_params, "buttons");
			
			if (buttons)
			{
				/* Element 'div.web_form__buttons' */
				let __v0 = __v.e("e", "div", {"class":["web_form__buttons", this.getCssHash()].join(" "),"@elem_name":"web_form__buttons"});
				
				for (let i = 0;i < buttons.count();i++)
				{
					/* Text */
					let __v1 = __v0.e("t", "", null, this.renderButton(component, render_params, render_content, Runtime.rtl.get(buttons, i)));
				}
				__v0.p();
			}
		};
	},
	renderResult: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			/* Element 'div.web_form__result' */
			let __v0 = __v.e("e", "div", {"class":["web_form__result", model.getErrorClass(), this.getCssHash()].join(" "),"@elem_name":"web_form__result"});
			
			/* Text */
			let __v1 = __v0.e("t", "", null, model.error_message);
			__v0.p();
		};
	},
	render: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			/* Element 'form.form' */
			let __v0 = __v.e("e", "form", {"method":"POST","enctype":"multipart/form-data","onsubmit":"return false;","class":["form", this.getCssHash()].join(" "),"@elem_name":"form"});
			
			let builder = Runtime.rtl.get(render_params, "builder");
			
			if (builder)
			{
				/* Element 'div.web_form__rows' */
				let __v1 = __v0.e("e", "div", {"class":["web_form__rows", this.getCssHash()].join(" "),"@elem_name":"web_form__rows"});
				
				for (let i = 0;i < builder.form_fields.count();i++)
				{
					/* Text */
					let __v2 = __v1.e("t", "", null, this.renderRow(component, render_params, render_content, Runtime.rtl.get(builder.form_fields, i)));
				}
				__v1.p();
			}
			
			/* Text */
			let __v3 = __v0.e("t", "", null, this.renderButtons(component, render_params, render_content));
			
			/* Text */
			let __v4 = __v0.e("t", "", null, this.renderResult(component, render_params, render_content));
			__v0.p();
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Form";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"css",
			"renderRow",
			"renderButton",
			"renderButtons",
			"renderResult",
			"render",
			"onChange",
			"onButtonClick",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Form);
window["Runtime.Web.Crud.Form"] = Runtime.Web.Crud.Form;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Form;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.FormEvent = function()
{
	Runtime.Web.Events.WebEvent.apply(this, arguments);
};
Runtime.Web.Crud.FormEvent.prototype = Object.create(Runtime.Web.Events.WebEvent.prototype);
Runtime.Web.Crud.FormEvent.prototype.constructor = Runtime.Web.Crud.FormEvent;
Object.assign(Runtime.Web.Crud.FormEvent.prototype,
{
	_init: function()
	{
		Runtime.Web.Events.WebEvent.prototype._init.call(this);
		this.button_name = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "button_name")return this.button_name;
		return Runtime.Web.Events.WebEvent.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.FormEvent, Runtime.Web.Events.WebEvent);
Object.assign(Runtime.Web.Crud.FormEvent,
{
	BUTTON_CLICK: "button_click",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.FormEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.WebEvent";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("button_name");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "button_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.FormEvent);
window["Runtime.Web.Crud.FormEvent"] = Runtime.Web.Crud.FormEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.FormEvent;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.FormModel = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Crud.FormModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Crud.FormModel.prototype.constructor = Runtime.Web.Crud.FormModel;
Object.assign(Runtime.Web.Crud.FormModel.prototype,
{
	/**
	 * Returns primary key
	 */
	getPrimaryKey: function()
	{
		return this.item_pk;
	},
	/**
	 * Set primary key
	 */
	setPrimaryKey: function(item_pk)
	{
		return this.clone(Runtime.Dict.from({"item_pk":item_pk}));
	},
	/**
	 * Set item
	 */
	setItem: function(item)
	{
		return this.clone(Runtime.Dict.from({"item":item}));
	},
	/**
	 * Set wait message
	 */
	setWaitMessage: function()
	{
		var model = this;
		model = Runtime.rtl.setAttr(model, Runtime.Collection.from(["error_code"]), 0);
		model = Runtime.rtl.setAttr(model, Runtime.Collection.from(["error_message"]), "Wait please ...");
		return model;
	},
	/**
	 * Clear error message
	 */
	clearErrorMessage: function()
	{
		var model = this;
		model = Runtime.rtl.setAttr(model, Runtime.Collection.from(["error_code"]), 0);
		model = Runtime.rtl.setAttr(model, Runtime.Collection.from(["error_message"]), "");
		return model;
	},
	/**
	 * Set api result
	 */
	setApiResult: function(event, res)
	{
		if (res == null)
		{
			return this;
		}
		var model = this;
		if (res.isSuccess())
		{
			var item = Runtime.rtl.attr(res, ["data", "item"]);
			if (item)
			{
				model = Runtime.rtl.setAttr(model, Runtime.Collection.from(["item"]), item);
			}
			var pk = Runtime.rtl.attr(res, ["data", "pk"]);
			model = Runtime.rtl.setAttr(model, Runtime.Collection.from(["item_pk"]), pk);
		}
		/* Set validation result */
		if (res.data != null && res.data.has("validation_result"))
		{
			var validation_result = new Runtime.Web.Crud.ValidationResult(Runtime.rtl.get(res.data, "validation_result"));
			model = Runtime.rtl.setAttr(model, Runtime.Collection.from(["validation_result"]), validation_result);
		}
		else
		{
			model = Runtime.rtl.setAttr(model, Runtime.Collection.from(["validation_result"]), null);
		}
		model = Runtime.rtl.setAttr(model, Runtime.Collection.from(["error_message"]), res.getErrorMessage());
		model = Runtime.rtl.setAttr(model, Runtime.Collection.from(["error_code"]), res.getErrorCode());
		return model;
	},
	/**
	 * Returns form class
	 */
	getErrorClass: function()
	{
		if (this.error_message == "")
		{
			return "web_form__result--hide";
		}
		if (this.error_code > 0)
		{
			return "web_form__result--success";
		}
		if (this.error_code < 0)
		{
			return "web_form__result--error";
		}
		return "";
	},
	/**
	 * Get field result
	 */
	getFieldResult: function(field_name)
	{
		if (this.validation_result == null)
		{
			return Runtime.Collection.from([]);
		}
		if (!this.validation_result.fields.has(field_name))
		{
			return Runtime.Collection.from([]);
		}
		return Runtime.rtl.get(this.validation_result.fields, field_name);
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.item = null;
		this.item_pk = null;
		this.dictionary = null;
		this.params = null;
		this.error_code = 0;
		this.error_message = "";
		this.validation_result = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "item")return this.item;
		else if (k == "item_pk")return this.item_pk;
		else if (k == "dictionary")return this.dictionary;
		else if (k == "params")return this.params;
		else if (k == "error_code")return this.error_code;
		else if (k == "error_message")return this.error_message;
		else if (k == "validation_result")return this.validation_result;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.FormModel, Runtime.BaseStruct);
Object.assign(Runtime.Web.Crud.FormModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.FormModel";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("item");
		a.push("item_pk");
		a.push("dictionary");
		a.push("params");
		a.push("error_code");
		a.push("error_message");
		a.push("validation_result");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "item") return Dict.from({
			"t": "T",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "item_pk") return Dict.from({
			"t": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "dictionary") return Dict.from({
			"t": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return Dict.from({
			"t": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_code") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_message") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "validation_result") return Dict.from({
			"t": "Runtime.Web.Crud.ValidationResult",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getPrimaryKey",
			"setPrimaryKey",
			"setItem",
			"setWaitMessage",
			"clearErrorMessage",
			"setApiResult",
			"getErrorClass",
			"getFieldResult",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.FormModel);
window["Runtime.Web.Crud.FormModel"] = Runtime.Web.Crud.FormModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.FormModel;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2021 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.Helper = function()
{
};
Object.assign(Runtime.Web.Crud.Helper.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.Helper)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Runtime.Web.Crud.Helper,
{
	getValue: function(layout, model_path, params)
	{
		var model = Runtime.rtl.attr(layout, model_path);
		var value = (params != null) ? (params.get("value", "")) : ("");
		var default_value = (params != null) ? (params.get("default_value", "")) : ("");
		value = (params.has("value")) ? (value) : (model);
		if (Runtime.rtl.isEmpty(value) && value !== false && value !== 0 && value !== "0")
		{
			value = default_value;
		}
		return value;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Helper";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getValue",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Helper);
window["Runtime.Web.Crud.Helper"] = Runtime.Web.Crud.Helper;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Helper;
"use strict;"
/*
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
*/
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.Input = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Crud.Input.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Crud.Input.prototype.constructor = Runtime.Web.Crud.Input;
Object.assign(Runtime.Web.Crud.Input.prototype,
{
	/**
 * On change
 */
	onChange: function(msg)
	{
		if (this.model_path != "")
		{
			var provider = Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
			provider.commitComponent(this, msg.event.value);
		}
		var event = msg.event.clone(Runtime.Dict.from({"field_name":Runtime.rtl.get(this.params, "name")}));
		this.sendEvent(event);
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.Input)
		{
		}
		Runtime.Web.Component.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.Component.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Component.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.Input, Runtime.Web.Component);
Object.assign(Runtime.Web.Crud.Input,
{
	css: function(vars)
	{
		return ".input.h-bb69{" + Runtime.rtl.toStr("width: 100%;padding: 5px 8px;background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "default", "background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "default", "border"])) + Runtime.rtl.toStr(" solid;outline: transparent;line-height: normal;")) + Runtime.rtl.toStr("}");
	},
	render: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let value = Runtime.Web.Crud.Helper.getValue(layout, model_path, render_params);
			
			let name = (render_params != null) ? (render_params.get("name", "")) : ("");
			
			let type = (render_params != null) ? (render_params.get("type", "input")) : ("");
			
			let tag = (render_params != null) ? (render_params.get("@tag", "")) : ("");
			
			/* Element 'input.input' */
			let __v0 = __v.e("e", "input", {"@tag":tag,"@event:Runtime.Web.Events.ChangeEvent":[component,"onChange"],"name":name,"type":type,"value":value,"class":["input", this.getCssHash()].join(" "),"@elem_name":"input"});
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Input";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"css",
			"render",
			"onChange",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Input);
window["Runtime.Web.Crud.Input"] = Runtime.Web.Crud.Input;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Input;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.ItemResult = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Crud.ItemResult.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Crud.ItemResult.prototype.constructor = Runtime.Web.Crud.ItemResult;
Object.assign(Runtime.Web.Crud.ItemResult.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.data = null;
		this.dictionary = null;
		this.params = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "data")return this.data;
		else if (k == "dictionary")return this.dictionary;
		else if (k == "params")return this.params;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.ItemResult, Runtime.BaseStruct);
Object.assign(Runtime.Web.Crud.ItemResult,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.ItemResult";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("data");
		a.push("dictionary");
		a.push("params");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "data") return Dict.from({
			"t": "T",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "dictionary") return Dict.from({
			"t": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return Dict.from({
			"t": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.ItemResult);
window["Runtime.Web.Crud.ItemResult"] = Runtime.Web.Crud.ItemResult;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.ItemResult;
"use strict;"
/*
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
*/
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.Label = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Crud.Label.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Crud.Label.prototype.constructor = Runtime.Web.Crud.Label;
Object.assign(Runtime.Web.Crud.Label.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.Label)
		{
		}
		Runtime.Web.Component.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.Component.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Component.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.Label, Runtime.Web.Component);
Object.assign(Runtime.Web.Crud.Label,
{
	css: function(vars)
	{
	},
	render: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let value = Runtime.Web.Crud.Helper.getValue(layout, model_path, render_params);
			
			value = (Runtime.rtl.isString(value)) ? (Runtime.rs.split("\n", value)) : (Runtime.Collection.from([value]));
			
			for (let i = 0;i < value.count();i++)
			{
				/* Text */
				let __v0 = __v.e("t", "", null, Runtime.rtl.get(value, i));
				
				if (i + 1 < value.count())
				{
					/* Element 'br' */
					let __v1 = __v.e("e", "br", {});
				}
			}
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Label";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"css",
			"render",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Label);
window["Runtime.Web.Crud.Label"] = Runtime.Web.Crud.Label;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Label;
"use strict;"
/*
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
*/
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.Pagination = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Crud.Pagination.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Crud.Pagination.prototype.constructor = Runtime.Web.Crud.Pagination;
Object.assign(Runtime.Web.Crud.Pagination.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.Pagination)
		{
		}
		Runtime.Web.Component.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.Component.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Component.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.Pagination, Runtime.Web.Component);
Object.assign(Runtime.Web.Crud.Pagination,
{
	css: function(vars)
	{
		return ".pagination.h-ddc6 {" + Runtime.rtl.toStr("text-align: center;padding: 10px 0;width: 100%;") + Runtime.rtl.toStr("}.pagination.h-ddc6 ul, .pagination.h-ddc6 li {") + Runtime.rtl.toStr("padding: 0;margin: 0;") + Runtime.rtl.toStr("}.pagination.h-ddc6 li {") + Runtime.rtl.toStr("display: inline-block;vertical-align: top;list-style: none;margin-left: 5px;margin-right: 5px;") + Runtime.rtl.toStr("}.pagination.h-ddc6 a, .pagination.h-ddc6 a:hover, .pagination.h-ddc6 span {") + Runtime.rtl.toStr("display: table-cell;vertical-align: middle;background-color: #fff;border: 1px #ccc solid;color: #000;text-align: center;width: 30px;height: 30px;font-size: 14px;text-decoration: none;") + Runtime.rtl.toStr("}.pagination.h-ddc6 li:first-child{") + Runtime.rtl.toStr("margin-left: 0px;") + Runtime.rtl.toStr("}.pagination.h-ddc6 li.active.h-ddc6 a, .pagination.h-ddc6 li.active.h-ddc6 a:hover {") + Runtime.rtl.toStr("background-color: #337ab7;border: 1px #337ab7 solid;color: #fff;") + Runtime.rtl.toStr("}");
	},
	render: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let page = Runtime.rtl.get(render_params, "page");
			
			let pages = Runtime.rtl.get(render_params, "pages");
			
			var __v0 = new Runtime.Monad(Runtime.rtl.get(render_params, "delta"));
			__v0 = __v0.monad(Runtime.rtl.m_to("int", 5));
			let delta = __v0.value();
			
			let page_start = Runtime.math.max(2, page - delta + 1);
			
			let page_end = Runtime.math.min(page + delta, pages - 1);
			
			if (pages > 1)
			{
				/* Element 'nav.pagination' */
				let __v1 = __v.e("e", "nav", {"class":["pagination", this.getCssHash()].join(" "),"@elem_name":"pagination"});
				
				/* Element 'ul' */
				let __v2 = __v1.e("e", "ul", {});
				
				/* Element 'li' */
				let __v3 = __v2.e("e", "li", {"class":[((page == 1) ? ("active") : ("")), this.getCssHash()].join(" ")});
				
				/* Element 'a' */
				let __v4 = __v3.e("e", "a", {"href":this.getPageUrl(layout, 1)});
				
				/* Text */
				let __v5 = __v4.e("t", "", null, "1");
				__v4.p();
				__v3.p();
				
				if (page_start > 2)
				{
					/* Element 'li' */
					let __v6 = __v2.e("e", "li", {});
					
					/* Text */
					let __v7 = __v6.e("t", "", null, "...");
					__v6.p();
				}
				
				if (page_start <= page_end)
				{
					for (let p = page_start;p <= page_end;p++)
					{
						/* Element 'li' */
						let __v8 = __v2.e("e", "li", {"class":[((page == p) ? ("active") : ("")), this.getCssHash()].join(" ")});
						
						/* Element 'a' */
						let __v9 = __v8.e("e", "a", {"href":this.getPageUrl(layout, p)});
						
						/* Text */
						let __v10 = __v9.e("t", "", null, p);
						__v9.p();
						__v8.p();
					}
				}
				
				if (page_end < pages - 1)
				{
					/* Element 'li' */
					let __v11 = __v2.e("e", "li", {});
					
					/* Text */
					let __v12 = __v11.e("t", "", null, "...");
					__v11.p();
				}
				
				if (pages > 1)
				{
					/* Element 'li' */
					let __v13 = __v2.e("e", "li", {"class":[((page == pages) ? ("active") : ("")), this.getCssHash()].join(" ")});
					
					/* Element 'a' */
					let __v14 = __v13.e("e", "a", {"href":this.getPageUrl(layout, pages)});
					
					/* Text */
					let __v15 = __v14.e("t", "", null, pages);
					__v14.p();
					__v13.p();
				}
				__v2.p();
				__v1.p();
			}
		};
	},
	/**
 * Returns page url
 */
	getPageUrl: function(layout, page)
	{
		var uri = layout.request_full_uri;
		return Runtime.rs.url_get_add(uri, "p", page);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Pagination";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"css",
			"render",
			"getPageUrl",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Pagination);
window["Runtime.Web.Crud.Pagination"] = Runtime.Web.Crud.Pagination;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Pagination;
"use strict;"
/*
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
*/
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.RowButtons = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Crud.RowButtons.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Crud.RowButtons.prototype.constructor = Runtime.Web.Crud.RowButtons;
Object.assign(Runtime.Web.Crud.RowButtons.prototype,
{
	/**
 * Button click
 */
	onButtonClick: function(msg)
	{
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.RowButtons)
		{
		}
		Runtime.Web.Component.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.Component.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Component.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.RowButtons, Runtime.Web.Component);
Object.assign(Runtime.Web.Crud.RowButtons,
{
	css: function(vars)
	{
		return ".row_buttons.h-76c2 .web_button.h-9441{" + Runtime.rtl.toStr("margin-left: 5px;margin-right: 5px;") + Runtime.rtl.toStr("}");
	},
	renderButton: function(component, render_params, render_content, button, index)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let value = Runtime.rtl.get(render_params, "value");
			
			/* Component 'Button' */
			let __v0 = __v.e("c","Runtime.Web.Crud.Button", {"type":Runtime.rtl.get(button, "type"),"name":Runtime.rtl.get(button, "name"),"@event:Runtime.Web.Events.MouseClickEvent":[component,"onButtonClick"],"href":((Runtime.rtl.get(button, "link") == 1) ? (Runtime.rtl.get(value, index)) : (null))}, (__v) =>
			{
				let layout = component.layout();
				let model_path = component.model_path;
				let model = component.model();
				
				/* Text */
				let __v1 = __v.e("t", "", null, Runtime.rtl.get(button, "label"));
			});
		};
	},
	render: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let buttons = Runtime.rtl.get(render_params, "buttons");
			
			if (buttons)
			{
				/* Element 'div.row_buttons' */
				let __v0 = __v.e("e", "div", {"class":["row_buttons", this.getCssHash()].join(" "),"@elem_name":"row_buttons"});
				
				for (let i = 0;i < buttons.count();i++)
				{
					/* Text */
					let __v1 = __v0.e("t", "", null, this.renderButton(component, render_params, render_content, Runtime.rtl.get(buttons, i), i));
				}
				__v0.p();
			}
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.RowButtons";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"css",
			"renderButton",
			"render",
			"onButtonClick",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.RowButtons);
window["Runtime.Web.Crud.RowButtons"] = Runtime.Web.Crud.RowButtons;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.RowButtons;
"use strict;"
/*
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
*/
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.RowNumber = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Crud.RowNumber.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Crud.RowNumber.prototype.constructor = Runtime.Web.Crud.RowNumber;
Object.assign(Runtime.Web.Crud.RowNumber.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.RowNumber)
		{
		}
		Runtime.Web.Component.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.Component.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Component.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.RowNumber, Runtime.Web.Component);
Object.assign(Runtime.Web.Crud.RowNumber,
{
	render: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let crud_model = render_params.get("crud_model");
			
			/* Text */
			let __v0 = __v.e("t", "", null, "    ");
			
			/* Text */
			let __v1 = __v.e("t", "", null, (crud_model.page - 1) * 10 + Runtime.rtl.get(render_params, "crud_index") + 1);
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.RowNumber";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"render",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.RowNumber);
window["Runtime.Web.Crud.RowNumber"] = Runtime.Web.Crud.RowNumber;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.RowNumber;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.SearchResult = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Crud.SearchResult.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Crud.SearchResult.prototype.constructor = Runtime.Web.Crud.SearchResult;
Object.assign(Runtime.Web.Crud.SearchResult.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.page = 0;
		this.pages = 0;
		this.items = null;
		this.dictionary = null;
		this.params = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "page")return this.page;
		else if (k == "pages")return this.pages;
		else if (k == "items")return this.items;
		else if (k == "dictionary")return this.dictionary;
		else if (k == "params")return this.params;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.SearchResult, Runtime.BaseStruct);
Object.assign(Runtime.Web.Crud.SearchResult,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.SearchResult";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("page");
		a.push("pages");
		a.push("items");
		a.push("dictionary");
		a.push("params");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "page") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pages") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "items") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["T"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "dictionary") return Dict.from({
			"t": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return Dict.from({
			"t": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.SearchResult);
window["Runtime.Web.Crud.SearchResult"] = Runtime.Web.Crud.SearchResult;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.SearchResult;
"use strict;"
/*
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2021 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
*/
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.Select = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Crud.Select.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Crud.Select.prototype.constructor = Runtime.Web.Crud.Select;
Object.assign(Runtime.Web.Crud.Select.prototype,
{
	/**
 * On change
 */
	onChange: function(msg)
	{
		if (this.model_path != "")
		{
			var provider = Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
			provider.commitComponent(this, msg.event.value);
		}
		var event = msg.event.clone(Runtime.Dict.from({"field_name":Runtime.rtl.get(this.params, "name")}));
		this.sendEvent(event);
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.Select)
		{
		}
		Runtime.Web.Component.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.Component.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Component.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.Select, Runtime.Web.Component);
Object.assign(Runtime.Web.Crud.Select,
{
	css: function(vars)
	{
		return ".select.h-e254{" + Runtime.rtl.toStr("width: 100%;max-width: 100%;padding: 5px 8px;background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "default", "background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "default", "border"])) + Runtime.rtl.toStr(" solid;outline: transparent;line-height: normal;")) + Runtime.rtl.toStr("}");
	},
	render: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let name = (render_params != null) ? (render_params.get("name", "")) : ("");
			
			let value = Runtime.Web.Crud.Helper.getValue(layout, model_path, render_params);
			
			/* Element 'select.select' */
			let __v0 = __v.e("e", "select", {"@event:Runtime.Web.Events.ChangeEvent":[component,"onChange"],"name":name,"value":value,"class":["select", this.getCssHash()].join(" "),"@elem_name":"select"});
			
			let selected = Runtime.Dict.from({});
			
			var __v1 = new Runtime.Monad(Runtime.rtl.get(render_params, "show_select_value"));
			__v1 = __v1.monad(Runtime.rtl.m_to("bool", true));
			let show_select_value = __v1.value();
			
			if (show_select_value == true)
			{
				if (value === "" || value === null)
				{
					selected = Runtime.Dict.from({"selected":"selected"});
				}
				
				/* Element 'option' */
				let __v2 = __v0.e("e", "option", this._merge_attrs({"value":" ","@key":":select_value"},selected));
				
				/* Text */
				let __v3 = __v2.e("t", "", null, "Выберите значение");
				__v2.p();
			}
			
			let options = Runtime.rtl.get(render_params, "options");
			
			if (Runtime.rtl.exists(options))
			{
				for (let i = 0;i < options.count();i++)
				{
					let item = Runtime.rtl.get(options, i);
					
					selected = Runtime.Dict.from({});
					
					if (Runtime.rtl.get(item, "value") == value && value !== "" && value !== null)
					{
						selected = Runtime.Dict.from({"selected":"selected"});
					}
					
					/* Element 'option' */
					let __v4 = __v0.e("e", "option", this._merge_attrs({"value":"" + Runtime.rtl.toStr(Runtime.rtl.get(item, "value")),"@key":Runtime.rtl.get(item, "value")},selected));
					
					/* Text */
					let __v5 = __v4.e("t", "", null, Runtime.rtl.get(item, "label"));
					__v4.p();
				}
			}
			__v0.p();
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Select";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"css",
			"render",
			"onChange",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Select);
window["Runtime.Web.Crud.Select"] = Runtime.Web.Crud.Select;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Select;
"use strict;"
/*
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
*/
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.SelectLabel = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Crud.SelectLabel.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Crud.SelectLabel.prototype.constructor = Runtime.Web.Crud.SelectLabel;
Object.assign(Runtime.Web.Crud.SelectLabel.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.SelectLabel)
		{
		}
		Runtime.Web.Component.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.Component.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Component.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.SelectLabel, Runtime.Web.Component);
Object.assign(Runtime.Web.Crud.SelectLabel,
{
	css: function(vars)
	{
	},
	render: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let value = Runtime.Web.Crud.Helper.getValue(layout, model_path, render_params);
			
			let options = Runtime.rtl.get(render_params, "options");
			
			let item = options.findItem((item) => 
			{
				return Runtime.rtl.get(item, "value") == value;
			});
			
			/* Text */
			let __v0 = __v.e("t", "", null, (item != null) ? (Runtime.rtl.get(item, "label")) : (""));
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.SelectLabel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"css",
			"render",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.SelectLabel);
window["Runtime.Web.Crud.SelectLabel"] = Runtime.Web.Crud.SelectLabel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.SelectLabel;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.StructBuilder = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Crud.StructBuilder.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Crud.StructBuilder.prototype.constructor = Runtime.Web.Crud.StructBuilder;
Object.assign(Runtime.Web.Crud.StructBuilder.prototype,
{
	/**
	 * Returns field value
	 */
	getFieldValue: function(field_name, item, index)
	{
		if (index == undefined) index = 0;
		var value = "";
		var info = Runtime.rtl.get(this.info, field_name);
		if (!info)
		{
			return value;
		}
		var calculate = info.calculate;
		if (calculate)
		{
			value = calculate(item, index);
		}
		else
		{
			value = Runtime.rtl.get(item, field_name);
		}
		return value;
	},
	/**
	 * Add struct
	 */
	addStruct: function(new_info)
	{
		var builder = this;
		builder = Runtime.rtl.setAttr(builder, Runtime.Collection.from(["info"]), builder.info.concat(new_info));
		return builder;
	},
	/**
	 * Add form fields
	 */
	addFormFields: function(new_fields)
	{
		var builder = this;
		builder = Runtime.rtl.setAttr(builder, Runtime.Collection.from(["form_fields"]), builder.form_fields.concat(new_fields));
		return builder;
	},
	/**
	 * Prepend form fields
	 */
	prependFormFields: function(new_fields)
	{
		var builder = this;
		builder = Runtime.rtl.setAttr(builder, Runtime.Collection.from(["form_fields"]), builder.form_fields.prependCollectionIm(new_fields));
		return builder;
	},
	/**
	 * Add table fields
	 */
	addTableFields: function(new_fields)
	{
		var builder = this;
		builder = Runtime.rtl.setAttr(builder, Runtime.Collection.from(["table_fields"]), builder.table_fields.concat(new_fields));
		return builder;
	},
	/**
	 * Prepend table fields
	 */
	prependTableFields: function(new_fields)
	{
		var builder = this;
		builder = Runtime.rtl.setAttr(builder, Runtime.Collection.from(["table_fields"]), builder.table_fields.prependCollectionIm(new_fields));
		return builder;
	},
	/**
	 * Insert table fields
	 */
	insertTableFields: function(field_name_before, new_fields)
	{
		var builder = this;
		var index = builder.table_fields.indexOf(field_name_before);
		var new_table_fields = Runtime.Collection.from([]);
		if (index >= 0)
		{
			new_table_fields = new_table_fields.concat(builder.table_fields.slice(0, index));
		}
		new_table_fields = new_table_fields.concat(new_fields);
		new_table_fields = new_table_fields.concat(builder.table_fields.slice(index));
		builder = Runtime.rtl.setAttr(builder, Runtime.Collection.from(["table_fields"]), new_table_fields);
		return builder;
	},
	/**
	 * Add filter fields
	 */
	addFilterFields: function(new_fields)
	{
		var builder = this;
		builder = Runtime.rtl.setAttr(builder, Runtime.Collection.from(["filter_fields"]), builder.filter_fields.concat(new_fields));
		return builder;
	},
	/**
	 * Add validation rules
	 */
	addRules: function(new_rules)
	{
		var builder = this;
		builder = Runtime.rtl.setAttr(builder, Runtime.Collection.from(["rules"]), builder.rules.concat(new_rules));
		return builder;
	},
	/**
	 * Resolve hooks
	 */
	resolve: function()
	{
		if (this.resolved)
		{
			return this;
		}
		var builder = this;
		builder = Runtime.rtl.setAttr(builder, Runtime.Collection.from(["resolved"]), true);
		return builder;
	},
	/**
	 * Purify data
	 */
	purify: function(item)
	{
		var new_item = new Runtime.Map();
		for (var i = 0;i < this.form_fields.count();i++)
		{
			var field_name = Runtime.rtl.get(this.form_fields, i);
			var value = Runtime.rtl.get(item, field_name);
			var info = Runtime.rtl.get(this.info, field_name);
			if (!info)
			{
				continue;
			}
			if (info.value_type == "")
			{
				continue;
			}
			if (info.virtual)
			{
				continue;
			}
			/* Check show field */
			var is_show = info.is_show;
			if (is_show != null)
			{
				if (!is_show(item))
				{
					continue;
				}
			}
			/* If is string */
			if (info.value_type == "string")
			{
				if (Runtime.rtl.isInt(value) || Runtime.rtl.isBool(value))
				{
					value = Runtime.rtl.toString(value);
				}
				if (!Runtime.rtl.isString(value))
				{
					new_item = Runtime.rtl.setAttr(new_item, Runtime.Collection.from([field_name]), null);
					value = null;
				}
				else if (info.do_trim)
				{
					new_item = Runtime.rtl.setAttr(new_item, Runtime.Collection.from([field_name]), Runtime.rs.trim(value));
				}
				if (!info.nullable && value === null)
				{
					new_item = Runtime.rtl.setAttr(new_item, Runtime.Collection.from([field_name]), "");
					value = "";
				}
			}
			/* If is integer */
			if (info.value_type == "int")
			{
				if (!Runtime.re.match("$[0-9]+^", value))
				{
					new_item = Runtime.rtl.setAttr(new_item, Runtime.Collection.from([field_name]), Runtime.rtl.to(value, {"e":"int"}));
				}
				else
				{
					new_item = Runtime.rtl.setAttr(new_item, Runtime.Collection.from([field_name]), (info.nullable) ? (null) : (0));
				}
			}
		}
		/* Check rules */
		for (var i = 0;i < this.rules.count();i++)
		{
			var rule = Runtime.rtl.get(this.rules, i);
			if (rule instanceof Runtime.Web.Crud.Rules.PurifyRule)
			{
				new_item = rule.purify(new_item);
			}
		}
		if (this.model_name)
		{
			new_item = Runtime.rtl.newInstance(this.model_name, Runtime.Collection.from([new_item]));
		}
		return new_item;
	},
	/**
	 * Validate dict
	 */
	validate: function(item)
	{
		var res = new Runtime.Web.Crud.ValidationResult();
		/* Check form_fields */
		for (var i = 0;i < this.form_fields.count();i++)
		{
			var field_name = Runtime.rtl.get(this.form_fields, i);
			var value = Runtime.rtl.get(item, field_name);
			var info = Runtime.rtl.get(this.info, field_name);
			if (!info)
			{
				continue;
			}
			if (info.virtual)
			{
				continue;
			}
			var is_show = info.is_show;
			if (is_show != null)
			{
				if (!is_show(item))
				{
					continue;
				}
			}
			/* Check value types */
			if (info.value_type != "" && value !== null)
			{
				if (info.value_type == "string" && !Runtime.rtl.isString(value))
				{
					res = res.appendErrorMessage(Runtime.Collection.from([Runtime.rtl.getContext().format("must be string", Runtime.Dict.from({"field_name":field_name})),field_name]));
				}
				if (info.value_type == "int" && !Runtime.rtl.isInt(value))
				{
					res = res.appendErrorMessage(Runtime.Collection.from([Runtime.rtl.getContext().format("must be integer", Runtime.Dict.from({"field_name":field_name})),field_name]));
				}
			}
			/* Check required */
			if (info.required && (value === null || value === ""))
			{
				res = res.appendErrorMessage(Runtime.Collection.from([Runtime.rtl.getContext().format("%field_name% is required", Runtime.Dict.from({"field_name":field_name})),field_name]));
			}
		}
		/* Check rules */
		for (var i = 0;i < this.rules.count();i++)
		{
			var rule = Runtime.rtl.get(this.rules, i);
			if (rule instanceof Runtime.Web.Crud.Rules.ValidationRule)
			{
				if (!rule.validate(item))
				{
					var message = rule.getErrorMessage(item);
					res = res.appendErrorMessage(message);
				}
			}
		}
		return res;
	},
	/**
	 * Validate api
	 */
	validateApi: function(api_result, item)
	{
		var validation_result = this.validate(item);
		if (validation_result.isSuccess())
		{
			return api_result;
		}
		var __v0 = new Runtime.Monad(api_result);
		try{ __v0=(__v0.val!=null && __v0.err==null) ? new Runtime.Monad(__v0.val.fail(new Runtime.Exceptions.ApiException("Ошибка. Проверьте корректность данных"), Runtime.Dict.from({"validation_result":validation_result.toDict()}))) : __v0; } catch (err) { __v0=new Runtime.Monad(null, err); }
		api_result = __v0.value();
		return api_result;
	},
	/**
	 * Returns data
	 */
	data: function(item)
	{
		var new_item = new Runtime.Map();
		for (var i = 0;i < this.form_fields.count();i++)
		{
			var field_name = Runtime.rtl.get(this.form_fields, i);
			var value = Runtime.rtl.get(item, field_name);
			var info = Runtime.rtl.get(this.info, field_name);
			if (!info)
			{
				continue;
			}
			if (info.value_type == "")
			{
				continue;
			}
			if (info.virtual)
			{
				continue;
			}
			/* Check show field */
			var is_show = info.is_show;
			if (is_show != null)
			{
				if (!is_show(item))
				{
					continue;
				}
			}
			new_item.setValue(field_name, value);
		}
		return new_item.toDict();
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.model_name = "";
		this.info = Runtime.Dict.from({});
		this.form_fields = Runtime.Collection.from([]);
		this.table_fields = Runtime.Collection.from([]);
		this.filter_fields = Runtime.Collection.from([]);
		this.rules = Runtime.Collection.from([]);
		this.kind = "";
		this.resolved = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "model_name")return this.model_name;
		else if (k == "info")return this.info;
		else if (k == "form_fields")return this.form_fields;
		else if (k == "table_fields")return this.table_fields;
		else if (k == "filter_fields")return this.filter_fields;
		else if (k == "rules")return this.rules;
		else if (k == "kind")return this.kind;
		else if (k == "resolved")return this.resolved;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.StructBuilder, Runtime.BaseStruct);
Object.assign(Runtime.Web.Crud.StructBuilder,
{
	/**
	 * Build struct
	 */
	build: function(model_name, kind, build_fn)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.Web.Crud.StructBuilder.build", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (kind == undefined) kind = "";
		if (build_fn == undefined) build_fn = null;
		var builder = new Runtime.Web.Crud.StructBuilder(Runtime.Dict.from({"model_name":model_name,"kind":kind}));
		var buildStruct = Runtime.rtl.method(model_name, "buildStruct");
		builder = buildStruct(builder);
		if (build_fn)
		{
			builder = build_fn(builder);
		}
		var __memorize_value = builder.resolve();
		Runtime.rtl._memorizeSave("Runtime.Web.Crud.StructBuilder.build", arguments, __memorize_value);
		return __memorize_value;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.StructBuilder";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("model_name");
		a.push("info");
		a.push("form_fields");
		a.push("table_fields");
		a.push("filter_fields");
		a.push("rules");
		a.push("kind");
		a.push("resolved");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "model_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "info") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["Runtime.Web.Crud.FieldInfo"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "form_fields") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "table_fields") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "filter_fields") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "rules") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "resolved") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getFieldValue",
			"build",
			"addStruct",
			"addFormFields",
			"prependFormFields",
			"addTableFields",
			"prependTableFields",
			"insertTableFields",
			"addFilterFields",
			"addRules",
			"resolve",
			"purify",
			"validate",
			"validateApi",
			"data",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.StructBuilder);
window["Runtime.Web.Crud.StructBuilder"] = Runtime.Web.Crud.StructBuilder;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.StructBuilder;
"use strict;"
/*
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
*/
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.TabItem = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Crud.TabItem.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Crud.TabItem.prototype.constructor = Runtime.Web.Crud.TabItem;
Object.assign(Runtime.Web.Crud.TabItem.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.TabItem)
		{
		}
		Runtime.Web.Component.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.Component.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Component.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.TabItem, Runtime.Web.Component);
Object.assign(Runtime.Web.Crud.TabItem,
{
	css: function(vars)
	{
		return ".tabs__content_item.h-0b1c{" + Runtime.rtl.toStr("display: none;") + Runtime.rtl.toStr("}.tabs__content_item--active.h-0b1c{") + Runtime.rtl.toStr("display: block;") + Runtime.rtl.toStr("}");
	},
	render: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let is_active = model != null && Runtime.rtl.get(render_params, "name") == model.active;
			
			if (render_params.has("href") && is_active || !render_params.has("href"))
			{
				/* Element 'div.tabs__content_item' */
				let __v0 = __v.e("e", "div", {"data-name":Runtime.rtl.get(render_params, "name"),"class":["tabs__content_item", ((is_active) ? ("tabs__content_item--active") : ("")), this.getCssHash()].join(" "),"@elem_name":"tabs__content_item"});
				
				/* Text */
				let __v1 = __v0.e("t", "", null, render_content);
				__v0.p();
			}
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.TabItem";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"css",
			"render",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.TabItem);
window["Runtime.Web.Crud.TabItem"] = Runtime.Web.Crud.TabItem;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.TabItem;
"use strict;"
/*
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
*/
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.Table = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Crud.Table.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Crud.Table.prototype.constructor = Runtime.Web.Crud.Table;
Object.assign(Runtime.Web.Crud.Table.prototype,
{
	/**
 * Row event
 */
	onEvent: function(msg)
	{
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.Table)
		{
		}
		Runtime.Web.Component.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.Component.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Component.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.Table, Runtime.Web.Component);
Object.assign(Runtime.Web.Crud.Table,
{
	css: function(vars)
	{
		return ".web_table.h-97c9{" + Runtime.rtl.toStr("padding: 0; margin: 0;border-spacing: 0;border: 1px solid #ccc;") + Runtime.rtl.toStr("}.web_table.h-97c9 th{") + Runtime.rtl.toStr("background-color: white;") + Runtime.rtl.toStr("}.web_table.h-97c9 td, .web_table.h-97c9 th{") + Runtime.rtl.toStr("text-align: center;vertical-align: center;border-bottom: 1px solid #ccc;padding: 10px;") + Runtime.rtl.toStr("}.web_table.h-97c9 tr:last-child td{") + Runtime.rtl.toStr("border-bottom: 0px;") + Runtime.rtl.toStr("}.web_table.h-97c9 tr:nth-child(even){") + Runtime.rtl.toStr("background-color: #f0f0f0;") + Runtime.rtl.toStr("}.web_table.h-97c9 tr:nth-child(odd){") + Runtime.rtl.toStr("background-color: white;") + Runtime.rtl.toStr("}.web_table__row_pagination.h-97c9 .pagination.h-ddc6{") + Runtime.rtl.toStr("padding: 0; margin: 0;") + Runtime.rtl.toStr("}");
	},
	renderRow: function(component, render_params, render_content, index)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let builder = Runtime.rtl.get(render_params, "builder");
			
			let items = Runtime.rtl.get(model, "items");
			
			let item = Runtime.rtl.get(items, index);
			
			if (builder)
			{
				/* Element 'tr' */
				let __v0 = __v.e("e", "tr", {});
				
				for (let i = 0;i < builder.table_fields.count();i++)
				{
					let field_name = Runtime.rtl.get(builder.table_fields, i);
					
					let field_info = Runtime.rtl.get(builder.info, field_name);
					
					if (field_info)
					{
						let component_settings = field_info.component_settings;
						
						let component_name = field_info.table_component_name;
						
						let value = Runtime.rtl.attr(model, ["items", index, field_name]);
						
						let calculate = field_info.calculate;
						
						if (calculate)
						{
							value = calculate(Runtime.rtl.attr(model, ["items", index]), index);
						}
						
						/* Element 'td' */
						let __v1 = __v0.e("e", "td", {});
						
						if (component_name)
						{
							/* Component '{component_name}' */
							let __v2 = __v1.e("c", component_name, this._merge_attrs({"name":field_name,"value":value,"options":field_info.options,"default_value":field_info.default_value,"crud_action":"table","crud_field_info":field_info,"crud_index":index,"crud_model":model,"@events":field_info.events,"@event:Runtime.Web.Events.BaseEvent":[component,"onEvent"]},component_settings));
						}
						__v1.p();
					}
				}
				__v0.p();
			}
		};
	},
	renderHeader: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let builder = Runtime.rtl.get(render_params, "builder");
			
			if (builder)
			{
				/* Element 'tr' */
				let __v0 = __v.e("e", "tr", {});
				
				for (let i = 0;i < builder.table_fields.count();i++)
				{
					let field_name = Runtime.rtl.get(builder.table_fields, i);
					
					let field_info = Runtime.rtl.get(builder.info, field_name);
					
					if (field_info)
					{
						/* Element 'th' */
						let __v1 = __v0.e("e", "th", {});
						
						/* Text */
						let __v2 = __v1.e("t", "", null, field_info.label);
						__v1.p();
					}
				}
				__v0.p();
			}
		};
	},
	renderPagination: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let page = Runtime.rtl.get(render_params, "page");
			
			let pages = Runtime.rtl.get(render_params, "pages");
			
			let builder = Runtime.rtl.get(render_params, "builder");
			
			if (pages > 1)
			{
				/* Element 'tr' */
				let __v0 = __v.e("e", "tr", {});
				
				/* Element 'td.web_table__row_pagination' */
				let __v1 = __v0.e("e", "td", {"colspan":builder.table_fields.count(),"class":["web_table__row_pagination", this.getCssHash()].join(" "),"@elem_name":"web_table__row_pagination"});
				
				/* Component 'Pagination' */
				let __v2 = __v1.e("c", "Runtime.Web.Crud.Pagination", {"page":page,"pages":pages});
				__v1.p();
				__v0.p();
			}
		};
	},
	render: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let items = Runtime.rtl.get(model, "items");
			
			/* Element 'table.web_table' */
			let __v0 = __v.e("e", "table", {"class":["web_table", this.getCssHash()].join(" "),"@elem_name":"web_table"});
			
			/* Text */
			let __v1 = __v0.e("t", "", null, this.renderHeader(component, render_params, render_content));
			
			if (items)
			{
				for (let i = 0;i < items.count();i++)
				{
					/* Text */
					let __v2 = __v0.e("t", "", null, this.renderRow(component, render_params, render_content, i));
				}
			}
			
			/* Text */
			let __v3 = __v0.e("t", "", null, this.renderPagination(component, render_params, render_content));
			__v0.p();
		};
	},
	components: function()
	{
		return Runtime.Collection.from(["Runtime.Web.Crud.Pagination"]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Table";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"css",
			"renderRow",
			"renderHeader",
			"renderPagination",
			"render",
			"onEvent",
			"components",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Table);
window["Runtime.Web.Crud.Table"] = Runtime.Web.Crud.Table;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Table;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.TabModel = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Crud.TabModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Crud.TabModel.prototype.constructor = Runtime.Web.Crud.TabModel;
Object.assign(Runtime.Web.Crud.TabModel.prototype,
{
	/**
     * Set active
     */
	setActive: function(active)
	{
		return this.clone(Runtime.Dict.from({"active":active}));
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.active = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "active")return this.active;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.TabModel, Runtime.BaseStruct);
Object.assign(Runtime.Web.Crud.TabModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.TabModel";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("active");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "active") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"setActive",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.TabModel);
window["Runtime.Web.Crud.TabModel"] = Runtime.Web.Crud.TabModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.TabModel;
"use strict;"
/*
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
*/
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.Tabs = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Crud.Tabs.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Crud.Tabs.prototype.constructor = Runtime.Web.Crud.Tabs;
Object.assign(Runtime.Web.Crud.Tabs.prototype,
{
	onClick: function(msg)
	{
		if (!this.params.has("href"))
		{
			var name = Runtime.rtl.get(msg.sender.params, "data-name");
			this.commit("setActive", name);
		}
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.Tabs)
		{
		}
		Runtime.Web.Component.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.Component.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Component.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.Tabs, Runtime.Web.Component);
Object.assign(Runtime.Web.Crud.Tabs,
{
	css: function(vars)
	{
		return ".tabs.h-814e{" + Runtime.rtl.toStr("position: relative;") + Runtime.rtl.toStr("}.tabs__header_wrap.h-814e{") + Runtime.rtl.toStr("overflow: hidden;white-space: nowrap;-webkit-overflow-scrolling: touch;") + Runtime.rtl.toStr("}.tabs__header.h-814e{") + Runtime.rtl.toStr("position: relative;border-bottom: 1px #ccc solid;") + Runtime.rtl.toStr("}.tabs__header_item.h-814e{") + Runtime.rtl.toStr("display: inline-block;vertical-align: top;padding: 10px;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;-ms-user-select: none;border-top: 1px transparent solid;border-left: 1px transparent solid;border-right: 1px transparent solid;text-decoration: none;color: inherit;") + Runtime.rtl.toStr("}.tabs__header_item.h-814e:hover, .tabs__header_item.h-814e:visited, .tabs__header_item.h-814e:visited:hover{") + Runtime.rtl.toStr("text-decoration: none;color: inherit;") + Runtime.rtl.toStr("}.tabs__header_item--active.h-814e{") + Runtime.rtl.toStr("background-color: white;border-top: 1px #ccc solid;border-left: 1px #ccc solid;border-right: 1px #ccc solid;") + Runtime.rtl.toStr("}.tabs__content.h-814e{") + Runtime.rtl.toStr("margin-top: 20px;") + Runtime.rtl.toStr("}");
	},
	render: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let tabs = Runtime.rtl.get(render_params, "tabs");
			
			let labels = Runtime.rtl.get(render_params, "labels");
			
			let href = Runtime.rtl.get(render_params, "href");
			
			/* Element 'div.tabs' */
			let __v0 = __v.e("e", "div", {"class":["tabs", this.getCssHash()].join(" "),"@elem_name":"tabs"});
			
			/* Element 'div.tabs__header' */
			let __v1 = __v0.e("e", "div", {"class":["tabs__header", this.getCssHash()].join(" "),"@elem_name":"tabs__header"});
			
			for (let i = 0;i < tabs.count();i++)
			{
				let is_active = model != null && Runtime.rtl.get(tabs, i) == model.active;
				
				if (href == null)
				{
					/* Element 'div.tabs__header_item' */
					let __v2 = __v1.e("e", "div", {"data-name":Runtime.rtl.get(tabs, i),"@event:Runtime.Web.Events.MouseClickEvent":[component,"onClick"],"class":["tabs__header_item", ((is_active) ? ("tabs__header_item--active") : ("")), this.getCssHash()].join(" "),"@elem_name":"tabs__header_item"});
					
					/* Text */
					let __v3 = __v2.e("t", "", null, Runtime.rtl.get(labels, i));
					__v2.p();
				}
				else
				{
					/* Element 'a.tabs__header_item' */
					let __v4 = __v1.e("e", "a", {"data-name":Runtime.rtl.get(tabs, i),"href":Runtime.rtl.get(href, i),"@event:Runtime.Web.Events.MouseClickEvent":[component,"onClick"],"class":["tabs__header_item", ((is_active) ? ("tabs__header_item--active") : ("")), this.getCssHash()].join(" "),"@elem_name":"tabs__header_item"});
					
					/* Text */
					let __v5 = __v4.e("t", "", null, Runtime.rtl.get(labels, i));
					__v4.p();
				}
			}
			__v1.p();
			
			/* Element 'div.tabs__content' */
			let __v6 = __v0.e("e", "div", {"class":["tabs__content", this.getCssHash()].join(" "),"@elem_name":"tabs__content"});
			
			/* Text */
			let __v7 = __v6.e("t", "", null, render_content);
			__v6.p();
			__v0.p();
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.Tabs";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"css",
			"render",
			"onClick",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.Tabs);
window["Runtime.Web.Crud.Tabs"] = Runtime.Web.Crud.Tabs;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.Tabs;
"use strict;"
/*
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
*/
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.TextArea = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Crud.TextArea.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Crud.TextArea.prototype.constructor = Runtime.Web.Crud.TextArea;
Object.assign(Runtime.Web.Crud.TextArea.prototype,
{
	/**
 * On change
 */
	onChange: function(msg)
	{
		if (this.model_path != "")
		{
			var provider = Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
			provider.commitComponent(this, msg.event.value);
		}
		var event = msg.event.clone(Runtime.Dict.from({"field_name":Runtime.rtl.get(this.params, "name")}));
		this.sendEvent(event);
	},
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.TextArea)
		{
		}
		Runtime.Web.Component.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.Component.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Component.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.TextArea, Runtime.Web.Component);
Object.assign(Runtime.Web.Crud.TextArea,
{
	css: function(vars)
	{
		return ".textarea.h-94ab{" + Runtime.rtl.toStr("width: 100%;max-width: 100%;min-height: 400px;padding: 6px 12px;background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "default", "background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(vars, ["colors", "default", "border"])) + Runtime.rtl.toStr(" solid;outline: transparent;")) + Runtime.rtl.toStr("}");
	},
	render: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			let value = Runtime.Web.Crud.Helper.getValue(layout, model_path, render_params);
			
			let name = (render_params != null) ? (render_params.get("name", "")) : ("");
			
			let type = (render_params != null) ? (render_params.get("type", "input")) : ("");
			
			let tag = (render_params != null) ? (render_params.get("@tag", "")) : ("");
			
			/* Element 'textarea.textarea' */
			let __v0 = __v.e("e", "textarea", {"@tag":tag,"@event:Runtime.Web.Events.ChangeEvent":[component,"onChange"],"name":name,"type":type,"value":value,"class":["textarea", this.getCssHash()].join(" "),"@elem_name":"textarea"});
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.TextArea";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"css",
			"render",
			"onChange",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.TextArea);
window["Runtime.Web.Crud.TextArea"] = Runtime.Web.Crud.TextArea;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.TextArea;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.ValidationResult = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Crud.ValidationResult.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Crud.ValidationResult.prototype.constructor = Runtime.Web.Crud.ValidationResult;
Object.assign(Runtime.Web.Crud.ValidationResult.prototype,
{
	/**
	 * Returns true if is success
	 */
	isSuccess: function()
	{
		return this.fields.keys().count() == 0;
	},
	/**
	 * Append error message
	 */
	appendErrorMessage: function(message)
	{
		var res = this;
		var error_message = Runtime.rtl.get(message, 0);
		var fields = message.removeFirstIm();
		for (var i = 0;i < fields.count();i++)
		{
			var field_name = Runtime.rtl.get(fields, i);
			if (!res.fields.has(field_name))
			{
				res = Runtime.rtl.setAttr(res, Runtime.Collection.from(["fields", field_name]), Runtime.Collection.from([]));
			}
			res = Runtime.rtl.setAttr(res, Runtime.Collection.from(["fields", field_name]), Runtime.rtl.get(res.fields, field_name).pushIm(error_message));
		}
		return res;
	},
	/**
	 * Returns api result
	 */
	getResult: function()
	{
		var e = new Runtime.Exceptions.ApiException("Ошибка. Проверьте корректность данных");
		return Runtime.Dict.from({"code":e.getErrorCode(),"message":e.getErrorMessage(),"error_name":e.constructor.getClassName(),"data":Runtime.Dict.from({"validation_result":this.toDict()})});
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.fields = Runtime.Dict.from({});
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "fields")return this.fields;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Crud.ValidationResult, Runtime.BaseStruct);
Object.assign(Runtime.Web.Crud.ValidationResult,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.ValidationResult";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("fields");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "fields") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["Runtime.Collection"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"isSuccess",
			"appendErrorMessage",
			"getResult",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.ValidationResult);
window["Runtime.Web.Crud.ValidationResult"] = Runtime.Web.Crud.ValidationResult;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.ValidationResult;
"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Crud == 'undefined') Runtime.Web.Crud = {};
Runtime.Web.Crud.ModuleDescription = function()
{
};
Object.assign(Runtime.Web.Crud.ModuleDescription.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Runtime.Web.Crud.ModuleDescription)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Runtime.Web.Crud.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function()
	{
		return "Runtime.Web.Crud";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function()
	{
		return "0.1.0";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function()
	{
		return Runtime.Dict.from({});
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return Runtime.Collection.from([new Runtime.Entity.Hook("Runtime.Web.Crud.Hooks.AppHook")]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Web.Crud.ModuleDescription";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getModuleName",
			"getModuleVersion",
			"requiredModules",
			"entities",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Crud.ModuleDescription);
window["Runtime.Web.Crud.ModuleDescription"] = Runtime.Web.Crud.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Crud.ModuleDescription;
