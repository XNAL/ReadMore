import Vue from 'vue'
import Router from 'vue-router'
import Featured from '@/pages/featured'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'featured',
    //   component: Featured
    // },
    {
      path: '/featured/:sex',
      name: 'featured',
      component: Featured
    }
  ]
})
