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


export class SpaceApplication extends CrudItem
{
	id: number;
	space_id: number;
	route: string;
	domain_name: string;
	docker_name: string;
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.id = 0;
		this.space_id = 0;
		this.route = "";
		this.domain_name = "";
		this.docker_name = "";
		
		/* Init class */
		super.init(params);
	}
	
	
	
	/**
	 * Assign value
	 */
	assignValue(key:string, value:any)
	{
		if (key == "id") this.id = Number(value);
		if (key == "space_id") this.space_id = Number(value);
		else if (key == "route") this.route = String(value);
		else if (key == "domain_name") this.domain_name = String(value);
		else if (key == "docker_name") this.docker_name = String(value);
		else return super.assignValue(key, value);
	}
	
}



export class SpaceApplicationsState extends CrudState<SpaceApplication>
{
	space_id: number;
	
	
	/**
	 * Returns class
	 */
	getClass(): typeof SpaceApplicationsState
	{
		return this.constructor as typeof SpaceApplicationsState;
	}
	
	
	
	/**
	 * Returns class item
	 */
	static getClassItem(): Function
	{
		return SpaceApplication;
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "spaces_applications";
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
		
		/* Domain name field */
		let domain_name = new FieldInfo();
		domain_name.name = "domain_name";
		domain_name.label = "Domain name";
		domain_name.component = "Select";
		this.fields.push( deepClone(domain_name) );
		
        /* Route field */
		let route = new FieldInfo();
		route.name = "route";
		route.label = "Route";
		route.component = "Input";
		this.fields.push( deepClone(route) );
        
        /* Docker name field */
		let docker_name = new FieldInfo();
		docker_name.name = "docker_name";
		docker_name.label = "Docker name";
		docker_name.component = "Input";
		this.fields.push( deepClone(docker_name) );
        
		/* Source port field */
		let source_port = new FieldInfo();
		source_port.name = "source_port";
		source_port.label = "Source port";
		source_port.component = "Input";
		this.fields.push( deepClone(source_port) );
		
		/* Target port field */
		let target_port = new FieldInfo();
		target_port.name = "target_port";
		target_port.label = "Target port";
		target_port.component = "Input";
		this.fields.push( deepClone(target_port) );
		
		/* Target prefix field */
		let target_prefix = new FieldInfo();
		target_prefix.name = "target_prefix";
		target_prefix.label = "Target prefix";
		target_prefix.component = "Input";
		this.fields.push( deepClone(target_prefix) );
		
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
		this.form_save.fields.push( deepClone(source_port) );
		this.form_save.fields.push( deepClone(route) );
		this.form_save.fields.push( deepClone(docker_name) );
		this.form_save.fields.push( deepClone(target_port) );
		this.form_save.fields.push( deepClone(target_prefix) );
		
		/* Table fields */
		route.component = "Label";
		source_port.component = "Label";
		domain_name.component = "SelectLabel";
		docker_name.component = "Label";
		target_port.component = "Label";
		target_prefix.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(domain_name) );
		this.fields_table.push( deepClone(source_port) );
		this.fields_table.push( deepClone(route) );
		this.fields_table.push( deepClone(docker_name) );
		this.fields_table.push( deepClone(target_port) );
		this.fields_table.push( deepClone(target_prefix) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	static getItemName(item: SpaceApplication | null): string
	{
		return (item) ? item.domain_name : "";
	}
	
	
	
	/**
	 * Returns item id
	 */
	static getItemId(item: SpaceApplication | null): string
	{
		return (item != null) ? String(item.domain_name) : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	static getMessage(message_type: string, item: SpaceApplication | null): string
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