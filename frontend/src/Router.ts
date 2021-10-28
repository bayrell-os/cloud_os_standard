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
import ApplicationsFilesPage from '@/pages/ApplicationsFiles/ApplicationsFilesPage.vue'
import ApplicationsModificatorsPage from '@/pages/ApplicationsModificators/ApplicationsModificatorsPage.vue'
import ApplicationsStatusPage from '@/pages/ApplicationsStatus/ApplicationsStatusPage.vue'
import ApplicationsTemplatesPage from '@/pages/ApplicationsTemplates/ApplicationsTemplatesPage.vue'
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
	
	/* Status */
	{
		path: '/applications/status/',
		name: 'app:applications:status',
		component: ApplicationsStatusPage,
		props: { store_path: ["ApplicationsStatusPage"] },
	},
	
	/* Files */
	{
		path: '/applications/files/',
		name: 'app:applications:files',
		component: ApplicationsFilesPage,
		props:
		{
			store_path: ["ApplicationsFilesPage"],
			action: "list",
		},
	},
	{
		path: '/applications/files/add/',
		name: 'app:applications:files:add',
		component: ApplicationsFilesPage,
		props: { store_path: ["ApplicationsFilesPage"], action: "add" },
	},
	{
		path: '/applications/files/edit/:id/',
		name: 'app:applications:files:edit',
		component: ApplicationsFilesPage,
		props: { store_path: ["ApplicationsFilesPage"], action: "edit" },
	},
	
	/* Modificators */
	{
		path: '/applications/modificators/',
		name: 'app:applications:modificators',
		component: ApplicationsModificatorsPage,
		props:
		{
			store_path: ["ApplicationsModificatorsPage"],
			action: "list"
		},
	},
	{
		path: '/applications/modificators/add/',
		name: 'app:applications:modificators:add',
		component: ApplicationsModificatorsPage,
		props: { store_path: ["ApplicationsModificatorsPage"], action: "add" },
	},
	{
		path: '/applications/modificators/edit/:id/',
		name: 'app:applications:modificators:edit',
		component: ApplicationsModificatorsPage,
		props: { store_path: ["ApplicationsModificatorsPage"], action: "edit" },
	},
	
	/* Templates */
	{
		path: '/applications/templates/',
		name: 'app:applications:templates',
		component: ApplicationsTemplatesPage,
		props:
		{
			store_path: ["ApplicationsTemplatesPage"],
			action: "list"
		},
	},
	{
		path: '/applications/templates/add/',
		name: 'app:applications:templates:add',
		component: ApplicationsTemplatesPage,
		props: { store_path: ["ApplicationsTemplatesPage"], action: "add" },
	},
	{
		path: '/applications/templates/edit/:id/',
		name: 'app:applications:templates:edit',
		component: ApplicationsTemplatesPage,
		props: { store_path: ["ApplicationsTemplatesPage"], action: "edit" },
	},
	
	/* Domains */
	{
		path: '/domains/',
		name: 'app:domains',
		component: DomainsPage,
		props: { store_path: ["DomainsPage"] },
	},
	
	/* Nginx files */
	{
		path: '/nginx_files/',
		name: 'app:nginx_files',
		component: NginxFilesPage,
		props: { store_path: ["NginxFilesPage"] },
	},
	
	/* Routes */
	{
		path: '/routes/',
		name: 'app:routes',
		component: RoutesPage,
		props: { store_path: ["RoutesPage"] },
	},
	
	/* Services */
	{
		path: '/services/',
		name: 'app:services',
		component: ServicesPage,
		props: { store_path: ["ServicesPage"] },
	},
	
	/* Page not found */
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
