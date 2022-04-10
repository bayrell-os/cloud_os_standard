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
.app_layout{
	height: 100%;
}
.app_layout_wrap{
	position: relative;
	display: flex;
	align-items: stretch;
	min-height: 100%;
}
.app_layout_menu_wrap{
	position: relative;
	width: 200px;
}
.app_layout_content_wrap{
	position: relative;
	width: calc(100% - 200px);
	padding-bottom: 10px;
}
.app_layout_site_name, .app_layout_title, .app_layout_top_menu{
	font-size: 16px;
	height: 40px;
}
.app_layout_site_name, .app_layout_title, .app_layout_top_menu,
.app_layout_page, .app_layout_content{
	padding: 10px;
}
.app_layout_top_menu_item{
	padding-left: 10px;
	padding-right: 10px;
}
.app_layout_site_name{
	border-right: 1px $color_border solid;
}
.app_layout_top_menu{
	display: flex;
	align-items: stretch;
}
.app_layout_content{
	position: relative;
	height: calc(100% - 70px);
	padding-bottom: 0;
	padding-right: 0;
}
.app_layout_menu{
	position: relative;
	height: calc(100% - 40px);
	overflow-y: auto;
	border-right: 1px $color_border solid;
}
</style>


<template>
	<div class='app_layout'>
		<div class='app_layout_wrap'>
			<div class='app_layout_menu_wrap'>
				<div class='app_layout_site_name'>
					<a class='nolink' href='/'>Cloud OS</a>
				</div>
				
				<div class='app_layout_menu'>
					<AppMenu v-bind:items="menu" />
				</div>
			</div>
			<div class='app_layout_content_wrap'>
				<div class='app_layout_title'>{{ model.title }}</div>
				<div class='app_layout_content'>
					<router-view />
				</div>
			</div>
		</div>
	</div>
</template>


<script lang="js">
import { defineComponent } from 'vue';
import { mixin } from "vue-helper";
import { AppMenu } from "./AppMenu";


export const App =
{
	mixins: [ mixin ],
	components:
	{
		AppMenu,
	},
	data: function () {
		return {
			menu:
			[
				
				{ "name": "app:main", "title": "Main" },
				
				{
					"title": "Applications",
					"items":
					[
						{ "name": "app:applications", "title": "Applications" },
						{ "name": "app:templates", "title": "Templates" },
						{ "name": "app:modificators", "title": "Modificators" },
					]
				},
				
				{
					"title": "Docker Swarm",
					"items":
					[
						{ "name": "app:services", "title": "Services" },
						{ "name": "app:yaml_files", "title": "Yaml Files" },
					]
				},
				
				{
					"title": "Cloud OS",
					"items":
					[
						{ "name": "app:domains", "title": "Domains" },
						{ "name": "app:routes","title": "Routes" },
						{ "name": "app:nginx_files", "title": "Nginx Files" },
						{ "name": "app:users", "title": "Users" },
					]
				},
				
				
				{
					"title": "Control",
					"items":
					[
						{ "href": "/api/database/", "title": "Adminer" },
					]
				},
			]
		}
	},
	computed:
	{
	},
	methods:
	{
	}
};

export default defineComponent(App);

</script>