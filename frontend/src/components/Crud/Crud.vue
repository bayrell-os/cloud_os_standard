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
.table table{
	border-collapse: collapse;
	border: 1px #ccc solid;
	margin-top: 10px
}
.table td, .table th{
	border: 1px #ccc solid;
	padding: 5px;
	text-align: center;
}
.table .row:hover{
	background-color: #eee;
	color: inherit;
}
.buttons button{
	margin-left: 2px;
	margin-right: 2px;
}
.dialog_buttons button{
	margin: 0 5px;
}
.form_buttons{
	text-align: center;
	margin-top: 10px;
}
.form_buttons button{
	margin-left: 10px;
	margin-right: 10px;
}
</style>


<template>
	<div class="top_buttons">
		<slot name="top_buttons">
			<Button type="primary" @click="onShowAdd()">
				{{ model.getMessage("top_button_show_add_title", model.current_item) }}
			</Button>
		</slot>
	</div>
	<div class="table">
		<slot name="table">
			<table>
				<tr class="header">
					<th v-for="field in model.fields_table"
						:key="field.api_name"
					>{{ field.label }}</th>
				</tr>
				<tr class="row" v-for="item, item_index in model.items" :key="item.domain_name">
					<td v-for="field in model.fields_table"
						:key="field.api_name"
					>
						<component v-bind:is="field.component"
							v-bind:crud_index="item_index"
							v-bind:crud_item="item"
							v-bind:crud_field="field"
							v-bind:value="model.getItemValue(item_index, field.api_name)"
							@crudEvent="onCrudEvent(index, field.api_name, $event)"
						/>
					</td>
				</tr>
			</table>
		</slot>
	</div>
	<slot name="dialog_form">
		<Dialog v-bind:store_path="store_path.concat('dialog_form')" width="800px" buttons="false">
			<template v-slot:title>
				{{ model.getMessage("dialog_form_title", model.current_item) }}
			</template>
			<template v-slot:content>
				<Form v-bind:store_path="store_path.concat('form')">
					<template v-slot:buttons>
						<Button type="primary" @click="onDialogFormButtonClick('save')">Save</Button>
						<Button type="" @click="onDialogFormButtonClick('cancel')">Cancel</Button>
					</template>
				</Form>
			</template>
		</Dialog>
	</slot>
	<slot name="dialog_delete">
		<Dialog v-bind:store_path="store_path.concat('dialog_delete')">
			<template v-slot:title>
				{{ model.getMessage("dialog_delete_title", model.current_item) }}
			</template>
			<template v-slot:text>
				{{ model.getMessage("dialog_delete_text", model.current_item) }}
			</template>
			<template v-slot:buttons>
				<Button type="danger" @click="onDialogFormButtonClick('yes')">Yes</Button>
				<Button type="" @click="onDialogFormButtonClick('no')">No</Button>
			</template>
		</Dialog>
	</slot>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin } from "vue-helper";
import { COMPONENTS } from "./CrudState";
import Button from './Button.vue';
import Dialog from '@/components/Dialog/Dialog.vue';
import Form from '@/components/Form/Form.vue';


export const Crud =
{
	name: "Crud",
	mixins: [ mixin ],
	computed:
	{
	},
	methods:
	{
		onCrudEvent: function(index, field_api_name, $event)
		{
			if ($event.name == "row_button_click")
			{
				if ($event.attrs.button_name == "edit")
				{
					this.onShowEdit($event.attrs.crud_item);
				}
				if ($event.attrs.button_name == "delete")
				{
					this.onShowDelete($event.attrs.crud_item);
				}
			}
		},
		onShowAdd: function()
		{
			this.model.setCurrentItem(null);
			this.model.showForm();
		},
		onShowEdit: function(item)
		{
			this.model.setCurrentItem(item);
			this.model.showForm();
		},
		onShowDelete: function(item)
		{
			this.model.setCurrentItem(item);
			this.model.showDelete();
		},
		onDialogFormButtonClick: function(action)
		{
			if (action == "save")
			{
				this.model.constructor.apiSaveForm(this);
			}
			else if (action == "cancel")
			{
				this.model.dialog_form.hide();
			}
			else if (action == "yes")
			{
				this.model.constructor.apiDeleteForm(this);
			}
			else if (action == "no")
			{
				this.model.dialog_delete.hide();
			}
		},
	},
	mounted()
	{
		console.log("crud mounted");
	},
	components: Object.assign(COMPONENTS, {
		Button,
		Dialog,
		Form,
	}),
};


export default defineComponent(Crud);

</script>
