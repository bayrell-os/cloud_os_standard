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

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainPage from '@/pages/Main/MainPage.vue'
import ApplicationsPage from '@/pages/Applications/ApplicationsPage.vue'
import ApplicationsStatusPage from '@/pages/Applications/ApplicationsStatusPage.vue'
import DomainsPage from '@/pages/Domains/DomainsPage.vue'
import NginxFilesPage from '@/pages/NginxFiles/NginxFilesPage.vue'
import RoutesPage from '@/pages/Routes/RoutesPage.vue'
import ServicesPage from '@/pages/Services/ServicesPage.vue'
import NotFoundPage from '@/pages/NotFound/NotFoundPage.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'app:main',
		component: MainPage,
		props: { store_path: ["MainPage"] },
	},
	{
		path: '/applications/',
		name: 'app:applications',
		component: ApplicationsPage,
		props: { store_path: ["ApplicationsPage"] },
	},
	{
		path: '/applications/status/',
		name: 'app:applications:status',
		component: ApplicationsStatusPage,
		props: { store_path: ["ApplicationsStatusPage"] },
	},
	{
		path: '/applications/templates/',
		name: 'app:applications:templates',
		component: ApplicationsPage,
		props: { store_path: ["ApplicationsPage"] },
	},
	{
		path: '/applications/modificators/',
		name: 'app:applications:modificators',
		component: ApplicationsPage,
		props: { store_path: ["ApplicationsPage"] },
	},
	{
		path: '/applications/files/',
		name: 'app:applications:files',
		component: ApplicationsPage,
		props: { store_path: ["ApplicationsPage"] },
	},
	{
		path: '/domains/',
		name: 'app:domains',
		component: DomainsPage,
		props: { store_path: ["DomainsPage"] },
	},
	{
		path: '/nginx_files/',
		name: 'app:nginx_files',
		component: NginxFilesPage,
		props: { store_path: ["NginxFilesPage"] },
	},
	{
		path: '/routes/',
		name: 'app:routes',
		component: RoutesPage,
		props: { store_path: ["RoutesPage"] },
	},
	{
		path: '/services/',
		name: 'app:services',
		component: ServicesPage,
		props: { store_path: ["ServicesPage"] },
	},
	{
		path: "/:pathMatch(.*)*",
		name: 'app:page_not_found',
		component: NotFoundPage,
		props: { store_path: ["NotFoundPage"] },
	}
]

const router = createRouter({
	history: createWebHistory("/"),
	routes
})

export default router
