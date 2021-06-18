<!--
 * @Description: 
 * @Version: 
 * @Autor: 
 * @Date: 2020-02-24 09:34:37
 * @LastEditTime: 2020-03-07 17:32:22
 -->
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Cost',

  methods: {
    refresh() {}
  },
  created() {
    this.refresh()
  }
}
</script>

<style lang="less" scoped></style>
