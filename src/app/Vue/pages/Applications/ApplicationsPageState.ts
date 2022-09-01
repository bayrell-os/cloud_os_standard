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

import { AxiosResponse } from "axios";
import { deepClone, notNull, responseOk } from "vue-helper";
import { CrudItem } from "vue-helper/Crud/CrudItem";
import { CrudState, FieldInfo, SelectOption } from "vue-helper/Crud/CrudState";
import { Template } from "../Templates/TemplatesListPageState";


export class Application extends CrudItem
{
	id: number;
	template_id: number;
	name: string;
	stack_name: string;
	yaml: string;
	status: number;
	content: string;
	custom_patch: string;
	template: Template | null;
	variables: Array<any>;
	environments: Array<any>;
	modificators: Array<number>;
	volumes: Array<number>;
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
		this.stack_name = "";
		this.yaml = "";
		this.status = 0;
		this.content = "";
		this.custom_patch = "";
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
		else if (key == "stack_name") this.stack_name = String(value);
		else if (key == "status") this.status = Number(value);
		else if (key == "yaml") this.yaml = String(value);
		else if (key == "content") this.content = String(value);
		else if (key == "custom_patch") this.custom_patch = String(value);
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else if (key == "template")
		{
			this.template = (value) ? new Template(value) : null;
		}
		else if (key == "modificators")
			this.modificators = value.map
			(
				(item: any) => { return Number(item); }
			);
		else super.assignValue(key, value);
	}
	
}



export class ApplicationsPageState extends CrudState<Application>
{
	
	/**
	 * Returns class
	 */
	getClass(): typeof ApplicationsPageState
	{
		return this.constructor as typeof ApplicationsPageState;
	}
	
	
	
	/**
	 * Returns class item
	 */
	static getClassItem(): Function
	{
		return Application;
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
			"list": "app:applications",
			"edit": "app:applications:edit",
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
		
		/* Status */
		let status = new FieldInfo();
		status.name = "status";
		status.label = "Status";
		status.component = "Select";
		status.options = [
			new SelectOption().assignValues({ "id": 1, "value": "Started" }),
			new SelectOption().assignValues({ "id": 0, "value": "Stopped" }),
			// new SelectOption().assignValues({ "id": 2, "value": "STARTS UP" }),
		];
		this.fields.push( deepClone(status) );
		
		/* Stack name field */
		let stack_name = new FieldInfo();
		stack_name.name = "stack_name";
		stack_name.label = "Stack name";
		stack_name.component = "Input";
		this.fields.push( deepClone(stack_name) );
		
		/* Name field */
		let name = new FieldInfo();
		name.name = "name";
		name.label = "App name";
		name.component = "Input";
		this.fields.push( deepClone(name) );
		
		/* Name field */
		let service_name = new FieldInfo();
		service_name.name = "service_name";
		service_name.label = "Service name";
		service_name.component = "Input";
		this.fields.push( deepClone(service_name) );
		
		/* Content field */
		let content = new FieldInfo();
		content.name = "content";
		content.label = "Content";
		content.component = "TextArea";
		this.fields.push( deepClone(content) );
		
		/* Template field */
		let template_name = new FieldInfo();
		template_name.name = "template_name";
		template_name.label = "Template name";
		template_name.component = "Label";
		this.fields.push( deepClone(template_name) );
		
		/* Template version field */
		let template_version = new FieldInfo();
		template_version.name = "template_version";
		template_version.label = "Template version";
		template_version.component = "Label";
		this.fields.push( deepClone(template_version) );
		
		/* Template field */
		let template_id = new FieldInfo();
		template_id.name = "template_id";
		template_id.label = "Template";
		template_id.component = "Select";
		this.fields.push( deepClone(template_id) );
		
		/* Template version field */
		let template_version_id = new FieldInfo();
		template_version_id.name = "template_version_id";
		template_version_id.label = "Template version";
		template_version_id.component = "Select";
		this.fields.push( deepClone(template_version_id) );
		
		/* Admin button */
		let admin_button = new FieldInfo();
		admin_button.name = "have_admin";
		admin_button.label = "Admin";
		admin_button.component = "ApplicationAdminButton";
		
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
		this.form_save.fields.push( deepClone(stack_name) );
		this.form_save.fields.push( deepClone(template_id) );
		this.form_save.fields.push( deepClone(template_version_id) );
		
		/* Table fields */
		name.component = "Label";
		stack_name.component = "Label";
		service_name.component = "Label";
		status.component = "SelectLabel";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(service_name) );
		this.fields_table.push( deepClone(status) );
		this.fields_table.push( deepClone(template_name) );
		this.fields_table.push( deepClone(template_version) );
		this.fields_table.push( deepClone(admin_button) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemName(item: Application | null): string
	{
		return (item) ? item.name : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: Application | null): string
	{
		if (message_type == "list_title")
		{
			return "Applications";
		}
		else if (message_type == "item")
		{
			return "application";
		}
		return super.getMessage(message_type, item);
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
					"template_id",
					"templates",
					function (item: any)
					{
						return new SelectOption()
							.assignValues({
								"id": item["id"],
								"value": item["name"],
							})
						;
					}
				);
			}
		}
		
		if (["onLoadPageSave"].indexOf(kind) >= 0)
		{
			let response = params["response"] as AxiosResponse;
			if (response && responseOk(response))
			{
				/* Read templates */
				this.setOptionsFromDictionary
				(
					response,
					["all"],
					"template_version_id",
					"templates_versions",
					function (item: any)
					{
						return new SelectOption()
							.assignValues({
								"id": item["id"],
								"value": item["version"],
							})
						;
					}
				);
			}			
		}
	}
	
	
	
	/**
	 * Reload template versions
	 */
	async reloadTemplatesVersions()
	{
		if (!this.form_save.item) return;
		
		let template_id: number = Number(this.form_save.item.template_id);
		
		if (template_id == 0) return;
		/*
		let response:AxiosResponse | null = await TemplatesViewPageState.processLoadListApi({
			"template_id": template_id,
		});
		
		if (response && responseOk(response) && notNull(response.data.result.items))
		{
			let items: any = response.data.result.items.map
			(
				function (item: any)
				{
					return {
						"id": item["id"],
						"value": item["version"],
					};
				}
			);
			this.editField(["all"], "template_version_id", (field: FieldInfo) => {
				field.options = deepClone(items);
			});
		}
		*/
	}
	
}