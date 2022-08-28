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
@import '@/variable.scss';
.top_buttons{
	display: none;
}
.page_service{
	.component_crud__top_buttons{
		.component_button, .crud_result__message{
			display: inline-block;
			vertical-align: middle;
		}
		.crud_result__message{
			padding-left: 5px;
			padding-top: 0px;
		}
	}
	.component_crud__row{
		cursor: pointer;
	}
	.component_crud__table, .page_service__table_after{
		display: inline-block;
		vertical-align: top;
	}
	.page_service__table_after{
		padding-left: 10px;
	}
	.page_service__task_info{
		padding-top: 10px;
		padding-bottom: 10px;
		border-bottom: 1px #ccc solid;
	}
	.page_service__task_info:first-child{
		padding-top: 0px;
	}
	.page_service__task_info:last-child{
		border-bottom: 0px;
	}
	.page_service__task_info_row{
		padding-bottom: 5px;
	}
}
</style>

<template>
	<div class="page_service">
		<CrudList v-bind:store_path="store_path">
			<template v-slot:top_buttons>
				<Button type="primary" @click="onRefreshClick()">
					Refresh
				</Button>
				<CrudResult v-bind:store_path="store_path.concat('refresh_state')" />
			</template>
			
			<template v-slot:table_after>
				<div class="page_service__table_after" v-if="model.active_item != null">
					
					<div class="page_service__task_info"
						v-for="task in model.active_item.docker_tasks" :key="task.ID">
						
						<div class="page_service__task_info_row">
							ID: {{ task.ID}}
						</div>
						<div class="page_service__task_info_row">
							State: {{ task.Status.State }}
						</div>
						<div class="page_service__task_info_row">
							DesiredState: {{ task.DesiredState }}
						</div>
						<div class="page_service__task_info_row">
							Updated: {{ task.Updated }}
						</div>
						<div class="page_service__task_info_row" v-if="notNull(task.Status.Err)">
							Error: {{ task.Status.Err }}
						</div>
						
					</div>
					
				</div>
			</template>
		</CrudList>
		<Dialog v-bind:store_path="store_path.concat('dialog_stop')">
			<template v-slot:title>
				{{ model.constructor.getMessage("dialog_stop_title", model.dialog_stop.item) }}
			</template>
			<template v-slot:text>
				{{ model.constructor.getMessage("dialog_stop_text", model.dialog_stop.item) }}
			</template>
			<template v-slot:buttons>
				<Button type="danger" @click="onDialogFormButtonClick('stop_yes')">Yes</Button>
				<Button type="" @click="onDialogFormButtonClick('stop_no')">No</Button>
			</template>
		</Dialog>
	</div>
</template>

<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, onRouteUpdate, notNull } from "vue-helper";
import { CrudList } from "vue-helper/Crud/CrudList.vue";
import { CRUD_EVENTS, CrudEvent } from "vue-helper/Crud/CrudState";
import { ServicesPageState } from './ServicesPageState';


export const ServicesPage =
{
	name: "ServicesPage",
	mixins: [mixin],
	methods:
	{
		notNull,
		onRowClick: function(item, index, $event)
		{
			Crud.methods.onRowClick.apply(this, [item, index, $event]);
			this.model.setActiveItem(item);
		},
		onRefreshClick: function()
		{
			this.model.doRefresh();
		},
		onCrudComponentEvent: function($event)
		{
			if ($event.event_name == CRUD_EVENTS.ROW_BUTTON_CLICK && $event.button_name == "stop")
			{
				this.model.showStopForm($event.crud_item);
			}
			else
			{
				Crud.methods.onCrudComponentEvent.apply(this, [$event]);
			}
		},
		onDialogFormButtonClick: function(action)
		{
			if (action == "stop_yes")
			{
				this.model.doStopForm();
			}
			else if (action == "stop_no")
			{
				this.model.dialog_stop.hide();
			}
			else
			{
				Crud.methods.onDialogFormButtonClick.apply(this, [action]);
			}
		}
	},
	mounted: function () {
		let page_title = this.model.constructor.getMessage("list_title", null);
		this.setPageTitle(page_title);
	},
}

componentExtend(ServicesPage, CrudList);
export default defineComponent(ServicesPage);

</script>
