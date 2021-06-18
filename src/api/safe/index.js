/*
 * @任务编号:2620||安全接口文件
 * @开发人员:张龙
 * @日期:2020-03-17
 * @任务类型: 全新代码
 */

/*
 * @任务编号:2620||安全图表接口
 * @开发人员:张龙
 * @日期:2020-03-19
 * @任务类型: 修改代码
 */

import axios from '@/utils/axios'

export default {
  //统计
  checkCount: param =>
    axios.safety.post(`/synergy/inspect/task/checkCount`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),

  //分页列表
  listPage: param =>
    axios.safety.post(
      `/synergy/quality/checkPage`,
      {
        projectId: localStorage.getItem('projectId'),
        ...param
      },
      {
        headers: {
          projectId: localStorage.getItem('projectId')
        }
      }
    ),

  //安全检查列表
  checkList: param =>
    axios.construction.post(`/safety/bim/check/view`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),

  //安全文明检查
  cultureList: param =>
    axios.construction.post(`/safety/bim/civilization/view`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),
  /*
   * @任务编号:2620||安全详情接口对接
   * @开发人员:张龙
   * @日期:2020-03-25
   * @任务类型: 新代码
   */
  //安全检查详情
  checkDetail: param =>
    axios.construction.post(`/safety/bim/check/rectification`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),

  //
  cultureDetail: param =>
    axios.construction.post(`/safety/bim/civilization/rectification`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),

  //安全图表
  safe: () => axios.get(`/safety/check/${localStorage.getItem('projectId')}`),

  //安全文明图表
  culture: () => axios.get(`/safety/civilization/${localStorage.getItem('projectId')}`),

  //获取guid
  getCheckGuid: id => {
    return axios.post(`/safetyCheckBimBind/selectByTargetId`, {
      projectId: localStorage.getItem('projectId'),
      targetId: id
    })
  },
  //获取guid
  getCultureGuid: id => {
    return axios.post(`/safetyCultureBimBind/selectByTargetId`, {
      projectId: localStorage.getItem('projectId'),
      targetId: id
    })
  },
  getGuids: ids => axios.post(`/safetyCheckBimBind/selectByTargetIds`, ids),

  //问题详情
  getQuestionDetail: id => axios.safety.get(`/inspect/getByDetail/${id}`)
}
