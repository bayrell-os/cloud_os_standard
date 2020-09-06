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
if (typeof Runtime.Web.Button == 'undefined') Runtime.Web.Button = {};
Runtime.Web.Button.Button = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Button.Button.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Button.Button.prototype.constructor = Runtime.Web.Button.Button;
Object.assign(Runtime.Web.Button.Button.prototype,
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
		if (o instanceof Runtime.Web.Button.Button)
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
		return "Runtime.Web.Button.Button";
	},
});
Object.assign(Runtime.Web.Button.Button, Runtime.Web.Component);
Object.assign(Runtime.Web.Button.Button,
{
	css: function(ctx, vars)
	{
		return "\n.button.h-2911{\n\tpadding: 6px 12px;\n\tcursor: pointer;\n}\n.button.h-2911.small{\n\tpadding: 3px 6px;\n}\n";
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			/* Element 'button.button' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "button","attrs": {"@tag":Runtime.rtl.get(ctx, params, "@tag"),"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.Button.Button","onClick"],"class":["button", Runtime.rtl.get(ctx, params, "type"), this.getCssHash(ctx)].join(" "),"@elem_name":"button"}});
			
			/* Text */
			[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": content});
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Button";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Button.Button";
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
			"class_name": "Runtime.Web.Button.Button",
			"name": "Runtime.Web.Button.Button",
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
Runtime.rtl.defClass(Runtime.Web.Button.Button);
window["Runtime.Web.Button.Button"] = Runtime.Web.Button.Button;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Button.Button;
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
if (typeof Runtime.Web.Button == 'undefined') Runtime.Web.Button = {};
Runtime.Web.Button.ModuleDescription = function(ctx)
{
};
Object.assign(Runtime.Web.Button.ModuleDescription.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Button.ModuleDescription)
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
		return "Runtime.Web.Button.ModuleDescription";
	},
});
Object.assign(Runtime.Web.Button.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function(ctx)
	{
		return "Runtime.Web.Button";
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
		return "Runtime.Web.Button";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Button.ModuleDescription";
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
			"class_name": "Runtime.Web.Button.ModuleDescription",
			"name": "Runtime.Web.Button.ModuleDescription",
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
Runtime.rtl.defClass(Runtime.Web.Button.ModuleDescription);
window["Runtime.Web.Button.ModuleDescription"] = Runtime.Web.Button.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Button.ModuleDescription;
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
		return "\n.dialog_box.h-9e54, .dialog_shadow.h-9e54{\n\tposition: fixed;\n\ttop: 0; left: 0;\n\twidth: 100%; height: 100%;\n\tz-index: 1001;\n}\n.dialog_box.h-9e54{\n\toverflow: auto;\n\toverflow-y: scroll;\n\tdisplay: none;\n}\n.dialog_box.h-9e54.open{\n\tdisplay: block;\n}\n.dialog_shadow.h-9e54{\n\tbackground-color: #000;\n\topacity: 0.2;\n\toverflow: hidden;\n}\n.dialog_wrap.h-9e54{\n\twidth: 100%;\n\tmin-height: 100%;\n}\n.dialog_wrap.h-9e54 > tr > td{\n\tpadding: 20px;\n}\n.dialog.h-9e54{\n\tposition: relative;\n\tpadding: 20px;\n\tbackground-color: white;\n\tmax-width: 350px;\n\tmargin: 0 auto;\n\twidth: auto;\n\tz-index: 1002;\n\tbox-shadow: 2px 4px 10px 0px rgba(0,0,0,0.5)\n}\n.dialog_title.h-9e54, .dialog_text.h-9e54, .dialog_promt.h-9e54{\n\ttext-align: center;\n\tpadding-bottom: 12px;\n}\n.dialog_title.h-9e54{\n\tfont-weight: bold;\n}\n.dialog_promt_input.h-9e54{\n\tpadding: 6px 12px;\n\twidth: 100%;\n}\n.dialog_buttons.h-9e54{\n\tpadding-top: 12px;\n\ttext-align: center;\n}\n.dialog_buttons.h-9e54 .button.h-2911{\n\tmargin: 0 5px;\n}\n.dialog_row.h-9e54{\n\tpadding-bottom: 6px;\n}\n.dialog_row.h-9e54:last-child{\n\tpadding-bottom: 0px;\n}\n.dialog_result.h-9e54{\n\ttext-align: center;\n\tpadding-top: 12px;\n}\n.dialog_result.h-9e54.success{\n\tcolor: green;\n}\n.dialog_result.h-9e54.error{\n\tcolor: red;\n}\n";
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
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
			[__v4, __v3_childs] = RenderDriver.e(__v3, __v3_childs, "element", {"name": "div","attrs": {"class":["dialog", this.getCssHash(ctx)].join(" "),"@elem_name":"dialog"}});
			
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
			
			var show_buttons = (params != null) ? (params.get(ctx, "show_buttons", true)) : (true);
			
			if (show_buttons)
			{
				/* Element 'div.dialog_buttons' */
				var __v0; var __v0_childs = [];
				[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["dialog_buttons", this.getCssHash(ctx)].join(" "),"@elem_name":"dialog_buttons"}});
				
				/* Component 'Button' */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Button.Button","attrs": {"data-action":"ok","@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.Dialog.Dialog","onButtonClick"]}, "layout": layout, "content": (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Text */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "OK"});
					
					return __control_childs;
				}});
				
				/* Component 'Button' */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Button.Button","attrs": {"data-action":"cancel","@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.Dialog.Dialog","onButtonClick"]}, "layout": layout, "content": (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Text */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Cancel"});
					
					return __control_childs;
				}});
				RenderDriver.p(__v0, __v0_childs);
			}
			
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
		return Runtime.Collection.from(["Runtime.Web.Button.Button"]);
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
if (typeof Runtime.Web.Form == 'undefined') Runtime.Web.Form = {};
Runtime.Web.Form.Form = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Form.Form.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Form.Form.prototype.constructor = Runtime.Web.Form.Form;
Object.assign(Runtime.Web.Form.Form.prototype,
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
		var event = new Runtime.Web.Form.FormEvent(ctx, Runtime.Dict.from({"event":Runtime.Web.Form.FormEvent.ACTION_CHANGE,"item":model.item,"field_name":field_name,"old_value":Runtime.rtl.attr(ctx, model, model_path, null),"value":value}));
		this.update(ctx, "setAttr", model_path, value);
		await this.signal(ctx, event);
	},
	/**
 * On mouse click
 */
	onButtonClick: async function(ctx, msg)
	{
		var model = this.model(ctx);
		var event = new Runtime.Web.Form.FormEvent(ctx, Runtime.Dict.from({"item":model.item}));
		var data_action = msg.sender.params.get(ctx, "data-action");
		if (data_action == "create")
		{
			event = Runtime.rtl.setAttr(ctx, event, Runtime.Collection.from(["event"]), Runtime.Web.Form.FormEvent.ACTION_CREATE);
			await this.signal(ctx, event);
		}
		else if (data_action == "update")
		{
			event = Runtime.rtl.setAttr(ctx, event, Runtime.Collection.from(["event"]), Runtime.Web.Form.FormEvent.ACTION_UPDATE);
			await this.signal(ctx, event);
		}
		else if (data_action == "cancel")
		{
			event = Runtime.rtl.setAttr(ctx, event, Runtime.Collection.from(["event"]), Runtime.Web.Form.FormEvent.ACTION_CANCEL);
			await this.signal(ctx, event);
		}
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Form.Form)
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
		return "Runtime.Web.Form.Form";
	},
});
Object.assign(Runtime.Web.Form.Form, Runtime.Web.Component);
Object.assign(Runtime.Web.Form.Form,
{
	css: function(ctx, vars)
	{
		return "\n.form.h-5a52{\n}\n.form_row.h-5a52{\n\tpadding-bottom: 15px;\n}\n.form_row.h-5a52:last-child{\n\tpadding-bottom: 0px;\n}\n.form_label.h-5a52{\n\tfont-weight: bold;\n\tpadding-bottom: 5px;\n}\n.form_value.h-5a52{}\n.form_value.h-5a52 input, .form_value.h-5a52 textarea, .form_value.h-5a52 select{\n\twidth: 100%;\n\tpadding: 5px 10px;\n}\n.form_value.h-5a52 textarea{\n\theight: 400px;\n}\n.form_buttons.h-5a52{\n\ttext-align: center;\n}\n.form_buttons.h-5a52 .button.h-2911{\n\tmargin-left: 10px;\n\tmargin-right: 10px;\n}\n.form_error.h-5a52{\n\ttext-align: center;\n\tpadding-top: 5px;\n\tcolor: red;\n}\n.form_result.h-5a52{\n\tpadding-top: 10px;\n\ttext-align: center;\n}\n.form_result.h-5a52.success{\n\tcolor: green;\n}\n.form_result.h-5a52.error{\n\tcolor: red;\n}\n";
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
			
			var fields = Runtime.rtl.get(ctx, params, "fields");
			
			for (var i = 0;i < fields.count(ctx);i++)
			{
				var field_name = Runtime.rtl.get(ctx, fields, i);
				
				/* Text */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": this.renderRow(ctx, layout, model, params, field_name)});
			}
			
			return __control_childs;
		};
	},
	renderRow: function(ctx, layout, model, params, field_name)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var field = Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, params, "struct"), field_name);
			
			if (field != null)
			{
				var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, field, "class_name"));
				__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "string", ""));
				var class_name = __v0.value(ctx);
				
				var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, field, "class_name_form"));
				__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "string", ""));
				var class_name_form = __v0.value(ctx);
				
				var __v0 = new Runtime.Monad(ctx, Runtime.rtl.get(ctx, field, "class_settings"));
				__v0 = __v0.monad(ctx, Runtime.rtl.m_to(ctx, "Runtime.Dict", Runtime.Dict.from({})));
				var class_settings = __v0.value(ctx);
				
				var model_path = this.getBindPath(ctx, field);
				
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
				
				if (!Runtime.rtl.isEmpty(ctx, class_name_form))
				{
					class_name = class_name_form;
				}
				
				if (!Runtime.rtl.isEmpty(ctx, class_name))
				{
					[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": class_name,"attrs": this.mergeAttrs(ctx, {"@bind":["Runtime.Web.Form.Form",model_path],"@event:Runtime.Web.Events.ChangeEvent":["Runtime.Web.Form.Form","onItemChange"],"used-by":"form","name":field_name,"form-item":Runtime.rtl.get(ctx, model, "item"),"model-path":model_path},class_settings), "layout": layout});
				}
				RenderDriver.p(__v1, __v1_childs);
				
				/* Element 'div.form_error' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["form_error", this.getCssHash(ctx)].join(" "),"@elem_name":"form_error"}});
				
				/* Text */
				[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": this.renderFieldError(ctx, model, field_name)});
				RenderDriver.p(__v1, __v1_childs);
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
			
			var errors = Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, model, "validate"), field_name);
			
			if (errors != null)
			{
				for (var i = 0;i < errors.count(ctx);i++)
				{
					var s = Runtime.rtl.get(ctx, errors, i);
					
					/* Element 'div.form_error_line' */
					var __v0; var __v0_childs = [];
					[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["form_error_line", this.getCssHash(ctx)].join(" "),"@elem_name":"form_error_line"}});
					
					/* Text */
					[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "text", {"content": s});
					RenderDriver.p(__v0, __v0_childs);
				}
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
			
			/* Element 'div.form_buttons' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["form_buttons", this.getCssHash(ctx)].join(" "),"@key":"buttons","@elem_name":"form_buttons"}});
			
			if (Runtime.rtl.get(ctx, params, "action") == "add")
			{
				/* Component 'Button' */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Button.Button","attrs": {"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.Form.Form","onButtonClick"],"data-action":"create"}, "layout": layout, "content": (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Text */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Add"});
					
					return __control_childs;
				}});
				
				/* Component 'Button' */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Button.Button","attrs": {"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.Form.Form","onButtonClick"],"data-action":"cancel"}, "layout": layout, "content": (__control) =>
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
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Button.Button","attrs": {"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.Form.Form","onButtonClick"],"data-action":"update"}, "layout": layout, "content": (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Text */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Update"});
					
					return __control_childs;
				}});
				
				/* Component 'Button' */
				[__vnull, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "component", {"name": "Runtime.Web.Button.Button","attrs": {"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.Form.Form","onButtonClick"],"data-action":"cancel"}, "layout": layout, "content": (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Text */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Cancel"});
					
					return __control_childs;
				}});
			}
			RenderDriver.p(__v0, __v0_childs);
			
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
		return Runtime.Collection.from(["Runtime.Web.Button.Button"]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Form";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Form.Form";
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
			"class_name": "Runtime.Web.Form.Form",
			"name": "Runtime.Web.Form.Form",
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
Runtime.rtl.defClass(Runtime.Web.Form.Form);
window["Runtime.Web.Form.Form"] = Runtime.Web.Form.Form;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Form.Form;
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
if (typeof Runtime.Web.Form == 'undefined') Runtime.Web.Form = {};
Runtime.Web.Form.FormEvent = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Form.FormEvent.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Form.FormEvent.prototype.constructor = Runtime.Web.Form.FormEvent;
Object.assign(Runtime.Web.Form.FormEvent.prototype,
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
		if (o instanceof Runtime.Web.Form.FormEvent)
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
		return "Runtime.Web.Form.FormEvent";
	},
});
Object.assign(Runtime.Web.Form.FormEvent, Runtime.BaseStruct);
Object.assign(Runtime.Web.Form.FormEvent,
{
	ACTION_CREATE: "create",
	ACTION_UPDATE: "update",
	ACTION_CANCEL: "cancel",
	ACTION_CHANGE: "change",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Form";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Form.FormEvent";
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
			"class_name": "Runtime.Web.Form.FormEvent",
			"name": "Runtime.Web.Form.FormEvent",
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
			"class_name": "Runtime.Web.Form.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ACTION_UPDATE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Form.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ACTION_CANCEL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Form.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ACTION_CHANGE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Form.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "event") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Form.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "item") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Form.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "field_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Form.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Form.FormEvent",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "old_value") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Form.FormEvent",
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
Runtime.rtl.defClass(Runtime.Web.Form.FormEvent);
window["Runtime.Web.Form.FormEvent"] = Runtime.Web.Form.FormEvent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Form.FormEvent;
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
if (typeof Runtime.Web.Form == 'undefined') Runtime.Web.Form = {};
Runtime.Web.Form.FormModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Form.FormModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Form.FormModel.prototype.constructor = Runtime.Web.Form.FormModel;
Object.assign(Runtime.Web.Form.FormModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.item = null;
		this.message = "";
		this.success_message = "";
		this.error_message = "";
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Form.FormModel)
		{
			this.item = o.item;
			this.message = o.message;
			this.success_message = o.success_message;
			this.error_message = o.error_message;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "item")this.item = v;
		else if (k == "message")this.message = v;
		else if (k == "success_message")this.success_message = v;
		else if (k == "error_message")this.error_message = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "item")return this.item;
		else if (k == "message")return this.message;
		else if (k == "success_message")return this.success_message;
		else if (k == "error_message")return this.error_message;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Form.FormModel";
	},
});
Object.assign(Runtime.Web.Form.FormModel, Runtime.BaseStruct);
Object.assign(Runtime.Web.Form.FormModel,
{
	/**
	 * Set item
	 */
	setItem: function(ctx, model, item)
	{
		return model.copy(ctx, Runtime.Dict.from({"item":item}));
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
	/**
	 * Clear
	 */
	clear: function(ctx, model)
	{
		return model.copy(ctx, Runtime.Dict.from({"item":new Runtime.Dict(ctx),"message":"","success_message":"","error_message":""}));
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Form";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Form.FormModel";
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
			"class_name": "Runtime.Web.Form.FormModel",
			"name": "Runtime.Web.Form.FormModel",
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
			a.push("item");
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
		if (field_name == "item") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Form.FormModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "message") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Form.FormModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "success_message") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Form.FormModel",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_message") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Web.Form.FormModel",
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
Runtime.rtl.defClass(Runtime.Web.Form.FormModel);
window["Runtime.Web.Form.FormModel"] = Runtime.Web.Form.FormModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Form.FormModel;
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
if (typeof Runtime.Web.Form == 'undefined') Runtime.Web.Form = {};
Runtime.Web.Form.ModuleDescription = function(ctx)
{
};
Object.assign(Runtime.Web.Form.ModuleDescription.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Form.ModuleDescription)
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
		return "Runtime.Web.Form.ModuleDescription";
	},
});
Object.assign(Runtime.Web.Form.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function(ctx)
	{
		return "Runtime.Web.Form";
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
		return Runtime.Dict.from({"Runtime.Web":"*"});
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Form";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Form.ModuleDescription";
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
			"class_name": "Runtime.Web.Form.ModuleDescription",
			"name": "Runtime.Web.Form.ModuleDescription",
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
Runtime.rtl.defClass(Runtime.Web.Form.ModuleDescription);
window["Runtime.Web.Form.ModuleDescription"] = Runtime.Web.Form.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Form.ModuleDescription;
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
		return "\n.input.h-9e6e{\n\twidth: 100%;\n\tpadding: 6px 12px;\n}\n";
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var value = (params != null) ? (params.get(ctx, "value", "")) : ("");
			
			var name = (params != null) ? (params.get(ctx, "name", "")) : ("");
			
			var kind = (params != null) ? (params.get(ctx, "type", "input")) : ("");
			
			var tag = (params != null) ? (params.get(ctx, "@tag", "")) : ("");
			
			/* Element 'input.input' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "input","attrs": {"@tag":tag,"@event:Runtime.Web.Events.ChangeEvent":["Runtime.Web.Input.Input","onChange"],"name":name,"type":kind,"value":model,"class":["input", this.getCssHash(ctx)].join(" "),"@elem_name":"input"}});
			
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
		return "\n";
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
		return "\n.select.h-4d5b{\n\twidth: 100%;\n\tpadding: 6px 12px;\n}\n";
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
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "select","attrs": {"@event:Runtime.Web.Events.ChangeEvent":["Runtime.Web.Input.Select","onChange"],"name":name,"value":model,"class":["select", this.getCssHash(ctx)].join(" "),"@elem_name":"select"}});
			
			var options = Runtime.rtl.get(ctx, params, "options");
			
			if (Runtime.rtl.exists(ctx, options))
			{
				if (Runtime.rtl.get(ctx, params, "select_value") == true)
				{
					/* Element 'option' */
					var __v1; var __v1_childs = [];
					[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "option","attrs": {"value":""}});
					
					/* Text */
					[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "text", {"content": ctx.translate(ctx, "Runtime.Web.Input", "Select value")});
					RenderDriver.p(__v1, __v1_childs);
				}
				
				for (var i = 0;i < options.count(ctx);i++)
				{
					var item = Runtime.rtl.get(ctx, options, i);
					
					var selected = Runtime.Dict.from({});
					
					if (Runtime.rtl.get(ctx, item, "id") == model)
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
		return "\n";
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
if (typeof Runtime.Web.Table == 'undefined') Runtime.Web.Table = {};
Runtime.Web.Table.Table = function(ctx)
{
	Runtime.Web.Component.apply(this, arguments);
};
Runtime.Web.Table.Table.prototype = Object.create(Runtime.Web.Component.prototype);
Runtime.Web.Table.Table.prototype.constructor = Runtime.Web.Table.Table;
Object.assign(Runtime.Web.Table.Table.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Table.Table)
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
		return "Runtime.Web.Table.Table";
	},
});
Object.assign(Runtime.Web.Table.Table, Runtime.Web.Component);
Object.assign(Runtime.Web.Table.Table,
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
			
			/* Element 'table' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "table","attrs": {}});
			
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
	renderRow: function(ctx, layout, model, params, index)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var row = Runtime.rtl.get(ctx, model.rows, index);
			
			var fields = Runtime.rtl.get(ctx, params, "fields");
			
			/* Element 'tr' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "tr","attrs": {"data-index":index,"@key":"td-" + Runtime.rtl.toStr(index)}});
			
			for (var i = 0;i < fields.count(ctx);i++)
			{
				var field_name = Runtime.rtl.get(ctx, fields, i);
				
				/* Element 'td' */
				var __v1; var __v1_childs = [];
				[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "td","attrs": {"data-name":field_name}});
				
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
			
			var field = Runtime.rtl.get(ctx, Runtime.rtl.get(ctx, params, "struct"), field_name);
			
			if (field != null)
			{
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
				
				if (!Runtime.rtl.isEmpty(ctx, class_name))
				{
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": class_name,"attrs": this.mergeAttrs(ctx, {"@bind":["Runtime.Web.Table.Table",Runtime.Collection.from(["rows",index,field_name])],"used-by":"table","name":field_name,"row-index":index,"row-data":row,"table-model":model,"@key":field_name},class_settings), "layout": layout});
				}
			}
			
			return __control_childs;
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Table";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Table.Table";
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
			"class_name": "Runtime.Web.Table.Table",
			"name": "Runtime.Web.Table.Table",
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
Runtime.rtl.defClass(Runtime.Web.Table.Table);
window["Runtime.Web.Table.Table"] = Runtime.Web.Table.Table;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Table.Table;
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
if (typeof Runtime.Web.Table == 'undefined') Runtime.Web.Table = {};
Runtime.Web.Table.TableModel = function(ctx)
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Table.TableModel.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Table.TableModel.prototype.constructor = Runtime.Web.Table.TableModel;
Object.assign(Runtime.Web.Table.TableModel.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.rows = null;
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Table.TableModel)
		{
			this.rows = o.rows;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "rows")this.rows = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "rows")return this.rows;
		return Runtime.BaseStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Web.Table.TableModel";
	},
});
Object.assign(Runtime.Web.Table.TableModel, Runtime.BaseStruct);
Object.assign(Runtime.Web.Table.TableModel,
{
	/**
	 * Returns item by id
	 */
	getItemById: function(ctx, model, id)
	{
		if (model.rows == null)
		{
			return null;
		}
		return model.rows.findItem(ctx, Runtime.lib.equalAttr(ctx, "id", id));
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
	setItem: function(ctx, model, id, item)
	{
		if (model.rows == null)
		{
			model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["rows"]), Runtime.Collection.from([]));
		}
		var pos = model.rows.find(ctx, Runtime.lib.equalAttr(ctx, "id", id));
		if (pos != -1)
		{
			model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["rows"]), model.rows.setIm(ctx, pos, item));
		}
		return model;
	},
	/**
	 * Remove item by id
	 */
	removeItemById: function(ctx, model, id)
	{
		if (model.rows == null)
		{
			return model;
		}
		var pos = model.rows.find(ctx, Runtime.lib.equalAttr(ctx, "id", id));
		if (pos != -1)
		{
			model = Runtime.rtl.setAttr(ctx, model, Runtime.Collection.from(["rows"]), model.rows.removeIm(ctx, pos));
		}
		return model;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Table";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Table.TableModel";
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
			"class_name": "Runtime.Web.Table.TableModel",
			"name": "Runtime.Web.Table.TableModel",
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
			"class_name": "Runtime.Web.Table.TableModel",
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
Runtime.rtl.defClass(Runtime.Web.Table.TableModel);
window["Runtime.Web.Table.TableModel"] = Runtime.Web.Table.TableModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Table.TableModel;
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
if (typeof Runtime.Web.Table == 'undefined') Runtime.Web.Table = {};
Runtime.Web.Table.ModuleDescription = function(ctx)
{
};
Object.assign(Runtime.Web.Table.ModuleDescription.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.Table.ModuleDescription)
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
		return "Runtime.Web.Table.ModuleDescription";
	},
});
Object.assign(Runtime.Web.Table.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function(ctx)
	{
		return "Runtime.Web.Table";
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
		return Runtime.Dict.from({"Runtime.Web":"*"});
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Web.Table";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Web.Table.ModuleDescription";
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
			"class_name": "Runtime.Web.Table.ModuleDescription",
			"name": "Runtime.Web.Table.ModuleDescription",
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
Runtime.rtl.defClass(Runtime.Web.Table.ModuleDescription);
window["Runtime.Web.Table.ModuleDescription"] = Runtime.Web.Table.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Table.ModuleDescription;
"use strict;"
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
		var id = Runtime.rtl.get(ctx, msg.sender.params, "data-id");
		var item = this.table.call(ctx, "getItemById", id);
		this.dialog_edit.update(ctx, "show");
		this.form_edit.update(ctx, "clear");
		this.form_edit.update(ctx, "setItem", item);
	},
	/**
 * On row delete
 */
	onRowDeleteClick: async function(ctx, msg)
	{
		var id = Runtime.rtl.get(ctx, msg.sender.params, "data-id");
		var item = this.table.call(ctx, "getItemById", id);
		this.dialog_delete.update(ctx, "show", Runtime.Dict.from({"text":ctx.translate(ctx, "Runtime.Web.CRUD", "Do you realy want to delete '%name%' ?", Runtime.Dict.from({"name":Runtime.rtl.get(ctx, item, "name")})),"tag":Runtime.Dict.from({"item":item})}));
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
	},
	/**
 * On form event
 */
	onFormEvent: async function(ctx, msg)
	{
		var e = msg.data;
		if (msg.sender == this.form_add)
		{
			if (e.event == Runtime.Web.Form.FormEvent.ACTION_CANCEL)
			{
				this.dialog_add.update(ctx, "hide");
			}
			else if (e.event == Runtime.Web.Form.FormEvent.ACTION_CREATE)
			{
				await this.onItemAdd(ctx);
			}
		}
		if (msg.sender == this.form_edit)
		{
			if (e.event == Runtime.Web.Form.FormEvent.ACTION_CANCEL)
			{
				this.dialog_edit.update(ctx, "hide");
			}
			else if (e.event == Runtime.Web.Form.FormEvent.ACTION_UPDATE)
			{
				await this.onItemUpdate(ctx);
			}
		}
	},
	/**
 * Add item
 */
	onItemAdd: async function(ctx)
	{
		var item = this.form_add.model(ctx, "item");
		this.form_add.update(ctx, "setWaitMessage");
		/* Send api */
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":this.getCrudObjectName(ctx),"interface_name":"core.crud","method_name":"add","data":Runtime.Dict.from({"item":item})}));
		if (answer.isSuccess(ctx))
		{
			this.table.update(ctx, "prependItem", Runtime.rtl.get(ctx, answer.response, "item"));
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
		var item = this.form_edit.model(ctx, "item");
		this.form_edit.update(ctx, "setWaitMessage");
		/* Send api */
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":this.getCrudObjectName(ctx),"interface_name":"core.crud","method_name":"update","data":Runtime.Dict.from({"pk":Runtime.Dict.from({"id":Runtime.rtl.get(ctx, item, "id")}),"item":item})}));
		if (answer.isSuccess(ctx))
		{
			this.table.update(ctx, "setItem", Runtime.rtl.get(ctx, item, "id"), Runtime.rtl.get(ctx, answer.response, "item"));
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
		/* Send api */
		var answer = await Runtime.Web.RenderDriver.remoteBusCall(ctx, Runtime.Dict.from({"object_name":this.getCrudObjectName(ctx),"interface_name":"core.crud","method_name":"delete","data":Runtime.Dict.from({"pk":Runtime.Dict.from({"id":Runtime.rtl.get(ctx, item, "id")})})}));
		if (answer.isSuccess(ctx))
		{
			this.table.update(ctx, "removeItemById", Runtime.rtl.get(ctx, item, "id"));
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
		return "\n";
	},
	render: function(ctx, layout, model, params, content)
	{
		return (__control) =>
		{
			var __vnull = null;
			var __control_childs = [];
			
			var crud_settings = Runtime.rtl.get(ctx, params, "crud_settings");
			
			var form_fields = Runtime.rtl.get(ctx, params, "form_fields");
			
			var table_fields = Runtime.rtl.get(ctx, params, "table_fields");
			
			/* Extend settings */
			crud_settings = crud_settings.setIm(ctx, "number", Runtime.Dict.from({"api_name":"number","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				var model = Runtime.rtl.get(ctx, params, "table-model");
				var index = Runtime.rtl.get(ctx, params, "row-index");
				if (model)
				{
					return index + 1;
				}
				return "";
			}})})).setIm(ctx, "edit", Runtime.Dict.from({"api_name":"edit","label":"","class_name":"Runtime.Web.Input.Label","class_settings":Runtime.Dict.from({"render":(ctx, layout, model, params, content) => 
			{
				var model = Runtime.rtl.get(ctx, params, "table-model");
				var item = Runtime.rtl.get(ctx, params, "row-data");
				var index = Runtime.rtl.get(ctx, params, "row-index");
				return (__control) =>
				{
					var __vnull = null;
					var __control_childs = [];
					
					/* Component 'Button' */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Button.Button","attrs": {"type":"small","data-index":index,"data-id":Runtime.rtl.get(ctx, item, "id"),"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.CrudPage","onRowEditClick"]}, "layout": layout, "content": (__control) =>
					{
						var __vnull = null;
						var __control_childs = [];
						
						/* Text */
						[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Edit"});
						
						return __control_childs;
					}});
					
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "span","attrs": {"class":["lpad5", this.getCssHash(ctx)].join(" "),"@elem_name":"lpad5"}});
					
					/* Component 'Button' */
					[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Button.Button","attrs": {"type":"small","data-index":index,"data-id":Runtime.rtl.get(ctx, item, "id"),"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.CrudPage","onRowDeleteClick"]}, "layout": layout, "content": (__control) =>
					{
						var __vnull = null;
						var __control_childs = [];
						
						/* Text */
						[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Delete"});
						
						return __control_childs;
					}});
					
					return __control_childs;
				};
			}})}));
			
			/* Element 'div.crud' */
			var __v0; var __v0_childs = [];
			[__v0, __control_childs] = RenderDriver.e(__control, __control_childs, "element", {"name": "div","attrs": {"class":["crud", this.getCssHash(ctx)].join(" "),"@elem_name":"crud"}});
			
			/* Element 'div.buttons' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["buttons", this.getCssHash(ctx)].join(" "),"@elem_name":"buttons"}});
			
			/* Component 'Button' */
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": "Runtime.Web.Button.Button","attrs": {"@event:Runtime.Web.Events.MouseClickEvent":["Runtime.Web.CRUD.CrudPage","onShowAddClick"]}, "layout": layout, "content": (__control) =>
			{
				var __vnull = null;
				var __control_childs = [];
				
				/* Text */
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "text", {"content": "Add user"});
				
				return __control_childs;
			}});
			RenderDriver.p(__v1, __v1_childs);
			
			/* Element 'div.table' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["table", this.getCssHash(ctx)].join(" "),"@elem_name":"table"}});
			
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": "Runtime.Web.Table.Table","attrs": {"@name":["Runtime.Web.CRUD.CrudPage","table"],"struct":crud_settings,"fields":table_fields}, "layout": layout});
			RenderDriver.p(__v1, __v1_childs);
			
			/* Element 'div.dialogs' */
			var __v1; var __v1_childs = [];
			[__v1, __v0_childs] = RenderDriver.e(__v0, __v0_childs, "element", {"name": "div","attrs": {"class":["dialogs", this.getCssHash(ctx)].join(" "),"@elem_name":"dialogs"}});
			
			/* Component 'Dialog' */
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": "Runtime.Web.Dialog.Dialog","attrs": {"@name":["Runtime.Web.CRUD.CrudPage","dialog_add"],"style":Runtime.Web.Dialog.DialogModel.STYLE_CONTENT,"show_buttons":false}, "layout": layout, "content": (__control) =>
			{
				var __vnull = null;
				var __control_childs = [];
				
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Form.Form","attrs": {"@name":["Runtime.Web.CRUD.CrudPage","form_add"],"action":"add","struct":crud_settings,"fields":form_fields,"@event:Runtime.Web.Form.FormEvent":["Runtime.Web.CRUD.CrudPage","onFormEvent"]}, "layout": layout});
				
				return __control_childs;
			}});
			
			/* Component 'Dialog' */
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": "Runtime.Web.Dialog.Dialog","attrs": {"@name":["Runtime.Web.CRUD.CrudPage","dialog_edit"],"style":Runtime.Web.Dialog.DialogModel.STYLE_CONTENT,"show_buttons":false}, "layout": layout, "content": (__control) =>
			{
				var __vnull = null;
				var __control_childs = [];
				
				[__vnull, __control_childs] = RenderDriver.e(__control, __control_childs, "component", {"name": "Runtime.Web.Form.Form","attrs": {"@name":["Runtime.Web.CRUD.CrudPage","form_edit"],"action":"edit","struct":crud_settings,"fields":form_fields,"@event:Runtime.Web.Form.FormEvent":["Runtime.Web.CRUD.CrudPage","onFormEvent"]}, "layout": layout});
				
				return __control_childs;
			}});
			
			[__vnull, __v1_childs] = RenderDriver.e(__v1, __v1_childs, "component", {"name": "Runtime.Web.Dialog.Dialog","attrs": {"@name":["Runtime.Web.CRUD.CrudPage","dialog_delete"],"style":Runtime.Web.Dialog.DialogModel.STYLE_CONFIRM,"auto_hide":false,"@event:Runtime.Web.Dialog.DialogEvent":["Runtime.Web.CRUD.CrudPage","onDialogEvent"]}, "layout": layout});
			RenderDriver.p(__v1, __v1_childs);
			RenderDriver.p(__v0, __v0_childs);
			
			return __control_childs;
		};
	},
	components: function(ctx)
	{
		return Runtime.Collection.from(["Runtime.Web.Button.Button","Runtime.Web.Dialog.Dialog","Runtime.Web.Form.Form","Runtime.Web.Input.Input","Runtime.Web.Input.Label","Runtime.Web.Input.Select","Runtime.Web.Input.SelectText","Runtime.Web.Table.Table"]);
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
		this.form_add = new Runtime.Web.Form.FormModel(ctx);
		this.form_edit = new Runtime.Web.Form.FormModel(ctx);
		this.table = new Runtime.Web.Table.TableModel(ctx);
		this.dialog_add = new Runtime.Web.Dialog.DialogModel(ctx);
		this.dialog_edit = new Runtime.Web.Dialog.DialogModel(ctx);
		this.dialog_delete = new Runtime.Web.Dialog.DialogModel(ctx);
		Runtime.BaseStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Web.CRUD.CrudPageModel)
		{
			this.form_add = o.form_add;
			this.form_edit = o.form_edit;
			this.table = o.table;
			this.dialog_add = o.dialog_add;
			this.dialog_edit = o.dialog_edit;
			this.dialog_delete = o.dialog_delete;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "form_add")this.form_add = v;
		else if (k == "form_edit")this.form_edit = v;
		else if (k == "table")this.table = v;
		else if (k == "dialog_add")this.dialog_add = v;
		else if (k == "dialog_edit")this.dialog_edit = v;
		else if (k == "dialog_delete")this.dialog_delete = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "form_add")return this.form_add;
		else if (k == "form_edit")return this.form_edit;
		else if (k == "table")return this.table;
		else if (k == "dialog_add")return this.dialog_add;
		else if (k == "dialog_edit")return this.dialog_edit;
		else if (k == "dialog_delete")return this.dialog_delete;
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
			a.push("table");
			a.push("dialog_add");
			a.push("dialog_edit");
			a.push("dialog_delete");
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