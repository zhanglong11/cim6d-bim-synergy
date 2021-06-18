<template>
  <div class="main-title">
    <span class="name">{{ name }}</span>
    <span class="sub">{{ sub }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MoveTitle',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: ['name', 'sub'],
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
    refresh() {},
    // 提交
    submit() {},
    // 删除
    remove() {}
  }
}
</script>

<style scoped lang="less"></style>
