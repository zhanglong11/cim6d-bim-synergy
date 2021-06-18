/**
 任务名称：2621/BIM协同成本趋势+成本三算绑定
 开发人员：崔洛宜
 日期：2020-3-16
 任务类型：1、全新代码
 **/
import axios from '@/utils/axios'
const projectId = localStorage.getItem('projectId')
export default {
  //获取成本指标
  /*getCostQuota: param => axios.construction.get(`/cost/norm/${localStorage.getItem('projectId')}`),*/
  getCostQuota: param => axios.get(`/cost/view/${localStorage.getItem('projectId')}`),
  /**
   任务名称：2621/BIM协同成本趋势+成本三算绑定
   开发人员：崔洛宜
   日期：2020-3-17
   任务类型：添加成本明细接口,根据日期获取chart数据
   **/
  //获取成本明细
  getCostDetail: param =>
    axios.construction.post(`/cost/detail`, {
      projectId: localStorage.getItem('projectId')
    }),
  /*getChartsData: param =>
    axios.construction.post(`/cost/trend/lines/fake`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),*/
  getChartsData: param =>
    axios.post(`/costAnalysis/equityCurveNew`, {
      projectId,
      ...param
    }),
  /**
   任务名称：2621/BIM协同成本趋势+成本三算绑定
   开发人员：崔洛宜
   日期：2020-3-20
   任务类型：添加获取成本趋势明细接口
   **/
  getCostTrendDetail: param =>
    axios.construction.post(`/cost/trend/detaile`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    })
}
