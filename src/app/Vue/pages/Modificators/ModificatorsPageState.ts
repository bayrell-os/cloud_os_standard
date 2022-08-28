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
import { CrudState, FieldInfo } from "vue-helper/Crud/CrudState";



export class Modificator extends CrudItem
{
	id: number = 0;
	name: string = "";
	content: string = "";
	priority: number = 0;
	gmtime_created: string = "";
	gmtime_updated: string = "";
	
	
	/**
	 * Assign value
	 */
	assignValue(key:string, value:any)
	{
		if (key == "id") this.id = Number(value);
		else if (key == "name") this.name = String(value);
		else if (key == "content") this.content = String(value);
		else if (key == "priority") this.priority = Number(value);
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else super.assignValue(key, value);
	}
	
}



export class ModificatorsPageState extends CrudState<Modificator>
{
	
	/**
	 * Returns class
	 */
	getClass(): typeof ModificatorsPageState
	{
		return this.constructor as typeof ModificatorsPageState;
	}
	
	
	
	/**
	 * Returns class item
	 */
	static getClassItem(): Function
	{
		return Modificator;
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "modificators";
	}
	
	
	
	/**
	 * Returns route names
	 */
	static getRouteNames(): Record<string, string>
	{
		return {
			"list": "app:modificators",
			"add": "app:modificators:add",
			"edit": "app:modificators:edit",
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
		
		/* UID field */
		let uid = new FieldInfo();
		uid.name = "uid";
		uid.label = "uid";
		uid.component = "Input";
		this.fields.push( deepClone(uid) );
		
		/* Name field */
		let name = new FieldInfo();
		name.name = "name";
		name.label = "name";
		name.component = "Input";
		this.fields.push( deepClone(name) );
		
		/* Version field */
		let version = new FieldInfo();
		version.name = "version";
		version.label = "version";
		version.component = "Input";
		this.fields.push( deepClone(version) );
		
		/* Content field */
		let content = new FieldInfo();
		content.name = "content";
		content.label = "Content";
		content.component = "CodeMirror";
		content.component_params["lang"] = "xml";
		this.fields.push( deepClone(content) );
		
		/* Priority field */
		let priority = new FieldInfo();
		priority.name = "priority";
		priority.label = "Priority";
		priority.component = "Input";
		this.fields.push( deepClone(priority) );
		
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
		/* this.form_save.fields.push( deepClone(name) );*/
		this.form_save.fields.push( deepClone(content) );
		
		/* Table fields */
		uid.component = "Label";
		name.component = "Label";
		version.component = "Label";
		priority.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(name) );
		this.fields_table.push( deepClone(uid) );
		this.fields_table.push( deepClone(version) );
		this.fields_table.push( deepClone(priority) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	static getItemName(item: Modificator | null): string
	{
		return (item) ? item.name : "";
	}
	
	
	
	/**
	 * Returns item id
	 */
	static getItemId(item: Modificator | null): string
	{
		return (item != null) ? String(item.id) : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	static getMessage(message_type: string, item: Modificator | null): string
	{
		if (message_type == "list_title")
		{
			return "Modificators";
		}
		else if (message_type == "item")
		{
			return "modificator";
		}
		return super.getMessage(message_type, item);
	}
	
	
}