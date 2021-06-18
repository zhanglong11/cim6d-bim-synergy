import http from '@/utils/axios'
const { post, get } = http.construction
const projectId = localStorage.getItem('projectId')
export default {
  //监控设备列表
  getMonitorList: data => {
    return post(`/monitor/device/queryList`, data)
  },
  //停用设备
  stopMonitor: id => {
    return get(`/monitor/device/${id}/stop`, {})
  },
  //开启设备
  openMonitor: id => {
    return get(`/monitor/device/${id}/open`, {})
  },
  //监控设备详情
  getMonitorDetail: deviceId => {
    return post(`/monitor/device/detail/${deviceId}`, {})
  },
  //获取设备监控视频列表(通过设备id)
  getVideoList: data => {
    return post(`/monitor/device/monitorRecord/queryList`, data)
  },
  //获取设备监控视频列表(通过监控区域)
  getVideoListByArea: data => {
    return post(`/monitor/device/monitorRecord/queryList`, data)
  },
  deleteVideoById: id => {
    return get(`/monitor/device/monitorRecord/${id}/delete`, {})
  },
  //获取设备列表
  getDeviceList: data => {
    return post(`/monitor/device/queryList`, data)
  },

  //添加监控设备
  addMonitor: data => {
    return post(`/monitor/device/save`, { ...data, projectId })
  },
  //更新监控设备
  updateMonitor: data => {
    return post(`/monitor/device/update`, data)
  },
  //获取区域实时监控
  getRealMonitorList: data => {
    return post(`/monitor/device/area/deviceList`, data)
  },

  //视频同步
  together: () => get(`/monitorVideo/syncDevice/${localStorage.getItem('projectId')}`),

  //获取视频地址
  getVideoUrl: param =>
    post(`/monitorVideo/start`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),

  //保活
  touch: param =>
    post(`/monitorVideo/touch`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    })
}
