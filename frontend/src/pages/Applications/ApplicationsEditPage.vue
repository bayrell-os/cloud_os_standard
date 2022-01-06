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
		td{
			padding-bottom: 5px;
		}
		&_key, &_name{
			/*display: inline-block;*/
			vertical-align: middle;
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
	&__variable{
		padding-bottom: 5px;
	}
	&__left, &__right{
		display: inline-block;
		vertical-align: top;
	}
	&__left{
		width: 45%;
		padding-right: 5px;
	}
	&__right{
		width: 55%;
		padding-left: 5px;
	}
}
</style>


<template>
	<div class="applications_run_page" v-if="model.application != null">
		
		<div class="component_crud_save_back">
			<Button type="primary" @click="onBackClick()">Back</Button>
		</div>
		
		<div class="applications_run_page__left">
			
			<!-- Application info -->
			<div class="applications_run_page__info applications_run_page__block">
				<table>
					<tr class="applications_run_page__info_row">
						<td class="applications_run_page__info_row_key">Name:</td>
						<td class="applications_run_page__info_row_name">
							<Input v-bind:store_path="store_path.concat(['application', 'name'])" />
						</td>
					</tr>
					<!--
					<tr class="applications_run_page__info_row">
						<td class="applications_run_page__info_row_key">MarketPlace:</td>
						<td class="applications_run_page__info_row_name">{{ getMarketPlace() }}</td>
					</tr>
					-->
					<tr class="applications_run_page__info_row">
						<td class="applications_run_page__info_row_key">Template:</td>
						<td class="applications_run_page__info_row_name">{{ getTemplateName() }}</td>
					</tr>
					<!--
					<tr class="applications_run_page__info_row">
						<td class="applications_run_page__info_row_key">Version:</td>
						<td class="applications_run_page__info_row_name">{{ getVersion() }}</td>
					</tr>
					-->
					<tr class="applications_run_page__info_row">
						<td class="applications_run_page__info_row_key">Status:</td>
						<td class="applications_run_page__info_row_name">{{ getStatus() }}</td>
					</tr>
				</table>
			</div>
			
			<!-- Application modificators -->
			<div class="applications_run_page__modificators applications_run_page__block">
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
				<div class="component_crud__table">
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
								<div class="component_row_buttons">
									<Button type="default" small="true"
										@click="onModificatorView(modificator_id)">View</Button>
									<Button type="danger" small="true"
										@click="onModificatorDelete(modificator_id)">Delete</Button>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
			
			<!-- Application variables -->
			<div class="applications_run_page__variables applications_run_page__block">
				<div class="applications_run_page__label">
					Variables
				</div>
				<div class="applications_run_page__variable"
					v-for="variable, index in model.application.variables" :key="variable.name"
				>
					<div class="applications_run_page__variable_label">
						{{ variable.label.en_US }}
					</div>
					<div class="applications_run_page__variable_value">
						<Input
							v-bind:name="variable.name"
							v-bind:crud="{
								item: variable.item,
								field: {}
							}"
							v-bind:store_path="store_path.concat(['application', 'variables', index, 'value'])"
						/>
					</div>
				</div>
			</div>
			
			<div class="crud_form__buttons">
				<Button type="danger" @click="onStopClick()">Stop</Button>
				<!--<Button type="" @click="onCancelClick()">Cancel</Button>-->
				<Button type="success" @click="onComposeClick()">Compose</Button>
				<Button type="primary" @click="onSaveClick()">Save</Button>
			</div>
			
			<CrudResult v-bind:store_path="store_path.concat('result')" />
			
		</div>
		
		<!-- Application variables -->
		<div class="applications_run_page__right">
			
			<!-- Tabs -->
			<Tabs @select="onTabSelect($event)">
				<Tab name="template" label="Template">
					<CodeMirror
						ref="code_mirror_template"
						v-bind:value="model.application.template.content"
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
				<Tab name="custom_patch" label="Custom patch">
					<CodeMirror
						ref="code_mirror_custom_patch"
						v-bind:store_path="store_path.concat('application', 'custom_patch')"
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
				<Tab name="result" label="Result">
					<CodeMirror
						ref="code_mirror_result"
						v-bind:value="model.application.content"
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
				<Tab name="yaml" label="Yaml" :selected="true">
					<CodeMirror
						ref="code_mirror_yaml"
						v-bind:value="model.application.yaml"
						v-bind:crud="{
							field:
							{
								component_params:{
									mode: 'yaml'
								}
							}
						}"
					/>
				</Tab>
			</Tabs>
			
		</div>
		
	</div>
	
	<div class="applications_run_page__dialogs">
		
		<Dialog v-bind:store_path="store_path.concat('dialog_add_modificator')">
			<template v-slot:title>
				Add modificator
			</template>
			<template v-slot:content>
				<div class="applications_run_page__select_add_modificator">
					<label>Select modificator:</label>
					<Select v-bind:store_path="store_path.concat(['select_add_modificator'])"
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
		
		<Dialog v-bind:store_path="store_path.concat('dialog_view_modificator')" width="800px">
			<template v-slot:title>
				View modificator
			</template>
			<template v-slot:content>
				<CodeMirror
					v-bind:value="model.dialog_view_modificator.tag != null ? model.dialog_view_modificator.tag.content : ''"
					v-bind:crud="{
						field:
						{
							component_params:{
								mode: 'xml'
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
 * Edit page
 */
export const ApplicationsEditPage =
{
	name: "ApplicationsEditPage",
	mixins: [mixin],
	props: ["action"],
	components:
	{
	},
	methods:
	{
		/* Info */
		getAppName: function()
		{
			return (this.model.application != null) ? this.model.application.name : "";
		},
		getTemplateName: function()
		{
			return (this.model.application != null && this.model.application.template != null) ?
				this.model.application.template.name : "";
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
			if (this.model.application.status == 0) return "STOPPED";
			if (this.model.application.status == 1) return "LAUNCHED";
			if (this.model.application.status == 2) return "STARTS UP";
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
			return (this.model.modificators != null) ?
				this.model.modificators
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
				: []
			;
		},
		onModificatorAdd()
		{
			this.model.select_add_modificator = -1;
			this.model.dialog_add_modificator.show();
		},
		onDialogAddModificatorButtonClick(button_text)
		{
			if (button_text == "yes")
			{
				let select_add_modificator = Number(this.model.select_add_modificator);
				let index = this.model.application.modificators.indexOf(select_add_modificator);
				if (index == -1 && select_add_modificator > 0)
				{
					this.model.application.modificators.push(select_add_modificator);
				}
			}
			this.model.dialog_add_modificator.hide();
		},
		
		/* View modificator */
		onModificatorView(modificator_id)
		{
			let modificator = this.model.getModificatorByID(modificator_id);
			if (modificator)
			{
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
		onSaveClick()
		{
			this.model.doSaveForm(this);
		},
		
		/* Cancel */
		onCancelClick()
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
		
		/* Compose */
		onComposeClick()
		{
			this.model.doComposeForm(this);
		},
		
		/* Stop */
		onStopClick()
		{
			this.model.doStopForm(this);
		},
		
		/* Back */
		onBackClick()
		{
			this.onCancelClick();
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
export default defineComponent(ApplicationsEditPage);

</script>
