/*
 * @Description:
 * @Version:
 * @Autor:
 * @Date: 2020-02-24 09:34:37
 * @LastEditTime: 2020-03-12 14:10:57
 */
import Vue from 'vue'
import Router from 'vue-router'
import { constructionRoutes } from '@/views/construction/router'
import { getToken } from '@/utils/auth' // get token from cookie

Vue.use(Router)

const routes = [
  // {
  //   path: '/login',
  //   component: () => import('@/views/login'),
  //   hidden: true
  // },
  ...constructionRoutes
  // {
  //   path: '/project',
  //   name: 'project',
  //   component: () => import('@/layout'),
  //   children: [
  //     { path: 'index', component: () => import('@/views') },

  //     // 项目资料
  //     {
  //       path: 'projectData',
  //       redirect: '/projectData/index',
  //       component: () => import('@/views/publicView'),
  //       children: [{ path: 'index', component: () => import('@/views/projectData') }]
  //     },
  //     // 成本视图
  //     {
  //       path: 'cost',
  //       redirect: '/cost/trending',
  //       component: () => import('@/views/publicView'),
  //       children: [
  //         { path: 'trending', component: () => import('@/views/cost/trending/index') },
  //         { path: 'treeCalculate', component: () => import('@/views/cost/treeCalculate/index') },
  //         { path: 'change', component: () => import('@/views/cost/change/index') }
  //       ]
  //     },
  //     // 质量视图
  //     {
  //       path: 'quality',
  //       redirect: '/quality/index',
  //       component: () => import('@/views/publicView'),
  //       children: [{ path: 'index', component: () => import('@/views/quality') }]
  //     },
  //     // 进度视图
  //     {
  //       path: 'schedule',
  //       redirect: '/schedule/view',
  //       component: () => import('@/views/publicView'),
  //       children: [
  //         { path: 'view', component: () => import('@/views/schedule/view/index.vue') },
  //         { path: 'simulation', component: () => import('@/views/schedule/simulation/index.vue') },
  //         { path: 'change', component: () => import('@/views/schedule/change/index.vue') }
  //       ]
  //     },
  //     // 安全视图
  //     {
  //       path: 'safety',
  //       redirect: '/safety/index',
  //       component: () => import('@/views/publicView'),
  //       children: [{ path: 'index', component: () => import('@/views/safety') }]
  //     }
  //   ]
  // }
]
const createRouter = () =>
  new Router({
    scrollBehavior: () => ({
      y: 0
    }),
    //mode: 'history',
    routes: routes
  })

const router = createRouter()
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
// 路由拦截
router.beforeEach((to, from, next) => {
  const hasToken = getToken()
  if (!hasToken && to.path !== '/login' && to.name !== 'toMain') {
    next({
      path: '/login'
    })
  } else {
    next()
  }
  if (hasToken) {
    if (to.path === '/login') {
      next({
        path: '/home'
      })
    } else {
      next()
    }
  }
})

export default router
