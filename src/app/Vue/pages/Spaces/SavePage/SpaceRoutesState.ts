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

import { Route, RoutesPageState } from "@/pages/Routes/RoutesPageState";
import { deepClone, notNull } from "vue-helper";
import { CrudItem } from "vue-helper/Crud/CrudItem";
import { CrudState, FieldInfo, SelectOption } from "vue-helper/Crud/CrudState";



export class SpaceRoutesState extends RoutesPageState
{
	space_id: number;
	
	
	/**
	 * Returns class
	 */
	getClass(): typeof SpaceRoutesState
	{
		return this.constructor as typeof SpaceRoutesState;
	}
	
	
	
	/**
	 * Returns class item
	 */
	static getClassItem(): Function
	{
		return Route;
	}
	
	
	
	/**
	 * Returns api object name
	 */
	static getApiObjectName()
	{
		return "spaces_routes";
	}
	
	
	
	/**
	 * Before
	 */
	async before(kind: string, params: Record<string, any>): Promise<boolean>
	{
		await super.before(kind, params);
		return true;
	}
	
	
	
	/**
	 * After
	 */
	async after(kind: string, params: Record<string, any>)
	{
	}
	
	
	
	/**
	 * Process search data
	 */
	processPostData(kind: string, data: any)
	{
		data["space_id"] = this.space_id;
		return data;
	}
}