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
import { SpaceUser } from "./SpaceUsersState";


export class SpaceRole extends CrudItem
{
	id: number;
	space_id: number;
	name: string;
	users_roles: Array<any>;
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.id = 0;
		this.space_id = 0;
		this.name = "";
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
		else if (key == "name") this.name = String(value);
		else return super.assignValue(key, value);
	}
	
}



export class SpaceRolesState extends CrudState<SpaceRole>
{
	space_id: number;
	add_user_login:string = "";
	parent_state: SpacesPageState;
	
	
	/**
	 * Returns class
	 */
	getClass(): typeof SpaceRolesState
	{
		return this.constructor as typeof SpaceRolesState;
	}
	
	
	
	/**
	 * Returns class item
	 */
	static getClassItem(): Function
	{
		return SpaceRole;
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "spaces_roles";
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
		
		/* Space ID field */
		let space_id = new FieldInfo();
		space_id.name = "space_id";
		this.fields.push( deepClone(space_id) );
		
		/* Domain name field */
		let name = new FieldInfo();
		name.name = "name";
		name.label = "Name";
		name.component = "Input";
		this.fields.push( deepClone(name) );
		
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
		
		/* Table fields */
		name.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(name) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemName(item: SpaceRole | null): string
	{
		return (item) ? item.name : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: SpaceRole | null): string
	{
		if (message_type == "list_title")
		{
			return "Roles";
		}
		else if (message_type == "item")
		{
			return "role";
		}
		return super.getMessage(message_type, item);
	}
	
	
	
	/**
	 * Add user to current role in form
	 */
	addUserToRole(user_login:string): boolean
	{
		let users = this.parent_state.users.items;
		if (users && this.form_save.item)
		{
			let user1 = users.find( (user:SpaceUser)=>{ return user.user_login == user_login; } );
			let user2 = this.form_save.item.users_roles.find(
				(user:SpaceUser)=>{ return user.user_login == user_login; }
			);
			if (user1 && !isNull(user1) && isNull(user2))
			{
				this.form_save.item.users_roles.push({
					user_id: user1.user_id,
					user_login: user1.user_login,
					user_name: user1.user_name,
					role_id: this.form_save.item.id,
				});
				return true;
			}
		}
		return false;
	}
	
	
	
	/**
	 * Remove user from current role in form
	 */
	removeUserFromRole(user_login:string): boolean
	{
		if (this.form_save.item)
		{
			let index = this.form_save.item.users_roles.findIndex(
				(user:any)=>{ return user.user_login == user_login; }
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
	 * After
	 */
	async after(kind: string, params: Record<string, any>)
	{
		await super.after(kind, params);
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