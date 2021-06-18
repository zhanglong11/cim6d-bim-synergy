<!--
 * @Description: bim模型
 * @Version:
 * @Autor:
 * @Date: 2020-03-05 11:13:55
 * @LastEditTime: 2020-04-22 09:13:48
 -->

<template>
  <div>
    <!-- 正常页面 -->
    <div id="lo-viewer" :class="['lo-viewer']" ref="lo-viewer"></div>
    <!-- 一次性加载两个性能不行，这种方案排除 -->
    <!-- 项目资料 -->
    <!-- <div
      id="info-viewer"
      :class="['lo-viewer', viewerClass ? 'change-width' : '', infoFlag ? '' : 'zero']"
      ref="lo-viewer"
    ></div> -->
  </div>
</template>

<script>
import Api from '@/api/model/tree'
import toFlat from '@/utils/toFlat'
import {BimBaseUrl} from '@/utils/axios'
export default {
  name: 'BIM',
  data() {
    return {
      // 判断首页的
      viewerClass: false,
      // 判断项目资料的
      infoFlag: false,
      // 判断是否有底部table
      bottomFlag: false,
      // 加载模型树
      treeData: [],
      projectId: localStorage.getItem('projectId')
    }
  },
  mounted() {
    /*
     * @任务编号: 2525 || 修改模型加载的方法
     * @开发人员:申豪强
     * @日期:2020-03-17
     * @任务类型: 新代码
     */
    // this.$store.commit('bim/load3dviewer', {
    //   id: 'lo-viewer',
    //   arr: [
    //     { id: 'model1-ID', modelUrl: location.origin + '/models/V1/3d.svf' },
    //     { id: 'model2-ID', modelUrl: location.origin + '/models/V2/3d.svf' }
    //   ]
    // })

    this.getProjectTreeData()
  },
  watch: {
    $route(e) {
      console.log(e)
      let app = this.$store.state.bim.bimfishApp
      // 回到主视图
      app.backToHome()
      // 取消选中的
      app.viewer.select()
      // 需求调整：这样写是为了按照树选中的进行展示，带来的不利影响就是每次都会加载模型； 申豪强 2020-04-22
      // 展示所有：应该根据左侧菜单再展示
      // let flag = this.$store.state.bim.showModelByTreeFlag
      // this.$store.commit('bim/changeShowModelByTreeFlag', !flag)
      // app.showAll()
      // 清除所有标注
      app.clearIconDrawableMarker()
      // 清除所有颜色
      app.clearThemingColors()
    }
  },
  methods: {
    /*
     * @任务编号: 2525 || 将模型改为动态加载
     * @开发人员:申豪强
     * @日期:2020-03-17
     * @任务类型: 新代码
     */
    load3dviewer(arr) {
      this.$store.commit('bim/load3dviewer', {
        id: 'lo-viewer',
        arr: arr
      })
    },
    // 获取模型数据
    async getProjectTreeData() {
      let res = await Api.getProjectTreeData(this.projectId)
      // 转换成一维数组
      let list = toFlat(res.data, 'pid', 'bimResourceId')
      let modelList = list.filter(item => item.type === 3)
      /*
       * @任务编号: 无bug编号
       * @开发人员:申豪强
       * @日期:2020-04-10
       * @bug类型:后台更改网关，去除跨域；走本地代理，解决跨域问题
       */
      if (modelList.length > 0) {
        // location.origin到时候更换
        let arr = modelList.map(item => {
          let obj = {
            id: item.bimResourceId.split('_')[0],
            modelUrl:
              location.origin + `/${BimBaseUrl}/noToken/old/basic/commonFile/get/fdht/bim_${item.bimResourceId}/3d.svf`
          }
          return obj
        })
        this.load3dviewer(arr)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.lo-viewer {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
