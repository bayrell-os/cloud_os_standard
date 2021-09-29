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

<style lang="scss" scoped>
.buttons button{
	margin-left: 2px;
	margin-right: 2px;
}
</style>


<template>
	<div class='buttons'>
		<Button type="default" small="true" @click="onButtonClick('edit')">Edit</Button>
		<Button type="danger" small="true" @click="onButtonClick('delete')">Delete</Button>
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
		onButtonClick: function(button_name)
		{
			let event = new CrudEvent();
			event.event_name = CRUD_EVENTS.ROW_BUTTON_CLICK;
			event.crud_item = deepClone(this.crud_item);
			event.button_name = button_name;
			event.index = this.crud_index;
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
