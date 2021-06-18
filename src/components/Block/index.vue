<template>
  <div class="block">
    <div class="main-title">
      <span class="name">{{ title }}</span>
      <span class="sub">{{ subTitle }}</span>
      <span class="end clearfix">
        <slot name="btn"></slot>
      </span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Block',
  props: ['title', 'subTitle'],
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
h2 {
  background-image: url(/img/title.png);
  background-size: contain;
  background-repeat: no-repeat;
  padding-left: 40px;
  height: 40px;
  > span {
    position: relative;
    top: -3px;
  }
}
.end {
  display: inline-block;
  float: right;
  cursor: pointer;
}
.title {
  color: #fff;
  font-size: 18px;
}
.sub-title {
  color: #567fa9;
  font-size: 12px;
}
</style>
