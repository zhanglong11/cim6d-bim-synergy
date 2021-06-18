/*
 * @任务编号:项目资料模型版本接口文件
 * @开发人员:张龙
 * @日期:2020-03-20
 * @任务类型: 全新代码
 */

/*
 * @任务编号:项目资料模型版本接口数据绑定
 * @开发人员:张龙
 * @日期:2020-03-23
 * @任务类型: 修改代码
 */

import axios from '@/utils/axios'

export default {
  //当前版本
  curVersion: () => axios.system.get(`/project/bim/version/active/get/${localStorage.getItem('projectId')}`),

  //版本列表
  versionList: param =>
    axios.system.post(`/project/bim/version/list`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    })
}
