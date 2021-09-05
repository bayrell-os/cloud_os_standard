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

import { BaseObject } from "vue-helper";

export class FieldInfo extends BaseObject
{
    api_name: string = "";
    label: string = "";
    component_name: string = "";
    
    
    /**
	 * From object
	 */
	assignValues(params:Record<string, any>): FieldInfo
	{
		this.api_name = String(params["api_name"] || this.api_name);
		this.label = String(params["label"] || this.label);
		this.component_name = String(params["component_name"] || this.component_name);
		super.assignValues(params);
		return this;
	}
	
	
	/**
	 * Returns values
	 */
	getValues(): Record<string, any>
	{
		return {
			"api_name": this.api_name,
			"label": this.label,
			"component_name": this.component_name,
		};
	}
}


export class CrudButton extends BaseObject
{
    action: string = "";
    label: string = "";
    type: string = "";
    
    
    /**
	 * From object
	 */
	assignValues(params:Record<string, any>): CrudButton
	{
		this.action = String(params["action"] || this.action);
		this.label = String(params["label"] || this.label);
		this.type = String(params["type"] || this.type);
		super.assignValues(params);
		return this;
	}
	
	
	/**
	 * Returns values
	 */
	getValues(): Record<string, any>
	{
		return {
			"action": this.action,
			"label": this.label,
			"type": this.type,
		};
	}
}
