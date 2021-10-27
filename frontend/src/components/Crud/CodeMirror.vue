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
textarea.component_codemirror{
	width: 100%;
	min-height: 300px;
	padding: 6px 12px;
	background-color: white;
	border: 1px #ccc solid;
	outline: transparent;
}
</style>


<template>
	<textarea class="component_codemirror" ref="input"></textarea>
</template>


<script lang="js">

import _CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import { defineComponent } from 'vue';
import { mixin, componentExtend } from 'vue-helper';
import { CrudEvent, CRUD_EVENTS } from "./CrudState";
import { Field } from './Field.vue';


export const CodeMirror =
{
	mixins: [ mixin ],
	emits: Field.emits,
	props: Field.props,
	computed:
	{
	},
	watch:
	{
		value(newVal)
		{
			if (this.instance_created && this.new_value != newVal)
			{
				this.new_value = newVal;
				setTimeout
				(
					() => { this.instance.getDoc().setValue(newVal); },
					10
				);
			}
		},
	},
	methods:
	{
		onChange: function()
		{
			this.change_timer = null;
			
			let value = this.instance.getDoc().getValue();
			if (this.instance_created && this.new_value != value)
			{
				this.new_value = value;
				let event = new CrudEvent();
				event.event_name = CRUD_EVENTS.ITEM_CHANGE;
				event.item_name = this.name;
				event.value = value;
				this.$emit( "crudEvent", event );
			}
		}
	},
	components:
	{
	},
	mounted: function()
	{
		this.instance = _CodeMirror.fromTextArea
		(
			this.$refs.input,
			{
				lineNumbers: true,
				lineWrapping: true,
				mode: "htmlmixed",
				matchBrackets: true,
				tabSize: 2,
			}
		);
		this.instance.refresh();
		this.instance_created = true;
		this.change_timer = null;
		this.new_value = "";
		
		/* Set value */
		this.instance.getDoc().setValue(this.value);
		
		/* onChange */
		this.instance.on("change", (function(obj, onChange){ return (code) => {
			if (obj.change_timer == null)
			{
				obj.change_timer = setTimeout(onChange, 500);
			}
		}})(this, this.onChange.bind(this)));
		
		this.instance.setOption("extraKeys", {
			Tab: function(cm)
			{
				var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
				cm.replaceSelection(spaces);
			}
		});
	}
};

componentExtend(CodeMirror, Field);
export default defineComponent(CodeMirror);

</script>
