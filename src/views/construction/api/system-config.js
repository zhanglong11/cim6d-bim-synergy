/**
  任务名称：task#2886 【智慧施工2.0-前端】视频监控模块切图及功能开发
  开发人员：耿为刚
  日期：2020-04-20
  任务类型：全新代码
**/

import http from '@/utils/axios'
export const systemConfigApi = {
  // 查询列表
  queryListArg: data => {
    return http.construction({
      url: 'building/arg/list',
      method: 'post',
      data
    })
  },
  // 添加参数
  addArg: data => {
    return http.construction({
      url: 'building/arg/add',
      method: 'post',
      data
    })
  },
  // 编辑参数
  updateArg: data => {
    return http.construction({
      url: 'building/arg/update',
      method: 'post',
      data
    })
  },
  // 删除参数
  deleteArg: id => {
    return http.construction({
      url: `building/arg/delete/${id}`,
      method: 'get'
    })
  },
  // 获取参数树
  queryTreeArg: data => {
    return http.global({
      url: 'cim6d/arg/tree',
      method: 'post',
      data:{module: "construction-2.0"}
    })
  }
}
