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
import { DialogState } from "vue-helper/Crud/DialogState";
import { deepClone, notNull, responseOk } from "vue-helper";
import { CrudItem } from "vue-helper/Crud/CrudItem";
import { CrudButton, CrudState, FieldInfo, SelectOption } from "vue-helper/Crud/CrudState";



export class DomainSSLGroup extends CrudItem
{
	id: number;
	name: string;
	public_key: string;
	private_key: string;
	container_name: string;
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
		this.public_key = "";
		this.private_key = "";
		this.container_name = "";
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
		else if (key == "public_key") this.public_key = String(value);
		else if (key == "private_key") this.private_key = String(value);
		else if (key == "container_name") this.container_name = String(value);
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else return super.assignValue(key, value);
	}
	
}



export class DomainsSSLGroupPageState extends CrudState<DomainSSLGroup>
{
	dialog_generate: DialogState<CrudItem>;
	
	
	/**
	 * Returns class
	 */
	getClass(): typeof DomainsSSLGroupPageState
	{
		return this.constructor as typeof DomainsSSLGroupPageState;
	}
	
	
	
	/**
	 * Returns class item
	 */
	static getClassItem(): Function
	{
		return DomainSSLGroup;
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "domains_ssl_groups";
	}
	
	
	
	/**
	 * Crud init
	 */
	initCrud()
	{
		this.dialog_generate = new DialogState();
		
		/* ID field */
		let id = new FieldInfo();
		id.name = "id";
		id.primary = true;
		this.fields.push( deepClone(id) );
		
		/* Domain name field */
		let name = new FieldInfo();
		name.name = "name";
		name.label = "Name";
		name.component = "Input";
		this.fields.push( deepClone(name) );
		
		/* Container name field */
		let container_name = new FieldInfo();
		container_name.name = "container_name";
		container_name.label = "SSL container name";
		container_name.component = "Select";
		container_name.options = [];
		this.fields.push( deepClone(container_name) );
		
		/* Public key field */
		let public_key = new FieldInfo();
		public_key.name = "public_key";
		public_key.label = "Public key";
		public_key.component = "TextArea";
		this.fields.push( deepClone(public_key) );
		
		/* Private key field */
		let private_key = new FieldInfo();
		private_key.name = "private_key";
		private_key.label = "Private key";
		private_key.component = "TextArea";
		this.fields.push( deepClone(private_key) );
		
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
				"label": "Generate",
				"action": "generate"
			}),
			new CrudButton().assignValues({
				"type": "default",
				"label": "Edit",
				"action": "edit"
			}),
			new CrudButton().assignValues({
				"type": "danger",
				"label": "Delete",
				"action": "delete"
			})
		];
		
		/* Form fields */
		this.form_save.fields.push( deepClone(name) );
		this.form_save.fields.push( deepClone(container_name) );
		//this.form_save.fields.push( deepClone(public_key) );
		//this.form_save.fields.push( deepClone(private_key) );
		
		/* Table fields */
		name.component = "Label";
		container_name.component = "SelectLabel";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(name) );
		this.fields_table.push( deepClone(container_name) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemName(item: DomainSSLGroup | null): string
	{
		return (item) ? item.name : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: DomainSSLGroup | null): string
	{
		if (message_type == "list_title")
		{
			return "Domains SSL Group";
		}
		else if (message_type == "item")
		{
			return "domain SSL Group";
		}
		return super.getMessage(message_type, item);
	}
	
	
	
	/**
	 * After
	 */
	async after(kind: string, params: Record<string, any>)
	{
		await super.after(kind, params);
		
		if (kind == "onLoadPageList")
		{
			let response:AxiosResponse = params["response"] as AxiosResponse;
			
			this.setOptionsFromDictionary(
				response,
				["all"],
				"container_name",
				"services",
				function (domain: any)
				{
					return {
						"id": domain["docker_name"],
						"value": domain["docker_name"],
					};
				}
			);
		}
	}
}