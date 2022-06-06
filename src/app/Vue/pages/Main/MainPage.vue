<!--
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020 - 2022 "Ildar Bikmamatov" <support@bayrell.org>
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
	<div class="page_home">
		Cloud OS Version {{ state.app_version }}
	</div>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin } from "vue-helper";
import { DialogState } from "vue-helper/Crud/DialogState";
import { Test } from "./Test.vue";


export const MainPage =
{
	mixins: [ mixin ],
	data: function()
	{
		let obj = {
			"value": "Test2",
			dialog: new DialogState(),
		};
		
		obj.dialog.title = "Dialog 123";
		
		return obj;
	},
	components:
	{
		Test,
	},
	methods:
	{
		onAddClick: function()
		{
			this.dialog.title = "Add item";
			this.dialog.show();
			// this.$forceUpdate();
		},
		onDialogButtonClick: function()
		{
			this.dialog.hide();
		},
	},
	mounted() {
		this.setPageTitle("Index page");
	}
};

export default defineComponent(MainPage);

</script>
