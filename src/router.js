import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/Login'),
      children: [
        {
            path: '/signup',
            component: () => import('@/views/Login'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/views/Success'),
      children: [
        {
            path: '/:id/raisely',
            component: () => import('@/views/Success'),
        }
      ],
    },
    {
      path: '*',
      component: () => import('@/views/Login')
    }
  ],
})
