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

<style>
.top_buttons{
	display: none;
}
</style>

<template>
	<Crud v-bind:store_path="store_path">
		<template v-slot:top_buttons><div></div></template>
	</Crud>
	<Dialog v-bind:store_path="store_path.concat('dialog_stop')">
		<template v-slot:title>
			{{ model.constructor.getMessage("dialog_stop_title", model.dialog_stop.item) }}
		</template>
		<template v-slot:text>
			{{ model.constructor.getMessage("dialog_stop_text", model.dialog_stop.item) }}
		</template>
		<template v-slot:buttons>
			<Button type="danger" @click="onDialogFormButtonClick('stop_yes')">Yes</Button>
			<Button type="" @click="onDialogFormButtonClick('stop_no')">No</Button>
		</template>
	</Dialog>
</template>

<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, onRouteUpdate } from "vue-helper";
import { Crud } from "vue-helper/Crud/Crud.vue";
import { CRUD_EVENTS, CrudEvent } from "vue-helper/Crud/CrudState";
import { ServicesPageState } from './ServicesPageState';


export const ServicesPage =
{
	name: "ServicesPage",
	mixins: [mixin],
	methods:
	{
		onCrudEvent: function($event)
		{
			if ($event.event_name == CRUD_EVENTS.ROW_BUTTON_CLICK && $event.button_name == "stop")
			{
				this.model.showStopForm($event.crud_item);
			}
			else
			{
				Crud.methods.onCrudEvent.apply(this, [$event]);
			}
		},
		onDialogFormButtonClick: function(action)
		{
			if (action == "stop_yes")
			{
				this.model.constructor.onStopForm(this);
			}
			else if (action == "stop_no")
			{
				this.model.dialog_stop.hide();
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

componentExtend(ServicesPage, Crud);
export default defineComponent(ServicesPage);

</script>
