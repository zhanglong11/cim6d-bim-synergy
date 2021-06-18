/**
 任务名称：task#2887 【智慧施工2.0-前端】工序进展模块切图及功能开发
 开发人员：耿为刚
 日期：2020-04-14
 任务类型：全新代码
 **/
import http from '@/utils/axios'
export const processProgressApi = {
  // 工序楼层查询
  queryProcedureConfigSimulateWorking: data => {
    return http.construction({
      url: '/working/procedure/config/simulate',
      method: 'post',
      data
    })
  }
}
