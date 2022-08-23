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
import components from "./components.js";

const routes =
[
	{
		path: '/',
		name: 'app:main',
		component: components.MainPage,
		props: { store_path: ["MainPage"] },
	},
	
	/* Market placae */
	{
		path: '/marketplace/',
		name: 'app:marketplace',
		component: components.NotFoundPage,
		props: { store_path: ["NotFoundPage"] },
	},
	
	/* Status */
	{
		path: '/applications/',
		name: 'app:applications',
		component: components.ApplicationsPage,
		props: { store_path: ["ApplicationsPage"] },
	},
	
	/* Run app */
	{
		path: '/applications/edit/:id/',
		name: 'app:applications:edit',
		component: components.ApplicationsEditPage,
		props: { store_path: ["ApplicationsEditPage"], page_action: "edit" },
	},
	
	/* Modificators */
	{
		path: '/modificators/',
		name: 'app:modificators',
		component: components.ModificatorsPage,
		props:
		{
			store_path: ["ModificatorsPage"],
			page_action: "list"
		},
	},
	{
		path: '/modificators/add/',
		name: 'app:modificators:add',
		component: components.ModificatorsPage,
		props: { store_path: ["ModificatorsPage"], page_action: "add" },
	},
	{
		path: '/modificators/edit/:id/',
		name: 'app:modificators:edit',
		component: components.ModificatorsPage,
		props: { store_path: ["ModificatorsPage"], page_action: "edit" },
	},
	
	/* Templates */
	{
		path: '/templates/',
		name: 'app:templates',
		component: components.TemplatesListPage,
		props:
		{
			store_path: ["TemplatesListPage"],
			page_action: "list"
		},
	},
	{
		path: '/templates/view/:template_id/',
		name: 'app:templates:view',
		component: components.TemplatesViewPage,
		props: { store_path: ["TemplatesViewPage"], page_action: "list" },
	},
	{
		path: '/templates/import/',
		name: 'app:templates:import',
		component: components.TemplateEditPage,
		props: { store_path: ["TemplateEditPage"], page_action: "add" },
	},
	{
		path: '/templates/edit/:id/',
		name: 'app:templates:edit',
		component: components.TemplateEditPage,
		props: { store_path: ["TemplateEditPage"], page_action: "edit" },
	},
	
	/* Domains */
	{
		path: '/domains/',
		name: 'app:domains',
		component: components.DomainsPage,
		props: { store_path: ["DomainsPage"] },
	},
	
	/* Yaml Files */
	{
		path: '/yaml_files/',
		name: 'app:yaml_files',
		component: components.YamlFilesPage,
		props:
		{
			store_path: ["YamlFilesPage"],
			action: "list",
		}
	},
	{
		path: '/yaml_files/add/',
		name: 'app:yaml_files:add',
		component: components.YamlFilesPage,
		props: { store_path: ["YamlFilesPage"], page_action: "add" },
	},
	{
		path: '/yaml_files/edit/:id/',
		name: 'app:yaml_files:edit',
		component: components.YamlFilesPage,
		props: { store_path: ["YamlFilesPage"], page_action: "edit" }
	},
	
	/* Nginx files */
	{
		path: '/nginx_files/',
		name: 'app:nginx_files',
		component: components.NginxFilesPage,
		props: { store_path: ["NginxFilesPage"] },
	},
	
	/* Routes */
	{
		path: '/routes/',
		name: 'app:routes',
		component: components.RoutesPage,
		props: { store_path: ["RoutesPage"] },
	},
	
	/* Services */
	{
		path: '/services/',
		name: 'app:services',
		component: components.ServicesPage,
		props: { store_path: ["ServicesPage"] },
	},
	
	/* Spaces */
	{
		path: '/spaces/',
		name: 'app:spaces:list',
		component: components.SpaceListPage,
		props: { store_path: ["SpaceListPage"], page_action: "list" },
	},
	{
		path: '/spaces/edit/:id/',
		name: 'app:spaces:edit',
		component: components.SpaceSavePage,
		props: { store_path: ["SpaceSavePage"], page_action: "edit" },
	},
	
	/* Groups */
	{
		path: '/settings/groups/',
		name: 'app:groups',
		component: components.GroupsPage,
		props: { store_path: ["GroupsPage"] },
	},
	
	/* Users */
	{
		path: '/settings/users/',
		name: 'app:users',
		component: components.UsersPage,
		props: { store_path: ["UsersPage"] },
	},
	
	/* Page not found */
	{
		path: "/:pathMatch(.*)*",
		name: 'app:page_not_found',
		component: components.NotFoundPage,
		props: { store_path: ["NotFoundPage"] },
	}
]

const router = createRouter({
	history: createWebHistory("/"),
	routes
})

export default router
