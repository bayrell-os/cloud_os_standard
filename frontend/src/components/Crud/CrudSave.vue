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
</style>


<template>
	<div class='component_crud_save'>
		<Form v-bind:store_path="store_path.concat('form')">
			<template v-slot:buttons>
				<Button type="primary" @click="onDialogFormButtonClick('save')">Save</Button>
				<Button type="" @click="onDialogFormButtonClick('cancel')">Cancel</Button>
			</template>
		</Form>
	</div>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, deepClone } from "vue-helper";
import { CRUD_EVENTS, CrudEvent } from "./CrudState";


export const CrudSave =
{
	name: "CrudSave",
	mixins: [ mixin ],
	computed:
	{
	},
	methods:
	{
	}
}

export default defineComponent(CrudSave);
</script>
