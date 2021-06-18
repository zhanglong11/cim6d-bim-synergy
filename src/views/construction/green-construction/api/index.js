import axios from '@/utils/axios'

export default {
  getHourTemperature: (param = {}) =>
    axios.iot.post(`/iot/third/humitureEveryHourInfo/${localStorage.getItem('projectId')}`, param),

  getAQIThisWeek: param =>
    axios.iot.post(`/iot/third/getAQIRankingByThisWeek`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),

  devCurrentInfo: (param = {}) =>
    axios.iot.post(`/iot/third/devCurrentInfo/${localStorage.getItem('projectId')}`, param),

  getAQIStaticsTimes: day =>
    axios.iot.post(`/iot/third/getAQIStatisticsTimes`, {
      projectId: localStorage.getItem('projectId'),
      day: day
    }),

  getPMStatisticsDays: day =>
    axios.iot.post(`/iot/third/getPMStatisticsDays`, {
      projectId: localStorage.getItem('projectId'),
      day: day
    })
}
