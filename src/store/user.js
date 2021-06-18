/*
 * @Description:
 * @Version:
 * @Autor:
 * @Date: 2020-03-12 12:02:11
 * @LastEditTime: 2020-03-12 15:01:29
 */
import { login, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  companyId: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_COMPANY_ID: (state, companyId) => {
    state.companyId = companyId
  }
}

const actions = {
  // 登录跳转
  toLogin({ commit }, token) {
    commit('SET_TOKEN', token)
    setToken(token)
  },
  // user login
  login({ commit }, userInfo) {
    return login(userInfo).then(res => {
      commit('SET_TOKEN', res.data)
      setToken(res.data)
    })
  },

  // get info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token)
        .then(res => {
          commit('SET_NAME', res.data.nickName)
          commit('SET_AVATAR', res.data.headImage)
          commit('SET_COMPANY_ID', res.data.companyId)
          resolve(res.data)
        })
        .catch(error => {
          removeToken()
          reject(error)
        })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
