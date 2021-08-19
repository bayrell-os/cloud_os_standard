<style lang="scss" scoped>
ul.layout_menu_items, ul.layout_menu_items li{
	margin: 0;
	padding: 0;
	list-style: none;
}
ul.layout_menu_items{
	text-align: center;
}
ul.layout_menu_items li{
	display: inline-block;
	vertical-align: top;
	a{
		display: inline-block;
		padding: 5px;
	}
	a.router-link-exact-active{
		background-color: blue;
		color: white;
	}
}
</style>

<template>
	<div class="layout">
		<div class="layout_menu">
			<ul class="layout_menu_items">
				<li><router-link :to="{path: '/'}" class="nolink">Main</router-link></li>
			</ul>
		</div>
		<div class="layout_content">
			<router-view/>
		</div>
	</div>
</template>

