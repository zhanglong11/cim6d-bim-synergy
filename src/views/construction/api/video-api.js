/**
 任务名称：task#2886 【智慧施工2.0-前端】视频监控模块切图及功能开发
 开发人员：耿为刚
 日期：2020-04-20
 任务类型：全新代码
 **/
import http from '@/utils/axios'
export const videoApi = {
  // 监控设备-列表
  queryListDevice: data => {
    return http.construction({
      url: '/monitor/device/queryList',
      method: 'post',
      data
    })
  },
  // 监控设备-区域设备-全部设备
  queryAreadeviceList: data => {
    return http.construction({
      url: `/monitor/device/queryList`,
      method: 'post',
      data
    })
  }
}
