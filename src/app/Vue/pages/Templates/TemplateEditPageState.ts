/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020 - 2021 "Ildar Bikmamatov" <support@bayrell.org>
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
import { deepClone } from "vue-helper";
import { CrudButton, CrudItem, CrudState, FieldInfo } from "vue-helper/Crud/CrudState";
import { TemplateVersion } from "./TemplatesViewPageState";


export class TemplateEditPageState extends CrudState
{
	template_id: number;
    
    
	/**
	 * Init class
	 */
	init(params:any)
	{
		/* Init class */
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
	static getApiObjectName()
	{
		return "templates_versions";
	}
	
	
	
	/**
	 * Returns route names
	 */
	static getRouteNames(): Record<string, string>
	{
		return {
		};
	}
	
	
	
	/**
	 * Crud init
	 */
	crudInit()
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
	static getItemName(item: TemplateVersion | null): string
	{
		return (item) ? item.version : "";
	}
	
	
	
	/**
	 * Returns item id
	 */
	static getItemId(item: TemplateVersion | null): string
	{
		return (item != null) ? String(item.id) : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	static getMessage(message_type: string, item: any | null): string
	{
		return super.getMessage(message_type, item);
	}
	
	
	
	/**
	 * Return api create url
	 */
	static getApiUrlCreate()
	{
		return "/api/template/import/";
	}
	
	
	
	/**
	 * Return api update url
	 */
	static getApiUrlUpdate(item: TemplateVersion)
	{
		return "/api/template/edit/" + encodeURIComponent(this.getItemId(item)) + "/";
	}
	
}