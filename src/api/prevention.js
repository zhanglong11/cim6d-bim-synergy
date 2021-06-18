import axios from '@/utils/axios'
const baseURL = '/prevention'
export default {
  getOnsInfo: () => axios.get(`/g2/getOnsInfo?name=disease_h5`, { baseURL, type: 'prevention' }),
  getTotalList: () =>
    axios.get(`/g2/getOnsInfo?name=disease_other`, {
      baseURL,
      type: 'prevention'
    }),
  getSiteData: param =>
    axios.construction.post(`/constructionMonitor/epidemicSituation/statData`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),
  getTodayList: param =>
    axios.construction.post(`/ConstructionMonitor/EpidemicSituation/todayStat`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    })
}
