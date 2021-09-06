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

import { FieldInfo } from '@/components/Crud';
import { DialogButton, DialogState } from '@/components/Dialog/DialogState';
import { FormState } from '@/components/Form/FormState';
import axios, { AxiosResponse } from 'axios';
import type { DefineComponent } from 'vue'
import { BaseObject, deepClone } from "vue-helper";

export class Domain extends BaseObject
{
	domain_name: string = "";
	nginx_template: string = "";
	space_id: number | null = null;
	gmtime_created: string = "";
	gmtime_updated: string = "";
	
	
	/**
	 * From object
	 */
	assignValues(params:Record<string, any>): Domain
	{
		this.domain_name = String(params["domain_name"] || this.domain_name);
		this.nginx_template = String(params["nginx_template"] || this.nginx_template);
		this.space_id = this.space_id != null ?
			(Number(params["space_id"] || this.space_id)) : null;
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
		return {
			"domain_name": this.domain_name,
			"nginx_template": this.nginx_template,
			"space_id": this.space_id,
			"gmtime_created": this.gmtime_created,
			"gmtime_updated": this.gmtime_updated,
		};
	}
}


export class DomainPageState
{
	fields: Array<FieldInfo> = [];
	current_item: Domain | null = null;
	items: Array<Domain> = new Array<Domain>();
	form: FormState = new FormState();
	dialog_delete: DialogState = new DialogState();
	dialog_form: DialogState = new DialogState();
	
	
	constructor()
	{
		/* Domain name field */
		this.fields.push(new FieldInfo().assignValues({
			"api_name": "domain_name",
			"label": "Domain name",
			"component": "Input",
		}));
		
		/* Nginx template */
		this.fields.push(new FieldInfo().assignValues({
			"api_name": "nginx_template",
			"label": "Nginx template",
			"component": "TextArea",
		}));
		
		this.form.fields = this.fields.slice();
		this.form.fields = this.fields.slice();
	}
	
	
	
	/**
	 * Show form
	 */
	showForm()
	{
		this.form.clear();
		if (this.current_item != null)
		{
			this.form.item = deepClone(this.current_item);
			this.form.item_original = deepClone(this.current_item);
		}
		else
		{
			this.form.item = new Domain();
			this.form.item_original = null;
		}
		this.dialog_form.show();
	}
	
	
	
	/**
	 * Show delete
	 */
	showDelete()
	{
		if (this.current_item != null)
		{
			this.dialog_delete.show();
		}
	}
	
	
	 
	/**
	 * Find item by domain name
	 */
	findItemByDomainName(domain_name: string): Domain | null
	{
		let index = this.items.findIndex( (item) => item.domain_name == domain_name );
		if (index != -1)
		{
			return this.items[index];
		}
		return null;
	}
	
	
	
	/**
	 * Set current item
	 */
	setCurrentItem(item: Domain | null)
	{
		this.current_item = item;
	}
	
	
	
	/**
	 * Set change item
	 */
	setChangeItem(domain_name: string, item: Domain)
	{
		let index = this.items.findIndex( (item) => item.domain_name == domain_name );
		if (index != -1)
		{
			this.items[index] = item;
		}
	}
	
	
	
	/**
	 * Add new item
	 */
	addNewItem(data: any)
	{
		let item:Domain = new Domain().assignValues(data);
		this.items.unshift(item);
	}
	
	
	
	/**
	 * Delete item
	 */
	deleteItem(domain_name: string)
	{
		let index = this.items.findIndex( (item) => item.domain_name == domain_name );
		if (index != -1)
		{
			this.items.splice(index, 1);
		}
	}
	
	
	
	/**
	 * Load items
	 */
	loadItems(items: Array<any>)
	{
		for (let i = 0; i < items.length; i++)
		{
			this.items.push(new Domain().assignValues(items[i]));
		}
	}
	
	
	
	/**
	 * Load data
	 */
	static async loadData(component: DefineComponent)
	{
		let model:DomainPageState = component.model;
		
		let url = "/api/domains/crud/search/";
		let response:AxiosResponse = await axios.get(url);
		
		if (typeof(response.data) == "object" && response.data.error.code == 1)
		{
			model.items = new Array();
			model.loadItems(response.data.result.items);
		}
	}
	
	
	
	/**
	 * Save form
	 */
	static async saveForm(component: DefineComponent)
	{
		let model:DomainPageState = component.model;
		let response:AxiosResponse;
		let item:Domain = model.form.item as Domain;
		let item_original:Domain = model.form.item_original as Domain;
		
		model.form.setWaitResponse();
		
		if (item_original == null)
		{
			let url = "/api/domains/crud/create/";
			
			try
			{
				response = await axios.post(url, {"item": item});
			}
			catch (e)
			{
				response = e.response;
			}
			
			model = component.model;
			model.form.setResponse(response.data);
			
			if (response.data.error.code == 1)
			{
				model.addNewItem(response.data.result.item);
				model.dialog_form.hide();
			}
		}
		else
		{
			let url = "/api/domains/crud/edit/" + item_original.domain_name + "/";
			
			try
			{
				response = await axios.post(url, {"item": item});
			}
			catch (e)
			{
				response = e.response;
			}
			
			model = component.model;
			model.form.setResponse(response.data);
			
			if (typeof(response.data) == "object" && response.data.error.code == 1)
			{
				model.setChangeItem(item_original.domain_name, response.data.result.item);
				model.dialog_form.hide();
			}
		}
		
	}
	
	
	
	/**
	 * Delete form
	 */
	static async deleteForm(component: DefineComponent)
	{
		let model:DomainPageState = component.model;
		let response:AxiosResponse;
		let item:Domain = model.current_item as Domain;
		
		model.dialog_delete.setWaitResponse();
		
		if (item)
		{
			let url = "/api/domains/crud/delete/" + item.domain_name + "/";
			
			try
			{
				response = await axios.delete(url);
			}
			catch (e)
			{
				response = e.response;
			}
			
			model = component.model;
			model.dialog_delete.setResponse(response.data);
			
			if (typeof(response.data) == "object" && response.data.error.code == 1)
			{
				model.deleteItem(item.domain_name);
				model.dialog_delete.hide();
			}
		}
		
	}
}