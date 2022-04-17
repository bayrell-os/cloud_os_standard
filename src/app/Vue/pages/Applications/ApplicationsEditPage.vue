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
	
	&__form{
		padding-bottom: 10px;
		.crud_form__buttons, .crud_form__result{
			display: none;
		}
	}
	
	&__modificators{
		display: flex;
		align-items: flex-start;
	}
	&__modificators_item{
		width: 50%;
	}
	
	&__variables{
		padding-right: 10px;
	}
	&__variable{
		padding-bottom: 15px;
		&_label{
			font-weight: bold;
			padding-bottom: 5px;
		}
	}
}
</style>


<template>
	<div class="applications_run_page">
		
		<div class="applications_run_page__buttons component_crud__top_buttons">
			<Button type="primary" @click="onBackClick()">Back</Button>
			<Button @click="onComposeClick()">Compose</Button>
			<Button @click="onStopClick()">Stop</Button>
			<Button type="success" @click="onSaveFormButtonSaveClick()">Save</Button>
		</div>
		
		<Tabs @select="onTabSelect($event)">
			<Tab name="info" label="Info" selected="true">
				
				<div class="applications_run_page__form">
					<Form v-bind:store_path="store_path.concat('form_save')"
						@crudEvent="onCrudFormEvent($event, 'form_save')"
					>
						<template v-slot:buttons>&nbsp;</template>
					</Form>
				</div>
				
				<div class="applications_run_page__modificators">
					<div class="applications_run_page__modificators_item 
						applications_run_page__variables"
					>
						
						<div v-if="notNull(model.form_save.item) &&
							notNull(model.form_save.item.variables_defs)">
							
							<div v-for="variable in model.form_save.item.variables_defs"
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
												'form_save', 'item', 
												'variables', variable.name])"
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
				
				<Dialog v-bind:store_path="store_path.concat('dialog_view_modificator')" 
					width="800px"
				>
					<template v-slot:content>
						<CodeMirror
							v-bind:value="model.dialog_view_modificator.tag != null ?
								model.dialog_view_modificator.tag.content : ''"
							v-bind:crud="{
								field:
								{
									component_params: {
										mode: 'xml',
										readOnly: true,
									}
								}
							}"
						/>
					</template>
					<template v-slot:buttons>
						<Button type="primary"
							@click="onDialogViewModificatorButtonClick('close')">Close</Button>
					</template>
				</Dialog>
				
			</Tab>
			<Tab name="custom_patch" label="Custom patch">
				<CodeMirror
					ref="code_mirror_custom_patch"
					v-bind:store_path="store_path.concat('form_save','item','custom_patch')"
					v-bind:crud="{
						field:
						{
							component_params:{
								mode: 'xml'
							}
						}
					}"
				/>
			</Tab>
			<Tab name="template" label="Template">
				<CodeMirror
					ref="code_mirror_template"
					v-bind:value="model.form_save.item.content"
					v-bind:crud="{
						field:
						{
							component_params:{
								mode: 'xml',
								readOnly: true,
							}
						}
					}"
				/>
			</Tab>
			<Tab name="yaml" label="Yaml">
				<CodeMirror
					ref="code_mirror_yaml"
					v-bind:value="model.form_save.item.yaml"
					v-bind:crud="{
						field:
						{
							component_params:{
								mode: 'yaml',
								readOnly: true,
							}
						}
					}"
				/>
			</Tab>
		</Tabs>
		
		<Dialog v-bind:store_path="store_path.concat('dialog_compose_app')">
			<template v-slot:buttons>
				<Button type="danger"
					@click="onDialogComposeAppButtonClick('yes')">Yes</Button>
				<Button type=""
					@click="onDialogComposeAppButtonClick('close')">Close</Button>
			</template>
		</Dialog>
		
		<Dialog v-bind:store_path="store_path.concat('dialog_stop_app')">
			<template v-slot:buttons>
				<Button type="danger"
					@click="onDialogStopAppButtonClick('yes')">Yes</Button>
				<Button type=""
					@click="onDialogStopAppButtonClick('close')">No</Button>
			</template>
		</Dialog>
		
	</div>
	
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone, onRouteUpdate, responseOk, notNull, isNull }
	from "vue-helper";
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
		notNull, isNull,
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
		
		/* Tab select */
		onTabSelect(tab_name)
		{
			let code_mirror = this.$refs["code_mirror_" + tab_name];
			if (code_mirror)
			{
				this.$nextTick(()=>{
					code_mirror.instance.refresh();
				});
			}
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
					
					let response = await this.model.constructor
						.apiAddModificator(this.model.form_save.item.id, modificator.id)
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
		
		/* Compose */
		onComposeClick()
		{
			this.model.dialog_compose_app.title = "Compose " +
				this.model.form_save.item.name + " ?"
			;
			this.model.dialog_compose_app.show();
			// this.model.doComposeForm(this);
		},
		
		onDialogComposeAppButtonClick: async function(button_text)
		{
			if (button_text == "yes")
			{
				this.model.dialog_compose_app.setWaitResponse();
				
				let response = await this.model.constructor
					.apiCompose(this.model.form_save.item)
				;
				this.model.dialog_compose_app.setAxiosResponse(response);
				
				if (response && responseOk(response))
				{
					/* Hide dialog */
					// this.model.dialog_compose_app.hide();
				}
			}
			else if (button_text == "close")
			{
				this.model.dialog_compose_app.hide();
			}
		},
		
		/* Stop */
		onStopClick()
		{
			this.model.dialog_stop_app.title = "Stop app " + this.model.form_save.item.name + " ?";
			this.model.dialog_stop_app.show();
			// this.model.doStopForm(this);
		},
		
		onDialogStopAppButtonClick: async function(button_text)
		{
			if (button_text == "yes")
			{
				this.model.dialog_stop_app.setWaitResponse();
				
				let response = await this.model.constructor
					.apiStop(this.model.form_save.item.id)
				;
				this.model.dialog_stop_app.setAxiosResponse(response);
			}
			else if (button_text == "close")
			{
				this.model.dialog_stop_app.hide();
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