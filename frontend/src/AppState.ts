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

import { MainPageState } from '@/pages/Main/MainPageState'
import { DomainPageState } from '@/pages/Domain/DomainPageState'
import { NotFoundPageState } from '@/pages/NotFound/NotFoundPageState'

export class AppState
{
	title: string = "";
	MainPage: MainPageState = new MainPageState();
	DomainPage: DomainPageState = new DomainPageState();
	NotFound: NotFoundPageState = new NotFoundPageState();


	/**
	 * Returns methods list
	 */
	static mutations(): Array<string>
	{
		let res: Array<string> =
		[
		];
		return res;
	}


	/**
	 * Returns modules
	 */
	static modules(): Record<string, any>
	{
		let res: Record<string, any> =
		{
			"MainPage": MainPageState,
			"DomainPage": DomainPageState,
			"NotFoundPage": NotFoundPageState,
		};
		return res;
	}

}
