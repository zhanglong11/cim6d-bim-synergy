<!--
  * @任务编号: task#2885 【智慧施工2.0-前端】首页切图及功能开发
  * @开发人员: 耿为刚
  * @日期: 2020-04-10
  * @任务类型: 新代码
-->
<template>
  <div>
    <router-view :key="key"></router-view>
  </div>
</template>

<script>
export default {
  name: 'ChildrenLayout',
  components: {},
  data() {
    return {}
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped></style>
