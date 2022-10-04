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

<style lang="scss">

</style>


<template>
	<CrudList v-bind:store_path="store_path" v-bind:page_action="page_action">
		<template v-slot:top_buttons>
			<div class="component_crud__top_button" >
				
				<router-link custom
					:to="{ name: 'app:templates:import'}"
					v-slot="{ href, navigate, route }"
				>
					<a :href="href" @click="navigate" class="nolink"
						v-bind:data-route-name="route.name"
					>
						<Button type="success">
							Import template
						</Button>
					</a>
				</router-link>
				
			</div>
		</template>
	</CrudList>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone, onRouteUpdate } from "vue-helper";
import { CrudList } from "vue-helper/Crud/CrudList.vue";
import { CRUD_EVENTS } from "vue-helper/Crud/CrudState";



/**
 * Status page
 */
export const TemplatesListPage =
{
	name: "TemplatesListPage",
	mixins: [mixin],
	components:
	{
	},
	methods:
	{
	}
}
componentExtend(TemplatesListPage, CrudList);
export default defineComponent(TemplatesListPage);

</script>
