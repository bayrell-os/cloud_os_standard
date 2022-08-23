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

import { deepClone, notNull } from "vue-helper";
import { CrudItem } from "vue-helper/Crud/CrudItem";
import { CrudState, FieldInfo } from "vue-helper/Crud/CrudState";



export class Space extends CrudItem
{
	id: number;
	name: string;
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
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else return super.assignValue(key, value);
	}
	
}



export class SpacesPageState extends CrudState<Space>
{
	/**
	 * Returns route names
	 */
	static getRouteNames(): Record<string, string>
	{
		return {
			"list": "app:spaces:list",
			"add": "",
			"edit": "app:spaces:edit",
		};
	}
	
	
	
	/**
	 * Returns class
	 */
	getClass(): typeof SpacesPageState
	{
		return this.constructor as typeof SpacesPageState;
	}
	
	
	
	/**
	 * Returns class item
	 */
	static getClassItem(): Function
	{
		return Space;
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "spaces";
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
		name.label = "Space name";
		name.component = "Input";
		this.fields.push( deepClone(name) );
		
		/* Name field */
		let uid = new FieldInfo();
		uid.name = "uid";
		uid.label = "Space uid";
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
		
		/* Form fields */
		this.form_save.fields.push( deepClone(name) );
		this.form_save.fields.push( deepClone(uid) );
		
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
	static getItemName(item: Space | null): string
	{
		return (item) ? item.name : "";
	}
	
	
	
	/**
	 * Returns item id
	 */
	static getItemId(item: Space | null): string
	{
		return (item != null) ? String(item.id) : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	static getMessage(message_type: string, item: Space | null): string
	{
		if (message_type == "list_title")
		{
			return "Spaces";
		}
		else if (message_type == "item")
		{
			return "space";
		}
		return super.getMessage(message_type, item);
	}
}