import Home from '../views/Home.vue'

// 路由表
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
        meta: {
          keepAlive: true
        },
        component: () => import('../views/Message.vue')
      },
      // {
      //   path: '/:path/list',
      //   name: "list",
      //   component: () => import('../components/List.vue'),
      //   props: true
      // },
      {
        path: '/admin_list',
        name: "admin_list",
        component: () => import('../views/List/Admin_list.vue'),
        meta: {
          title: ['数据管理', "管理员列表"],
          keepAlive: true
        }
      },
      {
        path: '/user_list',
        name: "user_list",
        component: () => import('../views/List/User_list.vue'),
        meta: {
          title: ['数据管理', "用户列表"],
          keepAlive: true
        }
      },
      {
        path: '/shop_list',
        name: "shop_list",
        component: () => import('../views/List/Shop_list.vue'),
        meta: {
          title: ['数据管理', "商家列表"],
          keepAlive: true
        }
      },
      {
        path: '/food_list',
        name: "food_list",
        component: () => import('../views/List/Food_list.vue'),
        meta: {
          title: ['数据管理', "食品列表"],
          keepAlive: true
        }
      },
      {
        path: '/order_list',
        name: "order_list",
        component: () => import('../views/List/Order_list.vue'),
        meta: {
          title: ['数据管理', "订单列表"],
          keepAlive: true
        }
      },
      {
        path: '/add_shop',
        name: "add_shop",
        component: () => import('../views/Add/Shop.vue'),
        meta: {
          title: ['添加数据', "添加商铺"],
          keepAlive: true
        }
      },
      {
        path: '/add_food',
        name: "add_food",
        component: () => import('../views/Add/Food.vue'),
        meta: {
          title: ['添加数据', "添加商品"],
          keepAlive: true
        }
      },
      //
      {
        path: '/explain',
        name: "explain",
        component: () => import('../views/Explain.vue'),
        meta: {
          title: ["说明", "说明"]
        }
      },
      {
        path: '/chart',
        name: "chart",
        component: () => import('../views/Chart.vue'),
        meta: {
          title: ['图表', "用户分布"],
          keepAlive: true
        }
      },
      {
        path: '/adminSetting',
        name: "adminSetting",
        component: () => import('../views/AdminSetting.vue'),
        meta: {
          title: ['设置', "管理员设置"]
        }
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
    meta: {
      isPublic: false,
      keepAlive: false
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: "*",
    name: "error",
    component: () => import('../views/Error.vue')
  }
]

export default routes