import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainPage from '@/pages/Main/MainPage.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'MainPage',
		component: MainPage,
		props: { store_path: ["MainPage"] }
	}
]

const router = createRouter({
	history: createWebHistory("/"),
	routes
})

export default router
