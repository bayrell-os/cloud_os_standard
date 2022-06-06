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

import { FieldInfo } from "vue-helper/Crud/CrudState";
import { BaseObject } from "vue-helper";

export class MainPageState extends BaseObject
{
	
	input_props: FieldInfo;
	
	/**
	 * Init
	 */
	init(params:any)
	{
		this.input_props = new FieldInfo();
		this.input_props.name = "test";
	}

}
