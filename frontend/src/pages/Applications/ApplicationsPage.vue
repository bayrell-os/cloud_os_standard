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

<template>
	<Crud v-bind:store_path="store_path" />
</template>

<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend } from "vue-helper";
import { Crud } from '@/components/Crud.vue';
import { ApplicationsPageState } from './ApplicationsPageState';


export const ApplicationsPage =
{
	name: "ApplicationsPage",
	mixins: [mixin],
	methods:
	{
	},
	mounted()
	{
		this.setPageTitle("Applications");
		this.model.constructor.apiLoadData(this);
	}
}

componentExtend(ApplicationsPage, Crud);
export default defineComponent(ApplicationsPage);

</script>
