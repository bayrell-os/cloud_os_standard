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

<style lang="scss" scoped>
.layout{
	height: 100%;
}
.layout_wrap{
	position: relative;
	display: flex;
	align-items: stretch;
	min-height: 100%;
}
.layout_menu_wrap{
	position: relative;
	width: 200px;
}
.layout_content_wrap{
	position: relative;
	width: calc(100% - 200px);
	padding-bottom: 10px;
}
.layout_site_name, .layout_title, .layout_top_menu{
	font-size: 16px;
	height: 40px;
}
.layout_site_name, .layout_title, .layout_top_menu, .layout_page, .layout_content{
	padding: 10px;
}
.layout_top_menu_item{
	padding-left: 10px;
	padding-right: 10px;
}
.layout_site_name{
	border-right: 1px #ccc solid;
}
.layout_top_menu{
	display: flex;
	align-items: stretch;
}
.layout_content{
	position: relative;
	height: calc(100% - 70px);
	padding-bottom: 0;
	padding-right: 0;
}
.layout_menu_label{
	font-size: 14px;
	font-weight: bold;
	padding: 10px;
}
.layout_menu{
	position: relative;
	height: calc(100% - 40px);
	overflow-y: auto;
	border-right: 1px #ccc solid;
}
.layout_menu_items ul, .layout_menu_items li{
	padding: 0; margin: 0;
	list-style: none;
}
.layout_menu_items li{
	background-color: white;
}
.layout_menu_items li:hover{
	background-color: #eee;
}
.layout_menu_items li a{
	display: block;
	padding: 10px 15px;
	border-bottom: 1px solid #e7e7e7;
}
.layout_menu_items li.active > a, %layout_menu_items li.active > a:hover{
	background-color: #337ab7;
	border-color: #337ab7;
	color: white;
}
.layout_menu_logout{
	text-align: center;
	padding-top: 100px;
}
.layout_menu_logout > div{
	padding-top: 5px;
}
</style>


<template>
	<div class='layout'>
		<div class='layout_wrap'>
			<div class='layout_menu_wrap'>
				
				<div class='layout_site_name'>
					<a class='nolink' href='/'>Cloud OS</a>
				</div>
				
				<div class='layout_menu'>
					<div class='layout_menu_label'>
						Dashboard
					</div>
					<div class='layout_menu_items'>
						<ul>
							<router-link :to="{path: item.href}" custom
								v-slot="{ href, navigate, isActive }"
								v-for="item in menu"
								v-bind:key="item.id"
							>
								<li v-bind:class="{ active: isActive }">
									<a :href="href" @click="navigate" class="nolink">
										{{ item.title }}
									</a>
								</li>
							</router-link>
						</ul>
					</div>
				
				</div>
			</div>
			<div class='layout_content_wrap'>
				<div class='layout_title'>{{ model.title }}</div>
				<div class='layout_content'>
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
				{ "id": 1, "href": "/", "title": "Main" },
				{ "id": 2, "href": "/applications/", "title": "Applications" },
				{ "id": 3, "href": "/services/", "title": "Services" },
				{ "id": 4, "href": "/domains/", "title": "Domains" },
				{ "id": 5, "href": "/routes/", "title": "Routes" },
				{ "id": 6, "href": "/nginx/", "title": "Nginx Files" },
				{ "id": 7, "href": "/users/", "title": "Users" },
				{ "id": 8, "href": "/database/", "title": "Adminer" },
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