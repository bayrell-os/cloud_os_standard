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

import { deepClone, notNull, responseOk } from "vue-helper";
import { CrudItem } from "vue-helper/Crud/CrudItem";
import { CrudState, FieldInfo, SelectOption } from "vue-helper/Crud/CrudState";



export class DomainSSLGroup extends CrudItem
{
	id: number;
	name: string;
	public_key: string;
	private_key: string;
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
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else return super.assignValue(key, value);
	}
	
}



export class DomainsSSLGroupPageState extends CrudState<DomainSSLGroup>
{
	
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
		
		/* Form fields */
		this.form_save.fields.push( deepClone(name) );
		this.form_save.fields.push( deepClone(public_key) );
		this.form_save.fields.push( deepClone(private_key) );
		
		/* Table fields */
		name.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(name) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	static getItemName(item: DomainSSLGroup | null): string
	{
		return (item) ? item.name : "";
	}
	
	
	
	/**
	 * Returns item id
	 */
	static getItemId(item: DomainSSLGroup | null): string
	{
		return (item != null) ? String(item.id) : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	static getMessage(message_type: string, item: DomainSSLGroup | null): string
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
	}
}