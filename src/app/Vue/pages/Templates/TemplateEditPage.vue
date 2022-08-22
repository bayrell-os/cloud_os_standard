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
		
		<template v-slot:component_crud_save_before>
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
export const TemplateEditPage =
{
	name: "TemplateEditPage",
	mixins: [mixin],
	components:
	{
	},
	methods:
	{
		onSaveFormButtonBackClick: function()
		{
			if (this.model.page_action == "add")
			{
				this.$router.push({
					name: "app:templates"
				});
			}
			else
			{
				this.$router.push({
					name: "app:templates:view",
					params: {
						template_id: this.model.form_save.item.template_id
					}
				});
			}
		},
	}
}
componentExtend(TemplateEditPage, CrudList);
export default defineComponent(TemplateEditPage);

</script>
