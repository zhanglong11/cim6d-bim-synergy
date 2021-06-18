/*
 * @任务编号:2620||质量接口文件
 * @开发人员:张龙
 * @日期:2020-03-16
 * @任务类型: 全新代码
 */

/*
 * @任务编号:2620||质量接口文件更新
 * @开发人员:张龙
 * @日期:2020-03-17
 * @任务类型: 修改代码
 */

/*
 * @任务编号:2620||质量接口更换
 * @开发人员:张龙
 * @日期:2020-03-20
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

  //质检问题-统计
  qualityCheck: () => axios.construction.post(`/synergy/quality/checkCount/${localStorage.getItem('projectId')}`),

  //质检问题-分页列表
  list: param =>
    axios.construction.post(
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

  //质量树
  tree: param =>
    axios.safety.post(`/synergy/quality/acceptTree`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),

  //分项详情
  subSection: id => axios.construction.get(`/synergy/quality/acceptance/get/${id}`),

  //获取guid
  getGuid: id =>
    axios.post(`/qualityProblemBimBind/selectByTargetId`, {
      projectId: localStorage.getItem('projectId'),
      targetId: id
    }),
  //获取guid
  getAcceptGuid: id =>
    axios.post(`/qualityAcceptanceBimBind/selectByTargetId`, {
      projectId: localStorage.getItem('projectId'),
      targetId: id
    }),
  getGuids: ids => axios.post(`/qualityProblemBimBind/selectByTargetIds`, ids),

  //问题详情
  getQuestionDetail: id => axios.safety.get(`/inspect/getByDetail/${id}`)
}
