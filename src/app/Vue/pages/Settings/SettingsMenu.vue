<!--
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020 - 2022 "Ildar Bikmamatov" <support@bayrell.org>
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

<template>
	
	<div class="components_tabs">
		<div class="components_tabs__top">
			
			<!-- Users -->
			<router-link :to="{ name: 'app:users' }" custom
				v-slot="{ href, navigate, route }"
			>
				<a :href="href" @click="navigate"
					class="nolink components_tabs__tab"
					v-bind:class="{ active: isActive(route) }"
				>
					Users
				</a>
			</router-link>
			
			<!-- Groups -->
			<router-link :to="{ name: 'app:groups' }" custom
				v-slot="{ href, navigate, route }"
			>
				<a :href="href" @click="navigate"
					class="nolink components_tabs__tab"
					v-bind:class="{ active: isActive(route) }"
				>
					Groups
				</a>
			</router-link>
			
			<!-- Database -->
			<a class="components_tabs__tab nolink"
				href="/api/database/">
					Database
			</a>
		</div>
	</div>
	
	<div class="components_tabs__content" label="Info">
		<slot></slot>
	</div>
	
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin } from "vue-helper";


export const SettingsMenu =
{
	mixins: [ mixin ],
	data: function()
	{
		let data = {
		};
		return data;
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
					this.$router.currentRoute.value.name.substr(0, route_name.length)
						== route_name
				)
				{
					return true;
				}
			}
			return false;
		},
		
		/* Tab select */
		onTabSelect(tab_name)
		{
			if (tab_name == "users")
			{
			}
			else if (tab_name == "groups")
			{
			}
			else if (tab_name == "database")
			{
				document.location = "/api/database/adminer/";
			}
		},
	}
};

export default defineComponent(SettingsMenu);

</script>

