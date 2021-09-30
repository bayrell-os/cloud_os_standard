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
import { DefineComponent } from "vue";
import { BaseObject, deepClone, objContains, objEquals } from "vue-helper";
import { DialogState } from "@/components/Dialog/DialogState";
import { FormState } from "@/components/Form/FormState";
import Input from './Input.vue';
import Label from './Label.vue';
import RowButtons from './RowButtons.vue';
import RowNumber from './RowNumber.vue';
import Select from './Select.vue';
import SelectLabel from './SelectLabel.vue';
import TextArea from './TextArea.vue';
import CodeMirror from './CodeMirror.vue';


export let COMPONENTS =
{
	Input,
	Label,
	RowButtons,
	RowNumber,
	Select,
	SelectLabel,
	TextArea,
	CodeMirror,
};

export let CRUD_EVENTS =
{
	ROW_CLICK: "row_click",
	ROW_BUTTON_CLICK: "row_button_click",
	ITEM_CHANGE: "item_change",
};


export class CrudEvent
{
	event_name: string = "";
	item_name: string = "";
	value: any = null;
	tag: any = null;
	index: number = 0;
	crud_item: CrudItem | null = null;
	button_name: string = "";
	attrs: Record<string, any> = {};
	$event: any = null;
}


export class SelectOption extends BaseObject
{
	id: string = "";
	value: string = "";
	
	/**
	 * From object
	 */
	assignValues(params:Record<string, any>): SelectOption
	{
		this.id = String(params["id"] || this.id);
		this.value = String(params["value"] || this.value);
		super.assignValues(params);
		return this;
	}
	
	
	/**
	 * Returns values
	 */
	getValues(): Record<string, any>
	{
		let res: Record<string, any> = super.getValues();
		return Object.assign(res, {
			"id": this.id,
			"value": this.value,
		});
	}
}


export class FieldInfo extends BaseObject
{
    api_name: string = "";
    label: string = "";
    component: any = null;
    
	/* Flags */
	primary: boolean = false;
	required: boolean = false;
	readonly: boolean = false;
	virtual: boolean = false;
	can_create: boolean = true;
	can_update: boolean = true;
	group: string = "default";
	default_val: any = null;
	
	/* Select options */
    options: Array<SelectOption> = [];
	
    /**
	 * From object
	 */
	assignValues(params:Record<string, any>): FieldInfo
	{
		this.api_name = String(params["api_name"] || this.api_name);
		this.label = String(params["label"] || this.label);
		this.component = String(params["component"] || this.component);
		super.assignValues(params);
		return this;
	}
	
	
	/**
	 * Returns values
	 */
	getValues(): Record<string, any>
	{
		let res: Record<string, any> = super.getValues();
		return Object.assign(res, {
			"api_name": this.api_name,
			"label": this.label,
			"component": this.component,
		});
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
		let res: Record<string, any> = super.getValues();
		return Object.assign(res, {
			"action": this.action,
			"label": this.label,
			"type": this.type,
		});
	}
}



export class CrudItem extends BaseObject
{
	
}


export class CrudState
{
	fields: Array<FieldInfo> = [];
	fields_table: Array<FieldInfo> = [];
	current_item: CrudItem | null = null;
	items: Array<CrudItem> = new Array<CrudItem>();
	form: FormState = new FormState();
	dialog_delete: DialogState = new DialogState();
	dialog_form: DialogState = new DialogState();
	active_item: CrudItem | null = null;
	active_item_pk: Record<string, any> | null = null;
	
	
	constructor()
	{
		this.crudInit();
	}
	
	
	/**
	 * Returns if item is action
	 */
	isRowActive(item: CrudItem | null)
	{
		if (item == null) return false;
		if (this.active_item_pk == null) return false;
		
		if (objContains(this.active_item_pk, item)) return true;
		
		return false;
	}
	
	
	/**
	 * Returns api object name
	 */
	getApiObjectName()
	{
		return "";
	}
	
	
	
	/**
	 * Return api search url
	 */
	getApiUrlSearch()
	{
		return "/api/" + this.getApiObjectName() + "/crud/search/";
	}
	
	
	
	/**
	 * Return api create url
	 */
	getApiUrlCreate()
	{
		return "/api/" + this.getApiObjectName() + "/crud/create/";
	}
	
	
	
	/**
	 * Return api update url
	 */
	getApiUrlUpdate(item: CrudItem)
	{
		return "/api/" + this.getApiObjectName() + "/crud/edit/";
	}
	
	
	
	/**
	 * Return api delete url
	 */
	getApiUrlDelete(item: CrudItem)
	{
		return "/api/" + this.getApiObjectName() + "/crud/delete/";
	}
	
	
	
	/**
	 * Returns new item
	 */
	createNewItem(): CrudItem
	{
		return new CrudItem();
	}
	
	
	/**
	 * Returns new item instance
	 */
	createNewItemInstance(data:any = null): CrudItem
	{
		let item = this.createNewItem();
		if (data != undefined && data != null) item.assignValues(data);
		return item;
	}
	
	
	 
	/**
	 * Get primary key
	 */
	getPrimaryKeyFields(): Array<string>
	{
		let pk_fields:Array<string> = this.fields
			.filter( (info:FieldInfo) => info.primary )
			.map( (info:FieldInfo) => info.api_name )
		;
		return pk_fields;
	}
	
	
	
	/**
	 * Get primary key
	 */
	getPrimaryKeyFromItem(item:CrudItem): Record<string, any>
	{
		let pk: Record<string, any> = {};
		let pk_fields:Array<string> = this.getPrimaryKeyFields();
		
		for (let i:number = 0; i<pk_fields.length; i++)
		{
			let field_name = pk_fields[i];
			let value = (item != null && (item as any)[field_name] != undefined) ?
				(item as any)[field_name] : null;
			pk[field_name] = deepClone(value);
		}
		
		return pk;
	}
	
	
	
	/**
	 * Find item
	 */
	findItemByPrimaryKey(item: CrudItem): number
	{
		let pk: Record<string, any> = this.getPrimaryKeyFromItem(item);
		let index = this.items.findIndex
		(
			(find_item: CrudItem) =>
			{
				for (let key in pk)
				{
					let item1 = (item as any)[key];
					let item2 = (find_item as any)[key];
					if (item1 != undefined && item2 != undefined && item1 == item2)
					{
						return true;
					}
				}
				return false;
			}
		);
		return index;
	}
	
	
	
	/**
	 * Crud init
	 */
	crudInit()
	{
		
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemName(item: CrudItem | null): string
	{
		return "";
	}
	
	
	
	/**
	 * Returns crud message
	 */
	getMessage(message_type: string, item: CrudItem | null): string
	{
		if (message_type == "dialog_form_title")
		{
			if (item == null)
			{
				return "Add item";
			}
			else
			{
				return "Edit item";
			}
		}
		if (message_type == "top_button_show_add_title")
		{
			return "Add";
		}
		if (message_type == "dialog_delete_title")
		{
			return "Delete";
		}
		if (message_type == "dialog_delete_text")
		{
			return "Do you sure to delete \"" + this.getItemName(item) + "\" ?";
		}
		return "";
	}
	
	
	
	/**
	 * Returns form value
	 */
	getItemValue(index: number, api_name: string): any
	{
		if (this.items[index] == undefined) return "";
		if ((this.items[index] as any)[api_name] == undefined) return "";
		return (this.items[index] as any)[api_name];
	}
	
	
	
	/**
	 * Set current item
	 */
	setCurrentItem(item: CrudItem | null)
	{
		this.current_item = deepClone(item);
	}
	
	
	
	/**
	 * Add new item
	 */
	addItem(data: any)
	{
		let item:CrudItem = this.createNewItemInstance(data);
		this.items.unshift(item);
		this.sortItems();
	}
	
	
	
	/**
	 * Add items
	 */
	addItems(items: Array<any>)
	{
		for (let i = 0; i < items.length; i++)
		{
			let item = this.createNewItemInstance(items[i]);
			this.items.push(item);
		}
		this.sortItems();
	}
	
	
	 
	/**
	 * Update item
	 */
	updateItem(old_item: CrudItem, new_item: any)
	{
		let index = this.findItemByPrimaryKey(old_item);
		if (index != -1)
		{
			new_item = this.createNewItemInstance(new_item);
			this.items[index] = new_item;
		}
	}
	
	
	
	/**
	 * Delete item
	 */
	deleteItem(old_item: CrudItem)
	{
		let index = this.findItemByPrimaryKey(old_item);
		if (index != -1)
		{
			this.items.splice(index, 1);
		}
	}
	
	
	
	/**
	 * Sort items
	 */
	sortItems()
	{
		
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
			this.form.item = new CrudItem();
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
	 * Load data
	 */
	static async apiLoadData(component: DefineComponent)
	{
		let model:CrudState = component.model;
		
		let url = model.getApiUrlSearch();
		let response:AxiosResponse = await axios.get(url);
		
		if (typeof(response.data) == "object" && response.data.error.code == 1)
		{
			model.items = new Array();
			model.addItems(response.data.result.items);
		}
	}
	
	
	
	/**
	 * Save form
	 */
	static async apiSaveForm(component: DefineComponent)
	{
		let model:CrudState = component.model;
		let response:AxiosResponse | null = null;
		let item:CrudItem = model.form.item as CrudItem;
		let item_original:CrudItem = model.form.item_original as CrudItem;
		
		model.form.setWaitResponse();
		
		if (item_original == null)
		{
			let url = model.getApiUrlCreate();
			
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
			
			model.form.setResponse(response);
			
			if (response && response.data.error.code == 1)
			{
				model.addItem(response.data.result.item);
				model.dialog_form.hide();
			}
		}
		else
		{
			let url = model.getApiUrlUpdate(item_original);
			
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
			
			model.form.setResponse(response);
			
			if (response && typeof(response.data) == "object" && response.data.error.code == 1)
			{
				model.updateItem(item_original, response.data.result.item);
				model.dialog_form.hide();
			}
		}
		
	}
	
	
	
	/**
	 * Delete form
	 */
	static async apiDeleteForm(component: DefineComponent)
	{
		let model:CrudState = component.model;
		let response:AxiosResponse | null = null;
		let item:CrudItem = model.current_item as CrudItem;
		
		model.dialog_delete.setWaitResponse();
		
		if (item)
		{
			let url = model.getApiUrlDelete(item);
			
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
			
			model.dialog_delete.setResponse(response);
			
			if (response && typeof(response.data) == "object" && response.data.error.code == 1)
			{
				model.deleteItem(item);
				model.dialog_delete.hide();
			}
		}
		
	}
}
