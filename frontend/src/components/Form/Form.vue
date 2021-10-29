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
.crud_form__row{
	padding-bottom: 15px;
}
.crud_form__row:last-child{
	padding-bottom: 0px;
}
.crud_form__row_label{
	font-weight: bold;
	padding-bottom: 5px;
}
.crud_form__buttons{
	text-align: center;
	margin-top: 10px;
}
.crud_form__buttons button{
	margin-left: 5px;
	margin-right: 5px;
}
.crud_form__result_message{
	padding-top: 10px;
	text-align: center;
}
.crud_form__result_message.success{
	color: green;
}
.crud_form__result_message.error{
	color: red;
}
</style>


<template>
	<div class="crud_form">
		
		<div v-if="model.load_error == false">
			<div class="crud_form__title">
				<slot name="title">{{ model.title }}</slot>
			</div>
			
			<div class="crud_form__rows">
				<slot name="rows">
					<div class="crud_form__row"
						v-for="field in model.fields" :key="field.api_name"
						v-bind:data-name="field.api_name"
					>
						<div class="crud_form__row_label">{{ field.label }}</div>
						<div class="crud_form__row_value">
							<component v-bind:is="field.component"
								v-bind:name="field.api_name"
								v-bind:crud="{
									item: model.item,
									field: field
								}"
								v-bind:value="model.getItemValue(field.api_name)"
								@crudEvent="onCrudEvent($event)"
							/>
						</div>
						<div class="crud_form__row_result"></div>
					</div>
				</slot>
			</div>
			
			<div class="crud_form__buttons">
				<slot name="buttons"></slot>
			</div>
			
			<div class="crud_form__result">
				<slot name="result">
					<div class="crud_form__result_message"
						v-bind:class="{
							error: model.error_code < 0,
							success: model.error_code > 0,
						}">{{ model.message }}</div>
				</slot>
			</div>
		</div>
		
		<div class="crud_form__error" v-if="model.load_error == true">
			Ошибка: {{ model.message }}
		</div>
		
	</div>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin } from "vue-helper";
import { CRUD_EVENTS } from "@/components/Crud/CrudState";
import axios from "axios";


export const Form =
{
	mixins: [ mixin ],
	props: [],
	computed:
	{
	},
	methods:
	{
		onCrudEvent: function($event)
		{
			if ($event.event_name == CRUD_EVENTS.ITEM_CHANGE)
			{
				this.model.setItemValue($event.item_name, $event.value)
			}
		},
	},
};

export default defineComponent(Form);

</script>
