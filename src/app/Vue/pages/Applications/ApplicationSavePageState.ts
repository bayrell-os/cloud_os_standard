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
import { ModificatorsPageState, Modificator } from "../Modificators/ModificatorsPageState";
import { ApplicationsPageState, Application } from "./ApplicationsPageState";
import { CrudResultState } from "vue-helper/Crud/CrudResultState";
import { DialogState } from "vue-helper/Crud/DialogState";
import { CrudState } from "vue-helper/Crud/CrudState";
import { deepClone, isNull } from "vue-helper";



export class ApplicationSavePageState extends ApplicationsPageState
{
	dialog_add_modificator: DialogState<Application>;
	dialog_view_modificator: DialogState<Application>;
	dialog_delete_modificator: DialogState<Application>;
	dialog_save_app: DialogState<Application>;
	dialog_compose_app: DialogState<Application>;
	dialog_stop_app: DialogState<Application>;
	select_add_modificator_id: any;
	compose_result: CrudResultState;
	
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.dialog_add_modificator = new DialogState();
		this.dialog_view_modificator = new DialogState();
		this.dialog_delete_modificator = new DialogState();
		this.dialog_save_app = new DialogState();
		this.dialog_compose_app = new DialogState();
		this.dialog_stop_app = new DialogState();
		this.select_add_modificator_id = 0;
		this.compose_result = new CrudResultState();
		
		/* Init class */
		super.init(params);
	}
	
	
	
	/**
	 * Crud init
	 */
	initCrud()
	{
		super.initCrud();
		
		let name = this.getFieldByName("name");
		let status = this.getFieldByName("status");
		let stack_name = this.getFieldByName("stack_name");
		let template_id = this.getFieldByName("template_id");
		let template_version_id = this.getFieldByName("template_version_id");
		
		/* Form fields */
		this.form_save.fields = [];
		this.form_save.fields.push( deepClone(status) );
		this.form_save.fields.push( deepClone(name) );
		this.form_save.fields.push( deepClone(stack_name) );
		this.form_save.fields.push( deepClone(template_id) );
		this.form_save.fields.push( deepClone(template_version_id) );
	}
	
	
	
	/**
	 * Returns service name
	 */
	getServiceName()
	{
		if (!this.form_save) return "";
		if (!this.form_save.item) return "";
		if (isNull(this.form_save.item)) return "";
		return this.form_save.item.stack_name + "_" + this.form_save.item.name;
	}
	
	
	
	/**
	 * Sort modificators items
	 */
	sortModificatorsItems()
	{
		this.dictionary.modificators_item = this.dictionary.modificators_item
			.sort((a:Modificator, b:Modificator) =>
			{
				if (a.priority == b.priority)
				{
					return a.name < b.name ? -1 : 1;
				}
				return a.priority < b.priority ? -1 : 1;
			})
		;
	}
	
	
	
	/**
	 * Returns modificator by id
	 */
	getModificatorByID(modificator_id: number): Modificator | null
	{
		let index = this.dictionary.modificators
			.findIndex( (item:any) => item.id == modificator_id )
		;		
		let modificator: Modificator | null = null;
		if (index >= 0)
		{
			modificator = (new Modificator()).assignValues(this.dictionary.modificators[index]);
		}
		return modificator;
	}
	
	
	
	/**
	 * Returns modificators for select add
	 */
	getSelectAddModificators()
	{
		if (isNull(this.dictionary)) return [];
		if (isNull(this.dictionary.modificators)) return [];
		
		let modificators = this.dictionary.modificators;
		let modificators_item = this.dictionary.modificators_item
			.map(
				(item:any) =>
				{
					return Number(item.id);
				}
			)
		;
		return (modificators != null) ?
			modificators
				.map
				(
					(item:any) =>
					{
						return { id: item.id, value: item.name };
					}
				)
				.filter
				(
					(item:any) =>
					{
						return modificators_item.indexOf( Number(item.id) ) == -1
					}
				)
			: []
		;
	}
	
	
	
	/**
	 * After
	 */
	async after(kind: string, params: Record<string, any>)
	{
		await super.after(kind, params);
		let response = params["response"] as AxiosResponse;
		
		if (!this.form_save.item) return;
		
		if (["onLoadPageSave"].indexOf(kind) >= 0)
		{
			if (this.form_save.item.environments instanceof Array)
			{
				this.form_save.item.environments.sort((a: any, b: any)=>{
					return a.key > b.key ? 1 : -1;
				});
			}
			if (this.form_save.item.volumes instanceof Array)
			{
				this.form_save.item.volumes.sort((a: any, b: any)=>{
					return a.key > b.key ? 1 : -1;
				});
			}
		}
		
	}
	
	
	
	/**
	 * Add modificator
	 */
	async processAddModificator
	(
		app_id: number,
		modificator_id: number
	): Promise<AxiosResponse | null>
	{
		let response:AxiosResponse | null = null;
		let url = this.getClass().getApiUrl("item") + "modificator/add/";
		
		/* Get post data */
		let post_data = {
			"pk": {
				"id": app_id,
			},
			"modificator_id": modificator_id,
		};
		
		try
		{
			post_data = await this.processPostData("processAddModificator", post_data);
			response = await axios.post
			(
				url,
				post_data
			);
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
	 * Delete modificator
	 */
	async processDeleteModificator
	(
		app_id: number,
		modificator_id: number
	)
	{
		let response:AxiosResponse | null = null;
		let url = this.getClass().getApiUrl("item") +
			"modificator/delete/";
		
		/* Get post data */
		let post_data = {
			"pk": {
				"id": app_id,
			},
			"modificator_id": modificator_id,
		};
		
		try
		{
			post_data = await this.processPostData("processDeleteModificator", post_data);
			response = await axios.post(url, post_data);
		}
		catch (e)
		{
			if (axios.isAxiosError(e))
			{
				response = e["response"] as AxiosResponse;
			}
		}
	}
	
	
	
	/**
	 * Compose application
	 */
	async processCompose()
	{
		let item = this.form_save.item;
		if (!item) return;
		
		let res:boolean = await this.before("processCompose", { item });
		if (!res) return;
		
		let response:AxiosResponse | null = null;
		let post_data = {
			"pk": item ? this.getPrimaryKeyFromItem(item) : null,
			"item": item,
		};
		let url = this.getClass().getApiUrl("item") + "compose/";
		
		/* Set wait response */
		this.dialog_compose_app.setWaitResponse();
		
		try
		{
			post_data = await this.processPostData("processCompose", post_data);
			response = await axios.post(url, post_data);
		}
		catch (e)
		{
			if (axios.isAxiosError(e))
			{
				response = e["response"] as AxiosResponse;
			}
		}
		
		/* Set response */
		this.dialog_compose_app.setAxiosResponse(response);
		if (response && this.dialog_compose_app.error_code == 1)
		{
			this.form_save.setItem(response.data.result.new_data);
			this.updateItem(item, response.data.result.new_data);
		}
		
		await this.after("poccessStop", { response, item });
	}
	
	
	
	/**
	 * Stop application
	 */
	async processStop()
	{
		let item = this.form_save.item;
		if (!item) return;
		
		let response:AxiosResponse | null = null;
		let post_data = {
			"pk": { "id": item.id },
		};
		let url = this.getClass().getApiUrl("item") + "stop/";
		
		/* Set wait response */
		this.dialog_compose_app.setWaitResponse();
		
		try
		{
			post_data = await this.processPostData("processCompose", post_data);
			response = await axios.post(url, post_data);
		}
		catch (e)
		{
			if (axios.isAxiosError(e))
			{
				response = e["response"] as AxiosResponse;
			}
		}
		
		this.dialog_stop_app.setAxiosResponse(response);
		if (response && this.dialog_stop_app.error_code == 1)
		{
			this.form_save.setItem(response.data.result.new_data);
			this.updateItem(item, response.data.result.new_data);
		}
	}
	
}