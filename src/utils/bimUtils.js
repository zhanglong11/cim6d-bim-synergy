/*
 * @Description:服务于bim模型的接口
 * @Version:
 * @Autor: 申豪强
 * @Date: 2020-03-17 08:53:57
 * @LastEditTime: 2020-03-23 17:13:12
 */
/*
 * @任务编号: 2525 || 服务于bim模型的接口
 * @开发人员:申豪强
 * @日期:2020-03-17
 * @任务类型: 新代码
 */
export default {
  /**
   * @description: dbid转换为guid
   * @param {Object} bimfishApp bim实例
   * @param {array} dbids 含有dbid的集合
   * @return: guidList
   * @author: 申豪强
   */
  async getModal(bimfishApp, dbids) {
    // 所有的dbid:guid,是个对象
    const mapping = await ToolKit.getExternalIdMapping(bimfishApp.viewer.model)
    let hash = {}
    let guidList = []
    // 获取所有guidList
    dbids.forEach(l => {
      hash[l.dbId] = true
    })
    _.forIn(mapping, (val, key) => {
      if (hash[val]) guidList.push(key)
    })
    return guidList
  },
  /**
   * @description: bimfish画线状态
   * @param {Object} bimfishApp bim实例
   * @author: 申豪强
   */
  async drawBIM(bimfishApp) {
    await bimfishApp.initDrawArea()
    this.drawArea()
  },
  /**
   * @description: 左侧单体楼层+专业构件展示选中的构件
   * @param {Object} bimfishApp bim实例
   * @param {dom} tree element的树形控件
   * @author: 申豪强
   */
  watchModal(bimfishApp, tree) {
    let guids = []
    let list = tree.getCheckedNodes()
    if (list.length > 0) {
      guids = list.filter(item => item.guid).map(item => item.guid)
    }
    bimfishApp.hideAll()
    bimfishApp.show(guids)
  },
  /**
   * @description: 根据guid与模型互动
   * @param {Object} bimfishApp bim实例
   * @param {array} guids 从后台获取的guid数组
   * @author: 申豪强
   */
  showModalByGuid(bimfishApp, guids) {
    bimfishApp.hideAll()
    bimfishApp.show(guids)
  },
  /**
   * @description: 获取模型构件的guid，debug使用
   * @param {Object} bimfishApp bim实例
   * @author: 申豪强
   */
  getGuid(bimfishApp) {
    bimfishApp.getComponentGuid((e, id) => {
      console.log(id)
    })
  }
}
