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
.app_layout_menu_label{
	font-size: 14px;
	font-weight: bold;
	padding: 10px;
}
.app_layout_menu{
	position: relative;
	height: calc(100% - 40px);
	overflow-y: auto;
	border-right: 1px $color_border solid;
}
.app_layout_menu_items ul, .app_layout_menu_items li{
	padding: 0; margin: 0;
	list-style: none;
}
.app_layout_menu_items li{
	background-color: white;
}
.app_layout_menu_items li:hover{
	background-color: $color_hover;
}
.app_layout_menu_items li a{
	display: block;
	padding: 10px 15px;
	border-bottom: 1px solid $color_border;
}
.app_layout_menu_items li.active > a, .app_layout_menu_items li.active > a:hover{
	background-color: $color_selected;
	border-color: $color_selected;
	color: $color_selected_background;
}
.app_layout_menu_logout{
	text-align: center;
	padding-top: 100px;
}
.app_layout_menu_logout > div{
	padding-top: 5px;
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
					
					<div class='app_layout_menu_label'>
						Dashboard
					</div>
					
					<div class='app_layout_menu_items'>
						<ul>
							<router-link :to="{path: item.href}" custom
								v-slot="{ href, navigate, route }"
								v-for="item in menu"
								v-bind:key="item.id"
							>
								<li v-bind:class="{ active: isActive(item.name) }">
									<a :href="href" @click="navigate" class="nolink"
										v-bind:data-route-name="route.name">
										{{ item.title }}
									</a>
								</li>
							</router-link>
							<li>
								<a href="/api/database/" class="nolink">
									Adminer
								</a>
							</li>
						</ul>
					</div>
				
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

export const App =
{
	mixins: [ mixin ],
	data: function () {
		return {
			menu: [
				{ "id": 1, "name": "app:main", "href": "/", "title": "Main" },
				{ "id": 8, "name": "app:applications:status", "href": "/applications/status/", "title": "Status" },
				{ "id": 9, "name": "app:applications:templates", "href": "/applications/templates/", "title": "Templates" },
				{ "id": 10, "name": "app:applications:modificators", "href": "/applications/modificators/", "title": "Modificators" },
				{ "id": 11, "name": "app:applications:files", "href": "/applications/files/", "title": "App Files" },
				{ "id": 3, "name": "app:services", "href": "/services/", "title": "Services" },
				{ "id": 4, "name": "app:domains", "href": "/domains/", "title": "Domains" },
				{ "id": 5, "name": "app:routes", "href": "/routes/", "title": "Routes" },
				{ "id": 6, "name": "app:nginx_files", "href": "/nginx_files/", "title": "Nginx Files" },
				{ "id": 7, "name": "app:users", "href": "/users/", "title": "Users" },
			]
		}
	},
	computed:
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
	}
};

export default defineComponent(App);

</script>