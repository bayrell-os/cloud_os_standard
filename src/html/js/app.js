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
			[__vnull, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Design")});
			RenderDriver.p(__v4, __v4_childs);
			
			/* Element 'div.layout_menu_items' */
			var __v4; var __v4_childs = [];
			[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "div","attrs": {"class":["layout_menu_items", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_menu_items"}});
			
			/* Element 'ul' */
			var __v5; var __v5_childs = [];
			[__v5, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "element", {"name": "ul","attrs": {}});
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.design.stacks")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/design/stacks/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Stacks")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.design.spaces")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/design/spaces/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Virtual spaces")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.design.softwares")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/design/softwares/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Softwares")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.design.services")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/design/services/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Services")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.design.layers")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/design/layers/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Layers")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.design.nginx")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/design/nginx/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Nginx Files")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.design.logic_map")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/design/logic_map/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Logic Map")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			RenderDriver.p(__v5, __v5_childs);
			RenderDriver.p(__v4, __v4_childs);
			
			/* Element 'div.layout_menu_label' */
			var __v4; var __v4_childs = [];
			[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "div","attrs": {"class":["layout_menu_label", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_menu_label"}});
			
			/* Text */
			[__vnull, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Docker")});
			RenderDriver.p(__v4, __v4_childs);
			
			/* Element 'div.layout_menu_items' */
			var __v4; var __v4_childs = [];
			[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "div","attrs": {"class":["layout_menu_items", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_menu_items"}});
			
			/* Element 'ul' */
			var __v5; var __v5_childs = [];
			[__v5, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "element", {"name": "ul","attrs": {}});
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.docker.services")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/docker/services/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Yaml Services")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.docker.yaml_files")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/docker/yaml_files/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Yaml Files")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.docker.cli")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/docker/cli/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
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
			
			/* Text */
			[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": ".\n\t\t\t\tVersion: "});
			
			/* Text */
			[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": Bayrell.CloudOS.ModuleDescription.getModuleVersion(ctx)});
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
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
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
	onClick: function(ctx, msg)
	{
		var pos = Runtime.rtl.get(ctx, msg.sender.params, "data-index");
		this.update(ctx, "setAttr", "active", pos);
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
	/**
 * Route Action
 * @return RenderContainer
 */
	MainPage: async function(ctx, container)
	{
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.Dashboard","method_name":"status"}), container);
		/* Set page model */
		var page_model = new Bayrell.CloudOS.Dashboard.MainPageModel(ctx, Runtime.Dict.from({"services":(answer.isSuccess(ctx)) ? (Runtime.rtl.attr(ctx, answer, ["response", "services"])) : (null)}));
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Index page");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Dashboard.MainPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	css: function(ctx, vars)
	{
		return ".content.h-e9f6{" + Runtime.rtl.toStr("height: 100%;display: flex;align-items: stretch;") + Runtime.rtl.toStr("}.content_left.h-e9f6, .content_right.h-e9f6{") + Runtime.rtl.toStr("width: 50%;position: relative;overflow-y: auto;") + Runtime.rtl.toStr("}.content_left.h-e9f6{") + Runtime.rtl.toStr("padding-right: 10px;") + Runtime.rtl.toStr("}.content_right.h-e9f6{") + Runtime.rtl.toStr("padding-left: 10px;padding-right: 10px;") + Runtime.rtl.toStr("}.services.h-e9f6{") + Runtime.rtl.toStr("display: table;border-left: 1px #ccc solid;border-top: 1px #ccc solid;width: 100%;") + Runtime.rtl.toStr("}.service.h-e9f6{") + Runtime.rtl.toStr("display: table-row;cursor: pointer;") + Runtime.rtl.toStr("}.service.h-e9f6:hover{") + Runtime.rtl.toStr("background: #eee;") + Runtime.rtl.toStr("}.service.h-e9f6.active{") + Runtime.rtl.toStr("background-color: #337ab7;border-color: #337ab7;color: white;") + Runtime.rtl.toStr("}.service_item.h-e9f6{") + Runtime.rtl.toStr("display: table-cell;padding: 5px;border-bottom: 1px #ccc solid;border-right: 1px #ccc solid;") + Runtime.rtl.toStr("}.label.h-e9f6{") + Runtime.rtl.toStr("font-weight: bold;") + Runtime.rtl.toStr("}.info_item.h-e9f6{") + Runtime.rtl.toStr("overflow-wrap: anywhere;padding-bottom: 10px;") + Runtime.rtl.toStr("}.info_item.h-e9f6:last-child{") + Runtime.rtl.toStr("padding-bottom: 0px;") + Runtime.rtl.toStr("}.info_actions.h-e9f6 > .label{") + Runtime.rtl.toStr("padding-bottom: 5px;") + Runtime.rtl.toStr("}.info_item_action.h-e9f6{") + Runtime.rtl.toStr("padding-bottom: 5px;") + Runtime.rtl.toStr("}.info_item_action.h-e9f6:last-child{") + Runtime.rtl.toStr("padding-bottom: 0px;") + Runtime.rtl.toStr("}.info_item_action.h-e9f6.state-ready .state{") + Runtime.rtl.toStr("color: #00aa00;font-weight: bold;") + Runtime.rtl.toStr("}.info_item_action.h-e9f6.state-failed .state, .info_item_action.h-e9f6.state-rejected .state{") + Runtime.rtl.toStr("color: red;font-weight: bold;") + Runtime.rtl.toStr("}.info_item_action_error.h-e9f6{") + Runtime.rtl.toStr("color: red;") + Runtime.rtl.toStr("}");
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
			
			/* Element 'div.content_left' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["content_left", this.getCssHash(ctx)].join(" "),"@elem_name":"content_left"}});
			
			/* Text */
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": this.renderServices(ctx, layout, model, params)});
			RenderDriver.p(__v1, __v1_childs);
			
			/* Element 'div.content_right' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["content_right", this.getCssHash(ctx)].join(" "),"@elem_name":"content_right"}});
			
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
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
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
				"class_name": "Bayrell.CloudOS.Dashboard.MainPage",
				"name": "MainPage",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/","name":"app.dashboard.main"})),
				]),
			});
		}
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
if (typeof Bayrell.CloudOS.Dashboard == 'undefined') Bayrell.CloudOS.Dashboard = {};
Bayrell.CloudOS.Dashboard.NodesPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Dashboard.NodesPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Dashboard.NodesPage.prototype.constructor = Bayrell.CloudOS.Dashboard.NodesPage;
Object.assign(Bayrell.CloudOS.Dashboard.NodesPage.prototype,
{
	/**
 * On click
 */
	onClick: function(ctx, e)
	{
		var pos = Runtime.rtl.get(ctx, e.sender.params, "data-index");
		this.update(ctx, "setAttr", "active", pos);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Dashboard.NodesPage)
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
		return "Bayrell.CloudOS.Dashboard.NodesPage";
	},
});
Object.assign(Bayrell.CloudOS.Dashboard.NodesPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Dashboard.NodesPage,
{
	/**
 * Route Action
 * @return WebContainer
 */
	actionIndex: async function(ctx, container)
	{
		/* Get services state */
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.Dashboard","method_name":"status"}), container);
		/* Set page model */
		var page_model = new Bayrell.CloudOS.Dashboard.NodesPageModel(ctx, Runtime.Dict.from({"services":(answer.isSuccess(ctx)) ? (Runtime.rtl.attr(ctx, answer, ["response", "services"])) : (null),"nodes":(answer.isSuccess(ctx)) ? (Runtime.rtl.attr(ctx, answer, ["response", "nodes"])) : (null)}));
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Nodes");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Create model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Dashboard.NodesPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	css: function(ctx, vars)
	{
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Element 'div.nodes' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["nodes", this.getCssHash(ctx)].join(" "),"@elem_name":"nodes"}});
			
			for (var i = 0;i < model.nodes.count(ctx);i++)
			{
				var node = Runtime.rtl.get(ctx, model.nodes, i);
				
				/* Element 'div.node' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["node", this.getCssHash(ctx)].join(" "),"@key":i,"@elem_name":"node"}});
				
				/* Element 'div.node_name' */
				var __v2; var __v2_childs = [];
				[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["node_name", this.getCssHash(ctx)].join(" "),"@elem_name":"node_name"}});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Hostname")});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": ": "});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, node, "Description"), "Hostname")});
				RenderDriver.p(__v2, __v2_childs);
				
				/* Element 'ul.node_services' */
				var __v2; var __v2_childs = [];
				[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "ul","attrs": {"class":["node_services", this.getCssHash(ctx)].join(" "),"@elem_name":"node_services"}});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": this.renderNodeTasks(ctx, layout, model, node)});
				RenderDriver.p(__v2, __v2_childs);
				RenderDriver.p(__v1, __v1_childs);
			}
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	renderNodeTasks: function(ctx, layout, model, node)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var tasks = this.getNodeTasks(ctx, model, node);
			
			for (var i = 0;i < tasks.count(ctx);i++)
			{
				var task = Runtime.rtl.get(ctx, tasks, i);
				
				/* Element 'li.node_service' */
				var __v0; var __v0_childs = [];
				[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "li","attrs": {"class":["node_service", this.getCssHash(ctx)].join(" "),"@elem_name":"node_service"}});
				
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.rtl.get(ctx, task, "ServiceName")});
				
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": " ["});
				
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.rtl.get(ctx, task, "ID")});
				
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": "] "});
				
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Address")});
				
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": ":&nbsp;"});
				
				/* Text */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.rs.join(ctx, ", ", Runtime.rtl.get(ctx, task, "Networks").map(ctx, (ctx, net) => 
				{
					return Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, net, "Addresses"), 0);
				}))});
				RenderDriver.p(__v0, __v0_childs);
			}
			
			return __control_childs;
		};
	},
	/**
 * Get node tasks
 */
	getNodeTasks: function(ctx, model, node)
	{
		var tasks = new Runtime.Vector(ctx);
		if (model.services != null)
		{
			for (var i = 0;i < model.services.count(ctx);i++)
			{
				var item = model.services.item(ctx, i);
				var Tasks = Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, item, "balancer"), "Tasks");
				for (var j = 0;j < Tasks.count(ctx);j++)
				{
					var task = Tasks.item(ctx, j);
					if (Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Node"), "ID") == Runtime.rtl.get(ctx, node, "ID") && Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, task, "Status"), "State") == "running")
					{
						tasks.push(ctx, task.setIm(ctx, "ServiceName", Runtime.rtl.get(ctx, item, "_name")));
					}
				}
			}
		}
		return tasks.toCollection(ctx);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Dashboard";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Dashboard.NodesPage";
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
			"class_name": "Bayrell.CloudOS.Dashboard.NodesPage",
			"name": "Bayrell.CloudOS.Dashboard.NodesPage",
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
				"class_name": "Bayrell.CloudOS.Dashboard.NodesPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/nodes/","name":"app.dashboard.nodes"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Dashboard.NodesPage);
window["Bayrell.CloudOS.Dashboard.NodesPage"] = Bayrell.CloudOS.Dashboard.NodesPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Dashboard.NodesPage;
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
Bayrell.CloudOS.Dashboard.NodesPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.Dashboard.NodesPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.Dashboard.NodesPageModel.prototype.constructor = Bayrell.CloudOS.Dashboard.NodesPageModel;
Object.assign(Bayrell.CloudOS.Dashboard.NodesPageModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.services = null;
		this.nodes = null;
		this.active = -1;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Dashboard.NodesPageModel)
		{
			this.services = o.services;
			this.nodes = o.nodes;
			this.active = o.active;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "services")this.services = v;
		else if (k == "nodes")this.nodes = v;
		else if (k == "active")this.active = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "services")return this.services;
		else if (k == "nodes")return this.nodes;
		else if (k == "active")return this.active;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Dashboard.NodesPageModel";
	},
});
Object.assign(Bayrell.CloudOS.Dashboard.NodesPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.Dashboard.NodesPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Dashboard";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Dashboard.NodesPageModel";
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
			"class_name": "Bayrell.CloudOS.Dashboard.NodesPageModel",
			"name": "Bayrell.CloudOS.Dashboard.NodesPageModel",
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
			a.push("nodes");
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
			"class_name": "Bayrell.CloudOS.Dashboard.NodesPageModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "nodes") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.CloudOS.Dashboard.NodesPageModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "active") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.CloudOS.Dashboard.NodesPageModel",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Dashboard.NodesPageModel);
window["Bayrell.CloudOS.Dashboard.NodesPageModel"] = Bayrell.CloudOS.Dashboard.NodesPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Dashboard.NodesPageModel;
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
if (typeof Bayrell.CloudOS.Design == 'undefined') Bayrell.CloudOS.Design = {};
Bayrell.CloudOS.Design.LayersForm = function(ctx)
{
	Runtime.Web.Form.Form.apply(this, arguments);
};
Bayrell.CloudOS.Design.LayersForm.prototype = Object.create(Runtime.Web.Form.Form.prototype);
Bayrell.CloudOS.Design.LayersForm.prototype.constructor = Bayrell.CloudOS.Design.LayersForm;
Object.assign(Bayrell.CloudOS.Design.LayersForm.prototype,
{
	onSpaceItemChange: function(ctx, msg)
	{
		var index = Runtime.rtl.get(ctx, msg.sender.params, "data-index");
		var field_name = Runtime.rtl.get(ctx, msg.sender.params, "data-name");
		var value = msg.data.value;
		this.update(ctx, "setAttr", Runtime.Collection.from(["item","layer_spaces",index,field_name]), value);
	},
	onSpaceItemRemove: function(ctx, msg)
	{
		var index = Runtime.rtl.get(ctx, msg.sender.params, "data-index");
		var __v0 = new Runtime.Monad(ctx, this.model(ctx, Runtime.Collection.from(["item","layer_spaces"])));
		__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", null));
		var item_spaces = __v0.value(ctx);
		item_spaces = item_spaces.removeIm(ctx, index);
		this.update(ctx, "setAttr", Runtime.Collection.from(["item","layer_spaces"]), item_spaces);
	},
	onSpaceSelect: function(ctx, msg)
	{
		var space_id = msg.data.value;
		var model = this.model(ctx);
		var space_item = Runtime.Dict.from({"layer_id":Runtime.rtl.attr(ctx, model, ["item", "layer_id"]),"space_id":space_id,"uri":"/"});
		var __v0 = new Runtime.Monad(ctx, Runtime.rtl.attr(ctx, model, ["item", "layer_spaces"]));
		__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
		var item_spaces = __v0.value(ctx);
		item_spaces = item_spaces.pushIm(ctx, space_item);
		this.update(ctx, "setAttr", Runtime.Collection.from(["item","layer_spaces"]), item_spaces);
		this.update(ctx, "setAttr", Runtime.Collection.from(["params","select_space"]), "");
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.LayersForm)
		{
		}
		Runtime.Web.Form.Form.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.Form.Form.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.Form.Form.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Design.LayersForm";
	},
});
Object.assign(Bayrell.CloudOS.Design.LayersForm, Runtime.Web.Form.Form);
Object.assign(Bayrell.CloudOS.Design.LayersForm,
{
	css: function(ctx, vars)
	{
		return ".spaces.h-e14e{" + Runtime.rtl.toStr("padding-top: 15px;padding-bottom: 15px;") + Runtime.rtl.toStr("}.spaces_label.h-e14e{") + Runtime.rtl.toStr("font-weight: bold;text-align: center;padding-bottom: 10px;") + Runtime.rtl.toStr("}.spaces_items.h-e14e{") + Runtime.rtl.toStr("padding-bottom: 10px;") + Runtime.rtl.toStr("}.spaces_item.h-e14e{") + Runtime.rtl.toStr("padding-bottom: 5px;") + Runtime.rtl.toStr("}.spaces_item.h-e14e:last-child{") + Runtime.rtl.toStr("padding-bottom: 0px;") + Runtime.rtl.toStr("}.spaces_item_cell.h-e14e{") + Runtime.rtl.toStr("display: inline-block;vertical-align: middle;") + Runtime.rtl.toStr("}.spaces_item_cell--domain.h-e14e{") + Runtime.rtl.toStr("width: 100px;text-align: right;padding-right: 5px;") + Runtime.rtl.toStr("}.spaces_item_cell--uri.h-e14e{") + Runtime.rtl.toStr("width: calc(100% - 170px);") + Runtime.rtl.toStr("}.spaces_item_cell--button.h-e14e{") + Runtime.rtl.toStr("width: 70px;text-align: center;") + Runtime.rtl.toStr("}");
	},
	renderContent: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Text */
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": this.renderRows(ctx, layout, model, params, content)});
			
			var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, params, "spaces"));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
			var spaces = __v0.value(ctx);
			
			var __v0 = new Runtime.Monad(ctx, Runtime.rtl.attr(ctx, model, ["item", "layer_spaces"]));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
			var layer_spaces = __v0.value(ctx);
			
			var spaces2 = spaces;
			
			/* Element 'div.spaces' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["spaces", this.getCssHash(ctx)].join(" "),"@elem_name":"spaces"}});
			
			/* Element 'div.spaces_label' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["spaces_label", this.getCssHash(ctx)].join(" "),"@elem_name":"spaces_label"}});
			
			/* Text */
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Spaces")});
			RenderDriver.p(__v1, __v1_childs);
			
			if (layer_spaces != null)
			{
				/* Element 'div.spaces_items' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["spaces_items", this.getCssHash(ctx)].join(" "),"@elem_name":"spaces_items"}});
				
				for (var i = 0;i < layer_spaces.count(ctx);i++)
				{
					var layer_space = Runtime.rtl.get(ctx, layer_spaces, i);
					
					var space_id = Runtime.rtl.get(ctx, layer_space, "space_id");
					
					var space = spaces.findItem(ctx, Runtime.lib.equalAttr(ctx, "id", space_id));
					
					/* Element 'div.spaces_item' */
					var __v2; var __v2_childs = [];
					[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["spaces_item", this.getCssHash(ctx)].join(" "),"@elem_name":"spaces_item"}});
					
					/* Element 'div.spaces_item_cell.spaces_item_cell--domain' */
					var __v3; var __v3_childs = [];
					[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "div","attrs": {"class":["spaces_item_cell spaces_item_cell--domain", this.getCssHash(ctx)].join(" "),"@elem_name":"spaces_item_cell"}});
					
					/* Text */
					[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": Runtime.rtl.attr(ctx, space, ["item", "domain"])});
					RenderDriver.p(__v3, __v3_childs);
					
					/* Element 'div.spaces_item_cell.spaces_item_cell--uri' */
					var __v3; var __v3_childs = [];
					[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "div","attrs": {"class":["spaces_item_cell spaces_item_cell--uri", this.getCssHash(ctx)].join(" "),"@elem_name":"spaces_item_cell"}});
					
					[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "component", {"name": "Runtime.Web.Input.Input","attrs": {"value":Runtime.rtl.get(ctx, layer_space, "uri"),"data-index":i,"data-name":"uri","@event:Runtime.Web.Events.ChangeEvent":["Bayrell.CloudOS.Design.LayersForm","onSpaceItemChange"]}, "layout": layout});
					RenderDriver.p(__v3, __v3_childs);
					
					/* Element 'div.spaces_item_cell.spaces_item_cell--button' */
					var __v3; var __v3_childs = [];
					[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "div","attrs": {"class":["spaces_item_cell spaces_item_cell--button", this.getCssHash(ctx)].join(" "),"@elem_name":"spaces_item_cell"}});
					
					/* Component 'Button' */
					[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "component", {"name": "Runtime.Web.Button.Button","attrs": {"type":"small danger","@event:Runtime.Web.Events.MouseClickEvent":["Bayrell.CloudOS.Design.LayersForm","onSpaceItemRemove"],"data-index":i}, "layout": layout, "content": (__control) =>
					{
						var __vnull = null;
						var __control_childs = [];
						
						/* Text */
						[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": ctx.translate(ctx, "Runtime.Web.CRUD", "Remove")});
						
						return __control_childs;
					}});
					RenderDriver.p(__v3, __v3_childs);
					RenderDriver.p(__v2, __v2_childs);
					
					/* Remove select option */
					var spaces2_index = spaces2.find(ctx, Runtime.lib.equalAttr(ctx, "id", space_id));
					
					spaces2 = spaces2.removeIm(ctx, spaces2_index);
				}
				RenderDriver.p(__v1, __v1_childs);
			}
			
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Input.Select","attrs": {"name":"select_space","show_select_value":true,"options":spaces2,"@bind":["Bayrell.CloudOS.Design.LayersForm",Runtime.Collection.from(["params","select_space"])],"@event:Runtime.Web.Events.ChangeEvent":["Bayrell.CloudOS.Design.LayersForm","onSpaceSelect"]}, "layout": layout});
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.Button.Button","Runtime.Web.Input.Input","Runtime.Web.Input.Select"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.LayersForm";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Form.Form";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.CloudOS.Design.LayersForm",
			"name": "Bayrell.CloudOS.Design.LayersForm",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Design.LayersForm);
window["Bayrell.CloudOS.Design.LayersForm"] = Bayrell.CloudOS.Design.LayersForm;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.LayersForm;
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
if (typeof Bayrell.CloudOS.Design == 'undefined') Bayrell.CloudOS.Design = {};
Bayrell.CloudOS.Design.LayersPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Design.LayersPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Design.LayersPage.prototype.constructor = Bayrell.CloudOS.Design.LayersPage;
Object.assign(Bayrell.CloudOS.Design.LayersPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.LayersPage)
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
		return "Bayrell.CloudOS.Design.LayersPage";
	},
});
Object.assign(Bayrell.CloudOS.Design.LayersPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Design.LayersPage,
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
		var page_model = new Bayrell.CloudOS.Design.LayersPageModel(ctx, Runtime.Dict.from({"crud":await Runtime.Web.CRUD.CrudPageModel.crudSearch(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.Layer","interface_name":"core.crud","method_name":"search"}), container)}));
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Layers");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Design.LayersPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var __v0 = new Runtime.Monad(ctx, model.crud);
			__v0 = __v0.attr(ctx, "foreigns");
			__v0 = __v0.attr(ctx, "services");
			__v0 = __v0.attr(ctx, "options");
			__v0 = __v0.call(ctx, Runtime.lib.map(ctx, (ctx, item) => 
			{
				return Runtime.Dict.from({"id":Runtime.rtl.get(ctx, item, "service_id"),"value":Runtime.rtl.get(ctx, item, "stack_name") + Runtime.rtl.toStr("_") + Runtime.rtl.toStr(Runtime.rtl.get(ctx, item, "service_name")),"item":item});
			}));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
			var services = __v0.value(ctx);
			
			var __v0 = new Runtime.Monad(ctx, model.crud);
			__v0 = __v0.attr(ctx, "foreigns");
			__v0 = __v0.attr(ctx, "spaces");
			__v0 = __v0.attr(ctx, "options");
			__v0 = __v0.call(ctx, Runtime.lib.map(ctx, (ctx, item) => 
			{
				return Runtime.Dict.from({"id":Runtime.rtl.get(ctx, item, "space_id"),"value":Runtime.rtl.get(ctx, item, "name") + Runtime.rtl.toStr(" (") + Runtime.rtl.toStr(Runtime.rtl.get(ctx, item, "domain")) + Runtime.rtl.toStr(")"),"item":item});
			}));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
			var spaces = __v0.value(ctx);
			
			var struct = Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":Runtime.Web.CRUD.CrudPage.fieldNumber})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"layer_id","label":"Layer id","primary":true})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"service_id","label":"Service","class_name":"Runtime.Web.Input.Select","class_name_table":"Runtime.Web.Input.SelectText","class_settings":Runtime.Dict.from({"show_select_value_filter":true,"show_select_value":true,"options":services})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"spaces","label":"Space","class_name":"Runtime.Web.Input.Select","class_name_table":"Runtime.Web.Input.SelectText","class_settings":Runtime.Dict.from({"show_select_value_filter":true,"show_select_value":true,"options":spaces})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"layer_spaces","label":"Spaces","class_name":"Runtime.Web.Input.Select","class_name_table":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				return (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Element 'div.spaces' */
					var __v0; var __v0_childs = [];
					[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["spaces", this.getCssHash(ctx)].join(" "),"@elem_name":"spaces"}});
					
					if (model != null)
					{
						for (var i = 0;i < model.count(ctx);i++)
						{
							var item = Runtime.rtl.get(ctx, model, i);
							
							var space_id = Runtime.rtl.get(ctx, item, "space_id");
							
							var uri = Runtime.rtl.get(ctx, item, "uri");
							
							var space = spaces.findItem(ctx, Runtime.lib.equalAttr(ctx, "id", space_id));
							
							var name = Runtime.rtl.attr(ctx, space, ["item", "domain"]) + Runtime.rtl.toStr(uri);
							
							/* Element 'div.spaces_item' */
							var __v1; var __v1_childs = [];
							[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["spaces_item", this.getCssHash(ctx)].join(" "),"@elem_name":"spaces_item"}});
							
							/* Text */
							[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": name});
							RenderDriver.p(__v1, __v1_childs);
						}
					}
					RenderDriver.p(__v0, __v0_childs);
					
					return __control_childs;
				};
			}})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"layer_name","label":"Layer name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"uid","label":"UID","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label","can_update":false})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				return Runtime.Collection.from([Runtime.Web.CRUD.CrudPage.buttonEdit(ctx, layout, model, params, content),Runtime.Web.CRUD.CrudPage.buttonDelete(ctx, layout, model, params, content)]);
			}})}))]);
			
			var filter_fields = Runtime.Collection.from(["spaces","service_id","layer_name","uid"]);
			
			var form_fields = Runtime.Collection.from(["service_id","layer_name","uid"]);
			
			var table_fields = Runtime.Collection.from(["number","service_id","layer_name","layer_spaces","uid","edit-buttons"]);
			
			var messages = Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.CloudOS", "Add layer"),"delete":(ctx, item) => 
			{
				return ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "uid")}));
			}});
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.CRUD.CrudPage","attrs": {"@name":["Bayrell.CloudOS.Design.LayersPage","crud"],"object_name":"Bayrell.CloudOS.Layer","struct":struct,"filter_fields":filter_fields,"form_fields":form_fields,"table_fields":table_fields,"messages":messages,"form":Runtime.Dict.from({"class_name":"Bayrell.CloudOS.Design.LayersForm","spaces":spaces})}, "layout": layout});
			
			return __control_childs;
		};
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText","Runtime.Web.Input.TextArea","Bayrell.CloudOS.Design.LayersForm"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.LayersPage";
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
			"class_name": "Bayrell.CloudOS.Design.LayersPage",
			"name": "Bayrell.CloudOS.Design.LayersPage",
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
				"class_name": "Bayrell.CloudOS.Design.LayersPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/design/layers/","name":"app.design.layers"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Design.LayersPage);
window["Bayrell.CloudOS.Design.LayersPage"] = Bayrell.CloudOS.Design.LayersPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.LayersPage;
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
if (typeof Bayrell.CloudOS.Design == 'undefined') Bayrell.CloudOS.Design = {};
Bayrell.CloudOS.Design.LayersPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.Design.LayersPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.Design.LayersPageModel.prototype.constructor = Bayrell.CloudOS.Design.LayersPageModel;
Object.assign(Bayrell.CloudOS.Design.LayersPageModel.prototype,
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
		if (o instanceof Bayrell.CloudOS.Design.LayersPageModel)
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
		return "Bayrell.CloudOS.Design.LayersPageModel";
	},
});
Object.assign(Bayrell.CloudOS.Design.LayersPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.Design.LayersPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.LayersPageModel";
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
			"class_name": "Bayrell.CloudOS.Design.LayersPageModel",
			"name": "Bayrell.CloudOS.Design.LayersPageModel",
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
			"class_name": "Bayrell.CloudOS.Design.LayersPageModel",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Design.LayersPageModel);
window["Bayrell.CloudOS.Design.LayersPageModel"] = Bayrell.CloudOS.Design.LayersPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.LayersPageModel;
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
if (typeof Bayrell.CloudOS.Design == 'undefined') Bayrell.CloudOS.Design = {};
Bayrell.CloudOS.Design.NginxPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Design.NginxPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Design.NginxPage.prototype.constructor = Bayrell.CloudOS.Design.NginxPage;
Object.assign(Bayrell.CloudOS.Design.NginxPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.NginxPage)
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
		return "Bayrell.CloudOS.Design.NginxPage";
	},
});
Object.assign(Bayrell.CloudOS.Design.NginxPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Design.NginxPage,
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
		var page_model = new Bayrell.CloudOS.Design.NginxPageModel(ctx, Runtime.Dict.from({"crud":await Runtime.Web.CRUD.CrudPageModel.crudSearch(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.NginxFile","interface_name":"core.crud","method_name":"search"}), container)}));
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Nginx page");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Design.NginxPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var struct = Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"file_id","primary":true})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				var table_model = Runtime.rtl.get(ctx, params, "table-model");
				var index = Runtime.rtl.get(ctx, params, "row-index");
				if (table_model)
				{
					return index + 1;
				}
				return "";
			}})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"name","label":"Name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"enable","label":"Enable","class_name":"Runtime.Web.Input.Select","class_name_table":"Runtime.Web.Input.SelectText","class_settings":Runtime.Dict.from({"show_select_value_filter":true,"show_select_value":false,"options":Runtime.Collection.from([Runtime.Dict.from({"id":0,"value":"No"}),Runtime.Dict.from({"id":1,"value":"Yes"})])})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"content","label":"Content","class_name":"Runtime.Web.Input.TextArea"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				return Runtime.Collection.from([Runtime.Web.CRUD.CrudPage.buttonEdit(ctx, layout, model, params, content),Runtime.Web.CRUD.CrudPage.buttonDelete(ctx, layout, model, params, content)]);
			}})}))]);
			
			var filter_fields = Runtime.Collection.from(["name","enable"]);
			
			var form_fields = Runtime.Collection.from(["name","enable","content"]);
			
			var table_fields = Runtime.Collection.from(["number","name","enable","edit-buttons"]);
			
			var messages = Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.CloudOS", "Add nginx file")});
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.CRUD.CrudPage","attrs": {"@name":["Bayrell.CloudOS.Design.NginxPage","crud"],"object_name":"Bayrell.CloudOS.NginxFile","struct":struct,"filter_fields":filter_fields,"form_fields":form_fields,"table_fields":table_fields,"messages":messages,"dialog_form":Runtime.Dict.from({"width":"800px"})}, "layout": layout});
			
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
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.NginxPage";
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
			"class_name": "Bayrell.CloudOS.Design.NginxPage",
			"name": "Bayrell.CloudOS.Design.NginxPage",
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
				"class_name": "Bayrell.CloudOS.Design.NginxPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/design/nginx/","name":"app.design.nginx"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Design.NginxPage);
window["Bayrell.CloudOS.Design.NginxPage"] = Bayrell.CloudOS.Design.NginxPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.NginxPage;
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
if (typeof Bayrell.CloudOS.Design == 'undefined') Bayrell.CloudOS.Design = {};
Bayrell.CloudOS.Design.NginxPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.Design.NginxPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.Design.NginxPageModel.prototype.constructor = Bayrell.CloudOS.Design.NginxPageModel;
Object.assign(Bayrell.CloudOS.Design.NginxPageModel.prototype,
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
		if (o instanceof Bayrell.CloudOS.Design.NginxPageModel)
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
		return "Bayrell.CloudOS.Design.NginxPageModel";
	},
});
Object.assign(Bayrell.CloudOS.Design.NginxPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.Design.NginxPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.NginxPageModel";
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
			"class_name": "Bayrell.CloudOS.Design.NginxPageModel",
			"name": "Bayrell.CloudOS.Design.NginxPageModel",
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
			"class_name": "Bayrell.CloudOS.Design.NginxPageModel",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Design.NginxPageModel);
window["Bayrell.CloudOS.Design.NginxPageModel"] = Bayrell.CloudOS.Design.NginxPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.NginxPageModel;
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
if (typeof Bayrell.CloudOS.Design == 'undefined') Bayrell.CloudOS.Design = {};
Bayrell.CloudOS.Design.ServicesPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Design.ServicesPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Design.ServicesPage.prototype.constructor = Bayrell.CloudOS.Design.ServicesPage;
Object.assign(Bayrell.CloudOS.Design.ServicesPage.prototype,
{
	/**
 * On form event
 */
	onFormEvent: async function(ctx, msg)
	{
		var e = msg.data;
		if (e.event == "compose")
		{
			await this.onItemCompose(ctx);
		}
	},
	/**
 * Enable item
 */
	onItemCompose: async function(ctx)
	{
		var item = this.crud.form_edit.model(ctx, "item");
		var pk = this.crud.constructor.getPrimaryKey(ctx, Runtime.rtl.get(ctx, this.crud.params, "struct"), item);
		this.crud.dialog_edit.update(ctx, "setWaitMessage");
		/* Send api */
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":this.crud.getCrudObjectName(ctx),"interface_name":"core.crud","method_name":"compose","data":Runtime.Dict.from({"pk":pk,"item":item})}));
		if (answer.isSuccess(ctx))
		{
			this.crud.table.update(ctx, "setItem", pk, Runtime.rtl.get(ctx, answer.response, "new_item"));
			this.crud.dialog_edit.update(ctx, "hide");
		}
		else
		{
			this.crud.dialog_edit.update(ctx, "setAnswer", answer);
		}
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.ServicesPage)
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
		return "Bayrell.CloudOS.Design.ServicesPage";
	},
});
Object.assign(Bayrell.CloudOS.Design.ServicesPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Design.ServicesPage,
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
		var page_model = new Bayrell.CloudOS.Design.ServicesPageModel(ctx, Runtime.Dict.from({"crud":await Runtime.Web.CRUD.CrudPageModel.crudSearch(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.Service","interface_name":"core.crud","method_name":"search"}), container)}));
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Services page");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Design.ServicesPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var __v0 = new Runtime.Monad(ctx, model.crud);
			__v0 = __v0.attr(ctx, "foreigns");
			__v0 = __v0.attr(ctx, "stacks");
			__v0 = __v0.attr(ctx, "options");
			__v0 = __v0.call(ctx, Runtime.lib.map(ctx, (ctx, item) => 
			{
				return Runtime.Dict.from({"id":Runtime.rtl.get(ctx, item, "stack_name"),"value":Runtime.rtl.get(ctx, item, "stack_name"),"item":item});
			}));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
			var stacks = __v0.value(ctx);
			
			var __v0 = new Runtime.Monad(ctx, model.crud);
			__v0 = __v0.attr(ctx, "foreigns");
			__v0 = __v0.attr(ctx, "softwares");
			__v0 = __v0.attr(ctx, "options");
			__v0 = __v0.call(ctx, Runtime.lib.map(ctx, (ctx, item) => 
			{
				return Runtime.Dict.from({"id":Runtime.rtl.get(ctx, item, "api_name"),"value":Runtime.rtl.get(ctx, item, "api_name") + Runtime.rtl.toStr(" (") + Runtime.rtl.toStr(Runtime.rtl.get(ctx, item, "name")) + Runtime.rtl.toStr(")"),"item":item});
			}));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
			var softwares = __v0.value(ctx);
			
			var struct = Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":Runtime.Web.CRUD.CrudPage.fieldNumber})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"service_id","primary":true})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"stack_name","label":"Stack","class_name":"Runtime.Web.Input.Select","class_name_table":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"show_select_value_filter":true,"show_select_value":true,"options":stacks})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"software_api_name","label":"Software","class_name":"Runtime.Web.Input.Select","class_name_table":"Runtime.Web.Input.SelectText","class_settings":Runtime.Dict.from({"show_select_value_filter":true,"show_select_value":true,"options":softwares})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"service_name","label":"Service name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"docker_content","label":"Docker content","class_name":"Runtime.Web.Input.TextArea"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				return Runtime.Collection.from([Runtime.Web.CRUD.CrudPage.buttonEdit(ctx, layout, model, params, content),Runtime.Web.CRUD.CrudPage.buttonDelete(ctx, layout, model, params, content)]);
			}})}))]);
			
			var filter_fields = Runtime.Collection.from(["stack_name","software_api_name","service_name"]);
			
			var form_fields = Runtime.Collection.from(["stack_name","software_api_name","service_name","docker_content"]);
			
			var table_fields = Runtime.Collection.from(["number","stack_name","software_api_name","service_name","edit-buttons"]);
			
			var messages = Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.CloudOS", "Add service")});
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.CRUD.CrudPage","attrs": {"@name":["Bayrell.CloudOS.Design.ServicesPage","crud"],"@event:Runtime.Web.Form.FormEvent":["Bayrell.CloudOS.Design.ServicesPage","onFormEvent"],"object_name":"Bayrell.CloudOS.Service","struct":struct,"filter_fields":filter_fields,"form_fields":form_fields,"table_fields":table_fields,"messages":messages,"dialog_form":Runtime.Dict.from({"width":"800px"}),"form":Runtime.Dict.from({"renderButtons":(ctx, layout, model, params, content) => 
			{
				return (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Element 'div' */
					var __v0; var __v0_childs = [];
					[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {}});
					
					if (Runtime.rtl.get(ctx, params, "action") == "add")
					{
						/* Text */
						[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.Web.Form.Form.renderButton(ctx, layout, model, params, "create")});
						
						/* Text */
						[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.Web.Form.Form.renderButton(ctx, layout, model, params, "cancel")});
					}
					
					if (Runtime.rtl.get(ctx, params, "action") == "edit")
					{
						var __v1 = new Runtime.Monad(ctx, Runtime.rtl.attr(ctx, model, ["item", "enable"]));
						__v1 = __v1.monad(ctx, Runtime.rtl.m_to(ctx, "bool", false));
						var enable = __v1.value(ctx);
						
						/* Text */
						[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.Web.Form.Form.renderButton(ctx, layout, model, params, "update")});
						
						/* Text */
						[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.Web.Form.Form.renderButtonInfo(ctx, layout, model, params, Runtime.Dict.from({"type":"danger","@key":"compose","data-action":"compose","value":ctx.translate(ctx, "Bayrell.CloudOS", "Compose")}))});
						
						/* Text */
						[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.Web.Form.Form.renderButton(ctx, layout, model, params, "cancel")});
					}
					RenderDriver.p(__v0, __v0_childs);
					
					return __control_childs;
				};
			}})}, "layout": layout});
			
			return __control_childs;
		};
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.Form.Form","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText","Runtime.Web.Input.TextArea"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.ServicesPage";
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
			"class_name": "Bayrell.CloudOS.Design.ServicesPage",
			"name": "Bayrell.CloudOS.Design.ServicesPage",
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
				"class_name": "Bayrell.CloudOS.Design.ServicesPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/design/services/","name":"app.design.services"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Design.ServicesPage);
window["Bayrell.CloudOS.Design.ServicesPage"] = Bayrell.CloudOS.Design.ServicesPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.ServicesPage;
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
if (typeof Bayrell.CloudOS.Design == 'undefined') Bayrell.CloudOS.Design = {};
Bayrell.CloudOS.Design.ServicesPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.Design.ServicesPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.Design.ServicesPageModel.prototype.constructor = Bayrell.CloudOS.Design.ServicesPageModel;
Object.assign(Bayrell.CloudOS.Design.ServicesPageModel.prototype,
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
		if (o instanceof Bayrell.CloudOS.Design.ServicesPageModel)
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
		return "Bayrell.CloudOS.Design.ServicesPageModel";
	},
});
Object.assign(Bayrell.CloudOS.Design.ServicesPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.Design.ServicesPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.ServicesPageModel";
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
			"class_name": "Bayrell.CloudOS.Design.ServicesPageModel",
			"name": "Bayrell.CloudOS.Design.ServicesPageModel",
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
			"class_name": "Bayrell.CloudOS.Design.ServicesPageModel",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Design.ServicesPageModel);
window["Bayrell.CloudOS.Design.ServicesPageModel"] = Bayrell.CloudOS.Design.ServicesPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.ServicesPageModel;
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
if (typeof Bayrell.CloudOS.Design == 'undefined') Bayrell.CloudOS.Design = {};
Bayrell.CloudOS.Design.SoftwaresPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Design.SoftwaresPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Design.SoftwaresPage.prototype.constructor = Bayrell.CloudOS.Design.SoftwaresPage;
Object.assign(Bayrell.CloudOS.Design.SoftwaresPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.SoftwaresPage)
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
		return "Bayrell.CloudOS.Design.SoftwaresPage";
	},
});
Object.assign(Bayrell.CloudOS.Design.SoftwaresPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Design.SoftwaresPage,
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
		var page_model = new Bayrell.CloudOS.Design.SoftwaresPageModel(ctx, Runtime.Dict.from({"crud":await Runtime.Web.CRUD.CrudPageModel.crudSearch(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.Software","interface_name":"core.crud","method_name":"search"}), container)}));
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Softwares");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Design.SoftwaresPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var struct = Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":Runtime.Web.CRUD.CrudPage.fieldNumber})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"api_name","label":"Api name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label","primary":true})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"name","label":"Software name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"domain","label":"Domain name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				return Runtime.Collection.from([Runtime.Web.CRUD.CrudPage.buttonEdit(ctx, layout, model, params, content),Runtime.Web.CRUD.CrudPage.buttonDelete(ctx, layout, model, params, content)]);
			}})}))]);
			
			var filter_fields = Runtime.Collection.from(["api_name","name"]);
			
			var form_fields = Runtime.Collection.from(["api_name","name"]);
			
			var table_fields = Runtime.Collection.from(["number","api_name","name","edit-buttons"]);
			
			var messages = Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.CloudOS", "Add software"),"delete":(ctx, item) => 
			{
				return ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "api_name")}));
			}});
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.CRUD.CrudPage","attrs": {"@name":["Bayrell.CloudOS.Design.SoftwaresPage","crud"],"object_name":"Bayrell.CloudOS.Software","struct":struct,"filter_fields":filter_fields,"form_fields":form_fields,"table_fields":table_fields,"messages":messages}, "layout": layout});
			
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
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.SoftwaresPage";
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
			"class_name": "Bayrell.CloudOS.Design.SoftwaresPage",
			"name": "Bayrell.CloudOS.Design.SoftwaresPage",
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
				"class_name": "Bayrell.CloudOS.Design.SoftwaresPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/design/softwares/","name":"app.design.softwares"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Design.SoftwaresPage);
window["Bayrell.CloudOS.Design.SoftwaresPage"] = Bayrell.CloudOS.Design.SoftwaresPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.SoftwaresPage;
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
if (typeof Bayrell.CloudOS.Design == 'undefined') Bayrell.CloudOS.Design = {};
Bayrell.CloudOS.Design.SoftwaresPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.Design.SoftwaresPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.Design.SoftwaresPageModel.prototype.constructor = Bayrell.CloudOS.Design.SoftwaresPageModel;
Object.assign(Bayrell.CloudOS.Design.SoftwaresPageModel.prototype,
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
		if (o instanceof Bayrell.CloudOS.Design.SoftwaresPageModel)
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
		return "Bayrell.CloudOS.Design.SoftwaresPageModel";
	},
});
Object.assign(Bayrell.CloudOS.Design.SoftwaresPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.Design.SoftwaresPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.SoftwaresPageModel";
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
			"class_name": "Bayrell.CloudOS.Design.SoftwaresPageModel",
			"name": "Bayrell.CloudOS.Design.SoftwaresPageModel",
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
			"class_name": "Bayrell.CloudOS.Design.SoftwaresPageModel",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Design.SoftwaresPageModel);
window["Bayrell.CloudOS.Design.SoftwaresPageModel"] = Bayrell.CloudOS.Design.SoftwaresPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.SoftwaresPageModel;
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
if (typeof Bayrell.CloudOS.Design == 'undefined') Bayrell.CloudOS.Design = {};
Bayrell.CloudOS.Design.StacksPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Design.StacksPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Design.StacksPage.prototype.constructor = Bayrell.CloudOS.Design.StacksPage;
Object.assign(Bayrell.CloudOS.Design.StacksPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.StacksPage)
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
		return "Bayrell.CloudOS.Design.StacksPage";
	},
});
Object.assign(Bayrell.CloudOS.Design.StacksPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Design.StacksPage,
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
		var page_model = new Bayrell.CloudOS.Design.StacksPageModel(ctx, Runtime.Dict.from({"crud":await Runtime.Web.CRUD.CrudPageModel.crudSearch(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.Stack","interface_name":"core.crud","method_name":"search"}), container)}));
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Stacks");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Design.StacksPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var struct = Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":Runtime.Web.CRUD.CrudPage.fieldNumber})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"stack_name","label":"Name","primary":true,"class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				return Runtime.Collection.from([Runtime.Web.CRUD.CrudPage.buttonEdit(ctx, layout, model, params, content),Runtime.Web.CRUD.CrudPage.buttonDelete(ctx, layout, model, params, content)]);
			}})}))]);
			
			var filter_fields = Runtime.Collection.from(["stack_name"]);
			
			var form_fields = Runtime.Collection.from(["stack_name"]);
			
			var table_fields = Runtime.Collection.from(["number","stack_name","edit-buttons"]);
			
			var messages = Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.CloudOS", "Add space"),"delete":(ctx, item) => 
			{
				return ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "stack_name")}));
			}});
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.CRUD.CrudPage","attrs": {"@name":["Bayrell.CloudOS.Design.StacksPage","crud"],"object_name":"Bayrell.CloudOS.Stack","struct":struct,"filter_fields":filter_fields,"form_fields":form_fields,"table_fields":table_fields,"messages":messages}, "layout": layout});
			
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
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.StacksPage";
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
			"class_name": "Bayrell.CloudOS.Design.StacksPage",
			"name": "Bayrell.CloudOS.Design.StacksPage",
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
				"class_name": "Bayrell.CloudOS.Design.StacksPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/design/stacks/","name":"app.design.stacks"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Design.StacksPage);
window["Bayrell.CloudOS.Design.StacksPage"] = Bayrell.CloudOS.Design.StacksPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.StacksPage;
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
if (typeof Bayrell.CloudOS.Design == 'undefined') Bayrell.CloudOS.Design = {};
Bayrell.CloudOS.Design.StacksPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.Design.StacksPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.Design.StacksPageModel.prototype.constructor = Bayrell.CloudOS.Design.StacksPageModel;
Object.assign(Bayrell.CloudOS.Design.StacksPageModel.prototype,
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
		if (o instanceof Bayrell.CloudOS.Design.StacksPageModel)
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
		return "Bayrell.CloudOS.Design.StacksPageModel";
	},
});
Object.assign(Bayrell.CloudOS.Design.StacksPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.Design.StacksPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.StacksPageModel";
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
			"class_name": "Bayrell.CloudOS.Design.StacksPageModel",
			"name": "Bayrell.CloudOS.Design.StacksPageModel",
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
			"class_name": "Bayrell.CloudOS.Design.StacksPageModel",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Design.StacksPageModel);
window["Bayrell.CloudOS.Design.StacksPageModel"] = Bayrell.CloudOS.Design.StacksPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.StacksPageModel;
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
if (typeof Bayrell.CloudOS.Design == 'undefined') Bayrell.CloudOS.Design = {};
Bayrell.CloudOS.Design.VirtualSpacesPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Design.VirtualSpacesPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Design.VirtualSpacesPage.prototype.constructor = Bayrell.CloudOS.Design.VirtualSpacesPage;
Object.assign(Bayrell.CloudOS.Design.VirtualSpacesPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.VirtualSpacesPage)
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
		return "Bayrell.CloudOS.Design.VirtualSpacesPage";
	},
});
Object.assign(Bayrell.CloudOS.Design.VirtualSpacesPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Design.VirtualSpacesPage,
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
		var page_model = new Bayrell.CloudOS.Design.VirtualSpacesPageModel(ctx, Runtime.Dict.from({"crud":await Runtime.Web.CRUD.CrudPageModel.crudSearch(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.VirtualSpace","interface_name":"core.crud","method_name":"search"}), container)}));
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Virtual spaces");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Design.VirtualSpacesPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var struct = Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"space_id","primary":true})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":Runtime.Web.CRUD.CrudPage.fieldNumber})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"name","label":"Space name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"domain","label":"Domain name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"nginx_template","label":"Nginx template","class_name":"Runtime.Web.Input.TextArea"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				return Runtime.Collection.from([Runtime.Web.CRUD.CrudPage.buttonEdit(ctx, layout, model, params, content),Runtime.Web.CRUD.CrudPage.buttonDelete(ctx, layout, model, params, content)]);
			}})}))]);
			
			var filter_fields = Runtime.Collection.from(["name","domain"]);
			
			var form_fields = Runtime.Collection.from(["name","domain","nginx_template"]);
			
			var table_fields = Runtime.Collection.from(["number","name","domain","edit-buttons"]);
			
			var messages = Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.CloudOS", "Add space"),"delete":(ctx, item) => 
			{
				return ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "name")}));
			}});
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.CRUD.CrudPage","attrs": {"@name":["Bayrell.CloudOS.Design.VirtualSpacesPage","crud"],"object_name":"Bayrell.CloudOS.VirtualSpace","struct":struct,"filter_fields":filter_fields,"form_fields":form_fields,"table_fields":table_fields,"messages":messages,"dialog_form":Runtime.Dict.from({"width":"800px"})}, "layout": layout});
			
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
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.VirtualSpacesPage";
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
			"class_name": "Bayrell.CloudOS.Design.VirtualSpacesPage",
			"name": "Bayrell.CloudOS.Design.VirtualSpacesPage",
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
				"class_name": "Bayrell.CloudOS.Design.VirtualSpacesPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/design/spaces/","name":"app.design.spaces"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Design.VirtualSpacesPage);
window["Bayrell.CloudOS.Design.VirtualSpacesPage"] = Bayrell.CloudOS.Design.VirtualSpacesPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.VirtualSpacesPage;
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
if (typeof Bayrell.CloudOS.Design == 'undefined') Bayrell.CloudOS.Design = {};
Bayrell.CloudOS.Design.VirtualSpacesPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.Design.VirtualSpacesPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.Design.VirtualSpacesPageModel.prototype.constructor = Bayrell.CloudOS.Design.VirtualSpacesPageModel;
Object.assign(Bayrell.CloudOS.Design.VirtualSpacesPageModel.prototype,
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
		if (o instanceof Bayrell.CloudOS.Design.VirtualSpacesPageModel)
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
		return "Bayrell.CloudOS.Design.VirtualSpacesPageModel";
	},
});
Object.assign(Bayrell.CloudOS.Design.VirtualSpacesPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.Design.VirtualSpacesPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.VirtualSpacesPageModel";
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
			"class_name": "Bayrell.CloudOS.Design.VirtualSpacesPageModel",
			"name": "Bayrell.CloudOS.Design.VirtualSpacesPageModel",
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
			"class_name": "Bayrell.CloudOS.Design.VirtualSpacesPageModel",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Design.VirtualSpacesPageModel);
window["Bayrell.CloudOS.Design.VirtualSpacesPageModel"] = Bayrell.CloudOS.Design.VirtualSpacesPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.VirtualSpacesPageModel;
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
if (typeof Bayrell.CloudOS.Docker == 'undefined') Bayrell.CloudOS.Docker = {};
Bayrell.CloudOS.Docker.CLIPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Docker.CLIPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Docker.CLIPage.prototype.constructor = Bayrell.CloudOS.Docker.CLIPage;
Object.assign(Bayrell.CloudOS.Docker.CLIPage.prototype,
{
	/**
 * On component created
 */
	onCreated: function(ctx)
	{
		this.div_output.scrollTop = this.div_output.scrollHeight;
	},
	/**
 * On component updated
 */
	onUpdated: function(ctx)
	{
		this.div_output.scrollTop = this.div_output.scrollHeight;
	},
	/**
 * Click event
 */
	onKeyDown: async function(ctx, msg)
	{
		if (msg.data.keyCode == 13)
		{
			var value = msg.sender.value;
			this.update(ctx, "update", Runtime.Dict.from({"text":""}));
			/* Send api */
			var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.Dashboard","interface_name":"default","method_name":"exec","data":Runtime.Dict.from({"cmd":value})}));
			if (answer.isSuccess(ctx))
			{
				var content = this.model(ctx, Runtime.Collection.from(["content"]), "");
				if (content != "")
				{
					content += Runtime.rtl.toStr("\n");
				}
				this.update(ctx, "copy", Runtime.Dict.from({"content":content + Runtime.rtl.toStr("> ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr("\n") + Runtime.rtl.toStr(Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, answer, "response"), "content")),"text":""}));
			}
		}
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Docker.CLIPage)
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
		return "Bayrell.CloudOS.Docker.CLIPage";
	},
});
Object.assign(Bayrell.CloudOS.Docker.CLIPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Docker.CLIPage,
{
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "CLI page");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Create model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Docker.CLIPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), new Runtime.Dict(ctx, Runtime.Dict.from({"content":"","text":""})));
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	css: function(ctx, vars)
	{
		return ".output.h-2340{" + Runtime.rtl.toStr("position: relative;width: 100%;height: calc(100% - 30px);padding-bottom: 5px;overflow-y: scroll;overflow-x: hidden;overflow-wrap: anywhere;white-space: pre-wrap;font-family: \"Courier New\";font-size: 16px;") + Runtime.rtl.toStr("}.input.h-2340{") + Runtime.rtl.toStr("padding: 6px 12px;width: 100%;") + Runtime.rtl.toStr("}");
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Element 'div.output' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"@ref":["Bayrell.CloudOS.Docker.CLIPage","div_output"],"class":["output", this.getCssHash(ctx)].join(" "),"@elem_name":"output"}});
			
			/* Raw */
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "raw", {"content": Runtime.rtl.get(ctx, model, "content")});
			RenderDriver.p(__v0, __v0_childs);
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "input","attrs": {"@bind":["Bayrell.CloudOS.Docker.CLIPage","text"],"@event:Runtime.Web.Events.KeyDownEvent":["Bayrell.CloudOS.Docker.CLIPage","onKeyDown"],"class":["input", this.getCssHash(ctx)].join(" "),"@elem_name":"input"}});
			
			return __control_childs;
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Docker";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Docker.CLIPage";
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
			"class_name": "Bayrell.CloudOS.Docker.CLIPage",
			"name": "Bayrell.CloudOS.Docker.CLIPage",
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
				"class_name": "Bayrell.CloudOS.Docker.CLIPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/docker/cli/","name":"app.docker.cli"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Docker.CLIPage);
window["Bayrell.CloudOS.Docker.CLIPage"] = Bayrell.CloudOS.Docker.CLIPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Docker.CLIPage;
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
if (typeof Bayrell.CloudOS.Docker == 'undefined') Bayrell.CloudOS.Docker = {};
Bayrell.CloudOS.Docker.DockerServicesPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Docker.DockerServicesPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Docker.DockerServicesPage.prototype.constructor = Bayrell.CloudOS.Docker.DockerServicesPage;
Object.assign(Bayrell.CloudOS.Docker.DockerServicesPage.prototype,
{
	/**
 * On form event
 */
	onFormEvent: async function(ctx, msg)
	{
		var e = msg.data;
		if (e.event == "disable")
		{
			await this.onItemDisable(ctx);
		}
		else if (e.event == "enable")
		{
			await this.onItemEnable(ctx);
		}
	},
	/**
 * Enable item
 */
	onItemEnable: async function(ctx)
	{
		var item = this.crud.form_edit.model(ctx, "item");
		var pk = this.crud.constructor.getPrimaryKey(ctx, Runtime.rtl.get(ctx, this.crud.params, "struct"), item);
		this.crud.dialog_edit.update(ctx, "setWaitMessage");
		/* Send api */
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":this.crud.getCrudObjectName(ctx),"interface_name":"core.crud","method_name":"enable","data":Runtime.Dict.from({"docker_service_id":Runtime.rtl.get(ctx, item, "docker_service_id")})}));
		if (answer.isSuccess(ctx))
		{
			this.crud.table.update(ctx, "setItem", pk, Runtime.rtl.get(ctx, answer.response, "new_item"));
			this.crud.dialog_edit.update(ctx, "hide");
		}
		else
		{
			this.crud.dialog_edit.update(ctx, "setAnswer", answer);
		}
	},
	/**
 * Disable item
 */
	onItemDisable: async function(ctx)
	{
		var item = this.crud.form_edit.model(ctx, "item");
		var pk = this.crud.constructor.getPrimaryKey(ctx, Runtime.rtl.get(ctx, this.crud.params, "struct"), item);
		this.crud.dialog_edit.update(ctx, "setWaitMessage");
		/* Send api */
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":this.crud.getCrudObjectName(ctx),"interface_name":"core.crud","method_name":"disable","data":Runtime.Dict.from({"docker_service_id":Runtime.rtl.get(ctx, item, "docker_service_id")})}));
		if (answer.isSuccess(ctx))
		{
			this.crud.table.update(ctx, "setItem", pk, Runtime.rtl.get(ctx, answer.response, "new_item"));
			this.crud.dialog_edit.update(ctx, "hide");
		}
		else
		{
			this.crud.dialog_edit.update(ctx, "setAnswer", answer);
		}
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Docker.DockerServicesPage)
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
		return "Bayrell.CloudOS.Docker.DockerServicesPage";
	},
});
Object.assign(Bayrell.CloudOS.Docker.DockerServicesPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Docker.DockerServicesPage,
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
		var page_model = new Bayrell.CloudOS.Docker.DockerServicesPageModel(ctx, Runtime.Dict.from({"crud":await Runtime.Web.CRUD.CrudPageModel.crudSearch(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.DockerService","interface_name":"core.crud","method_name":"search"}), container)}));
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Services page");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Docker.DockerServicesPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var struct = Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":Runtime.Web.CRUD.CrudPage.fieldNumber})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"service_id","primary":true})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"_name","label":"Name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"_image","label":"Image","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				return this.trimImageName(ctx, model);
			}})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"enable","label":"Enable","class_name":"Runtime.Web.Input.Select","class_name_table":"Runtime.Web.Input.SelectText","class_settings":Runtime.Dict.from({"filter_show_select_value":true,"show_select_value":false,"options":Runtime.Collection.from([Runtime.Dict.from({"id":0,"value":"No"}),Runtime.Dict.from({"id":1,"value":"Yes"})])})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				return Runtime.Collection.from([Runtime.Web.CRUD.CrudPage.buttonEdit(ctx, layout, model, params, content),Runtime.Web.CRUD.CrudPage.buttonDelete(ctx, layout, model, params, content)]);
			}})}))]);
			
			var filter_fields = Runtime.Collection.from(["_name","_image","enable"]);
			
			var form_fields = Runtime.Collection.from(["_name","_image"]);
			
			var table_fields = Runtime.Collection.from(["number","_name","_image","enable","edit-buttons"]);
			
			var messages = Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.CloudOS", "Add service"),"delete":(ctx, item) => 
			{
				return ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "_name")}));
			}});
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.CRUD.CrudPage","attrs": {"@name":["Bayrell.CloudOS.Docker.DockerServicesPage","crud"],"@event:Runtime.Web.Form.FormEvent":["Bayrell.CloudOS.Docker.DockerServicesPage","onFormEvent"],"object_name":"Bayrell.CloudOS.DockerService","struct":struct,"filter_fields":filter_fields,"form_fields":form_fields,"table_fields":table_fields,"messages":messages,"form":Runtime.Dict.from({"renderButtons":(ctx, layout, model, params, content) => 
			{
				return (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Element 'div' */
					var __v0; var __v0_childs = [];
					[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {}});
					
					if (Runtime.rtl.get(ctx, params, "action") == "add")
					{
						/* Text */
						[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.Web.Form.Form.renderButton(ctx, layout, model, params, "create")});
						
						/* Text */
						[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.Web.Form.Form.renderButton(ctx, layout, model, params, "cancel")});
					}
					
					if (Runtime.rtl.get(ctx, params, "action") == "edit")
					{
						var __v1 = new Runtime.Monad(ctx, Runtime.rtl.attr(ctx, model, ["item", "enable"]));
						__v1 = __v1.monad(ctx, Runtime.rtl.m_to(ctx, "bool", false));
						var enable = __v1.value(ctx);
						
						/* Text */
						[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.Web.Form.Form.renderButton(ctx, layout, model, params, "update")});
						
						/* Text */
						[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.Web.Form.Form.renderButtonInfo(ctx, layout, model, params, Runtime.Dict.from({"type":"danger","@key":(enable) ? ("disable") : ("enable"),"data-action":(enable) ? ("disable") : ("enable"),"value":(enable) ? (ctx.translate(ctx, "Bayrell.CloudOS", "Disable")) : (ctx.translate(ctx, "Bayrell.CloudOS", "Enable"))}))});
						
						/* Text */
						[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": Runtime.Web.Form.Form.renderButton(ctx, layout, model, params, "cancel")});
					}
					RenderDriver.p(__v0, __v0_childs);
					
					return __control_childs;
				};
			}})}, "layout": layout});
			
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
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.Form.Form","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Docker";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Docker.DockerServicesPage";
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
			"class_name": "Bayrell.CloudOS.Docker.DockerServicesPage",
			"name": "Bayrell.CloudOS.Docker.DockerServicesPage",
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
				"class_name": "Bayrell.CloudOS.Docker.DockerServicesPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/docker/services/","name":"app.docker.services"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Docker.DockerServicesPage);
window["Bayrell.CloudOS.Docker.DockerServicesPage"] = Bayrell.CloudOS.Docker.DockerServicesPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Docker.DockerServicesPage;
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
if (typeof Bayrell.CloudOS.Docker == 'undefined') Bayrell.CloudOS.Docker = {};
Bayrell.CloudOS.Docker.DockerServicesPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.Docker.DockerServicesPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.Docker.DockerServicesPageModel.prototype.constructor = Bayrell.CloudOS.Docker.DockerServicesPageModel;
Object.assign(Bayrell.CloudOS.Docker.DockerServicesPageModel.prototype,
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
		if (o instanceof Bayrell.CloudOS.Docker.DockerServicesPageModel)
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
		return "Bayrell.CloudOS.Docker.DockerServicesPageModel";
	},
});
Object.assign(Bayrell.CloudOS.Docker.DockerServicesPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.Docker.DockerServicesPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Docker";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Docker.DockerServicesPageModel";
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
			"class_name": "Bayrell.CloudOS.Docker.DockerServicesPageModel",
			"name": "Bayrell.CloudOS.Docker.DockerServicesPageModel",
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
			"class_name": "Bayrell.CloudOS.Docker.DockerServicesPageModel",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Docker.DockerServicesPageModel);
window["Bayrell.CloudOS.Docker.DockerServicesPageModel"] = Bayrell.CloudOS.Docker.DockerServicesPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Docker.DockerServicesPageModel;
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
if (typeof Bayrell.CloudOS.Docker == 'undefined') Bayrell.CloudOS.Docker = {};
Bayrell.CloudOS.Docker.DockerYamlFilesPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.Docker.DockerYamlFilesPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.Docker.DockerYamlFilesPage.prototype.constructor = Bayrell.CloudOS.Docker.DockerYamlFilesPage;
Object.assign(Bayrell.CloudOS.Docker.DockerYamlFilesPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Docker.DockerYamlFilesPage)
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
		return "Bayrell.CloudOS.Docker.DockerYamlFilesPage";
	},
});
Object.assign(Bayrell.CloudOS.Docker.DockerYamlFilesPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.Docker.DockerYamlFilesPage,
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
		var page_model = new Bayrell.CloudOS.Docker.DockerYamlFilesPageModel(ctx, Runtime.Dict.from({"crud":await Runtime.Web.CRUD.CrudPageModel.crudSearch(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.DockerYamlFile","interface_name":"core.crud","method_name":"search"}), container)}));
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Docker yaml files page");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.Docker.DockerYamlFilesPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var struct = Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"file_id","primary":true})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":Runtime.Web.CRUD.CrudPage.fieldNumber})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"file_name","label":"File name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"content","label":"Content","class_name":"Runtime.Web.Input.TextArea"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
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
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.CRUD.CrudPage","attrs": {"@name":["Bayrell.CloudOS.Docker.DockerYamlFilesPage","crud"],"object_name":"Bayrell.CloudOS.DockerYamlFile","struct":struct,"filter_fields":filter_fields,"form_fields":form_fields,"table_fields":table_fields,"messages":messages,"dialog_form":Runtime.Dict.from({"width":"800px"})}, "layout": layout});
			
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
		return "Bayrell.CloudOS.Docker";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Docker.DockerYamlFilesPage";
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
			"class_name": "Bayrell.CloudOS.Docker.DockerYamlFilesPage",
			"name": "Bayrell.CloudOS.Docker.DockerYamlFilesPage",
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
				"class_name": "Bayrell.CloudOS.Docker.DockerYamlFilesPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/docker/yaml_files/","name":"app.docker.yaml_files"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Docker.DockerYamlFilesPage);
window["Bayrell.CloudOS.Docker.DockerYamlFilesPage"] = Bayrell.CloudOS.Docker.DockerYamlFilesPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Docker.DockerYamlFilesPage;
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
if (typeof Bayrell.CloudOS.Docker == 'undefined') Bayrell.CloudOS.Docker = {};
Bayrell.CloudOS.Docker.DockerYamlFilesPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.Docker.DockerYamlFilesPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.Docker.DockerYamlFilesPageModel.prototype.constructor = Bayrell.CloudOS.Docker.DockerYamlFilesPageModel;
Object.assign(Bayrell.CloudOS.Docker.DockerYamlFilesPageModel.prototype,
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
		if (o instanceof Bayrell.CloudOS.Docker.DockerYamlFilesPageModel)
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
		return "Bayrell.CloudOS.Docker.DockerYamlFilesPageModel";
	},
});
Object.assign(Bayrell.CloudOS.Docker.DockerYamlFilesPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.Docker.DockerYamlFilesPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Docker";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Docker.DockerYamlFilesPageModel";
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
			"class_name": "Bayrell.CloudOS.Docker.DockerYamlFilesPageModel",
			"name": "Bayrell.CloudOS.Docker.DockerYamlFilesPageModel",
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
			"class_name": "Bayrell.CloudOS.Docker.DockerYamlFilesPageModel",
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
Runtime.rtl.defClass(Bayrell.CloudOS.Docker.DockerYamlFilesPageModel);
window["Bayrell.CloudOS.Docker.DockerYamlFilesPageModel"] = Bayrell.CloudOS.Docker.DockerYamlFilesPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Docker.DockerYamlFilesPageModel;
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
if (typeof Bayrell.CloudOS.LogicMap == 'undefined') Bayrell.CloudOS.LogicMap = {};
Bayrell.CloudOS.LogicMap.LogicMapPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.LogicMap.LogicMapPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.LogicMap.LogicMapPage.prototype.constructor = Bayrell.CloudOS.LogicMap.LogicMapPage;
Object.assign(Bayrell.CloudOS.LogicMap.LogicMapPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.LogicMap.LogicMapPage)
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
		return "Bayrell.CloudOS.LogicMap.LogicMapPage";
	},
});
Object.assign(Bayrell.CloudOS.LogicMap.LogicMapPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.LogicMap.LogicMapPage,
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
		var page_model = new Bayrell.CloudOS.LogicMap.LogicMapPageModel(ctx, Runtime.Dict.from({}));
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Logic Map");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.LogicMap.LogicMapPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Text */
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Hello"});
			
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
		return "Bayrell.CloudOS.LogicMap";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.LogicMap.LogicMapPage";
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
			"class_name": "Bayrell.CloudOS.LogicMap.LogicMapPage",
			"name": "Bayrell.CloudOS.LogicMap.LogicMapPage",
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
				"class_name": "Bayrell.CloudOS.LogicMap.LogicMapPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/design/logic_map/","name":"app.design.logic_map"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.LogicMap.LogicMapPage);
window["Bayrell.CloudOS.LogicMap.LogicMapPage"] = Bayrell.CloudOS.LogicMap.LogicMapPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.LogicMap.LogicMapPage;
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
if (typeof Bayrell.CloudOS.LogicMap == 'undefined') Bayrell.CloudOS.LogicMap = {};
Bayrell.CloudOS.LogicMap.LogicMapPageModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.CloudOS.LogicMap.LogicMapPageModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.CloudOS.LogicMap.LogicMapPageModel.prototype.constructor = Bayrell.CloudOS.LogicMap.LogicMapPageModel;
Object.assign(Bayrell.CloudOS.LogicMap.LogicMapPageModel.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.LogicMap.LogicMapPageModel)
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
		return "Bayrell.CloudOS.LogicMap.LogicMapPageModel";
	},
});
Object.assign(Bayrell.CloudOS.LogicMap.LogicMapPageModel, Runtime.BaseStruct);
Object.assign(Bayrell.CloudOS.LogicMap.LogicMapPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.LogicMap";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.LogicMap.LogicMapPageModel";
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
			"class_name": "Bayrell.CloudOS.LogicMap.LogicMapPageModel",
			"name": "Bayrell.CloudOS.LogicMap.LogicMapPageModel",
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
Runtime.rtl.defClass(Bayrell.CloudOS.LogicMap.LogicMapPageModel);
window["Bayrell.CloudOS.LogicMap.LogicMapPageModel"] = Bayrell.CloudOS.LogicMap.LogicMapPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.LogicMap.LogicMapPageModel;
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
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		/* Create model */
		var page_model = new Bayrell.CloudOS.User.UsersPageModel(ctx, Runtime.Dict.from({"crud":await Runtime.Web.CRUD.CrudPageModel.crudSearch(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.Users","interface_name":"core.crud","method_name":"search"}), container)}));
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Users page");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.User.UsersPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), page_model);
		return Promise.resolve(Runtime.Collection.from([container]));
	},
	css: function(ctx, vars)
	{
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var struct = Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"user_id","primary":true})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				var table_model = Runtime.rtl.get(ctx, params, "table-model");
				var index = Runtime.rtl.get(ctx, params, "row-index");
				if (table_model)
				{
					return index + 1;
				}
				return "";
			}})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"name","label":"Name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"banned","label":"Banned","class_name":"Runtime.Web.Input.Select","class_name_table":"Runtime.Web.Input.SelectText","class_settings":Runtime.Dict.from({"show_select_value_filter":true,"show_select_value":false,"options":Runtime.Collection.from([Runtime.Dict.from({"id":0,"value":"No"}),Runtime.Dict.from({"id":1,"value":"Yes"})])})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				return Runtime.Collection.from([Runtime.Web.CRUD.CrudPage.buttonEdit(ctx, layout, model, params, content),Runtime.Web.CRUD.CrudPage.buttonDelete(ctx, layout, model, params, content)]);
			}})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"password1","label":"Password","class_name":"Runtime.Web.Input.Input","class_settings":Runtime.Dict.from({"type":"password"})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"password2","label":"Password","class_name":"Runtime.Web.Input.Input","class_settings":Runtime.Dict.from({"type":"password"})}))]);
			
			var filter_fields = Runtime.Collection.from(["name","banned"]);
			
			var form_fields = Runtime.Collection.from(["name","banned","password1","password2"]);
			
			var table_fields = Runtime.Collection.from(["number","name","banned","edit-buttons"]);
			
			var messages = Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.CloudOS", "Add user")});
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.CRUD.CrudPage","attrs": {"@name":["Bayrell.CloudOS.User.UsersPage","crud"],"object_name":"Bayrell.CloudOS.Users","struct":struct,"filter_fields":filter_fields,"form_fields":form_fields,"table_fields":table_fields,"messages":messages}, "layout": layout});
			
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
		return Runtime.Collection.from([new Runtime.Core.Driver(ctx, Runtime.Dict.from({"name":"root-controller","value":"Runtime.Web.RenderController","params":Runtime.Dict.from({"selector":"#root","main_controller":true,"window":"RootController"})})),new Runtime.Core.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderDriver.LAYOUT_CHAIN,"pos":10,"value":"Bayrell.CloudOS.Routes::layoutChain"})),new Runtime.Core.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderDriver.RENDER_CHAIN,"value":"Bayrell.CloudOS.Routes::Page404","pos":Runtime.Web.RenderDriver.RENDER_CHAIN_CALL_PAGE_NOT_FOUND,"is_async":true})),new Runtime.Core.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderDriver.RENDER_CHAIN,"value":"Bayrell.CloudOS.Routes::renderChainRouteAfter","pos":Runtime.Web.RenderDriver.RENDER_CHAIN_CALL_ROUTE_AFTER,"is_async":true})),new Runtime.Core.Entity(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Routes"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Dashboard.MainPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Dashboard.NodesPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Design.LayersPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Design.LogicMapPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Design.NginxPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Design.ServicesPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Design.SoftwaresPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Design.StacksPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Design.VirtualSpacesPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Docker.CLIPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Docker.DockerServicesPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Docker.DockerYamlFilesPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.User.UsersPage"}))]);
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