import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "/message",
    children: [
      {
        path: '/message',
        name: "message",
        component: () => import('../views/Message.vue')
      },
      {
        path: 'explain',
        name: "explain",
        component: () => import('../views/Explain.vue')
      },
      {
        path: 'chart',
        name: "chart",
        component: () => import('../views/Chart.vue')
      },
      {
        path: 'adminSetting',
        name: "adminSetting",
        component: () => import('../views/AdminSetting.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/login",
    name: "login",
    component: () => import('../views/Login.vue')
  },
  {
    path: "*",
    name: "error",
    component: () => import('../views/Error.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
