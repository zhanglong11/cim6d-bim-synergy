import axios from '@/utils/axios'
const projectId = localStorage.getItem('projectId')

export default {
  //列表
  list: param =>
    axios.gis.post(`/bim/viewpoint/group/list`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),
  //添加分组
  addGroup: param =>
    axios.gis.post(`/bim/viewpoint/group/add`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),
  /*
   * @任务编号:1222 | 完善模型交互接口
   * @开发人员:申豪强
   * @日期:2020-04-03
   * @任务类型: 未开发完引起的bug
   */
  //添加视点
  addView: param =>
    axios.gis.post(`/bim/viewpoint/add`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),
  //删除分组
  removeGroup: id => axios.gis.get(`/bim/viewpoint/group/delete/${id}`),
  //删除视点
  removeView: id => axios.gis.get(`/bim/viewpoint/delete/${id}`),
  // 添加标注
  addMark: mess => axios.gis.post('bim/viewpoint/mark/add', mess),
  // 获取标注列表
  getMarkList: id => axios.gis.get(`/bim/viewpoint/${id}/mark/list`)
}
