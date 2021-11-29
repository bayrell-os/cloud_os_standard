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

import { deepClone } from "vue-helper";
import { CrudItem, CrudState, FieldInfo, SelectOption } from "vue-helper/Crud/CrudState";
import { ApplicationTemplate } from "../ApplicationsTemplates/ApplicationsTemplatesPageState";


export class ApplicationStatus extends CrudItem
{
	id: number;
	name: string;
	yaml: string;
	status: number;
	content: string;
	template: ApplicationTemplate | null;
	variables: Array<any>;
	modificators: Array<number>;
	gmtime_created: string;
	gmtime_updated: string;
	
	
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.id = 0;
		this.name = "";
		this.yaml = "";
		this.status = 0;
		this.content = "";
		this.template = null;
		this.variables = [];
		this.modificators = [];
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
		else if (key == "name") this.name = String(value);
		else if (key == "status") this.status = Number(value);
		else if (key == "yaml") this.yaml = String(value);
		else if (key == "content") this.content = String(value);
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else if (key == "template") this.template = (value) ? new ApplicationTemplate(value) : null;
		else if (key == "modificators")
			this.modificators = value.map
			(
				(item: any) => { return Number(item); }
			);
		else super.assignValue(key, value);
	}
	
}



export class ApplicationsStatusPageState extends CrudState
{
	
	/**
	 * Returns new item
	 */
	static createNewItem(): ApplicationStatus
	{
		return new ApplicationStatus();
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "applications";
	}
	
	
	
	/**
	 * Returns route names
	 */
	static getRouteNames(): Record<string, string>
	{
		return {
			"list": "app:applications:status",
			"edit": "app:applications:status:edit",
		};
	}
	
	
	 
	/**
	 * Crud init
	 */
	crudInit()
	{
		/* ID field */
		let id = new FieldInfo();
		id.api_name = "id";
		id.primary = true;
		this.fields.push( deepClone(id) );
		
		/* Status */
		let status = new FieldInfo();
		status.api_name = "status";
		status.label = "status";
		status.component = "SelectLabel";
		status.options = [
			new SelectOption().assignValues({ "id": 0, "value": "STOPPED" }),
			new SelectOption().assignValues({ "id": 1, "value": "LAUNCHED" }),
			new SelectOption().assignValues({ "id": 2, "value": "STARTS UP" }),
		];
		this.fields.push( deepClone(status) );
		
		/* Name field */
		let name = new FieldInfo();
		name.api_name = "name";
		name.label = "name";
		name.component = "Input";
		this.fields.push( deepClone(name) );
		
		/* Content field */
		let content = new FieldInfo();
		content.api_name = "content";
		content.label = "Content";
		content.component = "TextArea";
		this.fields.push( deepClone(content) );
		
		/* Row number */
		let row_number = new FieldInfo();
		row_number.api_name = "row_number";
		row_number.label = "";
		row_number.component = "RowNumber";
		
		/* Row buttons */
		let row_buttons = new FieldInfo();
		row_buttons.api_name = "row_buttons";
		row_buttons.label = "";
		row_buttons.component = "RowButtons";
		
		/* Form fields */
		this.form_save.fields.push( deepClone(name) );
		
		/* Table fields */
		name.component = "Label";
		status.component = "SelectLabel";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(name) );
		this.fields_table.push( deepClone(status) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	static getItemName(item: ApplicationStatus | null): string
	{
		return (item) ? item.name : "";
	}
	
	
	
	/**
	 * Returns item id
	 */
	static getItemId(item: ApplicationStatus | null): string
	{
		return (item != null) ? String(item.id) : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	static getMessage(message_type: string, item: ApplicationStatus | null): string
	{
		if (message_type == "dialog_delete_title")
		{
			return "Delete application";
		}
		if (message_type == "dialog_delete_text")
		{
			return "Do you sure to delete application \"" + this.getItemName(item) + "\" ?";
		}
		return super.getMessage(message_type, item);
	}
	
}