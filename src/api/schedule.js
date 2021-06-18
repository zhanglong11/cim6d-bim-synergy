/*
 * @Description:进度视图
 * @Version:
 * @Autor:
 * @Date: 2020-03-12 11:12:50
 * @LastEditTime: 2020-04-15 20:31:43

@任务名称: 2623/BIM协同-进度视图前端绑定
@开发人员: 董渊海
@修改日期: 2020-03-18
@任务类型: 修改代码，添加调整计划列表接口、计划详情接口、签证详情接口，修改比例(85%)

@任务名称: 2623/BIM协同-进度视图前端绑定
@开发人员: 董渊海
@修改日期: 2020-03-31
@任务类型: 修改代码，添加进度关联，获取关联的构建信息接口，修改比例(5%)
 */
import axios from '@/utils/axios' //任务号：2623、修改人：董渊海、修改时间：2020-03-17
export default {
  //获取进度明细列表
  getTaskList(projectId) {
    return axios.schedule.get(`/construct/plan/taskList/${projectId}`) //任务号：2623、修改人：董渊海、修改时间：2020-03-17 //bug号：1601、修改人：董渊海、修改时间：2020-04-15
  },
  //获取调整计划列表
  getPlanList(data) {
    return axios.schedule.post('/synergy/construct/plan/list', data)
  },
  //根据计划id获取计划详情
  getPlanDetail(id) {
    return axios.schedule.get(`/synergy/construct/plan/detail/${id}`)
  },
  //根据签证id获取签证详情
  getVisaDetail(id) {
    return axios.construction.get(`/contractSiteAccess/get/${id}`)
  },
  //进度变更，计划A和计划B对比
  comparePlanAplanB(aId, bId) {
    //任务号：2623、修改人：董渊海、修改时间：2020-03-19
    return axios.schedule.get(`/synergy/construct/plan/compare/${aId}/${bId}`)
  },
  //进度关联，获取关联的构建信息
  componentBindListGuid(data) {
    return axios.service.post('/componentBind/listGuid', data)
  },
  // 进度模拟
  getSimulateData(data) {
    return axios.service.post(`synergy/schedule/simulateData`, data)
  }
}
