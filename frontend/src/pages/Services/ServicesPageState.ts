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


export class Service extends CrudItem
{
	service_id: number = 0;
	stack_name: string = "";
	service_name: string = "";
	software_api_name: string = "";
	enable: boolean = false;
	docker_name: string = "";
	gmtime_created: string = "";
	gmtime_updated: string = "";
	
	
	/**
	 * From object
	 */
	assignValues(params:Record<string, any>): Service
	{
		this.enable = params["enable"] == 1 || params["enable"] == "true";
		this.service_id = Number(params["service_id"] || this.service_id);
		this.stack_name = String(params["stack_name"] || this.stack_name);
		this.docker_name = String(params["docker_name"] || this.docker_name);
		this.service_name = String(params["service_name"] || this.service_name);
		this.software_api_name = String(params["software_api_name"] || this.software_api_name);
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
			"enable": this.enable,
			"service_id": this.service_id,
			"stack_name": this.stack_name,
			"docker_name": this.docker_name,
			"service_name": this.service_name,
			"software_api_name": this.software_api_name,
			"gmtime_created": this.gmtime_created,
			"gmtime_updated": this.gmtime_updated,
		});
	}
}



export class ServicesPageState extends CrudState
{
	
	/**
	 * Returns new item
	 */
	createNewItem(): Service
	{
		return new Service();
	}
	
	
	
	/**
	 * Returns api object name
	 */
	getApiObjectName()
	{
		return "services";
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
	getApiUrlUpdate(item: Service)
	{
		return "/api/" + this.getApiObjectName() + "/crud/edit/" + item.service_id + "/";
	}
	
	
	
	/**
	 * Return api delete url
	 */
	getApiUrlDelete(item: Service)
	{
		return "/api/" + this.getApiObjectName() + "/crud/delete/" + item.service_id + "/";
	}
	
	
	
	/**
	 * Crud init
	 */
	crudInit()
	{
		/* ID field */
		let service_id = new FieldInfo();
		service_id.api_name = "service_id";
		service_id.primary = true;
		this.fields.push( deepClone(service_id) );
		
		/* Stack name field */
		let stack_name = new FieldInfo();
		stack_name.api_name = "stack_name";
		stack_name.label = "Stack name";
		stack_name.component = "Input";
		this.fields.push( deepClone(stack_name) );
		
		/* Service name field */
		let service_name = new FieldInfo();
		service_name.api_name = "service_name";
		service_name.label = "Service name";
		service_name.component = "Input";
		this.fields.push( deepClone(service_name) );
		
		/* Software api name field */
		let software_api_name = new FieldInfo();
		software_api_name.api_name = "software_api_name";
		software_api_name.label = "Software api name";
		software_api_name.component = "Input";
		this.fields.push( deepClone(software_api_name) );
		
		/* Enable field */
		let enable = new FieldInfo();
		enable.api_name = "enable";
		enable.label = "Enable";
		enable.component = "Select";
		this.fields.push( deepClone(enable) );
		
		/* Docker name field */
		let docker_name = new FieldInfo();
		docker_name.api_name = "docker_name";
		docker_name.label = "Docker name";
		docker_name.component = "Input";
		this.fields.push( deepClone(docker_name) );
		
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
		this.form.fields.push( deepClone(enable) );
		this.form.fields.push( deepClone(docker_name) );
		this.form.fields.push( deepClone(stack_name) );
		this.form.fields.push( deepClone(service_name) );
		this.form.fields.push( deepClone(software_api_name) );
		
		/* Table fields */
		// domain_name.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(enable) );
		this.fields_table.push( deepClone(stack_name) );
		this.fields_table.push( deepClone(service_name) );
		this.fields_table.push( deepClone(software_api_name) );
		this.fields_table.push( deepClone(docker_name) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemName(item: Service | null): string
	{
		return (item) ? item.service_name : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: Service | null): string
	{
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
}