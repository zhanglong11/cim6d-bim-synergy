import axios from '@/utils/axios'
export default {
  //成本变更-三算对比
  getChangeList: param => axios.construction.post(`/cost/change/list`, param),
  //成本变更-成本明细
  getChangeDetail: param => axios.construction.post(`/cost/change/detail`, param),
  //成本变更-成本指标-合同预算
  getChangeNormBudget: projectId => axios.construction.post(`/cost/change/${projectId}/norm/budget`, {}),
  //成本变更-成本指标-合同测算
  getChangeNormCalculate: projectId => axios.construction.post(`/cost/change/${projectId}/norm/calculate`, {}),
  // 查询签证详情明细
  getContractSiteAccessDetailList: data => axios.construction.post(`/contractSiteAccessDetail/list`, data),
  //根据id查询现场签证
  getContractSiteAccess: id => axios.construction.get(`/contractSiteAccess/get/${id}`, {})
}
