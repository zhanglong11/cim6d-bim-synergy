<template>
  <div class="wrap">
    <div
      v-for="item in title"
      :class="['title', active === item.value ? 'active' : '']"
      :key="item.value"
      @click="getTotalKey(item.value)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabTitle',
  props: {
    title: {
      type: Array,
      default: () => []
    },
    active: {}
  },
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {}
  },
  // 生命周期 - 实例创建完成，可访问data、computed、watch、methods上的方法和数据，未挂载到DOM，不能访问到属性，属性内容为空数组
  created() {},
  // 生命周期 - 实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，属性可以访问
  mounted() {},
  // 方法集合
  methods: {
    // 刷新列表
    getTotalKey(key) {
      this.$emit('getTotalKey', key)
    },
    // 提交
    submit() {},
    // 删除
    remove() {}
  }
}
</script>

<style scoped lang="less">
.wrap {
  padding-right: 20px;
  text-align: right;
  > div {
    display: inline-flex;
    position: relative;
    padding: 2px 12px;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    &:after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #0a131c;

      content: '';
      padding: 10px;
      transform: skewX(-45deg);
      z-index: -1;
    }
    &.active:after {
      background-color: #266297;
    }
    + div {
      margin-left: 10px;
    }
  }
}
</style>
