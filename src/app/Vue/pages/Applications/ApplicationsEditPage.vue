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
	&__buttons{
		button.component_button{
			border-left-width: 0px;
			&:first-child{
				border-left: 1px #ccc solid;
			}
		}
	}
}
</style>


<template>
	<div class="applications_run_page">
		<div class="applications_run_page__buttons component_crud__top_buttons">
			<Button type="primary" @click="onBackClick()">Back</Button>
			<Button @click="onChangeTemplate()">
				Change Template
			</Button>
			<Button @click="onStopClick()">Stop</Button>
			<Button @click="onComposeClick()">Compose</Button>
			<Button type="success" @click="onSaveClick()">Save</Button>
		</div>
		
		<Tabs>
			<Tab name="info" label="Info">
				<Form v-bind:store_path="store_path.concat('form_save')"
					@crudEvent="onCrudFormEvent($event, 'form_save')"
				>
					<template v-slot:buttons>
						<Button type="primary"
							@click="onDialogFormButtonClick('form_save')">Save</Button>
						<Button type=""
							@click="onDialogFormButtonClick('form_cancel')">Cancel</Button>
					</template>
				</Form>
			</Tab>
			<Tab name="modificators" label="Modificators" selected="true">
				<div v-if="model.dictionary.modificators_item">
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
								<th></th>
							</tr>
							<tr class="component_crud__row"
								v-for="modificator, index in model.dictionary.modificators_item"
								:key="modificator.id"
							>
								<td>{{ index + 1 }}</td>
								<td>{{ modificator.name }}</td>
								<td>
									<div class="component_row_buttons">
										<Button type="default" small="true"
											@click="onModificatorView(modificator.id)">View</Button>
										<Button type="danger" small="true"
											@click="onModificatorDelete(modificator.id)">Delete</Button>
									</div>
								</td>
							</tr>
						</table>
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
								v-bind:crud="{
									field:
									{
										options: model.getSelectAddModificators()
									}
								}"
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
				
			</Tab>
			<Tab name="template" label="Template">
				3
			</Tab>
		</Tabs>
	</div>
	
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone, onRouteUpdate, responseOk } from "vue-helper";
import { CrudEvent, CRUD_EVENTS } from "vue-helper/Crud/CrudState";
import { Crud } from "vue-helper/Crud/Crud.vue";


/**
 * Edit page
 */
export const ApplicationsEditPage =
{
	name: "ApplicationsEditPage",
	mixins: [mixin],
	props: ["page_action"],
	components:
	{
	},
	methods:
	{
		onCrudFormEvent: function($event, form_name)
		{
			if (form_name == "form_save" && $event.event_name == CRUD_EVENTS.ITEM_CHANGE)
			{
				if ($event.item_name == "template_id")
				{
					this.model.reloadTemplatesVersions();
				}
			}
		},
		
		/* Modificators */
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
					
					let response = await this.model.constructor
						.apiAddModificator(this.model.form_save.item.id, modificator.id)
					;
					this.model.dialog_add_modificator.setAxiosResponse(response);
					
					if (response && responseOk(response))
					{
						this.model.dictionary.modificators_item.push(modificator);
						this.model.dialog_add_modificator.hide();
					}
				}
			}
			else
			{
				this.model.dialog_add_modificator.hide();
			}
		},
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
					
					let response = await this.model.constructor
						.apiDeleteModificator(this.model.form_save.item.id, modificator.id)
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
		
	},
	beforeRouteEnter(to, from, next)
	{
		onRouteUpdate("beforeRouteEnter", to, from, next);
	},
	beforeRouteUpdate(to, from, next)
	{
		onRouteUpdate("beforeRouteUpdate", to, from, next);
	}
};

componentExtend(ApplicationsEditPage, Crud);
export default defineComponent(ApplicationsEditPage);


</script>