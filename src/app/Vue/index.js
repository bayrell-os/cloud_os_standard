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
import Router from './Router'
import { AppState } from './AppState'
import { initTestStore } from './StoreTest'

/* Import components */
import CrudResult from 'vue-helper/Crud/CrudResult.vue';
import Dialog from 'vue-helper/Crud/Dialog.vue';
import Form from 'vue-helper/Crud/Form.vue';
import Button from 'vue-helper/Crud/Button.vue';
import Input from 'vue-helper/Crud/Input.vue';
import Label from 'vue-helper/Crud/Label.vue';
import Pagination from 'vue-helper/Crud/Pagination.vue';
import RowButtons from 'vue-helper/Crud/RowButtons.vue';
import RowNumber from 'vue-helper/Crud/RowNumber.vue';
import Select from 'vue-helper/Crud/Select.vue';
import SelectLabel from 'vue-helper/Crud/SelectLabel.vue';
import TextArea from 'vue-helper/Crud/TextArea.vue';
import CodeMirror from 'vue-helper/Crud/CodeMirror.vue';
import Tabs from 'vue-helper/Crud/Tabs.vue';
import Tab from 'vue-helper/Crud/Tab.vue';

/* App components */
import ApplicationAdminButton from './pages/Applications/ApplicationAdminButton.vue';

/* Create app state */
let Store = buildStore(AppState);

var app = createApp(App);

/* Register modules */
app.use(Store);
app.use(Router);

/* Register app components */
app.component("ApplicationAdminButton", ApplicationAdminButton);

/* Register components */
app.component("Tabs", Tabs);
app.component("Tab", Tab);
app.component("Input", Input);
app.component("Label", Label);
app.component("Pagination", Pagination);
app.component("RowButtons", RowButtons);
app.component("RowNumber", RowNumber);
app.component("Select", Select);
app.component("SelectLabel", SelectLabel);
app.component("TextArea", TextArea);
app.component("CodeMirror", CodeMirror);
app.component("Button", Button);
app.component("Dialog", Dialog);
app.component("Form", Form);
app.component("CrudResult", CrudResult);

/* Register app */
app.mount('#app');

window["appInstance"] = app;
window["storeInstance"] = Store;

/* Create test store */
initTestStore(Store)