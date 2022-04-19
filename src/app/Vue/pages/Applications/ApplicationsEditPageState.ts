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
	dialog_save_app: DialogState;
	dialog_compose_app: DialogState;
	dialog_stop_app: DialogState;
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
	 * After api
	 */
	async afterApi(kind: string, response:AxiosResponse | null)
	{
		super.afterApi(kind, response);
		
		if (["editPageLoadData"].indexOf(kind) >= 0)
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
		let url = this.getApiUrlItem(String(item_id)) +
			"modificator/delete/" + modificator_id + "/";
		
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
	
	
	
	/**
	 * Compose application
	 */
	static async apiCompose(item: Application): Promise<AxiosResponse | null>
	{
		let response:AxiosResponse | null = null;
		let url = this.getApiUrlItem(String(item.id)) + "compose/";
		
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
	 * Stop application
	 */
	static async apiStop(item_id: number): Promise<AxiosResponse | null>
	{
		let response:AxiosResponse | null = null;
		let url = this.getApiUrlItem(String(item_id)) + "stop/";
		
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
		
		return response;
	}
	
}
