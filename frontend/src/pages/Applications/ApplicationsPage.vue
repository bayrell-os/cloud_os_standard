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
.applications_page{
	.table{
		display: flex;
		table{
			width: 400px;
		}
		.row{
			cursor: pointer;
		}
		.editor{
			width: calc(100% - 400px);
			margin-left: 10px;
		}
		.editor textarea{
			width: 100%;
			height: 200px;
		}
	}
}
</style>

<template>
	<div class='applications_page'>
		<Crud v-bind:store_path="store_path">
			<template v-slot:table_after>
				<div class="editor">
					<textarea>123</textarea>
				</div>
			</template>
		</Crud>
	</div>
</template>

<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone } from "vue-helper";
import { Crud } from '@/components/Crud/Crud.vue';
import { CRUD_EVENTS } from '@/components/Crud/CrudState';
import { ApplicationsPageState } from './ApplicationsPageState';


export const ApplicationsPage =
{
	name: "ApplicationsPage",
	mixins: [mixin],
	methods:
	{
		onRowClick: function(item, index, $event)
		{
			if ($event.target.tagName != 'BUTTON')
			{
				this.model.active_item = deepClone(item);
				this.model.active_item_pk = this.model.getPrimaryKeyFromItem(item);
				Crud.methods.onRowClick.apply(this, [item, index]);
			}
		},
		onCrudEvent: function($event)
		{
			if ($event.event_name == CRUD_EVENTS.ROW_CLICK)
			{
				console.log($event);
			}
			Crud.methods.onCrudEvent.apply(this, [$event]);
		},
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
