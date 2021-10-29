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

import { deepClone } from "vue-helper";
import { CrudItem, CrudState, FieldInfo } from "vue-helper/Crud/CrudState";



export class Domain extends CrudItem
{
	domain_name: string = "";
	nginx_template: string = "";
	space_id: number | null = null;
	gmtime_created: string = "";
	gmtime_updated: string = "";
	
	
	/**
	 * From object
	 */
	assignValues(params:Record<string, any>): Domain
	{
		this.domain_name = String(params["domain_name"] || this.domain_name);
		this.nginx_template = String(params["nginx_template"] || this.nginx_template);
		this.space_id = this.space_id != null ?
			(Number(params["space_id"] || this.space_id)) : null;
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
			"domain_name": this.domain_name,
			"nginx_template": this.nginx_template,
			"space_id": this.space_id,
			"gmtime_created": this.gmtime_created,
			"gmtime_updated": this.gmtime_updated,
		});
	}
}



export class DomainsPageState extends CrudState
{
	
	/**
	 * Returns new item
	 */
	createNewItem(): Domain
	{
		return new Domain();
	}
	
	
	
	/**
	 * Returns api object name
	 */
	getApiObjectName()
	{
		return "domains";
	}
	
	
	
	/**
	 * Crud init
	 */
	crudInit()
	{
		/* Domain name field */
		let domain_name = new FieldInfo();
		domain_name.api_name = "domain_name";
		domain_name.label = "Domain name";
		domain_name.component = "Input";
		domain_name.primary = true;
		this.fields.push( deepClone(domain_name) );
		
		/* Nginx template */
		let nginx_template = new FieldInfo();
		nginx_template.api_name = "nginx_template";
		nginx_template.label = "Nginx template";
		nginx_template.component = "TextArea";
		this.fields.push( deepClone(nginx_template) );
		
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
		this.form_save.fields.push( deepClone(domain_name) );
		this.form_save.fields.push( deepClone(nginx_template) );
		
		/* Table fields */
		domain_name.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(domain_name) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemName(item: Domain | null): string
	{
		return (item) ? item.domain_name : "";
	}
	
	
	
	/**
	 * Returns item id
	 */
	getItemId(item: Domain | null): string
	{
		return (item != null) ? item.domain_name : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: Domain | null): string
	{
		if (message_type == "dialog_delete_title")
		{
			return "Delete domain";
		}
		if (message_type == "dialog_delete_text")
		{
			return "Do you sure to delete domain \"" + this.getItemName(item) + "\" ?";
		}
		return super.getMessage(message_type, item);
	}
}