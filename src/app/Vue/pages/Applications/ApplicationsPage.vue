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
	<Crud v-bind:store_path="store_path" />
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone, onRouteUpdate } from "vue-helper";
import { CrudEvent, CRUD_EVENTS } from "vue-helper/Crud/CrudState";
import { Crud } from "vue-helper/Crud/Crud.vue";


/**
 * Status page
 */
export const ApplicationsPage =
{
	name: "ApplicationsPage",
	mixins: [mixin],
	components:
	{
	},
	methods:
	{
		onCrudFormEvent: function($event, form_name)
		{
			if (form_name == "form_save" && $event.event_name == CRUD_EVENTS.ITEM_CHANGE)
			{
				if ($event.item_name == "template_id")
				{
					this.model.reloadTemplatesVersions();
				}
			}
		},
	},
	beforeRouteEnter(to, from, next)
	{
		onRouteUpdate("beforeRouteEnter", to, from, next);
	},
	beforeRouteUpdate(to, from, next)
	{
		onRouteUpdate("beforeRouteUpdate", to, from, next);
	}
}
componentExtend(ApplicationsPage, Crud);
export default defineComponent(ApplicationsPage);

</script>
