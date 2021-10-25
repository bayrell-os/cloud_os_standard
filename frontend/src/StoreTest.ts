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

import { Store } from "vuex";
import { AppState } from "./AppState";
import { ApplicationStatus } from "./pages/Applications/ApplicationsStatusPageState";
import * as dayjs from 'dayjs'


/**
 * Create test store
 */
export function initTestStore (store: Store<AppState>)
{
    let item;
    
    item = new ApplicationStatus();
    item.id = 1;
    item.name = "name";
    item.stack_name = "stack_name";
	store.state.ApplicationsStatusPage.items.push(item);
    
    item = new ApplicationStatus();
    item.id = 2;
    item.name = "name 2";
    item.stack_name = "stack_name 2";
	store.state.ApplicationsStatusPage.items.push(item);
}
