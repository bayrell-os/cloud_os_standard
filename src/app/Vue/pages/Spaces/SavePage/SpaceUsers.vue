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

</style>


<template>
	<CrudList v-bind:store_path="store_path" v-bind:page_action="page_action">
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
							<div class="crud_form__row space_roles__row_after"
								v-if="model.form_save.item_original != null"
							>
								<div class="crud_form__row_label">Roles</div>
								<div class="crud_form__row_value">
									<div class="groups_page__search_user">
										<Input name="user_name"
											:store_path="store_path.concat('add_role_name')"
										/>
										<Button type="success"
											@click="onClickAddRole()"
										>Add</Button>
									</div>
									<table class="groups_page__users">
										<tr class="groups_page__user"
											v-for="role in model.form_save.item.users_roles"
											:key="role.role_id"
										>
											<td>{{ role.role_name }}</td>
											<td>
												<Button type="danger small"
													@click="onClickRemoveRole(role.role_name)"
												>Delete</Button>
											</td>
										</tr>
									</table>
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
	</CrudList>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone, onRouteUpdate } from "vue-helper";
import { CrudList } from "vue-helper/Crud/CrudList.vue";


/**
 * Status page
 */
export const SpaceUsers =
{
	name: "SpaceUsers",
	mixins: [mixin],
	components:
	{
	},
	methods:
	{
		onClickAddRole()
		{
			this.model.addRoleToUser(this.model.add_role_name);
		},
		onClickRemoveRole(role_name)
		{
			this.model.removeRoleFromUser(role_name);
		}
	}
}
componentExtend(SpaceUsers, CrudList);
export default defineComponent(SpaceUsers);

</script>
