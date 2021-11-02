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

import { DefineComponent } from 'vue';
import { deepClone } from "vue-helper";
import { CrudItem, CrudState, FieldInfo } from "vue-helper/Crud/CrudState";
import { DialogState } from "vue-helper/Crud/DialogState";
import axios, { AxiosResponse } from 'axios';


export class ApplicationFile extends CrudItem
{
	id: number = 0;
	file_name: string = "";
	stack_name: string = "";
	content: string = "";
	app_status: number | null = null;
	timestamp: number = 0;
	is_deleted: number = 0;
	gmtime_created: string = "";
	gmtime_updated: string = "";
	
	
	/**
	 * From object
	 */
	assignValues(params:Record<string, any>): ApplicationFile
	{
		this.id = Number(params["id"] || this.id);
		this.file_name = String(params["file_name"] || this.file_name);
		this.stack_name = String(params["stack_name"] || this.stack_name);
		this.content = String(params["content"] || this.content);
		this.app_status = Number(params["app_status"] || this.app_status);
		if (this.app_status == 0) this.app_status = null;
		this.timestamp = Number(params["timestamp"] || this.timestamp);
		this.is_deleted = Number(params["is_deleted"] || this.is_deleted);
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
			"file_name": this.file_name,
			"stack_name": this.stack_name,
			"content": this.content,
			"app_status": this.app_status,
			"timestamp": this.timestamp,
			"is_deleted": this.is_deleted,
			"gmtime_created": this.gmtime_created,
			"gmtime_updated": this.gmtime_updated,
		});
	}
}



export class ApplicationsFilesPageState extends CrudState
{
	dialog_compose: DialogState = new DialogState();
	
	
	/**
	 * Returns new item
	 */
	static createNewItem(): ApplicationFile
	{
		return new ApplicationFile();
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "applications_files";
	}
	
	
	
	/**
	 * Returns item id
	 */
	static getItemId(item: ApplicationFile | null): string
	{
		return (item != null) ? String(item.id) : "";
	}
	
	
	
	/**
	 * Return api update url
	 */
	static getApiUrlCompose(item: ApplicationFile)
	{
		return "/api/" + this.getApiObjectName() + "/default/compose/" + encodeURIComponent(this.getItemId(item)) + "/";
	}
	
	
	
	/**
	 * Returns route names
	 */
	static getRouteNames(): Record<string, string>
	{
		return {
			"list": "app:applications:files",
			"add": "app:applications:files:add",
			"edit": "app:applications:files:edit",
		};
	}
	
	
	
	/**
	 * Returns form value
	 */
	static getItemName(item: ApplicationFile | null): string
	{
		return (item) ? item.file_name : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	static getMessage(message_type: string, item: ApplicationFile | null): string
	{
		if (message_type == "list_title")
		{
			return "Files";
		}
		else if (message_type == "add_title")
		{
			return "Add file";
		}
		else if (message_type == "edit_title")
		{
			if (item != null)
			{
				return "Edit file " + this.getItemName(item);
			}
			return "Edit file";
		}
		else if (message_type == "delete_title")
		{
			return "Delete file";
		}
		else if (message_type == "delete_text")
		{
			return "Do you sure to delete \"" + this.getItemName(item) + "\" ?";
		}
		else if (message_type == "top_button_show_add_title")
		{
			return "Add";
		}
		return super.getMessage(message_type, item);
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
		let file_name = new FieldInfo();
		file_name.api_name = "file_name";
		file_name.label = "File name";
		file_name.component = "Input";
		this.fields.push( deepClone(file_name) );
		
		/* Stack name field */
		let stack_name = new FieldInfo();
		stack_name.api_name = "stack_name";
		stack_name.label = "Stack name";
		stack_name.component = "Input";
		this.fields.push( deepClone(stack_name) );
		
		/* Content field */
		let content = new FieldInfo();
		content.api_name = "content";
		content.label = "Content";
		content.component = "CodeMirror";
		//content.component_params["min-height"] = "500px";
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
		this.form_save.fields.push( deepClone(file_name) );
		this.form_save.fields.push( deepClone(stack_name) );
		this.form_save.fields.push( deepClone(content) );
		
		/* Table fields */
		file_name.component = "Label";
		stack_name.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(file_name) );
		this.fields_table.push( deepClone(stack_name) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Compose active item
	 */
	static async apiCompose(item: ApplicationFile): Promise<AxiosResponse | null>
	{
		let response:AxiosResponse | null = null;
		let url = this.getApiUrlCompose(item);
		try
		{
			response = await axios.post(url, {"item": {"content": item.content}});
		}
		catch (e)
		{
			if (axios.isAxiosError(e))
			{
				response = e["response"] as AxiosResponse;
			}
		}
		return response;
	}
	
	
	
	/**
	 * Compose active item
	 */
	static async onCompose(component: DefineComponent)
	{
		let model:ApplicationsFilesPageState = component.model;
		let response:AxiosResponse | null = null;
		let item:ApplicationFile = model.active_item as ApplicationFile;
		
		if (item != null)
		{
			model.dialog_compose.setWaitResponse();
			response = await this.apiCompose(item);
			model.dialog_compose.setAxiosResponse(response);
		}
	}
	
}