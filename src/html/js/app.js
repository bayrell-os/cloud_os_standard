"use strict;"
/*
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
		return "\n*{box-sizing: border-box;}body{margin:0;padding:0;}\na { text-decoration: inherit; color: #0000d0; cursor: pointer; }\na:hover, a:visited:hover { text-decoration: underline; color: red; }\na:visited { text-decoration: inherit; color: #0000d0; }\na.link { text-decoration: none; color: #0000d0; cursor: pointer; }\na.link:hover, a.link:visited:hover { text-decoration: underline; color: red; }\na.link:visited { text-decoration: none; color: #0000d0; }\nbody, html{\n\tfont-family: 'Ubuntu', sans-serif;\n\tfont-size: 14px;\n\twidth: 100%;\n\theight: 100vh;\n\tpadding: 0;\n\tmargin: 0;\n}\ntd{\n\tfont-family: 'Ubuntu', sans-serif;\n\tfont-size: 14px;\n}\nspan.lpad5{\n\tdisplay: inline-block;\n\tpadding-right: 5px;\n}\n.layout.h-d6df{\n\theight: 100%;\n}\n.layout_wrap.h-d6df{\n\tposition: relative;\n\theight: 100vh;\n\tpadding-bottom: 20px;\n\tdisplay: flex;\n\talign-items: stretch;\n}\n.layout_footer.h-d6df{\n\tposition: relative;\n\tfont-size: 12px;\n\theight: 24px;\n\tmargin-top: -24px;\n}\n.layout_footer.h-d6df .b_in{\n}\n.layout_menu_wrap.h-d6df{\n\tposition: relative;\n\twidth: 200px;\n}\n.layout_content_wrap.h-d6df{\n\tposition: relative;\n\twidth: calc(100% - 200px);\n}\n.layout_site_name.h-d6df, .layout_title_wrap.h-d6df{\n\tfont-size: 16px;\n\theight: 40px;\n}\n.layout_site_name.h-d6df, .layout_title_wrap.h-d6df, .layout_page.h-d6df, .layout_content.h-d6df{\n\tpadding: 10px;\n}\n.layout_site_name.h-d6df{\n\tborder-right: 1px #ccc solid;\n}\n.layout_title_wrap.h-d6df{\n\tdisplay: flex;\n\talign-items: stretch;\n}\n.layout_title.h-d6df{\n\twidth: 350px;\n}\n.layout_top_buttons.h-d6df{\n\twidth: calc(100% - 350px);\n\tpadding-left: 10px;\n}\n.layout_content.h-d6df{\n\tposition: relative;\n\theight: calc(100% - 45px);\n\tpadding-bottom: 0;\n\tpadding-right: 0;\n}\n.layout_menu_label.h-d6df{\n\tfont-size: 14px;\n\tfont-weight: bold;\n\tpadding: 10px;\n}\n.layout_menu.h-d6df{\n\tposition: relative;\n\theight: calc(100% - 40px);\n\toverflow-y: auto;\n\tborder-right: 1px #ccc solid;\n}\n.layout_menu_items.h-d6df{}\n.layout_menu_items.h-d6df ul, .layout_menu_items.h-d6df li{\n\tpadding: 0; margin: 0;\n\tlist-style: none;\n}\n.layout_menu_items.h-d6df ul{}\n.layout_menu_items.h-d6df li{\n\tbackground-color: white;\n}\n.layout_menu_items.h-d6df li a{\n\tdisplay: block;\n\tpadding: 10px 15px;\n\tborder-bottom: 1px solid #e7e7e7;\n}\n.layout_menu_items.h-d6df li.active > a, .layout_menu_items.h-d6df li.active > a:hover{\n\tbackground-color: #337ab7;\n\tborder-color: #337ab7;\n\tcolor: white;\n}\n.layout_menu_logout.h-d6df{\n\ttext-align: center;\n\tpadding-top: 100px;\n}\n.layout_menu_logout.h-d6df > div{\n\tpadding-top: 5px;\n}\n";
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
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, model.route.name, "app.dashboard.main")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Main")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, model.route.name, "app.dashboard.nodes")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
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
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, model.route.name, "app.services")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/services/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Services")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, model.route.name, "app.yaml.index")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/yaml/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Yaml")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, model.route.name, "app.yaml.files")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/yaml/files/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Yaml Files")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, model.route.name, "app.nginx")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/nginx/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Nginx")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, model.route.name, "app.cli")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
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
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {"class":[((Runtime.rs.start(ctx, model.route.name, "app.users")) ? ("active") : ("")), this.getCssHash(ctx)].join(" ")}});
			
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
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/adminer/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
			/* Text */
			[__vnull, __v7_childs] = RenderDriver.e(__v7, __v7_childs, "text", {"content": ctx.translate(ctx, "Bayrell.CloudOS", "Adminer")});
			RenderDriver.p(__v7, __v7_childs);
			RenderDriver.p(__v6, __v6_childs);
			
			/* Element 'li' */
			var __v6; var __v6_childs = [];
			[__v6, __v5_childs] = RenderDriver.e(__v5, __v5_childs, "element", {"name": "li","attrs": {}});
			
			/* Element 'a.nolink' */
			var __v7; var __v7_childs = [];
			[__v7, __v6_childs] = RenderDriver.e(__v6, __v6_childs, "element", {"name": "a","attrs": {"href":"/adminer/info/","class":["nolink", this.getCssHash(ctx)].join(" "),"@elem_name":"nolink"}});
			
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
	 * Route Action
	 * @return RenderContainer
	 */
	UsersPage: async function(ctx, container)
	{
		/* Create model */
		var page_model = new Bayrell.CloudOS.User.UsersPageModel(ctx, Runtime.Dict.from({"crud":new Runtime.Web.CRUD.CrudPageModel(ctx, Runtime.Dict.from({}))}));
		/* Remote call */
		var search_params = Runtime.Web.RenderDriver.getCrudSearchParams(ctx, container.request);
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":"Bayrell.CloudOS.Users","interface_name":"core.crud","method_name":"search","data":search_params}), container);
		/* Answer */
		if (answer.isSuccess(ctx))
		{
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "rows"]), Runtime.rtl.get(ctx, answer.response, "items"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "page"]), Runtime.rtl.get(ctx, answer.response, "page"));
			page_model = Runtime.rtl.setAttr(ctx, page_model, Runtime.Collection.from(["crud", "table", "pages"]), Runtime.rtl.get(ctx, answer.response, "pages"));
		}
		/* Set title */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "title"]), "Users page");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "layout_name"]), "default");
		/* Set model */
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["layout", "page_class"]), "Bayrell.CloudOS.User.UsersPage");
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
			"UsersPage",
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
		if (field_name == "UsersPage")
		{
			var Collection = Runtime.Collection;
			var Dict = Runtime.Dict;
			var IntrospectionInfo = Runtime.IntrospectionInfo;
			return new IntrospectionInfo(ctx, {
				"kind": IntrospectionInfo.ITEM_METHOD,
				"class_name": "Bayrell.CloudOS.Routes",
				"name": "UsersPage",
				"annotations": Collection.from([
					new Runtime.Web.Route(ctx, Runtime.Dict.from({"uri":"/users/","name":"site:users"})),
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
		return "\n.content.h-e9f6{\n\theight: 100%;\n\tdisplay: flex;\n\talign-items: stretch;\n}\n.left.h-e9f6, .right.h-e9f6{\n\twidth: 50%;\n\tposition: relative;\n\toverflow-y: auto;\n}\n.left.h-e9f6{\n\tpadding-right: 10px;\n}\n.right.h-e9f6{\n\tpadding-left: 10px;\n\tpadding-right: 10px;\n}\n.services.h-e9f6{\n\tdisplay: table;\n\tborder-left: 1px #ccc solid;\n\tborder-top: 1px #ccc solid;\n\twidth: 100%;\n}\n.service.h-e9f6{\n\tdisplay: table-row;\n\tcursor: pointer;\n}\n.service.h-e9f6:hover{\n\tbackground: #eee;\n}\n.service.h-e9f6.active{\n\tbackground-color: #337ab7;\n\tborder-color: #337ab7;\n\tcolor: white;\n}\n.service_item.h-e9f6{\n\tdisplay: table-cell;\n\tpadding: 5px;\n\tborder-bottom: 1px #ccc solid;\n\tborder-right: 1px #ccc solid;\n}\n.label.h-e9f6{\n\tfont-weight: bold;\n}\n.info_item.h-e9f6{\n\toverflow-wrap: anywhere;\n\tpadding-bottom: 10px;\n}\n.info_item.h-e9f6:last-child{\n\tpadding-bottom: 0px;\n}\n.info_actions.h-e9f6 > .label{\n\tpadding-bottom: 5px;\n}\n.info_item_action.h-e9f6{\n\tpadding-bottom: 5px;\n}\n.info_item_action.h-e9f6:last-child{\n\tpadding-bottom: 0px;\n}\n.info_item_action.h-e9f6.state-ready .state{\n\tcolor: #00aa00;\n\tfont-weight: bold;\n}\n.info_item_action.h-e9f6.state-failed .state, .info_item_action.h-e9f6.state-rejected .state{\n\tcolor: red;\n\tfont-weight: bold;\n}\n.info_item_action_error.h-e9f6{\n\tcolor: red;\n}\n";
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
		return "\n";
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var crud_settings = Runtime.Dict.from({"name":Runtime.Dict.from({"api_name":"name","label":"Name","class_name":"Runtime.Web.Input.Input","class_name_table":"Runtime.Web.Input.Label"}),"banned":Runtime.Dict.from({"api_name":"banned","label":"Banned","class_name":"Runtime.Web.Input.Select","class_name_table":"Runtime.Web.Input.SelectText","class_settings":Runtime.Dict.from({"select_value":false,"options":Runtime.Collection.from([Runtime.Dict.from({"id":0,"value":"No"}),Runtime.Dict.from({"id":1,"value":"Yes"})])})})});
			
			var form_fields = Runtime.Collection.from(["name","banned"]);
			
			var table_fields = Runtime.Collection.from(["number","name","banned","edit"]);
			
			[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.CRUD.CrudPage","attrs": {"@name":["Bayrell.CloudOS.User.UsersPage","crud"],"object_name":"Bayrell.CloudOS.Users","crud_settings":crud_settings,"form_fields":form_fields,"table_fields":table_fields}, "layout": layout});
			
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
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.CloudOS.User.UsersPage);
window["Bayrell.CloudOS.User.UsersPage"] = Bayrell.CloudOS.User.UsersPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.CloudOS.User.UsersPage;
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
		return Runtime.Collection.from([new Runtime.Core.Driver(ctx, Runtime.Dict.from({"name":"root-controller","value":"Runtime.Web.RenderController","params":Runtime.Dict.from({"selector":"#root","main_controller":true,"window":"RootController"})})),new Runtime.Core.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderDriver.LAYOUT_CHAIN,"pos":10,"value":"Bayrell.CloudOS.Routes::layoutChain"})),new Runtime.Core.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderDriver.RENDER_CHAIN,"value":"Bayrell.CloudOS.Routes::Page404","pos":Runtime.Web.RenderDriver.RENDER_CHAIN_CALL_PAGE_NOT_FOUND,"is_async":true})),new Runtime.Core.LambdaChain(ctx, Runtime.Dict.from({"name":Runtime.Web.RenderDriver.RENDER_CHAIN,"value":"Bayrell.CloudOS.Routes::renderChainRouteAfter","pos":Runtime.Web.RenderDriver.RENDER_CHAIN_CALL_ROUTE_AFTER,"is_async":true})),new Runtime.Core.Entity(ctx, Runtime.Dict.from({"name":"Bayrell.CloudOS.Routes"}))]);
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