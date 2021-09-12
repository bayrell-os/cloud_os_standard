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
	<div class="page_home">
		Cloud OS Version 0.4
	</div>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin } from "vue-helper";

export const MainPage =
{
	mixins: [ mixin ],
	computed:
	{
	},
	methods:
	{
	},
	mounted() {
		this.setPageTitle("Index page");
	}
};

export default defineComponent(MainPage);

</script>
