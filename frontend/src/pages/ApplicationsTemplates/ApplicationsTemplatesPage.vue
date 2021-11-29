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
	<Crud v-bind:store_path="store_path" v-bind:action="action"></Crud>
	<Dialog v-bind:store_path="store_path.concat('dialog_run')"
		width="800px" buttons="false"
	>
		<template v-slot:title>
			{{ model.constructor.getMessage("form_run_title", model.form_run.item) }}
		</template>
		<template v-slot:content>
			<Form v-bind:store_path="store_path.concat('form_run')">
				<template v-slot:buttons>
					<Button type="success" @click="onDialogFormButtonClick('form_run')">Run</Button>
					<Button type="" @click="onDialogFormButtonClick('form_run_cancel')">Cancel</Button>
				</template>
			</Form>
		</template>
	</Dialog>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone, onRouteUpdate } from "vue-helper";
import { Crud } from "vue-helper/Crud/Crud.vue";
import { CRUD_EVENTS } from "vue-helper/Crud/CrudState";



/**
 * Status page
 */
export const ApplicationsTemplatesPage =
{
	name: "ApplicationsTemplatesPage",
	mixins: [mixin, Crud],
	components:
	{
	},
	methods:
	{
		onCrudEvent: function($event)
		{
			if ($event.event_name == CRUD_EVENTS.ROW_BUTTON_CLICK && $event.button_name == "run")
			{
				this.model.showRunForm($event.crud_item);
			}
			else
			{
				Crud.methods.onCrudEvent.apply(this, [$event]);
			}
		},
		onDialogFormButtonClick: function(action)
		{
			if (action == "form_run")
			{
				this.model.showRunForm()
			}
			else if (action == "form_run_cancel")
			{
				this.model.dialog_run.hide();
			}
			else
			{
				Crud.methods.onDialogFormButtonClick.apply(this, [action]);
			}
		}
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
componentExtend(ApplicationsTemplatesPage, Crud);
export default defineComponent(ApplicationsTemplatesPage);

</script>
