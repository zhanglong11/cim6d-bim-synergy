import axios from '@/utils/axios'

export default {
  checkCount: param =>
    axios.safety.post(`/synergy/inspect/task/checkCount`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),

  //项目信息
  project: id => axios.system.get(`cim6d/system/project/get/${id}`),

  //进度视图
  progress: () => axios.get(`/progress/view/${localStorage.getItem('projectId')}`),

  //质量
  quality: () => axios.get(`/quality/statistics/${localStorage.getItem('projectId')}`),

  //安全
  safe: () => axios.get(`/safety/check/${localStorage.getItem('projectId')}`),

  //安全文明
  culture: () => axios.get(`/safety/civilization/${localStorage.getItem('projectId')}`),

  //变更对比
  change: () => axios.get(`/visa/statistics/${localStorage.getItem('projectId')}`),

  //成本
  cost: () => axios.service.get(`/cost/view/${localStorage.getItem('projectId')}`),

  //物资
  material: type => axios.get(`/material/statistics/${localStorage.getItem('projectId')}/${type}`)
}
