/*
 * @Description:
 * @Version:
 * @Autor:
 * @Date: 2020-03-12 11:24:12
 * @LastEditTime: 2020-03-12 15:06:17
 */
import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
