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
	<ApplicationsPage type="files_page">
		<template v-slot:content>
			<CrudSave v-bind:store_path="store_path">
				
			</CrudSave>
		</template>
	</ApplicationsPage>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone } from "vue-helper";
import { ApplicationsPage } from '@/pages/Applications/ApplicationsPage.vue';
import { CrudSave } from '@/components/Crud/CrudSave.vue';


/**
 * Status page
 */
export const ApplicationsFilesSavePage =
{
	name: "ApplicationsFilesPage",
	mixins: [mixin],
	components:
	{
		ApplicationsPage,
	},
	methods:
	{
	},
	mounted()
	{
		this.setPageTitle("Files");
		this.model.constructor.apiLoadData(this);
	}
}
componentExtend(ApplicationsFilesSavePage, CrudSave);
export default defineComponent(ApplicationsFilesSavePage);

</script>
