/*
 * @Description:
 * @Version:
 * @Autor:
 * @Date: 2020-02-24 17:51:22
 * @LastEditTime: 2020-03-12 14:49:37
 */
import Vue from 'vue'
import Vuex from 'vuex'
import bim from './bim'
import getters from './getters'
import user from './user'
import project from '@/views/construction/store/project' // 项目缓存
import systemConfig from '@/views/construction/store/system-config' // 系统参数全局缓存
import location from '@/views/construction/store/location'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    bim,
    user,
    project,
    systemConfig,
    location
  },
  getters,
  mutations: {},
  actions: {}
})
