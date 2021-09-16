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

import { CrudItem, CrudState, FieldInfo } from '@/components/CrudState';
import { deepClone } from "vue-helper";


export class Route extends CrudItem
{
	id: number = 0;
	enable: boolean = false;
	protocol: string = "";
	domain_name: string = "";
	route: string = "";
	docker_name: string = "";
	target_port: number = 0;
	route_prefix: string = "";
	layer_uid: string = "";
	gmtime_created: string = "";
	gmtime_updated: string = "";
	
	
	/**
	 * From object
	 */
	assignValues(params:Record<string, any>): Route
	{
		this.id = Number(params["id"] || this.id);
		this.enable = params["enable"] == 1 || params["enable"] == "true";
		this.protocol = String(params["protocol"] || this.protocol);
		this.domain_name = String(params["domain_name"] || this.domain_name);
		this.route = String(params["route"] || this.route);
		this.docker_name = String(params["docker_name"] || this.docker_name);
		this.route_prefix = String(params["route_prefix"] || this.route_prefix);
		this.layer_uid = String(params["layer_uid"] || this.layer_uid);
		this.target_port = Number(params["target_port"] || this.target_port);
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
			"id": this.id,
			"enable": this.enable,
			"protocol": this.protocol,
			"domain_name": this.domain_name,
			"route": this.route,
			"docker_name": this.docker_name,
			"route_prefix": this.route_prefix,
			"layer_uid": this.layer_uid,
			"target_port": this.target_port,
			"gmtime_created": this.gmtime_created,
			"gmtime_updated": this.gmtime_updated,
		});
	}
}



export class RoutesPageState extends CrudState
{
	
	/**
	 * Returns new item
	 */
	createNewItem(): Route
	{
		return new Route();
	}
	
	
	
	/**
	 * Returns api object name
	 */
	getApiObjectName()
	{
		return "routes";
	}
	
	
	
	/**
	 * Return api search url
	 */
	getApiUrlSearch()
	{
		return "/api/" + this.getApiObjectName() + "/crud/search/";
	}
	
	
	
	/**
	 * Return api create url
	 */
	getApiUrlCreate()
	{
		return "/api/" + this.getApiObjectName() + "/crud/create/";
	}
	
	
	
	/**
	 * Return api update url
	 */
	getApiUrlUpdate(item: Route)
	{
		return "/api/" + this.getApiObjectName() + "/crud/edit/" + item.id + "/";
	}
	
	
	
	/**
	 * Return api delete url
	 */
	getApiUrlDelete(item: Route)
	{
		return "/api/" + this.getApiObjectName() + "/crud/delete/" + item.id + "/";
	}
	
	
	
	/**
	 * Crud init
	 */
	crudInit()
	{
		/* ID field */
		let id = new FieldInfo();
		id.api_name = "id";
		id.primary = true;
		this.fields.push( deepClone(id) );
		
		/* Domain name field */
		let domain_name = new FieldInfo();
		domain_name.api_name = "domain_name";
		domain_name.label = "Domain name";
		domain_name.component = "Input";
		domain_name.primary = true;
		this.fields.push( deepClone(domain_name) );
		
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
		this.form.fields.push( deepClone(domain_name) );
		
		/* Table fields */
		domain_name.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(domain_name) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemName(item: Route | null): string
	{
		return (item) ? item.domain_name : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: Route | null): string
	{
		if (message_type == "dialog_delete_title")
		{
			return "Delete route";
		}
		if (message_type == "dialog_delete_text")
		{
			return "Do you sure to delete route \"" + this.getItemName(item) + "\" ?";
		}
		return super.getMessage(message_type, item);
	}
}