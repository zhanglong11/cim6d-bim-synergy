<!--
 * @Description: 标题tabs
 * @Version: 
 * @Autor: 
 * @Date: 2020-02-24 10:29:16
 * @LastEditTime: 2020-03-03 11:45:25
 -->
<template>
  <div class="block">
    <h2>
      <span
        v-for="item in list"
        :key="item.title"
        v-bind:class="['title', activeKey === item.value ? 'active' : '']"
        @click="changeActive(item)"
        >{{ item.title }}</span
      >
      <span class="sub-title">{{
        _.get(
          list.find(item => item.value === activeKey),
          'desc',
          ''
        )
      }}</span>
      <span class="end clearfix">
        <slot name="btn"></slot>
      </span>
    </h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BlockTabs',
  props: {
    activeKey: {},
    // 英文描述
    subTitle: {},
    // 标题列表
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    refresh() {},
    changeActive(item) {
      this.$emit('change', item.value)
    }
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
  color: #86888e;
  font-size: 15px;
  padding-right: 8px;
  cursor: pointer;
  &.active {
    font-size: 18px;
    color: #fff;
  }
}
.sub-title {
  color: #567fa9;
  font-size: 12px;
}
</style>
