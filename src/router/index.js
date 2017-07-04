import Vue from 'vue';
import Router from 'vue-router';
import Featured from '@/pages/featured';
import Category from '@/pages/category';
import CatList from '@/pages/catlist';
import Rank from '@/pages/rank';
import List from '@/pages/list';
import Shelf from '@/pages/shelf';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'shelf',
      component: Shelf
    },
    {
      path: '/featured/:sex',
      name: 'featured',
      component: Featured
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/catlist/:major',
      name: 'catlist',
      component: CatList
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/rank/:id',
      name: 'ranklist',
      component: Rank
    },
    {
      path: '/list/:id',
      name: 'list',
      component: List
    }
  ]
  // scrollBehavior(to, from, savedPosition) {
  //   return {
  //     x: 0,
  //     y: 0
  //   }
  // }
})
