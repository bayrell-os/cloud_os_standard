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
.component_row_buttons button{
	margin-left: 2px;
	margin-right: 2px;
}
.component_row_button{
	display: inline-block;
	vertical-align: middle;
}
</style>


<template>
	<div class="component_row_buttons">
		
		<div class="component_row_button"
			v-if="crud.route_names != undefined && crud.route_names.edit != undefined"
		>
			<router-link custom
				:to="{ name: crud.route_names.edit, params: { id: getItemId() }}"
				v-slot="{ href, navigate, route }"
			>
				<a :href="href" @click="navigate" class="nolink"
					v-bind:data-route-name="route.name"
				>
					<Button type="default" small="true">Edit</Button>
				</a>
			</router-link>
		</div>
		
		<div class="component_row_button" v-else
		>
			<Button type="default" small="true" @click="onButtonClick('edit')">Edit</Button>
		</div>
		
		<div class="component_row_button">
			<Button type="danger" small="true" @click="onButtonClick('delete')">Delete</Button>
		</div>
	</div>
</template>


<script lang="js">

import Button from "./Button";
import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone } from 'vue-helper';
import { CrudEvent, CRUD_EVENTS } from "./CrudState";
import { Field } from './Field.vue';


export const RowButtons =
{
	name: "RowButtons",
	mixins: [ mixin ],
	emits: Field.emits,
	props: Field.props,
	computed:
	{
	},
	methods:
	{
		getItemId: function()
		{
			let id = this.crud.model.getItemId(this.crud.item);
			if (id == "") return "0";
			return id;
		},
		onButtonClick: function(button_name)
		{
			let event = new CrudEvent();
			event.event_name = CRUD_EVENTS.ROW_BUTTON_CLICK;
			event.crud_item = deepClone(this.crud.item);
			event.button_name = button_name;
			event.index = this.crud.index;
			this.$emit( "crudEvent", event );
		}
	},
	components:
	{
		Button,
	},
};

componentExtend(RowButtons, Field);
export default defineComponent(RowButtons);

</script>
