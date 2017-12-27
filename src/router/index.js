import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Recommend from '@/components/recommend/Recommend'
import Search from '@/components/search/Search'
import Ranking from '@/components/ranking/Ranking'

Vue.use(Router)

const routes = [
	{
		path: '/',
		name: 'HelloWorld',
		component: HelloWorld
	},
	{
		path: '/recommend',
		component: Recommend
	},
	{
		path: '/search',
		component: Search
	},
	{
		path: '/ranking',
		component: Ranking
	},
]
export default new Router({
	mode: 'history',
	routes,
})
