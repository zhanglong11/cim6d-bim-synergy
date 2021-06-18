/**
 任务名称：task#2887 【智慧施工2.0-前端】工序进展模块切图及功能开发
 开发人员：耿为刚
 日期：2020-04-14
 任务类型：全新代码
 **/
import router from '@/router'
const state = {
  projectId: localStorage.getItem('projectId') || '01b2a1d7857d476fbf3efdfce1d5dea1', // 项目id
  projectName: localStorage.getItem('projectName') || '', //项目名称
  projectType: localStorage.getItem('projectType') || '', // 项目类型
  projectLongitude: localStorage.getItem('projectLongitude'),
  projectLatitude: localStorage.getItem('projectLatitude'),
  projectWeather: localStorage.getItem('projectWeather') ? JSON.parse(localStorage.getItem('projectWeather')) : {}
}

const mutations = {
  // 设置项目缓存
  setProjectLocalStorage(state, obj) {
    console.log('设置项目缓存', obj)
    localStorage.setItem('projectId', obj.projectId)
    localStorage.setItem('projectType', obj.projectType)
    localStorage.setItem('projectName', obj.projectName)
    localStorage.setItem('projectLongitude', obj.projectLongitude)
    localStorage.setItem('projectLatitude', obj.projectLatitude)
    state.projectId = obj.projectId
    state.projectName = obj.projectName
    state.projectType = obj.projectType
    state.projectLongitude = obj.projectLongitude
    state.projectLatitude = obj.projectLatitude
    router.push('/index')
  },
  // 设置项目天气
  setWeather(state, obj) {
    localStorage.setItem('projectWeather', JSON.stringify(obj))
    state.projectWeather = obj
  }
}

export default {
  state,
  mutations
}
