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

import { CrudItem, CrudState, FieldInfo } from '@/components/Crud/CrudState';
import { DialogState } from '@/components/Dialog/DialogState';
import axios, { AxiosResponse } from 'axios';
import { DefineComponent } from 'vue';
import { deepClone } from "vue-helper";


export class ApplicationFile extends CrudItem
{
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
	createNewItem(): ApplicationFile
	{
		return new ApplicationFile();
	}
	
	
	
	/**
	 * Returns api object name
	 */
	getApiObjectName()
	{
		return "applications_files";
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
	getApiUrlUpdate(item: ApplicationFile)
	{
		return "/api/" + this.getApiObjectName() + "/crud/edit/" + item.file_name + "/";
	}
	
	
	
	/**
	 * Return api delete url
	 */
	getApiUrlDelete(item: ApplicationFile)
	{
		return "/api/" + this.getApiObjectName() + "/crud/delete/" + item.file_name + "/";
	}
	
	
	
	/**
	 * Return api update url
	 */
	getApiUrlCompose(item: ApplicationFile)
	{
		return "/api/" + this.getApiObjectName() + "/default/compose/" + item.file_name + "/";
	}
	
	
	 
	/**
	 * Crud init
	 */
	crudInit()
	{
		/* Name field */
		let file_name = new FieldInfo();
		file_name.api_name = "file_name";
		file_name.label = "File name";
		file_name.component = "Input";
		file_name.primary = true;
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
		this.form.fields.push( deepClone(file_name) );
		this.form.fields.push( deepClone(stack_name) );
		this.form.fields.push( deepClone(content) );
		
		/* Table fields */
		file_name.component = "Label";
		stack_name.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(file_name) );
		this.fields_table.push( deepClone(stack_name) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemName(item: ApplicationFile | null): string
	{
		return (item) ? (item.stack_name + "/" + item.file_name) : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: ApplicationFile | null): string
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
	
	
	
	/**
	 * Save active item
	 */
	static async apiSaveActiveItem(component: DefineComponent)
	{
		let model:ApplicationsFilesPageState = component.model;
		let response:AxiosResponse | null = null;
		let item:ApplicationFile = model.active_item as ApplicationFile;
		
		if (item != null)
		{
			let url = model.getApiUrlUpdate(item);
				
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
			
			if (response && response.data.error.code == 1)
			{
				item = model.createNewItemInstance(response.data.result.item) as ApplicationFile;
				model.active_item = item;
				model.active_item_pk = model.getPrimaryKeyFromItem(item);
				model.updateItem(item, response.data.result.item);
			}
		}
	}
	
	
	
	/**
	 * Compose active item
	 */
	static async apiComposeActiveItem(component: DefineComponent)
	{
		let model:ApplicationsFilesPageState = component.model;
		let response:AxiosResponse | null = null;
		let item:ApplicationFile = model.active_item as ApplicationFile;
		
		if (item != null)
		{
			model.dialog_compose.setWaitResponse();
			
			let url = model.getApiUrlCompose(item);
			
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
			
			model.dialog_compose.setAxiosResponse(response);
		}
	}
	
}