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
import { ApplicationsModificatorsPageState, ApplicationModificator } from "../ApplicationsModificators/ApplicationsModificatorsPageState";
import { ApplicationsStatusPageState, ApplicationStatus } from "../ApplicationsStatus/ApplicationsStatusPageState";
import { CrudResultState } from "vue-helper/Crud/CrudResultState";
import { DialogState } from "vue-helper/Crud/DialogState";
import { BaseObject } from "vue-helper";



export class ApplicationsRunPageState extends BaseObject
{
	action: string;
	application: ApplicationStatus | null;
	modificators: Array<ApplicationModificator>;
	dialog_add_modificator: DialogState;
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
		this.modificators = new Array<ApplicationModificator>();
		this.dialog_add_modificator = new DialogState();
		this.dialog_delete_modificator = new DialogState();
		this.result = new CrudResultState();
		
		/* Init class */
		super.init(params);
	}
	
	
	
	/**
	 * Returns modificator by id
	 */
	getModificatorByID(modificator_id: number): ApplicationModificator | null
	{
		let index = this.modificators.findIndex( (item) => item.id == modificator_id );
		if (index >= 0) return this.modificators[index];
		return null;
	}
	
	
	
	/**
	 * Page data
	 */
	async pageLoadData(route: any)
	{
		let response: AxiosResponse | null = null;
		let app_id = route.to.params.id;
		
		route.setPageTitle("Edit application");
		
		/* Load app id */
		response = await ApplicationsStatusPageState.apiLoadItem(app_id);
		if (response && response.data.error.code == 1)
		{
			this.application = ApplicationsStatusPageState.createNewItemInstance
				(
					response.data.result.item
				) as ApplicationStatus
			;
		}
		
		/* Load modificators */
		response = await ApplicationsModificatorsPageState.apiLoadData();
		if (response && response.data.error.code == 1)
		{
			this.modificators = [];
			for (let i=0; i<response.data.result.items.length; i++)
			{
				let item = response.data.result.items[i];
				this.modificators.push
				(
					ApplicationsModificatorsPageState
						.createNewItemInstance(item) as ApplicationModificator
				);
			}
		}
		
	}
	
	
	
	/**
	 * Save form
	 */
	async doSaveForm()
	{
		let item:ApplicationStatus | null = this.application;
		
		if (item)
		{
			this.result.setWaitResponse();
			let response:AxiosResponse | null = await ApplicationsStatusPageState
				.apiSaveForm(item, item)
			;
			this.result.setAxiosResponse(response);
			
			if (response && typeof(response.data) == "object" && response.data.error.code == 1)
			{
				this.application = ApplicationsStatusPageState.createNewItemInstance
					(
						response.data.result.item
					) as ApplicationStatus
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
		let item:ApplicationStatus | null = this.application;
		let response:AxiosResponse | null = null;
		
		this.result.setWaitResponse();
		if (item)
		{
			response = await (this.constructor as any).apiComposeForm(item);
		}
		this.result.setAxiosResponse(response);
		
		if (response && typeof(response.data) == "object" && response.data.error.code == 1)
		{
			this.application = ApplicationsStatusPageState.createNewItemInstance
				(
					response.data.result.item
				) as ApplicationStatus
			;
		}
	}
	
	
	
	/**
	 * Save form api
	 */
	static async apiComposeForm(item:ApplicationStatus): Promise<AxiosResponse | null>
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
	static getApiUrlCompose(item: ApplicationStatus)
	{
		let item_id = ApplicationsStatusPageState.getItemId(item);
		return "/api/applications/default/compose/" + encodeURIComponent(item_id) + "/";
	}
	
	
	
	/************************ Stop *************************/
	
	/**
	 * Stop form
	 */
	async doStopForm()
	{
		let model:ApplicationsRunPageState = this;
		let item:ApplicationStatus | null = model.application;
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
		}
	}
	
	
	
	/**
	 * Save form api
	 */
	static async apiStopForm(item:ApplicationStatus): Promise<AxiosResponse | null>
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
	static getApiUrlStop(item: ApplicationStatus)
	{
		let item_id = ApplicationsStatusPageState.getItemId(item);
		return "/api/applications/default/stop/" + encodeURIComponent(item_id) + "/";
	}
	
}