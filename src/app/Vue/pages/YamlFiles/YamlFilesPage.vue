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
	<Crud v-bind:store_path="store_path" v-bind:page_action="page_action">
		
		<template v-slot:component_crud_save>
			<Form v-bind:store_path="store_path.concat('form_save')">
				<template v-slot:buttons>
					<Button type="success" @click="onSaveFormButtonComposeClick()">Compose</Button>
					<Button type="primary" @click="onSaveFormButtonSaveClick()">Save</Button>
				</template>
			</Form>
		</template>
		
		<!-- Delete compose ? -->
		<template v-slot:crud_after>
			<Dialog v-bind:store_path="store_path.concat('dialog_compose')">
				<template v-slot:text>
					Compose file {{ model.constructor.getItemName(model.dialog_compose.item) }}?
				</template>
				<template v-slot:buttons>
					<Button type="danger" @click="onDialogComposeButtonClick('yes')">Yes</Button>
					<Button type="" @click="onDialogComposeButtonClick('no')">No</Button>
				</template>
			</Dialog>
		</template>
		
	</Crud>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone, onRouteUpdate } from "vue-helper";
import { Crud } from "vue-helper/Crud/Crud.vue";


/**
 * Status page
 */
export const ApplicationsFilesPage =
{
	name: "ApplicationsFilesPage",
	mixins: [mixin, Crud],
	components:
	{
	},
	methods:
	{
		onSaveFormButtonComposeClick: function()
		{
			this.model.showCompose(this.model.form_save.item);
		},
		onDialogComposeButtonClick: function(button_name)
		{
			if (button_name == "yes")
			{
				this.model.doCompose();
			}
			else
			{
				this.model.dialog_compose.hide();
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
componentExtend(ApplicationsFilesPage, Crud);
export default defineComponent(ApplicationsFilesPage);

</script>
