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

import { CrudItem, CrudState, FieldInfo } from '@/components/CrudState';
import { deepClone } from "vue-helper";


export class Application extends CrudItem
{
	id: number = 0;
	name: string = "";
	content: string = "";
	stack_name: string = "";
	gmtime_created: string = "";
	gmtime_updated: string = "";
	
	
	/**
	 * From object
	 */
	assignValues(params:Record<string, any>): Application
	{
		this.id = Number(params["id"] || this.id);
		this.name = String(params["name"] || this.name);
		this.content = String(params["content"] || this.content);
		this.stack_name = String(params["stack_name"] || this.stack_name);
		this.gmtime_created = String(params["gmtime_created"] || this.gmtime_created);
		this.gmtime_updated = String(params["gmtime_updated"] || this.gmtime_updated);
		super.assignValues(params);
		return this;
	}
	
	
	/**
	 * Returns values
	 */
	getValues(): Record<string, any>
	{
		let res: Record<string, any> = super.getValues();
		return Object.assign(res, {
			"id": this.id,
			"name": this.name,
			"content": this.content,
			"stack_name": this.stack_name,
			"gmtime_created": this.gmtime_created,
			"gmtime_updated": this.gmtime_updated,
		});
	}
}



export class ApplicationsPageState extends CrudState
{
	
	/**
	 * Returns new item
	 */
	createNewItem(): Application
	{
		return new Application();
	}
	
	
	
	/**
	 * Returns api object name
	 */
	getApiObjectName()
	{
		return "applications";
	}
	
	
	
	/**
	 * Return api search url
	 */
	getApiUrlSearch()
	{
		return "/api/" + this.getApiObjectName() + "/crud/search/";
	}
	
	
	
	/**
	 * Return api create url
	 */
	getApiUrlCreate()
	{
		return "/api/" + this.getApiObjectName() + "/crud/create/";
	}
	
	
	
	/**
	 * Return api update url
	 */
	getApiUrlUpdate(item: Application)
	{
		return "/api/" + this.getApiObjectName() + "/crud/edit/" + item.id + "/";
	}
	
	
	
	/**
	 * Return api delete url
	 */
	getApiUrlDelete(item: Application)
	{
		return "/api/" + this.getApiObjectName() + "/crud/delete/" + item.id + "/";
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
		
		/* Stack name field */
		let stack_name = new FieldInfo();
		stack_name.api_name = "stack_name";
		stack_name.label = "Stack name";
		stack_name.component = "Input";
		this.fields.push( deepClone(stack_name) );
		
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
		this.form.fields.push( deepClone(stack_name) );
		this.form.fields.push( deepClone(name) );
		this.form.fields.push( deepClone(content) );
		
		/* Table fields */
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(stack_name) );
		this.fields_table.push( deepClone(name) );
		this.fields_table.push( deepClone(content) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemName(item: Application | null): string
	{
		return (item) ? (item.stack_name + "/" + item.name) : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: Application | null): string
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