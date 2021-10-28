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
@import '@/variable.scss';
.component_crud{
	&__top_buttons{
		margin-bottom: 10px;
	}
	&__top_button{
		display: inline-block;
		vertical-align: top;
		margin-left: 2px;
		margin-right: 2px;
		&:first-child{
			margin-left: 0px;
		}
	}
	&__table table{
		border-collapse: collapse;
		border: 1px $color_table_border solid;
	}
	&__table td, &__table th{
		border: 1px $color_table_border solid;
		padding: 5px;
		text-align: center;
	}
	&__row:hover{
		background-color: $color_table_hover;
		color: inherit;
	}
	&__row.active{
		background-color: $color_table_selected;
		color: white;
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
}
</style>


<template>
	<div class="component_crud">
		
		<slot name="crud_before"></slot>
		
		<div class="component_crud_list" v-if="action == undefined || action == 'list'">
		
			<div class="component_crud__top_buttons">
				<slot name="top_buttons">
					
					<div class="component_crud__top_button"
						v-if="route_names != undefined && route_names.add != undefined"
					>
						<router-link custom
							:to="{ name: route_names.add }"
							v-slot="{ href, navigate, route }"
						>
							<a :href="href" @click="navigate" class="nolink"
								v-bind:data-route-name="route.name"
							>
								<Button type="success">
									[+] {{ model.getMessage("top_button_show_add_title", model.current_item) }}
								</Button>
							</a>
						</router-link>
					</div>
					
					<div class="component_crud__top_button" v-else >
						<Button type="success" @click="onShowAdd()">
							[+] {{ model.getMessage("top_button_show_add_title", model.current_item) }}
						</Button>
					</div>
					
				</slot>
			</div>
			
			<slot name="table_before"></slot>
			
			<div class="component_crud__table">
				<slot name="table">
					<table>
						<tr class="component_crud__header">
							<th v-for="field in model.fields_table"
								:key="field.api_name"
							>{{ field.label }}</th>
						</tr>
						<tr class="component_crud__row"
							v-for="item, item_index in model.items" :key="item.domain_name"
							v-bind:class="{ active: model.isRowActive(item) }"
							@click="onRowClick(item, item_index, $event)"
						>
							<td v-for="field in model.fields_table"
								:key="field.api_name"
							>
								<component v-bind:is="field.component"
									v-bind:crud="{
										action: action,
										route_names: route_names,
										store_path: store_path,
										index: item_index,
										item: item,
										field: field,
										model: model
									}"
									v-bind:value="model.getItemValue(item_index, field.api_name)"
									@crudEvent="onCrudEvent($event)"
								/>
							</td>
						</tr>
					</table>
				</slot>
			</div>
			
			<slot name="table_after"></slot>
			<slot name="dialog_form">
				<Dialog v-bind:store_path="store_path.concat('dialog_form')"
					width="800px" buttons="false"
				>
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
		</div>
		
		<div class="component_crud_save" v-if="action == 'edit' || action == 'add'">
			<Form v-bind:store_path="store_path.concat('form')">
				<template v-slot:buttons>
					<Button type="primary" @click="onDialogFormButtonClick('save')">Save</Button>
					<Button type="" @click="onDialogFormButtonClick('cancel')">Cancel</Button>
				</template>
			</Form>
		</div>
		
		<slot name="crud_after"></slot>
	</div>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, deepClone } from "vue-helper";
import { CRUD_EVENTS, CrudEvent } from "./CrudState";

export const Crud =
{
	name: "Crud",
	mixins: [ mixin ],
	props: ["action"],
	computed:
	{
		route_names: function()
		{
			return this.model.getRouteNames();
		},
	},
	methods:
	{
		onRowClick: function(item, index, $event)
		{
			let event = new CrudEvent();
			event.event_name = CRUD_EVENTS.ROW_CLICK;
			event.crud_item = deepClone(item);
			event.index = this.crud_index;
			event.$event = $event;
			this.$emit( "crudEvent", event );
		},
		onCrudEvent: function($event)
		{
			if ($event.event_name == CRUD_EVENTS.ROW_BUTTON_CLICK)
			{
				if ($event.button_name == "edit")
				{
					this.onShowEdit($event.crud_item);
				}
				if ($event.button_name == "delete")
				{
					this.onShowDelete($event.crud_item);
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
				let route_names = this.model.getRouteNames();
				if (route_names.list == undefined)
				{
					this.model.dialog_form.hide();
				}
				else
				{
					this.$router.go(-1);
				}
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
	}
};


export default defineComponent(Crud);

</script>
