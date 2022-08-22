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

import { deepClone } from "vue-helper";
import { CrudItem } from "vue-helper/Crud/CrudItem";
import { CrudState, FieldInfo, SelectOption } from "vue-helper/Crud/CrudState";



export class NginxFile extends CrudItem
{
	id: number;
	name: string;
	enable: boolean;
	content: string;
	timestamp: number;
	is_deleted: boolean;
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
		this.enable = false;
		this.content = "";
		this.timestamp = 0;
		this.is_deleted = false;
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
		else if (key == "enable") this.enable = value == "1" || value == "true";
		else if (key == "content") this.content = String(value);
		else if (key == "timestamp") this.timestamp = Number(value);
		else if (key == "is_deleted") this.is_deleted = value == "1" || value == "true";
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else super.assignValue(key, value);
	}
	
}



export class NginxFilesPageState extends CrudState<NginxFile>
{
	
	/**
	 * Returns class
	 */
	getClass(): typeof NginxFilesPageState
	{
		return this.constructor as typeof NginxFilesPageState;
	}
	
	
	
	/**
	 * Returns class item
	 */
	getClassItem(): Function
	{
		return NginxFile;
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "nginx_files";
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
		
		/* Name field */
		let name = new FieldInfo();
		name.name = "name";
		name.label = "Name";
		name.component = "Input";
		name.primary = false;
		this.fields.push( deepClone(name) );
		
		/* Enable field */
		let enable = new FieldInfo();
		enable.name = "enable";
		enable.label = "Enable";
		enable.component = "Select";
		enable.options =
		[
			new SelectOption().assignValues({"id": "0", "value": "No"}),
			new SelectOption().assignValues({"id": "1", "value": "Yes"}),
		];
		this.fields.push( deepClone(enable) );
		
		/* Content */
		let content = new FieldInfo();
		content.name = "content";
		content.label = "Content";
		content.component = "TextArea";
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
		
		/* Form fields */
		this.form_save.fields.push( deepClone(name) );
		this.form_save.fields.push( deepClone(enable) );
		this.form_save.fields.push( deepClone(content) );
		
		/* Table fields */
		name.component = "Label";
		enable.component = "SelectLabel";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(name) );
		this.fields_table.push( deepClone(enable) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	static getItemName(item: NginxFile | null): string
	{
		return (item) ? item.name : "";
	}
	
	
	
	/**
	 * Returns item id
	 */
	static getItemId(item: NginxFile | null): string
	{
		return (item != null) ? String(item.id) : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	static getMessage(message_type: string, item: NginxFile | null): string
	{
		if (message_type == "list_title")
		{
			return "Nginx files";
		}
		else if (message_type == "item")
		{
			return "nginx file";
		}
		return super.getMessage(message_type, item);
	}
}