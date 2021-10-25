<!--
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
-->

<style lang="scss">
@import '@/variable.scss';
.applications_page__menu{
	display: flex;
}
.applications_page__menu_item{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 150px;
	border: 1px $color_border solid;
	border-left: 0px;
}
.applications_page__menu_item:first-child{
	border-left: 1px $color_border solid;
}
.applications_page__menu_item a{
	width: 100%; height: 100%;
	padding: 20px 10px;
}
.applications_page__menu_item.active a,
.applications_page__menu_item.active a:hover{
	background-color: $color_selected;
	border-color: $color_selected;
	color: $color_selected_background;
}
.applications_page__content{
	padding-top: 10px;
}
</style>

<template>
	<div class='applications_page'>
		
		<div class='applications_page__menu'>
			
			<router-link :to="{path: item.href}" custom
				v-for="item in menu" :key="item.id"
				v-slot="{ navigate, route }"
			>
				<div class='applications_page__menu_item'
					v-bind:class="{ active: isActive(item.name) }">
					<a :href="item.href" @click="navigate" class="nolink b_out"
						v-bind:data-route-name="route.name"
					>
						<div class="b_in">
							{{ item.title }}
						</div>
					</a>
				</div>
			</router-link>
			
		</div>
		
		<div class='applications_page__content'>
			<slot name="content">
			</slot>
		</div>
		
	</div>
</template>

<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone } from "vue-helper";
import { Crud } from '@/components/Crud/Crud.vue';
import { CRUD_EVENTS } from '@/components/Crud/CrudState';
import { Application, ApplicationsPageState } from './ApplicationsPageState';
import Button from '@/components/Crud/Button.vue';
import CodeMirror from '@/components/Crud/CodeMirror.vue';
import Dialog from '@/components/Dialog/Dialog.vue';

export const ApplicationsPage =
{
	name: "ApplicationsPage",
	mixins: [mixin],
	data: function () {
		return {
			menu: [
				{
					"id": 1,
					"href": "/applications/status/",
					"name": "app:applications:status",
					"title": "Запущенные приложения",
				},
				{
					"id": 2,
					"href": "/applications/templates/",
					"name": "app:applications:templates",
					"title": "Шаблоны приложений",
				},
				{
					"id": 3,
					"href": "/applications/modificators/",
					"name": "app:applications:modificators",
					"title": "Модификаторы шаблонов",
				},
				{
					"id": 4,
					"href": "/applications/files/",
					"name": "app:applications:files",
					"title": "Файлы",
				},
			]
		}
	},
	components:
	{

	},
	methods:
	{
		isActive: function(route_name)
		{
			if (this.$router.currentRoute.value.name != undefined)
			{
				if (this.$router.currentRoute.value.name.substr(0, route_name.length)
					== route_name)
				{
					return true;
				}
			}
			return false;
		},
	},
	mounted()
	{
		this.setPageTitle("Applications");
	}
}


export default defineComponent(ApplicationsPage);

</script>
