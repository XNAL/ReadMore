import Vue from 'vue';
import Router from 'vue-router';
import Featured from '@/pages/featured';
import Category from '@/pages/category';
import Rank from '@/pages/rank';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'featured',
    //   component: Featured
    // },
    {
      path: '/featured',
      name: 'defaultFeatured',
      redirect: '/featured/male',
      component: Featured
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
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/rank/:id',
      name: 'ranklist',
      component: Rank
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
