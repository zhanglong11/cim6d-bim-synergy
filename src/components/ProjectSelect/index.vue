<!--/**
       任务名称：2621/BIM协同成本趋势+成本三算绑定
       开发人员：崔洛宜
       日期：2020-3-19
       任务类型：查询项目列表
       **/-->
<template>
  <el-select :value="value" :disabled="disabled" @change="val => $emit('input', val)">
    <template v-if="hasAll">
      <el-option :value="null" label="全部"> </el-option>
    </template>
    <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id"> </el-option>
  </el-select>
</template>

<script>
import Api from '@/api/home'
export default {
  name: 'ProjectSelect',
  props: {
    hasAll: {
      type: Boolean,
      default: false
    },
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    refresh() {
      console.log('的萨达撒多撒')
      Api.getProjectList().then(res => {
        this.list = res.data.records
      })
    }
  },
  created() {
    this.refresh()
    console.log(111)
  }
}
</script>

<style lang="less" scoped>
img {
  width: 100%;
  height: 100%;
}
.bim {
  width: calc(100vw - 860px);
  height: calc(100vh - 110px);
  z-index: 10;
  position: relative;
}
</style>
