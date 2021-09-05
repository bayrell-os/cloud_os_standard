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
.table{
	border-collapse: collapse;
    border: 1px #ccc solid;
    margin-top: 10px
}
.table td, .table th{
	border: 1px #ccc solid;
    padding: 5px;
    text-align: center;
}
.buttons button{
	margin-left: 2px;
    margin-right: 2px;
}
.dialog_buttons button{
	margin: 0 5px;
}
</style>

<template>
	<div class="top_buttons">
		<Button type="primary" @click="onShowAdd()">Add domain</Button>
	</div>
	<table class="table">
		<tr class="header">
			<th></th>
			<th>Domain name</th>
			<th></th>
		</tr>
		<tr class="row" v-for="item, index in model.items" :key="item.domain_name">
			<td>{{ index + 1 }}</td>
			<td>{{ item.domain_name }}</td>
			<td class="buttons">
				<Button type="default" small="true" @click="onShowEdit(item.domain_name)">Edit</Button>
				<Button type="danger" small="true" @click="onShowDelete(item.domain_name)">Delete</Button>
			</td>
		</tr>
	</table>
	<Dialog v-bind:store_path="store_path.concat('dialog_form')">
		<template v-slot:title>
			Добавить запись
		</template>
		<template v-slot:content>
			Форма
		</template>
		<template v-slot:buttons>
			<Button type="primary" @click="onDialogFormButtonClick('save')">Save</Button>
			<Button type="" @click="onDialogFormButtonClick('cancel')">Cancel</Button>
		</template>
	</Dialog>
	<Dialog v-bind:store_path="store_path.concat('dialog_delete')">
		<template v-slot:title>
			Удалить домен
		</template>
		<template v-slot:content>
			Вы действительно хотите удалить домен?
		</template>
		<template v-slot:buttons>
			<Button type="danger" @click="onDialogFormButtonClick('yes')">Yes</Button>
			<Button type="" @click="onDialogFormButtonClick('no')">No</Button>
		</template>
	</Dialog>
</template>

<script lang="js">

import { defineComponent } from 'vue';
import { mixin } from "vue-helper";
import axios from "axios";
import Button from '@/components/Button/Button.vue';
import Dialog from '@/components/Dialog/Dialog.vue';

export default defineComponent({
	mixins: [ mixin ],
	computed:
	{
	},
	methods:
	{
		onShowAdd: function()
		{
			this.model.dialog_form.show();
		},
		onShowEdit: function(domain_nam)
		{
			this.model.dialog_form.show();
		},
		onShowDelete: function(domain_nam)
		{
			this.model.dialog_delete.show();
		},
		onDialogFormButtonClick: function(action)
		{
			if (action == "save")
			{
				console.log(action);
			}
			else if (action == "cancel")
			{
				this.model.dialog_form.hide();
			}
			else if (action == "yes")
			{
				console.log(action);
			}
			else if (action == "no")
			{
				this.model.dialog_delete.hide();
			}
		},
	},
	components:
	{
		Button,
		Dialog,
	},
	mounted() {
		this.setPageTitle("Domains");
		this.model.constructor.loadData(this);
	}
});

</script>
