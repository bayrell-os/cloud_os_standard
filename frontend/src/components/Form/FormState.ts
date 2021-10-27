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
import { FieldInfo } from "@/components/Crud/CrudState";
import { AxiosResponse } from "axios";


export class FormState extends BaseObject
{
	title: string = "";
	fields: Array<FieldInfo> = [];
	item: Record<string, any> = {};
	item_original: Record<string, any> | null = null;
	error_code: number = 0;
	message: string = "";
	
	
	/**
	 * From object
	 */
	assignValues(params:Record<string, any>): FormState
	{
		this.fields = params["fields"] || this.fields;
		super.assignValues(params);
		return this;
	}
	
	
	/**
	 * Returns values
	 */
	getValues(): Record<string, any>
	{
		return {
			"fields": this.fields,
		};
	}
	
	
	/**
	 * Returns form value
	 */
	getItemValue(api_name: string): any
	{
		if (this.item[api_name] != undefined)
		{
			return this.item[api_name];
		}
		return "";
	}
	
	
	/**
	 * Set form value
	 */
	setItemValue(api_name: string, value: string)
	{
		this.item[api_name] = value;
	}
	
	
	/**
	 * Clear
	 */
	clear()
	{
		this.title = "";
		this.error_code = 0;
		this.message = "";
		this.item = {};
		this.item_original = {};
	}
	
	
	/**
	 * Set wait response
	 */
	setWaitResponse()
	{
		this.error_code = 0;
		this.message = "Please wait";
	}
	
	
	/**
	 * Set response
	 */
	setAxiosResponse(response: AxiosResponse | null)
	{
		if (response)
		{
			let data: any = response.data;
			if (typeof(data["error"]) == "object")
			{
				this.error_code = data["error"]["code"];
				this.message = data["error"]["str"];
			}
			else
			{
				this.error_code = -1;
				this.message = "System error";
			}
		}
		else
		{
			this.error_code = -1;
			this.message = "System error. Response is null";
		}
	}
}