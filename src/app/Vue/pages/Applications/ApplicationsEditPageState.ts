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

import axios, { AxiosResponse, AxiosError } from "axios";
import { ModificatorsPageState, Modificator } from "../Modificators/ModificatorsPageState";
import { ApplicationsPageState, Application } from "../Applications/ApplicationsPageState";
import { CrudResultState } from "vue-helper/Crud/CrudResultState";
import { DialogState } from "vue-helper/Crud/DialogState";
import { CrudState } from "vue-helper/Crud/CrudState";
import { isNull } from "vue-helper";



export class ApplicationsEditPageState extends ApplicationsPageState
{
	dialog_add_modificator: DialogState;
	dialog_view_modificator: DialogState;
	dialog_delete_modificator: DialogState;
	select_add_modificator_id: any;
	result: CrudResultState;
	
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.dialog_add_modificator = new DialogState();
		this.dialog_view_modificator = new DialogState();
		this.dialog_delete_modificator = new DialogState();
		this.select_add_modificator_id = 0;
		this.result = new CrudResultState();
		
		/* Init class */
		super.init(params);
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
	 * Add modificator
	 */
	static async apiAddModificator
	(
		item_id: number,
		modificator_id: number
	): Promise<AxiosResponse | null>
	{
		let response:AxiosResponse | null = null;
		let url = this.getApiUrlItem(String(item_id)) + "modificator/add/";
		
		try
		{
			response = await axios.post
			(
				url,
				{ "modificator_id": modificator_id }
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
	static async apiDeleteModificator
	(
		item_id: number,
		modificator_id: number
	): Promise<AxiosResponse | null>
	{
		let response:AxiosResponse | null = null;
		let url = this.getApiUrlItem(String(item_id)) + "modificator/delete/" + modificator_id + "/";
		
		try
		{
			response = await axios.delete(url);
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
	
}




export class ApplicationsEditPageStateOld extends CrudState
{
	action: string;
	application: Application | null;
	modificators: Array<Modificator>;
	dialog_add_modificator: DialogState;
	dialog_view_modificator: DialogState;
	dialog_delete_modificator: DialogState;
	result: CrudResultState;
	
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.action = "";
		this.application = null;
		this.modificators = new Array<Modificator>();
		this.dialog_add_modificator = new DialogState();
		this.dialog_view_modificator = new DialogState();
		this.dialog_delete_modificator = new DialogState();
		this.result = new CrudResultState();
		
		/* Init class */
		super.init(params);
	}
	
	
	
	/**
	 * Save form
	 */
	async doSaveFormOld()
	{
		let item:Application | null = this.application;
		
		if (item)
		{
			this.result.setWaitResponse();
			let response:AxiosResponse | null = await ApplicationsPageState
				.apiSaveForm(item, item)
			;
			this.result.setAxiosResponse(response);
			
			if (response && typeof(response.data) == "object" && response.data.error.code == 1)
			{
				this.application = ApplicationsPageState.createNewItemInstance
					(
						response.data.result.item
					) as Application
				;
			}
		}
	}
	
	
	/*********************** Compose ***********************/
	
	/**
	 * Compose form
	 */
	async doComposeForm()
	{
		let item:Application | null = this.application;
		let response:AxiosResponse | null = null;
		
		this.result.setWaitResponse();
		if (item)
		{
			response = await (this.constructor as any).apiComposeForm(item);
		}
		this.result.setAxiosResponse(response);
		
		if (response && typeof(response.data) == "object" && response.data.error.code == 1)
		{
			this.application = ApplicationsPageState.createNewItemInstance
				(
					response.data.result.item
				) as Application
			;
		}
	}
	
	
	
	/**
	 * Save form api
	 */
	static async apiComposeForm(item:Application): Promise<AxiosResponse | null>
	{
		let response:AxiosResponse | null = null;
		let url = this.getApiUrlCompose(item);
		
		try
		{
			response = await axios.post(url, {"item": item});
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
	 * Return api update url
	 */
	static getApiUrlCompose(item: Application)
	{
		let item_id = ApplicationsPageState.getItemId(item);
		return "/api/applications/default/compose/" + encodeURIComponent(item_id) + "/";
	}
	
	
	
	/************************ Stop *************************/
	
	/**
	 * Stop form
	 */
	async doStopForm()
	{
		/*
		let model:ApplicationsEditPageState = this;
		let item:Application | null = model.application;
		let response:AxiosResponse | null = null;
		
		model.result.setWaitResponse();
		if (item)
		{
			response = await (this.constructor as any).apiStopForm(item);
		}
		model.result.setAxiosResponse(response);
		
		if (
			response &&
			typeof(response.data) == "object" &&
			response.data.error.code == 1 &&
			model.application != null
		)
		{
			model.application.status = Number( response.data.result.item["status"] );
		}*/
	}
	
	
	
	/**
	 * Save form api
	 */
	static async apiStopForm(item:Application): Promise<AxiosResponse | null>
	{
		let response:AxiosResponse | null = null;
		let url = this.getApiUrlStop(item);
		
		try
		{
			response = await axios.post(url, {"item": item});
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
	 * Return api update url
	 */
	static getApiUrlStop(item: Application)
	{
		let item_id = ApplicationsPageState.getItemId(item);
		return "/api/applications/default/stop/" + encodeURIComponent(item_id) + "/";
	}
	
}