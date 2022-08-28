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

import { deepClone, responseOk } from "vue-helper";
import { CrudItem } from "vue-helper/Crud/CrudItem";
import { CrudState, FieldInfo, SelectOption } from "vue-helper/Crud/CrudState";
import { DialogState } from "vue-helper/Crud/DialogState";
import axios, { AxiosResponse } from 'axios';


export class YamlFile extends CrudItem
{
	id: number;
	file_name: string;
	stack_name: string;
	content: string;
	app_status: number | null;
	timestamp: number;
	is_deleted: number;
	gmtime_created: string;
	gmtime_updated: string;
	
	
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.id = 0;
		this.file_name = "";
		this.stack_name = "";
		this.content = "";
		this.app_status = null;
		this.timestamp = 0;
		this.is_deleted = 0;
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
		else if (key == "file_name") this.file_name = String(value);
		else if (key == "stack_name") this.stack_name = String(value);
		else if (key == "content") this.content = String(value);
		else if (key == "app_status")
		{
			this.app_status = (value == 0) ? null : Number(value);
		}
		else if (key == "timestamp") this.timestamp = Number(value);
		else if (key == "is_deleted") this.is_deleted = Number(value);
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else super.assignValue(key, value);
	}
	
}



export class YamlFilesPageState extends CrudState<YamlFile>
{
	dialog_compose: DialogState<YamlFile>;
	
	
	/**
	 * Returns class
	 */
	getClass(): typeof YamlFilesPageState
	{
		return this.constructor as typeof YamlFilesPageState;
	}
	
	
	
	/**
	 * Returns class item
	 */
	static getClassItem(): Function
	{
		return YamlFile;
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "yaml_files";
	}
	
	
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.dialog_compose = new DialogState();
		
		/* Init class */
		super.init(params);
	}
	
	
	
	/**
	 * Return api search url
	 */
	static getApiUrl(api_type: string, params: Record<string, any> | null = null)
	{
		let api_name = this.getApiObjectName();
		if (api_type == "compose")
		{
			if (params)
			{
				let item = params["item"] as YamlFile;
				let id = encodeURIComponent(this.getItemId(item));
				return "/api/" + api_name + "/crud/update/" + id + "/";
			}
		}
		return super.getApiUrl(api_type, params);
	}
	
	
	
	/**
	 * Returns item id
	 */
	static getItemId(item: YamlFile | null): string
	{
		return (item != null) ? String(item.id) : "";
	}
	
	
	
	/**
	 * Returns route names
	 */
	static getRouteNames(): Record<string, string>
	{
		return {
			"list": "app:yaml_files",
			"add": "app:yaml_files:add",
			"edit": "app:yaml_files:edit",
		};
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemName(item: YamlFile | null): string
	{
		return (item) ? item.file_name : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: YamlFile | null): string
	{
		if (message_type == "list_title")
		{
			return "Yaml files";
		}
		else if (message_type == "item")
		{
			return "yaml file";
		}
		return super.getMessage(message_type, item);
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
		let file_name = new FieldInfo();
		file_name.name = "file_name";
		file_name.label = "File name";
		file_name.component = "Input";
		this.fields.push( deepClone(file_name) );
		
		/* Stack name field */
		let stack_name = new FieldInfo();
		stack_name.name = "stack_name";
		stack_name.label = "Stack name";
		stack_name.component = "Select";
		this.fields.push( deepClone(stack_name) );
		
		/* Content field */
		let content = new FieldInfo();
		content.name = "content";
		content.label = "Content";
		content.component = "CodeMirror";
		//content.component_params["min-height"] = "500px";
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
		this.form_save.fields.push( deepClone(file_name) );
		this.form_save.fields.push( deepClone(stack_name) );
		this.form_save.fields.push( deepClone(content) );
		
		/* Table fields */
		file_name.component = "Label";
		stack_name.component = "SelectLabel";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(file_name) );
		this.fields_table.push( deepClone(stack_name) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Show compose
	 */
	showCompose(item:any)
	{
		this.dialog_compose.clear();
		this.dialog_compose.setItem(item);
		this.dialog_compose.show();
	}
	
	
	
	/**
	 * Compose
	 */
	async processCompose()
	{
		let response:AxiosResponse | null = null;
		let item:YamlFile = this.dialog_compose.item as YamlFile;
		
		if (item != null)
		{
			this.dialog_compose.setWaitResponse();
			response = await this.getClass().processComposeApi(item);
			this.dialog_compose.setAxiosResponse(response);
		}
	}
	
	
	
	/**
	 * Compose active item
	 */
	static async processComposeApi(item: YamlFile): Promise<AxiosResponse | null>
	{
		let response:AxiosResponse | null = null;
		let url = this.getApiUrl("compose", item);
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
	 * After
	 */
	async after(kind: string, params: Record<string, any>)
	{
		await super.after(kind, params);
		
		if (["onLoadPageList", "onLoadPageSave"].indexOf(kind) >= 0)
		{
			let response = params["response"] as AxiosResponse;
			if (response && responseOk(response))
			{
				/* Read templates */
				this.setOptionsFromDictionary
				(
					response,
					["all"],
					"stack_name",
					"stacks",
					function (item: any)
					{
						return new SelectOption()
							.assignValues({
								"id": item["stack_name"],
								"value": item["stack_name"],
							})
						;
					}
				);
			}
		}
		
	}
}