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
.applications_run_page__patches{
	display: flex;
	&_items{
		width: 200px;
	}
	&_value{
		width: calc(100% - 200px);
	}
	&_item{
		padding: 5px 10px;
		cursor: pointer;
	}
	&_item.active{
		background-color: $color_primary;
		color: #fff;
	}
}
</style>

<template>
	<div class="applications_run_page__patches">
		
		<div class="applications_run_page__patches_items">
			
			<div class="applications_run_page__patches_item"
				v-bind:class="{ active: isSelected(-1) }"
				@click="select(-1)"
			>Template</div>
			
			<div class="applications_run_page__patches_item"
				v-for="modificator, index in model.form_save.item.modificators"
				v-bind:class="{ active: isSelected(index) }"
				:key="index"
				@click="select(index)"
			>
				{{ modificator.name }}
			</div>
		</div>
		
		<div class="applications_run_page__patches_value">
			<CodeMirror
				ref="code_mirror_selected_content"
				v-bind:value="selected_content"
				v-bind:component_params="{
					mode: 'xml',
					readOnly: true,
				}"
			/>
		</div>
		
	</div>
</template>

<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone, onRouteUpdate, responseOk, notNull, isNull }
	from "vue-helper";


/**
 * ApplicationTotalPatches
 */
export const ApplicationTotalPatches =
{
	name: "ApplicationTotalPatches",
	mixins: [mixin],
	data: function()
	{
		let model = this.getModel();
		let obj = {
			"selected": -1,
			"selected_content": model.form_save.item.template_content,
		};
		return obj;
	},
	methods:
	{
		refresh: function()
		{
			this.$nextTick(()=>{
				this.$refs["code_mirror_selected_content"].instance.refresh();
			});
		},
		isSelected: function(index)
		{
			return this.selected == index;
		},
		select: function(index)
		{
			this.selected = index;
			if (notNull(this.model.form_save.item.modificators[index]))
			{
				this.selected_content = this.model.form_save.item.modificators[index].content;
			}
			if (index == -1)
			{
				this.selected_content = this.model.form_save.item.template_content;
			}
		},
    }
}

export default defineComponent(ApplicationTotalPatches);

</script>
