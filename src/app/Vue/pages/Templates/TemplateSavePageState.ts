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
import { deepClone, responseOk, setPageTitle } from "vue-helper";
import { CrudButton, CrudState, FieldInfo } from "vue-helper/Crud/CrudState";
import { Template } from "./TemplatesListPageState";
import { TemplateVersion } from "./TemplatesVersionsPageState";


export class TemplateSavePageState extends CrudState<TemplateVersion>
{
	template_id: number;
	template: Template | null;
    
	
    /**
	 * Returns class
	 */
	getClass(): typeof TemplateSavePageState
	{
		return this.constructor as typeof TemplateSavePageState;
	}
	
	
	
	/**
	 * Returns class item
	 */
	static getClassItem(): Function
	{
		return TemplateVersion;
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "templates_versions";
	}
	
	
	
	/**
	 * Init class
	 */
	init(params:any)
	{
		super.init(params);
	}
	
	
	
	/**
	 * Returns route names
	 */
	getRouteNames(): Record<string, string>
	{
		return {
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
				"route": "app:templates:edit"
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
		if (item && this.template)
		{
			return this.template.name + " " + item.version;
		}
		return "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: any | null): string
	{
		if (message_type == "item")
		{
			return "template";
		}
		else if (message_type == "add_title")
		{
			return "Import XML";
		}
		return super.getMessage(message_type, item);
	}
	
	
	
	/**
	 * Return api search url
	 */
	static getApiUrl(api_type: string, params: Record<string, any> | null = null)
	{
		let api_name = this.getApiObjectName();
		if (api_type == "create")
		{
			return "/api/template/import/";
		}
		else if (api_type == "update")
		{
			return "/api/template/save/";
		}
		return super.getApiUrl(api_type, params);
	}
	
	
	
	/**
	 * Page data
	 */
	async onRouteUpdate(route: any)
	{
		this.template = null;
		super.onRouteUpdate(route);
	}
	
	
	
	/**
	 * After
	 */
	async after(kind: string, params: Record<string, any>)
	{
		let item_original = params["item_original"];
		let response = params["response"] as AxiosResponse;
		
		if (kind == "onLoadPageSave" || kind == "processSaveForm")
		{
			if (response && responseOk(response))
			{
				this.template = (new Template()).assignValues(response.data.result.template);
			}
		}
		
		if (kind == "processSaveForm" && item_original == null && response && responseOk(response))
		{
			this.template = null;
			this.form_save.item_original = null;
			this.setPageAction("create");
		}
		
		super.after(kind, params);
	}
}