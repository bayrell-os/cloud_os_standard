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
.applications_run_page{
	&__block{
		padding-bottom: 20px;
	}
	&__label{
		font-weight: bold;
		padding-bottom: 5px;
	}
	&__info_row{
		&_key, &_name{
			display: inline-block;
			vertical-align: top;
		}
		&_key{
			text-align: right;
			padding-right: 5px;
		}
		&_name{
			text-align: left;
			padding-left: 5px;
		}
	}
	&__select_add_modificator{
		label{
			display: block;
			font-weight: bold;
			padding-bottom: 5px;
		}
	}
}
</style>


<template>
	<div class="applications_run_page" v-if="model.application != null">
		
		<!-- Application info -->
		<div class="applications_run_page__info applications_run_page__block">
			<table>
				<tr class="applications_run_page__info_row">
					<td class="applications_run_page__info_row_key">Name:</td>
					<td class="applications_run_page__info_row_name">{{ getAppName() }}</td>
				</tr>
				<tr class="applications_run_page__info_row">
					<td class="applications_run_page__info_row_key">MarketPlace:</td>
					<td class="applications_run_page__info_row_name">{{ getMarketPlace() }}</td>
				</tr>
				<tr class="applications_run_page__info_row">
					<td class="applications_run_page__info_row_key">Template:</td>
					<td class="applications_run_page__info_row_name">{{ getTemplateName() }}</td>
				</tr>
				<tr class="applications_run_page__info_row">
					<td class="applications_run_page__info_row_key">Version:</td>
					<td class="applications_run_page__info_row_name">{{ getVersion() }}</td>
				</tr>
				<tr class="applications_run_page__info_row">
					<td class="applications_run_page__info_row_key">Status:</td>
					<td class="applications_run_page__info_row_name">{{ getStatus() }}</td>
				</tr>
			</table>
		</div>
		
		<!-- Application modificators -->
		<div class="applications_run_page__modificators applications_run_page__block component_crud__table">
			<div class="applications_run_page__label">
				Modificators
			</div>
			<div class="component_crud__top_buttons">
				<div class="component_crud__top_button">
					<Button type="success" @click="onModificatorAdd()">
						[+] Add modificator
					</Button>
				</div>
			</div>
			<table>
				<tr class="component_crud__header">
					<th></th>
					<th>Name</th>
					<th></th>
				</tr>
				<tr class="component_crud__row"
					v-for="modificator_id, index in model.application.modificators"
					:key="modificator_id"
				>
					<td>{{ index + 1 }}</td>
					<td>{{ getModificatorName(modificator_id) }}</td>
					<td>
						<Button type="danger" small="true"
							@click="onModificatorDelete(modificator_id)">Delete</Button>
					</td>
				</tr>
			</table>
		</div>
		
		<div class="crud_form__buttons">
			<Button type="primary" @click="onSave()">Save</Button>
			<Button type="" @click="onCancel()">Cancel</Button>
		</div>
		
		<CrudResult v-bind:store_path="store_path.concat('result')" />
		
	</div>
	
	<div class="applications_run_page__dialogs">
		
		<Dialog v-bind:store_path="store_path.concat('dialog_add_modificator')">
			<template v-slot:title>
				Add modificator
			</template>
			<template v-slot:content>
				<div class="applications_run_page__select_add_modificator">
					<label>Select modificator:</label>
					<Select v-bind:value="select_add_modificator"
						@crudEvent="onSelectModificatorCrudEvent($event)"
						v-bind:crud="{
							field:
							{
								options: getSelectAddModificators()
							}
						}"
					/>
				</div>
			</template>
			<template v-slot:buttons>
				<Button type="danger" @click="onDialogAddModificatorButtonClick('yes')">Yes</Button>
				<Button type="" @click="onDialogAddModificatorButtonClick('no')">No</Button>
			</template>
		</Dialog>
		
		<Dialog v-bind:store_path="store_path.concat('dialog_delete_modificator')">
			<template v-slot:title>
				Delete modificator
			</template>
			<template v-slot:buttons>
				<Button type="danger" @click="onDialogDeleteModificatorButtonClick('yes')">Yes</Button>
				<Button type="" @click="onDialogDeleteModificatorButtonClick('no')">No</Button>
			</template>
		</Dialog>
	</div>
	
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone, onRouteUpdate } from "vue-helper";


/**
 * Run page
 */
export const ApplicationsRunPage =
{
	name: "ApplicationsRunPage",
	mixins: [mixin],
	props: ["action"],
	data: function()
	{
		return {
			select_add_modificator: -1,
		};
	},
	components:
	{
	},
	methods:
	{
		/* Info */
		getAppName: function()
		{
			return "";
		},
		getTemplateName: function()
		{
			return (this.model.application != null) ? this.model.application.name : "";
		},
		getMarketPlace: function()
		{
			return "";
		},
		getVersion: function()
		{
			return "";
		},
		getStatus: function()
		{
			return "";
		},
		getModificatorName(modificator_id)
		{
			let modificator = this.model.getModificatorByID(modificator_id);
			if (modificator)
			{
				return modificator.name;
			}
			return "";
		},
		
		/* Add modificator */
		getSelectAddModificators()
		{
			let application_modificators = this.model.application.modificators;
			return this.model.modificators
				.map
				(
					(item) =>
					{
						return { id: item.id, value: item.name };
					}
				)
				.filter
				(
					(item) =>
					{
						return application_modificators.indexOf(item.id) == -1
					}
				)
			;
		},
		onModificatorAdd()
		{
			this.select_add_modificator = -1;
			this.model.dialog_add_modificator.show();
		},
		onSelectModificatorCrudEvent($event)
		{
			this.select_add_modificator = $event.value;
		},
		onDialogAddModificatorButtonClick(button_text)
		{
			if (button_text == "yes")
			{
				let select_add_modificator = Number(this.select_add_modificator);
				let index = this.model.application.modificators.indexOf(select_add_modificator);
				if (index == -1 && select_add_modificator > 0)
				{
					this.model.application.modificators.push(select_add_modificator);
				}
			}
			this.model.dialog_add_modificator.hide();
		},
		
		/* Delete modificator */
		onModificatorDelete(modificator_id)
		{
			let modificator = this.model.getModificatorByID(modificator_id);
			if (modificator)
			{
				this.model.dialog_delete_modificator.text = "Do you sure to delete \"" +
					modificator.name + "\" ?";
				this.model.dialog_delete_modificator.tag = modificator;
				this.model.dialog_delete_modificator.show();
			}
		},
		onDialogDeleteModificatorButtonClick(button_text)
		{
			if (button_text == "yes")
			{
				let modificator = this.model.dialog_delete_modificator.tag;
				let index = this.model.application.modificators.indexOf(modificator.id);
				if (index > -1)
				{
					this.model.application.modificators.splice(index, 1);
				}
			}
			this.model.dialog_delete_modificator.hide();
		},
		
		/* Save */
		onSave()
		{
			this.model.constructor.onSaveForm(this);
		},
		
		/* Cancel */
		onCancel()
		{
			if (window.history.state.back)
			{
				this.$router.push({ path: window.history.state.back });
			}
			else
			{
				this.$router.push({ name: "app:applications:status" });
			}
		},
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
export default defineComponent(ApplicationsRunPage);

</script>
