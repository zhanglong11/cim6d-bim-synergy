<!--
 * @Description:bim树组件开发
 * @Version: zhanglong11
 * @Autor:
 * @Date: 2020-03-13
 -->
<!--
  * @任务编号: 2525 || 左侧树数据修改，新增单体标志
  * @开发人员:申豪强
  * @日期:2020-03-19
  * @任务类型: 新代码
-->
<!-- bug#1580 当bimResourceId没有值的时候，不应该再请求，且选中的时候，还没有children的时候，不能选中 申豪强 2020-04-14 -->
<template>
  <div>
    <el-tree
      ref="tree"
      show-checkbox
      node-key="id"
      class="filter-tree"
      :data="treeData"
      :props="defaultProps"
      :render-after-expand="false"
      :filter-node-method="filterNode"
      @check="checkChange"
    >
    </el-tree>
  </div>
</template>

<script>
import Api from '@/api/model/tree'
import treeForEach from '@/utils/treeForEach'
export default {
  name: 'BimTree',
  props: {
    type: String
  },
  data() {
    return {
      projectId: localStorage.getItem('projectId'),
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 选中的数据
      selectData: []
    }
  },
  created() {
    this.getProjectTreeData()
  },
  mounted() {},
  methods: {
    checkChange(e, data) {
      this.$emit('checkChange', e, data)
    },
    // checkChange(data, checked) {
    //   if (checked) {
    //     this.selectData.push(data)
    //   } else {
    //     this.selectData.forEach((item, index) => {
    //       if (item.id === data.id) {
    //         this.selectData.splice(index, 1)
    //       }
    //     })
    //   }
    //   this.$emit('checkChange', this.selectData)
    // },
    async getAppendTreeData(data, bimResourceId) {
      let res = null
      if (this.type === 'space') {
        //楼层树
        res = await Api.getFloorTreeData(bimResourceId)
      } else if (this.type === 'special') {
        //专业树
        res = await Api.getSpecialTreeData(bimResourceId)
      } else {
        //资源树
        res = await Api.getProjectFeatureTreeData(bimResourceId)
      }
      treeForEach(res, e => {
        e.label = e.name
      })
      console.log(res)
      this.$set(data, 'children', res)
      // this.$refs.tree.append(res, data)
    },
    handleNodeClick(data) {
      if (!data.bimResourceId) return
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.getAppendTreeData(data, data.bimResourceId)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    async getProjectTreeData() {
      let res = await Api.getProjectTreeData(this.projectId)
      let copy = JSON.parse(JSON.stringify(res.data))

      treeForEach(copy, e => {
        e.id = e.bimResourceId
        e.label = e.bimResourceName
        if (e.type === 3) {
          e.singleFlag = true
          this.getAppendTreeData(e, e.bimResourceId)
        } else {
          e.singleFlag = false
        }
      })
      this.treeData = copy
    }
  }
}
</script>

<style scoped lang="less"></style>
