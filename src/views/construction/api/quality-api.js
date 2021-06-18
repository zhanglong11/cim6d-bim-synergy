/**
 任务名称：task#2889 【智慧施工2.0-前端】质量与安全模块切图及功能开发
 开发人员：耿为刚
 日期：2020-04-17
 任务类型：全新代码
 **/
import http from '@/utils/axios'
export const qualityApi = {
  getQualityChartNew: () => http.safety.get(`/synergy/quality/acceptance/count/${localStorage.getItem('projectId')}`),

  checkCount: param =>
    http.safety.post(`/synergy/inspect/task/checkCount`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),

  count: () => http.safety.get(`/synergy/quality/acceptance/count/${localStorage.getItem('projectId')}`),

  // 安全检查-统计
  queryCheckCountSafety: projectId => {
    return http.construction({
      url: `/synergy/safety/checkCount/${projectId}`,
      method: 'post'
    })
  },
  //安全问题
  getSafe: () => http.construction.get(`/safety/bim/statdata/safetyquestion/${localStorage.getItem('projectId')}`),
  //质量问题- 列表数据
  getQualityTable: () =>
    http.construction.get(`/quality/bim/qualityQuestion/listData?projectId=${localStorage.getItem('projectId')}`),
  //质量问题- 图标数据
  getQualityChart: () =>
    http.construction.get(`/quality/bim/qualityQuestion/chartData?projectId=${localStorage.getItem('projectId')}`)
}
