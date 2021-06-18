<!--
 * @Description:
 * @Version:
 * @Autor:
 * @Date: 2020-02-24 17:51:22
 * @LastEditTime: 2020-03-17 16:50:57
 -->
<!--
  * @任务编号: 2525 || 修改进度模拟的bim模型左侧没有组件时的样式
  * @开发人员:申豪强
  * @日期:2020-03-17
  * @任务类型: 新代码
-->
<template>
  <div class="layout-main">
    <Navbar></Navbar>
    <div
      :class="[
        'bim-wrap',
        viewerClass ? 'change-width' : '',
        bottomFlag ? 'bottomSpace' : '',
        rightFlag ? 'rightWidth' : ''
      ]"
    >
      <Bim class="bim"></Bim>
    </div>
    <div class="content-wrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Bim from '@/views/bimView/index'
export default {
  name: 'Layout',
  components: { Navbar, Bim },
  data() {
    return {
      // 判断首页的
      viewerClass: false,
      // 判断项目资料的
      infoFlag: false,
      // 判断是否有底部table
      bottomFlag: false,
      // 判断右侧是否有空余
      rightFlag: false
    }
  },
  mounted() {
    this.classJudge()
  },
  watch: {
    $route() {
      this.classJudge()
      // this.$store.state.bim.bimfishApp.backToHome()
      // this.$store.state.bim.bimfishApp.clearSelection()
    }
  },
  methods: {
    // 各种情况class
    classJudge() {
      let path = this.$route.path
      if (path === '/home') {
        this.viewerClass = false
      } else {
        this.viewerClass = true
      }
      // 判断项目资料
      if (path === '/projectData/index') {
        this.infoFlag = true
      } else {
        this.infoFlag = false
      }
      // 判断是否有底部table
      if (path.indexOf('/cost') > -1 || path.indexOf('/schedule') > -1) {
        this.bottomFlag = true
      } else {
        this.bottomFlag = false
      }
      // 判断右侧是否有组件
      if (path.indexOf('/simulation') > -1) {
        this.rightFlag = true
      } else {
        this.rightFlag = false
      }
      this.$nextTick(() => {
        if (this.$store.state.bim.bimfishApp) {
          this.$store.state.bim.bimfishApp.resize()
        }
      })
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.bim-wrap {
  position: fixed;
  top: 88px;
  z-index: 1;
  left: 410px;
  right: 410px;
  bottom: 10px;
  .bim {
    width: 100%;
    height: 100%;
  }
}
.content-wrap {
  padding-top: 32px;
}
// 用于首页非首页
.change-width {
  left: 310px;
}
// 判断底部是否有table
.bottomSpace {
  bottom: 310px;
}
.rightWidth {
  right: 10px;
}
</style>
