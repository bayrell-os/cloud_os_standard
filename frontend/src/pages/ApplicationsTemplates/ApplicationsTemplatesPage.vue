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

</style>


<template>
	<div class="applications_status_page">
		<ApplicationsPage v-bind:store_path="store_path">
			<template v-slot:content>
				<Crud2 v-bind:store_path="store_path" />
			</template>
		</ApplicationsPage>
	</div>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone } from "vue-helper";
import { ApplicationsPage } from './ApplicationsPage.vue';
import { Crud } from '@/components/Crud/Crud.vue';


/**
 * Crud table
 */
export const Crud2 =
{
	name: "Crud2",
	template: `<Crud v-bind:store_path="store_path">
		
	</Crud>`,
	mixins: [mixin],
	methods:
	{
	},
	mounted()
	{
	}
}
componentExtend(Crud2, Crud);


/**
 * Status page
 */
export const ApplicationsTemplatesPage =
{
	name: "ApplicationsTemplatesPage",
	mixins: [mixin],
	components:
	{
		Crud2,
	},
	methods:
	{
	},
	mounted()
	{
		this.setPageTitle("Status");
	}
}
componentExtend(ApplicationsTemplatesPage, ApplicationsPage);
export default defineComponent(ApplicationsTemplatesPage);

</script>
