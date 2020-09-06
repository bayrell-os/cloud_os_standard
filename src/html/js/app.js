"use strict;"
var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ? Runtime.rtl.find_class : null;
/*!
 *  Bayrell Cloud Web Panel
 *
 *  (c) Copyright 2020 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof App == 'undefined') App = {};
App.AdminLayout = function(ctx)
{
	Runtime.Web.Frontend.Component.apply(this, arguments);
};
App.AdminLayout.prototype = Object.create(Runtime.Web.Frontend.Component.prototype);
App.AdminLayout.prototype.constructor = App.AdminLayout;
Object.assign(App.AdminLayout.prototype,
{
	/**
	 * Top button click
	 */
	onTopButtonClick: function(ctx, e)
	{
		var tag,class_name,method_name,c,f;
		return (__async_t) =>
		{
			if (__async_t.pos(ctx) == "0")
			{
				tag = Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, e, "target"), "params"), "@tag");
				class_name = Runtime.rtl.get(ctx, tag, "component");
				method_name = Runtime.rtl.get(ctx, tag, "onClick");
				c = Runtime.rtl.get(ctx, this.driver.findComponents(ctx, class_name), 0);
				f = Runtime.rtl.method(ctx, c, method_name);
				return __async_t.jump(ctx, "1").call(ctx, f(ctx, e),"__v0");
			}
			else if (__async_t.pos(ctx) == "1")
			{
			}
			return __async_t.ret_void(ctx);
		};
	},
	/**
	 * Log out click
	 */
	onLogoutClick: function(ctx, e)
	{
		var msg,is_success;
		return (__async_t) =>
		{
			if (__async_t.pos(ctx) == "0")
			{
				this.driver.updateModelValue(ctx, Runtime.Collection.from(["storage",this.constructor.getCurrentClassName(ctx),"logout_message"]), ctx.constructor.translate(ctx, ctx, "Runtime.Web.CRUD", "Please wait ..."));
				/* Login */
				var __v0 = new Runtime.Monad(ctx, ctx);
				__v0 = __v0.callMethod(ctx, "getProvider", Runtime.Collection.from([Runtime.RuntimeConstant.BUS_INTERFACE]));
				return __async_t.jump(ctx, "1").call(ctx, __v0.callMethodAsync(ctx, "post", Runtime.Collection.from([Runtime.Dict.from({"url":"/api/logout/"})])),"__v0");
			}
			else if (__async_t.pos(ctx) == "1")
			{
				var __v0 = __async_t.getVar(ctx, "__v0");
				__v0 = __v0.call(ctx, Runtime.lib.createStruct(ctx, "Runtime.MessageRPC"));
				msg = __v0.value(ctx);
				var __v0 = new Runtime.Monad(ctx, msg);
				__v0 = __v0.callMethod(ctx, "isSuccess", null);
				is_success = __v0.value(ctx);
				var __v0 = new Runtime.Monad(ctx, msg);
				__v0 = __v0.attr(ctx, "success_message");
				var __v1 = new Runtime.Monad(ctx, msg);
				__v1 = __v1.attr(ctx, "error");
				this.driver.updateModelValue(ctx, Runtime.Collection.from(["storage",this.constructor.getCurrentClassName(ctx),"logout_message"]), (is_success) ? (__v0.value(ctx)) : (__v1.value(ctx)));
				if (is_success)
				{
					this.driver.reloadPage(ctx);
				}
			}
			return __async_t.ret_void(ctx);
		};
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof App.AdminLayout)
		{
		}
		Runtime.Web.Frontend.Component.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Frontend.Component.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Frontend.Component.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "App.AdminLayout";
	},
});
Object.assign(App.AdminLayout, Runtime.Web.Frontend.Component);
Object.assign(App.AdminLayout,
{
	/**
	 * Returns module name
	 */
	moduleName: function(ctx)
	{
		return "Runtime.Web";
	},
	/**
	 * Required components
	 */
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.Button.Button"]);
	},
	/**
	 * Component css
	 */
	css: function(ctx, vars)
	{
		return "*{box-sizing: border-box;}body{margin:0;padding:0;}.layout-e3a3{height: 100%;}.layout_wrap-e3a3{position: relative;height: 100vh;padding-bottom: 20px;display: flex;align-items: stretch;}.layout_footer-e3a3{position: relative;font-size: 12px;height: 24px;margin-top: -24px;}.layout_footer-e3a3 .b_in{}.layout_menu_wrap-e3a3{position: relative;width: 200px;}.layout_content_wrap-e3a3{position: relative;width: calc(100% - 200px);}.layout_site_name-e3a3, .layout_title_wrap-e3a3{font-size: 16px;height: 40px;}.layout_site_name-e3a3, .layout_title_wrap-e3a3, .layout_page-e3a3, .layout_content-e3a3{padding: 10px;}.layout_site_name-e3a3{border-right: 1px #ccc solid;}.layout_title_wrap-e3a3{display: flex;align-items: stretch;}.layout_title-e3a3{width: 350px;}.layout_top_buttons-e3a3{width: calc(100% - 350px);padding-left: 10px;}.layout_content-e3a3{position: relative;height: calc(100% - 45px);padding-bottom: 0;padding-right: 0;}.layout_menu_label-e3a3{font-size: 14px;font-weight: bold;padding: 10px;}.layout_menu-e3a3{position: relative;height: calc(100% - 40px);overflow-y: auto;border-right: 1px #ccc solid;}.layout_menu_items-e3a3{}.layout_menu_items-e3a3 ul, .layout_menu_items-e3a3 li{padding: 0; margin: 0;list-style: none;}.layout_menu_items-e3a3 ul{}.layout_menu_items-e3a3 li{background-color: white;}.layout_menu_items-e3a3 li a{display: block;padding: 10px 15px;border-bottom: 1px solid #e7e7e7;}.layout_menu_items-e3a3 li.active > a, .layout_menu_items-e3a3 li.active > a:hover{background-color: #337ab7;border-color: #337ab7;color: white;}.layout_menu_logout-e3a3{text-align: center;padding-top: 100px;}.layout_menu_logout-e3a3 > div{padding-top: 5px;}";
	},
	/**
	 * Component render
	 */
	render: function(ctx, layout, model, params, content)
	{
		var class_name = model.page_class;
		return (control) =>
		{
			var __vnull = null;
			var control_childs = [];
			
			/* Element 'div' */
			var __v0; var __v0_childs = [];
			[__v0, control_childs] = RenderDriver.e(control, control_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout"),"@key":"layout-0"}}, 0);
			
			/* Element 'div' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_wrap"),"@key":"layout_wrap-0"}}, 0);
			
			/* Element 'div' */
			var __v2; var __v2_childs = [];
			[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_menu_wrap"),"@key":"layout_menu_wrap-0"}}, 0);
			
			/* Element 'div' */
			var __v3; var __v3_childs = [];
			[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_site_name"),"@key":"layout_site_name-0"}}, 0);
			
			/* Element 'a' */
			var __v4; var __v4_childs = [];
			[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "a","attrs": {"href":"/","class":"nolink"}}, 0);
			[__vnull, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Docker web panel")}, 0);
			RenderDriver.p(__v4, __v4_childs);
			RenderDriver.p(__v3, __v3_childs);
			
			/* Element 'div' */
			var __v5; var __v5_childs = [];
			[__v5, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_menu"),"@key":"layout_menu-1"}}, 1);
			
			/* Element 'div' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_menu_label"),"@key":"layout_menu_label-0"}}, 0);
			[__vnull, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Dashboard")}, 0);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'div' */
			var __v7; var __v7_childs = [];
			[__v7, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_menu_items"),"@key":"layout_menu_items-1"}}, 1);
			
			/* Element 'ul' */
			var __v8; var __v8_childs = [];
			[__v8, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "element", {"name": "ul","attrs": null}, 0);
			
			/* Element 'li' */
			var __v9; var __v9_childs = [];
			[__v9, __v8_childs] = RenderDriver.e(__v8, __v8_childs, "element", {"name": "li","attrs": {"class":((Runtime.rs.start(ctx, model.route.name, "app.dashboard.main")) ? ("active") : (""))}}, 0);
			
			/* Element 'a' */
			var __v10; var __v10_childs = [];
			[__v10, __v9_childs] = RenderDriver.e(__v9, __v9_childs, "element", {"name": "a","attrs": {"href":"/","class":"nolink"}}, 0);
			[__vnull, __v10_childs] = RenderDriver.e(__v10, __v10_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Main")}, 0);
			RenderDriver.p(__v10, __v10_childs);
			RenderDriver.p(__v9, __v9_childs);
			
			/* Element 'li' */
			var __v11; var __v11_childs = [];
			[__v11, __v8_childs] = RenderDriver.e(__v8, __v8_childs, "element", {"name": "li","attrs": {"class":((Runtime.rs.start(ctx, model.route.name, "app.dashboard.nodes")) ? ("active") : (""))}}, 1);
			
			/* Element 'a' */
			var __v12; var __v12_childs = [];
			[__v12, __v11_childs] = RenderDriver.e(__v11, __v11_childs, "element", {"name": "a","attrs": {"href":"/nodes/","class":"nolink"}}, 0);
			[__vnull, __v12_childs] = RenderDriver.e(__v12, __v12_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Nodes")}, 0);
			RenderDriver.p(__v12, __v12_childs);
			RenderDriver.p(__v11, __v11_childs);
			RenderDriver.p(__v8, __v8_childs);
			RenderDriver.p(__v7, __v7_childs);
			
			/* Element 'div' */
			var __v13; var __v13_childs = [];
			[__v13, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_menu_label"),"@key":"layout_menu_label-2"}}, 2);
			[__vnull, __v13_childs] = RenderDriver.e(__v13, __v13_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Cluster")}, 0);
			RenderDriver.p(__v13, __v13_childs);
			
			/* Element 'div' */
			var __v14; var __v14_childs = [];
			[__v14, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_menu_items"),"@key":"layout_menu_items-3"}}, 3);
			
			/* Element 'ul' */
			var __v15; var __v15_childs = [];
			[__v15, __v14_childs] = RenderDriver.e(__v14, __v14_childs, "element", {"name": "ul","attrs": null}, 0);
			
			/* Element 'li' */
			var __v16; var __v16_childs = [];
			[__v16, __v15_childs] = RenderDriver.e(__v15, __v15_childs, "element", {"name": "li","attrs": {"class":((Runtime.rs.start(ctx, model.route.name, "app.services")) ? ("active") : (""))}}, 0);
			
			/* Element 'a' */
			var __v17; var __v17_childs = [];
			[__v17, __v16_childs] = RenderDriver.e(__v16, __v16_childs, "element", {"name": "a","attrs": {"href":"/services/","class":"nolink"}}, 0);
			[__vnull, __v17_childs] = RenderDriver.e(__v17, __v17_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Services")}, 0);
			RenderDriver.p(__v17, __v17_childs);
			RenderDriver.p(__v16, __v16_childs);
			
			/* Element 'li' */
			var __v18; var __v18_childs = [];
			[__v18, __v15_childs] = RenderDriver.e(__v15, __v15_childs, "element", {"name": "li","attrs": {"class":((Runtime.rs.start(ctx, model.route.name, "app.yaml.index")) ? ("active") : (""))}}, 1);
			
			/* Element 'a' */
			var __v19; var __v19_childs = [];
			[__v19, __v18_childs] = RenderDriver.e(__v18, __v18_childs, "element", {"name": "a","attrs": {"href":"/yaml/","class":"nolink"}}, 0);
			[__vnull, __v19_childs] = RenderDriver.e(__v19, __v19_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Yaml")}, 0);
			RenderDriver.p(__v19, __v19_childs);
			RenderDriver.p(__v18, __v18_childs);
			
			/* Element 'li' */
			var __v20; var __v20_childs = [];
			[__v20, __v15_childs] = RenderDriver.e(__v15, __v15_childs, "element", {"name": "li","attrs": {"class":((Runtime.rs.start(ctx, model.route.name, "app.yaml.files")) ? ("active") : (""))}}, 2);
			
			/* Element 'a' */
			var __v21; var __v21_childs = [];
			[__v21, __v20_childs] = RenderDriver.e(__v20, __v20_childs, "element", {"name": "a","attrs": {"href":"/yaml/files/","class":"nolink"}}, 0);
			[__vnull, __v21_childs] = RenderDriver.e(__v21, __v21_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Yaml Files")}, 0);
			RenderDriver.p(__v21, __v21_childs);
			RenderDriver.p(__v20, __v20_childs);
			
			/* Element 'li' */
			var __v22; var __v22_childs = [];
			[__v22, __v15_childs] = RenderDriver.e(__v15, __v15_childs, "element", {"name": "li","attrs": {"class":((Runtime.rs.start(ctx, model.route.name, "app.nginx")) ? ("active") : (""))}}, 3);
			
			/* Element 'a' */
			var __v23; var __v23_childs = [];
			[__v23, __v22_childs] = RenderDriver.e(__v22, __v22_childs, "element", {"name": "a","attrs": {"href":"/nginx/","class":"nolink"}}, 0);
			[__vnull, __v23_childs] = RenderDriver.e(__v23, __v23_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Nginx")}, 0);
			RenderDriver.p(__v23, __v23_childs);
			RenderDriver.p(__v22, __v22_childs);
			
			/* Element 'li' */
			var __v24; var __v24_childs = [];
			[__v24, __v15_childs] = RenderDriver.e(__v15, __v15_childs, "element", {"name": "li","attrs": {"class":((Runtime.rs.start(ctx, model.route.name, "app.cli")) ? ("active") : (""))}}, 4);
			
			/* Element 'a' */
			var __v25; var __v25_childs = [];
			[__v25, __v24_childs] = RenderDriver.e(__v24, __v24_childs, "element", {"name": "a","attrs": {"href":"/cli/","class":"nolink"}}, 0);
			[__vnull, __v25_childs] = RenderDriver.e(__v25, __v25_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "CLI")}, 0);
			RenderDriver.p(__v25, __v25_childs);
			RenderDriver.p(__v24, __v24_childs);
			RenderDriver.p(__v15, __v15_childs);
			RenderDriver.p(__v14, __v14_childs);
			
			/* Element 'div' */
			var __v26; var __v26_childs = [];
			[__v26, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_menu_label"),"@key":"layout_menu_label-4"}}, 4);
			[__vnull, __v26_childs] = RenderDriver.e(__v26, __v26_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Admin")}, 0);
			RenderDriver.p(__v26, __v26_childs);
			
			/* Element 'div' */
			var __v27; var __v27_childs = [];
			[__v27, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_menu_items"),"@key":"layout_menu_items-5"}}, 5);
			
			/* Element 'ul' */
			var __v28; var __v28_childs = [];
			[__v28, __v27_childs] = RenderDriver.e(__v27, __v27_childs, "element", {"name": "ul","attrs": null}, 0);
			
			/* Element 'li' */
			var __v29; var __v29_childs = [];
			[__v29, __v28_childs] = RenderDriver.e(__v28, __v28_childs, "element", {"name": "li","attrs": {"class":((Runtime.rs.start(ctx, model.route.name, "app.users")) ? ("active") : (""))}}, 0);
			
			/* Element 'a' */
			var __v30; var __v30_childs = [];
			[__v30, __v29_childs] = RenderDriver.e(__v29, __v29_childs, "element", {"name": "a","attrs": {"href":"/users/","class":"nolink"}}, 0);
			[__vnull, __v30_childs] = RenderDriver.e(__v30, __v30_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Users")}, 0);
			RenderDriver.p(__v30, __v30_childs);
			RenderDriver.p(__v29, __v29_childs);
			
			/* Element 'li' */
			var __v31; var __v31_childs = [];
			[__v31, __v28_childs] = RenderDriver.e(__v28, __v28_childs, "element", {"name": "li","attrs": null}, 1);
			
			/* Element 'a' */
			var __v32; var __v32_childs = [];
			[__v32, __v31_childs] = RenderDriver.e(__v31, __v31_childs, "element", {"name": "a","attrs": {"href":"/adminer/","class":"nolink"}}, 0);
			[__vnull, __v32_childs] = RenderDriver.e(__v32, __v32_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Adminer")}, 0);
			RenderDriver.p(__v32, __v32_childs);
			RenderDriver.p(__v31, __v31_childs);
			
			/* Element 'li' */
			var __v33; var __v33_childs = [];
			[__v33, __v28_childs] = RenderDriver.e(__v28, __v28_childs, "element", {"name": "li","attrs": null}, 2);
			
			/* Element 'a' */
			var __v34; var __v34_childs = [];
			[__v34, __v33_childs] = RenderDriver.e(__v33, __v33_childs, "element", {"name": "a","attrs": {"href":"/adminer/info/","class":"nolink"}}, 0);
			[__vnull, __v34_childs] = RenderDriver.e(__v34, __v34_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "PHP Info")}, 0);
			RenderDriver.p(__v34, __v34_childs);
			RenderDriver.p(__v33, __v33_childs);
			RenderDriver.p(__v28, __v28_childs);
			RenderDriver.p(__v27, __v27_childs);
			
			/* Element 'div' */
			var __v35; var __v35_childs = [];
			[__v35, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_menu_logout"),"@key":"layout_menu_logout-6"}}, 6);
			
			/* Component 'Button' */
			[__vnull, __v35_childs] = RenderDriver.e(__v35, __v35_childs, "component", {"name": "Runtime.Web.Button.Button","attrs": {"@eventAsync:Runtime.Web.Events.MouseClickEvent":["App.AdminLayout","onLogoutClick"]}, "layout": layout, "content": (control) =>
			{
				var __vnull = null;
				var control_childs = [];
				[__vnull, control_childs] = RenderDriver.e(control, control_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Logout")}, 0);
				
				return control_childs;
			}}, 0);
			
			/* Element 'div' */
			var __v36; var __v36_childs = [];
			[__v36, __v35_childs] = RenderDriver.e(__v35, __v35_childs, "element", {"name": "div","attrs": null}, 1);
			[__vnull, __v36_childs] = RenderDriver.e(__v36, __v36_childs, "text", {"content": Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, layout, "storage"), this.getCurrentClassName(ctx)), "logout_message")}, 0);
			RenderDriver.p(__v36, __v36_childs);
			RenderDriver.p(__v35, __v35_childs);
			RenderDriver.p(__v5, __v5_childs);
			RenderDriver.p(__v2, __v2_childs);
			
			/* Element 'div' */
			var __v37; var __v37_childs = [];
			[__v37, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_content_wrap"),"@key":"layout_content_wrap-1"}}, 1);
			
			/* Element 'div' */
			var __v38; var __v38_childs = [];
			[__v38, __v37_childs] = RenderDriver.e(__v37, __v37_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_title_wrap"),"@key":"layout_title_wrap-0"}}, 0);
			
			/* Element 'div' */
			var __v39; var __v39_childs = [];
			[__v39, __v38_childs] = RenderDriver.e(__v38, __v38_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_title"),"@key":"layout_title-0"}}, 0);
			[__vnull, __v39_childs] = RenderDriver.e(__v39, __v39_childs, "text", {"content": model.title}, 0);
			RenderDriver.p(__v39, __v39_childs);
			
			/* Element 'div' */
			var __v40; var __v40_childs = [];
			[__v40, __v38_childs] = RenderDriver.e(__v38, __v38_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_top_buttons"),"@key":"layout_top_buttons-1"}}, 1);
			[__vnull, __v40_childs] = RenderDriver.e(__v40, __v40_childs, "text", {"content": this.renderTopButtons(ctx, layout)}, 0);
			RenderDriver.p(__v40, __v40_childs);
			RenderDriver.p(__v38, __v38_childs);
			
			/* Element 'div' */
			var __v41; var __v41_childs = [];
			[__v41, __v37_childs] = RenderDriver.e(__v37, __v37_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_content"),"@key":"layout_content-1"}}, 1);
			[__vnull, __v41_childs] = RenderDriver.e(__v41, __v41_childs, "component", {"name": class_name,"attrs": {"@bind":["App.AdminLayout","page_model"],"@key":"view"}, "layout": layout}, 0);
			RenderDriver.p(__v41, __v41_childs);
			RenderDriver.p(__v37, __v37_childs);
			RenderDriver.p(__v1, __v1_childs);
			
			/* Element 'div' */
			var __v42; var __v42_childs = [];
			[__v42, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "layout_footer"),"@key":"layout_footer-1"}}, 1);
			
			/* Element 'div' */
			var __v43; var __v43_childs = [];
			[__v43, __v42_childs] = RenderDriver.e(__v42, __v42_childs, "element", {"name": "div","attrs": {"class":"b_out"}}, 0);
			
			/* Element 'div' */
			var __v44; var __v44_childs = [];
			[__v44, __v43_childs] = RenderDriver.e(__v43, __v43_childs, "element", {"name": "div","attrs": {"class":"b_in"}}, 0);
			[__vnull, __v44_childs] = RenderDriver.e(__v44, __v44_childs, "text", {"content": "(c) BAYRELL Cloud OS 2020 \"Ildar Bikmamatov\" <support@bayrell.org>"}, 0);
			RenderDriver.p(__v44, __v44_childs);
			RenderDriver.p(__v43, __v43_childs);
			RenderDriver.p(__v42, __v42_childs);
			RenderDriver.p(__v0, __v0_childs);
			
			return control_childs;
		};
	},
	/**
	 * Render Top Buttons
	 */
	renderTopButtons: function(ctx, layout)
	{
		var top_buttons = Runtime.rtl.attr(ctx, layout, Runtime.Collection.from(["storage","App.Layout.TopButtons"]));
		if (top_buttons == null)
		{
			return "";
		}
		return top_buttons.map(ctx, (ctx, button) => 
		{
			return (control) =>
			{
				var __vnull = null;
				var control_childs = [];
				
				/* Component 'Button' */
				[__vnull, control_childs] = RenderDriver.e(control, control_childs, "component", {"name": "Runtime.Web.Button.Button","attrs": {"@eventAsync:Runtime.Web.Events.MouseClickEvent":["App.AdminLayout","onTopButtonClick"],"@tag":button}, "layout": layout, "content": (control) =>
				{
					var __vnull = null;
					var control_childs = [];
					[__vnull, control_childs] = RenderDriver.e(control, control_childs, "text", {"content": Runtime.rtl.get(ctx, button, "label")}, 0);
					
					return control_childs;
				}}, 0);
				
				return control_childs;
			};
		});
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "App";
	},
	getCurrentClassName: function()
	{
		return "App.AdminLayout";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Frontend.Component";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "App.AdminLayout",
			"name": "App.AdminLayout",
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
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
			"onTopButtonClick",
			"onLogoutClick",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(App.AdminLayout);
"use strict;"
var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ? Runtime.rtl.find_class : null;
/*!
 *  Bayrell Cloud Web Panel
 *
 *  (c) Copyright 2020 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof App == 'undefined') App = {};
if (typeof App.Dashboard == 'undefined') App.Dashboard = {};
App.Dashboard.MainPage = function(ctx)
{
	Runtime.Web.Frontend.Component.apply(this, arguments);
};
App.Dashboard.MainPage.prototype = Object.create(Runtime.Web.Frontend.Component.prototype);
App.Dashboard.MainPage.prototype.constructor = App.Dashboard.MainPage;
Object.assign(App.Dashboard.MainPage.prototype,
{
	/**
	 * On click
	 */
	onClick: function(ctx, e)
	{
		var pos = Runtime.rtl.get(ctx, e.target.params, "data-index");
		this.updateModel(ctx, Runtime.Dict.from({"active":pos}));
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof App.Dashboard.MainPage)
		{
		}
		Runtime.Web.Frontend.Component.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Frontend.Component.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Frontend.Component.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "App.Dashboard.MainPage";
	},
});
Object.assign(App.Dashboard.MainPage, Runtime.Web.Frontend.Component);
Object.assign(App.Dashboard.MainPage,
{
	/**
	 * Returns module name
	 */
	moduleName: function(ctx)
	{
		return "App";
	},
	/**
	 * Route Action
	 * @return WebContainer
	 */
	actionIndex: function(ctx, container)
	{
		var msg;
		return (__async_t) =>
		{
			if (__async_t.pos(ctx) == "0")
			{
				/* Set title */
				container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Dashboard");
				container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "admin");
				/* Get services state */
				var __v0 = new Runtime.Monad(ctx, container);
				return __async_t.jump(ctx, "1").call(ctx, __v0.callMethodAsync(ctx, "sendMessage", Runtime.Collection.from([Runtime.Dict.from({"api_name":"App.Dashboard","space_name":"default","method_name":"status","data":Runtime.Dict.from({})})])),"__v0");
			}
			else if (__async_t.pos(ctx) == "1")
			{
				var __v0 = __async_t.getVar(ctx, "__v0");
				msg = __v0.value(ctx);
				/* Create model */
				container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "App.Dashboard.MainPage");
				var __v0 = new Runtime.Monad(ctx, msg);
				__v0 = __v0.callMethod(ctx, "isSuccess", null);
				container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), new App.Dashboard.MainPageModel(ctx, Runtime.Dict.from({"services":(__v0.value(ctx)) ? (Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, msg, "response"), "services")) : (null)})));
				return __async_t.ret(ctx, container);
			}
			return __async_t.ret_void(ctx);
		};
	},
	/**
	 * Component css
	 */
	css: function(ctx, vars)
	{
		return ".content-3ca7{height: 100%;display: flex;align-items: stretch;}.left-3ca7, .right-3ca7{width: 50%;position: relative;overflow-y: auto;}.left-3ca7{padding-right: 10px;}.right-3ca7{padding-left: 10px;padding-right: 10px;}.services-3ca7{display: table;border-left: 1px #ccc solid;border-top: 1px #ccc solid;width: 100%;}.service-3ca7{display: table-row;cursor: pointer;}.service-3ca7:hover{background: #eee;}.service-3ca7.active{background-color: #337ab7;border-color: #337ab7;color: white;}.service_item-3ca7{display: table-cell;padding: 5px;border-bottom: 1px #ccc solid;border-right: 1px #ccc solid;}.label-3ca7{font-weight: bold;}.info_item-3ca7{overflow-wrap: anywhere;padding-bottom: 10px;}.info_item-3ca7:last-child{padding-bottom: 0px;}.info_actions-3ca7 > .label{padding-bottom: 5px;}.info_item_action-3ca7{padding-bottom: 5px;}.info_item_action-3ca7:last-child{padding-bottom: 0px;}.info_item_action-3ca7.state-ready .state{color: #00aa00;font-weight: bold;}.info_item_action-3ca7.state-failed .state, .info_item_action-3ca7.state-rejected .state{color: red;font-weight: bold;}.info_item_action_error-3ca7{color: red;}";
	},
	/**
	 * Component render
	 */
	render: function(ctx, layout, model, params, content)
	{
		return (control) =>
		{
			var __vnull = null;
			var control_childs = [];
			
			/* Element 'div' */
			var __v0; var __v0_childs = [];
			[__v0, control_childs] = RenderDriver.e(control, control_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "content"),"@key":"content-0"}}, 0);
			
			/* Element 'div' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "left"),"@key":"left-0"}}, 0);
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": (model.services != null) ? (this.renderServices(ctx, layout, model)) : ("")}, 0);
			RenderDriver.p(__v1, __v1_childs);
			
			/* Element 'div' */
			var __v2; var __v2_childs = [];
			[__v2, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "right"),"@key":"right-1"}}, 1);
			[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": (model.services != null) ? (this.renderInfo(ctx, layout, model)) : ("")}, 0);
			RenderDriver.p(__v2, __v2_childs);
			RenderDriver.p(__v0, __v0_childs);
			
			return control_childs;
		};
	},
	/**
	 * Render services
	 */
	renderServices: function(ctx, layout, model)
	{
		return (control) =>
		{
			var __vnull = null;
			var control_childs = [];
			
			/* Element 'div' */
			var __v0; var __v0_childs = [];
			[__v0, control_childs] = RenderDriver.e(control, control_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "services"),"@key":"services-0"}}, 0);
			
			/* Element 'div' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "service"),"@key":"service-0"}}, 0);
			
			/* Element 'div' */
			var __v2; var __v2_childs = [];
			[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "service_item label service_item--name"),"@key":"service_item-0"}}, 0);
			[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Name")}, 0);
			RenderDriver.p(__v2, __v2_childs);
			
			/* Element 'div' */
			var __v3; var __v3_childs = [];
			[__v3, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "service_item label service_item--image"),"@key":"service_item-1"}}, 1);
			[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Image")}, 0);
			RenderDriver.p(__v3, __v3_childs);
			
			/* Element 'div' */
			var __v4; var __v4_childs = [];
			[__v4, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "service_item label service_item--status"),"@key":"service_item-2"}}, 2);
			[__vnull, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Status")}, 0);
			RenderDriver.p(__v4, __v4_childs);
			RenderDriver.p(__v1, __v1_childs);
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.rtl.get(ctx, model, "services").map(ctx, (ctx, service, index) => 
			{
				return (control) =>
				{
					var __vnull = null;
					var control_childs = [];
					
					/* Element 'div' */
					var __v0; var __v0_childs = [];
					[__v0, control_childs] = RenderDriver.e(control, control_childs, "element", {"name": "div","attrs": {"@event:Runtime.Web.Events.MouseClickEvent":["App.Dashboard.MainPage","onClick"],"data-index":index,"class":this.getCssName(ctx, "service") + " " + ((model.active == index) ? ("active") : ("")),"@key":index}}, 0);
					
					/* Element 'div' */
					var __v1; var __v1_childs = [];
					[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "service_item service_item--name"),"@key":"service_item-0"}}, 0);
					[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": Runtime.rtl.get(ctx, service, "_name")}, 0);
					RenderDriver.p(__v1, __v1_childs);
					
					/* Element 'div' */
					var __v2; var __v2_childs = [];
					[__v2, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "service_item service_item--image"),"@key":"service_item-1"}}, 1);
					[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": this.trimImageName(ctx, Runtime.rtl.get(ctx, service, "_image"))}, 0);
					RenderDriver.p(__v2, __v2_childs);
					
					/* Element 'div' */
					var __v3; var __v3_childs = [];
					[__v3, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "service_item service_item--status"),"@key":"service_item-2"}}, 2);
					[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, service, "balancer"), "State"), "Work")}, 0);
					[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": " / "}, 1);
					[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, service, "balancer"), "State"), "Total")}, 2);
					RenderDriver.p(__v3, __v3_childs);
					RenderDriver.p(__v0, __v0_childs);
					
					return control_childs;
				};
			})}, 1);
			RenderDriver.p(__v0, __v0_childs);
			
			return control_childs;
		};
	},
	/**
	 * Render info
	 */
	renderInfo: function(ctx, layout, model)
	{
		var service = model.services.get(ctx, model.active, null);
		if (service == null)
		{
			return "";
		}
		var tasks = Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, service, "balancer"), "Tasks");
		var errors = Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, service, "balancer"), "Tasks").filter(ctx, (ctx, task) => 
		{
			return Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Status"), "State") == "rejected" || Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Status"), "State") == "failed" || Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Status"), "State") == "running";
		});
		return (control) =>
		{
			var __vnull = null;
			var control_childs = [];
			
			/* Element 'div' */
			var __v0; var __v0_childs = [];
			[__v0, control_childs] = RenderDriver.e(control, control_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "info"),"@key":"info-0"}}, 0);
			
			/* Element 'div' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "info_item info_item--name"),"@key":"info_item-0"}}, 0);
			
			/* Element 'b' */
			var __v2; var __v2_childs = [];
			[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "b","attrs": null}, 0);
			[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Name")}, 0);
			[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ":"}, 1);
			RenderDriver.p(__v2, __v2_childs);
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": " "}, 1);
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": Runtime.rtl.get(ctx, service, "_name")}, 2);
			RenderDriver.p(__v1, __v1_childs);
			
			/* Element 'div' */
			var __v3; var __v3_childs = [];
			[__v3, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "info_item info_item--image"),"@key":"info_item-1"}}, 1);
			
			/* Element 'b' */
			var __v4; var __v4_childs = [];
			[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "b","attrs": null}, 0);
			[__vnull, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Image")}, 0);
			[__vnull, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "text", {"content": ":"}, 1);
			RenderDriver.p(__v4, __v4_childs);
			[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": " "}, 1);
			[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": Runtime.rtl.get(ctx, service, "_image")}, 2);
			RenderDriver.p(__v3, __v3_childs);
			
			/* Element 'div' */
			var __v5; var __v5_childs = [];
			[__v5, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "info_item info_item--status"),"@key":"info_item-2"}}, 2);
			
			/* Element 'b' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "b","attrs": null}, 0);
			[__vnull, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Status")}, 0);
			[__vnull, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "text", {"content": ":"}, 1);
			RenderDriver.p(__v6, __v6_childs);
			[__vnull, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "text", {"content": "&nbsp;"}, 1);
			[__vnull, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "text", {"content": Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, service, "balancer"), "State"), "Work")}, 2);
			[__vnull, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "text", {"content": " / "}, 3);
			[__vnull, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "text", {"content": Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, service, "balancer"), "State"), "Total")}, 4);
			RenderDriver.p(__v5, __v5_childs);
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": (tasks.count(ctx) > 0) ? ((control) =>
			{
				var __vnull = null;
				var control_childs = [];
				
				/* Element 'div' */
				var __v0; var __v0_childs = [];
				[__v0, control_childs] = RenderDriver.e(control, control_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "info_item info_actions"),"@key":"info_item-0"}}, 0);
				
				/* Element 'div' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":"label bold","@key":"label"}}, 0);
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": ctx.constructor.translate(ctx, ctx, "App", "Last actions")}, 0);
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": ":"}, 1);
				RenderDriver.p(__v1, __v1_childs);
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": tasks.map(ctx, (ctx, task, index) => 
				{
					return this.renderAction(ctx, task, index);
				})}, 1);
				RenderDriver.p(__v0, __v0_childs);
				
				return control_childs;
			}) : ("")}, 3);
			RenderDriver.p(__v0, __v0_childs);
			
			return control_childs;
		};
	},
	/**
	 * Render action
	 */
	renderAction: function(ctx, task, index)
	{
		return (control) =>
		{
			var __vnull = null;
			var control_childs = [];
			
			/* Element 'div' */
			var __v0; var __v0_childs = [];
			[__v0, control_childs] = RenderDriver.e(control, control_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "info_item_action") + " " + "state-" + Runtime.rtl.toStr(Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Status"), "State")),"@key":index}}, 0);
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": "["}, 0);
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.rs.substr(ctx, Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Status"), "Timestamp"), 0, 19)}, 1);
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": "]&nbsp;"}, 2);
			
			/* Element 'span' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "span","attrs": {"class":"state"}}, 3);
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": Runtime.rs.strtoupper(ctx, Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Status"), "State"))}, 0);
			RenderDriver.p(__v1, __v1_childs);
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": "&nbsp;\n\t\t\t\ton "}, 4);
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Node"), "Hostname")}, 5);
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": ", id="}, 6);
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.rtl.get(ctx, task, "ID")}, 7);
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": (Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Status"), "State") == "rejected" || Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Status"), "State") == "failed") ? ((control) =>
			{
				var __vnull = null;
				var control_childs = [];
				
				/* Element 'div' */
				var __v0; var __v0_childs = [];
				[__v0, control_childs] = RenderDriver.e(control, control_childs, "element", {"name": "div","attrs": {"class":this.getCssName(ctx, "info_item_action_error"),"@key":"info_item_action_error-0"}}, 0);
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Status"), "Err")}, 0);
				RenderDriver.p(__v0, __v0_childs);
				
				return control_childs;
			}) : ("")}, 8);
			RenderDriver.p(__v0, __v0_childs);
			
			return control_childs;
		};
	},
	/**
	 * Trim name
	 */
	trimImageName: function(ctx, name)
	{
		var pos = Runtime.rs.search(ctx, name, "@");
		if (pos != -1)
		{
			name = Runtime.rs.substr(ctx, name, 0, pos);
		}
		return name;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "App.Dashboard";
	},
	getCurrentClassName: function()
	{
		return "App.Dashboard.MainPage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Frontend.Component";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "App.Dashboard.MainPage",
			"name": "App.Dashboard.MainPage",
			"annotations": Collection.from([
				new Runtime.Web.Annotations.RouteList(ctx, Runtime.Dict.from({})),
				new Runtime.Web.Annotations.RouteMiddleware(ctx, Runtime.Dict.from({"value":"App.User.AuthToken::checkAuthRouteMiddleware"})),
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
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
			"actionIndex",
			"onClick",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		if (field_name == "actionIndex")
		{
			var Collection = Runtime.Collection;
			var Dict = Runtime.Dict;
			var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
			return new IntrospectionInfo(ctx, {
				"kind": IntrospectionInfo.ITEM_METHOD,
				"class_name": "App.Dashboard.MainPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Annotations.Route(ctx, Runtime.Dict.from({"uri":"/","name":"app.dashboard.main"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(App.Dashboard.MainPage);
"use strict;"
/*!
 *  Bayrell Cloud Web Panel
 *
 *  (c) Copyright 2020 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof App == 'undefined') App = {};
if (typeof App.Dashboard == 'undefined') App.Dashboard = {};
App.Dashboard.MainPageModel = function(ctx)
{
	Runtime.CoreStruct.apply(this, arguments);
};
App.Dashboard.MainPageModel.prototype = Object.create(Runtime.CoreStruct.prototype);
App.Dashboard.MainPageModel.prototype.constructor = App.Dashboard.MainPageModel;
Object.assign(App.Dashboard.MainPageModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.services = null;
		this.active = -1;
		Runtime.CoreStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof App.Dashboard.MainPageModel)
		{
			this.services = o.services;
			this.active = o.active;
		}
		Runtime.CoreStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "services")this.services = v;
		else if (k == "active")this.active = v;
		else Runtime.CoreStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "services")return this.services;
		else if (k == "active")return this.active;
		return Runtime.CoreStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "App.Dashboard.MainPageModel";
	},
});
Object.assign(App.Dashboard.MainPageModel, Runtime.CoreStruct);
Object.assign(App.Dashboard.MainPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "App.Dashboard";
	},
	getCurrentClassName: function()
	{
		return "App.Dashboard.MainPageModel";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "App.Dashboard.MainPageModel",
			"name": "App.Dashboard.MainPageModel",
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
			a.push("services");
			a.push("active");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "services") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "App.Dashboard.MainPageModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "active") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "App.Dashboard.MainPageModel",
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
Runtime.rtl.defClass(App.Dashboard.MainPageModel);
window["App.Dashboard.MainPageModel"] = App.Dashboard.MainPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = App.Dashboard.MainPageModel;
"use strict;"
var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ? Runtime.rtl.find_class : null;
/*!
 *  Bayrell Cloud Web Panel
 *
 *  (c) Copyright 2020 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof App == 'undefined') App = {};
App.ModuleDescription = function(ctx)
{
};
Object.assign(App.ModuleDescription.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof App.ModuleDescription)
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
		return "App.ModuleDescription";
	},
});
Object.assign(App.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function(ctx)
	{
		return "App";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function(ctx)
	{
		return "0.9.0";
	},
	/**
	 * Returns required modules
	 * @return Dict<string>
	 */
	requiredModules: function(ctx)
	{
		return Runtime.Dict.from({"Runtime":">=0.3","Runtime.Web":"*","Runtime.Web.CRUD":"*"});
	},
	/**
	 * Returns module files load order
	 * @return Collection<string>
	 */
	assets: function(ctx)
	{
		return Runtime.Collection.from(["App/AdminerPage","App/AdminLayout","App/CLIPage","App/InstallPage","App/Dashboard/MainPage","App/Dashboard/MainPageModel","App/Dashboard/NodesPage","App/Dashboard/NodesPageModel","App/Nginx/NginxPage","App/Nginx/NginxPageModel","App/Service/ServiceForm","App/Service/ServicePage","App/Service/ServicePageModel","App/User/AuthPage","App/User/AuthToken","App/User/UserPage","App/User/UserPageModel","App/Yaml/YamlForm","App/Yaml/YamlPage","App/Yaml/YamlPageModel","App/Yaml/YamlFilesPage","App/Yaml/YamlFilesPageModel","App/ModuleDescription"]);
	},
	/**
	 * Returns enities
	 */
	entities: function(ctx)
	{
		return Runtime.Collection.from([new Runtime.Annotations.Entity(ctx, Runtime.Dict.from({"name":"App.CLIPage"})),new Runtime.Annotations.Entity(ctx, Runtime.Dict.from({"name":"App.InstallPage"})),new Runtime.Annotations.Entity(ctx, Runtime.Dict.from({"name":"App.Dashboard.MainPage"})),new Runtime.Annotations.Entity(ctx, Runtime.Dict.from({"name":"App.Dashboard.NodesPage"})),new Runtime.Annotations.Entity(ctx, Runtime.Dict.from({"name":"App.Nginx.NginxPage"})),new Runtime.Annotations.Entity(ctx, Runtime.Dict.from({"name":"App.Service.ServicePage"})),new Runtime.Annotations.Entity(ctx, Runtime.Dict.from({"name":"App.User.AuthPage"})),new Runtime.Annotations.Entity(ctx, Runtime.Dict.from({"name":"App.User.UserPage"})),new Runtime.Annotations.Entity(ctx, Runtime.Dict.from({"name":"App.Yaml.YamlPage"})),new Runtime.Annotations.Entity(ctx, Runtime.Dict.from({"name":"App.Yaml.YamlFilesPage"})),new Runtime.Annotations.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderHelper.LAYOUT_CHAIN,"value":"App.ModuleDescription::layout"})),new Runtime.Annotations.Provider(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderHelper.BUS_INTERFACE,"value":"Runtime.Web.Frontend.BusProvider"}))]);
	},
	/**
	 * Returns sync loaded files
	 */
	resources: function(ctx)
	{
		return Runtime.Collection.from(["@App/core.css"]);
	},
	/**
	 * App layout
	 */
	layout: function(ctx, container)
	{
		var layout_name = Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, container, "layout"), "layout_name");
		if (layout_name == "admin")
		{
			return "App.AdminLayout";
		}
		return "Runtime.Web.Frontend.Layout";
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "App";
	},
	getCurrentClassName: function()
	{
		return "App.ModuleDescription";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "App.ModuleDescription",
			"name": "App.ModuleDescription",
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
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
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
		Runtime.Interfaces.ModuleDescriptionInterface,
		Runtime.Interfaces.AssetsInterface,
	],
});
Runtime.rtl.defClass(App.ModuleDescription);