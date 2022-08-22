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
	
	&__subtitle{
		font-size: 20px;
		font-weight: bold;
		padding-top: 1.2em;
		padding-bottom: 0.8em;
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
	
	&__params{
		display: flex;
	}
	&__param{
		padding-right: 10px;
	}
}
</style>


<template>
	<div class="applications_run_page">
		
		<div class="applications_run_page__buttons component_crud__top_buttons">
			<Button type="primary" @click="onSaveFormButtonBackClick()">Back</Button>
			<Button @click="onComposeClick()">Compose</Button>
			<Button @click="onStopClick()">Stop</Button>
			<Button type="success" @click="onSaveClick()">Save</Button>
		</div>
		
		<Tabs @select="onTabSelect($event)">
			
			<Tab name="info" label="Info" selected="true">
				
				<!-- Form -->
				<div class="applications_run_page__form">
					<Form v-bind:store_path="store_path.concat('form_save')"
						@crudEvent="onCrudFormEvent($event, 'form_save')"
					>
						<template v-slot:buttons>&nbsp;</template>
					</Form>
				</div>
				
				<!-- Modificators -->
				<ApplicationModificators
					v-bind:store_path="store_path"
				/>
				
				<!-- Params -->
				<div class="applications_run_page__params">
					<div class="applications_run_page__param">
						<div class="applications_run_page__subtitle">
							Environments
						</div>
						<ApplicationParams
							v-bind:items="model.form_save.item.environments"
							item_name="environment"
						/>
					</div>
					<div class="applications_run_page__param">
						<div class="applications_run_page__subtitle">
							Volumes
						</div>
						<ApplicationParams
							v-bind:items="model.form_save.item.volumes"
							item_name="volume"
						/>
					</div>
				</div>
				
			</Tab>
			
			<Tab name="custom_patch" label="Custom patch">
				<CodeMirror
					ref="code_mirror_custom_patch"
					v-bind:store_path="store_path.concat('form_save','item','custom_patch')"
					v-bind:component_params="{
						mode: 'xml',
					}"
				/>
			</Tab>
			
			<Tab name="total_patches" label="Total patches">
				<ApplicationTotalPatches
					ref="total_patches"
					v-bind:store_path="store_path"
				/>
			</Tab>
			
			<Tab name="template" label="Result">
				<CodeMirror
					ref="code_mirror_template"
					v-bind:value="model.form_save.item.content"
					v-bind:component_params="{
						mode: 'xml',
						readOnly: true,
					}"
				/>
			</Tab>
			
			<Tab name="yaml" label="Yaml">
				<CodeMirror
					ref="code_mirror_yaml"
					v-bind:value="model.form_save.item.yaml"
					v-bind:component_params="{
						mode: 'yaml',
						readOnly: true,
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
		
		<Dialog v-bind:store_path="store_path.concat('dialog_save_app')">
			<template v-slot:buttons>
				<Button @click="onDialogSaveAppButtonClick('close')">Close</Button>
			</template>
		</Dialog>
		
	</div>
	
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone, onRouteUpdate, responseOk, notNull, isNull }
	from "vue-helper";
import { CrudEvent, CRUD_EVENTS } from "vue-helper/Crud/CrudState";
import { CrudList } from "vue-helper/Crud/CrudList.vue";
import { ApplicationModificators } from "./ApplicationModificators.vue";
import { ApplicationParams } from "./ApplicationParams.vue";
import { ApplicationTotalPatches } from "./ApplicationTotalPatches.vue";


/**
 * Edit page
 */
export const ApplicationsEditPage =
{
	name: "ApplicationsEditPage",
	mixins: [mixin],
	components:
	{
		ApplicationModificators,
		ApplicationParams,
		ApplicationTotalPatches,
	},
	methods:
	{
		notNull,
		isNull,
		
		/**
		 * Crud form event
		 */
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
			
			if (tab_name == "total_patches")
			{
				this.$refs["total_patches"].refresh();
			}
		},
		
		/* Save */
		onSaveClick: async function()
		{
			this.model.dialog_save_app.title = "Save app";
			this.model.dialog_save_app.show();
			
			/* Save form */
			this.model.dialog_save_app.setWaitResponse();
			await this.model.doSaveForm();
			
			/* Set result message */
			this.model.dialog_save_app.message = this.model.form_save.message;
			this.model.dialog_save_app.error_code = this.model.form_save.error_code;
		},
		
		onDialogSaveAppButtonClick: function()
		{
			this.model.dialog_save_app.hide();
		},
		
		/* Compose */
		onComposeClick()
		{
			this.model.dialog_compose_app.title = "Compose " +
				this.model.getServiceName() + " ?"
			;
			this.model.dialog_compose_app.show();
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
			this.model.dialog_stop_app.title = "Stop app " + this.model.getServiceName() + " ?";
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
	}
};

componentExtend(ApplicationsEditPage, CrudList);
export default defineComponent(ApplicationsEditPage);


</script>