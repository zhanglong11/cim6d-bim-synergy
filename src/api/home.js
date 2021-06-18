/*
 * @Description:
 * @Version:
 * @Autor:
 * @Date: 2020-03-07 18:18:18
 * @LastEditTime: 2020-03-12 13:44:48
 */
import request from '@/utils/axios'
export default {
  // 物资视图数据
  getMaterials(projectId, type) {
    return request.get(`material/statistics/${projectId}/${type}`)
  },
  /**
   任务名称：2621/BIM协同成本趋势+成本三算绑定
   开发人员：崔洛宜
   日期：2020-3-19
   任务类型：查询项目列表
   **/
  getProjectList(){
    return request.system.post(`/cim6d/system/project/query`,{})
  }
}
