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

import axios, { AxiosResponse, AxiosError } from "axios";
import { deepClone, notNull } from "vue-helper";
import { CrudItem } from "vue-helper/Crud/CrudItem";
import { CrudState, FieldInfo, SelectOption } from "vue-helper/Crud/CrudState";


export class Route extends CrudItem
{
	id: number;
	enable: boolean;
	protocol: string;
	protocol_data: any;
	domain_name: string;
	route_prefix: string;
	target_prefix: string;
	docker_name: string;
	source_port: number;
	target_port: number;
	layer_uid: string;
	gmtime_created: string;
	gmtime_updated: string;
	
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.id = 0;
		this.enable = true;
		this.protocol = "http";
		this.protocol_data = {"websocket": "0", "nginx_rewrite": "1"};
		this.domain_name = "";
		this.route_prefix = "/";
		this.target_prefix = "/";
		this.docker_name = "";
		this.source_port = 80;
		this.target_port = 80;
		this.layer_uid = "";
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
		else if (key == "enable") this.enable = value == "1" || value == "true";
		else if (key == "protocol") this.protocol = String(value);
		else if (key == "protocol_data")
		{
			let res = this.protocol_data;
			if (typeof value == "object" && value != null)
			{
				res["websocket"] = value.websocket || "0";
				res["nginx_rewrite"] = value.nginx_rewrite || "1";
			}
			this.protocol_data = res;
		}
		else if (key == "domain_name") this.domain_name = String(value);
		else if (key == "route_prefix") this.route_prefix = String(value);
		else if (key == "docker_name") this.docker_name = String(value);
		else if (key == "layer_uid") this.layer_uid = String(value);
		else if (key == "source_port") this.source_port = Number(value);
		else if (key == "target_port") this.target_port = Number(value);
		else if (key == "target_prefix") this.target_prefix = String(value);
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else super.assignValue(key, value);
	}
	
}



export class RoutesPageState extends CrudState<Route>
{
	
	/**
	 * Returns class
	 */
	getClass(): typeof RoutesPageState
	{
		return this.constructor as typeof RoutesPageState;
	}
	
	
	
	/**
	 * Returns class item
	 */
	static getClassItem(): Function
	{
		return Route;
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "routes";
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
		
		/* Protocol field */
		let protocol = new FieldInfo();
		protocol.name = "protocol";
		protocol.label = "Protocol";
		protocol.component = "Select";
		protocol.options = [
			new SelectOption().assignValues({ "id": "http", "value": "HTTP" }),
		];
		this.fields.push( deepClone(protocol) );
		
		/* Protocol field */
		let web_socket = new FieldInfo();
		web_socket.name = "protocol_data.websocket";
		web_socket.label = "Web socket";
		web_socket.component = "Select";
		web_socket.options = [
			new SelectOption().assignValues({ "id": 0, "value": "No" }),
			new SelectOption().assignValues({ "id": 1, "value": "Yes" }),
		];
		this.fields.push( deepClone(web_socket) );
		
		/* Nginx rewrite field */
		let nginx_rewrite = new FieldInfo();
		nginx_rewrite.name = "protocol_data.nginx_rewrite";
		nginx_rewrite.label = "Nginx rewrite";
		nginx_rewrite.component = "Select";
		nginx_rewrite.options = [
			new SelectOption().assignValues({ "id": 0, "value": "No" }),
			new SelectOption().assignValues({ "id": 1, "value": "Yes" }),
		];
		this.fields.push( deepClone(nginx_rewrite) );
		
		/* Domain name field */
		let domain_name = new FieldInfo();
		domain_name.name = "domain_name";
		domain_name.label = "Domain name";
		domain_name.component = "Select";
		domain_name.options = [];
		this.fields.push( deepClone(domain_name) );
		
		/* Route field */
		let route_prefix = new FieldInfo();
		route_prefix.name = "route_prefix";
		route_prefix.label = "Route";
		route_prefix.component = "Input";
		this.fields.push( deepClone(route_prefix) );
		
		/* Route prefix field */
		let target_prefix = new FieldInfo();
		target_prefix.name = "target_prefix";
		target_prefix.label = "Target prefix";
		target_prefix.component = "Input";
		this.fields.push( deepClone(target_prefix) );
		
		/* Target port field */
		let target_port = new FieldInfo();
		target_port.name = "target_port";
		target_port.label = "Target port";
		target_port.component = "Input";
		this.fields.push( deepClone(target_port) );
		
		/* Source field */
		let source = new FieldInfo();
		source.name = "source";
		source.label = "Source";
		source.component = "Label";
		this.fields.push( deepClone(source) );
		
		/* Dest field */
		let dest = new FieldInfo();
		dest.name = "dest";
		dest.label = "Dest";
		dest.component = "Label";
		this.fields.push( deepClone(dest) );
		
		/* Source port field */
		let source_port = new FieldInfo();
		source_port.name = "source_port";
		source_port.label = "Source port";
		source_port.component = "Input";
		this.fields.push( deepClone(source_port) );
		
		/* Docker name field */
		let docker_name = new FieldInfo();
		docker_name.name = "docker_name";
		docker_name.label = "Docker name";
		docker_name.component = "Select";
		docker_name.options = [];
		this.fields.push( deepClone(docker_name) );
		
		/* Enable field */
		let enable = new FieldInfo();
		enable.name = "enable";
		enable.label = "Enable";
		enable.component = "Select";
		enable.options =
		[
			new SelectOption().assignValues({"id": "0", "value": "No"}),
			new SelectOption().assignValues({"id": "1", "value": "Yes"}),
		];
		this.fields.push( deepClone(enable) );
		
		/* Docker name field */
		let nginx_config = new FieldInfo();
		nginx_config.name = "nginx_config";
		nginx_config.label = "Extended nginx config params";
		nginx_config.component = "TextArea";
		nginx_config.options = [];
		this.fields.push( deepClone(nginx_config) );
		
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
		this.form_save.fields.push( deepClone(enable) );
		this.form_save.fields.push( deepClone(protocol) );
		this.form_save.fields.push( deepClone(web_socket) );
		this.form_save.fields.push( deepClone(nginx_rewrite) );
		this.form_save.fields.push( deepClone(domain_name) );
		this.form_save.fields.push( deepClone(source_port) );
		this.form_save.fields.push( deepClone(route_prefix) );
		this.form_save.fields.push( deepClone(docker_name) );
		this.form_save.fields.push( deepClone(target_port) );
		this.form_save.fields.push( deepClone(target_prefix) );
		this.form_save.fields.push( deepClone(nginx_config) );
		
		/* Table fields */
		enable.component = "SelectLabel";
		route_prefix.component = "Label";
		protocol.component = "SelectLabel";
		docker_name.component = "SelectLabel";
		domain_name.component = "SelectLabel";
		source_port.component = "Label";
		target_port.component = "Label";
		target_prefix.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(enable) );
		this.fields_table.push( deepClone(protocol) );
		this.fields_table.push( deepClone(source) );
		this.fields_table.push( deepClone(dest) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemValue(index: number, name: string): any
	{
		if (this.items[index] == undefined) return "";
		let item: Route = this.items[index];
		
		if (name == "source")
		{
			return item.domain_name +
				((item.source_port != 80) ? ":" + String(item.source_port) : "") +
				((item.route_prefix != "/") ? item.route_prefix : "")
			;
		}
		if (name == "dest")
		{
			return item.docker_name +
				((item.target_port != 80) ? ":" + String(item.target_port) : "") +
				((item.target_prefix != "/") ? item.target_prefix : "")
			;
		}
		
		return super.getItemValue(index, name);
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemName(item: Route | null): string
	{
		return (item) ? item.domain_name + item.route_prefix : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: Route | null): string
	{
		if (message_type == "list_title")
		{
			return "Routes";
		}
		else if (message_type == "item")
		{
			return "route";
		}
		return super.getMessage(message_type, item);
	}
	
	
	
	/**
	 * After
	 */
	async after(kind: string, params: Record<string, any>)
	{
		await super.after(kind, params);
		
		if (kind == "onLoadPageList")
		{
			let response:AxiosResponse = params["response"] as AxiosResponse;
			
			this.setOptionsFromDictionary(
				response,
				["all"],
				"domain_name",
				"domains",
				function (domain: any)
				{
					return {
						"id": domain["domain_name"],
						"value": domain["domain_name"],
					};
				}
			);
			
			this.setOptionsFromDictionary(
				response,
				["all"],
				"docker_name",
				"services",
				function (domain: any)
				{
					return {
						"id": domain["docker_name"],
						"value": domain["docker_name"],
					};
				}
			);
		}
		
	}
}
