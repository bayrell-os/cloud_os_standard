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
.form_row{
	padding-bottom: 15px;
}
.form_row:last-child{
	padding-bottom: 0px;
}
.form_row_label{
	font-weight: bold;
	padding-bottom: 5px;
}
.form_buttons{
	text-align: center;
	margin-top: 10px;
}
.form_buttons button{
	margin-left: 10px;
	margin-right: 10px;
}
.form_result{
	padding-top: 10px;
	text-align: center;
}
.form_result.success{
	color: green;
}
.form_result.error{
	color: red;
}
</style>


<template>
	<div class="form">
		
		<slot name="title">
			<div class="form_title">{{ model.title }}</div>
		</slot>
		
		<slot name="rows">
			<div class="form_rows">
				
				<div class="form_row"
					v-for="field in model.fields" :key="field.api_name"
					v-bind:data-name="field.api_name"
				>
					<div class="form_row_label">{{ field.label }}</div>
					<div class="form_row_value">
						<component v-bind:is="field.component"
							v-bind:value="model.getItemValue(field.api_name)"
							@change="onChangeItem(field.api_name, $event)"
						/>
					</div>
					<div class="form_row_result"></div>
				</div>
				
			</div>
		</slot>
		
		<slot name="buttons">
			<div class="form_buttons"></div>
		</slot>
		
		<slot name="result">
			<div class="form_result"
				v-bind:class="{
					error: model.error_code < 0,
					success: model.error_code > 0,
				}">{{ model.message }}</div>
		</slot>
		
	</div>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin } from "vue-helper";
import axios from "axios";
import Input from '@/components/Input.vue';
import TextArea from '@/components/TextArea.vue';

export let COMPONENTS =
{
	Input,
	TextArea,
};

export default defineComponent({
	mixins: [ mixin ],
	props: [],
	computed:
	{
	},
	methods:
	{
		onChangeItem(api_name, $event)
		{
			console.log(api_name);
			console.log($event);
			//this.model.setItemValue(api_name, $event.target.value)
		}
	},
	components: COMPONENTS,
});

</script>
