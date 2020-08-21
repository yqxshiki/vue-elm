import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由表
import routes from './route'

Vue.use(VueRouter)

import { localGetItem } from '../lib/util'


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// router.beforeEach((to, from, next) => {
//   if (to.meta.isPublic == undefined) {
//     to.meta.isPublic = true
//   }

//   if (
//     localGetItem(process.env.VUE_APP_LOGIN) == 1 && to.meta.isPublic
//   ) {
//     next()
//   } else {
//     next({ path: "/" })
//   }
// })

export default router
