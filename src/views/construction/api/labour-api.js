/**
 任务名称：task#2888 【智慧施工2.0-前端】劳务管理模块切图及功能开发
 开发人员：耿为刚
 日期：2020-04-20
 任务类型：全新代码
 **/
import http from '@/utils/axios'
export default {
  //统计
  statistics: params =>
    http.constructionLabour({
      url: '/labour/bim/emp/laborManagementStatistics',
      method: 'post',
      params,
      timeout: 50000
    }),

  //男女比例
  personRate: () =>
    http.constructionLabour.get(`/labour/bim/emp/queryRate`, {
      params: {
        projectId: localStorage.getItem('projectId')
      }
    }),

  //省份统计
  province: () =>
    http.constructionLabour.get(`/labour/bim/worktypeAndProvince/queryList`, {
      params: {
        projectId: localStorage.getItem('projectId')
      }
    }),

  //安全培训
  safeTrain: params =>
    http.constructionLabour({ url: '/labour/bim/safeTrain/reportData', method: 'post', params, timeout: 20000 })
}
