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
.dialog_box, .dialog_shadow{
	position: fixed;
	top: 0; left: 0;
	width: 100%; height: 100%;
	z-index: 1001;
}
.dialog_box{
	overflow: auto;
	overflow-y: scroll;
	display: none;
}
.dialog_box.open{
	display: block;
}
.dialog_shadow{
	background-color: #000;
	opacity: 0.2;
	overflow: hidden;
}
.dialog_wrap{
	width: 100%;
	min-height: 100%;
}
.dialog_wrap > tr > td{
	padding: 20px;
}
.dialog{
	position: relative;
	padding: 20px;
	background-color: white;
	max-width: 350px;
	margin: 0 auto;
	width: auto;
	z-index: 1002;
	box-shadow: 2px 4px 10px 0px rgba(0,0,0,0.5);
	font-size: 14px;
}
.dialog_title, .dialog_text, .dialog_promt{
	text-align: center;
	padding-bottom: 12px;
}
.dialog_title{
	font-weight: bold;
}
.dialog_promt_input{
	padding: 6px 12px;
	width: 100%;
}
.dialog_text{
	white-space: pre-wrap;
}
.dialog_buttons{
	padding-top: 12px;
	text-align: center;
}
.dialog_buttons button{
	margin: 0 5px;
}
.dialog_row{
	padding-bottom: 6px;
}
.dialog_row:last-child{
	padding-bottom: 0px;
}
.dialog_result{
	text-align: center;
	padding-top: 12px;
	white-space: break-spaces;
}
.dialog_result.success{
	color: green;
}
.dialog_result.error{
	color: red;
}
</style>

<template>
	<div class="dialog_box" v-bind:class="{ 'open': model.open }">
		<div class='dialog_shadow'></div>
		<table class='dialog_wrap'><tr><td>
			<div class='dialog'>
				<div class='dialog_title'>
					<slot name="title">
						{{ model.title }}
					</slot>
				</div>
				<div class='dialog_text'>
					<slot name="text">
						{{ model.text }}
					</slot>
				</div>
				<div class='dialog_content'>
					<slot name="content"/>
				</div>
				<div class='dialog_buttons'>
					<slot name="buttons">
						<Button v-for="button, index in model.buttons" v-bind:data-action="button.action"
						@click="onButtonClick(button.action, $event)" v-bind:type="button.type"
						:key="index"
						>{{ button.label }}</Button>
					</slot>
				</div>
			</div>
		</td></tr></table>
	</div>
</template>

<script lang="js">

import { defineComponent } from 'vue';
import { mixin } from "vue-helper";
import { DialogButtonClickEvent } from '@/components/Dialog/DialogState.ts';
import Button from '@/components/Button/Button.vue';

export default defineComponent({
	mixins: [ mixin ],
	props: [],
	computed:
	{
	},
	methods:
	{
		onButtonClick: function(action, $event)
		{
			if (action == "cancel") this.model.hide();
			let event = new DialogButtonClickEvent();
			event.action = action;
			this.$emit("buttonClick", event);
		},
	},
	components:
	{
		Button,
	},
});

</script>
