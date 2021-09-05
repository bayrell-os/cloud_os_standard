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
button{
	padding: 6px 12px;
    cursor: pointer;
    background-color: #fff;
    border: 1px #ccc solid;
    color: #000;
    /* box-shadow: 0px 2px 5px 0px rgb(0 0 0 / 25%); */
    outline: 0;
}
button:active{
	box-shadow: inset 0px 2px 5px 0px rgba(0,0,0,0.25);
}
button.small{
	padding: 3px 6px;
}
button.primary{
	background-color: #337ab7;
	border: 1px #22527b solid;
	color: #fff;
}
button.primary:hover{
	background-color: #286090;
	border: 1px #22527b solid;
	color: #fff;
}
button.danger{
	background-color: #d14b42;
    border: 1px #a02e27 solid;
    color: #fff;
}
button.danger:hover{
	background-color: #e60000;
	border: 1px #a02e27 solid;
	color: #fff;
}
button.success{
	background-color: green;
	border: 1px green solid;
	color: #fff;
}
button.success:hover{
	background-color: green;
	border: 1px green solid;
	color: #fff;
}
</style>


<template>
	<button v-bind:class="getButtonClass" @click="onClick"><slot/></button>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin } from "vue-helper";

export default defineComponent({
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
});

</script>
