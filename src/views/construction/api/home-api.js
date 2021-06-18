/**
 任务名称：task#2885 【智慧施工2.0-前端】首页切图及功能开发
 开发人员：耿为刚
 日期：2020-04-20
 任务类型：全新代码
 **/
import http from '@/utils/axios'
export const homeApi = {
  // 查询项目详情
  getProject: id => {
    return http.system({
      url: `/cim6d/system/project/get/${id}`,
      method: 'get'
    })
  },
  // 查询项目2D平面图
  getProjectPlanImage: id => {
    return http.system({
      url: `/cim6d/system/project/image/plan/${id}`,
      method: 'get'
    })
  },
  // 查询项目形象进度图
  getProjectProgressImage: id => {
    return http.system({
      url: `/cim6d/system/project/image/progress/${id}`,
      method: 'get'
    })
  },
  // 获取天气
  getWeather: data => {
    return http.system({
      url: `/weather/info`,
      method: 'post',
      data
    })
  }
}
