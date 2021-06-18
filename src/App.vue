<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
/*
 * @任务编号:2620||临时解决登陆token无效问题
 * @开发人员:张龙
 * @日期:2020-03-16
 * @任务类型: 全新代码
 */
export default {
  created() {
    //this.setToken()
  },
  methods: {
    setToken() {
      this.$store.dispatch('user/login', { loginName: 'zhihui', password: 123456 })
    }
  }
}
</script>

<style lang="less"></style>
