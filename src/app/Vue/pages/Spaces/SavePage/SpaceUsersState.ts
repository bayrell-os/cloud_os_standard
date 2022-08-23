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

import { deepClone, notNull } from "vue-helper";
import { CrudItem } from "vue-helper/Crud/CrudItem";
import { CrudState, FieldInfo } from "vue-helper/Crud/CrudState";


export class SpaceUser extends CrudItem
{
	space_id: number;
	user_id: number;
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.space_id = 0;
		this.user_id = 0;
		
		/* Init class */
		super.init(params);
	}
	
	
	
	/**
	 * Assign value
	 */
	assignValue(key:string, value:any)
	{
		if (key == "space_id") this.space_id = Number(value);
		else if (key == "user_id") this.user_id = Number(value);
		else return super.assignValue(key, value);
	}
	
}



export class SpaceUsersState extends CrudState<SpaceUser>
{
	space_id: number;
	
	
	/**
	 * Returns class
	 */
	getClass(): typeof SpaceUsersState
	{
		return this.constructor as typeof SpaceUsersState;
	}
	
	
	
	/**
	 * Returns class item
	 */
	static getClassItem(): Function
	{
		return SpaceUser;
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "spaces_domains";
	}
	
	
	
	/**
	 * Crud init
	 */
	initCrud()
	{
		/* ID field */
		let space_id = new FieldInfo();
		space_id.name = "space_id";
		space_id.primary = true;
		this.fields.push( deepClone(space_id) );
		
		/* User id field */
		let user_id = new FieldInfo();
		user_id.name = "user_id";
		user_id.primary = true;
		this.fields.push( deepClone(user_id) );
		
		/* User name field */
		let user_name = new FieldInfo();
		user_name.name = "user_name";
		this.fields.push( deepClone(user_name) );
		
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
		//this.form_save.fields.push( deepClone(domain_name) );
		
		/* Table fields */
		user_name.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(user_name) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	static getItemName(item: SpaceUser | null): string
	{
		return (item) ? String(item.user_id) : "";
	}
	
	
	
	/**
	 * Returns item id
	 */
	static getItemId(item: SpaceUser | null): string
	{
		return (item != null) ? String(item.user_id) : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	static getMessage(message_type: string, item: SpaceUser | null): string
	{
		if (message_type == "list_title")
		{
			return "Users";
		}
		else if (message_type == "item")
		{
			return "user";
		}
		return super.getMessage(message_type, item);
	}
	
	
	
	/**
	 * Before
	 */
	async before(kind: string, params: Record<string, any>): Promise<boolean>
	{
		await super.before(kind, params);
		return true;
	}
	
	
	
	/**
	 * Process search data
	 */
	processPostData(kind: string, data: any)
	{
		data["space_id"] = this.space_id;
		return data;
	}
}