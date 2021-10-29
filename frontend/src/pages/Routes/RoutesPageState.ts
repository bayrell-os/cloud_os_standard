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
import { CrudItem, CrudState, FieldInfo, SelectOption } from "vue-helper/Crud/CrudState";


export class Route extends CrudItem
{
	id: number = 0;
	enable: boolean = false;
	protocol: string = "";
	protocol_data: any;
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
		this.protocol_data = params["protocol_data"] || this.protocol_data;
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
			"protocol_data": this.protocol_data,
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
	 * Crud init
	 */
	crudInit()
	{
		/* ID field */
		let id = new FieldInfo();
		id.api_name = "id";
		id.primary = true;
		this.fields.push( deepClone(id) );
		
		/* Protocol field */
		let protocol = new FieldInfo();
		protocol.api_name = "protocol";
		protocol.label = "Protocol";
		protocol.component = "Input";
		protocol.primary = true;
		this.fields.push( deepClone(protocol) );
		
		/* Domain name field */
		let domain_name = new FieldInfo();
		domain_name.api_name = "domain_name";
		domain_name.label = "Domain name";
		domain_name.component = "Input";
		domain_name.primary = true;
		this.fields.push( deepClone(domain_name) );
		
		/* Route field */
		let route = new FieldInfo();
		route.api_name = "route";
		route.label = "Route";
		route.component = "Input";
		route.primary = true;
		this.fields.push( deepClone(route) );
		
		/* Route prefix field */
		let route_prefix = new FieldInfo();
		route_prefix.api_name = "route_prefix";
		route_prefix.label = "Route prefix";
		route_prefix.component = "Input";
		route_prefix.primary = true;
		this.fields.push( deepClone(route_prefix) );
		
		/* Target port field */
		let target_port = new FieldInfo();
		target_port.api_name = "target_port";
		target_port.label = "Target port";
		target_port.component = "Input";
		target_port.primary = true;
		this.fields.push( deepClone(target_port) );
		
		/* Docker name field */
		let docker_name = new FieldInfo();
		docker_name.api_name = "docker_name";
		docker_name.label = "Docker name";
		docker_name.component = "Input";
		docker_name.primary = true;
		this.fields.push( deepClone(docker_name) );
		
		/* Enable field */
		let enable = new FieldInfo();
		enable.api_name = "enable";
		enable.label = "Enable";
		enable.component = "Select";
		enable.options =
		[
			new SelectOption().assignValues({"id": "0", "value": "No"}),
			new SelectOption().assignValues({"id": "1", "value": "Yes"}),
		];
		this.fields.push( deepClone(enable) );
		
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
		this.form_save.fields.push( deepClone(enable) );
		this.form_save.fields.push( deepClone(protocol) );
		this.form_save.fields.push( deepClone(docker_name) );
		this.form_save.fields.push( deepClone(route) );
		this.form_save.fields.push( deepClone(domain_name) );
		this.form_save.fields.push( deepClone(target_port) );
		this.form_save.fields.push( deepClone(route_prefix) );
		
		/* Table fields */
		enable.component = "SelectLabel";
		route.component = "Label";
		protocol.component = "Label";
		docker_name.component = "Label";
		domain_name.component = "Label";
		target_port.component = "Label";
		route_prefix.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(enable) );
		this.fields_table.push( deepClone(protocol) );
		this.fields_table.push( deepClone(docker_name) );
		this.fields_table.push( deepClone(route) );
		this.fields_table.push( deepClone(domain_name) );
		this.fields_table.push( deepClone(target_port) );
		this.fields_table.push( deepClone(route_prefix) );
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
	 * Returns item id
	 */
	getItemId(item: Route | null): string
	{
		return (item != null) ? String(item.id) : "";
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