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
	<div>
		<CrudList v-bind:store_path="store_path" @crudEvent="crudEvent" />
		<Dialog v-bind:store_path="store_path.concat('dialog_generate')">
			<template v-slot:title>
				Generate ssl for {{ model.dialog_generate.item.name }}
			</template>
			<template v-slot:text>
				{{ model.dialog_generate.attrs["content"] }}
			</template>
			<template v-slot:buttons>
				<Button type="danger" @click="onGenerateButtonClick('yes')">Yes</Button>
				<Button type="" @click="onGenerateButtonClick('no')">No</Button>
			</template>
		</Dialog>
	</div>
</template>

<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, onRouteUpdate, setPageTitle } from "vue-helper";
import { CrudList } from "vue-helper/Crud/CrudList.vue";


export const DomainsSSLGroupPage =
{
	name: "DomainsSSLGroupPage",
	mixins: [mixin],
	methods:
	{
		onGenerateButtonClick: function(button)
		{
			if (button == 'no')
			{
				this.model.dialog_generate.hide();
			}
		},
		crudEvent: function(event)
		{
			if (event.event_name == "row_click")
			{
				this.model.dialog_generate.attrs["content"] = "";
				this.model.dialog_generate.setItem(event.crud_item);
				this.model.dialog_generate.show();
			}
		},
	},
	mounted: function () {
		let page_title = this.model.getMessage("list_title", null);
		setPageTitle(page_title);
	},
}

componentExtend(DomainsSSLGroupPage, CrudList);
export default defineComponent(DomainsSSLGroupPage);

</script>
