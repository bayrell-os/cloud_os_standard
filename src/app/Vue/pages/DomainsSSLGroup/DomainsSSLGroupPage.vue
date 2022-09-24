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
.domains_ssl_group_page_generate{
	textarea{
		width: 100%;
		height: 200px;
		outline: 0;
	}
}
</style>

<template>
	<div class="domains_ssl_group_page">
		<CrudList v-bind:store_path="store_path" />
		<Dialog v-bind:store_path="store_path.concat('dialog_generate')" 
			v-bind:style="'domains_ssl_group_page_generate'"
			width="700px"
		>
			<template v-slot:title>
				Generate ssl for "{{ model.dialog_generate.item.name }}" ?
			</template>
			<template v-slot:text>
				<textarea v-bind:value='model.dialog_generate.attrs["content"]' readonly></textarea>
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
import { CRUD_EVENTS, CrudEvent } from "vue-helper/Crud/CrudState";


export const DomainsSSLGroupPage =
{
	name: "DomainsSSLGroupPage",
	mixins: [mixin],
	methods:
	{
		onGenerateButtonClick: async function(button)
		{
			if (button == 'no')
			{
				this.model.dialog_generate.hide();
			}
			else if (button == 'yes')
			{
				this.model.dialog_generate.setWaitResponse();
				let response = await this.model.processGenerateSSL();
				this.model.dialog_generate.setAxiosResponse(response);
				this.model.dialog_generate.attrs["content"] = response.data.result.content;
			}
		},
		onCrudComponentEvent: function($event)
		{
			if (
				$event.event_name == CRUD_EVENTS.ROW_BUTTON_CLICK &&
				$event.button_name == "generate"
			)
			{
				this.model.dialog_generate.attrs["content"] = "";
				this.model.dialog_generate.clear();
				this.model.dialog_generate.setItem($event.crud_item);
				this.model.dialog_generate.show();
			}
			else
			{
				CrudList.methods.onCrudComponentEvent.apply(this, [$event]);
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
