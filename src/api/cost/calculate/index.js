/**
 任务名称：2621/BIM协同成本趋势+成本三算绑定
 开发人员：崔洛宜
 日期：2020-3-16
 任务类型：1、全新代码
 **/
import axios from '@/utils/axios'
const projectId = localStorage.getItem('projectId')
export default {
  //获取成本明细
  getCostDetailList: param =>
    axios.post(
      `/cost/balance/detaile`,
      { projectId: localStorage.getItem('projectId'), ...param },
      {}
    ),
  getCostChartList: param => axios.post(`/cost/balance/list`, param, {}),
  /**
   任务名称：2621/BIM协同成本趋势+成本三算绑定
   开发人员：崔洛宜
   日期：2020-3-17
   任务类型：修改接口地址
   **/

  getScheduleList: param => axios.get(`/synergy/schedule/taskList/${projectId}`),
  /**
   任务名称：2621/BIM协同成本趋势+成本三算绑定
   开发人员：崔洛宜
   日期：2020-3-19
   任务类型：添加获取项目经费接口
   **/
  getProjectCost: param => axios.construction.post(`/cost/balance/list`, param, {})
}
