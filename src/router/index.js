import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend/Recommend'
import Search from '@/components/search/Search'
import Ranking from '@/components/ranking/Ranking'
import Album from '@/components/album/Album'

Vue.use(Router)

const routes = [
  {path: '/', redirect: '/recommend'},
  {
    path: '/recommend',
	  name: 'recommend',
    component: Recommend,
    children: [
      {
        path: '/recommend/:id',
        name: 'album',
        component: Album
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/ranking',
    component: Ranking,
  },
];
export default new Router({
  mode: 'history',
  routes,
})
