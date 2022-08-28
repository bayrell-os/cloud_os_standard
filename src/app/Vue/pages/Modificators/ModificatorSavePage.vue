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
	<CrudSave v-bind:store_path="store_path" v-bind:page_action="page_action"></CrudSave>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone, onRouteUpdate } from "vue-helper";
import { CrudSave } from "vue-helper/Crud/CrudSave.vue";


/**
 * Status page
 */
export const Modificators =
{
	name: "Modificators",
	mixins: [mixin],
	components:
	{
	},
	methods:
	{
	},
	mounted: function () {
		let item = this.model.form_save.item;
		let page_title = this.model.constructor.getMessage("save_title", item);
		this.setPageTitle(page_title);
	},
}
componentExtend(Modificators, CrudSave);
export default defineComponent(Modificators);

</script>
