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

<template>
	<Crud v-bind:store_path="store_path" />
</template>

<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, onRouteUpdate } from "vue-helper";
import { Crud } from "vue-helper/Crud/Crud.vue";
import { DomainsPageState } from './DomainsPageState';


export const DomainPage =
{
	name: "DomainPage",
	mixins: [mixin],
	methods:
	{
	},
	beforeRouteEnter(to, from, next)
	{
		onRouteUpdate("beforeRouteEnter", to, from, next);
	},
	beforeRouteUpdate(to, from, next)
	{
		onRouteUpdate("beforeRouteUpdate", to, from, next);
	}
}

componentExtend(DomainPage, Crud);
export default defineComponent(DomainPage);

</script>
