/*
 * @Description:
 * @Version:
 * @Autor:
 * @Date: 2020-03-09 11:39:09
 * @LastEditTime: 2020-04-22 08:59:12
 */
const state = {
  // bimfish实例
  bimfishApp: null,
  // 切换路由更改model显示
  showModelByTreeFlag: false
}
const mutations = {
  changeShowModelByTreeFlag(state, flag) {
    state.showModelByTreeFlag = flag
  },
  /*
   * @任务编号: 2525 || 将模型公共方法放于state中，便于调用
   * @开发人员:申豪强
   * @日期:2020-03-30
   * @任务类型: 新代码
   */
  /*
   * @任务编号: 2525 || 优化模型加载的方法
   * @开发人员:申豪强
   * @日期:2020-03-17
   * @任务类型: 新代码
   */

  // 加载3D视图
  load3dviewer(state, { id, arr }) {
    let key = '465758F8f2B54E72b6956A8ba3625a73'
    let secret = '5De5712e99b0435AB47a41673B2B1F97faf51014C47041fB97cc12c1bEb7b185'
    state.bimfishApp = new BimfishApp(id, key, secret, { MemoryLimited: true })
    state.bimfishApp.init(() => {
      // { id: 3, modelUrl: location.origin + url }
      state.bimfishApp.showModel(arr)
      state.bimfishApp.setBackgroundColor(200, 200, 200, 255, 255, 255)
      state.bimfishApp.viewer.addEventListener('geometryLoaded', () => {
        state.bimfishApp.setBackgroundColor(200, 200, 200, 255, 255, 255)
      })
    })
  },
  /**
   * @description: 通过dbid与modelId显示构件
   * @param {array} array 数组item示例：{modelId:modelId,dbids:dbids}
   * @return:
   * @author: 申豪强
   */
  showModalByDbIds(state, array) {
    let app = state.bimfishApp
    app.hideAll()
    array.forEach(item => {
      let model = app.findModelByid(item.modelId)
      app.viewer.show(item.dbids, model)
    })
  },
  /**
   * @description: 通过guids显示构件
   * @param {array} guids [1,2,3]
   * @return:
   * @author: 申豪强
   */
  showModalByGuids(state, guids) {
    let app = state.bimfishApp
    app.hideAll()
    app.show(guids)
  },
  /**
   * @description: 显示全部构件
   * @author: 申豪强
   */
  showAll(state) {
    let app = state.bimfishApp
    app.showAll()
  },
  /**
   * @description:  通过guids进项标注，并定位
   * @param {Array} guids  [1,2,3]
   * @return:
   * @author: 申豪强
   */
  fitViewByGUID(state, guids) {
    let bimfishApp = state.bimfishApp
    console.log(bimfishApp)
    // 添加标注
    const icon = '/img/logo.png'
    bimfishApp.addDrawableIconMarkerByGUID(guids, icon, ({ screenPoint, guid }) => {
      console.log('screenPoint:', screenPoint, guid)
    })
    // 定位
    bimfishApp.fitViewByGUID(guids)
  },
  // 清除模型颜色
  clearColor(state, guids) {
    let app = state.bimfishApp
    app.clearThemingColorByGUID(guids)
  },
  /**
   * @description: 根据guid给模型上色
   * @param {Array} guids
   * @param {Array} color [red = 0, green = 0, blue = 0, alpha = 1]
   * @return:
   * @author: 申豪强
   */
  setColorByGuids(state, { guids, color }) {
    let app = state.bimfishApp
    app.setThemingColor(guids, ...color)
  },
  /**
   * @description: 根据model和dbid进行上色
   * @param {Array} dbidArray dbid数组
   * @param {Object} model model对象
   * @param {Array} color [red = 0, green = 0, blue = 0, alpha = 1]
   * @return:
   * @author: 申豪强
   */
  setColorByDbId(state, { dbidArray, model, color }) {
    let app = state.bimfishApp
    app.setThemingColorByDbId(dbidArray, model, ...color)
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
