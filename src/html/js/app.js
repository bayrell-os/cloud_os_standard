"use strict;"
/*
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
Bayrell.CloudOS.AdminLayout = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.AdminLayout.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.AdminLayout.prototype.constructor = Bayrell.CloudOS.AdminLayout;
Object.assign(Bayrell.CloudOS.AdminLayout.prototype,
{
	/**
 * Top button click
 */
	onTopButtonClick: async function(ctx, msg)
	{
		/*
	Dict tag = e["target"]["params"]["@tag"];
	string class_name = tag["component"];
	string method_name = tag["onClick"];
	Component c = this.driver.findComponents(class_name)[0];
	fn f = rtl::method(c, method_name);
	await f(e);
	*/
	},
	/**
 * Log out click
 */
	onLogoutClick: async function(ctx, msg)
	{
		/*
	this.driver.updateModelValue
	(
		["storage", static::getCurrentClassName(), "logout_message"],
		_("Runtime.Web.CRUD", "Please wait ...")
	);
	
	MessageRPC msg = @
		-> method getProvider(RuntimeConstant::BUS_INTERFACE)
		-> await method post
		{
			"url": "/api/logout/",
		}
		-> lib::createStruct(classof MessageRPC)
	;
	
	bool is_success = msg -> method isSuccess;
	this.driver.updateModelValue
	(
		["storage", static::getCurrentClassName(), "logout_message"],
		is_success ? msg -> attr "success_message" : msg -> attr "error"
	);
	
	if (is_success)
	{
		this.driver.reloadPage();
	}
	*/
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.AdminLayout)
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
		return "Bayrell.CloudOS.AdminLayout";
	},
});
Object.assign(Bayrell.CloudOS.AdminLayout, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.AdminLayout,
{
	css: function(ctx, vars)
	{
		return "*{" + Runtime.rtl.toStr("box-sizing: border-box;") + Runtime.rtl.toStr("}body{") + Runtime.rtl.toStr("margin:0;padding:0;") + Runtime.rtl.toStr("}a {") + Runtime.rtl.toStr(" text-decoration: inherit; color: #0000d0; cursor: pointer; ") + Runtime.rtl.toStr("}a:hover, a:visited:hover {") + Runtime.rtl.toStr(" text-decoration: underline; color: red; ") + Runtime.rtl.toStr("}a:visited {") + Runtime.rtl.toStr(" text-decoration: inherit; color: #0000d0; ") + Runtime.rtl.toStr("}a.link {") + Runtime.rtl.toStr(" text-decoration: none; color: #0000d0; cursor: pointer; ") + Runtime.rtl.toStr("}a.link:hover, a.link:visited:hover {") + Runtime.rtl.toStr(" text-decoration: underline; color: red; ") + Runtime.rtl.toStr("}a.link:visited {") + Runtime.rtl.toStr(" text-decoration: none; color: #0000d0; ") + Runtime.rtl.toStr("}body, html{") + Runtime.rtl.toStr("font-family: 'Ubuntu', sans-serif;font-size: 14px;width: 100%;padding: 0;margin: 0;") + Runtime.rtl.toStr("}td, th{") + Runtime.rtl.toStr("font-family: 'Ubuntu', sans-serif;font-size: 14px;") + Runtime.rtl.toStr("}span.lpad5{") + Runtime.rtl.toStr("display: inline-block;padding-right: 5px;") + Runtime.rtl.toStr("}.layout.h-d6df{") + Runtime.rtl.toStr("height: 100%;") + Runtime.rtl.toStr("}.layout_wrap.h-d6df{") + Runtime.rtl.toStr("position: relative;display: flex;align-items: stretch;min-height: calc(100% - 25px);") + Runtime.rtl.toStr("}.layout_footer.h-d6df{") + Runtime.rtl.toStr("position: relative;width: 100%;height: 24px;border-top: 1px #ccc solid;background-color: white;font-size: 12px;") + Runtime.rtl.toStr("}.layout_footer.h-d6df .b_in{") + Runtime.rtl.toStr("}.layout_menu_wrap.h-d6df{") + Runtime.rtl.toStr("position: relative;width: 200px;") + Runtime.rtl.toStr("}.layout_content_wrap.h-d6df{") + Runtime.rtl.toStr("position: relative;width: calc(100% - 200px);padding-bottom: 10px;") + Runtime.rtl.toStr("}.layout_site_name.h-d6df, .layout_title_wrap.h-d6df{") + Runtime.rtl.toStr("font-size: 16px;height: 40px;") + Runtime.rtl.toStr("}.layout_site_name.h-d6df, .layout_title_wrap.h-d6df, .layout_page.h-d6df, .layout_content.h-d6df{") + Runtime.rtl.toStr("padding: 10px;") + Runtime.rtl.toStr("}.layout_site_name.h-d6df{") + Runtime.rtl.toStr("border-right: 1px #ccc solid;") + Runtime.rtl.toStr("}.layout_title_wrap.h-d6df{") + Runtime.rtl.toStr("display: flex;align-items: stretch;") + Runtime.rtl.toStr("}.layout_title.h-d6df{") + Runtime.rtl.toStr("width: 350px;") + Runtime.rtl.toStr("}.layout_top_buttons.h-d6df{") + Runtime.rtl.toStr("width: calc(100% - 350px);padding-left: 10px;") + Runtime.rtl.toStr("}.layout_content.h-d6df{") + Runtime.rtl.toStr("position: relative;height: calc(100% - 45px);padding-bottom: 0;padding-right: 0;") + Runtime.rtl.toStr("}.layout_menu_label.h-d6df{") + Runtime.rtl.toStr("font-size: 14px;font-weight: bold;padding: 10px;") + Runtime.rtl.toStr("}.layout_menu.h-d6df{") + Runtime.rtl.toStr("position: relative;height: calc(100% - 40px);overflow-y: auto;border-right: 1px #ccc solid;") + Runtime.rtl.toStr("}.layout_menu_items.h-d6df{") + Runtime.rtl.toStr("}.layout_menu_items.h-d6df ul, .layout_menu_items.h-d6df li{") + Runtime.rtl.toStr("padding: 0; margin: 0;list-style: none;") + Runtime.rtl.toStr("}.layout_menu_items.h-d6df ul{") + Runtime.rtl.toStr("}.layout_menu_items.h-d6df li{") + Runtime.rtl.toStr("background-color: white;") + Runtime.rtl.toStr("}.layout_menu_items.h-d6df li:hover{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "hover-background"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.layout_menu_items.h-d6df li a{") + Runtime.rtl.toStr("display: block;padding: 10px 15px;border-bottom: 1px solid #e7e7e7;") + Runtime.rtl.toStr("}.layout_menu_items.h-d6df li.active > a, .layout_menu_items.h-d6df li.active > a:hover{") + Runtime.rtl.toStr("background-color: #337ab7;border-color: #337ab7;color: white;") + Runtime.rtl.toStr("}.layout_menu_logout.h-d6df{") + Runtime.rtl.toStr("text-align: center;padding-top: 100px;") + Runtime.rtl.toStr("}.layout_menu_logout.h-d6df > div{") + Runtime.rtl.toStr("padding-top: 5px;") + Runtime.rtl.toStr("}");
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var class_name = model.page_class;
			
			/* Element 'div.layout' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["layout", this.getCssHash(ctx)].join(" "),"@elem_name":"layout"}});
			
			/* Element 'div.layout_wrap' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["layout_wrap", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_wrap"}});
			
			/* Element 'div.layout_menu_wrap' */
			var __v2; var __v2_childs = [];
			[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["layout_menu_wrap", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_menu_wrap"}});
			
			/* Element 'div.layout_site_name' */
			var __v3; var __v3_childs = [];
			[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "div","attrs": {"class":["layout_site_name", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_site_name"}});
			
			/* Element 'a.nolink' */
			var __v4; var __v4_childs = [];
			[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "a","attrs": {"href":"/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Docker web panel")});
			RenderDriver.p(__v4, __v4_childs);
			RenderDriver.p(__v3, __v3_childs);
			
			/* Element 'div.layout_menu' */
			var __v3; var __v3_childs = [];
			[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "div","attrs": {"class":["layout_menu", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_menu"}});
			
			/* Element 'div.layout_menu_label' */
			var __v4; var __v4_childs = [];
			[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "div","attrs": {"class":["layout_menu_label", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_menu_label"}});
			
			/* Text */
			[__vnull, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Dashboard")});
			RenderDriver.p(__v4, __v4_childs);
			
			/* Element 'div.layout_menu_items' */
			var __v4; var __v4_childs = [];
			[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "div","attrs": {"class":["layout_menu_items", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_menu_items"}});
			
			/* Element 'ul' */
			var __v5; var __v5_childs = [];
			[__v5, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "element", {"name": "ul","attrs": {}});
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.dashboard.main")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Main")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.dashboard.nodes")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/nodes/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Nodes")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			RenderDriver.p(__v5, __v5_childs);
			RenderDriver.p(__v4, __v4_childs);
			
			/* Element 'div.layout_menu_label' */
			var __v4; var __v4_childs = [];
			[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "div","attrs": {"class":["layout_menu_label", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_menu_label"}});
			
			/* Text */
			[__vnull, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Cluster")});
			RenderDriver.p(__v4, __v4_childs);
			
			/* Element 'div.layout_menu_items' */
			var __v4; var __v4_childs = [];
			[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "div","attrs": {"class":["layout_menu_items", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_menu_items"}});
			
			/* Element 'ul' */
			var __v5; var __v5_childs = [];
			[__v5, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "element", {"name": "ul","attrs": {}});
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.services.index")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/services/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Services")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.services.yaml.index")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/services/yaml/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Yaml")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.services.yaml.files")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/services/yaml/files/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Yaml Files")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.nginx")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/nginx/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Nginx")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.cli")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/cli/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "CLI")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			RenderDriver.p(__v5, __v5_childs);
			RenderDriver.p(__v4, __v4_childs);
			
			/* Element 'div.layout_menu_label' */
			var __v4; var __v4_childs = [];
			[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "div","attrs": {"class":["layout_menu_label", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_menu_label"}});
			
			/* Text */
			[__vnull, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Admin")});
			RenderDriver.p(__v4, __v4_childs);
			
			/* Element 'div.layout_menu_items' */
			var __v4; var __v4_childs = [];
			[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "div","attrs": {"class":["layout_menu_items", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_menu_items"}});
			
			/* Element 'ul' */
			var __v5; var __v5_childs = [];
			[__v5, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "element", {"name": "ul","attrs": {}});
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.users")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/users/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Users")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/adminer/","target":"_self","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Adminer")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/adminer/info/","target":"_self","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "PHP Info")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			RenderDriver.p(__v5, __v5_childs);
			RenderDriver.p(__v4, __v4_childs);
			
			[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "div","attrs": {"class":["layout_menu_logout", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_menu_logout"}});
			RenderDriver.p(__v3, __v3_childs);
			RenderDriver.p(__v2, __v2_childs);
			
			/* Element 'div.layout_content_wrap' */
			var __v2; var __v2_childs = [];
			[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["layout_content_wrap", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_content_wrap"}});
			
			/* Element 'div.layout_title_wrap' */
			var __v3; var __v3_childs = [];
			[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "div","attrs": {"class":["layout_title_wrap", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_title_wrap"}});
			
			/* Element 'div.layout_title' */
			var __v4; var __v4_childs = [];
			[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "div","attrs": {"class":["layout_title", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_title"}});
			
			/* Text */
			[__vnull, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "text", {"content": model.title});
			RenderDriver.p(__v4, __v4_childs);
			
			/* Element 'div.layout_top_buttons' */
			var __v4; var __v4_childs = [];
			[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "div","attrs": {"class":["layout_top_buttons", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_top_buttons"}});
			
			var __v5 = new Runtime.Monad(ctx, layout);
			__v5 = __v5.attr(ctx, "data");
			__v5 = __v5.attr(ctx, "Bayrell.CloudOS.Layout.TopButtons");
			__v5 = __v5.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
			var top_buttons = __v5.value(ctx);
			
			if (Runtime.rtl.exists(ctx, top_buttons))
			{
				for (var i = 0;i < top_buttons.count(ctx);i++)
				{
					var button = Runtime.rtl.get(ctx, top_buttons, i);
					
					/* Component 'Button' */
					[__vnull, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "component", {"name": "Runtime.Web.Button.Button","attrs": {"@event:Runtime.Web.Events.MouseClickEvent":["Bayrell.CloudOS.AdminLayout","onTopButtonClick"],"@tag":button}, "layout": layout, "content": (__control) =>
					{
						var __vnull = null;
						var __control_childs = [];
						
						/* Text */
						[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": Runtime.rtl.get(ctx, button, "label")});
						
						return __control_childs;
					}});
				}
			}
			RenderDriver.p(__v4, __v4_childs);
			RenderDriver.p(__v3, __v3_childs);
			
			/* Element 'div.layout_content' */
			var __v3; var __v3_childs = [];
			[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "div","attrs": {"class":["layout_content", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_content"}});
			
			if (!Runtime.rtl.isEmpty(ctx, class_name))
			{
				[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "component", {"name": class_name,"attrs": {"@bind":["Bayrell.CloudOS.AdminLayout","page_model"],"@key":"view"}, "layout": layout});
			}
			RenderDriver.p(__v3, __v3_childs);
			RenderDriver.p(__v2, __v2_childs);
			RenderDriver.p(__v1, __v1_childs);
			
			/* Element 'div.layout_footer' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["layout_footer", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_footer"}});
			
			/* Element 'div.b_out' */
			var __v2; var __v2_childs = [];
			[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["b_out", this.getCssHash(ctx)].join(" "),"@elem_name":"b_out"}});
			
			/* Element 'div.b_in' */
			var __v3; var __v3_childs = [];
			[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "div","attrs": {"class":["b_in", this.getCssHash(ctx)].join(" "),"@elem_name":"b_in"}});
			
			/* Text */
			[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": "(c) BAYRELL Cloud OS 2020 \"Ildar Bikmamatov\" <support@bayrell.org>"});
			RenderDriver.p(__v3, __v3_childs);
			RenderDriver.p(__v2, __v2_childs);
			RenderDriver.p(__v1, __v1_childs);
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.Button.Button"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.AdminLayout";
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
			"class_name": "Bayrell.CloudOS.AdminLayout",
			"name": "Bayrell.CloudOS.AdminLayout",
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
Runtime.rtl.defClass(Bayrell.CloudOS.AdminLayout);
window["Bayrell.CloudOS.AdminLayout"] = Bayrell.CloudOS.AdminLayout;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.AdminLayout;
"use strict;"
/*!
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
Bayrell.CloudOS.Routes = function(ctx)
{
};
Object.assign(Bayrell.CloudOS.Routes.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Routes)
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
		return "Bayrell.CloudOS.Routes";
	},
});
Object.assign(Bayrell.CloudOS.Routes,
{
	/**
	 * Layout chain
	 */
	layoutChain: function(ctx, layout)
	{
		if (layout.layout_name == "default")
		{
			layout = Runtime.rtl.setAttr(ctx, layout, Runtime.Collection.from(["layout_class"]), "Bayrell.CloudOS.AdminLayout");
		}
		return Runtime.Collection.from([layout]);
	},
	/**
	 * Render chain. Set default pattern
	 */
	renderChainPatternDefault: function(ctx, container)
	{
		if (container.pattern_name == "default" && container.pattern_class == "" || container.pattern_class == "")
		{
			container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["pattern_class"]), "Bayrell.CloudOS.Pattern");
		}
		return Runtime.Collection.from([container]);
	},
	/**
	 * Render chain. Route after
	 */
	renderChainRouteAfter: function(ctx, container)
	{
		/* Change title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), container.layout.title + Runtime.rtl.toStr(" | BAYRELL Cloud OS"));
		return Runtime.Collection.from([container]);
	},
	/**
	 * Route Action
	 * @return RenderContainer
	 */
	MainPage: async function(ctx, container)
	{
		/*
		RemoteCallAnswer answer = await RenderDriver::remoteBusCall
		(
			{
				"object_name": "App.Dashboard",
				"method_name": "status",
			},
			container
		);
		*/
		var page_model = new Bayrell.CloudOS.Dashboard.MainPageModel(ctx, Runtime.Dict.from({}));
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Index page");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Dashboard.MainPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	/**
	 * Render chain
	 * Page not found
	 * @return RenderContainer
	 */
	Page404: async function(ctx, container)
	{
		if (container == null || container.isResponseExists(ctx) || container.isPageExists(ctx))
		{
			return Promise.resolve(Runtime.Collection.from([container]));
		}
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Page not found");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Page404");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), null);
		/* Set 404 code */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["new_http_code"]), 404);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Routes";
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
			"class_name": "Bayrell.CloudOS.Routes",
			"name": "Bayrell.CloudOS.Routes",
			"annotations": Collection.from([
				new Runtime.Web.RouteList(ctx, Runtime.Dict.from({})),
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
			"MainPage",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		if (field_name == "MainPage")
		{
			var Collection = Runtime.Collection;
			var Dict = Runtime.Dict;
			var IntrospectionInfo = Runtime.IntrospectionInfo;
			return new IntrospectionInfo(ctx, {
				"kind": IntrospectionInfo.ITEM_METHOD,
				"class_name": "Bayrell.CloudOS.Routes",
				"name": "MainPage",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/","name":"site:index"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Routes);
window["Bayrell.CloudOS.Routes"] = Bayrell.CloudOS.Routes;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Routes;
"use strict;"
/*
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Dashboard == 'undefined') Bayrell.CloudOS.Dashboard = {};
Bayrell.CloudOS.Dashboard.MainPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Dashboard.MainPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Dashboard.MainPage.prototype.constructor = Bayrell.CloudOS.Dashboard.MainPage;
Object.assign(Bayrell.CloudOS.Dashboard.MainPage.prototype,
{
	/**
 * On click
 */
	onClick: function(ctx, e)
	{
		var pos = Runtime.rtl.get(ctx, e.sender.params, "data-index");
		this.update(ctx, "setAttr", "active", "pos");
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Dashboard.MainPage)
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
		return "Bayrell.CloudOS.Dashboard.MainPage";
	},
});
Object.assign(Bayrell.CloudOS.Dashboard.MainPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Dashboard.MainPage,
{
	css: function(ctx, vars)
	{
		return ".content.h-e9f6{" + Runtime.rtl.toStr("height: 100%;display: flex;align-items: stretch;") + Runtime.rtl.toStr("}.left.h-e9f6, .right.h-e9f6{") + Runtime.rtl.toStr("width: 50%;position: relative;overflow-y: auto;") + Runtime.rtl.toStr("}.left.h-e9f6{") + Runtime.rtl.toStr("padding-right: 10px;") + Runtime.rtl.toStr("}.right.h-e9f6{") + Runtime.rtl.toStr("padding-left: 10px;padding-right: 10px;") + Runtime.rtl.toStr("}.services.h-e9f6{") + Runtime.rtl.toStr("display: table;border-left: 1px #ccc solid;border-top: 1px #ccc solid;width: 100%;") + Runtime.rtl.toStr("}.service.h-e9f6{") + Runtime.rtl.toStr("display: table-row;cursor: pointer;") + Runtime.rtl.toStr("}.service.h-e9f6:hover{") + Runtime.rtl.toStr("background: #eee;") + Runtime.rtl.toStr("}.service.h-e9f6.active{") + Runtime.rtl.toStr("background-color: #337ab7;border-color: #337ab7;color: white;") + Runtime.rtl.toStr("}.service_item.h-e9f6{") + Runtime.rtl.toStr("display: table-cell;padding: 5px;border-bottom: 1px #ccc solid;border-right: 1px #ccc solid;") + Runtime.rtl.toStr("}.label.h-e9f6{") + Runtime.rtl.toStr("font-weight: bold;") + Runtime.rtl.toStr("}.info_item.h-e9f6{") + Runtime.rtl.toStr("overflow-wrap: anywhere;padding-bottom: 10px;") + Runtime.rtl.toStr("}.info_item.h-e9f6:last-child{") + Runtime.rtl.toStr("padding-bottom: 0px;") + Runtime.rtl.toStr("}.info_actions.h-e9f6 > .label{") + Runtime.rtl.toStr("padding-bottom: 5px;") + Runtime.rtl.toStr("}.info_item_action.h-e9f6{") + Runtime.rtl.toStr("padding-bottom: 5px;") + Runtime.rtl.toStr("}.info_item_action.h-e9f6:last-child{") + Runtime.rtl.toStr("padding-bottom: 0px;") + Runtime.rtl.toStr("}.info_item_action.h-e9f6.state-ready .state{") + Runtime.rtl.toStr("color: #00aa00;font-weight: bold;") + Runtime.rtl.toStr("}.info_item_action.h-e9f6.state-failed .state, .info_item_action.h-e9f6.state-rejected .state{") + Runtime.rtl.toStr("color: red;font-weight: bold;") + Runtime.rtl.toStr("}.info_item_action_error.h-e9f6{") + Runtime.rtl.toStr("color: red;") + Runtime.rtl.toStr("}");
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Element 'div.content' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["content", this.getCssHash(ctx)].join(" "),"@elem_name":"content"}});
			
			/* Element 'div.left' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["left", this.getCssHash(ctx)].join(" "),"@elem_name":"left"}});
			
			/* Text */
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": this.renderServices(ctx, layout, model, params)});
			RenderDriver.p(__v1, __v1_childs);
			
			/* Element 'div.right' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["right", this.getCssHash(ctx)].join(" "),"@elem_name":"right"}});
			
			/* Text */
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": this.renderInfo(ctx, layout, model, params)});
			RenderDriver.p(__v1, __v1_childs);
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	renderServices: function(ctx, layout, model, params)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, model, "services"));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Dict", Runtime.Collection.from([])));
			var services = __v0.value(ctx);
			
			/* Element 'div.services' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["services", this.getCssHash(ctx)].join(" "),"@elem_name":"services"}});
			
			/* Element 'div.service' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["service", this.getCssHash(ctx)].join(" "),"@elem_name":"service"}});
			
			/* Element 'div.service_item.label.service_item--name' */
			var __v2; var __v2_childs = [];
			[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["service_item label service_item--name", this.getCssHash(ctx)].join(" "),"@elem_name":"service_item"}});
			
			/* Text */
			[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Name")});
			RenderDriver.p(__v2, __v2_childs);
			
			/* Element 'div.service_item.label.service_item--image' */
			var __v2; var __v2_childs = [];
			[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["service_item label service_item--image", this.getCssHash(ctx)].join(" "),"@elem_name":"service_item"}});
			
			/* Text */
			[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Image")});
			RenderDriver.p(__v2, __v2_childs);
			
			/* Element 'div.service_item.label.service_item--status' */
			var __v2; var __v2_childs = [];
			[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["service_item label service_item--status", this.getCssHash(ctx)].join(" "),"@elem_name":"service_item"}});
			
			/* Text */
			[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Status")});
			RenderDriver.p(__v2, __v2_childs);
			RenderDriver.p(__v1, __v1_childs);
			
			for (var i = 0;i < services.count(ctx);i++)
			{
				var service = Runtime.rtl.get(ctx, services, i);
				
				/* Element 'div.service' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"@event:Runtime.Web.Events.MouseClickEvent":["Bayrell.CloudOS.Dashboard.MainPage","onClick"],"data-index":i,"class":["service", ((model.active == i) ? ("active") : ("")), this.getCssHash(ctx)].join(" "),"@elem_name":"service"}});
				
				/* Element 'div.service_item.service_item--name' */
				var __v2; var __v2_childs = [];
				[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["service_item service_item--name", this.getCssHash(ctx)].join(" "),"@elem_name":"service_item"}});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": Runtime.rtl.get(ctx, service, "_name")});
				RenderDriver.p(__v2, __v2_childs);
				
				/* Element 'div.service_item.service_item--image' */
				var __v2; var __v2_childs = [];
				[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["service_item service_item--image", this.getCssHash(ctx)].join(" "),"@elem_name":"service_item"}});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": this.trimImageName(ctx, Runtime.rtl.get(ctx, service, "_image"))});
				RenderDriver.p(__v2, __v2_childs);
				
				/* Element 'div.service_item.service_item--status' */
				var __v2; var __v2_childs = [];
				[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["service_item service_item--status", this.getCssHash(ctx)].join(" "),"@elem_name":"service_item"}});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": Runtime.rtl.attr(ctx, service, ["balancer", "State", "Work"])});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": " / "});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": Runtime.rtl.attr(ctx, service, ["balancer", "State", "Total"])});
				RenderDriver.p(__v2, __v2_childs);
				RenderDriver.p(__v1, __v1_childs);
			}
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	renderInfo: function(ctx, layout, model, params)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var service = Runtime.rtl.attr(ctx, model, ["services", model.active]);
			
			if (service != null)
			{
				var tasks = Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, service, "balancer"), "Tasks");
				
				var errors = Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, service, "balancer"), "Tasks").filter(ctx, (ctx, task) => 
				{
					return Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Status"), "State") == "rejected" || Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Status"), "State") == "failed" || Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Status"), "State") == "running";
				});
				
				/* Element 'div.info' */
				var __v0; var __v0_childs = [];
				[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["info", this.getCssHash(ctx)].join(" "),"@elem_name":"info"}});
				
				/* Element 'div.info_item.info_item--name' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["info_item info_item--name", this.getCssHash(ctx)].join(" "),"@elem_name":"info_item"}});
				
				/* Element 'b' */
				var __v2; var __v2_childs = [];
				[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "b","attrs": {}});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Name")});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ":"});
				RenderDriver.p(__v2, __v2_childs);
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": " "});
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": Runtime.rtl.get(ctx, service, "_name")});
				RenderDriver.p(__v1, __v1_childs);
				
				/* Element 'div.info_item.info_item--image' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["info_item info_item--image", this.getCssHash(ctx)].join(" "),"@elem_name":"info_item"}});
				
				/* Element 'b' */
				var __v2; var __v2_childs = [];
				[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "b","attrs": {}});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Image")});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ":"});
				RenderDriver.p(__v2, __v2_childs);
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": " "});
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": Runtime.rtl.get(ctx, service, "_image")});
				RenderDriver.p(__v1, __v1_childs);
				
				/* Element 'div.info_item.info_item--status' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["info_item info_item--status", this.getCssHash(ctx)].join(" "),"@elem_name":"info_item"}});
				
				/* Element 'b' */
				var __v2; var __v2_childs = [];
				[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "b","attrs": {}});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Status")});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ":"});
				RenderDriver.p(__v2, __v2_childs);
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": "&nbsp;"});
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": Runtime.rtl.attr(ctx, service, ["balancer", "State", "Work"])});
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": " / "});
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": Runtime.rtl.attr(ctx, service, ["balancer", "State", "Total"])});
				RenderDriver.p(__v1, __v1_childs);
				
				if (tasks.count(ctx) > 0)
				{
					/* Element 'div.info_item.info_actions' */
					var __v1; var __v1_childs = [];
					[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["info_item info_actions", this.getCssHash(ctx)].join(" "),"@elem_name":"info_item"}});
					
					/* Element 'div.label.bold' */
					var __v2; var __v2_childs = [];
					[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["label bold", this.getCssHash(ctx)].join(" "),"@key":"label","@elem_name":"label"}});
					
					/* Text */
					[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Last actions")});
					
					/* Text */
					[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ":"});
					RenderDriver.p(__v2, __v2_childs);
					
					for (var i = 0;i < tasks.count(ctx);i++)
					{
						var task = Runtime.rtl.get(ctx, tasks, i);
						
						/* Element 'div.info_item_action' */
						var __v2; var __v2_childs = [];
						[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["info_item_action", "state-" + Runtime.rtl.toStr(Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Status"), "State")), this.getCssHash(ctx)].join(" "),"@elem_name":"info_item_action"}});
						
						/* Text */
						[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": Runtime.rs.substr(ctx, Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Status"), "Timestamp"), 0, 19)});
						
						/* Text */
						[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": "&nbsp;"});
						
						/* Element 'span.state' */
						var __v3; var __v3_childs = [];
						[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "span","attrs": {"class":["state", this.getCssHash(ctx)].join(" "),"@elem_name":"state"}});
						
						/* Text */
						[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": Runtime.rs.strtoupper(ctx, Runtime.rtl.attr(ctx, task, ["Status", "State"]))});
						RenderDriver.p(__v3, __v3_childs);
						
						/* Text */
						[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": "&nbsp;\n\t\t\t\t\t\t\ton "});
						
						/* Text */
						[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Node"), "Hostname")});
						
						/* Text */
						[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ", id="});
						
						/* Text */
						[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": Runtime.rtl.get(ctx, task, "ID")});
						
						if (Runtime.rtl.attr(ctx, task, ["Status", "State"]) == "rejected" || Runtime.rtl.attr(ctx, task, ["Status", "State"]) == "failed")
						{
							/* Element 'div.info_item_action_error' */
							var __v3; var __v3_childs = [];
							[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "div","attrs": {"class":["info_item_action_error", this.getCssHash(ctx)].join(" "),"@elem_name":"info_item_action_error"}});
							
							/* Text */
							[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": Runtime.rtl.attr(ctx, task, ["Status", "Err"])});
							RenderDriver.p(__v3, __v3_childs);
						}
						RenderDriver.p(__v2, __v2_childs);
					}
					RenderDriver.p(__v1, __v1_childs);
				}
				RenderDriver.p(__v0, __v0_childs);
			}
			
			return __control_childs;
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
		return "Bayrell.CloudOS.Dashboard";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Dashboard.MainPage";
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
			"class_name": "Bayrell.CloudOS.Dashboard.MainPage",
			"name": "Bayrell.CloudOS.Dashboard.MainPage",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Dashboard.MainPage);
window["Bayrell.CloudOS.Dashboard.MainPage"] = Bayrell.CloudOS.Dashboard.MainPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Dashboard.MainPage;
"use strict;"
/*!
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Dashboard == 'undefined') Bayrell.CloudOS.Dashboard = {};
Bayrell.CloudOS.Dashboard.MainPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.Dashboard.MainPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.Dashboard.MainPageModel.prototype.constructor = Bayrell.CloudOS.Dashboard.MainPageModel;
Object.assign(Bayrell.CloudOS.Dashboard.MainPageModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.services = null;
		this.active = -1;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Dashboard.MainPageModel)
		{
			this.services = o.services;
			this.active = o.active;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "services")this.services = v;
		else if (k == "active")this.active = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "services")return this.services;
		else if (k == "active")return this.active;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Dashboard.MainPageModel";
	},
});
Object.assign(Bayrell.CloudOS.Dashboard.MainPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.Dashboard.MainPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Dashboard";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Dashboard.MainPageModel";
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
			"class_name": "Bayrell.CloudOS.Dashboard.MainPageModel",
			"name": "Bayrell.CloudOS.Dashboard.MainPageModel",
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
			"class_name": "Bayrell.CloudOS.Dashboard.MainPageModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "active") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.CloudOS.Dashboard.MainPageModel",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Dashboard.MainPageModel);
window["Bayrell.CloudOS.Dashboard.MainPageModel"] = Bayrell.CloudOS.Dashboard.MainPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Dashboard.MainPageModel;
"use strict;"
/*
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Other == 'undefined') Bayrell.CloudOS.Other = {};
Bayrell.CloudOS.Other.AdminerPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Other.AdminerPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Other.AdminerPage.prototype.constructor = Bayrell.CloudOS.Other.AdminerPage;
Object.assign(Bayrell.CloudOS.Other.AdminerPage.prototype,
{
	/**
 * On component created
 */
	onCreated: function(ctx)
	{
		adminer_form.submit();
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Other.AdminerPage)
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
		return "Bayrell.CloudOS.Other.AdminerPage";
	},
});
Object.assign(Bayrell.CloudOS.Other.AdminerPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Other.AdminerPage,
{
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Element 'div' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {}});
			
			/* Text */
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": "Redirect. Please wait..."});
			
			/* Element 'form' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "form","attrs": {"id":"adminer_form","method":"post","action":"/adminer/4.7.6/"}});
			
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "input","attrs": {"type":"hidden","name":"auth[driver]","value":"server"}});
			
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "input","attrs": {"type":"hidden","name":"auth[server]","value":Runtime.rtl.attr(ctx, model, ["db", "host"])}});
			
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "input","attrs": {"type":"hidden","name":"auth[username]","value":Runtime.rtl.attr(ctx, model, ["db", "username"])}});
			
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "input","attrs": {"type":"hidden","name":"auth[password]","value":Runtime.rtl.attr(ctx, model, ["db", "password"])}});
			
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "input","attrs": {"type":"hidden","name":"auth[permanent]","value":"1"}});
			RenderDriver.p(__v1, __v1_childs);
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Other";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Other.AdminerPage";
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
			"class_name": "Bayrell.CloudOS.Other.AdminerPage",
			"name": "Bayrell.CloudOS.Other.AdminerPage",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Other.AdminerPage);
window["Bayrell.CloudOS.Other.AdminerPage"] = Bayrell.CloudOS.Other.AdminerPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Other.AdminerPage;
"use strict;"
/*
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Nginx == 'undefined') Bayrell.CloudOS.Nginx = {};
Bayrell.CloudOS.Nginx.NginxPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Nginx.NginxPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Nginx.NginxPage.prototype.constructor = Bayrell.CloudOS.Nginx.NginxPage;
Object.assign(Bayrell.CloudOS.Nginx.NginxPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Nginx.NginxPage)
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
		return "Bayrell.CloudOS.Nginx.NginxPage";
	},
});
Object.assign(Bayrell.CloudOS.Nginx.NginxPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Nginx.NginxPage,
{
	css: function(ctx, vars)
	{
	},
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		/* Create model */
		var page_model = new Bayrell.CloudOS.Nginx.NginxPageModel(ctx, Runtime.Dict.from({"crud":new Runtime.Web.CRUD.CrudPageModel(ctx, Runtime.Dict.from({}))}));
		/* Remote call */
		var search_params = Runtime.Web.CRUD.CrudPageModel.getCrudSearchParams(ctx, container.request);
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.Nginx","interface_name":"core.crud","method_name":"search","data":search_params}), container);
		/* Answer */
		if (answer.isSuccess(ctx))
		{
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "rows"]), Runtime.rtl.get(ctx, answer.response, "items"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "page"]), Runtime.rtl.get(ctx, answer.response, "page"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "pages"]), Runtime.rtl.get(ctx, answer.response, "pages"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "limit"]), Runtime.rtl.get(ctx, answer.response, "limit"));
		}
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Nginx page");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Nginx.NginxPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var crud_settings = Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				var table_model = Runtime.rtl.get(ctx, params, "table-model");
				var index = Runtime.rtl.get(ctx, params, "row-index");
				if (table_model)
				{
					return index + 1;
				}
				return "";
			}})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"name","label":"Name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"enable","label":"Enable","class_name":"Runtime.Web.Input.Select","class_name_table":"Runtime.Web.Input.SelectText","class_settings":Runtime.Dict.from({"filter_show_select_value":true,"show_select_value":false,"options":Runtime.Collection.from([Runtime.Dict.from({"id":0,"value":"No"}),Runtime.Dict.from({"id":1,"value":"Yes"})])})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"content","label":"Content","class_name":"Runtime.Web.Input.TextArea"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				return Runtime.Collection.from([Runtime.Web.CRUD.CrudPage.buttonEdit(ctx, layout, model, params, content),Runtime.Web.CRUD.CrudPage.buttonDelete(ctx, layout, model, params, content)]);
			}})}))]);
			
			var filter_fields = Runtime.Collection.from(["name","enable"]);
			
			var form_fields = Runtime.Collection.from(["name","enable","content"]);
			
			var table_fields = Runtime.Collection.from(["number","name","enable","edit-buttons"]);
			
			var messages = Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.CloudOS", "Add nginx file")});
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.CRUD.CrudPage","attrs": {"@name":["Bayrell.CloudOS.Nginx.NginxPage","crud"],"object_name":"Bayrell.CloudOS.Nginx","crud_settings":crud_settings,"filter_fields":filter_fields,"form_fields":form_fields,"table_fields":table_fields,"messages":messages}, "layout": layout});
			
			return __control_childs;
		};
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText","Runtime.Web.Input.TextArea"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Nginx";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Nginx.NginxPage";
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
			"class_name": "Bayrell.CloudOS.Nginx.NginxPage",
			"name": "Bayrell.CloudOS.Nginx.NginxPage",
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
				"class_name": "Bayrell.CloudOS.Nginx.NginxPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/nginx/","name":"app.nginx"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Nginx.NginxPage);
window["Bayrell.CloudOS.Nginx.NginxPage"] = Bayrell.CloudOS.Nginx.NginxPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Nginx.NginxPage;
"use strict;"
/*!
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Nginx == 'undefined') Bayrell.CloudOS.Nginx = {};
Bayrell.CloudOS.Nginx.NginxPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.Nginx.NginxPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.Nginx.NginxPageModel.prototype.constructor = Bayrell.CloudOS.Nginx.NginxPageModel;
Object.assign(Bayrell.CloudOS.Nginx.NginxPageModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.crud = null;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Nginx.NginxPageModel)
		{
			this.crud = o.crud;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "crud")this.crud = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "crud")return this.crud;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Nginx.NginxPageModel";
	},
});
Object.assign(Bayrell.CloudOS.Nginx.NginxPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.Nginx.NginxPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Nginx";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Nginx.NginxPageModel";
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
			"class_name": "Bayrell.CloudOS.Nginx.NginxPageModel",
			"name": "Bayrell.CloudOS.Nginx.NginxPageModel",
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
			a.push("crud");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "crud") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.CloudOS.Nginx.NginxPageModel",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Nginx.NginxPageModel);
window["Bayrell.CloudOS.Nginx.NginxPageModel"] = Bayrell.CloudOS.Nginx.NginxPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Nginx.NginxPageModel;
"use strict;"
/*
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Services == 'undefined') Bayrell.CloudOS.Services = {};
Bayrell.CloudOS.Services.ServicesPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Services.ServicesPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Services.ServicesPage.prototype.constructor = Bayrell.CloudOS.Services.ServicesPage;
Object.assign(Bayrell.CloudOS.Services.ServicesPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Services.ServicesPage)
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
		return "Bayrell.CloudOS.Services.ServicesPage";
	},
});
Object.assign(Bayrell.CloudOS.Services.ServicesPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Services.ServicesPage,
{
	css: function(ctx, vars)
	{
	},
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		/* Create model */
		var page_model = new Bayrell.CloudOS.Services.ServicesPageModel(ctx, Runtime.Dict.from({"crud":new Runtime.Web.CRUD.CrudPageModel(ctx, Runtime.Dict.from({}))}));
		/* Remote call */
		var search_params = Runtime.Web.CRUD.CrudPageModel.getCrudSearchParams(ctx, container.request);
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.Services","interface_name":"core.crud","method_name":"search","data":search_params}), container);
		/* Answer */
		if (answer.isSuccess(ctx))
		{
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "rows"]), Runtime.rtl.get(ctx, answer.response, "items"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "page"]), Runtime.rtl.get(ctx, answer.response, "page"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "pages"]), Runtime.rtl.get(ctx, answer.response, "pages"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "limit"]), Runtime.rtl.get(ctx, answer.response, "limit"));
		}
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Services page");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Services.ServicesPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var crud_settings = Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":Runtime.Web.CRUD.CrudPage.fieldNumber})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"_name","label":"Name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"_image","label":"Image","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				return this.trimImageName(ctx, model);
			}})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"enable","label":"Enable","class_name":"Runtime.Web.Input.Select","class_name_table":"Runtime.Web.Input.SelectText","class_settings":Runtime.Dict.from({"filter_show_select_value":true,"show_select_value":false,"options":Runtime.Collection.from([Runtime.Dict.from({"id":0,"value":"No"}),Runtime.Dict.from({"id":1,"value":"Yes"})])})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				return Runtime.Collection.from([Runtime.Web.CRUD.CrudPage.buttonEdit(ctx, layout, model, params, content),Runtime.Web.CRUD.CrudPage.buttonDelete(ctx, layout, model, params, content)]);
			}})}))]);
			
			var filter_fields = Runtime.Collection.from(["_name","_image","enable"]);
			
			var form_fields = Runtime.Collection.from(["_name","_image","enable","password1","password2"]);
			
			var table_fields = Runtime.Collection.from(["number","_name","_image","enable","edit-buttons"]);
			
			var messages = Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.CloudOS", "Add service"),"delete":(ctx, item) => 
			{
				return ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "_name")}));
			}});
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.CRUD.CrudPage","attrs": {"@name":["Bayrell.CloudOS.Services.ServicesPage","crud"],"object_name":"Bayrell.CloudOS.Services","crud_settings":crud_settings,"filter_fields":filter_fields,"form_fields":form_fields,"table_fields":table_fields,"messages":messages}, "layout": layout});
			
			return __control_childs;
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
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Services";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Services.ServicesPage";
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
			"class_name": "Bayrell.CloudOS.Services.ServicesPage",
			"name": "Bayrell.CloudOS.Services.ServicesPage",
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
				"class_name": "Bayrell.CloudOS.Services.ServicesPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/services/","name":"app.services.index"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Services.ServicesPage);
window["Bayrell.CloudOS.Services.ServicesPage"] = Bayrell.CloudOS.Services.ServicesPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Services.ServicesPage;
"use strict;"
/*!
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Services == 'undefined') Bayrell.CloudOS.Services = {};
Bayrell.CloudOS.Services.ServicesPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.Services.ServicesPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.Services.ServicesPageModel.prototype.constructor = Bayrell.CloudOS.Services.ServicesPageModel;
Object.assign(Bayrell.CloudOS.Services.ServicesPageModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.crud = null;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Services.ServicesPageModel)
		{
			this.crud = o.crud;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "crud")this.crud = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "crud")return this.crud;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Services.ServicesPageModel";
	},
});
Object.assign(Bayrell.CloudOS.Services.ServicesPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.Services.ServicesPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Services";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Services.ServicesPageModel";
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
			"class_name": "Bayrell.CloudOS.Services.ServicesPageModel",
			"name": "Bayrell.CloudOS.Services.ServicesPageModel",
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
			a.push("crud");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "crud") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.CloudOS.Services.ServicesPageModel",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Services.ServicesPageModel);
window["Bayrell.CloudOS.Services.ServicesPageModel"] = Bayrell.CloudOS.Services.ServicesPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Services.ServicesPageModel;
"use strict;"
/*
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Services == 'undefined') Bayrell.CloudOS.Services = {};
Bayrell.CloudOS.Services.YamlFilesPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Services.YamlFilesPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Services.YamlFilesPage.prototype.constructor = Bayrell.CloudOS.Services.YamlFilesPage;
Object.assign(Bayrell.CloudOS.Services.YamlFilesPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Services.YamlFilesPage)
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
		return "Bayrell.CloudOS.Services.YamlFilesPage";
	},
});
Object.assign(Bayrell.CloudOS.Services.YamlFilesPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Services.YamlFilesPage,
{
	css: function(ctx, vars)
	{
	},
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		/* Create model */
		var page_model = new Bayrell.CloudOS.Services.YamlFilesPageModel(ctx, Runtime.Dict.from({"crud":new Runtime.Web.CRUD.CrudPageModel(ctx, Runtime.Dict.from({}))}));
		/* Remote call */
		var search_params = Runtime.Web.CRUD.CrudPageModel.getCrudSearchParams(ctx, container.request);
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.YamlFiles","interface_name":"core.crud","method_name":"search","data":search_params}), container);
		/* Answer */
		if (answer.isSuccess(ctx))
		{
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "rows"]), Runtime.rtl.get(ctx, answer.response, "items"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "page"]), Runtime.rtl.get(ctx, answer.response, "page"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "pages"]), Runtime.rtl.get(ctx, answer.response, "pages"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "limit"]), Runtime.rtl.get(ctx, answer.response, "limit"));
		}
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Yaml files page");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Services.YamlFilesPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var crud_settings = Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":Runtime.Web.CRUD.CrudPage.fieldNumber})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"file_name","label":"File name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"content","label":"Content","class_name":"Runtime.Web.Input.TextArea"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				return Runtime.Collection.from([Runtime.Web.CRUD.CrudPage.buttonEdit(ctx, layout, model, params, content),Runtime.Web.CRUD.CrudPage.buttonDelete(ctx, layout, model, params, content)]);
			}})}))]);
			
			var filter_fields = Runtime.Collection.from(["file_name"]);
			
			var form_fields = Runtime.Collection.from(["file_name","content"]);
			
			var table_fields = Runtime.Collection.from(["number","file_name","edit-buttons"]);
			
			var messages = Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.CloudOS", "Add yaml file"),"delete":(ctx, item) => 
			{
				return ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "file_name")}));
			}});
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.CRUD.CrudPage","attrs": {"@name":["Bayrell.CloudOS.Services.YamlFilesPage","crud"],"object_name":"Bayrell.CloudOS.YamlFiles","crud_settings":crud_settings,"filter_fields":filter_fields,"form_fields":form_fields,"table_fields":table_fields,"messages":messages,"dialog_form":Runtime.Dict.from({"width":"800px"})}, "layout": layout});
			
			return __control_childs;
		};
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText","Runtime.Web.Input.TextArea"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Services";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Services.YamlFilesPage";
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
			"class_name": "Bayrell.CloudOS.Services.YamlFilesPage",
			"name": "Bayrell.CloudOS.Services.YamlFilesPage",
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
				"class_name": "Bayrell.CloudOS.Services.YamlFilesPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/services/yaml/files/","name":"app.services.yaml.files"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Services.YamlFilesPage);
window["Bayrell.CloudOS.Services.YamlFilesPage"] = Bayrell.CloudOS.Services.YamlFilesPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Services.YamlFilesPage;
"use strict;"
/*!
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Services == 'undefined') Bayrell.CloudOS.Services = {};
Bayrell.CloudOS.Services.YamlFilesPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.Services.YamlFilesPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.Services.YamlFilesPageModel.prototype.constructor = Bayrell.CloudOS.Services.YamlFilesPageModel;
Object.assign(Bayrell.CloudOS.Services.YamlFilesPageModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.crud = null;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Services.YamlFilesPageModel)
		{
			this.crud = o.crud;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "crud")this.crud = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "crud")return this.crud;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Services.YamlFilesPageModel";
	},
});
Object.assign(Bayrell.CloudOS.Services.YamlFilesPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.Services.YamlFilesPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Services";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Services.YamlFilesPageModel";
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
			"class_name": "Bayrell.CloudOS.Services.YamlFilesPageModel",
			"name": "Bayrell.CloudOS.Services.YamlFilesPageModel",
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
			a.push("crud");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "crud") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.CloudOS.Services.YamlFilesPageModel",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Services.YamlFilesPageModel);
window["Bayrell.CloudOS.Services.YamlFilesPageModel"] = Bayrell.CloudOS.Services.YamlFilesPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Services.YamlFilesPageModel;
"use strict;"
/*
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Services == 'undefined') Bayrell.CloudOS.Services = {};
Bayrell.CloudOS.Services.YamlPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Services.YamlPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Services.YamlPage.prototype.constructor = Bayrell.CloudOS.Services.YamlPage;
Object.assign(Bayrell.CloudOS.Services.YamlPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Services.YamlPage)
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
		return "Bayrell.CloudOS.Services.YamlPage";
	},
});
Object.assign(Bayrell.CloudOS.Services.YamlPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Services.YamlPage,
{
	css: function(ctx, vars)
	{
	},
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		/* Create model */
		var page_model = new Bayrell.CloudOS.Services.YamlPageModel(ctx, Runtime.Dict.from({"crud":new Runtime.Web.CRUD.CrudPageModel(ctx, Runtime.Dict.from({}))}));
		/* Remote call */
		var search_params = Runtime.Web.CRUD.CrudPageModel.getCrudSearchParams(ctx, container.request);
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.Yaml","interface_name":"core.crud","method_name":"search","data":search_params}), container);
		/* Answer */
		if (answer.isSuccess(ctx))
		{
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "rows"]), Runtime.rtl.get(ctx, answer.response, "items"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "page"]), Runtime.rtl.get(ctx, answer.response, "page"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "pages"]), Runtime.rtl.get(ctx, answer.response, "pages"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "limit"]), Runtime.rtl.get(ctx, answer.response, "limit"));
		}
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Yaml page");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Services.YamlPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var crud_settings = Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":Runtime.Web.CRUD.CrudPage.fieldNumber})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"name","label":"Name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"stack","label":"Stack","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"content","label":"Content","class_name":"Runtime.Web.Input.TextArea"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				return Runtime.Collection.from([Runtime.Web.CRUD.CrudPage.buttonEdit(ctx, layout, model, params, content),Runtime.Web.CRUD.CrudPage.buttonDelete(ctx, layout, model, params, content)]);
			}})}))]);
			
			var filter_fields = Runtime.Collection.from(["name","stack"]);
			
			var form_fields = Runtime.Collection.from(["name","stack","content"]);
			
			var table_fields = Runtime.Collection.from(["number","name","stack","edit-buttons"]);
			
			var messages = Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.CloudOS", "Add yaml service")});
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.CRUD.CrudPage","attrs": {"@name":["Bayrell.CloudOS.Services.YamlPage","crud"],"object_name":"Bayrell.CloudOS.Yaml","crud_settings":crud_settings,"filter_fields":filter_fields,"form_fields":form_fields,"table_fields":table_fields,"messages":messages,"dialog_form":Runtime.Dict.from({"width":"800px"})}, "layout": layout});
			
			return __control_childs;
		};
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText","Runtime.Web.Input.TextArea"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Services";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Services.YamlPage";
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
			"class_name": "Bayrell.CloudOS.Services.YamlPage",
			"name": "Bayrell.CloudOS.Services.YamlPage",
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
				"class_name": "Bayrell.CloudOS.Services.YamlPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/services/yaml/","name":"app.services.yaml.index"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Services.YamlPage);
window["Bayrell.CloudOS.Services.YamlPage"] = Bayrell.CloudOS.Services.YamlPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Services.YamlPage;
"use strict;"
/*!
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.Services == 'undefined') Bayrell.CloudOS.Services = {};
Bayrell.CloudOS.Services.YamlPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.Services.YamlPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.Services.YamlPageModel.prototype.constructor = Bayrell.CloudOS.Services.YamlPageModel;
Object.assign(Bayrell.CloudOS.Services.YamlPageModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.crud = null;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Services.YamlPageModel)
		{
			this.crud = o.crud;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "crud")this.crud = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "crud")return this.crud;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Services.YamlPageModel";
	},
});
Object.assign(Bayrell.CloudOS.Services.YamlPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.Services.YamlPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Services";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Services.YamlPageModel";
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
			"class_name": "Bayrell.CloudOS.Services.YamlPageModel",
			"name": "Bayrell.CloudOS.Services.YamlPageModel",
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
			a.push("crud");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "crud") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.CloudOS.Services.YamlPageModel",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Services.YamlPageModel);
window["Bayrell.CloudOS.Services.YamlPageModel"] = Bayrell.CloudOS.Services.YamlPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Services.YamlPageModel;
"use strict;"
/*
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.User == 'undefined') Bayrell.CloudOS.User = {};
Bayrell.CloudOS.User.UsersPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.User.UsersPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.User.UsersPage.prototype.constructor = Bayrell.CloudOS.User.UsersPage;
Object.assign(Bayrell.CloudOS.User.UsersPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.User.UsersPage)
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
		return "Bayrell.CloudOS.User.UsersPage";
	},
});
Object.assign(Bayrell.CloudOS.User.UsersPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.User.UsersPage,
{
	css: function(ctx, vars)
	{
	},
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		/* Create model */
		var page_model = new Bayrell.CloudOS.User.UsersPageModel(ctx, Runtime.Dict.from({"crud":new Runtime.Web.CRUD.CrudPageModel(ctx, Runtime.Dict.from({}))}));
		/* Remote call */
		var search_params = Runtime.Web.CRUD.CrudPageModel.getCrudSearchParams(ctx, container.request);
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.Users","interface_name":"core.crud","method_name":"search","data":search_params}), container);
		/* Answer */
		if (answer.isSuccess(ctx))
		{
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "rows"]), Runtime.rtl.get(ctx, answer.response, "items"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "page"]), Runtime.rtl.get(ctx, answer.response, "page"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "pages"]), Runtime.rtl.get(ctx, answer.response, "pages"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "limit"]), Runtime.rtl.get(ctx, answer.response, "limit"));
		}
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Users page");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.User.UsersPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var crud_settings = Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				var table_model = Runtime.rtl.get(ctx, params, "table-model");
				var index = Runtime.rtl.get(ctx, params, "row-index");
				if (table_model)
				{
					return index + 1;
				}
				return "";
			}})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"name","label":"Name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"banned","label":"Banned","class_name":"Runtime.Web.Input.Select","class_name_table":"Runtime.Web.Input.SelectText","class_settings":Runtime.Dict.from({"filter_show_select_value":true,"show_select_value":false,"options":Runtime.Collection.from([Runtime.Dict.from({"id":0,"value":"No"}),Runtime.Dict.from({"id":1,"value":"Yes"})])})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				return Runtime.Collection.from([Runtime.Web.CRUD.CrudPage.buttonEdit(ctx, layout, model, params, content),Runtime.Web.CRUD.CrudPage.buttonDelete(ctx, layout, model, params, content)]);
			}})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"password1","label":"Password","class_name":"Runtime.Web.Input.Input","class_settings":Runtime.Dict.from({"type":"password"})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"password2","label":"Password","class_name":"Runtime.Web.Input.Input","class_settings":Runtime.Dict.from({"type":"password"})}))]);
			
			var filter_fields = Runtime.Collection.from(["name","banned"]);
			
			var form_fields = Runtime.Collection.from(["name","banned","password1","password2"]);
			
			var table_fields = Runtime.Collection.from(["number","name","banned","edit-buttons"]);
			
			var messages = Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.CloudOS", "Add user")});
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.CRUD.CrudPage","attrs": {"@name":["Bayrell.CloudOS.User.UsersPage","crud"],"object_name":"Bayrell.CloudOS.Users","crud_settings":crud_settings,"filter_fields":filter_fields,"form_fields":form_fields,"table_fields":table_fields,"messages":messages}, "layout": layout});
			
			return __control_childs;
		};
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.User";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.User.UsersPage";
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
			"class_name": "Bayrell.CloudOS.User.UsersPage",
			"name": "Bayrell.CloudOS.User.UsersPage",
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
				"class_name": "Bayrell.CloudOS.User.UsersPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/users/","name":"app.users"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.User.UsersPage);
window["Bayrell.CloudOS.User.UsersPage"] = Bayrell.CloudOS.User.UsersPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.User.UsersPage;
"use strict;"
/*!
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
if (typeof Bayrell.CloudOS.User == 'undefined') Bayrell.CloudOS.User = {};
Bayrell.CloudOS.User.UsersPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.User.UsersPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.User.UsersPageModel.prototype.constructor = Bayrell.CloudOS.User.UsersPageModel;
Object.assign(Bayrell.CloudOS.User.UsersPageModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.crud = null;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.User.UsersPageModel)
		{
			this.crud = o.crud;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "crud")this.crud = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "crud")return this.crud;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.User.UsersPageModel";
	},
});
Object.assign(Bayrell.CloudOS.User.UsersPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.User.UsersPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.User";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.User.UsersPageModel";
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
			"class_name": "Bayrell.CloudOS.User.UsersPageModel",
			"name": "Bayrell.CloudOS.User.UsersPageModel",
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
			a.push("crud");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		if (field_name == "crud") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.CloudOS.User.UsersPageModel",
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
Runtime.rtl.defClass(Bayrell.CloudOS.User.UsersPageModel);
window["Bayrell.CloudOS.User.UsersPageModel"] = Bayrell.CloudOS.User.UsersPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.User.UsersPageModel;
"use strict;"
/*
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
Bayrell.CloudOS.Page404 = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Page404.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Page404.prototype.constructor = Bayrell.CloudOS.Page404;
Object.assign(Bayrell.CloudOS.Page404.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Page404)
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
		return "Bayrell.CloudOS.Page404";
	},
});
Object.assign(Bayrell.CloudOS.Page404, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Page404,
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
			
			/* Text */
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Page not found")});
			
			return __control_childs;
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Page404";
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
			"class_name": "Bayrell.CloudOS.Page404",
			"name": "Bayrell.CloudOS.Page404",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Page404);
window["Bayrell.CloudOS.Page404"] = Bayrell.CloudOS.Page404;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Page404;
"use strict;"
/*!
 *  Bayrell Cloud OS
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.CloudOS == 'undefined') Bayrell.CloudOS = {};
Bayrell.CloudOS.ModuleDescription = function(ctx)
{
};
Object.assign(Bayrell.CloudOS.ModuleDescription.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.ModuleDescription)
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
		return "Bayrell.CloudOS.ModuleDescription";
	},
});
Object.assign(Bayrell.CloudOS.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function(ctx)
	{
		return "Bayrell.CloudOS";
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
	 * @return Dict<string>
	 */
	requiredModules: function(ctx)
	{
		return Runtime.Dict.from({"Runtime":">=0.3","Runtime.Web":"*","Runtime.Web.CRUD":"*"});
	},
	/**
	 * Returns enities
	 */
	entities: function(ctx)
	{
		return Runtime.Collection.from([new Runtime.Core.Driver(ctx, Runtime.Dict.from({"name":"root-controller","value":"Runtime.Web.RenderController","params":Runtime.Dict.from({"selector":"#root","main_controller":true,"window":"RootController"})})),new Runtime.Core.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderDriver.LAYOUT_CHAIN,"pos":10,"value":"Bayrell.CloudOS.Routes::layoutChain"})),new Runtime.Core.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderDriver.RENDER_CHAIN,"value":"Bayrell.CloudOS.Routes::Page404","pos":Runtime.Web.RenderDriver.RENDER_CHAIN_CALL_PAGE_NOT_FOUND,"is_async":true})),new Runtime.Core.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderDriver.RENDER_CHAIN,"value":"Bayrell.CloudOS.Routes::renderChainRouteAfter","pos":Runtime.Web.RenderDriver.RENDER_CHAIN_CALL_ROUTE_AFTER,"is_async":true})),new Runtime.Core.Entity(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Routes"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Nginx.NginxPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Services.ServicesPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Services.YamlFilesPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Services.YamlPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.User.UsersPage"}))]);
	},
	/**
	 * Returns context settings
	 * @return Dict<string>
	 */
	appSettings: function(ctx, env)
	{
		return Runtime.Dict.from({"config":Runtime.Dict.from({"Runtime.Web":Runtime.Dict.from({"f_inc":"1"})}),"secrets":Runtime.Dict.from({}),"providers":Runtime.Dict.from({})});
	},
	/**
	 * Init app
	 */
	appInit: function(ctx, c)
	{
		return c.constructor.init(ctx, c);
	},
	/**
	 * Start app
	 */
	appStart: async function(ctx, c)
	{
		return Promise.resolve(await c.constructor.start(ctx, c));
	},
	/**
	 * Run app
	 */
	appRun: async function(ctx)
	{
		var controller = ctx.getDriver(ctx, "Runtime.Web.RouteController");
		await controller.renderFirst(ctx);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.ModuleDescription";
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
			"class_name": "Bayrell.CloudOS.ModuleDescription",
			"name": "Bayrell.CloudOS.ModuleDescription",
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
			"appRun",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.ModuleDescription);
window["Bayrell.CloudOS.ModuleDescription"] = Bayrell.CloudOS.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.ModuleDescription;