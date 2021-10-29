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
	page_action: string = "";
	fields: Array<FieldInfo> = [];
	fields_table: Array<FieldInfo> = [];
	items: Array<CrudItem> = new Array<CrudItem>();
	form_save: FormState = new FormState();
	form_delete: FormState = new FormState();
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
	 * Return api search url
	 */
	getApiUrlItem(id: string)
	{
		return "/api/" + this.getApiObjectName() + "/crud/item/" + encodeURIComponent(id) + "/";
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
		return "/api/" + this.getApiObjectName() + "/crud/edit/" + encodeURIComponent(this.getItemId(item)) + "/";
	}
	
	
	
	/**
	 * Return api delete url
	 */
	getApiUrlDelete(item: CrudItem)
	{
		return "/api/" + this.getApiObjectName() + "/crud/delete/" + encodeURIComponent(this.getItemId(item)) + "/";
	}
	
	
	
	/**
	 * Returns route names
	 */
	getRouteNames(): Record<string, string>
	{
		return {};
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
	 * Returns item id
	 */
	getItemId(item: CrudItem | null): string
	{
		return "";
	}
	
	
	
	/**
	 * Returns crud message
	 */
	getMessage(message_type: string, item: CrudItem | null): string
	{
		if (message_type == "list_title")
		{
			return "Items";
		}
		else if (message_type == "form_title")
		{
			if (item)
			{
				return this.getMessage("edit_title", item);
			}
			return this.getMessage("add_title", item);
		}
		else if (message_type == "add_title")
		{
			return "Add item";
		}
		else if (message_type == "edit_title")
		{
			return "Edit item";
		}
		else if (message_type == "delete_title")
		{
			return "Delete item";
		}
		else if (message_type == "delete_text")
		{
			return "Do you sure to delete \"" + this.getItemName(item) + "\" ?";
		}
		else if (message_type == "top_button_show_add_title")
		{
			return "Add";
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
	 * Set form save item
	 */
	setFormSaveItem(item:CrudState)
	{
		if (item != null)
		{
			this.form_save.item = deepClone(item);
			this.form_save.item_original = deepClone(item);
		}
		else
		{
			this.form_save.item = new CrudItem();
			this.form_save.item_original = null;
		}
	}
	
	
	
	/**
	 * Show form
	 */
	showForm(item:CrudState)
	{
		this.form_save.clear();
		this.form_save.setItem(item);
		this.dialog_delete.clear();
		this.dialog_form.show();
	}
	
	
	
	/**
	 * Show delete
	 */
	showDelete(item:CrudState)
	{
		if (item != null)
		{
			this.form_delete.clear();
			this.form_delete.item = deepClone(item);
			this.form_delete.item_original = deepClone(item);
			this.dialog_delete.clear();
			this.dialog_delete.show();
		}
	}
	
	
	
	/**
	 * Set current crud action
	 */
	setPageAction(action: string)
	{
		if (action == "add" ||
			action == "edit" ||
			action == "delete" ||
			action == "list"
		)
		{
			this.page_action = action;
		}
		else
		{
			this.page_action = "list";
		}
	}
	
	
	
	/**
	 * Route update
	 */
	static async onRouteUpdate(model: CrudState, route: any)
	{
		if (route.kind == "beforeRouteEnter" || route.kind == "beforeRouteUpdate")
		{
			model.setPageAction(route.props.action);
			await this.pageLoadData(model, route);
		}
		else
		{
			route.next();
		}
	}
	
	
	
	/**
	 * Page data
	 */
	static async pageLoadData(model: CrudState, route: any)
	{
		if (model.page_action == "list")
		{
			await this.listPageLoadData(model, route);
		}
		
		else if (model.page_action == "add")
		{
			await this.addPageLoadData(model, route);
		}
		
		else if (model.page_action == "edit")
		{
			await this.editPageLoadData(model, route);
		}
		
		else if (model.page_action == "delete")
		{
			await this.deletePageLoadData(model, route);
		}
		
		route.next();
	}
	
	
	
	/**
	 * List Page Load data
	 */
	static async listPageLoadData(model: CrudState, route: any)
	{
		/* Set page title */
		let page_title = model.getMessage("list_title", null);
		route.setPageTitle(page_title);
		
		/* Ajax request */
		let response:AxiosResponse | null = await model.apiLoadData();
		
		/* Set result */
		model.items = new Array();
		if (response && typeof(response.data) == "object" && response.data.error.code == 1)
		{
			model.addItems(response.data.result.items);
		}
	}
	
	
	
	/**
	 * Add Page Load data
	 */
	static async addPageLoadData(model: CrudState, route: any)
	{
		/* Set page title */
		let page_title = model.getMessage("add_title", null);
		route.setPageTitle(page_title);
		
		model.form_save.clear();
	}
	
	
	
	/**
	 * Edit Page Load data
	 */
	static async editPageLoadData(model: CrudState, route: any)
	{
		/* Set page title */
		let page_title = model.getMessage("edit_title", null);
		route.setPageTitle(page_title);
		
		/* Ajax request */
		let response:AxiosResponse | null = await model.apiLoadItem(route.to.params.id);
		
		model.form_save.setLoadResponse(response);
	}
	
	
	
	/**
	 * Delete Page Load data
	 */
	static async deletePageLoadData(model: CrudState, route: any)
	{
		/* Set page title */
		let page_title = model.getMessage("delete_title", null);
		route.setPageTitle(page_title);
	}
	
	
	
	/**
	 * Save form
	 */
	static async onSaveForm(component: DefineComponent)
	{
		let model:CrudState = component.model;
		let item:CrudItem = model.form_save.item as CrudItem;
		let item_original:CrudItem = model.form_save.item_original as CrudItem;
		
		model.form_save.setWaitResponse();
		let response:AxiosResponse | null = await model.apiSaveForm(item, item_original);
		model.form_save.setAxiosResponse(response);
		
		if (item_original == null)
		{
			if (response && response.data.error.code == 1)
			{
				model.form_save.setItem(response.data.result.item);
				model.addItem(response.data.result.item);
				model.dialog_form.hide();
			}
		}
		
		else
		{
			if (response && typeof(response.data) == "object" && response.data.error.code == 1)
			{
				model.form_save.setItem(response.data.result.item);
				model.updateItem(item_original, response.data.result.item);
				model.dialog_form.hide();
			}
		}
	}
	
	
	
	/**
	 * Delete form
	 */
	static async onDeleteForm(component: DefineComponent)
	{
		let model:CrudState = component.model;
		let item:CrudItem = model.form_delete.item as CrudItem;
		
		model.dialog_delete.setWaitResponse();
		let response:AxiosResponse | null = await model.apiDeleteForm(item);
		model.dialog_delete.setAxiosResponse(response);
		
		if (item && response && typeof(response.data) == "object" && response.data.error.code == 1)
		{
			model.deleteItem(item);
			model.dialog_delete.hide();
		}
	}
	
	
	
	/**
	 * Load data api
	 */
	async apiLoadData(): Promise<AxiosResponse | null>
	{
		let url = this.getApiUrlSearch();
		let response:AxiosResponse | null = null;
		
		try
		{
			response = await axios.get(url);
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
	 * Load data api
	 */
	async apiLoadItem(id: string): Promise<AxiosResponse | null>
	{
		let response:AxiosResponse | null = null;
		
		let url = this.getApiUrlItem(id);
		
		try
		{
			response = await axios.get(url);
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
	 * Save form api
	 */
	async apiSaveForm(item:CrudItem, item_original:CrudItem): Promise<AxiosResponse | null>
	{
		let response:AxiosResponse | null = null;
		
		if (item_original == null)
		{
			let url = this.getApiUrlCreate();
			
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
		}
		
		else
		{
			let url = this.getApiUrlUpdate(item_original);
			
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
		}
		
		return response;
	}
	
	
	
	/**
	 * Delete form api
	 */
	async apiDeleteForm(item:CrudItem): Promise<AxiosResponse | null>
	{
		let response:AxiosResponse | null = null;
		
		if (item)
		{
			let url = this.getApiUrlDelete(item);
			
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
		}
		
		return response;
	}
	
	
}
