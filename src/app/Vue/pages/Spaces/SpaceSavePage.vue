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
.space_save_page{
	&__tabs{
		padding-top: 0px;
	}
}
</style>


<template>
	<div class="space_save_page">
		<CrudSave v-bind:store_path="store_path">
			<template v-slot:component_crud_save_after>
				
				<div class="space_save_page__tabs">
					<Tabs>
						
						<Tab name="Domains" selected="true">
							<SpaceDomains v-bind:store_path="store_path.concat(['domains'])" />
						</Tab>
						
						<Tab name="Routes">
							<SpaceRoutes
								v-bind:store_path="store_path.concat(['routes'])" />
						</Tab>
						
						<Tab name="Users">
							<SpaceUsers
								v-bind:store_path="store_path.concat(['users'])" />
						</Tab>
						
						<Tab name="Roles">
							<SpaceRoles
								v-bind:store_path="store_path.concat(['roles'])" />
						</Tab>
						
					</Tabs>
				</div>
				
			</template>
		</CrudSave>
	</div>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, onRouteUpdate, setPageTitle } from "vue-helper";
import { CrudList } from "vue-helper/Crud/CrudList.vue";
import { SpacesPageState } from './SpacesPageState';

export const SpaceSavePage =
{
	name: "SpaceSavePage",
	mixins: [mixin],
	methods:
	{
	}
}

componentExtend(SpaceSavePage, CrudList);
export default defineComponent(SpaceSavePage);

</script>
