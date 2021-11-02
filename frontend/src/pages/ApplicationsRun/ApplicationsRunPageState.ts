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
import { DialogState } from "vue-helper/Crud/DialogState";


export class ApplicationsRunPageState
{
	action: string = "";
	template: ApplicationTemplate | null = null;
	modificators: Array<ApplicationModificator> = new Array<ApplicationModificator>();
	template_modificators: Array<number> = [];
	dialog_add_modificator: DialogState = new DialogState();
	dialog_delete_modificator: DialogState = new DialogState();
	
	
	
	/**
	 * Returns modificator index
	 */
	getModificatorIndex(modificator_id: number): number
	{
		let index = this.modificators.findIndex( (item) => item.id == modificator_id );
		return index;
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
	static async pageLoadData(model: ApplicationsRunPageState, route: any)
	{
		let response: AxiosResponse | null = null;
		
		if (route.props.action == "run")
		{
			route.setPageTitle("Run app");
			
			/* Load template id */
			let template_id = route.to.params.template_id;
			response = await ApplicationsTemplatesPageState.apiLoadItem(template_id);
			if (response && response.data.error.code == 1)
			{
				model.template =
					ApplicationsTemplatesPageState.createNewItemInstance(response.data.result.item) as ApplicationTemplate
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
						ApplicationsModificatorsPageState.createNewItemInstance(item) as ApplicationModificator
					);
				}
			}
			
			model.template_modificators = [2, 3];
		}
	}
	
}