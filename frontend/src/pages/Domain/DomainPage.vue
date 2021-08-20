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
</style>

<template>
	<table class="table">
		<tr class="header">
			<th></th>
			<th>Domain name</th>
			<th></th>
		</tr>
		<tr class="row" v-for="item, index in model.items" :key="item.id">
			<td>{{ index + 1 }}</td>
			<td>{{ item.domain_name }}</td>
			<td>
				<button class="button small">Edit</button>
				<button class="button small danger">Delete</button>
			</td>
		</tr>
	</table>
</template>

<script lang="js">

import { defineComponent } from 'vue';
import { mixin } from "vue-helper";
import axios from "axios";

export default defineComponent({
	mixins: [ mixin ],
	computed:
	{
	},
	methods:
	{
	},
	mounted() {
		this.setPageTitle("Domains");
		this.model.constructor.loadData(this);
	}
});

</script>
