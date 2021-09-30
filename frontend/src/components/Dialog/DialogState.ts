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

import { AxiosResponse } from "axios";
import { BaseObject } from "vue-helper";

export class DialogButtonClickEvent
{
    action: string = "";
}

export class DialogButton extends BaseObject
{
    action: string = "";
    label: string = "";
    type: string = "";
    
    
    /**
	 * From object
	 */
	assignValues(params:Record<string, any>): DialogButton
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

export class DialogState extends BaseObject
{
    open: boolean = false;
    title: string = "";
    buttons: Array<DialogButton> = [];
    error_code: number = 0;
	message: string = "";
	
    
    /**
	 * Show dialog
	 */
	show()
	{
		this.open = true;
	}
    
    
    /**
	 * Hide dialog
	 */
	hide()
	{
		this.open = false;
	}
    
    
    /**
	 * From object
	 */
	assignValues(params:Record<string, any>): DialogState
	{
		this.open = Boolean(params["open"] || this.open);
		this.title = String(params["title"] || this.title);
		this.buttons = params["buttons"] || this.buttons;
		super.assignValues(params);
		return this;
	}
	
    
	
	/**
	 * Returns values
	 */
	getValues(): Record<string, any>
	{
		return {
			"open": this.open,
			"title": this.title,
			"buttons": this.buttons,
		};
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
	setResponse(response: AxiosResponse | null)
	{
		if (response)
		{
			let data: any = response.data;
			if (typeof(data) == "object")
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