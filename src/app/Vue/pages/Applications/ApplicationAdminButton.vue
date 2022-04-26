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
</style>


<template>
	<div v-if="getCurrentValue() == 0">
		No
	</div>
	<div v-if="getCurrentValue() == 1">
		<a :href='"/applications/admin/" + crud_item.stack_name + "_" + crud_item.name + "/"' 
			class="nolink"
		>
			<Button type="small">Admin</Button>
		</a>
	</div>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin } from "vue-helper";
import { Field } from 'vue-helper/Crud/Field.vue';

/**
 * ApplicationAdminButton
 */
export const ApplicationAdminButton =
{
	name: "ApplicationAdminButton",
	mixins: [mixin],
	emits: Field.emits,
	props: Field.props,
	methods:
	{
		getCurrentValue: function()
		{
			if (this.store_path == undefined) return this.value;
			return this.model;
		},
	}
}

export default defineComponent(ApplicationAdminButton);

</script>