/*
 * @Description:
 * @Version:
 * @Autor:
 * @Date: 2020-02-10 10:26:01
 * @LastEditTime: 2020-03-06 15:04:59
 */
import request from '@/utils/axios'

export function login(data) {
  return request.system.post('/login', data, {})
}
// 获取项目列表
export function getProjectList(data) {
  return request.system.get('cim6d/system/user/project/list', data)
}
// 获取用户信息
export function getUserInfo(data) {
  return request.system.get('cim6d/system/user/current/get', data)
}
