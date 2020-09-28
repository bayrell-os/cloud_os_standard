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
Runtime.rtl = function(ctx)
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
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.rtl)
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.rtl";
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
	ERROR_FATAL: -99,
	ERROR_HTTP_CONTINUE: -100,
	ERROR_HTTP_SWITCH: -101,
	ERROR_HTTP_PROCESSING: -102,
	ERROR_HTTP_OK: -200,
	ERROR_HTTP_BAD_GATEWAY: -502,
	_memorize_cache: null,
	_memorize_not_found: null,
	_memorize_hkey: null,
	isBrowser: function()
	{
		return typeof window !== "undefined";
		return false;
	},
	/**
	 * Define props
	 */
	defProp: function(obj, name)
	{
		Object.defineProperty
		(
			obj,
			name,
			{
				get:() => { return obj["__" + name] },
				set:(value) => {
					var AssignStructValueError = use("Runtime.Exceptions.AssignStructValueError");
					throw new AssignStructValueError(null, name); 
				}
			}
		);
	},
	/**
	 * Define class
	 */
	defClass: function(obj)
	{
		if (Runtime.rtl._classes == undefined) Runtime.rtl._classes = {};
		Runtime.rtl._classes[obj.getCurrentClassName()] = obj;
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
	is_instanceof: function(ctx, obj, class_name)
	{
		var c = this.find_class(class_name);
		if (c == null) return false;
		return c.prototype.isPrototypeOf(obj);
	},
	/**
	 * Returns true if obj implements interface_name
	 * @return bool
	 */
	is_implements: function(ctx, obj, interface_name)
	{
		if (obj == undefined) return false;
		if (obj.constructor.__implements__ == undefined) return false;
		return obj.constructor.__implements__.indexOf(interface_name) != -1;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	class_exists: function(ctx, class_name)
	{
		var obj = this.find_class(class_name);
		if (!this.exists(ctx, obj)) return false;
		return true;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	class_implements: function(ctx, class_name, interface_name)
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
	getInterfaces: function(ctx, class_name)
	{
		return this.find_class(class_name).__implements__;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	method_exists: function(ctx, class_name, method_name)
	{
		if (typeof(class_name) == "object")
		{
			if (class_name[method_name] != undefined) return true;
			return false;
		}
		
		var obj = this.find_class(class_name);
		if (!this.exists(ctx, obj)) return false;
		if (this.exists(ctx, obj[method_name])) return true;
		return false;
	},
	/**
	 * Create object by class_name. If class name does not exists return null
	 * @return Object
	 */
	newInstance: function(ctx, class_name, args)
	{
		if (args == undefined) args = null;
		var obj = this.find_class(class_name);
		if (!this.exists(ctx, obj)) return null;
		if (!(obj instanceof Function)) return null;
		if (args == undefined || args == null) args = [];
		args = args.slice(); 
		args.unshift(ctx);
		args.unshift(null);
		var f = Function.prototype.bind.apply(obj, args);
		return new f;
	},
	/**
	 * Returns callback
	 * @return fn
	 */
	method: function(ctx, obj, method_name)
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
	apply: function(ctx, f, args)
	{
		var res;
		if (args == null) args = [];
		else args = Array.prototype.slice.call(args);
		
		args.unshift(ctx);
		if (this.isString(ctx, f))
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
	applyAsync: async function(ctx, f, args)
	{
		await f.apply(null, args);
	},
	/**
	 * Run thread
	 */
	runThread: function(ctx, f, args)
	{
		if (args == undefined) args = null;
		if (args == null)
		{
			args = Runtime.Collection.from([]);
		}
		(async () => {
			try { args = args.prependIm(ctx); await f.apply(args); }
			catch (e) { console.log(e.stack); }
		})();
	},
	/**
	 * Returns value
	 */
	get: function(ctx, item, key, def_val)
	{
		if (def_val == undefined) def_val = null;
		if (item === null)
		{
			return def_val;
		}
		if (item == undefined) return def_val;
		if (item instanceof Runtime.Dict ||
			item instanceof Runtime.Collection ||
			item instanceof Runtime.BaseStruct
		)
		{
			return item.get(ctx, key, def_val);
		}
		return item[key];
		return def_val;
	},
	/**
	 * Returns callback
	 * @return var
	 */
	attr: function(ctx, item, path, def_val)
	{
		if (def_val == undefined) def_val = null;
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var BaseStruct = use("Runtime.BaseStruct");
		
		if (def_val == undefined) def_val = null;
		if (item === null) return def_val;
		if (typeof path == "string") path = Collection.from([path]);
		else if (Array.isArray(path) && path.count == undefined) path = Collection.from(path);
		if (!(path instanceof Collection)) return def_val;
		if (path.count() == 0)
		{
			return item;
		}
		var key = path.first(ctx);
		var path = path.removeFirstIm(ctx);
		var val = def_val;
		if (item instanceof Dict || item instanceof Collection)
		{
			item = item.get(ctx, key, def_val);
			val = this.attr(ctx, item, path, def_val);
			return val;
		}
		else if (item instanceof BaseStruct)
		{
			item = item.takeValue(ctx, key, def_val);
			val = this.attr(ctx, item, path, def_val);
			return val;
		}
		return val;
	},
	/**
	 * Update current item
	 * @return var
	 */
	setAttr: function(ctx, item, attrs, new_value)
	{
		var Collection = use("Runtime.Collection");
		if (typeof attrs == "string") attrs = Collection.from([attrs]);
		else if (Array.isArray(attrs) && attrs.count == undefined) attrs = Collection.from(attrs);
		var f = (ctx, attrs, data, new_value, f) => 
		{
			if (attrs.count(ctx) == 0)
			{
				return new_value;
			}
			if (data == null)
			{
				data = Runtime.Dict.from({});
			}
			var new_data = null;
			var attr_name = attrs.first(ctx);
			if (data instanceof Runtime.BaseStruct)
			{
				var attr_data = data.get(ctx, attr_name, null);
				var res = f(ctx, attrs.removeFirstIm(ctx), attr_data, new_value, f);
				new_data = data.copy(ctx, (new Runtime.Map(ctx)).set(ctx, attr_name, res));
			}
			else if (data instanceof Runtime.Dict)
			{
				var attr_data = data.get(ctx, attr_name, null);
				var res = f(ctx, attrs.removeFirstIm(ctx), attr_data, new_value, f);
				new_data = data.setIm(ctx, attr_name, res);
			}
			else if (data instanceof Runtime.Collection)
			{
				var attr_data = data.get(ctx, attr_name, null);
				var res = f(ctx, attrs.removeFirstIm(ctx), attr_data, new_value, f);
				new_data = data.setIm(ctx, attr_name, res);
			}
			return new_data;
		};
		var new_item = f(ctx, attrs, item, new_value, f);
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
		var e = o.e;
		if (e == "mixed" || e == "primitive" || e == "var" || e == "fn" || e == "callback")
		{
			return v;
		}
		if (e == "bool")
		{
			return this.toBool(null, v);
		}
		else if (e == "string")
		{
			return this.toString(null, v);
		}
		else if (e == "int")
		{
			return this.toInt(null, v);
		}
		else if (e == "float")
		{
			return this.toFloat(null, v);
		}
		else if (Runtime.rtl.is_instanceof(null, v, e))
		{
			return v;
		}
		return v;
	},
	/**
	 * Convert monad by type
	 */
	m_to: function(ctx, type_value, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (ctx, m) => 
		{
			return new Runtime.Monad(ctx, (m.err == null) ? (this.convert(m.val, type_value, def_value)) : (def_value));
		};
	},
	/**
	 * Convert monad to default value
	 */
	m_def: function(ctx, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (ctx, m) => 
		{
			return (m.err != null || m.val === null) ? (new Runtime.Monad(ctx, def_value)) : (m);
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
		if (v == null)
		{
			v = d;
		}
		if (t == "mixed" || t == "primitive" || t == "var" || t == "fn" || t == "callback")
		{
			return v;
		}
		if (t == "bool" || t == "boolean")
		{
			return this.toBool(null, v);
		}
		else if (t == "string")
		{
			return this.toString(null, v);
		}
		else if (t == "int")
		{
			return this.toInt(null, v);
		}
		else if (t == "float" || t == "double")
		{
			return this.toFloat(null, v);
		}
		else if (Runtime.rtl.is_instanceof(null, v, t))
		{
			return v;
		}
		return d;
	},
	/**
	 * Returns true if value instanceof tp
	 * @param var value
	 * @param string tp
	 * @return bool
	 */
	checkValue: function(ctx, value, tp)
	{
		if (tp == "int")
		{
			return Runtime.rtl.isInt(ctx, value);
		}
		if (tp == "float" || tp == "double")
		{
			return Runtime.rtl.isDouble(ctx, value);
		}
		if (tp == "string")
		{
			return Runtime.rtl.isString(ctx, value);
		}
		if (tp == "bool" || tp == "boolean")
		{
			return Runtime.rtl.isBoolean(ctx, value);
		}
		if (Runtime.rtl.is_instanceof(ctx, value, tp))
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
	isEmpty: function(ctx, value)
	{
		return !this.exists(ctx, value) || value === null || value === "" || value === false || value === 0;
	},
	/**
	 * Return true if value is exists
	 * @param var value
	 * @return bool
	 */
	exists: function(ctx, value)
	{
		return (value != null) && (value != undefined);
	},
	/**
	 * Returns true if value is scalar value
	 * @return bool 
	 */
	isScalarValue: function(ctx, value)
	{
		if (value == null)
		{
			return true;
		}
		if (Runtime.rtl.isString(ctx, value))
		{
			return true;
		}
		if (Runtime.rtl.isNumber(ctx, value))
		{
			return true;
		}
		if (Runtime.rtl.isBoolean(ctx, value))
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
	isBoolean: function(ctx, value)
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
	isBool: function(ctx, value)
	{
		return this.isBoolean(ctx, value);
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isInt: function(ctx, value)
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
	isDouble: function(ctx, value)
	{
		if (typeof value == "number") return true;
		return false;
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isNumber: function(ctx, value)
	{
		if (typeof value == "number") return true;
		return false;
	},
	/**
	 * Return true if value is string
	 * @param var value
	 * @return bool
	 */
	isString: function(ctx, value)
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
	isFn: function(ctx, value)
	{
		if (typeof(value) == 'function') return true;
		return false;
	},
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	toString: function(ctx, value)
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
		return this.toString(null, value);
	},
	/**
	 * Convert value to int
	 * @param var value
	 * @return int
	 */
	toInt: function(ctx, val)
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
	toBool: function(ctx, val)
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
	toFloat: function(ctx, val)
	{
		var res = parseFloat(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return 0;
	},
	/**
	 * Round up
	 * @param double value
	 * @return int
	 */
	ceil: function(ctx, value)
	{
		return Math.ceil(value);
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	floor: function(ctx, value)
	{
		return Math.floor(value);
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	round: function(ctx, value)
	{
		return Math.round(value);
	},
	/**
	 * Json encode data
	 * @param var data
	 * @return string
	 */
	json_encode: function(ctx, data)
	{
		var f = this.method(ctx, "Runtime.RuntimeUtils", "json_encode");
		return f(ctx, data);
	},
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return var
	 */
	json_decode: function(ctx, obj)
	{
		var f = this.method(ctx, "Runtime.RuntimeUtils", "json_decode");
		return f(ctx, obj);
	},
	/* ====================== Chains ====================== */
	/**
	 * Apply async chain
	 */
	chainAsync: async function(ctx, chain, args)
	{
		for (var i = 0;i < chain.count(ctx);i++)
		{
			var chain_name = chain.item(ctx, i);
			args = await Runtime.rtl.apply(ctx, chain_name, args);
		}
		return Promise.resolve(args);
	},
	/**
	 * Apply chain
	 */
	chain: function(ctx, chain, args)
	{
		for (var i = 0;i < chain.count(ctx);i++)
		{
			var chain_name = chain.item(ctx, i);
			args = Runtime.rtl.apply(ctx, chain_name, args);
		}
		return args;
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
	sleep: async function(ctx, time)
	{
		await new Promise((f, e) => setTimeout(f, time));
	},
	/**
	 * Sleep in microseconds
	 */
	usleep: async function(ctx, time)
	{
		setTimeout
		(
			(function (__async_t)
			{
				return function()
				{
					__async_t.resolve(ctx, null);
				};
			})(__async_t),
			Math.round(time / 1000)
		);
		return;
	},
	/**
	 * Returns unique value
	 * @param bool flag If true returns as text. Default true
	 * @return string
	 */
	unique: function(ctx, flag)
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
	uid: function(ctx)
	{
	},
	/**
	 * Generate timestamp based uuid
	 */
	time_uid: function(ctx)
	{
	},
	/**
	 * Returns random value x, where a <= x <= b
	 * @param int a
	 * @param int b
	 * @return int
	 */
	random: function(ctx, a, b)
	{
		if (window != undefined && window.crypto != undefined && window.crypto.getRandomValues != undefined)
		{
			var s = new Uint32Array(1);
			window.crypto.getRandomValues(s);
			return Math.floor(s[0] / 4294967296 * (b - a + 1) + a);
		}
		return Math.floor(Math.random() * (b - a + 1) + a);
	},
	/**
	 * Returns current unix time in seconds
	 * @return int
	 */
	time: function(ctx)
	{
		return Math.round((new Date()).getTime() / 1000);
	},
	/**
	 * Returns unix timestamp
	 */
	utime: function(ctx)
	{
		return (new Date()).getTime() * 1000;
	},
	/**
	 * Clone var
	 * @param {var} value - Variable
	 * @return {var} result
	 */
	clone: function(ctx, val)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var BaseObject = use("Runtime.BaseObject");
		var BaseStruct = use("Runtime.BaseStruct");
		var FakeStruct = use("Runtime.FakeStruct");
		var Reference = use("Runtime.Reference");
		
		if (val == null)
			return null;
		
		else if (val instanceof Number || typeof val == "number")
		{
			return val;
		}
		else if (val instanceof String || typeof val == "string")
		{
			return (new String(val)).toString();
		}
		else if (val instanceof Boolean || typeof val == "boolean")
		{
			return val;
		}
		else if (typeof val == "symbol")
		{
			return Symbol();
		}
		else if (val instanceof Date)
		{
			return new Date(val);
		}
		else if (typeof val == 'object' && val.nodeType && typeof val.cloneNode == "function")
		{
			return val.cloneNode(true);
		}
		else if (val instanceof Collection)
		{
			var res = val.constructor.Instance();
			for (var i=0;i<val.length;i++)
			{
				res.push(ctx, this.clone(ctx, val[i]));
			}
			return res;
		}
		else if (val instanceof Dict)
		{
			var res = val.constructor.Instance();
			for (var key in val._map)
			{
				res._map[key] = this.clone(ctx, val._map[key]);
			}
			return res;
		}
		else if (Array.isArray(val))
		{	
			var proto = Object.getPrototypeOf(val);
			var res = Object.create(proto);
			for (var i=0;i<val.length;i++)
			{
				res.push(ctx, this.clone(ctx, val[i]));
			}
			return res;
		}
		else if (val instanceof BaseStruct)
		{
			return val;
		}
		else if (val instanceof FakeStruct)
		{
			return val.clone(ctx);
		}
		else if (val instanceof Reference)
		{
			return new Reference(ctx, val.ref);
		}
		else if (val instanceof BaseObject || typeof val == 'object')
		{
			var proto = Object.getPrototypeOf(val);
			var res = Object.create(proto);
			var a = Object.getOwnPropertyNames(val);
			for (var i=0;i<a.length;i++)
			{
				var key = a[i];
				res[key] = this.clone(ctx, val[key]);
			}
			return res;
		}
		
		return null;
	},
	/**
	 * Convert to timestamp
	 */
	timestamp: function(ctx, s)
	{
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.rtl";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.rtl",
			"name": "Runtime.rtl",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "LOG_FATAL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_CRITICAL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_ERROR") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_WARNING") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_INFO") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_DEBUG") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_DEBUG2") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STATUS_PLAN") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STATUS_DONE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STATUS_PROCESS") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STATUS_FAIL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_NULL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_OK") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_PROCCESS") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_FALSE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_UNKNOWN") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_INDEX_OUT_OF_RANGE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_KEY_NOT_FOUND") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_STOP_ITERATION") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_FILE_NOT_FOUND") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_ITEM_NOT_FOUND") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_OBJECT_DOES_NOT_EXISTS") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_OBJECT_ALLREADY_EXISTS") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_ASSERT") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_REQUEST") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_RESPONSE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_CSRF_TOKEN") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_RUNTIME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_VALIDATION") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_PARSE_SERIALIZATION_ERROR") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_ASSIGN_DATA_STRUCT_VALUE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_AUTH") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_DUPLICATE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_API_NOT_FOUND") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_API_WRONG_FORMAT") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_API_WRONG_APP_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_FATAL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_CONTINUE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_SWITCH") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_PROCESSING") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_OK") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_BAD_GATEWAY") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "_memorize_cache") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "_memorize_not_found") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "_memorize_hkey") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
/* Lambda Functions */
Runtime.lib = function(ctx)
{
};
Object.assign(Runtime.lib.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.lib)
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.lib";
	},
});
Object.assign(Runtime.lib,
{
	/**
	 * Check object is istance
	 */
	isInstance: function(ctx, class_name)
	{
		return (ctx, item) => 
		{
			return Runtime.rtl.is_instanceof(ctx, item, class_name);
		};
	},
	/**
	 * Check object is implements interface
	 */
	isImplements: function(ctx, class_name)
	{
		return (ctx, item) => 
		{
			return Runtime.rtl.is_implements(ctx, item, class_name);
		};
	},
	/**
	 * Check class is implements interface
	 */
	classImplements: function(ctx, class_name)
	{
		return (ctx, item) => 
		{
			return Runtime.rtl.class_implements(ctx, item, class_name);
		};
	},
	/**
	 * Create struct
	 */
	createStruct: function(ctx, class_name)
	{
		return (ctx, data) => 
		{
			return Runtime.rtl.newInstance(ctx, class_name, Runtime.Collection.from([data]));
		};
	},
	/**
	 * Equal two struct by key
	 */
	equal: function(ctx, value)
	{
		return (ctx, item) => 
		{
			return item == value;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalNot: function(ctx, value)
	{
		return (ctx, item) => 
		{
			return item != value;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalAttr: function(ctx, key, value)
	{
		return (ctx, item1) => 
		{
			return (item1 != null) ? (Runtime.rtl.attr(ctx, item1, key) == value) : (false);
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalNotAttr: function(ctx, key, value)
	{
		return (ctx, item1) => 
		{
			return (item1 != null) ? (Runtime.rtl.attr(ctx, item1, key) != value) : (false);
		};
	},
	equalAttrNot: function(ctx, key, value)
	{
		return this.equalNotAttr;
	},
	/**
	 * Equal attrs
	 */
	equalAttrs: function(ctx, search)
	{
		return (ctx, item) => 
		{
			var fields = search.keys(ctx);
			for (var i = 0;i < fields.count(ctx);i++)
			{
				var field_name = Runtime.rtl.get(ctx, fields, i);
				if (Runtime.rtl.get(ctx, search, field_name) != Runtime.rtl.get(ctx, item, field_name))
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
	equalMethod: function(ctx, method_name, value)
	{
		return (ctx, item1) => 
		{
			if (item1 == null)
			{
				return false;
			}
			var f = Runtime.rtl.method(item1, method_name);
			return f(ctx) == value;
		};
	},
	/**
	 * Returns key value of obj
	 */
	get: function(ctx, key, def_value)
	{
		return (ctx, obj) => 
		{
			return Runtime.rtl.attr(ctx, obj, Runtime.Collection.from([key]), def_value);
		};
	},
	/**
	 * Set value
	 */
	set: function(ctx, key, value)
	{
		return (ctx, obj) => 
		{
			return Runtime.rtl.setAttr(ctx, obj, Runtime.Collection.from([key]), value);
		};
	},
	/**
	 * Returns attr of item
	 */
	attr: function(ctx, path, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (ctx, obj) => 
		{
			return Runtime.rtl.attr(ctx, obj, path, def_value);
		};
	},
	/**
	 * Set dict attr
	 */
	setAttr: function(ctx, path, value)
	{
		return (ctx, obj) => 
		{
			return Runtime.rtl.setAttr(ctx, obj, path, value);
		};
	},
	/**
	 * Returns max id from items
	 */
	getMaxIdFromItems: function(ctx, items, start)
	{
		if (start == undefined) start = 0;
		return items.reduce(ctx, (ctx, value, item) => 
		{
			return (item.id > value) ? (item.id) : (value);
		}, start);
	},
	/**
	 * Copy object
	 */
	copy: function(ctx, d)
	{
		return (ctx, item) => 
		{
			return item.copy(ctx, d);
		};
	},
	/**
	 * Take dict
	 */
	takeDict: function(ctx, fields)
	{
		return (ctx, item) => 
		{
			return item.takeDict(ctx, fields);
		};
	},
	/**
	 * Map
	 */
	map: function(ctx, f)
	{
		return (ctx, m) => 
		{
			return m.map(ctx, f);
		};
	},
	/**
	 * Filter
	 */
	filter: function(ctx, f)
	{
		return (ctx, m) => 
		{
			return m.filter(ctx, f);
		};
	},
	/**
	 * Intersect
	 */
	intersect: function(ctx, arr)
	{
		return (ctx, m) => 
		{
			return m.intersect(ctx, arr);
		};
	},
	/**
	 * Sort
	 */
	sort: function(ctx, f)
	{
		return (ctx, m) => 
		{
			return m.sortIm(ctx, f);
		};
	},
	/**
	 * Transition
	 */
	transition: function(ctx, f)
	{
		return (ctx, m) => 
		{
			return m.transition(ctx, f);
		};
	},
	/**
	 * Sort asc
	 */
	sortAsc: function(ctx, a, b)
	{
		return (a > b) ? (1) : ((a < b) ? (-1) : (0));
	},
	/**
	 * Sort desc
	 */
	sortDesc: function(ctx, a, b)
	{
		return (a > b) ? (-1) : ((a < b) ? (1) : (0));
	},
	/**
	 * Sort attr
	 */
	sortAttr: function(ctx, field_name, f)
	{
		return (ctx, a, b) => 
		{
			var a = Runtime.rtl.get(ctx, a, field_name);
			var b = Runtime.rtl.get(ctx, b, field_name);
			if (f == "asc")
			{
				return (a > b) ? (1) : ((a < b) ? (-1) : (0));
			}
			if (f == "desc")
			{
				return (a > b) ? (-1) : ((a < b) ? (1) : (0));
			}
			return f(ctx, a, b);
		};
	},
	/**
	 * Convert monad by type
	 */
	to: function(ctx, type_value, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (ctx, m) => 
		{
			return new Runtime.Monad(ctx, (m.err == null) ? (Runtime.rtl.convert(m.value(ctx), type_value, def_value)) : (def_value));
		};
	},
	/**
	 * Convert monad by type
	 */
	default: function(ctx, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (ctx, m) => 
		{
			return (m.err != null || m.val === null) ? (new Runtime.Monad(ctx, def_value)) : (m);
		};
	},
	/**
	 * Set monad new value
	 */
	newValue: function(ctx, value, clear_error)
	{
		if (value == undefined) value = null;
		if (clear_error == undefined) clear_error = false;
		return (ctx, m) => 
		{
			return (clear_error == true) ? (new Runtime.Monad(ctx, value)) : ((m.err == null) ? (new Runtime.Monad(ctx, value)) : (m));
		};
	},
	/**
	 * Clear error
	 */
	clearError: function(ctx)
	{
		return (ctx, m) => 
		{
			return new Runtime.Monad(ctx, m.val);
		};
	},
	/**
	 * Returns monad
	 */
	monad: function(ctx, m)
	{
		return m;
	},
	/**
	 * Get method from class
	 * @return fn
	 */
	method: function(ctx, method_name)
	{
		return (ctx, class_name) => 
		{
			return Runtime.rtl.method(ctx, class_name, method_name);
		};
	},
	/**
	 * Apply function
	 * @return fn
	 */
	applyMethod: function(ctx, method_name, args)
	{
		if (args == undefined) args = null;
		return (ctx, class_name) => 
		{
			var f = Runtime.rtl.method(ctx, class_name, method_name);
			return Runtime.rtl.apply(ctx, f, args);
		};
	},
	/**
	 * Apply async function
	 * @return fn
	 */
	applyMethodAsync: function(ctx, method_name, args)
	{
		if (args == undefined) args = null;
		return async (ctx, class_name) => 
		{
			var f = Runtime.rtl.method(ctx, class_name, method_name);
			return Promise.resolve(Runtime.rtl.apply(ctx, f, args));
		};
	},
	/**
	 * Apply function
	 * @return fn
	 */
	apply: function(ctx, args)
	{
		if (args == undefined) args = null;
		return (ctx, f) => 
		{
			return Runtime.rtl.apply(ctx, f, args);
		};
	},
	/**
	 * Apply async function
	 * @return fn
	 */
	applyAsync: function(ctx, args)
	{
		if (args == undefined) args = null;
		return async (ctx, f) => 
		{
			return await Runtime.rtl.applyAsync(ctx, f, args);
		};
	},
	/**
	 * Log message
	 * @return fn
	 */
	log: function(ctx, message)
	{
		if (message == undefined) message = "";
		return (ctx, value) => 
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
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.lib";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.lib",
			"name": "Runtime.lib",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.re = function(ctx)
{
};
Object.assign(Runtime.re.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.re)
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.re";
	},
});
Object.assign(Runtime.re,
{
	/**
	 * Search regular expression
	 * @param string r regular expression
	 * @param string s string
	 * @return bool
	 */
	match: function(ctx, r, s)
	{
		return s.match( new RegExp(r, "g") ) != null;
	},
	/**
	 * Search regular expression
	 * @param string r regular expression
	 * @param string s string
	 * @return Vector result
	 */
	matchAll: function(ctx, r, s)
	{
		var arr = [...s.matchAll( new RegExp(r, "g") )];
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
	replace: function(ctx, r, replace, s)
	{
		return s.replace(new RegExp(r, "g"), replace);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.re";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.re",
			"name": "Runtime.re",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.rs = function(ctx)
{
};
Object.assign(Runtime.rs.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.rs)
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.rs";
	},
});
Object.assign(Runtime.rs,
{
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	strlen: function(ctx, s)
	{
		return use("Runtime.rtl").toStr(s).length;
		/*
		if (isBrowser())
			return Runtime.rtl.toStr(s).length;
		return rtl.toStr(s).length;
		*/
	},
	/**
	 * Search 'search' in s.
	 */
	search: function(ctx, s, search, offset)
	{
		if (offset == undefined) offset = 0;
		var _rtl = use("Runtime.rtl");
		/*
		if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		if (!_rtl.exists(offset)) offset = 0;
		*/
		var res = _rtl.toStr(s).indexOf(search);
		return res;
	},
	/**
	 * Is start
	 */
	start: function(ctx, s, search)
	{
		return this.search(ctx, s, search) == 0;
	},
	/**
	 * Returns substring
	 * @param string s The string
	 * @param int start
	 * @param int length
	 * @return string
	 */
	substr: function(ctx, s, start, length)
	{
		if (length == undefined) length = null;
		/*
		var _rtl = null; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		var _rs = null; if (isBrowser()) _rs = Runtime.rs; else _rs = rs;
		*/
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
	charAt: function(ctx, s, pos)
	{
		var sz = this.strlen(ctx, s);
		if (pos >= 0 && pos < sz)
		{
			return this.substr(ctx, s, pos, 1);
		}
		return "";
	},
	/**
	 * Returns ASCII symbol code
	 * @param char ch
	 */
	ord: function(ctx, ch)
	{
		/*
		if (isBrowser())
			return Runtime.rtl.toStr(ch).charCodeAt(0);
		return rtl.toStr(ch).charCodeAt(0);
		*/
		
		return use("Runtime.rtl").toStr(ch).charCodeAt(0);
	},
	/**
	 * Convert string to lower case
	 * @param string s 
	 * @return string
	 */
	strtolower: function(ctx, s)
	{
		/*
		if (isBrowser())
			return Runtime.rtl.toStr(s).toLowerCase();
		return rtl.toStr(s).toLowerCase();
		*/
		
		return use("Runtime.rtl").toStr(s).toLowerCase();
	},
	/**
	 * Convert string to upper case
	 * @param string s
	 * @return string
	 */
	strtoupper: function(ctx, s)
	{
		/*
		if (isBrowser())
			return Runtime.rtl.toStr(s).toUpperCase();
		return rtl.toStr(s).toUpperCase();
		*/
		
		return use("Runtime.rtl").toStr(s).toUpperCase();
	},
	/**
	 * Заменяет одну строку на другую
	 */
	replace: function(ctx, search, item, s)
	{
		return s.replace(new RegExp(search, "g"), item);
	},
	/**
	 * Возвращает повторяющуюся строку
	 * @param {string} s - повторяемая строка
	 * @param {integer} n - количество раз, которые нужно повторить строку s
	 * @return {string} строка
	 */
	str_repeat: function(ctx, s, n)
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
	split: function(ctx, delimiter, s, limit)
	{
		if (limit == undefined) limit = -1;
		/*
		var _rtl; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		var _Collection; if (isBrowser()) _Collection = Runtime.Collection; else _Collection = Collection;
		*/
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
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Collection<string>
	 */
	splitArr: function(ctx, delimiters, s, limit)
	{
		if (limit == undefined) limit = -1;
		/*
		var _rtl; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		var _Collection; if (isBrowser()) _Collection = Runtime.Collection; else _Collection = Collection;
		*/
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
	join: function(ctx, ch, arr)
	{
		if (arr == null) return "";
		return Array.prototype.join.call(arr, ch);
	},
	/**
	 * Удаляет лишние символы слева и справа
	 * @param {string} s - входная строка
	 * @return {integer} новая строка
	 */
	trim: function(ctx, s, ch)
	{
		if (ch == undefined) ch = "";
		if (ch == undefined) ch = "";
		
		/*
		if (isBrowser()) s = Runtime.rtl.toStr(s);
		else s = rtl.toStr(s);
		*/
		
		s = use("Runtime.rtl").toStr(s);
		
		if (ch == ""){
			return s.trim();
		}
		return s.replace(new RegExp("^[" + ch + "]+", "g"),"").replace(new RegExp("[" + ch + "]+$", "g"),"");
	},
	/**
	 * json encode scalar values
	 * @param {mixed} obj - объект
	 * @param {int} flags - Флаги
	 * @return {string} json строка
	 */
	json_encode_primitive: function(ctx, s, flags)
	{
		if (flags & 128 == 128) 
			return JSON.stringify(obj, null, 2);
		return JSON.stringify(obj);
	},
	/**
	 * Json encode data
	 * @param var data
	 * @return string
	 */
	json_encode: function(ctx, data)
	{
		var f = Runtime.rtl.method(ctx, "Runtime.RuntimeUtils", "json_encode");
		return f(ctx, data);
	},
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return var
	 */
	json_decode: function(ctx, obj)
	{
		var f = Runtime.rtl.method(ctx, "Runtime.RuntimeUtils", "json_decode");
		return f(ctx, obj);
	},
	/**
	 * Escape HTML special chars
	 * @param string s
	 * @return string
	 */
	htmlEscape: function(ctx, s)
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
	escapeHtml: function(ctx, s)
	{
		return this.htmlEscape(ctx, s);
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
	pathinfo: function(ctx, filepath)
	{
		var arr1 = this.explode(ctx, ".", filepath).toVector(ctx);
		var arr2 = this.explode(ctx, "/", filepath).toVector(ctx);
		var filepath = filepath;
		var extension = arr1.pop(ctx);
		var basename = arr2.pop(ctx);
		var dirname = this.join(ctx, "/", arr2);
		var ext_length = this.strlen(ctx, extension);
		if (ext_length > 0)
		{
			ext_length++;
		}
		var filename = this.substr(ctx, basename, 0, -1 * ext_length);
		return new Runtime.PathInfo(ctx, Runtime.Dict.from({"filepath":filepath,"extension":extension,"basename":basename,"dirname":dirname,"filename":filename}));
	},
	/**
	 * Возвращает имя файла без расширения
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	filename: function(ctx, filepath)
	{
		var ret = Runtime.rs.pathinfo(ctx, filepath);
		var res = ret.basename;
		var ext = ret.extension;
		if (ext != "")
		{
			var sz = 0 - Runtime.rs.strlen(ctx, ext) - 1;
			res = Runtime.rs.substr(ctx, res, 0, sz);
		}
		return res;
	},
	/**
	 * Возвращает полное имя файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	basename: function(ctx, filepath)
	{
		var ret = Runtime.rs.pathinfo(ctx, filepath);
		var res = ret.basename;
		return res;
	},
	/**
	 * Возвращает расширение файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} расширение файла
	 */
	extname: function(ctx, filepath)
	{
		var ret = Runtime.rs.pathinfo(ctx, filepath);
		var res = ret.extension;
		return res;
	},
	/**
	 * Возвращает путь к папке, содержащий файл
	 * @param {string} filepath - путь к файлу
	 * @return {string} путь к папке, содержащий файл
	 */
	dirname: function(ctx, filepath)
	{
		var ret = Runtime.rs.pathinfo(ctx, filepath);
		var res = ret.dirname;
		return res;
	},
	/**
	 * Returns relative path of the filepath
	 * @param string filepath
	 * @param string basepath
	 * @param string ch - Directory separator
	 * @return string relative path
	 */
	relativePath: function(ctx, filepath, basepath, ch)
	{
		if (ch == undefined) ch = "/";
		var source = Runtime.rs.explode(ctx, ch, filepath);
		var base = Runtime.rs.explode(ctx, ch, basepath);
		source = source.filter(ctx, (ctx, s) => 
		{
			return s != "";
		});
		base = base.filter(ctx, (ctx, s) => 
		{
			return s != "";
		});
		var i = 0;
		while (source.count(ctx) > 0 && base.count(ctx) > 0 && source.item(ctx, 0) == base.item(ctx, 0))
		{
			source.shift(ctx);
			base.shift(ctx);
		}
		base.each(ctx, (ctx, s) => 
		{
			source.unshift(ctx, "..");
		});
		return Runtime.rs.implode(ctx, ch, source);
	},
	/**
	 * Return normalize path
	 * @param string filepath - File path
	 * @return string
	 */
	normalize: function(ctx, filepath)
	{
		return filepath;
	},
	/**
	 * New line to br
	 */
	nl2br: function(ctx, s)
	{
		return this.replace(ctx, "\n", "<br/>", s);
	},
	/**
	 * Remove spaces
	 */
	spaceless: function(ctx, s)
	{
		s = Runtime.re.replace(ctx, " +", " ", s);
		s = Runtime.re.replace(ctx, "\t", "", s);
		s = Runtime.re.replace(ctx, "\n", "", s);
		return s;
	},
	/* =================== Deprecated =================== */
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	explode: function(ctx, delimiter, s, limit)
	{
		if (limit == undefined) limit = -1;
		/*
		var _rtl; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		var _Collection; if (isBrowser()) _Collection = Runtime.Collection; else _Collection = Collection;
		*/
		
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
	implode: function(ctx, ch, arr)
	{
		return arr.join(ctx, ch);
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
	strpos: function(ctx, s, search, offset)
	{
		if (offset == undefined) offset = 0;
		/*var _rtl; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;*/
		var _rtl = use("Runtime.rtl");
		
		if (!_rtl.exists(offset)) offset = 0;
		var res = _rtl.toStr(s).indexOf(search);
		return res;
	},
	/**
	 * URL encode
	 * @param string s
	 * @return string
	 */
	url_encode: function(ctx, s)
	{
		return encodeURIComponent(s);
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string
	 */
	base64_encode: function(ctx, s)
	{
		return window.btoa(window.unescape(window.encodeURIComponent(s)));
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string
	 */
	base64_decode: function(ctx, s)
	{
		return window.decodeURIComponent(window.escape(window.atob(s)));
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string
	 */
	base64_encode_url: function(ctx, s)
	{
		s = this.base64_encode(ctx, s)
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
	base64_decode_url: function(ctx, s)
	{
		var c = 4 - s.length % 4;
		if (c < 4 && c > 0) s = s + '='.repeat(c);
		s = s.replace(new RegExp('-', 'g'), '+')
			.replace(new RegExp('_', 'g'), '/')
		;
		return this.base64_decode(ctx, s);
	},
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	url_get_add: function(ctx, s, key, value)
	{
		var pos = this.strpos(ctx, s, "?");
		var s1 = this.substr(ctx, s, 0, pos);
		var s2 = (pos >= 0) ? (this.substr(ctx, s, pos + 1)) : ("");
		var find = false;
		var arr = this.explode(ctx, "&", s2);
		arr = arr.map(ctx, (ctx, s) => 
		{
			var arr = this.explode(ctx, "=", s);
			if (value == "")
			{
				return "";
			}
			if (Runtime.rtl.get(ctx, arr, 0) == key)
			{
				find = true;
				return key + Runtime.rtl.toStr("=") + Runtime.rtl.toStr(this.htmlEscape(ctx, value));
			}
			return s;
		}).filter(ctx, (ctx, s) => 
		{
			return s != "";
		});
		if (!find && value != "")
		{
			arr = arr.appendIm(ctx, key + Runtime.rtl.toStr("=") + Runtime.rtl.toStr(this.htmlEscape(ctx, value)));
		}
		s = s1;
		s2 = this.join(ctx, "&", arr);
		if (s2 != "")
		{
			s = s + Runtime.rtl.toStr("?") + Runtime.rtl.toStr(s2);
		}
		return s;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.rs";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.rs",
			"name": "Runtime.rs",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.fs = function(ctx)
{
};
Object.assign(Runtime.fs.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.fs)
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.fs";
	},
});
Object.assign(Runtime.fs,
{
	DIRECTORY_SEPARATOR: "/",
	/**
	 * Add first slash
	 */
	addFirstSlash: function(ctx, s)
	{
		return Runtime.re.replace(ctx, "//", "/", this.DIRECTORY_SEPARATOR + Runtime.rtl.toStr(s));
	},
	/**
	 * Add last slash
	 */
	addLastSlash: function(ctx, s)
	{
		return Runtime.re.replace(ctx, "//", "/", s + Runtime.rtl.toStr(this.DIRECTORY_SEPARATOR));
	},
	/**
	 * Concat
	 */
	concat: function(ctx, base_path, file_name)
	{
		return Runtime.re.replace(ctx, "//", "/", base_path + Runtime.rtl.toStr("/") + Runtime.rtl.toStr(file_name));
	},
	/**
	 * Concat array
	 */
	concatArr: function(ctx, arr)
	{
		var res = arr.reduce(ctx, (ctx, res, item) => 
		{
			return res + Runtime.rtl.toStr(this.DIRECTORY_SEPARATOR) + Runtime.rtl.toStr(item);
		}, "");
		return Runtime.re.replace(ctx, "//", "/", res);
	},
	/**
	 * Relative
	 */
	relative: function(ctx, path, to)
	{
		return "";
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.fs";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.fs",
			"name": "Runtime.fs",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "DIRECTORY_SEPARATOR") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.fs",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.fs);
window["Runtime.fs"] = Runtime.fs;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.fs;
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
	toStr: function(value)
	{
		return use("Runtime.rtl").toStr(value);
	},
	getClassName: function(){ return "Runtime._Collection"; },
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
	getCurrentNamespace: function(){ return "Runtime"; },
	getCurrentClassName: function(){ return "Runtime._Collection"; },
	getParentClassName: function(){ return ""; },
});
Runtime.Collection = function(ctx)
{
	Runtime._Collection.apply(this, arguments);
};
Runtime.Collection.prototype = Object.create(Runtime._Collection.prototype);
Runtime.Collection.prototype.constructor = Runtime.Collection;
Object.assign(Runtime.Collection.prototype,
{
	/**
	 * Returns copy of Collectiom
	 * @param int pos - position
	 */
	cp: function(ctx)
	{
		var arr = Array.prototype.slice.call(this);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	/**
	 * Convert to collection
	 */
	toCollection: function(ctx)
	{
		var obj = Array.prototype.slice.call(this);
		Object.setPrototypeOf(obj, Runtime.Collection.prototype);
		return obj;
	},
	/**
	 * Convert to vector
	 */
	toVector: function(ctx)
	{
		var obj = Array.prototype.slice.call(this);
		Object.setPrototypeOf(obj, use("Runtime.Vector").prototype);
		return obj;
	},
	/**
	 * Returns value from position
	 * @param int pos - position
	 */
	get: function(ctx, pos, default_value)
	{
		if (pos < 0 || pos >= this.length) return default_value;
		var val = this[pos];
		return val;
	},
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param int pos - position
	 */
	item: function(ctx, pos)
	{
		if (pos < 0 || pos >= this.length)
		{
			var _IndexOutOfRange = use("Runtime.Exceptions.IndexOutOfRange");
			throw new _IndexOutOfRange(ctx, pos);
		}
		return this[pos];
	},
	/**
	 * Returns count items in vector
	 */
	count: function(ctx)
	{
		return this.length;
	},
	/**
	 * Find value in array. Returns -1 if value not found.
	 * @param T value
	 * @return  int
	 */
	indexOf: function(ctx, value)
	{
		for (var i=0; i<this.count(ctx); i++)
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
	indexOfRange: function(ctx, value, pos_begin, pos_end)
	{
		var pos = Array.prototype.indexOf.call(this, value, pos_begin);
		if (pos == -1 || pos > pos_end)
			return -1;
		return pos;
	},
	/**
	 * Get first item
	 */
	first: function(ctx, default_value)
	{
		if (default_value == undefined) default_value = null;
		if (this.length == 0) return default_value;	
		return this[0];
	},
	/**
	 * Get last item
	 */
	last: function(ctx, default_value, pos)
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
	getLastItem: function(ctx, default_value, pos)
	{
		if (default_value == undefined) default_value = null;
		if (pos == undefined) pos = -1;
		return this.last(ctx, default_value, pos);
	},
	/**
	 * Append value to the end of the Collection and return new Collection
	 * @param T value
	 */
	pushIm: function(ctx, value)
	{
		var arr = this.cp();
		Array.prototype.push.call(arr, value);
		return arr;
	},
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	unshiftIm: function(ctx, value)
	{
		var arr = this.cp();
		Array.prototype.unshift.call(arr, value);
		return arr;
	},
	/**
	 * Extract last value from array
	 * @return T value
	 */
	removeLastIm: function(ctx)
	{
		var arr = Array.prototype.slice.call(this, 0, -1);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	/**
	 * Extract first value from array
	 * @return T value
	 */
	removeFirstIm: function(ctx)
	{
		var arr = Array.prototype.slice.call(this, 1);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	/**
	 * Insert value to position
	 * @param T value
	 * @param int pos - position
	 */
	insertIm: function(ctx, pos, value)
	{
		var arr = this.cp(ctx);
		arr.splice(pos, 0, value);
		return arr;
	},
	/**
	 * Remove value from position
	 * @param int pos - position
	 * @param int count - count remove items
	 */
	removeIm: function(ctx, pos, count)
	{
		if (count == undefined) count = 1;
		if (count == undefined) count = 1;
		var arr = this.cp(ctx);
		arr.splice(pos, count);
		return arr;
	},
	/**
	 * Remove range
	 * @param int pos_begin - start position
	 * @param int pos_end - end position
	 */
	removeRangeIm: function(ctx, pos_begin, pos_end)
	{
		var arr = this.cp(ctx);
		arr.splice(pos_begin, pos_end - pos_begin + 1);
		return arr;
	},
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	setIm: function(ctx, pos, value)
	{
		if (pos < 0 || pos >= this.length)
		{
			var _IndexOutOfRange = use("Runtime.Exceptions.IndexOutOfRange");
			throw new _IndexOutOfRange(ctx);
		}
		var arr = this.cp(ctx);
		arr[pos] = value;
		return arr;
	},
	/**
	 * Append value to the end of the vector
	 * @param T value
	 */
	appendIm: function(ctx, value)
	{
		return this.pushIm(ctx, value);
	},
	/**
	 * Insert first value to begin of the vector
	 * @return T value
	 */
	prependIm: function(ctx, value)
	{
		return this.unshiftIm(ctx, value);
	},
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	concatIm: function(ctx, arr)
	{
		return this.appendCollectionIm(ctx, arr);
	},
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	appendCollectionIm: function(ctx, arr)
	{
		if (arr == null) return this;
		if (arr.length == 0) return this;
		var res = this.cp(ctx);
		for (var i=0; i<arr.length; i++)
		{
			Array.prototype.push.call(res, arr[i]);
		}
		return res;
	},
	/**
	 * Prepend vector to the begin of the vector
	 * @param Collection<T> arr
	 */
	prependCollectionIm: function(ctx, arr)
	{
		if (arr == null) return this;
		if (arr.length == 0) return this;
		var res = this.cp(ctx);
		for (var i=arr.length-1; i>=0; i--)
		{
			Array.prototype.unshift.call(res, arr[i]);
		}
		return res;
	},
	/**
	 * Remove value
	 */
	removeValueIm: function(ctx, value)
	{
		var index = this.indexOf(ctx, value);
		if (index != -1)
		{
			return this.removeIm(ctx, index);
		}
		return this;
	},
	/**
	 * Remove value
	 */
	removeItemIm: function(ctx, value)
	{
		return this.removeValueIm(ctx, value);
	},
	/**
	 * Remove value
	 */
	removeItemsIm: function(ctx, values)
	{
		var res = this;
		for (var i = 0;i < values.count(ctx);i++)
		{
			res = res.removeItem(ctx, values.item(ctx, i));
		}
		return res;
	},
	/**
	 * Map
	 * @param fn f
	 * @return Collection
	 */
	map: function(ctx, f)
	{
		var arr = this.cp(ctx);
		for (var i=0; i<arr.length; i++)
		{
			arr[i] = f(ctx, arr[i], i);
		}
		return arr;
	},
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	filter: function(ctx, f)
	{
		var res = this.constructor.Instance(ctx);
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			var flag = f(ctx, item, i);
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
	transition: function(ctx, f)
	{
		var Dict = use("Runtime.Dict");
		var d = new Dict(ctx);
		for (var i=0; i<this.length; i++)
		{
			var value = this[i];
			var p = f(ctx, value, i);
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
	reduce: function(ctx, f, init_value)
	{
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			init_value = f(ctx, init_value, item, i);
		}
		return init_value;
	},
	/**
	 * Call function for each item
	 * @param fn f
	 */
	each: function(ctx, f)
	{
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			f(ctx, item, i);
		}
	},
	/**
	 * Returns Collection
	 * @param Collection<T> arr
	 * @return Collection<T>
	 */
	concat: function(ctx, arr)
	{
		if (arr == undefined) arr = null;
		if (arr == null && arr == undefined)
		{
			return this;
		}
		var new_arr = Array.prototype.slice.call(this).concat(arr);
		Object.setPrototypeOf(new_arr, this.constructor.prototype);
		return new_arr;
	},
	/**
	 * Returns Collection
	 * @param Collection<T> arr
	 * @return Collection<T>
	 */
	intersect: function(ctx, arr)
	{
		return this.filter(ctx, (ctx, item) => 
		{
			return arr.indexOf(ctx, item) >= 0;
		});
	},
	/**
	 * Returns new Collection
	 * @param int offset
	 * @param int lenght
	 * @return Collection<T>
	 */
	slice: function(ctx, offset, length)
	{
		if (length == undefined) length = null;
		if (offset == undefined) offset = 0;
		if (length == undefined)
		{
			if (offset == 0) return this;
			var arr = Array.prototype.slice.call(this, offset);
			Object.setPrototypeOf(arr, this.constructor.prototype);
			return arr;
		}
		if (offset == 0 && length == this.length) return this;
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
	reverseIm: function(ctx)
	{
		var arr = this.cp(ctx);
		Array.prototype.reverse.call(arr);
		return arr;
	},
	/**
	 * Sort vector
	 * @param fn f - Sort user function
	 */
	sortIm: function(ctx, f)
	{
		if (f == undefined) f = null;
		var arr = this.cp(ctx);
		if (f == undefined) Array.prototype.sort.call(arr);
		else
		{
			var f1 = (a, b) => { return f(ctx, a, b); };
			Array.prototype.sort.call(arr, f1);
		}
		return arr;
	},
	/**
	 * Remove dublicate values
	 */
	removeDublicatesIm: function(ctx)
	{
		return this.removeDuplicatesIm(ctx);
	},
	removeDuplicatesIm: function(ctx)
	{
		var res = this.constructor.Instance(ctx);
		for (var i=0; i<this.length; i++)
		{
			var p = res.indexOf(ctx, this[i]);
			if (p == -1)
			{
				Array.prototype.push.call(res, this[i]);
			}
		}
		return res;
	},
	/**
	 * Find item pos
	 * @param fn f - Find function
	 * @return int - position
	 */
	find: function(ctx, f)
	{
		for (var i=0; i<this.length; i++)
		{
			var flag = f(ctx, this[i]);
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
	findItem: function(ctx, f, def_value)
	{
		if (def_value == undefined) def_value = null;
		var pos = this.find(ctx, f);
		return this.get(ctx, pos, def_value);
	},
	/**
	 * Join collection to string
	 */
	join: function(ctx, ch)
	{
		return Runtime.rs.join(ctx, ch, this);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Collection)
		{
		}
		Runtime._Collection.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime._Collection.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime._Collection.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Collection";
	},
});
Object.assign(Runtime.Collection, Runtime._Collection);
Object.assign(Runtime.Collection,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function(ctx)
	{
		return new Runtime.Collection(ctx);
	},
	/**
	 * Returns new Instance
	 * @return Object
	 */
	create: function(ctx, arr)
	{
		return this.from(arr);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Collection";
	},
	getParentClassName: function()
	{
		return "Runtime._Collection";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Collection",
			"name": "Runtime.Collection",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime == 'undefined') Runtime = {};

Runtime._Map = function(ctx, map)
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
		else
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
	getClassName: function(){ return "Runtime._Map"; },
});
Object.assign(Runtime._Map,
{
	from: function(map)
	{
		var res = this.Instance(null);
		for (var i in map)
		{
			res._map["|" + i] = map[i];
		}
		return res;
	},
	getCurrentNamespace: function(){ return "Runtime"; },
	getCurrentClassName: function(){ return "Runtime._Map"; },
	getParentClassName: function(){ return ""; },
});
Runtime.Dict = function(ctx)
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
	cp: function(ctx)
	{
		var new_obj = this.constructor.Instance(ctx);
		new_obj._map = Object.assign({}, this._map);
		return new_obj;
	},
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return Dict<T>
	 */
	clone: function(ctx, fields)
	{
		if (fields == undefined) fields = null;
		if (fields == null)
		{
			return this;
		}
		var new_obj = this.constructor.Instance(ctx);
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
	copy: function(ctx, obj)
	{
		if (obj == undefined) obj = null;
		if (obj == null)
		{
			return this;
		}
		var new_obj = this.constructor.Instance(ctx);
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
	toDict: function(ctx)
	{
		var Dict = use ("Runtime.Dict");
		return new Dict(ctx, this);
	},
	/**
	 * Convert to dict
	 */
	toMap: function(ctx)
	{
		var Map = use ("Runtime.Map");
		return new Map(ctx, this);
	},
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	contains: function(ctx, key)
	{
		key = this.toStr(key);
		return typeof this._map["|" + key] != "undefined";
	},
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	has: function(ctx, key)
	{
		return this.contains(ctx, key);
	},
	/**
	 * Returns value from position
	 * @param string key
	 * @param T default_value
	 * @return T
	 */
	get: function(ctx, key, default_value)
	{
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
	attr: function(ctx, items, default_value)
	{
		return Runtime.rtl.attr(ctx, this, items, default_value);
	},
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param string key - position
	 * @return T
	 */
	item: function(ctx, key)
	{
		key = this.toStr(key);
		if (typeof this._map["|" + key] == "undefined")
		{
			var _KeyNotFound = use("Runtime.Exceptions.KeyNotFound");
			throw new _KeyNotFound(ctx, key);
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
	setIm: function(ctx, key, value)
	{
		var res = this.cp(ctx);
		key = this.toStr(key);
		res._map["|" + key] = value;
		return res;
	},
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	removeIm: function(ctx, key)
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
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	removeKeys: function(ctx, keys)
	{
		return (keys != null) ? (keys.reduce(ctx, (ctx, item, key) => 
		{
			return item.removeIm(ctx, key);
		}, this)) : (this);
	},
	/**
	 * Returns vector of the keys
	 * @return Collection<string>
	 */
	keys: function(ctx)
	{
		var res = new Runtime.Collection(ctx);
		for (var key in this._map) res.push(key.substring(1));
		return res;
	},
	/**
	 * Returns vector of the values
	 * @return Collection<T>
	 */
	values: function(ctx)
	{
		var res = new Runtime.Collection(ctx);
		for (var key in this._map) res.push( this._map[key] );
		return res;
	},
	/**
	 * Call function map
	 * @param fn f
	 * @return Dict
	 */
	map: function(ctx, f)
	{
		var obj = this.constructor.Instance(ctx);
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var new_val = f(ctx, this._map[key], new_key);
			obj._map[key] = new_val;
		}
		return obj;
	},
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	filter: function(ctx, f)
	{
		var obj = this.constructor.Instance(ctx);
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var value = this._map[key];
			var flag = f(ctx, value, new_key);
			if (flag) obj._map[key] = value;
		}
		return obj;
	},
	/**
	 * Call function for each item
	 * @param fn f
	 */
	each: function(ctx, f)
	{
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var value = this._map[key];
			f(ctx, value, new_key);
		}
	},
	/**
	 * Transition Dict to Collection
	 * @param fn f
	 * @return Collection
	 */
	transition: function(ctx, f)
	{
		var Collection = use("Runtime.Collection");
		var arr = new Collection(ctx);
		for (var key in this._map)
		{
			var new_value = f(ctx, this._map[key], key.substring(1));
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
	reduce: function(ctx, f, init_value)
	{
		for (var key in this._map)
		{
			init_value = f(ctx, init_value, this._map[key], key.substring(1));
		}
		return init_value;
	},
	/**
	 * Add values from other map
	 * @param Dict<T> map
	 * @return self
	 */
	concat: function(ctx, map)
	{
		if (map == undefined) map = null;
		if (map == null) return this;
		var res = this.cp(ctx);
		for (var key in map._map)
		{
			res._map[key] = map._map[key];
		}
		return res;
	},
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return BaseStruct
	 */
	intersect: function(ctx, fields)
	{
		if (fields == undefined) fields = null;
		if (fields == null)
		{
			return Runtime.Dict.from({});
		}
		var obj = new Runtime.Map(ctx);
		fields.each(ctx, (ctx, field_name) => 
		{
			obj.set(ctx, field_name, this.get(ctx, field_name, null));
		});
		return obj.toDict(ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Dict)
		{
		}
		Runtime._Map.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime._Map.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime._Map.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Dict";
	},
});
Object.assign(Runtime.Dict, Runtime._Map);
Object.assign(Runtime.Dict,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function(ctx)
	{
		return new Runtime.Dict(ctx);
	},
	/**
	 * Returns new Instance
	 * @return Object
	 */
	create: function(ctx, obj)
	{
		return new (Function.prototype.bind.apply(this, [null, ctx, obj]));
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Dict";
	},
	getParentClassName: function()
	{
		return "Runtime._Map";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Dict",
			"name": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.Map = function(ctx)
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
	set: function(ctx, key, value)
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
	remove: function(ctx, key)
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
	clear: function(ctx)
	{
		this._map = {};
		return this;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Map)
		{
		}
		Runtime.Dict.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Dict.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Dict.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Map";
	},
});
Object.assign(Runtime.Map, Runtime.Dict);
Object.assign(Runtime.Map,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function(ctx)
	{
		return new Runtime.Map(ctx);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Map";
	},
	getParentClassName: function()
	{
		return "Runtime.Dict";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Map",
			"name": "Runtime.Map",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.Monad = function(ctx, value, err)
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
	attr: function(ctx, attr_name)
	{
		if (this.val === null || this.err != null)
		{
			return this;
		}
		return new Runtime.Monad(ctx, Runtime.rtl.attr(ctx, this.val, Runtime.Collection.from([attr_name]), null));
	},
	/**
	 * Call function on value
	 */
	call: function(ctx, f)
	{
		if (this.val === null || this.err != null)
		{
			return this;
		}
		var res = null;
		var err = null;
		try
		{
			res = f(ctx, this.val);
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
		return new Runtime.Monad(ctx, res, err);
	},
	/**
	 * Call async function on value
	 */
	callAsync: async function(ctx, f)
	{
		if (this.val === null || this.err != null)
		{
			return Promise.resolve(this);
		}
		var res = null;
		var err = null;
		try
		{
			res = await f(ctx, this.val);
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
		return Promise.resolve(new Runtime.Monad(ctx, res, err));
	},
	/**
	 * Call method on value
	 */
	callMethod: function(ctx, f, args)
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
			res = Runtime.rtl.apply(ctx, f, args);
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
		return new Runtime.Monad(ctx, res, err);
	},
	/**
	 * Call async method on value
	 */
	callMethodAsync: async function(ctx, f, args)
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
			res = await Runtime.rtl.applyAsync(ctx, f, args);
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
		return Promise.resolve(new Runtime.Monad(ctx, res, err));
	},
	/**
	 * Call function on monad
	 */
	monad: function(ctx, f)
	{
		return f(ctx, this);
	},
	/**
	 * Returns value
	 */
	value: function(ctx)
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
	_init: function(ctx)
	{
		this.val = null;
		this.err = null;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Monad)
		{
			this.val = o.val;
			this.err = o.err;
		}
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "val")this.val = v;
		else if (k == "err")this.err = v;
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "val")return this.val;
		else if (k == "err")return this.err;
	},
	getClassName: function(ctx)
	{
		return "Runtime.Monad";
	},
});
Object.assign(Runtime.Monad,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Monad";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Monad",
			"name": "Runtime.Monad",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("val");
			a.push("err");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "val") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Monad",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "err") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Monad",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.Mutex = function(ctx)
{
};
Object.assign(Runtime.Mutex.prototype,
{
	lock: function(ctx)
	{
	},
	unLock: function(ctx)
	{
	},
	isLocked: function(ctx)
	{
	},
	wait: async function(ctx)
	{
	},
	waitAndLock: async function(ctx)
	{
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Mutex)
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.Mutex";
	},
});
Object.assign(Runtime.Mutex,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Mutex";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Mutex",
			"name": "Runtime.Mutex",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Mutex);
window["Runtime.Mutex"] = Runtime.Mutex;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Mutex;
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
Runtime.Vector = function(ctx)
{
	Runtime.Collection.apply(this, arguments);
};
Runtime.Vector.prototype = Object.create(Runtime.Collection.prototype);
Runtime.Vector.prototype.constructor = Runtime.Vector;
Object.assign(Runtime.Vector.prototype,
{
	/**
	 * Returns new Collection
	 * @param int offset
	 * @param int lenght
	 * @return Collection<T>
	 */
	slice: function(ctx, offset, length)
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
	push: function(ctx, value)
	{
		Array.prototype.push.call(this, value);
		return this;
	},
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	unshift: function(ctx, value)
	{
		Array.prototype.unshift.call(this, value);
		return this;
	},
	/**
	 * Extract last value from array
	 * @return T value
	 */
	pop: function(ctx)
	{
		return Array.prototype.pop.call(this);
	},
	/**
	 * Extract first value from array
	 * @return T value
	 */
	shift: function(ctx)
	{
		return Array.prototype.shift.call(this);
	},
	/**
	 * Insert value to position
	 * @param T value
	 * @param int pos - position
	 */
	insert: function(ctx, pos, value)
	{
		Array.prototype.splice.call(this, pos, 0, value);
		return this;
	},
	/**
	 * Remove value from position
	 * @param int pos - position
	 * @param int count - count remove items
	 */
	remove: function(ctx, pos, count)
	{
		if (count == undefined) count = 1;
		Array.prototype.splice.call(this, pos, count);
		return this;
	},
	/**
	 * Remove range
	 * @param int pos_begin - start position
	 * @param int pos_end - end position
	 */
	removeRange: function(ctx, pos_begin, pos_end)
	{
		Array.prototype.splice.call(this, pos_begin, pos_end - pos_begin + 1);
		return this;
	},
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	set: function(ctx, pos, value)
	{
		if (pos < 0 || pos >= this.length)
		{
			var IndexOutOfRange = use ("Runtime.Exceptions.IndexOutOfRange");
			throw new IndexOutOfRange();
		}
		this[pos] = value;
		return this;
	},
	/**
	 * Clear all values from vector
	 */
	clear: function(ctx)
	{
		Array.prototype.splice.call(this, 0, this.length);
		return this;
	},
	/**
	 * Append value to the end of the vector
	 * @param T value
	 */
	append: function(ctx, value)
	{
		this.push(ctx, value);
		return this;
	},
	/**
	 * Insert first value to begin of the vector
	 * @return T value
	 */
	prepend: function(ctx, value)
	{
		this.unshift(ctx, value);
		return this;
	},
	/**
	 * Append vector to the end of the vector
	 * @param Vector<T> arr
	 */
	appendVector: function(ctx, arr)
	{
		if (!arr) return this;
		for (var i=0; i<arr.length; i++) Array.prototype.push.call(this, arr[i]);
		return this;
	},
	/**
	 * Prepend vector to the begin of the vector
	 * @param Vector<T> arr
	 */
	prependVector: function(ctx, arr)
	{
		for (var i=0; i<arr.length; i++) Array.prototype.unshift.call(this, arr[i]);
		return this;
	},
	/**
	 * Remove value
	 */
	removeValue: function(ctx, value)
	{
		var index = this.indexOf(ctx, value);
		if (index != -1)
		{
			this.remove(ctx, index, 1);
		}
		return this;
	},
	/**
	 * Remove value
	 */
	removeItem: function(ctx, value)
	{
		return this.removeValue(ctx, value);
	},
	/**
	 * Remove value
	 */
	removeItems: function(ctx, values)
	{
		for (var i = 0;i < values.count(ctx);i++)
		{
			this.removeValue(ctx, values.item(ctx, i));
		}
		return this;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Vector)
		{
		}
		Runtime.Collection.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Collection.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Collection.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Vector";
	},
});
Object.assign(Runtime.Vector, Runtime.Collection);
Object.assign(Runtime.Vector,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function(ctx)
	{
		return new Runtime.Vector(ctx);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Vector";
	},
	getParentClassName: function()
	{
		return "Runtime.Collection";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Vector",
			"name": "Runtime.Vector",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.ClassException = function()
{
	Error.call(this);
	Error.captureStackTrace(this, this.constructor);
}
Runtime.Exceptions.ClassException.prototype = Object.create(Error.prototype);
Runtime.Exceptions.ClassException.prototype.constructor = Runtime.Exceptions.ClassException;
Object.assign(Runtime.Exceptions.ClassException.prototype,
{
	_init: function(){},
	getClassName: function(){ return "Runtime.Exceptions.ClassException"; },
});
Object.assign(Runtime.Exceptions.ClassException,
{
	getCurrentNamespace: function(){ return "Runtime.Exceptions"; },
	getCurrentClassName: function(){ return "Runtime.Exceptions.ClassException"; },
	getParentClassName: function(){ return ""; },
});
Runtime.Exceptions.RuntimeException = function(ctx, message, code, prev)
{
	if (message == undefined) message = "";
	if (code == undefined) code = -1;
	if (prev == undefined) prev = null;
	Runtime.Exceptions.ClassException.call(this, message, code, prev);
	this._init(ctx);
	this.error_str = message;
	this.error_code = code;
	this.prev = prev;
	this.updateError(ctx);
};
Runtime.Exceptions.RuntimeException.prototype = Object.create(Runtime.Exceptions.ClassException.prototype);
Runtime.Exceptions.RuntimeException.prototype.constructor = Runtime.Exceptions.RuntimeException;
Object.assign(Runtime.Exceptions.RuntimeException.prototype,
{
	getPreviousException: function(ctx)
	{
		return this.prev;
	},
	getErrorMessage: function(ctx)
	{
		return this.error_message;
	},
	getErrorString: function(ctx)
	{
		return this.error_str;
	},
	getErrorCode: function(ctx)
	{
		return this.error_code;
	},
	getFileName: function(ctx)
	{
		return this.error_file;
	},
	getErrorLine: function(ctx)
	{
		return this.error_line;
	},
	getErrorPos: function(ctx)
	{
		return this.error_pos;
	},
	toString: function(ctx)
	{
		return this.buildMessage(ctx);
	},
	buildMessage: function(ctx)
	{
		return this.error_str;
	},
	updateError: function(ctx)
	{
		this.error_message = this.buildMessage(ctx);
		this.message = this.error_message;
	},
	/**
	 * Returns trace
	 */
	getTraceStr: function(ctx)
	{
	},
	_init: function(ctx)
	{
		this.prev = null;
		this.error_message = "";
		this.error_str = "";
		this.error_code = 0;
		this.error_file = "";
		this.error_line = -1;
		this.error_pos = -1;
		Runtime.Exceptions.ClassException.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Exceptions.RuntimeException)
		{
			this.prev = o.prev;
			this.error_message = o.error_message;
			this.error_str = o.error_str;
			this.error_code = o.error_code;
			this.error_file = o.error_file;
			this.error_line = o.error_line;
			this.error_pos = o.error_pos;
		}
		Runtime.Exceptions.ClassException.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "prev")this.prev = v;
		else if (k == "error_message")this.error_message = v;
		else if (k == "error_str")this.error_str = v;
		else if (k == "error_code")this.error_code = v;
		else if (k == "error_file")this.error_file = v;
		else if (k == "error_line")this.error_line = v;
		else if (k == "error_pos")this.error_pos = v;
		else Runtime.Exceptions.ClassException.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "prev")return this.prev;
		else if (k == "error_message")return this.error_message;
		else if (k == "error_str")return this.error_str;
		else if (k == "error_code")return this.error_code;
		else if (k == "error_file")return this.error_file;
		else if (k == "error_line")return this.error_line;
		else if (k == "error_pos")return this.error_pos;
		return Runtime.Exceptions.ClassException.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Exceptions.RuntimeException";
	},
});
Object.assign(Runtime.Exceptions.RuntimeException, Runtime.Exceptions.ClassException);
Object.assign(Runtime.Exceptions.RuntimeException,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.ClassException";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Exceptions.RuntimeException",
			"name": "Runtime.Exceptions.RuntimeException",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("prev");
			a.push("error_message");
			a.push("error_str");
			a.push("error_code");
			a.push("error_file");
			a.push("error_line");
			a.push("error_pos");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "prev") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Exceptions.RuntimeException",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_message") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Exceptions.RuntimeException",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_str") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Exceptions.RuntimeException",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_code") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Exceptions.RuntimeException",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_file") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Exceptions.RuntimeException",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_line") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Exceptions.RuntimeException",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_pos") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Exceptions.RuntimeException",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.ApiException = function(ctx, message, code, response, prev)
{
	if (message == undefined) message = "";
	if (code == undefined) code = -1;
	if (response == undefined) response = null;
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, ctx, message, code, prev);
	this.response = response;
};
Runtime.Exceptions.ApiException.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.ApiException.prototype.constructor = Runtime.Exceptions.ApiException;
Object.assign(Runtime.Exceptions.ApiException.prototype,
{
	_init: function(ctx)
	{
		this.response = null;
		Runtime.Exceptions.RuntimeException.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Exceptions.ApiException)
		{
			this.response = o.response;
		}
		Runtime.Exceptions.RuntimeException.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "response")this.response = v;
		else Runtime.Exceptions.RuntimeException.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "response")return this.response;
		return Runtime.Exceptions.RuntimeException.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Exceptions.ApiException";
	},
});
Object.assign(Runtime.Exceptions.ApiException, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.ApiException,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Exceptions.ApiException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Exceptions.ApiException",
			"name": "Runtime.Exceptions.ApiException",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("response");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "response") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Exceptions.ApiException",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.AssignStructValueError = function(ctx, name, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, ctx, ctx.translate(ctx, "Runtime", "Can not set key '" + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("' in immutable struct")), Runtime.rtl.ERROR_INDEX_OUT_OF_RANGE, prev);
};
Runtime.Exceptions.AssignStructValueError.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.AssignStructValueError.prototype.constructor = Runtime.Exceptions.AssignStructValueError;
Object.assign(Runtime.Exceptions.AssignStructValueError.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Exceptions.AssignStructValueError)
		{
		}
		Runtime.Exceptions.RuntimeException.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Exceptions.RuntimeException.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Exceptions.RuntimeException.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Exceptions.AssignStructValueError";
	},
});
Object.assign(Runtime.Exceptions.AssignStructValueError, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.AssignStructValueError,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Exceptions.AssignStructValueError";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Exceptions.AssignStructValueError",
			"name": "Runtime.Exceptions.AssignStructValueError",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.FileNotFound = function(ctx, name, object, code, prev)
{
	if (object == undefined) object = "File";
	if (code == undefined) code = -5;
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, ctx, ctx.translate(ctx, "Runtime", "%object% '%name%' not found", Runtime.Dict.from({"name":name,"object":object})), code, prev);
};
Runtime.Exceptions.FileNotFound.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.FileNotFound.prototype.constructor = Runtime.Exceptions.FileNotFound;
Object.assign(Runtime.Exceptions.FileNotFound.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Exceptions.FileNotFound)
		{
		}
		Runtime.Exceptions.RuntimeException.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Exceptions.RuntimeException.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Exceptions.RuntimeException.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Exceptions.FileNotFound";
	},
});
Object.assign(Runtime.Exceptions.FileNotFound, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.FileNotFound,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Exceptions.FileNotFound";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Exceptions.FileNotFound",
			"name": "Runtime.Exceptions.FileNotFound",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.IndexOutOfRange = function(ctx, pos, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, ctx, ctx.translate(ctx, "Runtime", "Index out of range. Pos: %pos%", Runtime.Dict.from({"pos":pos})), Runtime.rtl.ERROR_INDEX_OUT_OF_RANGE, prev);
};
Runtime.Exceptions.IndexOutOfRange.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.IndexOutOfRange.prototype.constructor = Runtime.Exceptions.IndexOutOfRange;
Object.assign(Runtime.Exceptions.IndexOutOfRange.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Exceptions.IndexOutOfRange)
		{
		}
		Runtime.Exceptions.RuntimeException.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Exceptions.RuntimeException.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Exceptions.RuntimeException.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Exceptions.IndexOutOfRange";
	},
});
Object.assign(Runtime.Exceptions.IndexOutOfRange, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.IndexOutOfRange,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Exceptions.IndexOutOfRange";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Exceptions.IndexOutOfRange",
			"name": "Runtime.Exceptions.IndexOutOfRange",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.KeyNotFound = function(ctx, key, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, ctx, ctx.translate(ctx, "Runtime", "Key '%key%' not found", Runtime.Dict.from({"key":key})), Runtime.rtl.ERROR_KEY_NOT_FOUND, prev);
};
Runtime.Exceptions.KeyNotFound.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.KeyNotFound.prototype.constructor = Runtime.Exceptions.KeyNotFound;
Object.assign(Runtime.Exceptions.KeyNotFound.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Exceptions.KeyNotFound)
		{
		}
		Runtime.Exceptions.RuntimeException.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Exceptions.RuntimeException.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Exceptions.RuntimeException.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Exceptions.KeyNotFound";
	},
});
Object.assign(Runtime.Exceptions.KeyNotFound, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.KeyNotFound,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Exceptions.KeyNotFound";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Exceptions.KeyNotFound",
			"name": "Runtime.Exceptions.KeyNotFound",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.UnknownError = function(ctx, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, ctx, ctx.translate(ctx, "Runtime", "Unknown error"), Runtime.rtl.ERROR_UNKNOWN, prev);
};
Runtime.Exceptions.UnknownError.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.UnknownError.prototype.constructor = Runtime.Exceptions.UnknownError;
Object.assign(Runtime.Exceptions.UnknownError.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Exceptions.UnknownError)
		{
		}
		Runtime.Exceptions.RuntimeException.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Exceptions.RuntimeException.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Exceptions.RuntimeException.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Exceptions.UnknownError";
	},
});
Object.assign(Runtime.Exceptions.UnknownError, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.UnknownError,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Exceptions.UnknownError";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Exceptions.UnknownError",
			"name": "Runtime.Exceptions.UnknownError",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.SerializeInterface = function(ctx)
{
};
Object.assign(Runtime.SerializeInterface.prototype,
{
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @return var
	 */
	takeValue: function(ctx, variable_name, default_value)
	{
		if (default_value == undefined) default_value = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.SerializeInterface";
	},
});
Object.assign(Runtime.SerializeInterface,
{
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
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
Runtime.StringInterface = function(ctx)
{
};
Object.assign(Runtime.StringInterface.prototype,
{
	/**
	 * Returns string
	 */
	toString: function(ctx)
	{
	},
	getClassName: function(ctx)
	{
		return "Runtime.StringInterface";
	},
});
Object.assign(Runtime.StringInterface,
{
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
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
Runtime.BaseObject = function(ctx)
{
	/* Init object */
	this._init(ctx);
};
Object.assign(Runtime.BaseObject.prototype,
{
	/**
	 * Init function
	 */
	_init: function(ctx)
	{
	},
	/* Old functions */
	assignValue: function(ctx, k, v)
	{
	},
	takeValue: function(ctx, k, v)
	{
		if (v == undefined) v = null;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.BaseObject)
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.BaseObject";
	},
});
Object.assign(Runtime.BaseObject,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.BaseObject",
			"name": "Runtime.BaseObject",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.BaseStruct = function(ctx, obj)
{
	if (obj == undefined) obj = null;
	Runtime.BaseObject.call(this, ctx);
	this.constructor._assign(ctx, this, null, obj);
	if (this.__uq__ == undefined || this.__uq__ == null) this.__uq__ = Symbol();
		Object.freeze(this);
};
Runtime.BaseStruct.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.BaseStruct.prototype.constructor = Runtime.BaseStruct;
Object.assign(Runtime.BaseStruct.prototype,
{
	/**
	 * Init struct data
	 */
	initData: function(ctx, old, changed)
	{
		if (changed == undefined) changed = null;
	},
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	copy: function(ctx, obj)
	{
		if (obj == undefined) obj = null;
		if (obj == null)
		{
			return this;
		}
		var proto = Object.getPrototypeOf(this);
		var item = Object.create(proto); /* item._init(); */
		item = Object.assign(item, this);
		
		this.constructor._assign(ctx, item, this, obj);
		
		Object.freeze(item);
		
		return item;
		return this;
	},
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	clone: function(ctx, obj)
	{
		if (obj == undefined) obj = null;
		return this.copy(ctx, obj);
	},
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return BaseStruct
	 */
	intersect: function(ctx, fields)
	{
		if (fields == undefined) fields = null;
		if (fields == null)
		{
			return Runtime.Dict.from({});
		}
		var obj = new Runtime.Map(ctx);
		fields.each(ctx, (ctx, field_name) => 
		{
			obj.set(ctx, field_name, this.takeValue(ctx, field_name));
		});
		/* Return object */
		var res = Runtime.rtl.newInstance(ctx, this.getClassName(ctx), Runtime.Collection.from([obj.toDict(ctx)]));
		return res;
	},
	/**
	 * Create new struct with new value
	 * @param string field_name
	 * @param fn f
	 * @return BaseStruct
	 */
	map: function(ctx, field_name, f)
	{
		return this.copy(ctx, (new Runtime.Map(ctx)).set(ctx, field_name, f(ctx, this.takeValue(ctx, field_name))).toDict(ctx));
	},
	/**
	 * Returns struct as Dict
	 * @return Dict
	 */
	takeDict: function(ctx)
	{
		var values = new Runtime.Map(ctx);
		var names = Runtime.RuntimeUtils.getVariablesNames(ctx, this.getClassName(ctx), 1);
		for (var i = 0;i < names.count(ctx);i++)
		{
			var variable_name = names.item(ctx, i);
			var value = this.get(ctx, variable_name, null);
			values.set(ctx, variable_name, value);
		}
		return values.toDict(ctx);
	},
	/**
	 * Returns struct as Dict
	 * @return Dict
	 */
	toDict: function(ctx)
	{
		return this.takeDict(ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.BaseStruct)
		{
		}
		Runtime.BaseObject.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.BaseObject.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseObject.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.BaseStruct";
	},
});
Object.assign(Runtime.BaseStruct, Runtime.BaseObject);
Object.assign(Runtime.BaseStruct,
{
	/**
	 * Assign
	 */
	_assign: function(ctx, item, old_item, obj)
	{
		if (obj == null)
		{
			item.initData(ctx, old_item, obj);
			return ;
		}
		var _Dict = use("Runtime.Dict");
		if (obj instanceof _Dict)
		{
			for (var key in obj._map) item[key.substring(1)] = obj._map[key];
		}
		else
		{
			for (var key in obj) item[key] = obj[key];
		}
		
		item.initData(ctx, old_item, obj);
	},
	/**
	 * Returns new instance
	 */
	newInstance: function(ctx, items)
	{
		return new (Function.prototype.bind.apply(this, [null, ctx, items]));
	},
	/**
	 * Update struct
	 * @param Collection<string> path
	 * @param var value
	 * @return BaseStruct
	 */
	update: function(ctx, item, items)
	{
		return item.copy(ctx, items);
	},
	/**
	 * Update struct
	 * @param Collection<string> path
	 * @param var value
	 * @return BaseStruct
	 */
	setAttr: function(ctx, item, path, value)
	{
		return Runtime.rtl.setAttr(ctx, item, path, value);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.BaseStruct",
			"name": "Runtime.BaseStruct",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.BaseStruct.prototype.get = function(ctx, k, v){ return this[k] != undefined ? this[k] : v; };
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
Runtime.DateTime = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.DateTime.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.DateTime.prototype.constructor = Runtime.DateTime;
Object.assign(Runtime.DateTime.prototype,
{
	/**
	 * Returns day of week
	 * @return int
	 */
	getDayOfWeek: function(ctx)
	{
		var dt = this.getDatetime(obj);
		return dt.getDay();
		return null;
	},
	/**
	 * Returns timestamp
	 * @return int
	 */
	getTimestamp: function(ctx)
	{
		var dt = this.getDatetime(obj);
		return dt.getTime();
		return null;
	},
	/**
	 * Set timestamp
	 * @param int timestamp
	 * @return DateTime instance
	 */
	setTimestamp: function(ctx, timestamp)
	{
		return null;
	},
	/**
	 * Change time zone
	 * @param string tz
	 * @return DateTime instance
	 */
	changeTimezone: function(ctx, tz)
	{
		return obj;
		return null;
	},
	/**
	 * Return datetime in RFC822
	 * @return string
	 */
	getRFC822: function(ctx)
	{
		var y,m,d,h,i,s,dow,dow_s,m_s,tz;
		
		y = obj.y % 100;
		y = (y < 10) ? "0" + y : "" + y;
		m = (obj.m < 10) ? "0" + obj.m : "" + obj.m;
		d = (obj.d < 10) ? "0" + obj.d : "" + obj.d;
		h = (obj.h < 10) ? "0" + obj.h : "" + obj.h;
		i = (obj.i < 10) ? "0" + obj.i : "" + obj.i;
		s = (obj.s < 10) ? "0" + obj.s : "" + obj.s;
		dow = this.getDayOfWeek(obj);
		
		dow_s = "";
		if (dow == 0) dow_s = "Sun";
		if (dow == 1) dow_s = "Mon";
		if (dow == 2) dow_s = "Tue";
		if (dow == 3) dow_s = "Wed";
		if (dow == 4) dow_s = "Thu";
		if (dow == 5) dow_s = "Fri";
		if (dow == 6) dow_s = "Sat";
		
		m = obj.m;
		m_s = "";
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
		
		tz = this.getTimezoneOffsetString(obj);
		
		return dow_s + ", " + d + " " + m_s + " " + y + " " + h + ":" + i + ":" + s + " " + tz;
		return "";
	},
	/**
	 * Return datetime in ISO8601
	 * @return string
	 */
	getISO8601: function(ctx)
	{
		var m = (obj.m < 10) ? "0" + obj.m : "" + obj.m;
		var d = (obj.d < 10) ? "0" + obj.d : "" + obj.d;
		var h = (obj.h < 10) ? "0" + obj.h : "" + obj.h;
		var i = (obj.i < 10) ? "0" + obj.i : "" + obj.i;
		var s = (obj.s < 10) ? "0" + obj.s : "" + obj.s;
		var tz = this.getTimezoneOffsetString(obj);
		return obj.y + "-" + m + "-" + d + "T" + h + ":" + i + ":" + s + tz;
		return "";
	},
	/**
	 * Return db datetime
	 * @return string
	 */
	getDBTime: function(ctx)
	{
		var m = (obj.m < 10) ? "0" + obj.m : "" + obj.m;
		var d = (obj.d < 10) ? "0" + obj.d : "" + obj.d;
		var h = (obj.h < 10) ? "0" + obj.h : "" + obj.h;
		var i = (obj.i < 10) ? "0" + obj.i : "" + obj.i;
		var s = (obj.s < 10) ? "0" + obj.s : "" + obj.s;
		return obj.y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
		return "";
	},
	/**
	 * Return datetime by UTC
	 * @return string
	 */
	getUTC: function(ctx)
	{
		var dt = this.getDatetime(obj);
		var y = Number(dt.getUTCFullYear());
		var m = Number(dt.getUTCMonth()) + 1;
		var d = Number(dt.getUTCDate());
		var h = Number(dt.getUTCHours());
		var i = Number(dt.getUTCMinutes());
		var s = Number(dt.getUTCSeconds());
		m = (m < 10) ? "0" + m : "" + m;
		d = (d < 10) ? "0" + d : "" + d;
		h = (h < 10) ? "0" + h : "" + h;
		i = (i < 10) ? "0" + i : "" + i;
		s = (s < 10) ? "0" + s : "" + s;
		return y + "-" + m + "-" + d + " " +
			h + ":" + i + ":" + s;
		return "";
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.y = 0;
		this.m = 0;
		this.d = 0;
		this.h = 0;
		this.i = 0;
		this.s = 0;
		this.ms = 0;
		this.tz = "UTC";
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.DateTime)
		{
			this.y = o.y;
			this.m = o.m;
			this.d = o.d;
			this.h = o.h;
			this.i = o.i;
			this.s = o.s;
			this.ms = o.ms;
			this.tz = o.tz;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "y")this.y = v;
		else if (k == "m")this.m = v;
		else if (k == "d")this.d = v;
		else if (k == "h")this.h = v;
		else if (k == "i")this.i = v;
		else if (k == "s")this.s = v;
		else if (k == "ms")this.ms = v;
		else if (k == "tz")this.tz = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
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
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.DateTime";
	},
});
Object.assign(Runtime.DateTime, Runtime.BaseStruct);
Object.assign(Runtime.DateTime,
{
	/**
	 * Create date time from timestamp
	 */
	timestamp: function(ctx, time, tz)
	{
		if (tz == undefined) tz = "UTC";
		var dt = new Date(time*1000);
		return this.fromObject(dt, tz);
		return null;
	},
	/**
	 * Output dbtime
	 */
	dbtime: function(ctx, time, tz)
	{
		if (tz == undefined) tz = "UTC";
		var dt = new Date(time*1000);
		var obj = this.fromObject(dt, tz);
		return obj.getDBTime();
		return "";
	},
	/**
	 * Returns datetime
	 * @param string tz
	 * @return DateTime
	 */
	now: function(ctx, tz)
	{
		if (tz == undefined) tz = "UTC";
		var dt = new Date();
		return this.createDatetime(dt, tz);
		return null;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.DateTime";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.DateTime",
			"name": "Runtime.DateTime",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("y");
			a.push("m");
			a.push("d");
			a.push("h");
			a.push("i");
			a.push("s");
			a.push("ms");
			a.push("tz");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "y") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.DateTime",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "m") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.DateTime",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "d") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.DateTime",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "h") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.DateTime",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "i") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.DateTime",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "s") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.DateTime",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ms") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.DateTime",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "tz") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.DateTime",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.DateTime);
window["Runtime.DateTime"] = Runtime.DateTime;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.DateTime;
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
Runtime.PathInfo = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.PathInfo.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.PathInfo.prototype.constructor = Runtime.PathInfo;
Object.assign(Runtime.PathInfo.prototype,
{
	/**
	 * Returns string
	 */
	toString: function(ctx)
	{
		return this.filepath;
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.filepath = "";
		this.dirname = "";
		this.basename = "";
		this.extension = "";
		this.filename = "";
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.PathInfo)
		{
			this.filepath = o.filepath;
			this.dirname = o.dirname;
			this.basename = o.basename;
			this.extension = o.extension;
			this.filename = o.filename;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "filepath")this.filepath = v;
		else if (k == "dirname")this.dirname = v;
		else if (k == "basename")this.basename = v;
		else if (k == "extension")this.extension = v;
		else if (k == "filename")this.filename = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "filepath")return this.filepath;
		else if (k == "dirname")return this.dirname;
		else if (k == "basename")return this.basename;
		else if (k == "extension")return this.extension;
		else if (k == "filename")return this.filename;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.PathInfo";
	},
});
Object.assign(Runtime.PathInfo, Runtime.BaseStruct);
Object.assign(Runtime.PathInfo,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.PathInfo";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.PathInfo",
			"name": "Runtime.PathInfo",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("filepath");
			a.push("dirname");
			a.push("basename");
			a.push("extension");
			a.push("filename");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "filepath") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.PathInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "dirname") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.PathInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "basename") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.PathInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "extension") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.PathInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "filename") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.PathInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
	__implements__:
	[
		Runtime.StringInterface,
	],
});
Runtime.rtl.defClass(Runtime.PathInfo);
window["Runtime.PathInfo"] = Runtime.PathInfo;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.PathInfo;
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
Runtime.Reference = function(ctx, ref)
{
	if (ref == undefined) ref = null;
	Runtime.BaseObject.call(this, ctx);
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
	assignObject1: function(ctx, obj)
	{
		if (obj instanceof Runtime.Reference)
		{
			this.uq = obj.uq;
			this.ref = this.ref;
		}
		Runtime.BaseObject.prototype.assignObject1.call(this, ctx, obj);
	},
	_init: function(ctx)
	{
		this.uq = Runtime.rtl.unique(ctx);
		this.ref = null;
		Runtime.BaseObject.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Reference)
		{
			this.uq = o.uq;
			this.ref = o.ref;
		}
		Runtime.BaseObject.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "uq")this.uq = v;
		else if (k == "ref")this.ref = v;
		else Runtime.BaseObject.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "uq")return this.uq;
		else if (k == "ref")return this.ref;
		return Runtime.BaseObject.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Reference";
	},
});
Object.assign(Runtime.Reference, Runtime.BaseObject);
Object.assign(Runtime.Reference,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Reference";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Reference",
			"name": "Runtime.Reference",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("uq");
			a.push("ref");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "uq") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Reference",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ref") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Reference",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.IntrospectionClass = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.IntrospectionClass.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.IntrospectionClass.prototype.constructor = Runtime.IntrospectionClass;
Object.assign(Runtime.IntrospectionClass.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.class_name = "";
		this.class_info = null;
		this.fields = null;
		this.methods = null;
		this.interfaces = null;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.IntrospectionClass)
		{
			this.class_name = o.class_name;
			this.class_info = o.class_info;
			this.fields = o.fields;
			this.methods = o.methods;
			this.interfaces = o.interfaces;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "class_name")this.class_name = v;
		else if (k == "class_info")this.class_info = v;
		else if (k == "fields")this.fields = v;
		else if (k == "methods")this.methods = v;
		else if (k == "interfaces")this.interfaces = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "class_name")return this.class_name;
		else if (k == "class_info")return this.class_info;
		else if (k == "fields")return this.fields;
		else if (k == "methods")return this.methods;
		else if (k == "interfaces")return this.interfaces;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.IntrospectionClass";
	},
});
Object.assign(Runtime.IntrospectionClass, Runtime.BaseStruct);
Object.assign(Runtime.IntrospectionClass,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.IntrospectionClass";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.IntrospectionClass",
			"name": "Runtime.IntrospectionClass",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("class_name");
			a.push("class_info");
			a.push("fields");
			a.push("methods");
			a.push("interfaces");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "class_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_info") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "fields") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "methods") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "interfaces") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.IntrospectionClass);
window["Runtime.IntrospectionClass"] = Runtime.IntrospectionClass;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.IntrospectionClass;
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
Runtime.IntrospectionInfo = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.IntrospectionInfo.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.IntrospectionInfo.prototype.constructor = Runtime.IntrospectionInfo;
Object.assign(Runtime.IntrospectionInfo.prototype,
{
	/**
	 * Returns true if has annotations by class_name
	 * @string class_name
	 * @return bool
	 */
	filterAnnotations: function(ctx, class_name)
	{
		if (this.annotations == null)
		{
			return null;
		}
		return this.annotations.filter(ctx, Runtime.lib.isInstance(ctx, class_name)).toCollection(ctx);
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.class_name = "";
		this.kind = "";
		this.name = "";
		this.annotations = null;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.IntrospectionInfo)
		{
			this.class_name = o.class_name;
			this.kind = o.kind;
			this.name = o.name;
			this.annotations = o.annotations;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "class_name")this.class_name = v;
		else if (k == "kind")this.kind = v;
		else if (k == "name")this.name = v;
		else if (k == "annotations")this.annotations = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "class_name")return this.class_name;
		else if (k == "kind")return this.kind;
		else if (k == "name")return this.name;
		else if (k == "annotations")return this.annotations;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.IntrospectionInfo";
	},
});
Object.assign(Runtime.IntrospectionInfo, Runtime.BaseStruct);
Object.assign(Runtime.IntrospectionInfo,
{
	ITEM_CLASS: "class",
	ITEM_FIELD: "field",
	ITEM_METHOD: "method",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.IntrospectionInfo";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.IntrospectionInfo",
			"name": "Runtime.IntrospectionInfo",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("class_name");
			a.push("kind");
			a.push("name");
			a.push("annotations");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ITEM_CLASS") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ITEM_FIELD") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ITEM_METHOD") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "kind") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "annotations") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.IntrospectionInfo);
window["Runtime.IntrospectionInfo"] = Runtime.IntrospectionInfo;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.IntrospectionInfo;
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
var isBrowser=function(){return typeof window !== "undefined" && this === window;}
Runtime.RuntimeUtils = function(ctx)
{
};
Object.assign(Runtime.RuntimeUtils.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.RuntimeUtils)
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.RuntimeUtils";
	},
});
Object.assign(Runtime.RuntimeUtils,
{
	_global_context: null,
	_variables_names: null,
	JSON_PRETTY: 1,
	/**
	 * Returns global context
	 * @return Context
	 */
	getContext: function()
	{
		return Runtime.RuntimeUtils._global_context;
	},
	/**
	 * Set global context
	 * @param Context context
	 */
	setContext: function(context)
	{
		/*if (isBrowser()) Runtime.RuntimeUtils._global_context = context;
		else RuntimeUtils._global_context = context;*/
		use("Runtime.RuntimeUtils")._global_context = context;
		return context;
	},
	/* ========================== Class Introspection Functions ========================== */
	/**
	 * Returns parents class names
	 * @return Vector<string>
	 */
	getParents: function(ctx, class_name)
	{
		var res = new Runtime.Vector(ctx);
		res.push(ctx, class_name);
		while (class_name != "")
		{
			var f = Runtime.rtl.method(ctx, class_name, "getParentClassName");
			class_name = f(ctx);
			if (class_name != "")
			{
				res.push(ctx, class_name);
			}
		}
		return res.toCollection(ctx);
	},
	/**
	 * Returns Introspection of the class name
	 * @param string class_name
	 * @return Vector<IntrospectionInfo>
	 */
	getVariablesNames: function(ctx, class_name, flag)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.RuntimeUtils.getVariablesNames", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (flag == undefined) flag = 2;
		/* Get parents names */
		var class_names = Runtime.RuntimeUtils.getParents(ctx, class_name);
		var names = class_names.reduce(ctx, (ctx, names, item_class_name) => 
		{
			var item_fields = null;
			var f = Runtime.rtl.method(ctx, item_class_name, "getFieldsList");
			try
			{
				item_fields = f(ctx, flag);
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
			if (item_fields != null)
			{
				names.appendVector(ctx, item_fields);
			}
			return names;
		}, new Runtime.Vector(ctx));
		var __memorize_value = names.toCollection(ctx);
		Runtime.rtl._memorizeSave("Runtime.RuntimeUtils.getVariablesNames", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns Introspection of the class name
	 * @param string class_name
	 * @return Vector<IntrospectionInfo>
	 */
	getClassIntrospection: function(ctx, class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.RuntimeUtils.getClassIntrospection", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var class_info = null;
		var fields = new Runtime.Map(ctx);
		var methods = new Runtime.Map(ctx);
		var info = null;
		if (!Runtime.rtl.class_exists(ctx, class_name))
		{
			var __memorize_value = null;
			Runtime.rtl._memorizeSave("Runtime.RuntimeUtils.getClassIntrospection", arguments, __memorize_value);
			return __memorize_value;
		}
		/* Append annotations */
		var appendAnnotations = (ctx, arr, name, info) => 
		{
			if (info == null)
			{
				return ;
			}
			if (!arr.has(ctx, name))
			{
				arr.set(ctx, name, new Runtime.Vector(ctx));
			}
			var v = arr.item(ctx, name);
			v.appendVector(ctx, info.annotations);
		};
		/* Get Class Info */
		try
		{
			info = Runtime.rtl.method(ctx, class_name, "getClassInfo")(ctx);
			if (info != null)
			{
				class_info = info.annotations;
			}
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
		/* Get parents names */
		var class_names = Runtime.RuntimeUtils.getParents(ctx, class_name);
		for (var i = 0;i < class_names.count(ctx);i++)
		{
			var item_class_name = class_names.item(ctx, i);
			/* Get fields introspection */
			var item_fields = null;
			try
			{
				item_fields = Runtime.rtl.method(ctx, item_class_name, "getFieldsList")(ctx, 3);
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
			for (var j = 0;j < item_fields.count(ctx);j++)
			{
				var field_name = item_fields.item(ctx, j);
				info = Runtime.rtl.method(ctx, item_class_name, "getFieldInfoByName")(ctx, field_name);
				appendAnnotations(ctx, fields, field_name, info);
			}
			/* Get methods introspection */
			var item_methods = null;
			try
			{
				item_methods = Runtime.rtl.method(ctx, item_class_name, "getMethodsList")(ctx);
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
			for (var j = 0;j < item_methods.count(ctx);j++)
			{
				var method_name = item_methods.item(ctx, j);
				info = Runtime.rtl.method(ctx, item_class_name, "getMethodInfoByName")(ctx, method_name);
				appendAnnotations(ctx, methods, method_name, info);
			}
		}
		/* To Collection */
		methods = methods.map(ctx, (ctx, item, name) => 
		{
			return item.toCollection(ctx);
		});
		fields = fields.map(ctx, (ctx, item, name) => 
		{
			return item.toCollection(ctx);
		});
		var __memorize_value = new Runtime.IntrospectionClass(ctx, Runtime.Dict.from({"class_name":class_name,"class_info":(class_info != null) ? (class_info.toCollection(ctx)) : (null),"fields":fields.toDict(ctx),"methods":methods.toDict(ctx),"interfaces":Runtime.rtl.getInterfaces(ctx, class_name)}));
		Runtime.rtl._memorizeSave("Runtime.RuntimeUtils.getClassIntrospection", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns Introspection of the class name
	 * @param string class_name
	 * @return Vector<IntrospectionInfo>
	 */
	getClassIntrospectionWithParents: function(ctx, class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.RuntimeUtils.getClassIntrospectionWithParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = this.getClassIntrospection(ctx, class_name);
		Runtime.rtl._memorizeSave("Runtime.RuntimeUtils.getClassIntrospectionWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns methods in class by annotation name
	 */
	getMethodsIntrospection: function(ctx, class_name, annotations)
	{
		var class_info = Runtime.RuntimeUtils.getClassIntrospection(ctx, class_name);
		var d = class_info.methods.filter(ctx, (ctx, arr, method_name) => 
		{
			arr = arr.filter(ctx, (ctx, item) => 
			{
				for (var i = 0;i < annotations.count(ctx);i++)
				{
					var annotation_name = annotations.item(ctx, i);
					if (Runtime.rtl.is_instanceof(ctx, item, annotation_name))
					{
						return true;
					}
				}
				return false;
			});
			return arr.count(ctx) > 0;
		});
		return d.keys(ctx);
	},
	/* ============================= Serialization Functions ============================= */
	ObjectToNative: function(ctx, value, force_class_name)
	{
		if (force_class_name == undefined) force_class_name = true;
		var value1 = Runtime.RuntimeUtils.ObjectToPrimitive(ctx, value, force_class_name);
		var value2 = Runtime.RuntimeUtils.PrimitiveToNative(ctx, value1);
		return value2;
	},
	NativeToObject: function(ctx, value)
	{
		var value1 = Runtime.RuntimeUtils.NativeToPrimitive(ctx, value);
		var value2 = Runtime.RuntimeUtils.PrimitiveToObject(ctx, value1);
		return value2;
	},
	/**
	 * Returns object to primitive value
	 * @param var obj
	 * @return var
	 */
	ObjectToPrimitive: function(ctx, obj, force_class_name)
	{
		if (force_class_name == undefined) force_class_name = true;
		if (obj === null)
		{
			return null;
		}
		if (Runtime.rtl.isScalarValue(ctx, obj))
		{
			return obj;
		}
		if (obj instanceof Runtime.Collection)
		{
			return obj.map(ctx, (ctx, value) => 
			{
				return this.ObjectToPrimitive(ctx, value, force_class_name);
			});
			/*
			Vector<var> res = new Vector();
			for (int i=0; i<obj.count(); i++)
			{
				var value = obj.item(i);
				value = self::ObjectToPrimitive( value, force_class_name );
				res.push(value);
			}
			return res.toCollection();
			*/
		}
		if (obj instanceof Runtime.Dict)
		{
			obj = obj.map(ctx, (ctx, value, key) => 
			{
				return this.ObjectToPrimitive(ctx, value, force_class_name);
			});
			/*
			Map<var> res = new Map();
			Vector<string> keys = obj.keys();
			
			for (int i=0; i<keys.count(); i++)
			{
				string key = keys.item(i);
				var value = obj.item(key);
				value = self::ObjectToPrimitive( value, force_class_name );
				res.set(key, value);
			}
			
			delete keys;
			*/
			/*
			if (force_class_name)
			{
				obj = obj.setIm("__class_name__", classof Dict);
			}
			*/
			return obj.toDict(ctx);
		}
		if (obj instanceof Runtime.BaseStruct)
		{
			var values = new Runtime.Map(ctx);
			var names = this.getVariablesNames(ctx, obj.getClassName(ctx), 1);
			for (var i = 0;i < names.count(ctx);i++)
			{
				var variable_name = names.item(ctx, i);
				var value = obj.takeValue(ctx, variable_name, null);
				var value = Runtime.RuntimeUtils.ObjectToPrimitive(ctx, value, force_class_name);
				values.set(ctx, variable_name, value);
			}
			if (force_class_name)
			{
				values.set(ctx, "__class_name__", obj.getClassName(ctx));
			}
			return values.toDict(ctx);
		}
		return null;
	},
	/**
	 * Returns object to primitive value
	 * @param SerializeContainer container
	 * @return var
	 */
	PrimitiveToObject: function(ctx, obj)
	{
		if (obj === null)
		{
			return null;
		}
		if (Runtime.rtl.isScalarValue(ctx, obj))
		{
			return obj;
		}
		if (obj instanceof Runtime.Collection)
		{
			var res = new Runtime.Vector(ctx);
			for (var i = 0;i < obj.count(ctx);i++)
			{
				var value = obj.item(ctx, i);
				value = Runtime.RuntimeUtils.PrimitiveToObject(ctx, value);
				res.push(ctx, value);
			}
			return res.toCollection(ctx);
		}
		if (obj instanceof Runtime.Dict)
		{
			var res = new Runtime.Map(ctx);
			var keys = obj.keys(ctx);
			for (var i = 0;i < keys.count(ctx);i++)
			{
				var key = keys.item(ctx, i);
				var value = obj.item(ctx, key);
				value = Runtime.RuntimeUtils.PrimitiveToObject(ctx, value);
				res.set(ctx, key, value);
			}
			if (!res.has(ctx, "__class_name__"))
			{
				return res.toDict(ctx);
			}
			if (res.item(ctx, "__class_name__") == "Runtime.Map" || res.item(ctx, "__class_name__") == "Runtime.Dict")
			{
				res.remove(ctx, "__class_name__");
				return res.toDict(ctx);
			}
			var class_name = res.item(ctx, "__class_name__");
			if (!Runtime.rtl.class_exists(ctx, class_name))
			{
				return null;
			}
			if (!Runtime.rtl.class_implements(ctx, class_name, "Runtime.SerializeInterface"))
			{
				return null;
			}
			/* Assign values */
			var obj = new Runtime.Map(ctx);
			var names = this.getVariablesNames(ctx, class_name, 1);
			for (var i = 0;i < names.count(ctx);i++)
			{
				var variable_name = names.item(ctx, i);
				if (variable_name != "__class_name__")
				{
					var value = res.get(ctx, variable_name, null);
					obj.set(ctx, variable_name, value);
				}
			}
			/* New instance */
			var instance = Runtime.rtl.newInstance(ctx, class_name, Runtime.Collection.from([obj]));
			return instance;
		}
		return null;
	},
	NativeToPrimitive: function(ctx, value)
	{
		/*var _rtl = null; if (isBrowser()) _rtl=Runtime.rtl; else _rtl=rtl;
		var _Utils = null; if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=RuntimeUtils;
		var _Vector=null; if (isBrowser()) _Vector=Runtime.Vector; else _Vector=Vector;
		var _Map=null; if (isBrowser()) _Map=Runtime.Map; else _Map=Map;*/
		
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Dict = use("Runtime.Dict");
		
		if (value === null)
			return null;
		
		if (Array.isArray(value)){
			var new_value = _Collection.from(value);
			new_value = new_value.map(ctx, (ctx, val)=>{
				return _Utils.NativeToPrimitive(ctx, val);
			});
			return new_value;
		}
		if (typeof value == 'object'){
			var new_value = _Dict.from(value);
			new_value = new_value.map(ctx, (ctx, val, key)=>{
				return _Utils.NativeToPrimitive(ctx, val);
			});
			return new_value;
		}
		
		return value;
	},
	PrimitiveToNative: function(ctx, value)
	{
		/*var _rtl = null; if (isBrowser()) _rtl=Runtime.rtl; else _rtl=rtl;
		var _Utils = null; if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=Utils;
		var _Collection=null; if (isBrowser()) _Collection=Runtime.Collection; else _Collection=Collection;
		var _Dict=null; if (isBrowser()) _Dict=Runtime.Dict; else _Dict=Dict;*/
		
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Dict = use("Runtime.Dict");
		
		if (value === null)
			return null;
		
		if (value instanceof _Collection)
		{
			var arr = [];
			value.each((v)=>{
				arr.push( _Utils.PrimitiveToNative(v) );
			});
			return arr;
		}
		if (value instanceof _Dict)
		{
			var obj = {};
			value.each((v, k)=>{
				obj[k] = _Utils.PrimitiveToNative(v);
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
	json_encode: function(ctx, value, flags, convert)
	{
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		/*
		var _Utils=null;if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=RuntimeUtils;
		var _Collection=null;if (isBrowser()) _Collection=Runtime.Collection; else _Collection=Collection;
		var _Dict=null;if (isBrowser()) _Dict=Runtime.Dict; else _Dict=Dict;
		var _rtl=null;if (isBrowser()) _rtl=Runtime.rtl; else _rtl=rtl;
		*/
		
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Dict = use("Runtime.Dict");
		
		if (convert) value = _Utils.ObjectToPrimitive(ctx, value);
		return JSON.stringify(value, (key, value) => {
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
	json_decode: function(ctx, obj)
	{
		try{
			/*
			var _Utils=null;if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=RuntimeUtils;
			var _Vector=null;if (isBrowser()) _Vector=Runtime.Vector; else _Vector=Vector;
			var _Map=null;if (isBrowser()) _Map=Runtime.Map; else _Map=Map;	
			*/
			
			var _rtl = use("Runtime.rtl");
			var _Utils = use("Runtime.RuntimeUtils");
			var _Collection = use("Runtime.Collection");
			var _Dict = use("Runtime.Dict");
			
			var obj = JSON.parse(obj, function (key, value){
				if (value == null) return value;
				if (Array.isArray(value)){
					return _Collection.from(value);
				}
				if (typeof value == 'object'){
					return _Dict.from(value);
				}
				return value;
			});
			return _Utils.PrimitiveToObject(ctx, obj);
		}
		catch(e){
			throw e;
		}
		return null;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.RuntimeUtils";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.RuntimeUtils",
			"name": "Runtime.RuntimeUtils",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "_global_context") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeUtils",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "_variables_names") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeUtils",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "JSON_PRETTY") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeUtils",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.RuntimeUtils);
window["Runtime.RuntimeUtils"] = Runtime.RuntimeUtils;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.RuntimeUtils;
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
Runtime.ModuleDescription = function(ctx)
{
};
Object.assign(Runtime.ModuleDescription.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.ModuleDescription)
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.ModuleDescription";
	},
});
Object.assign(Runtime.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function(ctx)
	{
		return "Runtime";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function(ctx)
	{
		return "0.10.3";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function(ctx)
	{
		return null;
	},
	/**
	 * Returns enities
	 */
	entities: function(ctx)
	{
		return Runtime.Collection.from([]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.ModuleDescription";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.ModuleDescription",
			"name": "Runtime.ModuleDescription",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.ApiException = function(ctx, message, code, response, prev)
{
	if (message == undefined) message = "";
	if (code == undefined) code = -1;
	if (response == undefined) response = null;
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, ctx, message, code, prev);
	this.response = response;
};
Runtime.Core.ApiException.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Core.ApiException.prototype.constructor = Runtime.Core.ApiException;
Object.assign(Runtime.Core.ApiException.prototype,
{
	_init: function(ctx)
	{
		this.response = null;
		Runtime.Exceptions.RuntimeException.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Core.ApiException)
		{
			this.response = o.response;
		}
		Runtime.Exceptions.RuntimeException.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "response")this.response = v;
		else Runtime.Exceptions.RuntimeException.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "response")return this.response;
		return Runtime.Exceptions.RuntimeException.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.ApiException";
	},
});
Object.assign(Runtime.Core.ApiException, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Core.ApiException,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.ApiException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Core.ApiException",
			"name": "Runtime.Core.ApiException",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("response");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "response") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.ApiException",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Core.ApiException);
window["Runtime.Core.ApiException"] = Runtime.Core.ApiException;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Core.ApiException;
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.BusDriverInterface = function(ctx)
{
};
Object.assign(Runtime.Core.BusDriverInterface.prototype,
{
	/**
	 * Send message
	 * @return string
	 */
	sendMessage: async function(ctx, msg)
	{
	},
	/**
	 * Send message
	 * @return string
	 */
	remoteBusCall: async function(ctx, request)
	{
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.BusDriverInterface";
	},
});
Object.assign(Runtime.Core.BusDriverInterface,
{
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.BusDriverInterface";
	},
});
Runtime.rtl.defClass(Runtime.Core.BusDriverInterface);
window["Runtime.Core.BusDriverInterface"] = Runtime.Core.BusDriverInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Core.BusDriverInterface;
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.Context = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Core.Context.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Core.Context.prototype.constructor = Runtime.Core.Context;
Object.assign(Runtime.Core.Context.prototype,
{
	/**
	 * Returns enviroment by eky
	 */
	env: function(ctx, key, def_value)
	{
		if (def_value == undefined) def_value = "";
		var __v0 = new Runtime.Monad(ctx, this);
		__v0 = __v0.attr(ctx, "enviroments");
		__v0 = __v0.call(ctx, Runtime.lib.get(ctx, key, def_value));
		return __v0.value(ctx);
	},
	/**
	 * Returns settings
	 * @return Dict<string>
	 */
	config: function(ctx, items, d)
	{
		if (d == undefined) d = null;
		var __v0 = new Runtime.Monad(ctx, this);
		__v0 = __v0.attr(ctx, "settings");
		__v0 = __v0.call(ctx, Runtime.lib.get(ctx, "config", null));
		__v0 = __v0.call(ctx, Runtime.lib.attr(ctx, items, d));
		return __v0.value(ctx);
	},
	/**
	 * Returns docker secret key
	 */
	secret: function(ctx, key)
	{
		var __v0 = new Runtime.Monad(ctx, this);
		__v0 = __v0.attr(ctx, "settings");
		__v0 = __v0.call(ctx, Runtime.lib.get(ctx, "secrets", null));
		__v0 = __v0.call(ctx, Runtime.lib.get(ctx, key, ""));
		return __v0.value(ctx);
	},
	/* ------------------ Object Manager ---------------- */
	/**
	 * Add object
	 */
	addObject: function(ctx, obj, object_name)
	{
		if (object_name == undefined) object_name = "";
		this.object_manager.addObject(ctx, obj, object_name);
		return this;
	},
	/**
	 * Register listener
	 */
	registerListener: function(ctx, from, event_class_name, object_name, method_name)
	{
		if (method_name == undefined) method_name = "";
		return this.object_manager.registerListener(ctx, from, event_class_name, object_name, method_name);
	},
	/**
	 * Find listeners
	 */
	findListeners: function(ctx, from, event_class_name)
	{
		if (event_class_name == undefined) event_class_name = "";
		return this.object_manager.findListeners(ctx, from, event_class_name);
	},
	/**
	 * Get object
	 */
	getObject: function(ctx, object_name)
	{
		return this.object_manager.getObject(ctx, object_name);
	},
	/**
	 * Get objects
	 */
	getObjects: function(ctx, object_name)
	{
		return this.object_manager.getObjects(ctx, object_name);
	},
	/**
	 * Get driver
	 */
	getDriver: function(ctx, driver_name)
	{
		return this.object_manager.getDriver(ctx, driver_name);
	},
	/**
	 * Get drivers
	 */
	getDrivers: function(ctx, class_name)
	{
		return this.object_manager.getDrivers(ctx, class_name);
	},
	/**
	 * Remove object
	 */
	removeObject: function(ctx, object_name)
	{
		this.object_manager.removeObject(ctx, object_name);
		return this;
	},
	/**
	 * Send message
	 * @param Message msg
	 * @return Message
	 */
	sendLocalMessage: async function(ctx, msg)
	{
		await this.object_manager.sendMessage(ctx, msg);
	},
	/**
	 * Remote call
	 * @param Dict items
	 * @return RemoteCallAnswer
	 */
	remoteLocalCall: async function(ctx, items)
	{
		return await this.object_manager.remoteCall(ctx, items);
	},
	/**
	 * Send message
	 * @param Message msg
	 * @return Message
	 */
	sendBusMessage: async function(ctx, msg)
	{
		var driver = this.getDriver(ctx, "default:external_bus");
		await driver.sendMessage(ctx, msg);
	},
	/**
	 * Remote call
	 * @param Dict items
	 * @return RemoteCallAnswer
	 */
	remoteBusCall: async function(ctx, items)
	{
		var driver = this.getDriver(ctx, "default:external_bus");
		return Promise.resolve(await driver.remoteCall(ctx, items));
	},
	/* ---------------------- Chain --------------------- */
	/**
	 * Apply Lambda Chain
	 */
	chain: function(ctx, chain_name, args)
	{
		var entities = this.entities.filter(ctx, (ctx, item) => 
		{
			return item instanceof Runtime.Core.LambdaChain && item.name == chain_name && item.is_async == false;
		});
		entities = entities.sortIm(ctx, (ctx, a, b) => 
		{
			return a.pos > b.pos;
		});
		for (var i = 0;i < entities.count(ctx);i++)
		{
			var item = entities.item(ctx, i);
			var item_chain_name = item.chain;
			if (item_chain_name != "")
			{
				args = this.chain(ctx, item_chain_name, args);
			}
			else
			{
				var arr = Runtime.rs.split(ctx, "::", item.value);
				var class_name = arr.get(ctx, 0, "");
				var method_name = arr.get(ctx, 1, "");
				var f = Runtime.rtl.method(ctx, class_name, method_name);
				args = Runtime.rtl.apply(ctx, f, args);
			}
		}
		return args;
	},
	/**
	 * Apply Lambda Chain Await
	 */
	chainAsync: async function(ctx, chain_name, args)
	{
		var entities = this.entities.filter(ctx, (ctx, item) => 
		{
			return item instanceof Runtime.Core.LambdaChain && item.name == chain_name;
		});
		entities = entities.sortIm(ctx, (ctx, a, b) => 
		{
			return a.pos > b.pos;
		});
		for (var i = 0;i < entities.count(ctx);i++)
		{
			var item = entities.item(ctx, i);
			var item_chain_name = item.chain;
			if (item_chain_name != "")
			{
				args = await this.chainAsync(ctx, item_chain_name, args);
			}
			else
			{
				var arr = Runtime.rs.split(ctx, "::", item.value);
				var class_name = arr.get(ctx, 0, "");
				var method_name = arr.get(ctx, 1, "");
				var f = Runtime.rtl.method(ctx, class_name, method_name);
				if (item.is_async)
				{
					args = await Runtime.rtl.apply(ctx, f, args);
				}
				else
				{
					args = Runtime.rtl.apply(ctx, f, args);
				}
			}
		}
		return Promise.resolve(args);
	},
	/**
	 * Translate message
	 * @params string space - message space
	 * @params string message - message need to be translated
	 * @params Map params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate: function(ctx, space, message, params, locale)
	{
		if (params == undefined) params = null;
		if (locale == undefined) locale = "";
		message = (params == null) ? (message) : (params.reduce(ctx, (ctx, message, value, key) => 
		{
			return Runtime.rs.replace(ctx, "%" + Runtime.rtl.toStr(key) + Runtime.rtl.toStr("%"), value, message);
		}, message));
		return message;
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.base_path = null;
		this.enviroments = null;
		this.settings = null;
		this.modules = null;
		this.entities = null;
		this.cli_args = null;
		this.initialized = false;
		this.started = false;
		this.start_time = 0;
		this.entry_point = "";
		this.main_module = "";
		this.main_class = "";
		this.object_manager = null;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Core.Context)
		{
			this.base_path = o.base_path;
			this.enviroments = o.enviroments;
			this.settings = o.settings;
			this.modules = o.modules;
			this.entities = o.entities;
			this.cli_args = o.cli_args;
			this.initialized = o.initialized;
			this.started = o.started;
			this.start_time = o.start_time;
			this.entry_point = o.entry_point;
			this.main_module = o.main_module;
			this.main_class = o.main_class;
			this.object_manager = o.object_manager;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "base_path")this.base_path = v;
		else if (k == "enviroments")this.enviroments = v;
		else if (k == "settings")this.settings = v;
		else if (k == "modules")this.modules = v;
		else if (k == "entities")this.entities = v;
		else if (k == "cli_args")this.cli_args = v;
		else if (k == "initialized")this.initialized = v;
		else if (k == "started")this.started = v;
		else if (k == "start_time")this.start_time = v;
		else if (k == "entry_point")this.entry_point = v;
		else if (k == "main_module")this.main_module = v;
		else if (k == "main_class")this.main_class = v;
		else if (k == "object_manager")this.object_manager = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "base_path")return this.base_path;
		else if (k == "enviroments")return this.enviroments;
		else if (k == "settings")return this.settings;
		else if (k == "modules")return this.modules;
		else if (k == "entities")return this.entities;
		else if (k == "cli_args")return this.cli_args;
		else if (k == "initialized")return this.initialized;
		else if (k == "started")return this.started;
		else if (k == "start_time")return this.start_time;
		else if (k == "entry_point")return this.entry_point;
		else if (k == "main_module")return this.main_module;
		else if (k == "main_class")return this.main_class;
		else if (k == "object_manager")return this.object_manager;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.Context";
	},
});
Object.assign(Runtime.Core.Context, Runtime.BaseStruct);
Object.assign(Runtime.Core.Context,
{
	/**
	 * Returns app name
	 * @return string
	 */
	appName: function(ctx)
	{
		return "";
	},
	/**
	 * Returns context settings
	 * @return Dict<string>
	 */
	getSettings: function(ctx, env)
	{
		return null;
	},
	/**
	 * Extends entities
	 */
	getEntities: function(ctx, entities)
	{
		return null;
	},
	/**
	 * Create context
	 *
	 * @params Dict env
	 * @params Collection<string> modules
	 * @params Dict settings
	 * @return Context
	 */
	create: function(ctx, env)
	{
		if (env == undefined) env = null;
		var settings = Runtime.Dict.from({});
		/* Context data */
		var obj = Runtime.Dict.from({"enviroments":env,"settings":settings,"modules":Runtime.Collection.from([]),"object_manager":new Runtime.Core.ObjectManager(ctx)});
		/* Create context */
		var ctx = this.newInstance(ctx, obj);
		return ctx;
	},
	/**
	 * Set main module
	 */
	setMainModule: function(ctx, c, main_module)
	{
		var settings = Runtime.Dict.from({});
		var main_module_class_name = "";
		/* Get settings */
		if (main_module)
		{
			main_module_class_name = main_module + Runtime.rtl.toStr(".ModuleDescription");
			if (Runtime.rtl.method_exists(ctx, main_module_class_name, "appSettings"))
			{
				var f = Runtime.rtl.method(ctx, main_module_class_name, "appSettings");
				settings = f(ctx, c.enviroments);
			}
		}
		/* Add main module */
		if (main_module)
		{
			c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["modules"]), c.modules.pushIm(ctx, main_module));
		}
		/* Set main module */
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["main_module"]), main_module);
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["main_class"]), main_module_class_name);
		/* Set entry point */
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["entry_point"]), main_module_class_name);
		/* Set new settings */
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["settings"]), settings);
		return c;
	},
	/**
	 * Set entry point
	 */
	setEntryPoint: function(ctx, c, entry_point)
	{
		return c.copy(ctx, Runtime.Dict.from({"entry_point":entry_point}));
	},
	/**
	 * Init context
	 */
	init: function(ctx, c)
	{
		ctx = c;
		if (c.initialized)
		{
			return c;
		}
		/* Extends modules */
		var modules = this.getRequiredModules(ctx, c.modules);
		/* Get modules entities */
		var entities = this.getEntitiesFromModules(ctx, modules);
		entities = entities.prependCollectionIm(ctx, this.getEntities(ctx, c.env));
		/* Base path */
		var base_path = (c.base_path != "") ? (c.base_path) : (Runtime.rtl.attr(ctx, c.env, Runtime.Collection.from(["BASE_PATH"]), "", "string"));
		/* Add entities */
		if (c.entities != null)
		{
			entities = entities.appendCollectionIm(ctx, c.entities);
		}
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["entities"]), entities);
		/* Extend entities */
		var __v0 = new Runtime.Monad(ctx, c.chain(ctx, "Runtime.Entities", Runtime.Collection.from([c,entities])));
		__v0 = __v0.attr(ctx, 1);
		entities = __v0.value(ctx);
		entities = this.extendEntities(ctx, c, entities);
		entities = this.getRequiredEntities(ctx, entities);
		return c.copy(ctx, Runtime.Dict.from({"modules":modules,"entities":entities,"base_path":base_path,"initialized":true}));
	},
	/**
	 * Start context
	 */
	start: async function(ctx, c)
	{
		ctx = c;
		if (c.started)
		{
			return Promise.resolve(c);
		}
		/* Start Object Manager */
		await c.object_manager.startManager(ctx, c.entities);
		return Promise.resolve(c.copy(ctx, Runtime.Dict.from({"started":true})));
	},
	/**
	 * Init
	 */
	appInit: async function(ctx, c)
	{
		var main_class = c.main_class;
		/* Init app */
		if (main_class != "" && Runtime.rtl.method_exists(ctx, main_class, "appInit"))
		{
			var init = Runtime.rtl.method(ctx, main_class, "appInit");
			c = init(ctx, c);
		}
		else
		{
			c = c.constructor.init(ctx, c);
		}
		return Promise.resolve(c);
	},
	/**
	 * Start
	 */
	appStart: async function(ctx, c)
	{
		var main_class = c.main_class;
		/* Start app */
		if (main_class != "" && Runtime.rtl.method_exists(ctx, main_class, "appStart"))
		{
			var start = Runtime.rtl.method(ctx, main_class, "appStart");
			c = await start(ctx, c);
		}
		else
		{
			c = await c.constructor.start(ctx, c);
		}
		return Promise.resolve(c);
	},
	/**
	 * Run entry point
	 */
	appRun: async function(ctx, c)
	{
		ctx = c;
		var entry_point = c.entry_point;
		/* Run entrypoint */
		if (entry_point != "")
		{
			var run = Runtime.rtl.method(ctx, entry_point, "appRun");
			await run(c);
		}
		return Promise.resolve(c);
	},
	/**
	 * Run application
	 */
	run: async function(ctx, c, f1, f2)
	{
		if (f1 == undefined) f1 = null;
		if (f2 == undefined) f2 = null;
		c = await this.appInit(ctx, c);
		if (f1 != null)
		{
			c = await f1(ctx, c);
		}
		c = await this.appStart(ctx, c);
		if (f2 != null)
		{
			c = await f2(ctx, c);
		}
		c = await this.appRun(ctx, c);
		return Promise.resolve(c);
	},
	/* -------------------- Functions ------------------- */
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	_getRequiredModules: function(ctx, res, cache, modules, filter)
	{
		if (filter == undefined) filter = null;
		if (modules == null)
		{
			return ;
		}
		if (filter)
		{
			modules = modules.filter(ctx, filter);
		}
		for (var i = 0;i < modules.count(ctx);i++)
		{
			var module_name = modules.item(ctx, i);
			if (cache.get(ctx, module_name, false) == false)
			{
				cache.set(ctx, module_name, true);
				var f = Runtime.rtl.method(ctx, module_name + Runtime.rtl.toStr(".ModuleDescription"), "requiredModules");
				var sub_modules = f(ctx);
				if (sub_modules != null)
				{
					var sub_modules = sub_modules.keys(ctx);
					this._getRequiredModules(ctx, res, cache, sub_modules);
				}
				res.push(ctx, module_name);
			}
		}
	},
	/**
	 * Returns all modules
	 * @param Collection<string> modules
	 * @return Collection<string>
	 */
	getRequiredModules: function(ctx, modules)
	{
		var res = new Runtime.Vector(ctx);
		var cache = new Runtime.Map(ctx);
		this._getRequiredModules(ctx, res, cache, modules);
		res = res.removeDublicatesIm(ctx);
		return res.toCollection(ctx);
	},
	/**
	 * Returns modules entities
	 */
	getEntitiesFromModules: function(ctx, modules)
	{
		var entities = new Runtime.Vector(ctx);
		for (var i = 0;i < modules.count(ctx);i++)
		{
			var module_class_name = modules.item(ctx, i) + Runtime.rtl.toStr(".ModuleDescription");
			if (Runtime.rtl.method_exists(ctx, module_class_name, "entities"))
			{
				var f = Runtime.rtl.method(ctx, module_class_name, "entities");
				var arr = f(ctx);
				entities.appendVector(ctx, arr);
			}
		}
		return entities.toCollection(ctx);
	},
	/**
	 * Extend entities
	 */
	getRequiredEntities: function(ctx, entities)
	{
		var e = entities.toVector(ctx);
		for (var i = 0;i < entities.count(ctx);i++)
		{
			var item1 = entities.item(ctx, i);
			var item1_class_name = item1.getClassName(ctx);
			if (item1_class_name == "Runtime.Core.Entity")
			{
				var class_name = (item1.value != "") ? (item1.value) : (item1.name);
				var info = Runtime.RuntimeUtils.getClassIntrospection(ctx, class_name);
				if (info != null && info.class_info)
				{
					for (var j = 0;j < info.class_info.count(ctx);j++)
					{
						var item2 = info.class_info.item(ctx, j);
						var item2_class_name = item2.getClassName(ctx);
						if (item2 instanceof Runtime.Core.Entity && item2_class_name != "Runtime.Core.Entity")
						{
							item2 = item2.copy(ctx, Runtime.Dict.from({"name":class_name}));
							e.push(ctx, item2);
						}
					}
				}
			}
		}
		return e.toCollection(ctx);
	},
	/**
	 * Extends entities
	 */
	extendEntities: function(ctx, c, entities)
	{
		return entities;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.Context";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Core.Context",
			"name": "Runtime.Core.Context",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("base_path");
			a.push("enviroments");
			a.push("settings");
			a.push("modules");
			a.push("entities");
			a.push("cli_args");
			a.push("initialized");
			a.push("started");
			a.push("start_time");
			a.push("entry_point");
			a.push("main_module");
			a.push("main_class");
			a.push("object_manager");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "base_path") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enviroments") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "settings") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "modules") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entities") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "cli_args") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "initialized") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "started") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "start_time") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entry_point") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "main_module") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "main_class") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "object_manager") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Core.Context);
window["Runtime.Core.Context"] = Runtime.Core.Context;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Core.Context;
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.CoreObject = function(ctx, object_name, entity)
{
	if (object_name == undefined) object_name = "";
	if (entity == undefined) entity = null;
	/* Init object */
	this._init(ctx);
	/* Set object name */
	this.object_name = (object_name != "") ? (object_name) : (this.getClassName(ctx) + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(Runtime.rtl.unique(ctx)));
	this.childs = new Runtime.Vector(ctx);
	this.entity = entity;
};
Runtime.Core.CoreObject.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Core.CoreObject.prototype.constructor = Runtime.Core.CoreObject;
Object.assign(Runtime.Core.CoreObject.prototype,
{
	/**
	 * Returns object name
	 */
	getObjectName: function(ctx)
	{
		return this.object_name;
	},
	/**
	 * Returns entity
	 */
	getEntity: function(ctx)
	{
		return this.entity;
	},
	/**
	 * Handle message
	 */
	handleMessage: async function(ctx, msg)
	{
	},
	/**
	 * Set parent
	 */
	setParent: function(ctx, parent_obj)
	{
		this.manager.changeParent(ctx, this, parent_obj);
	},
	_init: function(ctx)
	{
		this.object_name = "";
		this.parent = null;
		this.childs = null;
		this.manager = null;
		this.entity = null;
		Runtime.BaseObject.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Core.CoreObject)
		{
			this.object_name = o.object_name;
			this.parent = o.parent;
			this.childs = o.childs;
			this.manager = o.manager;
			this.entity = o.entity;
		}
		Runtime.BaseObject.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "object_name")this.object_name = v;
		else if (k == "parent")this.parent = v;
		else if (k == "childs")this.childs = v;
		else if (k == "manager")this.manager = v;
		else if (k == "entity")this.entity = v;
		else Runtime.BaseObject.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "object_name")return this.object_name;
		else if (k == "parent")return this.parent;
		else if (k == "childs")return this.childs;
		else if (k == "manager")return this.manager;
		else if (k == "entity")return this.entity;
		return Runtime.BaseObject.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.CoreObject";
	},
});
Object.assign(Runtime.Core.CoreObject, Runtime.BaseObject);
Object.assign(Runtime.Core.CoreObject,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.CoreObject";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Core.CoreObject",
			"name": "Runtime.Core.CoreObject",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("object_name");
			a.push("parent");
			a.push("childs");
			a.push("manager");
			a.push("entity");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "object_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.CoreObject",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parent") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.CoreObject",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "childs") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.CoreObject",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "manager") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.CoreObject",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entity") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.CoreObject",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Core.CoreObject);
window["Runtime.Core.CoreObject"] = Runtime.Core.CoreObject;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Core.CoreObject;
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.CoreDriver = function(ctx)
{
	Runtime.Core.CoreObject.apply(this, arguments);
};
Runtime.Core.CoreDriver.prototype = Object.create(Runtime.Core.CoreObject.prototype);
Runtime.Core.CoreDriver.prototype.constructor = Runtime.Core.CoreDriver;
Object.assign(Runtime.Core.CoreDriver.prototype,
{
	/**
	 * Start driver
	 */
	startDriver: async function(ctx)
	{
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Core.CoreDriver)
		{
		}
		Runtime.Core.CoreObject.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Core.CoreObject.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Core.CoreObject.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.CoreDriver";
	},
});
Object.assign(Runtime.Core.CoreDriver, Runtime.Core.CoreObject);
Object.assign(Runtime.Core.CoreDriver,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.CoreDriver";
	},
	getParentClassName: function()
	{
		return "Runtime.Core.CoreObject";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Core.CoreDriver",
			"name": "Runtime.Core.CoreDriver",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Core.CoreDriver);
window["Runtime.Core.CoreDriver"] = Runtime.Core.CoreDriver;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Core.CoreDriver;
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.CoreEvent = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Core.CoreEvent.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Core.CoreEvent.prototype.constructor = Runtime.Core.CoreEvent;
Object.assign(Runtime.Core.CoreEvent.prototype,
{
	/**
	 * Check if event is cancel
	 */
	isCancel: function(ctx)
	{
		return false;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Core.CoreEvent)
		{
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.CoreEvent";
	},
});
Object.assign(Runtime.Core.CoreEvent, Runtime.BaseStruct);
Object.assign(Runtime.Core.CoreEvent,
{
	/**
	 * Cancel event
	 */
	cancel: function(ctx, event)
	{
		return event;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.CoreEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Core.CoreEvent",
			"name": "Runtime.Core.CoreEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Core.CoreEvent);
window["Runtime.Core.CoreEvent"] = Runtime.Core.CoreEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Core.CoreEvent;
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.Entity = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Core.Entity.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Core.Entity.prototype.constructor = Runtime.Core.Entity;
Object.assign(Runtime.Core.Entity.prototype,
{
	/* Functions */
	className: function(ctx)
	{
		return (this.name != "") ? ((this.value != "") ? (this.value) : (this.name)) : ("");
	},
	logName: function(ctx)
	{
		return this.getClassName(ctx) + Runtime.rtl.toStr(" -> ") + Runtime.rtl.toStr(((this.value != "") ? (this.name + Runtime.rtl.toStr(" -> ") + Runtime.rtl.toStr(this.value)) : (this.name)));
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.name = "";
		this.value = "";
		this.params = Runtime.Dict.from({});
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Core.Entity)
		{
			this.name = o.name;
			this.value = o.value;
			this.params = o.params;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "name")this.name = v;
		else if (k == "value")this.value = v;
		else if (k == "params")this.params = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "value")return this.value;
		else if (k == "params")return this.params;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.Entity";
	},
});
Object.assign(Runtime.Core.Entity, Runtime.BaseStruct);
Object.assign(Runtime.Core.Entity,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.Entity";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Core.Entity",
			"name": "Runtime.Core.Entity",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("name");
			a.push("value");
			a.push("params");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Entity",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Entity",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Entity",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Core.Entity);
window["Runtime.Core.Entity"] = Runtime.Core.Entity;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Core.Entity;
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.Driver = function(ctx)
{
	Runtime.Core.Entity.apply(this, arguments);
};
Runtime.Core.Driver.prototype = Object.create(Runtime.Core.Entity.prototype);
Runtime.Core.Driver.prototype.constructor = Runtime.Core.Driver;
Object.assign(Runtime.Core.Driver.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Core.Driver)
		{
		}
		Runtime.Core.Entity.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Core.Entity.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Core.Entity.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.Driver";
	},
});
Object.assign(Runtime.Core.Driver, Runtime.Core.Entity);
Object.assign(Runtime.Core.Driver,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.Driver";
	},
	getParentClassName: function()
	{
		return "Runtime.Core.Entity";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Core.Driver",
			"name": "Runtime.Core.Driver",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Core.Driver);
window["Runtime.Core.Driver"] = Runtime.Core.Driver;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Core.Driver;
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.LambdaChain = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Core.LambdaChain.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Core.LambdaChain.prototype.constructor = Runtime.Core.LambdaChain;
Object.assign(Runtime.Core.LambdaChain.prototype,
{
	logName: function(ctx)
	{
		return this.getClassName(ctx) + Runtime.rtl.toStr(" -> ") + Runtime.rtl.toStr(this.name) + Runtime.rtl.toStr(" -> [") + Runtime.rtl.toStr(this.pos) + Runtime.rtl.toStr("] ") + Runtime.rtl.toStr(this.value);
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.name = "";
		this.value = "";
		this.chain = "";
		this.pos = 0;
		this.is_async = false;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Core.LambdaChain)
		{
			this.name = o.name;
			this.value = o.value;
			this.chain = o.chain;
			this.pos = o.pos;
			this.is_async = o.is_async;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "name")this.name = v;
		else if (k == "value")this.value = v;
		else if (k == "chain")this.chain = v;
		else if (k == "pos")this.pos = v;
		else if (k == "is_async")this.is_async = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "value")return this.value;
		else if (k == "chain")return this.chain;
		else if (k == "pos")return this.pos;
		else if (k == "is_async")return this.is_async;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.LambdaChain";
	},
});
Object.assign(Runtime.Core.LambdaChain, Runtime.BaseStruct);
Object.assign(Runtime.Core.LambdaChain,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.LambdaChain";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Core.LambdaChain",
			"name": "Runtime.Core.LambdaChain",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("name");
			a.push("value");
			a.push("chain");
			a.push("pos");
			a.push("is_async");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.LambdaChain",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.LambdaChain",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "chain") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.LambdaChain",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pos") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.LambdaChain",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_async") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.LambdaChain",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Core.LambdaChain);
window["Runtime.Core.LambdaChain"] = Runtime.Core.LambdaChain;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Core.LambdaChain;
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.LambdaChainDeclare = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Core.LambdaChainDeclare.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Core.LambdaChainDeclare.prototype.constructor = Runtime.Core.LambdaChainDeclare;
Object.assign(Runtime.Core.LambdaChainDeclare.prototype,
{
	logName: function(ctx)
	{
		return this.getClassName(ctx) + Runtime.rtl.toStr(" -> ") + Runtime.rtl.toStr(this.name);
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.name = "";
		this.is_await = false;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Core.LambdaChainDeclare)
		{
			this.name = o.name;
			this.is_await = o.is_await;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "name")this.name = v;
		else if (k == "is_await")this.is_await = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "is_await")return this.is_await;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.LambdaChainDeclare";
	},
});
Object.assign(Runtime.Core.LambdaChainDeclare, Runtime.BaseStruct);
Object.assign(Runtime.Core.LambdaChainDeclare,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.LambdaChainDeclare";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Core.LambdaChainDeclare",
			"name": "Runtime.Core.LambdaChainDeclare",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("name");
			a.push("is_await");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.LambdaChainDeclare",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_await") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.LambdaChainDeclare",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Core.LambdaChainDeclare);
window["Runtime.Core.LambdaChainDeclare"] = Runtime.Core.LambdaChainDeclare;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Core.LambdaChainDeclare;
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.Message = function(ctx, data, from, message_id)
{
	if (from == undefined) from = "";
	if (message_id == undefined) message_id = "";
	Runtime.BaseObject.call(this, ctx);
	/* Set property */
	this.data = data;
	this.from = from;
	this.message_id = (message_id != "") ? (message_id) : (Runtime.rtl.unique(ctx));
	this.tags = new Runtime.Map(ctx);
};
Runtime.Core.Message.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Core.Message.prototype.constructor = Runtime.Core.Message;
Object.assign(Runtime.Core.Message.prototype,
{
	/**
	 * Read property
	 */
	getMessageID: function(ctx)
	{
		return this.message_id;
	},
	getFrom: function(ctx)
	{
		return this.from;
	},
	isCancel: function(ctx)
	{
		return this.is_cancel;
	},
	getData: function(ctx)
	{
		return this.data;
	},
	/**
	 * Cancel Message
	 */
	cancel: function(ctx)
	{
		this.is_cancel = true;
		if (this.data instanceof Runtime.Core.CoreEvent)
		{
			this.data = this.data.constructor.cancel(ctx, this.data);
		}
	},
	_init: function(ctx)
	{
		this.sender = null;
		this.from = "";
		this.message_id = "";
		this.is_cancel = false;
		this.data = null;
		this.tags = new Runtime.Map(ctx);
		Runtime.BaseObject.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Core.Message)
		{
			this.sender = o.sender;
			this.from = o.from;
			this.message_id = o.message_id;
			this.is_cancel = o.is_cancel;
			this.data = o.data;
			this.tags = o.tags;
		}
		Runtime.BaseObject.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "sender")this.sender = v;
		else if (k == "from")this.from = v;
		else if (k == "message_id")this.message_id = v;
		else if (k == "is_cancel")this.is_cancel = v;
		else if (k == "data")this.data = v;
		else if (k == "tags")this.tags = v;
		else Runtime.BaseObject.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "sender")return this.sender;
		else if (k == "from")return this.from;
		else if (k == "message_id")return this.message_id;
		else if (k == "is_cancel")return this.is_cancel;
		else if (k == "data")return this.data;
		else if (k == "tags")return this.tags;
		return Runtime.BaseObject.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.Message";
	},
});
Object.assign(Runtime.Core.Message, Runtime.BaseObject);
Object.assign(Runtime.Core.Message,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.Message";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Core.Message",
			"name": "Runtime.Core.Message",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("sender");
			a.push("from");
			a.push("message_id");
			a.push("is_cancel");
			a.push("data");
			a.push("tags");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "sender") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Message",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "from") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Message",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "message_id") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Message",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_cancel") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Message",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "data") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Message",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "tags") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.Message",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Core.Message);
window["Runtime.Core.Message"] = Runtime.Core.Message;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Core.Message;
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.ObjectManager = function(ctx)
{
	Runtime.Core.CoreDriver.call(this, ctx);
	/* Create object */
	this.objects = new Runtime.Map(ctx);
	this.drivers = new Runtime.Map(ctx);
	this.messages = new Runtime.Vector(ctx);
	this.mutex_messages = new Runtime.Mutex(ctx);
	this.mutex_objects = new Runtime.Mutex(ctx);
	this.mutex_process = new Runtime.Mutex(ctx);
	/* Register self */
	this.objects.set(ctx, this.getClassName(ctx), this);
	this.drivers.set(ctx, this.getClassName(ctx), this);
	this.objects.set(ctx, "default:object_manager", this);
	this.drivers.set(ctx, "default:object_manager", this);
	this.listeners = new Runtime.Vector(ctx);
	this.manager = this;
};
Runtime.Core.ObjectManager.prototype = Object.create(Runtime.Core.CoreDriver.prototype);
Runtime.Core.ObjectManager.prototype.constructor = Runtime.Core.ObjectManager;
Object.assign(Runtime.Core.ObjectManager.prototype,
{
	/**
	 * Add object
	 */
	addObject: function(ctx, obj, object_name)
	{
		if (object_name == undefined) object_name = "";
		if (obj instanceof Runtime.Core.CoreObject)
		{
			if (object_name == "")
			{
				object_name = obj.getObjectName(ctx);
			}
			if (!this.drivers.has(ctx, object_name))
			{
				this.objects.set(ctx, object_name, obj);
				obj.manager = this;
			}
		}
	},
	/**
	 * Get object
	 */
	getObject: function(ctx, object_name)
	{
		var obj = null;
		obj = this.objects.get(ctx, object_name, null);
		return obj;
	},
	/**
	 * Get objects
	 */
	getObjects: function(ctx, class_name)
	{
		var objects = new Runtime.Vector(ctx);
		this.objects.each(ctx, (ctx, obj) => 
		{
			if (Runtime.rtl.is_instanceof(ctx, obj, class_name))
			{
				objects.push(ctx, obj);
			}
		});
		return objects.toCollection(ctx);
	},
	/**
	 * Get driver
	 */
	getDriver: function(ctx, driver_name)
	{
		var obj = null;
		obj = this.drivers.get(ctx, driver_name, null);
		return obj;
	},
	/**
	 * Get drivers
	 */
	getDrivers: function(ctx, class_name)
	{
		var drivers = new Runtime.Vector(ctx);
		this.drivers.each(ctx, (ctx, obj) => 
		{
			if (Runtime.rtl.is_instanceof(ctx, obj, class_name))
			{
				drivers.push(ctx, obj);
			}
		});
		return drivers.toCollection(ctx);
	},
	/**
	 * Remove object
	 */
	removeObject: function(ctx, object_name)
	{
		if (!this.drivers.has(ctx, object_name))
		{
			var obj = this.objects.get(ctx, object_name, null);
			if (obj != null && obj.parent != null)
			{
				obj.parent.childs.remove(ctx, obj);
				obj.parent = null;
			}
			this.objects.remove(ctx, object_name);
		}
	},
	/**
	 * Remove object
	 */
	removeObjectRecursive: function(ctx, object_name)
	{
		var keys = null;
		keys = this.objects.keys(ctx);
		keys = keys.filter(ctx, (ctx, item_name) => 
		{
			return Runtime.rs.strpos(ctx, item_name, object_name) == 0;
		}).sortIm(ctx, Runtime.lib.sortDesc);
		for (var i = 0;i < keys.count(ctx);i++)
		{
			var name = Runtime.rtl.get(ctx, keys, i);
			this.removeObject(ctx, name);
		}
		/* Remove listeners */
		for (var i = this.listeners.count(ctx) - 1;i >= 0;i--)
		{
			var item = Runtime.rtl.get(ctx, this.listeners, i);
			if (Runtime.rs.strpos(ctx, Runtime.rtl.get(ctx, item, "from"), object_name) == 0 || Runtime.rs.strpos(ctx, Runtime.rtl.get(ctx, item, "object_name"), object_name) == 0)
			{
				this.listeners.remove(ctx, i);
			}
		}
	},
	/**
	 * Register listener
	 */
	registerListener: function(ctx, from, event_class_name, object_name, method_name)
	{
		if (method_name == undefined) method_name = "";
		for (var i = 0;i < this.listeners.count(ctx);i++)
		{
			var item = Runtime.rtl.get(ctx, this.listeners, i);
			if (Runtime.rtl.get(ctx, item, "from") == from && Runtime.rtl.get(ctx, item, "object_name") == object_name && Runtime.rtl.get(ctx, item, "method_name") == method_name && Runtime.rtl.get(ctx, item, "event_class_name") == event_class_name)
			{
				return ;
			}
		}
		this.listeners.push(ctx, Runtime.Dict.from({"from":from,"object_name":object_name,"event_class_name":event_class_name,"method_name":method_name}));
	},
	/**
	 * Find callback
	 */
	findListeners: function(ctx, from, event_class_name)
	{
		if (event_class_name == undefined) event_class_name = "";
		var items = new Runtime.Vector(ctx);
		for (var i = 0;i < this.listeners.count(ctx);i++)
		{
			var item = Runtime.rtl.get(ctx, this.listeners, i);
			if (Runtime.rtl.get(ctx, item, "from") == from && (event_class_name == "" || Runtime.rtl.get(ctx, item, "event_class_name") == event_class_name))
			{
				items.push(ctx, item);
			}
		}
		return items.toCollection(ctx);
	},
	/**
	 * Start object manager
	 */
	startManager: async function(ctx, entities)
	{
		var drivers_created = new Runtime.Vector(ctx);
		var drivers = entities.filter(ctx, (ctx, item) => 
		{
			return item instanceof Runtime.Core.Driver;
		});
		for (var i = 0;i < drivers.count(ctx);i++)
		{
			var driver_entity = drivers.item(ctx, i);
			var driver_name = driver_entity.name;
			var class_name = driver_entity.value;
			if (class_name == "")
			{
				class_name = driver_entity.name;
			}
			var driver = Runtime.rtl.newInstance(ctx, class_name, Runtime.Collection.from([driver_name,driver_entity]));
			var __v0 = new Runtime.Monad(ctx, ctx.chain(ctx, class_name, Runtime.Collection.from([driver])));
			__v0 = __v0.attr(ctx, 0);
			driver = __v0.value(ctx);
			if (class_name != driver_name)
			{
				var __v1 = new Runtime.Monad(ctx, ctx.chain(ctx, driver_name, Runtime.Collection.from([driver])));
				__v1 = __v1.attr(ctx, 0);
				driver = __v1.value(ctx);
			}
			if (driver == null)
			{
				throw new Runtime.Exceptions.RuntimeException(ctx, "Driver '" + Runtime.rtl.toStr(class_name) + Runtime.rtl.toStr("' not found"))
			}
			this.objects.set(ctx, driver_name, driver);
			this.drivers.set(ctx, driver_name, driver);
			driver.manager = this;
			drivers_created.push(ctx, driver);
		}
		/* Start drivers */
		for (var i = 0;i < drivers_created.count(ctx);i++)
		{
			var driver = drivers_created.item(ctx, i);
			await driver.startDriver(ctx);
		}
		/*rtl::runThread( method this.processMessages );*/
	},
	/**
	 * Send message
	 * @param Message msg
	 * @return Message
	 */
	sendMessage: async function(ctx, msg)
	{
		this.messages.push(ctx, msg);
		this.mutex_process.unLock(ctx);
		/* Handle messages */
		await this.handleMessages(ctx);
	},
	/**
	 * Send message
	 * @param Message msg
	 * @return Message
	 */
	remoteCall: async function(ctx, items)
	{
		/* Create message */
		var event = Runtime.Core.RemoteCallEvent.create(ctx, items);
		var msg = new Runtime.Core.Message(ctx, event, event.object_name);
		/* Send message */
		await this.sendMessage(ctx, msg);
		/* Wait message */
		var response = await this.waitResponse(ctx, msg);
		/* Return response */
		return Promise.resolve(response);
	},
	/**
	 * Process messages
	 */
	processMessages: async function(ctx)
	{
		var is_run = ctx.getRun(ctx);
		while (is_run)
		{
			if (this.message.count(ctx) == 0)
			{
				await this.mutex_process.waitAsync(ctx);
			}
			await this.handleMessages(ctx);
			this.mutex_process.lock(ctx);
		}
	},
	/**
	 * Handle messages
	 */
	handleMessages: async function(ctx)
	{
		while (this.messages.count(ctx) > 0)
		{
			var msg = null;
			msg = this.messages.pop(ctx);
			if (msg == null)
			{
				return Promise.resolve();
			}
			await this.handleMessage(ctx, msg);
		}
	},
	/**
	 * Handle messages
	 */
	handleMessage: async function(ctx, msg)
	{
		if (msg.data == null)
		{
			return Promise.resolve();
		}
		var hash = new Runtime.Map(ctx);
		var items = this.findListeners(ctx, msg.from, msg.data.getClassName(ctx));
		for (var i = 0;i < items.count(ctx);i++)
		{
			var item = Runtime.rtl.get(ctx, items, i);
			var object_name = Runtime.rtl.get(ctx, item, "object_name");
			var method_name = Runtime.rtl.get(ctx, item, "method_name");
			var obj = this.getObject(ctx, object_name);
			if (obj != null)
			{
				if (Runtime.rtl.method_exists(ctx, obj, method_name))
				{
					var f = Runtime.rtl.method(ctx, obj, method_name);
					await f(ctx, msg);
				}
			}
			if (!hash.has(ctx, object_name))
			{
				while (obj != null)
				{
					await obj.handleMessage(ctx, msg);
					obj = obj.parent;
				}
				hash.set(ctx, object_name, true);
			}
		}
	},
	/**
	 * Set parent
	 */
	changeParent: function(ctx, child_obj, parent_obj)
	{
		if (child_obj.parent != null)
		{
			child_obj.parent.childs.remove(ctx, child_obj);
		}
		child_obj.parent = parent_obj;
		if (parent_obj != null)
		{
			if (parent_obj.childs.indexOf(ctx, child_obj) == -1)
			{
				parent_obj.childs.push(ctx, child_obj);
			}
		}
	},
	_init: function(ctx)
	{
		this.objects = null;
		this.drivers = null;
		this.messages = null;
		this.mutex_messages = null;
		this.mutex_objects = null;
		this.mutex_process = null;
		this.listeners = null;
		Runtime.Core.CoreDriver.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Core.ObjectManager)
		{
			this.objects = o.objects;
			this.drivers = o.drivers;
			this.messages = o.messages;
			this.mutex_messages = o.mutex_messages;
			this.mutex_objects = o.mutex_objects;
			this.mutex_process = o.mutex_process;
			this.listeners = o.listeners;
		}
		Runtime.Core.CoreDriver.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "objects")this.objects = v;
		else if (k == "drivers")this.drivers = v;
		else if (k == "messages")this.messages = v;
		else if (k == "mutex_messages")this.mutex_messages = v;
		else if (k == "mutex_objects")this.mutex_objects = v;
		else if (k == "mutex_process")this.mutex_process = v;
		else if (k == "listeners")this.listeners = v;
		else Runtime.Core.CoreDriver.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "objects")return this.objects;
		else if (k == "drivers")return this.drivers;
		else if (k == "messages")return this.messages;
		else if (k == "mutex_messages")return this.mutex_messages;
		else if (k == "mutex_objects")return this.mutex_objects;
		else if (k == "mutex_process")return this.mutex_process;
		else if (k == "listeners")return this.listeners;
		return Runtime.Core.CoreDriver.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.ObjectManager";
	},
});
Object.assign(Runtime.Core.ObjectManager, Runtime.Core.CoreDriver);
Object.assign(Runtime.Core.ObjectManager,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.ObjectManager";
	},
	getParentClassName: function()
	{
		return "Runtime.Core.CoreDriver";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Core.ObjectManager",
			"name": "Runtime.Core.ObjectManager",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("objects");
			a.push("drivers");
			a.push("messages");
			a.push("mutex_messages");
			a.push("mutex_objects");
			a.push("mutex_process");
			a.push("listeners");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "objects") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.ObjectManager",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "drivers") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.ObjectManager",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "messages") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.ObjectManager",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "mutex_messages") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.ObjectManager",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "mutex_objects") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.ObjectManager",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "mutex_process") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.ObjectManager",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "listeners") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.ObjectManager",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Core.ObjectManager);
window["Runtime.Core.ObjectManager"] = Runtime.Core.ObjectManager;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Core.ObjectManager;
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.RemoteCallAnswer = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Core.RemoteCallAnswer.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Core.RemoteCallAnswer.prototype.constructor = Runtime.Core.RemoteCallAnswer;
Object.assign(Runtime.Core.RemoteCallAnswer.prototype,
{
	/**
	 * Returns true if success
	 * @return bool
	 */
	isSuccess: function(ctx)
	{
		return this.have_answer && this.code >= Runtime.rtl.ERROR_OK;
	},
	/**
	 * Returns true if success
	 * @return bool
	 */
	getMessage: function(ctx)
	{
		return (this.isSuccess(ctx)) ? (this.success_message) : (this.error_message);
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.app_name = "self";
		this.object_name = "";
		this.interface_name = "default";
		this.method_name = "";
		this.code = 0;
		this.success_message = "";
		this.error_message = "";
		this.error_name = "";
		this.error_trace = "";
		this.logs = null;
		this.have_answer = false;
		this.response = null;
		this.new_cookies = Runtime.Dict.from({});
		this.new_headers = Runtime.Collection.from([]);
		this.new_http_code = 200;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Core.RemoteCallAnswer)
		{
			this.app_name = o.app_name;
			this.object_name = o.object_name;
			this.interface_name = o.interface_name;
			this.method_name = o.method_name;
			this.code = o.code;
			this.success_message = o.success_message;
			this.error_message = o.error_message;
			this.error_name = o.error_name;
			this.error_trace = o.error_trace;
			this.logs = o.logs;
			this.have_answer = o.have_answer;
			this.response = o.response;
			this.new_cookies = o.new_cookies;
			this.new_headers = o.new_headers;
			this.new_http_code = o.new_http_code;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "app_name")this.app_name = v;
		else if (k == "object_name")this.object_name = v;
		else if (k == "interface_name")this.interface_name = v;
		else if (k == "method_name")this.method_name = v;
		else if (k == "code")this.code = v;
		else if (k == "success_message")this.success_message = v;
		else if (k == "error_message")this.error_message = v;
		else if (k == "error_name")this.error_name = v;
		else if (k == "error_trace")this.error_trace = v;
		else if (k == "logs")this.logs = v;
		else if (k == "have_answer")this.have_answer = v;
		else if (k == "response")this.response = v;
		else if (k == "new_cookies")this.new_cookies = v;
		else if (k == "new_headers")this.new_headers = v;
		else if (k == "new_http_code")this.new_http_code = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "app_name")return this.app_name;
		else if (k == "object_name")return this.object_name;
		else if (k == "interface_name")return this.interface_name;
		else if (k == "method_name")return this.method_name;
		else if (k == "code")return this.code;
		else if (k == "success_message")return this.success_message;
		else if (k == "error_message")return this.error_message;
		else if (k == "error_name")return this.error_name;
		else if (k == "error_trace")return this.error_trace;
		else if (k == "logs")return this.logs;
		else if (k == "have_answer")return this.have_answer;
		else if (k == "response")return this.response;
		else if (k == "new_cookies")return this.new_cookies;
		else if (k == "new_headers")return this.new_headers;
		else if (k == "new_http_code")return this.new_http_code;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.RemoteCallAnswer";
	},
});
Object.assign(Runtime.Core.RemoteCallAnswer, Runtime.BaseStruct);
Object.assign(Runtime.Core.RemoteCallAnswer,
{
	/**
	 * Set success result
	 * @param primitive res
	 * @return Message
	 */
	success: function(ctx, answer, response, message, code)
	{
		if (response == undefined) response = null;
		if (message == undefined) message = "";
		if (code == undefined) code = 1;
		return answer.copy(ctx, Runtime.Dict.from({"code":code,"error_message":"","success_message":message,"response":response,"have_answer":true}));
	},
	/**
	 * Set fail result
	 * @param primitive res
	 * @return Message
	 */
	fail: function(ctx, answer, response, error, code, error_name)
	{
		if (error == undefined) error = "";
		if (code == undefined) code = -1;
		if (error_name == undefined) error_name = "";
		return answer.copy(ctx, Runtime.Dict.from({"code":code,"error_message":error,"error_name":error_name,"response":response,"have_answer":true}));
	},
	/**
	 * Set exception
	 * @param primitive res
	 * @return Message
	 */
	exception: function(ctx, answer, e)
	{
		answer = answer.copy(ctx, Runtime.Dict.from({"code":e.getErrorCode(ctx),"error_message":e.getErrorMessage(ctx),"error_name":e.getClassName(ctx),"response":null,"have_answer":true}));
		if (e instanceof Runtime.Core.ApiException)
		{
			answer = Runtime.rtl.setAttr(ctx, answer, Runtime.Collection.from(["response"]), e.response);
		}
		return answer;
	},
	/**
	 * End pipe
	 */
	end: function(ctx, m)
	{
		if (m.err == null)
		{
			return m;
		}
		return new Runtime.Monad(ctx, new Runtime.Core.Message(ctx, Runtime.Dict.from({"error_message":m.err.getErrorMessage(ctx),"error_name":m.err.getClassName(ctx),"code":m.err.getErrorCode(ctx),"response":m.err})));
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.RemoteCallAnswer";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Core.RemoteCallAnswer",
			"name": "Runtime.Core.RemoteCallAnswer",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("app_name");
			a.push("object_name");
			a.push("interface_name");
			a.push("method_name");
			a.push("code");
			a.push("success_message");
			a.push("error_message");
			a.push("error_name");
			a.push("error_trace");
			a.push("logs");
			a.push("have_answer");
			a.push("response");
			a.push("new_cookies");
			a.push("new_headers");
			a.push("new_http_code");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "app_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallAnswer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "object_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallAnswer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "interface_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallAnswer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "method_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallAnswer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "code") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallAnswer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "success_message") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallAnswer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_message") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallAnswer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallAnswer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_trace") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallAnswer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "logs") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallAnswer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "have_answer") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallAnswer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "response") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallAnswer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "new_cookies") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallAnswer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "new_headers") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallAnswer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "new_http_code") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallAnswer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Core.RemoteCallAnswer);
window["Runtime.Core.RemoteCallAnswer"] = Runtime.Core.RemoteCallAnswer;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Core.RemoteCallAnswer;
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.RemoteCallRequest = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Core.RemoteCallRequest.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Core.RemoteCallRequest.prototype.constructor = Runtime.Core.RemoteCallRequest;
Object.assign(Runtime.Core.RemoteCallRequest.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.app_name = "self";
		this.object_name = "";
		this.interface_name = "default";
		this.method_name = "";
		this.data = null;
		this.storage = null;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Core.RemoteCallRequest)
		{
			this.app_name = o.app_name;
			this.object_name = o.object_name;
			this.interface_name = o.interface_name;
			this.method_name = o.method_name;
			this.data = o.data;
			this.storage = o.storage;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "app_name")this.app_name = v;
		else if (k == "object_name")this.object_name = v;
		else if (k == "interface_name")this.interface_name = v;
		else if (k == "method_name")this.method_name = v;
		else if (k == "data")this.data = v;
		else if (k == "storage")this.storage = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "app_name")return this.app_name;
		else if (k == "object_name")return this.object_name;
		else if (k == "interface_name")return this.interface_name;
		else if (k == "method_name")return this.method_name;
		else if (k == "data")return this.data;
		else if (k == "storage")return this.storage;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.RemoteCallRequest";
	},
});
Object.assign(Runtime.Core.RemoteCallRequest, Runtime.BaseStruct);
Object.assign(Runtime.Core.RemoteCallRequest,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.RemoteCallRequest";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Core.RemoteCallRequest",
			"name": "Runtime.Core.RemoteCallRequest",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("app_name");
			a.push("object_name");
			a.push("interface_name");
			a.push("method_name");
			a.push("data");
			a.push("storage");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "app_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallRequest",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "object_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallRequest",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "interface_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallRequest",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "method_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallRequest",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "data") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallRequest",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "storage") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.RemoteCallRequest",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Core.RemoteCallRequest);
window["Runtime.Core.RemoteCallRequest"] = Runtime.Core.RemoteCallRequest;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Core.RemoteCallRequest;
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.ModuleDescription = function(ctx)
{
};
Object.assign(Runtime.Core.ModuleDescription.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Core.ModuleDescription)
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.ModuleDescription";
	},
});
Object.assign(Runtime.Core.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function(ctx)
	{
		return "Runtime.Web";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function(ctx)
	{
		return "0.10.3";
	},
	/**
	 * Returns required modules
	 * @return Dict<string>
	 */
	requiredModules: function(ctx)
	{
		return Runtime.Dict.from({"Runtime":">=0.3"});
	},
	/**
	 * Returns enities
	 */
	entities: function(ctx)
	{
		return Runtime.Collection.from([]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.ModuleDescription";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Core.ModuleDescription",
			"name": "Runtime.Core.ModuleDescription",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Core.ModuleDescription);
window["Runtime.Core.ModuleDescription"] = Runtime.Core.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Core.ModuleDescription;
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
Runtime.Web.Component = function(ctx, path_id, controller)
{
	Runtime.Core.CoreObject.call(this, ctx, path_id);
	this.path_id = path_id;
	this.controller = controller;
};
Runtime.Web.Component.prototype = Object.create(Runtime.Core.CoreObject.prototype);
Runtime.Web.Component.prototype.constructor = Runtime.Web.Component;
Object.assign(Runtime.Web.Component.prototype,
{
	/**
	 * Component get path
	 */
	getPath: function(ctx)
	{
		return this.path_id;
	},
	/**
	 * Returns model path
	 */
	getModelPath: function(ctx)
	{
		return this.model_path;
	},
	/**
	 * Set new component's model
	 */
	setModelPath: function(ctx, model_path)
	{
		this.model_path = model_path;
	},
	/**
	 * Returns component params
	 */
	getParams: function(ctx)
	{
		return this.params;
	},
	/**
	 * Set new params
	 */
	setParams: function(ctx, params)
	{
		this.onChangeParams(ctx, this.params, params);
		this.params = params;
	},
	/**
	 * Returns model
	 */
	model: function(ctx, model_path, def_val)
	{
		if (model_path == undefined) model_path = null;
		if (def_val == undefined) def_val = null;
		return (this.model_path == null) ? (null) : (Runtime.rtl.attr(ctx, this.controller.layout, this.model_path.concat(ctx, model_path), def_val));
	},
	/**
	 * Call model function
	 */
	call: function(ctx, method_name)
	{
		if (method_name == undefined) method_name = "";
		var args = new Runtime.Vector(ctx);
		for (var i=2; i<arguments.length; i++) args.push(ctx, arguments[i]);
		/* Result */
		var res = null;
		/* Get current model */
		var model = this.model(ctx);
		/* Change model by function */
		if (Runtime.rtl.method_exists(ctx, model, method_name))
		{
			var f = Runtime.rtl.method(ctx, model, method_name);
			res = Runtime.rtl.apply(ctx, f, args);
		}
		if (Runtime.rtl.method_exists(ctx, model.getClassName(ctx), method_name))
		{
			args.unshift(ctx, model);
			var f = Runtime.rtl.method(ctx, model.getClassName(ctx), method_name);
			res = Runtime.rtl.apply(ctx, f, args);
		}
		return res;
	},
	/**
	 * Update model
	 */
	update: function(ctx, method_name)
	{
		if (method_name == undefined) method_name = "";
		this.updateModel.apply(this, arguments);
	},
	/**
	 * Update model
	 */
	updateModel: function(ctx, method_name)
	{
		if (method_name == undefined) method_name = "";
		var args = new Runtime.Vector(ctx);
		for (var i=2; i<arguments.length; i++) args.push(ctx, arguments[i]);
		/* Get current model */
		var model = this.model(ctx);
		/* Change model by function */
		if (Runtime.rtl.method_exists(ctx, model, method_name))
		{
			var f = Runtime.rtl.method(ctx, model, method_name);
			model = Runtime.rtl.apply(ctx, f, args);
		}
		if (Runtime.rtl.method_exists(ctx, model.getClassName(ctx), method_name))
		{
			args.unshift(ctx, model);
			var f = Runtime.rtl.method(ctx, model.getClassName(ctx), method_name);
			model = Runtime.rtl.apply(ctx, f, args);
		}
		/* Set new model */
		this.controller.updateModel(ctx, this.model_path, model);
	},
	/**
	 * Set new model
	 */
	setModel: function(ctx, model)
	{
		this.controller.updateModel(ctx, this.model_path, model);
	},
	/**
	 * Handle message
	 */
	handleMessage: async function(ctx, msg)
	{
	},
	/**
	 * Send event
	 */
	signal: async function(ctx, event)
	{
		var msg = new Runtime.Core.Message(ctx, event, this.getObjectName(ctx));
		msg.sender = this;
		await ctx.object_manager.handleMessage(ctx, msg);
	},
	/**
	 * Remote bus call
	 */
	remoteBusCall: async function(ctx, items)
	{
		return Promise.resolve(await Runtime.Web.RenderDriver.remoteBusCall(ctx, items));
	},
	/**
	 * Change params
	 */
	onChangeParams: function(ctx, old_params, new_params)
	{
	},
	/**
	 * Returns true if repaint overrided
	 */
	isRepaintOverridden: function(ctx)
	{
		return false;
	},
	/**
	 * Repaint component
	 */
	repaint: function(ctx, control)
	{
		return Runtime.Collection.from([]);
	},
	/**
	 * Update component
	 */
	updateComponent: function(ctx, created)
	{
		if (created)
		{
			this.onCreated(ctx);
		}
		else
		{
			this.onUpdated(ctx);
		}
	},
	/**
	 * On component created
	 */
	onCreated: function(ctx)
	{
	},
	/**
	 * On component updated
	 */
	onUpdated: function(ctx)
	{
	},
	_init: function(ctx)
	{
		this.path_id = "";
		this.driver = null;
		this.controller = null;
		this.params = null;
		this.model_path = Runtime.Collection.from([]);
		Runtime.Core.CoreObject.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Component)
		{
			this.path_id = o.path_id;
			this.driver = o.driver;
			this.controller = o.controller;
			this.params = o.params;
			this.model_path = o.model_path;
		}
		Runtime.Core.CoreObject.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "path_id")this.path_id = v;
		else if (k == "driver")this.driver = v;
		else if (k == "controller")this.controller = v;
		else if (k == "params")this.params = v;
		else if (k == "model_path")this.model_path = v;
		else Runtime.Core.CoreObject.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "path_id")return this.path_id;
		else if (k == "driver")return this.driver;
		else if (k == "controller")return this.controller;
		else if (k == "params")return this.params;
		else if (k == "model_path")return this.model_path;
		return Runtime.Core.CoreObject.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Component";
	},
});
Object.assign(Runtime.Web.Component, Runtime.Core.CoreObject);
Object.assign(Runtime.Web.Component,
{
	/**
	 * Component css
	 */
	css: function(ctx, vars)
	{
		return "";
	},
	/**
	 * Component render
	 */
	render: function(ctx, layout, model, params, content)
	{
		return null;
	},
	/**
	 * Returns css name
	 */
	getCssName: function(ctx, css_name)
	{
		var class_name = this.getCurrentClassName(ctx);
		return Runtime.Web.RenderDriver.getCssName(ctx, class_name, css_name);
	},
	/**
	 * Returns css name
	 */
	getCssHash: function(ctx)
	{
		var class_name = this.getCurrentClassName(ctx);
		return Runtime.Web.RenderDriver.getCssHashes(ctx, class_name);
	},
	/**
	 * Escape attr
	 */
	escapeAttr: function(ctx, s)
	{
		if (s instanceof Runtime.Dict)
		{
			s = s.reduce(ctx, (ctx, s, val, key) => 
			{
				return s + Runtime.rtl.toStr(key) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(val) + Runtime.rtl.toStr(";");
			}, "");
		}
		return Runtime.rs.escapeHtml(ctx, s);
	},
	/**
	 * Escape html
	 */
	escapeHtml: function(ctx, s)
	{
		if (Runtime.rtl.isString(ctx, s))
		{
			return Runtime.rs.escapeHtml(ctx, s);
		}
		if (s instanceof Runtime.Collection)
		{
			return Runtime.rs.join(ctx, "", s);
		}
		return Runtime.rs.escapeHtml(ctx, Runtime.rtl.toString(ctx, s));
	},
	/**
	 * Json encode
	 */
	json_encode: function(ctx, obj)
	{
		return Runtime.RuntimeUtils.json_encode(ctx, obj);
	},
	/**
	 * To html
	 */
	toHtml: function(ctx, s)
	{
		if (Runtime.rtl.isString(ctx, s))
		{
			return s;
		}
		if (s instanceof Runtime.Collection)
		{
			return Runtime.rs.join(ctx, "", s);
		}
		return Runtime.rtl.toString(ctx, s);
	},
	/**
	 * Join attrs to string
	 */
	joinAttrs: function(ctx, attrs)
	{
		return (Runtime.rtl.exists(ctx, attrs)) ? (Runtime.rs.join(ctx, " ", attrs.map(ctx, (ctx, k, v) => 
		{
			return k + Runtime.rtl.toStr("= '") + Runtime.rtl.toStr(this.escapeAttr(ctx, v)) + Runtime.rtl.toStr("'");
		}))) : ("");
	},
	/**
	 * Merge attrs
	 */
	mergeAttrs: function(ctx, res, attr2)
	{
		if (!Runtime.rtl.exists(ctx, attr2))
		{
			return res;
		}
		return Object.assign(res, attr2.toObject());
		return res;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getParentClassName: function()
	{
		return "Runtime.Core.CoreObject";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Component",
			"name": "Runtime.Web.Component",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("path_id");
			a.push("driver");
			a.push("controller");
			a.push("params");
			a.push("model_path");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "path_id") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Component",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "driver") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Component",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "controller") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Component",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Component",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "model_path") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Component",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.Web.Cookie = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Cookie.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Cookie.prototype.constructor = Runtime.Web.Cookie;
Object.assign(Runtime.Web.Cookie.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.name = "";
		this.value = "";
		this.expire = null;
		this.domain = "";
		this.path = "";
		this.secure = false;
		this.httponly = false;
		this.changed = false;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Cookie)
		{
			this.name = o.name;
			this.value = o.value;
			this.expire = o.expire;
			this.domain = o.domain;
			this.path = o.path;
			this.secure = o.secure;
			this.httponly = o.httponly;
			this.changed = o.changed;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "name")this.name = v;
		else if (k == "value")this.value = v;
		else if (k == "expire")this.expire = v;
		else if (k == "domain")this.domain = v;
		else if (k == "path")this.path = v;
		else if (k == "secure")this.secure = v;
		else if (k == "httponly")this.httponly = v;
		else if (k == "changed")this.changed = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "value")return this.value;
		else if (k == "expire")return this.expire;
		else if (k == "domain")return this.domain;
		else if (k == "path")return this.path;
		else if (k == "secure")return this.secure;
		else if (k == "httponly")return this.httponly;
		else if (k == "changed")return this.changed;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Cookie";
	},
});
Object.assign(Runtime.Web.Cookie, Runtime.BaseStruct);
Object.assign(Runtime.Web.Cookie,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Cookie";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Cookie",
			"name": "Runtime.Web.Cookie",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("name");
			a.push("value");
			a.push("expire");
			a.push("domain");
			a.push("path");
			a.push("secure");
			a.push("httponly");
			a.push("changed");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Cookie",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Cookie",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expire") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Cookie",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "domain") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Cookie",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "path") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Cookie",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "secure") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Cookie",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "httponly") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Cookie",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "changed") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Cookie",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.Web.ExternalBusDriver = function(ctx)
{
	Runtime.Core.CoreDriver.apply(this, arguments);
};
Runtime.Web.ExternalBusDriver.prototype = Object.create(Runtime.Core.CoreDriver.prototype);
Runtime.Web.ExternalBusDriver.prototype.constructor = Runtime.Web.ExternalBusDriver;
Object.assign(Runtime.Web.ExternalBusDriver.prototype,
{
	/**
	 * Send message
	 * @return string
	 */
	sendMessage: async function(ctx, msg)
	{
	},
	/**
	 * Send message
	 * @return string
	 */
	remoteBusCall: async function(ctx, request)
	{
		var uri = request.uri;
		var app_name = request.app_name;
		var object_name = request.object_name;
		var interface_name = request.interface_name;
		var method_name = request.method_name;
		var data = request.data;
		var storage = request.storage;
		var bus_gate = ctx.env(ctx, "X-ROUTE-PREFIX", "") + Runtime.rtl.toStr("/api");
		var url = (uri != "") ? (uri) : (bus_gate + "/" + app_name + "/" + object_name + "/" + interface_name + "/" + method_name + "/");
		/* Send post */
		var res = await this.constructor.post(ctx, Runtime.Dict.from({"url":url,"data":data,"storage":storage}));
		/* Answer */
		try
		{
			res = Runtime.rtl.json_decode(ctx, res);
		}
		catch (_ex)
		{
			if (true)
			{
				var e = _ex;
				
				res = null;
			}
			else
			{
				throw _ex;
			}
		}
		if (res != null)
		{
			res = new Runtime.Core.RemoteCallAnswer(ctx, res);
		}
		else
		{
			res = new Runtime.Core.RemoteCallAnswer(ctx, Runtime.Dict.from({"have_answer":false,"error_message":"Json parse error","code":Runtime.rtl.ERROR_PARSE_SERIALIZATION_ERROR,"response":null}));
		}
		return Promise.resolve(res);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.ExternalBusDriver)
		{
		}
		Runtime.Core.CoreDriver.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Core.CoreDriver.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Core.CoreDriver.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.ExternalBusDriver";
	},
});
Object.assign(Runtime.Web.ExternalBusDriver, Runtime.Core.CoreDriver);
Object.assign(Runtime.Web.ExternalBusDriver,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.ExternalBusDriver";
	},
	getParentClassName: function()
	{
		return "Runtime.Core.CoreDriver";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.ExternalBusDriver",
			"name": "Runtime.Web.ExternalBusDriver",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
	__implements__:
	[
		Runtime.Core.BusDriverInterface,
	],
});
Runtime.rtl.defClass(Runtime.Web.ExternalBusDriver);
window["Runtime.Web.ExternalBusDriver"] = Runtime.Web.ExternalBusDriver;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.ExternalBusDriver;
Object.assign(Runtime.Web.ExternalBusDriver,
{
	/**
	 * Send post. Returns json object or null if error
	 */
	post: async function(ctx, obj)
	{
		var url = obj.get(ctx, "url");
		var data = obj.get(ctx, "data");
		var storage = obj.get(ctx, "storage");
		
		/* Build pos data */
		var build_data = this.buildData(ctx, data, storage);
		var post_data = this.buildPostData(ctx, build_data);
		
		/* Send post */
		var xhr = await this.sendPost(ctx, url, post_data);
		return xhr.responseText;
	},
	
	
	
	/**
	 * Convert data to Native for ajax POST request
	 * @params serializable data
	 * @return Vector
	 */
	buildData: function(ctx, data, storage)
	{
		var res = [];
		data = Runtime.RuntimeUtils.json_encode(ctx, data);
		storage = Runtime.RuntimeUtils.json_encode(ctx, storage);
		/*json = btoa( unescape(encodeURIComponent(json)) );*/
		res.push({"key": "data", "value": data});
		res.push({"key": "storage", "value": storage});
		return res;
	},
	
	
	
	/**
	 * Returns FormData
	 * @params data - json object
	 * @return FormData
	 */
	buildPostData: function(ctx, data)
	{
		var post_data = new FormData();
		
		/* Add data to post data */
		for (var i=0; i<data.length; i++)
		{
			var obj = data[i];
			var key = obj.key;
			var val = obj.value;
			if (val instanceof FileList)
			{
				for (var i=0; i<val.length; i++)
				{
					post_data.append(key + "[]", val.item(i), val.item(i).name);
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
	sendPost: async function(ctx, url, post_data)
	{
		return await new Promise((resolve, reject) =>{
			try
			{
				var xhr = new XMLHttpRequest();
				xhr.open('POST', url, true);
				xhr.send(post_data);
				xhr.onreadystatechange = (function(ctx, xhr, resolve, reject) {
					return function()
					{
						if (xhr.readyState != 4) return;
						if (xhr.status == 200)
						{
							resolve(xhr);
						}
						else
						{
							reject
							(
								new Runtime.Exceptions.RuntimeException
								(ctx, xhr.status + " " + xhr.statusText, xhr.status) 
							);
						}
					}
				})(ctx, xhr, resolve, reject);
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
Runtime.Web.FrontendStorageDriver = function(ctx)
{
	Runtime.Core.CoreDriver.apply(this, arguments);
};
Runtime.Web.FrontendStorageDriver.prototype = Object.create(Runtime.Core.CoreDriver.prototype);
Runtime.Web.FrontendStorageDriver.prototype.constructor = Runtime.Web.FrontendStorageDriver;
Object.assign(Runtime.Web.FrontendStorageDriver.prototype,
{
	/**
	 * Start controller
	 */
	startDriver: async function(ctx)
	{
		var storage_input = document.querySelector("#frontend_storage");
		if (storage_input)
		{
			var model = storage_input.value;
			model = Runtime.rs.base64_decode_url(ctx, model);
			model = Runtime.RuntimeUtils.json_decode(ctx, model);
			this.frontend_storage = Runtime.Map.from(model);
		}
		this.data = new Runtime.Map(ctx);
		this.save_models = new Runtime.Map(ctx);
	},
	/**
	 * Save controller data
	 */
	saveControllers: function(ctx)
	{
		var controllers = ctx.getDrivers(ctx, "Runtime.Web.RenderController");
		for (var i = 0;i < controllers.count(ctx);i++)
		{
			var controller = Runtime.rtl.get(ctx, controllers, i);
			if (controller.isMainController(ctx))
			{
				var controller_name = controller.getObjectName(ctx);
				this.save_models.set(ctx, controller_name, controller.layout);
			}
		}
	},
	/**
	 * Returns saved controller data
	 */
	loadControllerModel: function(ctx, controller_name)
	{
		if (controller_name == undefined) controller_name = "";
		return this.save_models.get(ctx, controller_name, null);
	},
	_init: function(ctx)
	{
		this.data = null;
		this.frontend_storage = null;
		this.save_models = null;
		Runtime.Core.CoreDriver.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.FrontendStorageDriver)
		{
			this.data = o.data;
			this.frontend_storage = o.frontend_storage;
			this.save_models = o.save_models;
		}
		Runtime.Core.CoreDriver.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "data")this.data = v;
		else if (k == "frontend_storage")this.frontend_storage = v;
		else if (k == "save_models")this.save_models = v;
		else Runtime.Core.CoreDriver.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "data")return this.data;
		else if (k == "frontend_storage")return this.frontend_storage;
		else if (k == "save_models")return this.save_models;
		return Runtime.Core.CoreDriver.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.FrontendStorageDriver";
	},
});
Object.assign(Runtime.Web.FrontendStorageDriver, Runtime.Core.CoreDriver);
Object.assign(Runtime.Web.FrontendStorageDriver,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.FrontendStorageDriver";
	},
	getParentClassName: function()
	{
		return "Runtime.Core.CoreDriver";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.FrontendStorageDriver",
			"name": "Runtime.Web.FrontendStorageDriver",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("data");
			a.push("frontend_storage");
			a.push("save_models");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "data") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.FrontendStorageDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "frontend_storage") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.FrontendStorageDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "save_models") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.FrontendStorageDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.FrontendStorageDriver);
window["Runtime.Web.FrontendStorageDriver"] = Runtime.Web.FrontendStorageDriver;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.FrontendStorageDriver;
"use strict;"
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.Layout = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Layout.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Layout.prototype.constructor = Runtime.Web.Layout;
Object.assign(Runtime.Web.Layout.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Layout)
		{
		}
		Runtime.Web.Component.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Component.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Component.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Layout";
	},
});
Object.assign(Runtime.Web.Layout, Runtime.Web.Component);
Object.assign(Runtime.Web.Layout,
{
	css: function(ctx, vars)
	{
		return "*{" + Runtime.rtl.toStr("box-sizing: border-box;") + Runtime.rtl.toStr("}body{") + Runtime.rtl.toStr("margin:0;padding:0;") + Runtime.rtl.toStr("}");
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var class_name = model.page_class;
			
			if (!Runtime.rtl.isEmpty(ctx, class_name))
			{
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": class_name,"attrs": {"@bind":["Runtime.Web.Layout","page_model"],"@key":"view"}, "layout": layout});
			}
			
			return __control_childs;
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Layout";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Layout",
			"name": "Runtime.Web.Layout",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Layout);
window["Runtime.Web.Layout"] = Runtime.Web.Layout;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Layout;
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
Runtime.Web.LayoutModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.LayoutModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.LayoutModel.prototype.constructor = Runtime.Web.LayoutModel;
Object.assign(Runtime.Web.LayoutModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.is_https = false;
		this.port = 80;
		this.hostname = "";
		this.uri = "";
		this.full_uri = "";
		this.route_prefix = "";
		this.locale_uri = "";
		this.f_inc = "";
		this.route = null;
		this.route_params = null;
		this.layout_name = "default";
		this.layout_class = "";
		this.page_class = "";
		this.page_model = null;
		this.locale = "";
		this.title = "";
		this.description = "";
		this.favicon = "";
		this.breadcrumbs = null;
		this.data = new Runtime.Dict(ctx);
		this.keep_data = new Runtime.Dict(ctx);
		this.css_vars = new Runtime.Dict(ctx);
		this.components = null;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.LayoutModel)
		{
			this.is_https = o.is_https;
			this.port = o.port;
			this.hostname = o.hostname;
			this.uri = o.uri;
			this.full_uri = o.full_uri;
			this.route_prefix = o.route_prefix;
			this.locale_uri = o.locale_uri;
			this.f_inc = o.f_inc;
			this.route = o.route;
			this.route_params = o.route_params;
			this.layout_name = o.layout_name;
			this.layout_class = o.layout_class;
			this.page_class = o.page_class;
			this.page_model = o.page_model;
			this.locale = o.locale;
			this.title = o.title;
			this.description = o.description;
			this.favicon = o.favicon;
			this.breadcrumbs = o.breadcrumbs;
			this.data = o.data;
			this.keep_data = o.keep_data;
			this.css_vars = o.css_vars;
			this.components = o.components;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "is_https")this.is_https = v;
		else if (k == "port")this.port = v;
		else if (k == "hostname")this.hostname = v;
		else if (k == "uri")this.uri = v;
		else if (k == "full_uri")this.full_uri = v;
		else if (k == "route_prefix")this.route_prefix = v;
		else if (k == "locale_uri")this.locale_uri = v;
		else if (k == "f_inc")this.f_inc = v;
		else if (k == "route")this.route = v;
		else if (k == "route_params")this.route_params = v;
		else if (k == "layout_name")this.layout_name = v;
		else if (k == "layout_class")this.layout_class = v;
		else if (k == "page_class")this.page_class = v;
		else if (k == "page_model")this.page_model = v;
		else if (k == "locale")this.locale = v;
		else if (k == "title")this.title = v;
		else if (k == "description")this.description = v;
		else if (k == "favicon")this.favicon = v;
		else if (k == "breadcrumbs")this.breadcrumbs = v;
		else if (k == "data")this.data = v;
		else if (k == "keep_data")this.keep_data = v;
		else if (k == "css_vars")this.css_vars = v;
		else if (k == "components")this.components = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "is_https")return this.is_https;
		else if (k == "port")return this.port;
		else if (k == "hostname")return this.hostname;
		else if (k == "uri")return this.uri;
		else if (k == "full_uri")return this.full_uri;
		else if (k == "route_prefix")return this.route_prefix;
		else if (k == "locale_uri")return this.locale_uri;
		else if (k == "f_inc")return this.f_inc;
		else if (k == "route")return this.route;
		else if (k == "route_params")return this.route_params;
		else if (k == "layout_name")return this.layout_name;
		else if (k == "layout_class")return this.layout_class;
		else if (k == "page_class")return this.page_class;
		else if (k == "page_model")return this.page_model;
		else if (k == "locale")return this.locale;
		else if (k == "title")return this.title;
		else if (k == "description")return this.description;
		else if (k == "favicon")return this.favicon;
		else if (k == "breadcrumbs")return this.breadcrumbs;
		else if (k == "data")return this.data;
		else if (k == "keep_data")return this.keep_data;
		else if (k == "css_vars")return this.css_vars;
		else if (k == "components")return this.components;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.LayoutModel";
	},
});
Object.assign(Runtime.Web.LayoutModel, Runtime.BaseStruct);
Object.assign(Runtime.Web.LayoutModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.LayoutModel";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.LayoutModel",
			"name": "Runtime.Web.LayoutModel",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("is_https");
			a.push("port");
			a.push("hostname");
			a.push("uri");
			a.push("full_uri");
			a.push("route_prefix");
			a.push("locale_uri");
			a.push("f_inc");
			a.push("route");
			a.push("route_params");
			a.push("layout_name");
			a.push("layout_class");
			a.push("page_class");
			a.push("page_model");
			a.push("locale");
			a.push("title");
			a.push("description");
			a.push("favicon");
			a.push("breadcrumbs");
			a.push("data");
			a.push("keep_data");
			a.push("css_vars");
			a.push("components");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "is_https") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "port") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "hostname") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "uri") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "full_uri") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "route_prefix") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "locale_uri") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "f_inc") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "route") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "route_params") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "layout_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "layout_class") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "page_class") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "page_model") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "locale") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "title") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "description") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "favicon") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "breadcrumbs") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "data") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "keep_data") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "css_vars") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "components") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.LayoutModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.LayoutModel);
window["Runtime.Web.LayoutModel"] = Runtime.Web.LayoutModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.LayoutModel;
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
Runtime.Web.RenderContainer = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.RenderContainer.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.RenderContainer.prototype.constructor = Runtime.Web.RenderContainer;
Object.assign(Runtime.Web.RenderContainer.prototype,
{
	/* Functions */
	isRequestExists: function(ctx)
	{
		return this.request != null;
	},
	isResponseExists: function(ctx)
	{
		return this.response != null;
	},
	isRouteExists: function(ctx)
	{
		return this.route != null && this.route_params != null && this.route.class_name != "" && this.route.class_method_name != "";
	},
	isPageExists: function(ctx)
	{
		return this.layout != null && this.layout.page_class != "";
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.request = null;
		this.response = null;
		this.route = null;
		this.route_params = null;
		this.layout = null;
		this.frontend_storage = new Runtime.Dict(ctx);
		this.frontend_env = new Runtime.Dict(ctx);
		this.pattern_name = "default";
		this.pattern_class = "";
		this.frontend_controller_name = "";
		this.backend_storage = new Runtime.Dict(ctx);
		this.new_cookies = Runtime.Dict.from({});
		this.new_headers = Runtime.Collection.from([]);
		this.new_http_code = 200;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.RenderContainer)
		{
			this.request = o.request;
			this.response = o.response;
			this.route = o.route;
			this.route_params = o.route_params;
			this.layout = o.layout;
			this.frontend_storage = o.frontend_storage;
			this.frontend_env = o.frontend_env;
			this.pattern_name = o.pattern_name;
			this.pattern_class = o.pattern_class;
			this.frontend_controller_name = o.frontend_controller_name;
			this.backend_storage = o.backend_storage;
			this.new_cookies = o.new_cookies;
			this.new_headers = o.new_headers;
			this.new_http_code = o.new_http_code;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "request")this.request = v;
		else if (k == "response")this.response = v;
		else if (k == "route")this.route = v;
		else if (k == "route_params")this.route_params = v;
		else if (k == "layout")this.layout = v;
		else if (k == "frontend_storage")this.frontend_storage = v;
		else if (k == "frontend_env")this.frontend_env = v;
		else if (k == "pattern_name")this.pattern_name = v;
		else if (k == "pattern_class")this.pattern_class = v;
		else if (k == "frontend_controller_name")this.frontend_controller_name = v;
		else if (k == "backend_storage")this.backend_storage = v;
		else if (k == "new_cookies")this.new_cookies = v;
		else if (k == "new_headers")this.new_headers = v;
		else if (k == "new_http_code")this.new_http_code = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "request")return this.request;
		else if (k == "response")return this.response;
		else if (k == "route")return this.route;
		else if (k == "route_params")return this.route_params;
		else if (k == "layout")return this.layout;
		else if (k == "frontend_storage")return this.frontend_storage;
		else if (k == "frontend_env")return this.frontend_env;
		else if (k == "pattern_name")return this.pattern_name;
		else if (k == "pattern_class")return this.pattern_class;
		else if (k == "frontend_controller_name")return this.frontend_controller_name;
		else if (k == "backend_storage")return this.backend_storage;
		else if (k == "new_cookies")return this.new_cookies;
		else if (k == "new_headers")return this.new_headers;
		else if (k == "new_http_code")return this.new_http_code;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.RenderContainer";
	},
});
Object.assign(Runtime.Web.RenderContainer, Runtime.BaseStruct);
Object.assign(Runtime.Web.RenderContainer,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.RenderContainer";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.RenderContainer",
			"name": "Runtime.Web.RenderContainer",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("request");
			a.push("response");
			a.push("route");
			a.push("route_params");
			a.push("layout");
			a.push("frontend_storage");
			a.push("frontend_env");
			a.push("pattern_name");
			a.push("pattern_class");
			a.push("frontend_controller_name");
			a.push("backend_storage");
			a.push("new_cookies");
			a.push("new_headers");
			a.push("new_http_code");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "request") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderContainer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "response") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderContainer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "route") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderContainer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "route_params") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderContainer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "layout") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderContainer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "frontend_storage") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderContainer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "frontend_env") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderContainer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pattern_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderContainer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pattern_class") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderContainer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "frontend_controller_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderContainer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "backend_storage") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderContainer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "new_cookies") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderContainer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "new_headers") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderContainer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "new_http_code") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderContainer",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.Web.RenderController = function(ctx)
{
	Runtime.Core.CoreDriver.apply(this, arguments);
};
Runtime.Web.RenderController.prototype = Object.create(Runtime.Core.CoreDriver.prototype);
Runtime.Web.RenderController.prototype.constructor = Runtime.Web.RenderController;
Object.assign(Runtime.Web.RenderController.prototype,
{
	/**
	 * Returns true if main controller
	 */
	isMainController: function(ctx)
	{
		return this.is_main_controller;
	},
	/**
	 * Component get path
	 */
	getPath: function(ctx)
	{
		return this.object_name;
	},
	/**
	 * Returns model path
	 */
	getModelPath: function(ctx)
	{
		return Runtime.Collection.from([]);
	},
	/**
	 * Returns model
	 */
	model: function(ctx, model_path, def_val)
	{
		if (model_path == undefined) model_path = null;
		if (def_val == undefined) def_val = null;
		return Runtime.rtl.attr(ctx, this.layout, model_path, def_val);
	},
	/**
	 * Update model
	 */
	updateModel: function(ctx, model_path, value)
	{
		if (model_path == undefined) model_path = null;
		if (value == undefined) value = null;
		this.layout = Runtime.rtl.setAttr(ctx, this.layout, model_path, value);
		this.repaint(ctx);
	},
	/**
	 * Returns next unique component id
	 */
	nextComponentId: function(ctx)
	{
		this.next_component_id = this.next_component_id + 1;
		return this.getObjectName(ctx) + Runtime.rtl.toStr(".obj.") + Runtime.rtl.toStr(this.next_component_id);
	},
	/**
	 * Output warning message
	 */
	warning: function(ctx, msg)
	{
		var arr = Array.apply(null, arguments);
		arr.shift(); /* Remove ctx */
		arr.unshift("[Warning]");
		console.log.apply(null, arr);
	},
	/**
	 * Returns component by path
	 */
	getComponent: function(ctx, path_id, class_name)
	{
		if (class_name == undefined) class_name = "";
		if (!this.components.has(ctx, path_id))
		{
			return null;
		}
		var component = this.components.item(ctx, path_id);
		if (class_name != "")
		{
			var component_class_name = component.getClassName(ctx);
			var component_parents = Runtime.RuntimeUtils.getParents(ctx, component_class_name);
			if (component_class_name != class_name && component_parents.indexOf(ctx, class_name) == -1)
			{
				return null;
			}
		}
		return component;
	},
	/**
	 * Search component in parents
	 */
	searchComponent: function(ctx, path_id, class_name)
	{
		var arr = Runtime.Vector.from(Runtime.rs.split(ctx, "\\.", path_id));
		while (arr.count(ctx) > 0)
		{
			var path = Runtime.rs.join(ctx, ".", arr);
			var component = this.getComponent(ctx, path, class_name);
			if (component != null)
			{
				return component;
			}
			arr.pop(ctx);
		}
		if (class_name == this.getClassName(ctx))
		{
			return this;
		}
		return null;
	},
	/**
	 * Save component
	 */
	saveComponent: function(ctx, component)
	{
		this.components.set(ctx, component.getPath(ctx), component);
		ctx.addObject(ctx, component);
	},
	/**
	 * Add to update component
	 */
	updateComponent: function(ctx, component, created)
	{
		if (created == undefined) created = false;
		this.updated_components.push(ctx, Runtime.Dict.from({"component":component,"created":created}));
	},
	/**
	 * Remove component recursive
	 */
	removeComponentsRecursive: function(ctx, path_id)
	{
		var keys = this.components.keys(ctx);
		for (var i = 0;i < keys.count(ctx);i++)
		{
			var item_name = Runtime.rtl.get(ctx, keys, i);
			if (Runtime.rs.strpos(ctx, item_name, path_id) == 0)
			{
				this.components.remove(ctx, item_name);
			}
		}
	},
	/**
	 * Returns model path from @bind value
	 */
	getBindModelPath: function(ctx, path_id, bind_value)
	{
		var class_name = Runtime.rtl.get(ctx, bind_value, 0);
		var bind_name = Runtime.rtl.get(ctx, bind_value, 1);
		if (Runtime.rtl.isString(ctx, bind_name))
		{
			bind_name = Runtime.Collection.from(Runtime.Collection.from([bind_name]));
		}
		var component = this.searchComponent(ctx, path_id, class_name);
		if (component == null)
		{
			this.warning(ctx, "Bind model: " + Runtime.rtl.toStr(class_name) + Runtime.rtl.toStr(" not found"));
			return ;
		}
		/* Get model path */
		var model_path = component.getModelPath(ctx);
		model_path = model_path.concat(ctx, bind_name);
		return model_path;
	},
	/**
	 * Returns model value from @bind value
	 */
	getBindModelValue: function(ctx, path_id, bind_value, def_val)
	{
		if (def_val == undefined) def_val = null;
		var model_path = this.getBindModelPath(ctx, path_id, bind_value);
		return this.model(ctx, model_path, def_val);
	},
	/**
	 * Set reference
	 */
	setReference: function(ctx, path_id, bind_value, item)
	{
		var class_name = Runtime.rtl.get(ctx, bind_value, 0);
		var bind_name = Runtime.rtl.get(ctx, bind_value, 1);
		var component = this.searchComponent(ctx, path_id, class_name);
		component[bind_name] = item;
	},
	/**
	 * Send event
	 */
	signal: async function(ctx, path_id, event)
	{
		var msg = new Runtime.Core.Message(ctx, event, path_id);
		await ctx.object_manager.handleMessage(ctx, msg);
	},
	/**
	 * Start driver
	 */
	startDriver: async function(ctx)
	{
		this.setParent(ctx, ctx.getDriver(ctx, "Runtime.Web.RenderDriver"));
		var __v0 = new Runtime.Monad(ctx, Runtime.rtl.attr(ctx, this.entity, ["params", "selector"]));
		__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "string", ""));
		this.selector = __v0.value(ctx);
		var __v1 = new Runtime.Monad(ctx, Runtime.rtl.attr(ctx, this.entity, ["params", "main_controller"]));
		__v1 = __v1.monad(ctx, Runtime.rtl.m_to(ctx, "bool", false));
		this.is_main_controller = __v1.value(ctx);
		var __v2 = new Runtime.Monad(ctx, Runtime.rtl.attr(ctx, this.entity, ["params", "selector_model"]));
		__v2 = __v2.monad(ctx, Runtime.rtl.m_to(ctx, "string", ""));
		var selector_model = __v2.value(ctx);
		if (selector_model == null || selector_model == "")
		{
			selector_model = this.selector + Runtime.rtl.toStr("_model");
		}
		var __v3 = new Runtime.Monad(ctx, Runtime.rtl.attr(ctx, this.entity, ["params", "window"]));
		__v3 = __v3.monad(ctx, Runtime.rtl.m_to(ctx, "string", ""));
		var window_name = __v3.value(ctx);
		if (window_name != "") window[window_name] = this;
		if (this.selector != "") this.root_elem = document.querySelector(this.selector);
		
		/* Get controller model */
		if (selector_model != "" && selector_model != null)
		{
			var layout_input = document.querySelector(selector_model);
			if (layout_input)
			{
				var layout = layout_input.value;
				layout = Runtime.rs.base64_decode_url(ctx, layout);
				layout = Runtime.RuntimeUtils.json_decode(ctx, layout);
				this.layout = layout;
			}
		}
		this.components = new Runtime.Map(ctx);
		this.saveComponent(ctx, this);
	},
	/**
	 * Render layout
	 */
	renderLayout: function(ctx, layout)
	{
		if (layout == null)
		{
			return ;
		}
		layout = Runtime.Web.RenderDriver.chainLayout(ctx, layout);
		var components = Runtime.Web.RenderDriver.getLayoutComponents(ctx, layout);
		var css = Runtime.Web.RenderDriver.getCSSFromComponents(ctx, components, layout.css_vars);
		this.layout = layout;
		this.layout_components = components;
		this.applyCss(ctx, css);
		this.repaint(ctx);
	},
	/**
	 * Repaint layout
	 */
	repaint: function(ctx)
	{
		if (this.animation_id == null)
		{
			this.ctx = ctx;
			this.animation_id = requestAnimationFrame( this.render.bind(this) );
		}
	},
	/**
	 * Apply css
	 */
	applyCss: function(ctx, css)
	{
		this.new_css = css;
	},
	/**
	 * Render layout
	 */
	render: function(ctx)
	{
		var ctx = this.ctx;
		this.animation_id = null;
		this.updated_components = new Runtime.Vector(ctx);
		this.remove_keys = new Runtime.Vector(ctx);
		this.register_listeners = new Runtime.Vector(ctx);
		var root_control = new Runtime.Web.RenderDriverControl(ctx, Runtime.Dict.from({"ctx":ctx,"controller":this,"component":this,"parent_elem":this.root_elem,"path_id":this.getPath(ctx),"driver":this.parent}));
		if (this.layout.layout_class == "")
		{
			throw new Runtime.Exceptions.RuntimeException(ctx, "Layout " + Runtime.rtl.toStr(this.layout.layout_name) + Runtime.rtl.toStr(" not found"))
		}
		var res = RenderDriver.e
		(
			root_control, [],
			"component",
			{
				"name": this.layout.layout_class,
				"attrs": {
					"@bind": ["Runtime.Web.RenderController", []],
					"@key": ""
				},
			},
			0
		);
		RenderDriver.p(root_control, res[1]);
		
		/* console.log(this.remove_keys); */
		
		/* Remove objects */
		for (var i=0; i<this.remove_keys.count(); i++)
		{
			var path_id = this.remove_keys[i];
			this.removeComponentsRecursive(ctx, path_id);
			this.manager.removeObjectRecursive(ctx, path_id);
		}
		
		/* Add new css */
		if (this.new_css != this.old_css)
		{
			var elem = document.querySelector(this.selector + "_style");
			if (elem != null)
			{
				if (elem.textContent != this.new_css) elem.textContent = this.new_css;
			}
			else
			{
				var elem = RenderDriver.getPreviousElement(this.root_elem);
				if (elem != null && elem.tagName == "STYLE" && elem._root_elem == this.root_elem)
				{
				}
				else
				{
					elem = document.createElement("STYLE");
					elem._root_elem = this.root_elem;
					this.root_elem.parentElement.insertBefore(elem, this.root_elem);
				}
				if (elem.textContent != this.new_css) elem.textContent = this.new_css;
			}
		}
		
		/* Set title */
		if (this.isMainController(ctx))
		{
			document.title = this.layout.title;
		}
		
		/* Register listeners */
		for (var i=0; i<this.register_listeners.count(); i++)
		{
			var listen = this.register_listeners[i];
			ctx.registerListener
			(
				ctx,
				listen.from,
				listen.event_class_name,
				listen.object_name,
				listen.method_name
			);
		}
		
		/* Save updated components */
		for (var i=0; i<this.updated_components.count(); i++)
		{
			var obj = this.updated_components[i];
			var component = obj.get(ctx, "component");
			this.saveComponent(ctx, component);
		}
		this.old_css = this.new_css;
	},
	/**
	 * Update elem params
	 */
	updateElemParams: function(ctx, control, elem)
	{
		var model = control.model;
		var is_new_elem = control.is_new_elem;
		var component = elem._component;
		var attrs = elem._attrs;
		var path_id = elem._path_id;
		
		/* Set attrs */
		if (attrs != null)
		{
			/* Add attributes */
			for (var key in attrs)
			{
				var value = attrs[key];
				if (key == "@bind")
				{
					value = this.getBindModelValue(ctx, path_id, value);
				}
				if (key == "@ref")
				{
					this.setReference(ctx, path_id, value, elem);
					continue;
				}
				if (key == "@name")
				{
					value = this.getBindModelValue(ctx, path_id, value);
					this.setReference(ctx, path_id, value, elem);
				}
				if (key == "value" || key == "@bind" || key == "@name")
				{
					if (elem.tagName == "INPUT" || elem.tagName == "SELECT" || elem.tagName == "TEXTAREA")
					{
						if (value == null && elem.value != "") elem.value = "";
						else if (elem.value != value) elem.value = value;
						continue;
					}
				}
				if (key[0] == "@") continue;
				if (key == "style" && value instanceof Runtime.Dict)
				{
					value = value.transition(ctx, (ctx, v, k)=>{ return k + ": " + v; });
					value = Runtime.rs.join(ctx, ";", value);
				}
				if (elem.getAttribute(key) != value)
				{
					elem.setAttribute(key, Runtime.rs.trim(ctx, value));
				}
			}
			
			/* Remove old attributes */
			for (var i=elem.attributes.length - 1; i>=0; i--)
			{
				var attr = elem.attributes[i];
				if (attrs[attr.name] == undefined/* && attr.name != "data-path"*/)
				{
					elem.removeAttribute(attr.name);
				}
			}
		}
		
		/* Bind element events */
		this.bindEvents(ctx, control, elem, attrs, is_new_elem);
		
		/* Set data-path attribute */
		/*elem.setAttribute("data-path", path_id);*/
	},
	/**
	 * Component model changed
	 */
	onChangeComponent: function(ctx, msg)
	{
		var component = msg.sender;
		var model_path = component.getModelPath(ctx);
		var new_value = msg.data.value;
		this.updateModel(ctx, model_path, new_value);
	},
	/**
	 * Bind element events
	 */
	bindEvents: function(ctx, control, elem, attrs, is_new_elem)
	{
		if (is_new_elem == undefined) is_new_elem = false;
		var path_id = (elem instanceof Runtime.Web.Component) ? (elem.getPath(ctx)) : (elem._path_id);
		for (var key in attrs)
		{
			var value = attrs[key];
			var is_event = key.substring(0, 7) == "@event:";
			var is_event_async = key.substring(0, 12) == "@eventAsync:";
			
			if (key == "@bind" || key == "@name")
			{
				if (elem instanceof Runtime.Web.Component)
				{
					this.register_listeners.push
					(
						ctx,
						{
							"from": elem.getObjectName(),
							"event_class_name": "Runtime.Web.Events.ChangeEvent",
							"object_name": this.getObjectName(),
							"method_name": "onChangeComponent"
						}
					);
				}
				else
				{
					var f_event = function (ctx, controller, path_id, bind_value)
					{
						return function (e)
						{
							var model_path = controller.getBindModelPath(ctx, path_id, bind_value);
							controller.updateModel(ctx, model_path, e.value);
						}
					};
					elem.addEventListener
					(
						"change",
						f_event(ctx, this, path_id, value)
					);
				}
			}
			else if (is_event || is_event_async)
			{
				var event_class_name = "";
				if (is_event) event_class_name = key.substring(7);
				if (is_event_async) event_class_name = key.substring(12);
				
				var event_class = use(event_class_name);
				if (event_class == undefined)
				{
					this.warning(ctx, "Event '" + event_class_name + "' not found in ", elem);
					continue;
				}
				
				/* Find component */
				var class_name = value[0];
				var callback = value[1];
				var component = this.searchComponent(ctx, path_id, class_name);
				if (component == null)
				{
					continue;
				}
				
				if (elem instanceof Runtime.Web.Component)
				{
					this.register_listeners.push
					(
						ctx,
						{
							"from": elem.getObjectName(),
							"event_class_name": event_class_name,
							"object_name": component.getObjectName(),
							"method_name": callback
						}
					);
				}
				else
				{
					var es6_name = event_class.ES6_EVENT_NAME;
					if (es6_name == undefined) continue;
					
					/* Find callback method */
					if (!Runtime.rtl.method_exists(ctx, component, callback))
					{
						this.warning(ctx, "Method '" + callback + "' not found in ", component);
						continue;
					}
					
					/* Register listener */
					this.register_listeners.push
					(
						ctx,
						{
							"from": path_id,
							"event_class_name": event_class_name,
							"object_name": component.getObjectName(),
							"method_name": callback
						}
					);
					
					/* Register event listener */
					elem.addEventListener(es6_name, Runtime.Web.RenderDriver.js_event);
				}
			}
		}
	},
	/**
	 * Patch DOM with new childs
	 */
	patchElemChilds: function(ctx, parent_elem, new_childs)
	{
		if (new_childs == null) new_childs = [];
		
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
		
		
		/* Remove elems */
		var i = parent_elem.childNodes.length - 1;
		while (i >= 0)
		{
			var e = parent_elem.childNodes[i];
			if (new_childs.indexOf(e) == -1)
			{
				parent_elem.removeChild(e);
				if (e._path_id != undefined)
				{
					this.remove_keys.push(null, e._path_id);
				}
				/* console.log('Remove child ', i); */
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
					/* console.log('Insert first ', i); */
				}
				else
				{
					insertAfter(parent_elem, prevElem, new_e);
					flag = true;
					/* console.log('Insert after[1] ', i); */
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
						/* console.log('Insert after[2] ', i); */
					}
				}
				else
				{
					var prevSibling = parent_elem.childNodes[pos - 1];
					if (prevElem != prevSibling)
					{
						insertAfter(parent_elem, prevElem, new_e);
						flag = true;
						/* console.log('Insert after[3] ', i); */
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
	_init: function(ctx)
	{
		this.ctx = null;
		this.selector = "";
		this.root_elem = null;
		this.animation_id = null;
		this.is_main_controller = false;
		this.layout = null;
		this.layout_components = null;
		this.updated_components = null;
		this.remove_keys = null;
		this.components = null;
		this.next_component_id = 0;
		this.new_css = "";
		this.old_css = "";
		Runtime.Core.CoreDriver.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.RenderController)
		{
			this.ctx = o.ctx;
			this.selector = o.selector;
			this.root_elem = o.root_elem;
			this.animation_id = o.animation_id;
			this.is_main_controller = o.is_main_controller;
			this.layout = o.layout;
			this.layout_components = o.layout_components;
			this.updated_components = o.updated_components;
			this.remove_keys = o.remove_keys;
			this.components = o.components;
			this.next_component_id = o.next_component_id;
			this.new_css = o.new_css;
			this.old_css = o.old_css;
		}
		Runtime.Core.CoreDriver.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "ctx")this.ctx = v;
		else if (k == "selector")this.selector = v;
		else if (k == "root_elem")this.root_elem = v;
		else if (k == "animation_id")this.animation_id = v;
		else if (k == "is_main_controller")this.is_main_controller = v;
		else if (k == "layout")this.layout = v;
		else if (k == "layout_components")this.layout_components = v;
		else if (k == "updated_components")this.updated_components = v;
		else if (k == "remove_keys")this.remove_keys = v;
		else if (k == "components")this.components = v;
		else if (k == "next_component_id")this.next_component_id = v;
		else if (k == "new_css")this.new_css = v;
		else if (k == "old_css")this.old_css = v;
		else Runtime.Core.CoreDriver.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "ctx")return this.ctx;
		else if (k == "selector")return this.selector;
		else if (k == "root_elem")return this.root_elem;
		else if (k == "animation_id")return this.animation_id;
		else if (k == "is_main_controller")return this.is_main_controller;
		else if (k == "layout")return this.layout;
		else if (k == "layout_components")return this.layout_components;
		else if (k == "updated_components")return this.updated_components;
		else if (k == "remove_keys")return this.remove_keys;
		else if (k == "components")return this.components;
		else if (k == "next_component_id")return this.next_component_id;
		else if (k == "new_css")return this.new_css;
		else if (k == "old_css")return this.old_css;
		return Runtime.Core.CoreDriver.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.RenderController";
	},
});
Object.assign(Runtime.Web.RenderController, Runtime.Core.CoreDriver);
Object.assign(Runtime.Web.RenderController,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.RenderController";
	},
	getParentClassName: function()
	{
		return "Runtime.Core.CoreDriver";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.RenderController",
			"name": "Runtime.Web.RenderController",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("ctx");
			a.push("selector");
			a.push("root_elem");
			a.push("animation_id");
			a.push("is_main_controller");
			a.push("layout");
			a.push("layout_components");
			a.push("updated_components");
			a.push("remove_keys");
			a.push("components");
			a.push("next_component_id");
			a.push("new_css");
			a.push("old_css");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ctx") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderController",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "selector") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderController",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "root_elem") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderController",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "animation_id") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderController",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_main_controller") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderController",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "layout") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderController",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "layout_components") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderController",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "updated_components") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderController",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "remove_keys") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderController",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "components") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderController",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "next_component_id") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderController",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "new_css") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderController",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "old_css") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderController",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.RenderController);
window["Runtime.Web.RenderController"] = Runtime.Web.RenderController;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RenderController;
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
Runtime.Web.RenderDriver = function(ctx)
{
	Runtime.Core.CoreDriver.apply(this, arguments);
};
Runtime.Web.RenderDriver.prototype = Object.create(Runtime.Core.CoreDriver.prototype);
Runtime.Web.RenderDriver.prototype.constructor = Runtime.Web.RenderDriver;
Object.assign(Runtime.Web.RenderDriver.prototype,
{
	/**
	 * Start controller
	 */
	startDriver: async function(ctx)
	{
	},
	/**
	 * Bind es6 event
	 */
	bindGlobalEvent: function(ctx, event_class_name)
	{
		if (!this.listen_events.has(ctx, event_class_name))
		{
			var body = document.getElementsByTagName("body")[0];
			body._path_id = this.getObjectName();
			var event_class = use(event_class_name);
			if (event_class == undefined) return false;
			
			var es6_name = event_class.ES6_EVENT_NAME;
			if (es6_name == undefined) return false;
			
			body.addEventListener(es6_name, Runtime.Web.RenderDriver.js_event);
			this.listen_events.set(ctx, event_class_name, true);
		}
		return true;
	},
	/**
	 * Start listen event
	 */
	registerGlobalListener: function(ctx, event_class_name, object_name, method_name)
	{
		if (method_name == undefined) method_name = "";
		if (this.bindGlobalEvent(ctx, event_class_name))
		{
			ctx.registerListener(ctx, this.getObjectName(ctx), event_class_name, object_name, method_name);
		}
	},
	/**
	 * Returns css
	 */
	getLayoutCSS: function(ctx, layout)
	{
		var components = Runtime.Web.RenderDriver.getLayoutComponents(ctx, layout);
		var css = Runtime.Web.RenderDriver.getCSSFromComponents(ctx, components, layout.css_vars);
		return css;
	},
	_init: function(ctx)
	{
		this.listen_events = new Runtime.Map(ctx);
		Runtime.Core.CoreDriver.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.RenderDriver)
		{
			this.listen_events = o.listen_events;
		}
		Runtime.Core.CoreDriver.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "listen_events")this.listen_events = v;
		else Runtime.Core.CoreDriver.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "listen_events")return this.listen_events;
		return Runtime.Core.CoreDriver.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.RenderDriver";
	},
});
Object.assign(Runtime.Web.RenderDriver, Runtime.Core.CoreDriver);
Object.assign(Runtime.Web.RenderDriver,
{
	LAYOUT_CHAIN: "Runtime.Web.Layout",
	PATTERN_CHAIN: "Runtime.Web.Pattern",
	RENDER_CHAIN: "Runtime.Web.Render",
	API_EXTERNAL_BUS_PREPARE_CHAIN: "Runtime.Web.Api.ExternalBusPrepare",
	RENDER_CHAIN_START: 500,
	RENDER_CHAIN_CREATE_LAYOUT_MODEL: 950,
	RENDER_CHAIN_CHANGE_LAYOUT_MODEL: 1000,
	RENDER_CHAIN_SET_FRONTEND_ENVIROMENTS: 1500,
	RENDER_CHAIN_SET_FRONTEND_STORAGE: 1500,
	RENDER_CHAIN_CALL_ROUTE_BEFORE: 2000,
	RENDER_CHAIN_CALL_ROUTE_MIDDLEWARE: 2500,
	RENDER_CHAIN_CALL_ROUTE: 3000,
	RENDER_CHAIN_CALL_PAGE_NOT_FOUND: 3100,
	RENDER_CHAIN_CALL_ROUTE_AFTER: 3500,
	RENDER_CHAIN_RESPONSE_BEFORE: 4000,
	RENDER_CHAIN_RESPONSE: 4500,
	RENDER_CHAIN_RESPONSE_AFTER: 5000,
	/**
	 * Returns main controller
	 */
	getMainController: function(ctx)
	{
		var controllers = ctx.getDrivers(ctx, "Runtime.Web.RenderController");
		for (var i = 0;i < controllers.count(ctx);i++)
		{
			var controller = Runtime.rtl.get(ctx, controllers, i);
			if (controller.isMainController(ctx))
			{
				return controller;
			}
		}
		return null;
	},
	/**
	 * JS Event
	 */
	js_event: function(e)
	{
		var ctx = Runtime.RuntimeUtils.getContext();
		var path_id = e.currentTarget._path_id;
		var event = Runtime.Web.Events.WebEvent.fromEvent(ctx, e);
		
		/* Send signal */
		(async () => {
			try
			{
				var msg = new Runtime.Core.Message(ctx, event, path_id);
				msg.sender = event.target;
				await ctx.object_manager.handleMessage(ctx, msg);
			}
			catch (e)
			{
				console.log(e.stack);
			}
		})();
	},
	/**
	 * Retuns css hash
	 * @param string component class name
	 * @return string hash
	 */
	getCssHash: function(ctx, s)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.Web.RenderDriver.getCssHash", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var r = "";
		var a = "1234567890abcdef";
		var sz = Runtime.rs.strlen(ctx, s);
		var h = 0;
		for (var i = 0;i < sz;i++)
		{
			var c = Runtime.rs.ord(ctx, Runtime.rs.substr(ctx, s, i, 1));
			h = (h << 2) + (h >> 14) + c & 65535;
		}
		var p = 0;
		while (h != 0 || p < 4)
		{
			var c = h & 15;
			h = h >> 4;
			r += Runtime.rtl.toStr(Runtime.rs.substr(ctx, a, c, 1));
			p = p + 1;
		}
		var __memorize_value = r;
		Runtime.rtl._memorizeSave("Runtime.Web.RenderDriver.getCssHash", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns css name
	 */
	getCssName: function(ctx, class_name, css_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.Web.RenderDriver.getCssName", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var arr = Runtime.rs.split(ctx, " ", css_name);
		var class_names = Runtime.RuntimeUtils.getParents(ctx, class_name);
		class_names = class_names.filter(ctx, (ctx, class_name) => 
		{
			return class_name != "Runtime.BaseObject" && class_name != "Runtime.Core.CoreObject" && class_name != "Runtime.Web.Component";
		});
		arr = arr.map(ctx, (ctx, css_name) => 
		{
			var s1 = class_names.map(ctx, (ctx, class_name) => 
			{
				var hash = this.getCssHash(ctx, class_name);
				return css_name + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(hash);
			});
			var s2 = Runtime.rs.join(ctx, " ", s1);
			return s2;
		});
		var name = Runtime.rs.join(ctx, " ", arr);
		var __memorize_value = name;
		Runtime.rtl._memorizeSave("Runtime.Web.RenderDriver.getCssName", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns css hash
	 */
	getCssHashes: function(ctx, class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.Web.RenderDriver.getCssHashes", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var class_names = Runtime.RuntimeUtils.getParents(ctx, class_name);
		class_names = class_names.filter(ctx, (ctx, class_name) => 
		{
			return class_name != "Runtime.BaseObject" && class_name != "Runtime.Core.CoreObject" && class_name != "Runtime.Web.Component";
		});
		class_names = class_names.map(ctx, (ctx, class_name) => 
		{
			return "h-" + Runtime.rtl.toStr(this.getCssHash(ctx, class_name));
		});
		var __memorize_value = Runtime.rs.join(ctx, " ", class_names);
		Runtime.rtl._memorizeSave("Runtime.Web.RenderDriver.getCssHashes", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	_getRequiredComponents: function(ctx, res, cache, components)
	{
		if (components == null)
		{
			return ;
		}
		for (var i = 0;i < components.count(ctx);i++)
		{
			var class_name = components.item(ctx, i);
			if (cache.get(ctx, class_name, false) == false)
			{
				cache.set(ctx, class_name, true);
				if (Runtime.rtl.method_exists(ctx, class_name, "components"))
				{
					var f = Runtime.rtl.method(ctx, class_name, "components");
					var sub_components = f(ctx);
					if (sub_components != null)
					{
						this._getRequiredComponents(ctx, res, cache, sub_components);
					}
				}
				res.push(ctx, class_name);
			}
		}
	},
	/**
	 * Returns all components
	 * @param Collection<string> components
	 * @return Collection<string>
	 */
	getRequiredComponents: function(ctx, components)
	{
		var res = new Runtime.Vector(ctx);
		var cache = new Runtime.Map(ctx);
		this._getRequiredComponents(ctx, res, cache, components);
		res = res.removeDublicatesIm(ctx);
		return res.toCollection(ctx);
	},
	/**
	 * Returns all layout components
	 * @param LayoutModel layout
	 * @return Collection<string>
	 */
	getLayoutComponents: function(ctx, layout)
	{
		var components = Runtime.Collection.from([]);
		if (layout.layout_class != "")
		{
			components = components.pushIm(ctx, layout.layout_class);
		}
		if (layout.page_class != "")
		{
			components = components.pushIm(ctx, layout.page_class);
		}
		if (layout.components != null)
		{
			components = components.appendCollectionIm(ctx, layout.components);
		}
		components = components.removeDublicatesIm(ctx);
		components = Runtime.Web.RenderDriver.getRequiredComponents(ctx, components);
		components = components.filter(ctx, Runtime.lib.equalNot(ctx, ""));
		return components;
	},
	/**
	 * Returns css string
	 * @param Collection<string> components
	 * @param Dict<string> css_vars
	 * @return string
	 */
	getCSSFromComponents: function(ctx, components, css_vars)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.Web.RenderDriver.getCSSFromComponents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = new Runtime.Vector(ctx);
		if (components != null)
		{
			for (var i = 0;i < components.count(ctx);i++)
			{
				var component_name = components.item(ctx, i);
				if (Runtime.rtl.method_exists(ctx, component_name, "css"))
				{
					var f = Runtime.rtl.method(ctx, component_name, "css");
					var css = f(ctx, css_vars);
					if (!Runtime.rtl.isEmpty(ctx, css))
					{
						res.push(ctx, css);
					}
				}
			}
		}
		var s = res.reduce(ctx, (ctx, res, s) => 
		{
			return res + Runtime.rtl.toStr(s);
		}, "");
		var __memorize_value = s;
		Runtime.rtl._memorizeSave("Runtime.Web.RenderDriver.getCSSFromComponents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Layout chain
	 */
	chainLayout: function(ctx, layout)
	{
		var __v0 = new Runtime.Monad(ctx, ctx.chain(ctx, this.LAYOUT_CHAIN, Runtime.Collection.from([layout])));
		__v0 = __v0.attr(ctx, 0);
		layout = __v0.value(ctx);
		return layout;
	},
	/**
	 * Render chain
	 */
	chainRender: async function(ctx, container)
	{
		var __v0 = new Runtime.Monad(ctx, await ctx.chainAsync(ctx, this.RENDER_CHAIN, Runtime.Collection.from([container])));
		__v0 = __v0.attr(ctx, 0);
		container = __v0.value(ctx);
		return Promise.resolve(container);
	},
	/**
	 * Layout chain
	 */
	layoutChainDefault: function(ctx, layout)
	{
		if (layout.layout_name == "default" && layout.layout_class == "" || layout.layout_class == "")
		{
			layout = Runtime.rtl.setAttr(ctx, layout, Runtime.Collection.from(["layout_class"]), "Runtime.Web.Layout");
		}
		return Runtime.Collection.from([layout]);
	},
	/**
	 * Split route prefix
	 */
	splitRoutePrefix: function(ctx, request_uri, route_prefix)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.Web.RenderDriver.splitRoutePrefix", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var prefix_len = Runtime.rs.strlen(ctx, route_prefix);
		if (prefix_len > 0)
		{
			var pos = Runtime.rs.search(ctx, request_uri, route_prefix);
			if (pos == -1)
			{
				var __memorize_value = null;
				Runtime.rtl._memorizeSave("Runtime.Web.RenderDriver.splitRoutePrefix", arguments, __memorize_value);
				return __memorize_value;
			}
			request_uri = Runtime.rs.substr(ctx, request_uri, prefix_len);
		}
		if (request_uri == "")
		{
			request_uri = "/";
		}
		var __memorize_value = request_uri;
		Runtime.rtl._memorizeSave("Runtime.Web.RenderDriver.splitRoutePrefix", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Render chain
	 * Create layout model
	 */
	renderChainCreateLayoutModel: function(ctx, container)
	{
		if (container == null)
		{
			return Runtime.Collection.from([container]);
		}
		if (container.isResponseExists(ctx))
		{
			return Runtime.Collection.from([container]);
		}
		var driver = ctx.getDriver(ctx, "Runtime.Web.FrontendStorageDriver");
		var frontend_keep_data = Runtime.Dict.from({});
		/* Load frontend data */
		if (driver != null && container.frontend_controller_name != "")
		{
			var old_layout = driver.loadControllerModel(ctx, container.frontend_controller_name);
			if (old_layout != null)
			{
				frontend_keep_data = old_layout.keep_data;
			}
		}
		/* Create LayoutModel */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout"]), new Runtime.Web.LayoutModel(ctx, Runtime.Dict.from({"uri":this.splitRoutePrefix(ctx, container.request.uri, container.request.route_prefix),"f_inc":ctx.config(ctx, Runtime.Collection.from(["Runtime.Web","f_inc"]), "1"),"full_uri":container.request.uri,"route":container.route,"route_prefix":container.request.route_prefix,"route_params":container.route_params,"keep_data":frontend_keep_data,"css_vars":Runtime.Dict.from({"colors":Runtime.Dict.from({"default":Runtime.Dict.from({"color":"#fff","background":"#fff","border":"#ccc","text":"#000","hover-background":"#eee","hover-text":"inherit"}),"active":Runtime.Dict.from({"color":"#337ab7","background":"#337ab7","border":"#22527b","text":"#fff","hover-background":"#337ab7","hover-text":"#fff"}),"primary":Runtime.Dict.from({"color":"#337ab7","background":"#337ab7","border":"#22527b","text":"#fff","hover-background":"#286090","hover-text":"#fff","active-background":"#286090","active-tet":"#fff"}),"danger":Runtime.Dict.from({"color":"#d14b42","background":"#d14b42","border":"#a02e27","text":"#fff","hover-background":"#e60000","hover-text":"#fff","active-background":"#e60000","active-tet":"#fff"}),"success":Runtime.Dict.from({"color":"green","background":"green","border":"green","text":"#fff","hover":"green","hover-text":"#fff","active":"green","active-tet":"#fff"}),"error":Runtime.Dict.from({"color":"#d14b42","background":"#d14b42","border":"#a02e27","text":"#fff","hover-background":"#e60000","hover-text":"#fff","active-background":"#e60000","active-tet":"#fff"}),"warning":Runtime.Dict.from({"color":"yellow","background":"yellow","border":"yellow","text":"#fff","hover":"yellow","hover-text":"#fff","active":"yellow","active-tet":"#fff"})}),"font":Runtime.Dict.from({"size":"14px"})})})));
		return Runtime.Collection.from([container]);
	},
	/**
	 * Render chain
	 * Call route middlewares
	 */
	renderChainCallRouteMiddleware: async function(ctx, container)
	{
		if (container == null)
		{
			return Promise.resolve(Runtime.Collection.from([container]));
		}
		if (container.isResponseExists(ctx))
		{
			return Promise.resolve(Runtime.Collection.from([container]));
		}
		if (container.isPageExists(ctx))
		{
			return Promise.resolve(Runtime.Collection.from([container]));
		}
		if (!container.isRouteExists(ctx))
		{
			return Promise.resolve(Runtime.Collection.from([container]));
		}
		var middlewares = Runtime.Collection.from([]);
		/* Get middleware from class */
		var getMethodInfoByName = Runtime.rtl.method(ctx, container.route.class_name, "getClassInfo");
		var info = getMethodInfoByName(ctx);
		middlewares = middlewares.concatIm(ctx, info.annotations.filter(ctx, Runtime.lib.isInstance(ctx, "Runtime.Web.RouteMiddleware")));
		/* Get middleware from method */
		var getMethodInfoByName = Runtime.rtl.method(ctx, container.route.class_name, "getMethodInfoByName");
		var info = getMethodInfoByName(ctx, container.route.class_method_name);
		middlewares = middlewares.concatIm(ctx, info.annotations.filter(ctx, Runtime.lib.isInstance(ctx, "Runtime.Web.RouteMiddleware")));
		/* Run each middleware */
		for (var i = 0;i < middlewares.count(ctx, i);i++)
		{
			var m = middlewares.item(ctx, i);
			var arr = Runtime.rs.split(ctx, "::", m.value);
			var class_name = arr.get(ctx, 0, "");
			var method_name = arr.get(ctx, 1, "");
			var f = Runtime.rtl.method(ctx, class_name, method_name);
			/* Run method */
			var res = await f(ctx, container);
			container = Runtime.rtl.get(ctx, res, 0);
		}
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	/**
	 * Render chain
	 * Call route
	 */
	renderChainCallRoute: async function(ctx, container)
	{
		if (container == null)
		{
			return Promise.resolve(Runtime.Collection.from([container]));
		}
		if (container.isResponseExists(ctx))
		{
			return Promise.resolve(Runtime.Collection.from([container]));
		}
		if (container.isPageExists(ctx))
		{
			return Promise.resolve(Runtime.Collection.from([container]));
		}
		if (!container.isRouteExists(ctx))
		{
			return Promise.resolve(Runtime.Collection.from([container]));
		}
		var f = Runtime.rtl.method(ctx, container.route.class_name, container.route.class_method_name);
		var res = await f(ctx, container);
		container = Runtime.rtl.get(ctx, res, 0);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	/**
	 * Returns rect of elem
	 */
	getRect: function(ctx, elem)
	{
		var x = 0;
		var y = 0;
		var w = 0;
		var h = 0;
		x = elem.offsetLeft;
		y = elem.offsetTop;
		w = elem.clientWidth;
		h = elem.clientHeight;
		return Runtime.Dict.from({"x":x,"y":y,"w":w,"h":h});
	},
	/**
	 * Remote bus call
	 * @param Dict items
	 * @return RemoteCallAnswer
	 */
	remoteBusCall: async function(ctx, items, container)
	{
		if (container == undefined) container = null;
		/* Set default params */
		items = items.copy(ctx, Runtime.Dict.from({"app_name":items.get(ctx, "app_name", "self"),"interface_name":items.get(ctx, "interface_name", "default")}));
		/* Change api request */
		var request = new Runtime.Core.RemoteCallRequest(ctx, items);
		var res = await ctx.chainAsync(ctx, Runtime.Web.RenderDriver.API_EXTERNAL_BUS_PREPARE_CHAIN, Runtime.Collection.from([container,request]));
		request = Runtime.rtl.get(ctx, res, 1);
		/* Restore request */
		request = request.copy(ctx, Runtime.Dict.from({"uri":items.get(ctx, "uri", ""),"app_name":items.get(ctx, "app_name", "self"),"object_name":items.get(ctx, "object_name", ""),"interface_name":items.get(ctx, "interface_name", "default"),"method_name":items.get(ctx, "method_name", "")}));
		/* Send request */
		var bus = ctx.getDriver(ctx, "default:external_bus");
		var answer = await bus.remoteBusCall(ctx, request);
		return Promise.resolve(answer);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.RenderDriver";
	},
	getParentClassName: function()
	{
		return "Runtime.Core.CoreDriver";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.RenderDriver",
			"name": "Runtime.Web.RenderDriver",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("listen_events");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "LAYOUT_CHAIN") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "PATTERN_CHAIN") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "RENDER_CHAIN") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "API_EXTERNAL_BUS_PREPARE_CHAIN") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "RENDER_CHAIN_START") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "RENDER_CHAIN_CREATE_LAYOUT_MODEL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "RENDER_CHAIN_CHANGE_LAYOUT_MODEL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "RENDER_CHAIN_SET_FRONTEND_ENVIROMENTS") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "RENDER_CHAIN_SET_FRONTEND_STORAGE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "RENDER_CHAIN_CALL_ROUTE_BEFORE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "RENDER_CHAIN_CALL_ROUTE_MIDDLEWARE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "RENDER_CHAIN_CALL_ROUTE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "RENDER_CHAIN_CALL_PAGE_NOT_FOUND") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "RENDER_CHAIN_CALL_ROUTE_AFTER") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "RENDER_CHAIN_RESPONSE_BEFORE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "RENDER_CHAIN_RESPONSE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "RENDER_CHAIN_RESPONSE_AFTER") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "listen_events") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriver",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.RenderDriver);
window["Runtime.Web.RenderDriver"] = Runtime.Web.RenderDriver;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RenderDriver;
window["RenderDriver"] = Runtime.Web.RenderDriver;


Object.assign(Runtime.Web.RenderDriver,
{
	
	
	/**
	 * Returns true if is elem
	 */
	isElem(o)
	{
		if (o instanceof HTMLElement || o instanceof Node) return true;
		return false;
	},
	
	
	
	/**
	 * Return HTML elems from string
	 */
	createElementFromHTML(s)
	{
		var res = [];
		var e = document.createElement('div');
		e.innerHTML = s.trim();
		for (var i = 0; i < e.childNodes.length; i++) res.push( e.childNodes[i] );
		return res;
	},
	
	
	
	/**
	 * Decode html entities
	 */
	decodeHtmlEntities(s)
	{
		var e = document.createElement('textarea');
		e.innerHTML = s;
		return e.value;
	},
	
	
	
	/**
	 * Returns elem by index
	 */
	getElemChild: function(parent_elem, index)
	{
		if (index < 0 || index >= parent_elem.childNodes.length) return null;
		return parent_elem.childNodes[index];
	},
	
	
	
	/**
	 * Returns previous element
	 */
	getPreviousElement: function(elem)
	{
		var previous = null;
		var parent_elem = elem.parentElement;
		for (var i = 0; i < parent_elem.childNodes.length; i++)
		{
			var e = parent_elem.childNodes[i];
			if (e == elem)
			{
				return previous;
			}
			previous = e;
		}
		return null;
	},
	
	
	
	/**
	 * Find elem pos by virtual path
	 */
	findElemPosByPath: function(parent_elem, path)
	{
		for (var i = 0; i < parent_elem.childNodes.length; i++)
		{
			var e = parent_elem.childNodes[i];
			if (e._path_id == path)
			{
				return i;
			}
		}
		return -1;
	},
	
	
	
	/**
	 * Find elem by virtual path
	 */
	findElemByPath: function(parent_elem, path_id, kind)
	{
		var pos = this.findElemPosByPath(parent_elem, path_id);
		return this.getElemChild(parent_elem, pos);
	},
	
	
	
	/**
	 * Find elem by virtual path and check
	 */
	findElemByPathAndCheck: function(parent_elem, path_id, kind)
	{
		var pos = this.findElemPosByPath(parent_elem, path_id);
		var elem_new = this.getElemChild(parent_elem, pos);
		
		/* Check element */
		if (elem_new != null)
		{
			if (kind == "element")
			{
				if (elem_new.tagName == undefined)
				{
					elem_new = null;
				}
			}
		}
		
		return elem_new;
	},
	
	
	
	/**
	 * Build Virtual Path
	 */
	buildPath: function(control, params, index)
	{
		var key = ""; var elem_name = "";
		if (params != null)
		{
			if (params["@key"] != undefined) key = params["@key"];
			if (params["@elem_name"] != undefined) elem_name = params["@elem_name"];
		}
		if (key == "")
		{
			key = (elem_name != "") ? (elem_name + "-" + index) : index;
		}
		var path_id = control.path_id;
		return "" + path_id + ((path_id != "") ? "." : "") + key;
	},
	
	
	
	/**
	 * Normalize childs
	 */
	_normalizeChilds: function(res, childs)
	{
		for (var i=0; i<childs.length; i++)
		{
			var item = childs[i];
			if (item instanceof Array)
			{
				res = this._normalizeChilds(res, item);
			}
			else
			{
				res.push(item);
			}
		}
		return res;
	},
	
	
	
	/**
	 * Normalize content
	 */
	normalizeContent: function(content, control)
	{
		if (content == null) return null;
		if (typeof content == "function" || content instanceof Function) content = content(control);
		if (this.isElem(content)) return content;
		if (content instanceof Array)
		{
			var new_content = [];
			for (var i=0; i<content.length; i++)
			{
				var item = this.normalizeContent(content[i], control);
				if (item != null) new_content.push(item);
			}
			
			var res = [];
			this._normalizeChilds(res, new_content);
			
			return res;
		}
		
		return content;
	},
	
	
	
	/**
	 * Element
	 */
	e: function (control, childs, type, obj)
	{
		var index = childs.length;
		var new_control = null;
		var parent_elem = control.parent_elem;
		var name = (obj != null) ? obj.name : "";
		var attrs = (obj != null && obj.attrs != null && obj.attrs != undefined) ? obj.attrs : null;
		var content = (obj != null && obj.content != null && obj.content != undefined) ? obj.content : null;
		var path_id = this.buildPath(control, attrs, index);
		var controller = control.controller;
		var ctx = control.ctx;
		
		if (type == 'component')
		{
			var model = null;
			var model_path = null;
			var created = false;
			
			/* Find class */
			var class_obj = use(name);
			if (class_obj == undefined)
			{
				throw new Error("Component " + name + " not found");
			}
			
			/* Find component */
			var component = controller.getComponent(ctx, path_id, name);
			if (component == null)
			{
				/* Create component */
				component = new class_obj(ctx, path_id, controller);
				component.driver = control.driver;
				controller.saveComponent(ctx, component);
				created = true;
			}
			
			/* Find model */
			if (attrs != null && attrs["@bind"] != undefined)
			{
				model_path = controller.getBindModelPath(ctx, path_id, attrs["@bind"]);
			}
			if (attrs != null && attrs["@name"] != undefined)
			{
				model_path = controller.getBindModelPath(ctx, path_id, attrs["@name"]);
			}
			
			/* Get model */
			if (model_path != null)
			{
				model = Runtime.rtl.attr(ctx, controller.layout, model_path, null);
				attrs["model"] = model;
			}
			
			var dict_attrs = Runtime.Dict.from(attrs);
			
			/* Set new model */
			component.setParams(ctx, dict_attrs);
			component.setModelPath(ctx, model_path);
			component.setParent(ctx, control.component);
			
			/* Set reference */
			if (attrs != null && attrs["@ref"] != undefined)
			{
				controller.setReference(ctx, component.path_id, attrs["@ref"], component);
			}
			if (attrs != null && attrs["@name"] != undefined)
			{
				controller.setReference(ctx, component.path_id, attrs["@name"], component);
			}
			
			/* Create new control */
			new_control = control.copy(ctx, {
				"type": type,
				"index": index,
				"path_id": path_id,
				"component": component,
				"model": model,
			});
			
			if (!component.isRepaintOverridden(ctx, new_control))
			{
				/* Render component */
				var render = class_obj.render.bind(class_obj);
				var res = render
				(
					ctx, controller.layout, model, dict_attrs, content
				);
				
				/* Call result */
				if (res != null && typeof res == "function") res = res(new_control);
				
				/* Normalize content */
				res = this.normalizeContent(res, new_control);
				
				/* Add childs */
				childs = childs.slice();
				if (res != null) childs.push(res);
			}
			else
			{
				/* Render component */
				var res = component.repaint(ctx, new_control);
				
				/* Add childs */
				childs = childs.slice();
				if (res != null) childs.push(res);
			}
			
			controller.updateComponent(ctx, component, created);
			controller.bindEvents(ctx, new_control, component, attrs, created);
			component.updateComponent(ctx, created);
		}
		
		else if (type == 'element')
		{
			var elem_new = this.findElemByPathAndCheck(parent_elem, path_id, type);
			var is_new_elem = false;
			
			/* Create new element */
			if (elem_new == null)
			{
				elem_new = document.createElement(name);
				is_new_elem = true;
				
				var test_e = this.findElemByPathAndCheck(parent_elem, path_id, type);
				/*console.log(elem_new);*/
			}
			
			/* Create new control */
			new_control = control.copy(ctx, {
				"type": type,
				"index": index,
				"path_id": path_id,
				"parent_elem": elem_new,
				"is_new_elem": is_new_elem,
			});
			
			/* Update element params */
			elem_new._attrs = attrs;
			elem_new._path_id = path_id;
			elem_new._component = control.component;
			elem_new.params = Runtime.Dict.from(attrs);
			
			/* Update element params */
			controller.updateElemParams(ctx, new_control, elem_new);
			
			/* Add childs */
			childs = childs.slice();
			childs.push(elem_new);
		}
		
		else if (this.isElem(content))
		{
			childs = childs.slice();
			childs.push(content);
		}
		else if (content instanceof Array)
		{
			childs = childs.slice();
			childs.push(content);
		}
		else if (typeof content == "function" || content instanceof Function)
		{
			childs = childs.slice();
			
			/* Create new control */
			new_control = control.copy(ctx, {
				"type": type,
				"index": index,
				"path": path_id,
			});
			content = this.normalizeContent(content, new_control);
			childs.push(content);
		}
		
		else if (type == 'raw')
		{
			/* To string */
			content = Runtime.rtl.toStr(content);
			
			/* Create new element */
			var elem_new = this.createElementFromHTML(content);
			
			/* Add childs */
			childs = childs.slice();
			childs.push(elem_new);
		}
		
		else if (type == 'text')
		{
			/* To string */
			content = Runtime.rtl.toStr(content);
			content = this.decodeHtmlEntities(content);
			
			var elem_new = this.findElemByPathAndCheck(parent_elem, path_id, type);
			
			/* Create new element */
			if (elem_new == null)
			{
				elem_new = document.createTextNode(content);
			}
			else
			{
				if (elem_new.nodeValue != content)
				{
					elem_new.nodeValue = content;
				}
			}
			
			/* Set elem path */
			elem_new._path_id = path_id;
			
			/* Add childs */
			childs = childs.slice();
			childs.push(elem_new);
		}
		
		else if (type == 'html')
		{
			
		}
		
		else if (type == 'empty')
		{
			new_control = control;
		}
		
		return [new_control, childs];
	},
	
	
	
	/**
	 * Patch childs of the control
	 */
	p: function (control, childs)
	{
		if (control.type == "empty")
		{
			return;
		}
		
		var controller = control.controller;
		var ctx = control.ctx;
		
		/* Normalize content */
		var childs = this.normalizeContent(childs, control);
		
		/* Patch element */
		controller.patchElemChilds(ctx, control.parent_elem, childs);
		
		/* Patch element params */
		/* controller.updateElemParams(ctx, control, control.parent_elem); */
	},
	
	
	
	/**
	 * Find listeners
	 */
	findListeners: function (path_id)
	{
		var arr = [];
		var ctx = globalContext;
		for (var i=0; i<ctx.object_manager.listeners.count(); i++)
		{
			var listener = ctx.object_manager.listeners[i];
			var from = listener.get(ctx, "from");
			if (from.indexOf(path_id) == 0) arr.push(listener);
		}
		return Runtime.Collection.from(arr);
	},
	
	
	
	/**
	 * Returns object
	 */
	getObject: function (path_id)
	{
		var ctx = globalContext;
		return ctx.object_manager.objects.get(ctx, path_id);
	}
	
});
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
Runtime.Web.RenderDriverControl = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.RenderDriverControl.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.RenderDriverControl.prototype.constructor = Runtime.Web.RenderDriverControl;
Object.assign(Runtime.Web.RenderDriverControl.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.ctx = null;
		this.type = "";
		this.component = null;
		this.controller = null;
		this.parent_elem = null;
		this.path_id = "";
		this.index = 0;
		this.is_new_elem = false;
		this.driver = null;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.RenderDriverControl)
		{
			this.ctx = o.ctx;
			this.type = o.type;
			this.component = o.component;
			this.controller = o.controller;
			this.parent_elem = o.parent_elem;
			this.path_id = o.path_id;
			this.index = o.index;
			this.is_new_elem = o.is_new_elem;
			this.driver = o.driver;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "ctx")this.ctx = v;
		else if (k == "type")this.type = v;
		else if (k == "component")this.component = v;
		else if (k == "controller")this.controller = v;
		else if (k == "parent_elem")this.parent_elem = v;
		else if (k == "path_id")this.path_id = v;
		else if (k == "index")this.index = v;
		else if (k == "is_new_elem")this.is_new_elem = v;
		else if (k == "driver")this.driver = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "ctx")return this.ctx;
		else if (k == "type")return this.type;
		else if (k == "component")return this.component;
		else if (k == "controller")return this.controller;
		else if (k == "parent_elem")return this.parent_elem;
		else if (k == "path_id")return this.path_id;
		else if (k == "index")return this.index;
		else if (k == "is_new_elem")return this.is_new_elem;
		else if (k == "driver")return this.driver;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.RenderDriverControl";
	},
});
Object.assign(Runtime.Web.RenderDriverControl, Runtime.BaseStruct);
Object.assign(Runtime.Web.RenderDriverControl,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.RenderDriverControl";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.RenderDriverControl",
			"name": "Runtime.Web.RenderDriverControl",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("ctx");
			a.push("type");
			a.push("component");
			a.push("controller");
			a.push("parent_elem");
			a.push("path_id");
			a.push("index");
			a.push("is_new_elem");
			a.push("driver");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ctx") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriverControl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "type") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriverControl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "component") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriverControl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "controller") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriverControl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parent_elem") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriverControl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "path_id") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriverControl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "index") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriverControl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_new_elem") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriverControl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "driver") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RenderDriverControl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.RenderDriverControl);
window["Runtime.Web.RenderDriverControl"] = Runtime.Web.RenderDriverControl;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RenderDriverControl;
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
Runtime.Web.Request = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Request.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Request.prototype.constructor = Runtime.Web.Request;
Object.assign(Runtime.Web.Request.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.uri = "";
		this.host = "";
		this.method = "GET";
		this.protocol = "";
		this.route_prefix = "";
		this.query = null;
		this.payload = null;
		this.cookies = null;
		this.headers = null;
		this.params = null;
		this.start_time = 0;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Request)
		{
			this.uri = o.uri;
			this.host = o.host;
			this.method = o.method;
			this.protocol = o.protocol;
			this.route_prefix = o.route_prefix;
			this.query = o.query;
			this.payload = o.payload;
			this.cookies = o.cookies;
			this.headers = o.headers;
			this.params = o.params;
			this.start_time = o.start_time;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "uri")this.uri = v;
		else if (k == "host")this.host = v;
		else if (k == "method")this.method = v;
		else if (k == "protocol")this.protocol = v;
		else if (k == "route_prefix")this.route_prefix = v;
		else if (k == "query")this.query = v;
		else if (k == "payload")this.payload = v;
		else if (k == "cookies")this.cookies = v;
		else if (k == "headers")this.headers = v;
		else if (k == "params")this.params = v;
		else if (k == "start_time")this.start_time = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "uri")return this.uri;
		else if (k == "host")return this.host;
		else if (k == "method")return this.method;
		else if (k == "protocol")return this.protocol;
		else if (k == "route_prefix")return this.route_prefix;
		else if (k == "query")return this.query;
		else if (k == "payload")return this.payload;
		else if (k == "cookies")return this.cookies;
		else if (k == "headers")return this.headers;
		else if (k == "params")return this.params;
		else if (k == "start_time")return this.start_time;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Request";
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
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Request";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Request",
			"name": "Runtime.Web.Request",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("uri");
			a.push("host");
			a.push("method");
			a.push("protocol");
			a.push("route_prefix");
			a.push("query");
			a.push("payload");
			a.push("cookies");
			a.push("headers");
			a.push("params");
			a.push("start_time");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "METHOD_GET") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "METHOD_HEAD") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "METHOD_POST") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "METHOD_PUT") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "METHOD_DELETE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "METHOD_CONNECT") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "METHOD_OPTIONS") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "METHOD_TRACE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "METHOD_PATCH") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "uri") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "host") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "method") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "protocol") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "route_prefix") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "query") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "payload") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "cookies") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "headers") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "start_time") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Request",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.Web.Response = function(ctx)
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
	getContent: function(ctx)
	{
		return this.content;
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.http_code = 200;
		this.content = "";
		this.headers = new Runtime.Collection(ctx);
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Response)
		{
			this.http_code = o.http_code;
			this.content = o.content;
			this.headers = o.headers;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "http_code")this.http_code = v;
		else if (k == "content")this.content = v;
		else if (k == "headers")this.headers = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "http_code")return this.http_code;
		else if (k == "content")return this.content;
		else if (k == "headers")return this.headers;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Response";
	},
});
Object.assign(Runtime.Web.Response, Runtime.BaseStruct);
Object.assign(Runtime.Web.Response,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Response";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Response",
			"name": "Runtime.Web.Response",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("http_code");
			a.push("content");
			a.push("headers");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "http_code") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Response",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Response",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "headers") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Response",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.Web.Route = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Route.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Route.prototype.constructor = Runtime.Web.Route;
Object.assign(Runtime.Web.Route.prototype,
{
	/**
	 * Init struct data
	 */
	initData: function(ctx, old_model, changed)
	{
		if (changed == undefined) changed = null;
		if (this.uri_match == "")
		{
			var uri_match = this.uri;
			uri_match = Runtime.re.replace(ctx, "\\/", "\\/", uri_match);
			var params = new Runtime.Vector(ctx);
			var matches = Runtime.re.matchAll(ctx, "{(.*?)}", this.uri);
			if (matches)
			{
				matches.each(ctx, (ctx, arr) => 
				{
					var name = Runtime.rtl.get(ctx, arr, 1);
					uri_match = Runtime.re.replace(ctx, "{" + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("}"), "([^\\/]*?)", uri_match);
					params.push(ctx, name);
				});
				this.assignValue(ctx, "params", params);
			}
			else
			{
				this.assignValue(ctx, "params", Runtime.Collection.from([]));
			}
			this.assignValue(ctx, "uri_match", "^" + Runtime.rtl.toStr(uri_match) + Runtime.rtl.toStr("$"));
		}
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.uri = "";
		this.name = "";
		this.class_name = "";
		this.class_method_name = "";
		this.uri_match = "";
		this.params = null;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Route)
		{
			this.uri = o.uri;
			this.name = o.name;
			this.class_name = o.class_name;
			this.class_method_name = o.class_method_name;
			this.uri_match = o.uri_match;
			this.params = o.params;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "uri")this.uri = v;
		else if (k == "name")this.name = v;
		else if (k == "class_name")this.class_name = v;
		else if (k == "class_method_name")this.class_method_name = v;
		else if (k == "uri_match")this.uri_match = v;
		else if (k == "params")this.params = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "uri")return this.uri;
		else if (k == "name")return this.name;
		else if (k == "class_name")return this.class_name;
		else if (k == "class_method_name")return this.class_method_name;
		else if (k == "uri_match")return this.uri_match;
		else if (k == "params")return this.params;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Route";
	},
});
Object.assign(Runtime.Web.Route, Runtime.BaseStruct);
Object.assign(Runtime.Web.Route,
{
	/**
	 * Get params
	 * @return Map<string>
	 */
	getParams: function(ctx, matches, info)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.Web.Route.getParams", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (info.params == null || matches == null)
		{
			var __memorize_value = Runtime.Dict.from({});
			Runtime.rtl._memorizeSave("Runtime.Web.Route.getParams", arguments, __memorize_value);
			return __memorize_value;
		}
		var res = new Runtime.Map(ctx);
		info.params.each(ctx, (ctx, name, pos) => 
		{
			var match = matches.get(ctx, pos, null);
			if (match)
			{
				res.set(ctx, name, match);
			}
		});
		var __memorize_value = res.toDict(ctx);
		Runtime.rtl._memorizeSave("Runtime.Web.Route.getParams", arguments, __memorize_value);
		return __memorize_value;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Route";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Route",
			"name": "Runtime.Web.Route",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("uri");
			a.push("name");
			a.push("class_name");
			a.push("class_method_name");
			a.push("uri_match");
			a.push("params");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "uri") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Route",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Route",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Route",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_method_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Route",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "uri_match") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Route",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Route",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Route);
window["Runtime.Web.Route"] = Runtime.Web.Route;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Route;
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
Runtime.Web.RouteController = function(ctx)
{
	Runtime.Core.CoreDriver.apply(this, arguments);
};
Runtime.Web.RouteController.prototype = Object.create(Runtime.Core.CoreDriver.prototype);
Runtime.Web.RouteController.prototype.constructor = Runtime.Web.RouteController;
Object.assign(Runtime.Web.RouteController.prototype,
{
	/**
	 * Start driver
	 */
	startDriver: async function(ctx)
	{
		this.history = new Runtime.Vector(ctx);
		this.routes = this.constructor.getRoutesByEntities(ctx, ctx.entities);
		this.route_prefix = ctx.env(ctx, "X-ROUTE-PREFIX", "");
		/* Add mouse listener */
		var body = document.getElementsByTagName("body")[0];
		body.addEventListener("click", Runtime.Web.RouteController.js_click);
		
		/* Add history listener */
		window.onpopstate = Runtime.Web.RouteController.js_onpopstate;
	},
	/**
	 * Open url
	 */
	openUrl: async function(ctx, href)
	{
		if (href == undefined) href = "/";
		var obj = { "href": href, };
		history.pushState(obj, "", href);
		this.history.push(ctx, href);
		await this.renderPage(ctx, href);
	},
	/**
	 * Render
	 */
	renderFirst: async function(ctx)
	{
		var render = false;
		/* Check if need to render */
		var controllers = ctx.getDrivers(ctx, "Runtime.Web.RenderController");
		for (var i = 0;i < controllers.count(ctx);i++)
		{
			var controller = Runtime.rtl.get(ctx, controllers, i);
			if (controller.isMainController(ctx) && controller.layout == null)
			{
				render = true;
				break;
			}
		}
		/* Render all controllers */
		for (var i = 0;i < controllers.count(ctx);i++)
		{
			var controller = Runtime.rtl.get(ctx, controllers, i);
			if (controller.layout != null)
			{
				controller.repaint(ctx);
			}
		}
		/* render */
		if (render)
		{
			await this.renderCurrentPage(ctx);
		}
	},
	/**
	 * Render
	 */
	renderCurrentPage: async function(ctx)
	{
		var uri = "/";
		uri = window.location.pathname;
		await this.renderPage(ctx, uri);
	},
	/**
	 * Render page
	 */
	renderPage: async function(ctx, url)
	{
		if (url == undefined) url = "/";
		var host = "";
		var method = "";
		var protocol = "";
		host = window.location.hostname;
		protocol = window.location.protocol.substr(0, window.location.protocol.length - 1);
		var pos = Runtime.rs.strpos(ctx, url, "?");
		var uri = (pos >= 0) ? (Runtime.rs.substr(ctx, url, 0, pos)) : (url);
		var get = (pos >= 0) ? (Runtime.rs.substr(ctx, url, pos + 1)) : ("");
		var query = new Runtime.Map(ctx);
		if (get != "")
		{
			var arr = Runtime.rs.explode(ctx, "&", get);
			arr.each(ctx, (ctx, s) => 
			{
				var arr = Runtime.rs.explode(ctx, "=", s);
				var key = Runtime.rtl.get(ctx, arr, 0);
				var value = Runtime.rtl.get(ctx, arr, 1);
				query.set(ctx, key, value);
			});
		}
		var request = new Runtime.Web.Request(ctx, Runtime.Dict.from({"uri":uri,"host":host,"protocol":protocol,"query":query.toDict(ctx),"route_prefix":this.route_prefix}));
		/* Find main controller name */
		var frontend_controller_name = "";
		var controller = Runtime.Web.RenderDriver.getMainController(ctx);
		if (controller)
		{
			frontend_controller_name = controller.getObjectName(ctx);
		}
		/* Save controllers */
		var driver = ctx.getDriver(ctx, "Runtime.Web.FrontendStorageDriver");
		driver.saveControllers(ctx);
		/* Render request */
		var container = await this.renderRequest(ctx, request, frontend_controller_name);
		/* Render container */
		this.renderContainer(ctx, container);
	},
	/**
	 * Render request
	 */
	renderRequest: async function(ctx, request, frontend_controller_name)
	{
		if (frontend_controller_name == undefined) frontend_controller_name = "";
		var route = null;
		var params = null;
		/* Search route */
		var res = this.findRoute(ctx, request);
		route = res.item(ctx, 0);
		params = res.item(ctx, 1);
		/* Create render container  */
		var container = new Runtime.Web.RenderContainer(ctx, Runtime.Dict.from({"request":request,"route":route,"route_params":params,"frontend_controller_name":frontend_controller_name}));
		/* Render container */
		container = await Runtime.Web.RenderDriver.chainRender(ctx, container);
		/* Result */
		return Promise.resolve(container);
	},
	/**
	 * Render container
	 */
	renderContainer: function(ctx, container)
	{
		var controller = Runtime.Web.RenderDriver.getMainController(ctx);
		if (controller)
		{
			controller.renderLayout(ctx, container.layout);
		}
	},
	/**
	 * Find route
	 */
	findRoute: function(ctx, request)
	{
		var route = null;
		var params = null;
		var request_uri = request.uri;
		var route_prefix = request.route_prefix;
		request_uri = Runtime.Web.RenderDriver.splitRoutePrefix(ctx, request_uri, route_prefix);
		if (request_uri === null)
		{
			return Runtime.Collection.from([route,params]);
		}
		/* Find route */
		for (var i = 0;i < this.routes.count(ctx);i++)
		{
			var info = this.routes.item(ctx, i);
			var matches = Runtime.re.matchAll(ctx, info.uri_match, request_uri);
			if (matches != null)
			{
				matches = matches.get(ctx, 0, null);
				if (matches)
				{
					matches = matches.removeFirstIm(ctx);
				}
				params = info.constructor.getParams(ctx, matches, info);
				route = info;
				break;
			}
		}
		return Runtime.Collection.from([route,params]);
	},
	_init: function(ctx)
	{
		this.history = null;
		this.routes = null;
		this.route_prefix = "";
		Runtime.Core.CoreDriver.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.RouteController)
		{
			this.history = o.history;
			this.routes = o.routes;
			this.route_prefix = o.route_prefix;
		}
		Runtime.Core.CoreDriver.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "history")this.history = v;
		else if (k == "routes")this.routes = v;
		else if (k == "route_prefix")this.route_prefix = v;
		else Runtime.Core.CoreDriver.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "history")return this.history;
		else if (k == "routes")return this.routes;
		else if (k == "route_prefix")return this.route_prefix;
		return Runtime.Core.CoreDriver.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.RouteController";
	},
});
Object.assign(Runtime.Web.RouteController, Runtime.Core.CoreDriver);
Object.assign(Runtime.Web.RouteController,
{
	/**
	 * JS Click Event
	 */
	js_click: function(e)
	{
		ctx = Runtime.RuntimeUtils.getContext();
		var controller = ctx.getDriver(ctx, "Runtime.Web.RouteController");
		var elem = e.target;
		
		if (elem.tagName == "A")
		{
			var target = elem.getAttribute("target");
			var href = elem.getAttribute("href");
			if (target == null)
			{
				e.preventDefault();
				(async () => {
					try { await controller.openUrl(ctx, href); }
					catch (e) { console.log(e.stack); }
				})();
				return false;
			}
		}
	},
	/**
	 * JS onpopstate event
	 */
	js_onpopstate: function(e)
	{
		ctx = Runtime.RuntimeUtils.getContext();
		var controller = ctx.getDriver(ctx, "Runtime.Web.RouteController");
		if (controller.history.count() == 0)
		{
			document.location = document.location;
		}
		else if (e.state != null && typeof e.state.href == "string")
		{
			controller.history.pop(ctx);
			(async () => {
				try { await controller.renderPage(ctx, e.state.href); }
				catch (e) { console.log(e.stack); }
			})();
		}
		else
		{
			controller.history.pop(ctx);
			(async () => {
				try { await controller.renderCurrentPage(ctx); }
				catch (e) { console.log(e.stack); }
			})();
		}
	},
	/**
	 * Returns routes
	 */
	getRoutesByEntities: function(ctx, entitites)
	{
		var route_lists = entitites.filter(ctx, Runtime.lib.isInstance(ctx, "Runtime.Web.RouteList"));
		var routes = new Runtime.Vector(ctx);
		routes.appendVector(ctx, entitites.filter(ctx, Runtime.lib.isInstance(ctx, "Runtime.Web.Route")));
		for (var i = 0;i < route_lists.count(ctx);i++)
		{
			var route_list = route_lists.item(ctx, i);
			var class_name = route_list.className(ctx);
			if (class_name == "")
			{
				continue;
			}
			routes.appendVector(ctx, this.getRoutesByClassName(ctx, class_name));
		}
		return routes.toCollection(ctx);
	},
	/**
	 * Returns routes
	 */
	getRoutesByClassName: function(ctx, class_name)
	{
		var routes = new Runtime.Vector(ctx);
		var class_info = Runtime.RuntimeUtils.getClassIntrospection(ctx, class_name);
		/* Get routes info */
		if (class_info)
		{
			class_info.methods.each(ctx, (ctx, annotations, class_method_name) => 
			{
				annotations.each(ctx, (ctx, route) => 
				{
					if (route == null)
					{
						return ;
					}
					if (route instanceof Runtime.Web.Route)
					{
						routes.push(ctx, route.copy(ctx, Runtime.Dict.from({"class_name":class_name,"class_method_name":class_method_name})));
					}
				});
			});
		}
		return routes.toCollection(ctx);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.RouteController";
	},
	getParentClassName: function()
	{
		return "Runtime.Core.CoreDriver";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.RouteController",
			"name": "Runtime.Web.RouteController",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("history");
			a.push("routes");
			a.push("route_prefix");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "history") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RouteController",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "routes") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RouteController",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "route_prefix") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RouteController",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.RouteController);
window["Runtime.Web.RouteController"] = Runtime.Web.RouteController;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RouteController;
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
Runtime.Web.RouteList = function(ctx)
{
	Runtime.Core.Entity.apply(this, arguments);
};
Runtime.Web.RouteList.prototype = Object.create(Runtime.Core.Entity.prototype);
Runtime.Web.RouteList.prototype.constructor = Runtime.Web.RouteList;
Object.assign(Runtime.Web.RouteList.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.RouteList)
		{
		}
		Runtime.Core.Entity.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Core.Entity.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Core.Entity.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.RouteList";
	},
});
Object.assign(Runtime.Web.RouteList, Runtime.Core.Entity);
Object.assign(Runtime.Web.RouteList,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.RouteList";
	},
	getParentClassName: function()
	{
		return "Runtime.Core.Entity";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.RouteList",
			"name": "Runtime.Web.RouteList",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.Web.RouteMiddleware = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.RouteMiddleware.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.RouteMiddleware.prototype.constructor = Runtime.Web.RouteMiddleware;
Object.assign(Runtime.Web.RouteMiddleware.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.value = "";
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.RouteMiddleware)
		{
			this.value = o.value;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "value")this.value = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "value")return this.value;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.RouteMiddleware";
	},
});
Object.assign(Runtime.Web.RouteMiddleware, Runtime.BaseStruct);
Object.assign(Runtime.Web.RouteMiddleware,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.RouteMiddleware";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.RouteMiddleware",
			"name": "Runtime.Web.RouteMiddleware",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("value");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "value") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.RouteMiddleware",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.RouteMiddleware);
window["Runtime.Web.RouteMiddleware"] = Runtime.Web.RouteMiddleware;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RouteMiddleware;
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
Runtime.Web.SeoModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.SeoModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.SeoModel.prototype.constructor = Runtime.Web.SeoModel;
Object.assign(Runtime.Web.SeoModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.og_type = "";
		this.site_name = "";
		this.publisher = "";
		this.article_tags = null;
		this.keywords = null;
		this.urls = null;
		this.published = null;
		this.modified = null;
		this.meta = null;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.SeoModel)
		{
			this.og_type = o.og_type;
			this.site_name = o.site_name;
			this.publisher = o.publisher;
			this.article_tags = o.article_tags;
			this.keywords = o.keywords;
			this.urls = o.urls;
			this.published = o.published;
			this.modified = o.modified;
			this.meta = o.meta;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "og_type")this.og_type = v;
		else if (k == "site_name")this.site_name = v;
		else if (k == "publisher")this.publisher = v;
		else if (k == "article_tags")this.article_tags = v;
		else if (k == "keywords")this.keywords = v;
		else if (k == "urls")this.urls = v;
		else if (k == "published")this.published = v;
		else if (k == "modified")this.modified = v;
		else if (k == "meta")this.meta = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "og_type")return this.og_type;
		else if (k == "site_name")return this.site_name;
		else if (k == "publisher")return this.publisher;
		else if (k == "article_tags")return this.article_tags;
		else if (k == "keywords")return this.keywords;
		else if (k == "urls")return this.urls;
		else if (k == "published")return this.published;
		else if (k == "modified")return this.modified;
		else if (k == "meta")return this.meta;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.SeoModel";
	},
});
Object.assign(Runtime.Web.SeoModel, Runtime.BaseStruct);
Object.assign(Runtime.Web.SeoModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.SeoModel";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.SeoModel",
			"name": "Runtime.Web.SeoModel",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("og_type");
			a.push("site_name");
			a.push("publisher");
			a.push("article_tags");
			a.push("keywords");
			a.push("urls");
			a.push("published");
			a.push("modified");
			a.push("meta");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "og_type") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.SeoModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "site_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.SeoModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "publisher") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.SeoModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "article_tags") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.SeoModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "keywords") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.SeoModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "urls") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.SeoModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "published") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.SeoModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "modified") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.SeoModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "meta") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.SeoModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.UIEvent = function(ctx)
{
	Runtime.Core.CoreEvent.apply(this, arguments);
};
Runtime.Web.Events.UIEvent.prototype = Object.create(Runtime.Core.CoreEvent.prototype);
Runtime.Web.Events.UIEvent.prototype.constructor = Runtime.Web.Events.UIEvent;
Object.assign(Runtime.Web.Events.UIEvent.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.UIEvent)
		{
		}
		Runtime.Core.CoreEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Core.CoreEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Core.CoreEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.UIEvent";
	},
});
Object.assign(Runtime.Web.Events.UIEvent, Runtime.Core.CoreEvent);
Object.assign(Runtime.Web.Events.UIEvent,
{
	/**
	 * Cancel event
	 */
	cancel: function(ctx, event)
	{
		return event;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.UIEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Core.CoreEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.UIEvent",
			"name": "Runtime.Web.Events.UIEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Events.UIEvent);
window["Runtime.Web.Events.UIEvent"] = Runtime.Web.Events.UIEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Events.UIEvent;
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.WebEvent = function(ctx)
{
	Runtime.Web.Events.UIEvent.apply(this, arguments);
};
Runtime.Web.Events.WebEvent.prototype = Object.create(Runtime.Web.Events.UIEvent.prototype);
Runtime.Web.Events.WebEvent.prototype.constructor = Runtime.Web.Events.WebEvent;
Object.assign(Runtime.Web.Events.WebEvent.prototype,
{
	/**
	 * Check if event is cancel
	 */
	isCancel: function(ctx)
	{
		return this.cancel_bubble;
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
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
		Runtime.Web.Events.UIEvent.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.WebEvent)
		{
			this.name = o.name;
			this.bubbles = o.bubbles;
			this.cancel_bubble = o.cancel_bubble;
			this.cancelable = o.cancelable;
			this.composed = o.composed;
			this.default_prevented = o.default_prevented;
			this.event_phase = o.event_phase;
			this.is_trusted = o.is_trusted;
			this.es6_event = o.es6_event;
			this.currentElement = o.currentElement;
			this.target = o.target;
		}
		Runtime.Web.Events.UIEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "name")this.name = v;
		else if (k == "bubbles")this.bubbles = v;
		else if (k == "cancel_bubble")this.cancel_bubble = v;
		else if (k == "cancelable")this.cancelable = v;
		else if (k == "composed")this.composed = v;
		else if (k == "default_prevented")this.default_prevented = v;
		else if (k == "event_phase")this.event_phase = v;
		else if (k == "is_trusted")this.is_trusted = v;
		else if (k == "es6_event")this.es6_event = v;
		else if (k == "currentElement")this.currentElement = v;
		else if (k == "target")this.target = v;
		else Runtime.Web.Events.UIEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
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
		return Runtime.Web.Events.UIEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.WebEvent";
	},
});
Object.assign(Runtime.Web.Events.WebEvent, Runtime.Web.Events.UIEvent);
Object.assign(Runtime.Web.Events.WebEvent,
{
	assignEventObject: function(ctx, obj, e)
	{
		obj.set(ctx, "name", e.type);
		obj.set(ctx, "currentElement", e.target);
		obj.set(ctx, "target", e.currentTarget);
		obj.set(ctx, "bubbles", e.bubbles);
		obj.set(ctx, "cancel_bubble", e.cancel_bubble);
		obj.set(ctx, "cancelable", e.cancelable);
		obj.set(ctx, "composed", e.composed);
		obj.set(ctx, "default_prevented", e.default_prevented);
		obj.set(ctx, "event_phase", e.event_phase);
		obj.set(ctx, "is_trusted", e.isTrusted);
		obj.set(ctx, "es6_event", e);
	},
	fromEvent: function(ctx, e)
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
		class_obj.assignEventObject(ctx, obj, e);
		event = new class_obj(ctx, obj);
		
		if (event == null)
			return null;
			
		return event;
	},
	/**
	 * Cancel event
	 */
	preventDefault: function(ctx, event)
	{
		event = event.copy(ctx, Runtime.Dict.from({"default_prevented":true}));
		event.es6_event.preventDefault();
		return event;
	},
	/**
	 * Cancel event
	 */
	cancel: function(ctx, event)
	{
		event = event.copy(ctx, Runtime.Dict.from({"cancel_bubble":true,"default_prevented":true}));
		event.es6_event.cancelBubble = true;
		event.es6_event.stopPropagation();
		event.es6_event.preventDefault();
		return event;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.WebEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.UIEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.WebEvent",
			"name": "Runtime.Web.Events.WebEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
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
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.WebEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "bubbles") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.WebEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "cancel_bubble") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.WebEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "cancelable") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.WebEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "composed") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.WebEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "default_prevented") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.WebEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "event_phase") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.WebEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_trusted") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.WebEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "es6_event") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.WebEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "currentElement") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.WebEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "target") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.WebEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.BlurEvent = function(ctx)
{
	Runtime.Web.Events.WebEvent.apply(this, arguments);
};
Runtime.Web.Events.BlurEvent.prototype = Object.create(Runtime.Web.Events.WebEvent.prototype);
Runtime.Web.Events.BlurEvent.prototype.constructor = Runtime.Web.Events.BlurEvent;
Object.assign(Runtime.Web.Events.BlurEvent.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.BlurEvent)
		{
		}
		Runtime.Web.Events.WebEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Events.WebEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.WebEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.BlurEvent";
	},
});
Object.assign(Runtime.Web.Events.BlurEvent, Runtime.Web.Events.WebEvent);
Object.assign(Runtime.Web.Events.BlurEvent,
{
	ES6_EVENT_NAME: "blur",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.BlurEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.WebEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.BlurEvent",
			"name": "Runtime.Web.Events.BlurEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.BlurEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.ChangeEvent = function(ctx)
{
	Runtime.Web.Events.WebEvent.apply(this, arguments);
};
Runtime.Web.Events.ChangeEvent.prototype = Object.create(Runtime.Web.Events.WebEvent.prototype);
Runtime.Web.Events.ChangeEvent.prototype.constructor = Runtime.Web.Events.ChangeEvent;
Object.assign(Runtime.Web.Events.ChangeEvent.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.value = "";
		Runtime.Web.Events.WebEvent.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.ChangeEvent)
		{
			this.value = o.value;
		}
		Runtime.Web.Events.WebEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "value")this.value = v;
		else Runtime.Web.Events.WebEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "value")return this.value;
		return Runtime.Web.Events.WebEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.ChangeEvent";
	},
});
Object.assign(Runtime.Web.Events.ChangeEvent, Runtime.Web.Events.WebEvent);
Object.assign(Runtime.Web.Events.ChangeEvent,
{
	ES6_EVENT_NAME: "change",
	assignEventObject: function(ctx, obj, e)
	{
		Runtime.Web.Events.WebEvent.assignEventObject.call(this, ctx, obj, e);
		obj.set(ctx, "value", e.currentTarget.value);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.ChangeEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.WebEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.ChangeEvent",
			"name": "Runtime.Web.Events.ChangeEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("value");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.ChangeEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.ChangeEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.FocusEvent = function(ctx)
{
	Runtime.Web.Events.WebEvent.apply(this, arguments);
};
Runtime.Web.Events.FocusEvent.prototype = Object.create(Runtime.Web.Events.WebEvent.prototype);
Runtime.Web.Events.FocusEvent.prototype.constructor = Runtime.Web.Events.FocusEvent;
Object.assign(Runtime.Web.Events.FocusEvent.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.FocusEvent)
		{
		}
		Runtime.Web.Events.WebEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Events.WebEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.WebEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.FocusEvent";
	},
});
Object.assign(Runtime.Web.Events.FocusEvent, Runtime.Web.Events.WebEvent);
Object.assign(Runtime.Web.Events.FocusEvent,
{
	ES6_EVENT_NAME: "focus",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.FocusEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.WebEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.FocusEvent",
			"name": "Runtime.Web.Events.FocusEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.FocusEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.KeyboardEvent = function(ctx)
{
	Runtime.Web.Events.WebEvent.apply(this, arguments);
};
Runtime.Web.Events.KeyboardEvent.prototype = Object.create(Runtime.Web.Events.WebEvent.prototype);
Runtime.Web.Events.KeyboardEvent.prototype.constructor = Runtime.Web.Events.KeyboardEvent;
Object.assign(Runtime.Web.Events.KeyboardEvent.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
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
		Runtime.Web.Events.WebEvent.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.KeyboardEvent)
		{
			this.altKey = o.altKey;
			this.charCode = o.charCode;
			this.code = o.code;
			this.ctrlKey = o.ctrlKey;
			this.key = o.key;
			this.keyCode = o.keyCode;
			this.locale = o.locale;
			this.location = o.location;
			this.repeat = o.repeat;
			this.shiftKey = o.shiftKey;
			this.which = o.which;
			this.value = o.value;
		}
		Runtime.Web.Events.WebEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "altKey")this.altKey = v;
		else if (k == "charCode")this.charCode = v;
		else if (k == "code")this.code = v;
		else if (k == "ctrlKey")this.ctrlKey = v;
		else if (k == "key")this.key = v;
		else if (k == "keyCode")this.keyCode = v;
		else if (k == "locale")this.locale = v;
		else if (k == "location")this.location = v;
		else if (k == "repeat")this.repeat = v;
		else if (k == "shiftKey")this.shiftKey = v;
		else if (k == "which")this.which = v;
		else if (k == "value")this.value = v;
		else Runtime.Web.Events.WebEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
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
		return Runtime.Web.Events.WebEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.KeyboardEvent";
	},
});
Object.assign(Runtime.Web.Events.KeyboardEvent, Runtime.Web.Events.WebEvent);
Object.assign(Runtime.Web.Events.KeyboardEvent,
{
	assignEventObject: function(ctx, obj, e)
	{
		Runtime.Web.Events.WebEvent.assignEventObject.call(this, ctx, obj, e);
		obj.set(ctx, "altKey", e.altKey);
		obj.set(ctx, "charCode", e.charCode);
		obj.set(ctx, "code", e.code);
		obj.set(ctx, "ctrlKey", e.ctrlKey);
		obj.set(ctx, "key", e.key);
		obj.set(ctx, "keyCode", e.keyCode);
		obj.set(ctx, "locale", e.locale);
		obj.set(ctx, "location", e.location);
		obj.set(ctx, "repeat", e.repeat);
		obj.set(ctx, "shiftKey", e.shiftKey);
		obj.set(ctx, "which", e.which);
		obj.set(ctx, "value", e.currentTarget.value);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.KeyboardEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.WebEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.KeyboardEvent",
			"name": "Runtime.Web.Events.KeyboardEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
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
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "altKey") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.KeyboardEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "charCode") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.KeyboardEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "code") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.KeyboardEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ctrlKey") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.KeyboardEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "key") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.KeyboardEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "keyCode") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.KeyboardEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "locale") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.KeyboardEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "location") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.KeyboardEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "repeat") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.KeyboardEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "shiftKey") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.KeyboardEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "which") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.KeyboardEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.KeyboardEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.KeyDownEvent = function(ctx)
{
	Runtime.Web.Events.KeyboardEvent.apply(this, arguments);
};
Runtime.Web.Events.KeyDownEvent.prototype = Object.create(Runtime.Web.Events.KeyboardEvent.prototype);
Runtime.Web.Events.KeyDownEvent.prototype.constructor = Runtime.Web.Events.KeyDownEvent;
Object.assign(Runtime.Web.Events.KeyDownEvent.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.KeyDownEvent)
		{
		}
		Runtime.Web.Events.KeyboardEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Events.KeyboardEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.KeyboardEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.KeyDownEvent";
	},
});
Object.assign(Runtime.Web.Events.KeyDownEvent, Runtime.Web.Events.KeyboardEvent);
Object.assign(Runtime.Web.Events.KeyDownEvent,
{
	ES6_EVENT_NAME: "keydown",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.KeyDownEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.KeyboardEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.KeyDownEvent",
			"name": "Runtime.Web.Events.KeyDownEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.KeyDownEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.KeyPressEvent = function(ctx)
{
	Runtime.Web.Events.KeyboardEvent.apply(this, arguments);
};
Runtime.Web.Events.KeyPressEvent.prototype = Object.create(Runtime.Web.Events.KeyboardEvent.prototype);
Runtime.Web.Events.KeyPressEvent.prototype.constructor = Runtime.Web.Events.KeyPressEvent;
Object.assign(Runtime.Web.Events.KeyPressEvent.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.KeyPressEvent)
		{
		}
		Runtime.Web.Events.KeyboardEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Events.KeyboardEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.KeyboardEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.KeyPressEvent";
	},
});
Object.assign(Runtime.Web.Events.KeyPressEvent, Runtime.Web.Events.KeyboardEvent);
Object.assign(Runtime.Web.Events.KeyPressEvent,
{
	ES6_EVENT_NAME: "keypress",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.KeyPressEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.KeyboardEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.KeyPressEvent",
			"name": "Runtime.Web.Events.KeyPressEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.KeyPressEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.KeyUpEvent = function(ctx)
{
	Runtime.Web.Events.KeyboardEvent.apply(this, arguments);
};
Runtime.Web.Events.KeyUpEvent.prototype = Object.create(Runtime.Web.Events.KeyboardEvent.prototype);
Runtime.Web.Events.KeyUpEvent.prototype.constructor = Runtime.Web.Events.KeyUpEvent;
Object.assign(Runtime.Web.Events.KeyUpEvent.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.KeyUpEvent)
		{
		}
		Runtime.Web.Events.KeyboardEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Events.KeyboardEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.KeyboardEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.KeyUpEvent";
	},
});
Object.assign(Runtime.Web.Events.KeyUpEvent, Runtime.Web.Events.KeyboardEvent);
Object.assign(Runtime.Web.Events.KeyUpEvent,
{
	ES6_EVENT_NAME: "keyup",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.KeyUpEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.KeyboardEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.KeyUpEvent",
			"name": "Runtime.Web.Events.KeyUpEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.KeyUpEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseEvent = function(ctx)
{
	Runtime.Web.Events.WebEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseEvent.prototype = Object.create(Runtime.Web.Events.WebEvent.prototype);
Runtime.Web.Events.MouseEvent.prototype.constructor = Runtime.Web.Events.MouseEvent;
Object.assign(Runtime.Web.Events.MouseEvent.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
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
		Runtime.Web.Events.WebEvent.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.MouseEvent)
		{
			this.altKey = o.altKey;
			this.button = o.button;
			this.buttons = o.buttons;
			this.clientX = o.clientX;
			this.clientY = o.clientY;
			this.ctrlKey = o.ctrlKey;
			this.detail = o.detail;
			this.layerX = o.layerX;
			this.layerY = o.layerY;
			this.metaKey = o.metaKey;
			this.movementX = o.movementX;
			this.movementY = o.movementY;
			this.offsetX = o.offsetX;
			this.offsetY = o.offsetY;
			this.pageX = o.pageX;
			this.pageY = o.pageY;
			this.screenX = o.screenX;
			this.screenY = o.screenY;
			this.shiftKey = o.shiftKey;
			this.x = o.x;
			this.y = o.y;
		}
		Runtime.Web.Events.WebEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "altKey")this.altKey = v;
		else if (k == "button")this.button = v;
		else if (k == "buttons")this.buttons = v;
		else if (k == "clientX")this.clientX = v;
		else if (k == "clientY")this.clientY = v;
		else if (k == "ctrlKey")this.ctrlKey = v;
		else if (k == "detail")this.detail = v;
		else if (k == "layerX")this.layerX = v;
		else if (k == "layerY")this.layerY = v;
		else if (k == "metaKey")this.metaKey = v;
		else if (k == "movementX")this.movementX = v;
		else if (k == "movementY")this.movementY = v;
		else if (k == "offsetX")this.offsetX = v;
		else if (k == "offsetY")this.offsetY = v;
		else if (k == "pageX")this.pageX = v;
		else if (k == "pageY")this.pageY = v;
		else if (k == "screenX")this.screenX = v;
		else if (k == "screenY")this.screenY = v;
		else if (k == "shiftKey")this.shiftKey = v;
		else if (k == "x")this.x = v;
		else if (k == "y")this.y = v;
		else Runtime.Web.Events.WebEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
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
		return Runtime.Web.Events.WebEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.MouseEvent";
	},
});
Object.assign(Runtime.Web.Events.MouseEvent, Runtime.Web.Events.WebEvent);
Object.assign(Runtime.Web.Events.MouseEvent,
{
	assignEventObject: function(ctx, obj, e)
	{
		Runtime.Web.Events.WebEvent.assignEventObject.call(this, ctx, obj, e);
		obj.set(ctx, "altKey", e.altKey);
		obj.set(ctx, "button", e.button);
		obj.set(ctx, "buttons", e.buttons);
		obj.set(ctx, "clientX", e.clientX);
		obj.set(ctx, "clientY", e.clientY);
		obj.set(ctx, "ctrlKey", e.ctrlKey);
		obj.set(ctx, "detail", e.detail);
		obj.set(ctx, "layerX", e.layerX);
		obj.set(ctx, "layerY", e.layerY);
		obj.set(ctx, "metaKey", e.metaKey);
		obj.set(ctx, "movementX", e.movementX);
		obj.set(ctx, "movementY", e.movementY);
		obj.set(ctx, "offsetX", e.offsetX);
		obj.set(ctx, "offsetY", e.offsetY);
		obj.set(ctx, "pageX", e.pageX);
		obj.set(ctx, "pageY", e.pageY);
		obj.set(ctx, "screenX", e.screenX);
		obj.set(ctx, "screenY", e.screenY);
		obj.set(ctx, "shiftKey", e.shiftKey);
		obj.set(ctx, "x", e.x);
		obj.set(ctx, "y", e.y);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.WebEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": "Runtime.Web.Events.MouseEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
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
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "altKey") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "button") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "buttons") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "clientX") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "clientY") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ctrlKey") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "detail") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "layerX") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "layerY") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "metaKey") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "movementX") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "movementY") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "offsetX") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "offsetY") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pageX") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pageY") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "screenX") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "screenY") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "shiftKey") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "x") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "y") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseClickEvent = function(ctx)
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseClickEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseClickEvent.prototype.constructor = Runtime.Web.Events.MouseClickEvent;
Object.assign(Runtime.Web.Events.MouseClickEvent.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.MouseClickEvent)
		{
		}
		Runtime.Web.Events.MouseEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Events.MouseEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.MouseClickEvent";
	},
});
Object.assign(Runtime.Web.Events.MouseClickEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseClickEvent,
{
	ES6_EVENT_NAME: "click",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.MouseClickEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.MouseClickEvent",
			"name": "Runtime.Web.Events.MouseClickEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseClickEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseContextMenuEvent = function(ctx)
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseContextMenuEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseContextMenuEvent.prototype.constructor = Runtime.Web.Events.MouseContextMenuEvent;
Object.assign(Runtime.Web.Events.MouseContextMenuEvent.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.MouseContextMenuEvent)
		{
		}
		Runtime.Web.Events.MouseEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Events.MouseEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.MouseContextMenuEvent";
	},
});
Object.assign(Runtime.Web.Events.MouseContextMenuEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseContextMenuEvent,
{
	ES6_EVENT_NAME: "contextmenu",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.MouseContextMenuEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.MouseContextMenuEvent",
			"name": "Runtime.Web.Events.MouseContextMenuEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseContextMenuEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseDoubleClickEvent = function(ctx)
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseDoubleClickEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseDoubleClickEvent.prototype.constructor = Runtime.Web.Events.MouseDoubleClickEvent;
Object.assign(Runtime.Web.Events.MouseDoubleClickEvent.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.MouseDoubleClickEvent)
		{
		}
		Runtime.Web.Events.MouseEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Events.MouseEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.MouseDoubleClickEvent";
	},
});
Object.assign(Runtime.Web.Events.MouseDoubleClickEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseDoubleClickEvent,
{
	ES6_EVENT_NAME: "dblclick",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.MouseDoubleClickEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.MouseDoubleClickEvent",
			"name": "Runtime.Web.Events.MouseDoubleClickEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseDoubleClickEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseDownEvent = function(ctx)
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseDownEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseDownEvent.prototype.constructor = Runtime.Web.Events.MouseDownEvent;
Object.assign(Runtime.Web.Events.MouseDownEvent.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.MouseDownEvent)
		{
		}
		Runtime.Web.Events.MouseEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Events.MouseEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.MouseDownEvent";
	},
});
Object.assign(Runtime.Web.Events.MouseDownEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseDownEvent,
{
	ES6_EVENT_NAME: "mousedown",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.MouseDownEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.MouseDownEvent",
			"name": "Runtime.Web.Events.MouseDownEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseDownEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseEnterEvent = function(ctx)
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseEnterEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseEnterEvent.prototype.constructor = Runtime.Web.Events.MouseEnterEvent;
Object.assign(Runtime.Web.Events.MouseEnterEvent.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.MouseEnterEvent)
		{
		}
		Runtime.Web.Events.MouseEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Events.MouseEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.MouseEnterEvent";
	},
});
Object.assign(Runtime.Web.Events.MouseEnterEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseEnterEvent,
{
	ES6_EVENT_NAME: "mouseenter",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.MouseEnterEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.MouseEnterEvent",
			"name": "Runtime.Web.Events.MouseEnterEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseEnterEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseLeaveEvent = function(ctx)
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseLeaveEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseLeaveEvent.prototype.constructor = Runtime.Web.Events.MouseLeaveEvent;
Object.assign(Runtime.Web.Events.MouseLeaveEvent.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.MouseLeaveEvent)
		{
		}
		Runtime.Web.Events.MouseEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Events.MouseEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.MouseLeaveEvent";
	},
});
Object.assign(Runtime.Web.Events.MouseLeaveEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseLeaveEvent,
{
	ES6_EVENT_NAME: "mouseleave",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.MouseLeaveEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.MouseLeaveEvent",
			"name": "Runtime.Web.Events.MouseLeaveEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseLeaveEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseMoveEvent = function(ctx)
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseMoveEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseMoveEvent.prototype.constructor = Runtime.Web.Events.MouseMoveEvent;
Object.assign(Runtime.Web.Events.MouseMoveEvent.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.MouseMoveEvent)
		{
		}
		Runtime.Web.Events.MouseEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Events.MouseEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.MouseMoveEvent";
	},
});
Object.assign(Runtime.Web.Events.MouseMoveEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseMoveEvent,
{
	ES6_EVENT_NAME: "mousemove",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.MouseMoveEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.MouseMoveEvent",
			"name": "Runtime.Web.Events.MouseMoveEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseMoveEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseOutEvent = function(ctx)
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseOutEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseOutEvent.prototype.constructor = Runtime.Web.Events.MouseOutEvent;
Object.assign(Runtime.Web.Events.MouseOutEvent.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.MouseOutEvent)
		{
		}
		Runtime.Web.Events.MouseEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Events.MouseEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.MouseOutEvent";
	},
});
Object.assign(Runtime.Web.Events.MouseOutEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseOutEvent,
{
	ES6_EVENT_NAME: "mouseout",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.MouseOutEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.MouseOutEvent",
			"name": "Runtime.Web.Events.MouseOutEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseOutEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseOverEvent = function(ctx)
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseOverEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseOverEvent.prototype.constructor = Runtime.Web.Events.MouseOverEvent;
Object.assign(Runtime.Web.Events.MouseOverEvent.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.MouseOverEvent)
		{
		}
		Runtime.Web.Events.MouseEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Events.MouseEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.MouseOverEvent";
	},
});
Object.assign(Runtime.Web.Events.MouseOverEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseOverEvent,
{
	ES6_EVENT_NAME: "mouseover",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.MouseOverEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.MouseOverEvent",
			"name": "Runtime.Web.Events.MouseOverEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseOverEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseUpEvent = function(ctx)
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseUpEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseUpEvent.prototype.constructor = Runtime.Web.Events.MouseUpEvent;
Object.assign(Runtime.Web.Events.MouseUpEvent.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.MouseUpEvent)
		{
		}
		Runtime.Web.Events.MouseEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Events.MouseEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.MouseUpEvent";
	},
});
Object.assign(Runtime.Web.Events.MouseUpEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseUpEvent,
{
	ES6_EVENT_NAME: "mouseup",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.MouseUpEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.MouseUpEvent",
			"name": "Runtime.Web.Events.MouseUpEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseUpEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
if (typeof Runtime.Web.Events == 'undefined') Runtime.Web.Events = {};
Runtime.Web.Events.MouseWheelEvent = function(ctx)
{
	Runtime.Web.Events.MouseEvent.apply(this, arguments);
};
Runtime.Web.Events.MouseWheelEvent.prototype = Object.create(Runtime.Web.Events.MouseEvent.prototype);
Runtime.Web.Events.MouseWheelEvent.prototype.constructor = Runtime.Web.Events.MouseWheelEvent;
Object.assign(Runtime.Web.Events.MouseWheelEvent.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.wheelDelta = 0;
		this.wheelDeltaX = 0;
		this.wheelDeltaY = 0;
		Runtime.Web.Events.MouseEvent.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Events.MouseWheelEvent)
		{
			this.wheelDelta = o.wheelDelta;
			this.wheelDeltaX = o.wheelDeltaX;
			this.wheelDeltaY = o.wheelDeltaY;
		}
		Runtime.Web.Events.MouseEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "wheelDelta")this.wheelDelta = v;
		else if (k == "wheelDeltaX")this.wheelDeltaX = v;
		else if (k == "wheelDeltaY")this.wheelDeltaY = v;
		else Runtime.Web.Events.MouseEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "wheelDelta")return this.wheelDelta;
		else if (k == "wheelDeltaX")return this.wheelDeltaX;
		else if (k == "wheelDeltaY")return this.wheelDeltaY;
		return Runtime.Web.Events.MouseEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Events.MouseWheelEvent";
	},
});
Object.assign(Runtime.Web.Events.MouseWheelEvent, Runtime.Web.Events.MouseEvent);
Object.assign(Runtime.Web.Events.MouseWheelEvent,
{
	ES6_EVENT_NAME: "wheel",
	assignEventObject: function(ctx, obj, e)
	{
		Runtime.Web.Events.MouseEvent.assignEventObject.call(this, ctx, obj, e);
		obj.set(ctx, "wheelDelta", e.wheelDelta);
		obj.set(ctx, "wheelDeltaX", e.wheelDeltaX);
		obj.set(ctx, "wheelDeltaY", e.wheelDeltaY);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Events";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Events.MouseWheelEvent";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Events.MouseEvent";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.Events.MouseWheelEvent",
			"name": "Runtime.Web.Events.MouseWheelEvent",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("wheelDelta");
			a.push("wheelDeltaX");
			a.push("wheelDeltaY");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ES6_EVENT_NAME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseWheelEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "wheelDelta") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseWheelEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "wheelDeltaX") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseWheelEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "wheelDeltaY") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Events.MouseWheelEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
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
Runtime.Web.ModuleDescription = function(ctx)
{
};
Object.assign(Runtime.Web.ModuleDescription.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.ModuleDescription)
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.ModuleDescription";
	},
});
Object.assign(Runtime.Web.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function(ctx)
	{
		return "Runtime.Web";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function(ctx)
	{
		return "0.10.0";
	},
	/**
	 * Returns required modules
	 * @return Dict<string>
	 */
	requiredModules: function(ctx)
	{
		return Runtime.Dict.from({"Runtime":">=0.3","Runtime.Web":"*"});
	},
	/**
	 * Returns enities
	 */
	entities: function(ctx)
	{
		return Runtime.Collection.from([new Runtime.Core.Driver(ctx, Runtime.Dict.from({"name":"Runtime.Web.RenderDriver"})),new Runtime.Core.Driver(ctx, Runtime.Dict.from({"name":"Runtime.Web.RouteController"})),new Runtime.Core.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderDriver.LAYOUT_CHAIN,"pos":10000,"value":"Runtime.Web.RenderDriver::layoutChainDefault"})),new Runtime.Core.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderDriver.RENDER_CHAIN,"value":"Runtime.Web.RenderDriver::renderChainCreateLayoutModel","pos":Runtime.Web.RenderDriver.RENDER_CHAIN_CREATE_LAYOUT_MODEL})),new Runtime.Core.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderDriver.RENDER_CHAIN,"value":"Runtime.Web.RenderDriver::renderChainCallRouteMiddleware","pos":Runtime.Web.RenderDriver.RENDER_CHAIN_CALL_ROUTE_MIDDLEWARE,"is_async":true})),new Runtime.Core.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderDriver.RENDER_CHAIN,"value":"Runtime.Web.RenderDriver::renderChainCallRoute","pos":Runtime.Web.RenderDriver.RENDER_CHAIN_CALL_ROUTE,"is_async":true})),new Runtime.Core.Driver(ctx, Runtime.Dict.from({"name":"default:external_bus","value":"Runtime.Web.ExternalBusDriver"})),new Runtime.Core.Driver(ctx, Runtime.Dict.from({"name":"Runtime.Web.FrontendStorageDriver"}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.ModuleDescription";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.ModuleDescription",
			"name": "Runtime.Web.ModuleDescription",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.ModuleDescription);
window["Runtime.Web.ModuleDescription"] = Runtime.Web.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.ModuleDescription;
function runWebApp(main_module, env)
{
	/* Create context */
	var context = Runtime.Core.Context.create(null, Runtime.Dict.from(env));

	/* Set context params */
	context = context.copy(context, {
		"start_time": Date.now(),
	});

	/* Set entry point */
	context = context.constructor.setMainModule(context, context, main_module);
	
	/* Set global context */
	Runtime.RuntimeUtils.setContext(context);

	/* Run app */
	(async () => {
		try
		{
			/* Run entry */
			context = await context.constructor.run
			(
				context,
				context,
				
				/* Before start */
				async (ctx, c) =>
				{
					return c;
				},
				
				/* Before run */
				async (ctx, c) =>
				{
					/* Set global context */
					window["globalContext"] = c;
					Runtime.RuntimeUtils.setContext(c);
					return c;
				}
			);
		}
		catch (e)
		{
			console.log( e.stack );
		}
	})();
	
	return context;
}