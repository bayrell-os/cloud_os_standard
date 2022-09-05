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

import { deepClone, isNull, notNull } from "vue-helper";
import { CrudItem } from "vue-helper/Crud/CrudItem";
import { CrudState, FieldInfo } from "vue-helper/Crud/CrudState";
import { SpacesPageState } from "../SpacesPageState";
import { SpaceRole } from "./SpaceRolesState";


export class SpaceUser extends CrudItem
{
	id: number;
	space_id: number;
	user_id: number;
	user_name: string;
	user_login: string;
	users_roles: Array<any>;
	
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.id = 0;
		this.space_id = 0;
		this.user_id = 0;
		this.user_name = "";
		this.user_login = "";
		this.users_roles = [];
		
		/* Init class */
		super.init(params);
	}
	
	
	
	/**
	 * Assign value
	 */
	assignValue(key:string, value:any)
	{
		if (key == "id") this.id = Number(value);
		else if (key == "space_id") this.space_id = Number(value);
		else if (key == "user_id") this.user_id = Number(value);
		else if (key == "user_login") this.user_login = String(value);
		else if (key == "user_name") this.user_name = String(value);
		else return super.assignValue(key, value);
	}
	
}



export class SpaceUsersState extends CrudState<SpaceUser>
{
	space_id: number;
	add_role_name: string = "";
	parent_state: SpacesPageState;
	
	
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
		return "spaces_users";
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
		
		/* ID field */
		let space_id = new FieldInfo();
		space_id.name = "space_id";
		this.fields.push( deepClone(space_id) );
		
		/* User id field */
		let user_id = new FieldInfo();
		user_id.name = "user_id";
		this.fields.push( deepClone(user_id) );
		
		/* User name field */
		let user_name = new FieldInfo();
		user_name.name = "user_name";
		user_name.label = "User name";
		user_name.component = "Input";
		this.fields.push( deepClone(user_name) );
		
		/* User login field */
		let user_login = new FieldInfo();
		user_login.name = "user_login";
		user_login.label = "User login";
		user_login.component = "Input";
		this.fields.push( deepClone(user_login) );
		
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
		/*
		row_buttons.component_params.buttons = [
			{
				"type": "danger",
				"action": "delete",
				"label": "Delete",
			}
		];
		*/
		/* Form fields */
		// this.form_save.fields.push( deepClone(user_name) );
		this.form_save.fields.push( deepClone(user_login) );
		
		/* Table fields */
		user_name.component = "Label";
		user_login.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(user_name) );
		this.fields_table.push( deepClone(user_login) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemName(item: SpaceUser | null): string
	{
		return (item) ? String(item.user_login) : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: SpaceUser | null): string
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
	 * Add user to current group in form
	 */
	addRoleToUser(role_name:string): boolean
	{
		let roles = this.parent_state.roles.items;
		if (roles && this.form_save.item)
		{
			let role1 = roles.find( (role:SpaceRole)=>{ return role.name == role_name; } );
			let role2 = this.form_save.item.users_roles.find(
				(role:SpaceRole)=>{ return role.name == role_name; }
			);
			if (role1 && !isNull(role1) && isNull(role2))
			{
				this.form_save.item.users_roles.push({
					user_id: this.form_save.item.id,
					user_login: this.form_save.item.user_login,
					user_name: this.form_save.item.user_name,
					role_name: role1.name,
					role_id: role1.id,
				});
				return true;
			}
		}
		return false;
	}
	
	
	
	/**
	 * Remove user from current group in form
	 */
	removeRoleFromUser(role_name:string): boolean
	{
		if (this.form_save.item)
		{
			let index = this.form_save.item.users_roles.findIndex(
				(role:any)=>{ return role.role_name == role_name; }
			);
			if (index >= 0)
			{
				this.form_save.item.users_roles.splice(index, 1);
				return true;
			}
			}
		return false;
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