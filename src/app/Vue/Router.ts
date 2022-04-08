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
import ApplicationsEditPage from '@/pages/Applications/ApplicationsEditPage.vue'
import ModificatorsPage from '@/pages/Modificators/ModificatorsPage.vue'
import TemplatesPage from '@/pages/Templates/TemplatesPage.vue'
import DomainsPage from '@/pages/Domains/DomainsPage.vue'
import NginxFilesPage from '@/pages/NginxFiles/NginxFilesPage.vue'
import RoutesPage from '@/pages/Routes/RoutesPage.vue'
import UsersPage from '@/pages/Users/UsersPage.vue'
import ServicesPage from '@/pages/Services/ServicesPage.vue'
import YamlFilesPage from '@/pages/YamlFiles/YamlFilesPage.vue'
import NotFoundPage from '@/pages/NotFound/NotFoundPage.vue'

const routes: Array<RouteRecordRaw> =
[
	{
		path: '/',
		name: 'app:main',
		component: MainPage,
		props: { store_path: ["MainPage"] },
	},
	
	/* Market placae */
	{
		path: '/marketplace/',
		name: 'app:marketplace',
		component: NotFoundPage,
		props: { store_path: ["NotFoundPage"] },
	},
	
	/* Status */
	{
		path: '/applications/',
		name: 'app:applications',
		component: ApplicationsPage,
		props: { store_path: ["ApplicationsPage"] },
	},
	
	/* Run app */
	{
		path: '/applications/edit/:id/',
		name: 'app:applications:edit',
		component: ApplicationsEditPage,
		props: { store_path: ["ApplicationsEditPage"] },
	},
	
	/* Modificators */
	{
		path: '/modificators/',
		name: 'app:modificators',
		component: ModificatorsPage,
		props:
		{
			store_path: ["ModificatorsPage"],
			page_action: "list"
		},
	},
	{
		path: '/modificators/add/',
		name: 'app:modificators:add',
		component: ModificatorsPage,
		props: { store_path: ["ModificatorsPage"], page_action: "add" },
	},
	{
		path: '/modificators/edit/:id/',
		name: 'app:modificators:edit',
		component: ModificatorsPage,
		props: { store_path: ["ModificatorsPage"], page_action: "edit" },
	},
	
	/* Templates */
	{
		path: '/templates/',
		name: 'app:templates',
		component: TemplatesPage,
		props:
		{
			store_path: ["TemplatesPage"],
			page_action: "list"
		},
	},
	{
		path: '/templates/add/',
		name: 'app:templates:add',
		component: TemplatesPage,
		props: { store_path: ["TemplatesPage"], page_action: "add" },
	},
	{
		path: '/templates/edit/:id/',
		name: 'app:templates:edit',
		component: TemplatesPage,
		props: { store_path: ["TemplatesPage"], page_action: "edit" },
	},
	
	/* Domains */
	{
		path: '/domains/',
		name: 'app:domains',
		component: DomainsPage,
		props: { store_path: ["DomainsPage"] },
	},
	
	/* Yaml Files */
	{
		path: '/yaml_files/',
		name: 'app:yaml_files',
		component: YamlFilesPage,
		props:
		{
			store_path: ["YamlFilesPage"],
			action: "list",
		}
	},
	{
		path: '/yaml_files/add/',
		name: 'app:yaml_files:add',
		component: YamlFilesPage,
		props: { store_path: ["YamlFilesPage"], page_action: "add" },
	},
	{
		path: '/yaml_files/edit/:id/',
		name: 'app:yaml_files:edit',
		component: YamlFilesPage,
		props: { store_path: ["YamlFilesPage"], page_action: "edit" }
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
	
	/* Users */
	{
		path: '/users/',
		name: 'app:users',
		component: UsersPage,
		props: { store_path: ["UsersPage"] },
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
