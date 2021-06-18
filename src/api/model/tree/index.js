/*
 * @Description:
 * @Author:
 * @Date: 2020-03-18 10:00:36
 */

/*
 * @任务编号:2620||树接口调用
 * @开发人员:张龙
 * @日期:2020-03-13
 * @任务类型: 全新代码
 */

import axios from '@/utils/axios'
// 申豪强 task#2525 更换左侧树json接口
export default {
  //获取项目下生效的资源树
  getProjectTreeData: projectId => {
    return axios.system.post(`/project/bim/tree/active/${projectId}`, {})
  },
  //楼层树
  getFloorTreeData: bimResourceId => {
    return axios.gis.get(`/noToken/old/basic/commonFile/get/fdht/bim_${bimResourceId}/space.json`)
  },
  //专业树
  getSpecialTreeData: bimResourceId => {
    return axios.gis.get(`/noToken/old/basic/commonFile/get/fdht/bim_${bimResourceId}/special.json`)
  },
  //项目特征树
  getProjectFeatureTreeData: bimResourceId => {
    return axios.gis.get(`/noToken/old/basic/commonFile/get/fdht/bim_${bimResourceId}/bill.json`)
  }
}
