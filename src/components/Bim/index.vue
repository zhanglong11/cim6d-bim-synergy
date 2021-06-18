<template>
  <div class="bim">
    <img src="/img/bim.png" alt="" />
  </div>
</template>

<script>
export default {
  name: 'Bim',
  data() {
    return {}
  },
  methods: {
    refresh() {}
  },
  created() {
    this.refresh()
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
