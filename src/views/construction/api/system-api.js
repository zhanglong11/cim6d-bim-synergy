/**
 任务名称：task#2891 【智慧施工2.0-前端】信息管理模块切图及功能开发
 开发人员：耿为刚
 日期：2020-04-16
 任务类型：全新代码
 **/
import http from '@/utils/axios'
export const systemApi = {
  // 添加消息
  addMessage: data => {
    return http.system({
      url: 'message/add',
      method: 'post',
      data
    })
  },
  // 查询消息列表
  queryListMessage: data => {
    return http.system({
      url: '/common/message/list',
      method: 'post',
      data
    })
  },
  // 删除消息
  deleteMessage: id => {
    return http.system({
      url: `message/delete/${id}`,
      method: 'get'
    })
  },
  // 获取消息详情
  getDetailsMessage: id => {
    return http({
      url: `common/message/get/${id}`,
      method: 'get'
    })
  },
  // 查询未读数量
  getUnreadMessage: () => {
    return http.system({
      url: 'message/unread/count',
      method: 'post'
    })
  },
  // 查询用户详情
  getUserInfo: id => {
    return http.system({
      url: `cim6d/system/user/get/${id}`,
      method: 'get'
    })
  },
  // 查询大事记列表
  queryListEvent: data => {
    return http.design({
      url: '/project/event/list',
      method: 'post',
      data
    })
  },
  // 获取大事记详情
  getDetailsEvent: id => {
    return http.design({
      url: `project/event/get/${id}`,
      method: 'get'
    })
  },
  queryNoticeList: data => {
    return http.system({
      url: '/announcement/list',
      method: 'post',
      data
    })
  },
}
