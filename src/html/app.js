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
Bayrell.CloudOS.DefaultLayout = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.DefaultLayout.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.DefaultLayout.prototype.constructor = Bayrell.CloudOS.DefaultLayout;
Object.assign(Bayrell.CloudOS.DefaultLayout.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.DefaultLayout)
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
		return "Bayrell.CloudOS.DefaultLayout";
	},
});
Object.assign(Bayrell.CloudOS.DefaultLayout, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.DefaultLayout,
{
	css: function(ctx, vars)
	{
		return "*{" + Runtime.rtl.toStr("box-sizing: border-box;") + Runtime.rtl.toStr("}body{") + Runtime.rtl.toStr("margin:0;padding:0;") + Runtime.rtl.toStr("}a {") + Runtime.rtl.toStr(" text-decoration: inherit; color: #0000d0; cursor: pointer; ") + Runtime.rtl.toStr("}a:hover, a:visited:hover {") + Runtime.rtl.toStr(" text-decoration: underline; color: red; ") + Runtime.rtl.toStr("}a:visited {") + Runtime.rtl.toStr(" text-decoration: inherit; color: #0000d0; ") + Runtime.rtl.toStr("}a.link.h-8005 {") + Runtime.rtl.toStr(" text-decoration: none; color: #0000d0; cursor: pointer; ") + Runtime.rtl.toStr("}a.link.h-8005:hover, a.link.h-8005:visited:hover {") + Runtime.rtl.toStr(" text-decoration: underline; color: red; ") + Runtime.rtl.toStr("}a.link.h-8005:visited {") + Runtime.rtl.toStr(" text-decoration: none; color: #0000d0; ") + Runtime.rtl.toStr("}body, html{") + Runtime.rtl.toStr("font-family: 'Ubuntu', sans-serif;font-size: 14px;width: 100%;padding: 0;margin: 0;") + Runtime.rtl.toStr("}td, th{") + Runtime.rtl.toStr("font-family: 'Ubuntu', sans-serif;font-size: 14px;") + Runtime.rtl.toStr("}span.lpad5.h-8005{") + Runtime.rtl.toStr("display: inline-block;padding-right: 5px;") + Runtime.rtl.toStr("}.layout.h-8005{") + Runtime.rtl.toStr("height: 100%;") + Runtime.rtl.toStr("}.layout_wrap.h-8005{") + Runtime.rtl.toStr("position: relative;display: flex;align-items: stretch;min-height: 100%;") + Runtime.rtl.toStr("}.layout_menu_wrap.h-8005{") + Runtime.rtl.toStr("position: relative;width: 200px;") + Runtime.rtl.toStr("}.layout_content_wrap.h-8005{") + Runtime.rtl.toStr("position: relative;width: calc(100% - 200px);padding-bottom: 10px;") + Runtime.rtl.toStr("}.layout_site_name.h-8005, .layout_title.h-8005, .layout_top_menu.h-8005{") + Runtime.rtl.toStr("font-size: 16px;height: 40px;") + Runtime.rtl.toStr("}.layout_site_name.h-8005, .layout_title.h-8005, .layout_top_menu.h-8005, .layout_page.h-8005, .layout_content.h-8005{") + Runtime.rtl.toStr("padding: 10px;") + Runtime.rtl.toStr("}.layout_top_menu_item.h-8005{") + Runtime.rtl.toStr("padding-left: 10px;padding-right: 10px;") + Runtime.rtl.toStr("}.layout_site_name.h-8005{") + Runtime.rtl.toStr("border-right: 1px #ccc solid;") + Runtime.rtl.toStr("}.layout_top_menu.h-8005{") + Runtime.rtl.toStr("display: flex;align-items: stretch;") + Runtime.rtl.toStr("}.layout_content.h-8005{") + Runtime.rtl.toStr("position: relative;height: calc(100% - 70px);padding-bottom: 0;padding-right: 0;") + Runtime.rtl.toStr("}.layout_menu_label.h-8005{") + Runtime.rtl.toStr("font-size: 14px;font-weight: bold;padding: 10px;") + Runtime.rtl.toStr("}.layout_menu.h-8005{") + Runtime.rtl.toStr("position: relative;height: calc(100% - 40px);overflow-y: auto;border-right: 1px #ccc solid;") + Runtime.rtl.toStr("}.layout_menu_items.h-8005{") + Runtime.rtl.toStr("}.layout_menu_items.h-8005 ul, .layout_menu_items.h-8005 li{") + Runtime.rtl.toStr("padding: 0; margin: 0;list-style: none;") + Runtime.rtl.toStr("}.layout_menu_items.h-8005 ul{") + Runtime.rtl.toStr("}.layout_menu_items.h-8005 li{") + Runtime.rtl.toStr("background-color: white;") + Runtime.rtl.toStr("}.layout_menu_items.h-8005 li:hover{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "default", "hover-background"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.layout_menu_items.h-8005 li a{") + Runtime.rtl.toStr("display: block;padding: 10px 15px;border-bottom: 1px solid #e7e7e7;") + Runtime.rtl.toStr("}.layout_menu_items.h-8005 li.active.h-8005 > a, .layout_menu_items.h-8005 li.active.h-8005 > a:hover{") + Runtime.rtl.toStr("background-color: #337ab7;border-color: #337ab7;color: white;") + Runtime.rtl.toStr("}.layout_menu_logout.h-8005{") + Runtime.rtl.toStr("text-align: center;padding-top: 100px;") + Runtime.rtl.toStr("}.layout_menu_logout.h-8005 > div{") + Runtime.rtl.toStr("padding-top: 5px;") + Runtime.rtl.toStr("}");
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
			[__vnull, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS.Simple", "Cloud OS")});
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
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.admin.services")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/admin/services/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Services")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.admin.yaml_files")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/admin/yaml_files/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Yaml files")});
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
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.admin.domains")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/admin/domains/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Domains")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.admin.spaces")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/admin/spaces/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Spaces")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.admin.layers")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/admin/layers/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Layers")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.admin.routes")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/admin/routes/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Routes")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.admin.nginx")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/admin/nginx/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Nginx Files")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, Runtime.rtl.attr(ctx, layout, ["route", "name"]), "app.admin.users")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/admin/users/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Users")});
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
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/admin/database/","target":"_self","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Adminer")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/admin/env/","target":"_self","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Env")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/admin/phpinfo/","target":"_self","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "PHP Info")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			RenderDriver.p(__v5, __v5_childs);
			RenderDriver.p(__v4, __v4_childs);
			RenderDriver.p(__v3, __v3_childs);
			RenderDriver.p(__v2, __v2_childs);
			
			/* Element 'div.layout_content_wrap' */
			var __v2; var __v2_childs = [];
			[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["layout_content_wrap", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_content_wrap"}});
			
			/* Element 'div.layout_title' */
			var __v3; var __v3_childs = [];
			[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "div","attrs": {"class":["layout_title", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_title"}});
			
			/* Text */
			[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": model.title});
			RenderDriver.p(__v3, __v3_childs);
			
			/* Element 'div.layout_content' */
			var __v3; var __v3_childs = [];
			[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "div","attrs": {"class":["layout_content", this.getCssHash(ctx)].join(" "),"@elem_name":"layout_content"}});
			
			if (!Runtime.rtl.isEmpty(ctx, class_name))
			{
				[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "component", {"name": class_name,"attrs": {"@bind":["Bayrell.CloudOS.DefaultLayout","page_model"],"@key":"view"}, "layout": layout});
			}
			RenderDriver.p(__v3, __v3_childs);
			RenderDriver.p(__v2, __v2_childs);
			RenderDriver.p(__v1, __v1_childs);
			RenderDriver.p(__v0, __v0_childs);
			
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
		return "Bayrell.CloudOS.DefaultLayout";
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
			"class_name": "Bayrell.CloudOS.DefaultLayout",
			"name": "Bayrell.CloudOS.DefaultLayout",
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
Runtime.rtl.defClass(Bayrell.CloudOS.DefaultLayout);
window["Bayrell.CloudOS.DefaultLayout"] = Bayrell.CloudOS.DefaultLayout;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.DefaultLayout;
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
			layout = Runtime.rtl.setAttr(ctx, layout, Runtime.Collection.from(["layout_class"]), "Bayrell.CloudOS.DefaultLayout");
		}
		if (layout.layout_name == "admin")
		{
			layout = Runtime.rtl.setAttr(ctx, layout, Runtime.Collection.from(["layout_class"]), "Bayrell.CloudOS.DefaultLayout");
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
	 * Title chain
	 */
	titleChain: function(ctx, layout, title)
	{
		title = title + Runtime.rtl.toStr(" | Bayrell Cloud OS");
		return Runtime.Collection.from([layout,title]);
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
		/* Set admin page if login */
		var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, container.layout.keep_data, "Runtime.Web.Auth.AuthToken"));
		__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Web.Auth.AuthToken", null));
		var auth_token = __v0.value(ctx);
		if (auth_token)
		{
			container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "admin");
		}
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
Bayrell.CloudOS.MainPage = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Bayrell.CloudOS.MainPage.prototype = Object.create(Runtime.Web.Component.prototype);
Bayrell.CloudOS.MainPage.prototype.constructor = Bayrell.CloudOS.MainPage;
Object.assign(Bayrell.CloudOS.MainPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.MainPage)
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
		return "Bayrell.CloudOS.MainPage";
	},
});
Object.assign(Bayrell.CloudOS.MainPage, Runtime.Web.Component);
Object.assign(Bayrell.CloudOS.MainPage,
{
	/**
 * Route Action
 * @return RenderContainer
 */
	MainPage: async function(ctx, container)
	{
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Index page");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "admin");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.MainPage");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model"]), new Runtime.Dict(ctx, Runtime.Dict.from({})));
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
			
			/* Text */
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Hello"});
			
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
		return "Bayrell.CloudOS.MainPage";
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
			"class_name": "Bayrell.CloudOS.MainPage",
			"name": "Bayrell.CloudOS.MainPage",
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
				"class_name": "Bayrell.CloudOS.MainPage",
				"name": "MainPage",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/","name":"app.dashboard.main"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.MainPage);
window["Bayrell.CloudOS.MainPage"] = Bayrell.CloudOS.MainPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.MainPage;
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
Bayrell.CloudOS.Design.DomainsPage = function(ctx)
{
	Runtime.Web.CRUD.CrudPage.apply(this, arguments);
};
Bayrell.CloudOS.Design.DomainsPage.prototype = Object.create(Runtime.Web.CRUD.CrudPage.prototype);
Bayrell.CloudOS.Design.DomainsPage.prototype.constructor = Bayrell.CloudOS.Design.DomainsPage;
Object.assign(Bayrell.CloudOS.Design.DomainsPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.DomainsPage)
		{
		}
		Runtime.Web.CRUD.CrudPage.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.CRUD.CrudPage.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.CRUD.CrudPage.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Design.DomainsPage";
	},
});
Object.assign(Bayrell.CloudOS.Design.DomainsPage, Runtime.Web.CRUD.CrudPage);
Object.assign(Bayrell.CloudOS.Design.DomainsPage,
{
	/**
 * Returns object name
 */
	getCrudObjectName: function(ctx)
	{
		return "Bayrell.CloudOS.Domain";
	},
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		var __v0 = new Runtime.Monad(ctx, container);
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","title"]), "Domains"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","layout_name"]), "admin"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_class"]), "Bayrell.CloudOS.Design.DomainsPage"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_model"]), new Runtime.Web.CRUD.CrudPageModel(ctx)));
		__v0 = await __v0.callAsync(ctx, this.crudSearch.bind(this));
		return Runtime.Collection.from([__v0.value(ctx)]);
	},
	/**
 * Returns options
 */
	getOptions: function(ctx, container, name)
	{
		if (name == undefined) name = "";
		if (name == "spaces")
		{
			var __v0 = new Runtime.Monad(ctx, container.layout.page_model);
			__v0 = __v0.attr(ctx, "foreigns");
			__v0 = __v0.attr(ctx, "spaces");
			__v0 = __v0.attr(ctx, "options");
			__v0 = __v0.call(ctx, Runtime.lib.map(ctx, (ctx, item) => 
			{
				return Runtime.Dict.from({"id":Runtime.rtl.get(ctx, item, "space_id"),"value":Runtime.rtl.get(ctx, item, "api_name"),"item":item});
			}));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
			return __v0.value(ctx);
		}
		return Runtime.Web.CRUD.CrudPage.getOptions.bind(this)(ctx, container, name);
	},
	/**
 * Returns crud struct
 */
	getStruct: function(ctx, container)
	{
		return Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","info":Runtime.Dict.from({"table":Runtime.Dict.from({"render":this.renderNumber.bind(this)})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"domain_name","primary":true,"label":"Domain name","class_name":"Runtime.Web.Input.Input","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"nginx_template","label":"Nginx temlate","class_name":"Runtime.Web.Input.TextArea"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"space_id","label":"Space name","class_name":"Runtime.Web.Input.Select","class_settings":Runtime.Dict.from({"show_select_value":true,"options":this.getOptions(ctx, container, "spaces")}),"info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.SelectText"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","info":Runtime.Dict.from({"table":Runtime.Dict.from({"render":this.renderButtons.bind(this)})})}))]);
	},
	/**
 * Returns filter fields
 */
	getFilterFields: function(ctx, container)
	{
		return Runtime.Collection.from(["space_id","domain_name"]);
	},
	/**
 * Returns form fields
 */
	getFormFields: function(ctx, container)
	{
		return Runtime.Collection.from(["space_id","domain_name","nginx_template"]);
	},
	/**
 * Returns table fields
 */
	getTableFields: function(ctx, container)
	{
		return Runtime.Collection.from(["number","space_id","domain_name","edit-buttons"]);
	},
	/**
 * Returns view fields
 */
	getViewFields: function(ctx, container)
	{
		return Runtime.Collection.from([]);
	},
	/**
 * Returns messages
 */
	getMessages: function(ctx)
	{
		return Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.TimePlanner", "Add domain"),"delete":(ctx, item) => 
		{
			return ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "domain_name")}));
		}});
	},
	/**
 * Dialog settings
 */
	getDialogSettings: function(ctx)
	{
		return Runtime.Dict.from({"width":"800px"});
	},
	/**
 * Form settings
 */
	getFormSettings: function(ctx)
	{
		return Runtime.Dict.from({});
	},
	/**
 * Custom class name
 */
	customClassName: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		return Runtime.rtl.get(ctx, crud_settings, "crud_class_name");
	},
	/**
 * Custom field render
 */
	calcField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		return value;
	},
	/**
 * Custom field render
 */
	renderField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		/* Table number */
		if (kind == "table" && field_name == "number")
		{
			return this.renderNumber(ctx, layout, value, crud_settings);
		}
		/* Table edit buttons */
		if (kind == "table" && field_name == "edit-buttons")
		{
			return this.renderButtons(ctx, layout, value, crud_settings);
		}
		return null;
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.CRUD.CrudPage","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText","Runtime.Web.Input.TextArea"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.DomainsPage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.CRUD.CrudPage";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.CloudOS.Design.DomainsPage",
			"name": "Bayrell.CloudOS.Design.DomainsPage",
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
				"class_name": "Bayrell.CloudOS.Design.DomainsPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/admin/domains/","name":"app.admin.domains"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Design.DomainsPage);
window["Bayrell.CloudOS.Design.DomainsPage"] = Bayrell.CloudOS.Design.DomainsPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.DomainsPage;
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
	Runtime.Web.CRUD.CrudPage.apply(this, arguments);
};
Bayrell.CloudOS.Design.LayersPage.prototype = Object.create(Runtime.Web.CRUD.CrudPage.prototype);
Bayrell.CloudOS.Design.LayersPage.prototype.constructor = Bayrell.CloudOS.Design.LayersPage;
Object.assign(Bayrell.CloudOS.Design.LayersPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.LayersPage)
		{
		}
		Runtime.Web.CRUD.CrudPage.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.CRUD.CrudPage.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.CRUD.CrudPage.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Design.LayersPage";
	},
});
Object.assign(Bayrell.CloudOS.Design.LayersPage, Runtime.Web.CRUD.CrudPage);
Object.assign(Bayrell.CloudOS.Design.LayersPage,
{
	/**
 * Returns object name
 */
	getCrudObjectName: function(ctx)
	{
		return "Bayrell.CloudOS.Layer";
	},
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		var __v0 = new Runtime.Monad(ctx, container);
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","title"]), "Layers"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","layout_name"]), "admin"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_class"]), "Bayrell.CloudOS.Design.LayersPage"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_model"]), new Runtime.Web.CRUD.CrudPageModel(ctx)));
		__v0 = await __v0.callAsync(ctx, this.crudSearch.bind(this));
		return Runtime.Collection.from([__v0.value(ctx)]);
	},
	/**
 * Returns options
 */
	getOptions: function(ctx, container, name)
	{
		if (name == undefined) name = "";
		if (name == "spaces")
		{
			var __v0 = new Runtime.Monad(ctx, container.layout.page_model);
			__v0 = __v0.attr(ctx, "foreigns");
			__v0 = __v0.attr(ctx, "spaces");
			__v0 = __v0.attr(ctx, "options");
			__v0 = __v0.call(ctx, Runtime.lib.map(ctx, (ctx, item) => 
			{
				return Runtime.Dict.from({"id":Runtime.rtl.get(ctx, item, "space_id"),"value":Runtime.rtl.get(ctx, item, "api_name"),"item":item});
			}));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
			return __v0.value(ctx);
		}
		return Runtime.Web.CRUD.CrudPage.getOptions.bind(this)(ctx, container, name);
	},
	/**
 * Returns crud struct
 */
	getStruct: function(ctx, container)
	{
		return Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"layer_uid","primary":true,"label":"Layer UID","class_name":"Runtime.Web.Input.Input","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"layer_name","label":"Name","class_name":"Runtime.Web.Input.Input","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"space_id","label":"Space","class_name":"Runtime.Web.Input.Select","class_settings":Runtime.Dict.from({"show_select_value":true,"options":this.getOptions(ctx, container, "spaces")}),"info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.SelectText"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label"}))]);
	},
	/**
 * Returns filter fields
 */
	getFilterFields: function(ctx, container)
	{
		return Runtime.Collection.from(["space_id","layer_uid"]);
	},
	/**
 * Returns form fields
 */
	getFormFields: function(ctx, container)
	{
		return Runtime.Collection.from(["space_id","layer_name","layer_uid"]);
	},
	/**
 * Returns table fields
 */
	getTableFields: function(ctx, container)
	{
		return Runtime.Collection.from(["number","space_id","layer_name","layer_uid","edit-buttons"]);
	},
	/**
 * Returns view fields
 */
	getViewFields: function(ctx, container)
	{
		return Runtime.Collection.from([]);
	},
	/**
 * Returns messages
 */
	getMessages: function(ctx)
	{
		return Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.TimePlanner", "Add layer"),"delete":(ctx, item) => 
		{
			return ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "layer_name")}));
		}});
	},
	/**
 * Dialog settings
 */
	getDialogSettings: function(ctx)
	{
		return Runtime.Dict.from({});
	},
	/**
 * Form settings
 */
	getFormSettings: function(ctx)
	{
		return Runtime.Dict.from({});
	},
	/**
 * Custom class name
 */
	customClassName: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		return Runtime.rtl.get(ctx, crud_settings, "crud_class_name");
	},
	/**
 * Custom field render
 */
	calcField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		return value;
	},
	/**
 * Custom field render
 */
	renderField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		/* Table number */
		if (kind == "table" && field_name == "number")
		{
			return this.renderNumber(ctx, layout, value, crud_settings);
		}
		/* Href */
		if (kind == "table" && field_name == "layer_href")
		{
			var item = Runtime.rtl.get(ctx, crud_settings, "crud_item");
			var uri = "http://" + Runtime.rtl.toStr(Runtime.rtl.get(ctx, item, "domain_name")) + Runtime.rtl.toStr(Runtime.rtl.get(ctx, item, "route"));
			return uri;
		}
		/* Open button */
		if (kind == "table" && field_name == "open")
		{
			var item = Runtime.rtl.get(ctx, crud_settings, "crud_item");
			var uri = "http://" + Runtime.rtl.toStr(Runtime.rtl.get(ctx, item, "domain_name")) + Runtime.rtl.toStr(Runtime.rtl.get(ctx, item, "route"));
			return this.renderButton(ctx, layout, crud_settings, "view", Runtime.Dict.from({"url":uri,"target":"_blank","label":"Open"}));
		}
		/* Table edit buttons */
		if (kind == "table" && field_name == "edit-buttons")
		{
			return this.renderButtons(ctx, layout, value, crud_settings);
		}
		return null;
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.CRUD.CrudPage","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText"]);
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
		return "Runtime.Web.CRUD.CrudPage";
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
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/admin/layers/","name":"app.admin.layers"})),
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
Bayrell.CloudOS.Design.LayersRoutesPage = function(ctx)
{
	Runtime.Web.CRUD.CrudPage.apply(this, arguments);
};
Bayrell.CloudOS.Design.LayersRoutesPage.prototype = Object.create(Runtime.Web.CRUD.CrudPage.prototype);
Bayrell.CloudOS.Design.LayersRoutesPage.prototype.constructor = Bayrell.CloudOS.Design.LayersRoutesPage;
Object.assign(Bayrell.CloudOS.Design.LayersRoutesPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.LayersRoutesPage)
		{
		}
		Runtime.Web.CRUD.CrudPage.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.CRUD.CrudPage.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.CRUD.CrudPage.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Design.LayersRoutesPage";
	},
});
Object.assign(Bayrell.CloudOS.Design.LayersRoutesPage, Runtime.Web.CRUD.CrudPage);
Object.assign(Bayrell.CloudOS.Design.LayersRoutesPage,
{
	/**
 * Returns object name
 */
	getCrudObjectName: function(ctx)
	{
		return "Bayrell.CloudOS.LayerRoute";
	},
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		var __v0 = new Runtime.Monad(ctx, container);
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","title"]), "Routes"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","layout_name"]), "admin"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_class"]), "Bayrell.CloudOS.Design.LayersRoutesPage"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_model"]), new Runtime.Web.CRUD.CrudPageModel(ctx)));
		__v0 = await __v0.callAsync(ctx, this.crudSearch.bind(this));
		return Runtime.Collection.from([__v0.value(ctx)]);
	},
	/**
 * Returns options
 */
	getOptions: function(ctx, container, name)
	{
		if (name == undefined) name = "";
		if (name == "domains")
		{
			var __v0 = new Runtime.Monad(ctx, container.layout.page_model);
			__v0 = __v0.attr(ctx, "foreigns");
			__v0 = __v0.attr(ctx, "domains");
			__v0 = __v0.attr(ctx, "options");
			__v0 = __v0.call(ctx, Runtime.lib.map(ctx, (ctx, item) => 
			{
				return Runtime.Dict.from({"id":Runtime.rtl.get(ctx, item, "domain_name"),"value":Runtime.rtl.get(ctx, item, "domain_name"),"item":item});
			}));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
			return __v0.value(ctx);
		}
		if (name == "layers")
		{
			var __v0 = new Runtime.Monad(ctx, container.layout.page_model);
			__v0 = __v0.attr(ctx, "foreigns");
			__v0 = __v0.attr(ctx, "layers");
			__v0 = __v0.attr(ctx, "options");
			__v0 = __v0.call(ctx, Runtime.lib.map(ctx, (ctx, item) => 
			{
				return Runtime.Dict.from({"id":Runtime.rtl.get(ctx, item, "layer_id"),"value":Runtime.rtl.get(ctx, item, "domain_name") + Runtime.rtl.toStr(Runtime.rtl.get(ctx, item, "route")) + Runtime.rtl.toStr(" (") + Runtime.rtl.toStr(Runtime.rtl.get(ctx, item, "layer_uid")) + Runtime.rtl.toStr(") ") + Runtime.rtl.toStr(Runtime.rtl.get(ctx, item, "service_name")),"item":item});
			}));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
			return __v0.value(ctx);
		}
		return Runtime.Web.CRUD.CrudPage.getOptions.bind(this)(ctx, container, name);
	},
	/**
 * Returns crud struct
 */
	getStruct: function(ctx, container)
	{
		return Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"domain_name","primary":true,"label":"Domain name","class_name":"Runtime.Web.Input.Select","class_settings":Runtime.Dict.from({"show_select_value":true,"options":this.getOptions(ctx, container, "domains")}),"info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.SelectText"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"route","primary":true,"label":"Route","class_name":"Runtime.Web.Input.Input","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"domain_route","label":"Route","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"layer_id","label":"Layer","class_name":"Runtime.Web.Input.Select","class_settings":Runtime.Dict.from({"show_select_value":true,"options":this.getOptions(ctx, container, "layers")}),"info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.SelectText"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"layer_uid","label":"Layer UID","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"layer_route","label":"Layer route","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"layer_name","label":"Layer name","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"layer_domain_name","label":"Layer domain name","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"service_name","label":"Service","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"software_api_name","label":"Software","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"open","label":"","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","info":Runtime.Dict.from({"table":Runtime.Dict.from({"render":this.renderButtons.bind(this)})})}))]);
	},
	/**
 * Returns filter fields
 */
	getFilterFields: function(ctx, container)
	{
		return Runtime.Collection.from(["layer_id","domain_name","route"]);
	},
	/**
 * Returns form fields
 */
	getFormFields: function(ctx, container)
	{
		return Runtime.Collection.from(["layer_id","domain_name","route"]);
	},
	/**
 * Returns table fields
 */
	getTableFields: function(ctx, container)
	{
		return Runtime.Collection.from(["number","layer_name","layer_domain_name","layer_route","layer_uid","service_name","domain_route","open","edit-buttons"]);
	},
	/**
 * Returns view fields
 */
	getViewFields: function(ctx, container)
	{
		return Runtime.Collection.from([]);
	},
	/**
 * Returns messages
 */
	getMessages: function(ctx)
	{
		return Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.TimePlanner", "Add route"),"delete":(ctx, item) => 
		{
			return ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "domain_name") + Runtime.rtl.toStr(Runtime.rtl.get(ctx, item, "route"))}));
		}});
	},
	/**
 * Dialog settings
 */
	getDialogSettings: function(ctx)
	{
		return Runtime.Dict.from({});
	},
	/**
 * Form settings
 */
	getFormSettings: function(ctx)
	{
		return Runtime.Dict.from({});
	},
	/**
 * Custom class name
 */
	customClassName: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		return Runtime.rtl.get(ctx, crud_settings, "crud_class_name");
	},
	/**
 * Custom field render
 */
	calcField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		/* Route */
		if (field_name == "domain_route")
		{
			var item = Runtime.rtl.get(ctx, crud_settings, "crud_item");
			return Runtime.rtl.get(ctx, item, "domain_name") + Runtime.rtl.toStr(Runtime.rtl.get(ctx, item, "route"));
		}
		return value;
	},
	/**
 * Custom field render
 */
	renderField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		/* Table number */
		if (kind == "table" && field_name == "number")
		{
			return this.renderNumber(ctx, layout, value, crud_settings);
		}
		/* Open */
		if (kind == "table" && field_name == "open")
		{
			var item = Runtime.rtl.get(ctx, crud_settings, "crud_item");
			var uri = "http://" + Runtime.rtl.toStr(Runtime.rtl.get(ctx, item, "domain_name")) + Runtime.rtl.toStr(Runtime.rtl.get(ctx, item, "route"));
			return this.renderButton(ctx, layout, crud_settings, "view", Runtime.Dict.from({"url":uri,"target":"_blank","label":"Open"}));
		}
		/* Table edit buttons */
		if (kind == "table" && field_name == "edit-buttons")
		{
			return this.renderButtons(ctx, layout, value, crud_settings);
		}
		return null;
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.CRUD.CrudPage","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.LayersRoutesPage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.CRUD.CrudPage";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.CloudOS.Design.LayersRoutesPage",
			"name": "Bayrell.CloudOS.Design.LayersRoutesPage",
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
				"class_name": "Bayrell.CloudOS.Design.LayersRoutesPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/admin/layers/routes/","name":"app.admin.layers.routes"})),
					new Runtime.Web.RouteMiddleware(ctx, Runtime.Dict.from({"value":"Runtime.Web.Auth.AuthFrontend::checkAuthMiddleware"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Design.LayersRoutesPage);
window["Bayrell.CloudOS.Design.LayersRoutesPage"] = Bayrell.CloudOS.Design.LayersRoutesPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.LayersRoutesPage;
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
Bayrell.CloudOS.Design.NginxFilesPage = function(ctx)
{
	Runtime.Web.CRUD.CrudPage.apply(this, arguments);
};
Bayrell.CloudOS.Design.NginxFilesPage.prototype = Object.create(Runtime.Web.CRUD.CrudPage.prototype);
Bayrell.CloudOS.Design.NginxFilesPage.prototype.constructor = Bayrell.CloudOS.Design.NginxFilesPage;
Object.assign(Bayrell.CloudOS.Design.NginxFilesPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.NginxFilesPage)
		{
		}
		Runtime.Web.CRUD.CrudPage.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.CRUD.CrudPage.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.CRUD.CrudPage.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Design.NginxFilesPage";
	},
});
Object.assign(Bayrell.CloudOS.Design.NginxFilesPage, Runtime.Web.CRUD.CrudPage);
Object.assign(Bayrell.CloudOS.Design.NginxFilesPage,
{
	/**
 * Returns object name
 */
	getCrudObjectName: function(ctx)
	{
		return "Bayrell.CloudOS.NginxFile";
	},
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		var __v0 = new Runtime.Monad(ctx, container);
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","title"]), "Nginx"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","layout_name"]), "admin"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_class"]), "Bayrell.CloudOS.Design.NginxFilesPage"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_model"]), new Runtime.Web.CRUD.CrudPageModel(ctx)));
		__v0 = await __v0.callAsync(ctx, this.crudSearch.bind(this));
		return Runtime.Collection.from([__v0.value(ctx)]);
	},
	/**
 * Returns options
 */
	getOptions: function(ctx, container, name)
	{
		if (name == undefined) name = "";
		return Runtime.Web.CRUD.CrudPage.getOptions.bind(this)(ctx, container, name);
	},
	/**
 * Returns crud struct
 */
	getStruct: function(ctx, container)
	{
		return Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"name","primary":true,"label":"File name","class_name":"Runtime.Web.Input.Input","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"enable","label":"Enable","class_name":"Runtime.Web.Input.Select","class_settings":Runtime.Dict.from({"show_select_value_filter":true,"show_select_value":false,"options":Runtime.Collection.from([Runtime.Dict.from({"id":0,"value":"No"}),Runtime.Dict.from({"id":1,"value":"Yes"})])}),"info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.SelectText"}),"form":Runtime.Dict.from({"class_settings":Runtime.Dict.from({"default":0})})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"content","label":"Content","class_name":"Runtime.Web.Input.TextArea","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","info":Runtime.Dict.from({"table":Runtime.Dict.from({"render":this.renderButtons.bind(this)})})}))]);
	},
	/**
 * Returns filter fields
 */
	getFilterFields: function(ctx, container)
	{
		return Runtime.Collection.from(["name","enable"]);
	},
	/**
 * Returns form fields
 */
	getFormFields: function(ctx, container)
	{
		return Runtime.Collection.from(["name","enable","content"]);
	},
	/**
 * Returns table fields
 */
	getTableFields: function(ctx, container)
	{
		return Runtime.Collection.from(["number","name","enable","edit-buttons"]);
	},
	/**
 * Returns view fields
 */
	getViewFields: function(ctx, container)
	{
		return Runtime.Collection.from([]);
	},
	/**
 * Returns messages
 */
	getMessages: function(ctx)
	{
		return Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.TimePlanner", "Add nginx files"),"delete":(ctx, item) => 
		{
			return ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "name")}));
		}});
	},
	/**
 * Dialog settings
 */
	getDialogSettings: function(ctx)
	{
		return Runtime.Dict.from({"width":"800px"});
	},
	/**
 * Form settings
 */
	getFormSettings: function(ctx)
	{
		return Runtime.Dict.from({});
	},
	/**
 * Custom class name
 */
	customClassName: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		return Runtime.rtl.get(ctx, crud_settings, "crud_class_name");
	},
	/**
 * Custom field render
 */
	calcField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		return value;
	},
	/**
 * Custom field render
 */
	renderField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		/* Table number */
		if (kind == "table" && field_name == "number")
		{
			return this.renderNumber(ctx, layout, value, crud_settings);
		}
		/* Table edit buttons */
		if (kind == "table" && field_name == "edit-buttons")
		{
			return this.renderButtons(ctx, layout, value, crud_settings);
		}
		return null;
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.CRUD.CrudPage","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText","Runtime.Web.Input.TextArea"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.NginxFilesPage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.CRUD.CrudPage";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.CloudOS.Design.NginxFilesPage",
			"name": "Bayrell.CloudOS.Design.NginxFilesPage",
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
				"class_name": "Bayrell.CloudOS.Design.NginxFilesPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/admin/nginx/","name":"app.admin.nginx"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Design.NginxFilesPage);
window["Bayrell.CloudOS.Design.NginxFilesPage"] = Bayrell.CloudOS.Design.NginxFilesPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.NginxFilesPage;
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
Bayrell.CloudOS.Design.RoutesPage = function(ctx)
{
	Runtime.Web.CRUD.CrudPage.apply(this, arguments);
};
Bayrell.CloudOS.Design.RoutesPage.prototype = Object.create(Runtime.Web.CRUD.CrudPage.prototype);
Bayrell.CloudOS.Design.RoutesPage.prototype.constructor = Bayrell.CloudOS.Design.RoutesPage;
Object.assign(Bayrell.CloudOS.Design.RoutesPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.RoutesPage)
		{
		}
		Runtime.Web.CRUD.CrudPage.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.CRUD.CrudPage.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.CRUD.CrudPage.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Design.RoutesPage";
	},
});
Object.assign(Bayrell.CloudOS.Design.RoutesPage, Runtime.Web.CRUD.CrudPage);
Object.assign(Bayrell.CloudOS.Design.RoutesPage,
{
	/**
 * Returns object name
 */
	getCrudObjectName: function(ctx)
	{
		return "Bayrell.CloudOS.Route";
	},
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		var __v0 = new Runtime.Monad(ctx, container);
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","title"]), "Routes"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","layout_name"]), "admin"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_class"]), "Bayrell.CloudOS.Design.RoutesPage"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_model"]), new Runtime.Web.CRUD.CrudPageModel(ctx)));
		__v0 = await __v0.callAsync(ctx, this.crudSearch.bind(this));
		return Runtime.Collection.from([__v0.value(ctx)]);
	},
	/**
 * Returns options
 */
	getOptions: function(ctx, container, name)
	{
		if (name == undefined) name = "";
		if (name == "enable")
		{
			return Runtime.Collection.from([Runtime.Dict.from({"id":0,"value":"No"}),Runtime.Dict.from({"id":1,"value":"Yes"})]);
		}
		if (name == "protocol")
		{
			return Runtime.Collection.from([Runtime.Dict.from({"id":"http","value":"HTTP"})]);
		}
		if (name == "domains")
		{
			var __v0 = new Runtime.Monad(ctx, container.layout.page_model);
			__v0 = __v0.attr(ctx, "foreigns");
			__v0 = __v0.attr(ctx, "domains");
			__v0 = __v0.attr(ctx, "options");
			__v0 = __v0.call(ctx, Runtime.lib.map(ctx, (ctx, item) => 
			{
				return Runtime.Dict.from({"id":Runtime.rtl.get(ctx, item, "domain_name"),"value":Runtime.rtl.get(ctx, item, "domain_name"),"item":item});
			}));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
			return __v0.value(ctx);
		}
		if (name == "services")
		{
			var __v0 = new Runtime.Monad(ctx, container.layout.page_model);
			__v0 = __v0.attr(ctx, "foreigns");
			__v0 = __v0.attr(ctx, "services");
			__v0 = __v0.attr(ctx, "options");
			__v0 = __v0.call(ctx, Runtime.lib.map(ctx, (ctx, item) => 
			{
				return Runtime.Dict.from({"id":Runtime.rtl.get(ctx, item, "docker_name"),"value":Runtime.rtl.get(ctx, item, "docker_name"),"item":item});
			}));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
			return __v0.value(ctx);
		}
		if (name == "layers")
		{
			var __v0 = new Runtime.Monad(ctx, container.layout.page_model);
			__v0 = __v0.attr(ctx, "foreigns");
			__v0 = __v0.attr(ctx, "layers");
			__v0 = __v0.attr(ctx, "options");
			__v0 = __v0.call(ctx, Runtime.lib.map(ctx, (ctx, item) => 
			{
				return Runtime.Dict.from({"id":Runtime.rtl.get(ctx, item, "layer_uid"),"value":Runtime.rtl.get(ctx, item, "layer_uid"),"item":item});
			}));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
			return __v0.value(ctx);
		}
		return Runtime.Web.CRUD.CrudPage.getOptions.bind(this)(ctx, container, name);
	},
	/**
 * Returns crud struct
 */
	getStruct: function(ctx, container)
	{
		return Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"id","primary":true})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","info":Runtime.Dict.from({"table":Runtime.Dict.from({"render":this.renderNumber.bind(this)})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"enable","label":"Enable","class_name":"Runtime.Web.Input.Select","class_settings":Runtime.Dict.from({"show_select_value_filter":true,"show_select_value":false,"options":this.getOptions(ctx, container, "enable")}),"info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.SelectText"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"protocol","label":"Protocol","class_name":"Runtime.Web.Input.Select","class_settings":Runtime.Dict.from({"show_select_value":true,"options":this.getOptions(ctx, container, "protocol")}),"info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.SelectText"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"route","label":"Route","class_name":"Runtime.Web.Input.Input","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"target_port","label":"Target port","class_name":"Runtime.Web.Input.Input","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"route_prefix","label":"Route prefix","class_name":"Runtime.Web.Input.Input","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"domain_name","label":"Domain name","class_name":"Runtime.Web.Input.Select","class_settings":Runtime.Dict.from({"show_select_value":true,"options":this.getOptions(ctx, container, "domains")}),"info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.SelectText"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"docker_name","label":"Docker name","class_name":"Runtime.Web.Input.Select","class_settings":Runtime.Dict.from({"show_select_value":true,"options":this.getOptions(ctx, container, "services")}),"info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.SelectText"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"layer_uid","label":"Layer","class_name":"Runtime.Web.Input.Select","class_settings":Runtime.Dict.from({"show_select_value":true,"options":this.getOptions(ctx, container, "layers")}),"info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.SelectText"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"nginx_template","label":"Nginx temlate","class_name":"Runtime.Web.Input.TextArea"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","info":Runtime.Dict.from({"table":Runtime.Dict.from({"render":this.renderButtons.bind(this)})})}))]);
	},
	/**
 * Returns filter fields
 */
	getFilterFields: function(ctx, container)
	{
		return Runtime.Collection.from(["enable","protocol","domain_name","docker_name","layer_uid"]);
	},
	/**
 * Returns form fields
 */
	getFormFields: function(ctx, container)
	{
		return Runtime.Collection.from(["protocol","domain_name","route","docker_name","target_port","route_prefix","layer_uid"]);
	},
	/**
 * Returns table fields
 */
	getTableFields: function(ctx, container)
	{
		return Runtime.Collection.from(["number","protocol","domain_name","route","docker_name","target_port","route_prefix","layer_uid","edit-buttons"]);
	},
	/**
 * Returns view fields
 */
	getViewFields: function(ctx, container)
	{
		return Runtime.Collection.from([]);
	},
	/**
 * Returns messages
 */
	getMessages: function(ctx)
	{
		return Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.TimePlanner", "Add route"),"delete":(ctx, item) => 
		{
			return ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "domain_name")}));
		}});
	},
	/**
 * Dialog settings
 */
	getDialogSettings: function(ctx)
	{
		return Runtime.Dict.from({"width":"800px"});
	},
	/**
 * Form settings
 */
	getFormSettings: function(ctx)
	{
		return Runtime.Dict.from({});
	},
	/**
 * Custom class name
 */
	customClassName: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		return Runtime.rtl.get(ctx, crud_settings, "crud_class_name");
	},
	/**
 * Custom field render
 */
	calcField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		return value;
	},
	/**
 * Custom field render
 */
	renderField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		/* Table number */
		if (kind == "table" && field_name == "number")
		{
			return this.renderNumber(ctx, layout, value, crud_settings);
		}
		/* Table edit buttons */
		if (kind == "table" && field_name == "edit-buttons")
		{
			return this.renderButtons(ctx, layout, value, crud_settings);
		}
		return null;
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.CRUD.CrudPage","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText","Runtime.Web.Input.TextArea"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.RoutesPage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.CRUD.CrudPage";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.CloudOS.Design.RoutesPage",
			"name": "Bayrell.CloudOS.Design.RoutesPage",
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
				"class_name": "Bayrell.CloudOS.Design.RoutesPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/admin/routes/","name":"app.admin.routes"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Design.RoutesPage);
window["Bayrell.CloudOS.Design.RoutesPage"] = Bayrell.CloudOS.Design.RoutesPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.RoutesPage;
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
Bayrell.CloudOS.Design.ServicePage = function(ctx)
{
	Runtime.Web.CRUD.CrudPage.apply(this, arguments);
};
Bayrell.CloudOS.Design.ServicePage.prototype = Object.create(Runtime.Web.CRUD.CrudPage.prototype);
Bayrell.CloudOS.Design.ServicePage.prototype.constructor = Bayrell.CloudOS.Design.ServicePage;
Object.assign(Bayrell.CloudOS.Design.ServicePage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.ServicePage)
		{
		}
		Runtime.Web.CRUD.CrudPage.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.CRUD.CrudPage.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.CRUD.CrudPage.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Design.ServicePage";
	},
});
Object.assign(Bayrell.CloudOS.Design.ServicePage, Runtime.Web.CRUD.CrudPage);
Object.assign(Bayrell.CloudOS.Design.ServicePage,
{
	/**
 * Returns object name
 */
	getCrudObjectName: function(ctx)
	{
		return "Bayrell.CloudOS.Service";
	},
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		var __v0 = new Runtime.Monad(ctx, container);
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","title"]), "Services"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","layout_name"]), "admin"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_class"]), "Bayrell.CloudOS.Design.ServicePage"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_model"]), new Runtime.Web.CRUD.CrudPageModel(ctx)));
		__v0 = await __v0.callAsync(ctx, this.crudSearch.bind(this));
		return Runtime.Collection.from([__v0.value(ctx)]);
	},
	/**
 * Returns options
 */
	getOptions: function(ctx, container, name)
	{
		if (name == undefined) name = "";
		return Runtime.Web.CRUD.CrudPage.getOptions.bind(this)(ctx, container, name);
	},
	/**
 * Returns crud struct
 */
	getStruct: function(ctx, container)
	{
		return Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"service_id","primary":true})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"stack_name","label":"Stack name","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"service_name","label":"Service name","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"software_api_name","label":"Software api name","class_name":"Runtime.Web.Input.Input","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"docker_name","label":"Docker name","class_name":"Runtime.Web.Input.Label","info":Runtime.Dict.from({"filter":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Input"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"docker_replicas","label":"Replicas","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"docker_image","label":"Docker image","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"have_admin_page","label":"Admin page","class_name":"Runtime.Web.Input.Select","class_settings":Runtime.Dict.from({"show_select_value_filter":true,"show_select_value":false,"options":Runtime.Collection.from([Runtime.Dict.from({"id":0,"value":"No"}),Runtime.Dict.from({"id":1,"value":"Yes"})])}),"info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.SelectText"}),"form":Runtime.Dict.from({"class_settings":Runtime.Dict.from({"default":0})})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"admin_page_settings","label":"Admin settings","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"admin_port","label":"Admin port","class_name":"Runtime.Web.Input.Input"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"admin_route","label":"Admin route","class_name":"Runtime.Web.Input.Input"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"enable","label":"Enable","class_name":"Runtime.Web.Input.Select","class_settings":Runtime.Dict.from({"show_select_value_filter":true,"show_select_value":false,"options":Runtime.Collection.from([Runtime.Dict.from({"id":0,"value":"No"}),Runtime.Dict.from({"id":1,"value":"Yes"})])}),"info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.SelectText"}),"form":Runtime.Dict.from({"class_settings":Runtime.Dict.from({"default":0})})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label"}))]);
	},
	/**
 * Returns filter fields
 */
	getFilterFields: function(ctx, container)
	{
		return Runtime.Collection.from(["docker_name","have_admin_page","enable"]);
	},
	/**
 * Returns form fields
 */
	getFormFields: function(ctx, container)
	{
		return Runtime.Collection.from(["stack_name","service_name","software_api_name","have_admin_page","admin_port","admin_route"]);
	},
	/**
 * Returns table fields
 */
	getTableFields: function(ctx, container)
	{
		return Runtime.Collection.from(["number","docker_name","docker_image","software_api_name","docker_replicas","enable","have_admin_page","edit-buttons"]);
	},
	/**
 * Returns view fields
 */
	getViewFields: function(ctx, container)
	{
		return Runtime.Collection.from([]);
	},
	/**
 * Returns messages
 */
	getMessages: function(ctx)
	{
		return Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.TimePlanner", "Add service"),"delete":(ctx, item) => 
		{
			return ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "docker_name")}));
		}});
	},
	/**
 * Dialog settings
 */
	getDialogSettings: function(ctx)
	{
		return Runtime.Dict.from({});
	},
	/**
 * Form settings
 */
	getFormSettings: function(ctx)
	{
		return Runtime.Dict.from({});
	},
	/**
 * Custom class name
 */
	customClassName: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		if (kind == "form" && field_name == "service_name")
		{
			var model = Runtime.rtl.get(ctx, crud_settings, "crud_form_model");
			return (Runtime.rtl.get(ctx, model, "action") == "create") ? ("Runtime.Web.Input.Input") : ("Runtime.Web.Input.Label");
		}
		if (kind == "form" && field_name == "stack_name")
		{
			var model = Runtime.rtl.get(ctx, crud_settings, "crud_form_model");
			return (Runtime.rtl.get(ctx, model, "action") == "create") ? ("Runtime.Web.Input.Input") : ("Runtime.Web.Input.Label");
		}
		return Runtime.rtl.get(ctx, crud_settings, "crud_class_name");
	},
	/**
 * Custom field render
 */
	calcField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		if (field_name == "docker_image")
		{
			var item = Runtime.rtl.get(ctx, crud_settings, "crud_item");
			var image = Runtime.rtl.get(ctx, item, "docker_image");
			return this.trimImageName(ctx, image);
		}
		if (field_name == "docker_replicas")
		{
			var item = Runtime.rtl.get(ctx, crud_settings, "crud_item");
			var __v0 = new Runtime.Monad(ctx, Runtime.rtl.attr(ctx, item, ["docker_balancer", "State", "Work"]));
			__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "int", 0));
			var work = __v0.value(ctx);
			var __v1 = new Runtime.Monad(ctx, Runtime.rtl.attr(ctx, item, ["docker_balancer", "State", "Total"]));
			__v1 = __v1.monad(ctx, Runtime.rtl.m_to(ctx, "int", 0));
			var total = __v1.value(ctx);
			return work + Runtime.rtl.toStr(" / ") + Runtime.rtl.toStr(total);
		}
		return value;
	},
	/**
 * Custom field render
 */
	renderField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		var item = Runtime.rtl.get(ctx, crud_settings, "crud_item");
		/* Table number */
		if (kind == "table" && field_name == "number")
		{
			return this.renderNumber(ctx, layout, value, crud_settings);
		}
		/* Table have admin page button */
		if (kind == "table" && field_name == "have_admin_page")
		{
			return (value == 0) ? ("No") : ((__control) =>
			{
				var __vnull = null;
				var __control_childs = [];
				
				/* Element 'div' */
				var __v0; var __v0_childs = [];
				[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {}});
				
				/* Element 'div' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"style":"display:inline-block;vertical-align: middle; margin-right: 5px;"}});
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": this.renderButton(ctx, layout, crud_settings, "view", Runtime.Dict.from({"url":"/admin/services/" + Runtime.rtl.toStr(Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, crud_settings, "crud_item"), "docker_name")) + Runtime.rtl.toStr("/"),"target":"_blank"}))});
				RenderDriver.p(__v1, __v1_childs);
				
				/* Element 'div' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"style":"display:inline-block;vertical-align: middle; margin-left: 5px;"}});
				
				/* Element 'div' */
				var __v2; var __v2_childs = [];
				[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {}});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": "Port = "});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": Runtime.rtl.get(ctx, item, "admin_port")});
				RenderDriver.p(__v2, __v2_childs);
				
				/* Element 'div' */
				var __v2; var __v2_childs = [];
				[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {}});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": "Route = "});
				
				/* Text */
				[__vnull, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "text", {"content": Runtime.rtl.get(ctx, item, "admin_route")});
				RenderDriver.p(__v2, __v2_childs);
				RenderDriver.p(__v1, __v1_childs);
				RenderDriver.p(__v0, __v0_childs);
				
				return __control_childs;
			});
		}
		/* Table edit buttons */
		if (kind == "table" && field_name == "edit-buttons")
		{
			return this.renderButtons(ctx, layout, value, crud_settings);
		}
		/* Admin page settings */
		if (kind == "table" && field_name == "admin_page_settings")
		{
			return "";
		}
		return null;
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
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.CRUD.CrudPage","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.ServicePage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.CRUD.CrudPage";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.CloudOS.Design.ServicePage",
			"name": "Bayrell.CloudOS.Design.ServicePage",
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
				"class_name": "Bayrell.CloudOS.Design.ServicePage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/admin/services/","name":"app.admin.services"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Design.ServicePage);
window["Bayrell.CloudOS.Design.ServicePage"] = Bayrell.CloudOS.Design.ServicePage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.ServicePage;
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
Bayrell.CloudOS.Design.SpacesPage = function(ctx)
{
	Runtime.Web.CRUD.CrudPage.apply(this, arguments);
};
Bayrell.CloudOS.Design.SpacesPage.prototype = Object.create(Runtime.Web.CRUD.CrudPage.prototype);
Bayrell.CloudOS.Design.SpacesPage.prototype.constructor = Bayrell.CloudOS.Design.SpacesPage;
Object.assign(Bayrell.CloudOS.Design.SpacesPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.SpacesPage)
		{
		}
		Runtime.Web.CRUD.CrudPage.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.CRUD.CrudPage.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.CRUD.CrudPage.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Design.SpacesPage";
	},
});
Object.assign(Bayrell.CloudOS.Design.SpacesPage, Runtime.Web.CRUD.CrudPage);
Object.assign(Bayrell.CloudOS.Design.SpacesPage,
{
	/**
 * Returns object name
 */
	getCrudObjectName: function(ctx)
	{
		return "Bayrell.CloudOS.Space";
	},
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		var __v0 = new Runtime.Monad(ctx, container);
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","title"]), "Spaces"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","layout_name"]), "admin"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_class"]), "Bayrell.CloudOS.Design.SpacesPage"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_model"]), new Runtime.Web.CRUD.CrudPageModel(ctx)));
		__v0 = await __v0.callAsync(ctx, this.crudSearch.bind(this));
		return Runtime.Collection.from([__v0.value(ctx)]);
	},
	/**
 * Returns options
 */
	getOptions: function(ctx, container, name)
	{
		if (name == undefined) name = "";
		return Runtime.Web.CRUD.CrudPage.getOptions.bind(this)(ctx, container, name);
	},
	/**
 * Returns crud struct
 */
	getStruct: function(ctx, container)
	{
		return Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"space_id","primary":true})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"api_name","label":"Api name","class_name":"Runtime.Web.Input.Input","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"name","label":"Space name","class_name":"Runtime.Web.Input.Input","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","info":Runtime.Dict.from({"table":Runtime.Dict.from({"render":this.renderButtons.bind(this)})})}))]);
	},
	/**
 * Returns filter fields
 */
	getFilterFields: function(ctx, container)
	{
		return Runtime.Collection.from(["api_name","name"]);
	},
	/**
 * Returns form fields
 */
	getFormFields: function(ctx, container)
	{
		return Runtime.Collection.from(["api_name","name"]);
	},
	/**
 * Returns table fields
 */
	getTableFields: function(ctx, container)
	{
		return Runtime.Collection.from(["number","api_name","name","edit-buttons"]);
	},
	/**
 * Returns view fields
 */
	getViewFields: function(ctx, container)
	{
		return Runtime.Collection.from([]);
	},
	/**
 * Returns messages
 */
	getMessages: function(ctx)
	{
		return Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.TimePlanner", "Add space"),"delete":(ctx, item) => 
		{
			return ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "space_name")}));
		}});
	},
	/**
 * Dialog settings
 */
	getDialogSettings: function(ctx)
	{
		return Runtime.Dict.from({});
	},
	/**
 * Form settings
 */
	getFormSettings: function(ctx)
	{
		return Runtime.Dict.from({});
	},
	/**
 * Custom class name
 */
	customClassName: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		return Runtime.rtl.get(ctx, crud_settings, "crud_class_name");
	},
	/**
 * Custom field render
 */
	calcField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		return value;
	},
	/**
 * Custom field render
 */
	renderField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		/* Table number */
		if (kind == "table" && field_name == "number")
		{
			return this.renderNumber(ctx, layout, value, crud_settings);
		}
		/* Table edit buttons */
		if (kind == "table" && field_name == "edit-buttons")
		{
			return this.renderButtons(ctx, layout, value, crud_settings);
		}
		return null;
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.CRUD.CrudPage","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.SpacesPage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.CRUD.CrudPage";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.CloudOS.Design.SpacesPage",
			"name": "Bayrell.CloudOS.Design.SpacesPage",
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
				"class_name": "Bayrell.CloudOS.Design.SpacesPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/admin/spaces/","name":"app.admin.spaces"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Design.SpacesPage);
window["Bayrell.CloudOS.Design.SpacesPage"] = Bayrell.CloudOS.Design.SpacesPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.SpacesPage;
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
Bayrell.CloudOS.Design.TopMenuPage = function(ctx)
{
	Runtime.Web.CRUD.CrudPage.apply(this, arguments);
};
Bayrell.CloudOS.Design.TopMenuPage.prototype = Object.create(Runtime.Web.CRUD.CrudPage.prototype);
Bayrell.CloudOS.Design.TopMenuPage.prototype.constructor = Bayrell.CloudOS.Design.TopMenuPage;
Object.assign(Bayrell.CloudOS.Design.TopMenuPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.TopMenuPage)
		{
		}
		Runtime.Web.CRUD.CrudPage.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.CRUD.CrudPage.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.CRUD.CrudPage.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Design.TopMenuPage";
	},
});
Object.assign(Bayrell.CloudOS.Design.TopMenuPage, Runtime.Web.CRUD.CrudPage);
Object.assign(Bayrell.CloudOS.Design.TopMenuPage,
{
	/**
 * Returns object name
 */
	getCrudObjectName: function(ctx)
	{
		return "Bayrell.CloudOS.TopMenu";
	},
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		var __v0 = new Runtime.Monad(ctx, container);
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","title"]), "Top menu"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","layout_name"]), "admin"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_class"]), "Bayrell.CloudOS.Design.TopMenuPage"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_model"]), new Runtime.Web.CRUD.CrudPageModel(ctx)));
		__v0 = await __v0.callAsync(ctx, this.crudSearch.bind(this));
		return Runtime.Collection.from([__v0.value(ctx)]);
	},
	/**
 * Returns options
 */
	getOptions: function(ctx, container, name)
	{
		if (name == undefined) name = "";
		return Runtime.Web.CRUD.CrudPage.getOptions.bind(this)(ctx, container, name);
	},
	/**
 * Returns crud struct
 */
	getStruct: function(ctx, container)
	{
		return Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"id","primary":true})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"name","label":"Name","class_name":"Runtime.Web.Input.Input","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"href","label":"Link","class_name":"Runtime.Web.Input.Input","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"pos","label":"Position","class_name":"Runtime.Web.Input.Input","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label"}))]);
	},
	/**
 * Returns filter fields
 */
	getFilterFields: function(ctx, container)
	{
		return Runtime.Collection.from(["name","href"]);
	},
	/**
 * Returns form fields
 */
	getFormFields: function(ctx, container)
	{
		return Runtime.Collection.from(["name","href","pos"]);
	},
	/**
 * Returns table fields
 */
	getTableFields: function(ctx, container)
	{
		return Runtime.Collection.from(["number","name","href","pos","edit-buttons"]);
	},
	/**
 * Returns view fields
 */
	getViewFields: function(ctx, container)
	{
		return Runtime.Collection.from([]);
	},
	/**
 * Returns messages
 */
	getMessages: function(ctx)
	{
		return Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.TimePlanner", "Add"),"delete":(ctx, item) => 
		{
			return ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "name")}));
		}});
	},
	/**
 * Dialog settings
 */
	getDialogSettings: function(ctx)
	{
		return Runtime.Dict.from({});
	},
	/**
 * Form settings
 */
	getFormSettings: function(ctx)
	{
		return Runtime.Dict.from({});
	},
	/**
 * Custom class name
 */
	customClassName: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		return Runtime.rtl.get(ctx, crud_settings, "crud_class_name");
	},
	/**
 * Custom field render
 */
	calcField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		return value;
	},
	/**
 * Custom field render
 */
	renderField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		/* Table number */
		if (kind == "table" && field_name == "number")
		{
			return this.renderNumber(ctx, layout, value, crud_settings);
		}
		/* Table edit buttons */
		if (kind == "table" && field_name == "edit-buttons")
		{
			return this.renderButtons(ctx, layout, value, crud_settings);
		}
		return null;
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.CRUD.CrudPage","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText","Runtime.Web.Input.TextArea"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.TopMenuPage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.CRUD.CrudPage";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.CloudOS.Design.TopMenuPage",
			"name": "Bayrell.CloudOS.Design.TopMenuPage",
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
				"class_name": "Bayrell.CloudOS.Design.TopMenuPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/admin/top_menu/","name":"app.admin.top_menu"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Design.TopMenuPage);
window["Bayrell.CloudOS.Design.TopMenuPage"] = Bayrell.CloudOS.Design.TopMenuPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.TopMenuPage;
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
Bayrell.CloudOS.Design.UsersPage = function(ctx)
{
	Runtime.Web.CRUD.CrudPage.apply(this, arguments);
};
Bayrell.CloudOS.Design.UsersPage.prototype = Object.create(Runtime.Web.CRUD.CrudPage.prototype);
Bayrell.CloudOS.Design.UsersPage.prototype.constructor = Bayrell.CloudOS.Design.UsersPage;
Object.assign(Bayrell.CloudOS.Design.UsersPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.UsersPage)
		{
		}
		Runtime.Web.CRUD.CrudPage.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.CRUD.CrudPage.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.CRUD.CrudPage.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Design.UsersPage";
	},
});
Object.assign(Bayrell.CloudOS.Design.UsersPage, Runtime.Web.CRUD.CrudPage);
Object.assign(Bayrell.CloudOS.Design.UsersPage,
{
	/**
 * Returns object name
 */
	getCrudObjectName: function(ctx)
	{
		return "Bayrell.CloudOS.User";
	},
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		var __v0 = new Runtime.Monad(ctx, container);
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","title"]), "Users"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","layout_name"]), "admin"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_class"]), "Bayrell.CloudOS.Design.UsersPage"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_model"]), new Runtime.Web.CRUD.CrudPageModel(ctx)));
		__v0 = await __v0.callAsync(ctx, this.crudSearch.bind(this));
		return Runtime.Collection.from([__v0.value(ctx)]);
	},
	/**
 * Returns options
 */
	getOptions: function(ctx, container, name)
	{
		if (name == undefined) name = "";
		return Runtime.Web.CRUD.CrudPage.getOptions.bind(this)(ctx, container, name);
	},
	/**
 * Returns crud struct
 */
	getStruct: function(ctx, container)
	{
		return Runtime.Collection.from([new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"user_id","primary":true})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label"})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"login","label":"Login","class_name":"Runtime.Web.Input.Input","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"name","label":"Name","class_name":"Runtime.Web.Input.Input","info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.Label"})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"banned","label":"Banned","class_name":"Runtime.Web.Input.Select","class_settings":Runtime.Dict.from({"show_select_value_filter":true,"show_select_value":false,"options":Runtime.Collection.from([Runtime.Dict.from({"id":0,"value":"No"}),Runtime.Dict.from({"id":1,"value":"Yes"})])}),"info":Runtime.Dict.from({"table":Runtime.Dict.from({"class_name":"Runtime.Web.Input.SelectText"}),"form":Runtime.Dict.from({"class_settings":Runtime.Dict.from({"default":0})})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"edit-buttons","label":"","class_name":"Runtime.Web.Input.Label","info":Runtime.Dict.from({"table":Runtime.Dict.from({"render":this.renderButtons.bind(this)})})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"password1","label":"Password","class_name":"Runtime.Web.Input.Input","class_settings":Runtime.Dict.from({"type":"password"})})),new Runtime.Web.CRUD.FieldInfo(ctx, Runtime.Dict.from({"api_name":"password2","label":"Password","class_name":"Runtime.Web.Input.Input","class_settings":Runtime.Dict.from({"type":"password"})}))]);
	},
	/**
 * Returns filter fields
 */
	getFilterFields: function(ctx, container)
	{
		return Runtime.Collection.from(["login","banned"]);
	},
	/**
 * Returns form fields
 */
	getFormFields: function(ctx, container)
	{
		return Runtime.Collection.from(["login","name","banned","password1","password2"]);
	},
	/**
 * Returns table fields
 */
	getTableFields: function(ctx, container)
	{
		return Runtime.Collection.from(["number","login","name","banned","edit-buttons"]);
	},
	/**
 * Returns view fields
 */
	getViewFields: function(ctx, container)
	{
		return Runtime.Collection.from([]);
	},
	/**
 * Returns messages
 */
	getMessages: function(ctx)
	{
		return Runtime.Dict.from({"add":ctx.translate(ctx, "Bayrell.TimePlanner", "Add user"),"delete":(ctx, item) => 
		{
			return ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "login")}));
		}});
	},
	/**
 * Dialog settings
 */
	getDialogSettings: function(ctx)
	{
		return Runtime.Dict.from({});
	},
	/**
 * Form settings
 */
	getFormSettings: function(ctx)
	{
		return Runtime.Dict.from({});
	},
	/**
 * Custom class name
 */
	customClassName: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		return Runtime.rtl.get(ctx, crud_settings, "crud_class_name");
	},
	/**
 * Custom field render
 */
	calcField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		return value;
	},
	/**
 * Custom field render
 */
	renderField: function(ctx, layout, kind, field_name, value, crud_settings)
	{
		/* Table number */
		if (kind == "table" && field_name == "number")
		{
			return this.renderNumber(ctx, layout, value, crud_settings);
		}
		/* Table edit buttons */
		if (kind == "table" && field_name == "edit-buttons")
		{
			return this.renderButtons(ctx, layout, value, crud_settings);
		}
		return null;
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.CRUD.CrudPage","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.UsersPage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.CRUD.CrudPage";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.CloudOS.Design.UsersPage",
			"name": "Bayrell.CloudOS.Design.UsersPage",
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
				"class_name": "Bayrell.CloudOS.Design.UsersPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/admin/users/","name":"app.admin.users"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Design.UsersPage);
window["Bayrell.CloudOS.Design.UsersPage"] = Bayrell.CloudOS.Design.UsersPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.UsersPage;
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
Bayrell.CloudOS.Design.YamlFilesPage = function(ctx)
{
	Runtime.Web.CRUD.CrudPage.apply(this, arguments);
};
Bayrell.CloudOS.Design.YamlFilesPage.prototype = Object.create(Runtime.Web.CRUD.CrudPage.prototype);
Bayrell.CloudOS.Design.YamlFilesPage.prototype.constructor = Bayrell.CloudOS.Design.YamlFilesPage;
Object.assign(Bayrell.CloudOS.Design.YamlFilesPage.prototype,
{
	/* Reload file list */
	reloadFileList: async function(ctx)
	{
		/* Remote call */
		var answer = await Runtime.Web.RenderDriver.externalBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.YamlFiles","interface_name":"default","method_name":"getFiles"}));
		if (answer.isSuccess(ctx))
		{
			this.update(ctx, "copy", Runtime.Dict.from({"stacks":answer.response}));
		}
	},
	/* Add file */
	onAddFile: async function(ctx, msg)
	{
		this.update(ctx, "copy", Runtime.Dict.from({"create_stack_name":"","create_file_name":""}));
		this.create_dialog.update(ctx, "show");
	},
	/* Edit file name */
	onEditFile: async function(ctx, msg)
	{
		msg.cancel(ctx);
		var stack_name = Runtime.rtl.get(ctx, msg.sender.params, "stack-name");
		var file_name = Runtime.rtl.get(ctx, msg.sender.params, "file-name");
		var current_dialog_file = stack_name + Runtime.rtl.toStr("/") + Runtime.rtl.toStr(file_name);
		this.update(ctx, "copy", Runtime.Dict.from({"current_dialog_file":current_dialog_file,"edit_file_name":file_name}));
		this.edit_dialog.update(ctx, "show");
	},
	/* Delete file name */
	onDeleteFile: async function(ctx, msg)
	{
		msg.cancel(ctx);
		var stack_name = Runtime.rtl.get(ctx, msg.sender.params, "stack-name");
		var file_name = Runtime.rtl.get(ctx, msg.sender.params, "file-name");
		var current_dialog_file = stack_name + Runtime.rtl.toStr("/") + Runtime.rtl.toStr(file_name);
		this.update(ctx, "copy", Runtime.Dict.from({"current_dialog_file":current_dialog_file}));
		this.delete_dialog.update(ctx, "confirm", "Do you realy want to delete " + Runtime.rtl.toStr(current_dialog_file));
	},
	/* Dialog event */
	onDialogEvent: async function(ctx, msg)
	{
		var model = this.model(ctx);
		/* Create dialog */
		if (msg.sender == this.create_dialog)
		{
			if (msg.data.button_result == "ok")
			{
				var create_stack_name = Runtime.rtl.get(ctx, model, "create_stack_name");
				var create_file_name = Runtime.rtl.get(ctx, model, "create_file_name");
				if (create_stack_name == "" || create_file_name == "")
				{
					this.create_dialog.update(ctx, "copy", Runtime.Dict.from({"error_message":"Stack name or file name is empty"}));
				}
				else
				{
					this.create_dialog.update(ctx, "copy", Runtime.Dict.from({"message":"Wait for file creation"}));
					this.create_dialog.update(ctx, "copy", Runtime.Dict.from({"error_message":""}));
					/* Call api */
					var answer = await Runtime.Web.RenderDriver.externalBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.YamlFiles","interface_name":"default","method_name":"createFile","data":Runtime.Dict.from({"stack_name":create_stack_name,"file_name":create_file_name})}));
					if (answer.isSuccess(ctx))
					{
						await this.reloadFileList(ctx);
						this.create_dialog.update(ctx, "hide");
					}
					else
					{
						this.create_dialog.update(ctx, "copy", Runtime.Dict.from({"message":""}));
						this.create_dialog.update(ctx, "copy", Runtime.Dict.from({"error_message":answer.error_message}));
					}
				}
			}
			else if (msg.data.button_result == "cancel")
			{
				this.create_dialog.update(ctx, "hide");
			}
		}
		else if (msg.sender == this.edit_dialog)
		{
			if (msg.data.button_result == "ok")
			{
				var current_file = Runtime.rtl.get(ctx, model, "current_file");
				var edit_file_name = Runtime.rtl.get(ctx, model, "edit_file_name");
				var current_dialog_file = Runtime.rtl.get(ctx, model, "current_dialog_file");
				var arr = Runtime.rs.split(ctx, "/", current_dialog_file);
				var current_stack_name = Runtime.rtl.get(ctx, arr, 0);
				var current_file_name = Runtime.rtl.get(ctx, arr, 1);
				this.edit_dialog.update(ctx, "copy", Runtime.Dict.from({"message":"Wait for file rename"}));
				this.edit_dialog.update(ctx, "copy", Runtime.Dict.from({"error_message":""}));
				/* Call api */
				var answer = await Runtime.Web.RenderDriver.externalBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.YamlFiles","interface_name":"default","method_name":"renameFile","data":Runtime.Dict.from({"stack_name":current_stack_name,"file_name":current_file_name,"file_name_new":edit_file_name})}));
				if (answer.isSuccess(ctx))
				{
					await this.reloadFileList(ctx);
					if (current_file == current_dialog_file)
					{
						this.update(ctx, "copy", Runtime.Dict.from({"current_file":current_stack_name + Runtime.rtl.toStr("/") + Runtime.rtl.toStr(edit_file_name)}));
					}
					this.edit_dialog.update(ctx, "hide");
				}
				else
				{
					this.edit_dialog.update(ctx, "copy", Runtime.Dict.from({"message":""}));
					this.edit_dialog.update(ctx, "copy", Runtime.Dict.from({"error_message":answer.error_message}));
				}
			}
			else if (msg.data.button_result == "cancel")
			{
				this.edit_dialog.update(ctx, "hide");
			}
		}
		else if (msg.sender == this.delete_dialog)
		{
			if (msg.data.button_result == "ok")
			{
				var current_file = Runtime.rtl.get(ctx, model, "current_file");
				var current_dialog_file = Runtime.rtl.get(ctx, model, "current_dialog_file");
				var arr = Runtime.rs.split(ctx, "/", current_dialog_file);
				var current_stack_name = Runtime.rtl.get(ctx, arr, 0);
				var current_file_name = Runtime.rtl.get(ctx, arr, 1);
				this.delete_dialog.update(ctx, "copy", Runtime.Dict.from({"message":"Wait for file rename"}));
				this.delete_dialog.update(ctx, "copy", Runtime.Dict.from({"error_message":""}));
				/* Call api */
				var answer = await Runtime.Web.RenderDriver.externalBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.YamlFiles","interface_name":"default","method_name":"deleteFile","data":Runtime.Dict.from({"stack_name":current_stack_name,"file_name":current_file_name})}));
				if (answer.isSuccess(ctx))
				{
					await this.reloadFileList(ctx);
					if (current_file == current_dialog_file)
					{
						this.update(ctx, "copy", Runtime.Dict.from({"current_file":"","content":""}));
					}
					this.delete_dialog.update(ctx, "hide");
				}
				else
				{
					this.delete_dialog.update(ctx, "copy", Runtime.Dict.from({"message":""}));
					this.delete_dialog.update(ctx, "copy", Runtime.Dict.from({"error_message":answer.error_message}));
				}
			}
			else if (msg.data.button_result == "cancel")
			{
				this.delete_dialog.update(ctx, "hide");
			}
		}
	},
	/* Open file */
	onOpenFile: async function(ctx, msg)
	{
		var stack_name = Runtime.rtl.get(ctx, msg.sender.params, "stack-name");
		var file_name = Runtime.rtl.get(ctx, msg.sender.params, "file-name");
		/* Call api */
		var answer = await Runtime.Web.RenderDriver.externalBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.YamlFiles","interface_name":"default","method_name":"openFile","data":Runtime.Dict.from({"stack_name":stack_name,"file_name":file_name})}));
		if (answer.isSuccess(ctx))
		{
			this.updateModel(ctx, "setIm", Runtime.Collection.from(["current_file"]), stack_name + Runtime.rtl.toStr("/") + Runtime.rtl.toStr(file_name));
			this.updateModel(ctx, "setIm", Runtime.Collection.from(["content"]), Runtime.rtl.get(ctx, answer.response, "content"));
		}
	},
	/* Save file */
	onSaveFile: async function(ctx, msg)
	{
		var model = this.model(ctx);
		var current_file = Runtime.rtl.get(ctx, model, "current_file");
		var arr = Runtime.rs.split(ctx, "/", current_file);
		var stack_name = Runtime.rtl.get(ctx, arr, 0);
		var file_name = Runtime.rtl.get(ctx, arr, 1);
		var content = Runtime.rtl.get(ctx, model, "content");
		this.dialog.update(ctx, "alert", "Process save file '" + Runtime.rtl.toStr(Runtime.rtl.get(ctx, model, "current_file")) + Runtime.rtl.toStr("'"));
		/* Call api */
		var answer = await Runtime.Web.RenderDriver.externalBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.YamlFiles","interface_name":"default","method_name":"saveFile","data":Runtime.Dict.from({"stack_name":stack_name,"file_name":file_name,"content":content})}));
		if (answer.isSuccess(ctx))
		{
			this.dialog.update(ctx, "alert", "File '" + Runtime.rtl.toStr(Runtime.rtl.get(ctx, model, "current_file")) + Runtime.rtl.toStr("' saved"));
		}
		else
		{
			this.dialog.update(ctx, "alert", "Error: " + Runtime.rtl.toStr(answer.error_message));
		}
	},
	/* Compose */
	onCompose: async function(ctx, msg)
	{
		var model = this.model(ctx);
		var current_file = Runtime.rtl.get(ctx, model, "current_file");
		var arr = Runtime.rs.split(ctx, "/", current_file);
		var stack_name = Runtime.rtl.get(ctx, arr, 0);
		var file_name = Runtime.rtl.get(ctx, arr, 1);
		this.dialog.update(ctx, "alert", "Process compose file '" + Runtime.rtl.toStr(Runtime.rtl.get(ctx, model, "current_file")) + Runtime.rtl.toStr("'.\n\nPlease wait."));
		/* Call api */
		var answer = await Runtime.Web.RenderDriver.externalBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.YamlFiles","interface_name":"default","method_name":"compose","data":Runtime.Dict.from({"stack_name":stack_name,"file_name":file_name})}));
		if (answer.isSuccess(ctx))
		{
			this.dialog.update(ctx, "alert", "Process compose file '" + Runtime.rtl.toStr(Runtime.rtl.get(ctx, model, "current_file")) + Runtime.rtl.toStr("'.\n\n") + Runtime.rtl.toStr(answer.success_message));
		}
		else
		{
			this.dialog.update(ctx, "alert", "Process compose file '" + Runtime.rtl.toStr(Runtime.rtl.get(ctx, model, "current_file")) + Runtime.rtl.toStr("'.\n\n") + Runtime.rtl.toStr("Error: ") + Runtime.rtl.toStr(answer.error_message));
		}
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Design.YamlFilesPage)
		{
		}
		Runtime.Web.CRUD.CrudPage.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.CRUD.CrudPage.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.CRUD.CrudPage.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Design.YamlFilesPage";
	},
});
Object.assign(Bayrell.CloudOS.Design.YamlFilesPage, Runtime.Web.CRUD.CrudPage);
Object.assign(Bayrell.CloudOS.Design.YamlFilesPage,
{
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		var __v0 = new Runtime.Monad(ctx, container);
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","title"]), "Yaml Files"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","layout_name"]), "admin"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_class"]), "Bayrell.CloudOS.Design.YamlFilesPage"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_model"]), new Runtime.Dict(ctx, Runtime.Dict.from({"stacks":Runtime.Collection.from([]),"current_file":"","content":"","dialog":new Runtime.Web.Dialog.DialogModel(ctx, Runtime.Dict.from({})),"create_dialog":new Runtime.Web.Dialog.DialogModel(ctx, Runtime.Dict.from({})),"edit_dialog":new Runtime.Web.Dialog.DialogModel(ctx, Runtime.Dict.from({})),"delete_dialog":new Runtime.Web.Dialog.DialogModel(ctx, Runtime.Dict.from({})),"create_stack_name":"","create_file_name":"","edit_file_name":"","current_dialog_file":""}))));
		__v0 = await __v0.callAsync(ctx, Runtime.lib.applyAsync(ctx, async (ctx, container) => 
		{
			/* Remote call */
			var answer = await container.externalBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.YamlFiles","interface_name":"default","method_name":"getFiles"}));
			if (!answer.isSuccess(ctx))
			{
				return Promise.resolve(container);
			}
			container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_model", "stacks"]), answer.response);
			return Promise.resolve(container);
		}));
		return Runtime.Collection.from([__v0.value(ctx)]);
	},
	css: function(ctx, vars)
	{
		return ".left-panel.h-0b09, .right-content.h-0b09{" + Runtime.rtl.toStr("display: inline-block;vertical-align: top;") + Runtime.rtl.toStr("}.left-panel.h-0b09{") + Runtime.rtl.toStr("width: 200px;padding-right: 10px;") + Runtime.rtl.toStr("}.right-content.h-0b09{") + Runtime.rtl.toStr("width: calc(100% - 200px);") + Runtime.rtl.toStr("}.items.h-0b09{") + Runtime.rtl.toStr("padding-top: 10px;") + Runtime.rtl.toStr("}.item.h-0b09{") + Runtime.rtl.toStr("padding-bottom: 10px;") + Runtime.rtl.toStr("}.item.h-0b09:last-child{") + Runtime.rtl.toStr("padding-bottom: 0px;") + Runtime.rtl.toStr("}.label.h-0b09{") + Runtime.rtl.toStr("font-weight: bold;padding-bottom: 10px;") + Runtime.rtl.toStr("}.files.h-0b09{") + Runtime.rtl.toStr("padding-left: 10px;") + Runtime.rtl.toStr("}.file.h-0b09{") + Runtime.rtl.toStr("padding: 5px;cursor: pointer;user-select: none;") + Runtime.rtl.toStr("}.file.h-0b09:hover{") + Runtime.rtl.toStr("background-color: #eee;") + Runtime.rtl.toStr("}.file.h-0b09.active{") + Runtime.rtl.toStr("background-color: " + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "primary", "color"])) + Runtime.rtl.toStr(";color: ") + Runtime.rtl.toStr(Runtime.rtl.attr(ctx, vars, ["colors", "primary", "text"])) + Runtime.rtl.toStr(";")) + Runtime.rtl.toStr("}.file-name.h-0b09, .file-icons.h-0b09{") + Runtime.rtl.toStr("display: inline-block;vertical-align: top;") + Runtime.rtl.toStr("}.file-name.h-0b09{") + Runtime.rtl.toStr("width: calc(100% - 40px);") + Runtime.rtl.toStr("}.file-icons.h-0b09{") + Runtime.rtl.toStr("width: 40px;") + Runtime.rtl.toStr("}.file-icons.h-0b09 .far.h-0b09{") + Runtime.rtl.toStr("display: none;margin-left: 5px;") + Runtime.rtl.toStr("}.file.h-0b09:hover .file-icons.h-0b09 .far.h-0b09, .file.h-0b09.active .file-icons.h-0b09 .far.h-0b09{") + Runtime.rtl.toStr("display: inline-block;") + Runtime.rtl.toStr("}.right-content.h-0b09 .input.h-106c{") + Runtime.rtl.toStr("width: calc(100% - 20px);height: calc(100% - 20px);outline: 0;") + Runtime.rtl.toStr("}.content_file_name.h-0b09{") + Runtime.rtl.toStr("padding-bottom: 5px;min-height: 35px;") + Runtime.rtl.toStr("}.content_file_name.h-0b09 .button.h-de49{") + Runtime.rtl.toStr("margin-left: 10px;") + Runtime.rtl.toStr("}.form-row.h-0b09{") + Runtime.rtl.toStr("padding-bottom: 10px;") + Runtime.rtl.toStr("}.form-row.h-0b09:last-child{") + Runtime.rtl.toStr("padding-bottom: 0px;") + Runtime.rtl.toStr("}.form-row.h-0b09 label{") + Runtime.rtl.toStr("display: block;padding-bottom: 5px;font-weight: bold;") + Runtime.rtl.toStr("}");
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Element 'div.left-panel' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["left-panel", this.getCssHash(ctx)].join(" "),"@elem_name":"left-panel"}});
			
			/* Component 'Button' */
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"@event:Runtime.Web.Events.MouseClickEvent":["Bayrell.CloudOS.Design.YamlFilesPage","onAddFile"]}, "layout": layout, "content": (__control) =>
			{
				var __vnull = null;
				var __control_childs = [];
				
				/* Text */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Add file"});
				
				return __control_childs;
			}});
			
			/* Element 'div.items' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["items", this.getCssHash(ctx)].join(" "),"@elem_name":"items"}});
			
			var __v2 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, model, "stacks"));
			__v2 = __v2.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
			var stacks = __v2.value(ctx);
			
			for (var i = 0;i < stacks.count(ctx);i++)
			{
				var stack = Runtime.rtl.get(ctx, stacks, i);
				
				/* Element 'div.item' */
				var __v2; var __v2_childs = [];
				[__v2, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "element", {"name": "div","attrs": {"class":["item", this.getCssHash(ctx)].join(" "),"@elem_name":"item"}});
				
				/* Element 'div.label' */
				var __v3; var __v3_childs = [];
				[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "div","attrs": {"class":["label", this.getCssHash(ctx)].join(" "),"@elem_name":"label"}});
				
				/* Text */
				[__vnull, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "text", {"content": Runtime.rtl.get(ctx, stack, "name")});
				RenderDriver.p(__v3, __v3_childs);
				
				var __v3 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, stack, "files"));
				__v3 = __v3.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Collection", Runtime.Collection.from([])));
				var files = __v3.value(ctx);
				
				/* Element 'div.files' */
				var __v3; var __v3_childs = [];
				[__v3, __v2_childs] = RenderDriver.e(__v2, __v2_childs, "element", {"name": "div","attrs": {"class":["files", this.getCssHash(ctx)].join(" "),"@elem_name":"files"}});
				
				for (var j = 0;j < files.count(ctx);j++)
				{
					var checked = "";
					
					if (this.isChecked(ctx, Runtime.rtl.get(ctx, stack, "name"), Runtime.rtl.get(ctx, files, j), Runtime.rtl.get(ctx, model, "current_file")))
					{
						checked = "active";
					}
					
					var attrs = Runtime.Dict.from({"stack-name":Runtime.rtl.get(ctx, stack, "name"),"file-name":Runtime.rtl.get(ctx, files, j)});
					
					/* Element 'div.file' */
					var __v4; var __v4_childs = [];
					[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "div","attrs": this.mergeAttrs(ctx, {"@event:Runtime.Web.Events.MouseClickEvent":["Bayrell.CloudOS.Design.YamlFilesPage","onOpenFile"],"class":["file", checked, this.getCssHash(ctx)].join(" "),"@elem_name":"file"},attrs)});
					
					/* Element 'span.file-name' */
					var __v5; var __v5_childs = [];
					[__v5, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "element", {"name": "span","attrs": {"class":["file-name", this.getCssHash(ctx)].join(" "),"@elem_name":"file-name"}});
					
					/* Text */
					[__vnull, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "text", {"content": Runtime.rtl.get(ctx, files, j)});
					RenderDriver.p(__v5, __v5_childs);
					
					/* Element 'span.file-icons' */
					var __v5; var __v5_childs = [];
					[__v5, __v4_childs] = RenderDriver.e(__v4, __v4_childs, "element", {"name": "span","attrs": {"class":["file-icons", this.getCssHash(ctx)].join(" "),"@elem_name":"file-icons"}});
					
					[__vnull, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "i","attrs": this.mergeAttrs(ctx, {"@event:Runtime.Web.Events.MouseClickEvent":["Bayrell.CloudOS.Design.YamlFilesPage","onEditFile"],"class":["far fa-edit", this.getCssHash(ctx)].join(" "),"@elem_name":"far"},attrs)});
					
					[__vnull, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "i","attrs": this.mergeAttrs(ctx, {"@event:Runtime.Web.Events.MouseClickEvent":["Bayrell.CloudOS.Design.YamlFilesPage","onDeleteFile"],"class":["far fa-trash-alt", this.getCssHash(ctx)].join(" "),"@elem_name":"far"},attrs)});
					RenderDriver.p(__v5, __v5_childs);
					RenderDriver.p(__v4, __v4_childs);
				}
				RenderDriver.p(__v3, __v3_childs);
				RenderDriver.p(__v2, __v2_childs);
			}
			RenderDriver.p(__v1, __v1_childs);
			RenderDriver.p(__v0, __v0_childs);
			
			/* Element 'div.right-content' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["right-content", this.getCssHash(ctx)].join(" "),"@elem_name":"right-content"}});
			
			/* Element 'div.content_file_name' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["content_file_name", this.getCssHash(ctx)].join(" "),"@elem_name":"content_file_name"}});
			
			/* Text */
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": Runtime.rtl.get(ctx, model, "current_file")});
			
			if (Runtime.rtl.get(ctx, model, "current_file") != "")
			{
				/* Component 'Button' */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"@event:Runtime.Web.Events.MouseClickEvent":["Bayrell.CloudOS.Design.YamlFilesPage","onSaveFile"]}, "layout": layout, "content": (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Text */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Save"});
					
					return __control_childs;
				}});
				
				if (this.canCompose(ctx, Runtime.rtl.get(ctx, model, "current_file")))
				{
					/* Component 'Button' */
					[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": "Runtime.Web.Input.Button","attrs": {"@event:Runtime.Web.Events.MouseClickEvent":["Bayrell.CloudOS.Design.YamlFilesPage","onCompose"]}, "layout": layout, "content": (__control) =>
					{
						var __vnull = null;
						var __control_childs = [];
						
						/* Text */
						[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Compose"});
						
						return __control_childs;
					}});
				}
			}
			RenderDriver.p(__v1, __v1_childs);
			
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Input.TextArea","attrs": {"@name":["Bayrell.CloudOS.Design.YamlFilesPage","content"]}, "layout": layout});
			RenderDriver.p(__v0, __v0_childs);
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Dialog.Dialog","attrs": {"@name":["Bayrell.CloudOS.Design.YamlFilesPage","dialog"]}, "layout": layout});
			
			/* Component 'Dialog' */
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Dialog.Dialog","attrs": {"@name":["Bayrell.CloudOS.Design.YamlFilesPage","create_dialog"],"auto_hide":false,"style":Runtime.Web.Dialog.DialogModel.STYLE_CONTENT,"@event:Runtime.Web.Dialog.DialogEvent":["Bayrell.CloudOS.Design.YamlFilesPage","onDialogEvent"]}, "layout": layout, "content": (__control) =>
			{
				var __vnull = null;
				var __control_childs = [];
				
				/* Element 'div.form-row' */
				var __v0; var __v0_childs = [];
				[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["form-row", this.getCssHash(ctx)].join(" "),"@elem_name":"form-row"}});
				
				/* Element 'label' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "label","attrs": {}});
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": "Stack name:"});
				RenderDriver.p(__v1, __v1_childs);
				
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Input.Input","attrs": {"@bind":["Bayrell.CloudOS.Design.YamlFilesPage","create_stack_name"]}, "layout": layout});
				RenderDriver.p(__v0, __v0_childs);
				
				/* Element 'div.form-row' */
				var __v0; var __v0_childs = [];
				[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["form-row", this.getCssHash(ctx)].join(" "),"@elem_name":"form-row"}});
				
				/* Element 'label' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "label","attrs": {}});
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": "File name:"});
				RenderDriver.p(__v1, __v1_childs);
				
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Input.Input","attrs": {"@bind":["Bayrell.CloudOS.Design.YamlFilesPage","create_file_name"]}, "layout": layout});
				RenderDriver.p(__v0, __v0_childs);
				
				return __control_childs;
			}});
			
			/* Component 'Dialog' */
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Dialog.Dialog","attrs": {"@name":["Bayrell.CloudOS.Design.YamlFilesPage","edit_dialog"],"auto_hide":false,"style":Runtime.Web.Dialog.DialogModel.STYLE_CONTENT,"@event:Runtime.Web.Dialog.DialogEvent":["Bayrell.CloudOS.Design.YamlFilesPage","onDialogEvent"]}, "layout": layout, "content": (__control) =>
			{
				var __vnull = null;
				var __control_childs = [];
				
				/* Element 'div.form-row' */
				var __v0; var __v0_childs = [];
				[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["form-row", this.getCssHash(ctx)].join(" "),"@elem_name":"form-row"}});
				
				/* Element 'label' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "label","attrs": {}});
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": "File name:"});
				RenderDriver.p(__v1, __v1_childs);
				
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Input.Input","attrs": {"@bind":["Bayrell.CloudOS.Design.YamlFilesPage","edit_file_name"]}, "layout": layout});
				RenderDriver.p(__v0, __v0_childs);
				
				return __control_childs;
			}});
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Dialog.Dialog","attrs": {"@name":["Bayrell.CloudOS.Design.YamlFilesPage","delete_dialog"],"auto_hide":false,"@event:Runtime.Web.Dialog.DialogEvent":["Bayrell.CloudOS.Design.YamlFilesPage","onDialogEvent"]}, "layout": layout});
			
			return __control_childs;
		};
	},
	/**
 * Can compose
 */
	canCompose: function(ctx, file_name)
	{
		return Runtime.rs.extname(ctx, file_name) == "yaml";
	},
	/**
 * Returns true if checked
 */
	isChecked: function(ctx, stack_name, file_name, current_file)
	{
		return current_file == stack_name + Runtime.rtl.toStr("/") + Runtime.rtl.toStr(file_name);
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage","Runtime.Web.Dialog.Dialog","Runtime.Web.Input.Button","Runtime.Web.Input.Input","Runtime.Web.Input.TextArea"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Design";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Design.YamlFilesPage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.CRUD.CrudPage";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.CloudOS.Design.YamlFilesPage",
			"name": "Bayrell.CloudOS.Design.YamlFilesPage",
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
				"class_name": "Bayrell.CloudOS.Design.YamlFilesPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/admin/yaml_files/","name":"app.admin.yaml_files"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Design.YamlFilesPage);
window["Bayrell.CloudOS.Design.YamlFilesPage"] = Bayrell.CloudOS.Design.YamlFilesPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Design.YamlFilesPage;
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
if (typeof Bayrell.CloudOS.Installer == 'undefined') Bayrell.CloudOS.Installer = {};
Bayrell.CloudOS.Installer.InstallerPage = function(ctx)
{
	Runtime.Web.CRUD.CrudPage.apply(this, arguments);
};
Bayrell.CloudOS.Installer.InstallerPage.prototype = Object.create(Runtime.Web.CRUD.CrudPage.prototype);
Bayrell.CloudOS.Installer.InstallerPage.prototype.constructor = Bayrell.CloudOS.Installer.InstallerPage;
Object.assign(Bayrell.CloudOS.Installer.InstallerPage.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.CloudOS.Installer.InstallerPage)
		{
		}
		Runtime.Web.CRUD.CrudPage.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.Web.CRUD.CrudPage.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Web.CRUD.CrudPage.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.CloudOS.Installer.InstallerPage";
	},
});
Object.assign(Bayrell.CloudOS.Installer.InstallerPage, Runtime.Web.CRUD.CrudPage);
Object.assign(Bayrell.CloudOS.Installer.InstallerPage,
{
	/**
 * Route Action
 * @return RenderContainer
 */
	actionIndex: async function(ctx, container)
	{
		var __v0 = new Runtime.Monad(ctx, container);
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","title"]), "Installer"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","layout_name"]), "admin"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_class"]), "Bayrell.CloudOS.Installer.InstallerPage"));
		__v0 = __v0.call(ctx, Runtime.lib.setAttr(ctx, Runtime.Collection.from(["layout","page_model"]), new Runtime.Dict(ctx, Runtime.Dict.from({}))));
		return Runtime.Collection.from([__v0.value(ctx)]);
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Text */
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Installer"});
			
			return __control_childs;
		};
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.CRUD.CrudPage"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.CloudOS.Installer";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.CloudOS.Installer.InstallerPage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.CRUD.CrudPage";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.CloudOS.Installer.InstallerPage",
			"name": "Bayrell.CloudOS.Installer.InstallerPage",
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
				"class_name": "Bayrell.CloudOS.Installer.InstallerPage",
				"name": "actionIndex",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/admin/installer/","name":"app.admin.installer"})),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.Installer.InstallerPage);
window["Bayrell.CloudOS.Installer.InstallerPage"] = Bayrell.CloudOS.Installer.InstallerPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.Installer.InstallerPage;
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
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "form","attrs": {"id":"adminer_form","method":"post","action":layout.route_prefix + Runtime.rtl.toStr("/admin/database/4.7.6/")}});
			
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
		return Runtime.Dict.from({"Runtime":">=0.3","Runtime.Web":"*","Runtime.Web.Auth":"*","Runtime.Web.CRUD":"*"});
	},
	/**
	 * Returns enities
	 */
	entities: function(ctx)
	{
		return Runtime.Collection.from([new Runtime.Core.Driver(ctx, Runtime.Dict.from({"name":"RootController","value":"Runtime.Web.RenderController","params":Runtime.Dict.from({"selector":"#root","main_controller":true,"window":"RootController"})})),new Runtime.Core.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderDriver.LAYOUT_CHAIN,"pos":10,"value":"Bayrell.CloudOS.Routes::layoutChain"})),new Runtime.Core.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderDriver.RENDER_CHAIN,"value":"Bayrell.CloudOS.Routes::Page404","pos":Runtime.Web.RenderDriver.RENDER_CHAIN_CALL_PAGE_NOT_FOUND,"is_async":true})),new Runtime.Core.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderDriver.TITLE_CHAIN,"value":"Bayrell.CloudOS.Routes::titleChain"})),new Runtime.Core.Entity(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Routes"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.MainPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Design.DomainsPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Design.LayersPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Design.NginxFilesPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Design.RoutesPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Design.ServicePage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Design.SpacesPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Design.UsersPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Design.YamlFilesPage"})),new Runtime.Web.RouteList(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Installer.InstallerPage"}))]);
	},
	/**
	 * Returns context settings
	 * @return Dict<string>
	 */
	appSettings: function(ctx, env)
	{
		return Runtime.Dict.from({"config":Runtime.Dict.from({"Runtime.Web":Runtime.Dict.from({"f_inc":"1"})})});
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