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
import { FormState } from "modules/vue-helper/Crud/FormState";
import { deepClone, isNull, notNull, responseOk } from "vue-helper";
import { CrudItem } from "vue-helper/Crud/CrudItem";
import { CrudState, FieldInfo, SelectOption } from "vue-helper/Crud/CrudState";



export class Group extends CrudItem
{
	id: number;
	name: string;
	is_deleted: number;
	gmtime_created: string;
	gmtime_updated: string;
	users_in_groups: Array<any>;
	
	
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.id = 0;
		this.name = "";
		this.is_deleted = 0;
		this.gmtime_created = "";
		this.gmtime_updated = "";
		this.users_in_groups = [];
		
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
		else if (key == "is_deleted") this.is_deleted = Number(value);
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else return super.assignValue(key, value);
	}
	
}



export class GroupsPageState extends CrudState<Group>
{
	users:Array<any> | null = null;
	add_user_login:string = "";
	
	
	/**
	 * Returns class
	 */
	static getClass(): typeof Group
	{
		return this.constructor as typeof Group;
	}
	
	
	
	/**
	 * Returns class item
	 */
	getClassItem(): Function
	{
		return Group;
	}
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "users_groups";
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
		
		/* Name field */
		let name = new FieldInfo();
		name.name = "name";
		name.label = "Name";
		name.component = "Input";
		this.fields.push( deepClone(name) );
		
		/* Is deleted field */
		let is_deleted = new FieldInfo();
		is_deleted.name = "is_deleted";
		is_deleted.label = "Is deleted";
		is_deleted.component = "Select";
		is_deleted.options =
		[
			new SelectOption().assignValues({"id": "0", "value": "No"}),
			new SelectOption().assignValues({"id": "1", "value": "Yes"}),
		];
		this.fields.push( deepClone(is_deleted) );
		
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
		this.form_save.fields.push( deepClone(is_deleted) );
		
		/* Table fields */
		name.component = "Label";
		is_deleted.component = "SelectLabel";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(name) );
		this.fields_table.push( deepClone(is_deleted) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	static getItemName(item: Group | null): string
	{
		return item ? item.name : "";
	}
	
	
	
	/**
	 * Returns item id
	 */
	static getItemId(item: Group | null): string
	{
		return (item != null) ? String(item.id) : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	static getMessage(message_type: string, item: Group | null): string
	{
		if (message_type == "list_title")
		{
			return "Groups";
		}
		else if (message_type == "item")
		{
			return "group";
		}
		return super.getMessage(message_type, item);
	}
	
	
	
	/**
	 * Add user to current group in form
	 */
	addUserToGroup(user_name:string): boolean
	{
		if (this.users && this.form_save.item)
		{
			let user1 = this.users.find( (user:any)=>{ return user.login == user_name; } );
			let user2 = this.form_save.item.users_in_groups.find(
				(user:any)=>{ return user.login == user_name; }
			);
			if (!isNull(user1) && isNull(user2))
			{
				this.form_save.item.users_in_groups.push({
					"user_id": user1.id,
					"group_id": this.form_save.item.id,
					"login": user1.login,
					"name": user1.name,
				});
				return true;
			}
		}
		return false;
	}
	
	
	
	/**
	 * Remove user from current group in form
	 */
	removeUserFromGroup(user_name:string): boolean
	{
		if (this.form_save.item)
		{
			let index = this.form_save.item.users_in_groups.findIndex(
				(user:any)=>{ return user.login == user_name; }
			);
			if (index >= 0)
			{
				this.form_save.item.users_in_groups.splice(index);
				return true;
			}
			}
		return false;
	}
	
	
	
	/**
	 * After api
	 */
	async after(kind: string, params: Record<string, any>)
	{
		await super.after(kind, params);
		
		if (["listPageLoadData"].indexOf(kind) >= 0)
		{
			let response = params["response"] as AxiosResponse;
			if (response && responseOk(response))
			{
				this.users = response.data.result.dictionary.users;
			}
		}
		
	}
}