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
import { deepClone, notNull } from "vue-helper";
import { CrudItem } from "vue-helper/Crud/CrudItem";
import { CrudState, FieldInfo, SelectOption } from "vue-helper/Crud/CrudState";


export class Stack extends CrudItem
{
	stack_name: string;
	gmtime_created: string;
	gmtime_updated: string;
	
	
	/**
	 * Init
	 */
	init(params:any)
	{
		/* Init variables */
		this.stack_name = "";
		this.gmtime_created = "";
		this.gmtime_updated = "";
		
		/* Init class */
		super.init(params);
	}
	
	
	
	/**
	 * Assign value
	 */
	assignValue(key:string, value:any)
	{
		if (key == "stack_name") this.stack_name = String(value);
		else if (key == "gmtime_created") this.gmtime_created = String(value);
		else if (key == "gmtime_updated") this.gmtime_updated = String(value);
		else super.assignValue(key, value);
	}
	
}



export class StacksPageState extends CrudState<Stack>
{
	
	/**
	 * Returns class
	 */
	getClass(): typeof StacksPageState
	{
		return this.constructor as typeof StacksPageState;
	}
	
	
	
	/**
	 * Returns class item
	 */
	getClassItem(): Function
	{
		return Stack;
	}
	
	
	
	/**
	 * Returns api object name
	 */
	getApiObjectName()
	{
		return "stacks";
	}
	
	
	
	/**
	 * Crud init
	 */
	initCrud()
	{
		/* Stack name field */
		let stack_name = new FieldInfo();
		stack_name.name = "stack_name";
		stack_name.label = "Stack name";
		stack_name.component = "Input";
		stack_name.primary = true;
		this.fields.push( deepClone(stack_name) );
		
		/* Row number */
		let row_number = new FieldInfo();
		row_number.name = "row_number";
		row_number.label = "";
		row_number.component = "RowNumber";
		
		/* Row buttons */
		let row_buttons = new FieldInfo();
		row_buttons.name = "row_buttons";
		row_buttons.label = "";
		row_buttons.component = "RowButtons";
		row_buttons.component_params.buttons = [
			{
				"action": "delete",
				"type": "danger",
				"label": "Delete",
			}
		];
		
		/* Form fields */
		this.form_save.fields.push( deepClone(stack_name) );
		
		/* Table fields */
		stack_name.component = "Label";
		this.fields_table.push( deepClone(row_number) );
		this.fields_table.push( deepClone(stack_name) );
		this.fields_table.push( deepClone(row_buttons) );
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemName(item: Stack | null): string
	{
		return (item) ? item.stack_name : "";
	}
	
	
	
	/**
	 * Returns delete message
	 */
	getMessage(message_type: string, item: Stack | null): string
	{
		if (message_type == "list_title")
		{
			return "Stacks";
		}
		else if (message_type == "item")
		{
			return "stack";
		}
		return super.getMessage(message_type, item);
	}
	
}
