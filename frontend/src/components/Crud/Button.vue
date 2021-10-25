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
@import '@/variable.scss';
button.component_button{
	padding: 6px 12px;
    cursor: pointer;
    background-color: #fff;
    border: 1px #ccc solid;
    color: #000;
    /* box-shadow: 0px 2px 5px 0px rgb(0 0 0 / 25%); */
    outline: 0;
}
button.component_button:active{
	box-shadow: inset 0px 2px 5px 0px rgba(0,0,0,0.25);
}
button.component_button.small{
	padding: 3px 6px;
}
button.component_button.primary{
	background-color: $color_primary;
	border: 1px darken($color_primary, 5%) solid;
	color: #fff;
}
button.component_button.primary:hover{
	background-color: darken($color_primary, 5%);
	border: 1px darken($color_primary, 10%) solid;
	color: #fff;
}
button.component_button.danger{
	background-color: $color_danger;
    border: 1px darken($color_danger, 5%) solid;
    color: #fff;
}
button.component_button.danger:hover{
	background-color: darken($color_danger, 5%);
    border: 1px darken($color_danger, 10%) solid;
	color: #fff;
}
button.component_button.success{
	background-color: $color_success;
	border: 1px darken($color_success, 5%) solid;
	color: #fff;
}
button.component_button.success:hover{
	background-color: darken($color_success, 5%);
	border: 1px darken($color_success, 10%) solid;
	color: #fff;
}
</style>


<template>
	<button class="component_button" v-bind:class="getButtonClass" @click="onClick"><slot/></button>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin } from "vue-helper";

export const Button =
{
	mixins: [ mixin ],
    props: ["type", "small"],
	computed:
	{
		getButtonClass: function()
		{
			let arr = ["button"];
			if (this.small == "true") arr.push("small");
			if (this.type) arr.push(this.type);
			return arr.join(" ");
		},
	},
	methods:
	{
		onClick: function()
		{
			//this.$emit("click");
		},
	},
	components:
	{
	},
};

export default defineComponent(Button);

</script>
