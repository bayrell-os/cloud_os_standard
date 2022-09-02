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
import { deepClone } from "vue-helper";
import { CrudItem } from "vue-helper/Crud/CrudItem";
import { CrudButton, CrudState, FieldInfo } from "vue-helper/Crud/CrudState";
import { DialogButton, DialogState } from "vue-helper/Crud/DialogState";
import { FormState } from "vue-helper/Crud/FormState";


export class Template extends CrudItem
{
	id: number;
	name: string;
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
		this.name = "";
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
		else if (key == "name") this.name = String(value);
		else if (key == "content") this.content = String(value);
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else super.assignValue(key, value);
	}
	
}



export class TemplatesListPageState extends CrudState<Template>
{
	
	
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
	createNewItem(): Template
	{
		return new Template();
	}
	
	
	
	/**
	 * Returns api object name
	 */
	getApiObjectName()
	{
		return "templates";
	}
	
	
	
	/**
	 * Returns route names
	 */
	getRouteNames(): Record<string, string>
	{
		return {
			"list": "app:templates",
			// "add": "app:templates:add",
			// "edit": "app:templates:edit",
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
		
		/* Name field */
		let name = new FieldInfo();
		name.name = "name";
		name.label = "name";
		name.component = "Input";
		this.fields.push( deepClone(name) );
		
		/* UID field */
		let uid = new FieldInfo();
		uid.name = "uid";
		uid.label = "uid";
		uid.component = "Input";
		this.fields.push( deepClone(uid) );
		
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
				"label": "View",
				"action": "view",
				"route": "app:templates:view",
				"params": (res: any, component: any, button: any) => {
					return {
						"template_id": component.crud_item.id,
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
		// this.form_save.fields.push( deepClone(content) );
		
		/* Table fields */
		name.component = "Label";
		uid.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(name) );
		this.fields_table.push( deepClone(uid) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemName(item: Template | null): string
	{
		return (item) ? item.name : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: any | null): string
	{
		if (message_type == "list_title")
		{
			return "Templates";
		}
		else if (message_type == "item")
		{
			return "template";
		}
		return super.getMessage(message_type, item);
	}
	
	
}