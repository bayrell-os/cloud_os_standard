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
import { CrudItem, CrudState, FieldInfo, SelectOption } from "vue-helper/Crud/CrudState";



export class Domain extends CrudItem
{
	id: number;
	domain_name: string;
	nginx_template: string;
	space_id: number | null;
	gmtime_created: string;
	gmtime_updated: string;
	
	
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.id = 0;
		this.domain_name = "";
		this.nginx_template = "";
		this.space_id = null;
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
		else if (key == "domain_name") this.domain_name = String(value);
		else if (key == "nginx_template") this.nginx_template = String(value);
		else if (key == "space_id") this.space_id = notNull(value) ? Number(value) : null;
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else return super.assignValue(key, value);
	}
	
}



export class DomainsPageState extends CrudState
{
	
	/**
	 * Returns new item
	 */
	static createNewItem(): Domain
	{
		return new Domain();
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "domains";
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
		
		/* Domain name field */
		let domain_name = new FieldInfo();
		domain_name.name = "domain_name";
		domain_name.label = "Domain name";
		domain_name.component = "Input";
		this.fields.push( deepClone(domain_name) );
		
		/* Space id field */
		let space_id = new FieldInfo();
		space_id.name = "space_id";
		space_id.label = "Space";
		space_id.component = "Select";
		this.fields.push( deepClone(space_id) );
		
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
		this.form_save.fields.push( deepClone(domain_name) );
		this.form_save.fields.push( deepClone(space_id) );
		
		/* Table fields */
		domain_name.component = "Label";
		space_id.component = "SelectLabel";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(domain_name) );
		this.fields_table.push( deepClone(space_id) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	static getItemName(item: Domain | null): string
	{
		return (item) ? item.domain_name : "";
	}
	
	
	
	/**
	 * Returns item id
	 */
	static getItemId(item: Domain | null): string
	{
		return (item != null) ? String(item.id) : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	static getMessage(message_type: string, item: Domain | null): string
	{
		if (message_type == "list_title")
		{
			return "Domains";
		}
		else if (message_type == "item")
		{
			return "domain";
		}
		return super.getMessage(message_type, item);
	}
	
	
	
	/**
	 * After api
	 */
	async afterApi(kind: string, response:AxiosResponse | null)
	{
		super.afterApi(kind, response);
		
		if (["listPageLoadData"].indexOf(kind) >= 0)
		{
			if (response && responseOk(response))
			{
				/* Read templates */
				this.setOptionsFromDictionary
				(
					response,
					["all"],
					"space_id",
					"spaces",
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
		
	}
}