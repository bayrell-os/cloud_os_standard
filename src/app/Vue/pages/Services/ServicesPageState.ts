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

import axios, { AxiosResponse } from "axios";
import { deepClone } from "vue-helper";
import { CrudResultState } from "vue-helper/Crud/CrudResultState";
import { CrudButton, CrudItem, CrudState, FieldInfo, SelectOption } from "vue-helper/Crud/CrudState";
import { DialogState } from "vue-helper/Crud/DialogState";



export class Service extends CrudItem
{
	service_id: number;
	stack_name: string;
	service_name: string;
	software_api_name: string;
	enable: boolean;
	docker_name: string;
	docker_image: string;
	docker_json: any;
	docker_balancer: any;
	docker_tasks: any;
	gmtime_created: string;
	gmtime_updated: string;
	
	
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.service_id = 0;
		this.stack_name = "";
		this.service_name = "";
		this.software_api_name = "";
		this.enable = false;
		this.docker_name = "";
		this.docker_image = "";
		this.docker_json = null;
		this.docker_balancer = null;
		this.docker_tasks = null;
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
		if (key == "enable") this.enable = value == "1" || value == "true";
		else if (key == "service_id") this.service_id = Number(value);
		else if (key == "stack_name") this.stack_name = String(value);
		else if (key == "docker_name") this.docker_name = String(value);
		else if (key == "docker_image") this.docker_image = String(value);
		else if (key == "service_name") this.service_name = String(value);
		else if (key == "software_api_name") this.software_api_name = String(value);
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else return super.assignValue(key, value);
	}
	
}



export class ServicesPageState extends CrudState
{
	dialog_stop: DialogState = new DialogState();
	refresh_state: CrudResultState = new CrudResultState();
	
	
	/**
	 * Returns new item
	 */
	static createNewItem(): Service
	{
		return new Service();
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "services";
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemValue(index: number, api_name: string): any
	{
		if (this.items[index] == undefined) return "";
		let item: Service = this.items[index] as Service;
		
		if (api_name == "docker_image")
		{
			let docker_image: string = item.docker_image;
			let pos: number = docker_image.search("@");
			if (pos != -1) docker_image = docker_image.substring(0, pos)
			return docker_image;
		}
		
		if (api_name == "replicas")
		{
			let work: number = Number(item.docker_balancer["State"]["Work"]);
			let total: number = Number(item.docker_balancer["State"]["Total"]);
			return work + " / " + total;
		}
		
		return super.getItemValue(index, api_name);
	}
	
	
	
	/**
	 * Crud init
	 */
	crudInit()
	{
		/* ID field */
		let service_id = new FieldInfo();
		service_id.name = "service_id";
		service_id.primary = true;
		this.fields.push( deepClone(service_id) );
		
		/* Stack name field */
		let stack_name = new FieldInfo();
		stack_name.name = "stack_name";
		stack_name.label = "Stack name";
		stack_name.component = "Input";
		this.fields.push( deepClone(stack_name) );
		
		/* Service name field */
		let service_name = new FieldInfo();
		service_name.name = "service_name";
		service_name.label = "Service name";
		service_name.component = "Input";
		this.fields.push( deepClone(service_name) );
		
		/* Software api name field */
		let software_api_name = new FieldInfo();
		software_api_name.name = "software_api_name";
		software_api_name.label = "Software api name";
		software_api_name.component = "Input";
		this.fields.push( deepClone(software_api_name) );
		
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
		let docker_name = new FieldInfo();
		docker_name.name = "docker_name";
		docker_name.label = "Docker name";
		docker_name.component = "Input";
		this.fields.push( deepClone(docker_name) );
		
		/* Docker name field */
		let docker_image = new FieldInfo();
		docker_image.name = "docker_image";
		docker_image.label = "Docker image";
		docker_image.component = "Input";
		this.fields.push( deepClone(docker_image) );
		
		/* Replicas field */
		let replicas = new FieldInfo();
		replicas.name = "replicas";
		replicas.label = "Replicas";
		this.fields.push( deepClone(replicas) );
		
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
		row_buttons.component_params["buttons"] = [
			new CrudButton().assignValues({ "type": "danger", "label": "Stop", "action": "stop" })
		];
		
		/* Form save fields */
		this.form_save.fields.push( deepClone(docker_name) );
		this.form_save.fields.push( deepClone(stack_name) );
		this.form_save.fields.push( deepClone(service_name) );
		this.form_save.fields.push( deepClone(enable) );
		
		/* Table fields */
		enable.component = "SelectLabel";
		replicas.component = "Label";
		docker_name.component = "Label";
		docker_image.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(docker_name) );
		this.fields_table.push( deepClone(docker_image) );
		this.fields_table.push( deepClone(replicas) );
		this.fields_table.push( deepClone(enable) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	static getItemName(item: Service | null): string
	{
		return (item) ? item.service_name : "";
	}
	
	
	
	/**
	 * Returns item id
	 */
	static getItemId(item: Service | null): string
	{
		return (item != null) ? String(item.service_id) : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	static getMessage(message_type: string, item: Service | null): string
	{
		if (message_type == "dialog_stop_title")
		{
			return "Stop service";
		}
		if (message_type == "dialog_stop_text")
		{
			return "Do you sure to stop service \"" + this.getItemName(item) + "\" ?";
		}
		if (message_type == "dialog_delete_title")
		{
			return "Delete service";
		}
		if (message_type == "dialog_delete_text")
		{
			return "Do you sure to delete service \"" + this.getItemName(item) + "\" ?";
		}
		return super.getMessage(message_type, item);
	}
	
	
	
	/**
	 * Return api search url
	 */
	static getApiUrlSearch(refresh: boolean = false)
	{
		if (refresh)
			return "/api/" + this.getApiObjectName() + "/crud/search/?refresh=1";
		return "/api/" + this.getApiObjectName() + "/crud/search/";
	}
	
	
	
	/**
	 * Load data api
	 */
	static async apiLoadData(refresh: boolean = false): Promise<AxiosResponse | null>
	{
		let url = this.getApiUrlSearch(refresh);
		let response:AxiosResponse | null = null;
		
		try
		{
			response = await axios.get(url);
		}
		catch (e)
		{
			if (axios.isAxiosError(e))
			{
				response = e["response"] as AxiosResponse;
			}
		}
		
		return response;
	}
	
	
	
	/**
	 * Refresh
	 */
	async doRefresh()
	{
		let res:boolean = await this.beforeApi("refresh");
		if (!res) return;
		
		/* Ajax request */
		this.refresh_state.setWaitResponse();
		let response:AxiosResponse | null = await (this.constructor as any).apiLoadData(true);
		this.refresh_state.setAxiosResponse(response);
		
		/* Set result */
		this.items = new Array();
		if (response && typeof(response.data) == "object" && response.data.error.code == 1)
		{
			this.addItems(response.data.result.items);
			
			let index:number = (this.active_item_pk) ?
				this.findItemByPrimaryKey(this.active_item_pk) : -1;
			if (index >= 0)
			{
				this.setActiveItem( this.items[index] );
			}
			
		}
		
		await this.afterApi("refresh", response);
	}
	
	
	
	/**
	 * Return api stop url
	 */
	static getApiUrlStop(item: Service)
	{
		return "/api/" + this.getApiObjectName() + "/stop/" +
			encodeURIComponent(this.getItemId(item)) + "/";
	}
	
	
	
	/**
	 * Show stop form
	 */
	showStopForm(item:CrudState)
	{
		this.dialog_stop.clear();
		this.dialog_stop.setItem(item);
		this.dialog_stop.show();
	}
	
	
	
	/**
	 * Stop form
	 */
	async doStopForm()
	{
		let item:Service = this.dialog_stop.item as Service;
		
		let res:boolean = await this.beforeApi("onStopForm");
		if (!res) return;
		
		this.dialog_stop.setWaitResponse();
		let response:AxiosResponse | null = await (this.constructor as any).apiStopForm(item);
		this.dialog_stop.setAxiosResponse(response);
		
		if (item && response && typeof(response.data) == "object" && response.data.error.code == 1)
		{
			this.deleteItem(item);
			/*model.updateItem(item, response.data.result.item);*/
			this.dialog_stop.hide();
		}
		
		await this.afterApi("onStopForm", response);
	}
	
	
	
	/**
	 * Stop form api
	 */
	static async apiStopForm(item:Service): Promise<AxiosResponse | null>
	{
		let response:AxiosResponse | null = null;
		
		if (item)
		{
			let url = this.getApiUrlStop(item);
			
			try
			{
				response = await axios.post(url);
			}
			catch (e)
			{
				if (axios.isAxiosError(e))
				{
					response = e["response"] as AxiosResponse;
				}
			}
		}
		
		return response;
	}
}