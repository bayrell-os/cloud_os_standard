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

import { CrudItem, CrudState, FieldInfo, SelectOption } from '@/components/Crud/CrudState';
import { deepClone } from "vue-helper";


export class NginxFile extends CrudItem
{
	name: string = "";
	enable: boolean = false;
	content: string = "";
	timestamp: number = 0;
	is_deleted: boolean = false;
	gmtime_created: string = "";
	gmtime_updated: string = "";
	
	
	/**
	 * From object
	 */
	assignValues(params:Record<string, any>): NginxFile
	{
		this.name = String(params["name"] || this.name);
		this.enable = params["enable"] == 1 || params["enable"] == "true";
		this.content = String(params["content"] || this.content);
		this.timestamp = Number(params["timestamp"] || this.timestamp);
		this.is_deleted = params["is_deleted"] == 1 || params["is_deleted"] == "true";
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
			"name": this.name,
			"enable": this.enable,
			"content": this.content,
			"timestamp": this.timestamp,
			"is_deleted": this.is_deleted,
			"gmtime_created": this.gmtime_created,
			"gmtime_updated": this.gmtime_updated,
		});
	}
}



export class NginxFilesPageState extends CrudState
{
	
	/**
	 * Returns new item
	 */
	createNewItem(): NginxFile
	{
		return new NginxFile();
	}
	
	
	
	/**
	 * Returns api object name
	 */
	getApiObjectName()
	{
		return "nginx_files";
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
	getApiUrlUpdate(item: NginxFile)
	{
		return "/api/" + this.getApiObjectName() + "/crud/edit/" + encodeURIComponent(item.name) + "/";
	}
	
	
	
	/**
	 * Return api delete url
	 */
	getApiUrlDelete(item: NginxFile)
	{
		return "/api/" + this.getApiObjectName() + "/crud/delete/" + encodeURIComponent(item.name) + "/";
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
		
		/* Name field */
		let name = new FieldInfo();
		name.api_name = "name";
		name.label = "Name";
		name.component = "Input";
		name.primary = true;
		this.fields.push( deepClone(name) );
		
		/* Enable field */
		let enable = new FieldInfo();
		enable.api_name = "enable";
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
		this.form.fields.push( deepClone(name) );
		this.form.fields.push( deepClone(enable) );
		this.form.fields.push( deepClone(content) );
		
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
	getItemName(item: NginxFile | null): string
	{
		return (item) ? item.name : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: NginxFile | null): string
	{
		if (message_type == "dialog_delete_title")
		{
			return "Delete nginx file";
		}
		if (message_type == "dialog_delete_text")
		{
			return "Do you sure to delete nginx file \"" + this.getItemName(item) + "\" ?";
		}
		return super.getMessage(message_type, item);
	}
}