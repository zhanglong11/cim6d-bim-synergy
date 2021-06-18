/*
 * @Description:
 * @Author:
 * @Date: 2020-01-09 18:05:43
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login', '/share'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // 这样写是为了按照树选中的进行展示 申豪强 2020-04-22
  if (from.path === '/schedule/simulation') {
    // 从进度模拟过来，更新树
    let flag = store.state.bim.showModelByTreeFlag
    store.commit('bim/changeShowModelByTreeFlag', !flag)
  }
  // start progress bar
  NProgress.start()

  // set page title

  // determine whether the user has logged in
  const hasToken = getToken()
  // 项目id
  const projectId = localStorage.getItem('projectId')

  if (hasToken && projectId) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          // await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
