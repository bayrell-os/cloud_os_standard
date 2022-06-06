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

import "./main.scss";

//import { createApp } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { buildStore } from 'vue-helper'
import App from './App.vue'
import Router from './Router.js'
import { AppState } from './AppState'
import { initTestStore } from './StoreTest'

/* Create app state */
let Store = buildStore(AppState);

var app = createApp(App);

/* Register modules */
app.use(Store);
app.use(Router);

/* Register components */
import components from "./components.js";
for (let component_name in components)
{
    let component = components[component_name];
    app.component(component_name, component);
}

/* Register app */
app.mount('#app');

window["appInstance"] = app;
window["storeInstance"] = Store;

/* Create test store */
initTestStore(Store)