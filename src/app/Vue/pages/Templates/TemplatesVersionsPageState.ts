/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020 - 2022 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import axios, { AxiosResponse } from "axios";
import { deepClone, responseOk } from "vue-helper";
import { CrudItem } from "vue-helper/Crud/CrudItem";
import { CrudButton, CrudState, FieldInfo } from "vue-helper/Crud/CrudState";
import { Template } from "./TemplatesListPageState";


export class TemplateVersion extends CrudItem
{
	id: number;
	template_id: number;
	version: string;
	content: string;
	gmtime_created: string;
	gmtime_updated: string;
	
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.id = 0;
		this.template_id = 0;
		this.version = "";
		this.content = "";
		this.gmtime_created = "";
		this.gmtime_updated = "";
		
		/* Init class */
		super.init(params);
	}
	
	
	/**
	 * Assign value
	 */
	assignValue(key:string, value:any)
	{
		if (key == "id") this.id = Number(value);
		else if (key == "template_id") this.template_id = Number(value);
		else if (key == "version") this.version = String(value);
		else if (key == "content") this.content = String(value);
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else super.assignValue(key, value);
	}
	
}



export class TemplatesVersionsPageState extends CrudState<TemplateVersion>
{
	template: Template | null = null;
	template_id: number;
	
	
	/**
	 * Returns class
	 */
	getClass(): typeof TemplatesVersionsPageState
	{
		return this.constructor as typeof TemplatesVersionsPageState;
	}
	
	
	
	/**
	 * Init class
	 */
	init(params:any)
	{
		super.init(params);
	}
	
	
	
	/**
	 * Returns new item
	 */
	static createNewItem(): TemplateVersion
	{
		return new TemplateVersion();
	}
	
	
	
	/**
	 * Returns api object name
	 */
	getApiObjectName()
	{
		return "templates_versions";
	}
	
	
	
	/**
	 * Returns route names
	 */
	getRouteNames(): Record<string, string>
	{
		return {
			"list": "app:templates_versions",
		};
	}
	
	
	
	/**
	 * Crud init
	 */
	initCrud()
	{
		/* ID field */
		let id = new FieldInfo();
		id.name = "id";
		id.primary = true;
		this.fields.push( deepClone(id) );
		
		/* Version field */
		let version = new FieldInfo();
		version.name = "version";
		version.label = "Version";
		version.component = "Input";
		this.fields.push( deepClone(version) );
		
		/* Content field */
		let content = new FieldInfo();
		content.name = "content";
		content.label = "Content";
		content.component = "CodeMirror";
		content.component_params["lang"] = "xml";
		this.fields.push( deepClone(content) );
		
		/* Row number */
		let row_number = new FieldInfo();
		row_number.name = "row_number";
		row_number.label = "";
		row_number.component = "RowNumber";
		
		/* Row buttons */
		let row_buttons = new FieldInfo();
		row_buttons.name = "row_buttons";
		row_buttons.label = "";
		row_buttons.component = "RowButtons";
		row_buttons.component_params["buttons"] = [
			new CrudButton().assignValues({
				"type": "default",
				"label": "Edit",
				"action": "edit",
				"route": "app:templates:edit",
				"params": (res: any, component: any, button: any) => {
					return {
						"id": component.crud_item.id,
					};
				},
			}),
			new CrudButton().assignValues({
				"type": "danger",
				"label": "Delete",
				"action": "delete"
			}),
		];
		
		/* Form fields */
		this.form_save.fields.push( deepClone(content) );
		
		/* Table fields */
		version.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(version) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemName(item: TemplateVersion | null): string
	{
		return (item) ? item.version : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: any | null): string
	{
		if (message_type == "list_title")
		{
			return "Template versions";
		}
		else if (message_type == "item")
		{
			return "template version";
		}
		return super.getMessage(message_type, item);
	}
	
	
	
	/**
	 * Page data
	 */
	async onRouteUpdate(route: any)
	{
		this.template_id = Number(route.to.params.template_id);
		await super.onRouteUpdate(route);
	}
	
	
	
	/**
	 * Search filter
	 */
	getSearchData(route: any)
	{
		let res: any = super.getSearchData(route);
		res["template_id"] = this.template_id;
		return res;
	}
	
	
	
	/**
	 * After
	 */
	async after(kind: string, params: Record<string, any>)
	{
		await super.after(kind, params);
		
		if (kind == "onLoadPageList")
		{
			let response = params["response"] as AxiosResponse;
			if (response && responseOk(response))
			{
				this.template = (new Template()).assignValues(response.data.result.template);
			}
		}
	}
}