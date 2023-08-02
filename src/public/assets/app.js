"use strict;"
/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020-2023 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
Bayrell.CloudOS.Main = function()
{
	Runtime.Web.App.apply(this, arguments);
};
Bayrell.CloudOS.Main.prototype = Object.create(Runtime.Web.App.prototype);
Bayrell.CloudOS.Main.prototype.constructor = Bayrell.CloudOS.Main;
Object.assign(Bayrell.CloudOS.Main.prototype,
{
	/**
	 * Init app
	 */
	init: async function(c)
	{
		c = await Runtime.Web.App.prototype.init.bind(this)(c);
		return Promise.resolve(c);
	},
	/**
	 * Start app
	 */
	start: async function()
	{
		await Runtime.Web.App.prototype.start.bind(this)();
	},
	/**
	 * Main entry point
	 */
	main: async function()
	{
		await Runtime.Web.App.prototype.main.bind(this)();
	},
	assignObject: function(o)
	{
		if (o instanceof Bayrell.CloudOS.Main)
		{
		}
		Runtime.Web.App.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Web.App.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.App.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.CloudOS.Main, Runtime.Web.App);
Object.assign(Bayrell.CloudOS.Main,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.CloudOS";
	},
	getClassName: function()
	{
		return "Bayrell.CloudOS.Main";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.App";
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
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Main);
window["Bayrell.CloudOS.Main"] = Bayrell.CloudOS.Main;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Main;
"use strict;"
/*
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020-2023 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Components == 'undefined') Bayrell.CloudOS.Components = {};
if (typeof Bayrell.CloudOS.Components.Main == 'undefined') Bayrell.CloudOS.Components.Main = {};
Bayrell.CloudOS.Components.Main.IndexPage = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Components.Main.IndexPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Components.Main.IndexPage.prototype.constructor = Bayrell.CloudOS.Components.Main.IndexPage;
Object.assign(Bayrell.CloudOS.Components.Main.IndexPage.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.CloudOS.Components.Main.IndexPage)
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
Object.assign(Bayrell.CloudOS.Components.Main.IndexPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Components.Main.IndexPage,
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
			
			/* Text */
			let __v0 = __v.e("t", "", null, "Cloud OS Version 0.5.0");
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.CloudOS.Components.Main";
	},
	getClassName: function()
	{
		return "Bayrell.CloudOS.Components.Main.IndexPage";
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
Runtime.rtl.defClass(Bayrell.CloudOS.Components.Main.IndexPage);
window["Bayrell.CloudOS.Components.Main.IndexPage"] = Bayrell.CloudOS.Components.Main.IndexPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Components.Main.IndexPage;
"use strict;"
/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020-2023 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Components == 'undefined') Bayrell.CloudOS.Components = {};
if (typeof Bayrell.CloudOS.Components.Main == 'undefined') Bayrell.CloudOS.Components.Main = {};
Bayrell.CloudOS.Components.Main.IndexPageModel = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.Components.Main.IndexPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.Components.Main.IndexPageModel.prototype.constructor = Bayrell.CloudOS.Components.Main.IndexPageModel;
Object.assign(Bayrell.CloudOS.Components.Main.IndexPageModel.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.CloudOS.Components.Main.IndexPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.Components.Main.IndexPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.CloudOS.Components.Main";
	},
	getClassName: function()
	{
		return "Bayrell.CloudOS.Components.Main.IndexPageModel";
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
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Components.Main.IndexPageModel);
window["Bayrell.CloudOS.Components.Main.IndexPageModel"] = Bayrell.CloudOS.Components.Main.IndexPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Components.Main.IndexPageModel;
"use strict;"
/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020-2023 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Components == 'undefined') Bayrell.CloudOS.Components = {};
if (typeof Bayrell.CloudOS.Components.Main == 'undefined') Bayrell.CloudOS.Components.Main = {};
Bayrell.CloudOS.Components.Main.MainRoute = function()
{
	Runtime.Web.BaseRoute.apply(this, arguments);
};
Bayrell.CloudOS.Components.Main.MainRoute.prototype = Object.create(Runtime.Web.BaseRoute.prototype);
Bayrell.CloudOS.Components.Main.MainRoute.prototype.constructor = Bayrell.CloudOS.Components.Main.MainRoute;
Object.assign(Bayrell.CloudOS.Components.Main.MainRoute.prototype,
{
	/**
	 * Returns layout name
	 */
	getLayoutName: function()
	{
		return "default";
	},
	/**
	 * Action index
	 */
	actionIndex: async function()
	{
		/* Set page model */
		this.setPageModel(new Bayrell.CloudOS.Components.Main.IndexPageModel());
		/* Set title */
		this.setPageTitle("Index page");
		/* Render page */
		this.render("Bayrell.CloudOS.Components.Main.IndexPage");
	},
	assignObject: function(o)
	{
		if (o instanceof Bayrell.CloudOS.Components.Main.MainRoute)
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
Object.assign(Bayrell.CloudOS.Components.Main.MainRoute, Runtime.Web.BaseRoute);
Object.assign(Bayrell.CloudOS.Components.Main.MainRoute,
{
	/**
	 * Returns routes
	 */
	getRoutes: function()
	{
		return Runtime.Collection.from([new Runtime.Web.RouteInfo(Runtime.Dict.from({"uri":"/","name":"site:page:index","method":"actionIndex"}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.CloudOS.Components.Main";
	},
	getClassName: function()
	{
		return "Bayrell.CloudOS.Components.Main.MainRoute";
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
			"getRoutes",
			"actionIndex",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Components.Main.MainRoute);
window["Bayrell.CloudOS.Components.Main.MainRoute"] = Bayrell.CloudOS.Components.Main.MainRoute;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Components.Main.MainRoute;
"use strict;"
/*
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020-2023 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Components == 'undefined') Bayrell.CloudOS.Components = {};
Bayrell.CloudOS.Components.NotFoundPage = function()
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Components.NotFoundPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Components.NotFoundPage.prototype.constructor = Bayrell.CloudOS.Components.NotFoundPage;
Object.assign(Bayrell.CloudOS.Components.NotFoundPage.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.CloudOS.Components.NotFoundPage)
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
Object.assign(Bayrell.CloudOS.Components.NotFoundPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Components.NotFoundPage,
{
	css: function(vars)
	{
		return ".text_not_found.h-4246{" + Runtime.rtl.toStr("font-size: 150%;font-weight: bold;text-align: center;padding-top: 20px;padding-bottom: 20px;") + Runtime.rtl.toStr("}");
	},
	render: function(component, render_params, render_content)
	{
		return (__v) =>
		{
			let layout = component.layout();
			let model_path = component.model_path;
			let model = component.model();
			
			/* Element 'div.text_not_found' */
			let __v0 = __v.e("e", "div", {"class":["text_not_found", this.getCssHash()].join(" "),"@elem_name":"text_not_found"});
			
			/* Text */
			let __v1 = __v0.e("t", "", null, "Страница не найдена");
			__v0.p();
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.CloudOS.Components";
	},
	getClassName: function()
	{
		return "Bayrell.CloudOS.Components.NotFoundPage";
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
Runtime.rtl.defClass(Bayrell.CloudOS.Components.NotFoundPage);
window["Bayrell.CloudOS.Components.NotFoundPage"] = Bayrell.CloudOS.Components.NotFoundPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Components.NotFoundPage;
"use strict;"
/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020-2023 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Components == 'undefined') Bayrell.CloudOS.Components = {};
Bayrell.CloudOS.Components.NotFoundRoute = function()
{
	Runtime.Web.BaseRoute.apply(this, arguments);
};
Bayrell.CloudOS.Components.NotFoundRoute.prototype = Object.create(Runtime.Web.BaseRoute.prototype);
Bayrell.CloudOS.Components.NotFoundRoute.prototype.constructor = Bayrell.CloudOS.Components.NotFoundRoute;
Object.assign(Bayrell.CloudOS.Components.NotFoundRoute.prototype,
{
	/**
	 * Returns layout name
	 */
	getLayoutName: function()
	{
		return "default";
	},
	/**
	 * Action index
	 */
	actionIndex: async function()
	{
		/* Set page model */
		this.setPageModel(null);
		/* Set title */
		this.setPageTitle("Страница не найдена");
		/* Render page */
		this.render("Bayrell.Components.NotFoundPage");
		/* Set http code */
		var container = this.container;
		container = Runtime.rtl.setAttr(container, Runtime.Collection.from(["response", "http_code"]), 404);
	},
	assignObject: function(o)
	{
		if (o instanceof Bayrell.CloudOS.Components.NotFoundRoute)
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
Object.assign(Bayrell.CloudOS.Components.NotFoundRoute, Runtime.Web.BaseRoute);
Object.assign(Bayrell.CloudOS.Components.NotFoundRoute,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.CloudOS.Components";
	},
	getClassName: function()
	{
		return "Bayrell.CloudOS.Components.NotFoundRoute";
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
			"actionIndex",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Components.NotFoundRoute);
window["Bayrell.CloudOS.Components.NotFoundRoute"] = Bayrell.CloudOS.Components.NotFoundRoute;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Components.NotFoundRoute;
"use strict;"
/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020-2023 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Hooks == 'undefined') Bayrell.CloudOS.Hooks = {};
Bayrell.CloudOS.Hooks.AppHook = function()
{
	Runtime.Web.AppHook.apply(this, arguments);
};
Bayrell.CloudOS.Hooks.AppHook.prototype = Object.create(Runtime.Web.AppHook.prototype);
Bayrell.CloudOS.Hooks.AppHook.prototype.constructor = Bayrell.CloudOS.Hooks.AppHook;
Object.assign(Bayrell.CloudOS.Hooks.AppHook.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.registerMethod(this.constructor.CALL_ROUTE_AFTER, "page_not_found", 9999);
	},
	/**
	 * Returns render css
	 */
	render_css: function(d)
	{
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["classes"]), Runtime.rtl.get(d, "classes").concat(Runtime.Collection.from(["Bayrell.CloudOS.Components.CSS"])));
		return d;
	},
	/**
	 * Returns render footer
	 */
	render_footer: function(d)
	{
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["classes"]), Runtime.rtl.get(d, "classes").concat(Runtime.Collection.from(["Bayrell.CloudOS.Components.Scripts"])));
		return d;
	},
	/**
	 * Call route after
	 */
	page_not_found: async function(d)
	{
		var container = Runtime.rtl.get(d, "container");
		var response = container.response;
		if (response != null)
		{
			return Promise.resolve(d);
		}
		await container.callMethod(Runtime.Collection.from(["Bayrell.CloudOS.Components.NotFoundRoute","actionIndex"]));
		return Promise.resolve(d);
	},
	assignObject: function(o)
	{
		if (o instanceof Bayrell.CloudOS.Hooks.AppHook)
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
Object.assign(Bayrell.CloudOS.Hooks.AppHook, Runtime.Web.AppHook);
Object.assign(Bayrell.CloudOS.Hooks.AppHook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.CloudOS.Hooks";
	},
	getClassName: function()
	{
		return "Bayrell.CloudOS.Hooks.AppHook";
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
			"render_css",
			"render_footer",
			"page_not_found",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Hooks.AppHook);
window["Bayrell.CloudOS.Hooks.AppHook"] = Bayrell.CloudOS.Hooks.AppHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Hooks.AppHook;
"use strict;"
/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020-2023 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
Bayrell.CloudOS.ModuleDescription = function()
{
};
Object.assign(Bayrell.CloudOS.ModuleDescription.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.CloudOS.ModuleDescription)
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
Object.assign(Bayrell.CloudOS.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function()
	{
		return "Bayrell.CloudOS";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function()
	{
		return "0.5.0";
	},
	/**
	 * Returns required modules
	 * @return Dict<string>
	 */
	requiredModules: function()
	{
		return Runtime.Dict.from({"Runtime":">=0.3","Runtime.Web":"*","Runtime.Web.Crud":"*"});
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return Runtime.Collection.from([new Runtime.Entity.Hook("Bayrell.CloudOS.Hooks.AppHook"),new Runtime.Web.Annotations.Route("Bayrell.CloudOS.Components.Main.MainRoute")]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.CloudOS";
	},
	getClassName: function()
	{
		return "Bayrell.CloudOS.ModuleDescription";
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
Runtime.rtl.defClass(Bayrell.CloudOS.ModuleDescription);
window["Bayrell.CloudOS.ModuleDescription"] = Bayrell.CloudOS.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.ModuleDescription;
