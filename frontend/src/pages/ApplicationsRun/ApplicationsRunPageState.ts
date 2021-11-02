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
import { ApplicationsTemplatesPageState, ApplicationTemplate } from "../ApplicationsTemplates/ApplicationsTemplatesPageState";
import { ApplicationsModificatorsPageState, ApplicationModificator } from "../ApplicationsModificators/ApplicationsModificatorsPageState";
import { ApplicationsStatusPageState, ApplicationStatus } from "../ApplicationsStatus/ApplicationsStatusPageState";
import { CrudResultState } from "vue-helper/Crud/CrudResultState";
import { DialogState } from "vue-helper/Crud/DialogState";
import { DefineComponent } from "vue";



export class ApplicationsRunPageState
{
	action: string = "";
	application: ApplicationStatus | null = null;
	modificators: Array<ApplicationModificator> = new Array<ApplicationModificator>();
	dialog_add_modificator: DialogState = new DialogState();
	dialog_delete_modificator: DialogState = new DialogState();
	result: CrudResultState = new CrudResultState();
	
	
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
	static async pageLoadData(model: ApplicationsRunPageState, route: any)
	{
		let response: AxiosResponse | null = null;
		let app_id = route.to.params.id;
		
		route.setPageTitle("Edit app");
		
		/* Load app id */
		response = await ApplicationsStatusPageState.apiLoadItem(app_id);
		if (response && response.data.error.code == 1)
		{
			model.application = ApplicationsStatusPageState.createNewItemInstance
				(
					response.data.result.item
				) as ApplicationStatus
			;
		}
		
		/* Load modificators */
		response = await ApplicationsModificatorsPageState.apiLoadData();
		if (response && response.data.error.code == 1)
		{
			model.modificators = [];
			for (let i=0; i<response.data.result.items.length; i++)
			{
				let item = response.data.result.items[i];
				model.modificators.push
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
	static async onSaveForm(component: DefineComponent)
	{
		let model:ApplicationsRunPageState = component.model;
		let item:ApplicationStatus | null = model.application;
		
		if (item)
		{
			model.result.setWaitResponse();
			let response:AxiosResponse | null = await ApplicationsStatusPageState
				.apiSaveForm(item, item)
			;
			model.result.setAxiosResponse(response);
			
			if (response && typeof(response.data) == "object" && response.data.error.code == 1)
			{
				model.application = ApplicationsStatusPageState.createNewItemInstance
					(
						response.data.result.item
					) as ApplicationStatus
				;
			}
		}
	}
	
	
	
}