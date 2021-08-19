import "./main.scss";

import { createApp } from 'vue'
import { buildStore } from 'vue-helper'
import App from './App.vue'
import Router from './Router'
import { AppState } from './AppState'
import { initTestStore } from './StoreTest'

/* Create app state */
let Store = buildStore(AppState);

var app = createApp(App)
	.use(Store)
	.use(Router)
	.mount('#app')

window["appInstance"] = app;
window["storeInstance"] = Store;

/* Create test store */
initTestStore(Store)