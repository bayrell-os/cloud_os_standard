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
.app_layout_menu_item_label{
	font-size: 14px;
    font-weight: bold;
    padding: 10px;
}
.app_layout_menu_item a{
	display: block;
	padding: 10px;
	border-bottom: 1px solid $color_border;
}
.app_layout_menu_item a:hover{
	background-color: $color_hover;
}
.app_layout_menu_item a.active, .app_layout_menu_item a.active:hover{
	background-color: $color_selected;
	border-color: $color_selected;
	color: $color_selected_background;
}
</style>


<template>
	<div>
		
		<div
			v-for="item, sub_index in items" :key="sub_index"
		>
			<div class='app_layout_menu_item'
				v-if="item.name != undefined"
			>
				<router-link :to="{ name: item.name }" custom
					v-slot="{ href, navigate, route }"
				>
					<a :href="href" @click="navigate" class="nolink"
						v-bind:data-route-name="route.name"
						v-bind:class="{ active: isActive(item) }"
					>
						{{ item.title }}
					</a>
				</router-link>
			</div>
			
			<div class="app_layout_menu_item"
				v-else-if="item.href != undefined"
			>
				<a :href="item.href" class="nolink">
					{{ item.title }}
				</a>
			</div>
			
			<div class="app_layout_menu_item"
				v-else-if="item.items != undefined"
			>
				<div class="app_layout_menu_item_label">
					{{ item.title }}
				</div>
				<AppMenu v-bind:items="item.items" />
			</div>
		</div>
		
	</div>
</template>


<script lang="js">
import { defineComponent } from 'vue';
import { mixin } from "vue-helper";

export const AppMenu =
{
	mixins: [ mixin ],
	props: ["items"],
	components:
	{
		AppMenu,
	},
	computed:
	{
	},
	methods:
	{
		isActive: function(route)
		{
			let route_name = route.name;
			if (this.$router.currentRoute.value.name != undefined)
			{
				if (route.routes != undefined)
				{
					if (route.routes.indexOf(this.$router.currentRoute.value.name) > -1)
					{
						return true;
					}
				}
				if
				(
					this.$router.currentRoute.value.name.substr(0, route_name.length) == route_name
				)
				{
					return true;
				}
			}
			return false;
		},
	}
};

export default defineComponent(AppMenu);

</script>