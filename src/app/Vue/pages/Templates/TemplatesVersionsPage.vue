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
.template_view_page__table_before{
	/* padding-bottom: 10px; */
	label{
		display: block;
		font-weight: bold;
		padding-bottom: 5px;
	}
	&_row{
		padding-bottom: 10px;
	}
}
</style>


<template>
	<CrudList v-bind:store_path="store_path" v-bind:page_action="page_action">
		<template v-slot:top_buttons>
			<Button type="primary" @click="onSaveFormButtonBackClick()">Back</Button>
		</template>
		
		<template v-slot:table_before>
			<div class="template_view_page__table_before" v-if="model.template != null">
				<div class="template_view_page__table_before_row">
					<label>Template:</label>
					<div class="template_view_page__table_before_value">
						{{ model.template.name }}
					</div>
				</div>
				<div class="template_view_page__table_before_row">
					<label>UID:</label>
					<div class="template_view_page__table_before_value">
						{{ model.template.uid }}
					</div>
				</div>
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
export const TemplatesVersionsPage =
{
	name: "TemplatesVersionsPage",
	mixins: [mixin],
	components:
	{
	},
	methods:
	{
		onSaveFormButtonBackClick: function()
		{
			this.$router.push({
				name: "app:templates"
			});
		},
	}
}
componentExtend(TemplatesVersionsPage, CrudList);
export default defineComponent(TemplatesVersionsPage);

</script>
