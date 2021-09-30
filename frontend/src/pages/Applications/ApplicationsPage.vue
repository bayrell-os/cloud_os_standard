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
	.crud{
		position: relative;
		.top_buttons{
			margin-bottom: 10px;
		}
		.top_buttons_table, .top_buttons_editor{
			display: inline-block;
			vertical-align: top;
		}
		.top_buttons_table{
			width: 400px;
		}
		.top_buttons_editor{
			width: calc(100% - 400px);
			button{
				margin-right: 5px;
			}
		}
		.table{
			display: inline-block;
			vertical-align: top;
			width: 400px;
			padding-right: 5px;
		}
		.row{
			cursor: pointer;
		}
		.editor{
			display: inline-block;
			vertical-align: top;
			position: relative;
			width: calc(100% - 400px);
			height: 100%;
		}
		.editor textarea{
			width: 100%;
			height: 200px;
		}
		.editor .CodeMirror {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 100%;
		}
	}
}
</style>

<template>
	<div class='applications_page'>
		<Crud v-bind:store_path="store_path">
			<template v-slot:top_buttons>
				<div class="top_buttons">
					<div class="top_buttons_table">
						<Button type="primary" @click="onShowAdd()">
							{{ model.getMessage("top_button_show_add_title", model.current_item) }}
						</Button>
					</div>
					<div class="top_buttons_editor">
						<Button type="default" @click="onSave()">
							Save
						</Button>
						<Button type="success" @click="onCompose()">
							Compose
						</Button>
					</div>
				</div>
			</template>
			<template v-slot:table_after>
				<div class="editor">
					<CodeMirror v-bind:value="model.getActiveText()" name="code_mirror"
						@crudEvent="onCodeMirrorCrudEvent($event)"
					/>
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
import { Application, ApplicationsPageState } from './ApplicationsPageState';
import Button from '@/components/Crud/Button.vue';
import CodeMirror from '@/components/Crud/CodeMirror.vue';

export const ApplicationsPage =
{
	name: "ApplicationsPage",
	mixins: [mixin],
	components:
	{
		Button,
		CodeMirror
	},
	methods:
	{
		onSave: function()
		{
			this.model.constructor.apiSaveActive(this);
		},
		onCompose: function()
		{
			this.model.constructor.apiComposeActive(this);
		},
		onShowAdd: function()
		{
			Crud.methods.onShowAdd.apply(this, []);
		},
		onRowClick: function(item, index, $event)
		{
			if ($event.target.tagName != 'BUTTON')
			{
				this.model.active_item = (new Application()).assignValues(item);
				this.model.active_item_pk = this.model.getPrimaryKeyFromItem(item);
				Crud.methods.onRowClick.apply(this, [item, index]);
			}
		},
		onCrudEvent: function($event)
		{
			Crud.methods.onCrudEvent.apply(this, [$event]);
		},
		onCodeMirrorCrudEvent: function($event)
		{
			if (this.model.active_item != null && $event.event_name == CRUD_EVENTS.ITEM_CHANGE)
			{
				this.model.active_item.content = $event.value;
			}
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
