<style lang="scss" scoped>
</style>


<template>
	<div class="page_home">
		Hello {{ model.username }} !!!
	</div>
	<button @click="onClick">
		Click
	</button>
</template>

<script lang="js">

import { defineComponent } from 'vue';
import { mixin } from "vue-helper";

export default defineComponent({
	mixins: [ mixin ],
	computed:
	{
	},
	methods:
	{
		onClick()
		{
			console.log(this.model.username);
		}
	}
});

</script>
