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
.component_textarea{
	width: 100%;
    min-height: 300px;
	padding: 6px 12px;
	background-color: white;
	border: 1px #ccc solid;
	outline: transparent;
}
</style>


<template>
	<textarea class="component_textarea"
		v-bind:name="name" v-bind:type="type" v-bind:value="value"
		@change="onChange(name, $event)"></textarea>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend } from 'vue-helper';
import { CrudEvent, CRUD_EVENTS } from "./CrudState";
import { Field } from './Field.vue';


export const TextArea =
{
	mixins: [ mixin ],
	emits: Field.emits,
	props: Field.props,
	computed:
	{
	},
	methods:
	{
		onChange: function(name, $event)
		{
			let event = new CrudEvent();
			event.event_name = CRUD_EVENTS.ITEM_CHANGE;
			event.item_name = name;
			event.value = $event.target.value;
			this.$emit( "crudEvent", event );
		}
	},
	components:
	{
	},
};

componentExtend(TextArea, Field);
export default defineComponent(TextArea);

</script>
