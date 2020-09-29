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
if (typeof Runtime.Web.Auth == 'undefined') Runtime.Web.Auth = {};
Runtime.Web.Auth.AuthFrontend = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Auth.AuthFrontend.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Auth.AuthFrontend.prototype.constructor = Runtime.Web.Auth.AuthFrontend;
Object.assign(Runtime.Web.Auth.AuthFrontend.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Auth.AuthFrontend)
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
		return "Runtime.Web.Auth.AuthFrontend";
	},
});
Object.assign(Runtime.Web.Auth.AuthFrontend, Runtime.BaseStruct);
Object.assign(Runtime.Web.Auth.AuthFrontend,
{
	/**
	 * Check auth token
	 */
	checkAuthMiddleware: async function(ctx, container)
	{
		var __v0 = new Runtime.Monad(ctx, Runtime.rtl.attr(ctx, container, ["layout", "keep_data", "Runtime.Web.Auth.AuthToken"]));
		__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Web.Auth.AuthToken", null));
		var auth_token = __v0.value(ctx);
		if (auth_token == null)
		{
			return Promise.resolve(await Runtime.Web.Auth.LoginPage.actionIndex(ctx, container));
		}
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Auth";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Auth.AuthFrontend";
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
			"class_name": "Runtime.Web.Auth.AuthFrontend",
			"name": "Runtime.Web.Auth.AuthFrontend",
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
Runtime.rtl.defClass(Runtime.Web.Auth.AuthFrontend);
window["Runtime.Web.Auth.AuthFrontend"] = Runtime.Web.Auth.AuthFrontend;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Auth.AuthFrontend;
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
if (typeof Runtime.Web.Auth == 'undefined') Runtime.Web.Auth = {};
Runtime.Web.Auth.AuthToken = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Auth.AuthToken.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Auth.AuthToken.prototype.constructor = Runtime.Web.Auth.AuthToken;
Object.assign(Runtime.Web.Auth.AuthToken.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.created = 0;
		this.expire = 0;
		this.user_id = 0;
		this.login = "";
		this.session_key = "";
		this.token_str = "";
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Auth.AuthToken)
		{
			this.created = o.created;
			this.expire = o.expire;
			this.user_id = o.user_id;
			this.login = o.login;
			this.session_key = o.session_key;
			this.token_str = o.token_str;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "created")this.created = v;
		else if (k == "expire")this.expire = v;
		else if (k == "user_id")this.user_id = v;
		else if (k == "login")this.login = v;
		else if (k == "session_key")this.session_key = v;
		else if (k == "token_str")this.token_str = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "created")return this.created;
		else if (k == "expire")return this.expire;
		else if (k == "user_id")return this.user_id;
		else if (k == "login")return this.login;
		else if (k == "session_key")return this.session_key;
		else if (k == "token_str")return this.token_str;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Auth.AuthToken";
	},
});
Object.assign(Runtime.Web.Auth.AuthToken, Runtime.BaseStruct);
Object.assign(Runtime.Web.Auth.AuthToken,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Auth";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Auth.AuthToken";
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
			"class_name": "Runtime.Web.Auth.AuthToken",
			"name": "Runtime.Web.Auth.AuthToken",
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
			a.push("created");
			a.push("expire");
			a.push("user_id");
			a.push("login");
			a.push("session_key");
			a.push("token_str");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "created") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Auth.AuthToken",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expire") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Auth.AuthToken",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "user_id") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Auth.AuthToken",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "login") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Auth.AuthToken",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "session_key") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Auth.AuthToken",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "token_str") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Auth.AuthToken",
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
Runtime.rtl.defClass(Runtime.Web.Auth.AuthToken);
window["Runtime.Web.Auth.AuthToken"] = Runtime.Web.Auth.AuthToken;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Auth.AuthToken;
"use strict;"
/*
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
if (typeof Runtime.Web.Auth == 'undefined') Runtime.Web.Auth = {};
Runtime.Web.Auth.LoginPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Auth.LoginPage.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Auth.LoginPage.prototype.constructor = Runtime.Web.Auth.LoginPage;
Object.assign(Runtime.Web.Auth.LoginPage.prototype,
{
	/**
 * Mouse click event
 */
	onLoginClick: async function(ctx, e)
	{
		var model = this.model(ctx);
		/* Set wait message */
		this.update(ctx, "setWaitMessage");
		/* Login */
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":"Runtime.Web.Auth","interface_name":"core.auth","method_name":"login","data":Runtime.Dict.from({"username":model.username,"password":model.password})}));
		/* Set answer */
		this.update(ctx, "setAnswer", answer);
		/* Redirect */
		if (answer.isSuccess(ctx))
		{
			document.location = document.location;
		}
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Auth.LoginPage)
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
		return "Runtime.Web.Auth.LoginPage";
	},
});
Object.assign(Runtime.Web.Auth.LoginPage, Runtime.Web.Component);
Object.assign(Runtime.Web.Auth.LoginPage,
{
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		var page_model = new Runtime.Web.Auth.LoginPageModel(ctx);
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Login page");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Runtime.Web.Auth.LoginPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	css: function(ctx, vars)
	{
		return ".content.h-00c5{" + Runtime.rtl.toStr("text-align: center;padding-top: 50px;width: 500px;margin-left: auto;margin-right: auto;") + Runtime.rtl.toStr("}.row.h-00c5{") + Runtime.rtl.toStr("text-align: left;") + Runtime.rtl.toStr("}.head.h-00c5{") + Runtime.rtl.toStr("font-weight: bold;") + Runtime.rtl.toStr("}.wrap.h-00c5{") + Runtime.rtl.toStr("padding-bottom: 20px;") + Runtime.rtl.toStr("}.label.h-00c5{") + Runtime.rtl.toStr("padding-bottom: 5px;") + Runtime.rtl.toStr("}.label.h-00c5 label{") + Runtime.rtl.toStr("}.message.h-00c5{") + Runtime.rtl.toStr("}.result.h-00c5.success{") + Runtime.rtl.toStr("color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "success", "color"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.result.h-00c5.error{") + Runtime.rtl.toStr("color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "error", "color"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}");
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Element 'div.content' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["content", this.getCssHash(ctx)].join(" "),"@key":"content","@elem_name":"content"}});
			
			/* Element 'div.wrap.head' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["wrap head", this.getCssHash(ctx)].join(" "),"@elem_name":"wrap"}});
			
			/* Text */
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": "Login"});
			RenderDriver.p(__v1, __v1_childs);
			
			/* Element 'div.wrap' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["wrap", this.getCssHash(ctx)].join(" "),"@elem_name":"wrap"}});
			
			/* Element 'div.row.label' */
			var __v2; var __v2_childs = [];
			[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["row label", this.getCssHash(ctx)].join(" "),"@elem_name":"row"}});
			
			/* Element 'label' */
			var __v3; var __v3_childs = [];
			[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "label","attrs": {"for":"auth-username"}});
			
			/* Text */
			[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": "Username"});
			RenderDriver.p(__v3, __v3_childs);
			RenderDriver.p(__v2, __v2_childs);
			
			/* Element 'div.row.input' */
			var __v2; var __v2_childs = [];
			[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["row input", this.getCssHash(ctx)].join(" "),"@elem_name":"row"}});
			
			[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "component", {"name": "Runtime.Web.Input.Input","attrs": {"@name":["Runtime.Web.Auth.LoginPage","username"],"name":"username","id":"auth-username"}, "layout": layout});
			RenderDriver.p(__v2, __v2_childs);
			RenderDriver.p(__v1, __v1_childs);
			
			/* Element 'div.wrap' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["wrap", this.getCssHash(ctx)].join(" "),"@elem_name":"wrap"}});
			
			/* Element 'div.row.label' */
			var __v2; var __v2_childs = [];
			[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["row label", this.getCssHash(ctx)].join(" "),"@elem_name":"row"}});
			
			/* Element 'label' */
			var __v3; var __v3_childs = [];
			[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "label","attrs": {"for":"auth-password"}});
			
			/* Text */
			[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": "Password"});
			RenderDriver.p(__v3, __v3_childs);
			RenderDriver.p(__v2, __v2_childs);
			
			/* Element 'div.row.input' */
			var __v2; var __v2_childs = [];
			[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["row input", this.getCssHash(ctx)].join(" "),"@elem_name":"row"}});
			
			[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "component", {"name": "Runtime.Web.Input.Input","attrs": {"type":"password","@name":["Runtime.Web.Auth.LoginPage","password"],"name":"password","id":"auth-password"}, "layout": layout});
			RenderDriver.p(__v2, __v2_childs);
			RenderDriver.p(__v1, __v1_childs);
			
			/* Element 'div.wrap' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["wrap", this.getCssHash(ctx)].join(" "),"@elem_name":"wrap"}});
			
			/* Component 'Button' */
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"type":"primary","@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.Auth.LoginPage","onLoginClick"]}, "layout": layout, "content": (__control) =>
			{
				var __vnull = null;
				var __control_childs = [];
				
				/* Text */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Login"});
				
				return __control_childs;
			}});
			RenderDriver.p(__v1, __v1_childs);
			
			/* Element 'div.wrap.result' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["wrap result", this.getResultClass(ctx, model), this.getCssHash(ctx)].join(" "),"@elem_name":"wrap"}});
			
			/* Text */
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": model.get(ctx, "message", "")});
			
			/* Text */
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": model.get(ctx, "success_message", "")});
			
			/* Text */
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": model.get(ctx, "error_message", "")});
			RenderDriver.p(__v1, __v1_childs);
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	/**
 * Returns result class
 */
	getResultClass: function(ctx, model)
	{
		if (model.get(ctx, "success_message", "") != "")
		{
			return "success";
		}
		if (model.get(ctx, "error_message", "") != "")
		{
			return "error";
		}
		return "";
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.Input.Button","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Auth";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Auth.LoginPage";
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
			"class_name": "Runtime.Web.Auth.LoginPage",
			"name": "Runtime.Web.Auth.LoginPage",
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
			"actionIndex",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		if (field_name == "actionIndex")
		{
			var Collection = Runtime.Collection;
			var Dict = Runtime.Dict;
			var IntrospectionInfo = Runtime.IntrospectionInfo;
			return new IntrospectionInfo(ctx, {
				"kind": IntrospectionInfo.ITEM_METHOD,
				"class_name": "Runtime.Web.Auth.LoginPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/login/","name":"app.login"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.Auth.LoginPage);
window["Runtime.Web.Auth.LoginPage"] = Runtime.Web.Auth.LoginPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Auth.LoginPage;
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
if (typeof Runtime.Web.Auth == 'undefined') Runtime.Web.Auth = {};
Runtime.Web.Auth.LoginPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Auth.LoginPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Auth.LoginPageModel.prototype.constructor = Runtime.Web.Auth.LoginPageModel;
Object.assign(Runtime.Web.Auth.LoginPageModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.username = "";
		this.password = "";
		this.message = "";
		this.success_message = "";
		this.error_message = "";
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Auth.LoginPageModel)
		{
			this.username = o.username;
			this.password = o.password;
			this.message = o.message;
			this.success_message = o.success_message;
			this.error_message = o.error_message;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "username")this.username = v;
		else if (k == "password")this.password = v;
		else if (k == "message")this.message = v;
		else if (k == "success_message")this.success_message = v;
		else if (k == "error_message")this.error_message = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "username")return this.username;
		else if (k == "password")return this.password;
		else if (k == "message")return this.message;
		else if (k == "success_message")return this.success_message;
		else if (k == "error_message")return this.error_message;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Auth.LoginPageModel";
	},
});
Object.assign(Runtime.Web.Auth.LoginPageModel, Runtime.BaseStruct);
Object.assign(Runtime.Web.Auth.LoginPageModel,
{
	/**
	 * Set wait message
	 */
	setWaitMessage: function(ctx, model, message)
	{
		if (message == undefined) message = "";
		return model.copy(ctx, Runtime.Dict.from({"message":(message != message) ? (message) : (ctx.translate(ctx, "Runtime.Web", "Please wait")),"success_message":message,"error_message":""}));
	},
	/**
	 * Set answer
	 */
	setAnswer: function(ctx, model, answer)
	{
		if (answer.isSuccess(ctx))
		{
			return this.setSuccess(ctx, model, answer.success_message);
		}
		model = this.setError(ctx, model, answer.error_message);
		return model;
	},
	/**
	 * Success
	 */
	setSuccess: function(ctx, model, message)
	{
		return model.copy(ctx, Runtime.Dict.from({"message":"","success_message":message,"error_message":""}));
	},
	/**
	 * Error
	 */
	setError: function(ctx, model, message)
	{
		return model.copy(ctx, Runtime.Dict.from({"message":"","success_message":"","error_message":message}));
	},
	/**
	 * Clear
	 */
	clear: function(ctx, model)
	{
		return new Runtime.Web.Auth.LoginPageModel(ctx, Runtime.Dict.from({"username":"","password":"","message":"","success_message":"","error_message":""}));
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Auth";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Auth.LoginPageModel";
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
			"class_name": "Runtime.Web.Auth.LoginPageModel",
			"name": "Runtime.Web.Auth.LoginPageModel",
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
			a.push("username");
			a.push("password");
			a.push("message");
			a.push("success_message");
			a.push("error_message");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "username") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Auth.LoginPageModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "password") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Auth.LoginPageModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "message") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Auth.LoginPageModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "success_message") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Auth.LoginPageModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_message") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Auth.LoginPageModel",
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
Runtime.rtl.defClass(Runtime.Web.Auth.LoginPageModel);
window["Runtime.Web.Auth.LoginPageModel"] = Runtime.Web.Auth.LoginPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Auth.LoginPageModel;
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
if (typeof Runtime.Web.Auth == 'undefined') Runtime.Web.Auth = {};
Runtime.Web.Auth.ModuleDescription = function(ctx)
{
};
Object.assign(Runtime.Web.Auth.ModuleDescription.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Auth.ModuleDescription)
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
		return "Runtime.Web.Auth.ModuleDescription";
	},
});
Object.assign(Runtime.Web.Auth.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function(ctx)
	{
		return "Runtime.Web.Auth";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function(ctx)
	{
		return "0.1.0";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function(ctx)
	{
		return Runtime.Dict.from({"Runtime.Web":"*","Runtime.Web.Input":"*"});
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
		return "Runtime.Web.Auth";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Auth.ModuleDescription";
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
			"class_name": "Runtime.Web.Auth.ModuleDescription",
			"name": "Runtime.Web.Auth.ModuleDescription",
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
Runtime.rtl.defClass(Runtime.Web.Auth.ModuleDescription);
window["Runtime.Web.Auth.ModuleDescription"] = Runtime.Web.Auth.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Auth.ModuleDescription;
"use strict;"
/*
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
if (typeof Runtime.Web.Dialog == 'undefined') Runtime.Web.Dialog = {};
Runtime.Web.Dialog.Dialog = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Dialog.Dialog.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Dialog.Dialog.prototype.constructor = Runtime.Web.Dialog.Dialog;
Object.assign(Runtime.Web.Dialog.Dialog.prototype,
{
	/**
 * Validate
 */
	validate: function(ctx)
	{
		if (this.params.style == Runtime.Web.Dialog.DialogModel.STYLE_PROMT)
		{
			if (this.model.input == "")
			{
				this.update(ctx, "setError", ctx.translate(ctx, "Runtime.Web.Dialog", "Type input"));
				return false;
			}
		}
		return true;
	},
	/**
 * Input keydown
 */
	onInputKeyDown: async function(ctx, msg)
	{
		var e = msg.data;
		if (e.keyCode == 13)
		{
			this.update(ctx, "setInput", e.value);
			this.update(ctx, "setError", "");
			this.pressButton(ctx, Runtime.Web.Dialog.DialogModel.BUTTON_RESULT_OK);
		}
	},
	/**
 * Button click
 */
	onButtonClick: async function(ctx, msg)
	{
		var tag = msg.sender.params.get(ctx, "data-action", "");
		await this.pressButton(ctx, tag);
	},
	/**
 * Press button
 * @param string value 
 */
	pressButton: async function(ctx, value)
	{
		var auto_hide = this.params.get(ctx, "auto_hide", true);
		if (value == Runtime.Web.Dialog.DialogModel.BUTTON_RESULT_OK)
		{
			var is_valid = this.validate(ctx);
			if (!is_valid)
			{
				return Promise.resolve();
			}
		}
		var model = this.model(ctx);
		if (auto_hide)
		{
			this.update(ctx, "hide");
		}
		await this.signal(ctx, new Runtime.Web.Dialog.DialogEvent(ctx, Runtime.Dict.from({"input":model.input,"model":model,"tag":model.tag,"button_result":value})));
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Dialog.Dialog)
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
		return "Runtime.Web.Dialog.Dialog";
	},
});
Object.assign(Runtime.Web.Dialog.Dialog, Runtime.Web.Component);
Object.assign(Runtime.Web.Dialog.Dialog,
{
	css: function(ctx, vars)
	{
		return ".dialog_box.h-9e54, .dialog_shadow.h-9e54{" + Runtime.rtl.toStr("position: fixed;top: 0; left: 0;width: 100%; height: 100%;z-index: 1001;") + Runtime.rtl.toStr("}.dialog_box.h-9e54{") + Runtime.rtl.toStr("overflow: auto;overflow-y: scroll;display: none;") + Runtime.rtl.toStr("}.dialog_box.h-9e54.open{") + Runtime.rtl.toStr("display: block;") + Runtime.rtl.toStr("}.dialog_shadow.h-9e54{") + Runtime.rtl.toStr("background-color: #000;opacity: 0.2;overflow: hidden;") + Runtime.rtl.toStr("}.dialog_wrap.h-9e54{") + Runtime.rtl.toStr("width: 100%;min-height: 100%;") + Runtime.rtl.toStr("}.dialog_wrap.h-9e54 > tr > td{") + Runtime.rtl.toStr("padding: 20px;") + Runtime.rtl.toStr("}.dialog.h-9e54{") + Runtime.rtl.toStr("position: relative;padding: 20px;background-color: white;max-width: 350px;margin: 0 auto;width: auto;z-index: 1002;box-shadow: 2px 4px 10px 0px rgba(0,0,0,0.5)") + Runtime.rtl.toStr("}.dialog_title.h-9e54, .dialog_text.h-9e54, .dialog_promt.h-9e54{") + Runtime.rtl.toStr("text-align: center;padding-bottom: 12px;") + Runtime.rtl.toStr("}.dialog_title.h-9e54{") + Runtime.rtl.toStr("font-weight: bold;") + Runtime.rtl.toStr("}.dialog_promt_input.h-9e54{") + Runtime.rtl.toStr("padding: 6px 12px;width: 100%;") + Runtime.rtl.toStr("}.dialog_buttons.h-9e54{") + Runtime.rtl.toStr("padding-top: 12px;text-align: center;") + Runtime.rtl.toStr("}.dialog_buttons.h-9e54 .button.h-de49{") + Runtime.rtl.toStr("margin: 0 5px;") + Runtime.rtl.toStr("}.dialog_row.h-9e54{") + Runtime.rtl.toStr("padding-bottom: 6px;") + Runtime.rtl.toStr("}.dialog_row.h-9e54:last-child{") + Runtime.rtl.toStr("padding-bottom: 0px;") + Runtime.rtl.toStr("}.dialog_result.h-9e54{") + Runtime.rtl.toStr("text-align: center;padding-top: 12px;") + Runtime.rtl.toStr("}.dialog_result.h-9e54.success{") + Runtime.rtl.toStr("color: green;") + Runtime.rtl.toStr("}.dialog_result.h-9e54.error{") + Runtime.rtl.toStr("color: red;") + Runtime.rtl.toStr("}");
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, params, "width"));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "string", ""));
			var width = __v0.value(ctx);
			
			/* Element 'div.dialog_box' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["dialog_box", ((model.is_open) ? ("open") : ("")), this.getCssHash(ctx)].join(" "),"@elem_name":"dialog_box"}});
			
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["dialog_shadow", this.getCssHash(ctx)].join(" "),"@elem_name":"dialog_shadow"}});
			
			/* Element 'table.dialog_wrap' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "table","attrs": {"class":["dialog_wrap", this.getCssHash(ctx)].join(" "),"@elem_name":"dialog_wrap"}});
			
			/* Element 'tr' */
			var __v2; var __v2_childs = [];
			[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "tr","attrs": {}});
			
			/* Element 'td' */
			var __v3; var __v3_childs = [];
			[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "td","attrs": {}});
			
			/* Element 'div.dialog' */
			var __v4; var __v4_childs = [];
			[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "div","attrs": {"style":((width != "") ? ("max-width:" + Runtime.rtl.toStr(width) + Runtime.rtl.toStr(";")) : ("")),"class":["dialog", this.getCssHash(ctx)].join(" "),"@elem_name":"dialog"}});
			
			/* Text */
			[__vnull, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "text", {"content": this.renderDialog(ctx, layout, model, params, content)});
			RenderDriver.p(__v4, __v4_childs);
			RenderDriver.p(__v3, __v3_childs);
			RenderDriver.p(__v2, __v2_childs);
			RenderDriver.p(__v1, __v1_childs);
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	renderDialog: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Text */
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": Runtime.Collection.from([this.renderTitle(ctx, layout, model, params, content),this.renderText(ctx, layout, model, params, content),this.renderPromt(ctx, layout, model, params, content),this.renderContent(ctx, layout, model, params, content),this.renderButtons(ctx, layout, model, params, content),this.renderResult(ctx, layout, model, params, content)])});
			
			return __control_childs;
		};
	},
	renderTitle: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			if (model.title != "")
			{
				/* Element 'div.dialog_title' */
				var __v0; var __v0_childs = [];
				[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["dialog_title", this.getCssHash(ctx)].join(" "),"@elem_name":"dialog_title"}});
				
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": model.title});
				RenderDriver.p(__v0, __v0_childs);
			}
			
			return __control_childs;
		};
	},
	renderText: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			if (model.text != "")
			{
				/* Element 'div.dialog_text' */
				var __v0; var __v0_childs = [];
				[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["dialog_text", this.getCssHash(ctx)].join(" "),"@elem_name":"dialog_text"}});
				
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": model.text});
				RenderDriver.p(__v0, __v0_childs);
			}
			
			return __control_childs;
		};
	},
	renderPromt: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var style = (params != null) ? (params.get(ctx, "style", "")) : ("");
			
			if (style == Runtime.Web.Dialog.DialogModel.STYLE_PROMT)
			{
				/* Element 'div.dialog_promt' */
				var __v0; var __v0_childs = [];
				[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["dialog_promt", this.getCssHash(ctx)].join(" "),"@elem_name":"dialog_promt"}});
				
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "input","attrs": {"@event:Runtime.Web.Events.KeyDownEvent":["Runtime.Web.Dialog.Dialog","onInputKeyDown"],"@bind":["Runtime.Web.Dialog.Dialog","input"],"class":["dialog_promt_input", this.getCssHash(ctx)].join(" "),"@elem_name":"dialog_promt_input"}});
				RenderDriver.p(__v0, __v0_childs);
			}
			
			return __control_childs;
		};
	},
	renderContent: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var style = (params != null) ? (params.get(ctx, "style", "")) : ("");
			
			if (style == Runtime.Web.Dialog.DialogModel.STYLE_CONTENT)
			{
				/* Element 'div.dialog_content' */
				var __v0; var __v0_childs = [];
				[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["dialog_content", this.getCssHash(ctx)].join(" "),"@elem_name":"dialog_content"}});
				
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": content});
				RenderDriver.p(__v0, __v0_childs);
			}
			
			return __control_childs;
		};
	},
	renderButtons: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, params, "buttons"));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", null));
			var buttons = __v0.value(ctx);
			
			var renderButtons = Runtime.rtl.get(ctx, params, "renderButtons");
			
			var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, params, "show_buttons"));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "bool", true));
			var show_buttons = __v0.value(ctx);
			
			if (show_buttons)
			{
				if (Runtime.rtl.exists(ctx, renderButtons) && Runtime.rtl.isFn(ctx, renderButtons))
				{
					/* Element 'div.dialog_buttons' */
					var __v0; var __v0_childs = [];
					[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["dialog_buttons", this.getCssHash(ctx)].join(" "),"@elem_name":"dialog_buttons"}});
					
					/* Text */
					[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": renderButtons(ctx, layout, model, params, content)});
					RenderDriver.p(__v0, __v0_childs);
				}
				else if (Runtime.rtl.exists(ctx, buttons))
				{
					/* Element 'div.dialog_buttons' */
					var __v0; var __v0_childs = [];
					[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["dialog_buttons", this.getCssHash(ctx)].join(" "),"@elem_name":"dialog_buttons"}});
					
					for (var i = 0;i < buttons.count(ctx);i++)
					{
						var button = Runtime.rtl.get(ctx, buttons, i);
						
						/* Component 'Button' */
						[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": this.mergeAttrs(ctx, {"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.Dialog.Dialog","onButtonClick"]},button), "layout": layout, "content": (__control) =>
						{
							var __vnull = null;
							var __control_childs = [];
							
							/* Text */
							[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": Runtime.rtl.get(ctx, button, "value")});
							
							return __control_childs;
						}});
					}
					RenderDriver.p(__v0, __v0_childs);
				}
				else
				{
					/* Element 'div.dialog_buttons' */
					var __v0; var __v0_childs = [];
					[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["dialog_buttons", this.getCssHash(ctx)].join(" "),"@elem_name":"dialog_buttons"}});
					
					/* Component 'Button' */
					[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"data-action":"ok","@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.Dialog.Dialog","onButtonClick"]}, "layout": layout, "content": (__control) =>
					{
						var __vnull = null;
						var __control_childs = [];
						
						/* Text */
						[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "OK"});
						
						return __control_childs;
					}});
					
					/* Component 'Button' */
					[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"data-action":"cancel","@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.Dialog.Dialog","onButtonClick"]}, "layout": layout, "content": (__control) =>
					{
						var __vnull = null;
						var __control_childs = [];
						
						/* Text */
						[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Cancel"});
						
						return __control_childs;
					}});
					RenderDriver.p(__v0, __v0_childs);
				}
			}
			
			return __control_childs;
		};
	},
	renderButton: function(ctx, layout, model, params, button_type)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			if (button_type == "ok")
			{
				/* Component 'Button' */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"data-action":"ok","@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.Dialog.Dialog","onButtonClick"],"@key":"ok"}, "layout": layout, "content": (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Text */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "OK"});
					
					return __control_childs;
				}});
			}
			
			if (button_type == "cancel")
			{
				/* Component 'Button' */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"data-action":"cancel","@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.Dialog.Dialog","onButtonClick"],"@key":"cancel"}, "layout": layout, "content": (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Text */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Cancel"});
					
					return __control_childs;
				}});
			}
			
			return __control_childs;
		};
	},
	renderButtonInfo: function(ctx, layout, model, params, button_info)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Component 'Button' */
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": this.mergeAttrs(ctx, {"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.Dialog.Dialog","onButtonClick"]},button_info), "layout": layout, "content": (__control) =>
			{
				var __vnull = null;
				var __control_childs = [];
				
				/* Text */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": Runtime.rtl.get(ctx, button_info, "value")});
				
				return __control_childs;
			}});
			
			return __control_childs;
		};
	},
	renderResult: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			if (model.message != "" || model.success != "" || model.error == "")
			{
				/* Element 'div.dialog_result' */
				var __v0; var __v0_childs = [];
				[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["dialog_result", this.getResultClass(ctx, model), this.getCssHash(ctx)].join(" "),"@elem_name":"dialog_result"}});
				
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": model.message});
				
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": model.success_message});
				
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": model.error_message});
				RenderDriver.p(__v0, __v0_childs);
			}
			
			return __control_childs;
		};
	},
	/**
 * Returns result class
 */
	getResultClass: function(ctx, model)
	{
		if (model.success_message != "")
		{
			return "success";
		}
		if (model.error_message != "")
		{
			return "error";
		}
		return "";
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.Input.Button"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Dialog";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Dialog.Dialog";
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
			"class_name": "Runtime.Web.Dialog.Dialog",
			"name": "Runtime.Web.Dialog.Dialog",
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
Runtime.rtl.defClass(Runtime.Web.Dialog.Dialog);
window["Runtime.Web.Dialog.Dialog"] = Runtime.Web.Dialog.Dialog;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Dialog.Dialog;
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
if (typeof Runtime.Web.Dialog == 'undefined') Runtime.Web.Dialog = {};
Runtime.Web.Dialog.DialogEvent = function(ctx)
{
	Runtime.Web.Events.UIEvent.apply(this, arguments);
};
Runtime.Web.Dialog.DialogEvent.prototype = Object.create(Runtime.Web.Events.UIEvent.prototype);
Runtime.Web.Dialog.DialogEvent.prototype.constructor = Runtime.Web.Dialog.DialogEvent;
Object.assign(Runtime.Web.Dialog.DialogEvent.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.input = "";
		this.button_result = "";
		this.tag = null;
		this.model = null;
		Runtime.Web.Events.UIEvent.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Dialog.DialogEvent)
		{
			this.input = o.input;
			this.button_result = o.button_result;
			this.tag = o.tag;
			this.model = o.model;
		}
		Runtime.Web.Events.UIEvent.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "input")this.input = v;
		else if (k == "button_result")this.button_result = v;
		else if (k == "tag")this.tag = v;
		else if (k == "model")this.model = v;
		else Runtime.Web.Events.UIEvent.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "input")return this.input;
		else if (k == "button_result")return this.button_result;
		else if (k == "tag")return this.tag;
		else if (k == "model")return this.model;
		return Runtime.Web.Events.UIEvent.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Dialog.DialogEvent";
	},
});
Object.assign(Runtime.Web.Dialog.DialogEvent, Runtime.Web.Events.UIEvent);
Object.assign(Runtime.Web.Dialog.DialogEvent,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Dialog";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Dialog.DialogEvent";
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
			"class_name": "Runtime.Web.Dialog.DialogEvent",
			"name": "Runtime.Web.Dialog.DialogEvent",
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
			a.push("input");
			a.push("button_result");
			a.push("tag");
			a.push("model");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "input") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "button_result") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "tag") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "model") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogEvent",
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
Runtime.rtl.defClass(Runtime.Web.Dialog.DialogEvent);
window["Runtime.Web.Dialog.DialogEvent"] = Runtime.Web.Dialog.DialogEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Dialog.DialogEvent;
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
if (typeof Runtime.Web.Dialog == 'undefined') Runtime.Web.Dialog = {};
Runtime.Web.Dialog.DialogModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Dialog.DialogModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Dialog.DialogModel.prototype.constructor = Runtime.Web.Dialog.DialogModel;
Object.assign(Runtime.Web.Dialog.DialogModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.is_open = false;
		this.is_modal = false;
		this.title = "";
		this.text = "";
		this.input = "";
		this.button_result = "";
		this.message = "";
		this.success_message = "";
		this.error_message = "";
		this.tag = null;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Dialog.DialogModel)
		{
			this.is_open = o.is_open;
			this.is_modal = o.is_modal;
			this.title = o.title;
			this.text = o.text;
			this.input = o.input;
			this.button_result = o.button_result;
			this.message = o.message;
			this.success_message = o.success_message;
			this.error_message = o.error_message;
			this.tag = o.tag;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "is_open")this.is_open = v;
		else if (k == "is_modal")this.is_modal = v;
		else if (k == "title")this.title = v;
		else if (k == "text")this.text = v;
		else if (k == "input")this.input = v;
		else if (k == "button_result")this.button_result = v;
		else if (k == "message")this.message = v;
		else if (k == "success_message")this.success_message = v;
		else if (k == "error_message")this.error_message = v;
		else if (k == "tag")this.tag = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "is_open")return this.is_open;
		else if (k == "is_modal")return this.is_modal;
		else if (k == "title")return this.title;
		else if (k == "text")return this.text;
		else if (k == "input")return this.input;
		else if (k == "button_result")return this.button_result;
		else if (k == "message")return this.message;
		else if (k == "success_message")return this.success_message;
		else if (k == "error_message")return this.error_message;
		else if (k == "tag")return this.tag;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Dialog.DialogModel";
	},
});
Object.assign(Runtime.Web.Dialog.DialogModel, Runtime.BaseStruct);
Object.assign(Runtime.Web.Dialog.DialogModel,
{
	STYLE_PROMT: "promt",
	STYLE_CONFIRM: "confirm",
	STYLE_ALERT: "alert",
	STYLE_CONTENT: "content",
	BUTTON_RESULT_OK: "ok",
	BUTTON_RESULT_CANCEL: "cancel",
	BUTTON_RESULT_EXIT: "exit",
	/**
	 * Show dialog
	 */
	show: function(ctx, model, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			return model.copy(ctx, Runtime.Dict.from({"input":"","is_open":true,"button_result":"","message":"","success_message":"","error_message":""}));
		}
		params = params.concat(ctx, Runtime.Dict.from({"input":params.get(ctx, "input", ""),"title":params.get(ctx, "title", ""),"text":params.get(ctx, "text", ""),"is_open":true,"button_result":"","message":"","success_message":"","error_message":""}));
		return model.copy(ctx, params);
	},
	/**
	 * Hide dialog
	 */
	hide: function(ctx, model, button_result)
	{
		if (button_result == undefined) button_result = "";
		return model.copy(ctx, Runtime.Dict.from({"is_open":false,"tag":null,"button_result":button_result}));
	},
	/**
	 * Set input
	 */
	setInput: function(ctx, model, input)
	{
		return model.copy(ctx, Runtime.Dict.from({"input":input}));
	},
	/**
	 * Set wait message
	 */
	setWaitMessage: function(ctx, model, message)
	{
		if (message == undefined) message = "";
		return model.copy(ctx, Runtime.Dict.from({"message":(message != message) ? (message) : (ctx.translate(ctx, "Runtime.Web", "Please wait")),"success_message":message,"error_message":""}));
	},
	/**
	 * Message
	 */
	setMessage: function(ctx, model, message)
	{
		return model.copy(ctx, Runtime.Dict.from({"message":"","success_message":message,"error_message":""}));
	},
	/**
	 * Set answer
	 */
	setAnswer: function(ctx, model, answer)
	{
		if (answer.isSuccess(ctx))
		{
			return this.setSuccess(ctx, model, answer.success_message);
		}
		return this.setError(ctx, model, answer.error_message);
	},
	/**
	 * Success
	 */
	setSuccess: function(ctx, model, message)
	{
		return model.copy(ctx, Runtime.Dict.from({"message":"","success_message":message,"error_message":""}));
	},
	/**
	 * Error
	 */
	setError: function(ctx, model, message)
	{
		return model.copy(ctx, Runtime.Dict.from({"message":"","success_message":"","error_message":message}));
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Dialog";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Dialog.DialogModel";
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
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": "Runtime.Web.Dialog.DialogModel",
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
			a.push("is_open");
			a.push("is_modal");
			a.push("title");
			a.push("text");
			a.push("input");
			a.push("button_result");
			a.push("message");
			a.push("success_message");
			a.push("error_message");
			a.push("tag");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "STYLE_PROMT") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STYLE_CONFIRM") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STYLE_ALERT") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STYLE_CONTENT") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "BUTTON_RESULT_OK") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "BUTTON_RESULT_CANCEL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "BUTTON_RESULT_EXIT") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_open") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_modal") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "title") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "text") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "input") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "button_result") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "message") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "success_message") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_message") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "tag") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Dialog.DialogModel",
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
Runtime.rtl.defClass(Runtime.Web.Dialog.DialogModel);
window["Runtime.Web.Dialog.DialogModel"] = Runtime.Web.Dialog.DialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Dialog.DialogModel;
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
if (typeof Runtime.Web.Dialog == 'undefined') Runtime.Web.Dialog = {};
Runtime.Web.Dialog.ModuleDescription = function(ctx)
{
};
Object.assign(Runtime.Web.Dialog.ModuleDescription.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Dialog.ModuleDescription)
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
		return "Runtime.Web.Dialog.ModuleDescription";
	},
});
Object.assign(Runtime.Web.Dialog.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function(ctx)
	{
		return "Runtime.Web.Dialog";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function(ctx)
	{
		return "0.1.2";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function(ctx)
	{
		return Runtime.Dict.from({"Runtime.Web":"*","Runtime.Web.Button":"*"});
	},
	/**
	 * Returns enities
	 */
	entities: function(ctx)
	{
		return null;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Dialog";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Dialog.ModuleDescription";
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
			"class_name": "Runtime.Web.Dialog.ModuleDescription",
			"name": "Runtime.Web.Dialog.ModuleDescription",
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
Runtime.rtl.defClass(Runtime.Web.Dialog.ModuleDescription);
window["Runtime.Web.Dialog.ModuleDescription"] = Runtime.Web.Dialog.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Dialog.ModuleDescription;
"use strict;"
/*
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
if (typeof Runtime.Web.Input == 'undefined') Runtime.Web.Input = {};
Runtime.Web.Input.Button = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Input.Button.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Input.Button.prototype.constructor = Runtime.Web.Input.Button;
Object.assign(Runtime.Web.Input.Button.prototype,
{
	/**
 * Mouse click event
 */
	onClick: async function(ctx, msg)
	{
		await this.signal(ctx, msg.data);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Input.Button)
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
		return "Runtime.Web.Input.Button";
	},
});
Object.assign(Runtime.Web.Input.Button, Runtime.Web.Component);
Object.assign(Runtime.Web.Input.Button,
{
	css: function(ctx, vars)
	{
		return ".button.h-de49{" + Runtime.rtl.toStr("padding: 6px 12px;cursor: pointer;background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "text"])) + Runtime.rtl.toStr(";/*box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.25);*/outline: 0;")) + Runtime.rtl.toStr("}.button.h-de49:hover{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "hover"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "hover-text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.button.h-de49:active{") + Runtime.rtl.toStr("box-shadow: inset 0px 2px 5px 0px rgba(0,0,0,0.25);") + Runtime.rtl.toStr("}.button.h-de49.primary{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "primary", "background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "primary", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "primary", "text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.button.h-de49.primary:hover{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "primary", "hover-background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "primary", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "primary", "hover-text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.button.h-de49.danger{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "danger", "background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "danger", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "danger", "text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.button.h-de49.danger:hover{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "danger", "hover-background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "danger", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "danger", "hover-text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.button.h-de49.success{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "success", "background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "success", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "success", "text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.button.h-de49.success:hover{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "success", "hover-background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "success", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "success", "hover-text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.button.h-de49.small{") + Runtime.rtl.toStr("padding: 3px 6px;") + Runtime.rtl.toStr("}");
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Element 'button.button' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "button","attrs": {"@tag":Runtime.rtl.get(ctx, params, "@tag"),"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.Input.Button","onClick"],"class":["button", Runtime.rtl.get(ctx, params, "type"), this.getCssHash(ctx)].join(" "),"@elem_name":"button"}});
			
			/* Text */
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": content});
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Input";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Input.Button";
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
			"class_name": "Runtime.Web.Input.Button",
			"name": "Runtime.Web.Input.Button",
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
Runtime.rtl.defClass(Runtime.Web.Input.Button);
window["Runtime.Web.Input.Button"] = Runtime.Web.Input.Button;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Input.Button;
"use strict;"
/*
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
if (typeof Runtime.Web.Input == 'undefined') Runtime.Web.Input = {};
Runtime.Web.Input.Input = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Input.Input.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Input.Input.prototype.constructor = Runtime.Web.Input.Input;
Object.assign(Runtime.Web.Input.Input.prototype,
{
	/**
 * On change
 */
	onChange: function(ctx, msg)
	{
		this.signal(ctx, msg.data);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Input.Input)
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
		return "Runtime.Web.Input.Input";
	},
});
Object.assign(Runtime.Web.Input.Input, Runtime.Web.Component);
Object.assign(Runtime.Web.Input.Input,
{
	css: function(ctx, vars)
	{
		return ".input.h-9e6e{" + Runtime.rtl.toStr("width: 100%;padding: 6px 12px;background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "border"])) + Runtime.rtl.toStr(" solid;outline: transparent;")) + Runtime.rtl.toStr("}");
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var value = (params != null) ? (params.get(ctx, "value", "")) : ("");
			
			var name = (params != null) ? (params.get(ctx, "name", "")) : ("");
			
			var type = (params != null) ? (params.get(ctx, "type", "input")) : ("");
			
			var tag = (params != null) ? (params.get(ctx, "@tag", "")) : ("");
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "input","attrs": {"@tag":tag,"@event:Runtime.Web.Events.ChangeEvent":["Runtime.Web.Input.Input","onChange"],"name":name,"type":type,"value":((model != null) ? (model) : (value)),"class":["input", this.getCssHash(ctx)].join(" "),"@elem_name":"input"}});
			
			return __control_childs;
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Input";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Input.Input";
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
			"class_name": "Runtime.Web.Input.Input",
			"name": "Runtime.Web.Input.Input",
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
Runtime.rtl.defClass(Runtime.Web.Input.Input);
window["Runtime.Web.Input.Input"] = Runtime.Web.Input.Input;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Input.Input;
"use strict;"
/*
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
if (typeof Runtime.Web.Input == 'undefined') Runtime.Web.Input = {};
Runtime.Web.Input.Label = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Input.Label.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Input.Label.prototype.constructor = Runtime.Web.Input.Label;
Object.assign(Runtime.Web.Input.Label.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Input.Label)
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
		return "Runtime.Web.Input.Label";
	},
});
Object.assign(Runtime.Web.Input.Label, Runtime.Web.Component);
Object.assign(Runtime.Web.Input.Label,
{
	css: function(ctx, vars)
	{
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var r = Runtime.rtl.get(ctx, params, "render");
			
			if (Runtime.rtl.exists(ctx, r))
			{
				/* Text */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": r(ctx, layout, model, params, content)});
			}
			else if (Runtime.rtl.exists(ctx, model))
			{
				/* Text */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": model});
			}
			
			return __control_childs;
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Input";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Input.Label";
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
			"class_name": "Runtime.Web.Input.Label",
			"name": "Runtime.Web.Input.Label",
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
Runtime.rtl.defClass(Runtime.Web.Input.Label);
window["Runtime.Web.Input.Label"] = Runtime.Web.Input.Label;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Input.Label;
"use strict;"
/*
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
if (typeof Runtime.Web.Input == 'undefined') Runtime.Web.Input = {};
Runtime.Web.Input.Select = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Input.Select.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Input.Select.prototype.constructor = Runtime.Web.Input.Select;
Object.assign(Runtime.Web.Input.Select.prototype,
{
	/**
 * On change
 */
	onChange: function(ctx, msg)
	{
		this.signal(ctx, msg.data);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Input.Select)
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
		return "Runtime.Web.Input.Select";
	},
});
Object.assign(Runtime.Web.Input.Select, Runtime.Web.Component);
Object.assign(Runtime.Web.Input.Select,
{
	css: function(ctx, vars)
	{
		return ".select.h-4d5b{" + Runtime.rtl.toStr("width: 100%;padding: 6px 12px;background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "border"])) + Runtime.rtl.toStr(" solid;outline: transparent;")) + Runtime.rtl.toStr("}");
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var name = (params != null) ? (params.get(ctx, "name", "")) : ("");
			
			/* Element 'select.select' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "select","attrs": {"@event:Runtime.Web.Events.ChangeEvent":["Runtime.Web.Input.Select","onChange"],"name":name,"value":((Runtime.rtl.isEmpty(ctx, model)) ? ("") : (model)),"class":["select", this.getCssHash(ctx)].join(" "),"@elem_name":"select"}});
			
			var options = Runtime.rtl.get(ctx, params, "options");
			
			if (Runtime.rtl.exists(ctx, options))
			{
				var selected = Runtime.Dict.from({});
				
				if (Runtime.rtl.get(ctx, params, "show_select_value") == true)
				{
					if (model === "" || model === null)
					{
						selected = Runtime.Dict.from({"selected":"selected"});
					}
					
					/* Element 'option' */
					var __v1; var __v1_childs = [];
					[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "option","attrs": this.mergeAttrs(ctx, {"value":""},selected)});
					
					/* Text */
					[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": ctx.translate(ctx, "Runtime.Web.Input", "Select value")});
					RenderDriver.p(__v1, __v1_childs);
				}
				
				for (var i = 0;i < options.count(ctx);i++)
				{
					var item = Runtime.rtl.get(ctx, options, i);
					
					selected = Runtime.Dict.from({});
					
					if (Runtime.rtl.get(ctx, item, "id") == model && model !== "" && model !== null)
					{
						selected = Runtime.Dict.from({"selected":"selected"});
					}
					
					/* Element 'option' */
					var __v1; var __v1_childs = [];
					[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "option","attrs": this.mergeAttrs(ctx, {"value":Runtime.rtl.get(ctx, item, "id")},selected)});
					
					/* Text */
					[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": Runtime.rtl.get(ctx, item, "value")});
					RenderDriver.p(__v1, __v1_childs);
				}
			}
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Input";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Input.Select";
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
			"class_name": "Runtime.Web.Input.Select",
			"name": "Runtime.Web.Input.Select",
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
Runtime.rtl.defClass(Runtime.Web.Input.Select);
window["Runtime.Web.Input.Select"] = Runtime.Web.Input.Select;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Input.Select;
"use strict;"
/*
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
if (typeof Runtime.Web.Input == 'undefined') Runtime.Web.Input = {};
Runtime.Web.Input.SelectText = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Input.SelectText.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Input.SelectText.prototype.constructor = Runtime.Web.Input.SelectText;
Object.assign(Runtime.Web.Input.SelectText.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Input.SelectText)
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
		return "Runtime.Web.Input.SelectText";
	},
});
Object.assign(Runtime.Web.Input.SelectText, Runtime.Web.Component);
Object.assign(Runtime.Web.Input.SelectText,
{
	css: function(ctx, vars)
	{
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var options = Runtime.rtl.get(ctx, params, "options");
			
			if (Runtime.rtl.exists(ctx, options))
			{
				var item = options.findItem(ctx, Runtime.lib.equalAttr(ctx, "id", model));
				
				if (Runtime.rtl.exists(ctx, item))
				{
					/* Text */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": Runtime.rtl.get(ctx, item, "value")});
				}
			}
			
			return __control_childs;
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Input";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Input.SelectText";
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
			"class_name": "Runtime.Web.Input.SelectText",
			"name": "Runtime.Web.Input.SelectText",
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
Runtime.rtl.defClass(Runtime.Web.Input.SelectText);
window["Runtime.Web.Input.SelectText"] = Runtime.Web.Input.SelectText;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Input.SelectText;
"use strict;"
/*
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
if (typeof Runtime.Web.Input == 'undefined') Runtime.Web.Input = {};
Runtime.Web.Input.TextArea = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Input.TextArea.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Input.TextArea.prototype.constructor = Runtime.Web.Input.TextArea;
Object.assign(Runtime.Web.Input.TextArea.prototype,
{
	/**
 * On change
 */
	onChange: function(ctx, msg)
	{
		this.signal(ctx, msg.data);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Input.TextArea)
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
		return "Runtime.Web.Input.TextArea";
	},
});
Object.assign(Runtime.Web.Input.TextArea, Runtime.Web.Component);
Object.assign(Runtime.Web.Input.TextArea,
{
	css: function(ctx, vars)
	{
		return ".textarea.h-106c{" + Runtime.rtl.toStr("width: 100%;min-height: 300px;padding: 6px 12px;background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "border"])) + Runtime.rtl.toStr(" solid;outline: transparent;")) + Runtime.rtl.toStr("}");
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var value = (params != null) ? (params.get(ctx, "value", "")) : ("");
			
			var name = (params != null) ? (params.get(ctx, "name", "")) : ("");
			
			var type = (params != null) ? (params.get(ctx, "type", "input")) : ("");
			
			var tag = (params != null) ? (params.get(ctx, "@tag", "")) : ("");
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "textarea","attrs": {"@tag":tag,"@event:Runtime.Web.Events.ChangeEvent":["Runtime.Web.Input.TextArea","onChange"],"name":name,"type":type,"value":model,"class":["input", this.getCssHash(ctx)].join(" "),"@elem_name":"input"}});
			
			return __control_childs;
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Input";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Input.TextArea";
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
			"class_name": "Runtime.Web.Input.TextArea",
			"name": "Runtime.Web.Input.TextArea",
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
Runtime.rtl.defClass(Runtime.Web.Input.TextArea);
window["Runtime.Web.Input.TextArea"] = Runtime.Web.Input.TextArea;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Input.TextArea;
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
if (typeof Runtime.Web.Input == 'undefined') Runtime.Web.Input = {};
Runtime.Web.Input.ModuleDescription = function(ctx)
{
};
Object.assign(Runtime.Web.Input.ModuleDescription.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Input.ModuleDescription)
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
		return "Runtime.Web.Input.ModuleDescription";
	},
});
Object.assign(Runtime.Web.Input.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function(ctx)
	{
		return "Runtime.Web.Input";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function(ctx)
	{
		return "0.1.2";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function(ctx)
	{
		return Runtime.Dict.from({"Runtime.Web":">=0.3"});
	},
	/**
	 * Returns enities
	 */
	entities: function(ctx)
	{
		return null;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Input";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Input.ModuleDescription";
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
			"class_name": "Runtime.Web.Input.ModuleDescription",
			"name": "Runtime.Web.Input.ModuleDescription",
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
Runtime.rtl.defClass(Runtime.Web.Input.ModuleDescription);
window["Runtime.Web.Input.ModuleDescription"] = Runtime.Web.Input.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Input.ModuleDescription;
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
if (typeof Runtime.Web.CRUD == 'undefined') Runtime.Web.CRUD = {};
Runtime.Web.CRUD.FieldInfo = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.CRUD.FieldInfo.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.CRUD.FieldInfo.prototype.constructor = Runtime.Web.CRUD.FieldInfo;
Object.assign(Runtime.Web.CRUD.FieldInfo.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.api_name = "";
		this.comment = "";
		this.label = "";
		this.class_name = "";
		this.class_name_table = "";
		this.class_name_form = "";
		this.class_name_filter = "";
		this.class_name_extends = null;
		this.class_settings = null;
		this.dbtype = "";
		this.auto_increment = false;
		this.primary = false;
		this.required = false;
		this.readonly = false;
		this.virtual = false;
		this.can_create = true;
		this.can_update = true;
		this.group = "default";
		this.default_value = null;
		this.foreign = Runtime.Dict.from({});
		this.params = Runtime.Dict.from({});
		this.table = Runtime.Dict.from({});
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.CRUD.FieldInfo)
		{
			this.api_name = o.api_name;
			this.comment = o.comment;
			this.label = o.label;
			this.class_name = o.class_name;
			this.class_name_table = o.class_name_table;
			this.class_name_form = o.class_name_form;
			this.class_name_filter = o.class_name_filter;
			this.class_name_extends = o.class_name_extends;
			this.class_settings = o.class_settings;
			this.dbtype = o.dbtype;
			this.auto_increment = o.auto_increment;
			this.primary = o.primary;
			this.required = o.required;
			this.readonly = o.readonly;
			this.virtual = o.virtual;
			this.can_create = o.can_create;
			this.can_update = o.can_update;
			this.group = o.group;
			this.default_value = o.default_value;
			this.foreign = o.foreign;
			this.params = o.params;
			this.table = o.table;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "api_name")this.api_name = v;
		else if (k == "comment")this.comment = v;
		else if (k == "label")this.label = v;
		else if (k == "class_name")this.class_name = v;
		else if (k == "class_name_table")this.class_name_table = v;
		else if (k == "class_name_form")this.class_name_form = v;
		else if (k == "class_name_filter")this.class_name_filter = v;
		else if (k == "class_name_extends")this.class_name_extends = v;
		else if (k == "class_settings")this.class_settings = v;
		else if (k == "dbtype")this.dbtype = v;
		else if (k == "auto_increment")this.auto_increment = v;
		else if (k == "primary")this.primary = v;
		else if (k == "required")this.required = v;
		else if (k == "readonly")this.readonly = v;
		else if (k == "virtual")this.virtual = v;
		else if (k == "can_create")this.can_create = v;
		else if (k == "can_update")this.can_update = v;
		else if (k == "group")this.group = v;
		else if (k == "default_value")this.default_value = v;
		else if (k == "foreign")this.foreign = v;
		else if (k == "params")this.params = v;
		else if (k == "table")this.table = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "api_name")return this.api_name;
		else if (k == "comment")return this.comment;
		else if (k == "label")return this.label;
		else if (k == "class_name")return this.class_name;
		else if (k == "class_name_table")return this.class_name_table;
		else if (k == "class_name_form")return this.class_name_form;
		else if (k == "class_name_filter")return this.class_name_filter;
		else if (k == "class_name_extends")return this.class_name_extends;
		else if (k == "class_settings")return this.class_settings;
		else if (k == "dbtype")return this.dbtype;
		else if (k == "auto_increment")return this.auto_increment;
		else if (k == "primary")return this.primary;
		else if (k == "required")return this.required;
		else if (k == "readonly")return this.readonly;
		else if (k == "virtual")return this.virtual;
		else if (k == "can_create")return this.can_create;
		else if (k == "can_update")return this.can_update;
		else if (k == "group")return this.group;
		else if (k == "default_value")return this.default_value;
		else if (k == "foreign")return this.foreign;
		else if (k == "params")return this.params;
		else if (k == "table")return this.table;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.CRUD.FieldInfo";
	},
});
Object.assign(Runtime.Web.CRUD.FieldInfo, Runtime.BaseStruct);
Object.assign(Runtime.Web.CRUD.FieldInfo,
{
	/**
	 * Returns FieldInfo from Collection
	 */
	getFieldInfo: function(ctx, settings, field_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.Web.CRUD.FieldInfo.getFieldInfo", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = settings.findItem(ctx, Runtime.lib.equalAttr(ctx, "api_name", field_name));
		Runtime.rtl._memorizeSave("Runtime.Web.CRUD.FieldInfo.getFieldInfo", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Filter form
	 */
	filterForm: function(ctx, settings, form_type, field_name)
	{
		var info = this.getFieldInfo(ctx, settings, field_name);
		if (form_type == "create" && info.can_create == false)
		{
			return false;
		}
		if (form_type == "update" && info.can_update == false)
		{
			return false;
		}
		return true;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.CRUD";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.CRUD.FieldInfo";
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
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": "Runtime.Web.CRUD.FieldInfo",
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
			a.push("api_name");
			a.push("comment");
			a.push("label");
			a.push("class_name");
			a.push("class_name_table");
			a.push("class_name_form");
			a.push("class_name_filter");
			a.push("class_name_extends");
			a.push("class_settings");
			a.push("dbtype");
			a.push("auto_increment");
			a.push("primary");
			a.push("required");
			a.push("readonly");
			a.push("virtual");
			a.push("can_create");
			a.push("can_update");
			a.push("group");
			a.push("default_value");
			a.push("foreign");
			a.push("params");
			a.push("table");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "api_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "comment") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "label") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_name_table") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_name_form") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_name_filter") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_name_extends") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_settings") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "dbtype") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "auto_increment") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "primary") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "required") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "readonly") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "virtual") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "can_create") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "can_update") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "group") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "default_value") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "foreign") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "table") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FieldInfo",
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
Runtime.rtl.defClass(Runtime.Web.CRUD.FieldInfo);
window["Runtime.Web.CRUD.FieldInfo"] = Runtime.Web.CRUD.FieldInfo;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.CRUD.FieldInfo;
"use strict;"
/*
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
if (typeof Runtime.Web.CRUD == 'undefined') Runtime.Web.CRUD = {};
Runtime.Web.CRUD.Form = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.CRUD.Form.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.CRUD.Form.prototype.constructor = Runtime.Web.CRUD.Form;
Object.assign(Runtime.Web.CRUD.Form.prototype,
{
	/**
 * On item change
 */
	onItemChange: async function(ctx, msg)
	{
		var model = this.model(ctx);
		var params = msg.sender.params;
		var field_name = Runtime.rtl.get(ctx, params, "name");
		var value = msg.data.value;
		var model_path = Runtime.rtl.get(ctx, params, "model-path");
		var event = new Runtime.Web.CRUD.FormEvent(ctx, Runtime.Dict.from({"event":Runtime.Web.CRUD.FormEvent.ACTION_CHANGE,"item":model.item,"field_name":field_name,"old_value":Runtime.rtl.attr(ctx, model, model_path, null),"value":value}));
		this.update(ctx, "setAttr", model_path, value);
		await this.signal(ctx, event);
	},
	/**
 * On mouse click
 */
	onButtonClick: async function(ctx, msg)
	{
		var model = this.model(ctx);
		var event = new Runtime.Web.CRUD.FormEvent(ctx, Runtime.Dict.from({"item":model.item}));
		var data_action = msg.sender.params.get(ctx, "data-action");
		if (data_action == "create")
		{
			event = Runtime.rtl.setAttr(ctx, event, Runtime.Collection.from(["event"]), Runtime.Web.CRUD.FormEvent.ACTION_CREATE);
			await this.signal(ctx, event);
		}
		else if (data_action == "update")
		{
			event = Runtime.rtl.setAttr(ctx, event, Runtime.Collection.from(["event"]), Runtime.Web.CRUD.FormEvent.ACTION_UPDATE);
			await this.signal(ctx, event);
		}
		else if (data_action == "cancel")
		{
			event = Runtime.rtl.setAttr(ctx, event, Runtime.Collection.from(["event"]), Runtime.Web.CRUD.FormEvent.ACTION_CANCEL);
			await this.signal(ctx, event);
		}
		else
		{
			event = Runtime.rtl.setAttr(ctx, event, Runtime.Collection.from(["event"]), data_action);
			await this.signal(ctx, event);
		}
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.CRUD.Form)
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
		return "Runtime.Web.CRUD.Form";
	},
});
Object.assign(Runtime.Web.CRUD.Form, Runtime.Web.Component);
Object.assign(Runtime.Web.CRUD.Form,
{
	css: function(ctx, vars)
	{
		return ".form.h-8017{" + Runtime.rtl.toStr("}.form_row.h-8017{") + Runtime.rtl.toStr("padding-bottom: 15px;") + Runtime.rtl.toStr("}.form_row.h-8017:last-child{") + Runtime.rtl.toStr("padding-bottom: 0px;") + Runtime.rtl.toStr("}.form_label.h-8017{") + Runtime.rtl.toStr("font-weight: bold;padding-bottom: 5px;") + Runtime.rtl.toStr("}.form_value.h-8017{") + Runtime.rtl.toStr("}.form_value.h-8017 input, .form_value.h-8017 textarea, .form_value.h-8017 select{") + Runtime.rtl.toStr("width: 100%;padding: 5px 10px;") + Runtime.rtl.toStr("}.form_value.h-8017 textarea{") + Runtime.rtl.toStr("height: 400px;") + Runtime.rtl.toStr("}.form_buttons.h-8017{") + Runtime.rtl.toStr("text-align: center;margin-top: 10px;") + Runtime.rtl.toStr("}.form_buttons.h-8017 .button.h-de49{") + Runtime.rtl.toStr("margin-left: 10px;margin-right: 10px;") + Runtime.rtl.toStr("}.form_error.h-8017{") + Runtime.rtl.toStr("text-align: center;padding-top: 5px;color: red;") + Runtime.rtl.toStr("}.form_result.h-8017{") + Runtime.rtl.toStr("padding-top: 10px;text-align: center;") + Runtime.rtl.toStr("}.form_result.h-8017.success{") + Runtime.rtl.toStr("color: green;") + Runtime.rtl.toStr("}.form_result.h-8017.error{") + Runtime.rtl.toStr("color: red;") + Runtime.rtl.toStr("}");
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Element 'div.form' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["form", this.getCssHash(ctx)].join(" "),"@key":"form","@elem_name":"form"}});
			
			if (model != null)
			{
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.Collection.from([this.renderHeader(ctx, layout, model, params, content),this.renderContent(ctx, layout, model, params, content),this.renderButtons(ctx, layout, model, params, content),this.renderResult(ctx, layout, model, params, content),this.renderFooter(ctx, layout, model, params, content)])});
			}
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	renderHeader: function(ctx, layout, model, params, content)
	{
		return ;
	},
	renderContent: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Text */
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": this.renderRows(ctx, layout, model, params, content)});
			
			return __control_childs;
		};
	},
	renderRows: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Element 'div.form_rows' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["form_rows", this.getCssHash(ctx)].join(" "),"@key":"rows","@elem_name":"form_rows"}});
			
			var fields = Runtime.rtl.get(ctx, params, "fields");
			
			for (var i = 0;i < fields.count(ctx);i++)
			{
				var field_name = Runtime.rtl.get(ctx, fields, i);
				
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": this.renderRow(ctx, layout, model, params, field_name)});
			}
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	renderRow: function(ctx, layout, model, params, field_name)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var struct = Runtime.rtl.get(ctx, params, "struct");
			
			var field = Runtime.Web.CRUD.FieldInfo.getFieldInfo(ctx, struct, field_name);
			
			if (field != null)
			{
				/* Patch field settings */
				field = this.patchField(ctx, layout, field, model, params);
				
				var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, field, "class_name"));
				__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "string", ""));
				var class_name = __v0.value(ctx);
				
				var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, field, "class_name_form"));
				__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "string", ""));
				var class_name_form = __v0.value(ctx);
				
				var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, field, "class_settings"));
				__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Dict", Runtime.Dict.from({})));
				var class_settings = __v0.value(ctx);
				
				if (!Runtime.rtl.isEmpty(ctx, class_name_form))
				{
					class_name = class_name_form;
				}
				
				var model_path = this.getBindPath(ctx, field);
				
				/* Patch class settings */
				class_settings = this.patchSettings(ctx, layout, field, class_settings, model, params);
				
				/* Element 'div.form_row' */
				var __v0; var __v0_childs = [];
				[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["form_row", this.getCssHash(ctx)].join(" "),"@key":field_name,"@elem_name":"form_row"}});
				
				/* Element 'div.form_label' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["form_label", this.getCssHash(ctx)].join(" "),"@elem_name":"form_label"}});
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": Runtime.rtl.get(ctx, field, "label")});
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": ":"});
				RenderDriver.p(__v1, __v1_childs);
				
				/* Element 'div.form_value' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["form_value", this.getCssHash(ctx)].join(" "),"@elem_name":"form_value"}});
				
				if (!Runtime.rtl.isEmpty(ctx, class_name))
				{
					[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": class_name,"attrs": this.mergeAttrs(ctx, {"@bind":["Runtime.Web.CRUD.Form",model_path],"@event:Runtime.Web.Events.ChangeEvent":["Runtime.Web.CRUD.Form","onItemChange"],"used-by":"form","name":field_name,"field-info":field,"struct":struct,"form-item":Runtime.rtl.get(ctx, model, "item"),"model-path":model_path},class_settings), "layout": layout});
				}
				RenderDriver.p(__v1, __v1_childs);
				
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": this.renderFieldError(ctx, model, field_name)});
				RenderDriver.p(__v0, __v0_childs);
			}
			
			return __control_childs;
		};
	},
	renderFieldError: function(ctx, model, field_name)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Element 'div.form_error' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["form_error", this.getCssHash(ctx)].join(" "),"@elem_name":"form_error"}});
			
			var errors = Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, model, "fields_errors"), field_name);
			
			if (errors != null)
			{
				for (var i = 0;i < errors.count(ctx);i++)
				{
					var s = Runtime.rtl.get(ctx, errors, i);
					
					/* Element 'div.form_error_line' */
					var __v1; var __v1_childs = [];
					[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["form_error_line", this.getCssHash(ctx)].join(" "),"@elem_name":"form_error_line"}});
					
					/* Text */
					[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": s});
					RenderDriver.p(__v1, __v1_childs);
				}
			}
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	renderButtons: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var renderButtons = Runtime.rtl.get(ctx, params, "renderButtons");
			
			if (Runtime.rtl.exists(ctx, renderButtons) && Runtime.rtl.isFn(ctx, renderButtons))
			{
				/* Element 'div.form_buttons' */
				var __v0; var __v0_childs = [];
				[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["form_buttons", this.getCssHash(ctx)].join(" "),"@key":"buttons","@elem_name":"form_buttons"}});
				
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": renderButtons(ctx, layout, model, params, content)});
				RenderDriver.p(__v0, __v0_childs);
			}
			else
			{
				/* Element 'div.form_buttons' */
				var __v0; var __v0_childs = [];
				[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["form_buttons", this.getCssHash(ctx)].join(" "),"@key":"buttons","@elem_name":"form_buttons"}});
				
				if (Runtime.rtl.get(ctx, params, "action") == "add")
				{
					/* Component 'Button' */
					[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"type":"success","@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.Form","onButtonClick"],"data-action":"create"}, "layout": layout, "content": (__control) =>
					{
						var __vnull = null;
						var __control_childs = [];
						
						/* Text */
						[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Add"});
						
						return __control_childs;
					}});
					
					/* Component 'Button' */
					[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.Form","onButtonClick"],"data-action":"cancel"}, "layout": layout, "content": (__control) =>
					{
						var __vnull = null;
						var __control_childs = [];
						
						/* Text */
						[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Cancel"});
						
						return __control_childs;
					}});
				}
				
				if (Runtime.rtl.get(ctx, params, "action") == "edit")
				{
					/* Component 'Button' */
					[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"type":"success","@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.Form","onButtonClick"],"data-action":"update"}, "layout": layout, "content": (__control) =>
					{
						var __vnull = null;
						var __control_childs = [];
						
						/* Text */
						[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Update"});
						
						return __control_childs;
					}});
					
					/* Component 'Button' */
					[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.Form","onButtonClick"],"data-action":"cancel"}, "layout": layout, "content": (__control) =>
					{
						var __vnull = null;
						var __control_childs = [];
						
						/* Text */
						[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Cancel"});
						
						return __control_childs;
					}});
				}
				RenderDriver.p(__v0, __v0_childs);
			}
			
			return __control_childs;
		};
	},
	renderButton: function(ctx, layout, model, params, button_type)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			if (button_type == "create")
			{
				/* Component 'Button' */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"type":"success","@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.Form","onButtonClick"],"data-action":"create","@key":"create"}, "layout": layout, "content": (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Text */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Add"});
					
					return __control_childs;
				}});
			}
			
			if (button_type == "update")
			{
				/* Component 'Button' */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"type":"success","@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.Form","onButtonClick"],"data-action":"update","@key":"create"}, "layout": layout, "content": (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Text */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Update"});
					
					return __control_childs;
				}});
			}
			
			if (button_type == "cancel")
			{
				/* Component 'Button' */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.Form","onButtonClick"],"data-action":"cancel","@key":"cancel"}, "layout": layout, "content": (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Text */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Cancel"});
					
					return __control_childs;
				}});
			}
			
			return __control_childs;
		};
	},
	renderButtonInfo: function(ctx, layout, model, params, button_info)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Component 'Button' */
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": this.mergeAttrs(ctx, {"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.Form","onButtonClick"]},button_info), "layout": layout, "content": (__control) =>
			{
				var __vnull = null;
				var __control_childs = [];
				
				/* Text */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": Runtime.rtl.get(ctx, button_info, "value")});
				
				return __control_childs;
			}});
			
			return __control_childs;
		};
	},
	renderResult: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Element 'div.form_row.form_result' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["form_row form_result", this.getResultClass(ctx, model), this.getCssHash(ctx)].join(" "),"@key":"result","@elem_name":"form_row"}});
			
			/* Text */
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": model.message});
			
			/* Text */
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": model.success_message});
			
			/* Text */
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": model.error_message});
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	renderFooter: function(ctx, layout, model, params, content)
	{
		return ;
	},
	/**
 * Patch field
 */
	patchField: function(ctx, layout, field, model, params)
	{
		return field;
	},
	/**
 * Patch class settings
 */
	patchSettings: function(ctx, layout, field, class_settings, model, params)
	{
		return class_settings;
	},
	/**
 * Returns result class
 */
	getResultClass: function(ctx, model)
	{
		if (model.success_message != "")
		{
			return "success";
		}
		if (model.error_message != "")
		{
			return "error";
		}
		return "";
	},
	/**
 * Returns bind path
 */
	getBindPath: function(ctx, field)
	{
		return Runtime.Collection.from(["item",Runtime.rtl.get(ctx, field, "api_name")]);
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.Input.Button"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.CRUD";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.CRUD.Form";
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
			"class_name": "Runtime.Web.CRUD.Form",
			"name": "Runtime.Web.CRUD.Form",
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
Runtime.rtl.defClass(Runtime.Web.CRUD.Form);
window["Runtime.Web.CRUD.Form"] = Runtime.Web.CRUD.Form;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.CRUD.Form;
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
if (typeof Runtime.Web.CRUD == 'undefined') Runtime.Web.CRUD = {};
Runtime.Web.CRUD.FormEvent = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.CRUD.FormEvent.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.CRUD.FormEvent.prototype.constructor = Runtime.Web.CRUD.FormEvent;
Object.assign(Runtime.Web.CRUD.FormEvent.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.event = "";
		this.item = null;
		this.field_name = "";
		this.value = null;
		this.old_value = null;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.CRUD.FormEvent)
		{
			this.event = o.event;
			this.item = o.item;
			this.field_name = o.field_name;
			this.value = o.value;
			this.old_value = o.old_value;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "event")this.event = v;
		else if (k == "item")this.item = v;
		else if (k == "field_name")this.field_name = v;
		else if (k == "value")this.value = v;
		else if (k == "old_value")this.old_value = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "event")return this.event;
		else if (k == "item")return this.item;
		else if (k == "field_name")return this.field_name;
		else if (k == "value")return this.value;
		else if (k == "old_value")return this.old_value;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.CRUD.FormEvent";
	},
});
Object.assign(Runtime.Web.CRUD.FormEvent, Runtime.BaseStruct);
Object.assign(Runtime.Web.CRUD.FormEvent,
{
	ACTION_CREATE: "create",
	ACTION_UPDATE: "update",
	ACTION_CANCEL: "cancel",
	ACTION_CHANGE: "change",
	ACTION_SEARCH: "search",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.CRUD";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.CRUD.FormEvent";
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
			"class_name": "Runtime.Web.CRUD.FormEvent",
			"name": "Runtime.Web.CRUD.FormEvent",
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
			a.push("event");
			a.push("item");
			a.push("field_name");
			a.push("value");
			a.push("old_value");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "ACTION_CREATE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ACTION_UPDATE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ACTION_CANCEL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ACTION_CHANGE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ACTION_SEARCH") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "event") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "item") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "field_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "old_value") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormEvent",
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
Runtime.rtl.defClass(Runtime.Web.CRUD.FormEvent);
window["Runtime.Web.CRUD.FormEvent"] = Runtime.Web.CRUD.FormEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.CRUD.FormEvent;
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
if (typeof Runtime.Web.CRUD == 'undefined') Runtime.Web.CRUD = {};
Runtime.Web.CRUD.FormModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.CRUD.FormModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.CRUD.FormModel.prototype.constructor = Runtime.Web.CRUD.FormModel;
Object.assign(Runtime.Web.CRUD.FormModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.fields_errors = null;
		this.item = null;
		this.old_item = null;
		this.message = "";
		this.success_message = "";
		this.error_message = "";
		this.params = Runtime.Dict.from({});
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.CRUD.FormModel)
		{
			this.fields_errors = o.fields_errors;
			this.item = o.item;
			this.old_item = o.old_item;
			this.message = o.message;
			this.success_message = o.success_message;
			this.error_message = o.error_message;
			this.params = o.params;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "fields_errors")this.fields_errors = v;
		else if (k == "item")this.item = v;
		else if (k == "old_item")this.old_item = v;
		else if (k == "message")this.message = v;
		else if (k == "success_message")this.success_message = v;
		else if (k == "error_message")this.error_message = v;
		else if (k == "params")this.params = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "fields_errors")return this.fields_errors;
		else if (k == "item")return this.item;
		else if (k == "old_item")return this.old_item;
		else if (k == "message")return this.message;
		else if (k == "success_message")return this.success_message;
		else if (k == "error_message")return this.error_message;
		else if (k == "params")return this.params;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.CRUD.FormModel";
	},
});
Object.assign(Runtime.Web.CRUD.FormModel, Runtime.BaseStruct);
Object.assign(Runtime.Web.CRUD.FormModel,
{
	/**
	 * Set item
	 */
	setItem: function(ctx, model, item)
	{
		return model.copy(ctx, Runtime.Dict.from({"item":item,"old_item":item}));
	},
	/**
	 * Set wait message
	 */
	setWaitMessage: function(ctx, model, message)
	{
		if (message == undefined) message = "";
		return model.copy(ctx, Runtime.Dict.from({"message":(message != message) ? (message) : (ctx.translate(ctx, "Runtime.Web", "Please wait")),"success_message":message,"error_message":""}));
	},
	/**
	 * Message
	 */
	setMessage: function(ctx, model, message)
	{
		return model.copy(ctx, Runtime.Dict.from({"message":"","success_message":message,"error_message":""}));
	},
	/**
	 * Set answer
	 */
	setAnswer: function(ctx, model, answer)
	{
		model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["fields_errors"]), null);
		if (answer.isSuccess(ctx))
		{
			return this.setSuccess(ctx, model, answer.success_message);
		}
		model = this.setError(ctx, model, answer.error_message);
		/* Set field errors */
		if (answer.code == Runtime.rtl.ERROR_VALIDATION)
		{
			model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["fields_errors"]), Runtime.rtl.get(ctx, answer.response, "fields_errors"));
		}
		return model;
	},
	/**
	 * Success
	 */
	setSuccess: function(ctx, model, message)
	{
		return model.copy(ctx, Runtime.Dict.from({"message":"","success_message":message,"error_message":""}));
	},
	/**
	 * Error
	 */
	setError: function(ctx, model, message)
	{
		return model.copy(ctx, Runtime.Dict.from({"message":"","success_message":"","error_message":message}));
	},
	/**
	 * Clear
	 */
	clear: function(ctx, model)
	{
		return new Runtime.Web.CRUD.FormModel(ctx, Runtime.Dict.from({"item":new Runtime.Dict(ctx),"fields_errors":null,"message":"","success_message":"","error_message":""}));
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.CRUD";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.CRUD.FormModel";
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
			"class_name": "Runtime.Web.CRUD.FormModel",
			"name": "Runtime.Web.CRUD.FormModel",
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
			a.push("fields_errors");
			a.push("item");
			a.push("old_item");
			a.push("message");
			a.push("success_message");
			a.push("error_message");
			a.push("params");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "fields_errors") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "item") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "old_item") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "message") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "success_message") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_message") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.FormModel",
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
Runtime.rtl.defClass(Runtime.Web.CRUD.FormModel);
window["Runtime.Web.CRUD.FormModel"] = Runtime.Web.CRUD.FormModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.CRUD.FormModel;
"use strict;"
/*
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
if (typeof Runtime.Web.CRUD == 'undefined') Runtime.Web.CRUD = {};
Runtime.Web.CRUD.Pagination = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.CRUD.Pagination.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.CRUD.Pagination.prototype.constructor = Runtime.Web.CRUD.Pagination;
Object.assign(Runtime.Web.CRUD.Pagination.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.CRUD.Pagination)
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
		return "Runtime.Web.CRUD.Pagination";
	},
});
Object.assign(Runtime.Web.CRUD.Pagination, Runtime.Web.Component);
Object.assign(Runtime.Web.CRUD.Pagination,
{
	css: function(ctx, vars)
	{
		return ".pagination.h-cd5b{" + Runtime.rtl.toStr("text-align: center;padding: 10px 0;") + Runtime.rtl.toStr("}.pagination.h-cd5b ul{") + Runtime.rtl.toStr("padding: 0;margin: 0;") + Runtime.rtl.toStr("}.pagination.h-cd5b li{") + Runtime.rtl.toStr("display: inline-block;vertical-align: top;list-style: none;margin-left: 5px;margin-right: 5px;") + Runtime.rtl.toStr("}.pagination.h-cd5b li a, .pagination.h-cd5b li a:hover, .pagination.h-cd5b li span{") + Runtime.rtl.toStr("display: table-cell;vertical-align: middle;background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "text"])) + Runtime.rtl.toStr(";text-align: center;width: 30px;height: 30px;font-size: 14px;text-decoration: none;")) + Runtime.rtl.toStr("}.pagination.h-cd5b li a:hover{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "hover-background"])) + Runtime.rtl.toStr(";color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "hover-text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.pagination.h-cd5b li.active a, .pagination.h-cd5b li.active a:hover{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "active", "background"])) + Runtime.rtl.toStr(";border: 1px ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "active", "border"])) + Runtime.rtl.toStr(" solid;color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "active", "text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}");
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var min = (ctx, a, b) => 
			{
				return (a < b) ? (a) : (b);
			};
			
			var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, params, "page"));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "int", 0));
			var page = __v0.value(ctx);
			
			var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, params, "pages"));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "int", 0));
			var pages = __v0.value(ctx);
			
			var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, params, "delta"));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "int", 5));
			var delta = __v0.value(ctx);
			
			var start = 2;
			
			var end = min(ctx, pages - 1, page + delta);
			
			var active = false;
			
			if (pages > 1)
			{
				/* Element 'nav.pagination' */
				var __v0; var __v0_childs = [];
				[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "nav","attrs": {"class":["pagination", this.getCssHash(ctx)].join(" "),"@elem_name":"pagination"}});
				
				/* Element 'ul' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "ul","attrs": {}});
				
				active = false;
				
				if (page == 1)
				{
					active = true;
				}
				
				/* Element 'li.btn.page.first' */
				var __v2; var __v2_childs = [];
				[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "li","attrs": {"class":["btn page first", ((active) ? ("active") : ("")), this.getCssHash(ctx)].join(" "),"@key":"first","@elem_name":"btn"}});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": "                    "});
				
				/* Element 'a' */
				var __v3; var __v3_childs = [];
				[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "a","attrs": {"href":Runtime.rs.url_get_add(ctx, layout.uri, "page", 1)}});
				
				/* Text */
				[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": "1"});
				RenderDriver.p(__v3, __v3_childs);
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": "                "});
				RenderDriver.p(__v2, __v2_childs);
				
				if (pages - delta > 1)
				{
					/* Element 'li.btn.skip' */
					var __v2; var __v2_childs = [];
					[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "li","attrs": {"class":["btn skip", this.getCssHash(ctx)].join(" "),"@key":"skip_before","@elem_name":"btn"}});
					
					/* Element 'span' */
					var __v3; var __v3_childs = [];
					[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "span","attrs": {}});
					
					/* Text */
					[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": "..."});
					RenderDriver.p(__v3, __v3_childs);
					RenderDriver.p(__v2, __v2_childs);
				}
				
				if (start <= end)
				{
					for (var i = start;i <= end;i++)
					{
						active = false;
						
						if (page == i)
						{
							active = true;
						}
						
						/* Element 'li.btn.page' */
						var __v2; var __v2_childs = [];
						[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "li","attrs": {"class":["btn page", ((active) ? ("active") : ("")), this.getCssHash(ctx)].join(" "),"@key":"page" + Runtime.rtl.toStr(i),"@elem_name":"btn"}});
						
						/* Element 'a' */
						var __v3; var __v3_childs = [];
						[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "a","attrs": {"href":Runtime.rs.url_get_add(ctx, layout.uri, "page", i)}});
						
						/* Text */
						[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": i});
						RenderDriver.p(__v3, __v3_childs);
						RenderDriver.p(__v2, __v2_childs);
					}
				}
				
				if (end < pages - 1)
				{
					/* Element 'li.btn.skip' */
					var __v2; var __v2_childs = [];
					[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "li","attrs": {"class":["btn skip", this.getCssHash(ctx)].join(" "),"@key":"skip_after","@elem_name":"btn"}});
					
					/* Element 'span' */
					var __v3; var __v3_childs = [];
					[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "span","attrs": {}});
					
					/* Text */
					[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": "..."});
					RenderDriver.p(__v3, __v3_childs);
					RenderDriver.p(__v2, __v2_childs);
				}
				
				if (pages >= 2)
				{
					active = false;
					
					if (page == pages)
					{
						active = true;
					}
					
					/* Element 'li.btn.page.last' */
					var __v2; var __v2_childs = [];
					[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "li","attrs": {"class":["btn page last", ((active) ? ("active") : ("")), this.getCssHash(ctx)].join(" "),"@key":"last","@elem_name":"btn"}});
					
					/* Element 'a' */
					var __v3; var __v3_childs = [];
					[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "a","attrs": {"href":Runtime.rs.url_get_add(ctx, layout.uri, "page", pages)}});
					
					/* Text */
					[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": pages});
					RenderDriver.p(__v3, __v3_childs);
					RenderDriver.p(__v2, __v2_childs);
				}
				RenderDriver.p(__v1, __v1_childs);
				RenderDriver.p(__v0, __v0_childs);
			}
			
			return __control_childs;
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.CRUD";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.CRUD.Pagination";
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
			"class_name": "Runtime.Web.CRUD.Pagination",
			"name": "Runtime.Web.CRUD.Pagination",
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
Runtime.rtl.defClass(Runtime.Web.CRUD.Pagination);
window["Runtime.Web.CRUD.Pagination"] = Runtime.Web.CRUD.Pagination;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.CRUD.Pagination;
"use strict;"
/*
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
if (typeof Runtime.Web.CRUD == 'undefined') Runtime.Web.CRUD = {};
Runtime.Web.CRUD.Table = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.CRUD.Table.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.CRUD.Table.prototype.constructor = Runtime.Web.CRUD.Table;
Object.assign(Runtime.Web.CRUD.Table.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.CRUD.Table)
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
		return "Runtime.Web.CRUD.Table";
	},
});
Object.assign(Runtime.Web.CRUD.Table, Runtime.Web.Component);
Object.assign(Runtime.Web.CRUD.Table,
{
	css: function(ctx, vars)
	{
		return ".table.h-e4c9{" + Runtime.rtl.toStr("border-collapse: collapse;border: 1px " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "border"])) + Runtime.rtl.toStr(" solid;margin-top: 10px;")) + Runtime.rtl.toStr("}.td.h-e4c9, .th.h-e4c9{") + Runtime.rtl.toStr("border: 1px " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "border"])) + Runtime.rtl.toStr(" solid;padding: 5px;")) + Runtime.rtl.toStr("}.row.h-e4c9:hover td{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "hover-background"])) + Runtime.rtl.toStr(";color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "hover-text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.td-edit-buttons.h-e4c9{") + Runtime.rtl.toStr("margin-left: -2px;margin-right: -2px;") + Runtime.rtl.toStr("}.td-edit-buttons.h-e4c9 .button{") + Runtime.rtl.toStr("margin-left: 2px;margin-right: 2px;") + Runtime.rtl.toStr("}");
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Element 'table.table' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "table","attrs": {"class":["table", this.getCssHash(ctx)].join(" "),"@elem_name":"table"}});
			
			/* Text */
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": this.renderHeader(ctx, layout, model, params, content)});
			
			/* Text */
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": this.renderRows(ctx, layout, model, params, content)});
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	renderRows: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			if (model.rows != null)
			{
				for (var i = 0;i < model.rows.count(ctx);i++)
				{
					/* Text */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": this.renderRow(ctx, layout, model, params, i)});
				}
			}
			
			return __control_childs;
		};
	},
	renderHeader: function(ctx, layout, model, params)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var fields = Runtime.rtl.get(ctx, params, "fields");
			
			/* Element 'tr.header' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "tr","attrs": {"class":["header", this.getCssHash(ctx)].join(" "),"@elem_name":"header"}});
			
			for (var i = 0;i < fields.count(ctx);i++)
			{
				var field_name = Runtime.rtl.get(ctx, fields, i);
				
				var field = Runtime.Web.CRUD.FieldInfo.getFieldInfo(ctx, Runtime.rtl.get(ctx, params, "struct"), field_name);
				
				/* Element 'th.th' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "th","attrs": {"data-name":field_name,"class":["th", "th-" + Runtime.rtl.toStr(field_name), this.getCssHash(ctx)].join(" "),"@key":"th-" + Runtime.rtl.toStr(field_name),"@elem_name":"th"}});
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": Runtime.rtl.get(ctx, field, "label")});
				RenderDriver.p(__v1, __v1_childs);
			}
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	renderRow: function(ctx, layout, model, params, index)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var row = Runtime.rtl.get(ctx, model.rows, index);
			
			var fields = Runtime.rtl.get(ctx, params, "fields");
			
			/* Element 'tr.row' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "tr","attrs": {"data-index":index,"class":["row", this.getCssHash(ctx)].join(" "),"@key":"tr-" + Runtime.rtl.toStr(index),"@elem_name":"row"}});
			
			for (var i = 0;i < fields.count(ctx);i++)
			{
				var field_name = Runtime.rtl.get(ctx, fields, i);
				
				var field = Runtime.Web.CRUD.FieldInfo.getFieldInfo(ctx, Runtime.rtl.get(ctx, params, "struct"), field_name);
				
				var __v1 = new Runtime.Monad(ctx, Runtime.rtl.attr(ctx, field, ["table", "text-align"]));
				__v1 = __v1.monad(ctx, Runtime.rtl.m_to(ctx, "string", "left"));
				var text_align = __v1.value(ctx);
				
				/* Element 'td.td' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "td","attrs": {"data-name":field_name,"style":((text_align != "left") ? ("text-align: " + Runtime.rtl.toStr(text_align) + Runtime.rtl.toStr(";")) : ("")),"class":["td", "td-" + Runtime.rtl.toStr(field_name), this.getCssHash(ctx)].join(" "),"@key":"td-" + Runtime.rtl.toStr(field_name),"@elem_name":"td"}});
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": this.renderCell(ctx, layout, model, params, row, field_name, index)});
				RenderDriver.p(__v1, __v1_childs);
			}
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	renderCell: function(ctx, layout, model, params, row, field_name, index)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var row = Runtime.rtl.get(ctx, model.rows, index);
			
			var struct = Runtime.rtl.get(ctx, params, "struct");
			
			var field = Runtime.Web.CRUD.FieldInfo.getFieldInfo(ctx, Runtime.rtl.get(ctx, params, "struct"), field_name);
			
			if (field != null)
			{
				/* Patch field settings */
				field = this.patchField(ctx, layout, field, model, params);
				
				var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, field, "class_name"));
				__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "string", ""));
				var class_name = __v0.value(ctx);
				
				var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, field, "class_name_table"));
				__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "string", ""));
				var class_name_table = __v0.value(ctx);
				
				var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, field, "class_settings"));
				__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Dict", Runtime.Dict.from({})));
				var class_settings = __v0.value(ctx);
				
				if (!Runtime.rtl.isEmpty(ctx, class_name_table))
				{
					class_name = class_name_table;
				}
				
				/* Patch class settings */
				class_settings = this.patchSettings(ctx, layout, field, class_settings, model, params);
				
				if (!Runtime.rtl.isEmpty(ctx, class_name))
				{
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": class_name,"attrs": this.mergeAttrs(ctx, {"@bind":["Runtime.Web.CRUD.Table",Runtime.Collection.from(["rows",index,field_name])],"used-by":"table","struct":struct,"name":field_name,"field-info":field,"row-index":index,"row-data":row,"table-model":model,"@key":field_name},class_settings), "layout": layout});
				}
			}
			
			return __control_childs;
		};
	},
	/**
 * Patch field
 */
	patchField: function(ctx, layout, field, model, params)
	{
		return field;
	},
	/**
 * Patch class settings
 */
	patchSettings: function(ctx, layout, field, class_settings, model, params)
	{
		return class_settings;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.CRUD";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.CRUD.Table";
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
			"class_name": "Runtime.Web.CRUD.Table",
			"name": "Runtime.Web.CRUD.Table",
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
Runtime.rtl.defClass(Runtime.Web.CRUD.Table);
window["Runtime.Web.CRUD.Table"] = Runtime.Web.CRUD.Table;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.CRUD.Table;
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
if (typeof Runtime.Web.CRUD == 'undefined') Runtime.Web.CRUD = {};
Runtime.Web.CRUD.TableModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.CRUD.TableModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.CRUD.TableModel.prototype.constructor = Runtime.Web.CRUD.TableModel;
Object.assign(Runtime.Web.CRUD.TableModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.rows = null;
		this.page = 0;
		this.pages = 0;
		this.delta = 5;
		this.limit = 100;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.CRUD.TableModel)
		{
			this.rows = o.rows;
			this.page = o.page;
			this.pages = o.pages;
			this.delta = o.delta;
			this.limit = o.limit;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "rows")this.rows = v;
		else if (k == "page")this.page = v;
		else if (k == "pages")this.pages = v;
		else if (k == "delta")this.delta = v;
		else if (k == "limit")this.limit = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "rows")return this.rows;
		else if (k == "page")return this.page;
		else if (k == "pages")return this.pages;
		else if (k == "delta")return this.delta;
		else if (k == "limit")return this.limit;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.CRUD.TableModel";
	},
});
Object.assign(Runtime.Web.CRUD.TableModel, Runtime.BaseStruct);
Object.assign(Runtime.Web.CRUD.TableModel,
{
	/**
	 * Returns position of item
	 */
	findPos: function(ctx, model, find)
	{
		var keys = find.keys(ctx);
		return model.rows.find(ctx, (ctx, row) => 
		{
			for (var i = 0;i < keys.count(ctx);i++)
			{
				var key = Runtime.rtl.get(ctx, keys, i);
				var value1 = Runtime.rtl.get(ctx, find, key);
				var value2 = Runtime.rtl.get(ctx, row, key);
				if (value1 != value2)
				{
					return false;
				}
			}
			return true;
		});
	},
	/**
	 * Find first item
	 */
	getFirstItem: function(ctx, model, find)
	{
		if (model.rows == null)
		{
			return null;
		}
		var pos = this.findPos(ctx, model, find);
		return model.rows.get(ctx, pos, null);
	},
	/**
	 * Add item
	 */
	addItem: function(ctx, model, item)
	{
		if (model.rows == null)
		{
			model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["rows"]), Runtime.Collection.from([]));
		}
		model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["rows"]), model.rows.pushIm(ctx, item));
		return model;
	},
	/**
	 * Prepend item
	 */
	prependItem: function(ctx, model, item)
	{
		if (model.rows == null)
		{
			model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["rows"]), Runtime.Collection.from([]));
		}
		model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["rows"]), model.rows.prependIm(ctx, item));
		return model;
	},
	/**
	 * Set item
	 */
	setItem: function(ctx, model, find, item)
	{
		if (model.rows == null)
		{
			model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["rows"]), Runtime.Collection.from([]));
		}
		var pos = this.findPos(ctx, model, find);
		if (pos != -1)
		{
			model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["rows"]), model.rows.setIm(ctx, pos, item));
		}
		return model;
	},
	/**
	 * Remove item by id
	 */
	removeItem: function(ctx, model, find)
	{
		if (model.rows == null)
		{
			return model;
		}
		var pos = this.findPos(ctx, model, find);
		if (pos != -1)
		{
			model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["rows"]), model.rows.removeIm(ctx, pos));
		}
		return model;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.CRUD";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.CRUD.TableModel";
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
			"class_name": "Runtime.Web.CRUD.TableModel",
			"name": "Runtime.Web.CRUD.TableModel",
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
			a.push("rows");
			a.push("page");
			a.push("pages");
			a.push("delta");
			a.push("limit");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "rows") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.TableModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "page") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.TableModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pages") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.TableModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "delta") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.TableModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "limit") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.TableModel",
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
Runtime.rtl.defClass(Runtime.Web.CRUD.TableModel);
window["Runtime.Web.CRUD.TableModel"] = Runtime.Web.CRUD.TableModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.CRUD.TableModel;
"use strict;"
/*
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
if (typeof Runtime.Web.CRUD == 'undefined') Runtime.Web.CRUD = {};
Runtime.Web.CRUD.CrudFilter = function(ctx)
{
	Runtime.Web.CRUD.Form.apply(this, arguments);
};
Runtime.Web.CRUD.CrudFilter.prototype = Object.create(Runtime.Web.CRUD.Form.prototype);
Runtime.Web.CRUD.CrudFilter.prototype.constructor = Runtime.Web.CRUD.CrudFilter;
Object.assign(Runtime.Web.CRUD.CrudFilter.prototype,
{
	/**
 * On mouse click
 */
	onSearchButtonClick: async function(ctx, msg)
	{
		var model = this.model(ctx);
		var event = new Runtime.Web.CRUD.FormEvent(ctx, Runtime.Dict.from({"event":Runtime.Web.CRUD.FormEvent.ACTION_SEARCH,"item":model.item}));
		await this.signal(ctx, event);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.CRUD.CrudFilter)
		{
		}
		Runtime.Web.CRUD.Form.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.CRUD.Form.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.CRUD.Form.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.CRUD.CrudFilter";
	},
});
Object.assign(Runtime.Web.CRUD.CrudFilter, Runtime.Web.CRUD.Form);
Object.assign(Runtime.Web.CRUD.CrudFilter,
{
	css: function(ctx, vars)
	{
		return ".form.h-95b5{" + Runtime.rtl.toStr("width: 300px;margin-top: 10px;") + Runtime.rtl.toStr("}.form_title.h-95b5{") + Runtime.rtl.toStr("text-align: center;font-weight: bold;padding-bottom: 10px;") + Runtime.rtl.toStr("}.form_buttons.h-95b5{") + Runtime.rtl.toStr("text-align: center;margin-top: 10px;") + Runtime.rtl.toStr("}.form_error.h-95b5{") + Runtime.rtl.toStr("padding-top: 0px;") + Runtime.rtl.toStr("}");
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Element 'div.form.filter' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["form filter", this.getCssHash(ctx)].join(" "),"@key":"form","@elem_name":"form"}});
			
			if (model != null)
			{
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.Collection.from([this.renderHeader(ctx, layout, model, params, content),this.renderContent(ctx, layout, model, params, content),this.renderButtons(ctx, layout, model, params, content)])});
			}
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	renderHeader: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Element 'div.form_title' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["form_title", this.getCssHash(ctx)].join(" "),"@elem_name":"form_title"}});
			
			/* Text */
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": ctx.translate(ctx, "Runtime.Web.CRUD", "Filter")});
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	renderFieldError: function(ctx, model, field_name)
	{
		return ;
	},
	renderButtons: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Element 'div.form_buttons' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["form_buttons", this.getCssHash(ctx)].join(" "),"@elem_name":"form_buttons"}});
			
			/* Component 'Button' */
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.CrudFilter","onSearchButtonClick"]}, "layout": layout, "content": (__control) =>
			{
				var __vnull = null;
				var __control_childs = [];
				
				/* Text */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": ctx.translate(ctx, "Runtime.Web.CRUD", "Search")});
				
				return __control_childs;
			}});
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	/**
 * Patch class settings
 */
	patchSettings: function(ctx, layout, field, class_settings, model, params)
	{
		var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, class_settings, "show_select_value_filter"));
		__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "bool", false));
		var show_select_value_filter = __v0.value(ctx);
		if (show_select_value_filter)
		{
			class_settings = Runtime.rtl.setAttr(ctx, class_settings, Runtime.Collection.from(["show_select_value"]), true);
		}
		return class_settings;
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.Input.Button","Runtime.Web.CRUD.Form"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.CRUD";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.CRUD.CrudFilter";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.CRUD.Form";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Web.CRUD.CrudFilter",
			"name": "Runtime.Web.CRUD.CrudFilter",
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
Runtime.rtl.defClass(Runtime.Web.CRUD.CrudFilter);
window["Runtime.Web.CRUD.CrudFilter"] = Runtime.Web.CRUD.CrudFilter;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.CRUD.CrudFilter;
"use strict;"
/*
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
if (typeof Runtime.Web.CRUD == 'undefined') Runtime.Web.CRUD = {};
Runtime.Web.CRUD.CrudPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.CRUD.CrudPage.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.CRUD.CrudPage.prototype.constructor = Runtime.Web.CRUD.CrudPage;
Object.assign(Runtime.Web.CRUD.CrudPage.prototype,
{
	/**
 * Returns object name
 */
	getCrudObjectName: function(ctx)
	{
		return this.params.get(ctx, "object_name", "");
	},
	/**
 * On show add dialog
 */
	onShowAddClick: async function(ctx, msg)
	{
		this.dialog_add.update(ctx, "show");
		this.form_add.update(ctx, "clear");
	},
	/**
 * On row edit
 */
	onRowEditClick: async function(ctx, msg)
	{
		var pk = Runtime.rtl.get(ctx, msg.sender.params, "data-pk");
		var item = this.table.call(ctx, "getFirstItem", pk);
		this.dialog_edit.update(ctx, "show");
		this.form_edit.update(ctx, "clear");
		this.form_edit.update(ctx, "setItem", item);
	},
	/**
 * On row delete
 */
	onRowDeleteClick: async function(ctx, msg)
	{
		var pk = Runtime.rtl.get(ctx, msg.sender.params, "data-pk");
		var item = this.table.call(ctx, "getFirstItem", pk);
		var message = "";
		var f = Runtime.rtl.attr(ctx, this.params, ["messages", "delete"]);
		if (Runtime.rtl.exists(ctx, f))
		{
			if (Runtime.rtl.isFn(ctx, f))
			{
				message = f(ctx, item);
			}
			else
			{
				message = f;
			}
		}
		else
		{
			message = ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "name")}));
		}
		this.dialog_delete.update(ctx, "show", Runtime.Dict.from({"text":message,"tag":Runtime.Dict.from({"item":item})}));
	},
	/**
 * On dialog event
 */
	onDialogEvent: async function(ctx, msg)
	{
		var e = msg.data;
		if (msg.sender == this.dialog_delete)
		{
			if (e.button_result == "cancel")
			{
				this.dialog_delete.update(ctx, "hide");
			}
			else
			{
				await this.onItemDelete(ctx, Runtime.rtl.get(ctx, e.tag, "item"));
			}
		}
		await this.signal(ctx, e);
	},
	/**
 * On form event
 */
	onFormEvent: async function(ctx, msg)
	{
		var e = msg.data;
		if (msg.sender == this.form_add)
		{
			if (e.event == Runtime.Web.CRUD.FormEvent.ACTION_CANCEL)
			{
				this.dialog_add.update(ctx, "hide");
			}
			else if (e.event == Runtime.Web.CRUD.FormEvent.ACTION_CREATE)
			{
				await this.onItemCreate(ctx);
			}
		}
		else if (msg.sender == this.form_edit)
		{
			if (e.event == Runtime.Web.CRUD.FormEvent.ACTION_CANCEL)
			{
				this.dialog_edit.update(ctx, "hide");
			}
			else if (e.event == Runtime.Web.CRUD.FormEvent.ACTION_UPDATE)
			{
				await this.onItemUpdate(ctx);
			}
		}
		await this.signal(ctx, e);
	},
	/**
 * Create item
 */
	onItemCreate: async function(ctx)
	{
		var item = this.form_add.model(ctx, "item");
		this.form_add.update(ctx, "setWaitMessage");
		/* Send api */
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":this.getCrudObjectName(ctx),"interface_name":"core.crud","method_name":"create","data":Runtime.Dict.from({"item":item})}));
		if (answer.isSuccess(ctx))
		{
			this.table.update(ctx, "prependItem", Runtime.rtl.get(ctx, answer.response, "new_item"));
			this.dialog_add.update(ctx, "hide");
		}
		else
		{
			this.form_add.update(ctx, "setAnswer", answer);
		}
	},
	/**
 * Update item
 */
	onItemUpdate: async function(ctx)
	{
		var old_item = this.form_edit.model(ctx, "old_item");
		var item = this.form_edit.model(ctx, "item");
		var pk = this.constructor.getPrimaryKey(ctx, Runtime.rtl.get(ctx, this.params, "struct"), old_item);
		this.form_edit.update(ctx, "setWaitMessage");
		/* Send api */
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":this.getCrudObjectName(ctx),"interface_name":"core.crud","method_name":"update","data":Runtime.Dict.from({"pk":pk,"item":item})}));
		if (answer.isSuccess(ctx))
		{
			this.table.update(ctx, "setItem", pk, Runtime.rtl.get(ctx, answer.response, "new_item"));
			this.dialog_edit.update(ctx, "hide");
		}
		else
		{
			this.form_edit.update(ctx, "setAnswer", answer);
		}
	},
	/**
 * Delete item
 */
	onItemDelete: async function(ctx, item)
	{
		this.dialog_delete.update(ctx, "setWaitMessage");
		var pk = this.constructor.getPrimaryKey(ctx, Runtime.rtl.get(ctx, this.params, "struct"), item);
		/* Send api */
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":this.getCrudObjectName(ctx),"interface_name":"core.crud","method_name":"delete","data":Runtime.Dict.from({"pk":pk})}));
		if (answer.isSuccess(ctx))
		{
			this.table.update(ctx, "removeItem", pk);
			this.dialog_delete.update(ctx, "hide");
		}
		else
		{
			this.dialog_delete.update(ctx, "setAnswer", answer);
		}
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.CRUD.CrudPage)
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
		return "Runtime.Web.CRUD.CrudPage";
	},
});
Object.assign(Runtime.Web.CRUD.CrudPage, Runtime.Web.Component);
Object.assign(Runtime.Web.CRUD.CrudPage,
{
	css: function(ctx, vars)
	{
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var messages = Runtime.rtl.get(ctx, params, "messages");
			
			var struct = Runtime.rtl.get(ctx, params, "struct");
			
			var form_fields = Runtime.rtl.get(ctx, params, "form_fields");
			
			var filter_fields = Runtime.rtl.get(ctx, params, "filter_fields");
			
			var table_fields = Runtime.rtl.get(ctx, params, "table_fields");
			
			/* Element 'div.crud' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["crud", this.getCssHash(ctx)].join(" "),"@elem_name":"crud"}});
			
			/* Element 'div.buttons' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["buttons", this.getCssHash(ctx)].join(" "),"@elem_name":"buttons"}});
			
			/* Component 'Button' */
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.CrudPage","onShowAddClick"],"type":"primary"}, "layout": layout, "content": (__control) =>
			{
				var __vnull = null;
				var __control_childs = [];
				
				/* Text */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": Runtime.rtl.get(ctx, messages, "add")});
				
				return __control_childs;
			}});
			RenderDriver.p(__v1, __v1_childs);
			
			if (Runtime.rtl.exists(ctx, filter_fields))
			{
				/* Element 'div.filter' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["filter", this.getCssHash(ctx)].join(" "),"@elem_name":"filter"}});
				
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": "Runtime.Web.CRUD.CrudFilter","attrs": {"@name":["Runtime.Web.CRUD.CrudPage","filter"],"struct":struct,"fields":filter_fields}, "layout": layout});
				RenderDriver.p(__v1, __v1_childs);
			}
			
			/* Element 'div.table' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["table", this.getCssHash(ctx)].join(" "),"@elem_name":"table"}});
			
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": "Runtime.Web.CRUD.Table","attrs": {"@name":["Runtime.Web.CRUD.CrudPage","table"],"struct":struct,"fields":table_fields}, "layout": layout});
			
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": "Runtime.Web.CRUD.Pagination","attrs": {"page":model.table.page + 1,"pages":model.table.pages,"delta":model.table.delta}, "layout": layout});
			RenderDriver.p(__v1, __v1_childs);
			
			var __v1 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, params, "dialog_form"));
			__v1 = __v1.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Dict", Runtime.Dict.from({})));
			var dialog_form_settings = __v1.value(ctx);
			
			var __v1 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, params, "form"));
			__v1 = __v1.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Dict", Runtime.Dict.from({})));
			var form_settings = __v1.value(ctx);
			
			var form_add_fields = form_fields.filter(ctx, (ctx, __varg0) => Runtime.Web.CRUD.FieldInfo.filterForm(ctx, struct, "create", __varg0));
			
			var form_edit_fields = form_fields.filter(ctx, (ctx, __varg0) => Runtime.Web.CRUD.FieldInfo.filterForm(ctx, struct, "update", __varg0));
			
			var __v1 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, form_settings, "class_name"));
			__v1 = __v1.monad(ctx, Runtime.rtl.m_to(ctx, "string", "Runtime.Web.CRUD.Form"));
			var form_class_name = __v1.value(ctx);
			
			/* Element 'div.dialogs' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["dialogs", this.getCssHash(ctx)].join(" "),"@elem_name":"dialogs"}});
			
			/* Component 'Dialog' */
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": "Runtime.Web.Dialog.Dialog","attrs": this.mergeAttrs(ctx, {"@name":["Runtime.Web.CRUD.CrudPage","dialog_add"],"style":Runtime.Web.Dialog.DialogModel.STYLE_CONTENT,"show_buttons":false},dialog_form_settings), "layout": layout, "content": (__control) =>
			{
				var __vnull = null;
				var __control_childs = [];
				
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": form_class_name,"attrs": this.mergeAttrs(ctx, {"@name":["Runtime.Web.CRUD.CrudPage","form_add"],"action":"add","struct":struct,"fields":form_add_fields,"@event:Runtime.Web.CRUD.FormEvent":["Runtime.Web.CRUD.CrudPage","onFormEvent"]},form_settings), "layout": layout});
				
				return __control_childs;
			}});
			
			/* Component 'Dialog' */
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": "Runtime.Web.Dialog.Dialog","attrs": this.mergeAttrs(ctx, {"@name":["Runtime.Web.CRUD.CrudPage","dialog_edit"],"style":Runtime.Web.Dialog.DialogModel.STYLE_CONTENT,"show_buttons":false},dialog_form_settings), "layout": layout, "content": (__control) =>
			{
				var __vnull = null;
				var __control_childs = [];
				
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": form_class_name,"attrs": this.mergeAttrs(ctx, {"@name":["Runtime.Web.CRUD.CrudPage","form_edit"],"action":"edit","struct":struct,"fields":form_edit_fields,"@event:Runtime.Web.CRUD.FormEvent":["Runtime.Web.CRUD.CrudPage","onFormEvent"]},form_settings), "layout": layout});
				
				return __control_childs;
			}});
			
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": "Runtime.Web.Dialog.Dialog","attrs": {"@name":["Runtime.Web.CRUD.CrudPage","dialog_delete"],"style":Runtime.Web.Dialog.DialogModel.STYLE_CONFIRM,"auto_hide":false,"@event:Runtime.Web.Dialog.DialogEvent":["Runtime.Web.CRUD.CrudPage","onDialogEvent"],"buttons":Runtime.Collection.from([Runtime.Dict.from({"type":"danger","data-action":"ok","value":"OK"}),Runtime.Dict.from({"type":"default","data-action":"cancel","value":"Cancel"})])}, "layout": layout});
			RenderDriver.p(__v1, __v1_childs);
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	fieldNumber: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var table_model = Runtime.rtl.get(ctx, params, "table-model");
			
			var index = Runtime.rtl.get(ctx, params, "row-index");
			
			if (table_model)
			{
				/* Text */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": table_model.page * table_model.limit + index + 1});
			}
			
			return __control_childs;
		};
	},
	renderButton: function(ctx, layout, model, params, content, button_type)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var struct = Runtime.rtl.get(ctx, params, "struct");
			
			var table_model = Runtime.rtl.get(ctx, params, "table-model");
			
			var item = Runtime.rtl.get(ctx, params, "row-data");
			
			var index = Runtime.rtl.get(ctx, params, "row-index");
			
			if (button_type == "edit")
			{
				/* Component 'Button' */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"type":"small","data-index":index,"data-pk":this.getPrimaryKey(ctx, struct, item),"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.CrudPage","onRowEditClick"],"@key":"edit"}, "layout": layout, "content": (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Text */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": ctx.translate(ctx, "Runtime.Web.CRUD", "Edit")});
					
					return __control_childs;
				}});
			}
			
			if (button_type == "delete")
			{
				var table_model = Runtime.rtl.get(ctx, params, "table-model");
				
				var item = Runtime.rtl.get(ctx, params, "row-data");
				
				var index = Runtime.rtl.get(ctx, params, "row-index");
				
				/* Component 'Button' */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"type":"small danger","data-index":index,"data-pk":this.getPrimaryKey(ctx, struct, item),"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.CrudPage","onRowDeleteClick"],"@key":"delete"}, "layout": layout, "content": (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Text */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": ctx.translate(ctx, "Runtime.Web.CRUD", "Delete")});
					
					return __control_childs;
				}});
			}
			
			return __control_childs;
		};
	},
	buttonEdit: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var struct = Runtime.rtl.get(ctx, params, "struct");
			
			var table_model = Runtime.rtl.get(ctx, params, "table-model");
			
			var item = Runtime.rtl.get(ctx, params, "row-data");
			
			var index = Runtime.rtl.get(ctx, params, "row-index");
			
			/* Component 'Button' */
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"type":"small","data-index":index,"data-pk":this.getPrimaryKey(ctx, struct, item),"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.CrudPage","onRowEditClick"],"@key":"edit"}, "layout": layout, "content": (__control) =>
			{
				var __vnull = null;
				var __control_childs = [];
				
				/* Text */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": ctx.translate(ctx, "Runtime.Web.CRUD", "Edit")});
				
				return __control_childs;
			}});
			
			return __control_childs;
		};
	},
	buttonDelete: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var struct = Runtime.rtl.get(ctx, params, "struct");
			
			var table_model = Runtime.rtl.get(ctx, params, "table-model");
			
			var item = Runtime.rtl.get(ctx, params, "row-data");
			
			var index = Runtime.rtl.get(ctx, params, "row-index");
			
			/* Component 'Button' */
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"type":"small danger","data-index":index,"data-pk":this.getPrimaryKey(ctx, struct, item),"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.CrudPage","onRowDeleteClick"],"@key":"delete"}, "layout": layout, "content": (__control) =>
			{
				var __vnull = null;
				var __control_childs = [];
				
				/* Text */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": ctx.translate(ctx, "Runtime.Web.CRUD", "Delete")});
				
				return __control_childs;
			}});
			
			return __control_childs;
		};
	},
	/**
 * Returns primary key by item
 */
	getPrimaryKey: function(ctx, struct, item)
	{
		var pk = new Runtime.Map(ctx);
		struct = struct.filter(ctx, Runtime.lib.equalAttr(ctx, "primary", true));
		for (var i = 0;i < struct.count(ctx);i++)
		{
			var field = Runtime.rtl.get(ctx, struct, i);
			var value = Runtime.rtl.get(ctx, item, field.api_name);
			pk.set(ctx, field.api_name, value);
		}
		return pk.toDict(ctx);
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudFilter","Runtime.Web.CRUD.Form","Runtime.Web.CRUD.Pagination","Runtime.Web.CRUD.Table","Runtime.Web.Dialog.Dialog","Runtime.Web.Input.Button","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.CRUD";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.CRUD.CrudPage";
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
			"class_name": "Runtime.Web.CRUD.CrudPage",
			"name": "Runtime.Web.CRUD.CrudPage",
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
Runtime.rtl.defClass(Runtime.Web.CRUD.CrudPage);
window["Runtime.Web.CRUD.CrudPage"] = Runtime.Web.CRUD.CrudPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.CRUD.CrudPage;
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
if (typeof Runtime.Web.CRUD == 'undefined') Runtime.Web.CRUD = {};
Runtime.Web.CRUD.CrudPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.CRUD.CrudPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.CRUD.CrudPageModel.prototype.constructor = Runtime.Web.CRUD.CrudPageModel;
Object.assign(Runtime.Web.CRUD.CrudPageModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.form_add = new Runtime.Web.CRUD.FormModel(ctx);
		this.form_edit = new Runtime.Web.CRUD.FormModel(ctx);
		this.filter = new Runtime.Web.CRUD.FormModel(ctx);
		this.table = new Runtime.Web.CRUD.TableModel(ctx);
		this.dialog_add = new Runtime.Web.Dialog.DialogModel(ctx);
		this.dialog_edit = new Runtime.Web.Dialog.DialogModel(ctx);
		this.dialog_delete = new Runtime.Web.Dialog.DialogModel(ctx);
		this.foreigns = Runtime.Dict.from({});
		this.params = Runtime.Dict.from({});
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.CRUD.CrudPageModel)
		{
			this.form_add = o.form_add;
			this.form_edit = o.form_edit;
			this.filter = o.filter;
			this.table = o.table;
			this.dialog_add = o.dialog_add;
			this.dialog_edit = o.dialog_edit;
			this.dialog_delete = o.dialog_delete;
			this.foreigns = o.foreigns;
			this.params = o.params;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "form_add")this.form_add = v;
		else if (k == "form_edit")this.form_edit = v;
		else if (k == "filter")this.filter = v;
		else if (k == "table")this.table = v;
		else if (k == "dialog_add")this.dialog_add = v;
		else if (k == "dialog_edit")this.dialog_edit = v;
		else if (k == "dialog_delete")this.dialog_delete = v;
		else if (k == "foreigns")this.foreigns = v;
		else if (k == "params")this.params = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "form_add")return this.form_add;
		else if (k == "form_edit")return this.form_edit;
		else if (k == "filter")return this.filter;
		else if (k == "table")return this.table;
		else if (k == "dialog_add")return this.dialog_add;
		else if (k == "dialog_edit")return this.dialog_edit;
		else if (k == "dialog_delete")return this.dialog_delete;
		else if (k == "foreigns")return this.foreigns;
		else if (k == "params")return this.params;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.CRUD.CrudPageModel";
	},
});
Object.assign(Runtime.Web.CRUD.CrudPageModel, Runtime.BaseStruct);
Object.assign(Runtime.Web.CRUD.CrudPageModel,
{
	/**
	 * Curd Search
	 */
	crudSearch: async function(ctx, items, container)
	{
		/* Remote call */
		var search_params = this.getCrudSearchParams(ctx, container.request);
		items = Runtime.rtl.setAttr(ctx, items, Runtime.Collection.from(["data"]), search_params);
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, items, container);
		/* Throw exception */
		if (!answer.isSuccess(ctx))
		{
			throw new Runtime.Exceptions.RuntimeException(ctx, answer.error_message, answer.error_code)
		}
		/* Answer */
		return Promise.resolve(this.fromAnswer(ctx, this.newInstance(ctx, Runtime.Dict.from({})), answer));
	},
	/**
	 * Crud search
	 */
	getCrudSearchParams: function(ctx, request)
	{
		var data = new Runtime.Map(ctx);
		if (Runtime.rtl.exists(ctx, request.query))
		{
			var page = request.query.get(ctx, "page", 1) - 1;
			if (page < 0)
			{
				page = 0;
			}
			data.set(ctx, "page", page);
			data.set(ctx, "limit", 20);
		}
		return data.toDict(ctx);
	},
	/**
	 * From answer
	 */
	fromAnswer: function(ctx, model, answer)
	{
		if (answer.isSuccess(ctx))
		{
			model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["table", "rows"]), Runtime.rtl.get(ctx, answer.response, "items"));
			model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["table", "page"]), Runtime.rtl.get(ctx, answer.response, "page"));
			model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["table", "pages"]), Runtime.rtl.get(ctx, answer.response, "pages"));
			model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["table", "limit"]), Runtime.rtl.get(ctx, answer.response, "limit"));
			model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["foreigns"]), Runtime.rtl.get(ctx, answer.response, "foreigns"));
		}
		return model;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.CRUD";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.CRUD.CrudPageModel";
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
			"class_name": "Runtime.Web.CRUD.CrudPageModel",
			"name": "Runtime.Web.CRUD.CrudPageModel",
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
			a.push("form_add");
			a.push("form_edit");
			a.push("filter");
			a.push("table");
			a.push("dialog_add");
			a.push("dialog_edit");
			a.push("dialog_delete");
			a.push("foreigns");
			a.push("params");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "form_add") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.CrudPageModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "form_edit") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.CrudPageModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "filter") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.CrudPageModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "table") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.CrudPageModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "dialog_add") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.CrudPageModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "dialog_edit") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.CrudPageModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "dialog_delete") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.CrudPageModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "foreigns") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.CrudPageModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.CRUD.CrudPageModel",
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
Runtime.rtl.defClass(Runtime.Web.CRUD.CrudPageModel);
window["Runtime.Web.CRUD.CrudPageModel"] = Runtime.Web.CRUD.CrudPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.CRUD.CrudPageModel;
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
if (typeof Runtime.Web.CRUD == 'undefined') Runtime.Web.CRUD = {};
Runtime.Web.CRUD.ModuleDescription = function(ctx)
{
};
Object.assign(Runtime.Web.CRUD.ModuleDescription.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.CRUD.ModuleDescription)
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
		return "Runtime.Web.CRUD.ModuleDescription";
	},
});
Object.assign(Runtime.Web.CRUD.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function(ctx)
	{
		return "Runtime.Web.CRUD";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function(ctx)
	{
		return "0.0.1";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function(ctx)
	{
		return Runtime.Dict.from({});
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.CRUD";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.CRUD.ModuleDescription";
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
			"class_name": "Runtime.Web.CRUD.ModuleDescription",
			"name": "Runtime.Web.CRUD.ModuleDescription",
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
Runtime.rtl.defClass(Runtime.Web.CRUD.ModuleDescription);
window["Runtime.Web.CRUD.ModuleDescription"] = Runtime.Web.CRUD.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.CRUD.ModuleDescription;