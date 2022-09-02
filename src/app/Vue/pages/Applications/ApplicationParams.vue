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
.applications_run_page__param_dialog{
	.component_dialog__title{
		overflow-wrap: anywhere;
	}
}
</style>


<template>

<div class="component_crud__table">
	
	<div class="component_crud__top_buttons">
		<Button type="success" @click="onAddClick()">
			[+] Add {{ item_name }}
		</Button>
	</div>
	
	<table>
		<tr class="component_crud__header">
			<th style="width: 25px; min-width: 25px;"></th>
			<th>{{ getLabelKey() }}</th>
			<th>{{ getLabelValue() }}</th>
			<th style="width: 50px; min-width: 50px;"></th>
			<th style="width: 120px; min-width: 120px;"></th>
		</tr>
		<tr class="component_crud__row"
			v-for="data, index in items"
			:key="data.key"
		>
			<td>{{ index + 1 }}</td>
			<td>{{ data.key }}</td>
			<td>{{ data.value }}</td>
			<td>{{ data.enable == 1 ? "On" : "Off" }}</td>
			<td>
				<div class="component_row_buttons">
					<Button type="default" small="true" @click="onEditClick(index)">
						Edit
					</Button>
					<Button type="danger" small="true" @click="onDeleteClick(index)">
						Delete
					</Button>
				</div>
			</td>
		</tr>
	</table>
	
	<Dialog v-bind:store="dialog_save" v-bind:style="'applications_run_page__param_dialog'">
		<template v-slot:content>
			<Form v-bind:store="form_save" />
		</template>
		<template v-slot:buttons>
			<Button type="danger"
				@click="onDialogSaveButtonClick('yes')">Yes</Button>
			<Button type=""
				@click="onDialogSaveButtonClick('no')">No</Button>
		</template>
	</Dialog>
	
	<Dialog v-bind:store="dialog_delete" v-bind:style="'applications_run_page__param_dialog'">
		<template v-slot:buttons>
			<Button type="danger"
				@click="onDialogDeleteButtonClick('yes')">Yes</Button>
			<Button type=""
				@click="onDialogDeleteButtonClick('no')">No</Button>
		</template>
	</Dialog>
	
</div>

</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, deepClone } from "vue-helper";
import { FieldInfo } from "vue-helper/Crud/CrudState";
import { DialogState } from "vue-helper/Crud/DialogState";
import { FormState } from "vue-helper/Crud/FormState";


/**
 * ApplicationParams
 */
export const ApplicationParams =
{
	name: "ApplicationParams",
	mixins: [mixin],
	props: ["items", "item_name"],
	data: function()
	{
		let data = {
			form_save: new FormState(),
			dialog_save: new DialogState(),
			dialog_delete: new DialogState(),
		};
		
		let field_enable = new FieldInfo();
		field_enable.name = "enable";
		field_enable.label = "Enable";
		field_enable.component = "Select";
		field_enable.default_value = 1;
		field_enable.options = [
			{ "id": 0, "value": "Off" },
			{ "id": 1, "value": "On" },
		];
		
		let field_key = new FieldInfo();
		field_key.name = "key";
		field_key.label = "Key";
		field_key.component = "Input";
		
		let field_value = new FieldInfo();
		field_value.name = "value";
		field_value.label = "Value";
		field_value.component = "Input";
		
		if (this.item_name == "volume")
		{
			field_key.label = "Source";
			field_value.label = "Mount point inside container";
		}
		
		data.form_save.fields.push( deepClone(field_key) );
		data.form_save.fields.push( deepClone(field_value) );
		data.form_save.fields.push( deepClone(field_enable) );
		
		return data;
	},
	components:
	{
	},
	methods:
	{
		getLabelKey: function()
		{
			if (this.item_name == "volume") return "Source";
			return "key";
		},
		getLabelValue: function()
		{
			if (this.item_name == "volume") return "Mount point";
			return "value";
		},
		onAddClick: function()
		{
			this.form_save.clear();
			this.form_save.action = "add";
			this.dialog_save.title = "Add " + this.item_name;
			this.dialog_save.show();
		},
		onEditClick: function(index)
		{
			if (this.items[index] != undefined)
			{
				this.form_save.clear();
				this.form_save.action = "Edit";
				this.form_save.item = deepClone(this.items[index]);
				this.form_save.tag = index;
				this.dialog_save.title = "Edit " +
					this.item_name + " " +
					this.items[index]["key"]
				;
				this.dialog_save.show();
			}
		},
		onDeleteClick: function(index)
		{
			if (this.items[index] != undefined)
			{
				this.dialog_delete.tag = index;
				this.dialog_delete.title = "Delete " +
					this.item_name + " " +
					this.items[index]["key"] + " ?"
				;
				this.dialog_delete.show();
			}
		},
		onDialogSaveButtonClick: function(button_text)
		{
			if (button_text == 'yes')
			{
				if (this.form_save.action == "add")
				{
					this.items.push( deepClone(this.form_save.item) );
					this.items.sort((a, b)=>{
						return a.key > b.key ? 1 : -1;
					});
				}
				else
				{
					let index = this.form_save.tag;
					this.items[index] = deepClone(this.form_save.item);
				}
			}
			this.dialog_save.hide();
		},
		onDialogDeleteButtonClick: function(button_text)
		{
			if (button_text == 'yes')
			{
				let index = this.dialog_delete.tag;
				this.items.splice(index, 1);
			}
			this.dialog_delete.hide();
		},
	}
}

export default defineComponent(ApplicationParams);


</script>