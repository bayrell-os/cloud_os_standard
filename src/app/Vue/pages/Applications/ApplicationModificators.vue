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
.applications_run_page{
	&__modificators{
		display: flex;
		align-items: flex-start;
	}
	&__modificators_item{
		width: 50%;
	}
}
</style>


<template>
	
	<div class="applications_run_page__subtitle">
		Modificators
	</div>
	
	<div class="applications_run_page__modificators">		
		<div class="applications_run_page__modificators_item 
			applications_run_page__variables"
		>
			
			<div v-if="notNull(model.form_save.item) &&
				notNull(model.form_save.item.variables_defs)">
				
				<div v-for="variable in getVariablesDefs()"
					:key="variable.name"
				>
					<div v-if="variable.name != '_var_service_name_'"
						class="applications_run_page__variable"
					>
						<div class="applications_run_page__variable_label">
							{{ variable.label || variable.name }}
						</div>
						<div class="applications_run_page__variable_value">
							<Input
								v-bind:name="variable.name"
								v-bind:store_path="store_path.concat([
									'form_save',
									'item', 
									'variables',
									variable.name
								])"
								v-bind:default_value="variable.default"
							/>
						</div>
					</div>
				</div>
				
			</div>
			
		</div>
		
		<div class="applications_run_page__modificators_item">
			<div v-if="model.dictionary && model.dictionary.modificators_item">
				<div class="component_crud__top_buttons">
					<div class="component_crud__top_button">
						<Button type="success" @click="onModificatorAdd()">
							[+] Add modificator
						</Button>
					</div>
				</div>
				<div class="component_crud__table">
					<table>
						<tr class="component_crud__header">
							<th></th>
							<th>Name</th>
							<th>Priority</th>
							<th></th>
						</tr>
						<tr class="component_crud__row"
							v-for="modificator, index in model.dictionary.modificators_item"
							:key="modificator.id"
						>
							<td>{{ index + 1 }}</td>
							<td>{{ modificator.name }}</td>
							<td>{{ modificator.priority }}</td>
							<td>
								<div class="component_row_buttons">
									<Button type="default" small="true"
										@click="onModificatorView(modificator.id)">
										View
									</Button>
									<Button type="danger" small="true"
										@click="onModificatorDelete(modificator.id)">
										Delete
									</Button>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
	
	<Dialog v-bind:store_path="store_path.concat('dialog_add_modificator')">
		<template v-slot:title>
			Add modificator
		</template>
		<template v-slot:content>
			<div class="applications_run_page__select_add_modificator">
				<label>Select modificator:</label>
				<Select
					v-bind:store_path="store_path.concat(['select_add_modificator_id'])"
					v-bind:options="model.getSelectAddModificators()"
				/>
			</div>
		</template>
		<template v-slot:buttons>
			<Button type="danger" @click="onDialogAddModificatorButtonClick('yes')">
				Yes
			</Button>
			<Button type="" @click="onDialogAddModificatorButtonClick('no')">
				No
			</Button>
		</template>
	</Dialog>

	<Dialog v-bind:store_path="store_path.concat('dialog_delete_modificator')">
		<template v-slot:title>
			Delete modificator
		</template>
		<template v-slot:buttons>
			<Button type="danger"
				@click="onDialogDeleteModificatorButtonClick('yes')">Yes</Button>
			<Button type=""
				@click="onDialogDeleteModificatorButtonClick('no')">No</Button>
		</template>
	</Dialog>

	<Dialog v-bind:store_path="store_path.concat('dialog_view_modificator')" 
		width="800px"
	>
		<template v-slot:content>
			<CodeMirror
				v-bind:value="model.dialog_view_modificator.tag != null ?
					model.dialog_view_modificator.tag.content : ''"
				v-bind:component_params="{
					mode: 'xml',
					readOnly: true,
				}"
			/>
		</template>
		<template v-slot:buttons>
			<Button type="primary"
				@click="onDialogViewModificatorButtonClick('close')">Close</Button>
		</template>
	</Dialog>
	
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone, onRouteUpdate, responseOk, notNull, isNull }
	from "vue-helper";

/**
 * ApplicationParams
 */
export const ApplicationModificators =
{
	name: "ApplicationModificators",
	mixins: [mixin],
	methods:
	{
		notNull, isNull,
		
		/**
		 * Returns variables defs
		 */
		getVariablesDefs()
		{
			if (isNull(this.model.form_save.item)) return [];
			if (isNull(this.model.form_save.item.variables_defs)) return [];
			return this.model.form_save.item.variables_defs
				.slice()
				.sort((a,b)=>{
					return a.name > b.name ? 1 : -1;
				})
			;
		},
		
		/* Add modificator */
		onModificatorAdd()
		{
			this.model.select_add_modificator_id = -1;
			this.model.dialog_add_modificator.show();
		},
		onDialogAddModificatorButtonClick: async function(button_text)
		{
			if (button_text == "yes")
			{
				let select_add_modificator_id = Number(this.model.select_add_modificator_id);
				let modificator = this.model.getModificatorByID(select_add_modificator_id);
				
				if (modificator)
				{
					this.model.dialog_add_modificator.setWaitResponse();
					
					let response = await this.model
						.processAddModificator(this.model.form_save.item.id, modificator.id)
					;
					this.model.dialog_add_modificator.setAxiosResponse(response);
					
					if (response && responseOk(response))
					{
						this.model.dictionary.modificators_item.push(modificator);
						this.model.sortModificatorsItems();
						this.model.dialog_add_modificator.hide();
					}
				}
			}
			else
			{
				this.model.dialog_add_modificator.hide();
			}
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
		onDialogDeleteModificatorButtonClick: async function(button_text)
		{
			if (button_text == "yes")
			{
				let modificator = this.model.dialog_delete_modificator.tag;
				
				if (modificator)
				{
					this.model.dialog_delete_modificator.setWaitResponse();
					
					let response = await this.model
						.processDeleteModificator(this.model.form_save.item.id, modificator.id)
					;
					this.model.dialog_delete_modificator.setAxiosResponse(response);
					
					if (response && responseOk(response))
					{
						/* Find index of modificator in modificators_item */
						let index = this.model.dictionary.modificators_item
							.findIndex((item)=>{
								return item.id == modificator.id;
							})
						;
						
						/* Remove modificators */
						if (index > -1)
						{
							this.model.dictionary.modificators_item.splice(index, 1);
						}
						
						/* Hide dialog */
						this.model.dialog_delete_modificator.hide();
					}
				}
			}
			else
			{
				this.model.dialog_delete_modificator.hide();
			}
		},
		
		/* View modificator */
		onModificatorView(modificator_id)
		{
			let modificator = this.model.getModificatorByID(modificator_id);
			if (modificator)
			{
				this.model.dialog_view_modificator.title = "View modificator " + modificator.name;
				this.model.dialog_view_modificator.tag = modificator;
				this.model.dialog_view_modificator.show();
			}
		},
		onDialogViewModificatorButtonClick(button_text)
		{
			if (button_text == "close")
			{
				this.model.dialog_view_modificator.hide();
			}
		},		
	}
}

export default defineComponent(ApplicationModificators);

</script>