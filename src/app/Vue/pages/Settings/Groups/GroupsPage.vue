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
.groups_page__search_user{
	max-width: 200px;
	display: flex;
}
</style>

<template>
	<SettingsMenu>
		<Crud v-bind:store_path="store_path" v-bind:page_action="page_action">
			
			<template v-slot:dialog_form>
				<Dialog v-bind:store_path="store_path.concat('dialog_form')"
					width="800px" buttons="false"
				>
					<template v-slot:title>
						{{ model.constructor.getMessage("form_title",
							model.form_save.item_original
						) }}
					</template>
					<template v-slot:content>
						<Form v-bind:store_path="store_path.concat('form_save')"
							@crudEvent="onCrudFormEvent($event, 'form_save')"
						>
							<template v-slot:rows_after>
								<div class="crud_form__row"
									v-if="model.form_save.item_original != null"
								>
									<div class="crud_form__row_label">Users</div>
									<div class="crud_form__row_value">
										<div class="groups_page__search_user">
											<Input />
											<Button type="success">Add</Button>
										</div>
										<div class="groups_page__users">
										</div>
									</div>
								</div>
							</template>
							<template v-slot:buttons>
								<Button type="primary"
									@click="onSaveFormButtonSaveClick()">Save</Button>
								<Button type=""
									@click="onSaveFormButtonCancelClick()">Cancel</Button>
							</template>
						</Form>
					</template>
				</Dialog>
			</template>
			
		</Crud>
	</SettingsMenu>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, onRouteUpdate } from "vue-helper";
import { Crud } from "vue-helper/Crud/Crud.vue";
import { GroupsPageState } from './GroupsPageState';


export const GroupsPage =
{
	name: "GroupsPage",
	mixins: [mixin],
	methods:
	{
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

componentExtend(GroupsPage, Crud);
export default defineComponent(GroupsPage);

</script>
