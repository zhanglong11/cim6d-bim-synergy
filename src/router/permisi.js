/*
 * @Description:路由守卫
 * @Version:
 * @Autor:
 * @Date: 2020-03-12 13:46:50
 * @LastEditTime: 2020-03-12 14:02:27
 */
import router from './index'
import store from '../store'
import { Message, Loading } from 'element-ui'
import { getToken } from '@/utils/auth' // get token from cookie

const whiteList = ['/login'] // no redirect whitelist
let loadingInstance = null
router.beforeEach(async (to, from, next) => {
  loadingInstance = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })

  // determine whether the user has logged in
  const hasToken = getToken()
  // 项目id
  const projectId = localStorage.getItem('projectId')
  console.log(111, hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      next({
        path: '/home'
      })
      loadingInstance.close()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          next()
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          loadingInstance.close()
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
      loadingInstance.close()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  loadingInstance.close()
})
